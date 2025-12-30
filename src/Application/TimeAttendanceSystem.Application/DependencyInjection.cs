using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Services;
using TimeAttendanceSystem.Application.Workflows.Services;

namespace TimeAttendanceSystem.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        // Register attendance services
        services.AddScoped<IAttendanceCalculationService, AttendanceCalculationService>();
        services.AddScoped<IDailyAttendanceGeneratorService, DailyAttendanceGeneratorService>();

        // Register overtime configuration service
        services.AddScoped<IOvertimeConfigurationService, OvertimeConfigurationService>();

        // Register leave accrual service
        services.AddScoped<ILeaveAccrualService, LeaveAccrualService>();

        // Register workflow services
        services.AddScoped<IWorkflowEngine, WorkflowEngine>();

        // Register reporting services
        services.AddScoped<Reports.Services.IReportsService, Reports.Services.ReportsService>();

        // Register overtime configuration handlers
        services.AddScoped<Settings.Queries.GetOvertimeConfigurations.GetOvertimeConfigurationsQueryHandler>();
        services.AddScoped<Settings.Commands.CreateOvertimeConfiguration.CreateOvertimeConfigurationCommandHandler>();
        services.AddScoped<Settings.Commands.UpdateOvertimeConfiguration.UpdateOvertimeConfigurationCommandHandler>();
        services.AddScoped<Settings.Commands.ActivateOvertimeConfiguration.ActivateOvertimeConfigurationCommandHandler>();

        return services;
    }
}