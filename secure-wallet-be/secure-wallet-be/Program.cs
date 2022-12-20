using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.IO.Compression;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);



//Authentication or Authorization Validation
var key = builder.Configuration.GetSection("AppSecret");
var keyBytes = Encoding.ASCII.GetBytes(key.Value);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddCookie(opts =>
{
    opts.Cookie.HttpOnly = true;
})
           .AddJwtBearer(x =>
           {
               x.RequireHttpsMetadata = false;
               x.SaveToken = true;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                   ValidateIssuer = false,
                   ValidateAudience = false,
               };
               x.Events = new JwtBearerEvents
               {
                   OnTokenValidated = async context =>
                   {
                       var userid = int.Parse(context.Principal.Identity.Name);
                       var _claimIdentity = context.Principal.Identities.Select(x => x.Claims).FirstOrDefault();
                       string AuthType = string.Empty;
                       string TwoFactor = string.Empty;
                       foreach (var identity in _claimIdentity)
                       {
                           if (identity.Type.Contains("http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod"))
                           {
                               AuthType = identity.Value.ToString();
                           }
                       }

                       if (AuthType == "Auth")
                       {
                       }
                       else
                       {
                           context.Fail("Unauthorized");
                       }

                       return;
                   }
               };
           });



builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.AddResponseCompression();
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});
new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory()));
builder.Services.AddMvc().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
    o.JsonSerializerOptions.DictionaryKeyPolicy = null;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.DefaultModelsExpandDepth(-1);
});
if (app.Environment.IsDevelopment())
{

    app.UseCors(corsPolicyBuilder =>
    {

        corsPolicyBuilder
        .WithOrigins("http://localhost:8100", "http://localhost:4200")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
         .AllowCredentials()
        .AllowAnyHeader();
    });
}
else
{
    app.UseCors(corsPolicyBuilder =>
    {
        corsPolicyBuilder
        .WithOrigins("http://localhost", "https://localhost")
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials()
        .AllowAnyHeader();
    });
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

