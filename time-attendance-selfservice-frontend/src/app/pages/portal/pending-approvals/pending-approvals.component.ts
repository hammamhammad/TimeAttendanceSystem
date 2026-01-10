import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PortalService } from '../services/portal.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';

import { PendingApprovalItem, ApprovalEntityType } from '../models/manager-dashboard.model';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
  ],
  templateUrl: './pending-approvals.component.html',
  styleUrl: './pending-approvals.component.css'
})
export class PendingApprovalsComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly destroy$ = new Subject<void>();

  // State
  pendingApprovals = this.portalService.pendingApprovals;
  isLoading = this.portalService.pendingApprovalsLoading;
  activeTab = signal<string>('all');
  searchTerm = signal<string>('');
  selectedItems = signal<Set<number>>(new Set());

  // Processing state
  processingItems = signal<Set<number>>(new Set());

  // Filtered approvals based on active tab and search
  filteredApprovals = computed(() => {
    let approvals = this.pendingApprovals();
    const tab = this.activeTab();
    const search = this.searchTerm().toLowerCase();

    // Filter by type tab
    if (tab !== 'all') {
      approvals = approvals.filter(a => this.matchesEntityType(a.entityType, tab));
    }

    // Filter by search term
    if (search) {
      approvals = approvals.filter(a =>
        (a.employeeName || '').toLowerCase().includes(search) ||
        (a.employeeCode || '').toLowerCase().includes(search) ||
        (a.requestSummary || '').toLowerCase().includes(search)
      );
    }

    return approvals;
  });

  // Counts by type
  counts = computed(() => {
    const approvals = this.pendingApprovals();
    return {
      all: approvals.length,
      vacation: approvals.filter(a => this.matchesEntityType(a.entityType, ApprovalEntityType.Vacation)).length,
      excuse: approvals.filter(a => this.matchesEntityType(a.entityType, ApprovalEntityType.Excuse)).length,
      remoteWork: approvals.filter(a => this.matchesEntityType(a.entityType, ApprovalEntityType.RemoteWork)).length,
      fingerprint: approvals.filter(a => this.matchesEntityType(a.entityType, ApprovalEntityType.Fingerprint)).length
    };
  });

  // Tab configuration
  tabs = [
    { id: 'all', label: 'common.all', icon: 'bi-inbox' },
    { id: ApprovalEntityType.Vacation, label: 'portal.vacations', icon: 'bi-calendar-event' },
    { id: ApprovalEntityType.Excuse, label: 'portal.excuses', icon: 'bi-clock-history' },
    { id: ApprovalEntityType.RemoteWork, label: 'portal.remote_work', icon: 'bi-house-door' },
    { id: ApprovalEntityType.Fingerprint, label: 'portal.fingerprint', icon: 'bi-fingerprint' }
  ];

  // Check if all visible items are selected
  allSelected = computed(() => {
    const filtered = this.filteredApprovals();
    const selected = this.selectedItems();
    return filtered.length > 0 && filtered.every(a => selected.has(a.workflowInstanceId));
  });

  // Check if any items are selected
  hasSelection = computed(() => this.selectedItems().size > 0);

  ngOnInit(): void {
    this.loadPendingApprovals();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPendingApprovals(): void {
    this.portalService.loadPendingApprovals()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          console.error('Error loading pending approvals:', error);
          this.notification.error(this.i18n.t('portal.error_loading_approvals'));
        }
      });
  }

  onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
    this.selectedItems.set(new Set());
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  toggleSelectAll(): void {
    const filtered = this.filteredApprovals();
    const selected = this.selectedItems();

    if (this.allSelected()) {
      // Deselect all
      this.selectedItems.set(new Set());
    } else {
      // Select all filtered items
      const newSelection = new Set<number>();
      filtered.forEach(a => newSelection.add(a.workflowInstanceId));
      this.selectedItems.set(newSelection);
    }
  }

  toggleSelect(item: PendingApprovalItem): void {
    const selected = new Set(this.selectedItems());
    if (selected.has(item.workflowInstanceId)) {
      selected.delete(item.workflowInstanceId);
    } else {
      selected.add(item.workflowInstanceId);
    }
    this.selectedItems.set(selected);
  }

  isSelected(item: PendingApprovalItem): boolean {
    return this.selectedItems().has(item.workflowInstanceId);
  }

  isProcessing(item: PendingApprovalItem): boolean {
    return this.processingItems().has(item.workflowInstanceId);
  }

  async approve(item: PendingApprovalItem): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.confirm_approve'),
      message: this.i18n.t('portal.confirm_approve_message', { name: item.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });

    if (!result.confirmed) return;

    this.setProcessing(item.workflowInstanceId, true);

    this.portalService.approveWorkflowStep(item.workflowInstanceId, 'Approved via portal')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notification.success(this.i18n.t('portal.approval_success'));
          this.loadPendingApprovals();
          this.selectedItems.update(s => {
            const newSet = new Set(s);
            newSet.delete(item.workflowInstanceId);
            return newSet;
          });
        },
        error: (error) => {
          console.error('Error approving:', error);
          this.notification.error(this.i18n.t('portal.approval_error'));
        },
        complete: () => {
          this.setProcessing(item.workflowInstanceId, false);
        }
      });
  }

  async reject(item: PendingApprovalItem): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.confirm_reject'),
      message: this.i18n.t('portal.confirm_reject_message', { name: item.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });

    if (!result.confirmed) return;

    this.setProcessing(item.workflowInstanceId, true);

    this.portalService.rejectWorkflowStep(item.workflowInstanceId, 'Rejected via portal')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notification.success(this.i18n.t('portal.rejection_success'));
          this.loadPendingApprovals();
          this.selectedItems.update(s => {
            const newSet = new Set(s);
            newSet.delete(item.workflowInstanceId);
            return newSet;
          });
        },
        error: (error) => {
          console.error('Error rejecting:', error);
          this.notification.error(this.i18n.t('portal.rejection_error'));
        },
        complete: () => {
          this.setProcessing(item.workflowInstanceId, false);
        }
      });
  }

  async bulkApprove(): Promise<void> {
    const selectedIds = Array.from(this.selectedItems());
    if (selectedIds.length === 0) return;

    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.confirm_bulk_approve'),
      message: this.i18n.t('portal.confirm_bulk_approve_message', { count: selectedIds.length.toString() }),
      confirmText: this.i18n.t('portal.approve_all'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });

    if (!result.confirmed) return;

    // Process each approval sequentially
    for (const id of selectedIds) {
      this.setProcessing(id, true);
      try {
        await this.portalService.approveWorkflowStep(id, 'Bulk approved via portal').toPromise();
      } catch (error) {
        console.error(`Error approving ${id}:`, error);
      }
      this.setProcessing(id, false);
    }

    this.notification.success(this.i18n.t('portal.bulk_approval_success'));
    this.selectedItems.set(new Set());
    this.loadPendingApprovals();
  }

  async bulkReject(): Promise<void> {
    const selectedIds = Array.from(this.selectedItems());
    if (selectedIds.length === 0) return;

    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.confirm_bulk_reject'),
      message: this.i18n.t('portal.confirm_bulk_reject_message', { count: selectedIds.length.toString() }),
      confirmText: this.i18n.t('portal.reject_all'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });

    if (!result.confirmed) return;

    // Process each rejection sequentially
    for (const id of selectedIds) {
      this.setProcessing(id, true);
      try {
        await this.portalService.rejectWorkflowStep(id, 'Bulk rejected via portal').toPromise();
      } catch (error) {
        console.error(`Error rejecting ${id}:`, error);
      }
      this.setProcessing(id, false);
    }

    this.notification.success(this.i18n.t('portal.bulk_rejection_success'));
    this.selectedItems.set(new Set());
    this.loadPendingApprovals();
  }

  viewDetails(item: PendingApprovalItem): void {
    // Normalize entity type for routing
    const entityType = typeof item.entityType === 'number'
      ? this.getEntityTypeFromNumber(item.entityType)
      : item.entityType;

    const routeMap: Record<string, string> = {
      [ApprovalEntityType.Vacation]: '/vacation-requests',
      [ApprovalEntityType.Excuse]: '/excuse-requests',
      [ApprovalEntityType.RemoteWork]: '/remote-work-requests',
      [ApprovalEntityType.Fingerprint]: '/fingerprint-requests'
    };

    const route = routeMap[entityType];
    if (route) {
      // Add approval=true query param to indicate this is for approval purposes
      this.router.navigate([route, item.entityId], { queryParams: { approval: 'true' } });
    }
  }

  getTypeIcon(type: ApprovalEntityType): string {
    const iconMap: Record<string, string> = {
      [ApprovalEntityType.Vacation]: 'bi-calendar-event',
      [ApprovalEntityType.Excuse]: 'bi-clock-history',
      [ApprovalEntityType.RemoteWork]: 'bi-house-door',
      [ApprovalEntityType.Fingerprint]: 'bi-fingerprint'
    };
    return iconMap[type] || 'bi-file-text';
  }

  getTypeLabel(type: ApprovalEntityType | number | string): string {
    // Handle numeric enum values from backend (1 = Vacation, 2 = Excuse, etc.)
    const typeKey = typeof type === 'number' ? this.getEntityTypeFromNumber(type) : type;

    const labelMap: Record<string, string> = {
      [ApprovalEntityType.Vacation]: this.i18n.t('portal.vacation'),
      [ApprovalEntityType.Excuse]: this.i18n.t('portal.excuse'),
      [ApprovalEntityType.RemoteWork]: this.i18n.t('portal.remote_work'),
      [ApprovalEntityType.Fingerprint]: this.i18n.t('portal.fingerprint'),
      'FingerprintRequest': this.i18n.t('portal.fingerprint') // Backend uses FingerprintRequest
    };
    return labelMap[typeKey] || typeKey?.toString() || this.i18n.t('common.unknown');
  }

  getTypeVariant(type: ApprovalEntityType | number | string): 'primary' | 'warning' | 'success' | 'info' {
    // Handle numeric enum values from backend (1 = Vacation, 2 = Excuse, etc.)
    const typeKey = typeof type === 'number' ? this.getEntityTypeFromNumber(type) : type;

    const variantMap: Record<string, 'primary' | 'warning' | 'success' | 'info'> = {
      [ApprovalEntityType.Vacation]: 'primary',
      [ApprovalEntityType.Excuse]: 'warning',
      [ApprovalEntityType.RemoteWork]: 'success',
      [ApprovalEntityType.Fingerprint]: 'info',
      'FingerprintRequest': 'info' // Backend uses FingerprintRequest
    };
    return variantMap[typeKey] || 'primary';
  }

  private getEntityTypeFromNumber(type: number): string {
    const typeMap: Record<number, string> = {
      1: ApprovalEntityType.Vacation,
      2: ApprovalEntityType.Excuse,
      3: ApprovalEntityType.RemoteWork,
      4: ApprovalEntityType.Fingerprint
    };
    return typeMap[type] || '';
  }

  /**
   * Checks if an entity type matches the expected type.
   * Handles numeric values from backend (1 = Vacation, etc.) and string values.
   */
  private matchesEntityType(actualType: ApprovalEntityType | number | string, expectedType: string): boolean {
    // Convert numeric type to string if needed
    const normalizedActual = typeof actualType === 'number'
      ? this.getEntityTypeFromNumber(actualType)
      : actualType;

    // Handle FingerprintRequest from backend
    if (expectedType === ApprovalEntityType.Fingerprint) {
      return normalizedActual === expectedType || normalizedActual === 'FingerprintRequest';
    }

    return normalizedActual === expectedType;
  }

  getTabCount(tabId: string): number {
    if (tabId === 'all') return this.counts().all;
    const countMap: Record<string, number> = {
      [ApprovalEntityType.Vacation]: this.counts().vacation,
      [ApprovalEntityType.Excuse]: this.counts().excuse,
      [ApprovalEntityType.RemoteWork]: this.counts().remoteWork,
      [ApprovalEntityType.Fingerprint]: this.counts().fingerprint
    };
    return countMap[tabId] || 0;
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatRelativeTime(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return this.i18n.t('portal.minutes_ago', { count: minutes.toString() });
      }
      return this.i18n.t('portal.hours_ago', { count: hours.toString() });
    }
    if (days === 1) return this.i18n.t('portal.yesterday');
    if (days < 7) return this.i18n.t('portal.days_ago', { count: days.toString() });
    return this.formatDate(date);
  }

  private setProcessing(id: number, processing: boolean): void {
    this.processingItems.update(set => {
      const newSet = new Set(set);
      if (processing) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }

  refresh(): void {
    this.loadPendingApprovals();
  }
}
