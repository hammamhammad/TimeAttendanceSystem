using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Application.Services;
using TecAxle.Hrms.Application.Workflows.Services;
using TecAxle.Hrms.Application.Workflows.Validation;
using TecAxle.Hrms.Application.Workflows.Validation.Rules;

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

        // Register workflow services (v13.6 routing-hardened)
        services.AddScoped<IApproverResolver, ApproverResolver>();
        services.AddScoped<IWorkflowEngine, WorkflowEngine>();
        services.AddScoped<IWorkflowStarter, WorkflowStarter>();

        // Workflow validation-rule registry + built-in rules (v13.6)
        services.AddScoped<IWorkflowValidationRule, VacationBalanceRule>();
        services.AddScoped<IWorkflowValidationRuleRegistry>(sp =>
            new WorkflowValidationRuleRegistry(sp.GetServices<IWorkflowValidationRule>()));

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

        // End-of-service calculation (policy-driven, effective-dated)
        services.AddScoped<EndOfService.Services.IEndOfServiceCalculator, EndOfService.Services.EndOfServiceCalculator>();

        // Tenant-configurable validation settings + monthly daily-rate resolver
        services.AddScoped<Validation.IValidationSettingsProvider, Validation.ValidationSettingsProvider>();
        services.AddScoped<Payroll.Services.ITenantPayrollCalendarService, Payroll.Services.TenantPayrollCalendarService>();

        return services;
    }
}