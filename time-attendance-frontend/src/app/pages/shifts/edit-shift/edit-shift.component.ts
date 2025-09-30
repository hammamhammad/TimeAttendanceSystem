import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { ShiftsService } from '../shifts.service';
import {
  Shift,
  ShiftType,
  ShiftStatus,
  UpdateShiftRequest,
  UpdateShiftPeriodRequest
} from '../../../shared/models/shift.model';

@Component({
  selector: 'app-edit-shift',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchableSelectComponent, FormHeaderComponent],
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css']
})
export class EditShiftComponent implements OnInit {
  private shiftsService = inject(ShiftsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public i18n = inject(I18nService);

  // Enum references for template
  readonly ShiftType = ShiftType;
  readonly ShiftStatus = ShiftStatus;

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  shiftId = signal<number>(0);
  originalShift = signal<Shift | null>(null);

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
    // Extended Business Rules
    requiredWeeklyHours: undefined as number | undefined,
    hasCoreHours: false,
    coreStart: '',
    coreEnd: '',
    // Working Days
    isSunday: false,
    isMonday: true,
    isTuesday: true,
    isWednesday: true,
    isThursday: true,
    isFriday: true,
    isSaturday: false,
    isNightShift: false,
    shiftPeriods: [] as Array<{
      id?: number;
      periodOrder: number;
      startTime: string;
      endTime: string;
    }>
  };

  ngOnInit(): void {
    // Get shift ID from route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shiftId.set(parseInt(id, 10));
      this.loadShift();
    } else {
      // Invalid route, redirect back to shifts
      this.router.navigate(['/shifts']);
    }
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadShift(): void {
    this.loading.set(true);

    this.shiftsService.getShiftById(this.shiftId()).subscribe({
      next: (shift: Shift) => {
        console.log('🔍 DEBUG: Raw shift data from API:', shift);
        console.log('🔍 DEBUG: Shift status value:', shift.status);
        console.log('🔍 DEBUG: Working days:', {
          isSunday: shift.isSunday,
          isMonday: shift.isMonday,
          isTuesday: shift.isTuesday,
          isWednesday: shift.isWednesday,
          isThursday: shift.isThursday,
          isFriday: shift.isFriday,
          isSaturday: shift.isSaturday
        });
        this.originalShift.set(shift);
        this.populateForm(shift);
        console.log('🔍 DEBUG: Form after population:', this.shiftForm);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load shift:', error);
        this.loading.set(false);
        // Redirect back to shifts if shift not found
        this.router.navigate(['/shifts']);
      }
    });
  }

  private populateForm(shift: Shift): void {
    // Populate form fields individually to preserve Angular binding
    this.shiftForm.name = shift.name;
    this.shiftForm.description = shift.description || '';
    this.shiftForm.shiftType = shift.shiftType;
    this.shiftForm.status = shift.status;

    // Apply business rules when populating
    if (shift.shiftType === ShiftType.TimeBased) {
      // Time-based shifts should not have required hours
      this.shiftForm.requiredHours = undefined;
    } else {
      // Hours-only shifts need required hours
      this.shiftForm.requiredHours = shift.requiredHours;
    }

    this.shiftForm.isCheckInRequired = shift.isCheckInRequired;
    this.shiftForm.isAutoCheckOut = shift.isAutoCheckOut;
    this.shiftForm.allowFlexibleHours = shift.allowFlexibleHours;
    this.shiftForm.flexMinutesBefore = shift.flexMinutesBefore;
    this.shiftForm.flexMinutesAfter = shift.flexMinutesAfter;
    this.shiftForm.gracePeriodMinutes = shift.gracePeriodMinutes;

    // Extended Business Rules - handle weekly hours validation
    this.shiftForm.requiredWeeklyHours = shift.requiredWeeklyHours && shift.requiredWeeklyHours > 0
      ? shift.requiredWeeklyHours
      : undefined;
    this.shiftForm.hasCoreHours = shift.hasCoreHours;
    this.shiftForm.coreStart = shift.coreStart || '';
    this.shiftForm.coreEnd = shift.coreEnd || '';

    // Working Days
    this.shiftForm.isSunday = shift.isSunday;
    this.shiftForm.isMonday = shift.isMonday;
    this.shiftForm.isTuesday = shift.isTuesday;
    this.shiftForm.isWednesday = shift.isWednesday;
    this.shiftForm.isThursday = shift.isThursday;
    this.shiftForm.isFriday = shift.isFriday;
    this.shiftForm.isSaturday = shift.isSaturday;
    this.shiftForm.isNightShift = shift.isNightShift;

    // Shift Periods - only for time-based shifts
    this.shiftForm.shiftPeriods = shift.shiftType === ShiftType.TimeBased
      ? (shift.shiftPeriods?.map(sp => ({
          id: sp.id,
          periodOrder: sp.periodOrder,
          startTime: sp.startTime,
          endTime: sp.endTime
        })) || [])
      : [];
  }

  // Shift Type Change Handler
  onShiftTypeChange(): void {
    if (this.shiftForm.shiftType === ShiftType.HoursOnly) {
      // Clear time-based specific settings
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = undefined;
      this.shiftForm.flexMinutesAfter = undefined;
      this.shiftForm.gracePeriodMinutes = undefined;
      this.shiftForm.shiftPeriods = [];

      // Business Rule 3: Night Shift not works with Hours Only
      this.shiftForm.isNightShift = false;

      // Set default required hours if not set
      if (!this.shiftForm.requiredHours) {
        this.shiftForm.requiredHours = 8;
      }
    } else {
      // Clear hours-only specific settings
      this.shiftForm.requiredHours = undefined;

      // Add default period if none exist
      if (this.shiftForm.shiftPeriods.length === 0) {
        this.addShiftPeriod();
      }
    }
  }

  // Core Hours Change Handler
  onCoreHoursChange(): void {
    if (!this.shiftForm.hasCoreHours) {
      this.shiftForm.coreStart = '';
      this.shiftForm.coreEnd = '';
    } else {
      // Set default core hours if not set
      if (!this.shiftForm.coreStart) this.shiftForm.coreStart = '09:00';
      if (!this.shiftForm.coreEnd) this.shiftForm.coreEnd = '15:00';
    }
  }

  // Flexible Hours Change Handler
  onFlexibleHoursChange(): void {
    if (!this.shiftForm.allowFlexibleHours) {
      this.shiftForm.flexMinutesBefore = undefined;
      this.shiftForm.flexMinutesAfter = undefined;
    } else {
      // Business Rule 1: Grace Period should be disabled and empty when Allow Flexible Hours is selected
      this.shiftForm.gracePeriodMinutes = undefined;
    }
  }

  // Grace Period Change Handler
  onGracePeriodChange(): void {
    if (this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 0) {
      // Clear flexible hours when grace period is set as they are mutually exclusive
      this.shiftForm.allowFlexibleHours = false;
      this.shiftForm.flexMinutesBefore = undefined;
      this.shiftForm.flexMinutesAfter = undefined;
    }
  }

  // Weekly Hours Change Handler
  onWeeklyHoursChange(): void {
    if (this.shiftForm.requiredWeeklyHours && this.shiftForm.requiredWeeklyHours > 0) {
      // Business Rule 2: Core Hours is mandatory with Weekly Hours
      if (!this.shiftForm.hasCoreHours) {
        this.shiftForm.hasCoreHours = true;
        this.onCoreHoursChange(); // Set default core hours
      }
    }
  }

  // Night Shift Change Handler
  onNightShiftChange(): void {
    if (this.shiftForm.isNightShift && this.shiftForm.shiftType === ShiftType.HoursOnly) {
      // Business Rule 3: Night Shift not works with Hours Only
      this.shiftForm.isNightShift = false;
    }
  }

  // Shift Period Management
  addShiftPeriod(): void {
    if (this.shiftForm.shiftPeriods.length < 2) {
      const newOrder = this.shiftForm.shiftPeriods.length + 1;
      this.shiftForm.shiftPeriods.push({
        periodOrder: newOrder,
        startTime: newOrder === 1 ? '08:00' : '13:00',
        endTime: newOrder === 1 ? '12:00' : '17:00'
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

  // Business Rule Methods
  calculatePeriodHours(startTime: string, endTime: string): number {
    if (!startTime || !endTime) return 0;

    const start = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    if (end > start) {
      return (end - start) / (1000 * 60 * 60);
    } else if (end < start) {
      const hoursToMidnight = (24 * 60 * 60 * 1000 - start) / (1000 * 60 * 60);
      const hoursFromMidnight = end / (1000 * 60 * 60);
      return hoursToMidnight + hoursFromMidnight;
    } else {
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

  getWorkingDaysCount(): number {
    let count = 0;
    if (this.shiftForm.isSunday) count++;
    if (this.shiftForm.isMonday) count++;
    if (this.shiftForm.isTuesday) count++;
    if (this.shiftForm.isWednesday) count++;
    if (this.shiftForm.isThursday) count++;
    if (this.shiftForm.isFriday) count++;
    if (this.shiftForm.isSaturday) count++;
    return count;
  }

  private parseTime(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
  }

  private formatTimeWithSeconds(timeString: string): string {
    if (!timeString) return '';
    // If already has seconds, return as is
    if (timeString.includes(':') && timeString.split(':').length === 3) {
      return timeString;
    }
    // Add :00 seconds if missing
    return timeString.length === 5 ? `${timeString}:00` : timeString;
  }

  formatHours(hours: number): string {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
  }

  getPeriodTypeText(period: { startTime: string; endTime: string }): string {
    const isNight = this.isNightShift(period.startTime, period.endTime);
    return isNight ? this.t('shifts.periodTypes.nightShift') : this.t('shifts.periodTypes.dayShift');
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

  get statusSelectOptions(): SearchableSelectOption[] {
    return [
      { value: ShiftStatus.Active.toString(), label: this.getShiftStatusText(ShiftStatus.Active) },
      { value: ShiftStatus.Inactive.toString(), label: this.getShiftStatusText(ShiftStatus.Inactive) },
      { value: ShiftStatus.Draft.toString(), label: this.getShiftStatusText(ShiftStatus.Draft) },
      { value: ShiftStatus.Archived.toString(), label: this.getShiftStatusText(ShiftStatus.Archived) }
    ];
  }

  onStatusSelectionChange(statusStr: string) {
    const status = statusStr ? parseInt(statusStr) : ShiftStatus.Active;
    this.shiftForm.status = status;
  }

  // Validation
  validateBusinessRules(): string[] {
    const errors: string[] = [];

    // Basic validation
    if (!this.shiftForm.name.trim()) {
      errors.push(this.t('shifts.validation.name.required'));
    }

    // Extended Rules: Working days validation
    const hasWorkingDays = this.shiftForm.isSunday || this.shiftForm.isMonday || this.shiftForm.isTuesday ||
                          this.shiftForm.isWednesday || this.shiftForm.isThursday || this.shiftForm.isFriday ||
                          this.shiftForm.isSaturday;
    if (!hasWorkingDays) {
      errors.push(this.t('shifts.validation.workingDays.required'));
    }

    // Core hours validation
    if (this.shiftForm.hasCoreHours) {
      if (!this.shiftForm.coreStart || !this.shiftForm.coreEnd) {
        errors.push(this.t('shifts.validation.coreHours.required'));
      } else {
        const coreStart = this.parseTime(this.shiftForm.coreStart);
        const coreEnd = this.parseTime(this.shiftForm.coreEnd);

        if (coreStart === coreEnd) {
          errors.push(this.t('shifts.validation.coreHours.sameTime'));
        }

        // For time-based shifts, core hours must be within periods
        if (this.shiftForm.shiftType === ShiftType.TimeBased && this.shiftForm.shiftPeriods.length > 0) {
          const coreIsWithinPeriods = this.shiftForm.shiftPeriods.some(period =>
            this.isCoreWithinPeriod(period, this.shiftForm.coreStart, this.shiftForm.coreEnd)
          );

          if (!coreIsWithinPeriods) {
            errors.push(this.t('shifts.validation.coreHours.outsidePeriods'));
          }
        }
      }
    }

    // Weekly hours validation
    if (this.shiftForm.requiredWeeklyHours !== undefined && this.shiftForm.requiredWeeklyHours !== null) {
      if (this.shiftForm.requiredWeeklyHours <= 0) {
        errors.push(this.t('shifts.validation.weeklyHours.positive'));
      }

      if (this.shiftForm.requiredWeeklyHours > 168) {
        errors.push(this.t('shifts.validation.weeklyHours.maxWeekly'));
      }
    }

    // Grace period and flexible hours conflict validation
    if (this.shiftForm.allowFlexibleHours && this.shiftForm.gracePeriodMinutes && this.shiftForm.gracePeriodMinutes > 0) {
      errors.push(this.t('shifts.validation.flexible.noGracePeriod'));
    }

    // Existing business rules
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

    return errors;
  }

  private isCoreWithinPeriod(period: { startTime: string; endTime: string }, coreStart: string, coreEnd: string): boolean {
    const periodStart = this.parseTime(period.startTime);
    const periodEnd = this.parseTime(period.endTime);
    const coreStartTime = this.parseTime(coreStart);
    const coreEndTime = this.parseTime(coreEnd);

    // Handle night shifts
    if (periodEnd < periodStart) {
      // Night period spans midnight
      const withinFirstPart = coreStartTime >= periodStart && coreEndTime >= periodStart;
      const withinSecondPart = coreStartTime <= periodEnd && coreEndTime <= periodEnd;
      const spansNight = coreStartTime >= periodStart && coreEndTime <= periodEnd;
      return withinFirstPart || withinSecondPart || spansNight;
    } else {
      // Normal day period
      return coreStartTime >= periodStart && coreEndTime <= periodEnd;
    }
  }

  isFormValid(): boolean {
    const businessRuleErrors = this.validateBusinessRules();
    return businessRuleErrors.length === 0;
  }

  getFormErrors(): string[] {
    return this.validateBusinessRules();
  }

  // Form Submission
  onSubmit(): void {
    if (!this.isFormValid()) return;

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
      // Extended Business Rules
      requiredWeeklyHours: this.shiftForm.requiredWeeklyHours,
      hasCoreHours: this.shiftForm.hasCoreHours,
      coreStart: this.shiftForm.hasCoreHours ? this.formatTimeWithSeconds(this.shiftForm.coreStart) : undefined,
      coreEnd: this.shiftForm.hasCoreHours ? this.formatTimeWithSeconds(this.shiftForm.coreEnd) : undefined,
      // Working Days
      isSunday: this.shiftForm.isSunday,
      isMonday: this.shiftForm.isMonday,
      isTuesday: this.shiftForm.isTuesday,
      isWednesday: this.shiftForm.isWednesday,
      isThursday: this.shiftForm.isThursday,
      isFriday: this.shiftForm.isFriday,
      isSaturday: this.shiftForm.isSaturday,
      isNightShift: this.shiftForm.isNightShift,
      shiftPeriods: this.shiftForm.shiftPeriods.length > 0
        ? this.shiftForm.shiftPeriods.map(sp => ({
            id: sp.id,
            periodOrder: sp.periodOrder,
            startTime: this.formatTimeWithSeconds(sp.startTime),
            endTime: this.formatTimeWithSeconds(sp.endTime)
          } as UpdateShiftPeriodRequest))
        : undefined
    };

    this.shiftsService.updateShift(this.shiftId(), request).subscribe({
      next: () => {
        this.router.navigate(['/shifts']);
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to update shift:', error);
        this.submitting.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/shifts']);
  }
}