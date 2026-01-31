using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;

/// <summary>
/// Command to process a mobile attendance transaction with GPS + NFC dual verification.
/// </summary>
public record ProcessMobileTransactionCommand(
    long EmployeeId,
    long BranchId,
    MobileTransactionType TransactionType,
    double DeviceLatitude,
    double DeviceLongitude,
    string? NfcTagUid,
    string DeviceId,
    string? DeviceModel,
    string DevicePlatform,
    string? AppVersion
) : IRequest<Result<MobileTransactionResult>>;

public enum MobileTransactionType
{
    CheckIn = 1,
    CheckOut = 2,
    BreakStart = 3,
    BreakEnd = 4
}

public record MobileTransactionResult(
    bool Success,
    long? TransactionId,
    string Message,
    DateTime? TransactionTime
);
