using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.ShiftSwapRequests.Queries.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Queries.GetShiftSwapRequestById;

public record GetShiftSwapRequestByIdQuery(long Id) : IRequest<Result<ShiftSwapRequestDto>>;
