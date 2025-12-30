using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeedController : ControllerBase
{
    private readonly TimeAttendanceDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public SeedController(TimeAttendanceDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpPost("essential-data")]
    public async Task<IActionResult> SeedEssentialData()
    {
        try
        {
            await SeedData.SeedAsync(_context);
            return Ok(new { message = "✅ Essential data seeded successfully! Permissions, roles, and system users updated." });
        }
        catch (Exception ex)
        {
            return BadRequest(new {
                error = $"❌ Error seeding essential data: {ex.Message}",
                innerError = ex.InnerException?.Message,
                fullException = ex.ToString()
            });
        }
    }

    [HttpPost("test-data")]
    public async Task<IActionResult> SeedTestData()
    {
        try
        {
            await TestDataSeeder.SeedTestDataAsync(_context);
            return Ok(new { message = "✅ Test data seeded successfully! Created 10 branches, 20 departments, 50 employees" });
        }
        catch (Exception ex)
        {
            return BadRequest(new {
                error = $"❌ Error seeding test data: {ex.Message}",
                innerError = ex.InnerException?.Message,
                fullException = ex.ToString()
            });
        }
    }

    [HttpPost("clear-data")]
    public async Task<IActionResult> ClearTestData()
    {
        try
        {
            // Clear test data only
            _context.Employees.RemoveRange(_context.Employees.Where(e => e.CreatedBy == "TestDataSeeder"));
            _context.Departments.RemoveRange(_context.Departments.Where(d => d.CreatedBy == "TestDataSeeder"));
            _context.Branches.RemoveRange(_context.Branches.Where(b => b.CreatedBy == "TestDataSeeder"));

            await _context.SaveChangesAsync();
            return Ok(new { message = "✅ Test data cleared successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"❌ Error clearing test data: {ex.Message}" });
        }
    }

    [HttpPost("clear-all-data")]
    public async Task<IActionResult> ClearAllData()
    {
        try
        {
            // Clear ALL data (be careful!)
            _context.Employees.RemoveRange(_context.Employees);
            _context.Departments.RemoveRange(_context.Departments);
            _context.Branches.RemoveRange(_context.Branches.Where(b => b.CreatedBy == "TestDataSeeder")); // Keep original branches

            await _context.SaveChangesAsync();
            return Ok(new { message = "✅ All test data cleared successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = $"❌ Error clearing all data: {ex.Message}" });
        }
    }

    [HttpPost("sample-data-with-users")]
    public async Task<IActionResult> SeedSampleDataWithUsers()
    {
        if (!_environment.IsDevelopment())
        {
            return BadRequest(new { error = "This endpoint is only available in Development environment" });
        }

        try
        {
            // Find the scripts folder - go up from ContentRootPath to find the solution root
            var contentRoot = _environment.ContentRootPath;
            var solutionRoot = Path.GetFullPath(Path.Combine(contentRoot, "..", "..", ".."));
            var scriptPath = Path.Combine(solutionRoot, "scripts", "sample-data-with-users.sql");

            if (!System.IO.File.Exists(scriptPath))
            {
                return NotFound(new { error = $"SQL script not found at: {scriptPath}" });
            }

            var sqlScript = await System.IO.File.ReadAllTextAsync(scriptPath);

            // Execute the SQL script
            await _context.Database.ExecuteSqlRawAsync(sqlScript);

            return Ok(new {
                message = "✅ Sample data with users seeded successfully!",
                details = "Created: 5 Branches, 20 Departments, 50 Employees with User Accounts",
                credentials = "Default password for all employees: Emp@123! (forced to change on first login)"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new {
                error = $"❌ Error seeding sample data: {ex.Message}",
                innerError = ex.InnerException?.Message,
                fullException = ex.ToString()
            });
        }
    }
}