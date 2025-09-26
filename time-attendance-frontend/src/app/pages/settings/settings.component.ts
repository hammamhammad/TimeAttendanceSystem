import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { AuthService } from '../../core/auth/auth.service';
import { PermissionService } from '../../core/auth/permission.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="mb-1">{{ t('settings.title') }}</h2>
          <p class="text-muted mb-0">{{ t('settings.subtitle') }}</p>
        </div>
      </div>

      <div class="row">
        <!-- System Settings Section -->
        <div class="col-12 mb-4">
          <h4 class="text-primary mb-3">
            <i class="bi bi-gear me-2"></i>
            {{ t('settings.systemSettings') }}
          </h4>
          <div class="row">

            <!-- Other system settings can be added here -->
            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-light rounded-3 p-2 me-3">
                      <i class="bi bi-shield-lock text-primary" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.security') }}</h6>
                      <small class="text-muted">{{ t('settings.securitySettings') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.securityDescription') }}</p>
                  <div class="mt-auto">
                    <button class="btn btn-outline-secondary btn-sm w-100" disabled>
                      <i class="bi bi-tools me-1"></i>
                      {{ t('settings.comingSoon') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-info bg-gradient rounded-3 p-2 me-3">
                      <i class="bi bi-envelope text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.notifications') }}</h6>
                      <small class="text-muted">{{ t('settings.notificationSettings') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.notificationDescription') }}</p>
                  <div class="mt-auto">
                    <button class="btn btn-outline-info btn-sm w-100" disabled>
                      <i class="bi bi-tools me-1"></i>
                      {{ t('settings.comingSoon') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="card h-100 border-hover">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-warning bg-gradient rounded-3 p-2 me-3">
                      <i class="fa-solid fa-clock text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div>
                      <h6 class="mb-0">{{ t('settings.overtime.title') }}</h6>
                      <small class="text-muted">{{ t('settings.overtime.subtitle') }}</small>
                    </div>
                  </div>
                  <p class="text-muted flex-grow-1">{{ t('settings.overtime.subtitle') }}</p>
                  <div class="mt-auto">
                    <a routerLink="/settings/overtime" class="btn btn-outline-warning btn-sm w-100">
                      <i class="fa-solid fa-cog me-1"></i>
                      {{ t('settings.configure') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            @if (hasPermission('publicHoliday.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-success bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-calendar-check text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('settings.holidays.title') }}</h6>
                        <small class="text-muted">{{ t('settings.holidays.subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('settings.holidays.description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/settings/public-holidays" class="btn btn-outline-success btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (hasPermission('vacationType.read')) {
              <div class="col-lg-4 col-md-6 mb-3">
                <div class="card h-100 border-hover">
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="bg-primary bg-gradient rounded-3 p-2 me-3">
                        <i class="fa-solid fa-calendar-alt text-white" style="font-size: 1.5rem;"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">{{ t('vacation_types.title') }}</h6>
                        <small class="text-muted">{{ t('vacation_types.management_subtitle') }}</small>
                      </div>
                    </div>
                    <p class="text-muted flex-grow-1">{{ t('vacation_types.settings_description') }}</p>
                    <div class="mt-auto">
                      <a routerLink="/vacation-types" class="btn btn-outline-primary btn-sm w-100">
                        <i class="fa-solid fa-cog me-1"></i>
                        {{ t('settings.configure') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            }</div>
          </div>
        </div>

        <!-- User Preferences Section -->
        <div class="col-12 mb-4">
          <h4 class="text-primary mb-3">
            <i class="bi bi-person-gear me-2"></i>
            {{ t('settings.userPreferences') }}
          </h4>
          <div class="row">
            <!-- Language Settings -->
            <div class="col-lg-6 mb-3">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">
                    <i class="bi bi-translate me-2"></i>
                    {{ t('settings.language') }}
                  </h6>
                </div>
                <div class="card-body">
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="language"
                      id="langEn"
                      [checked]="i18n.getCurrentLocale() === 'en'"
                      (change)="onLanguageChange('en')">
                    <label class="form-check-label" for="langEn">
                      <i class="bi bi-flag me-2"></i>
                      English
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="language"
                      id="langAr"
                      [checked]="i18n.getCurrentLocale() === 'ar'"
                      (change)="onLanguageChange('ar')">
                    <label class="form-check-label" for="langAr">
                      <i class="bi bi-flag me-2"></i>
                      العربية
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Information -->
            <div class="col-lg-6 mb-3">
              <div class="card">
                <div class="card-header">
                  <h6 class="mb-0">
                    <i class="bi bi-person-circle me-2"></i>
                    {{ t('settings.profile') }}
                  </h6>
                </div>
                <div class="card-body">
                  <div class="mb-2">
                    <strong>{{ t('users.username') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.username }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>{{ t('users.email') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.email }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>{{ t('users.role') }}:</strong>
                    <span class="text-muted">{{ currentUser()?.roles?.join(', ') }}</span>
                  </div>
                  <div class="mb-0">
                    <strong>{{ t('users.status') }}:</strong>
                    <span class="badge bg-success ms-1">
                      {{ currentUser()?.isActive ? t('common.active') : t('common.inactive') }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  `,
  styles: [`
    .border-hover {
      transition: all 0.2s ease-in-out;
    }

    .border-hover:hover {
      border-color: var(--bs-primary) !important;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      transform: translateY(-1px);
    }

    .card-body {
      transition: all 0.2s ease-in-out;
    }

    .bg-gradient {
      background: linear-gradient(135deg, var(--bs-primary) 0%, rgba(var(--bs-primary-rgb), 0.8) 100%);
    }

    .text-primary {
      color: var(--bs-primary) !important;
    }
  `]
})
export class SettingsComponent {
  currentUser = computed(() => this.authService.currentUser());

  constructor(
    public i18n: I18nService,
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  t(key: string): string {
    return this.i18n.t(key);
  }

  hasPermission(permission: string): boolean {
    return this.permissionService.has(permission);
  }

  onLanguageChange(locale: Locale): void {
    this.i18n.setLocale(locale);
  }
}