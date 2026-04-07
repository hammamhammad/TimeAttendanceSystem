using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.EndOfService.Commands.CalculateEndOfService;
using TecAxle.Hrms.Application.EndOfService.Queries.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/end-of-service")]
[Authorize]
public class EndOfServiceController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;

    public EndOfServiceController(IMediator mediator, IApplicationDbContext context)
    {
        _mediator = mediator;
        _context = context;
    }

    [HttpGet("{terminationId}")]
    public async Task<IActionResult> GetByTermination(long terminationId)
    {
        var eos = await _context.EndOfServiceBenefits
            .Include(e => e.Employee)
            .Where(e => e.TerminationRecordId == terminationId && !e.IsDeleted)
            .Select(e => new EndOfServiceBenefitDto
            {
                Id = e.Id,
                TerminationRecordId = e.TerminationRecordId,
                EmployeeId = e.EmployeeId,
                EmployeeName = e.Employee.FirstName + " " + e.Employee.LastName,
                EmployeeNameAr = e.Employee.FirstNameAr != null && e.Employee.LastNameAr != null
                    ? e.Employee.FirstNameAr + " " + e.Employee.LastNameAr : null,
                ServiceYears = e.ServiceYears,
                ServiceMonths = e.ServiceMonths,
                ServiceDays = e.ServiceDays,
                BasicSalary = e.BasicSalary,
                TotalAllowances = e.TotalAllowances,
                CalculationBasis = e.CalculationBasis,
                TotalAmount = e.TotalAmount,
                DeductionAmount = e.DeductionAmount,
                NetAmount = e.NetAmount,
                CalculationDetails = e.CalculationDetails,
                Notes = e.Notes,
                CreatedAtUtc = e.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (eos == null)
            return NotFound(new { error = "End of service benefit not found." });

        return Ok(eos);
    }

    [HttpPost("{terminationId}/calculate")]
    public async Task<IActionResult> Calculate(long terminationId)
    {
        var result = await _mediator.Send(new CalculateEndOfServiceCommand(terminationId));

        if (result.IsFailure)
            return result.Error.Contains("not found", StringComparison.OrdinalIgnoreCase)
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }
}
