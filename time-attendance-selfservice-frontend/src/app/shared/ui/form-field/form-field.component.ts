import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() control!: FormControl;
  @Input() placeholder = '';
  @Input() help = '';
  @Input() type = 'text';
  @Input() icon = '';
  @Input() options: { value: any; label: string }[] = [];

  private static fieldCounter = 0;
  public fieldId: string;

  constructor() {
    this.fieldId = `field-${++FormFieldComponent.fieldCounter}`;
  }

  get isInvalid(): boolean {
    return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched));
  }

  get errorMessage(): string {
    if (!this.control?.errors) return '';

    const errors = this.control.errors;
    
    if (errors['required']) return `${this.label} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${this.label} must not exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['pattern']) return `${this.label} format is invalid`;
    
    return 'This field is invalid';
  }
}