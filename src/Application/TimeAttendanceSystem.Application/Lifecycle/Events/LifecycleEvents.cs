using MediatR;

namespace TecAxle.Hrms.Application.Lifecycle.Events;

// Thin DTO events published by originating commands AFTER SaveChangesAsync succeeds.
// Event handlers run synchronously in the same request scope but catch all exceptions
// so a lifecycle-automation failure can never break the triggering command. See
// ILifecycleEventPublisher.

public record OfferAcceptedEvent(
    long OfferLetterId,
    long CandidateId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record OnboardingCompletedEvent(
    long OnboardingProcessId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record ResignationApprovedEvent(
    long ResignationRequestId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record TerminationCreatedEvent(
    long TerminationRecordId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record ClearanceCompletedEvent(
    long ClearanceChecklistId,
    long TerminationRecordId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record FinalSettlementPaidEvent(
    long FinalSettlementId,
    long TerminationRecordId,
    long EmployeeId,
    long? TriggeredByUserId
) : INotification;

public record ContractExpiredEvent(
    long ContractId,
    long EmployeeId
) : INotification;
