namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class EmergencyContactDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string Relationship { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? AlternatePhone { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }
}
