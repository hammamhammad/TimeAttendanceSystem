using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Branches.Commands.CreateBranch;

[RequiresLimit(LimitType.MaxBranches)]
public record CreateBranchCommand(
    string Code,
    string Name,
    string TimeZone,
    bool IsActive = true,
    double? Latitude = null,
    double? Longitude = null,
    int GeofenceRadiusMeters = 100
) : ICommand<Result<long>>;