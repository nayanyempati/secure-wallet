using Microsoft.IdentityModel.Tokens;
using secure_wallet_be.Models;
using shortid;
using shortid.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace secure_wallet_be.Helper
{
    public class Cryptography
    {
        public string HashPass(string password)
        {
            using (var sha512 = SHA512.Create())
            {
                var hashedBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public string GenerateOTP()
        {
            var options = new GenerationOptions(useNumbers: true, useSpecialCharacters:false);
            string id = ShortId.Generate(options);
            return id;
        }

        public TokenResponseModel GenerateAccessToken(int userId, string email)
        {
            TokenResponseModel tokenResponseModel = new TokenResponseModel();
            var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            var appSecret = config["AppSecret"];
            DateTime TokenExpiry = DateTime.Now.AddDays(1);
            DateTime TokenValidFrom = DateTime.Now;
            if (appSecret != null)
            {
                var key = Encoding.ASCII.GetBytes(appSecret);
                SymmetricSecurityKey securityKey = new SymmetricSecurityKey(key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                {
                  new Claim(ClaimTypes.Name, userId.ToString()),
                  new Claim(ClaimTypes.Email, email.ToString()),
                  new Claim(ClaimTypes.AuthenticationMethod, "Auth"),
                   new Claim(ClaimTypes.NameIdentifier, config["Issuer"]),
                }),
                    Expires = TokenExpiry,
                    SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature)
                };
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                JwtSecurityToken token = handler.CreateJwtSecurityToken(tokenDescriptor);
                tokenResponseModel = new TokenResponseModel
                {
                    AccessToken = handler.WriteToken(token),
                    Issuer = config["Issuer"],
                    ValidTo = TokenExpiry,
                    ValidFrom = TokenValidFrom,
                };
            }

            return tokenResponseModel;
        }

        public  string EncryptString(string key, string plainText)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }

            return Convert.ToBase64String(array);
        }

        public  string DecryptString(string key, string cipherText)
        {
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(cipherText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            return streamReader.ReadToEnd();
                        }
                    }
                }
            }
        }
    }
}
