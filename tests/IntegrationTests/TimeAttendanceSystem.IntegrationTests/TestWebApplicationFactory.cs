using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Moq;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.IntegrationTests;

public class TestWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    private readonly Mock<IEmailService> _mockEmailService;
    
    public TestWebApplicationFactory()
    {
        _mockEmailService = new Mock<IEmailService>();
        SetupMockEmailService();
    }

    public Mock<IEmailService> MockEmailService => _mockEmailService;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Remove the existing DbContext registration
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<TimeAttendanceDbContext>));

            if (dbContextDescriptor != null)
            {
                services.Remove(dbContextDescriptor);
            }

            // Add in-memory database for testing
            services.AddDbContext<TimeAttendanceDbContext>(options =>
            {
                options.UseInMemoryDatabase("InMemoryDbForTesting");
            });

            // Replace EmailService with mock
            services.Replace(ServiceDescriptor.Scoped(_ => _mockEmailService.Object));

            // Build the service provider
            var sp = services.BuildServiceProvider();

            // Seed the database with test data
            using var scope = sp.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var context = scopedServices.GetRequiredService<TimeAttendanceDbContext>();

            context.Database.EnsureCreated();
            SeedTestDataAsync(context).GetAwaiter().GetResult();
        });
    }

    private void SetupMockEmailService()
    {
        _mockEmailService.Setup(x => x.SendEmailVerificationAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _mockEmailService.Setup(x => x.SendPasswordResetEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _mockEmailService.Setup(x => x.SendTwoFactorCodeAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
    }

    private static async Task SeedTestDataAsync(TimeAttendanceDbContext context)
    {
        // Clear existing data
        context.UserSessions.RemoveRange(context.UserSessions);
        context.UserRoles.RemoveRange(context.UserRoles);
        context.Users.RemoveRange(context.Users);
        context.RolePermissions.RemoveRange(context.RolePermissions);
        context.Roles.RemoveRange(context.Roles);
        context.Permissions.RemoveRange(context.Permissions);
        context.Branches.RemoveRange(context.Branches);
        context.AuditLogs.RemoveRange(context.AuditLogs);
        
        await context.SaveChangesAsync();

        // Use the existing seed data
        await Infrastructure.Persistence.SeedData.SeedAsync(context);
    }
}