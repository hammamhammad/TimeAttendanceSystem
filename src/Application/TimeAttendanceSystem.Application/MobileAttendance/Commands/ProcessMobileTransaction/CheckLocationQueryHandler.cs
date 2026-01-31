using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;

/// <summary>
/// Handler for checking if a location is within a branch's geofence.
/// </summary>
public class CheckLocationQueryHandler : BaseHandler<CheckLocationQuery, Result<LocationCheckResult>>
{
    public CheckLocationQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<LocationCheckResult>> Handle(CheckLocationQuery request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
        {
            return Result.Failure<LocationCheckResult>("Branch not found");
        }

        if (!branch.Latitude.HasValue || !branch.Longitude.HasValue)
        {
            return Result.Failure<LocationCheckResult>("Branch GPS coordinates not configured");
        }

        var distance = CalculateDistance(
            request.Latitude, request.Longitude,
            branch.Latitude.Value, branch.Longitude.Value);

        var isWithinGeofence = distance <= branch.GeofenceRadiusMeters;

        return Result.Success(new LocationCheckResult(
            IsWithinGeofence: isWithinGeofence,
            DistanceMeters: distance,
            GeofenceRadiusMeters: branch.GeofenceRadiusMeters,
            BranchName: branch.Name
        ));
    }

    private static double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        const double EarthRadiusMeters = 6371000;
        
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        
        return EarthRadiusMeters * c;
    }

    private static double ToRadians(double degrees) => degrees * Math.PI / 180;
}
