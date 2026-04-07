using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Queries.GetDataSources;

/// <summary>
/// Handler that returns static metadata about each available report data source
/// and its queryable columns.
/// </summary>
public class GetDataSourcesQueryHandler : BaseHandler<GetDataSourcesQuery, Result<List<DataSourceMetadata>>>
{
    public GetDataSourcesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override Task<Result<List<DataSourceMetadata>>> Handle(GetDataSourcesQuery request, CancellationToken cancellationToken)
    {
        var dataSources = new List<DataSourceMetadata>
        {
            new("Employees", "Employees", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("FirstName", "First Name", "string"),
                new("LastName", "Last Name", "string"),
                new("Email", "Email", "string"),
                new("Department", "Department", "string"),
                new("Branch", "Branch", "string"),
                new("JobTitle", "Job Title", "string"),
                new("HireDate", "Hire Date", "date"),
                new("EmploymentStatus", "Employment Status", "string")
            }),
            new("Attendance", "Attendance", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("Date", "Date", "date"),
                new("CheckIn", "Check In", "time"),
                new("CheckOut", "Check Out", "time"),
                new("WorkingHours", "Working Hours", "decimal"),
                new("OvertimeHours", "Overtime Hours", "decimal"),
                new("Status", "Status", "string")
            }),
            new("Vacations", "Vacations", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("VacationType", "Vacation Type", "string"),
                new("StartDate", "Start Date", "date"),
                new("EndDate", "End Date", "date"),
                new("TotalDays", "Total Days", "decimal"),
                new("Status", "Status", "string")
            }),
            new("Excuses", "Excuses", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("ExcuseDate", "Excuse Date", "date"),
                new("ExcuseType", "Excuse Type", "string"),
                new("StartTime", "Start Time", "time"),
                new("EndTime", "End Time", "time"),
                new("TotalHours", "Total Hours", "decimal"),
                new("Status", "Status", "string")
            }),
            new("RemoteWork", "Remote Work", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("RequestDate", "Request Date", "date"),
                new("WorkDate", "Work Date", "date"),
                new("WorkLocationType", "Work Location Type", "string"),
                new("Status", "Status", "string"),
                new("Reason", "Reason", "string")
            }),
            new("Overtime", "Overtime", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("Date", "Date", "date"),
                new("OvertimeHours", "Overtime Hours", "decimal"),
                new("OvertimeType", "Overtime Type", "string"),
                new("Status", "Status", "string")
            }),
            new("Payroll", "Payroll", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("Period", "Period", "string"),
                new("BaseSalary", "Base Salary", "decimal"),
                new("TotalAllowances", "Total Allowances", "decimal"),
                new("TotalDeductions", "Total Deductions", "decimal"),
                new("NetSalary", "Net Salary", "decimal")
            }),
            new("Shifts", "Shifts", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("ShiftName", "Shift Name", "string"),
                new("StartTime", "Start Time", "time"),
                new("EndTime", "End Time", "time"),
                new("AssignmentStartDate", "Assignment Start Date", "date"),
                new("AssignmentEndDate", "Assignment End Date", "date")
            }),
            new("LeaveBalances", "Leave Balances", new List<DataSourceColumn>
            {
                new("EmployeeNumber", "Employee Number", "string"),
                new("VacationType", "Vacation Type", "string"),
                new("TotalEntitlement", "Total Entitlement", "decimal"),
                new("UsedDays", "Used Days", "decimal"),
                new("RemainingBalance", "Remaining Balance", "decimal"),
                new("CarryOver", "Carry Over", "decimal")
            })
        };

        return Task.FromResult(Result.Success(dataSources));
    }
}
