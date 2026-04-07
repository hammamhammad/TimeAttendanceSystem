import { Component, Input, signal, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-audit-history',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.css']
})
export class AuditHistoryComponent implements OnInit, OnChanges {
  @Input() entityName!: string;
  @Input() entityId!: number | string | null | undefined;

  i18n = inject(I18nService);
  private http = inject(HttpClient);

  loading = signal(false);
  logs = signal<any[]>([]);
  expandedLogId = signal<number | null>(null);
  changes = signal<Record<number, any[]>>({});

  ngOnInit() { this.loadHistory(); }
  ngOnChanges(c: SimpleChanges) { if (c['entityId'] || c['entityName']) this.loadHistory(); }

  loadHistory() {
    if (!this.entityName || !this.entityId) return;
    this.loading.set(true);
    this.http.get<any>(`${environment.apiUrl}/api/v1/audit-logs`, {
      params: { entityName: this.entityName, entityId: String(this.entityId), pageSize: '100', sortBy: 'createdatutc', sortDirection: 'desc' }
    }).subscribe({
      next: (res) => { this.logs.set(res.auditLogs || res.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); }
    });
  }

  toggleExpand(logId: number) {
    if (this.expandedLogId() === logId) { this.expandedLogId.set(null); return; }
    this.expandedLogId.set(logId);
    if (!this.changes()[logId]) {
      this.http.get<any[]>(`${environment.apiUrl}/api/v1/audit-logs/${logId}/changes`).subscribe({
        next: (data) => { this.changes.update(c => ({ ...c, [logId]: data })); },
        error: () => {}
      });
    }
  }

  getActionLabel(action: string | number): string {
    const map: Record<string, string> = {
      'Created': this.i18n.t('history.created'), '200': this.i18n.t('history.created'),
      'Updated': this.i18n.t('history.updated'), '201': this.i18n.t('history.updated'),
      'Deleted': this.i18n.t('history.deleted'), '202': this.i18n.t('history.deleted'),
      'Viewed': this.i18n.t('history.viewed'), '203': this.i18n.t('history.viewed')
    };
    return map[String(action)] || String(action);
  }

  getActionColor(action: string | number): string {
    const s = String(action);
    if (s === 'Created' || s === '200') return 'success';
    if (s === 'Updated' || s === '201') return 'primary';
    if (s === 'Deleted' || s === '202') return 'danger';
    return 'secondary';
  }
}
