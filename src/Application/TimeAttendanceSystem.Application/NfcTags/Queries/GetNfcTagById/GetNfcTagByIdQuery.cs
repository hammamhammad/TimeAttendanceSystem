using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;

namespace TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagById;

/// <summary>
/// Query to get a specific NFC tag by ID.
/// </summary>
public record GetNfcTagByIdQuery(long Id) : IRequest<Result<NfcTagDto>>;
