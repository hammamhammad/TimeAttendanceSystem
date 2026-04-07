using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PolicyTemplates.Dtos;

namespace TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplateById;

public record GetPolicyTemplateByIdQuery(long Id) : ICommand<Result<PolicyTemplateDto>>;
