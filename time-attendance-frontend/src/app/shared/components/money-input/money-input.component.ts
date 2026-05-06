import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * ERP money input — inline currency prefix, mono font, right-aligned.
 * Renders: [SAR] [   125,000.00]
 *
 * Usage:
 *   <app-money-input formControlName="amount" currency="SAR"></app-money-input>
 */
@Component({
  selector: 'app-money-input',
  standalone: true,
  template: `
    <div class="input-adornment input-adornment--prefix">
      <span class="input-adornment__prefix">{{ currency }}</span>
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
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoneyInputComponent),
      multi: true
    }
  ]
})
export class MoneyInputComponent implements ControlValueAccessor {
  @Input() currency: string = 'SAR';
  @Input() placeholder: string = '0.00';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() isInvalid: boolean = false;
  @Input() isValid: boolean = false;
  /** When true, format with thousands separators on blur. */
  @Input() formatOnBlur: boolean = true;

  displayValue: string = '';

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | string | null): void {
    if (value === null || value === undefined || value === '') {
      this.displayValue = '';
      return;
    }
    const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
    this.displayValue = isNaN(num) ? '' : this.format(num);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onInputChange(raw: string): void {
    this.displayValue = raw;
    const stripped = raw.replace(/,/g, '').trim();
    if (stripped === '' || stripped === '-' || stripped === '.') {
      this.onChange(null);
      return;
    }
    const num = parseFloat(stripped);
    this.onChange(isNaN(num) ? null : num);
  }

  onBlur(): void {
    this.onTouched();
    if (this.formatOnBlur && this.displayValue) {
      const num = parseFloat(this.displayValue.replace(/,/g, ''));
      if (!isNaN(num)) {
        this.displayValue = this.format(num);
      }
    }
  }

  private format(n: number): string {
    return n.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
