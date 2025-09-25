using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Settings.Queries.GetOvertimeConfigurations;

/// <summary>
/// Query handler for retrieving paginated overtime configurations.
/// Processes pagination, filtering, and search operations for overtime configuration management.
/// </summary>
public class GetOvertimeConfigurationsQueryHandler
{
    private readonly IOvertimeConfigurationService _overtimeConfigService;

    public GetOvertimeConfigurationsQueryHandler(IOvertimeConfigurationService overtimeConfigService)
    {
        _overtimeConfigService = overtimeConfigService;
    }

    /// <summary>
    /// Handles the overtime configurations query with pagination and filtering.
    /// </summary>
    /// <param name="query">Query parameters including pagination and filters</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing paginated overtime configurations or error information</returns>
    public async Task<Result<GetOvertimeConfigurationsResponse>> Handle(
        GetOvertimeConfigurationsQuery query,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Validate pagination parameters
            if (query.Page < 1)
            {
                return Result.Failure<GetOvertimeConfigurationsResponse>("Page number must be greater than 0");
            }

            if (query.PageSize < 1 || query.PageSize > 100)
            {
                return Result.Failure<GetOvertimeConfigurationsResponse>("Page size must be between 1 and 100");
            }

            // Get configurations with pagination
            var (configurations, totalCount) = await _overtimeConfigService.GetConfigurationsAsync(
                query.Page,
                query.PageSize,
                cancellationToken);

            // Apply filtering if specified
            var filteredConfigurations = configurations;
            if (query.IsActive.HasValue)
            {
                filteredConfigurations = configurations.Where(c => c.IsActive == query.IsActive.Value);
                totalCount = filteredConfigurations.Count();
            }

            // Apply search if specified
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                var searchTerm = query.Search.ToLowerInvariant();
                filteredConfigurations = filteredConfigurations.Where(c =>
                    c.PolicyNotes?.ToLowerInvariant().Contains(searchTerm) == true ||
                    c.Id.ToString().Contains(searchTerm));
                totalCount = filteredConfigurations.Count();
            }

            // Convert to DTOs
            var configurationDtos = filteredConfigurations.Select(config => new OvertimeConfigurationDto(
                config.Id,
                config.EnablePreShiftOvertime,
                config.EnablePostShiftOvertime,
                config.NormalDayRate,
                config.PublicHolidayRate,
                config.OffDayRate,
                config.MinimumOvertimeMinutes,
                config.ConsiderFlexibleTime,
                config.MaxPreShiftOvertimeHours,
                config.MaxPostShiftOvertimeHours,
                config.RequireApproval,
                config.OvertimeGracePeriodMinutes,
                config.WeekendAsOffDay,
                config.RoundingIntervalMinutes,
                config.PolicyNotes,
                config.IsActive,
                config.EffectiveFromDate,
                config.EffectiveToDate,
                config.CreatedAtUtc,
                config.CreatedBy ?? "System"
            )).ToList();

            // Calculate pagination metadata
            var totalPages = (int)Math.Ceiling((double)totalCount / query.PageSize);
            var hasNextPage = query.Page < totalPages;
            var hasPreviousPage = query.Page > 1;

            // Get active configuration ID
            var activeConfig = await _overtimeConfigService.GetActiveConfigurationAsync(cancellationToken);
            var activeConfigurationId = activeConfig?.Id;

            var response = new GetOvertimeConfigurationsResponse(
                configurationDtos,
                totalCount,
                query.Page,
                query.PageSize,
                totalPages,
                hasNextPage,
                hasPreviousPage,
                activeConfigurationId
            );

            return Result.Success(response);
        }
        catch (Exception ex)
        {
            return Result.Failure<GetOvertimeConfigurationsResponse>($"Failed to retrieve overtime configurations: {ex.Message}");
        }
    }
}