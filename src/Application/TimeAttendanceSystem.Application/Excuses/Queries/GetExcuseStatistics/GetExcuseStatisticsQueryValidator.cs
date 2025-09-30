using FluentValidation;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcuseStatistics;

/// <summary>
/// Fluent Validation rules for GetExcuseStatisticsQuery.
/// Ensures data integrity before processing the statistics request.
/// </summary>
public class GetExcuseStatisticsQueryValidator : AbstractValidator<GetExcuseStatisticsQuery>
{
    public GetExcuseStatisticsQueryValidator()
    {
        RuleFor(x => x.EmployeeId)
            .GreaterThan(0)
            .WithMessage("Employee ID must be valid");

        RuleFor(x => x.Year)
            .GreaterThan(2000)
            .LessThanOrEqualTo(DateTime.Now.Year + 1)
            .WithMessage($"Year must be between 2000 and {DateTime.Now.Year + 1}");

        RuleFor(x => x.Month)
            .InclusiveBetween(1, 12)
            .When(x => x.Month.HasValue)
            .WithMessage("Month must be between 1 and 12 when provided");
    }
}