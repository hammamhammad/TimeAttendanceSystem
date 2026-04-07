using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.ApplyPolicyTemplate;

public record ApplyPolicyTemplateCommand(long TemplateId, long? BranchId) : ICommand<Result>;
