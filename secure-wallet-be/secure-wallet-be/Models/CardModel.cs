namespace secure_wallet_be.Models
{
    public class CardModel
    {
        public int? Id { get; set; }
        public string CardNumber { get; set; } = null!;
        public string CardName { get; set; } = null!;
        public string? Token { get; set; }
        public string Expiry { get; set; } = null!;

    }
}
