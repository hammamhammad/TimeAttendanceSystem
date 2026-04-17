import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

/**
 * Phase 4 (v14.4): Admin UI for GET /api/v1/ops-dashboard/approved-not-executed.
 *
 * Lists every approved-but-not-executed Phase 1 target across all six types.
 * Clicking a row navigates to the execution-status detail page so HR can see the
 * full execution record and (where retryable) push the retry button.
 */

interface ApprovedNotExecutedResponse {
  allowanceRequests: Array<{ id: number; employeeId: number; approvedAt: string | null; executionError: string | null }>;
  loanApplications: Array<{ id: number; employeeId: number; approvedAt: string | null; approvedAmount: number | null; executionError: string | null }>;
  salaryAdvances: Array<{ id: number; employeeId: number; approvedAt: string | null; amount: number; executionError: string | null }>;
  expenseClaims: Array<{ id: number; claimNumber: string; employeeId: number; approvedAt: string | null; totalAmount: number; executionError: string | null }>;
  benefitEnrollments: Array<{ id: number; employeeId: number; effectiveDate: string; employeeMonthlyContribution: number; executionError: string | null }>;
  letterRequests: Array<{ id: number; employeeId: number; letterType: string; approvedAt: string | null; executionError: string | null }>;
}

interface SectionDef {
  key: keyof ApprovedNotExecutedResponse;
  title: string;
  targetType: string; // matches ApprovalExecutionTargetType on the backend
  columns: Array<{ field: string; label: string }>;
}

@Component({
  selector: 'app-approved-not-executed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './approved-not-executed.component.html',
  styleUrls: ['./approved-not-executed.component.css']
})
export class ApprovedNotExecutedComponent implements OnInit {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/ops-dashboard`;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  data = signal<ApprovedNotExecutedResponse | null>(null);

  readonly sections: SectionDef[] = [
    { key: 'allowanceRequests', title: 'Allowance Requests', targetType: 'AllowanceRequest',
      columns: [
        { field: 'id', label: 'Id' },
        { field: 'employeeId', label: 'Employee' },
        { field: 'approvedAt', label: 'Approved' },
        { field: 'executionError', label: 'Last error' }
      ] },
    { key: 'loanApplications', title: 'Loan Applications', targetType: 'LoanApplication',
      columns: [
        { field: 'id', label: 'Id' }, { field: 'employeeId', label: 'Employee' },
        { field: 'approvedAmount', label: 'Amount' }, { field: 'approvedAt', label: 'Approved' },
        { field: 'executionError', label: 'Last error' }
      ] },
    { key: 'salaryAdvances', title: 'Salary Advances', targetType: 'SalaryAdvance',
      columns: [
        { field: 'id', label: 'Id' }, { field: 'employeeId', label: 'Employee' },
        { field: 'amount', label: 'Amount' }, { field: 'approvedAt', label: 'Approved' },
        { field: 'executionError', label: 'Last error' }
      ] },
    { key: 'expenseClaims', title: 'Expense Claims', targetType: 'ExpenseClaim',
      columns: [
        { field: 'claimNumber', label: 'Claim #' }, { field: 'employeeId', label: 'Employee' },
        { field: 'totalAmount', label: 'Total' }, { field: 'approvedAt', label: 'Approved' },
        { field: 'executionError', label: 'Last error' }
      ] },
    { key: 'benefitEnrollments', title: 'Benefit Enrollments', targetType: 'BenefitEnrollment',
      columns: [
        { field: 'id', label: 'Id' }, { field: 'employeeId', label: 'Employee' },
        { field: 'employeeMonthlyContribution', label: 'Employee premium' },
        { field: 'effectiveDate', label: 'Effective' },
        { field: 'executionError', label: 'Last error' }
      ] },
    { key: 'letterRequests', title: 'Letter Requests', targetType: 'LetterRequest',
      columns: [
        { field: 'id', label: 'Id' }, { field: 'employeeId', label: 'Employee' },
        { field: 'letterType', label: 'Type' }, { field: 'approvedAt', label: 'Approved' },
        { field: 'executionError', label: 'Last error' }
      ] }
  ];

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<ApprovedNotExecutedResponse>(`${this.baseUrl}/approved-not-executed`).subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: err => {
        this.error.set(err?.error?.error ?? 'Failed to load approved-but-not-executed list.');
        this.loading.set(false);
      }
    });
  }

  rowsFor(section: SectionDef): any[] {
    const d = this.data();
    if (!d) return [];
    return (d[section.key] as any[]) ?? [];
  }

  format(value: any): string {
    if (value == null) return '—';
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      try { return new Date(value).toLocaleString(); } catch { return value; }
    }
    return String(value);
  }
}
