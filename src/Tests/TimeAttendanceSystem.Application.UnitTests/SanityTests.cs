using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Domain.Branches;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests;

public class SanityTests
{
    [Fact]
    public void Context_ShouldWork()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        using var context = new TestApplicationDbContext(options);
        
        context.Branches.Add(new Branch { Name = "Sanity Branch", CreatedBy = "test" });
        context.SaveChanges();

        Assert.Equal(1, context.Branches.Count());
    }
}
