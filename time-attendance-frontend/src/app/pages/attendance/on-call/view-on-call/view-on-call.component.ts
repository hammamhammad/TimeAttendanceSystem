import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { OnCallScheduleService } from '../../../../core/services/on-call-schedule.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { OnCallSchedule } from '../../../../shared/models/on-call-schedule.model';

@Component({
  selector: 'app-view-on-call',
  standalone: true,
  imports: [DefinitionListComponent, StatusBadgeComponent],
  templateUrl: './view-on-call.component.html',
  styleUrls: ['./view-on-call.component.css']
})
export class ViewOnCallComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(OnCallScheduleService);
  private notification = inject(NotificationService);
  public i18n = inject(I18nService);

  schedule = signal<OnCallSchedule | null>(null);
  loading = signal(false);

  statusBadge = computed(() => ({
    label: this.schedule()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
    variant: (this.schedule()?.isActive ? 'success' : 'secondary') as any
  }));

  infoItems = computed<DefinitionItem[]>(() => {
    const s = this.schedule();
    if (!s) return [];
    return [
      { label: this.i18n.t('onCall.employee'), value: s.employeeName },
      { label: this.i18n.t('onCall.on_call_type'), value: s.onCallTypeName || s.onCallType },
      { label: this.i18n.t('onCall.start_date'), value: s.startDate ? new Date(s.startDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('onCall.end_date'), value: s.endDate ? new Date(s.endDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('onCall.shift'), value: s.shiftName || '-' },
      { label: this.i18n.t('onCall.notes'), value: s.notes || '-' },
    ];
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadSchedule(+id);
  }

  loadSchedule(id: number) {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (data: any) => {
        this.schedule.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.load_error'));
        this.loading.set(false);
      }
    });
  }

  goBack() { this.router.navigate(['/attendance/on-call']); }
  goToEdit() { this.router.navigate(['/attendance/on-call', this.schedule()?.id, 'edit']); }
}
