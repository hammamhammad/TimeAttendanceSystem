using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EndOfService.Commands.CalculateEndOfService;

public record CalculateEndOfServiceCommand(long TerminationRecordId) : ICommand<Result<long>>;
