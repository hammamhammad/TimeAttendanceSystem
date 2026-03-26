export type NfcTagStatus = 'Unregistered' | 'Registered' | 'Active' | 'Disabled' | 'Lost';

export interface NfcTag {
  id: number;
  tagUid: string;
  branchId: number;
  branchName?: string;
  description?: string;
  isWriteProtected: boolean;
  lockedAt?: string;
  lockedByUserId?: number;
  lockedByUserName?: string;
  isActive: boolean;
  status: number;
  lastScannedAt?: string;
  scanCount: number;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface NfcTagsResponse {
  items: NfcTag[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateNfcTagRequest {
  tagUid: string;
  branchId: number;
  description?: string;
}

export interface UpdateNfcTagRequest {
  branchId: number;
  description?: string;
  isActive: boolean;
}

export interface NfcTagValidationResult {
  isValid: boolean;
  error?: string;
}
