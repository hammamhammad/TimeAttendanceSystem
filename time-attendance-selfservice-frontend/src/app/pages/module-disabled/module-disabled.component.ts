import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-module-disabled',
  standalone: true,
  imports: [EmptyStateComponent],
  template: `
    <div class="module-disabled-page d-flex align-items-center justify-content-center" style="min-height: 60vh;">
      <app-empty-state
        variant="module-disabled"
        [title]="i18n.t('module.not_available')"
        [message]="i18n.t('module.not_available_message')"
        [moduleName]="moduleName()"
        [actionText]="i18n.t('module.go_to_dashboard')"
        actionIcon="bi bi-house-door"
        (action)="goToDashboard()">
      </app-empty-state>
    </div>
  `
})
export class ModuleDisabledComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public i18n = inject(I18nService);

  moduleName = signal<string>('');

  ngOnInit(): void {
    const module = this.route.snapshot.queryParamMap.get('module') || '';
    this.moduleName.set(module);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
