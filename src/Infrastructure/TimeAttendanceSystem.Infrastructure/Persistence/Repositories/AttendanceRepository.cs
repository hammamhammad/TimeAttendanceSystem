using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository implementation for attendance record data access operations.
/// Provides comprehensive data access methods for attendance management and reporting.
/// </summary>
public class AttendanceRepository : IAttendanceRepository
{
    private readonly TimeAttendanceDbContext _context;

    public AttendanceRepository(TimeAttendanceDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceRecord?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .FirstOrDefaultAsync(ar => ar.Id == id, cancellationToken);
    }

    public async Task<AttendanceRecord?> GetByEmployeeAndDateAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .FirstOrDefaultAsync(ar => ar.EmployeeId == employeeId &&
                                      ar.AttendanceDate.Date == attendanceDate.Date,
                                cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetByEmployeeAndDateRangeAsync(long employeeId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => ar.EmployeeId == employeeId &&
                        ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date)
            .OrderBy(ar => ar.AttendanceDate)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetByEmployeesAndDateAsync(IEnumerable<long> employeeIds, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var employeeIdList = employeeIds.ToList();
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => employeeIdList.Contains(ar.EmployeeId) &&
                        ar.AttendanceDate.Date == attendanceDate.Date)
            .OrderBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetByBranchAndDateRangeAsync(long branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => ar.Employee.BranchId == branchId &&
                        ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date)
            .OrderBy(ar => ar.AttendanceDate)
            .ThenBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetByDepartmentAndDateRangeAsync(long departmentId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => ar.Employee.DepartmentId == departmentId &&
                        ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date)
            .OrderBy(ar => ar.AttendanceDate)
            .ThenBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetAllByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date)
            .OrderBy(ar => ar.AttendanceDate)
            .ThenBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetPendingApprovalAsync(long? branchId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => !ar.IsApproved &&
                        !ar.IsFinalized &&
                        (ar.IsManualOverride || ar.Status == AttendanceStatus.Late || ar.Status == AttendanceStatus.EarlyLeave));

        if (branchId.HasValue)
        {
            query = query.Where(ar => ar.Employee.BranchId == branchId.Value);
        }

        return await query
            .OrderBy(ar => ar.AttendanceDate)
            .ThenBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceRecord>> GetIncompleteRecordsAsync(long? branchId = null, DateTime? upToDate = null, CancellationToken cancellationToken = default)
    {
        var maxDate = upToDate ?? DateTime.UtcNow.Date.AddDays(-1);

        var query = _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
            .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
            .Where(ar => ar.Status == AttendanceStatus.Incomplete &&
                        ar.AttendanceDate.Date <= maxDate);

        if (branchId.HasValue)
        {
            query = query.Where(ar => ar.Employee.BranchId == branchId.Value);
        }

        return await query
            .OrderBy(ar => ar.AttendanceDate)
            .ThenBy(ar => ar.Employee.EmployeeNumber)
            .ToListAsync(cancellationToken);
    }

    public async Task<AttendanceRecord> CreateAsync(AttendanceRecord attendanceRecord, CancellationToken cancellationToken = default)
    {
        _context.AttendanceRecords.Add(attendanceRecord);
        await _context.SaveChangesAsync(cancellationToken);
        return attendanceRecord;
    }

    public async Task<List<AttendanceRecord>> CreateBatchAsync(IEnumerable<AttendanceRecord> attendanceRecords, CancellationToken cancellationToken = default)
    {
        var recordsList = attendanceRecords.ToList();
        _context.AttendanceRecords.AddRange(recordsList);
        await _context.SaveChangesAsync(cancellationToken);
        return recordsList;
    }

    public async Task<AttendanceRecord> UpdateAsync(AttendanceRecord attendanceRecord, CancellationToken cancellationToken = default)
    {
        _context.AttendanceRecords.Update(attendanceRecord);
        await _context.SaveChangesAsync(cancellationToken);
        return attendanceRecord;
    }

    public async Task<bool> DeleteAsync(long id, CancellationToken cancellationToken = default)
    {
        var record = await _context.AttendanceRecords.FindAsync(new object[] { id }, cancellationToken);
        if (record == null)
            return false;

        _context.AttendanceRecords.Remove(record);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<int> DeleteByDateAsync(DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var recordsToDelete = await _context.AttendanceRecords
            .Where(ar => ar.AttendanceDate.Date == attendanceDate.Date)
            .ToListAsync(cancellationToken);

        if (recordsToDelete.Count == 0)
            return 0;

        _context.AttendanceRecords.RemoveRange(recordsToDelete);
        await _context.SaveChangesAsync(cancellationToken);
        return recordsToDelete.Count;
    }

    public async Task<bool> ExistsAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceRecords
            .AnyAsync(ar => ar.EmployeeId == employeeId &&
                           ar.AttendanceDate.Date == attendanceDate.Date,
                     cancellationToken);
    }

    public async Task<AttendanceStatistics> GetStatisticsAsync(long? branchId, long? departmentId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        var query = _context.AttendanceRecords
            .Include(ar => ar.Employee)
            .Where(ar => ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date);

        if (branchId.HasValue)
        {
            query = query.Where(ar => ar.Employee.BranchId == branchId.Value);
        }

        if (departmentId.HasValue)
        {
            query = query.Where(ar => ar.Employee.DepartmentId == departmentId.Value);
        }

        var records = await query.ToListAsync(cancellationToken);

        var totalRecords = records.Count;
        if (totalRecords == 0)
        {
            return new AttendanceStatistics();
        }

        var presentCount = records.Count(r => r.Status == AttendanceStatus.Present);
        var absentCount = records.Count(r => r.Status == AttendanceStatus.Absent);
        var lateCount = records.Count(r => r.Status == AttendanceStatus.Late);
        var earlyLeaveCount = records.Count(r => r.Status == AttendanceStatus.EarlyLeave);
        var onLeaveCount = records.Count(r => r.Status == AttendanceStatus.OnLeave);

        var workingRecords = records.Where(r => r.WorkingHours > 0).ToList();
        var averageWorkingHours = workingRecords.Any() ? workingRecords.Average(r => r.WorkingHours) : 0;
        var totalOvertimeHours = records.Sum(r => r.OvertimeHours);

        var attendableRecords = records.Where(r => r.Status != AttendanceStatus.DayOff &&
                                                  r.Status != AttendanceStatus.Holiday &&
                                                  r.Status != AttendanceStatus.OnLeave).ToList();
        var attendanceRate = attendableRecords.Any() ?
            (decimal)(attendableRecords.Count(r => r.Status == AttendanceStatus.Present || r.Status == AttendanceStatus.Late || r.Status == AttendanceStatus.EarlyLeave)) / attendableRecords.Count * 100 : 0;

        var punctualityRate = attendableRecords.Any() ?
            (decimal)attendableRecords.Count(r => r.Status == AttendanceStatus.Present) / attendableRecords.Count * 100 : 0;

        return new AttendanceStatistics
        {
            TotalRecords = totalRecords,
            PresentCount = presentCount,
            AbsentCount = absentCount,
            LateCount = lateCount,
            EarlyLeaveCount = earlyLeaveCount,
            OnLeaveCount = onLeaveCount,
            AverageWorkingHours = averageWorkingHours,
            TotalOvertimeHours = totalOvertimeHours,
            AttendanceRate = Math.Round(attendanceRate, 2),
            PunctualityRate = Math.Round(punctualityRate, 2)
        };
    }

    public void Detach(AttendanceRecord entity)
    {
        _context.Entry(entity).State = EntityState.Detached;
    }

    public async Task<List<DailyAttendanceStatistics>> GetDailyStatisticsAsync(
        DateTime startDate,
        DateTime endDate,
        long? branchId = null,
        long? departmentId = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.AttendanceRecords.AsNoTracking();

        if (branchId.HasValue)
        {
            query = query.Where(r => r.Employee.BranchId == branchId.Value);
        }

        if (departmentId.HasValue)
        {
            query = query.Where(r => r.Employee.DepartmentId == departmentId.Value);
        }

        query = query.Where(r => r.AttendanceDate >= startDate && r.AttendanceDate <= endDate);

        var dailyStats = await query
            .GroupBy(r => r.AttendanceDate)
            .Select(g => new DailyAttendanceStatistics
            {
                Date = g.Key,
                TotalEmployees = g.Count(),
                PresentEmployees = g.Count(r => r.Status == AttendanceStatus.Present || r.Status == AttendanceStatus.Late || r.Status == AttendanceStatus.EarlyLeave),
                AbsentEmployees = g.Count(r => r.Status == AttendanceStatus.Absent),
                LateEmployees = g.Count(r => r.Status == AttendanceStatus.Late)
            })
            .OrderBy(s => s.Date)
            .ToListAsync(cancellationToken);

        return dailyStats;
    }
}