import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { LeaveEncashmentService } from '../../../../core/services/leave-encashment.service';
import { LeaveEncashment } from '../../../../shared/models/leave-encashment.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-leave-encashment',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent],
  templateUrl: './view-leave-encashment.component.html',
  styleUrls: ['./view-leave-encashment.component.css']
})
export class ViewLeaveEncashmentComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(LeaveEncashmentService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);

  loading = signal(false);
  item = signal<LeaveEncashment | null>(null);
  entityId = signal<number | null>(null);
  rejectionNotes = signal('');

  statusBadge = computed(() => {
    const data = this.item();
    if (!data) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Pending: 'warning', Approved: 'success', Rejected: 'danger', Processed: 'info', Cancelled: 'secondary' };
    return { label: this.i18n.t('leave_encashments.status_' + data.status.toLowerCase()), variant: map[data.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const data = this.item();
    if (!data) return [];
    return [
      { label: this.i18n.t('common.employee'), value: data.employeeName },
      { label: this.i18n.t('common.employee_number'), value: data.employeeNumber || '-' },
      { label: this.i18n.t('common.branch'), value: data.branchName || '-' },
      { label: this.i18n.t('common.department'), value: data.departmentName || '-' },
      { label: this.i18n.t('leave_encashments.leave_type'), value: data.vacationTypeName || '-' },
      { label: this.i18n.t('leave_encashments.year'), value: data.year?.toString() || '-' },
      { label: this.i18n.t('leave_encashments.days'), value: data.daysEncashed?.toString() || '-' },
      { label: this.i18n.t('leave_encashments.amount_per_day'), value: data.amountPerDay?.toFixed(2) || '-' },
      { label: this.i18n.t('leave_encashments.total_amount'), value: data.totalAmount?.toFixed(2) || '-' },
      { label: this.i18n.t('common.notes'), value: data.notes || '-' },
      { label: this.i18n.t('fields.createdAt'), value: data.createdAtUtc ? this.formatDate(data.createdAtUtc) : '-' }
    ];
  });

  ngOnInit(): void { this.loadData(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
  t(key: string): string { return this.i18n.t(key); }

  private loadData(): void {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap(params => {
      const id = Number(params.get('id'));
      if (!id) { this.router.navigate(['/leave-management/leave-encashments']); throw new Error('Invalid ID'); }
      this.entityId.set(id);
      return this.service.getById(id);
    })).subscribe({
      next: (data) => { this.loading.set(false); this.item.set(data); },
      error: () => { this.loading.set(false); this.router.navigate(['/leave-management/leave-encashments']); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' }); }

  canApprove(): boolean { return this.item()?.status === 'Pending'; }
  canReject(): boolean { return this.item()?.status === 'Pending'; }

  async onApprove(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('leave_encashments.approve_confirm'), confirmText: this.t('common.approve'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-check', iconClass: 'text-success' });
    if (result.confirmed) {
      this.service.approve(this.entityId()!).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('leave_encashments.approved_successfully')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('leave_encashments.approve_error'))
      });
    }
  }

  async onReject(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('leave_encashments.reject_confirm'), confirmText: this.t('common.reject'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-danger', icon: 'fa-times', iconClass: 'text-danger' });
    if (result.confirmed) {
      this.service.reject(this.entityId()!, this.rejectionNotes()).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('leave_encashments.rejected_successfully')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('leave_encashments.reject_error'))
      });
    }
  }
}
