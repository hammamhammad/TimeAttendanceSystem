// ===== Enums =====

export enum AnnouncementPriority {
  Low = 'Low',
  Normal = 'Normal',
  High = 'High',
  Urgent = 'Urgent'
}

export enum AnnouncementStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Published = 'Published',
  Expired = 'Expired',
  Archived = 'Archived'
}

export enum AnnouncementTargetAudience {
  All = 'All',
  Branch = 'Branch',
  Department = 'Department',
  Role = 'Role'
}

// ===== Announcement Category =====

export interface AnnouncementCategoryDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  announcementCount: number;
  createdAtUtc: string;
}

export interface CreateAnnouncementCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  icon?: string;
  sortOrder?: number;
  isActive: boolean;
}

export interface UpdateAnnouncementCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  icon?: string;
  sortOrder?: number;
  isActive: boolean;
}

// ===== Announcement =====

export interface AnnouncementDto {
  id: number;
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  categoryId: number;
  categoryName: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  targetAudience: AnnouncementTargetAudience;
  targetIds?: number[];
  targetNames?: string[];
  scheduledDate?: string;
  expiryDate?: string;
  publishedAtUtc?: string;
  isPinned: boolean;
  requiresAcknowledgment: boolean;
  acknowledgmentCount: number;
  totalTargetEmployees: number;
  createdByName: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  categoryId: number;
  priority: AnnouncementPriority;
  targetAudience: AnnouncementTargetAudience;
  targetIds?: number[];
  scheduledDate?: string;
  expiryDate?: string;
  isPinned: boolean;
  requiresAcknowledgment: boolean;
}

export interface UpdateAnnouncementRequest {
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  categoryId: number;
  priority: AnnouncementPriority;
  targetAudience: AnnouncementTargetAudience;
  targetIds?: number[];
  scheduledDate?: string;
  expiryDate?: string;
  isPinned: boolean;
  requiresAcknowledgment: boolean;
}

export interface AnnouncementAcknowledgmentDto {
  id: number;
  announcementId: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  acknowledgedAtUtc: string;
}
