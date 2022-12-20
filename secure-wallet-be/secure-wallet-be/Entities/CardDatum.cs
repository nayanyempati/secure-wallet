using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace secure_wallet_be.Entities;

[Table("card_data")]
public partial class CardDatum
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("card_number")]
    [Unicode(false)]
    public string CardNumber { get; set; } = null!;

    [Column("expiry")]
    public string Expiry { get; set; } = null!;

    [Column("card_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string CardName { get; set; } = null!;

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("card_type")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CardType { get; set; }
}
