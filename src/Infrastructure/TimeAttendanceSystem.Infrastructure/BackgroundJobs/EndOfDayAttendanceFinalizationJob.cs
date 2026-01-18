using Coravel.Invocable;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that runs at end of day to finalize attendance records for past dates.
/// This job recalculates and updates any attendance records that have "Pending" status
/// for dates that are in the past, converting them to appropriate statuses (Absent, etc.).
/// Implements Coravel's IInvocable interface for scheduled execution.
/// </summary>
public class EndOfDayAttendanceFinalizationJob : IInvocable
{
    private readonly IDailyAttendanceGeneratorService _attendanceGeneratorService;
    private readonly ILogger<EndOfDayAttendanceFinalizationJob> _logger;

    public EndOfDayAttendanceFinalizationJob(
        IDailyAttendanceGeneratorService attendanceGeneratorService,
        ILogger<EndOfDayAttendanceFinalizationJob> logger)
    {
        _attendanceGeneratorService = attendanceGeneratorService;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting end-of-day attendance finalization job at {Time}", DateTime.UtcNow);

        try
        {
            // Finalize yesterday's attendance records
            // This ensures any records that were "Pending" are properly calculated as Absent
            var yesterday = DateTime.UtcNow.Date.AddDays(-1);

            _logger.LogInformation("Recalculating attendance records for {Date}", yesterday);
            var recalculatedCount = await _attendanceGeneratorService.RecalculateAttendanceRecordsAsync(yesterday);
            _logger.LogInformation("Recalculated {Count} attendance records for {Date}", recalculatedCount, yesterday);

            _logger.LogInformation("Finalizing attendance records for {Date}", yesterday);
            var finalizedCount = await _attendanceGeneratorService.FinalizeAttendanceRecordsAsync(yesterday);
            _logger.LogInformation("Finalized {Count} attendance records for {Date}", finalizedCount, yesterday);

            _logger.LogInformation(
                "End-of-day attendance finalization completed successfully for {Date}. " +
                "Recalculated: {Recalculated}, Finalized: {Finalized}",
                yesterday,
                recalculatedCount,
                finalizedCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fatal error during end-of-day attendance finalization job");
            throw; // Re-throw to let Coravel handle the error
        }
    }
}
