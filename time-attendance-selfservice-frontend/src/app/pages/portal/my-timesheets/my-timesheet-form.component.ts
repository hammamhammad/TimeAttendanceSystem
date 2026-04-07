import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

interface ProjectDropdown { id: number; code: string; name: string; nameAr: string | null; }
interface TaskDropdown { id: number; code: string; name: string; nameAr: string | null; projectId: number; }
interface PeriodDropdown { id: number; name: string; startDate: string; endDate: string; status: string; }
interface EntryRow { date: string; cells: Record<number, { hours: number; overtimeHours: number }>; }
interface TimesheetEntry { id?: number; projectId: number; projectTaskId: number | null; projectName?: string; projectCode?: string; projectTaskName?: string | null; entryDate: string; hours: number; overtimeHours: number; notes: string | null; isAutoPopulated?: boolean; attendanceRecordId?: number | null; }
interface AutoPopulateRecord { id: number; date: string; workingHours: number; overtimeHours: number; status: string; }

@Component({
  selector: 'app-my-timesheet-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './my-timesheet-form.component.html',
  styleUrl: './my-timesheet-form.component.css'
})
export class MyTimesheetFormComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  loading = signal(false);
  saving = signal(false);
  isEdit = signal(false);
  timesheetId = signal<number | null>(null);
  timesheetStatus = signal('');

  // Form data
  selectedPeriodId = signal<number | null>(null);
  notes = signal('');
  entries = signal<TimesheetEntry[]>([]);

  // Dropdowns
  periods = signal<PeriodDropdown[]>([]);
  projects = signal<ProjectDropdown[]>([]);
  tasks = signal<TaskDropdown[]>([]);

  // Grid data
  selectedProjects = signal<number[]>([]);
  dates = signal<string[]>([]);
  gridData = signal<Record<string, Record<number, number>>>({});

  // Auto-populate
  autoPopulating = signal(false);
  autoPopulateProjectId = signal<number | null>(null);

  selectedPeriod = computed(() => this.periods().find(p => p.id === this.selectedPeriodId()));

  totalHours = computed(() => {
    const grid = this.gridData();
    let total = 0;
    for (const date of Object.keys(grid)) {
      for (const projectId of Object.keys(grid[date])) {
        total += grid[date][+projectId] || 0;
      }
    }
    return total;
  });

  ngOnInit(): void {
    this.loadDropdowns();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.timesheetId.set(+id);
      this.loadTimesheet(+id);
    }
  }

  private loadDropdowns(): void {
    this.http.get<any[]>(`${this.baseUrl}/portal/projects/dropdown`).subscribe({
      next: (data) => this.projects.set(data),
      error: () => {}
    });
    this.http.get<any[]>(`${this.baseUrl}/portal/project-tasks/dropdown`).subscribe({
      next: (data) => this.tasks.set(data),
      error: () => {}
    });
    // Load open periods
    this.http.get<{ data: PeriodDropdown[] }>(`${this.baseUrl}/timesheet-periods?status=Open&pageSize=50`).subscribe({
      next: (res) => this.periods.set(res.data || []),
      error: () => {}
    });
  }

  private loadTimesheet(id: number): void {
    this.loading.set(true);
    this.http.get<any>(`${this.baseUrl}/portal/my-timesheets/${id}`).subscribe({
      next: (ts) => {
        this.selectedPeriodId.set(ts.timesheetPeriodId);
        this.notes.set(ts.notes ?? '');
        this.timesheetStatus.set(ts.status);
        this.entries.set(ts.entries ?? []);

        // Build grid from entries
        if (ts.entries?.length) {
          const projectIds = [...new Set(ts.entries.map((e: TimesheetEntry) => e.projectId))];
          this.selectedProjects.set(projectIds as number[]);

          const dates = this.generateDates(ts.periodStartDate, ts.periodEndDate);
          this.dates.set(dates);

          const grid: Record<string, Record<number, number>> = {};
          for (const d of dates) {
            grid[d] = {};
            for (const pid of projectIds as number[]) {
              grid[d][pid] = 0;
            }
          }
          for (const e of ts.entries as TimesheetEntry[]) {
            const dateKey = e.entryDate.substring(0, 10);
            if (grid[dateKey] !== undefined) {
              grid[dateKey][e.projectId] = (grid[dateKey][e.projectId] || 0) + e.hours + e.overtimeHours;
            }
          }
          this.gridData.set(grid);
        }

        this.loading.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onPeriodChange(): void {
    const period = this.selectedPeriod();
    if (period) {
      const dates = this.generateDates(period.startDate, period.endDate);
      this.dates.set(dates);
      this.initGrid();
    }
  }

  addProject(projectId: number): void {
    if (!projectId || this.selectedProjects().includes(projectId)) return;
    this.selectedProjects.update(list => [...list, projectId]);
    this.initGrid();
  }

  removeProject(projectId: number): void {
    this.selectedProjects.update(list => list.filter(id => id !== projectId));
    const grid = { ...this.gridData() };
    for (const date of Object.keys(grid)) {
      delete grid[date][projectId];
    }
    this.gridData.set(grid);
  }

  getProjectName(projectId: number): string {
    const p = this.projects().find(proj => proj.id === projectId);
    return p ? `${p.code} - ${p.name}` : `#${projectId}`;
  }

  private initGrid(): void {
    const grid: Record<string, Record<number, number>> = {};
    for (const date of this.dates()) {
      grid[date] = {};
      for (const pid of this.selectedProjects()) {
        grid[date][pid] = this.gridData()[date]?.[pid] ?? 0;
      }
    }
    this.gridData.set(grid);
  }

  updateCell(date: string, projectId: number, value: number): void {
    this.gridData.update(grid => {
      const updated = { ...grid };
      if (!updated[date]) updated[date] = {};
      updated[date] = { ...updated[date], [projectId]: value || 0 };
      return updated;
    });
  }

  getCellValue(date: string, projectId: number): number {
    return this.gridData()[date]?.[projectId] ?? 0;
  }

  getDayTotal(date: string): number {
    const row = this.gridData()[date] || {};
    return Object.values(row).reduce((sum, v) => sum + (v || 0), 0);
  }

  getProjectTotal(projectId: number): number {
    const grid = this.gridData();
    let total = 0;
    for (const date of Object.keys(grid)) {
      total += grid[date][projectId] || 0;
    }
    return total;
  }

  autoPopulate(): void {
    if (!this.timesheetId()) return;
    this.autoPopulating.set(true);
    this.http.get<{ timesheetId: number; periodStartDate: string; periodEndDate: string; attendanceRecords: AutoPopulateRecord[] }>(
      `${this.baseUrl}/portal/my-timesheets/${this.timesheetId()}/auto-populate`
    ).subscribe({
      next: (res) => {
        if (!res.attendanceRecords.length) {
          this.notification.warning(this.i18n.t('portal.timesheets.no_attendance'));
          this.autoPopulating.set(false);
          return;
        }

        // If we have a selected project, distribute attendance hours to it
        if (this.selectedProjects().length > 0) {
          const pid = this.selectedProjects()[0];
          const grid = { ...this.gridData() };
          for (const ar of res.attendanceRecords) {
            const dateKey = ar.date.substring(0, 10);
            if (grid[dateKey] !== undefined) {
              grid[dateKey] = { ...grid[dateKey], [pid]: ar.workingHours + ar.overtimeHours };
            }
          }
          this.gridData.set(grid);
          this.notification.success(this.i18n.t('portal.timesheets.auto_populated'));
        } else {
          this.notification.warning(this.i18n.t('portal.timesheets.select_project_first'));
        }
        this.autoPopulating.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.autoPopulating.set(false); }
    });
  }

  save(): void {
    this.saveTimesheet(false);
  }

  async submitTimesheet(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.timesheets.submit_confirm_title'),
      message: this.i18n.t('portal.timesheets.submit_confirm_message'),
      confirmText: this.i18n.t('common.submit'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary'
    });
    if (!result.confirmed) return;
    this.saveTimesheet(true);
  }

  private saveTimesheet(andSubmit: boolean): void {
    // Build entries from grid
    const entryList: { projectId: number; projectTaskId?: number; entryDate: string; hours: number; overtimeHours: number; notes?: string }[] = [];
    const grid = this.gridData();
    for (const date of Object.keys(grid)) {
      for (const pid of Object.keys(grid[date])) {
        const hours = grid[date][+pid];
        if (hours > 0) {
          entryList.push({ projectId: +pid, entryDate: new Date(date).toISOString(), hours, overtimeHours: 0 });
        }
      }
    }

    this.saving.set(true);

    if (this.isEdit()) {
      // Update existing
      this.http.put(`${this.baseUrl}/portal/my-timesheets/${this.timesheetId()}`, { notes: this.notes(), entries: entryList }).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('portal.timesheets.saved'));
          if (andSubmit) {
            this.http.post(`${this.baseUrl}/portal/my-timesheets/${this.timesheetId()}/submit`, {}).subscribe({
              next: () => { this.notification.success(this.i18n.t('portal.timesheets.submitted')); this.router.navigate(['/my-timesheets']); this.saving.set(false); },
              error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
            });
          } else {
            this.saving.set(false);
          }
        },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
      });
    } else {
      // Create new
      if (!this.selectedPeriodId()) { this.notification.error(this.i18n.t('portal.timesheets.select_period')); this.saving.set(false); return; }
      this.http.post<{ id: number }>(`${this.baseUrl}/portal/my-timesheets`, { timesheetPeriodId: this.selectedPeriodId(), notes: this.notes() }).subscribe({
        next: (res) => {
          this.timesheetId.set(res.id);
          this.isEdit.set(true);
          // Now update with entries
          this.http.put(`${this.baseUrl}/portal/my-timesheets/${res.id}`, { notes: this.notes(), entries: entryList }).subscribe({
            next: () => {
              this.notification.success(this.i18n.t('portal.timesheets.saved'));
              if (andSubmit) {
                this.http.post(`${this.baseUrl}/portal/my-timesheets/${res.id}/submit`, {}).subscribe({
                  next: () => { this.notification.success(this.i18n.t('portal.timesheets.submitted')); this.router.navigate(['/my-timesheets']); this.saving.set(false); },
                  error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
                });
              } else {
                this.saving.set(false);
              }
            },
            error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
          });
        },
        error: (err) => { this.notification.error(err?.error?.error || this.i18n.t('common.error')); this.saving.set(false); }
      });
    }
  }

  async recallTimesheet(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.timesheets.recall_confirm_title'),
      message: this.i18n.t('portal.timesheets.recall_confirm_message'),
      confirmText: this.i18n.t('portal.timesheets.recall'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning'
    });
    if (!result.confirmed) return;
    this.http.post(`${this.baseUrl}/portal/my-timesheets/${this.timesheetId()}/recall`, {}).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.timesheets.recalled')); this.router.navigate(['/my-timesheets']); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('common.error'))
    });
  }

  private generateDates(start: string, end: string): string[] {
    const dates: string[] = [];
    const current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      dates.push(current.toISOString().substring(0, 10));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  isWeekend(dateStr: string): boolean {
    const d = new Date(dateStr);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  canEdit(): boolean {
    const status = this.timesheetStatus();
    return !this.isEdit() || status === 'Draft' || status === 'Rejected' || status === 'Recalled';
  }

  canSubmit(): boolean {
    return this.isEdit() && (this.timesheetStatus() === 'Draft' || this.timesheetStatus() === 'Rejected');
  }

  canRecall(): boolean {
    return this.isEdit() && this.timesheetStatus() === 'Submitted';
  }
}
