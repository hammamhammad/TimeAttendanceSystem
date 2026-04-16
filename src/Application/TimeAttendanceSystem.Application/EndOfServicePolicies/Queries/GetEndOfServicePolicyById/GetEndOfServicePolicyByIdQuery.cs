using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EndOfServicePolicies.Dtos;

namespace TecAxle.Hrms.Application.EndOfServicePolicies.Queries.GetEndOfServicePolicyById;

public record GetEndOfServicePolicyByIdQuery(long Id) : IRequest<Result<EndOfServicePolicyDto>>;

public class GetEndOfServicePolicyByIdQueryHandler : BaseHandler<GetEndOfServicePolicyByIdQuery, Result<EndOfServicePolicyDto>>
{
    public GetEndOfServicePolicyByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<EndOfServicePolicyDto>> Handle(GetEndOfServicePolicyByIdQuery request, CancellationToken cancellationToken)
    {
        var policy = await Context.EndOfServicePolicies
            .AsNoTracking()
            .Include(p => p.Tiers)
            .Include(p => p.ResignationDeductions)
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (policy == null) return Result.Failure<EndOfServicePolicyDto>("End-of-service policy not found.");

        return Result.Success(GetEndOfServicePolicies.GetEndOfServicePoliciesQueryHandler.MapToDto(policy));
    }
}
