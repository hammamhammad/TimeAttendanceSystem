import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DocumentService } from '../../../../core/services/document.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-document',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-document.component.html',
  styleUrl: './create-document.component.css'
})
export class CreateDocumentComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(DocumentService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  selectedFile = signal<File | null>(null);
  employeeOptions: { value: any; label: string }[] = [];
  categoryOptions: { value: any; label: string }[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      categoryId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      documentNumber: [''],
      issueDate: [''],
      expiryDate: [''],
      notes: ['']
    });

    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }));
      }
    });

    this.service.getCategories({ pageSize: 100 }).subscribe({
      next: (res) => {
        this.categoryOptions = (res.data || []).filter(c => c.isActive).map(c => ({ value: c.id, label: c.name }));
      }
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.selectedFile.set(file ?? null);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (!this.selectedFile()) {
      this.notification.error(this.i18n.t('employee_documents.file_required'));
      return;
    }

    this.saving.set(true);
    const data = this.form.value;

    this.service.createEmployeeDocument(data, this.selectedFile()!).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('employee_documents.created'));
        this.router.navigate(['/documents/employee-documents']);
        this.saving.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error'));
        this.saving.set(false);
      }
    });
  }
}
