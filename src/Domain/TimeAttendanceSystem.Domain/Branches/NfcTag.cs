using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.Branches;

/// <summary>
/// Domain entity representing an NFC tag registered for branch check-in/out verification.
/// NFC tags are physical devices placed at branch locations that employees must scan
/// as part of the dual-verification attendance process (GPS + NFC).
/// </summary>
/// <remarks>
/// NFC Tag Features:
/// - Unique tag identification via hardware UID
/// - Branch association for location-based verification
/// - Write protection tracking for security compliance
/// - Active/inactive status for lifecycle management
/// 
/// Security Features:
/// - NFC tags can be permanently write-protected after provisioning
/// - Write protection is irreversible to prevent tampering
/// - Tag locking is audited with user and timestamp tracking
/// 
/// Verification Flow:
/// - Employee initiates check-in on mobile app
/// - App validates GPS location against branch geofence
/// - Employee scans NFC tag at branch entrance
/// - System validates scanned tag UID matches registered branch tag
/// - Transaction is created only if both verifications pass
/// </remarks>
public class NfcTag : BaseEntity
{
    /// <summary>
    /// Gets or sets the unique hardware identifier of the NFC tag.
    /// This is the UID read from the NFC chip and cannot be changed.
    /// </summary>
    /// <value>Alphanumeric UID from the NFC tag hardware (e.g., "04:A3:B2:C1:D0:E9:F8")</value>
    public string TagUid { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the ID of the branch this NFC tag is registered to.
    /// The tag will only validate for check-ins at this specific branch.
    /// </summary>
    public long BranchId { get; set; }

    /// <summary>
    /// Gets or sets a descriptive name for the NFC tag placement location.
    /// Helps administrators identify where the tag is physically installed.
    /// </summary>
    /// <value>Description such as "Main Entrance", "Back Door", "Parking Gate"</value>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets whether the NFC tag has been permanently write-protected.
    /// Once locked, the tag cannot be modified or repurposed.
    /// </summary>
    /// <value>True if tag is write-protected, false if still writable</value>
    public bool IsWriteProtected { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the tag was write-protected.
    /// </summary>
    public DateTime? LockedAt { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who applied write protection to the tag.
    /// </summary>
    public long? LockedByUserId { get; set; }

    /// <summary>
    /// Gets or sets whether the NFC tag is active and can be used for verification.
    /// Inactive tags will be rejected during check-in attempts.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Navigation property to the branch this tag is registered to.
    /// </summary>
    public virtual Branch Branch { get; set; } = null!;
}
