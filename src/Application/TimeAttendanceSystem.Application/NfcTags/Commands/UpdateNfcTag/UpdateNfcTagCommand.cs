using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.UpdateNfcTag;

/// <summary>
/// Command to update an existing NFC tag's information.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record UpdateNfcTagCommand(
    long Id,
    long BranchId,
    string? Description,
    bool IsActive
) : ICommand<Result>;
