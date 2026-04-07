import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

interface SurveyQuestionDto {
  id: number;
  questionText: string;
  questionTextAr?: string;
  questionType: string;
  isRequired: boolean;
  sortOrder: number;
  options?: string[];
  optionsAr?: string[];
}

interface SurveyFormDto {
  distributionId: number;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  surveyType: string;
  isAnonymous: boolean;
  questions: SurveyQuestionDto[];
}

interface AnswerState {
  questionId: number;
  ratingValue?: number;
  textValue?: string;
  selectedOptions: string[];
  npsValue?: number;
  yesNoValue?: boolean;
}

@Component({
  selector: 'app-survey-respond',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './survey-respond.component.html',
  styleUrl: './survey-respond.component.css'
})
export class SurveyRespondComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  loading = signal(false);
  submitting = signal(false);
  surveyForm = signal<SurveyFormDto | null>(null);
  answers = signal<AnswerState[]>([]);
  error = signal<string | null>(null);
  token = signal('');

  npsValues = Array.from({ length: 11 }, (_, i) => i);

  surveyTitle = computed(() => {
    const form = this.surveyForm();
    if (!form) return '';
    return this.i18n.locale() === 'ar' && form.titleAr ? form.titleAr : form.title;
  });

  surveyDescription = computed(() => {
    const form = this.surveyForm();
    if (!form) return '';
    return this.i18n.locale() === 'ar' && form.descriptionAr ? form.descriptionAr : (form.description ?? '');
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.token.set(token);
    if (!id || !token) { this.router.navigate(['/my-surveys']); return; }
    this.loadSurvey(+id, token);
  }

  loadSurvey(distributionId: number, token: string): void {
    this.loading.set(true);
    this.http.get<SurveyFormDto>(`${this.baseUrl}/portal/my-surveys/${distributionId}/form`, { params: { token } }).subscribe({
      next: (form) => {
        this.surveyForm.set(form);
        this.answers.set(form.questions.map(q => ({
          questionId: q.id,
          ratingValue: undefined,
          textValue: '',
          selectedOptions: [],
          npsValue: undefined,
          yesNoValue: undefined
        })));
        this.loading.set(false);
      },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  getQuestionText(q: SurveyQuestionDto): string {
    return this.i18n.locale() === 'ar' && q.questionTextAr ? q.questionTextAr : q.questionText;
  }

  getOptionText(q: SurveyQuestionDto, index: number): string {
    if (this.i18n.locale() === 'ar' && q.optionsAr?.length && q.optionsAr[index]) {
      return q.optionsAr[index];
    }
    return q.options?.[index] ?? '';
  }

  setRating(qIndex: number, value: number): void {
    const current = this.answers();
    current[qIndex] = { ...current[qIndex], ratingValue: value };
    this.answers.set([...current]);
  }

  setNps(qIndex: number, value: number): void {
    const current = this.answers();
    current[qIndex] = { ...current[qIndex], npsValue: value };
    this.answers.set([...current]);
  }

  setYesNo(qIndex: number, value: boolean): void {
    const current = this.answers();
    current[qIndex] = { ...current[qIndex], yesNoValue: value };
    this.answers.set([...current]);
  }

  setText(qIndex: number, value: string): void {
    const current = this.answers();
    current[qIndex] = { ...current[qIndex], textValue: value };
    this.answers.set([...current]);
  }

  setRadio(qIndex: number, optionValue: string): void {
    const current = this.answers();
    current[qIndex] = { ...current[qIndex], selectedOptions: [optionValue] };
    this.answers.set([...current]);
  }

  toggleCheckbox(qIndex: number, optionValue: string): void {
    const current = this.answers();
    const selected = current[qIndex].selectedOptions;
    if (selected.includes(optionValue)) {
      current[qIndex] = { ...current[qIndex], selectedOptions: selected.filter(o => o !== optionValue) };
    } else {
      current[qIndex] = { ...current[qIndex], selectedOptions: [...selected, optionValue] };
    }
    this.answers.set([...current]);
  }

  isChecked(qIndex: number, optionValue: string): boolean {
    return this.answers()[qIndex]?.selectedOptions.includes(optionValue) ?? false;
  }

  getRatingStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  async onSubmit(): Promise<void> {
    const form = this.surveyForm();
    if (!form) return;

    // Validate required questions
    for (let i = 0; i < form.questions.length; i++) {
      const q = form.questions[i];
      const a = this.answers()[i];
      if (q.isRequired) {
        let answered = false;
        switch (q.questionType) {
          case 'Rating': answered = a.ratingValue !== undefined; break;
          case 'MultipleChoice': answered = a.selectedOptions.length > 0; break;
          case 'MultiSelect': answered = a.selectedOptions.length > 0; break;
          case 'OpenText': answered = !!a.textValue?.trim(); break;
          case 'NPS': answered = a.npsValue !== undefined; break;
          case 'YesNo': answered = a.yesNoValue !== undefined; break;
        }
        if (!answered) {
          this.notification.warning(this.i18n.t('portal.surveys.answer_required', { number: i + 1 }));
          return;
        }
      }
    }

    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.surveys.submit_survey'),
      message: this.i18n.t('portal.surveys.confirm_submit'),
      confirmText: this.i18n.t('common.submit'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary'
    });
    if (!result.confirmed) return;

    this.submitting.set(true);
    const payload = {
      token: this.token(),
      answers: this.answers().map(a => ({
        questionId: a.questionId,
        ratingValue: a.ratingValue,
        textValue: a.textValue || undefined,
        selectedOptions: a.selectedOptions.length > 0 ? a.selectedOptions : undefined,
        npsValue: a.npsValue,
        yesNoValue: a.yesNoValue
      }))
    };

    this.http.post(`${this.baseUrl}/survey-responses`, payload).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.surveys.submitted'));
        this.router.navigate(['/my-surveys']);
        this.submitting.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.submitting.set(false);
      }
    });
  }
}
