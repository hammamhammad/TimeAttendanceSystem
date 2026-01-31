using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.UpdateBranchCoordinates;

/// <summary>
/// Command to update the GPS coordinates and geofence radius for a branch.
/// Used for configuring mobile check-in location validation.
/// </summary>
public record UpdateBranchCoordinatesCommand(
    long Id,
    double? Latitude,
    double? Longitude,
    int GeofenceRadiusMeters = 100
) : ICommand<Result>;
