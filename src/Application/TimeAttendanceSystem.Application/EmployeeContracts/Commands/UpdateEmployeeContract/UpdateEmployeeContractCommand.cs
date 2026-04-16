using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.UpdateEmployeeContract;

public record UpdateEmployeeContractCommand(
    long Id,
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
) : ICommand<Result>;
