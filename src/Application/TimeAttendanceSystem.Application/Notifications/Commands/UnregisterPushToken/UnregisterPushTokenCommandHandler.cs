using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Notifications.Commands.UnregisterPushToken;

/// <summary>
/// Handler for unregistering push notification tokens.
/// </summary>
public class UnregisterPushTokenCommandHandler : BaseHandler<UnregisterPushTokenCommand, Result>
{
    public UnregisterPushTokenCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UnregisterPushTokenCommand request, CancellationToken cancellationToken)
    {
        var token = await Context.PushNotificationTokens
            .FirstOrDefaultAsync(t => t.DeviceId == request.DeviceId && t.IsActive, cancellationToken);

        if (token != null)
        {
            token.IsActive = false;
            token.ModifiedAtUtc = DateTime.UtcNow;
            token.ModifiedBy = CurrentUser.Username;
            await Context.SaveChangesAsync(cancellationToken);
        }

        return Result.Success();
    }
}
