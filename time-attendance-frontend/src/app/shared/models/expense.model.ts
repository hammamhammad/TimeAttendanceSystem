// ===== Enums =====

export enum ExpenseClaimStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Reimbursed = 'Reimbursed',
  Cancelled = 'Cancelled'
}

// ===== Expense Category =====

export interface ExpenseCategoryDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount?: number;
  requiresReceipt: boolean;
  isActive: boolean;
  claimCount: number;
  createdAtUtc: string;
}

export interface CreateExpenseCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount?: number;
  requiresReceipt: boolean;
  isActive: boolean;
}

export interface UpdateExpenseCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxAmount?: number;
  requiresReceipt: boolean;
  isActive: boolean;
}

// ===== Expense Policy =====

export interface ExpensePolicyDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  maxClaimAmount: number;
  maxMonthlyAmount: number;
  requiresApproval: boolean;
  approvalThreshold: number;
  receiptRequiredAbove: number;
  allowedCategories: number[];
  allowedCategoryNames: string[];
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateExpensePolicyRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxClaimAmount: number;
  maxMonthlyAmount: number;
  requiresApproval: boolean;
  approvalThreshold: number;
  receiptRequiredAbove: number;
  allowedCategories: number[];
  isActive: boolean;
}

export interface UpdateExpensePolicyRequest {
  name: string;
  nameAr?: string;
  description?: string;
  maxClaimAmount: number;
  maxMonthlyAmount: number;
  requiresApproval: boolean;
  approvalThreshold: number;
  receiptRequiredAbove: number;
  allowedCategories: number[];
  isActive: boolean;
}

// ===== Expense Claim =====

export interface ExpenseClaimDto {
  id: number;
  claimNumber: string;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  title: string;
  description?: string;
  totalAmount: number;
  status: ExpenseClaimStatus;
  submittedAtUtc?: string;
  approvedByName?: string;
  approvedAtUtc?: string;
  rejectionReason?: string;
  reimbursedAtUtc?: string;
  items: ExpenseClaimItemDto[];
  createdAtUtc: string;
}

export interface ExpenseClaimItemDto {
  id: number;
  categoryId: number;
  categoryName: string;
  description: string;
  amount: number;
  receiptFileName?: string;
  receiptFileUrl?: string;
  expenseDate: string;
}

export interface CreateExpenseClaimRequest {
  employeeId: number;
  expensePolicyId?: number | null;
  currency?: string;
  description?: string;
  items: CreateExpenseClaimItemRequest[];
}

export interface CreateExpenseClaimItemRequest {
  expenseCategoryId?: number | null;
  description: string;
  descriptionAr?: string;
  amount: number;
  receiptUrl?: string;
  expenseDate: string;
  notes?: string;
}
