using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.NfcTags.Commands.CreateNfcTag;

/// <summary>
/// Command to register a new NFC tag for a branch.
/// </summary>
public record CreateNfcTagCommand(
    string TagUid,
    long BranchId,
    string? Description
) : ICommand<Result<long>>;
