using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SetupTracking.Dtos;

namespace TecAxle.Hrms.Application.SetupTracking.Queries.GetSetupStatus;

public record GetSetupStatusQuery : ICommand<Result<SetupStatusDto>>;
