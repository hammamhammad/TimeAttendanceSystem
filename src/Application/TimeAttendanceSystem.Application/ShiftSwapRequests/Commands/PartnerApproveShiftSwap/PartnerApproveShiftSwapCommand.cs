using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerApproveShiftSwap;

public record PartnerApproveShiftSwapCommand(long Id) : ICommand<Result>;
