import { Component, OnInit, signal, computed, OnDestroy, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeesService } from '../../employees/employees.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { DepartmentsService } from '../../departments/departments.service';
import { BranchesService } from '../../branches/branches.service';
import { ShiftAssignmentService } from '../../../core/services/shift-assignment.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { DataTableComponent, TableColumn, TableAction, SortEvent } from '../../../shared/components/data-table/data-table.component';
import {
  AttendanceRecord,
  AttendanceTransaction,
  AttendanceStatus,
  TransactionType
} from '../../../shared/models/attendance.model';
import { EmployeeSelectOption, DepartmentDto, EmployeeDto } from '../../../shared/models/employee.model';
import { Branch } from '../../../shared/models/branch.model';
import { ChangeAttendanceShiftModalComponent } from '../change-attendance-shift-modal/change-attendance-shift-modal.component';

@Component({
  selector: 'app-daily-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SearchableSelectComponent, DataTableComponent, ChangeAttendanceShiftModalComponent],
  templateUrl: './daily-attendance.component.html',
  styleUrls: ['./daily-attendance.component.css']
})
export class DailyAttendanceComponent implements OnInit, OnDestroy {
  // Signals for reactive state management
  attendanceRecords = signal<AttendanceRecord[]>([]);
  selectedDate = signal(new Date().toISOString().split('T')[0]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Filter signals
  searchTerm = signal('');
  selectedStatus = signal<AttendanceStatus | null>(null);
  selectedEmployeeId = signal<number | null>(null);
  selectedDepartmentId = signal<number | null>(null);
  selectedBranchId = signal<number | null>(null);

  // Manual calculation signals
  calculating = signal(false);
  calculatingBulk = signal(false);
  manualCalculationDate = signal(new Date().toISOString().split('T')[0]);

  // Pagination and sorting signals
  currentPage = signal(1);
  pageSize = signal(10);
  sortColumn = signal('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Signals for data table component
  tableTotalPages = signal(1);
  tableTotalItems = signal(0);

  // Options for filters
  availableEmployees = signal<EmployeeSelectOption[]>([]);
  availableDepartments = signal<DepartmentDto[]>([]);
  availableBranches = signal<Branch[]>([]);
  loadingEmployees = signal(false);
  loadingDepartments = signal(false);
  loadingBranches = signal(false);

  // Shift change modal signals
  showChangeShiftModal = signal(false);
  selectedAttendanceRecord = signal<AttendanceRecord | null>(null);

  // ViewChild reference to the modal component for proper error handling
  @ViewChild(ChangeAttendanceShiftModalComponent) changeShiftModalComponent?: ChangeAttendanceShiftModalComponent;

  // Computed values
  filteredRecords = computed(() => {
    const records = this.attendanceRecords();
    const search = this.searchTerm().toLowerCase();
    const status = this.selectedStatus();

    // Backend already filters by department, branch, and employee
    // Client-side filtering only handles search and status filters
    return records.filter(record => {
      const matchesSearch = !search ||
        record.employeeName.toLowerCase().includes(search) ||
        record.employeeNumber.toLowerCase().includes(search);

      const matchesStatus = status === null || record.status === status;

      return matchesSearch && matchesStatus;
    });
  });

  // Sorted records
  sortedRecords = computed(() => {
    const records = [...this.filteredRecords()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return records;

    return records.sort((a, b) => {
      let aValue = this.getValueForSorting(a, column);
      let bValue = this.getValueForSorting(b, column);

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return direction === 'asc' ? 1 : -1;
      if (bValue == null) return direction === 'asc' ? -1 : 1;

      // Convert to comparable types
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // Pagination computed values
  totalItems = computed(() => this.sortedRecords().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  // Paginated records
  paginatedRecords = computed(() => {
    const records = this.sortedRecords();
    const page = this.currentPage();
    const size = this.pageSize();
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return records.slice(startIndex, endIndex);
  });

  // Statistics computed from filtered records
  totalEmployees = computed(() => this.filteredRecords().length);
  presentEmployees = computed(() =>
    this.filteredRecords().filter(r => r.status === AttendanceStatus.Present).length
  );
  absentEmployees = computed(() =>
    this.filteredRecords().filter(r => r.status === AttendanceStatus.Absent).length
  );
  lateEmployees = computed(() =>
    this.filteredRecords().filter(r => this.calculateTotalLateMinutes(r) > 0).length
  );


  // Computed select options
  employeeSelectOptions = computed<SearchableSelectOption[]>(() => {
    const options: SearchableSelectOption[] = [
      { value: null, label: this.i18n.t('attendance.filters.all_employees') }
    ];

    this.availableEmployees().forEach(employee => {
      options.push({
        value: employee.id,
        label: employee.name,
        subLabel: employee.employeeNumber
      });
    });

    return options;
  });

  departmentSelectOptions = computed<SearchableSelectOption[]>(() => {
    const options: SearchableSelectOption[] = [
      { value: null, label: this.i18n.t('attendance.filters.all_departments') }
    ];

    this.availableDepartments().forEach(department => {
      options.push({
        value: department.id,
        label: department.name,
        subLabel: department.nameAr || ''
      });
    });

    return options;
  });

  branchSelectOptions = computed<SearchableSelectOption[]>(() => {
    const options: SearchableSelectOption[] = [
      { value: null, label: this.i18n.t('attendance.filters.all_branches') }
    ];

    this.availableBranches().forEach(branch => {
      options.push({
        value: branch.id,
        label: branch.name,
        subLabel: branch.code
      });
    });

    return options;
  });

  // Constants for template
  AttendanceStatus = AttendanceStatus;
  availableStatuses = [
    { value: null, label: 'attendance.filters.all_statuses' },
    { value: AttendanceStatus.Present, label: 'attendance.status.present' },
    { value: AttendanceStatus.Absent, label: 'attendance.status.absent' },
    { value: AttendanceStatus.Late, label: 'attendance.status.late' },
    { value: AttendanceStatus.EarlyLeave, label: 'attendance.status.early_leave' },
    { value: AttendanceStatus.OnLeave, label: 'attendance.status.on_leave' },
    { value: AttendanceStatus.Overtime, label: 'attendance.status.overtime' }
  ];

  // Data table configuration - using computed to avoid change detection issues
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'employeeNumber',
      label: this.i18n.t('attendance.fields.employee_number'),
      sortable: true,
      width: '120px',
      priority: 'high',
      mobileLabel: this.i18n.t('attendance.fields.emp_no')
    },
    {
      key: 'employeeName',
      label: this.i18n.t('attendance.fields.employee_name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.i18n.t('attendance.fields.name')
    },
    {
      key: 'status',
      label: this.i18n.t('attendance.fields.status'),
      sortable: true,
      width: '120px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.i18n.t('attendance.fields.status'),
      renderHtml: true
    },
    {
      key: 'checkIn',
      label: this.i18n.t('attendance.fields.check_in'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.i18n.t('attendance.fields.in')
    },
    {
      key: 'checkOut',
      label: this.i18n.t('attendance.fields.check_out'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.i18n.t('attendance.fields.out')
    },
    {
      key: 'workingHours',
      label: this.i18n.t('attendance.fields.working_hours'),
      sortable: true,
      width: '120px',
      align: 'center',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: this.i18n.t('attendance.fields.work_hrs')
    },
    {
      key: 'scheduledHours',
      label: this.i18n.t('attendance.fields.scheduled_hours'),
      sortable: true,
      width: '120px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.i18n.t('attendance.fields.sched_hrs')
    },
    {
      key: 'overtimeHours',
      label: this.i18n.t('attendance.fields.overtime_hours'),
      sortable: true,
      width: '120px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.i18n.t('attendance.fields.overtime')
    },
    {
      key: 'lateMinutes',
      label: this.i18n.t('attendance.fields.late_minutes'),
      sortable: true,
      width: '90px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.i18n.t('attendance.fields.late')
    },
    {
      key: 'earlyLeaveMinutes',
      label: this.i18n.t('attendance.fields.early_leave_minutes'),
      sortable: true,
      width: '90px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.i18n.t('attendance.fields.early')
    },
    {
      key: 'totalLateMinutes',
      label: this.i18n.t('attendance.fields.total_late'),
      sortable: true,
      width: '90px',
      align: 'center',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: this.i18n.t('attendance.fields.total_late')
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.i18n.t('attendance.actions.view_details'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => true
    },
    {
      key: 'edit',
      label: this.i18n.t('attendance.actions.edit_record'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => true
    },
    {
      key: 'change-shift',
      label: this.i18n.t('attendance.actions.change_shift'),
      icon: 'fa-clock',
      color: 'warning',
      condition: () => true
    },
    {
      key: 'recalculate',
      label: this.i18n.t('attendance.actions.recalculate'),
      icon: 'fa-calculator',
      color: 'info',
      condition: () => true
    }
  ]);


  constructor(
    private attendanceService: AttendanceService,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private branchesService: BranchesService,
    private shiftAssignmentService: ShiftAssignmentService,
    public i18n: I18nService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Update table signals when computed values change
    effect(() => {
      this.tableTotalPages.set(this.totalPages());
      this.tableTotalItems.set(this.totalItems());
    });
  }



  /**
   * Calculate attendance rate percentage for current records
   */
  getAttendanceRatePercentage(): number {
    const records = this.filteredRecords();
    const totalRecords = records.length;

    if (totalRecords === 0) {
      return 0;
    }

    const presentRecords = records.filter(r =>
      r.status === AttendanceStatus.Present ||
      r.status === AttendanceStatus.Late ||
      r.status === AttendanceStatus.Overtime
    ).length;

    return Math.round((presentRecords / totalRecords) * 100);
  }

  ngOnInit(): void {
    // Check if there's a date parameter in the query string
    this.route.queryParams.subscribe(params => {
      const dateParam = params['date'];
      if (dateParam) {
        // Restore the previously selected date
        this.selectedDate.set(dateParam);
        this.manualCalculationDate.set(dateParam);
      }
    });

    this.loadFilterOptions();
    // Don't auto-load data immediately, wait for user to select filters or load with no filters as warning
    this.checkInitialLoad();
  }

  /**
   * Check if we should load data initially or show filter warning
   */
  private checkInitialLoad(): void {
    // Try to load data without filters first, but handle the expected error gracefully
    this.loading.set(true);
    this.error.set(null);

    const date = this.selectedDate();
    console.log('=== DEBUG: Initial load attempt ===');
    console.log('Date:', date);

    this.attendanceService.getDailyAttendance(date).subscribe({
      next: (records) => {
        console.log('=== DEBUG: Initial load successful ===');
        console.log('Records count:', records.length);
        this.attendanceRecords.set(records);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.log('=== DEBUG: Initial load failed (expected if filters required) ===');
        console.log('Error:', error);

        // If the error is about filters being required, show a helpful message instead of error
        if (error?.status === 400 && (error?.error?.includes?.('filter') || error?.error?.includes?.('must be specified'))) {
          this.loading.set(false);
          this.error.set(null); // Don't show as error, this is expected
          this.attendanceRecords.set([]); // Show empty state
        } else {
          // For other errors, show the error message
          let errorMessage = this.getDetailedErrorMessage(error);
          this.error.set(errorMessage);
          this.loading.set(false);
          this.notificationService.error(errorMessage);
        }
      }
    });
  }

  ngOnDestroy(): void {
  }

  /**
   * Load daily attendance records for selected date
   */
  loadDailyAttendance(): void {
    this.loading.set(true);
    this.error.set(null);

    const date = this.selectedDate();
    const branchId = this.selectedBranchId();
    const departmentId = this.selectedDepartmentId();
    const employeeId = this.selectedEmployeeId();

    console.log('=== DEBUG: Loading daily attendance ===');
    console.log('Date:', date);
    console.log('Branch ID:', branchId);
    console.log('Department ID:', departmentId);
    console.log('Employee ID:', employeeId);
    console.log('Current records before loading:', this.attendanceRecords().length);

    this.attendanceService.getDailyAttendance(date, branchId || undefined, departmentId || undefined, employeeId || undefined).subscribe({
      next: (records) => {
        console.log('=== DEBUG: Received attendance records ===');
        console.log('Records count:', records.length);
        console.log('Records data:', records);

        // Debug time data specifically
        if (records.length > 0) {
          const firstRecord = records[0];
          console.log('=== DEBUG: First record time fields ===');
          console.log('checkInTime:', firstRecord.checkInTime);
          console.log('checkOutTime:', firstRecord.checkOutTime);
          console.log('actualCheckInTime:', firstRecord.actualCheckInTime);
          console.log('actualCheckOutTime:', firstRecord.actualCheckOutTime);
          console.log('scheduledStartTime:', firstRecord.scheduledStartTime);
          console.log('scheduledEndTime:', firstRecord.scheduledEndTime);
        }

        this.attendanceRecords.set(records);
        this.loading.set(false);
        console.log('Records after setting:', this.attendanceRecords().length);
        console.log('Filtered records count:', this.filteredRecords().length);
      },
      error: (error: any) => {
        console.error('=== DEBUG: Error loading daily attendance ===');
        console.error('Error object:', error);
        console.error('Error status:', error?.status);
        console.error('Error message:', error?.message);
        console.error('Error error:', error?.error);

        let errorMessage = this.getDetailedErrorMessage(error);

        this.error.set(errorMessage);
        this.loading.set(false);
        this.notificationService.error(errorMessage);
      }
    });
  }


  /**
   * Handle date change
   */
  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedDate.set(target.value);
    this.loadDailyAttendance();
  }

  /**
   * Handle search input change
   */
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  /**
   * Handle status filter change
   */
  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value === '' ? null : parseInt(target.value);
    this.selectedStatus.set(value as AttendanceStatus | null);
  }

  /**
   * Handle employee filter change from searchable select
   */
  onEmployeeSelectionChange(employeeId: number | null): void {
    this.selectedEmployeeId.set(employeeId);
    this.loadDailyAttendance(); // Reload data when employee filter changes

    // If branch is selected and employee filter has value, load employees for that branch
    if (employeeId === null && this.selectedBranchId()) {
      this.loadEmployeesForBranch(this.selectedBranchId()!);
    }
  }

  /**
   * Handle department filter change from searchable select
   */
  onDepartmentSelectionChange(departmentId: number | null): void {
    this.selectedDepartmentId.set(departmentId);
    this.loadDailyAttendance(); // Reload data when department filter changes
  }

  /**
   * Handle branch filter change from searchable select
   */
  onBranchSelectionChange(branchId: number | null): void {
    this.selectedBranchId.set(branchId);
    this.loadDailyAttendance(); // Reload data when branch filter changes

    // Clear employee selection and load employees for the selected branch
    this.selectedEmployeeId.set(null);
    if (branchId) {
      this.loadEmployeesForBranch(branchId);
    } else {
      // Load all employees if no branch is selected
      this.loadEmployeesForBranch();
    }
  }

  /**
   * Load employees for a specific branch (permission-based)
   */
  private loadEmployeesForBranch(branchId?: number): void {
    this.loadingEmployees.set(true);
    this.employeesService.getEmployeesForSelection(branchId).subscribe({
      next: (employees: EmployeeSelectOption[]) => {
        this.availableEmployees.set(employees);
        this.loadingEmployees.set(false);
      },
      error: (error: any) => {
        console.error('Error loading employees for branch:', error);
        this.loadingEmployees.set(false);
      }
    });
  }

  /**
   * Load filter options from API with permission-based access
   */
  private loadFilterOptions(): void {
    // Load employees that user has access to
    this.loadingEmployees.set(true);
    this.employeesService.getEmployeesForSelection().subscribe({
      next: (employees: EmployeeSelectOption[]) => {
        this.availableEmployees.set(employees);
        this.loadingEmployees.set(false);
      },
      error: (error: any) => {
        console.error('Error loading employees:', error);
        this.loadingEmployees.set(false);
      }
    });

    // Load departments
    this.loadingDepartments.set(true);
    this.departmentsService.getDepartments({}).subscribe({
      next: (departments: DepartmentDto[]) => {
        this.availableDepartments.set(departments);
        this.loadingDepartments.set(false);
      },
      error: (error: any) => {
        console.error('Error loading departments:', error);
        this.loadingDepartments.set(false);
      }
    });

    // Load branches
    this.loadingBranches.set(true);
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (result) => {
        this.availableBranches.set(result.items);
        this.loadingBranches.set(false);
      },
      error: (error: any) => {
        console.error('Error loading branches:', error);
        this.loadingBranches.set(false);
      }
    });
  }

  /**
   * Get status badge class for attendance status
   */
  getStatusBadgeClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Present:
        return 'badge bg-success';
      case AttendanceStatus.Absent:
        return 'badge bg-danger';
      case AttendanceStatus.Late:
        return 'badge bg-warning';
      case AttendanceStatus.EarlyLeave:
        return 'badge bg-warning';
      case AttendanceStatus.OnLeave:
        return 'badge bg-info';
      case AttendanceStatus.DayOff:
        return 'badge bg-secondary';
      case AttendanceStatus.Overtime:
        return 'badge bg-primary';
      case AttendanceStatus.Incomplete:
        return 'badge bg-danger';
      case AttendanceStatus.Holiday:
        return 'badge bg-secondary';
      case AttendanceStatus.SickLeave:
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  }

  /**
   * Get status text translation key
   */
  getStatusText(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Present:
        return 'attendance.status.present';
      case AttendanceStatus.Absent:
        return 'attendance.status.absent';
      case AttendanceStatus.Late:
        return 'attendance.status.late';
      case AttendanceStatus.EarlyLeave:
        return 'attendance.status.early_leave';
      case AttendanceStatus.OnLeave:
        return 'attendance.status.on_leave';
      case AttendanceStatus.DayOff:
        return 'attendance.status.day_off';
      case AttendanceStatus.Overtime:
        return 'attendance.status.overtime';
      case AttendanceStatus.Incomplete:
        return 'attendance.status.incomplete';
      case AttendanceStatus.Holiday:
        return 'attendance.status.holiday';
      case AttendanceStatus.SickLeave:
        return 'attendance.status.sick_leave';
      case AttendanceStatus.Pending:
        return 'attendance.status.pending';
      default:
        return 'attendance.status.pending';
    }
  }

  /**
   * Format time for display
   */
  formatTime(time: string | null): string {
    if (!time) return '--:--';

    try {
      // Handle different time formats
      let timeToFormat = time;

      // If it's a full datetime, extract just the time part
      if (time.includes('T')) {
        const timePart = time.split('T')[1];
        timeToFormat = timePart.split('Z')[0]; // Remove Z if present
      }

      // If it already includes date, use it directly
      if (timeToFormat.includes(':')) {
        const date = new Date(`1970-01-01T${timeToFormat}`);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        }
      }

      return timeToFormat;
    } catch {
      return time || '--:--';
    }
  }

  /**
   * Get check-in time with fallback to actual check-in time
   */
  getCheckInTime(record: AttendanceRecord): string | null {
    return record.checkInTime || record.actualCheckInTime || null;
  }

  /**
   * Get check-out time with fallback to actual check-out time
   */
  getCheckOutTime(record: AttendanceRecord): string | null {
    return record.checkOutTime || record.actualCheckOutTime || null;
  }



  /**
   * Format hours (convert decimal hours to hours and minutes)
   */
  formatHours(hours: number): string {
    if (!hours || hours === 0) return '0h 0m';

    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);

    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  }

  /**
   * Format late time from minutes
   */
  formatLateTime(lateMinutes: number): string {
    if (!lateMinutes || lateMinutes === 0) return '--';

    const hours = Math.floor(lateMinutes / 60);
    const minutes = lateMinutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  /**
   * Calculate total late minutes (late arrival + early departure)
   */
  calculateTotalLateMinutes(record: AttendanceRecord): number {
    const lateMinutes = record.lateMinutes || 0;
    const earlyLeaveMinutes = record.earlyLeaveMinutes || 0;
    return lateMinutes + earlyLeaveMinutes;
  }

  /**
   * Format status for table display with badge styling
   */
  formatStatusForTable(status: AttendanceStatus): string {
    const statusText = this.i18n.t(this.getStatusText(status));
    const badgeClass = this.getStatusBadgeClass(status);
    return `<span class="${badgeClass}">${statusText}</span>`;
  }

  /**
   * Get CSS class for working hours based on comparison with scheduled hours
   */
  getWorkingHoursClass(workingHours: number, scheduledHours: number): string {
    if (!workingHours || !scheduledHours) return 'text-muted';

    if (workingHours >= scheduledHours) {
      return 'text-success'; // Met or exceeded scheduled hours
    } else if (workingHours >= scheduledHours * 0.8) {
      return 'text-warning'; // Close to scheduled hours (80%+)
    } else {
      return 'text-danger'; // Significantly below scheduled hours
    }
  }

  /**
   * Get CSS class for late time display
   */
  getLateTimeClass(lateMinutes: number): string {
    if (!lateMinutes || lateMinutes === 0) return 'text-muted';

    if (lateMinutes <= 15) {
      return 'text-warning'; // Minor lateness (15 minutes or less)
    } else {
      return 'text-danger'; // Significant lateness (more than 15 minutes)
    }
  }

  /**
   * Navigate to daily attendance detail page for specific employee and date
   */
  viewDailyAttendanceDetail(employeeId: number): void {
    this.router.navigate(['/attendance/daily-detail', employeeId, this.selectedDate()]);
  }

  /**
   * Navigate to employee attendance detail page
   */
  viewEmployeeDetail(employeeId: number): void {
    this.router.navigate(['/attendance/employee', employeeId]);
  }

  /**
   * Navigate to edit attendance record page
   */
  editAttendanceRecord(record: AttendanceRecord): void {
    // Navigate to edit page using the attendance record ID, passing the current date as a query parameter
    this.router.navigate(['/attendance/edit', record.id], {
      queryParams: { returnDate: this.selectedDate() }
    });
  }

  /**
   * Handle table sort event
   */
  onSort(event: SortEvent): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
    this.currentPage.set(1); // Reset to first page when sorting
  }

  /**
   * Handle page change event
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Handle page size change event
   */
  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1); // Reset to first page when page size changes
  }

  /**
   * Get value for sorting
   */
  private getValueForSorting(record: AttendanceRecord, column: string): any {
    switch (column) {
      case 'employeeNumber':
        return record.employeeNumber;
      case 'employeeName':
        return record.employeeName;
      case 'status':
        return record.status || 0;
      case 'workingHours':
        return record.workingHours || 0;
      case 'scheduledHours':
        return record.scheduledHours || 0;
      case 'lateMinutes':
        return record.lateMinutes || 0;
      default:
        return record[column as keyof AttendanceRecord];
    }
  }

  /**
   * Handle table action clicks
   */
  onActionClick(event: {action: string, item: any}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewDailyAttendanceDetail(item.employeeId);
        break;
      case 'edit':
        this.editAttendanceRecord(item);
        break;
      case 'change-shift':
        this.openChangeShiftModal(item);
        break;
      case 'recalculate':
        this.recalculateEmployeeAttendance(item.employeeId);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Transform attendance records for data table - using computed to avoid refresh issues
   */
  tableData = computed(() => {
    return this.paginatedRecords().map(record => ({
      ...record,
      status: this.formatStatusForTable(record.status),
      checkIn: this.formatTime(this.getCheckInTime(record)),
      checkOut: this.formatTime(this.getCheckOutTime(record)),
      workingHours: this.formatHours(record.workingHours),
      scheduledHours: this.formatHours(record.scheduledHours),
      overtimeHours: this.formatHours(record.overtimeHours),
      lateMinutes: this.formatLateTime(record.lateMinutes),
      earlyLeaveMinutes: this.formatLateTime(record.earlyLeaveMinutes),
      totalLateMinutes: this.formatLateTime(this.calculateTotalLateMinutes(record))
    }));
  });

  /**
   * Export daily attendance data
   */
  exportData(): void {
    const records = this.filteredRecords();
    if (records.length === 0) {
      this.notificationService.warning('No data to export');
      return;
    }

    // Implement CSV export
    const csvContent = this.generateCSV(records);
    this.downloadCSV(csvContent, `daily-attendance-${this.selectedDate()}.csv`);
    this.notificationService.success('Data exported successfully');
  }

  /**
   * Generate CSV content from records
   */
  private generateCSV(records: AttendanceRecord[]): string {
    const headers = [
      'Employee Number',
      'Employee Name',
      'Status',
      'Check In',
      'Check Out',
      'Working Hours',
      'Scheduled Hours',
      'Overtime Hours',
      'Late Minutes',
      'Early Leave Minutes',
      'Total Late'
    ];

    const rows = records.map(record => [
      record.employeeNumber,
      record.employeeName,
      this.i18n.t(this.getStatusText(record.status)),
      this.formatTime(this.getCheckInTime(record)),
      this.formatTime(this.getCheckOutTime(record)),
      this.formatHours(record.workingHours),
      this.formatHours(record.scheduledHours),
      this.formatHours(record.overtimeHours),
      this.formatLateTime(record.lateMinutes),
      this.formatLateTime(record.earlyLeaveMinutes),
      this.formatLateTime(this.calculateTotalLateMinutes(record))
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }

  /**
   * Download CSV file
   */
  private downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Manual refresh button
   */
  onRefresh(): void {
    this.loadDailyAttendance();
  }

  /**
   * Track by function for ngFor
   */
  trackByEmployeeId(index: number, record: AttendanceRecord): number {
    return record.employeeId;
  }

  /**
   * Get detailed error message based on error response
   */
  private getDetailedErrorMessage(error: any): string {
    if (error?.status === 400) {
      if (error?.error && typeof error.error === 'string') {
        if (error.error.includes('At least one filter') || error.error.includes('must be specified')) {
          return 'To view attendance records, please select at least one filter: Employee, Department, or Branch. You can also contact your administrator if you need access to view all records.';
        }
        return error.error;
      }
      return 'Please select at least one filter (Employee, Department, or Branch) to view attendance records.';
    }

    if (error?.status === 403) {
      return 'You do not have permission to view attendance records. Please contact your administrator.';
    }

    if (error?.status === 404) {
      return 'No attendance records found for the selected criteria.';
    }

    if (error?.status === 500) {
      return 'Server error occurred while loading attendance records. Please try again or contact support.';
    }

    if (error?.error && typeof error.error === 'string') {
      return error.error;
    }

    if (error?.message) {
      return error.message;
    }

    return 'Failed to load daily attendance records. Please try again.';
  }

  /**
   * Check if any filter is applied
   */
  hasActiveFilters(): boolean {
    return !!(this.selectedEmployeeId() || this.selectedDepartmentId() || this.selectedBranchId());
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.selectedEmployeeId.set(null);
    this.selectedDepartmentId.set(null);
    this.selectedBranchId.set(null);
    this.selectedStatus.set(null);
    this.searchTerm.set('');

    // Reset form elements
    const selects = document.querySelectorAll('select');
    selects.forEach(select => (select as HTMLSelectElement).value = '');

    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) searchInput.value = '';

    // Reload all employees when filters are cleared
    this.loadEmployeesForBranch();

    this.loadDailyAttendance();
  }

  // ====================================================================
  // ENHANCED MANUAL CALCULATION METHODS
  // ====================================================================

  /**
   * Manually calculate attendance for a specific employee on the selected date
   */
  async recalculateEmployeeAttendance(employeeId: number): Promise<void> {
    const date = this.selectedDate();

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('attendance.actions.recalculate'),
      message: this.i18n.t('attendance.confirmations.recalculate_employee'),
      confirmText: this.i18n.t('app.confirm'),
      cancelText: this.i18n.t('app.cancel'),
      confirmButtonClass: 'btn-info',
      icon: 'fa-calculator',
      iconClass: 'text-info'
    });

    if (!result.confirmed) {
      return;
    }

    this.calculating.set(true);

    this.attendanceService.calculateAttendanceForEmployeeDate(employeeId, date).subscribe({
      next: (updatedRecord) => {
        // Update the record in the current list
        const records = this.attendanceRecords();
        const index = records.findIndex(r => r.employeeId === employeeId);
        if (index !== -1) {
          const updatedRecords = [...records];
          updatedRecords[index] = updatedRecord;
          this.attendanceRecords.set(updatedRecords);
        }

        this.calculating.set(false);
        this.notificationService.success(this.i18n.t('attendance.messages.recalculation_success'));
      },
      error: (error: any) => {
        console.error('Error recalculating attendance:', error);
        this.calculating.set(false);

        let errorMessage = 'Failed to recalculate attendance';
        if (error?.error && typeof error.error === 'string') {
          errorMessage = error.error;
        }

        this.notificationService.error(errorMessage);
      }
    });
  }

  /**
   * Manually calculate attendance for all employees on the selected date
   */
  calculateAllEmployees(forceRecalculate: boolean = false): void {
    this.calculateAllEmployeesForDate(this.selectedDate(), forceRecalculate);
  }

  /**
   * Manually calculate attendance for all employees on a specific date
   */
  async calculateAllEmployeesForDate(date: string, forceRecalculate: boolean = false): Promise<void> {
    const actionTitle = forceRecalculate
      ? this.i18n.t('attendance.actions.recalculate_all')
      : this.i18n.t('attendance.actions.generate_missing');

    const confirmMessage = forceRecalculate
      ? this.i18n.t('attendance.confirmations.recalculate_all').replace('{{date}}', date)
      : this.i18n.t('attendance.confirmations.generate_missing').replace('{{date}}', date);

    const result = await this.confirmationService.confirm({
      title: actionTitle,
      message: confirmMessage,
      confirmText: this.i18n.t('app.confirm'),
      cancelText: this.i18n.t('app.cancel'),
      confirmButtonClass: forceRecalculate ? 'btn-warning' : 'btn-info',
      icon: forceRecalculate ? 'fa-calculator' : 'fa-plus',
      iconClass: forceRecalculate ? 'text-warning' : 'text-info'
    });

    if (!result.confirmed) {
      return;
    }

    this.calculatingBulk.set(true);

    this.attendanceService.calculateAttendanceForDate(date, forceRecalculate).subscribe({
      next: (result) => {
        this.calculatingBulk.set(false);

        const successMessage = this.i18n.t('attendance.messages.bulk_calculation_success')
          .replace('{{generated}}', result.recordsGenerated.toString())
          .replace('{{updated}}', result.recordsUpdated.toString())
          .replace('{{date}}', date);

        this.notificationService.success(successMessage);

        // Reload the data if calculating for the currently selected date
        if (date === this.selectedDate()) {
          this.loadDailyAttendance();
        }
      },
      error: (error: any) => {
        console.error('Error calculating attendance for all employees:', error);
        this.calculatingBulk.set(false);

        let errorMessage = this.i18n.t('attendance.messages.calculation_failed');
        if (error?.error && typeof error.error === 'string') {
          errorMessage = error.error;
        }

        this.notificationService.error(errorMessage);
      }
    });
  }

  /**
   * Force recalculate all employees (with existing records)
   */
  forceRecalculateAll(): void {
    this.calculateAllEmployees(true);
  }

  /**
   * Generate attendance for employees without records
   */
  generateMissingAttendance(): void {
    this.calculateAllEmployees(false);
  }

  /**
   * Manual calculation for specific date (generate missing records)
   */
  generateMissingAttendanceForDate(): void {
    this.calculateAllEmployeesForDate(this.manualCalculationDate(), false);
  }

  /**
   * Manual calculation for specific date (force recalculate all)
   */
  forceRecalculateAllForDate(): void {
    this.calculateAllEmployeesForDate(this.manualCalculationDate(), true);
  }

  /**
   * Update manual calculation date
   */
  onManualCalculationDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.manualCalculationDate.set(input.value);
  }

  /**
   * Check if manual calculation features should be enabled (admin/manager permissions)
   */
  canManuallyCalculate(): boolean {
    // This should check user permissions - for now returning true
    // In real implementation, check if user has admin or attendance management permissions
    return true;
  }

  /**
   * Check if any employee has incomplete status that might benefit from recalculation
   */
  hasIncompleteRecords(): boolean {
    return this.filteredRecords().some(record =>
      record.status === AttendanceStatus.Incomplete ||
      record.status === AttendanceStatus.Pending
    );
  }

  /**
   * Get count of employees without attendance records (for information)
   */
  getMissingRecordsInfo(): string {
    const totalExpected = this.availableEmployees().length;
    const currentRecords = this.attendanceRecords().length;
    const missing = Math.max(0, totalExpected - currentRecords);

    if (missing > 0) {
      return this.i18n.t('attendance.info.missing_records').replace('{{count}}', missing.toString());
    }

    return '';
  }

  // ====================================================================
  // SHIFT CHANGE FUNCTIONALITY
  // ====================================================================

  /**
   * Open shift change modal for an attendance record
   */
  openChangeShiftModal(attendanceRecord: AttendanceRecord): void {
    this.selectedAttendanceRecord.set(attendanceRecord);
    this.showChangeShiftModal.set(true);
  }

  /**
   * Close shift change modal
   */
  closeChangeShiftModal(): void {
    this.showChangeShiftModal.set(false);
    this.selectedAttendanceRecord.set(null);
  }

  /**
   * Handle shift change for an attendance record
   */
  onAttendanceShiftChanged(event: {attendanceRecord: AttendanceRecord, shiftId: number, notes?: string}): void {
    // Call the attendance shift change API
    this.attendanceService.changeAttendanceShift(
      event.attendanceRecord.id,
      event.shiftId,
      event.notes || 'Shift changed from Daily Attendance'
    ).subscribe({
      next: (updatedRecord) => {
        this.notificationService.success(
          `Shift has been successfully changed for ${event.attendanceRecord.employeeName}. Attendance has been recalculated.`
        );

        // Update the record in the current list
        const records = this.attendanceRecords();
        const index = records.findIndex(r => r.id === event.attendanceRecord.id);
        if (index !== -1) {
          const updatedRecords = [...records];
          updatedRecords[index] = updatedRecord;
          this.attendanceRecords.set(updatedRecords);
        }

        // Reset the modal state
        this.closeChangeShiftModal();
      },
      error: (error) => {
        console.error('Failed to change shift:', error);

        // Extract meaningful error message from various error response formats
        let errorMessage = 'An unexpected error occurred while changing shift';

        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error.title) {
            errorMessage = error.error.title;
          } else if (error.error.errors) {
            // Handle validation errors
            const firstError = Object.values(error.error.errors)[0];
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = firstError[0];
            }
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to the server. Please check your connection.';
        } else if (error.status >= 500) {
          errorMessage = 'A server error occurred. Please try again later.';
        } else if (error.status === 404) {
          errorMessage = 'The attendance record was not found.';
        } else if (error.status === 403) {
          errorMessage = 'You do not have permission to change shifts.';
        } else if (error.status === 401) {
          errorMessage = 'Your session has expired. Please log in again.';
        }

        // Show error message to user via the modal
        const modalComponent = this.getModalComponent();
        if (modalComponent) {
          modalComponent.showError(errorMessage);
        } else {
          // Fallback to notification service
          this.notificationService.error(errorMessage);
        }
      }
    });
  }

  /**
   * Get reference to the modal component for error handling
   */
  private getModalComponent(): ChangeAttendanceShiftModalComponent | undefined {
    return this.changeShiftModalComponent;
  }

}