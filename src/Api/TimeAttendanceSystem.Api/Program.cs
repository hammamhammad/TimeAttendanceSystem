using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Coravel;
using TecAxle.Hrms.Api.Configuration;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Api.Hubs;
using TecAxle.Hrms.Api.Middleware;
using TecAxle.Hrms.Application;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Infrastructure;
using TecAxle.Hrms.Infrastructure.BackgroundJobs;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Persistence.Master;
using TecAxle.Hrms.Shared.Localization;
using System.Globalization;

// Enable legacy timestamp behavior so Npgsql accepts DateTime with Kind=Unspecified for timestamptz columns
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Configure CORS from appsettings
var corsSettings = builder.Configuration.GetSection(CorsSettings.SectionName).Get<CorsSettings>() ?? new CorsSettings();
builder.Services.Configure<CorsSettings>(builder.Configuration.GetSection(CorsSettings.SectionName));

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsSettings.PolicyName, policy =>
    {
        if (corsSettings.AllowedOrigins.Length > 0)
        {
            policy.WithOrigins(corsSettings.AllowedOrigins);
        }
        else
        {
            policy.AllowAnyOrigin();
        }

        if (corsSettings.AllowedMethods.Length > 0)
        {
            policy.WithMethods(corsSettings.AllowedMethods);
        }
        else
        {
            policy.AllowAnyMethod();
        }

        // Always allow any header to support SignalR's x-signalr-user-agent header
        policy.AllowAnyHeader();

        if (corsSettings.AllowCredentials)
        {
            policy.AllowCredentials();
        }

        if (corsSettings.PreflightMaxAge > 0)
        {
            policy.SetPreflightMaxAge(TimeSpan.FromSeconds(corsSettings.PreflightMaxAge));
        }
    });
});

// Add services to the container.
builder.Services.AddMemoryCache();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// Add SignalR for real-time notifications
builder.Services.AddSignalR();
builder.Services.AddScoped<INotificationHubContext, NotificationHubContext>();

// Add localization services
builder.Services.AddLocalization(options => options.ResourcesPath = "Localization/Resources");
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[] { "en", "ar" };
    options.SetDefaultCulture("en")
        .AddSupportedCultures(supportedCultures)
        .AddSupportedUICultures(supportedCultures);
});

builder.Services.AddScoped<LocalizationService>();

// Add security and audit services
builder.Services.AddSingleton(new RateLimitOptions 
{ 
    MaxRequests = 100, 
    WindowInSeconds = 60 
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<SecurityHeadersFilter>();
    options.Filters.Add<AuditActionFilter>();
}).ConfigureApiBehaviorOptions(options =>
{
    // Configure API behavior options if needed
}).AddJsonOptions(options =>
{
    // Configure JSON serialization to use camelCase
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DictionaryKeyPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.WriteIndented = true;
    // Serialize enums as strings instead of integers
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.AddOpenApi();

// Configure Swagger to use JWT
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "TecAxle HRMS API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // Configure support for file uploads
    options.MapType<IFormFile>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });
});

var app = builder.Build();

// Apply migrations and seed database
try
{
    using (var scope = app.Services.CreateScope())
    {
        // Only migrate the master database at startup.
        // Tenant databases are migrated during provisioning (TenantProvisioningService).
        var masterContext = scope.ServiceProvider.GetRequiredService<MasterDbContext>();
        await masterContext.Database.MigrateAsync();
        await MasterSeedData.SeedAsync(masterContext);
    }
}
catch (Exception ex)
{
    var logger = app.Services.GetService<ILogger<Program>>();
    logger?.LogError(ex, "Failed to apply migrations or seed database. Application will continue without seeding.");
}

// Configure Coravel background jobs
app.Services.UseScheduler(scheduler =>
{
    // Schedule daily attendance generation to run every day at 2:00 AM
    scheduler.Schedule<DailyAttendanceGenerationJob>()
        .DailyAt(2, 0); // 2:00 AM every day

    // Schedule end-of-day attendance finalization to run every day at 11:59 PM
    // This recalculates and finalizes yesterday's attendance records
    // Any "Pending" status records from yesterday will be converted to "Absent"
    scheduler.Schedule<EndOfDayAttendanceFinalizationJob>()
        .DailyAt(23, 59); // 11:59 PM every day

    // Schedule monthly leave accrual to run on the 1st of each month at 1:00 AM
    scheduler.Schedule<MonthlyLeaveAccrualJob>()
        .Monthly()
        .Zoned(TimeZoneInfo.Utc) // Run at 1:00 AM UTC on the 1st of each month
        .RunOnceAtStart(); // Also run once when the application starts (for testing/recovery)

    // Schedule workflow timeout processing to run every hour
    scheduler.Schedule<WorkflowTimeoutProcessingJob>()
        .Hourly(); // Check for timed out workflow steps every hour

    // Clean up frozen workflows that have been frozen for over 90 days
    scheduler.Schedule<FrozenWorkflowCleanupJob>()
        .DailyAtHour(3); // Run at 3:00 AM daily

    // Schedule temporary allowance expiration to run daily at 2 AM
    scheduler.Schedule<ExpireTemporaryAllowancesJob>()
        .DailyAtHour(2); // Expire temporary allowances at 2:00 AM daily

    // Schedule contract expiry alerts to run daily at 3 AM
    scheduler.Schedule<ContractExpiryAlertJob>()
        .DailyAtHour(3); // Check for expiring contracts at 3:00 AM daily

    // Schedule visa expiry alerts to run daily at 4 AM
    scheduler.Schedule<VisaExpiryAlertJob>()
        .DailyAtHour(4); // Check for expiring visas at 4:00 AM daily

    // Schedule profile change application to run daily at 1 AM
    scheduler.Schedule<ApplyScheduledProfileChangesJob>()
        .DailyAt(1, 0); // Apply scheduled profile changes at 1:00 AM daily

    // Schedule onboarding task overdue check to run daily at 5 AM
    scheduler.Schedule<OnboardingTaskOverdueJob>()
        .DailyAtHour(5); // Mark overdue onboarding tasks and notify at 5:00 AM daily

    // Schedule PIP expiry check to run daily at 6 AM
    scheduler.Schedule<PIPExpiryCheckJob>()
        .DailyAtHour(6); // Check for expired PIPs and notify managers at 6:00 AM daily

    // Schedule review cycle reminder to run daily at 7 AM
    scheduler.Schedule<ReviewCycleReminderJob>()
        .DailyAtHour(7); // Send performance review deadline reminders at 7:00 AM daily

    // Schedule document expiry alerts to run daily at 8 AM
    scheduler.Schedule<DocumentExpiryAlertJob>()
        .DailyAtHour(8); // Check for expiring documents at 8:00 AM daily

    // Schedule loan repayment reminders to run daily at 9 AM
    scheduler.Schedule<LoanRepaymentReminderJob>()
        .DailyAtHour(9); // Check for overdue/upcoming loan repayments at 9:00 AM daily

    // Schedule certification expiry alerts to run daily at 10 AM
    scheduler.Schedule<CertificationExpiryAlertJob>()
        .DailyAtHour(10); // Check for expiring certifications at 10:00 AM daily

    // Schedule training session reminders to run daily at 11 AM
    scheduler.Schedule<TrainingSessionReminderJob>()
        .DailyAtHour(11); // Remind enrolled employees of upcoming sessions at 11:00 AM daily

    // Schedule grievance SLA alerts to run daily at 12 PM
    scheduler.Schedule<GrievanceSlaAlertJob>()
        .DailyAtHour(12); // Check for overdue/approaching grievance SLAs at 12:00 PM daily

    // Schedule counseling follow-up reminders to run daily at 1 PM
    scheduler.Schedule<CounselingFollowUpReminderJob>()
        .DailyAtHour(13); // Remind counselors of pending follow-ups at 1:00 PM daily

    // Schedule asset warranty expiry alerts to run daily at 2 PM
    scheduler.Schedule<AssetWarrantyExpiryAlertJob>()
        .DailyAtHour(14); // Check for expiring asset warranties at 2:00 PM daily

    // Schedule overdue asset return alerts to run daily at 3 PM
    scheduler.Schedule<OverdueAssetReturnAlertJob>()
        .DailyAtHour(15); // Check for overdue asset returns at 3:00 PM daily

    // Schedule survey distribution activator to run hourly
    scheduler.Schedule<SurveyDistributionActivatorJob>()
        .Hourly(); // Activate scheduled survey distributions every hour

    // Schedule survey reminders to run daily at 9 AM
    scheduler.Schedule<SurveyReminderJob>()
        .DailyAtHour(9); // Remind pending survey participants at 9:00 AM daily

    // Schedule survey expiry to run hourly
    scheduler.Schedule<SurveyExpiryJob>()
        .Hourly(); // Close expired survey distributions every hour

    // Schedule analytics snapshot job to run daily at 1 AM
    scheduler.Schedule<AnalyticsSnapshotJob>()
        .DailyAt(1, 0); // Pre-compute daily analytics snapshots at 1:00 AM

    // Schedule monthly analytics rollup to run on 1st of each month at 2 AM
    scheduler.Schedule<MonthlyAnalyticsRollupJob>()
        .Monthly()
        .Zoned(TimeZoneInfo.Utc); // Aggregate daily snapshots into monthly on the 1st

    // Schedule timesheet period generation to run daily at 3 AM
    scheduler.Schedule<TimesheetPeriodGenerationJob>()
        .DailyAtHour(3); // Auto-create next period when current one is nearing end

    // Schedule timesheet submission reminders to run daily at 8 AM
    scheduler.Schedule<TimesheetSubmissionReminderJob>()
        .DailyAtHour(8); // Remind employees to submit timesheets near deadline

    // Schedule timesheet period closure to run daily at 1 AM
    scheduler.Schedule<TimesheetPeriodClosureJob>()
        .DailyAt(1, 30); // Auto-close periods past their submission deadline

    // Schedule talent profile sync to run monthly on 1st at 4 AM
    scheduler.Schedule<TalentProfileSyncJob>()
        .Monthly()
        .Zoned(TimeZoneInfo.Utc); // Sync performance ratings from reviews on 1st of month

    // Schedule succession plan review reminders to run monthly on 1st at 5 AM
    scheduler.Schedule<SuccessionPlanReviewReminderJob>()
        .Monthly()
        .Zoned(TimeZoneInfo.Utc); // Remind HR of plans due for review on 1st of month

    // Schedule open enrollment period activator to run daily at 12 AM
    scheduler.Schedule<OpenEnrollmentPeriodActivatorJob>()
        .DailyAt(0, 5); // Open/close enrollment periods based on dates at 12:05 AM daily

    // Schedule benefit enrollment expiry to run daily at 1 AM
    scheduler.Schedule<BenefitEnrollmentExpiryJob>()
        .DailyAt(1, 15); // Terminate expired benefit enrollments at 1:15 AM daily

    // Schedule benefit deduction sync to run monthly on 1st at 3 AM
    scheduler.Schedule<BenefitDeductionSyncJob>()
        .Monthly()
        .Zoned(TimeZoneInfo.Utc); // Sync benefit deductions to payroll on 1st of month

    // Schedule compensatory off expiry to run daily at 2:30 AM
    scheduler.Schedule<CompensatoryOffExpiryJob>()
        .DailyAt(2, 30); // Expire compensatory offs past their expiry date at 2:30 AM daily

    // Schedule report execution to run hourly
    scheduler.Schedule<ScheduledReportExecutionJob>()
        .Hourly(); // Process due scheduled reports every hour
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "TecAxle HRMS API V1");
    });
}

// app.UseHttpsRedirection(); // Disabled for development

// Use CORS middleware
app.UseCors(corsSettings.PolicyName);

// Global exception handler - catches all unhandled exceptions and returns standardized JSON errors
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

app.UseRouting();
app.UseWebSockets();
app.UseMiddleware<RateLimitingMiddleware>(app.Services.GetRequiredService<RateLimitOptions>());
app.UseMiddleware<LocalizationMiddleware>();
app.UseAuthentication();
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthorization();
app.MapControllers();

// Map SignalR notification hub
app.MapHub<NotificationHub>("/hubs/notifications");

app.Run();

// Make the implicit Program class available for testing
public partial class Program { }
