using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;

/// <summary>
/// Query to check if a location is within a branch's geofence.
/// </summary>
public record CheckLocationQuery(
    long BranchId,
    double Latitude,
    double Longitude
) : IRequest<Result<LocationCheckResult>>;

public record LocationCheckResult(
    bool IsWithinGeofence,
    double DistanceMeters,
    int GeofenceRadiusMeters,
    string BranchName
);
