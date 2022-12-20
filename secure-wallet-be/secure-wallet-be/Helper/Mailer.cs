using Microsoft.VisualBasic;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace secure_wallet_be.Helper
{
    public class Mailer
    {
        private Messages _messages = new Messages();
        public async Task<string> Sendmail(string subject, string otp, string firstname, string email, string newpassword)
        {
           
            using (var mail = new MailMessage())
            {
                var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
                mail.From = new MailAddress(config["EmailConfiguration:Email"]);
                mail.To.Add(email);
                mail.IsBodyHtml = true;
                mail.Body = "Hi "+firstname+ "<br> We have recived your request to change the password.  We have generated a new password, use below password to login to your account.<br>.<br> <strong>Note: It is highly recommended to change the password on your first login</strong><br><br> New Password: <strong>" + newpassword+ "<br><br>Thank you for using secure wallet.<br><br>Regards<br>Team Secure Wallet.";
                mail.Subject = "Securewallet - Password Changed";
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Host = config["EmailConfiguration:SmtpServer"];
                smtpClient.Port = Convert.ToInt32(config["EmailConfiguration:Port"]);
                smtpClient.Credentials = new System.Net.NetworkCredential(config["EmailConfiguration:Email"].ToString(), config["EmailConfiguration:Password"].ToString());
                smtpClient.EnableSsl = true;
                try
                {
                    Task t = Task.Run(async () =>
                    {
                        await smtpClient.SendMailAsync(mail);
                    });
                    t.Wait();
                    return _messages.PASSWORD_SENT;
                }
                catch (IOException e)
                {
                    return e.Message;
                }
                catch (FormatException e)
                {
                    return e.Message;
                }
                catch (TimeoutException e)
                {
                    return e.Message;
                }
            }
        }
        public enum CardType
        {
            MasterCard, Visa, AmericanExpress, Discover, JCB, Others
        };

        public string  FindType(string cardNumber)
        {
            //https://www.regular-expressions.info/creditcard.html
            if (Regex.Match(cardNumber, @"^4[0-9]{12}(?:[0-9]{3})?$").Success)
            {
                return "Visa";
            }

            if (Regex.Match(cardNumber, @"^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$").Success)
            {
                return "MasterCard";
            }

            if (Regex.Match(cardNumber, @"^3[47][0-9]{13}$").Success)
            {
                return "AmericanExpress";
            }

            if (Regex.Match(cardNumber, @"^6(?:011|5[0-9]{2})[0-9]{12}$").Success)
            {
                return "Discover";
            }

            if (Regex.Match(cardNumber, @"^(?:2131|1800|35\d{3})\d{11}$").Success)
            {
                return "JCB";
            }

            return "Others";
        }

    }
}
