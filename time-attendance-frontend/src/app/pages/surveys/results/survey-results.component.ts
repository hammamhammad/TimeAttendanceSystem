import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyResultsDto, SurveyQuestionResultDto } from '../../../shared/models/survey.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-survey-results',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, SectionCardComponent, AuditHistoryComponent],
  templateUrl: './survey-results.component.html',
  styleUrl: './survey-results.component.css'
})
export class SurveyResultsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  exporting = signal(false);
  results = signal<SurveyResultsDto | null>(null);
  error = signal<string | null>(null);
  distributionId = signal<number>(0);

  enpsLabel = computed(() => {
    const r = this.results();
    if (!r || r.enpsScore === undefined || r.enpsScore === null) return '';
    const score = r.enpsScore;
    if (score >= 50) return this.i18n.t('surveys.enps_excellent');
    if (score >= 10) return this.i18n.t('surveys.enps_good');
    if (score >= 0) return this.i18n.t('surveys.enps_ok');
    return this.i18n.t('surveys.enps_needs_improvement');
  });

  enpsColor = computed(() => {
    const r = this.results();
    if (!r || r.enpsScore === undefined || r.enpsScore === null) return 'secondary';
    const score = r.enpsScore;
    if (score >= 50) return 'success';
    if (score >= 10) return 'primary';
    if (score >= 0) return 'warning';
    return 'danger';
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/surveys/distributions']); return; }
    this.distributionId.set(+id);
    this.loadResults(+id);
  }

  loadResults(id: number): void {
    this.loading.set(true);
    this.service.getResults(id).subscribe({
      next: (r) => { this.results.set(r); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  exportResults(): void {
    this.exporting.set(true);
    this.service.getResultsExport(this.distributionId()).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `survey-results-${this.distributionId()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.exporting.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.exporting.set(false); }
    });
  }

  getMaxOptionCount(q: SurveyQuestionResultDto): number {
    if (!q.optionCounts?.length) return 1;
    return Math.max(...q.optionCounts.map(o => o.count), 1);
  }

  getOptionPercentage(count: number, total: number): number {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }

  getRatingStars(avg: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  getQuestionIcon(type: string): string {
    const map: Record<string, string> = { Rating: 'fas fa-star', MultipleChoice: 'fas fa-list-ul', MultiSelect: 'fas fa-check-double', OpenText: 'fas fa-align-left', NPS: 'fas fa-gauge-high', YesNo: 'fas fa-toggle-on' };
    return map[type] ?? 'fas fa-question';
  }
}
