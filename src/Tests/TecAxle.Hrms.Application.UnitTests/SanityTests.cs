using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.UnitTests.Common;
using TecAxle.Hrms.Domain.Branches;
using Xunit;

namespace TecAxle.Hrms.Application.UnitTests;

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
