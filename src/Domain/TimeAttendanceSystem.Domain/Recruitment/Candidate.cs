using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Recruitment;

public class Candidate : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? NationalId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public string? Nationality { get; set; }
    public string? NationalityAr { get; set; }
    public string? ResumeUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public ApplicationSource Source { get; set; } = ApplicationSource.Website;
    public long? ReferredByEmployeeId { get; set; }
    public string? CurrentCompany { get; set; }
    public string? CurrentJobTitle { get; set; }
    public int? YearsOfExperience { get; set; }
    public string? Skills { get; set; }  // JSON array
    public string? Notes { get; set; }
    public long? ConvertedToEmployeeId { get; set; }  // set when hired

    // Navigation
    public Employee? ReferredByEmployee { get; set; }
    public Employee? ConvertedToEmployee { get; set; }
    public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
}
