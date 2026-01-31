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
