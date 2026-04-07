using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PolicyTemplates.Commands.CreatePolicyTemplate;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.UpdatePolicyTemplate;

public record UpdatePolicyTemplateCommand(
    long Id,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    string Region,
    string? Industry,
    List<CreatePolicyTemplateItemDto> Items
) : ICommand<Result>;
