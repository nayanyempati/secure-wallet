using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace secure_wallet_be.Entities;

[Table("users")]
public partial class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("first_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string FirstName { get; set; } = null!;

    [Column("last_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string LastName { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("password")]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("is_verified")]
    public int IsVerified { get; set; }

    [Column("photo")]
    [Unicode(false)]
    public string? Photo { get; set; }

    [Column("verified_on", TypeName = "datetime")]
    public DateTime? VerifiedOn { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("otp")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Otp { get; set; }

    [Column("password_reset_otp")]
    [StringLength(50)]
    [Unicode(false)]
    public string? PasswordResetOtp { get; set; }
}
