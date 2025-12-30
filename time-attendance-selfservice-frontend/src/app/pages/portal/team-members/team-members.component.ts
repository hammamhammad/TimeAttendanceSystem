import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { PortalService } from '../services/portal.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';

import { TeamMember, TeamMemberStatus } from '../models/manager-dashboard.model';

import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    StatusBadgeComponent
  ],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  private readonly notification = inject(NotificationService);
  private readonly destroy$ = new Subject<void>();

  // State
  teamMembers = this.portalService.teamMembers;
  isLoading = this.portalService.teamMembersLoading;
  searchTerm = signal<string>('');
  statusFilter = signal<string>('all');
  hierarchyFilter = signal<string>('all');

  // Filtered team members
  filteredTeamMembers = computed(() => {
    let members = this.teamMembers();
    const search = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    const hierarchy = this.hierarchyFilter();

    if (search) {
      members = members.filter(m =>
        m.name.toLowerCase().includes(search) ||
        m.employeeCode.toLowerCase().includes(search) ||
        (m.department && m.department.toLowerCase().includes(search)) ||
        (m.position && m.position.toLowerCase().includes(search))
      );
    }

    if (status !== 'all') {
      members = members.filter(m => m.status === status);
    }

    if (hierarchy !== 'all') {
      const level = parseInt(hierarchy, 10);
      members = members.filter(m => m.hierarchyLevel === level);
    }

    return members;
  });

  // Statistics
  stats = computed(() => {
    const members = this.teamMembers();
    return {
      total: members.length,
      directReports: members.filter(m => m.hierarchyLevel === 1).length,
      indirectReports: members.filter(m => m.hierarchyLevel > 1).length,
      present: members.filter(m => m.status === TeamMemberStatus.Present).length,
      absent: members.filter(m => m.status === TeamMemberStatus.Absent).length,
      onLeave: members.filter(m => m.status === TeamMemberStatus.OnLeave).length,
      remote: members.filter(m => m.status === TeamMemberStatus.RemoteWork).length
    };
  });

  // Status options for filter
  statusOptions = [
    { value: 'all', label: 'common.all' },
    { value: TeamMemberStatus.Present, label: 'portal.status_present' },
    { value: TeamMemberStatus.Absent, label: 'portal.status_absent' },
    { value: TeamMemberStatus.Late, label: 'portal.status_late' },
    { value: TeamMemberStatus.OnLeave, label: 'portal.status_on_leave' },
    { value: TeamMemberStatus.RemoteWork, label: 'portal.status_remote_work' },
    { value: TeamMemberStatus.NotCheckedIn, label: 'portal.status_not_checked_in' }
  ];

  hierarchyOptions = [
    { value: 'all', label: 'common.all' },
    { value: '1', label: 'portal.direct_reports' },
    { value: '2', label: 'portal.indirect_reports' }
  ];

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTeamMembers(): void {
    this.portalService.loadTeamMembers(true)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (error) => {
          console.error('Error loading team members:', error);
          this.notification.error(this.i18n.t('portal.error_loading_team'));
        }
      });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  onStatusFilterChange(status: string): void {
    this.statusFilter.set(status);
  }

  onHierarchyFilterChange(hierarchy: string): void {
    this.hierarchyFilter.set(hierarchy);
  }

  viewMemberDetails(member: TeamMember): void {
    // Navigate to a member details page or show modal
    this.notification.info(this.i18n.t('portal.viewing_member', { name: member.name }));
  }

  createVacationOnBehalf(member: TeamMember): void {
    this.router.navigate(['/vacation-requests/new'], {
      queryParams: { onBehalfOf: member.id }
    });
  }

  createExcuseOnBehalf(member: TeamMember): void {
    this.router.navigate(['/excuse-requests/new'], {
      queryParams: { onBehalfOf: member.id }
    });
  }

  createRemoteWorkOnBehalf(member: TeamMember): void {
    this.router.navigate(['/remote-work-requests/new'], {
      queryParams: { onBehalfOf: member.id }
    });
  }

  getStatusVariant(status: TeamMemberStatus): 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' {
    switch (status) {
      case TeamMemberStatus.Present:
        return 'success';
      case TeamMemberStatus.Absent:
        return 'danger';
      case TeamMemberStatus.Late:
        return 'warning';
      case TeamMemberStatus.OnLeave:
        return 'info';
      case TeamMemberStatus.RemoteWork:
        return 'primary';
      case TeamMemberStatus.NotCheckedIn:
      default:
        return 'secondary';
    }
  }

  getStatusLabel(status: TeamMemberStatus): string {
    switch (status) {
      case TeamMemberStatus.Present:
        return this.i18n.t('portal.status_present');
      case TeamMemberStatus.Absent:
        return this.i18n.t('portal.status_absent');
      case TeamMemberStatus.Late:
        return this.i18n.t('portal.status_late');
      case TeamMemberStatus.OnLeave:
        return this.i18n.t('portal.status_on_leave');
      case TeamMemberStatus.RemoteWork:
        return this.i18n.t('portal.status_remote_work');
      case TeamMemberStatus.NotCheckedIn:
      default:
        return this.i18n.t('portal.status_not_checked_in');
    }
  }

  getHierarchyLabel(level: number): string {
    if (level === 1) {
      return this.i18n.t('portal.direct_report');
    }
    return this.i18n.t('portal.indirect_report_level', { level: level.toString() });
  }

  getPendingRequestsCount(member: TeamMember): number {
    return member.pendingRequests.vacations +
           member.pendingRequests.excuses +
           member.pendingRequests.remoteWork;
  }

  refresh(): void {
    this.loadTeamMembers();
  }
}
