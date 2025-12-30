using FluentAssertions;
using Moq;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Shifts;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Employees.Commands;

public class CreateEmployeeCommandHandlerTests
{
    private readonly TestApplicationDbContext _context;
    private readonly Mock<ICurrentUser> _mockCurrentUser;
    private readonly CreateEmployeeCommandHandler _handler;

    public CreateEmployeeCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new TestApplicationDbContext(options);
        
        _mockCurrentUser = new Mock<ICurrentUser>();
        _mockCurrentUser.Setup(u => u.IsSystemAdmin).Returns(true);
        _mockCurrentUser.Setup(u => u.Username).Returns("testadmin");

        _handler = new CreateEmployeeCommandHandler(_context, _mockCurrentUser.Object);
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenBranchDoesNotExist()
    {
        // Arrange
        var command = CreateCommand();

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Should().Contain("Branch does not exist");
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenEmployeeNumberExistsInBranch()
    {
        // Arrange
        var command = CreateCommand();
        _context.Branches.Add(new Branch { Id = command.BranchId, Name = "Test Branch", CreatedBy = "system" });
        _context.Employees.Add(new Employee 
        { 
            BranchId = command.BranchId, 
            EmployeeNumber = command.EmployeeNumber,
            FirstName = "Existing",
            LastName = "User",
            JobTitle = "Job",
            CreatedBy = "system" 
        });
        await _context.SaveChangesAsync();

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Should().Contain("Employee number already exists");
    }

    [Fact]
    public async Task Handle_ShouldCreateEmployee_WhenValidationPasses()
    {
        // Arrange
        var command = CreateCommand();
        _context.Branches.Add(new Branch { Id = command.BranchId, Name = "Test Branch", CreatedBy = "system" });
        
        // Add default shift
        _context.Shifts.Add(new Shift { Id = 1, IsDefault = true, Status = ShiftStatus.Active, Name = "Default", CreatedBy = "system" });
        await _context.SaveChangesAsync();

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        
        var employee = await _context.Employees.FindAsync(result.Value);
        employee.Should().NotBeNull();
        employee!.EmployeeNumber.Should().Be(command.EmployeeNumber);
    }



    private static CreateEmployeeCommand CreateCommand()
    {
        return new CreateEmployeeCommand(
            BranchId: 1,
            EmployeeNumber: "EMP001",
            FirstName: "John",
            LastName: "Doe",
            FirstNameAr: null,
            LastNameAr: null,
            NationalId: null,
            Email: "john.doe@example.com",
            Phone: "123456",
            DateOfBirth: DateTime.Now.AddYears(-30),
            Gender: Gender.Male,
            HireDate: DateTime.Now,
            EmploymentStatus: EmploymentStatus.Active,
            JobTitle: "Developer",
            JobTitleAr: null,
            DepartmentId: null,
            ManagerEmployeeId: null,
            WorkLocationType: WorkLocationType.OnSite
        );
    }
}
