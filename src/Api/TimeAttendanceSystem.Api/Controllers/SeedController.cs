using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeedController : ControllerBase
{
    private readonly TimeAttendanceDbContext _context;

    public SeedController(TimeAttendanceDbContext context)
    {
        _context = context;
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
}