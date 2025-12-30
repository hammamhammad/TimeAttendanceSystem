import { Component, Input, OnInit, signal, computed, inject, effect } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { StatusBadgeComponent, StatusVariant } from '../status-badge/status-badge.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LeaveBalanceService } from '../../../pages/settings/leave-balances/leave-balance.service';
import {
  LeaveBalanceSummary,
  VacationTypeBalance
} from '../../models/leave-balance.model';

/**
 * Reusable component for displaying employee leave balance summary.
 * Shows all vacation type balances with visual progress indicators.
 * Can be embedded in employee details, "My Balance" page, or dashboard widgets.
 */
@Component({
  selector: 'app-leave-balance-summary',
  standalone: true,
  imports: [
    FormsModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
],
  templateUrl: './leave-balance-summary.component.html',
  styleUrls: ['./leave-balance-summary.component.css']
})
export class LeaveBalanceSummaryComponent implements OnInit {
  private leaveBalanceService = inject(LeaveBalanceService);
  readonly i18n = inject(I18nService);

  // Input properties
  @Input() employeeId!: number;
  @Input() showYearSelector: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() compact: boolean = false; // Compact mode for widgets

  // State
  selectedYear = signal<number>(new Date().getFullYear());
  loading = this.leaveBalanceService.loading;
  summary = this.leaveBalanceService.balanceSummary;

  // Available years for selector
  availableYears = signal<number[]>([]);

  // Computed properties
  hasBalances = computed(() => {
    const summaryData = this.summary();
    return summaryData && summaryData.vacationTypeBalances.length > 0;
  });

  constructor() {
    // Watch for year changes and reload data
    effect(() => {
      const year = this.selectedYear();
      if (this.employeeId) {
        this.loadBalanceSummary();
      }
    });
  }

  ngOnInit(): void {
    if (!this.employeeId) {
      console.error('LeaveBalanceSummaryComponent: employeeId is required');
      return;
    }

    this.generateAvailableYears();
    this.loadBalanceSummary();
  }

  /**
   * Generates list of available years (current year ± 2 years).
   */
  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -2; i <= 2; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }

  /**
   * Loads balance summary from the service.
   */
  private loadBalanceSummary(): void {
    this.leaveBalanceService.getLeaveBalanceSummary(
      this.employeeId,
      this.selectedYear()
    ).subscribe();
  }

  /**
   * Handles year selection change.
   */
  onYearChange(): void {
    this.loadBalanceSummary();
  }

  /**
   * Refreshes balance data.
   */
  refresh(): void {
    this.loadBalanceSummary();
  }

  /**
   * Calculates percentage of balance used.
   */
  getUsagePercentage(balance: VacationTypeBalance): number {
    if (balance.entitledDays === 0) return 0;
    return Math.round((balance.usedDays / balance.entitledDays) * 100);
  }

  /**
   * Calculates percentage of balance accrued.
   */
  getAccrualPercentage(balance: VacationTypeBalance): number {
    if (balance.entitledDays === 0) return 0;
    return Math.round((balance.accruedDays / balance.entitledDays) * 100);
  }

  /**
   * Gets progress bar color class based on remaining balance.
   */
  getProgressBarClass(balance: VacationTypeBalance): string {
    const percentage = this.getUsagePercentage(balance);
    if (percentage >= 90) return 'bg-danger';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  }

  /**
   * Gets badge variant based on available balance.
   */
  getBalanceBadgeVariant(balance: VacationTypeBalance): StatusVariant {
    if (balance.currentBalance <= 0) return 'danger';
    if (balance.currentBalance < 5) return 'warning';
    return 'success';
  }

  /**
   * Formats last accrual date.
   */
  formatLastAccrualDate(dateString: string | null): string {
    if (!dateString) return this.i18n.t('common.notAvailable');
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  /**
   * Gets total statistics summary.
   */
  getTotalStats() {
    const summaryData = this.summary();
    if (!summaryData) return null;

    return {
      entitled: summaryData.totalEntitled,
      accrued: summaryData.totalAccrued,
      used: summaryData.totalUsed,
      pending: summaryData.totalPending,
      available: summaryData.totalAvailable
    };
  }
}
