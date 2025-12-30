using FluentAssertions;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;
using Xunit;

namespace TimeAttendanceSystem.Domain.UnitTests.Employees;

public class EmployeeTests
{
    [Fact]
    public void FullName_ShouldReturnFirstAndLastName()
    {
        // Arrange
        var employee = new Employee
        {
            FirstName = "John",
            LastName = "Doe"
        };

        // Act
        var fullName = employee.FullName;

        // Assert
        fullName.Should().Be("John Doe");
    }

    [Fact]
    public void FullNameAr_ShouldReturnNull_WhenArabicNamesAreEmpty()
    {
        // Arrange
        var employee = new Employee();

        // Act
        var fullNameAr = employee.FullNameAr;

        // Assert
        fullNameAr.Should().BeNull();
    }

    [Fact]
    public void FullNameAr_ShouldReturnCombinedName_WhenArabicNamesAreProvided()
    {
        // Arrange
        var employee = new Employee
        {
            FirstNameAr = "محمد",
            LastNameAr = "أحمد"
        };

        // Act
        var fullNameAr = employee.FullNameAr;

        // Assert
        fullNameAr.Should().Be("محمد أحمد");
    }

    [Fact]
    public void NewEmployee_ShouldBeActive_ByDefault()
    {
        // Arrange
        var employee = new Employee();

        // Act & Assert
        employee.IsActive.Should().BeTrue();
    }
}
