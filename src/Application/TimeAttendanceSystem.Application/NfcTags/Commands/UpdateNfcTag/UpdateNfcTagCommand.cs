using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.UpdateNfcTag;

/// <summary>
/// Command to update an existing NFC tag's information.
/// </summary>
public record UpdateNfcTagCommand(
    long Id,
    long BranchId,
    string? Description,
    bool IsActive
) : ICommand<Result>;
