using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class DependentDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }
    public DependentRelationship Relationship { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public string? NationalId { get; set; }
    public string? Phone { get; set; }
    public bool IsEmergencyContact { get; set; }
    public bool IsBeneficiary { get; set; }
    public string? Notes { get; set; }
}
