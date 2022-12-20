namespace secure_wallet_be.Models
{
    public class AddPasswordModel
    {
        public string Title { get; set; } = null!;
        public string Url { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password1 { get; set; } = null!;
        public string? Notes { get; set; } 
        public string? Token { get; set; }
        public int? Id { get; set; }    
        public DateTime? CreatedOn { get; set; }    
    }
}
