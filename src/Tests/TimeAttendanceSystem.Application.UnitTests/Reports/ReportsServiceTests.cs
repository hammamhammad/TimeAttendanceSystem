using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Reports.DTOs;
using TimeAttendanceSystem.Application.Reports.Queries;
using TimeAttendanceSystem.Application.Reports.Services;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.VacationTypes;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Reports;

public class ReportsServiceTests
{
    private TestApplicationDbContext CreateContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: dbName)
            .Options;
        
        return new TestApplicationDbContext(options);
    }

    [Fact]
    public async Task GetAttendanceReport_ShouldReturnFilteredData()
    {
        // Arrange
        var dbName = "AttendanceReportDb_" + Guid.NewGuid();
        using var context = CreateContext(dbName);
        var service = new ReportsService(context);

        var employee = new Employee { Id = 1, FirstName = "John", LastName = "Doe", EmployeeNumber = "EMP001", HireDate = DateTime.Today };
        var department = new Department { Id = 1, Name = "IT" };
        employee.Department = department;
        employee.DepartmentId = 1;

        context.Departments.Add(department);
        context.Employees.Add(employee);

        var record1 = new AttendanceRecord 
        { 
            EmployeeId = 1, 
            Employee = employee,
            AttendanceDate = new DateTime(2023, 10, 1),
            ActualCheckInTime = new DateTime(2023, 10, 1, 9, 0, 0),
            ActualCheckOutTime = new DateTime(2023, 10, 1, 18, 0, 0),
            Status = AttendanceStatus.Present,
            WorkingHours = 8
        };
        
        var record2 = new AttendanceRecord 
        { 
            EmployeeId = 1, 
            Employee = employee,
            AttendanceDate = new DateTime(2023, 10, 2),
            Status = AttendanceStatus.Absent
        };

        context.AttendanceRecords.AddRange(record1, record2);
        await context.SaveChangesAsync();

        var filter = new ReportFilter 
        { 
            FromDate = new DateTime(2023, 10, 1), 
            ToDate = new DateTime(2023, 10, 1) 
        };

        // Act
        var result = await service.GetAttendanceReportAsync(filter);

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.First().Date.Should().Be(new DateTime(2023, 10, 1));
        result.Items.First().Status.Should().Be("Present");
        result.TotalPresent.Should().Be(1);
        result.TotalAbsent.Should().Be(0);
    }

    [Fact]
    public async Task GetLeaveReport_ShouldReturnFilteredData()
    {
        // Arrange
        var dbName = "LeaveReportDb_" + Guid.NewGuid();
        using var context = CreateContext(dbName);
        var service = new ReportsService(context);

        var employee = new Employee { Id = 1, FirstName = "Jane", LastName = "Doe", EmployeeNumber = "EMP002", HireDate = DateTime.Today };
        context.Employees.Add(employee);

        var vacationType = new VacationType { Id = 1, Name = "Annual" };
        context.VacationTypes.Add(vacationType);

        var vacation1 = new EmployeeVacation 
        { 
            EmployeeId = 1, 
            Employee = employee,
            VacationTypeId = 1,
            VacationType = vacationType,
            StartDate = new DateTime(2023, 10, 5),
            EndDate = new DateTime(2023, 10, 6),
            TotalDays = 2,
            IsApproved = true
        };

        var vacation2 = new EmployeeVacation 
        { 
            EmployeeId = 1, 
            Employee = employee,
            VacationTypeId = 1,
            VacationType = vacationType,
            StartDate = new DateTime(2023, 10, 10),
            EndDate = new DateTime(2023, 10, 10),
            TotalDays = 1,
            IsApproved = false
        };

        context.EmployeeVacations.AddRange(vacation1, vacation2);
        await context.SaveChangesAsync();

        var filter = new ReportFilter 
        { 
            FromDate = new DateTime(2023, 10, 1), 
            ToDate = new DateTime(2023, 10, 30) 
        };

        // Act
        var result = await service.GetLeaveReportAsync(filter);

        // Assert
        result.Items.Should().HaveCount(2);
        result.TotalApprovedDays.Should().Be(2); // Only vacation1 is approved
        
        var approvedItem = result.Items.First(i => i.StartDate.Day == 5);
        approvedItem.Status.Should().Be("Approved");

        var pendingItem = result.Items.First(i => i.StartDate.Day == 10);
        pendingItem.Status.Should().Be("Pending");
    }
}
