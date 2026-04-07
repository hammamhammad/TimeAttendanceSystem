import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { DocumentService } from '../../../../core/services/document.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-template',
  standalone: true,
  imports: [FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-template.component.html',
  styleUrl: './view-template.component.css'
})
export class ViewTemplateComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly service = inject(DocumentService);

  loading = signal(false);
  template = signal<any>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const t = this.template();
    if (!t) return { label: '', variant: 'secondary' as StatusVariant };
    return {
      label: t.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: (t.isActive ? 'success' : 'secondary') as StatusVariant
    };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const t = this.template();
    if (!t) return [];
    return [
      { label: this.i18n.t('letter_templates.name'), value: t.name },
      { label: this.i18n.t('letter_templates.name_ar'), value: t.nameAr ?? '-' },
      { label: this.i18n.t('letter_templates.category'), value: t.letterType ?? t.category ?? '-' },
      { label: this.i18n.t('common.description'), value: t.description ?? '-' },
      { label: this.i18n.t('letter_templates.is_default'), value: t.isDefault ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('letter_templates.branch'), value: t.branchName ?? this.i18n.t('letter_templates.all_branches') },
      { label: this.i18n.t('letter_templates.footer_text'), value: t.footerText ?? '-' },
      { label: this.i18n.t('letter_templates.footer_text_ar'), value: t.footerTextAr ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/documents/letter-templates']); return; }
    this.loading.set(true);
    this.service.getLetterTemplate(+id).subscribe({
      next: (t) => { this.template.set(t); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
