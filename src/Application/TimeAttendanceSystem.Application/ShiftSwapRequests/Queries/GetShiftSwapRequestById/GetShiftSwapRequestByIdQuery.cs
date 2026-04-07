using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequestById;

[RequiresModule(SystemModule.ShiftSwaps, AllowReadWhenDisabled = true)]
public record GetShiftSwapRequestByIdQuery(long Id) : IRequest<Result<ShiftSwapRequestDto>>;
