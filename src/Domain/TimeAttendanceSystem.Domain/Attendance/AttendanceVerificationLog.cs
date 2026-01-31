using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Domain.Attendance;

/// <summary>
/// Domain entity representing an audit log entry for mobile attendance verification attempts.
/// Records both successful and failed dual-verification (GPS + NFC) check-in/out attempts
/// for security auditing, troubleshooting, and compliance purposes.
/// </summary>
/// <remarks>
/// Verification Audit Features:
/// - Complete record of all check-in/out attempts from mobile devices
/// - GPS location data for geofence validation auditing
/// - NFC tag data for verification failure analysis
/// - Device information for security and troubleshooting
/// 
/// Dual Verification Process:
/// 1. GPS Validation: Device location checked against branch coordinates + geofence radius
/// 2. NFC Validation: Scanned tag UID verified against registered branch tags
/// 3. Only when both validations pass is an attendance transaction created
/// 
/// Failure Tracking:
/// - GpsOutsideGeofence: Employee too far from branch location
/// - NfcTagMismatch: Scanned tag not registered to the branch
/// - NfcTagNotRegistered: Tag UID not in the system
/// - NfcTagInactive: Tag exists but is deactivated
/// - BranchNotConfigured: Branch missing GPS coordinates or NFC tags
/// - GpsUnavailable: Device could not determine location
/// </remarks>
public class AttendanceVerificationLog : BaseEntity
{
    /// <summary>
    /// Gets or sets the ID of the employee attempting to check in/out.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the ID of the branch where verification was attempted.
    /// </summary>
    public long BranchId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the verification was attempted.
    /// </summary>
    public DateTime AttemptedAt { get; set; }

    /// <summary>
    /// Gets or sets the type of transaction being attempted.
    /// </summary>
    public VerificationTransactionType TransactionType { get; set; }

    /// <summary>
    /// Gets or sets the outcome of the verification attempt.
    /// </summary>
    public VerificationStatus Status { get; set; }

    /// <summary>
    /// Gets or sets the reason for verification failure.
    /// Only populated when Status is Failed.
    /// </summary>
    public VerificationFailureReason? FailureReason { get; set; }

    /// <summary>
    /// Gets or sets the latitude reported by the employee's device.
    /// </summary>
    public double? DeviceLatitude { get; set; }

    /// <summary>
    /// Gets or sets the longitude reported by the employee's device.
    /// </summary>
    public double? DeviceLongitude { get; set; }

    /// <summary>
    /// Gets or sets the calculated distance in meters from the employee to the branch.
    /// </summary>
    public double? DistanceFromBranch { get; set; }

    /// <summary>
    /// Gets or sets the UID of the NFC tag that was scanned.
    /// </summary>
    public string? ScannedTagUid { get; set; }

    /// <summary>
    /// Gets or sets the expected NFC tag UID(s) for the branch.
    /// Stored as comma-separated values if multiple tags are registered.
    /// </summary>
    public string? ExpectedTagUids { get; set; }

    /// <summary>
    /// Gets or sets the unique identifier of the mobile device.
    /// </summary>
    public string? DeviceId { get; set; }

    /// <summary>
    /// Gets or sets the model/manufacturer of the mobile device.
    /// </summary>
    public string? DeviceModel { get; set; }

    /// <summary>
    /// Gets or sets the platform of the mobile device (iOS/Android).
    /// </summary>
    public string? DevicePlatform { get; set; }

    /// <summary>
    /// Gets or sets the version of the mobile app used for the attempt.
    /// </summary>
    public string? AppVersion { get; set; }

    /// <summary>
    /// Navigation property to the employee.
    /// </summary>
    public virtual Employee Employee { get; set; } = null!;

    /// <summary>
    /// Navigation property to the branch.
    /// </summary>
    public virtual Branch Branch { get; set; } = null!;
}

/// <summary>
/// Represents the type of attendance transaction being verified.
/// </summary>
public enum VerificationTransactionType
{
    /// <summary>Check-in at start of work</summary>
    CheckIn = 1,
    /// <summary>Check-out at end of work</summary>
    CheckOut = 2,
    /// <summary>Break start</summary>
    BreakStart = 3,
    /// <summary>Break end</summary>
    BreakEnd = 4
}

/// <summary>
/// Represents the outcome of a verification attempt.
/// </summary>
public enum VerificationStatus
{
    /// <summary>Both GPS and NFC verification passed</summary>
    Success = 1,
    /// <summary>One or both verifications failed</summary>
    Failed = 2
}

/// <summary>
/// Represents the specific reason for a verification failure.
/// </summary>
public enum VerificationFailureReason
{
    /// <summary>Device location is outside the branch geofence radius</summary>
    GpsOutsideGeofence = 1,
    /// <summary>Scanned NFC tag is registered to a different branch</summary>
    NfcTagMismatch = 2,
    /// <summary>Scanned NFC tag UID is not registered in the system</summary>
    NfcTagNotRegistered = 3,
    /// <summary>Scanned NFC tag exists but is marked as inactive</summary>
    NfcTagInactive = 4,
    /// <summary>Branch does not have GPS coordinates or NFC tags configured</summary>
    BranchNotConfigured = 5,
    /// <summary>Device could not determine GPS location</summary>
    GpsUnavailable = 6
}
