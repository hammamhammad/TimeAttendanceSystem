using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Commands.DeleteTerminationRecord;

public record DeleteTerminationRecordCommand(long Id) : ICommand<Result>;
