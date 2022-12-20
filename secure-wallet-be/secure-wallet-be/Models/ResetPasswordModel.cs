namespace secure_wallet_be.Models
{
    public class ResetPasswordModel
    {
        public string Password { get; set; } = null!;
        public string ConfirmPassword { get; set; } = null!;
    }
}
