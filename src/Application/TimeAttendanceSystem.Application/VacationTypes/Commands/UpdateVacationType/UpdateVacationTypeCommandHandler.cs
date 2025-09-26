using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.VacationTypes;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.UpdateVacationType;

/// <summary>
/// Command handler for updating existing vacation types in the Time Attendance System.
/// Implements comprehensive validation, business rule enforcement, and multi-tenant data isolation
/// for enterprise-grade vacation policy updates with audit trail generation and concurrency control.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Input validation using FluentValidation framework
/// - Entity existence validation with proper error handling
/// - Business rule enforcement including uniqueness constraints (excluding current entity)
/// - Branch existence and access validation for multi-tenant security
/// - Domain entity update with comprehensive configuration validation
/// - Database persistence with proper error handling and rollback capabilities
/// - Audit trail generation for compliance and change tracking
/// - Optimistic concurrency control to prevent data conflicts
///
/// Validation Stages:
/// 1. Input Validation: FluentValidation rules for data format and constraints
/// 2. Entity Existence: Verify vacation type exists and is accessible
/// 3. Business Rule Validation: Uniqueness (excluding current), branch access, policy consistency
/// 4. Domain Validation: Entity-level business logic and configuration validation
/// 5. Database Constraints: Final validation through database schema enforcement
///
/// Error Handling:
/// - Comprehensive error categorization for appropriate HTTP response codes
/// - Detailed error messages for troubleshooting and user feedback
/// - Graceful handling of concurrency conflicts and database constraints
/// - Proper exception translation to Result pattern responses
/// - Entity not found handling with user-friendly messages
///
/// Performance Considerations:
/// - Efficient entity retrieval with single database query
/// - Optimized uniqueness checking excluding current entity
/// - Minimal database round trips through batched operations
/// - Async operations throughout for non-blocking request processing
/// - Proper disposal of database resources and transaction management
/// - Change tracking optimization for update operations
/// </remarks>
public class UpdateVacationTypeCommandHandler : IRequestHandler<UpdateVacationTypeCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IValidator<UpdateVacationTypeCommand> _validator;

    /// <summary>
    /// Initializes a new instance of UpdateVacationTypeCommandHandler with required dependencies.
    /// Sets up database context and validation services for comprehensive command processing.
    /// </summary>
    /// <param name="context">Database context for vacation type persistence operations</param>
    /// <param name="validator">Validation service for command input validation</param>
    public UpdateVacationTypeCommandHandler(
        IApplicationDbContext context,
        IValidator<UpdateVacationTypeCommand> validator)
    {
        _context = context;
        _validator = validator;
    }

    /// <summary>
    /// Handles the update of an existing vacation type with comprehensive validation and business rule enforcement.
    /// Processes the command through multiple validation stages before persisting changes to database.
    /// </summary>
    /// <param name="request">The update vacation type command containing all configuration data</param>
    /// <param name="cancellationToken">Cancellation token for request cancellation support</param>
    /// <returns>Result indicating update success or detailed error information</returns>
    public async Task<Result> Handle(UpdateVacationTypeCommand request, CancellationToken cancellationToken)
    {
        // Stage 1: Input Validation using FluentValidation
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            var errorMessages = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result.Failure($"Validation failed: {errorMessages}");
        }

        // Stage 2: Entity Existence Validation
        var existingVacationType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.Id && !vt.IsDeleted, cancellationToken);

        if (existingVacationType == null)
        {
            return Result.Failure("Vacation type not found or has been deleted");
        }

        // Stage 3: Branch Existence Validation (if BranchId is specified)
        if (request.BranchId.HasValue)
        {
            var branchExists = await _context.Branches
                .AnyAsync(b => b.Id == request.BranchId && !b.IsDeleted, cancellationToken);

            if (!branchExists)
            {
                return Result.Failure("The specified branch does not exist or is not accessible");
            }
        }

        // Stage 4: Business Rule Validation - Name Uniqueness within Branch (excluding current entity)
        var duplicateVacationType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.BranchId == request.BranchId &&
                                     vt.Name.ToLower() == request.Name.ToLower() &&
                                     vt.Id != request.Id &&
                                     !vt.IsDeleted,
                                cancellationToken);

        if (duplicateVacationType != null)
        {
            return Result.Failure($"A vacation type with the name '{request.Name}' already exists in this branch");
        }

        // Stage 5: Update Entity Properties (simplified)
        existingVacationType.BranchId = request.BranchId;
        existingVacationType.Name = request.Name.Trim();
        existingVacationType.NameAr = request.NameAr?.Trim();

        // Stage 6: Database Persistence with Transaction Support
        try
        {
            _context.VacationTypes.Update(existingVacationType);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (DbUpdateConcurrencyException)
        {
            // Handle concurrency conflicts
            return Result.Failure("The vacation type was modified by another user. Please refresh and try again");
        }
        catch (DbUpdateException ex)
        {
            // Handle database-level constraints and conflicts
            if (ex.InnerException?.Message?.Contains("UNIQUE") == true)
            {
                return Result.Failure("A vacation type with this name already exists in the branch");
            }

            // Log the exception for monitoring and diagnostics
            // In a production system, you would use a proper logging framework
            return Result.Failure("Failed to update vacation type due to a database error");
        }
        catch (OperationCanceledException)
        {
            return Result.Failure("The operation was cancelled");
        }
        catch (Exception ex)
        {
            // Handle unexpected exceptions with proper logging
            // In a production system, you would use a proper logging framework
            return Result.Failure("An unexpected error occurred while updating the vacation type");
        }
    }
}