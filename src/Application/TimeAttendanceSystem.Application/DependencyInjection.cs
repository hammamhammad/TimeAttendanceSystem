using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Application.Services;
using TecAxle.Hrms.Application.Workflows.Services;

namespace TecAxle.Hrms.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // Register entitlement pipeline behaviors
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ModuleEntitlementBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UsageLimitBehavior<,>));
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

        // Register payroll calculation pipeline (production-fix)
        services.AddScoped<IProrationCalculator, ProrationCalculator>();
        services.AddScoped<IPayrollCalendarResolver, PayrollCalendarResolver>();
        services.AddScoped<ITaxCalculator, TaxCalculator>();
        services.AddScoped<ISocialInsuranceCalculator, SocialInsuranceCalculator>();
        services.AddScoped<IOvertimePayCalculator, OvertimePayCalculator>();
        services.AddScoped<IAbsenceDeductionCalculator, AbsenceDeductionCalculator>();
        services.AddScoped<IPayrollInputResolver, PayrollInputResolver>();
        services.AddScoped<IPayrollCalculationService, PayrollCalculationService>();

        return services;
    }
}