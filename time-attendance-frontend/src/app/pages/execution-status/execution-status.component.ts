import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

/**
 * Phase 4 (v14.4): Admin detail UI for
 *   GET /api/v1/approval-execution/{targetType}/{id}/execution-status
 *
 * Shows the execution status of any Phase 1 approval target. Displays a clear
 * Executed/Not-Executed badge, execution-error text when present, and a Retry
 * button when the retry is safe (executed=false, status=Approved, for
 * ApprovalExecution-category retryable path).
 */

type TargetType =
  | 'AllowanceRequest'
  | 'LoanApplication'
  | 'SalaryAdvance'
  | 'ExpenseClaim'
  | 'BenefitEnrollment'
  | 'LetterRequest';

@Component({
  selector: 'app-execution-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './execution-status.component.html',
  styleUrls: ['./execution-status.component.css']
})
export class ExecutionStatusComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/approval-execution`;

  targetType = signal<TargetType | ''>('');
  id = signal<number | null>(null);
  loading = signal<boolean>(false);
  retrying = signal<boolean>(false);
  error = signal<string | null>(null);
  toastMessage = signal<string | null>(null);
  record = signal<any | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tt = (params.get('targetType') ?? '') as TargetType;
      const id = Number(params.get('id') ?? '0');
      this.targetType.set(tt);
      this.id.set(id);
      if (tt && id > 0) this.reload();
    });
  }

  reload(): void {
    const tt = this.targetType();
    const id = this.id();
    if (!tt || !id) return;
    this.loading.set(true);
    this.error.set(null);
    this.http.get<any>(`${this.baseUrl}/${tt}/${id}/execution-status`).subscribe({
      next: d => { this.record.set(d); this.loading.set(false); },
      error: err => {
        this.error.set(err?.error?.error ?? err?.status === 404 ? 'Not found.' : 'Failed to load.');
        this.loading.set(false);
      }
    });
  }

  retry(): void {
    const tt = this.targetType();
    const id = this.id();
    if (!tt || !id) return;
    this.retrying.set(true);
    this.toastMessage.set(null);
    const modulePath = this.modulePath(tt);
    if (!modulePath) {
      this.retrying.set(false);
      this.toastMessage.set('This target type cannot be retried from this screen.');
      return;
    }
    this.http.post<any>(`${this.baseUrl}/${modulePath}/${id}/execute`, {}).subscribe({
      next: r => {
        this.retrying.set(false);
        this.toastMessage.set(`Result: ${r?.outcome} — ${r?.message ?? ''}`);
        this.reload();
      },
      error: err => {
        this.retrying.set(false);
        this.toastMessage.set(err?.error?.error ?? 'Retry failed.');
      }
    });
  }

  /** Maps targetType enum to the REST path segment used on the execute endpoint. */
  private modulePath(tt: TargetType): string | null {
    switch (tt) {
      case 'AllowanceRequest':   return 'allowance-requests';
      case 'LoanApplication':    return 'loan-applications';
      case 'SalaryAdvance':      return 'salary-advances';
      case 'ExpenseClaim':       return 'expense-claims';
      case 'BenefitEnrollment':  return 'benefit-enrollments';
      case 'LetterRequest':      return 'letter-requests';
    }
  }

  recordEntries(): Array<[string, any]> {
    const r = this.record();
    return r ? Object.entries(r) : [];
  }

  format(value: any): string {
    if (value == null) return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      try { return new Date(value).toLocaleString(); } catch { return value; }
    }
    return String(value);
  }
}
