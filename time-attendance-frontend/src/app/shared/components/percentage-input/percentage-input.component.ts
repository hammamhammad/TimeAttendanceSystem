import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ERP percentage input — inline `%` suffix, right-aligned.
 * Renders: [   75] [%]
 *
 * Usage:
 *   <app-percentage-input formControlName="probability"></app-percentage-input>
 */
@Component({
  selector: 'app-percentage-input',
  standalone: true,
  template: `
    <div class="input-adornment input-adornment--suffix">
      <input
        type="text"
        inputmode="decimal"
        class="form-control"
        [class.is-invalid]="isInvalid"
        [class.is-valid]="isValid"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [value]="displayValue"
        (input)="onInputChange($any($event.target).value)"
        (blur)="onBlur()"
      />
      <span class="input-adornment__suffix">%</span>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PercentageInputComponent),
      multi: true
    }
  ]
})
export class PercentageInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '0';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() isInvalid: boolean = false;
  @Input() isValid: boolean = false;
  @Input() min: number = 0;
  @Input() max: number = 100;

  displayValue: string = '';

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | string | null): void {
    if (value === null || value === undefined || value === '') {
      this.displayValue = '';
      return;
    }
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    this.displayValue = isNaN(num) ? '' : String(num);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInputChange(raw: string): void {
    this.displayValue = raw;
    const stripped = raw.replace('%', '').trim();
    if (stripped === '' || stripped === '-' || stripped === '.') {
      this.onChange(null);
      return;
    }
    const num = parseFloat(stripped);
    this.onChange(isNaN(num) ? null : num);
  }

  onBlur(): void {
    this.onTouched();
  }
}
