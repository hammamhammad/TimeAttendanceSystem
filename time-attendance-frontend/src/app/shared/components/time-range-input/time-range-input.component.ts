import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface TimeRange {
  start: string;
  end: string;
}

@Component({
  selector: 'app-time-range-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './time-range-input.component.html',
  styleUrls: ['./time-range-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangeInputComponent),
      multi: true
    }
  ]
})
export class TimeRangeInputComponent implements ControlValueAccessor {
  @Input() startLabel = 'Start Time';
  @Input() endLabel = 'End Time';
  @Input() startPlaceholder = '';
  @Input() endPlaceholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() inline = false; // Display in single row
  @Input() showLabels = true;
  @Input() minTime?: string;
  @Input() maxTime?: string;
  @Input() step = 60; // Step in seconds (default 1 minute)
  @Input() startError = '';
  @Input() endError = '';
  @Input() validateRange = true; // Ensure end >= start

  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<TimeRange>();

  value: TimeRange = { start: '', end: '' };
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: TimeRange): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onStartChange(start: string): void {
    this.value.start = start;
    this.startChange.emit(start);
    this.emitChange();
  }

  onEndChange(end: string): void {
    this.value.end = end;
    this.endChange.emit(end);
    this.emitChange();
  }

  emitChange(): void {
    this.onChange(this.value);
    this.rangeChange.emit(this.value);
    this.onTouched();
  }

  getInputClasses(): string {
    const classes = ['form-control'];

    if (this.size === 'sm') {
      classes.push('form-control-sm');
    } else if (this.size === 'lg') {
      classes.push('form-control-lg');
    }

    return classes.join(' ');
  }

  getMinEndTime(): string | undefined {
    if (this.validateRange && this.value.start) {
      return this.value.start;
    }
    return this.minTime;
  }

  getMaxStartTime(): string | undefined {
    if (this.validateRange && this.value.end) {
      return this.value.end;
    }
    return this.maxTime;
  }

  getStepInSeconds(): number {
    return this.step;
  }
}