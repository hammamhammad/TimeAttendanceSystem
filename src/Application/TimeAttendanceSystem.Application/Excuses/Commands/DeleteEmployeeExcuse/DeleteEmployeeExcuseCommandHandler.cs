using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Excuses.Commands.DeleteEmployeeExcuse;

public class DeleteEmployeeExcuseCommandHandler : IRequestHandler<DeleteEmployeeExcuseCommand, Result<bool>>
{
    private readonly IApplicationDbContext _context;

    public DeleteEmployeeExcuseCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<bool>> Handle(DeleteEmployeeExcuseCommand request, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == request.Id && !e.IsDeleted, cancellationToken);

        if (excuse == null)
        {
            return Result.Failure<bool>("Employee excuse not found");
        }

        try
        {
            // Soft delete - mark as deleted instead of removing from database
            excuse.IsDeleted = true;
            excuse.ModifiedAtUtc = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to delete employee excuse: {ex.Message}");
        }
    }
}