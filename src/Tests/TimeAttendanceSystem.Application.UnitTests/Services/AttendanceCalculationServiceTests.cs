using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Services;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.RemoteWork;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Services;

public class AttendanceCalculationServiceTests : IDisposable
{
    private readonly TestApplicationDbContext _context;
    private readonly Mock<IOvertimeConfigurationService> _mockOvertimeConfig;
    private readonly Mock<IPublicHolidayService> _mockHolidayService;
    private readonly AttendanceCalculationService _service;

    public AttendanceCalculationServiceTests()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        _context = new TestApplicationDbContext(options);

        _mockOvertimeConfig = new Mock<IOvertimeConfigurationService>();
        _mockHolidayService = new Mock<IPublicHolidayService>();

        // Setup default mocks
        _mockOvertimeConfig.Setup(x => x.GetActiveConfigurationAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new OvertimeConfiguration { Id = 1, IsActive = true });
        
        _mockOvertimeConfig.Setup(x => x.GetDayTypeAsync(It.IsAny<DateTime>(), It.IsAny<long>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(DayType.Normal);

        _mockOvertimeConfig.Setup(x => x.GetOvertimeRateAsync(It.IsAny<DateTime>(), It.IsAny<long>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(1.5m);

        _mockHolidayService.Setup(x => x.IsHolidayAsync(It.IsAny<DateTime>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        _service = new AttendanceCalculationService(
            _context,
            _mockOvertimeConfig.Object,
            _mockHolidayService.Object
        );
    }

    public void Dispose()
    {
        _context.Dispose();
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldReturnAbsent_WhenNoCheckIn()
    {
        // Arrange
        var employee = new Employee { Id = 1, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var date = new DateTime(2025, 12, 25);
        var transactions = new List<AttendanceTransaction>();
        var shift = new Shift { Id = 1, IsCheckInRequired = true };
        var assignment = new ShiftAssignment { Id = 1, Shift = shift, ShiftId = 1 };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Absent);
        result.WorkingHours.Should().Be(0);
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldReturnPresent_WhenCheckInAndOutExist()
    {
        // Arrange
        var employee = new Employee { Id = 2, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        
        var date = new DateTime(2025, 12, 25); // Thursday
        var transactions = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { TransactionType = TransactionType.CheckIn, TransactionTimeLocal = date.AddHours(9), TransactionTimeUtc = date.AddHours(9).ToUniversalTime() },
            new AttendanceTransaction { TransactionType = TransactionType.CheckOut, TransactionTimeLocal = date.AddHours(17), TransactionTimeUtc = date.AddHours(17).ToUniversalTime() }
        };
        var shift = new Shift 
        { 
            Id = 2,
            IsCheckInRequired = true,
            IsThursday = true,
            ShiftPeriods = new List<ShiftPeriod> 
            { 
                new ShiftPeriod { StartTime = new TimeOnly(9, 0), EndTime = new TimeOnly(17, 0) } 
            }
        };
        var assignment = new ShiftAssignment { Shift = shift };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Present);
        result.WorkingHours.Should().Be(8);
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldReturnLate_WhenCheckInAfterGracePeriod()
    {
        // Arrange
        var employee = new Employee { Id = 3, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var date = new DateTime(2025, 12, 25);
        var scheduledStart = new TimeOnly(9, 0);
        var gracePeriod = 15;
        
        // Late arrival: 9:20 (20 mins late, which is > 15 grace)
        var checkInTime = date.Add(scheduledStart.ToTimeSpan()).AddMinutes(20); 
        
        var transactions = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { TransactionType = TransactionType.CheckIn, TransactionTimeLocal = checkInTime, TransactionTimeUtc = checkInTime.ToUniversalTime() },
            new AttendanceTransaction { TransactionType = TransactionType.CheckOut, TransactionTimeLocal = date.AddHours(17), TransactionTimeUtc = date.AddHours(17).ToUniversalTime() }
        };
        
        var shift = new Shift { 
            Id = 3,
            IsCheckInRequired = true,
            GracePeriodMinutes = gracePeriod,
            IsThursday = true,
            ShiftPeriods = new List<ShiftPeriod> { new ShiftPeriod { StartTime = scheduledStart, EndTime = new TimeOnly(17, 0) } }
        };
        var assignment = new ShiftAssignment { Shift = shift };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Late);
        result.LateMinutes.Should().Be(20, "Should count full late minutes when grace period exceeded");
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldReturnPresent_WhenCheckInWithinGracePeriod()
    {
        // Arrange
        var employee = new Employee { Id = 4, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var date = new DateTime(2025, 12, 25);
        var scheduledStart = new TimeOnly(9, 0);
        var gracePeriod = 15;
        
        // Late arrival: 9:10 (10 mins late, which is < 15 grace)
        var checkInTime = date.Add(scheduledStart.ToTimeSpan()).AddMinutes(10);
        
        var transactions = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { TransactionType = TransactionType.CheckIn, TransactionTimeLocal = checkInTime, TransactionTimeUtc = checkInTime.ToUniversalTime() },
            new AttendanceTransaction { TransactionType = TransactionType.CheckOut, TransactionTimeLocal = date.AddHours(17), TransactionTimeUtc = date.AddHours(17).ToUniversalTime() }
        };
        
        var shift = new Shift { 
            Id = 4,
            IsCheckInRequired = true,
            GracePeriodMinutes = gracePeriod,
            IsThursday = true,
            ShiftPeriods = new List<ShiftPeriod> { new ShiftPeriod { StartTime = scheduledStart, EndTime = new TimeOnly(17, 0) } }
        };
        var assignment = new ShiftAssignment { Shift = shift };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Present);
        result.LateMinutes.Should().Be(0, "Should be 0 late minutes when within grace period");
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldPrioritizeHoliday_OverAbsent()
    {
        // Arrange
        var employee = new Employee { Id = 5, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var date = new DateTime(2025, 12, 25);
        var transactions = new List<AttendanceTransaction>(); // No transactions
        
        // Mock Holiday Service to return true for branch logic if needed, but employee exists now
        _mockHolidayService.Setup(x => x.IsHolidayAsync(It.IsAny<DateTime>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);
        
        var shift = new Shift { Id = 5, IsCheckInRequired = true, IsThursday = true, ShiftPeriods = new List<ShiftPeriod> { new ShiftPeriod { StartTime = new TimeOnly(9,0), EndTime = new TimeOnly(17,0) } } };
        var assignment = new ShiftAssignment { Shift = shift };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Holiday);
    }

    [Fact]
    public async Task CalculateAttendanceAsync_ShouldCalculateOvertime_OnHoliday()
    {
        // Arrange
        var employee = new Employee { Id = 6, FirstName = "Test", LastName = "User" };
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var date = new DateTime(2025, 12, 25);
        
        // Worked 5 hours on a holiday
        var transactions = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { TransactionType = TransactionType.CheckIn, TransactionTimeLocal = date.AddHours(10), TransactionTimeUtc = date.AddHours(10).ToUniversalTime() },
            new AttendanceTransaction { TransactionType = TransactionType.CheckOut, TransactionTimeLocal = date.AddHours(15), TransactionTimeUtc = date.AddHours(15).ToUniversalTime() }
        };

        // Mock Holiday Service to return true
        _mockHolidayService.Setup(x => x.IsHolidayAsync(It.IsAny<DateTime>(), It.IsAny<long?>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);
            
        var shift = new Shift { Id = 6, IsCheckInRequired = true, IsThursday = true, ShiftPeriods = new List<ShiftPeriod> { new ShiftPeriod { StartTime = new TimeOnly(9,0), EndTime = new TimeOnly(17,0) } } };
        var assignment = new ShiftAssignment { Shift = shift };

        // Act
        var result = await _service.CalculateAttendanceAsync(employee.Id, date, transactions, assignment);

        // Assert
        result.Status.Should().Be(AttendanceStatus.Holiday);
        result.OvertimeHours.Should().Be(5, "All worked hours on a holiday should be overtime");
    }
}
