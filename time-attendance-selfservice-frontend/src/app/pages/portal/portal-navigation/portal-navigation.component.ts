import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';

export interface PortalMenuItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  badge?: number;
  description?: string;
}

/**
 * Portal Navigation Component
 * Main navigation menu for the Employee Self-Service Portal
 */
@Component({
  selector: 'app-portal-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portal-navigation.component.html',
  styleUrl: './portal-navigation.component.css'
})
export class PortalNavigationComponent {
  readonly i18n = inject(I18nService);

  get menuItems(): PortalMenuItem[] {
    return [
      {
        id: 'dashboard',
        label: this.i18n.t('portal.nav.dashboard'),
        route: '/dashboard',
        icon: 'bi bi-house',
        description: this.i18n.t('portal.nav.dashboard_desc')
      },
      {
        id: 'attendance',
        label: this.i18n.t('portal.nav.my_attendance'),
        route: '/my-attendance',
        icon: 'bi bi-calendar-check',
        description: this.i18n.t('portal.nav.my_attendance_desc')
      },
      {
        id: 'profile',
        label: this.i18n.t('portal.nav.my_profile'),
        route: '/my-profile',
        icon: 'bi bi-person',
        description: this.i18n.t('portal.nav.my_profile_desc')
      },
      {
        id: 'fingerprint',
        label: this.i18n.t('portal.nav.fingerprint_requests'),
        route: '/fingerprint-requests',
        icon: 'bi bi-fingerprint',
        description: this.i18n.t('portal.nav.fingerprint_requests_desc')
      },
      {
        id: 'vacations',
        label: this.i18n.t('portal.nav.vacation_requests'),
        route: '/vacation-requests',
        icon: 'bi bi-sun',
        description: this.i18n.t('portal.nav.vacation_requests_desc')
      },
      {
        id: 'excuses',
        label: this.i18n.t('portal.nav.excuse_requests'),
        route: '/excuse-requests',
        icon: 'bi bi-clock',
        description: this.i18n.t('portal.nav.excuse_requests_desc')
      },
      {
        id: 'remote-work',
        label: this.i18n.t('portal.nav.remote_work_requests'),
        route: '/remote-work-requests',
        icon: 'bi bi-house-door',
        description: this.i18n.t('portal.nav.remote_work_requests_desc')
      },
      {
        id: 'payslips',
        label: this.i18n.t('portal.nav.my_payslips'),
        route: '/my-payslips',
        icon: 'bi bi-receipt',
        description: this.i18n.t('portal.nav.my_payslips_desc')
      },
      {
        id: 'salary',
        label: this.i18n.t('portal.nav.my_salary'),
        route: '/my-salary',
        icon: 'bi bi-wallet2',
        description: this.i18n.t('portal.nav.my_salary_desc')
      },
      {
        id: 'allowances',
        label: this.i18n.t('portal.nav.my_allowances'),
        route: '/my-allowances',
        icon: 'bi bi-cash-coin',
        description: this.i18n.t('portal.nav.my_allowances_desc')
      },
      {
        id: 'benefits',
        label: this.i18n.t('portal.nav.my_benefits'),
        route: '/my-benefits',
        icon: 'bi bi-heart-pulse',
        description: this.i18n.t('portal.nav.my_benefits_desc')
      },
      {
        id: 'assets',
        label: this.i18n.t('portal.nav.my_assets'),
        route: '/my-assets',
        icon: 'bi bi-box-seam',
        description: this.i18n.t('portal.nav.my_assets_desc')
      },
      {
        id: 'surveys',
        label: this.i18n.t('portal.nav.my_surveys'),
        route: '/my-surveys',
        icon: 'bi bi-clipboard2-check',
        description: this.i18n.t('portal.nav.my_surveys_desc')
      },
      {
        id: 'timesheets',
        label: this.i18n.t('portal.nav.my_timesheets'),
        route: '/my-timesheets',
        icon: 'bi bi-clock-history',
        description: this.i18n.t('portal.nav.my_timesheets_desc')
      },
      {
        id: 'career',
        label: this.i18n.t('portal.nav.my_career'),
        route: '/my-career',
        icon: 'bi bi-signpost-2',
        description: this.i18n.t('portal.nav.my_career_desc')
      },
      {
        id: 'resignation',
        label: this.i18n.t('portal.nav.my_resignation'),
        route: '/my-resignation',
        icon: 'bi bi-box-arrow-right',
        description: this.i18n.t('portal.nav.my_resignation_desc')
      }
    ];
  }
}
