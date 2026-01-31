using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Branches.Commands.UpdateBranchCoordinates;

/// <summary>
/// Handler for updating branch GPS coordinates and geofence radius.
/// Validates the coordinates and updates the branch entity.
/// </summary>
public class UpdateBranchCoordinatesCommandHandler : BaseHandler<UpdateBranchCoordinatesCommand, Result>
{
    public UpdateBranchCoordinatesCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateBranchCoordinatesCommand request, CancellationToken cancellationToken)
    {
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.Id, cancellationToken);
        
        if (branch == null)
        {
            return Result.Failure("Branch not found");
        }

        // Validate coordinates if provided
        if (request.Latitude.HasValue || request.Longitude.HasValue)
        {
            if (!request.Latitude.HasValue || !request.Longitude.HasValue)
            {
                return Result.Failure("Both latitude and longitude must be provided together");
            }

            // Validate latitude range (-90 to 90)
            if (request.Latitude.Value < -90 || request.Latitude.Value > 90)
            {
                return Result.Failure("Latitude must be between -90 and 90 degrees");
            }

            // Validate longitude range (-180 to 180)
            if (request.Longitude.Value < -180 || request.Longitude.Value > 180)
            {
                return Result.Failure("Longitude must be between -180 and 180 degrees");
            }
        }

        // Validate geofence radius (minimum 10 meters, maximum 5000 meters)
        if (request.GeofenceRadiusMeters < 10 || request.GeofenceRadiusMeters > 5000)
        {
            return Result.Failure("Geofence radius must be between 10 and 5000 meters");
        }

        branch.Latitude = request.Latitude;
        branch.Longitude = request.Longitude;
        branch.GeofenceRadiusMeters = request.GeofenceRadiusMeters;
        branch.ModifiedAtUtc = DateTime.UtcNow;
        branch.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
