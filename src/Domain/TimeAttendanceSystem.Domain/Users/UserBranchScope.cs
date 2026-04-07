using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Domain.Users;

public class UserBranchScope
{
    public long UserId { get; set; }
    public long BranchId { get; set; }

    public User User { get; set; } = null!;
    public Branch Branch { get; set; } = null!;
}