using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.DeleteNfcTag;

/// <summary>
/// Command to deactivate (soft delete) an NFC tag.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record DeleteNfcTagCommand(long Id) : ICommand<Result>;
