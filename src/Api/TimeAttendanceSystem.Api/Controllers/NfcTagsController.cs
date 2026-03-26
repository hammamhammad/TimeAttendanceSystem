using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.NfcTags.Commands.CreateNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Commands.UpdateNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Commands.DeleteNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Commands.LockNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTags;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagById;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcTagsByBranch;
using TimeAttendanceSystem.Application.NfcTags.Queries.ValidateNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Queries.GetNfcWriteData;
using TimeAttendanceSystem.Application.NfcTags.Commands.ConfirmWriteProtection;
using TimeAttendanceSystem.Application.NfcTags.Commands.DisableNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Commands.EnableNfcTag;
using TimeAttendanceSystem.Application.NfcTags.Commands.ReportLostNfcTag;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing NFC tags used in mobile check-in verification.
/// Provides CRUD operations for NFC tag registration and write-protection management.
/// </summary>
[ApiController]
[Route("api/v1/nfc-tags")]
[Authorize]
public class NfcTagsController : ControllerBase
{
    private readonly IMediator _mediator;

    public NfcTagsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Gets a paginated list of all NFC tags.
    /// </summary>
    [HttpGet]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> GetNfcTags(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetNfcTagsQuery(page, pageSize, branchId, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a specific NFC tag by ID.
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> GetNfcTagById(long id)
    {
        var query = new GetNfcTagByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets all NFC tags registered to a specific branch.
    /// </summary>
    [HttpGet("by-branch/{branchId}")]
    [Authorize(Policy = "BranchRead")]
    public async Task<IActionResult> GetNfcTagsByBranch(long branchId)
    {
        var query = new GetNfcTagsByBranchQuery(branchId);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Validates an NFC tag UID for check-in at a branch.
    /// Returns success if the tag is registered and active for the branch.
    /// </summary>
    [HttpGet("validate/{tagUid}")]
    [Authorize]
    public async Task<IActionResult> ValidateNfcTag(string tagUid, [FromQuery] long branchId)
    {
        var query = new ValidateNfcTagQuery(tagUid, branchId);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error, isValid = false });
        }

        return Ok(new { isValid = result.Value });
    }

    /// <summary>
    /// Registers a new NFC tag for a branch.
    /// </summary>
    [HttpPost]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> CreateNfcTag([FromBody] CreateNfcTagRequest request)
    {
        var command = new CreateNfcTagCommand(
            request.TagUid,
            request.BranchId,
            request.Description
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(nameof(GetNfcTagById), new { id = result.Value }, new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing NFC tag's information.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> UpdateNfcTag(long id, [FromBody] UpdateNfcTagRequest request)
    {
        var command = new UpdateNfcTagCommand(
            id,
            request.BranchId,
            request.Description,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Applies permanent write-protection to an NFC tag.
    /// WARNING: This action is irreversible!
    /// </summary>
    [HttpPost("{id}/lock")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> LockNfcTag(long id)
    {
        var command = new LockNfcTagCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "NFC tag has been permanently write-protected" });
    }

    /// <summary>
    /// Deactivates (soft deletes) an NFC tag.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> DeleteNfcTag(long id)
    {
        var command = new DeleteNfcTagCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Gets the signed payload data for writing to a physical NFC tag.
    /// Used during the provisioning process.
    /// </summary>
    [HttpGet("{id}/write-data")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> GetNfcWriteData(long id)
    {
        var query = new GetNfcWriteDataQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Confirms that the NFC tag has been written and optionally write-protected.
    /// Activates the tag for use in attendance verification.
    /// </summary>
    [HttpPost("{id}/confirm-write-protection")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> ConfirmWriteProtection(long id, [FromBody] ConfirmWriteProtectionRequest request)
    {
        var command = new ConfirmWriteProtectionCommand(id, request.EncryptedPayload);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "NFC tag activated and write-protection confirmed" });
    }

    /// <summary>
    /// Temporarily disables an NFC tag. Can be re-enabled later.
    /// </summary>
    [HttpPost("{id}/disable")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> DisableNfcTag(long id)
    {
        var command = new DisableNfcTagCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "NFC tag has been disabled" });
    }

    /// <summary>
    /// Re-enables a previously disabled NFC tag.
    /// </summary>
    [HttpPost("{id}/enable")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> EnableNfcTag(long id)
    {
        var command = new EnableNfcTagCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "NFC tag has been re-enabled" });
    }

    /// <summary>
    /// Reports an NFC tag as lost or stolen. This is a permanent action.
    /// </summary>
    [HttpPost("{id}/report-lost")]
    [Authorize(Policy = "BranchManagement")]
    public async Task<IActionResult> ReportLostNfcTag(long id)
    {
        var command = new ReportLostNfcTagCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { message = "NFC tag has been reported as lost" });
    }
}

public record CreateNfcTagRequest(
    string TagUid,
    long BranchId,
    string? Description
);

public record UpdateNfcTagRequest(
    long BranchId,
    string? Description,
    bool IsActive
);

public record ConfirmWriteProtectionRequest(
    string? EncryptedPayload
);
