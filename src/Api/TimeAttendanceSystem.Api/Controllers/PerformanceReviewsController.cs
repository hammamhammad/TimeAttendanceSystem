using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Performance;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/performance-reviews")]
[Authorize]
public class PerformanceReviewsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PerformanceReviewsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists performance reviews with optional filters.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? cycleId,
        [FromQuery] long? employeeId,
        [FromQuery] long? reviewerId,
        [FromQuery] ReviewStatus? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.PerformanceReviews
            .Include(r => r.Employee)
            .Include(r => r.ReviewerEmployee)
            .Include(r => r.ReviewCycle)
            .Where(r => !r.IsDeleted);

        if (!_currentUser.IsSystemAdmin && _currentUser.BranchIds.Any())
            query = query.Where(r => _currentUser.BranchIds.Contains(r.Employee.BranchId));

        if (cycleId.HasValue)
            query = query.Where(r => r.PerformanceReviewCycleId == cycleId.Value);
        if (employeeId.HasValue)
            query = query.Where(r => r.EmployeeId == employeeId.Value);
        if (reviewerId.HasValue)
            query = query.Where(r => r.ReviewerEmployeeId == reviewerId.Value);
        if (status.HasValue)
            query = query.Where(r => r.Status == status.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new PerformanceReviewListDto
            {
                Id = r.Id,
                PerformanceReviewCycleId = r.PerformanceReviewCycleId,
                CycleName = r.ReviewCycle.Name,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                ReviewerEmployeeId = r.ReviewerEmployeeId,
                ReviewerName = r.ReviewerEmployee.FirstName + " " + r.ReviewerEmployee.LastName,
                Status = r.Status,
                SelfRating = r.SelfRating,
                ManagerRating = r.ManagerRating,
                FinalRating = r.FinalRating,
                SelfAssessmentDate = r.SelfAssessmentDate,
                ManagerReviewDate = r.ManagerReviewDate,
                CreatedAtUtc = r.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a performance review by ID with goals and competency assessments.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.PerformanceReviews
            .Include(r => r.Employee)
            .Include(r => r.ReviewerEmployee)
            .Include(r => r.ReviewCycle)
            .Include(r => r.Goals.Where(g => !g.IsDeleted))
            .Include(r => r.CompetencyAssessments.Where(ca => !ca.IsDeleted))
                .ThenInclude(ca => ca.Competency)
            .Include(r => r.FeedbackRequests.Where(f => !f.IsDeleted))
                .ThenInclude(f => f.RequestedFromEmployee)
            .Where(r => r.Id == id && !r.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Performance review not found." });

        return Ok(new PerformanceReviewDetailDto
        {
            Id = item.Id,
            PerformanceReviewCycleId = item.PerformanceReviewCycleId,
            CycleName = item.ReviewCycle.Name,
            EmployeeId = item.EmployeeId,
            EmployeeName = item.Employee.FirstName + " " + item.Employee.LastName,
            ReviewerEmployeeId = item.ReviewerEmployeeId,
            ReviewerName = item.ReviewerEmployee.FirstName + " " + item.ReviewerEmployee.LastName,
            Status = item.Status,
            SelfRating = item.SelfRating,
            ManagerRating = item.ManagerRating,
            FinalRating = item.FinalRating,
            SelfAssessmentComments = item.SelfAssessmentComments,
            ManagerComments = item.ManagerComments,
            OverallComments = item.OverallComments,
            SelfAssessmentDate = item.SelfAssessmentDate,
            ManagerReviewDate = item.ManagerReviewDate,
            ApprovedDate = item.ApprovedDate,
            AcknowledgedDate = item.AcknowledgedDate,
            RelatedPromotionId = item.RelatedPromotionId,
            RelatedSalaryAdjustmentId = item.RelatedSalaryAdjustmentId,
            RelatedPipId = item.RelatedPipId,
            Goals = item.Goals.Select(g => new GoalSummaryDto
            {
                Id = g.Id,
                Title = g.Title,
                TitleAr = g.TitleAr,
                GoalType = g.GoalType,
                Weight = g.Weight,
                Status = g.Status,
                ProgressPercentage = g.ProgressPercentage,
                SelfRating = g.SelfRating,
                ManagerRating = g.ManagerRating
            }).ToList(),
            CompetencyAssessments = item.CompetencyAssessments.Select(ca => new CompetencyAssessmentDto
            {
                Id = ca.Id,
                CompetencyId = ca.CompetencyId,
                CompetencyName = ca.Competency.Name,
                CompetencyNameAr = ca.Competency.NameAr,
                Category = ca.Competency.Category,
                SelfRating = ca.SelfRating,
                ManagerRating = ca.ManagerRating,
                FinalRating = ca.FinalRating,
                SelfComments = ca.SelfComments,
                ManagerComments = ca.ManagerComments
            }).ToList(),
            FeedbackRequests = item.FeedbackRequests.Select(f => new FeedbackRequestSummaryDto
            {
                Id = f.Id,
                RequestedFromEmployeeId = f.RequestedFromEmployeeId,
                RequestedFromName = f.RequestedFromEmployee.FirstName + " " + f.RequestedFromEmployee.LastName,
                Status = f.Status,
                Deadline = f.Deadline,
                SubmittedAt = f.SubmittedAt
            }).ToList(),
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Submit self-assessment (employee submits their own ratings/comments).</summary>
    [HttpPost("{id}/submit-self")]
    public async Task<IActionResult> SubmitSelfAssessment(long id, [FromBody] SubmitSelfAssessmentRequest request)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.SelfAssessmentPending)
            return BadRequest(new { error = "Self-assessment can only be submitted when status is SelfAssessmentPending." });

        review.SelfRating = request.SelfRating;
        review.SelfAssessmentComments = request.Comments;
        review.SelfAssessmentDate = DateTime.UtcNow;
        review.Status = ReviewStatus.SelfAssessmentCompleted;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        // Update goal self-ratings if provided
        if (request.GoalRatings != null)
        {
            foreach (var goalRating in request.GoalRatings)
            {
                var goal = await _context.GoalDefinitions
                    .FirstOrDefaultAsync(g => g.Id == goalRating.GoalId && g.PerformanceReviewId == id && !g.IsDeleted);
                if (goal != null)
                {
                    goal.SelfRating = goalRating.Rating;
                    goal.SelfComments = goalRating.Comments;
                    goal.ModifiedAtUtc = DateTime.UtcNow;
                    goal.ModifiedBy = _currentUser.Username;
                }
            }
        }

        // Update competency self-ratings if provided
        if (request.CompetencyRatings != null)
        {
            foreach (var compRating in request.CompetencyRatings)
            {
                var assessment = await _context.CompetencyAssessments
                    .FirstOrDefaultAsync(ca => ca.Id == compRating.AssessmentId && ca.PerformanceReviewId == id && !ca.IsDeleted);
                if (assessment != null)
                {
                    assessment.SelfRating = compRating.Rating;
                    assessment.SelfComments = compRating.Comments;
                    assessment.ModifiedAtUtc = DateTime.UtcNow;
                    assessment.ModifiedBy = _currentUser.Username;
                }
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Self-assessment submitted." });
    }

    /// <summary>Submit manager review.</summary>
    [HttpPost("{id}/submit-manager")]
    public async Task<IActionResult> SubmitManagerReview(long id, [FromBody] SubmitManagerReviewRequest request)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.SelfAssessmentCompleted && review.Status != ReviewStatus.ManagerReviewPending)
            return BadRequest(new { error = "Manager review can only be submitted after self-assessment is completed." });

        review.ManagerRating = request.ManagerRating;
        review.FinalRating = request.FinalRating ?? request.ManagerRating;
        review.ManagerComments = request.Comments;
        review.OverallComments = request.OverallComments;
        review.ManagerReviewDate = DateTime.UtcNow;
        review.Status = ReviewStatus.ManagerReviewCompleted;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        // Update goal manager ratings if provided
        if (request.GoalRatings != null)
        {
            foreach (var goalRating in request.GoalRatings)
            {
                var goal = await _context.GoalDefinitions
                    .FirstOrDefaultAsync(g => g.Id == goalRating.GoalId && g.PerformanceReviewId == id && !g.IsDeleted);
                if (goal != null)
                {
                    goal.ManagerRating = goalRating.Rating;
                    goal.ManagerComments = goalRating.Comments;
                    goal.ModifiedAtUtc = DateTime.UtcNow;
                    goal.ModifiedBy = _currentUser.Username;
                }
            }
        }

        // Update competency manager ratings if provided
        if (request.CompetencyRatings != null)
        {
            foreach (var compRating in request.CompetencyRatings)
            {
                var assessment = await _context.CompetencyAssessments
                    .FirstOrDefaultAsync(ca => ca.Id == compRating.AssessmentId && ca.PerformanceReviewId == id && !ca.IsDeleted);
                if (assessment != null)
                {
                    assessment.ManagerRating = compRating.Rating;
                    assessment.FinalRating = compRating.FinalRating ?? compRating.Rating;
                    assessment.ManagerComments = compRating.Comments;
                    assessment.ModifiedAtUtc = DateTime.UtcNow;
                    assessment.ModifiedBy = _currentUser.Username;
                }
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Manager review submitted." });
    }

    /// <summary>Approves a performance review.</summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(long id)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.ManagerReviewCompleted && review.Status != ReviewStatus.PendingApproval)
            return BadRequest(new { error = "Review must be completed by manager before approval." });

        review.Status = ReviewStatus.Approved;
        review.ApprovedDate = DateTime.UtcNow;
        review.ApprovedByUserId = _currentUser.UserId;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Performance review approved." });
    }

    /// <summary>Employee acknowledges the review.</summary>
    [HttpPost("{id}/acknowledge")]
    public async Task<IActionResult> Acknowledge(long id)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.Approved)
            return BadRequest(new { error = "Review must be approved before acknowledgement." });

        review.Status = ReviewStatus.Acknowledged;
        review.AcknowledgedDate = DateTime.UtcNow;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Review acknowledged by employee." });
    }

    /// <summary>Employee disputes the review.</summary>
    [HttpPost("{id}/dispute")]
    public async Task<IActionResult> Dispute(long id, [FromBody] DisputeReviewRequest request)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.Approved)
            return BadRequest(new { error = "Can only dispute approved reviews." });

        review.Status = ReviewStatus.Disputed;
        review.OverallComments = (review.OverallComments ?? "") + $"\n\n[DISPUTE] {request.DisputeReason}";
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Review disputed." });
    }

    /// <summary>Recommends a promotion linked to this review. Creates an EmployeePromotion.</summary>
    [HttpPost("{id}/recommend-promotion")]
    public async Task<IActionResult> RecommendPromotion(long id, [FromBody] RecommendPromotionRequest request)
    {
        var review = await _context.PerformanceReviews
            .Include(r => r.Employee)
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.ManagerReviewCompleted && review.Status != ReviewStatus.Approved)
            return BadRequest(new { error = "Review must be completed or approved to recommend promotion." });

        var employee = review.Employee;

        var promotion = new EmployeePromotion
        {
            EmployeeId = review.EmployeeId,
            OldJobTitle = employee.JobTitle,
            NewJobTitle = request.NewJobTitle,
            OldJobTitleAr = employee.JobTitleAr,
            NewJobTitleAr = request.NewJobTitleAr,
            OldDepartmentId = employee.DepartmentId,
            NewDepartmentId = request.NewDepartmentId ?? employee.DepartmentId,
            OldBaseSalary = request.OldBaseSalary,
            NewBaseSalary = request.NewBaseSalary,
            RequestDate = DateTime.UtcNow,
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason ?? "Performance review recommendation",
            ReasonAr = request.ReasonAr,
            Status = PromotionStatus.Pending,
            Notes = $"Linked to performance review #{review.Id}",
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.EmployeePromotions.Add(promotion);
        await _context.SaveChangesAsync();

        review.RelatedPromotionId = promotion.Id;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { promotionId = promotion.Id, message = "Promotion recommendation created." });
    }

    /// <summary>Recommends a salary increase linked to this review. Creates a SalaryAdjustment.</summary>
    [HttpPost("{id}/recommend-salary-increase")]
    public async Task<IActionResult> RecommendSalaryIncrease(long id, [FromBody] RecommendSalaryIncreaseRequest request)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        if (review.Status != ReviewStatus.ManagerReviewCompleted && review.Status != ReviewStatus.Approved)
            return BadRequest(new { error = "Review must be completed or approved to recommend salary increase." });

        var adjustmentAmount = request.NewBaseSalary - request.CurrentBaseSalary;
        var percentageChange = request.CurrentBaseSalary > 0
            ? Math.Round((adjustmentAmount / request.CurrentBaseSalary) * 100, 2)
            : 0;

        var adjustment = new SalaryAdjustment
        {
            EmployeeId = review.EmployeeId,
            AdjustmentType = SalaryAdjustmentType.PerformanceBonus,
            CurrentBaseSalary = request.CurrentBaseSalary,
            CurrentTotalPackage = request.CurrentTotalPackage ?? request.CurrentBaseSalary,
            NewBaseSalary = request.NewBaseSalary,
            AdjustmentAmount = adjustmentAmount,
            PercentageChange = percentageChange,
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason ?? "Performance review recommendation",
            ReasonAr = request.ReasonAr,
            Justification = request.Justification,
            Status = SalaryAdjustmentStatus.Pending,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.SalaryAdjustments.Add(adjustment);
        await _context.SaveChangesAsync();

        review.RelatedSalaryAdjustmentId = adjustment.Id;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { salaryAdjustmentId = adjustment.Id, message = "Salary increase recommendation created." });
    }

    /// <summary>Creates a Performance Improvement Plan linked to this review.</summary>
    [HttpPost("{id}/create-pip")]
    public async Task<IActionResult> CreatePip(long id, [FromBody] CreatePipFromReviewRequest request)
    {
        var review = await _context.PerformanceReviews
            .FirstOrDefaultAsync(r => r.Id == id && !r.IsDeleted);

        if (review == null)
            return NotFound(new { error = "Performance review not found." });

        var pip = new PerformanceImprovementPlan
        {
            EmployeeId = review.EmployeeId,
            ManagerEmployeeId = review.ReviewerEmployeeId,
            PerformanceReviewId = review.Id,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Goals = request.Goals,
            Milestones = request.Milestones,
            Status = PipStatus.Draft,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.PerformanceImprovementPlans.Add(pip);
        await _context.SaveChangesAsync();

        review.RelatedPipId = pip.Id;
        review.ModifiedAtUtc = DateTime.UtcNow;
        review.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return Ok(new { pipId = pip.Id, message = "Performance Improvement Plan created." });
    }

    /// <summary>Gets current user's own reviews (self-service).</summary>
    [HttpGet("my-reviews")]
    public async Task<IActionResult> GetMyReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var employeeLink = await _context.EmployeeUserLinks
            .Where(l => l.UserId == _currentUser.UserId)
            .Select(l => l.EmployeeId)
            .FirstOrDefaultAsync();

        if (employeeLink == 0)
            return Ok(new { data = new List<object>(), totalCount = 0, pageNumber = page, pageSize });

        var query = _context.PerformanceReviews
            .Include(r => r.ReviewerEmployee)
            .Include(r => r.ReviewCycle)
            .Where(r => !r.IsDeleted && r.EmployeeId == employeeLink);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new PerformanceReviewListDto
            {
                Id = r.Id,
                PerformanceReviewCycleId = r.PerformanceReviewCycleId,
                CycleName = r.ReviewCycle.Name,
                EmployeeId = r.EmployeeId,
                EmployeeName = "",
                ReviewerEmployeeId = r.ReviewerEmployeeId,
                ReviewerName = r.ReviewerEmployee.FirstName + " " + r.ReviewerEmployee.LastName,
                Status = r.Status,
                SelfRating = r.SelfRating,
                ManagerRating = r.ManagerRating,
                FinalRating = r.FinalRating,
                SelfAssessmentDate = r.SelfAssessmentDate,
                ManagerReviewDate = r.ManagerReviewDate,
                CreatedAtUtc = r.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets team reviews for a manager (self-service).</summary>
    [HttpGet("team-reviews")]
    public async Task<IActionResult> GetTeamReviews(
        [FromQuery] long? cycleId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var employeeLink = await _context.EmployeeUserLinks
            .Where(l => l.UserId == _currentUser.UserId)
            .Select(l => l.EmployeeId)
            .FirstOrDefaultAsync();

        if (employeeLink == 0)
            return Ok(new { data = new List<object>(), totalCount = 0, pageNumber = page, pageSize });

        var query = _context.PerformanceReviews
            .Include(r => r.Employee)
            .Include(r => r.ReviewCycle)
            .Where(r => !r.IsDeleted && r.ReviewerEmployeeId == employeeLink);

        if (cycleId.HasValue)
            query = query.Where(r => r.PerformanceReviewCycleId == cycleId.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new PerformanceReviewListDto
            {
                Id = r.Id,
                PerformanceReviewCycleId = r.PerformanceReviewCycleId,
                CycleName = r.ReviewCycle.Name,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                ReviewerEmployeeId = r.ReviewerEmployeeId,
                ReviewerName = "",
                Status = r.Status,
                SelfRating = r.SelfRating,
                ManagerRating = r.ManagerRating,
                FinalRating = r.FinalRating,
                SelfAssessmentDate = r.SelfAssessmentDate,
                ManagerReviewDate = r.ManagerReviewDate,
                CreatedAtUtc = r.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }
}

// ===========================
// Request / Response Records
// ===========================

public record GoalRatingInput(long GoalId, PerformanceRating Rating, string? Comments);
public record CompetencyRatingInput(long AssessmentId, PerformanceRating Rating, PerformanceRating? FinalRating, string? Comments);

public record SubmitSelfAssessmentRequest(
    PerformanceRating SelfRating,
    string? Comments,
    List<GoalRatingInput>? GoalRatings,
    List<CompetencyRatingInput>? CompetencyRatings
);

public record SubmitManagerReviewRequest(
    PerformanceRating ManagerRating,
    PerformanceRating? FinalRating,
    string? Comments,
    string? OverallComments,
    List<GoalRatingInput>? GoalRatings,
    List<CompetencyRatingInput>? CompetencyRatings
);

public record DisputeReviewRequest(string DisputeReason);

public record RecommendPromotionRequest(
    string NewJobTitle,
    string? NewJobTitleAr,
    long? NewDepartmentId,
    decimal? OldBaseSalary,
    decimal? NewBaseSalary,
    DateTime EffectiveDate,
    string? Reason,
    string? ReasonAr
);

public record RecommendSalaryIncreaseRequest(
    decimal CurrentBaseSalary,
    decimal? CurrentTotalPackage,
    decimal NewBaseSalary,
    DateTime EffectiveDate,
    string? Reason,
    string? ReasonAr,
    string? Justification
);

public record CreatePipFromReviewRequest(
    DateTime StartDate,
    DateTime EndDate,
    string? Reason,
    string? ReasonAr,
    string? Goals,
    string? Milestones
);

public class PerformanceReviewListDto
{
    public long Id { get; set; }
    public long PerformanceReviewCycleId { get; set; }
    public string CycleName { get; set; } = string.Empty;
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public long ReviewerEmployeeId { get; set; }
    public string ReviewerName { get; set; } = string.Empty;
    public ReviewStatus Status { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public PerformanceRating? FinalRating { get; set; }
    public DateTime? SelfAssessmentDate { get; set; }
    public DateTime? ManagerReviewDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class PerformanceReviewDetailDto : PerformanceReviewListDto
{
    public string? SelfAssessmentComments { get; set; }
    public string? ManagerComments { get; set; }
    public string? OverallComments { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public DateTime? AcknowledgedDate { get; set; }
    public long? RelatedPromotionId { get; set; }
    public long? RelatedSalaryAdjustmentId { get; set; }
    public long? RelatedPipId { get; set; }
    public List<GoalSummaryDto> Goals { get; set; } = new();
    public List<CompetencyAssessmentDto> CompetencyAssessments { get; set; } = new();
    public List<FeedbackRequestSummaryDto> FeedbackRequests { get; set; } = new();
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}

public class GoalSummaryDto
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public GoalType GoalType { get; set; }
    public decimal Weight { get; set; }
    public GoalStatus Status { get; set; }
    public int ProgressPercentage { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
}

public class CompetencyAssessmentDto
{
    public long Id { get; set; }
    public long CompetencyId { get; set; }
    public string CompetencyName { get; set; } = string.Empty;
    public string? CompetencyNameAr { get; set; }
    public string? Category { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public PerformanceRating? FinalRating { get; set; }
    public string? SelfComments { get; set; }
    public string? ManagerComments { get; set; }
}

public class FeedbackRequestSummaryDto
{
    public long Id { get; set; }
    public long RequestedFromEmployeeId { get; set; }
    public string RequestedFromName { get; set; } = string.Empty;
    public FeedbackStatus Status { get; set; }
    public DateTime? Deadline { get; set; }
    public DateTime? SubmittedAt { get; set; }
}
