import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AttendanceService } from '../../../core/services/attendance.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FilterPanelComponent, FilterConfig, FilterValues } from '../shared/filter-panel/filter-panel.component';
import { AttendanceChartComponent, ChartData } from '../shared/attendance-chart/attendance-chart.component';
import { AttendanceSummaryCardComponent, AttendanceSummaryData } from '../shared/attendance-summary-card/attendance-summary-card.component';
import {
  AttendanceStatistics,
  AttendanceStatus
} from '../../../shared/models/attendance.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

interface MonthlyReportFilters {
  month: number;
  year: number;
  departmentIds?: number[];
  branchIds?: number[];
  employeeIds?: number[];
}

interface MonthlyAttendanceReport {
  summary: any;
  summaryStatistics: any;
  employeeRecords: MonthlyEmployeeRecord[];
  dailyBreakdown: any[];
  period: any;
}

interface MonthlyEmployeeRecord {
  employeeId: string;
  employeeName: string;
  employeeNumber: string;
  department: string;
  branch?: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  overtimeDays: number;
  totalWorkingHours: number;
  totalWorkingDays?: number;
  totalOvertimeHours: number;
  attendanceRate: number;
  perfectAttendance: boolean;
}

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableComponent,
    PageHeaderComponent,
    FilterPanelComponent,
    AttendanceChartComponent,
    AttendanceSummaryCardComponent,
    StatusBadgeComponent
  ],
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {
  // Signals for reactive state management
  monthlyReport = signal<MonthlyAttendanceReport | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  exporting = signal(false);

  // Form and filters
  filterForm!: FormGroup;
  filterConfig = signal<FilterConfig>({});
  currentFilters = signal<MonthlyReportFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  // Computed properties
  reportData = computed(() => this.monthlyReport()?.employeeRecords || []);
  summaryStats = computed(() => this.monthlyReport()?.summaryStatistics);

  // Chart data for monthly overview
  attendanceOverviewChart = computed<ChartData>(() => {
    const stats = this.summaryStats();
    if (!stats) return { labels: [], datasets: [] };

    return {
      labels: ['Present Days', 'Absent Days', 'Late Days', 'Overtime Days'],
      datasets: [{
        label: 'Monthly Attendance Overview',
        data: [
          stats.totalPresentDays,
          stats.totalAbsentDays,
          stats.totalLateDays,
          stats.totalOvertimeDays
        ],
        backgroundColor: ['#198754', '#dc3545', '#ffc107', '#0d6efd'],
        borderWidth: 2
      }]
    };
  });

  // Overtime trends chart
  overtimeTrendChart = computed<ChartData>(() => {
    const report = this.monthlyReport();
    if (!report?.dailyBreakdown) return { labels: [], datasets: [] };

    const dailyData = report.dailyBreakdown;
    return {
      labels: dailyData.map((d: any) => new Date(d.date).getDate().toString()),
      datasets: [{
        label: 'Daily Overtime Hours',
        data: dailyData.map((d: any) => d.totalOvertimeHours),
        backgroundColor: '#0d6efd',
        borderColor: '#0d6efd',
        borderWidth: 2,
        fill: false
      }]
    };
  });

  // Summary cards
  summaryCards = computed<AttendanceSummaryData[]>(() => {
    const stats = this.summaryStats();
    if (!stats) return [];

    const workingDays = this.getWorkingDaysInMonth();

    return [
      {
        title: 'Total Employees',
        value: stats.totalEmployees,
        icon: 'fa-users',
        color: 'primary',
        subtitle: 'In selected period'
      },
      {
        title: 'Average Attendance Rate',
        value: `${Math.round(stats.averageAttendanceRate)}%`,
        icon: 'fa-percentage',
        color: stats.averageAttendanceRate >= 90 ? 'success' : stats.averageAttendanceRate >= 80 ? 'warning' : 'danger',
        percentage: stats.averageAttendanceRate,
        trend: {
          value: 2.3,
          isPositive: true,
          label: 'vs last month'
        }
      },
      {
        title: 'Total Overtime Hours',
        value: `${Math.round(stats.totalOvertimeHours)}h`,
        icon: 'fa-business-time',
        color: 'info',
        subtitle: `${Math.round(stats.totalOvertimeHours / stats.totalEmployees)}h avg per employee`
      },
      {
        title: 'Perfect Attendance',
        value: stats.perfectAttendanceEmployees,
        icon: 'fa-award',
        color: 'success',
        percentage: stats.totalEmployees > 0 ? (stats.perfectAttendanceEmployees / stats.totalEmployees) * 100 : 0,
        subtitle: 'Employees with no absences'
      },
      {
        title: 'Late Arrivals',
        value: stats.totalLateDays,
        icon: 'fa-clock',
        color: 'warning',
        subtitle: `${Math.round(stats.totalLateDays / workingDays)} avg per day`
      },
      {
        title: 'Absent Days',
        value: stats.totalAbsentDays,
        icon: 'fa-user-times',
        color: 'danger',
        percentage: workingDays > 0 ? ((workingDays * stats.totalEmployees - stats.totalPresentDays) / (workingDays * stats.totalEmployees)) * 100 : 0,
        subtitle: `${Math.round(stats.totalAbsentDays / workingDays)} avg per day`
      }
    ];
  });

  // Table configuration
  tableColumns = [
    { key: 'employeeName', label: 'Employee', sortable: true },
    { key: 'employeeNumber', label: 'Number', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'totalWorkingDays', label: 'Working Days', sortable: true },
    { key: 'presentDays', label: 'Present', sortable: true },
    { key: 'absentDays', label: 'Absent', sortable: true },
    { key: 'lateDays', label: 'Late', sortable: true },
    { key: 'overtimeDays', label: 'Overtime Days', sortable: true },
    { key: 'totalWorkingHours', label: 'Total Hours', sortable: true },
    { key: 'totalOvertimeHours', label: 'Overtime Hours', sortable: true },
    { key: 'attendanceRate', label: 'Rate %', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  // Constants for template
  AttendanceStatus = AttendanceStatus;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    public readonly i18nService: I18nService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFilterForm();
    this.setupFilterConfig();
    this.loadMonthlyReport();
  }

  private createFilterForm(): void {
    const currentDate = new Date();
    this.filterForm = this.fb.group({
      month: [currentDate.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]],
      year: [currentDate.getFullYear(), [Validators.required, Validators.min(2020)]],
      departmentIds: [[]],
      branchIds: [[]],
      employeeIds: [[]]
    });

    // Subscribe to form changes
    this.filterForm.valueChanges.subscribe(values => {
      this.currentFilters.set(values);
    });
  }

  private setupFilterConfig(): void {
    // For now, we'll set up basic configuration
    // In a real implementation, these would be loaded from services
    this.filterConfig.set({
      employees: {
        enabled: true,
        multiple: true,
        options: [] // Would be loaded from EmployeeService
      },
      departments: {
        enabled: true,
        multiple: true,
        options: [] // Would be loaded from DepartmentService
      },
      branches: {
        enabled: true,
        multiple: true,
        options: [] // Would be loaded from BranchService
      }
    });
  }

  loadMonthlyReport(): void {
    const filters = this.currentFilters();
    this.loading.set(true);
    this.error.set(null);

    this.attendanceService.getMonthlyReport(filters).subscribe({
      next: (data) => {
        this.monthlyReport.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading monthly report:', error);
        this.error.set('Failed to load monthly report');
        this.loading.set(false);
        this.notificationService.error('Failed to load monthly report');
      }
    });
  }

  private generateMockMonthlyReport(filters: MonthlyReportFilters): MonthlyAttendanceReport {
    const workingDays = this.getWorkingDaysInMonth();
    const employeeCount = 50; // Mock employee count

    // Generate mock employee records
    const employeeRecords: MonthlyEmployeeRecord[] = [];
    for (let i = 1; i <= employeeCount; i++) {
      const presentDays = Math.floor(Math.random() * (workingDays - 2)) + 18; // 18-22 present days
      const absentDays = workingDays - presentDays;
      const lateDays = Math.floor(Math.random() * 5); // 0-4 late days
      const overtimeDays = Math.floor(Math.random() * 10); // 0-9 overtime days
      const totalWorkingHours = presentDays * 8 + (Math.random() * 10 - 5); // Around 8h per day with variation
      const totalOvertimeHours = overtimeDays * (Math.random() * 3 + 0.5); // 0.5-3.5h overtime per day

      employeeRecords.push({
        employeeId: i.toString(),
        employeeName: `Employee ${i.toString().padStart(3, '0')}`,
        employeeNumber: `EMP${i.toString().padStart(3, '0')}`,
        department: `Department ${(i % 5) + 1}`,
        branch: `Branch ${(i % 3) + 1}`,
        totalWorkingDays: workingDays,
        presentDays,
        absentDays,
        lateDays,
        overtimeDays,
        totalWorkingHours: Math.round(totalWorkingHours * 100) / 100,
        totalOvertimeHours: Math.round(totalOvertimeHours * 100) / 100,
        attendanceRate: Math.round((presentDays / workingDays) * 100),
        perfectAttendance: absentDays === 0 && lateDays === 0
      });
    }

    // Calculate summary statistics
    const summaryStatistics: any = {
      totalEmployees: employeeCount,
      totalPresentDays: employeeRecords.reduce((sum: number, emp: any) => sum + emp.presentDays, 0),
      totalAbsentDays: employeeRecords.reduce((sum: number, emp: any) => sum + emp.absentDays, 0),
      totalLateDays: employeeRecords.reduce((sum: number, emp: any) => sum + emp.lateDays, 0),
      totalOvertimeDays: employeeRecords.reduce((sum: number, emp: any) => sum + emp.overtimeDays, 0),
      totalOvertimeHours: employeeRecords.reduce((sum: number, emp: any) => sum + emp.totalOvertimeHours, 0),
      averageWorkingHours: employeeRecords.reduce((sum: number, emp: any) => sum + emp.totalWorkingHours, 0) / employeeCount,
      averageAttendanceRate: employeeRecords.reduce((sum: number, emp: any) => sum + emp.attendanceRate, 0) / employeeCount,
      perfectAttendanceEmployees: employeeRecords.filter((emp: any) => emp.perfectAttendance).length,
      period: {
        startDate: `${filters.year}-${filters.month.toString().padStart(2, '0')}-01`,
        endDate: `${filters.year}-${filters.month.toString().padStart(2, '0')}-${workingDays.toString().padStart(2, '0')}`
      }
    };

    // Generate daily breakdown for charts
    const dailyBreakdown = [];
    for (let day = 1; day <= workingDays; day++) {
      dailyBreakdown.push({
        date: `${filters.year}-${filters.month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        totalOvertimeHours: Math.random() * 20 + 5 // 5-25 hours per day
      });
    }

    return {
      period: summaryStatistics.period,
      summary: summaryStatistics,
      summaryStatistics,
      employeeRecords,
      dailyBreakdown
    };
  }

  private getWorkingDaysInMonth(): number {
    const filters = this.currentFilters();
    const date = new Date(filters.year, filters.month - 1, 1);
    const lastDay = new Date(filters.year, filters.month, 0).getDate();
    let workingDays = 0;

    for (let day = 1; day <= lastDay; day++) {
      const currentDate = new Date(filters.year, filters.month - 1, day);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays++;
      }
    }

    return workingDays;
  }

  onFiltersChanged(filters: FilterValues): void {
    // Update form with filter values if needed
    if (filters.departmentIds) {
      this.filterForm.patchValue({ departmentIds: filters.departmentIds });
    }
    if (filters.branchIds) {
      this.filterForm.patchValue({ branchIds: filters.branchIds });
    }
    if (filters.employeeIds) {
      this.filterForm.patchValue({ employeeIds: filters.employeeIds });
    }
  }

  onFiltersApplied(): void {
    this.loadMonthlyReport();
  }

  generateReport(): void {
    this.loadMonthlyReport();
  }

  exportToExcel(): void {
    this.exporting.set(true);

    // Mock export functionality
    setTimeout(() => {
      this.exporting.set(false);
      this.notificationService.success('Monthly report exported successfully');
    }, 2000);
  }

  exportToPDF(): void {
    this.exporting.set(true);

    // Mock export functionality
    setTimeout(() => {
      this.exporting.set(false);
      this.notificationService.success('Monthly report exported to PDF successfully');
    }, 2000);
  }

  getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || '';
  }

  getAttendanceRateClass(rate: number): string {
    if (rate >= 95) return 'text-success';
    if (rate >= 85) return 'text-warning';
    return 'text-danger';
  }

  viewEmployeeDetails(employee: MonthlyEmployeeRecord): void {
    const filters = this.currentFilters();
    const year = filters.year;
    const month = filters.month;

    // Navigate to employee attendance history with employee ID and date range
    this.router.navigate(['/attendance/employee-history'], {
      queryParams: {
        employeeId: employee.employeeId,
        year: year,
        month: month
      }
    });
  }

  onTableAction(action: { action: string; item: MonthlyEmployeeRecord }): void {
    switch (action.action) {
      case 'view':
        this.viewEmployeeDetails(action.item);
        break;
      case 'export':
        this.exportEmployeeReport(action.item);
        break;
    }
  }

  private exportEmployeeReport(employee: MonthlyEmployeeRecord): void {
    this.notificationService.success(`Exporting report for ${employee.employeeName}`);
  }
}