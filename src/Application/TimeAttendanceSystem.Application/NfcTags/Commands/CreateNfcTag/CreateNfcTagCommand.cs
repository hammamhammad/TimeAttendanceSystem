using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.CreateNfcTag;

/// <summary>
/// Command to register a new NFC tag for a branch.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record CreateNfcTagCommand(
    string TagUid,
    long BranchId,
    string? Description
) : ICommand<Result<long>>;
