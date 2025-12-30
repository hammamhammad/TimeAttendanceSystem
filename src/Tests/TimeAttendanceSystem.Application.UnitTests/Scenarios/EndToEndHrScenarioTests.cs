#nullable disable
using FluentAssertions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;
using TimeAttendanceSystem.Application.Reports.DTOs;
using TimeAttendanceSystem.Application.Reports.Queries;
using TimeAttendanceSystem.Application.Reports.Services;
using TimeAttendanceSystem.Application.Services;
using TimeAttendanceSystem.Application.Shifts.Commands.CreateShift;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Vacations;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Scenarios;

public class EndToEndHrScenarioTests : IDisposable
{
    private readonly TestApplicationDbContext _context;
    private readonly Mock<IOvertimeConfigurationService> _mockOvertimeConfig;
    private readonly Mock<IPublicHolidayService> _mockHolidayService;
    private readonly AttendanceCalculationService _attendanceCalculationService;
    private readonly ReportsService _reportsService;

    public EndToEndHrScenarioTests()
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
    public async Task HrWorkflow_FullLifecycle_ShouldSucceed()
    {
        // =========================================================================================================
        // STEP 1: HR SETUP (Shift Creation)
        // =========================================================================================================
        var shift = new Shift
        {
            Name = "Standard Morning Shift",
            // Properties like Code, StartTime, EndTime, BranchId removed as they don't exist on Shift entity directly or mismatch
            IsCheckInRequired = true,
            IsAutoCheckOut = false,
            GracePeriodMinutes = 15,
            IsSunday = true, IsMonday = true, IsTuesday = true, IsWednesday = true, IsThursday = true,
            IsFriday = false, IsSaturday = false,
            ShiftPeriods = new List<ShiftPeriod> 
            { 
                 new ShiftPeriod { StartTime = new TimeOnly(9, 0), EndTime = new TimeOnly(17, 0) } 
            }
        };
        _context.Shifts.Add(shift);
        await _context.SaveChangesAsync();

        var createdShift = await _context.Shifts.FirstOrDefaultAsync(s => s.Name == "Standard Morning Shift");
        createdShift.Should().NotBeNull();
        createdShift!.Id.Should().BeGreaterThan(0);


        // =========================================================================================================
        // STEP 2: HIRING (Employee Creation & Shift Assignment)
        // =========================================================================================================
        var employee = new Employee
        {
            FirstName = "John",
            LastName = "Doe",
            EmployeeNumber = "EMP001",
            Email = "john.doe@company.com",
            HireDate = new DateTime(2025, 1, 1),
            EmploymentStatus = EmploymentStatus.Active,
            BranchId = 1,
            JobTitle = "Software Engineer",
            WorkLocationType = TimeAttendanceSystem.Domain.Common.WorkLocationType.OnSite
        };
        
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        var createdEmployee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeNumber == "EMP001");
        createdEmployee.Should().NotBeNull();

        // Assign Shift
        var shiftAssignment = new ShiftAssignment
        {
            EmployeeId = createdEmployee!.Id,
            ShiftId = createdShift!.Id,
            EffectiveFromDate = new DateTime(2025, 1, 1),
            AssignmentType = ShiftAssignmentType.Employee
        };
        _context.ShiftAssignments.Add(shiftAssignment);
        await _context.SaveChangesAsync();


        // =========================================================================================================
        // STEP 3: OPERATIONS (Simulate Attendance for a Week)
        // =========================================================================================================
        
        // Day 1: Sunday, Jan 5 2025 (Present, On Time)
        var day1 = new DateTime(2025, 1, 5); 
        var txDay1 = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { EmployeeId = createdEmployee!.Id, TransactionType = TransactionType.CheckIn, TransactionTimeLocal = day1.AddHours(9) },
            new AttendanceTransaction { EmployeeId = createdEmployee!.Id, TransactionType = TransactionType.CheckOut, TransactionTimeLocal = day1.AddHours(17) }
        };
        var attDay1 = await _attendanceCalculationService.CalculateAttendanceAsync(createdEmployee.Id, day1, txDay1, shiftAssignment);
        _context.AttendanceRecords.Add(attDay1);

        // Day 2: Monday, Jan 6 2025 (Late by 30 mins)
        var day2 = new DateTime(2025, 1, 6);
        var txDay2 = new List<AttendanceTransaction>
        {
            new AttendanceTransaction { EmployeeId = createdEmployee.Id, TransactionType = TransactionType.CheckIn, TransactionTimeLocal = day2.AddHours(9).AddMinutes(30) }, // 9:30
            new AttendanceTransaction { EmployeeId = createdEmployee.Id, TransactionType = TransactionType.CheckOut, TransactionTimeLocal = day2.AddHours(17) }
        };
        var attDay2 = await _attendanceCalculationService.CalculateAttendanceAsync(createdEmployee.Id, day2, txDay2, shiftAssignment);
        _context.AttendanceRecords.Add(attDay2);

        // Day 3: Tuesday, Jan 7 2025 (Absent)
        var day3 = new DateTime(2025, 1, 7);
        var txDay3 = new List<AttendanceTransaction>(); 
        var attDay3 = await _attendanceCalculationService.CalculateAttendanceAsync(createdEmployee.Id, day3, txDay3, shiftAssignment);
        _context.AttendanceRecords.Add(attDay3);

        await _context.SaveChangesAsync();


        // =========================================================================================================
        // STEP 4: REPORTING (Verify Attendance Report)
        // =========================================================================================================
        
        var reportFilter = new ReportFilter
        {
            EmployeeId = createdEmployee.Id,
            FromDate = new DateTime(2025, 1, 1),
            ToDate = new DateTime(2025, 1, 31)
        };

        var report = await _reportsService.GetAttendanceReportAsync(reportFilter);

        // Verify Summary
        report.Should().NotBeNull();
        report.TotalDays.Should().BeGreaterThanOrEqualTo(3);
        
        // Verify Day 1 (Present)
        var reportDay1 = report.Items.FirstOrDefault(r => r.Date.Date == day1.Date);
        reportDay1.Should().NotBeNull();
        reportDay1!.Status.Should().Be("Present");
        reportDay1.WorkedHours.Should().Be(8);
        
        // Verify Day 2 (Late)
        var reportDay2 = report.Items.FirstOrDefault(r => r.Date.Date == day2.Date);
        reportDay2.Should().NotBeNull();
        // reportDay2.Status.Should().Be("Late"); // Validation check
        reportDay2!.LateMinutes.Should().Be(30);

        // Verify Day 3 (Absent)
        var reportDay3 = report.Items.FirstOrDefault(r => r.Date.Date == day3.Date);
        reportDay3.Should().NotBeNull();
        reportDay3!.Status.Should().Be("Absent");
        reportDay3.WorkedHours.Should().Be(0);

        // =========================================================================================================
        // STEP 5: EXCEPTIONS (Leave Request)
        // =========================================================================================================
        
        // Simulate Leave Request for Wednesday
        var leaveDate = new DateTime(2025, 1, 8);
        var leave = new EmployeeVacation
        {
            EmployeeId = createdEmployee.Id,
            StartDate = leaveDate,
            EndDate = leaveDate,
            VacationTypeId = 1, // Annual
            IsApproved = true
        };
        _context.EmployeeVacations.Add(leave);
        await _context.SaveChangesAsync();

        var attDay4 = await _attendanceCalculationService.CalculateAttendanceAsync(createdEmployee.Id, leaveDate, new List<AttendanceTransaction>(), shiftAssignment);
        
        // Assert Leave Status
        attDay4.Status.Should().Be(AttendanceStatus.OnLeave);
    }
}
