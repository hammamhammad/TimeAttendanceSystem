using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Application.Notifications.Commands.RegisterPushToken;

/// <summary>
/// Handler for registering/updating push notification tokens.
/// Manages device token lifecycle including updates and deactivation of old tokens.
/// </summary>
public class RegisterPushTokenCommandHandler : BaseHandler<RegisterPushTokenCommand, Result>
{
    public RegisterPushTokenCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(RegisterPushTokenCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.UserId.HasValue)
        {
            return Result.Failure("User not authenticated");
        }

        var userId = CurrentUser.UserId.Value;

        // Check if this device already has a token registered
        var existingToken = await Context.PushNotificationTokens
            .FirstOrDefaultAsync(t => t.DeviceId == request.DeviceId && t.IsActive, cancellationToken);

        if (existingToken != null)
        {
            // Update existing token
            existingToken.DeviceToken = request.DeviceToken;
            existingToken.UserId = userId;
            existingToken.Platform = request.Platform;
            existingToken.DeviceModel = request.DeviceModel;
            existingToken.AppVersion = request.AppVersion;
            existingToken.LastUsedAt = DateTime.UtcNow;
            existingToken.ModifiedAtUtc = DateTime.UtcNow;
            existingToken.ModifiedBy = CurrentUser.Username;
        }
        else
        {
            // Deactivate any other tokens for this user on the same platform (optional - multi-device support)
            // Uncomment if you want single device per platform:
            // var oldTokens = await Context.PushNotificationTokens
            //     .Where(t => t.UserId == userId && t.Platform == request.Platform && t.IsActive)
            //     .ToListAsync(cancellationToken);
            // foreach (var old in oldTokens)
            // {
            //     old.IsActive = false;
            //     old.ModifiedAtUtc = DateTime.UtcNow;
            // }

            // Create new token
            var newToken = new PushNotificationToken
            {
                UserId = userId,
                DeviceToken = request.DeviceToken,
                DeviceId = request.DeviceId,
                Platform = request.Platform,
                DeviceModel = request.DeviceModel,
                RegisteredAt = DateTime.UtcNow,
                AppVersion = request.AppVersion,
                IsActive = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "Mobile"
            };

            Context.PushNotificationTokens.Add(newToken);
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
