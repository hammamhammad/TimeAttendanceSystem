using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Reports.DTOs;
using TimeAttendanceSystem.Application.Reports.Services;
using TimeAttendanceSystem.Application.Services;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Application.Reports.Queries;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.Shifts;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Scenarios;

public class WeeklyHoursScenarioTests : IDisposable
{
    private readonly TestApplicationDbContext _context;
    private readonly Mock<IOvertimeConfigurationService> _mockOvertimeConfig;
    private readonly Mock<IPublicHolidayService> _mockHolidayService;
    private readonly AttendanceCalculationService _attendanceCalculationService;
    private readonly ReportsService _reportsService;

    public WeeklyHoursScenarioTests()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        _context = new TestApplicationDbContext(options);

        // Setup common infrastructure mocks
        _mockOvertimeConfig = new Mock<IOvertimeConfigurationService>();
        _mockOvertimeConfig.Setup(x => x.GetActiveConfigurationAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new OvertimeConfiguration { Id = 1, IsActive = true });
        _mockOvertimeConfig.Setup(x => x.GetDayTypeAsync(It.IsAny<DateTime>(), It.IsAny<long>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(DayType.Normal);
        _mockOvertimeConfig.Setup(x => x.GetOvertimeRateAsync(It.IsAny<DateTime>(), It.IsAny<long>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1.5m);

        _mockHolidayService = new Mock<IPublicHolidayService>();
        _mockHolidayService.Setup(x => x.IsHolidayAsync(It.IsAny<DateTime>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        // Setup Services
        _attendanceCalculationService = new AttendanceCalculationService(
            _context,
            _mockOvertimeConfig.Object,
            _mockHolidayService.Object
        );
        
        _reportsService = new ReportsService(_context);
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    [Fact]
    public async Task WeeklyHours_ShouldCalculateOvertime_WhenLimitExceeded()
    {
        // 1. Create Shift with 40 Weekly Hours
        var shift = new Shift
        {
            Name = "Weekly 40h Shift",
            RequiredWeeklyHours = 40,
            HasCoreHours = true,
            CoreStart = new TimeOnly(10, 0),
            CoreEnd = new TimeOnly(15, 0),
            IsCheckInRequired = true,
            ShiftPeriods = new List<ShiftPeriod> 
            { 
                 new ShiftPeriod { StartTime = new TimeOnly(9, 0), EndTime = new TimeOnly(17, 0) } 
            }
        };
        _context.Shifts.Add(shift);
        await _context.SaveChangesAsync();

        // 2. Create Employee
        var employee = new Employee
        {
            FirstName = "Weekly",
            LastName = "Tester",
            EmployeeNumber = "WK001",
            Email = "weekly@test.com",
            HireDate = new DateTime(2025, 1, 1),
            BranchId = 1,
            WorkLocationType = TimeAttendanceSystem.Domain.Common.WorkLocationType.OnSite
        };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        // 3. Assign Shift
        var shiftAssignment = new ShiftAssignment
        {
            EmployeeId = employee.Id,
            ShiftId = shift.Id,
            EffectiveFromDate = new DateTime(2025, 1, 1),
            AssignmentType = ShiftAssignmentType.Employee
        };
        _context.ShiftAssignments.Add(shiftAssignment);
        await _context.SaveChangesAsync();

        // 4. Simulate One Week of Attendance (5 days x 9 hours = 45 hours)
        // Week: Jan 5 (Sun) to Jan 9 (Thu)
        var startDate = new DateTime(2025, 1, 5); // Sunday
        for (int i = 0; i < 5; i++)
        {
            var date = startDate.AddDays(i);
            var tx = new List<AttendanceTransaction>
            {
                new AttendanceTransaction { EmployeeId = employee.Id, TransactionType = TransactionType.CheckIn, TransactionTimeLocal = date.AddHours(8) }, // 8:00
                new AttendanceTransaction { EmployeeId = employee.Id, TransactionType = TransactionType.CheckOut, TransactionTimeLocal = date.AddHours(17) } // 17:00 (9 hours)
            };
            
            var record = await _attendanceCalculationService.CalculateAttendanceAsync(employee.Id, date, tx, shiftAssignment);
            _context.AttendanceRecords.Add(record);
        }
        await _context.SaveChangesAsync();

        // 5. Generate Report
        var filter = new ReportFilter
        {
            EmployeeId = employee.Id,
            FromDate = startDate,
            ToDate = startDate.AddDays(6)
        };
        var report = await _reportsService.GetAttendanceReportAsync(filter);

        // 6. Verify Weekly Stats
        report.Items.Should().NotBeEmpty();
        var firstItem = report.Items.First();

        // Verify that EACH item in the week has the summary data
        // Total Worked: 9 * 5 = 45 hours
        // Required: 40 hours
        // Overtime: 5 hours
        firstItem.WeeklyTotalHours.Should().Be(45);
        firstItem.WeeklyRequiredHours.Should().Be(40);
        firstItem.WeeklyOvertimeHours.Should().Be(5);
        firstItem.WeeklyShortageHours.Should().Be(0);
    }
}
