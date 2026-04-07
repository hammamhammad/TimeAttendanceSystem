using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PolicyTemplates.Dtos;

namespace TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplates;

public record GetPolicyTemplatesQuery(string? Region, string? Industry = null) : ICommand<Result<List<PolicyTemplateDto>>>;
