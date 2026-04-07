using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.DeletePolicyTemplate;

public record DeletePolicyTemplateCommand(long Id) : ICommand<Result>;
