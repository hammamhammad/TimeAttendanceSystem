import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsService, UserSession } from './sessions.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    DataTableComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  private sessionsService = inject(SessionsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // State signals
  sessions = signal<UserSession[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchTerm = signal<string>('');

  // Table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'user',
      label: this.i18n.t('sessions.user'),
      sortable: true,
      width: '20%',
      priority: 'high',
      renderHtml: true
    },
    {
      key: 'deviceInfo',
      label: this.i18n.t('sessions.device'),
      sortable: false,
      width: '20%',
      priority: 'high',
      renderHtml: true
    },
    {
      key: 'ipAddress',
      label: this.i18n.t('sessions.ip_address'),
      sortable: true,
      width: '12%',
      priority: 'medium'
    },
    {
      key: 'loginTime',
      label: this.i18n.t('sessions.login_time'),
      sortable: true,
      width: '15%',
      priority: 'medium'
    },
    {
      key: 'lastActivity',
      label: this.i18n.t('sessions.last_activity'),
      sortable: true,
      width: '15%',
      priority: 'low'
    },
    {
      key: 'status',
      label: this.i18n.t('sessions.status'),
      sortable: false,
      width: '10%',
      align: 'center',
      priority: 'high',
      renderHtml: true
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'terminate',
      label: this.i18n.t('sessions.terminate'),
      icon: 'fa-power-off',
      color: 'danger',
      condition: (session: UserSession) => !session.isCurrentSession
    }
  ]);

  // Transform sessions data for data table
  tableData = computed(() => {
    const sessionsArray = this.sessions();
    if (!Array.isArray(sessionsArray)) {
      return [];
    }

    // Apply search filter
    const search = this.searchTerm().toLowerCase();
    const filtered = search
      ? sessionsArray.filter(session =>
          session.username?.toLowerCase().includes(search) ||
          session.email?.toLowerCase().includes(search) ||
          session.ipAddress?.toLowerCase().includes(search) ||
          session.deviceName?.toLowerCase().includes(search) ||
          session.browser?.toLowerCase().includes(search) ||
          session.platform?.toLowerCase().includes(search)
        )
      : sessionsArray;

    return filtered.map(session => ({
      ...session,
      user: this.formatUser(session),
      deviceInfo: this.formatDevice(session),
      loginTime: this.formatDateTime(session.createdAtUtc),
      lastActivity: this.formatDateTime(session.lastAccessedAtUtc),
      status: this.formatStatus(session)
    }));
  });

  ngOnInit(): void {
    this.loadSessions();
  }

  /**
   * Load all active sessions
   */
  loadSessions(): void {
    this.loading.set(true);
    this.error.set(null);

    this.sessionsService.getUserSessions().subscribe({
      next: (sessions) => {
        this.sessions.set(sessions);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load sessions:', error);
        this.error.set(this.i18n.t('sessions.errors.load_failed'));
        this.notificationService.error(this.i18n.t('sessions.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }

  /**
   * Terminate a specific session
   */
  onTerminateSession(session: UserSession): void {
    if (session.isCurrentSession) {
      this.notificationService.warning(this.i18n.t('sessions.errors.cannot_terminate_current'));
      return;
    }

    this.confirmationService.confirm({
      title: this.i18n.t('sessions.terminate_session'),
      message: this.i18n.t('sessions.confirm_terminate')
        .replace('{{device}}', session.deviceName || 'Unknown Device'),
      confirmText: this.i18n.t('sessions.terminate'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig).then(result => {
      if (result.confirmed) {
        this.sessionsService.terminateSession(session.sessionId).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('sessions.success.terminated'));
            this.loadSessions(); // Reload sessions list
          },
          error: (error) => {
            console.error('Failed to terminate session:', error);
            this.notificationService.error(this.i18n.t('sessions.errors.terminate_failed'));
          }
        });
      }
    });
  }

  /**
   * Terminate all sessions except current
   */
  onTerminateAllOtherSessions(): void {
    this.confirmationService.confirm({
      title: this.i18n.t('sessions.terminate_all'),
      message: this.i18n.t('sessions.confirm_terminate_all'),
      confirmText: this.i18n.t('sessions.terminate_all'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig).then(result => {
      if (result.confirmed) {
        this.sessionsService.terminateAllOtherSessions().subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('sessions.success.all_terminated'));
            this.loadSessions(); // Reload sessions list
          },
          error: (error) => {
            console.error('Failed to terminate all sessions:', error);
            this.notificationService.error(this.i18n.t('sessions.errors.terminate_all_failed'));
          }
        });
      }
    });
  }

  /**
   * Handle table actions
   */
  onActionClick(event: { action: string, item: UserSession }): void {
    const { action, item } = event;

    switch (action) {
      case 'terminate':
        this.onTerminateSession(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Refresh sessions list
   */
  onRefresh(): void {
    this.loadSessions();
  }

  /**
   * Handle search term changes
   */
  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  // Formatting methods
  formatUser(session: UserSession): string {
    return `
      <div>
        <div class="fw-medium">${session.username || 'Unknown'}</div>
        <small class="text-muted">${session.email || 'No email'}</small>
      </div>
    `;
  }

  formatDevice(session: UserSession): string {
    const platformStr = session.platform?.trim() || 'Unknown';
    const browserStr = session.browser?.trim() || 'Unknown';
    const deviceNameStr = session.deviceName?.trim() || `${browserStr} on ${platformStr}`;

    const isMobile = platformStr.toLowerCase().includes('mobile') ||
                     platformStr.toLowerCase().includes('android') ||
                     platformStr.toLowerCase().includes('ios');
    const deviceIcon = isMobile ? 'fa-mobile-alt' : 'fa-desktop';

    return `
      <div class="d-flex align-items-center">
        <i class="fas ${deviceIcon} me-2 text-primary"></i>
        <div>
          <div class="fw-medium">${deviceNameStr}</div>
          <small class="text-muted">${browserStr} on ${platformStr}</small>
        </div>
      </div>
    `;
  }

  formatDateTime(date: string): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleString();
  }

  formatStatus(session: UserSession): string {
    if (session.isCurrentSession) {
      return `<span class="badge bg-success-subtle text-success">${this.i18n.t('sessions.current_session')}</span>`;
    }
    return `<span class="badge bg-info-subtle text-info">${this.i18n.t('sessions.active')}</span>`;
  }
}
