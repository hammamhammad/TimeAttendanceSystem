using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.SuspendTenant;

public record SuspendTenantCommand(long Id) : ICommand<Result>;
