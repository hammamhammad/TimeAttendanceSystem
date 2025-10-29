import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

/**
 * My Attendance Component
 * Allows employees to view their attendance history
 */
@Component({
  selector: 'app-my-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent
  ],
  templateUrl: './my-attendance.component.html',
  styleUrl: './my-attendance.component.css'
})
export class MyAttendanceComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly authService = inject(AuthService);
  readonly i18n = inject(I18nService);

  // State from service
  attendance = this.portalService.myAttendance;
  loading = this.portalService.myAttendanceLoading;
  error = this.portalService.myAttendanceError;

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  // Filters
  startDate = signal<string>(this.getFirstDayOfMonth());
  endDate = signal<string>(this.getTodayString());

  // Computed summary
  summary = computed(() => {
    const records = this.attendance();
    if (records.length === 0) return null;

    const totalDays = records.length;
    const presentDays = records.filter((r: any) =>
      r.status === 'Present' || r.status === 'Late' || r.status === 'EarlyLeave'
    ).length;
    const absentDays = records.filter((r: any) => r.status === 'Absent').length;
    const lateDays = records.filter((r: any) => r.status === 'Late').length;
    const totalWorkingHours = records.reduce((sum: number, r: any) => sum + (r.workingHours || 0), 0);
    const totalOvertimeHours = records.reduce((sum: number, r: any) =>
      sum + (r.preShiftOvertimeHours || 0) + (r.postShiftOvertimeHours || 0), 0);
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    return {
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      totalWorkingHours,
      totalOvertimeHours,
      attendanceRate
    };
  });

  ngOnInit(): void {
    this.loadAttendance();
  }

  ngOnDestroy(): void {
    this.portalService.clearMyAttendance();
  }

  loadAttendance(): void {
    // Get employee ID from current user if available
    const user = this.currentUser();
    const employeeId = user?.employeeId; // Assuming this exists

    this.portalService.loadMyAttendance({
      startDate: new Date(this.startDate()),
      endDate: new Date(this.endDate()),
      employeeId: employeeId
    }).subscribe({
      error: (error) => {
        console.error('Failed to load attendance:', error);
      }
    });
  }

  applyFilters(): void {
    this.loadAttendance();
  }

  clearFilters(): void {
    this.startDate.set(this.getFirstDayOfMonth());
    this.endDate.set(this.getTodayString());
    this.loadAttendance();
  }

  refresh(): void {
    this.loadAttendance();
  }

  getStatusBadgeClass(status: string): string {
    const statusMap: Record<string, string> = {
      'Present': 'badge bg-success',
      'Absent': 'badge bg-danger',
      'Late': 'badge bg-warning',
      'EarlyLeave': 'badge bg-warning',
      'Holiday': 'badge bg-info',
      'Weekend': 'badge bg-secondary',
      'OnLeave': 'badge bg-primary',
      'RemoteWork': 'badge bg-info'
    };
    return statusMap[status] || 'badge bg-secondary';
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatTime(time: Date | string | null): string {
    if (!time) return '-';
    const t = typeof time === 'string' ? new Date(time) : time;
    return t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  formatHours(hours: number): string {
    return hours.toFixed(2) + 'h';
  }

  private getFirstDayOfMonth(): string {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return this.dateToInputString(firstDay);
  }

  private getTodayString(): string {
    return this.dateToInputString(new Date());
  }

  private dateToInputString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
