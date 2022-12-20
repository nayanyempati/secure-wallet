using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using secure_wallet_be.Entities;
using secure_wallet_be.Helper;
using secure_wallet_be.Models;
using shortid;
using System.Security.Claims;

namespace secure_wallet_be.Controllers
{
    [Route("api/card")]
    [ApiController, Authorize]
    public class CardController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly Messages _messages = new Messages();
        private readonly Cryptography _hash = new Cryptography();
        public readonly Mailer _mailer = new Mailer();
        public CardController(ILogger<CardController> logger)
        {
            _logger = logger;

        }

        [HttpGet("search/{number}")]
        public async Task<ActionResult> SearchCards(string number)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                var details = await (from C in _dbcon.CardData
                                     where C.UserId == UserId
                                     select new
                                     {
                                         C.CardName,
                                         C.CardType,
                                         C.Expiry,
                                         CardNumber = _hash.DecryptString("bPdSgVkYp3s6v6y$", C.CardNumber)
                                     }).ToListAsync();
                if (details.Count > 0)
                {
                    var searchResult = details.Where(x => x.CardNumber.Contains(number) || x.CardName.Contains(number)).ToList();
                    return Ok(searchResult);
                }
                return Ok(null);

            }
        }

        [HttpGet("list")]
        public async Task<ActionResult> ListCards()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                var details= await (from C in _dbcon.CardData
                                  where C.UserId==UserId
                                  select new
                                  {
                                      C.CardName,
                                      C.CardType,
                                      C.Token,
                                      C.Expiry,
                                      CardNumber = _hash.DecryptString("bPdSgVkYp3s6v6y$", C.CardNumber)
                                  }).ToListAsync();
                return Ok(details);
 
            }
        }

        [HttpPost("add")]
        public async Task<ResponseModel> Add([FromBody] CardModel card)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                if (userDetails != null)
                {
                    string Type = _mailer.FindType(card.CardNumber);
                    await _dbcon.CardData.AddAsync(new CardDatum
                    {
                        CardName = card.CardName,
                        CardNumber = _hash.EncryptString("bPdSgVkYp3s6v6y$", card.CardNumber),
                        CardType = Type,
                        CreatedOn = DateTime.Now,
                        Expiry = card.Expiry,
                        Token = ShortId.Generate(),
                        UserId = UserId,

                    });
                    _dbcon.SaveChanges();
                }

                return new ResponseModel { Message = _messages.CARD_ADDED_SUCCESSFULLY, Status = _messages.SUCCESS };

            }
        }

        [HttpPut("update/{token}")]
        public async Task<ResponseModel> Update([FromBody] CardModel card, string token)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);

            using (dbcon _dbcon = new dbcon())
            {
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                var cardDetals = await _dbcon.CardData.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (cardDetals != null)
                {
                    string Type = _mailer.FindType(card.CardNumber);
                    cardDetals.Expiry = card.Expiry;
                    cardDetals.CardType = Type;
                    cardDetals.CardName = card.CardName;
                    cardDetals.CardNumber = _hash.EncryptString("bPdSgVkYp3s6v6y$", card.CardNumber);
                    _dbcon.SaveChanges();
                    return new ResponseModel { Message = _messages.UPDATED_SUCCESSFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseModel { Message = _messages.UN_AUTHORIZED, Status = _messages.WARNING };
            }
        }
        [HttpDelete("delete/{token}")]
        public async Task<ResponseModel> Delete(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var identity = (ClaimsIdentity)User.Identity;
                int UserId = Convert.ToInt32(identity.Name);
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                var cardDetals = await _dbcon.CardData.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (cardDetals != null)
                {
                    _dbcon.Remove(cardDetals);
                    _dbcon.SaveChanges();
                    return new ResponseModel { Message = _messages.DELETED_SUCCESSFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseModel { Message = _messages.UN_AUTHORIZED, Status = _messages.WARNING };
            }
        }

        [HttpGet("view/{token}")]
        public async Task<ActionResult> View(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var identity = (ClaimsIdentity)User.Identity;
                int UserId = Convert.ToInt32(identity.Name);
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                var cardDetals = await _dbcon.CardData.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (cardDetals != null)
                {
                    var details = new CardDatum
                    {
                        CardName = cardDetals.CardName,
                        CardNumber = _hash.DecryptString("bPdSgVkYp3s6v6y$", cardDetals.CardNumber),
                        CardType = cardDetals.CardType,
                        CreatedOn = cardDetals.CreatedOn,
                        Expiry = cardDetals.Expiry,
                        Token = cardDetals.Token,
                    };
                    return Ok(details);
                }
                return Ok(new ResponseModel { Message = _messages.UN_AUTHORIZED, Status = _messages.WARNING });
            }
        }

    }
}
