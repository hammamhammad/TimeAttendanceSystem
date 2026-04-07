import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { OnboardingService } from '../../../core/services/onboarding.service';
import { OnboardingDashboardStats } from '../../../shared/models/onboarding.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-onboarding-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, SectionCardComponent, LoadingSpinnerComponent],
  templateUrl: './onboarding-dashboard.component.html',
  styleUrls: ['./onboarding-dashboard.component.css']
})
export class OnboardingDashboardComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(OnboardingService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  loading = signal(true);
  stats = signal<OnboardingDashboardStats | null>(null);

  ngOnInit(): void {
    this.service.getDashboardStats().subscribe({
      next: (s) => { this.stats.set(s); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('onboarding_processes.load_error')); this.loading.set(false); }
    });
  }

  navigateToProcesses(): void { this.router.navigate(['/onboarding/processes']); }
}
