using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerRejectShiftSwap;

public record PartnerRejectShiftSwapCommand(long Id, string? RejectionReason) : ICommand<Result>;
