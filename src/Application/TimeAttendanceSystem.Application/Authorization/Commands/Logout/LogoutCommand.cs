using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.Logout;

public record LogoutCommand(string? RefreshToken = null, bool LogoutFromAllDevices = false) : IRequest<Result<bool>>;