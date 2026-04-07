using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeUserLink
{
    public long EmployeeId { get; set; }
    public long UserId { get; set; }

    public Employee Employee { get; set; } = null!;
    public User User { get; set; } = null!;
}