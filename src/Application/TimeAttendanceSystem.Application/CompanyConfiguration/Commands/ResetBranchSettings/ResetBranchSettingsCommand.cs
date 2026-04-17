using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.ResetBranchSettings;

public record ResetBranchSettingsCommand(long BranchId) : ICommand<Result>;
