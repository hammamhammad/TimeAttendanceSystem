using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EndOfService.Commands.CalculateEndOfService;

[RequiresModule(SystemModule.Offboarding)]
public record CalculateEndOfServiceCommand(long TerminationRecordId) : ICommand<Result<long>>;
