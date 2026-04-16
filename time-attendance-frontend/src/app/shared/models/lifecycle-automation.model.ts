// v13.5 lifecycle automation — mirrors the backend audit + enums.
// Keep in sync with: src/Domain/.../Common/Enums.cs + src/Domain/.../Lifecycle/LifecycleAutomationAudit.cs

export enum LifecycleAutomationType {
  OfferAcceptedCreateOnboarding = 1,
  OnboardingCompletedActivateEmployee = 2,
  ResignationApprovedCreateTermination = 3,
  TerminationCreateClearance = 4,
  TerminationSuspendEmployee = 5,
  ClearanceCompletedEnableSettlement = 6,
  FinalSettlementPaidDeactivateEmployee = 7,
  ContractExpiredAction = 8,
}

export enum LifecycleAutomationStatus {
  Succeeded = 1,
  Skipped = 2,
  Failed = 3,
  DuplicateSuppressed = 4,
  Disabled = 5,
  MissingPrerequisite = 6,
}

export enum ContractExpiredAction {
  NotifyOnly = 'NotifyOnly',
  AutoMarkExpired = 'AutoMarkExpired',
  Suspend = 'Suspend',
  Deactivate = 'Deactivate',
}

export interface LifecycleAutomationAuditEntry {
  id: number;
  automationType: LifecycleAutomationType;
  sourceEntityType: string;
  sourceEntityId: number;
  targetEntityType: string | null;
  targetEntityId: number | null;
  status: LifecycleAutomationStatus;
  reason: string | null;
  errorMessage: string | null;
  triggeredAtUtc: string;
  completedAtUtc: string | null;
  triggeredByUserId: number | null;
}

export interface LifecycleAutomationAuditDetail extends LifecycleAutomationAuditEntry {
  contextJson: string | null;
}

export interface LifecycleAutomationAuditPage {
  total: number;
  page: number;
  pageSize: number;
  items: LifecycleAutomationAuditEntry[];
}

/** Per-tenant config surface. All flags except ContractExpiredAction are booleans. */
export interface LifecycleAutomationSettings {
  lifecycleAutomationEnabled: boolean;
  autoCreateOnboardingOnOfferAcceptance: boolean;
  defaultOnboardingTemplateId: number | null;
  createEmployeeInactiveAtOfferAcceptance: boolean;
  autoActivateEmployeeOnOnboardingComplete: boolean;
  onboardingCompletionRequiresAllRequiredTasks: boolean;
  onboardingCompletionRequiresAllRequiredDocuments: boolean;
  autoCreateTerminationOnResignationApproved: boolean;
  autoCreateClearanceOnTermination: boolean;
  defaultClearanceTemplateId: number | null;
  autoSuspendEmployeeOnTerminationCreated: boolean;
  requireClearanceCompleteBeforeFinalSettlement: boolean;
  autoEnableFinalSettlementCalcOnClearanceComplete: boolean;
  autoDeactivateEmployeeOnFinalSettlementPaid: boolean;
  contractExpiredAction: ContractExpiredAction;
}
