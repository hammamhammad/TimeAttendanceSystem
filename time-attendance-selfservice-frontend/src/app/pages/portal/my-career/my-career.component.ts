import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';

interface TalentSkill {
  id: number;
  skillName: string;
  skillNameAr?: string;
  proficiencyLevel: string;
  yearsOfExperience?: number;
  isVerified: boolean;
  verifiedDate?: string;
}

interface MyTalentProfile {
  id: number;
  employeeId: number;
  performanceRating?: string;
  potentialRating: string;
  nineBoxPosition: string;
  readinessLevel: string;
  retentionRisk: string;
  careerAspiration?: string;
  careerAspirationAr?: string;
  strengthsSummary?: string;
  developmentAreas?: string;
  lastAssessmentDate?: string;
  isHighPotential: boolean;
  skills: TalentSkill[];
}

interface CareerPathStep {
  id: number;
  jobTitle: string;
  jobTitleAr?: string;
  fromJobGradeId?: number;
  fromJobGradeName?: string;
  toJobGradeId: number;
  toJobGradeName?: string;
  toJobGradeNameAr?: string;
  typicalDurationMonths?: number;
  requiredCompetencies?: string;
  stepOrder: number;
}

interface MyCareerPath {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  steps: CareerPathStep[];
}

interface SkillGap {
  skillName: string;
  skillNameAr?: string;
  currentLevel: string;
  yearsOfExperience?: number;
}

interface SuccessionCandidacy {
  id: number;
  successionPlanName: string;
  successionPlanNameAr?: string;
  keyPositionTitle: string;
  keyPositionTitleAr?: string;
  readinessLevel: string;
  readinessTimeline: string;
  priority: number;
  developmentPlan?: string;
  developmentPlanAr?: string;
  gapAnalysis?: string;
}

interface DevelopmentSuggestions {
  hasProfile: boolean;
  developmentAreas?: string;
  strengthsSummary?: string;
  readinessLevel?: string;
  retentionRisk?: string;
  skillGaps?: SkillGap[];
  successionCandidacies?: SuccessionCandidacy[];
}

@Component({
  selector: 'app-my-career',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, EmptyStateComponent, StatusBadgeComponent, DefinitionListComponent, SectionCardComponent],
  templateUrl: './my-career.component.html',
  styleUrl: './my-career.component.css'
})
export class MyCareerComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  loading = signal(true);
  hasProfile = signal(false);
  profile = signal<MyTalentProfile | null>(null);
  careerPaths = signal<MyCareerPath[]>([]);
  suggestions = signal<DevelopmentSuggestions | null>(null);
  activeTab = signal<'profile' | 'paths' | 'development'>('profile');

  profileItems = computed<DefinitionItem[]>(() => {
    const p = this.profile();
    if (!p) return [];
    return [
      { label: this.i18n.t('portal.my_career.performance_rating'), value: p.performanceRating ? this.i18n.t('portal.my_career.enum.' + p.performanceRating) : '-' },
      { label: this.i18n.t('portal.my_career.potential_rating'), value: this.i18n.t('portal.my_career.enum.' + p.potentialRating) },
      { label: this.i18n.t('portal.my_career.nine_box'), value: this.i18n.t('portal.my_career.enum.' + p.nineBoxPosition) },
      { label: this.i18n.t('portal.my_career.readiness'), value: this.i18n.t('portal.my_career.enum.' + p.readinessLevel) },
      { label: this.i18n.t('portal.my_career.retention_risk'), value: this.i18n.t('portal.my_career.enum.' + p.retentionRisk) },
      { label: this.i18n.t('portal.my_career.high_potential'), value: p.isHighPotential ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('portal.my_career.last_assessment'), value: p.lastAssessmentDate?.split('T')[0] || '-' },
      { label: this.i18n.t('portal.my_career.career_aspiration'), value: (this.i18n.locale() === 'ar' && p.careerAspirationAr ? p.careerAspirationAr : p.careerAspiration) || '-' }
    ];
  });

  developmentItems = computed<DefinitionItem[]>(() => {
    const p = this.profile();
    if (!p) return [];
    return [
      { label: this.i18n.t('portal.my_career.strengths'), value: p.strengthsSummary || '-' },
      { label: this.i18n.t('portal.my_career.development_areas'), value: p.developmentAreas || '-' }
    ];
  });

  ngOnInit(): void {
    this.loadAll();
  }

  setTab(tab: 'profile' | 'paths' | 'development'): void {
    this.activeTab.set(tab);
  }

  loadAll(): void {
    this.loading.set(true);

    // Load talent profile
    this.http.get<any>(`${this.baseUrl}/portal/my-career/talent-profile`).subscribe({
      next: (res) => {
        this.hasProfile.set(res.hasProfile);
        if (res.hasProfile && res.profile) {
          this.profile.set(res.profile);
        }
        this.loading.set(false);
      },
      error: () => { this.loading.set(false); }
    });

    // Load career paths
    this.http.get<MyCareerPath[]>(`${this.baseUrl}/portal/my-career/career-paths`).subscribe({
      next: (res) => this.careerPaths.set(res || []),
      error: () => {}
    });

    // Load development suggestions
    this.http.get<DevelopmentSuggestions>(`${this.baseUrl}/portal/my-career/development-suggestions`).subscribe({
      next: (res) => this.suggestions.set(res),
      error: () => {}
    });
  }

  getReadinessBadge(level: string): { label: string; variant: StatusVariant } {
    const map: Record<string, StatusVariant> = { 'NotReady': 'danger', 'DevelopmentNeeded': 'warning', 'ReadyWithDevelopment': 'info', 'ReadyNow': 'success' };
    return { label: this.i18n.t('portal.my_career.enum.' + level), variant: map[level] || 'secondary' };
  }

  getProficiencyColor(level: string): string {
    const map: Record<string, string> = { 'Beginner': 'secondary', 'Intermediate': 'info', 'Advanced': 'primary', 'Expert': 'success' };
    return map[level] || 'secondary';
  }
}
