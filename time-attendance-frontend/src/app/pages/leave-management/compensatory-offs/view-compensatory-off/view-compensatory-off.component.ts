import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { CompensatoryOffService } from '../../../../core/services/compensatory-off.service';
import { CompensatoryOff } from '../../../../shared/models/compensatory-off.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-view-compensatory-off',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent],
  templateUrl: './view-compensatory-off.component.html',
  styleUrls: ['./view-compensatory-off.component.css']
})
export class ViewCompensatoryOffComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(CompensatoryOffService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);

  loading = signal(false);
  item = signal<CompensatoryOff | null>(null);
  entityId = signal<number | null>(null);

  statusBadge = computed(() => {
    const data = this.item();
    if (!data) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Available: 'success', Used: 'info', Expired: 'secondary', Cancelled: 'danger' };
    return { label: this.i18n.t('compensatory_offs.status_' + data.status.toLowerCase()), variant: map[data.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const data = this.item();
    if (!data) return [];
    return [
      { label: this.i18n.t('common.employee'), value: data.employeeName },
      { label: this.i18n.t('common.employee_number'), value: data.employeeNumber || '-' },
      { label: this.i18n.t('common.branch'), value: data.branchName || '-' },
      { label: this.i18n.t('common.department'), value: data.departmentName || '-' },
      { label: this.i18n.t('compensatory_offs.earned_date'), value: this.formatDate(data.earnedDate) },
      { label: this.i18n.t('compensatory_offs.expiry_date'), value: this.formatDate(data.expiryDate) },
      { label: this.i18n.t('compensatory_offs.hours_worked'), value: data.hoursWorked != null ? data.hoursWorked.toString() : '-' },
      { label: this.i18n.t('fields.reason'), value: data.reason || '-' },
      { label: this.i18n.t('fields.reason_ar'), value: data.reasonAr || '-' },
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
      if (!id) { this.router.navigate(['/leave-management/compensatory-offs']); throw new Error('Invalid ID'); }
      this.entityId.set(id);
      return this.service.getById(id);
    })).subscribe({
      next: (data) => { this.loading.set(false); this.item.set(data); },
      error: () => { this.loading.set(false); this.router.navigate(['/leave-management/compensatory-offs']); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' }); }

  canCancel(): boolean { return this.item()?.status === 'Available'; }

  async onCancel(): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('compensatory_offs.cancel_confirm'),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-ban',
      iconClass: 'text-danger'
    });
    if (result.confirmed) {
      this.service.cancel(this.entityId()!).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('compensatory_offs.cancelled_successfully')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('compensatory_offs.cancel_error'))
      });
    }
  }
}
