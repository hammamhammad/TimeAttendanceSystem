using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Infrastructure.Security;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly IConfiguration _configuration;

    public JwtTokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateAccessToken(User user, IReadOnlyList<string> roles, IReadOnlyList<string> permissions, IReadOnlyList<long> branchIds, bool rememberMe = false)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!)),
            SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new("preferred_language", user.PreferredLanguage),
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        foreach (var permission in permissions)
        {
            claims.Add(new Claim("permission", permission));
        }

        foreach (var branchId in branchIds)
        {
            claims.Add(new Claim("branch_scope", branchId.ToString()));
        }

        var securityToken = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: GetTokenExpiration(rememberMe),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public string GenerateRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    public DateTime GetTokenExpiration(bool rememberMe = false)
    {
        if (rememberMe)
        {
            var rememberMeDays = _configuration.GetValue<int>("Jwt:RememberMeDays", 7);
            return DateTime.UtcNow.AddDays(rememberMeDays);
        }

        var expiryMinutes = _configuration.GetValue<int>("Jwt:ExpiryMinutes", 15);
        return DateTime.UtcNow.AddMinutes(expiryMinutes);
    }
}
