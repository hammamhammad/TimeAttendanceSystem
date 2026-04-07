using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTags;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.NfcTags.Queries.GetNfcTagById;

/// <summary>
/// Query to get a specific NFC tag by ID.
/// </summary>
[RequiresModule(SystemModule.TimeAttendance, AllowReadWhenDisabled = true)]
public record GetNfcTagByIdQuery(long Id) : IRequest<Result<NfcTagDto>>;
