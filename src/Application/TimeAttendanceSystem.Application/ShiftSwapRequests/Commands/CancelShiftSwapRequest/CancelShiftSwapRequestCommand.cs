using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CancelShiftSwapRequest;

[RequiresModule(SystemModule.ShiftSwaps)]
public record CancelShiftSwapRequestCommand(long Id) : ICommand<Result>;
