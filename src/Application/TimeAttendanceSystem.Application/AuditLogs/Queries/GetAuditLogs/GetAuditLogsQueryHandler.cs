using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.AuditLogs.Queries.GetAuditLogs;

public class GetAuditLogsQueryHandler : BaseHandler<GetAuditLogsQuery, Result<GetAuditLogsResponse>>
{
    public GetAuditLogsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<GetAuditLogsResponse>> Handle(GetAuditLogsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.AuditLogs.AsQueryable();

        // Apply date range filter
        if (request.StartDate.HasValue)
        {
            var startDate = request.StartDate.Value.ToUniversalTime();
            query = query.Where(a => a.CreatedAtUtc >= startDate);
        }

        if (request.EndDate.HasValue)
        {
            var endDate = request.EndDate.Value.ToUniversalTime().AddDays(1).AddTicks(-1);
            query = query.Where(a => a.CreatedAtUtc <= endDate);
        }

        // Apply action filter
        if (request.Actions != null && request.Actions.Any())
        {
            query = query.Where(a => request.Actions.Contains(a.Action));
        }

        // Apply entity name filter
        if (!string.IsNullOrWhiteSpace(request.EntityName))
        {
            query = query.Where(a => a.EntityName == request.EntityName);
        }

        // Apply actor user filter
        if (request.ActorUserId.HasValue)
        {
            query = query.Where(a => a.ActorUserId == request.ActorUserId.Value);
        }

        // Apply search term
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(a =>
                a.EntityId.ToLower().Contains(searchTerm) ||
                (a.IpAddress != null && a.IpAddress.ToLower().Contains(searchTerm)) ||
                (a.UserAgent != null && a.UserAgent.ToLower().Contains(searchTerm))
            );
        }

        // Get total count before pagination
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply sorting
        query = ApplySorting(query, request.SortBy, request.SortDirection);

        // Apply pagination
        var auditLogs = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(a => new
            {
                AuditLog = a,
                User = Context.Users.FirstOrDefault(u => u.Id == a.ActorUserId)
            })
            .ToListAsync(cancellationToken);

        var auditLogDtos = auditLogs.Select(x => new AuditLogDto(
            x.AuditLog.Id,
            x.AuditLog.ActorUserId,
            x.User?.Username,
            x.User?.Email,
            x.AuditLog.Action,
            GetActionDisplayName(x.AuditLog.Action),
            x.AuditLog.EntityName,
            x.AuditLog.EntityId,
            x.AuditLog.PayloadJson,
            x.AuditLog.IpAddress,
            x.AuditLog.UserAgent,
            x.AuditLog.CreatedAtUtc,
            x.AuditLog.CreatedBy
        )).ToList();

        var totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

        var response = new GetAuditLogsResponse(
            auditLogDtos,
            totalCount,
            request.PageNumber,
            request.PageSize,
            totalPages
        );

        return Result.Success(response);
    }

    private IQueryable<AuditLog> ApplySorting(IQueryable<AuditLog> query, string? sortBy, string? sortDirection)
    {
        var isDescending = sortDirection?.ToLower() == "desc";

        return sortBy?.ToLower() switch
        {
            "action" => isDescending ? query.OrderByDescending(a => a.Action) : query.OrderBy(a => a.Action),
            "entityname" => isDescending ? query.OrderByDescending(a => a.EntityName) : query.OrderBy(a => a.EntityName),
            "actoruserid" => isDescending ? query.OrderByDescending(a => a.ActorUserId) : query.OrderBy(a => a.ActorUserId),
            "ipaddress" => isDescending ? query.OrderByDescending(a => a.IpAddress) : query.OrderBy(a => a.IpAddress),
            _ => isDescending ? query.OrderByDescending(a => a.CreatedAtUtc) : query.OrderBy(a => a.CreatedAtUtc)
        };
    }

    private string GetActionDisplayName(AuditAction action)
    {
        return action switch
        {
            // Authentication & Authorization
            AuditAction.Login => "Login",
            AuditAction.Logout => "Logout",
            AuditAction.LogoutAllDevices => "Logout All Devices",
            AuditAction.TokenRefresh => "Token Refresh",
            AuditAction.PasswordChange => "Password Change",
            AuditAction.PasswordReset => "Password Reset",
            AuditAction.PasswordResetRequest => "Password Reset Request",
            AuditAction.AccountLockout => "Account Lockout",
            AuditAction.AccountUnlock => "Account Unlock",
            AuditAction.TwoFactorEnabled => "Two-Factor Enabled",
            AuditAction.TwoFactorDisabled => "Two-Factor Disabled",
            AuditAction.TwoFactorVerified => "Two-Factor Verified",
            AuditAction.SessionCreated => "Session Created",
            AuditAction.SessionTerminated => "Session Terminated",
            AuditAction.SessionExpired => "Session Expired",

            // User Management
            AuditAction.UserCreated => "User Created",
            AuditAction.UserUpdated => "User Updated",
            AuditAction.UserDeleted => "User Deleted",
            AuditAction.UserActivated => "User Activated",
            AuditAction.UserDeactivated => "User Deactivated",
            AuditAction.UserRoleAssigned => "User Role Assigned",
            AuditAction.UserRoleRevoked => "User Role Revoked",
            AuditAction.UserBranchScopeAssigned => "User Branch Scope Assigned",
            AuditAction.UserBranchScopeRevoked => "User Branch Scope Revoked",

            // Employee Management
            AuditAction.EmployeeCreated => "Employee Created",
            AuditAction.EmployeeUpdated => "Employee Updated",
            AuditAction.EmployeeDeleted => "Employee Deleted",
            AuditAction.EmployeeActivated => "Employee Activated",
            AuditAction.EmployeeDeactivated => "Employee Deactivated",

            // Shift Management
            AuditAction.ShiftCreated => "Shift Created",
            AuditAction.ShiftUpdated => "Shift Updated",
            AuditAction.ShiftDeleted => "Shift Deleted",

            // Shift Assignment Management
            AuditAction.ShiftAssignmentCreated => "Shift Assignment Created",
            AuditAction.ShiftAssignmentUpdated => "Shift Assignment Updated",
            AuditAction.ShiftAssignmentDeleted => "Shift Assignment Deleted",
            AuditAction.ShiftAssignmentActivated => "Shift Assignment Activated",
            AuditAction.ShiftAssignmentDeactivated => "Shift Assignment Deactivated",

            // Vacation Management
            AuditAction.VacationTypeCreated => "Vacation Type Created",
            AuditAction.VacationTypeUpdated => "Vacation Type Updated",
            AuditAction.VacationTypeDeleted => "Vacation Type Deleted",
            AuditAction.VacationRequestCreated => "Vacation Request Created",
            AuditAction.VacationRequestUpdated => "Vacation Request Updated",
            AuditAction.VacationRequestApproved => "Vacation Request Approved",
            AuditAction.VacationRequestRejected => "Vacation Request Rejected",
            AuditAction.VacationRequestCancelled => "Vacation Request Cancelled",

            // System Actions
            AuditAction.SystemStartup => "System Startup",
            AuditAction.SystemShutdown => "System Shutdown",
            AuditAction.DatabaseMigration => "Database Migration",

            // Generic CRUD Operations
            AuditAction.Created => "Created",
            AuditAction.Updated => "Updated",
            AuditAction.Deleted => "Deleted",
            AuditAction.Viewed => "Viewed",

            _ => action.ToString()
        };
    }
}
