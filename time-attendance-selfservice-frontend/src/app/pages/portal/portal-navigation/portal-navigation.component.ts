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

  readonly menuItems: PortalMenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'bi bi-house',
      description: 'View your dashboard and quick stats'
    },
    {
      id: 'attendance',
      label: 'My Attendance',
      route: '/my-attendance',
      icon: 'bi bi-calendar-check',
      description: 'View your attendance history'
    },
    {
      id: 'profile',
      label: 'My Profile',
      route: '/my-profile',
      icon: 'bi bi-person',
      description: 'Manage your profile information'
    },
    {
      id: 'fingerprint',
      label: 'Fingerprint Requests',
      route: '/fingerprint-requests',
      icon: 'bi bi-fingerprint',
      description: 'Manage fingerprint enrollment'
    },
    {
      id: 'vacations',
      label: 'Vacation Requests',
      route: '/vacation-requests',
      icon: 'bi bi-sun',
      description: 'Request and manage vacations'
    },
    {
      id: 'excuses',
      label: 'Excuse Requests',
      route: '/excuse-requests',
      icon: 'bi bi-clock',
      description: 'Request time excuses'
    },
    {
      id: 'remote-work',
      label: 'Remote Work Requests',
      route: '/remote-work-requests',
      icon: 'bi bi-house-door',
      description: 'Request remote work'
    }
  ];
}
