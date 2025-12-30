import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ManagerDashboard, ManagerStatsCard, ManagerQuickAction, PendingApprovalItem } from '../models/manager-dashboard.model';

/**
 * Manager Dashboard Component
 * Displays manager-specific dashboard with team stats, pending approvals, and team overview
 */
@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  // Inject services
  private readonly portalService = inject(PortalService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);

  // Dashboard state from service
  dashboard = this.portalService.managerDashboard;
  loading = this.portalService.managerDashboardLoading;
  error = this.portalService.managerDashboardError;

  // Pending approvals from service
  pendingApprovals = this.portalService.pendingApprovals;
  pendingApprovalsLoading = this.portalService.pendingApprovalsLoading;

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  // Manager name for welcome message
  managerName = computed(() => {
    const dash = this.dashboard();
    return dash ? dash.managerName : this.currentUser()?.username || 'Manager';
  });

  // Stats cards
  statsCards = computed<ManagerStatsCard[]>(() => {
    const dash = this.dashboard();
    if (!dash) return [];

    return [
      {
        id: 'team-size',
        title: this.i18n.t('portal.team_size'),
        value: dash.teamSize,
        subtitle: this.i18n.t('portal.employees'),
        icon: 'fa-users',
        iconColor: 'text-primary',
        route: '/team-members'
      },
      {
        id: 'present-today',
        title: this.i18n.t('portal.present_today'),
        value: dash.presentToday,
        subtitle: `${dash.teamSize > 0 ? Math.round((dash.presentToday / dash.teamSize) * 100) : 0}%`,
        icon: 'fa-user-check',
        iconColor: 'text-success',
        route: '/team-members'
      },
      {
        id: 'absent-today',
        title: this.i18n.t('portal.absent_today'),
        value: dash.absentToday + dash.lateToday,
        subtitle: this.i18n.t('portal.absent_or_late'),
        icon: 'fa-user-times',
        iconColor: 'text-danger',
        route: '/team-members'
      },
      {
        id: 'pending-approvals',
        title: this.i18n.t('portal.pending_approvals'),
        value: dash.pendingApprovals?.total || 0,
        subtitle: this.i18n.t('portal.awaiting_action'),
        icon: 'fa-clock',
        iconColor: 'text-warning',
        route: '/pending-approvals'
      }
    ];
  });

  // Quick actions for managers
  quickActions = computed<ManagerQuickAction[]>(() => {
    const dash = this.dashboard();
    return [
      {
        id: 'pending-approvals',
        title: this.i18n.t('portal.pending_approvals'),
        description: this.i18n.t('portal.review_team_requests'),
        icon: 'fa-tasks',
        route: '/pending-approvals',
        color: 'warning',
        enabled: true,
        badge: dash?.pendingApprovals?.total || 0
      },
      {
        id: 'team-members',
        title: this.i18n.t('portal.my_team'),
        description: this.i18n.t('portal.view_team_members'),
        icon: 'fa-users',
        route: '/team-members',
        color: 'primary',
        enabled: true
      },
      {
        id: 'submit-vacation',
        title: this.i18n.t('portal.submit_vacation'),
        description: this.i18n.t('portal.submit_on_behalf'),
        icon: 'fa-umbrella-beach',
        route: '/vacation-requests/new',
        color: 'info',
        enabled: true
      },
      {
        id: 'submit-excuse',
        title: this.i18n.t('portal.submit_excuse'),
        description: this.i18n.t('portal.submit_on_behalf'),
        icon: 'fa-file-medical',
        route: '/excuse-requests/new',
        color: 'success',
        enabled: true
      }
    ];
  });

  // Recent pending approvals (first 5)
  recentPendingApprovals = computed<PendingApprovalItem[]>(() => {
    const approvals = this.pendingApprovals();
    return (approvals || []).slice(0, 5);
  });

  // Has pending approvals
  hasPendingApprovals = computed(() => this.recentPendingApprovals().length > 0);

  // Auto-refresh interval
  private refreshInterval: any;

  ngOnInit(): void {
    // Load dashboard data
    this.loadDashboard();
    this.loadPendingApprovals();

    // Auto-refresh every 5 minutes
    this.refreshInterval = setInterval(() => {
      this.loadDashboard();
      this.loadPendingApprovals();
    }, 5 * 60 * 1000);
  }

  ngOnDestroy(): void {
    // Clear interval
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Clear dashboard data
    this.portalService.clearManagerDashboard();
    this.portalService.clearPendingApprovals();
  }

  /**
   * Loads dashboard data
   */
  loadDashboard(): void {
    this.portalService.loadManagerDashboard().subscribe({
      error: (error) => {
        console.error('Failed to load manager dashboard:', error);
      }
    });
  }

  /**
   * Loads pending approvals
   */
  loadPendingApprovals(): void {
    this.portalService.loadPendingApprovals().subscribe({
      error: (error) => {
        console.error('Failed to load pending approvals:', error);
      }
    });
  }

  /**
   * Refreshes dashboard manually
   */
  refresh(): void {
    this.loadDashboard();
    this.loadPendingApprovals();
  }

  /**
   * Navigates to a quick action route
   */
  navigateToAction(action: ManagerQuickAction): void {
    if (action.enabled) {
      this.router.navigate([action.route]);
    }
  }

  /**
   * Navigates to stats card route
   */
  navigateToStats(card: ManagerStatsCard): void {
    if (card.route) {
      this.router.navigate([card.route]);
    }
  }

  /**
   * Navigates to pending approvals
   */
  viewAllApprovals(): void {
    this.router.navigate(['/pending-approvals']);
  }

  /**
   * Views a specific approval detail
   */
  viewApproval(approval: PendingApprovalItem): void {
    const routeMap: Record<string, string> = {
      'Vacation': '/vacation-requests',
      'Excuse': '/excuse-requests',
      'RemoteWork': '/remote-work-requests',
      'Fingerprint': '/fingerprint-requests'
    };
    const route = routeMap[approval.entityType] || '/pending-approvals';
    this.router.navigate([route, approval.entityId]);
  }

  /**
   * Quick approve action
   */
  quickApprove(approval: PendingApprovalItem, event: Event): void {
    event.stopPropagation();
    this.portalService.approveWorkflowStep(approval.workflowInstanceId).subscribe({
      next: () => {
        this.loadDashboard();
      },
      error: (error) => {
        console.error('Failed to approve:', error);
      }
    });
  }

  /**
   * Quick reject action
   */
  quickReject(approval: PendingApprovalItem, event: Event): void {
    event.stopPropagation();
    this.portalService.rejectWorkflowStep(approval.workflowInstanceId).subscribe({
      next: () => {
        this.loadDashboard();
      },
      error: (error) => {
        console.error('Failed to reject:', error);
      }
    });
  }

  /**
   * Formats date for display
   */
  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareToday = new Date(today);
    compareToday.setHours(0, 0, 0, 0);
    const compareYesterday = new Date(yesterday);
    compareYesterday.setHours(0, 0, 0, 0);

    if (compareDate.getTime() === compareToday.getTime()) {
      return this.i18n.t('common.today');
    } else if (compareDate.getTime() === compareYesterday.getTime()) {
      return this.i18n.t('common.yesterday');
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  /**
   * Gets entity type icon
   */
  getEntityTypeIcon(entityType: string): string {
    const iconMap: Record<string, string> = {
      'Vacation': 'bi-sun',
      'Excuse': 'bi-file-medical',
      'RemoteWork': 'bi-house-door',
      'Fingerprint': 'bi-fingerprint'
    };
    return iconMap[entityType] || 'bi-file';
  }

  /**
   * Gets entity type color class
   */
  getEntityTypeColor(entityType: string): string {
    const colorMap: Record<string, string> = {
      'Vacation': 'text-primary',
      'Excuse': 'text-info',
      'RemoteWork': 'text-success',
      'Fingerprint': 'text-warning'
    };
    return colorMap[entityType] || 'text-secondary';
  }
}
