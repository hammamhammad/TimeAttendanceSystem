using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.TenantConfiguration.Commands.ResetBranchSettings;

public record ResetBranchSettingsCommand(long BranchId) : ICommand<Result>;
