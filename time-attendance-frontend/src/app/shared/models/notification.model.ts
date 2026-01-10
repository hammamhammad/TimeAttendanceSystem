/**
 * Enum defining the types of in-app notifications.
 */
export enum NotificationType {
  RequestSubmitted = 'RequestSubmitted',
  RequestApproved = 'RequestApproved',
  RequestRejected = 'RequestRejected',
  RequestDelegated = 'RequestDelegated',
  RequestEscalated = 'RequestEscalated',
  ApprovalPending = 'ApprovalPending',
  DelegationReceived = 'DelegationReceived',
  ApprovalReminder = 'ApprovalReminder'
}

/**
 * Interface for notification data from the API.
 */
export interface Notification {
  id: number;
  type: NotificationType;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  isRead: boolean;
  readAt: string | null;
  entityType: string | null;
  entityId: number | null;
  actionUrl: string | null;
  createdAtUtc: string;
}

/**
 * Interface for unread count response.
 */
export interface UnreadCountResponse {
  count: number;
}
