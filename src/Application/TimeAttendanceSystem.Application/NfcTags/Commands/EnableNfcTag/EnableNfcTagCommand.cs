using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Commands.EnableNfcTag;

/// <summary>
/// Command to re-enable a previously disabled NFC tag.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance)]
public record EnableNfcTagCommand(long Id) : ICommand<Result>;
