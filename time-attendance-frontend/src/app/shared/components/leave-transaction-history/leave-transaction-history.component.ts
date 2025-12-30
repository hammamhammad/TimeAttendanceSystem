import { Component, Input, OnInit, signal, computed, inject, effect } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { StatusBadgeComponent, StatusVariant } from '../status-badge/status-badge.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LeaveBalanceService } from '../../../pages/settings/leave-balances/leave-balance.service';
import {
  LeaveTransaction,
  LeaveTransactionType,
  LeaveTransactionHistoryParams
} from '../../models/leave-balance.model';

/**
 * Reusable component for displaying employee leave transaction history.
 * Shows paginated list of all leave transactions with filters.
 * Can be embedded in employee details page or standalone transaction history page.
 */
@Component({
  selector: 'app-leave-transaction-history',
  standalone: true,
  imports: [
    FormsModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
],
  templateUrl: './leave-transaction-history.component.html',
  styleUrls: ['./leave-transaction-history.component.css']
})
export class LeaveTransactionHistoryComponent implements OnInit {
  private leaveBalanceService = inject(LeaveBalanceService);
  readonly i18n = inject(I18nService);

  // Input properties
  @Input() employeeId!: number;
  @Input() showFilters: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() compact: boolean = false;
  @Input() itemsPerPage: number = 20;

  // State
  loading = this.leaveBalanceService.loading;
  transactions = this.leaveBalanceService.transactions;
  pagedResult = this.leaveBalanceService.transactionsPagedResult;

  // Filter state
  selectedVacationTypeId = signal<number | null>(null);
  selectedYear = signal<number | null>(new Date().getFullYear());
  selectedTransactionType = signal<LeaveTransactionType | null>(null);
  currentPage = signal<number>(1);

  // Available years
  availableYears = signal<number[]>([]);

  // Transaction type options
  transactionTypeOptions = computed(() => [
    { value: null, label: this.i18n.t('common.all') },
    { value: LeaveTransactionType.Accrual, label: this.i18n.t('leaveBalance.transactionType.accrual') },
    { value: LeaveTransactionType.Usage, label: this.i18n.t('leaveBalance.transactionType.usage') },
    { value: LeaveTransactionType.Adjustment, label: this.i18n.t('leaveBalance.transactionType.adjustment') },
    { value: LeaveTransactionType.CarryOver, label: this.i18n.t('leaveBalance.transactionType.carryOver') },
    { value: LeaveTransactionType.Reset, label: this.i18n.t('leaveBalance.transactionType.reset') },
    { value: LeaveTransactionType.Reservation, label: this.i18n.t('leaveBalance.transactionType.reservation') },
    { value: LeaveTransactionType.ReservationRelease, label: this.i18n.t('leaveBalance.transactionType.reservationRelease') }
  ]);

  // Expose Math for template
  protected readonly Math = Math;

  constructor() {
    // Watch for filter changes and reload data
    effect(() => {
      // Trigger effect when any filter changes
      this.selectedVacationTypeId();
      this.selectedYear();
      this.selectedTransactionType();
      this.currentPage();

      if (this.employeeId) {
        this.loadTransactionHistory();
      }
    });
  }

  ngOnInit(): void {
    if (!this.employeeId) {
      console.error('LeaveTransactionHistoryComponent: employeeId is required');
      return;
    }

    this.generateAvailableYears();
    this.loadTransactionHistory();
  }

  /**
   * Generates list of available years (current year ± 5 years).
   */
  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -5; i <= 5; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }

  /**
   * Loads transaction history from the service.
   */
  private loadTransactionHistory(): void {
    const params: LeaveTransactionHistoryParams = {
      employeeId: this.employeeId,
      vacationTypeId: this.selectedVacationTypeId() || undefined,
      year: this.selectedYear() || undefined,
      pageNumber: this.currentPage(),
      pageSize: this.itemsPerPage
    };

    this.leaveBalanceService.getLeaveTransactionHistory(params).subscribe();
  }

  /**
   * Handles vacation type filter change.
   */
  onVacationTypeChange(): void {
    this.currentPage.set(1);
  }

  /**
   * Handles year filter change.
   */
  onYearChange(): void {
    this.currentPage.set(1);
  }

  /**
   * Handles transaction type filter change.
   */
  onTransactionTypeChange(): void {
    this.currentPage.set(1);
  }

  /**
   * Clears all filters.
   */
  clearFilters(): void {
    this.selectedVacationTypeId.set(null);
    this.selectedYear.set(new Date().getFullYear());
    this.selectedTransactionType.set(null);
    this.currentPage.set(1);
  }

  /**
   * Handles page change.
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Gets badge variant for transaction type.
   */
  getTransactionTypeVariant(type: LeaveTransactionType): StatusVariant {
    switch (type) {
      case LeaveTransactionType.Accrual:
        return 'success';
      case LeaveTransactionType.Usage:
        return 'danger';
      case LeaveTransactionType.Adjustment:
        return 'warning';
      case LeaveTransactionType.CarryOver:
        return 'info';
      case LeaveTransactionType.Reset:
        return 'secondary';
      case LeaveTransactionType.Reservation:
        return 'primary';
      case LeaveTransactionType.ReservationRelease:
        return 'light';
      default:
        return 'secondary';
    }
  }

  /**
   * Formats transaction date.
   */
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  /**
   * Formats days with sign.
   */
  formatDays(days: number): string {
    const sign = days > 0 ? '+' : '';
    return `${sign}${days}`;
  }

  /**
   * Gets CSS class for days display.
   */
  getDaysClass(days: number): string {
    return days > 0 ? 'text-success fw-bold' : 'text-danger fw-bold';
  }

  /**
   * Refreshes transaction history.
   */
  refresh(): void {
    this.loadTransactionHistory();
  }

  /**
   * Exports transaction history to CSV.
   */
  exportToCSV(): void {
    // TODO: Implement CSV export functionality
    console.log('Export to CSV clicked');
  }
}
