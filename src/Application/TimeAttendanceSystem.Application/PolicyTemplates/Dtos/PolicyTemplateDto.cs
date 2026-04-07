namespace TecAxle.Hrms.Application.PolicyTemplates.Dtos;

public class PolicyTemplateDto
{
    public long Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string Region { get; set; } = "SA";
    public string? Industry { get; set; }
    public bool IsSystemTemplate { get; set; }
    public bool IsActive { get; set; }
    public int ItemCount { get; set; }
    public List<PolicyTemplateItemDto> Items { get; set; } = new();
}

public class PolicyTemplateItemDto
{
    public long Id { get; set; }
    public string PolicyType { get; set; } = string.Empty;
    public string ConfigurationJson { get; set; } = "{}";
    public int SortOrder { get; set; }
}
