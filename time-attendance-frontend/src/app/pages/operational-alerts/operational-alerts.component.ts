import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  OperationalAlertsService,
  OperationalFailureAlert,
  OperationalFailureCategory,
  OperationalFailureSeverity
} from './operational-alerts.service';

/**
 * Phase 3 (v14.3): minimum-viable admin screen for the operational-alerts API.
 *
 * Lets HR/admin:
 *   - see the list of unresolved alerts with category + severity filters,
 *   - resolve or retry a single alert,
 *   - bulk-resolve / bulk-retry the selected alerts.
 *
 * Standalone Angular 20 component with signals, using the project's existing styling
 * conventions. No NgRx/Store — keeps scope tight; the list is reloaded after each action.
 */
@Component({
  selector: 'app-operational-alerts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operational-alerts.component.html',
  styleUrls: ['./operational-alerts.component.css']
})
export class OperationalAlertsComponent implements OnInit {
  private svc = inject(OperationalAlertsService);

  // Filters (signals so UI stays reactive).
  isResolved = signal<boolean>(false);
  category = signal<OperationalFailureCategory | ''>('');
  minSeverity = signal<OperationalFailureSeverity | ''>('');
  page = signal<number>(1);
  pageSize = signal<number>(50);

  loading = signal<boolean>(false);
  total = signal<number>(0);
  items = signal<OperationalFailureAlert[]>([]);
  selectedIds = signal<Set<number>>(new Set<number>());

  errorMessage = signal<string | null>(null);

  // Computed list with per-row selection flag for the template.
  rows = computed(() =>
    this.items().map(a => ({ ...a, selected: this.selectedIds().has(a.id) }))
  );

  allSelected = computed(() => {
    const ids = this.selectedIds();
    const list = this.items();
    return list.length > 0 && list.every(a => ids.has(a.id));
  });

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.svc.list({
      isResolved: this.isResolved(),
      category: this.category() || undefined,
      minSeverity: this.minSeverity() || undefined,
      page: this.page(),
      pageSize: this.pageSize()
    }).subscribe({
      next: r => {
        this.total.set(r.total);
        this.items.set(r.items);
        this.loading.set(false);
      },
      error: err => {
        this.errorMessage.set(err?.error?.error ?? 'Failed to load alerts.');
        this.loading.set(false);
      }
    });
  }

  toggle(id: number): void {
    const s = new Set(this.selectedIds());
    if (s.has(id)) s.delete(id); else s.add(id);
    this.selectedIds.set(s);
  }

  toggleAll(): void {
    const s = new Set<number>();
    if (!this.allSelected()) this.items().forEach(a => s.add(a.id));
    this.selectedIds.set(s);
  }

  resolve(alert: OperationalFailureAlert): void {
    this.svc.resolve(alert.id).subscribe({
      next: () => this.reload(),
      error: err => this.errorMessage.set(err?.error?.error ?? 'Resolve failed.')
    });
  }

  retry(alert: OperationalFailureAlert): void {
    this.svc.retry(alert.id).subscribe({
      next: () => this.reload(),
      error: err => this.errorMessage.set(err?.error?.error ?? 'Retry failed.')
    });
  }

  bulkResolve(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) return;
    this.svc.bulkResolve({ alertIds: ids }).subscribe({
      next: _ => { this.selectedIds.set(new Set()); this.reload(); },
      error: err => this.errorMessage.set(err?.error?.error ?? 'Bulk resolve failed.')
    });
  }

  bulkRetry(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) return;
    this.svc.bulkRetry({ alertIds: ids }).subscribe({
      next: _ => { this.selectedIds.set(new Set()); this.reload(); },
      error: err => this.errorMessage.set(err?.error?.error ?? 'Bulk retry failed.')
    });
  }
}
