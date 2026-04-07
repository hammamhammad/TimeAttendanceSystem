import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DocumentService } from '../../../../core/services/document.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { LetterType } from '../../../../shared/models/document.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(DocumentService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  employeeOptions: { value: any; label: string }[] = [];
  letterTypeOptions: { value: any; label: string }[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      letterType: [null, Validators.required],
      purpose: [''],
      purposeAr: [''],
      additionalNotes: ['']
    });

    this.employeeService.getDropdown().subscribe({
      next: (list) => {
        this.employeeOptions = list.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }));
      }
    });

    this.letterTypeOptions = [
      { value: LetterType.SalaryCertificate, label: this.i18n.t('letter_requests.type_SalaryCertificate') },
      { value: LetterType.EmploymentLetter, label: this.i18n.t('letter_requests.type_EmploymentLetter') },
      { value: LetterType.ExperienceLetter, label: this.i18n.t('letter_requests.type_ExperienceLetter') },
      { value: LetterType.NOC, label: this.i18n.t('letter_requests.type_NOC') },
      { value: LetterType.Custom, label: this.i18n.t('letter_requests.type_Custom') }
    ];
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.service.createLetterRequest(this.form.value).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('letter_requests.created'));
        this.router.navigate(['/documents/letter-requests']);
        this.saving.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  cancel(): void {
    this.router.navigate(['/documents/letter-requests']);
  }
}
