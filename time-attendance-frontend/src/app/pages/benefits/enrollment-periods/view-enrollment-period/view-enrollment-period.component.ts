import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { OpenEnrollmentPeriod } from '../../../../shared/models/benefit.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-enrollment-period',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-enrollment-period.component.html',
  styleUrls: ['./view-enrollment-period.component.css']
})
export class ViewEnrollmentPeriodComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private benefitService = inject(BenefitService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  period = signal<OpenEnrollmentPeriod | null>(null);
  entityId = signal<number | null>(null);

  statusBadge = computed(() => {
    const item = this.period();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Upcoming: 'info', Open: 'success', Closed: 'secondary', Cancelled: 'danger' };
    return { label: this.i18n.t('benefits.periods.status_' + item.status.toLowerCase()), variant: map[item.status] || 'secondary' };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const item = this.period();
    if (!item) return [];
    return [
      { label: this.i18n.t('common.name'), value: item.name },
      { label: this.i18n.t('common.name_ar'), value: item.nameAr || '-' },
      { label: this.i18n.t('benefits.periods.plan_year'), value: item.planYear?.toString() || '-' },
      { label: this.i18n.t('common.branch'), value: item.branchName || this.i18n.t('common.all') },
      { label: this.i18n.t('benefits.periods.start_date'), value: this.formatDate(item.startDate) },
      { label: this.i18n.t('benefits.periods.end_date'), value: this.formatDate(item.endDate) },
      { label: this.i18n.t('benefits.periods.allow_life_events'), value: item.allowLifeEventChanges ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('common.notes'), value: item.notes || '-' },
      { label: this.i18n.t('fields.createdBy'), value: item.createdBy || '-' },
      { label: this.i18n.t('fields.createdAt'), value: item.createdAtUtc ? this.formatDate(item.createdAtUtc) : '-' }
    ];
  });

  ngOnInit(): void { this.loadData(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
  t(key: string): string { return this.i18n.t(key); }

  private loadData(): void {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap(params => {
      const id = Number(params.get('id'));
      if (!id) { this.router.navigate(['/benefits/enrollment-periods']); throw new Error('Invalid ID'); }
      this.entityId.set(id);
      return this.benefitService.getOpenEnrollmentPeriod(id);
    })).subscribe({
      next: (data) => { this.loading.set(false); this.period.set(data); },
      error: () => { this.loading.set(false); this.router.navigate(['/benefits/enrollment-periods']); }
    });
  }

  formatDate(d: string): string {
    if (!d) return '-';
    return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' });
  }

  canOpen(): boolean { return this.period()?.status === 'Upcoming' && this.permissionService.has('openEnrollmentPeriod.update'); }
  canClose(): boolean { return this.period()?.status === 'Open' && this.permissionService.has('openEnrollmentPeriod.update'); }
  canEdit(): boolean { return this.period()?.status !== 'Closed' && this.permissionService.has('openEnrollmentPeriod.update'); }

  async onOpen(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.periods.open_confirm'), confirmText: this.t('benefits.periods.open_action'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-door-open', iconClass: 'text-success' });
    if (result.confirmed) { this.benefitService.openEnrollmentPeriod(this.entityId()!).subscribe({ next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.opened_success')); this.loadData(); }, error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.open_error')) }); }
  }

  async onClose(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.periods.close_confirm'), confirmText: this.t('benefits.periods.close_action'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-warning', icon: 'fa-door-closed', iconClass: 'text-warning' });
    if (result.confirmed) { this.benefitService.closeEnrollmentPeriod(this.entityId()!).subscribe({ next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.closed_success')); this.loadData(); }, error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.close_error')) }); }
  }

  onEdit(): void { this.router.navigate(['/benefits/enrollment-periods', this.entityId(), 'edit']); }
}
