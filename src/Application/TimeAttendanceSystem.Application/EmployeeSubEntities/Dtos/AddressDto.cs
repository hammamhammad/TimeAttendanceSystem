using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class AddressDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public AddressType AddressType { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? CityAr { get; set; }
    public string? State { get; set; }
    public string? StateAr { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public string? CountryAr { get; set; }
    public bool IsPrimary { get; set; }
}
