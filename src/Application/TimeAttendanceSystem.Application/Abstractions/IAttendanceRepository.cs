using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Repository interface for attendance record data access operations.
/// Provides comprehensive data access methods for attendance management and reporting.
/// </summary>
public interface IAttendanceRepository
{
    /// <summary>
    /// Gets an attendance record by its identifier.
    /// </summary>
    /// <param name="id">The attendance record identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Attendance record if found, null otherwise</returns>
    Task<AttendanceRecord?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets an attendance record by employee and date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Attendance record if found, null otherwise</returns>
    Task<AttendanceRecord?> GetByEmployeeAndDateAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance records for an employee within a date range.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records</returns>
    Task<List<AttendanceRecord>> GetByEmployeeAndDateRangeAsync(long employeeId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance records for multiple employees on a specific date.
    /// </summary>
    /// <param name="employeeIds">List of employee identifiers</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records</returns>
    Task<List<AttendanceRecord>> GetByEmployeesAndDateAsync(IEnumerable<long> employeeIds, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance records for a branch within a date range.
    /// </summary>
    /// <param name="branchId">The branch identifier</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records</returns>
    Task<List<AttendanceRecord>> GetByBranchAndDateRangeAsync(long branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance records for a department within a date range.
    /// </summary>
    /// <param name="departmentId">The department identifier</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records</returns>
    Task<List<AttendanceRecord>> GetByDepartmentAndDateRangeAsync(long departmentId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all attendance records within a date range (for authorized users).
    /// </summary>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records</returns>
    Task<List<AttendanceRecord>> GetAllByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance records that require approval.
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of attendance records pending approval</returns>
    Task<List<AttendanceRecord>> GetPendingApprovalAsync(long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets incomplete attendance records (missing check-out).
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="upToDate">Check records up to this date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of incomplete attendance records</returns>
    Task<List<AttendanceRecord>> GetIncompleteRecordsAsync(long? branchId = null, DateTime? upToDate = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new attendance record.
    /// </summary>
    /// <param name="attendanceRecord">The attendance record to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created attendance record</returns>
    Task<AttendanceRecord> CreateAsync(AttendanceRecord attendanceRecord, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates multiple attendance records in batch.
    /// </summary>
    /// <param name="attendanceRecords">List of attendance records to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of created attendance records</returns>
    Task<List<AttendanceRecord>> CreateBatchAsync(IEnumerable<AttendanceRecord> attendanceRecords, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing attendance record.
    /// </summary>
    /// <param name="attendanceRecord">The attendance record to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated attendance record</returns>
    Task<AttendanceRecord> UpdateAsync(AttendanceRecord attendanceRecord, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes an attendance record.
    /// </summary>
    /// <param name="id">The attendance record identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if deleted successfully</returns>
    Task<bool> DeleteAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes all attendance records for a specific date.
    /// </summary>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of records deleted</returns>
    Task<int> DeleteByDateAsync(DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes all attendance records for a specific date and branch.
    /// </summary>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="branchId">The branch identifier</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of records deleted</returns>
    Task<int> DeleteByDateAndBranchAsync(DateTime attendanceDate, long branchId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if an attendance record exists for employee and date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="attendanceDate">The attendance date</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if record exists</returns>
    Task<bool> ExistsAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets attendance statistics for a date range.
    /// </summary>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Attendance statistics</returns>
    Task<AttendanceStatistics> GetStatisticsAsync(long? branchId, long? departmentId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);

    /// <summary>
    /// Detaches an entity from the change tracker to avoid tracking conflicts.
    /// </summary>
    /// <param name="entity">The entity to detach</param>
    void Detach(AttendanceRecord entity);

    /// <summary>
    /// Gets daily attendance statistics for a date range (one entry per day).
    /// </summary>
    /// <param name="startDate">Start date</param>
    /// <param name="endDate">End date</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="departmentId">Optional department filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of daily statistics</returns>
    Task<List<DailyAttendanceStatistics>> GetDailyStatisticsAsync(DateTime startDate, DateTime endDate, long? branchId = null, long? departmentId = null, CancellationToken cancellationToken = default);
}

/// <summary>
/// Data transfer object for attendance statistics.
/// </summary>
public class AttendanceStatistics
{
    public int TotalRecords { get; set; }
    public int PresentCount { get; set; }
    public int AbsentCount { get; set; }
    public int LateCount { get; set; }
    public int EarlyLeaveCount { get; set; }
    public int OnLeaveCount { get; set; }
    public decimal AverageWorkingHours { get; set; }
    public decimal TotalOvertimeHours { get; set; }
    public decimal AttendanceRate { get; set; }
    public decimal PunctualityRate { get; set; }
}

/// <summary>
/// Data transfer object for daily attendance statistics.
/// </summary>
public class DailyAttendanceStatistics
{
    public DateTime Date { get; set; }
    public int TotalEmployees { get; set; }
    public int PresentEmployees { get; set; }
    public int AbsentEmployees { get; set; }
    public int LateEmployees { get; set; }
}