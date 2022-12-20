using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using secure_wallet_be.Entities;
using secure_wallet_be.Helper;
using secure_wallet_be.Models;
using shortid;
using System.Security.Claims;

namespace secure_wallet_be.Controllers
{
    [Route("api/password")]
    [ApiController, Authorize]
    public class PasswordController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly Messages _messages = new Messages();
        private readonly Cryptography _hash = new Cryptography();
        public readonly Mailer _mailer = new Mailer();
        public PasswordController(ILogger<PasswordController> logger)
        {
            _logger = logger;

        }
         [HttpGet("search/{key}")]
        public async Task<List<Password>> Search(string key)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Passwords.Where(x => x.UserId == UserId && x.Title.Contains(key) || x.Email.Contains(key)).ToListAsync();
            }
        }
        [HttpGet("list")]
        public async Task<List<Password>> ListPassword()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Passwords.Where(x => x.UserId==UserId).ToListAsync();
            }
        }

        [HttpGet("list/{key}")]
        public async Task<List<Password>> SearchPassword(string key)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Passwords.Where(x => x.UserId == UserId && x.Title.Contains(key) || x.Email.Contains(key)).ToListAsync();
            }
        }

        [HttpPost("add")]
        public async Task<ResponseModel> Add([FromBody] AddPasswordModel password)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            using (dbcon _dbcon = new dbcon())
            {
            
                try
                {
                    var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                    var details = await _dbcon.Passwords.AddAsync(new Password
                    {
                        CreatedOn = DateTime.Now,
                        Email = password.Email,
                        Notes = password.Notes,
                        Password1 = _hash.EncryptString("bPdSgVkYp3s6v6y$", password.Password1),
                        Title = password.Title,
                        Token = ShortId.Generate(),
                        Url = password.Url,
                        UserId = UserId
                    });
                    _dbcon.SaveChanges();
                }
                catch(Exception ex)
                {

                }
               
                return new ResponseModel { Message = _messages.PASSWORD_ADDED_SUCCESSFULLY, Status = _messages.SUCCESS };

            }
        }

        [HttpPut("update/{token}")]
        public async Task<ResponseModel> Update([FromBody] AddPasswordModel password, string token)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);

            using (dbcon _dbcon = new dbcon())
            {
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                var passwordDetails = await _dbcon.Passwords.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (passwordDetails != null)
                {
                    passwordDetails.Url = password.Url;
                    passwordDetails.Email = password.Email;
                    passwordDetails.Title = password.Title;
                    passwordDetails.Notes = password.Notes;
                    passwordDetails.Password1 = _hash.EncryptString("bPdSgVkYp3s6v6y$", password.Password1);
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
                var passwordDetails = await _dbcon.Passwords.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (passwordDetails != null)
                {
                    _dbcon.Remove(passwordDetails);
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
                var passDetails = await _dbcon.Passwords.FirstOrDefaultAsync(x => x.Token == token && x.UserId == UserId);
                if (passDetails != null)
                {
                    var details = new Password
                    {
                        Password1 = _hash.DecryptString("bPdSgVkYp3s6v6y$", passDetails.Password1),
                        Email=passDetails.Email,
                        Url= passDetails.Url,
                        Notes=passDetails.Notes,
                        Title=passDetails.Title,
                        Id = passDetails.Id,
                        CreatedOn= passDetails.CreatedOn,
                        UserId= passDetails.UserId,
                        Token = passDetails.Token
                    };
                    return Ok(details);
                }
                return Ok(new ResponseModel { Message = _messages.UN_AUTHORIZED, Status = _messages.WARNING });
            }
        }
    }
}
