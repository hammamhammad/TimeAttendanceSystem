using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/allowance-assignments")]
[Authorize]
public class AllowanceAssignmentsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AllowanceAssignmentsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists allowance assignments with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? typeId = null,
        [FromQuery] AllowanceAssignmentStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AllowanceAssignments.AsNoTracking().AsQueryable();

        if (employeeId.HasValue)
            query = query.Where(x => x.EmployeeId == employeeId.Value);

        if (typeId.HasValue)
            query = query.Where(x => x.AllowanceTypeId == typeId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.AllowanceType.Name.Contains(search) ||
                x.Employee.FirstName.Contains(search) ||
                x.Employee.LastName.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AllowanceAssignmentDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                Amount = x.Amount,
                CalculationType = x.CalculationType,
                Percentage = x.Percentage,
                Currency = x.Currency,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Status = x.Status,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Notes = x.Notes,
                AllowanceRequestId = x.AllowanceRequestId,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single allowance assignment by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AllowanceAssignments
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AllowanceAssignmentDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                Amount = x.Amount,
                CalculationType = x.CalculationType,
                Percentage = x.Percentage,
                Currency = x.Currency,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Status = x.Status,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Notes = x.Notes,
                AllowanceRequestId = x.AllowanceRequestId,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Allowance assignment not found." });

        return Ok(item);
    }

    /// <summary>Gets all allowance assignments for a specific employee.</summary>
    [HttpGet("employees/{employeeId}")]
    public async Task<IActionResult> GetByEmployee(long employeeId, [FromQuery] AllowanceAssignmentStatus? status = null)
    {
        var query = _context.AllowanceAssignments
            .AsNoTracking()
            .Where(x => x.EmployeeId == employeeId);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        var items = await query
            .OrderBy(x => x.AllowanceType.Name)
            .Select(x => new AllowanceAssignmentDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                Amount = x.Amount,
                CalculationType = x.CalculationType,
                Percentage = x.Percentage,
                Currency = x.Currency,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Status = x.Status,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Notes = x.Notes,
                AllowanceRequestId = x.AllowanceRequestId,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Assigns a new allowance to an employee.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAllowanceAssignmentRequest request)
    {
        // Validate employee exists
        var employeeExists = await _context.Employees
            .AnyAsync(x => x.Id == request.EmployeeId);

        if (!employeeExists)
            return BadRequest(new { error = "Employee not found." });

        // Validate allowance type exists
        var typeExists = await _context.AllowanceTypes
            .AnyAsync(x => x.Id == request.AllowanceTypeId && x.IsActive);

        if (!typeExists)
            return BadRequest(new { error = "Allowance type not found or inactive." });

        var entity = new AllowanceAssignment
        {
            EmployeeId = request.EmployeeId,
            AllowanceTypeId = request.AllowanceTypeId,
            Amount = request.Amount,
            CalculationType = request.CalculationType,
            Percentage = request.Percentage,
            Currency = request.Currency ?? "SAR",
            EffectiveFromDate = request.EffectiveFromDate,
            EffectiveToDate = request.EffectiveToDate,
            Status = AllowanceAssignmentStatus.Active,
            AssignedByUserId = _currentUser.UserId,
            AssignedAt = DateTime.UtcNow,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Notes = request.Notes,
            AllowanceRequestId = request.AllowanceRequestId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceAssignments.Add(entity);

        // Create change log
        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = request.EmployeeId,
            AllowanceTypeId = request.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Added,
            PreviousAmount = null,
            NewAmount = request.Amount,
            PreviousPercentage = null,
            NewPercentage = request.Percentage,
            EffectiveDate = request.EffectiveFromDate,
            Reason = request.Reason,
            AllowanceRequestId = request.AllowanceRequestId,
            RelatedEntityId = null,
            RelatedEntityType = "AllowanceAssignment",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing allowance assignment.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAllowanceAssignmentRequest request)
    {
        var entity = await _context.AllowanceAssignments
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance assignment not found." });

        var previousAmount = entity.Amount;
        var previousPercentage = entity.Percentage;

        entity.Amount = request.Amount;
        entity.CalculationType = request.CalculationType;
        entity.Percentage = request.Percentage;
        entity.Currency = request.Currency ?? "SAR";
        entity.EffectiveFromDate = request.EffectiveFromDate;
        entity.EffectiveToDate = request.EffectiveToDate;
        entity.Reason = request.Reason;
        entity.ReasonAr = request.ReasonAr;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Create change log
        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Modified,
            PreviousAmount = previousAmount,
            NewAmount = request.Amount,
            PreviousPercentage = previousPercentage,
            NewPercentage = request.Percentage,
            EffectiveDate = request.EffectiveFromDate,
            Reason = request.Reason,
            RelatedEntityId = entity.Id,
            RelatedEntityType = "AllowanceAssignment",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Suspends an allowance assignment.</summary>
    [HttpPost("{id}/suspend")]
    public async Task<IActionResult> Suspend(long id, [FromBody] AllowanceStatusChangeRequest request)
    {
        var entity = await _context.AllowanceAssignments
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance assignment not found." });

        if (entity.Status != AllowanceAssignmentStatus.Active)
            return BadRequest(new { error = "Only active assignments can be suspended." });

        entity.Status = AllowanceAssignmentStatus.Suspended;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Suspended,
            PreviousAmount = entity.Amount,
            NewAmount = entity.Amount,
            PreviousPercentage = entity.Percentage,
            NewPercentage = entity.Percentage,
            EffectiveDate = DateTime.UtcNow,
            Reason = request.Reason,
            RelatedEntityId = entity.Id,
            RelatedEntityType = "AllowanceAssignment",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return Ok(new { status = entity.Status });
    }

    /// <summary>Resumes a suspended allowance assignment.</summary>
    [HttpPost("{id}/resume")]
    public async Task<IActionResult> Resume(long id, [FromBody] AllowanceStatusChangeRequest request)
    {
        var entity = await _context.AllowanceAssignments
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance assignment not found." });

        if (entity.Status != AllowanceAssignmentStatus.Suspended)
            return BadRequest(new { error = "Only suspended assignments can be resumed." });

        entity.Status = AllowanceAssignmentStatus.Active;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Resumed,
            PreviousAmount = entity.Amount,
            NewAmount = entity.Amount,
            PreviousPercentage = entity.Percentage,
            NewPercentage = entity.Percentage,
            EffectiveDate = DateTime.UtcNow,
            Reason = request.Reason,
            RelatedEntityId = entity.Id,
            RelatedEntityType = "AllowanceAssignment",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return Ok(new { status = entity.Status });
    }

    /// <summary>Cancels an allowance assignment.</summary>
    [HttpPost("{id}/cancel")]
    public async Task<IActionResult> Cancel(long id, [FromBody] AllowanceStatusChangeRequest request)
    {
        var entity = await _context.AllowanceAssignments
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance assignment not found." });

        if (entity.Status == AllowanceAssignmentStatus.Cancelled)
            return BadRequest(new { error = "Assignment is already cancelled." });

        entity.Status = AllowanceAssignmentStatus.Cancelled;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Removed,
            PreviousAmount = entity.Amount,
            NewAmount = 0,
            PreviousPercentage = entity.Percentage,
            NewPercentage = null,
            EffectiveDate = DateTime.UtcNow,
            Reason = request.Reason,
            RelatedEntityId = entity.Id,
            RelatedEntityType = "AllowanceAssignment",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return Ok(new { status = entity.Status });
    }

    /// <summary>Gets the total allowance summary for an employee.</summary>
    [HttpGet("employees/{employeeId}/summary")]
    public async Task<IActionResult> GetEmployeeSummary(long employeeId)
    {
        var assignments = await _context.AllowanceAssignments
            .AsNoTracking()
            .Where(x => x.EmployeeId == employeeId && x.Status == AllowanceAssignmentStatus.Active)
            .Select(x => new
            {
                x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                Category = x.AllowanceType.Category,
                x.Amount,
                x.CalculationType,
                x.Percentage,
                x.Currency
            })
            .ToListAsync();

        var totalFixedAmount = assignments
            .Where(x => x.CalculationType == CalculationType.Fixed)
            .Sum(x => x.Amount);

        var summary = new
        {
            employeeId,
            totalFixedAmount,
            activeAssignmentsCount = assignments.Count,
            assignments = assignments.Select(x => new
            {
                x.AllowanceTypeId,
                x.AllowanceTypeName,
                x.AllowanceTypeCode,
                x.Category,
                x.Amount,
                x.CalculationType,
                x.Percentage,
                x.Currency
            })
        };

        return Ok(summary);
    }
}

// ===========================
// DTOs and Request Records
// ===========================

public class AllowanceAssignmentDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public long AllowanceTypeId { get; set; }
    public string AllowanceTypeName { get; set; } = string.Empty;
    public string AllowanceTypeCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public CalculationType CalculationType { get; set; }
    public decimal? Percentage { get; set; }
    public string Currency { get; set; } = string.Empty;
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
    public AllowanceAssignmentStatus Status { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Notes { get; set; }
    public long? AllowanceRequestId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public record CreateAllowanceAssignmentRequest(
    long EmployeeId,
    long AllowanceTypeId,
    decimal Amount,
    CalculationType CalculationType,
    decimal? Percentage,
    string? Currency,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    string? Reason,
    string? ReasonAr,
    string? Notes,
    long? AllowanceRequestId
);

public record UpdateAllowanceAssignmentRequest(
    decimal Amount,
    CalculationType CalculationType,
    decimal? Percentage,
    string? Currency,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    string? Reason,
    string? ReasonAr,
    string? Notes
);

public record AllowanceStatusChangeRequest(
    string? Reason
);
