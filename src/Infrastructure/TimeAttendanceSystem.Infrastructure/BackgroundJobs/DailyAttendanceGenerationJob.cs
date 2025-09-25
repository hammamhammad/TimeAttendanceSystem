using Coravel.Invocable;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that runs daily to generate attendance records for all employees.
/// Implements Coravel's IInvocable interface for scheduled execution.
/// </summary>
public class DailyAttendanceGenerationJob : IInvocable
{
    private readonly IDailyAttendanceGeneratorService _attendanceGeneratorService;
    private readonly ILogger<DailyAttendanceGenerationJob> _logger;

    public DailyAttendanceGenerationJob(
        IDailyAttendanceGeneratorService attendanceGeneratorService,
        ILogger<DailyAttendanceGenerationJob> logger)
    {
        _attendanceGeneratorService = attendanceGeneratorService;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting daily attendance generation job at {Time}", DateTime.UtcNow);

        try
        {
            var result = await _attendanceGeneratorService.RunDailyGenerationAsync();

            if (result.IsSuccessful)
            {
                _logger.LogInformation(
                    "Daily attendance generation completed successfully for {Date}. " +
                    "Generated: {Generated}, Updated: {Updated}, Skipped: {Skipped}, Duration: {Duration}",
                    result.Date,
                    result.RecordsGenerated,
                    result.RecordsUpdated,
                    result.RecordsSkipped,
                    result.Duration);
            }
            else
            {
                _logger.LogWarning(
                    "Daily attendance generation completed with errors for {Date}. " +
                    "Errors: {ErrorCount}, Duration: {Duration}",
                    result.Date,
                    result.ErrorCount,
                    result.Duration);

                foreach (var error in result.Errors)
                {
                    _logger.LogError("Attendance generation error: {Error}", error);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fatal error during daily attendance generation job");
            throw; // Re-throw to let Coravel handle the error
        }
    }
}