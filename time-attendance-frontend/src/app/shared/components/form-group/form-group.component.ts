import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormGroupComponent),
      multi: true
    }
  ]
})
export class FormGroupComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() required = false;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select' = 'text';
  @Input() placeholder = '';
  @Input() helpText = '';
  @Input() error = '';
  @Input() showError = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() rows = 3; // For textarea
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() step?: number | string;
  @Input() options: Array<{ value: any; label: string }> = []; // For select
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() colClass = 'col-md-6'; // Bootstrap column class

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
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

  onInputChange(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  getInputClasses(): string {
    const classes = ['form-control'];

    if (this.size === 'sm') {
      classes.push('form-control-sm');
    } else if (this.size === 'lg') {
      classes.push('form-control-lg');
    }

    if (this.showError && this.error) {
      classes.push('is-invalid');
    }

    return classes.join(' ');
  }

  getSelectClasses(): string {
    const classes = ['form-select'];

    if (this.size === 'sm') {
      classes.push('form-select-sm');
    } else if (this.size === 'lg') {
      classes.push('form-select-lg');
    }

    if (this.showError && this.error) {
      classes.push('is-invalid');
    }

    return classes.join(' ');
  }
}