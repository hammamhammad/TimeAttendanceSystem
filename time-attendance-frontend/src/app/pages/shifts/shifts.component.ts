import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { ShiftsService } from './shifts.service';
import { BranchesService } from '../branches/branches.service';
import {
  Shift,
  ShiftType,
  ShiftStatus,
  ShiftsResponse,
  CreateShiftRequest,
  UpdateShiftRequest,
  CreateShiftPeriodRequest,
  UpdateShiftPeriodRequest
} from '../../shared/models/shift.model';
import { Branch } from '../../shared/models/branch.model';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';
import { SearchableSelectComponent, SearchableSelectOption } from '../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective, SearchableSelectComponent],
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {
  private shiftsService = inject(ShiftsService);
  private branchesService = inject(BranchesService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    SHIFT_CREATE: `${PermissionResources.SHIFT}.${PermissionActions.CREATE}`,
    SHIFT_READ: `${PermissionResources.SHIFT}.${PermissionActions.READ}`,
    SHIFT_UPDATE: `${PermissionResources.SHIFT}.${PermissionActions.UPDATE}`,
    SHIFT_DELETE: `${PermissionResources.SHIFT}.${PermissionActions.DELETE}`,
    SHIFT_MANAGE: `${PermissionResources.SHIFT}.${PermissionActions.MANAGE}`
  };

  // Enum references for template
  readonly ShiftType = ShiftType;
  readonly ShiftStatus = ShiftStatus;

  // Page size options for searchable select
  get pageSizeSelectOptions(): SearchableSelectOption[] {
    return [
      { value: '10', label: '10' },
      { value: '25', label: '25' },
      { value: '50', label: '50' }
    ];
  }

  // Status options for searchable select
  get statusSelectOptions(): SearchableSelectOption[] {
    return [
      { value: ShiftStatus.Active.toString(), label: this.t('shifts.status.active') },
      { value: ShiftStatus.Inactive.toString(), label: this.t('shifts.status.inactive') },
      { value: ShiftStatus.Draft.toString(), label: this.t('shifts.status.draft') },
      { value: ShiftStatus.Archived.toString(), label: this.t('shifts.status.archived') }
    ];
  }

  // Signals for state management
  loading = signal(false);
  shifts = signal<Shift[]>([]);
  branches = signal<Branch[]>([]);

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);

  // Filters
  searchTerm = '';
  branchFilter: number | undefined = undefined;

  // Modal state
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedShift = signal<Shift | null>(null);

  // Form state
  shiftForm = {
    name: '',
    description: '',
    shiftType: ShiftType.TimeBased,
    status: ShiftStatus.Active,
    requiredHours: undefined as number | undefined,
    isCheckInRequired: true,
    isAutoCheckOut: false,
    allowFlexibleHours: false,
    flexMinutesBefore: undefined as number | undefined,
    flexMinutesAfter: undefined as number | undefined,
    gracePeriodMinutes: undefined as number | undefined,
    shiftPeriods: [] as Array<{
      id?: number;
      periodOrder: number;
      startTime: string;
      endTime: string;
    }>
  };

  submitting = signal(false);

  ngOnInit(): void {
    this.loadBranches();
    this.loadShifts();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadBranches(): void {
    this.branchesService.getBranches(1, 1000).subscribe({
      next: (response) => {
        this.branches.set(response.items);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
      }
    });
  }

  loadShifts(): void {
    this.loading.set(true);

    const search = this.searchTerm.trim() || undefined;

    this.shiftsService.getShifts(
      this.currentPage(),
      this.pageSize(),
      search
    ).subscribe({
      next: (response: ShiftsResponse) => {
        this.shifts.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load shifts:', error);
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadShifts();
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadShifts();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadShifts();
  }

  onPageSizeSelectionChange(pageSizeStr: string): void {
    this.pageSize.set(parseInt(pageSizeStr));
    this.onPageSizeChange();
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);
    this.loadShifts();
  }

  getShiftTypeText(shiftType: ShiftType): string {
    return shiftType === ShiftType.TimeBased
      ? this.t('shifts.types.timeBased')
      : this.t('shifts.types.hoursOnly');
  }

  getShiftStatusText(status: ShiftStatus): string {
    switch (status) {
      case ShiftStatus.Active:
        return this.t('shifts.status.active');
      case ShiftStatus.Inactive:
        return this.t('shifts.status.inactive');
      case ShiftStatus.Draft:
        return this.t('shifts.status.draft');
      case ShiftStatus.Archived:
        return this.t('shifts.status.archived');
      default:
        return this.t('shifts.status.active');
    }
  }

  getShiftStatusClass(status: ShiftStatus): string {
    switch (status) {
      case ShiftStatus.Active:
        return 'bg-success';
      case ShiftStatus.Inactive:
        return 'bg-secondary';
      case ShiftStatus.Draft:
        return 'bg-warning';
      case ShiftStatus.Archived:
        return 'bg-dark';
      default:
        return 'bg-success';
    }
  }

  formatTime(timeString: string): string {
    return timeString; // Already in HH:mm format
  }

  formatHours(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  }

  getShiftTypeBadgeClass(shiftType: ShiftType): string {
    return shiftType === ShiftType.TimeBased ? 'badge-primary' : 'badge-info';
  }

  getPeriodTypeText(period: { startTime: string; endTime: string }): string {
    const isNight = this.isNightShift(period.startTime, period.endTime);
    return isNight ? this.t('shifts.periodTypes.nightShift') : this.t('shifts.periodTypes.dayShift');
  }

  getPeriodHoursText(period: { startTime: string; endTime: string }): string {
    const hours = this.calculatePeriodHours(period.startTime, period.endTime);
    return this.formatHours(hours);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // CRUD Operations
  onCreateShift(): void {
    this.router.navigate(['/shifts/create']);
  }

  onEditShift(shift: Shift): void {
    this.router.navigate(['/shifts', shift.id, 'edit']);
  }

  onDeleteShift(shift: Shift): void {
    this.selectedShift.set(shift);
    this.showDeleteModal.set(true);
  }

  onSubmitCreate(): void {
    if (!this.isFormValid()) return;

    this.submitting.set(true);
    const request: CreateShiftRequest = {
      name: this.shiftForm.name.trim(),
      description: this.shiftForm.description.trim() || undefined,
      shiftType: this.shiftForm.shiftType,
      status: this.shiftForm.status,
      requiredHours: this.shiftForm.requiredHours,
      isCheckInRequired: this.shiftForm.isCheckInRequired,
      isAutoCheckOut: this.shiftForm.isAutoCheckOut,
      allowFlexibleHours: this.shiftForm.allowFlexibleHours,
      flexMinutesBefore: this.shiftForm.flexMinutesBefore,
      flexMinutesAfter: this.shiftForm.flexMinutesAfter,
      gracePeriodMinutes: this.shiftForm.gracePeriodMinutes,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0
        ? this.shiftForm.shiftPeriods.map(sp => ({
            periodOrder: sp.periodOrder,
            startTime: sp.startTime,
            endTime: sp.endTime
          } as CreateShiftPeriodRequest))
        : undefined
    };

    this.shiftsService.createShift(request).subscribe({
      next: () => {
        this.showCreateModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to create shift:', error);
        this.submitting.set(false);
      }
    });
  }

  onSubmitEdit(): void {
    if (!this.isFormValid() || !this.selectedShift()) return;

    this.submitting.set(true);
    const request: UpdateShiftRequest = {
      name: this.shiftForm.name.trim(),
      description: this.shiftForm.description.trim() || undefined,
      shiftType: this.shiftForm.shiftType,
      status: this.shiftForm.status,
      requiredHours: this.shiftForm.requiredHours,
      isCheckInRequired: this.shiftForm.isCheckInRequired,
      isAutoCheckOut: this.shiftForm.isAutoCheckOut,
      allowFlexibleHours: this.shiftForm.allowFlexibleHours,
      flexMinutesBefore: this.shiftForm.flexMinutesBefore,
      flexMinutesAfter: this.shiftForm.flexMinutesAfter,
      gracePeriodMinutes: this.shiftForm.gracePeriodMinutes,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0
        ? this.shiftForm.shiftPeriods.map(sp => ({
            id: sp.id,
            periodOrder: sp.periodOrder,
            startTime: sp.startTime,
            endTime: sp.endTime
          } as UpdateShiftPeriodRequest))
        : undefined
    };

    this.shiftsService.updateShift(this.selectedShift()!.id, request).subscribe({
      next: () => {
        this.showEditModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to update shift:', error);
        this.submitting.set(false);
      }
    });
  }

  onConfirmDelete(): void {
    if (!this.selectedShift()) return;

    this.submitting.set(true);
    this.shiftsService.deleteShift(this.selectedShift()!.id).subscribe({
      next: () => {
        this.showDeleteModal.set(false);
        this.loadShifts();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to delete shift:', error);
        this.submitting.set(false);
      }
    });
  }

  onCloseModal(): void {
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedShift.set(null);
    this.submitting.set(false);
  }

  // Shift Type Change Handler
  onShiftTypeChange(): void {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = undefined;
      this.shiftForm.flexMinutesAfter = undefined;
      this.shiftForm.gracePeriodMinutes = undefined;
      this.shiftForm.shiftPeriods = [];
    } else {
      this.shiftForm.requiredHours = undefined;
      if (this.shiftForm.shiftPeriods.length === 0) {
        this.addShiftPeriod();
      }
    }
  }

  // Flexible Hours Change Handler
  onFlexibleHoursChange(): void {
    if (!this.shiftForm.allowFlexibleHours) {
      // When flexible hours is disabled, clear flex values
      this.shiftForm.flexMinutesBefore = undefined;
      this.shiftForm.flexMinutesAfter = undefined;
    }
  }

  // Business Rule Methods
  calculatePeriodHours(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 0;

    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    if (end > start) {
      // Normal day period
      return (end - start) / (1000 * 60 * 60);
    } else if (end < start) {
      // Night period spanning midnight
      const hoursToMidnight = (24 * 60 * 60 * 1000 - start) / (1000 * 60 * 60);
      const hoursFromMidnight = end / (1000 * 60 * 60);
      return hoursToMidnight + hoursFromMidnight;
    } else {
      // Same start and end time
      return 0;
    }
  }

  isNightShift(startTime: string, endTime: string): boolean {
    if (!startTime || !endTime) return false;
    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);
    return end < start;
  }

  getTotalShiftHours(): number {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      return this.shiftForm.requiredHours || 0;
    }

    return this.shiftForm.shiftPeriods.reduce((total, period) => {
      return total + this.calculatePeriodHours(period.startTime, period.endTime);
    }, 0);
  }

  private parseTime(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60 + minutes) * 60 * 1000; // Convert to milliseconds
  }

  validateBusinessRules(): string[] {
    const errors: string[] = [];

    // Rule 8: A shift must define either (Start/End times) or (Hours per day)
    if (this.shiftForm.shiftType === ShiftType.TimeBased) {
      if (this.shiftForm.shiftPeriods.length === 0) {
        errors.push(this.t('shifts.validation.timeBased.periodsRequired'));
      }

      if (this.shiftForm.requiredHours !== undefined) {
        errors.push(this.t('shifts.validation.timeBased.noRequiredHours'));
      }
    } else if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      if (this.shiftForm.shiftPeriods.length > 0) {
        errors.push(this.t('shifts.validation.hoursOnly.noPeriods'));
      }

      if (!this.shiftForm.requiredHours || this.shiftForm.requiredHours <= 0) {
        errors.push(this.t('shifts.validation.hoursOnly.requiredHours'));
      }

      if (this.shiftForm.requiredHours && this.shiftForm.requiredHours > 24) {
        errors.push(this.t('shifts.validation.hoursOnly.maxHours'));
      }
    }

    // Rule 8: If two periods are defined, both must be valid ranges
    if (this.shiftForm.shiftPeriods.length > 2) {
      errors.push(this.t('shifts.validation.periods.maxTwo'));
    }

    // Period validation
    for (let i = 0; i < this.shiftForm.shiftPeriods.length; i++) {
      const period = this.shiftForm.shiftPeriods[i];

      if (period.startTime === period.endTime) {
        errors.push(this.t('shifts.validation.periods.sameTime').replace('{{period}}', (i + 1).toString()));
      }

      const hours = this.calculatePeriodHours(period.startTime, period.endTime);
      if (hours <= 0) {
        errors.push(this.t('shifts.validation.periods.positiveHours').replace('{{period}}', (i + 1).toString()));
      }

      if (hours > 24) {
        errors.push(this.t('shifts.validation.periods.maxHours').replace('{{period}}', (i + 1).toString()));
      }
    }

    // Rule 8: Grace Period/Flexible Hours only valid for time-based shifts
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      if (this.shiftForm.allowFlexibleHours) {
        errors.push(this.t('shifts.validation.hoursOnly.noFlexibleHours'));
      }

      if (this.shiftForm.gracePeriodMinutes) {
        errors.push(this.t('shifts.validation.hoursOnly.noGracePeriod'));
      }
    }

    // Flexible hours validation
    if (this.shiftForm.allowFlexibleHours) {
      if (this.shiftForm.flexMinutesBefore && this.shiftForm.flexMinutesBefore > 480) {
        errors.push(this.t('shifts.validation.flexible.maxBefore'));
      }

      if (this.shiftForm.flexMinutesAfter && this.shiftForm.flexMinutesAfter > 480) {
        errors.push(this.t('shifts.validation.flexible.maxAfter'));
      }
    }

    // Grace period validation
    if (this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 120) {
      errors.push(this.t('shifts.validation.gracePeriod.max'));
    }

    // Rule 8: Check-In Required and Auto Check-Out options cannot conflict
    if (!this.shiftForm.isCheckInRequired && !this.shiftForm.isAutoCheckOut) {
      errors.push(this.t('shifts.validation.checkInOut.conflict'));
    }

    // Period overlap validation
    if (this.shiftForm.shiftPeriods.length === 2) {
      const periods = this.shiftForm.shiftPeriods.sort((a, b) => a.periodOrder - b.periodOrder);
      const firstPeriod = periods[0];
      const secondPeriod = periods[1];

      const firstIsNight = this.isNightShift(firstPeriod.startTime, firstPeriod.endTime);
      const secondIsNight = this.isNightShift(secondPeriod.startTime, secondPeriod.endTime);

      if (firstIsNight && secondIsNight) {
        errors.push(this.t('shifts.validation.periods.multipleNight'));
      }

      // For non-night shifts, ensure no overlap
      if (!firstIsNight && !secondIsNight) {
        const firstEndTime = this.parseTime(firstPeriod.endTime);
        const secondStartTime = this.parseTime(secondPeriod.startTime);

        if (firstEndTime >= secondStartTime) {
          errors.push(this.t('shifts.validation.periods.overlap'));
        }
      }
    }

    return errors;
  }

  // Shift Period Management
  addShiftPeriod(): void {
    if (this.shiftForm.shiftPeriods.length < 2) {
      this.shiftForm.shiftPeriods.push({
        periodOrder: this.shiftForm.shiftPeriods.length + 1,
        startTime: '08:00',
        endTime: '17:00'
      });
    }
  }

  removeShiftPeriod(index: number): void {
    this.shiftForm.shiftPeriods.splice(index, 1);
    // Reorder remaining periods
    this.shiftForm.shiftPeriods.forEach((period, idx) => {
      period.periodOrder = idx + 1;
    });
  }

  private resetForm(): void {
    this.shiftForm = {
      name: '',
      description: '',
      shiftType: ShiftType.TimeBased,
      status: ShiftStatus.Active,
      requiredHours: undefined,
      isCheckInRequired: true,
      isAutoCheckOut: false,
      allowFlexibleHours: false,
      flexMinutesBefore: undefined,
      flexMinutesAfter: undefined,
      gracePeriodMinutes: undefined,
      shiftPeriods: [
        {
          periodOrder: 1,
          startTime: '08:00',
          endTime: '17:00'
        }
      ]
    };
  }

  isFormValid(): boolean {
    // Basic validation
    if (!this.shiftForm.name.trim()) {
      return false;
    }

    // Business rule validation
    const businessRuleErrors = this.validateBusinessRules();
    return businessRuleErrors.length === 0;
  }

  getFormErrors(): string[] {
    const errors: string[] = [];

    // Basic validation
    if (!this.shiftForm.name.trim()) {
      errors.push(this.t('shifts.validation.name.required'));
    }


    // Add business rule errors
    errors.push(...this.validateBusinessRules());

    return errors;
  }

  // Utility methods for pagination (similar to branches component)
  getPaginationArray(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;

    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);

    if (end - start < 4 && total > 4) {
      if (start === 1) {
        end = Math.min(total, start + 4);
      } else if (end === total) {
        start = Math.max(1, end - 4);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getEndCount(): number {
    return Math.min(this.currentPage() * this.pageSize(), this.totalCount());
  }
}