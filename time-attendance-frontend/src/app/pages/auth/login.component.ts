import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field.component';

/**
 * Angular component for user authentication (login page).
 * Provides secure login form with validation, internationalization, and user feedback.
 * Implements modern Angular patterns with signals and reactive forms.
 * 
 * Key Features:
 * - Reactive form validation with real-time feedback
 * - Internationalization support for multiple languages
 * - Loading states and error handling with user notifications
 * - Automatic redirect for already authenticated users
 * - Remember me functionality for extended sessions
 * - Modern Angular signals for reactive state management
 * 
 * Security Considerations:
 * - Client-side validation (complemented by server-side validation)
 * - Secure credential transmission to backend API
 * - Automatic redirect prevents double authentication
 * - Error messages prevent credential enumeration
 * - Loading states prevent multiple concurrent login attempts
 * 
 * UX Features:
 * - Localized interface with language switching
 * - Visual feedback for form validation errors
 * - Success/error notifications for user guidance
 * - Responsive design for various screen sizes
 * - Keyboard accessibility and proper tabbing
 * 
 * @example
 * Usage in route configuration:
 * ```typescript
 * {
 *   path: 'login',
 *   component: LoginComponent,
 *   title: 'Login - Time Attendance System'
 * }
 * ```
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /** Injected notification service for user feedback */
  private notificationService = inject(NotificationService);
  
  /** Reactive form for login credentials input */
  loginForm: FormGroup;
  /** Signal for loading state during authentication */
  loading = signal(false);
  /** Signal for displaying authentication errors */
  error = signal('');

  /**
   * Initializes the login component with form setup and authentication check.
   * 
   * @param fb - Angular FormBuilder for creating reactive forms
   * @param authService - Authentication service for login operations
   * @param router - Angular Router for navigation after login
   * @param i18n - Internationalization service for localized text
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public i18n: I18nService
  ) {
    // Initialize reactive form with validation rules
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    // Redirect if already authenticated to prevent unnecessary login
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Retrieves localized text for the specified translation key.
   * Provides convenient shorthand for internationalization service.
   * 
   * @param key - Translation key for localized text
   * @returns Localized text string for current language
   * 
   * @example
   * ```typescript
   * const title = this.t('auth.login_title'); // Returns localized login title
   * ```
   */
  t(key: string): string {
    return this.i18n.t(key);
  }

  /**
   * Handles login form submission with validation and authentication.
   * Implements secure login flow with comprehensive error handling and user feedback.
   * 
   * @remarks
   * Login Process:
   * 1. Validates form inputs (client-side validation)
   * 2. Sets loading state to prevent multiple submissions
   * 3. Calls authentication service with form data
   * 4. Handles success with notification and redirect
   * 5. Handles errors with user-friendly messages
   * 6. Resets loading state on completion
   * 
   * Validation Features:
   * - Required field validation for username and password
   * - Form state management with touched/dirty states
   * - Visual feedback for validation errors
   * - Prevention of invalid form submission
   * 
   * Security Considerations:
   * - Generic error messages prevent credential enumeration
   * - Loading state prevents rapid-fire login attempts
   * - Client-side validation enhances UX but relies on server validation
   * - Error logging for debugging without exposing sensitive data
   * 
   * User Experience:
   * - Immediate visual feedback during authentication
   * - Success notifications provide positive confirmation
   * - Error messages guide user to resolve issues
   * - Automatic redirect on successful authentication
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.notificationService.success(
          this.t('auth.login_success'),
          'Welcome back!'
        );
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(this.t('auth.invalid_credentials'));
        console.error('Login failed:', error);
        this.notificationService.error(
          this.t('auth.invalid_credentials'),
          'Please check your username and password'
        );
      }
    });
  }

  /**
   * Gets strongly-typed reference to username form control.
   * Provides type safety and convenient access for validation and value binding.
   * 
   * @returns FormControl instance for username input
   * 
   * @remarks
   * Used for:
   * - Template binding and validation display
   * - Accessing control state (valid, invalid, touched, dirty)
   * - Getting current value and validation errors
   * - Programmatic control manipulation if needed
   * 
   * @example
   * ```html
   * <input [formControl]="usernameControl" />
   * <div *ngIf="usernameControl.invalid && usernameControl.touched">
   *   Username is required
   * </div>
   * ```
   */
  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  /**
   * Gets strongly-typed reference to password form control.
   * Provides type safety and convenient access for validation and value binding.
   * 
   * @returns FormControl instance for password input
   * 
   * @remarks
   * Security Considerations:
   * - Password values are handled securely by FormControl
   * - No password values logged or exposed in component
   * - Validation feedback doesn't reveal password requirements
   * - Auto-completion and password managers supported
   */
  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  /**
   * Toggles the application language between English and Arabic.
   * Provides bilingual support with immediate UI language switching.
   * 
   * @remarks
   * Language Switching Features:
   * - Toggles between 'en' (English) and 'ar' (Arabic)
   * - Immediate UI update with new language
   * - Persistent language preference across sessions
   * - RTL (Right-to-Left) support for Arabic language
   * 
   * Internationalization Benefits:
   * - Improves accessibility for diverse user base
   * - Enhances user experience with native language
   * - Supports business requirements for multilingual systems
   * - Enables localized form validation messages
   * 
   * Implementation Details:
   * - Uses i18n service for language management
   * - Triggers reactive updates across the application
   * - Maintains form state during language switches
   * - Preserves user input during language changes
   */
  onSwitchLanguage(): void {
    const newLocale = this.i18n.getCurrentLocale() === 'en' ? 'ar' : 'en';
    this.i18n.setLocale(newLocale);
  }
}