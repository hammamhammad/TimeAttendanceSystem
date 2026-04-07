using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that checks for employee documents expiring within 30, 15, or 7 days
/// and creates notifications for HR users to take action.
/// </summary>
public class DocumentExpiryAlertJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DocumentExpiryAlertJob> _logger;

    public DocumentExpiryAlertJob(IApplicationDbContext context, ILogger<DocumentExpiryAlertJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting document expiry alert job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;
            var alertDays = new[] { 30, 15, 7 };

            var hrUserIds = await _context.UserRoles
                .Where(ur => ur.Role.Name == "HRManager" || ur.Role.Name == "SystemAdmin")
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync();

            if (!hrUserIds.Any())
            {
                _logger.LogWarning("No HR users found to send document expiry alerts");
                return;
            }

            foreach (var days in alertDays)
            {
                var targetDate = today.AddDays(days);
                var expiringDocs = await _context.EmployeeDocuments
                    .Include(d => d.Employee)
                    .Where(d => d.ExpiryDate != null
                        && d.ExpiryDate.Value.Date == targetDate
                        && d.VerificationStatus != DocumentVerificationStatus.Rejected
                        && !d.IsDeleted)
                    .ToListAsync();

                foreach (var doc in expiringDocs)
                {
                    foreach (var userId in hrUserIds)
                    {
                        var notification = new Notification
                        {
                            UserId = userId,
                            Type = NotificationType.ApprovalReminder,
                            TitleEn = $"Document Expiring in {days} Days",
                            TitleAr = $"مستند ينتهي خلال {days} يوم",
                            MessageEn = $"Document '{doc.DocumentName}' for {doc.Employee.FullName} expires on {doc.ExpiryDate:yyyy-MM-dd}.",
                            MessageAr = $"المستند '{doc.DocumentNameAr ?? doc.DocumentName}' للموظف {doc.Employee.FullNameAr ?? doc.Employee.FullName} ينتهي في {doc.ExpiryDate:yyyy-MM-dd}.",
                            EntityType = "EmployeeDocument",
                            EntityId = doc.Id,
                            IsRead = false,
                            CreatedAtUtc = DateTime.UtcNow,
                            CreatedBy = "SYSTEM"
                        };
                        _context.Notifications.Add(notification);
                    }
                }

                if (expiringDocs.Any())
                {
                    _logger.LogInformation("Found {Count} documents expiring in {Days} days", expiringDocs.Count, days);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Document expiry alert job completed at {Time}", DateTime.UtcNow);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running document expiry alert job");
            throw;
        }
    }
}
