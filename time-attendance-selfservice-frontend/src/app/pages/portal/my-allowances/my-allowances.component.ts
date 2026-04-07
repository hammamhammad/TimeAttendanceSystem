import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

export interface AllowanceItem {
  id: number;
  allowanceTypeName: string;
  allowanceTypeNameAr?: string;
  amount: number;
  currency: string;
  effectiveFromDate: string;
  effectiveToDate?: string;
  status: string;
}

/**
 * My Allowances Component
 * Displays active allowances for the current employee
 */
@Component({
  selector: 'app-my-allowances',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './my-allowances.component.html',
  styleUrl: './my-allowances.component.css'
})
export class MyAllowancesComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  // State
  allowances = signal<AllowanceItem[]>([]);
  totalAllowances = signal<number>(0);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed values
  hasAllowances = computed(() => this.allowances().length > 0);
  currency = computed(() => {
    const items = this.allowances();
    return items.length > 0 ? items[0].currency : 'SAR';
  });

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Load both allowances and summary in parallel
    this.portalService.getMyAllowances().subscribe({
      next: (result) => {
        this.allowances.set(result || []);
        // Load summary
        this.portalService.getMyAllowanceSummary().subscribe({
          next: (summary) => {
            this.totalAllowances.set(summary?.totalMonthlyAllowances ?? summary?.totalAllowances ?? 0);
            this.loading.set(false);
          },
          error: () => {
            // Summary failed but allowances loaded - still show data
            this.loading.set(false);
          }
        });
      },
      error: (err) => {
        console.error('Failed to load allowances:', err);
        this.error.set(this.i18n.t('portal.allowances.failed_to_load'));
        this.notificationService.error(this.i18n.t('portal.allowances.failed_to_load'));
        this.loading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadData();
  }

  formatCurrency(amount: number): string {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getAllowanceName(item: AllowanceItem): string {
    const isAr = this.i18n.locale() === 'ar';
    return (isAr && item.allowanceTypeNameAr) ? item.allowanceTypeNameAr : item.allowanceTypeName;
  }
}
