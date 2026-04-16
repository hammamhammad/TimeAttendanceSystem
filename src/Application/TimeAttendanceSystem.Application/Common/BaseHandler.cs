using MediatR;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Application.Common;

public abstract class BaseHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    protected readonly IApplicationDbContext Context;
    protected readonly ICurrentUser CurrentUser;

    protected BaseHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        Context = context;
        CurrentUser = currentUser;
    }

    public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}
