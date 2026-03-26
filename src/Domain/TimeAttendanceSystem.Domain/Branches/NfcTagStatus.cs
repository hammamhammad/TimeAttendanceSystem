namespace TimeAttendanceSystem.Domain.Branches;

/// <summary>
/// Represents the lifecycle status of an NFC tag.
/// Tags progress through registration → provisioning → active use,
/// and can be disabled or reported as lost.
/// </summary>
public enum NfcTagStatus
{
    /// <summary>Tag hardware detected but not yet registered in the system</summary>
    Unregistered = 0,
    /// <summary>Tag registered with UID and branch association, awaiting provisioning</summary>
    Registered = 1,
    /// <summary>Tag provisioned with encrypted payload and ready for attendance verification</summary>
    Active = 2,
    /// <summary>Tag temporarily disabled by admin (can be re-enabled)</summary>
    Disabled = 3,
    /// <summary>Tag reported as lost or stolen (permanent, cannot be re-enabled)</summary>
    Lost = 4
}
