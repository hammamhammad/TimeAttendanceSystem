namespace TecAxle.Hrms.Application.SetupTracking.Dtos;

public class SetupStatusDto
{
    public long TenantId { get; set; }
    public int TotalSteps { get; set; }
    public int CompletedSteps { get; set; }
    public int RequiredSteps { get; set; }
    public int CompletedRequiredSteps { get; set; }
    public double CompletionPercentage { get; set; }
    public string? NextRecommendedStep { get; set; }
    public List<SetupStepDto> Steps { get; set; } = new();
    public List<SetupCategoryDto> Categories { get; set; } = new();
}

public class SetupStepDto
{
    public long Id { get; set; }
    public string StepKey { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public bool IsRequired { get; set; }
    public int SortOrder { get; set; }
}

public class SetupCategoryDto
{
    public string Category { get; set; } = string.Empty;
    public int Total { get; set; }
    public int Completed { get; set; }
    public double Percentage { get; set; }
}
