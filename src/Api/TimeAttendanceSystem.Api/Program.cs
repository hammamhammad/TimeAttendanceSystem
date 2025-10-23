using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Coravel;
using TimeAttendanceSystem.Api.Configuration;
using TimeAttendanceSystem.Api.Filters;
using TimeAttendanceSystem.Api.Middleware;
using TimeAttendanceSystem.Application;
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

        if (corsSettings.AllowedHeaders.Length > 0)
        {
            policy.WithHeaders(corsSettings.AllowedHeaders);
        }
        else
        {
            policy.AllowAnyHeader();
        }

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

// Seed database
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<TimeAttendanceDbContext>();

        // For PostgreSQL: Use EnsureCreated() to create schema directly from configurations
        // This avoids SQL Server migration compatibility issues
        // Note: EnsureCreated() does not use migrations - creates schema from entity configs
        await context.Database.EnsureCreatedAsync();

        await SeedData.SeedAsync(context);
    }
}
catch (Exception ex)
{
    var logger = app.Services.GetService<ILogger<Program>>();
    logger?.LogError(ex, "Failed to seed database. Application will continue without seeding.");
}

// Configure Coravel background jobs
app.Services.UseScheduler(scheduler =>
{
    // Schedule daily attendance generation to run every day at 2:00 AM
    scheduler.Schedule<DailyAttendanceGenerationJob>()
        .DailyAt(2, 0); // 2:00 AM every day
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

app.Run();

// Make the implicit Program class available for testing
public partial class Program { }
