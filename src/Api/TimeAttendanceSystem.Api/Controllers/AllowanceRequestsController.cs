using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/allowance-requests")]
[Authorize]
public class AllowanceRequestsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public AllowanceRequestsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists allowance requests with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] AllowanceRequestStatus? status = null,
        [FromQuery] long? typeId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AllowanceRequests.AsNoTracking().AsQueryable();

        if (employeeId.HasValue)
            query = query.Where(x => x.EmployeeId == employeeId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (typeId.HasValue)
            query = query.Where(x => x.AllowanceTypeId == typeId.Value);

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
            .Select(x => new AllowanceRequestDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                AllowancePolicyId = x.AllowancePolicyId,
                AllowancePolicyName = x.AllowancePolicy != null ? x.AllowancePolicy.Name : null,
                RequestType = x.RequestType,
                RequestedAmount = x.RequestedAmount,
                RequestedPercentage = x.RequestedPercentage,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Justification = x.Justification,
                SupportingDocumentUrl = x.SupportingDocumentUrl,
                Status = x.Status,
                RejectionReason = x.RejectionReason,
                ApprovalComments = x.ApprovalComments,
                ApprovedAt = x.ApprovedAt,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single allowance request by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.AllowanceRequests
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new AllowanceRequestDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                AllowancePolicyId = x.AllowancePolicyId,
                AllowancePolicyName = x.AllowancePolicy != null ? x.AllowancePolicy.Name : null,
                RequestType = x.RequestType,
                RequestedAmount = x.RequestedAmount,
                RequestedPercentage = x.RequestedPercentage,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Justification = x.Justification,
                SupportingDocumentUrl = x.SupportingDocumentUrl,
                Status = x.Status,
                RejectionReason = x.RejectionReason,
                ApprovalComments = x.ApprovalComments,
                ApprovedAt = x.ApprovedAt,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Allowance request not found." });

        return Ok(item);
    }

    /// <summary>Creates a new allowance request.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAllowanceRequestRequest request)
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

        var entity = new AllowanceRequest
        {
            EmployeeId = request.EmployeeId,
            AllowanceTypeId = request.AllowanceTypeId,
            AllowancePolicyId = request.AllowancePolicyId,
            RequestType = request.RequestType,
            RequestedAmount = request.RequestedAmount,
            RequestedPercentage = request.RequestedPercentage,
            EffectiveFromDate = request.EffectiveFromDate,
            EffectiveToDate = request.EffectiveToDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Justification = request.Justification,
            SupportingDocumentUrl = request.SupportingDocumentUrl,
            Status = AllowanceRequestStatus.Pending,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceRequests.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a pending allowance request.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateAllowanceRequestRequest request)
    {
        var entity = await _context.AllowanceRequests
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance request not found." });

        if (entity.Status != AllowanceRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be updated." });

        entity.AllowanceTypeId = request.AllowanceTypeId;
        entity.AllowancePolicyId = request.AllowancePolicyId;
        entity.RequestType = request.RequestType;
        entity.RequestedAmount = request.RequestedAmount;
        entity.RequestedPercentage = request.RequestedPercentage;
        entity.EffectiveFromDate = request.EffectiveFromDate;
        entity.EffectiveToDate = request.EffectiveToDate;
        entity.Reason = request.Reason;
        entity.ReasonAr = request.ReasonAr;
        entity.Justification = request.Justification;
        entity.SupportingDocumentUrl = request.SupportingDocumentUrl;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Approves an allowance request, creating an assignment and change log.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveAllowanceRequestRequest request)
    {
        var entity = await _context.AllowanceRequests
            .Include(x => x.AllowanceType)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance request not found." });

        if (entity.Status != AllowanceRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be approved." });

        // Update request status
        entity.Status = AllowanceRequestStatus.Approved;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ApprovalComments = request.Comments;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Create assignment from approved request
        var assignment = new AllowanceAssignment
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            Amount = request.ApprovedAmount ?? entity.RequestedAmount ?? 0,
            CalculationType = entity.AllowanceType.DefaultCalculationType,
            Percentage = request.ApprovedPercentage ?? entity.RequestedPercentage,
            Currency = "SAR",
            EffectiveFromDate = entity.EffectiveFromDate,
            EffectiveToDate = entity.EffectiveToDate,
            Status = AllowanceAssignmentStatus.Active,
            AssignedByUserId = _currentUser.UserId,
            AssignedAt = DateTime.UtcNow,
            Reason = entity.Reason,
            ReasonAr = entity.ReasonAr,
            AllowanceRequestId = entity.Id,
            Notes = request.Comments,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceAssignments.Add(assignment);

        // Create change log
        var changeLog = new AllowanceChangeLog
        {
            EmployeeId = entity.EmployeeId,
            AllowanceTypeId = entity.AllowanceTypeId,
            ChangeType = AllowanceChangeType.Added,
            PreviousAmount = null,
            NewAmount = assignment.Amount,
            PreviousPercentage = null,
            NewPercentage = assignment.Percentage,
            EffectiveDate = entity.EffectiveFromDate,
            Reason = $"Approved request #{entity.Id}: {request.Comments}",
            AllowanceRequestId = entity.Id,
            RelatedEntityId = entity.Id,
            RelatedEntityType = "AllowanceRequest",
            ChangedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.AllowanceChangeLogs.Add(changeLog);

        await _context.SaveChangesAsync();

        return Ok(new { requestId = entity.Id, assignmentId = assignment.Id });
    }

    /// <summary>Rejects an allowance request.</summary>
    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectAllowanceRequestRequest request)
    {
        var entity = await _context.AllowanceRequests
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance request not found." });

        if (entity.Status != AllowanceRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be rejected." });

        entity.Status = AllowanceRequestStatus.Rejected;
        entity.RejectionReason = request.Reason;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { status = entity.Status });
    }

    /// <summary>Withdraws an allowance request (by the employee).</summary>
    [HttpPost("{id}/withdraw")]
    public async Task<IActionResult> Withdraw(long id)
    {
        var entity = await _context.AllowanceRequests
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null)
            return NotFound(new { error = "Allowance request not found." });

        if (entity.Status != AllowanceRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be withdrawn." });

        entity.Status = AllowanceRequestStatus.Withdrawn;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { status = entity.Status });
    }

    /// <summary>Gets pending allowance requests for approvers.</summary>
    [HttpGet("pending")]
    public async Task<IActionResult> GetPending(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.AllowanceRequests
            .AsNoTracking()
            .Where(x => x.Status == AllowanceRequestStatus.Pending);

        // Apply branch scope for non-system admins
        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
        {
            query = query.Where(x => _currentUser.BranchIds.Contains(x.Employee.BranchId));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AllowanceRequestDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                AllowancePolicyId = x.AllowancePolicyId,
                AllowancePolicyName = x.AllowancePolicy != null ? x.AllowancePolicy.Name : null,
                RequestType = x.RequestType,
                RequestedAmount = x.RequestedAmount,
                RequestedPercentage = x.RequestedPercentage,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Justification = x.Justification,
                SupportingDocumentUrl = x.SupportingDocumentUrl,
                Status = x.Status,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets the current employee's own allowance requests.</summary>
    [HttpGet("my-requests")]
    public async Task<IActionResult> GetMyRequests(
        [FromQuery] AllowanceRequestStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        if (_currentUser.UserId == null)
            return Unauthorized(new { error = "User not authenticated." });

        // Get current employee from user context through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId);

        if (employeeLink == null)
            return NotFound(new { error = "Employee profile not found for current user." });

        var query = _context.AllowanceRequests
            .AsNoTracking()
            .Where(x => x.EmployeeId == employeeLink.EmployeeId);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new AllowanceRequestDto
            {
                Id = x.Id,
                EmployeeId = x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                AllowanceTypeId = x.AllowanceTypeId,
                AllowanceTypeName = x.AllowanceType.Name,
                AllowanceTypeCode = x.AllowanceType.Code,
                AllowancePolicyId = x.AllowancePolicyId,
                AllowancePolicyName = x.AllowancePolicy != null ? x.AllowancePolicy.Name : null,
                RequestType = x.RequestType,
                RequestedAmount = x.RequestedAmount,
                RequestedPercentage = x.RequestedPercentage,
                EffectiveFromDate = x.EffectiveFromDate,
                EffectiveToDate = x.EffectiveToDate,
                Reason = x.Reason,
                ReasonAr = x.ReasonAr,
                Justification = x.Justification,
                SupportingDocumentUrl = x.SupportingDocumentUrl,
                Status = x.Status,
                RejectionReason = x.RejectionReason,
                ApprovalComments = x.ApprovalComments,
                ApprovedAt = x.ApprovedAt,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }
}

// ===========================
// DTOs and Request Records
// ===========================

public class AllowanceRequestDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public long AllowanceTypeId { get; set; }
    public string AllowanceTypeName { get; set; } = string.Empty;
    public string AllowanceTypeCode { get; set; } = string.Empty;
    public long? AllowancePolicyId { get; set; }
    public string? AllowancePolicyName { get; set; }
    public AllowanceRequestType RequestType { get; set; }
    public decimal? RequestedAmount { get; set; }
    public decimal? RequestedPercentage { get; set; }
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Justification { get; set; }
    public string? SupportingDocumentUrl { get; set; }
    public AllowanceRequestStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public string? ApprovalComments { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public record CreateAllowanceRequestRequest(
    long EmployeeId,
    long AllowanceTypeId,
    long? AllowancePolicyId,
    AllowanceRequestType RequestType,
    decimal? RequestedAmount,
    decimal? RequestedPercentage,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    string? Reason,
    string? ReasonAr,
    string? Justification,
    string? SupportingDocumentUrl
);

public record UpdateAllowanceRequestRequest(
    long AllowanceTypeId,
    long? AllowancePolicyId,
    AllowanceRequestType RequestType,
    decimal? RequestedAmount,
    decimal? RequestedPercentage,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    string? Reason,
    string? ReasonAr,
    string? Justification,
    string? SupportingDocumentUrl
);

public record ApproveAllowanceRequestRequest(
    string? Comments,
    decimal? ApprovedAmount,
    decimal? ApprovedPercentage
);

public record RejectAllowanceRequestRequest(
    string Reason
);
