using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.LockNfcTag;

/// <summary>
/// Command to apply permanent write-protection to an NFC tag.
/// WARNING: This action is irreversible!
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record LockNfcTagCommand(long Id) : ICommand<Result>;
