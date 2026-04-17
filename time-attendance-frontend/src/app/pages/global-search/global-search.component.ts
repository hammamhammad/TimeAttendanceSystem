import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { GlobalSearchService, GlobalSearchItem, GlobalSearchResponse } from './global-search.service';

/**
 * Phase 4 (v14.4): Dedicated search page for the GET /api/v1/search endpoint.
 *
 * Features:
 *   - Debounced text input (300ms) — avoids a request per keystroke.
 *   - Optional entity-type filter (checkbox set) bound to the `types` query param.
 *   - URL sync: `?q=…&types=…` so operators can bookmark / share a search.
 *   - Results grouped by entity type with a per-row deep link to the matching screen.
 *
 * Deep-link map: each entity type navigates to the most specific available screen
 * (execution-status detail for ApprovalExecution targets, operational-alerts detail
 * for alerts, the relevant list page otherwise). We don't build dedicated detail
 * pages for non-Phase-1/2/3 entities in this pass — existing app routes are reused.
 */

interface TypeOption { value: string; label: string; selected: boolean; }

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent {
  private svc = inject(GlobalSearchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  query = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  result = signal<GlobalSearchResponse | null>(null);

  types = signal<TypeOption[]>([
    { value: 'Employee', label: 'Employees', selected: true },
    { value: 'LoanApplication', label: 'Loans', selected: true },
    { value: 'ExpenseClaim', label: 'Expenses', selected: true },
    { value: 'BenefitEnrollment', label: 'Benefits', selected: true },
    { value: 'LetterRequest', label: 'Letters', selected: true },
    { value: 'OperationalFailureAlert', label: 'Alerts', selected: true }
  ]);

  private queryInput$ = new Subject<void>();
  groups = computed(() => {
    const items = this.result()?.items ?? [];
    const byType: { [k: string]: GlobalSearchItem[] } = {};
    for (const it of items) (byType[it.entityType] ??= []).push(it);
    return Object.entries(byType).map(([type, list]) => ({ type, list }));
  });

  constructor() {
    // Debounced live search.
    this.queryInput$.pipe(debounceTime(300)).subscribe(() => this.doSearch());
    // Read initial ?q= from URL.
    this.route.queryParamMap.subscribe(params => {
      const q = params.get('q') ?? '';
      this.query.set(q);
      const types = (params.get('types') ?? '').split(',').filter(Boolean);
      if (types.length > 0) {
        this.types.update(arr => arr.map(o => ({ ...o, selected: types.includes(o.value) })));
      }
      if (q.length >= 2) this.doSearch();
    });
  }

  onInput(value: string): void {
    this.query.set(value);
    this.queryInput$.next();
  }

  toggleType(t: TypeOption): void {
    this.types.update(arr => arr.map(o => o.value === t.value ? { ...o, selected: !o.selected } : o));
    this.doSearch();
  }

  private selectedTypeValues(): string[] {
    return this.types().filter(t => t.selected).map(t => t.value);
  }

  doSearch(): void {
    const q = this.query().trim();
    this.syncUrl();
    if (q.length < 2) { this.result.set(null); return; }

    this.loading.set(true);
    this.error.set(null);
    this.svc.search(q, this.selectedTypeValues(), 15).subscribe({
      next: r => { this.result.set(r); this.loading.set(false); },
      error: err => { this.error.set(err?.error?.error ?? 'Search failed.'); this.loading.set(false); }
    });
  }

  private syncUrl(): void {
    const q = this.query();
    const selected = this.selectedTypeValues();
    const queryParams: any = {};
    if (q) queryParams.q = q;
    if (selected.length > 0 && selected.length < this.types().length) queryParams.types = selected.join(',');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  /** Map entity type + id → the admin-UI route that shows the entity. */
  linkFor(item: GlobalSearchItem): string[] {
    switch (item.entityType) {
      case 'Employee':
        return ['/employees', String(item.entityId)];
      case 'OperationalFailureAlert':
        return ['/operational-alerts'];
      case 'LoanApplication':
        return ['/execution-status', 'LoanApplication', String(item.entityId)];
      case 'ExpenseClaim':
        return ['/execution-status', 'ExpenseClaim', String(item.entityId)];
      case 'BenefitEnrollment':
        return ['/execution-status', 'BenefitEnrollment', String(item.entityId)];
      case 'LetterRequest':
        return ['/execution-status', 'LetterRequest', String(item.entityId)];
      default:
        return ['/dashboard'];
    }
  }
}
