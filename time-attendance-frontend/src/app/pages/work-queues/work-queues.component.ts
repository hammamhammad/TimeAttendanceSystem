import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OperationalAlertsService } from '../operational-alerts/operational-alerts.service';

/**
 * Phase 4 (v14.4): Generic work-queue list view.
 *
 * One component handles six queue types driven by the `:queue` route param:
 *   - overdue-approvals
 *   - overdue-onboarding-tasks
 *   - overdue-clearance-items
 *   - unresolved-alerts
 *   - auto-checkout-review
 *   - pip-follow-through
 *
 * Each queue returns a different row shape from the backend — we render a simple
 * key/value table by iterating the row's own keys rather than hard-coding columns
 * per queue. This keeps the component small and handles backend shape additions
 * automatically (new fields just appear as new columns).
 */
@Component({
  selector: 'app-work-queues',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './work-queues.component.html',
  styleUrls: ['./work-queues.component.css']
})
export class WorkQueuesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(OperationalAlertsService);

  queueType = signal<string>('');
  rows = signal<any[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  limit = signal<number>(100);

  columns = computed(() => {
    const first = this.rows()[0];
    return first ? Object.keys(first) : [];
  });

  readonly queueTitles: { [key: string]: string } = {
    'overdue-approvals': 'Overdue Approvals',
    'overdue-onboarding-tasks': 'Overdue Onboarding Tasks',
    'overdue-clearance-items': 'Overdue Clearance Items',
    'unresolved-alerts': 'Unresolved Operational Alerts',
    'auto-checkout-review': 'Auto-Checkout Review',
    'pip-follow-through': 'PIP Follow-Through'
  };

  readonly queueDescriptions: { [key: string]: string } = {
    'overdue-approvals': 'Workflow step executions past their due-at time.',
    'overdue-onboarding-tasks': 'Non-terminal onboarding tasks past their due date.',
    'overdue-clearance-items': 'Clearance items open past the 14-day SLA.',
    'unresolved-alerts': 'Operational failure alerts open for HR action.',
    'auto-checkout-review': 'System-generated auto-checkouts in the last 7 days — HR spot-check.',
    'pip-follow-through': 'Unsuccessful PIPs — each should have a pending resignation request linked.'
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const q = params.get('queue') ?? '';
      this.queueType.set(q);
      this.reload();
    });
  }

  reload(): void {
    const q = this.queueType();
    if (!q) return;
    this.loading.set(true);
    this.error.set(null);
    this.svc.getQueue(q, this.limit()).subscribe({
      next: r => { this.rows.set(r ?? []); this.loading.set(false); },
      error: err => {
        this.error.set(err?.error?.error ?? `Failed to load queue '${q}'.`);
        this.rows.set([]); this.loading.set(false);
      }
    });
  }

  formatCell(value: any): string {
    if (value == null) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      try { return new Date(value).toLocaleString(); } catch { return value; }
    }
    return String(value);
  }

  onLimitChange(newLimit: number): void {
    this.limit.set(newLimit);
    this.reload();
  }
}
