using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Abstractions;

public interface ITwoFactorService
{
    string GenerateSecretKey();
    string GenerateQrCodeUri(string email, string secretKey, string issuer = "TimeAttendanceSystem");
    Result<bool> ValidateCode(string secretKey, string code);
    string GenerateBackupCodes();
}