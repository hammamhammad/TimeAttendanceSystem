using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffs;

public record GetCompensatoryOffsQuery(
    long? BranchId = null,
    long? EmployeeId = null,
    CompensatoryOffStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
