using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Onboarding;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Recruitment;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/offer-letters")]
[Authorize]
public class OfferLettersController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly TecAxleDbContext _dbContext;
    private readonly ILifecycleEventPublisher _lifecyclePublisher;

    public OfferLettersController(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        TecAxleDbContext dbContext,
        ILifecycleEventPublisher lifecyclePublisher)
    {
        _context = context;
        _currentUser = currentUser;
        _dbContext = dbContext;
        _lifecyclePublisher = lifecyclePublisher;
    }

    /// <summary>Returns the tenant-configured default probation days (fallback 90 when no settings row exists).</summary>
    private async Task<int> GetDefaultProbationDaysAsync()
    {
        var settings = await _context.CompanySettings
            .AsNoTracking()
            .FirstOrDefaultAsync(s => !s.IsDeleted);
        return settings?.DefaultProbationDays > 0 ? settings.DefaultProbationDays : 90;
    }

    /// <summary>v13.5: optional pre-hire gate. Default false.</summary>
    private async Task<bool> IsPreHireModeEnabledAsync()
    {
        var settings = await _context.CompanySettings
            .AsNoTracking()
            .FirstOrDefaultAsync(s => !s.IsDeleted);
        return settings?.CreateEmployeeInactiveAtOfferAcceptance == true;
    }

    /// <summary>Lists offer letters with optional filters and pagination.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? applicationId,
        [FromQuery] OfferStatus? status,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.OfferLetters
            .Include(o => o.Candidate)
            .Include(o => o.JobApplication).ThenInclude(a => a.JobPosting).ThenInclude(p => p.JobRequisition)
            .Where(o => !o.IsDeleted);

        if (applicationId.HasValue)
            query = query.Where(o => o.JobApplicationId == applicationId.Value);
        if (status.HasValue)
            query = query.Where(o => o.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(o =>
                o.Candidate.FirstName.Contains(search) ||
                o.Candidate.LastName.Contains(search) ||
                o.JobTitle.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(o => o.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new OfferLetterListDto
            {
                Id = o.Id,
                JobApplicationId = o.JobApplicationId,
                CandidateId = o.CandidateId,
                CandidateName = o.Candidate.FirstName + " " + o.Candidate.LastName,
                JobTitle = o.JobTitle,
                JobTitleAr = o.JobTitleAr,
                OfferedSalary = o.OfferedSalary,
                Currency = o.Currency,
                ContractType = o.ContractType,
                StartDate = o.StartDate,
                ExpiryDate = o.ExpiryDate,
                Status = o.Status,
                CreatedEmployeeId = o.CreatedEmployeeId,
                CreatedAtUtc = o.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets an offer letter by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.OfferLetters
            .Include(o => o.Candidate)
            .Include(o => o.JobApplication).ThenInclude(a => a.JobPosting).ThenInclude(p => p.JobRequisition).ThenInclude(r => r.Branch)
            .Include(o => o.JobApplication).ThenInclude(a => a.JobPosting).ThenInclude(p => p.JobRequisition).ThenInclude(r => r.Department)
            .Include(o => o.JobGrade)
            .Include(o => o.CreatedEmployee)
            .Where(o => o.Id == id && !o.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Offer letter not found." });

        return Ok(new OfferLetterDetailDto
        {
            Id = item.Id,
            JobApplicationId = item.JobApplicationId,
            CandidateId = item.CandidateId,
            CandidateName = item.Candidate.FirstName + " " + item.Candidate.LastName,
            CandidateEmail = item.Candidate.Email,
            JobTitle = item.JobTitle,
            JobTitleAr = item.JobTitleAr,
            JobGradeId = item.JobGradeId,
            JobGradeName = item.JobGrade?.Name,
            OfferedSalary = item.OfferedSalary,
            Currency = item.Currency,
            ContractType = item.ContractType,
            StartDate = item.StartDate,
            ExpiryDate = item.ExpiryDate,
            BenefitsDescription = item.BenefitsDescription,
            BenefitsDescriptionAr = item.BenefitsDescriptionAr,
            SpecialConditions = item.SpecialConditions,
            DocumentUrl = item.DocumentUrl,
            Status = item.Status,
            RejectionReason = item.RejectionReason,
            ApprovedByUserId = item.ApprovedByUserId,
            ApprovedAt = item.ApprovedAt,
            SentAt = item.SentAt,
            RespondedAt = item.RespondedAt,
            CreatedEmployeeId = item.CreatedEmployeeId,
            CreatedEmployeeName = item.CreatedEmployee != null ? item.CreatedEmployee.FirstName + " " + item.CreatedEmployee.LastName : null,
            BranchName = item.JobApplication.JobPosting.JobRequisition.Branch.Name,
            DepartmentName = item.JobApplication.JobPosting.JobRequisition.Department.Name,
            Notes = item.Notes,
            WorkflowInstanceId = item.WorkflowInstanceId,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new offer letter from an application.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOfferLetterRequest request)
    {
        var application = await _context.JobApplications
            .Include(a => a.JobPosting).ThenInclude(p => p.JobRequisition)
            .Include(a => a.Candidate)
            .FirstOrDefaultAsync(a => a.Id == request.JobApplicationId && !a.IsDeleted);

        if (application == null)
            return NotFound(new { error = "Job application not found." });

        if (application.Status == ApplicationStatus.Rejected ||
            application.Status == ApplicationStatus.Withdrawn ||
            application.Status == ApplicationStatus.Hired)
            return BadRequest(new { error = "Cannot create offer for application in terminal status." });

        var requisition = application.JobPosting.JobRequisition;

        var entity = new OfferLetter
        {
            JobApplicationId = request.JobApplicationId,
            CandidateId = application.CandidateId,
            JobTitle = request.JobTitle ?? requisition.JobTitle,
            JobTitleAr = request.JobTitleAr ?? requisition.JobTitleAr,
            JobGradeId = request.JobGradeId ?? requisition.JobGradeId,
            OfferedSalary = request.OfferedSalary,
            Currency = request.Currency ?? requisition.Currency ?? "SAR",
            ContractType = request.ContractType,
            StartDate = request.StartDate,
            ExpiryDate = request.ExpiryDate,
            BenefitsDescription = request.BenefitsDescription,
            BenefitsDescriptionAr = request.BenefitsDescriptionAr,
            SpecialConditions = request.SpecialConditions,
            DocumentUrl = request.DocumentUrl,
            Status = OfferStatus.Draft,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.OfferLetters.Add(entity);

        // Update application status
        application.Status = ApplicationStatus.OfferPending;
        application.ModifiedAtUtc = DateTime.UtcNow;
        application.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an offer letter (only if Draft).</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateOfferLetterRequest request)
    {
        var entity = await _context.OfferLetters
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Offer letter not found." });

        if (entity.Status != OfferStatus.Draft)
            return BadRequest(new { error = "Can only update offers in Draft status." });

        entity.JobTitle = request.JobTitle;
        entity.JobTitleAr = request.JobTitleAr;
        entity.JobGradeId = request.JobGradeId;
        entity.OfferedSalary = request.OfferedSalary;
        entity.Currency = request.Currency ?? "SAR";
        entity.ContractType = request.ContractType;
        entity.StartDate = request.StartDate;
        entity.ExpiryDate = request.ExpiryDate;
        entity.BenefitsDescription = request.BenefitsDescription;
        entity.BenefitsDescriptionAr = request.BenefitsDescriptionAr;
        entity.SpecialConditions = request.SpecialConditions;
        entity.DocumentUrl = request.DocumentUrl;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Submits offer letter for approval.</summary>
    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id)
    {
        var entity = await _context.OfferLetters
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Offer letter not found." });

        if (entity.Status != OfferStatus.Draft)
            return BadRequest(new { error = "Can only submit offers in Draft status." });

        entity.Status = OfferStatus.PendingApproval;
        entity.SubmittedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Create WorkflowInstance if a workflow exists for OfferLetter
        var workflow = await _context.WorkflowDefinitions
            .Where(w => w.EntityType == WorkflowEntityType.OfferLetter && w.IsActive && !w.IsDeleted)
            .FirstOrDefaultAsync();

        if (workflow != null)
        {
            var instance = new WorkflowInstance
            {
                WorkflowDefinitionId = workflow.Id,
                EntityType = WorkflowEntityType.OfferLetter,
                EntityId = entity.Id,
                Status = WorkflowStatus.Pending,
                RequestedByUserId = _currentUser.UserId ?? 0,
                RequestedAt = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };
            _context.WorkflowInstances.Add(instance);
            await _context.SaveChangesAsync();
            entity.WorkflowInstanceId = instance.Id;
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Offer letter submitted for approval." });
    }

    /// <summary>Approves an offer letter.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.OfferLetters
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Offer letter not found." });

        if (entity.Status != OfferStatus.PendingApproval)
            return BadRequest(new { error = "Can only approve offers in PendingApproval status." });

        entity.Status = OfferStatus.Approved;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Offer letter approved." });
    }

    /// <summary>Marks an offer letter as sent to candidate.</summary>
    [HttpPost("{id}/send")]
    public async Task<IActionResult> Send(long id)
    {
        var entity = await _context.OfferLetters
            .Include(o => o.JobApplication)
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Offer letter not found." });

        if (entity.Status != OfferStatus.Approved)
            return BadRequest(new { error = "Can only send approved offers." });

        entity.Status = OfferStatus.Sent;
        entity.SentAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Update application status
        entity.JobApplication.Status = ApplicationStatus.OfferExtended;
        entity.JobApplication.ModifiedAtUtc = DateTime.UtcNow;
        entity.JobApplication.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Offer letter marked as sent." });
    }

    /// <summary>
    /// CRITICAL: Accepts an offer and triggers the full hiring process.
    /// Creates Employee, EmployeeContract, EmployeeSalary, and initiates Onboarding.
    /// </summary>
    [HttpPost("{id}/accept")]
    public async Task<IActionResult> AcceptOffer(long id)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            var offer = await _context.OfferLetters
                .Include(o => o.JobApplication)
                    .ThenInclude(a => a.JobPosting)
                        .ThenInclude(p => p.JobRequisition)
                .Include(o => o.Candidate)
                .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

            if (offer == null)
            {
                await transaction.RollbackAsync();
                return NotFound(new { error = "Offer letter not found." });
            }

            // 1. Validate offer is in Sent status
            if (offer.Status != OfferStatus.Sent)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { error = "Can only accept offers in Sent status." });
            }

            // 2. Update offer status to Accepted
            offer.Status = OfferStatus.Accepted;
            offer.RespondedAt = DateTime.UtcNow;
            offer.ModifiedAtUtc = DateTime.UtcNow;
            offer.ModifiedBy = _currentUser.Username;

            var requisition = offer.JobApplication.JobPosting.JobRequisition;
            var candidate = offer.Candidate;

            // 3. Generate employee number
            var employeeNumber = await GenerateEmployeeNumber(requisition.BranchId);

            // 4. Create Employee from Candidate + Offer
            // v13.5: optional pre-hire gate. When CreateEmployeeInactiveAtOfferAcceptance is
            // on, the employee is created IsActive=false + IsPreHire=true and will be
            // activated by the onboarding-completed lifecycle handler.
            var preHireMode = await IsPreHireModeEnabledAsync();
            var employee = new Employee
            {
                FirstName = candidate.FirstName,
                LastName = candidate.LastName,
                FirstNameAr = candidate.FirstNameAr,
                LastNameAr = candidate.LastNameAr,
                Email = candidate.Email,
                Phone = candidate.Phone,
                NationalId = candidate.NationalId,
                DateOfBirth = candidate.DateOfBirth,
                Gender = candidate.Gender,
                Nationality = candidate.Nationality,
                NationalityAr = candidate.NationalityAr,
                BranchId = requisition.BranchId,
                DepartmentId = requisition.DepartmentId,
                JobTitle = offer.JobTitle,
                JobTitleAr = offer.JobTitleAr,
                JobGradeId = offer.JobGradeId ?? requisition.JobGradeId,
                HireDate = offer.StartDate,
                EmploymentStatus = EmploymentStatus.Active,
                EmployeeNumber = employeeNumber,
                IsActive = !preHireMode,
                IsPreHire = preHireMode,
                WorkLocationType = WorkLocationType.OnSite,
                CurrentContractType = offer.ContractType,
                ProbationStatus = ProbationStatus.InProgress,
                ProbationEndDate = offer.StartDate.AddDays(await GetDefaultProbationDaysAsync()),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            // 5. Create EmployeeContract — probation defaults to tenant-configured value.
            var probationDays = await GetDefaultProbationDaysAsync();
            var contract = new EmployeeContract
            {
                EmployeeId = employee.Id,
                ContractType = offer.ContractType,
                ContractNumber = $"CTR-{DateTime.UtcNow:yyyy}-{employee.Id:D4}",
                BasicSalary = offer.OfferedSalary,
                Currency = offer.Currency,
                StartDate = offer.StartDate,
                Status = ContractStatus.Active,
                ProbationPeriodDays = probationDays,
                ProbationEndDate = offer.StartDate.AddDays(probationDays),
                ProbationStatus = ProbationStatus.InProgress,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "SYSTEM"
            };

            _context.EmployeeContracts.Add(contract);

            // 6. Create EmployeeSalary
            // Find a default salary structure or the first active one for the branch
            var salaryStructure = await _context.SalaryStructures
                .Where(s => !s.IsDeleted && s.IsActive
                    && (s.BranchId == requisition.BranchId || s.BranchId == null))
                .OrderByDescending(s => s.BranchId.HasValue) // prefer branch-specific
                .FirstOrDefaultAsync();

            if (salaryStructure != null)
            {
                var salary = new EmployeeSalary
                {
                    EmployeeId = employee.Id,
                    SalaryStructureId = salaryStructure.Id,
                    BaseSalary = offer.OfferedSalary,
                    Currency = offer.Currency,
                    EffectiveDate = offer.StartDate,
                    IsCurrent = true,
                    Reason = "Initial salary from offer acceptance",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                };
                _context.EmployeeSalaries.Add(salary);
            }

            // 7. Update Candidate.ConvertedToEmployeeId
            candidate.ConvertedToEmployeeId = employee.Id;
            candidate.ModifiedAtUtc = DateTime.UtcNow;
            candidate.ModifiedBy = _currentUser.Username;

            // 8. Update Offer.CreatedEmployeeId
            offer.CreatedEmployeeId = employee.Id;

            // 9. Update Application status to Hired
            offer.JobApplication.Status = ApplicationStatus.Hired;
            offer.JobApplication.ModifiedAtUtc = DateTime.UtcNow;
            offer.JobApplication.ModifiedBy = _currentUser.Username;

            // 10. Update Requisition.FilledPositions
            requisition.FilledPositions++;
            if (requisition.FilledPositions >= requisition.NumberOfPositions)
                requisition.Status = RequisitionStatus.Filled;
            requisition.ModifiedAtUtc = DateTime.UtcNow;
            requisition.ModifiedBy = _currentUser.Username;

            // 11. v13.5: onboarding auto-creation is now driven by a lifecycle event.
            // The OfferAcceptedHandler reads CompanySettings.AutoCreateOnboardingOnOfferAcceptance
            // (default true → matches v13.x behavior) and DefaultOnboardingTemplateId, resolves
            // the template (dept → branch → IsDefault fallback), creates the process+tasks,
            // and writes an audit row. Failures here do NOT roll back the offer — they land
            // as Failed audit rows that HR can remediate.

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            await _lifecyclePublisher.PublishAsync(
                new OfferAcceptedEvent(offer.Id, candidate.Id, employee.Id, _currentUser.UserId),
                HttpContext.RequestAborted);

            return Ok(new
            {
                employeeId = employee.Id,
                employeeNumber,
                contractId = contract.Id,
                message = "Offer accepted. Employee created, contract established, onboarding initiated."
            });
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    /// <summary>Declines an offer with reason.</summary>
    [HttpPost("{id}/decline")]
    public async Task<IActionResult> Decline(long id, [FromBody] DeclineOfferRequest request)
    {
        var entity = await _context.OfferLetters
            .Include(o => o.JobApplication)
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Offer letter not found." });

        if (entity.Status != OfferStatus.Sent)
            return BadRequest(new { error = "Can only decline offers in Sent status." });

        entity.Status = OfferStatus.Declined;
        entity.RejectionReason = request.Reason;
        entity.RespondedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Update application status
        entity.JobApplication.Status = ApplicationStatus.OfferDeclined;
        entity.JobApplication.ModifiedAtUtc = DateTime.UtcNow;
        entity.JobApplication.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Offer declined." });
    }

    // ===========================
    // Helper Methods
    // ===========================

    private async Task<string> GenerateEmployeeNumber(long branchId)
    {
        var branch = await _context.Branches
            .Where(b => b.Id == branchId)
            .Select(b => new { b.Code })
            .FirstOrDefaultAsync();

        var branchCode = branch?.Code ?? "HQ";
        var year = DateTime.UtcNow.Year;
        var count = await _context.Employees.CountAsync(e => e.BranchId == branchId) + 1;

        return $"{branchCode}-{year}-{count:D4}";
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateOfferLetterRequest(
    long JobApplicationId,
    string? JobTitle,
    string? JobTitleAr,
    long? JobGradeId,
    decimal OfferedSalary,
    string? Currency,
    ContractType ContractType,
    DateTime StartDate,
    DateTime ExpiryDate,
    string? BenefitsDescription,
    string? BenefitsDescriptionAr,
    string? SpecialConditions,
    string? DocumentUrl,
    string? Notes
);

public record UpdateOfferLetterRequest(
    string JobTitle,
    string? JobTitleAr,
    long? JobGradeId,
    decimal OfferedSalary,
    string? Currency,
    ContractType ContractType,
    DateTime StartDate,
    DateTime ExpiryDate,
    string? BenefitsDescription,
    string? BenefitsDescriptionAr,
    string? SpecialConditions,
    string? DocumentUrl,
    string? Notes
);

public record DeclineOfferRequest(string Reason);

public class OfferLetterListDto
{
    public long Id { get; set; }
    public long JobApplicationId { get; set; }
    public long CandidateId { get; set; }
    public string CandidateName { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public decimal OfferedSalary { get; set; }
    public string Currency { get; set; } = string.Empty;
    public ContractType ContractType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public OfferStatus Status { get; set; }
    public long? CreatedEmployeeId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class OfferLetterDetailDto : OfferLetterListDto
{
    public long? JobGradeId { get; set; }
    public string? JobGradeName { get; set; }
    public string? CandidateEmail { get; set; }
    public string? BenefitsDescription { get; set; }
    public string? BenefitsDescriptionAr { get; set; }
    public string? SpecialConditions { get; set; }
    public string? DocumentUrl { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? SentAt { get; set; }
    public DateTime? RespondedAt { get; set; }
    public string? CreatedEmployeeName { get; set; }
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
