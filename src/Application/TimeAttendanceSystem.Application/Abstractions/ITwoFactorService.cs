using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Abstractions;

public interface ITwoFactorService
{
    string GenerateSecretKey();
    string GenerateQrCodeUri(string email, string secretKey, string issuer = "TecAxle.Hrms");
    Result<bool> ValidateCode(string secretKey, string code);
    string GenerateBackupCodes();
}