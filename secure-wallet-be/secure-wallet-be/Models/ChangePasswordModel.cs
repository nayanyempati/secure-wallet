namespace secure_wallet_be.Models
{
    public class ChangePasswordModel
    {
        public string NewPassword { get; set; } = null!;
        public string OldPassword { get; set;} = null!;
    }
}
