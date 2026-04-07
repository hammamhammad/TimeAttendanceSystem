import { Component, Input, inject, computed } from '@angular/core';
import { EntitlementService } from '../../../core/services/entitlement.service';
import { I18nService } from '../../../core/i18n/i18n.service';

/**
 * Displays a warning banner when a module is disabled (read-only mode).
 * Place this at the top of list/view pages that belong to a specific module.
 *
 * When the module is enabled, nothing is rendered.
 * When disabled, shows a yellow warning bar with a lock icon.
 *
 * @usage
 * ```html
 * <app-module-status-banner module="Payroll" />
 * ```
 */
@Component({
  selector: 'app-module-status-banner',
  standalone: true,
  template: `
    @if (isReadOnly()) {
      <div class="module-status-banner" role="alert">
        <div class="banner-content">
          <i class="fa-solid fa-lock banner-icon"></i>
          <div class="banner-text">
            <strong>{{ i18n.t('module.read_only_title') }}</strong>
            <span>{{ i18n.t('module.read_only_message') }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .module-status-banner {
      background: var(--app-warning-50, #FFFBEB);
      border: 1px solid var(--app-warning-200, #FDE68A);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .banner-icon {
      color: var(--app-warning-500, #F59E0B);
      font-size: 18px;
      flex-shrink: 0;
    }

    .banner-text {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      font-size: 14px;
      color: var(--app-gray-700, #344054);
    }

    .banner-text strong {
      color: var(--app-gray-900, #101828);
    }
  `]
})
export class ModuleStatusBannerComponent {
  @Input({ required: true }) module!: string;

  protected entitlementService = inject(EntitlementService);
  protected i18n = inject(I18nService);

  isReadOnly = computed(() => {
    return this.entitlementService.isModuleReadOnly(this.module);
  });
}
