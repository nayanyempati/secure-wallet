using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace secure_wallet_be.Entities;

public partial class dbcon : DbContext
{
    public dbcon()
    {
    }

    public dbcon(DbContextOptions<dbcon> options)
        : base(options)
    {
    }

    public virtual DbSet<CardDatum> CardData { get; set; }

    public virtual DbSet<Otp> Otps { get; set; }

    public virtual DbSet<Password> Passwords { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source=localhost; initial catalog=password_wallet; Integrated Security=True;  TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
