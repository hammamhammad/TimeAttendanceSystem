using OtpNet;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using System.Security.Cryptography;

namespace TimeAttendanceSystem.Infrastructure.Services;

public class TwoFactorService : ITwoFactorService
{
    public string GenerateSecretKey()
    {
        var key = KeyGeneration.GenerateRandomKey(20);
        return Base32Encoding.ToString(key);
    }

    public string GenerateQrCodeUri(string email, string secretKey, string issuer = "TimeAttendanceSystem")
    {
        // Format: otpauth://totp/{issuer}:{email}?secret={secret}&issuer={issuer}
        return $"otpauth://totp/{Uri.EscapeDataString(issuer)}:{Uri.EscapeDataString(email)}?secret={secretKey}&issuer={Uri.EscapeDataString(issuer)}";
    }

    public Result<bool> ValidateCode(string secretKey, string code)
    {
        if (string.IsNullOrWhiteSpace(code) || code.Length != 6)
            return Result.Failure<bool>("Invalid code format. Code must be 6 digits.");

        if (!int.TryParse(code, out _))
            return Result.Failure<bool>("Code must contain only numbers.");

        try
        {
            var keyBytes = Base32Encoding.ToBytes(secretKey);
            var totp = new Totp(keyBytes);
            
            // Allow a 1-step window (30 seconds before/after) to account for clock drift
            var currentWindow = totp.ComputeTotp();
            var previousWindow = totp.ComputeTotp(DateTime.UtcNow.AddSeconds(-30));
            var nextWindow = totp.ComputeTotp(DateTime.UtcNow.AddSeconds(30));

            return code == currentWindow || code == previousWindow || code == nextWindow
                ? Result.Success(true)
                : Result.Failure<bool>("Invalid or expired code.");
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Error validating code: {ex.Message}");
        }
    }

    public string GenerateBackupCodes()
    {
        var codes = new List<string>();
        
        for (int i = 0; i < 10; i++)
        {
            var codeBytes = new byte[5];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(codeBytes);
            
            // Convert to readable format (e.g., "ABC12-DEF34")
            var code = Convert.ToBase64String(codeBytes)
                .Replace("+", "")
                .Replace("/", "")
                .Replace("=", "")
                .Substring(0, 8)
                .Insert(4, "-");
            
            codes.Add(code);
        }
        
        return string.Join(",", codes);
    }
}