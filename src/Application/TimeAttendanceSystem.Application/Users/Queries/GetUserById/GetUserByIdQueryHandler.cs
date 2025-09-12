using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Queries.GetUserById;

public class GetUserByIdQueryHandler : BaseHandler<GetUserByIdQuery, Result<UserDetailDto>>
{
    public GetUserByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<UserDetailDto>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .Include(u => u.UserBranchScopes)
                .ThenInclude(ubs => ubs.Branch)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<UserDetailDto>("User not found");
        }

        var userDetail = new UserDetailDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone,
            EmailConfirmed = user.EmailConfirmed,
            TwoFactorEnabled = user.TwoFactorEnabled,
            LockoutEndUtc = user.LockoutEndUtc,
            LockoutEnabled = user.LockoutEndUtc.HasValue && user.LockoutEndUtc > DateTime.UtcNow,
            AccessFailedCount = user.FailedLoginAttempts,
            MustChangePassword = user.MustChangePassword,
            PreferredLanguage = user.PreferredLanguage,
            IsActive = user.IsActive,
            CreatedAtUtc = user.CreatedAtUtc,
            ModifiedAtUtc = user.ModifiedAtUtc,
            CreatedBy = user.CreatedBy,
            ModifiedBy = user.ModifiedBy,
            Roles = user.UserRoles.Select(ur => new UserRoleDto
            {
                RoleId = ur.RoleId,
                RoleName = ur.Role.Name,
                IsSystem = ur.Role.IsSystem
            }).ToList(),
            BranchScopes = user.UserBranchScopes.Select(ubs => new UserBranchScopeDto
            {
                BranchId = ubs.BranchId,
                BranchName = ubs.Branch.Name,
                BranchCode = ubs.Branch.Code
            }).ToList()
        };

        return Result.Success(userDetail);
    }
}