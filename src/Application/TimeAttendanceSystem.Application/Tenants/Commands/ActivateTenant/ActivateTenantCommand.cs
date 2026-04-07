using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.ActivateTenant;

public record ActivateTenantCommand(long Id) : ICommand<Result>;
