import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../../core/services/succession.service';
import { CareerPath } from '../../../../shared/models/succession.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-career-path',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, LoadingSpinnerComponent, AuditHistoryComponent],
  templateUrl: './view-career-path.component.html',
  styleUrls: ['./view-career-path.component.css']
})
export class ViewCareerPathComponent implements OnInit {
  i18n = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);
  private service = inject(SuccessionService);

  loading = signal(true);
  item = signal<CareerPath | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const d = this.item();
    if (!d) return { label: '', variant: 'secondary' as StatusVariant };
    return d.isActive
      ? { label: this.i18n.t('common.active'), variant: 'success' as StatusVariant }
      : { label: this.i18n.t('common.inactive'), variant: 'secondary' as StatusVariant };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('succession.career_paths.name'), value: d.name },
      { label: this.i18n.t('succession.career_paths.name_ar'), value: d.nameAr || '-' },
      { label: this.i18n.t('succession.career_paths.description'), value: d.description || '-' },
      { label: this.i18n.t('succession.career_paths.steps'), value: String(d.steps?.length || 0) }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const d = this.item();
    if (!d) return [];
    return [
      { label: this.i18n.t('common.edit'), icon: 'fas fa-edit', action: () => this.router.navigate(['/succession/career-paths', d.id, 'edit']), type: 'outline-primary' },
      { label: this.i18n.t('common.delete'), icon: 'fas fa-trash', action: () => this.delete(), type: 'danger' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/succession/career-paths']); return; }
    this.service.getCareerPath(+id).subscribe({
      next: (d) => { this.item.set(d); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('succession.career_paths.load_error')); this.loading.set(false); }
    });
  }

  async delete(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('succession.career_paths.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteCareerPath(this.item()!.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('succession.career_paths.deleted_success')); this.router.navigate(['/succession/career-paths']); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.career_paths.delete_error'))
    });
  }
}
