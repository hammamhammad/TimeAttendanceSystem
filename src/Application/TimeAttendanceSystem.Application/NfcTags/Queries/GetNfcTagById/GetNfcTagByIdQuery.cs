using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTags;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTagById;

/// <summary>
/// Query to get a specific NFC tag by ID.
/// </summary>
public record GetNfcTagByIdQuery(long Id) : IRequest<Result<NfcTagDto>>;
