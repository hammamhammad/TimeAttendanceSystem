using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryStructures.Commands.CreateSalaryStructure;

[RequiresModule(SystemModule.Payroll)]
public record CreateSalaryStructureCommand(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    bool IsActive,
    List<CreateComponentRequest> Components
) : ICommand<Result<long>>;

public record CreateComponentRequest(
    string Name,
    string? NameAr,
    int ComponentType,
    int CalculationType,
    decimal? Amount,
    decimal? Percentage,
    bool IsRecurring,
    bool IsTaxable,
    bool IsSocialInsurable,
    int DisplayOrder
);
