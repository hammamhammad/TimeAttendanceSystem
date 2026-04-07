using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SetupTracking.Dtos;

namespace TecAxle.Hrms.Application.SetupTracking.Commands.RecalculateSetupCompletion;

public record RecalculateSetupCompletionCommand : ICommand<Result<SetupStatusDto>>;
