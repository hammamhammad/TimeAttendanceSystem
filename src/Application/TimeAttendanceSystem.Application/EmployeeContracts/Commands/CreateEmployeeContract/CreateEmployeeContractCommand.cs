using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.CreateEmployeeContract;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CreateEmployeeContractCommand(
    long EmployeeId,
    string ContractNumber,
    ContractType ContractType,
    DateTime StartDate,
    DateTime? EndDate,
    DateTime? RenewalDate,
    bool AutoRenew,
    decimal BasicSalary,
    string? Currency,
    int? ProbationPeriodDays,
    DateTime? ProbationEndDate,
    ProbationStatus ProbationStatus,
    int? NoticePeriodDays,
    string? Terms,
    string? TermsAr,
    string? DocumentUrl,
    string? Notes
) : ICommand<Result<long>>;
