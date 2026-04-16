using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/clearance")]
[Authorize]
public class ClearanceController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly ILifecycleEventPublisher _lifecyclePublisher;

    public ClearanceController(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ILifecycleEventPublisher lifecyclePublisher)
    {
        _context = context;
        _currentUser = currentUser;
        _lifecyclePublisher = lifecyclePublisher;
    }

    [HttpGet("{terminationId}")]
    public async Task<IActionResult> GetByTermination(long terminationId)
    {
        var checklist = await _context.ClearanceChecklists
            .Include(c => c.Items.Where(i => !i.IsDeleted).OrderBy(i => i.DisplayOrder))
            .Include(c => c.Employee)
            .Where(c => c.TerminationRecordId == terminationId && !c.IsDeleted)
            .FirstOrDefaultAsync();

        if (checklist == null)
            return NotFound(new { error = "Clearance checklist not found." });

        return Ok(new
        {
            checklist.Id,
            checklist.TerminationRecordId,
            checklist.EmployeeId,
            EmployeeName = checklist.Employee.FirstName + " " + checklist.Employee.LastName,
            checklist.OverallStatus,
            checklist.CompletedAt,
            Items = checklist.Items.Select(i => new
            {
                i.Id,
                i.Department,
                i.ItemName,
                i.ItemNameAr,
                i.Description,
                i.IsCompleted,
                i.CompletedByUserId,
                i.CompletedAt,
                i.Notes,
                i.DisplayOrder
            })
        });
    }

    [HttpPost("{terminationId}/initialize")]
    public async Task<IActionResult> Initialize(long terminationId)
    {
        var termination = await _context.TerminationRecords
            .FirstOrDefaultAsync(t => t.Id == terminationId && !t.IsDeleted);

        if (termination == null)
            return NotFound(new { error = "Termination record not found." });

        var exists = await _context.ClearanceChecklists
            .AnyAsync(c => c.TerminationRecordId == terminationId && !c.IsDeleted);

        if (exists)
            return BadRequest(new { error = "Clearance checklist already exists for this termination." });

        var checklist = new ClearanceChecklist
        {
            TerminationRecordId = terminationId,
            EmployeeId = termination.EmployeeId,
            OverallStatus = ClearanceStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.ClearanceChecklists.Add(checklist);
        await _context.SaveChangesAsync();

        var defaultItems = new List<ClearanceItem>
        {
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Return laptop and equipment", ItemNameAr = "إعادة اللابتوب والمعدات", DisplayOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Revoke system access", ItemNameAr = "إلغاء صلاحيات النظام", DisplayOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Settle outstanding advances", ItemNameAr = "تسوية السلف المستحقة", DisplayOrder = 3, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Return company credit card", ItemNameAr = "إعادة بطاقة الشركة الائتمانية", DisplayOrder = 4, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return access card and keys", ItemNameAr = "إعادة بطاقة الدخول والمفاتيح", DisplayOrder = 5, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return parking permit", ItemNameAr = "إعادة تصريح المواقف", DisplayOrder = 6, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Complete exit interview", ItemNameAr = "إتمام مقابلة نهاية الخدمة", DisplayOrder = 7, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Sign final settlement", ItemNameAr = "توقيع التسوية النهائية", DisplayOrder = 8, CreatedAtUtc = DateTime.UtcNow, CreatedBy = _currentUser.Username ?? "system" },
        };

        _context.ClearanceItems.AddRange(defaultItems);
        await _context.SaveChangesAsync();

        return Ok(new { id = checklist.Id });
    }

    [HttpPost("items/{itemId}/complete")]
    public async Task<IActionResult> CompleteItem(long itemId)
    {
        var item = await _context.ClearanceItems
            .Include(i => i.ClearanceChecklist)
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted);

        if (item == null)
            return NotFound(new { error = "Clearance item not found." });

        item.IsCompleted = true;
        item.CompletedByUserId = _currentUser.UserId;
        item.CompletedAt = DateTime.UtcNow;
        item.ModifiedAtUtc = DateTime.UtcNow;
        item.ModifiedBy = _currentUser.Username;

        // Check if all items completed
        var allCompleted = await _context.ClearanceItems
            .Where(i => i.ClearanceChecklistId == item.ClearanceChecklistId && !i.IsDeleted && i.Id != itemId)
            .AllAsync(i => i.IsCompleted);

        var flippedToCompleted = false;
        if (allCompleted)
        {
            flippedToCompleted = item.ClearanceChecklist.OverallStatus != ClearanceStatus.Completed;
            item.ClearanceChecklist.OverallStatus = ClearanceStatus.Completed;
            item.ClearanceChecklist.CompletedAt = DateTime.UtcNow;
            item.ClearanceChecklist.ModifiedAtUtc = DateTime.UtcNow;
            item.ClearanceChecklist.ModifiedBy = _currentUser.Username;
        }
        else
        {
            item.ClearanceChecklist.OverallStatus = ClearanceStatus.InProgress;
            item.ClearanceChecklist.ModifiedAtUtc = DateTime.UtcNow;
            item.ClearanceChecklist.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();

        // v13.5: only fire the lifecycle event once per transition to Completed.
        if (flippedToCompleted)
        {
            await _lifecyclePublisher.PublishAsync(
                new ClearanceCompletedEvent(
                    item.ClearanceChecklist.Id,
                    item.ClearanceChecklist.TerminationRecordId,
                    item.ClearanceChecklist.EmployeeId,
                    _currentUser.UserId),
                HttpContext.RequestAborted);
        }

        return NoContent();
    }

    [HttpPost("items/{itemId}/uncomplete")]
    public async Task<IActionResult> UncompleteItem(long itemId)
    {
        var item = await _context.ClearanceItems
            .Include(i => i.ClearanceChecklist)
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted);

        if (item == null)
            return NotFound(new { error = "Clearance item not found." });

        item.IsCompleted = false;
        item.CompletedByUserId = null;
        item.CompletedAt = null;
        item.ModifiedAtUtc = DateTime.UtcNow;
        item.ModifiedBy = _currentUser.Username;

        item.ClearanceChecklist.OverallStatus = ClearanceStatus.InProgress;
        item.ClearanceChecklist.CompletedAt = null;
        item.ClearanceChecklist.ModifiedAtUtc = DateTime.UtcNow;
        item.ClearanceChecklist.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("pending")]
    public async Task<IActionResult> GetPending()
    {
        var checklists = await _context.ClearanceChecklists
            .Include(c => c.Employee)
            .Include(c => c.Items.Where(i => !i.IsDeleted))
            .Where(c => c.OverallStatus != ClearanceStatus.Completed && !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAtUtc)
            .Select(c => new
            {
                c.Id,
                c.TerminationRecordId,
                c.EmployeeId,
                EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                c.OverallStatus,
                TotalItems = c.Items.Count,
                CompletedItems = c.Items.Count(i => i.IsCompleted),
                c.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(checklists);
    }
}
