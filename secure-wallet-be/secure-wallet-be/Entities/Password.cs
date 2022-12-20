using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace secure_wallet_be.Entities;

[Table("passwords")]
public partial class Password
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [StringLength(500)]
    [Unicode(false)]
    public string Title { get; set; } = null!;

    [Column("url")]
    [Unicode(false)]
    public string Url { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("password")]
    [Unicode(false)]
    public string Password1 { get; set; } = null!;

    [Column("notes")]
    [Unicode(false)]
    public string? Notes { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;
}
