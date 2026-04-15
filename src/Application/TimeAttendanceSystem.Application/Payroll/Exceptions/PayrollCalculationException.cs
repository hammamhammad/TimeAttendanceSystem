namespace TecAxle.Hrms.Application.Payroll.Exceptions;

/// <summary>
/// Thrown when a payroll calculation cannot proceed for a specific employee or period
/// (e.g. overlapping effective records where only one should apply, corrupt configuration).
/// The orchestrator catches this per employee, records it in <c>PayrollRunAudit</c>,
/// and continues with the remaining employees.
/// </summary>
public class PayrollCalculationException : Exception
{
    public long? EmployeeId { get; }
    public string? Category { get; }

    public PayrollCalculationException(string message, long? employeeId = null, string? category = null)
        : base(message)
    {
        EmployeeId = employeeId;
        Category = category;
    }

    public PayrollCalculationException(string message, Exception inner, long? employeeId = null, string? category = null)
        : base(message, inner)
    {
        EmployeeId = employeeId;
        Category = category;
    }
}
