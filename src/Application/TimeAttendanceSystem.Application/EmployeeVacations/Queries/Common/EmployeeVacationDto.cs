namespace TimeAttendanceSystem.Application.EmployeeVacations.Queries.Common;

/// <summary>
/// Data Transfer Object representing an employee vacation record.
/// Contains essential vacation information for API responses and frontend consumption.
/// </summary>
/// <param name="Id">Unique identifier for the vacation record</param>
/// <param name="EmployeeId">Employee identifier for vacation assignment</param>
/// <param name="EmployeeNumber">Employee number for display purposes</param>
/// <param name="EmployeeName">Employee full name for display purposes</param>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="VacationTypeName">Vacation type name for display purposes</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="TotalDays">Total number of vacation days</param>
/// <param name="BusinessDays">Number of business days in vacation period</param>
/// <param name="IsApproved">Whether vacation is approved and affects attendance</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <param name="IsCurrentlyActive">Whether vacation is active today</param>
/// <param name="IsUpcoming">Whether vacation starts in the future</param>
/// <param name="IsCompleted">Whether vacation has ended</param>
/// <param name="CreatedAtUtc">UTC timestamp when record was created</param>
/// <param name="CreatedBy">User who created the record</param>
/// <param name="ModifiedAtUtc">UTC timestamp when record was last modified</param>
/// <param name="ModifiedBy">User who last modified the record</param>
/// <remarks>
/// DTO Features:
/// - Read-only record structure for immutability
/// - Includes computed properties for UI convenience
/// - Employee and vacation type details flattened for display
/// - Business days calculation for reporting purposes
/// - Status flags for filtering and display logic
/// - Audit trail information for compliance tracking
/// </remarks>
public record EmployeeVacationDto(
    long Id,
    long EmployeeId,
    string EmployeeNumber,
    string EmployeeName,
    long VacationTypeId,
    string VacationTypeName,
    DateTime StartDate,
    DateTime EndDate,
    int TotalDays,
    int BusinessDays,
    bool IsApproved,
    string? Notes,
    bool IsCurrentlyActive,
    bool IsUpcoming,
    bool IsCompleted,
    DateTime CreatedAtUtc,
    string CreatedBy,
    DateTime? ModifiedAtUtc,
    string? ModifiedBy
);

/// <summary>
/// Simplified Data Transfer Object for employee vacation creation requests.
/// Contains only the essential fields required to create a new vacation record.
/// </summary>
/// <param name="EmployeeId">Employee identifier for vacation assignment</param>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="IsApproved">Whether vacation is approved (default true)</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <remarks>
/// Creation DTO Features:
/// - Contains only required fields for vacation creation
/// - TotalDays calculated automatically from date range
/// - Business logic validation handled by domain entity
/// - Simple structure for API endpoint consumption
/// - Default approval status can be overridden based on business rules
/// </remarks>
public record CreateEmployeeVacationDto(
    long EmployeeId,
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved = true,
    string? Notes = null
);

/// <summary>
/// Data Transfer Object for updating existing employee vacation records.
/// Includes all fields that can be modified after creation.
/// </summary>
/// <param name="VacationTypeId">Vacation type identifier for categorization</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="IsApproved">Whether vacation is approved</param>
/// <param name="Notes">Optional notes about the vacation</param>
/// <remarks>
/// Update DTO Features:
/// - Excludes EmployeeId (cannot be changed after creation)
/// - All fields are optional for partial updates
/// - Date range validation handled by domain logic
/// - Status changes trigger attendance record updates
/// - Notes can be used for audit trail of changes
/// </remarks>
public record UpdateEmployeeVacationDto(
    long VacationTypeId,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved,
    string? Notes = null
);

/// <summary>
/// Data Transfer Object for vacation calendar view.
/// Optimized for calendar display with minimal data.
/// </summary>
/// <param name="Id">Unique identifier for the vacation record</param>
/// <param name="EmployeeId">Employee identifier for vacation assignment</param>
/// <param name="EmployeeName">Employee full name for display</param>
/// <param name="VacationTypeName">Vacation type name for display</param>
/// <param name="StartDate">Start date of vacation period</param>
/// <param name="EndDate">End date of vacation period</param>
/// <param name="IsApproved">Whether vacation is approved</param>
/// <param name="Color">Color code for calendar display (based on vacation type)</param>
/// <remarks>
/// Calendar DTO Features:
/// - Minimal data structure for performance
/// - Optimized for calendar rendering
/// - Color coding for visual differentiation
/// - Date range for calendar positioning
/// - Approval status for visual indicators
/// </remarks>
public record VacationCalendarDto(
    long Id,
    long EmployeeId,
    string EmployeeName,
    string VacationTypeName,
    DateTime StartDate,
    DateTime EndDate,
    bool IsApproved,
    string Color
);