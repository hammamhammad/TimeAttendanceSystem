using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 3 (v14.3): Implementation of <see cref="IGlobalSearchService"/>.
/// Bounded, branch-scope-safe, typed result shape.
/// </summary>
public sealed class GlobalSearchService : IGlobalSearchService
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUser _currentUser;

    public GlobalSearchService(IApplicationDbContext db, ICurrentUser currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<GlobalSearchResponse> SearchAsync(GlobalSearchRequest request, CancellationToken ct = default)
    {
        var q = request.Query?.Trim() ?? string.Empty;
        var perType = Math.Clamp(request.PerTypeLimit, 1, 50);
        var response = new GlobalSearchResponse { Query = q };

        if (q.Length < 2)
            return response; // too short — avoid full-table scans

        // Lowercase once for portable case-insensitive matching. EF Core Npgsql
        // translates `.ToLower().Contains(...)` to a LOWER(...) LIKE ... query;
        // EF InMemory evaluates it in-proc. Previous `EF.Functions.ILike` was
        // Postgres-only and broke test runs against the InMemory provider.
        var qLower = q.ToLower();

        var includes = request.IncludeTypes;
        var isSysAdmin = _currentUser.IsSystemAdmin;
        var scopedBranchIds = _currentUser.BranchIds;
        var hasBranchScope = !isSysAdmin && scopedBranchIds != null && scopedBranchIds.Count > 0;

        // --- Employee ---
        if (Want(includes, "Employee"))
        {
            var empQ = _db.Employees.AsNoTracking().Where(e => !e.IsDeleted);
            if (hasBranchScope) empQ = empQ.Where(e => scopedBranchIds!.Contains(e.BranchId));
            empQ = empQ.Where(e =>
                e.FirstName.ToLower().Contains(qLower)
                || e.LastName.ToLower().Contains(qLower)
                || e.EmployeeNumber.ToLower().Contains(qLower)
                || (e.JobTitle != null && e.JobTitle.ToLower().Contains(qLower)));
            var empRows = await empQ
                .OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
                .Take(perType)
                .Select(e => new GlobalSearchItem
                {
                    EntityType = "Employee",
                    EntityId = e.Id,
                    Title = e.FirstName + " " + e.LastName,
                    Subtitle = e.EmployeeNumber + (e.JobTitle != null ? " · " + e.JobTitle : ""),
                    EmployeeId = e.Id,
                    BranchId = e.BranchId,
                    Status = e.IsActive ? "Active" : "Inactive"
                })
                .ToListAsync(ct);
            response.Items.AddRange(empRows);
        }

        // --- LoanApplication ---
        if (Want(includes, "LoanApplication"))
        {
            var loanQ = _db.LoanApplications.AsNoTracking()
                .Include(l => l.Employee)
                .Where(l => !l.IsDeleted);
            if (hasBranchScope)
                loanQ = loanQ.Where(l => scopedBranchIds!.Contains(l.Employee.BranchId));
            loanQ = loanQ.Where(l =>
                (l.Purpose != null && l.Purpose.ToLower().Contains(qLower))
                || l.Employee.FirstName.ToLower().Contains(qLower)
                || l.Employee.LastName.ToLower().Contains(qLower)
                || l.Employee.EmployeeNumber.ToLower().Contains(qLower));
            var loanRows = await loanQ
                .OrderByDescending(l => l.CreatedAtUtc).Take(perType)
                .Select(l => new GlobalSearchItem
                {
                    EntityType = "LoanApplication",
                    EntityId = l.Id,
                    Title = "Loan #" + l.Id + " · " + l.Employee.FirstName + " " + l.Employee.LastName,
                    Subtitle = l.Status.ToString() + " · " + l.RequestedAmount.ToString("0.00"),
                    EmployeeId = l.EmployeeId,
                    BranchId = l.Employee.BranchId,
                    Status = l.Status.ToString()
                })
                .ToListAsync(ct);
            response.Items.AddRange(loanRows);
        }

        // --- ExpenseClaim ---
        if (Want(includes, "ExpenseClaim"))
        {
            var expQ = _db.ExpenseClaims.AsNoTracking()
                .Include(c => c.Employee)
                .Where(c => !c.IsDeleted);
            if (hasBranchScope)
                expQ = expQ.Where(c => scopedBranchIds!.Contains(c.Employee.BranchId));
            expQ = expQ.Where(c =>
                c.ClaimNumber.ToLower().Contains(qLower)
                || (c.Description != null && c.Description.ToLower().Contains(qLower))
                || c.Employee.FirstName.ToLower().Contains(qLower)
                || c.Employee.LastName.ToLower().Contains(qLower));
            var expRows = await expQ
                .OrderByDescending(c => c.CreatedAtUtc).Take(perType)
                .Select(c => new GlobalSearchItem
                {
                    EntityType = "ExpenseClaim",
                    EntityId = c.Id,
                    Title = c.ClaimNumber + " · " + c.Employee.FirstName + " " + c.Employee.LastName,
                    Subtitle = c.Status.ToString() + " · " + c.TotalAmount.ToString("0.00"),
                    EmployeeId = c.EmployeeId,
                    BranchId = c.Employee.BranchId,
                    Status = c.Status.ToString()
                })
                .ToListAsync(ct);
            response.Items.AddRange(expRows);
        }

        // --- BenefitEnrollment ---
        if (Want(includes, "BenefitEnrollment"))
        {
            var benQ = _db.BenefitEnrollments.AsNoTracking()
                .Include(b => b.Employee)
                .Include(b => b.BenefitPlan)
                .Where(b => !b.IsDeleted);
            if (hasBranchScope)
                benQ = benQ.Where(b => scopedBranchIds!.Contains(b.Employee.BranchId));
            benQ = benQ.Where(b =>
                b.BenefitPlan.Code.ToLower().Contains(qLower)
                || b.BenefitPlan.Name.ToLower().Contains(qLower)
                || b.Employee.FirstName.ToLower().Contains(qLower)
                || b.Employee.LastName.ToLower().Contains(qLower)
                || b.Employee.EmployeeNumber.ToLower().Contains(qLower));
            var benRows = await benQ
                .OrderByDescending(b => b.EffectiveDate).Take(perType)
                .Select(b => new GlobalSearchItem
                {
                    EntityType = "BenefitEnrollment",
                    EntityId = b.Id,
                    Title = b.BenefitPlan.Name + " · " + b.Employee.FirstName + " " + b.Employee.LastName,
                    Subtitle = b.Status.ToString() + " · effective " + b.EffectiveDate.ToString("yyyy-MM-dd"),
                    EmployeeId = b.EmployeeId,
                    BranchId = b.Employee.BranchId,
                    Status = b.Status.ToString()
                })
                .ToListAsync(ct);
            response.Items.AddRange(benRows);
        }

        // --- LetterRequest ---
        if (Want(includes, "LetterRequest"))
        {
            var letQ = _db.LetterRequests.AsNoTracking()
                .Include(l => l.Employee)
                .Where(l => !l.IsDeleted);
            if (hasBranchScope)
                letQ = letQ.Where(l => scopedBranchIds!.Contains(l.Employee.BranchId));
            letQ = letQ.Where(l =>
                (l.Purpose != null && l.Purpose.ToLower().Contains(qLower))
                || l.Employee.FirstName.ToLower().Contains(qLower)
                || l.Employee.LastName.ToLower().Contains(qLower)
                || l.Employee.EmployeeNumber.ToLower().Contains(qLower));
            var letRows = await letQ
                .OrderByDescending(l => l.CreatedAtUtc).Take(perType)
                .Select(l => new GlobalSearchItem
                {
                    EntityType = "LetterRequest",
                    EntityId = l.Id,
                    Title = l.LetterType.ToString() + " · " + l.Employee.FirstName + " " + l.Employee.LastName,
                    Subtitle = l.Status.ToString(),
                    EmployeeId = l.EmployeeId,
                    BranchId = l.Employee.BranchId,
                    Status = l.Status.ToString()
                })
                .ToListAsync(ct);
            response.Items.AddRange(letRows);
        }

        // --- OperationalFailureAlert (unresolved only) ---
        if (Want(includes, "OperationalFailureAlert"))
        {
            var alertQ = _db.OperationalFailureAlerts.AsNoTracking()
                .Where(a => !a.IsDeleted && !a.IsResolved);
            alertQ = alertQ.Where(a =>
                a.SourceEntityType.ToLower().Contains(qLower)
                || a.FailureCode.ToLower().Contains(qLower)
                || a.Reason.ToLower().Contains(qLower));
            var alertRows = await alertQ
                .OrderByDescending(a => a.FailedAtUtc).Take(perType)
                .Select(a => new GlobalSearchItem
                {
                    EntityType = "OperationalFailureAlert",
                    EntityId = a.Id,
                    Title = a.Category + " · " + a.SourceEntityType + "#" + a.SourceEntityId,
                    Subtitle = a.Severity + " · " + a.FailureCode,
                    EmployeeId = a.EmployeeId,
                    Status = a.IsResolved ? "Resolved" : "Open"
                })
                .ToListAsync(ct);
            response.Items.AddRange(alertRows);
        }

        response.TotalCount = response.Items.Count;
        return response;
    }

    private static bool Want(ISet<string>? includes, string type)
        => includes == null || includes.Count == 0 || includes.Contains(type);
}
