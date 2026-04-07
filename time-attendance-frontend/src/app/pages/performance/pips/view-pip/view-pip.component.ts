import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PerformanceService } from '../../../../core/services/performance.service';
import { PerformanceImprovementPlan } from '../../../../shared/models/performance.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-pip',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-pip.component.html',
  styleUrls: ['./view-pip.component.css']
})
export class ViewPipComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private service = inject(PerformanceService);

  loading = signal(true);
  item = signal<PerformanceImprovementPlan | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      'Draft': { label: this.i18n.t('common.draft'), variant: 'secondary' },
      'Active': { label: this.i18n.t('common.active'), variant: 'warning' },
      'Extended': { label: this.i18n.t('pips.status_extended'), variant: 'info' },
      'Completed': { label: this.i18n.t('pips.status_completed'), variant: 'success' },
      'Failed': { label: this.i18n.t('pips.status_failed'), variant: 'danger' },
      'Cancelled': { label: this.i18n.t('common.cancelled'), variant: 'dark' }
    };
    return map[d.status] ?? { label: d.status, variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('fields.employee'), value: d.employeeName || '-' },
      { label: this.i18n.t('pips.manager'), value: d.managerName || '-' },
      { label: this.i18n.t('fields.department'), value: d.departmentName || '-' },
      { label: this.i18n.t('fields.start_date'), value: d.startDate },
      { label: this.i18n.t('fields.end_date'), value: d.endDate },
      { label: this.i18n.t('pips.extended_end_date'), value: d.extendedEndDate || '-' },
      { label: this.i18n.t('pips.outcome'), value: d.outcome || '-' }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d || d.status !== 'Active') return [];
    return [
      { label: this.i18n.t('pips.complete'), icon: 'fas fa-check', action: () => this.complete(), type: 'success' },
      { label: this.i18n.t('pips.extend'), icon: 'fas fa-calendar-plus', action: () => this.extend(), type: 'warning' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/performance/pips']); return; }
    this.service.getPip(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('pips.load_error')); this.loading.set(false); }
    });
  }

  complete(): void { this.service.completePipSuccessful(this.item()!.id, { outcomeNotes: 'Completed successfully' }).subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('pips.completed_success')); } }); }
  extend(): void {
    const newEnd = new Date(this.item()!.endDate);
    newEnd.setMonth(newEnd.getMonth() + 1);
    this.service.extendPip(this.item()!.id, { newEndDate: newEnd.toISOString().split('T')[0] }).subscribe({ next: (u) => { this.item.set(u); this.notification.success(this.i18n.t('pips.extended_success')); } });
  }
}
