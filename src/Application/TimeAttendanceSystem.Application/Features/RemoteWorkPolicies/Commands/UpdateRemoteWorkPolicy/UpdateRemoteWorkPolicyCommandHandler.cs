using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkPolicies.Commands.UpdateRemoteWorkPolicy;

/// <summary>
/// Handler for updating an existing remote work policy.
/// </summary>
public class UpdateRemoteWorkPolicyCommandHandler : IRequestHandler<UpdateRemoteWorkPolicyCommand, Unit>
{
    private readonly IApplicationDbContext _context;

    public UpdateRemoteWorkPolicyCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateRemoteWorkPolicyCommand request, CancellationToken cancellationToken)
    {
        var policy = await _context.RemoteWorkPolicies
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        if (policy == null)
            throw new NotFoundException("Remote work policy not found");

        // Update properties
        policy.MaxDaysPerWeek = request.MaxDaysPerWeek;
        policy.MaxDaysPerMonth = request.MaxDaysPerMonth;
        policy.MaxDaysPerYear = request.MaxDaysPerYear;
        policy.RequiresManagerApproval = request.RequiresManagerApproval;
        policy.AllowConsecutiveDays = request.AllowConsecutiveDays;
        policy.MaxConsecutiveDays = request.MaxConsecutiveDays;
        policy.MinAdvanceNoticeDays = request.MinAdvanceNoticeDays;
        policy.BlackoutPeriods = request.BlackoutPeriods;
        policy.CountForOvertime = request.CountForOvertime;
        policy.EnforceShiftTimes = request.EnforceShiftTimes;
        policy.ModifiedAtUtc = DateTime.UtcNow;

        // Validate the updated configuration
        var (isValid, errors) = policy.ValidateConfiguration();
        if (!isValid)
            throw new ValidationException(string.Join(", ", errors));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}