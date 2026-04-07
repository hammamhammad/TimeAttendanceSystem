using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.CreatePolicyTemplate;

public record CreatePolicyTemplateCommand(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    string Region,
    string? Industry,
    List<CreatePolicyTemplateItemDto> Items
) : ICommand<Result<long>>;

public class CreatePolicyTemplateItemDto
{
    public string PolicyType { get; set; } = string.Empty;
    public string ConfigurationJson { get; set; } = "{}";
    public int SortOrder { get; set; }
}
