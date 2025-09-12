import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="mb-4">{{ t('settings.title') }}</h2>
    
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">{{ t('settings.language') }}</h5>
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
                العربية
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">{{ t('settings.profile') }}</h5>
          </div>
          <div class="card-body">
            <p><strong>{{ t('users.username') }}:</strong> {{ currentUser()?.username }}</p>
            <p><strong>{{ t('users.email') }}:</strong> {{ currentUser()?.email }}</p>
            <p><strong>{{ t('users.role') }}:</strong> {{ currentUser()?.roles?.join(', ') }}</p>
            <p><strong>{{ t('users.status') }}:</strong> 
              <span class="badge bg-success">{{ currentUser()?.isActive ? 'Active' : 'Inactive' }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  currentUser = computed(() => this.authService.currentUser());

  constructor(
    public i18n: I18nService,
    private authService: AuthService
  ) {}

  t(key: string): string {
    return this.i18n.t(key);
  }

  onLanguageChange(locale: Locale): void {
    this.i18n.setLocale(locale);
  }
}