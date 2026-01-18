using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Coravel;
using TimeAttendanceSystem.Api.Configuration;
using TimeAttendanceSystem.Api.Filters;
using TimeAttendanceSystem.Api.Hubs;
using TimeAttendanceSystem.Api.Middleware;
using TimeAttendanceSystem.Application;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Infrastructure;
using TimeAttendanceSystem.Infrastructure.BackgroundJobs;
using TimeAttendanceSystem.Infrastructure.Persistence;
using TimeAttendanceSystem.Shared.Localization;
using System.Globalization;

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
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Time Attendance System API", Version = "v1" });

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
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();

        // Apply any pending migrations
        await context.Database.MigrateAsync();

        // Seed initial data
        await SeedData.SeedAsync(context);
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
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Time Attendance System API V1");
    });
}

// app.UseHttpsRedirection(); // Disabled for development

// Use CORS middleware
app.UseCors(corsSettings.PolicyName);

app.UseRouting();
app.UseMiddleware<RateLimitingMiddleware>(app.Services.GetRequiredService<RateLimitOptions>());
app.UseMiddleware<LocalizationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Map SignalR notification hub
app.MapHub<NotificationHub>("/hubs/notifications");

app.Run();

// Make the implicit Program class available for testing
public partial class Program { }
