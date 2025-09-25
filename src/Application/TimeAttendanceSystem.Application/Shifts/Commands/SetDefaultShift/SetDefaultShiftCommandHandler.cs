using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Commands.SetDefaultShift;

public class SetDefaultShiftCommandHandler : IRequestHandler<SetDefaultShiftCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public SetDefaultShiftCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(SetDefaultShiftCommand request, CancellationToken cancellationToken)
    {
        // Check if the shift exists
        var targetShift = await _context.Shifts
            .Where(s => s.Id == request.ShiftId && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (targetShift == null)
        {
            return Result.Failure("Shift not found");
        }

        // Check if the shift is already the default
        if (targetShift.IsDefault)
        {
            return Result.Success(); // Already the default, no action needed
        }

        // Check if there's already a default shift
        var existingDefaultShift = await _context.Shifts
            .Where(s => s.IsDefault && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        // If there's an existing default and we're not forcing replacement, return conflict result
        if (existingDefaultShift != null && !request.ForceReplace)
        {
            return Result.Failure($"A default shift already exists: '{existingDefaultShift.Name}'. Use ForceReplace=true to replace it.");
        }

        try
        {
            // Remove default flag from existing default shift
            if (existingDefaultShift != null)
            {
                existingDefaultShift.IsDefault = false;
            }

            // Set the new default shift
            targetShift.IsDefault = true;

            // Save changes (EF Core will handle this atomically)
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to set default shift: {ex.Message}");
        }
    }
}