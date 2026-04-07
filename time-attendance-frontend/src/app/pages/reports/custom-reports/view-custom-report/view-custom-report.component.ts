import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { CustomReportService } from '../../../../core/services/custom-report.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { CustomReportDefinition, ScheduledReport } from '../../../../shared/models/custom-report.model';

@Component({
  selector: 'app-view-custom-report',
  standalone: true,
  imports: [DefinitionListComponent, StatusBadgeComponent, DataTableComponent],
  templateUrl: './view-custom-report.component.html',
  styleUrls: ['./view-custom-report.component.css']
})
export class ViewCustomReportComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(CustomReportService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  report = signal<CustomReportDefinition | null>(null);
  schedules = signal<ScheduledReport[]>([]);
  loading = signal(false);

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const r = this.report();
    if (!r) return [];
    return [
      { label: this.i18n.t('customReports.name'), value: r.name },
      { label: this.i18n.t('customReports.data_source'), value: r.dataSource },
      { label: this.i18n.t('customReports.is_public'), value: r.isPublic ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('common.created_by'), value: r.createdByUsername || '-' },
      { label: this.i18n.t('common.description'), value: r.description || '-' },
    ];
  });

  scheduleColumns = computed<TableColumn[]>(() => [
    { key: 'cronExpression', label: this.i18n.t('common.schedule') },
    { key: 'formatName', label: this.i18n.t('common.format') },
    { key: 'emailRecipients', label: this.i18n.t('common.email') },
    { key: 'isActive', label: this.i18n.t('common.active'), type: 'boolean' as any },
    { key: 'lastRunStatus', label: this.i18n.t('common.status') },
  ]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadReport(+id);
  }

  loadReport(id: number) {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (report: any) => {
        this.report.set(report);
        this.loading.set(false);
        this.loadSchedules(id);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.load_error'));
        this.loading.set(false);
      }
    });
  }

  loadSchedules(reportId: number) {
    this.service.getSchedules(reportId).subscribe({
      next: (data: any) => this.schedules.set(data.items || data || []),
      error: () => {}
    });
  }

  goBack() {
    this.router.navigate(['/reports/custom-reports']);
  }

  goToEdit() {
    this.router.navigate(['/reports/custom-reports', this.report()?.id, 'edit']);
  }
}
