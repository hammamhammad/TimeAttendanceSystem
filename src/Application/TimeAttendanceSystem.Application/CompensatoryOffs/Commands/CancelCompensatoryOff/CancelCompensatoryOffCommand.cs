using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Commands.CancelCompensatoryOff;

public record CancelCompensatoryOffCommand(long Id) : ICommand<Result>;
