import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  OperationalAlertsService,
  OpsDashboardSummary
} from '../operational-alerts/operational-alerts.service';

/**
 * Phase 4 (v14.4): Admin screen for GET /api/v1/ops-dashboard/summary.
 *
 * Surface-area: counts only (no charts — project has no chart primitive we can reuse
 * without overbuilding). Each card links into the relevant list/queue screen so the
 * operator can drill in from one click.
 */
@Component({
  selector: 'app-ops-dashboard-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ops-dashboard-summary.component.html',
  styleUrls: ['./ops-dashboard-summary.component.css']
})
export class OpsDashboardSummaryComponent implements OnInit {
  private svc = inject(OperationalAlertsService);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  data = signal<OpsDashboardSummary | null>(null);

  // Pre-computed totals the template reads directly so we avoid complex template expressions.
  totalApprovedNotExecuted = computed(() => {
    const d = this.data();
    if (!d) return 0;
    const a = d.approvedNotExecuted;
    return a.allowanceRequests + a.loanApplications + a.salaryAdvances
      + a.expenseClaims + a.benefitEnrollments + a.letterRequests;
  });

  totalOverdue = computed(() => {
    const d = this.data();
    if (!d) return 0;
    return d.overdue.onboardingTasks + d.overdue.clearanceItems + d.overdue.workflowApprovals;
  });

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.loading.set(true);
    this.error.set(null);
    this.svc.getDashboardSummary().subscribe({
      next: d => { this.data.set(d); this.loading.set(false); },
      error: err => { this.error.set(err?.error?.error ?? 'Failed to load summary.'); this.loading.set(false); }
    });
  }

  categoryEntries(): Array<[string, number]> {
    const byCat = this.data()?.alerts?.byCategory ?? {};
    return Object.entries(byCat);
  }

  severityEntries(): Array<[string, number]> {
    const bySev = this.data()?.alerts?.bySeverity ?? {};
    return Object.entries(bySev);
  }

  lifecycleEntries(): Array<[string, number]> {
    const byAt = this.data()?.lifecycle?.byAutomationType ?? {};
    return Object.entries(byAt);
  }
}
