import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

export interface SalaryBreakdown {
  basicSalary: number;
  currency: string;
  allowances: SalaryItem[];
  deductions: SalaryItem[];
  totalAllowances: number;
  totalDeductions: number;
  grossSalary: number;
  netSalary: number;
  effectiveDate?: string;
  lastUpdated?: string;
}

export interface SalaryItem {
  name: string;
  nameAr?: string;
  amount: number;
  type: string;
  isPercentage?: boolean;
  percentage?: number;
}

/**
 * My Salary Component
 * Displays current salary breakdown for the employee
 */
@Component({
  selector: 'app-my-salary',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './my-salary.component.html',
  styleUrl: './my-salary.component.css'
})
export class MySalaryComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  // State
  salary = signal<SalaryBreakdown | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed values
  hasAllowances = computed(() => {
    const s = this.salary();
    return s && s.allowances && s.allowances.length > 0;
  });

  hasDeductions = computed(() => {
    const s = this.salary();
    return s && s.deductions && s.deductions.length > 0;
  });

  ngOnInit(): void {
    this.loadSalary();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  loadSalary(): void {
    this.loading.set(true);
    this.error.set(null);

    this.portalService.getMyCurrentSalary().subscribe({
      next: (result) => {
        if (!result) { this.salary.set(null); this.loading.set(false); return; }
        // Transform backend response to match SalaryBreakdown interface
        const raw = result;
        const components: any[] = raw.components || [];
        const allowances: SalaryItem[] = components
          .filter((c: any) => c.componentType !== 'Deduction')
          .map((c: any) => ({ name: c.componentName, nameAr: c.componentNameAr, amount: c.amount || 0, type: c.componentType }));
        const deductions: SalaryItem[] = components
          .filter((c: any) => c.componentType === 'Deduction')
          .map((c: any) => ({ name: c.componentName, nameAr: c.componentNameAr, amount: c.amount || 0, type: c.componentType }));
        const totalAllowances = allowances.reduce((sum, a) => sum + a.amount, 0);
        const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
        const basicSalary = raw.baseSalary || 0;
        const grossSalary = basicSalary + totalAllowances;
        const netSalary = grossSalary - totalDeductions;

        this.salary.set({
          basicSalary,
          currency: raw.currency || 'SAR',
          allowances,
          deductions,
          totalAllowances,
          totalDeductions,
          grossSalary,
          netSalary,
          effectiveDate: raw.effectiveDate
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load salary:', err);
        this.error.set(this.i18n.t('portal.salary.failed_to_load'));
        this.notificationService.error(this.i18n.t('portal.salary.failed_to_load'));
        this.loading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadSalary();
  }

  formatCurrency(amount: number | undefined | null): string {
    if (amount == null) return '0.00';
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getItemName(item: SalaryItem): string {
    const isAr = this.i18n.locale() === 'ar';
    return (isAr && item.nameAr) ? item.nameAr : item.name;
  }

  getCurrencyLabel(): string {
    const s = this.salary();
    return s?.currency || 'SAR';
  }
}
