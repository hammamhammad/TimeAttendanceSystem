import { Component, input, output, computed, inject } from '@angular/core';

import { AuditLog } from '../audit-logs.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ModalWrapperComponent } from '../../../../shared/components/modal-wrapper/modal-wrapper.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-audit-log-detail-modal',
  standalone: true,
  imports: [
    ModalWrapperComponent,
    DefinitionListComponent
],
  templateUrl: './audit-log-detail-modal.component.html',
  styleUrls: ['./audit-log-detail-modal.component.css']
})
export class AuditLogDetailModalComponent {
  public i18n = inject(I18nService);

  // Inputs
  auditLog = input.required<AuditLog>();
  show = input.required<boolean>();

  // Outputs
  showChange = output<boolean>();

  // Computed properties for definition lists
  basicInfo = computed<DefinitionItem[]>(() => {
    const log = this.auditLog();
    return [
      {
        label: this.i18n.t('audit_logs.action'),
        value: log.actionDisplayName
      },
      {
        label: this.i18n.t('audit_logs.entity'),
        value: `${log.entityName} (ID: ${log.entityId})`
      },
      {
        label: this.i18n.t('audit_logs.timestamp'),
        value: this.formatDateTime(log.createdAtUtc)
      }
    ];
  });

  actorInfo = computed<DefinitionItem[]>(() => {
    const log = this.auditLog();
    if (!log.actorUserId) {
      return [
        {
          label: this.i18n.t('audit_logs.actor'),
          value: 'System'
        }
      ];
    }

    return [
      {
        label: this.i18n.t('audit_logs.actor_id'),
        value: log.actorUserId?.toString() || '-'
      },
      {
        label: this.i18n.t('audit_logs.actor_username'),
        value: log.actorUsername || '-'
      },
      {
        label: this.i18n.t('audit_logs.actor_email'),
        value: log.actorEmail || '-'
      }
    ];
  });

  technicalInfo = computed<DefinitionItem[]>(() => {
    const log = this.auditLog();
    return [
      {
        label: this.i18n.t('audit_logs.ip_address'),
        value: log.ipAddress || '-'
      },
      {
        label: this.i18n.t('audit_logs.user_agent'),
        value: log.userAgent || '-'
      },
      {
        label: this.i18n.t('audit_logs.created_by'),
        value: log.createdBy
      }
    ];
  });

  // Check if payload is valid JSON
  hasPayload = computed<boolean>(() => {
    const log = this.auditLog();
    return !!log.payloadJson && log.payloadJson.trim() !== '';
  });

  // Format payload JSON for display
  formattedPayload = computed<string>(() => {
    const log = this.auditLog();
    if (!log.payloadJson) return '';

    try {
      const parsed = JSON.parse(log.payloadJson);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return log.payloadJson;
    }
  });

  /**
   * Close the modal
   */
  onClose(): void {
    this.showChange.emit(false);
  }

  /**
   * Format date time
   */
  formatDateTime(date: string): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleString();
  }
}
