using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.VacationTypes;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Domain.Vacations;

/// <summary>
/// Domain entity representing an employee vacation period.
/// Tracks approved vacation periods and integrates with attendance calculations.
/// </summary>
/// <remarks>
/// EmployeeVacation Entity Features:
/// - Simple vacation period tracking with start/end dates
/// - Integration with VacationTypes for categorization
/// - Approved status control for attendance integration
/// - Historical vacation records support (past dates allowed)
/// - Conflict detection to prevent overlapping vacations
/// - Business days calculation excluding weekends
///
/// Business Rules:
/// - End date must be after or equal to start date
/// - No overlapping vacations for the same employee
/// - Only approved vacations affect attendance records
/// - Vacation periods can be in the past for historical accuracy
/// - Total days calculated automatically based on date range
///
/// Attendance Integration:
/// - Approved vacations automatically mark attendance as OnLeave
/// - Prevents clock-in/out during approved vacation periods
/// - Updates existing attendance records when vacation status changes
/// </remarks>
public class EmployeeVacation : BaseEntity
{
    /// <summary>
    /// Gets or sets the employee identifier for this vacation record.
    /// Links the vacation to the specific employee taking leave.
    /// </summary>
    /// <value>Employee ID for vacation assignment</value>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the vacation type identifier for categorization.
    /// Links to the vacation type configuration for this leave period.
    /// </summary>
    /// <value>Vacation type ID for categorization and policy application</value>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Gets or sets the start date of the vacation period.
    /// Can be in the past for historical record keeping.
    /// </summary>
    /// <value>Start date of vacation period</value>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date of the vacation period.
    /// Must be after or equal to the start date.
    /// </summary>
    /// <value>End date of vacation period</value>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets the total number of days for this vacation period.
    /// Calculated automatically based on start and end dates.
    /// </summary>
    /// <value>Total vacation days including weekends</value>
    public int TotalDays { get; set; }

    /// <summary>
    /// Gets or sets whether this vacation period is approved.
    /// Only approved vacations affect attendance calculations.
    /// </summary>
    /// <value>True if vacation is approved and affects attendance</value>
    public bool IsApproved { get; set; } = true;

    /// <summary>
    /// Gets or sets optional notes about this vacation period.
    /// Free-text field for additional context or explanations.
    /// </summary>
    /// <value>Optional notes about the vacation</value>
    public string? Notes { get; set; }

    /// <summary>
    /// Gets or sets the workflow instance ID for approval tracking.
    /// Null if no workflow is configured for this entity type.
    /// </summary>
    /// <value>Workflow instance ID for approval workflow (nullable)</value>
    public long? WorkflowInstanceId { get; set; }

    /// <summary>
    /// Gets or sets the user ID who submitted this vacation request.
    /// This may differ from the employee's user when a manager submits on behalf of a team member.
    /// </summary>
    /// <value>User ID of the request submitter</value>
    public long? SubmittedByUserId { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the employee entity this vacation belongs to.
    /// Navigation property providing access to employee details.
    /// </summary>
    /// <value>Employee entity for vacation assignment</value>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Gets or sets the vacation type entity for this vacation.
    /// Navigation property providing access to vacation type configuration.
    /// </summary>
    /// <value>Vacation type entity for categorization</value>
    public VacationType VacationType { get; set; } = null!;

    /// <summary>
    /// Gets or sets the workflow instance for approval tracking.
    /// Navigation property for accessing workflow status and history.
    /// </summary>
    /// <value>Workflow instance entity (nullable)</value>
    public WorkflowInstance? WorkflowInstance { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Calculates and updates the total days based on start and end dates.
    /// Includes all days (weekdays and weekends) in the range.
    /// </summary>
    public void CalculateTotalDays()
    {
        TotalDays = (EndDate.Date - StartDate.Date).Days + 1;
    }

    /// <summary>
    /// Calculates business days (excluding weekends) in the vacation period.
    /// </summary>
    /// <returns>Number of business days in the vacation period</returns>
    public int CalculateBusinessDays()
    {
        var businessDays = 0;
        var currentDate = StartDate.Date;

        while (currentDate <= EndDate.Date)
        {
            if (currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
            {
                businessDays++;
            }
            currentDate = currentDate.AddDays(1);
        }

        return businessDays;
    }

    /// <summary>
    /// Checks if this vacation period overlaps with another vacation period.
    /// </summary>
    /// <param name="otherStartDate">Other vacation start date</param>
    /// <param name="otherEndDate">Other vacation end date</param>
    /// <returns>True if there is overlap</returns>
    public bool OverlapsWith(DateTime otherStartDate, DateTime otherEndDate)
    {
        return StartDate.Date <= otherEndDate.Date && EndDate.Date >= otherStartDate.Date;
    }

    /// <summary>
    /// Checks if a specific date falls within this vacation period.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <returns>True if the date is within the vacation period</returns>
    public bool ContainsDate(DateTime date)
    {
        return date.Date >= StartDate.Date && date.Date <= EndDate.Date;
    }

    /// <summary>
    /// Gets a list of all dates included in this vacation period.
    /// </summary>
    /// <returns>List of dates in the vacation period</returns>
    public List<DateTime> GetVacationDates()
    {
        var dates = new List<DateTime>();
        var currentDate = StartDate.Date;

        while (currentDate <= EndDate.Date)
        {
            dates.Add(currentDate);
            currentDate = currentDate.AddDays(1);
        }

        return dates;
    }

    /// <summary>
    /// Validates the vacation period business rules and data integrity.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateVacation()
    {
        var errors = new List<string>();

        // Validate date range
        if (EndDate.Date < StartDate.Date)
        {
            errors.Add("End date must be after or equal to start date");
        }

        // Validate employee and vacation type are set
        if (EmployeeId <= 0)
        {
            errors.Add("Employee is required");
        }

        if (VacationTypeId <= 0)
        {
            errors.Add("Vacation type is required");
        }

        // Validate total days calculation
        var calculatedDays = (EndDate.Date - StartDate.Date).Days + 1;
        if (TotalDays != calculatedDays)
        {
            errors.Add("Total days calculation is incorrect");
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Gets a summary description of this vacation period.
    /// </summary>
    /// <returns>String summary of vacation details</returns>
    public string GetSummaryDescription()
    {
        var status = IsApproved ? "Approved" : "Pending";
        var duration = TotalDays == 1 ? "1 day" : $"{TotalDays} days";

        if (StartDate.Date == EndDate.Date)
        {
            return $"{StartDate:MMM dd, yyyy} ({duration}) - {status}";
        }

        return $"{StartDate:MMM dd} - {EndDate:MMM dd, yyyy} ({duration}) - {status}";
    }

    /// <summary>
    /// Determines if this vacation is currently active (today falls within the period).
    /// </summary>
    /// <returns>True if vacation is active today</returns>
    public bool IsCurrentlyActive()
    {
        var today = DateTime.Today;
        return IsApproved && ContainsDate(today);
    }

    /// <summary>
    /// Determines if this vacation is in the future.
    /// </summary>
    /// <returns>True if vacation starts in the future</returns>
    public bool IsUpcoming()
    {
        return StartDate.Date > DateTime.Today;
    }

    /// <summary>
    /// Determines if this vacation is in the past.
    /// </summary>
    /// <returns>True if vacation has ended</returns>
    public bool IsCompleted()
    {
        return EndDate.Date < DateTime.Today;
    }

    /// <summary>
    /// Updates the vacation dates and recalculates total days.
    /// </summary>
    /// <param name="startDate">New start date</param>
    /// <param name="endDate">New end date</param>
    public void UpdateDates(DateTime startDate, DateTime endDate)
    {
        StartDate = startDate;
        EndDate = endDate;
        CalculateTotalDays();
    }

    /// <summary>
    /// Updates the approval status of this vacation.
    /// </summary>
    /// <param name="isApproved">New approval status</param>
    /// <param name="notes">Optional notes about the status change</param>
    public void UpdateApprovalStatus(bool isApproved, string? notes = null)
    {
        IsApproved = isApproved;
        if (!string.IsNullOrEmpty(notes))
        {
            Notes = string.IsNullOrEmpty(Notes) ? notes : $"{Notes}\n{notes}";
        }
    }
}