using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.MobileAttendance.Commands.ProcessMobileTransaction;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for mobile attendance transactions with GPS + NFC dual verification.
/// Used by the Flutter ESS mobile app for employee check-in/out operations.
/// </summary>
[ApiController]
[Route("api/v1/mobile/attendance")]
[Authorize]
public class MobileAttendanceController : ControllerBase
{
    private readonly IMediator _mediator;

    public MobileAttendanceController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Process a mobile attendance transaction (check-in, check-out, break start/end).
    /// Requires GPS geofence validation and NFC tag verification.
    /// </summary>
    [HttpPost("transaction")]
    public async Task<IActionResult> ProcessTransaction([FromBody] MobileTransactionRequest request)
    {
        var command = new ProcessMobileTransactionCommand(
            request.EmployeeId,
            request.BranchId,
            request.TransactionType,
            request.Latitude,
            request.Longitude,
            request.NfcTagUid,
            request.DeviceId,
            request.DeviceModel,
            request.Platform,
            request.AppVersion
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var transactionResult = result.Value;
        
        if (!transactionResult.Success)
        {
            return Ok(new 
            { 
                success = false, 
                message = transactionResult.Message 
            });
        }

        return Ok(new 
        { 
            success = true,
            transactionId = transactionResult.TransactionId,
            message = transactionResult.Message,
            transactionTime = transactionResult.TransactionTime
        });
    }

    /// <summary>
    /// Quick check if the user is within the geofence of a branch.
    /// Used to show UI indicators before attempting a transaction.
    /// </summary>
    [HttpPost("check-location")]
    public async Task<IActionResult> CheckLocation([FromBody] LocationCheckRequest request)
    {
        // Get branch coordinates
        var query = new CheckLocationQuery(request.BranchId, request.Latitude, request.Longitude);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }
}

public record MobileTransactionRequest(
    long EmployeeId,
    long BranchId,
    MobileTransactionType TransactionType,
    double Latitude,
    double Longitude,
    string? NfcTagUid,
    string DeviceId,
    string? DeviceModel,
    string Platform,
    string? AppVersion
);

public record LocationCheckRequest(
    long BranchId,
    double Latitude,
    double Longitude
);
