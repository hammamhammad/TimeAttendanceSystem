namespace TimeAttendanceSystem.Application.Authorization.Commands.EnableTwoFactor;

public record EnableTwoFactorResponse(
    string SecretKey,
    string QrCodeUri,
    string[] BackupCodes);