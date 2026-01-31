using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;

/// <summary>
/// Handler for processing mobile attendance transactions with dual verification (GPS + NFC).
/// Validates GPS geofence, NFC tag, and creates audit logs for all attempts.
/// </summary>
public class ProcessMobileTransactionCommandHandler : BaseHandler<ProcessMobileTransactionCommand, Result<MobileTransactionResult>>
{
    public ProcessMobileTransactionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<MobileTransactionResult>> Handle(ProcessMobileTransactionCommand request, CancellationToken cancellationToken)
    {
        var attemptedAt = DateTime.UtcNow;

        // Get branch with GPS coordinates
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed, 
                VerificationFailureReason.BranchNotConfigured, null, cancellationToken);
            return CreateFailureResult("Branch not found");
        }

        // Verify employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.BranchNotConfigured, null, cancellationToken);
            return CreateFailureResult("Employee not found");
        }

        // ==== GPS GEOFENCE VERIFICATION ====
        double? distanceFromBranch = null;
        if (!branch.Latitude.HasValue || !branch.Longitude.HasValue)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.BranchNotConfigured, null, cancellationToken);
            return CreateFailureResult("Branch GPS coordinates not configured");
        }

        distanceFromBranch = CalculateDistance(
            request.DeviceLatitude, request.DeviceLongitude,
            branch.Latitude.Value, branch.Longitude.Value);

        if (distanceFromBranch > branch.GeofenceRadiusMeters)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.GpsOutsideGeofence, distanceFromBranch, cancellationToken);
            return CreateFailureResult($"You are {distanceFromBranch:F0} meters away from the branch. Maximum allowed: {branch.GeofenceRadiusMeters} meters");
        }

        // ==== NFC TAG VERIFICATION ====
        if (string.IsNullOrWhiteSpace(request.NfcTagUid))
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.GpsUnavailable, distanceFromBranch, cancellationToken);
            return CreateFailureResult("NFC tag scan is required");
        }

        var nfcTag = await Context.NfcTags
            .FirstOrDefaultAsync(t => t.TagUid == request.NfcTagUid, cancellationToken);

        if (nfcTag == null)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.NfcTagNotRegistered, distanceFromBranch, cancellationToken);
            return CreateFailureResult("NFC tag is not registered in the system");
        }

        if (!nfcTag.IsActive)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.NfcTagInactive, distanceFromBranch, cancellationToken);
            return CreateFailureResult("NFC tag is inactive");
        }

        if (nfcTag.BranchId != request.BranchId)
        {
            await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Failed,
                VerificationFailureReason.NfcTagMismatch, distanceFromBranch, cancellationToken);
            return CreateFailureResult("NFC tag does not belong to the selected branch");
        }

        // ==== VERIFICATION PASSED - CREATE TRANSACTION ====
        var transactionType = MapTransactionType(request.TransactionType);
        
        var transaction = new AttendanceTransaction
        {
            EmployeeId = request.EmployeeId,
            TransactionType = transactionType,
            TransactionTimeUtc = attemptedAt,
            TransactionTimeLocal = attemptedAt, // TODO: Convert to branch timezone
            AttendanceDate = attemptedAt.Date,
            IsManual = false,
            DeviceId = request.DeviceId,
            Notes = $"Mobile check-in via GPS+NFC verification. Distance: {distanceFromBranch:F1}m",
            Location = $"{request.DeviceLatitude},{request.DeviceLongitude}",
            CreatedAtUtc = attemptedAt,
            CreatedBy = CurrentUser.Username ?? "Mobile"
        };

        Context.AttendanceTransactions.Add(transaction);

        // Log successful verification
        await LogVerificationAttempt(request, attemptedAt, VerificationStatus.Success,
            null, distanceFromBranch, cancellationToken);

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(new MobileTransactionResult(
            Success: true,
            TransactionId: transaction.Id,
            Message: GetSuccessMessage(request.TransactionType),
            TransactionTime: attemptedAt
        ));
    }

    private async Task LogVerificationAttempt(
        ProcessMobileTransactionCommand request,
        DateTime attemptedAt,
        VerificationStatus status,
        VerificationFailureReason? failureReason,
        double? distanceFromBranch,
        CancellationToken cancellationToken)
    {
        // Get expected NFC tags for the branch
        var expectedTags = await Context.NfcTags
            .Where(t => t.BranchId == request.BranchId && t.IsActive)
            .Select(t => t.TagUid)
            .ToListAsync(cancellationToken);

        var log = new AttendanceVerificationLog
        {
            EmployeeId = request.EmployeeId,
            BranchId = request.BranchId,
            AttemptedAt = attemptedAt,
            TransactionType = MapToVerificationTransactionType(request.TransactionType),
            Status = status,
            FailureReason = failureReason,
            DeviceLatitude = request.DeviceLatitude,
            DeviceLongitude = request.DeviceLongitude,
            DistanceFromBranch = distanceFromBranch,
            ScannedTagUid = request.NfcTagUid,
            ExpectedTagUids = string.Join(",", expectedTags),
            DeviceId = request.DeviceId,
            DeviceModel = request.DeviceModel,
            DevicePlatform = request.DevicePlatform,
            AppVersion = request.AppVersion,
            CreatedAtUtc = attemptedAt,
            CreatedBy = CurrentUser.Username ?? "Mobile"
        };

        Context.AttendanceVerificationLogs.Add(log);
    }

    private static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        // Haversine formula for calculating distance between two GPS coordinates
        const double EarthRadiusMeters = 6371000;
        
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        
        return EarthRadiusMeters * c;
    }

    private static double ToRadians(double degrees) => degrees * Math.PI / 180;

    private static TransactionType MapTransactionType(MobileTransactionType mobileType) => mobileType switch
    {
        MobileTransactionType.CheckIn => TransactionType.CheckIn,
        MobileTransactionType.CheckOut => TransactionType.CheckOut,
        MobileTransactionType.BreakStart => TransactionType.BreakStart,
        MobileTransactionType.BreakEnd => TransactionType.BreakEnd,
        _ => TransactionType.CheckIn
    };

    private static VerificationTransactionType MapToVerificationTransactionType(MobileTransactionType mobileType) => mobileType switch
    {
        MobileTransactionType.CheckIn => VerificationTransactionType.CheckIn,
        MobileTransactionType.CheckOut => VerificationTransactionType.CheckOut,
        MobileTransactionType.BreakStart => VerificationTransactionType.BreakStart,
        MobileTransactionType.BreakEnd => VerificationTransactionType.BreakEnd,
        _ => VerificationTransactionType.CheckIn
    };

    private static string GetSuccessMessage(MobileTransactionType type) => type switch
    {
        MobileTransactionType.CheckIn => "Successfully checked in",
        MobileTransactionType.CheckOut => "Successfully checked out",
        MobileTransactionType.BreakStart => "Break started",
        MobileTransactionType.BreakEnd => "Break ended",
        _ => "Transaction recorded"
    };

    private static Result<MobileTransactionResult> CreateFailureResult(string message)
    {
        return Result.Success(new MobileTransactionResult(
            Success: false,
            TransactionId: null,
            Message: message,
            TransactionTime: null
        ));
    }
}
