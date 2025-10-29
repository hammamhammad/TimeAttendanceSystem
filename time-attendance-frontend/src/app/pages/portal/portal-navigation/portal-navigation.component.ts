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
      route: '/portal/employee-dashboard',
      icon: 'fa-solid fa-home',
      description: 'View your dashboard and quick stats'
    },
    {
      id: 'attendance',
      label: 'My Attendance',
      route: '/portal/my-attendance',
      icon: 'fa-solid fa-calendar-check',
      description: 'View your attendance history'
    },
    {
      id: 'profile',
      label: 'My Profile',
      route: '/portal/my-profile',
      icon: 'fa-solid fa-user',
      description: 'Manage your profile information'
    },
    {
      id: 'fingerprint',
      label: 'Fingerprint Requests',
      route: '/portal/fingerprint-requests',
      icon: 'fa-solid fa-fingerprint',
      description: 'Manage fingerprint enrollment'
    },
    {
      id: 'vacations',
      label: 'Vacation Requests',
      route: '/portal/vacation-requests',
      icon: 'fa-solid fa-umbrella-beach',
      description: 'Request and manage vacations'
    },
    {
      id: 'excuses',
      label: 'Excuse Requests',
      route: '/portal/excuse-requests',
      icon: 'fa-solid fa-clock',
      description: 'Request time excuses'
    },
    {
      id: 'remote-work',
      label: 'Remote Work Requests',
      route: '/portal/remote-work-requests',
      icon: 'fa-solid fa-home',
      description: 'Request remote work'
    }
  ];
}
