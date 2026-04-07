using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

public class CompensatoryOffExpiryJob : IInvocable
{
    private readonly IApplicationDbContext _context;

    public CompensatoryOffExpiryJob(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;

        var expiredCompOffs = await _context.CompensatoryOffs
            .Where(c => c.Status == CompensatoryOffStatus.Available
                && c.ExpiryDate < today
                && !c.IsDeleted)
            .ToListAsync();

        foreach (var compOff in expiredCompOffs)
        {
            compOff.Status = CompensatoryOffStatus.Expired;
            compOff.ModifiedAtUtc = DateTime.UtcNow;
            compOff.ModifiedBy = "SYSTEM";
        }

        if (expiredCompOffs.Any())
        {
            await _context.SaveChangesAsync(default);
            Console.WriteLine($"Expired {expiredCompOffs.Count} compensatory off(s)");
        }
    }
}
