using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using secure_wallet_be.Entities;
using secure_wallet_be.Helper;
using secure_wallet_be.Models;
using shortid;
using System.Security.Claims;
using static System.Net.WebRequestMethods;

namespace secure_wallet_be.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly Messages _messages = new Messages();
        private readonly Cryptography _hash = new Cryptography();
        public readonly Mailer _mailer = new Mailer();
        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;

        }

        [HttpGet("ping")]
        public async Task<ActionResult> Ping()
        {
            return Ok("Ping successfull");
        }

        [HttpPost("register")]
        public async Task<ResponseModel> Register([FromBody] RegisterModel register)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var checkUser = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == register.Email);
                if (checkUser == null)
                {
                    string OTP = _hash.GenerateOTP();
                    await _dbcon.Users.AddAsync(new Entities.User
                    {
                        Email = register.Email,
                        CreatedOn = DateTime.Now,
                        FirstName = register.FirstName,
                        LastName = register.LastName,
                        IsVerified = 0,
                        Password = _hash.HashPass(register.Password),
                        Photo = "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
                        Token = ShortId.Generate(),
                        Otp = OTP
                    });
                    _dbcon.SaveChanges();
                    
                    return new ResponseModel { Message = _messages.ACTIVATION_CODE_SENT_TO_REGISTERED_EMAIL, Status = _messages.SUCCESS };
                }
                return new ResponseModel { Message = _messages.EMAIL_EXSIST, Status = _messages.WARNING };
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel login)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var checkUser = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == login.Email && x.Password == _hash.HashPass(login.Password));
                if (checkUser != null)
                {
                    return Ok(_hash.GenerateAccessToken(checkUser.Id, checkUser.Email));
                }
                return Ok(new ResponseModel { Message = _messages.INVALID_EMAIL_PASSWORD, Status = _messages.WARNING });
            }
        }

        [HttpPost("forgot/{email}")]
        public async Task<ResponseModel> Forgot(string email)
        {

            using (dbcon _dbcon = new dbcon())
            {
                var checkUser = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (checkUser != null)
                {
                    string password = ShortId.Generate();
                    string OTP = _hash.GenerateOTP();
                    checkUser.Password = _hash.HashPass(password);
                    _dbcon.SaveChanges();
                    await _mailer.Sendmail("Password Reset Code", OTP, checkUser.FirstName, email, password);
                    return new ResponseModel { Message = _messages.PASSWORD_SENT, Status = _messages.SUCCESS };
                }
                return new ResponseModel { Message = _messages.PASSWORD_RESET_CODE_SENT_TO_REGISTERED_EMAIL, Status = _messages.SUCCESS };
            }
        }

      

        [HttpPost("changepassword"), Authorize]
        public async Task<ResponseModel> ChangePassword([FromBody] ChangePasswordModel change)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var identity = (ClaimsIdentity)User.Identity;
                int UserId = Convert.ToInt32(identity.Name);
                var checkUser = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId && x.Password == _hash.HashPass(change.OldPassword));
                if (checkUser != null)
                {
                    checkUser.Password = _hash.HashPass(change.NewPassword);
                    _dbcon.SaveChanges();
                    return new ResponseModel { Message = _messages.PASSWORD_CHANGED_SUCCESSFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseModel { Message = _messages.INVALID_OLD_PASSWORD, Status = _messages.WARNING };
            }
        }


        [HttpPatch("updateprofile"), Authorize]
        public async Task<ResponseModel> UpdateProfile([FromBody] UpdateProfileModel profile)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var identity = (ClaimsIdentity)User.Identity;
                int UserId = Convert.ToInt32(identity.Name);
                var checkUser = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                if (checkUser != null)
                {
                    checkUser.FirstName = profile.FirstName;
                    checkUser.LastName = profile.LastName;
                    _dbcon.SaveChanges();
                    return new ResponseModel { Message = _messages.UPDATED_SUCCESSFULLY, Status = _messages.SUCCESS };

                }
                return new ResponseModel { Message = _messages.DATE_NOT_FOUND, Status = _messages.WARNING };
            }

        }
        [HttpGet("userdetails"), Authorize]
        public async Task<ActionResult> UserDetails()
        {
            using (dbcon _dbcon = new dbcon())
            {
                var identity = (ClaimsIdentity)User.Identity;
                int UserId = Convert.ToInt32(identity.Name);
                var details = await (from U in _dbcon.Users
                                     where U.Id == UserId
                                     select new
                                     {
                                         U.FirstName,
                                         U.LastName,
                                         U.Email,
                                         U.Token,
                                         U.Photo,
                                         U.Id,

                                     }).FirstOrDefaultAsync();
                return Ok(details);

            }
        }

    }
}
