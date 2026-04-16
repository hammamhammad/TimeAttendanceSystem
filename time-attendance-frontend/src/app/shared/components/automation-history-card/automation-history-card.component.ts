import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecycleAutomationService } from '../../../core/services/lifecycle-automation.service';
import {
  LifecycleAutomationAuditEntry,
  LifecycleAutomationStatus,
  LifecycleAutomationType,
} from '../../models/lifecycle-automation.model';
import { I18nService } from '../../../core/i18n/i18n.service';

/**
 * Reusable card rendering the /lifecycle-automation/audit/by-entity timeline for a
 * given source entity. Drop onto Offer, Onboarding, Resignation, Termination, Clearance,
 * FinalSettlement, or EmployeeContract detail pages.
 *
 * Shows: automation type, status pill, target entity, trigger/completion timestamps, and
 * reason/error text. Empty state kicks in when the API returns an empty array.
 */
@Component({
  selector: 'app-automation-history-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automation-history-card.component.html',
  styleUrls: ['./automation-history-card.component.css'],
})
export class AutomationHistoryCardComponent implements OnChanges {
  @Input({ required: true }) entityType!: string;
  @Input({ required: true }) entityId!: number;

  protected readonly i18n = inject(I18nService);
  private readonly api = inject(LifecycleAutomationService);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly entries = signal<LifecycleAutomationAuditEntry[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entityType'] || changes['entityId']) {
      this.load();
    }
  }

  reload() { this.load(); }

  private load() {
    if (!this.entityType || !this.entityId) return;
    this.loading.set(true);
    this.error.set(null);
    this.api.getAuditsByEntity(this.entityType, this.entityId).subscribe({
      next: (rows) => {
        this.entries.set(rows);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Failed to load automation history.');
        this.loading.set(false);
      },
    });
  }

  protected statusVariant(status: LifecycleAutomationStatus): string {
    switch (status) {
      case LifecycleAutomationStatus.Succeeded: return 'success';
      case LifecycleAutomationStatus.Skipped: return 'secondary';
      case LifecycleAutomationStatus.Failed: return 'danger';
      case LifecycleAutomationStatus.DuplicateSuppressed: return 'info';
      case LifecycleAutomationStatus.Disabled: return 'secondary';
      case LifecycleAutomationStatus.MissingPrerequisite: return 'warning';
      default: return 'secondary';
    }
  }

  protected automationTypeLabel(t: LifecycleAutomationType): string {
    // i18n keys under lifecycle_automation.types.*
    const key = LifecycleAutomationType[t];
    return this.i18n.t(`lifecycle_automation.types.${key}`);
  }

  protected statusLabel(s: LifecycleAutomationStatus): string {
    const key = LifecycleAutomationStatus[s];
    return this.i18n.t(`lifecycle_automation.status.${key}`);
  }
}
