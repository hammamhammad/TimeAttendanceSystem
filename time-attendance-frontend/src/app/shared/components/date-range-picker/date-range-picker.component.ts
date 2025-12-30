import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface DateRange {
  start: string;
  end: string;
}

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangePickerComponent),
      multi: true
    }
  ]
})
export class DateRangePickerComponent implements ControlValueAccessor {
  @Input() startLabel = 'Start Date';
  @Input() endLabel = 'End Date';
  @Input() startPlaceholder = '';
  @Input() endPlaceholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() inline = false; // Display in single row
  @Input() showLabels = true;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() startError = '';
  @Input() endError = '';
  @Input() validateRange = true; // Ensure end >= start

  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();
  @Output() rangeChange = new EventEmitter<DateRange>();

  value: DateRange = { start: '', end: '' };
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: DateRange): void {
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

  getMinEndDate(): string | undefined {
    if (this.validateRange && this.value.start) {
      return this.value.start;
    }
    return this.minDate;
  }

  getMaxStartDate(): string | undefined {
    if (this.validateRange && this.value.end) {
      return this.value.end;
    }
    return this.maxDate;
  }
}