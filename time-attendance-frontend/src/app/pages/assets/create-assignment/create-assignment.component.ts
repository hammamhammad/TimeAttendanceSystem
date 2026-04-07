import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AssetService } from '../../../core/services/asset.service';
import { CreateAssetAssignmentRequest } from '../../../shared/models/asset.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.css'
})
export class CreateAssignmentComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);

  saving = signal(false);
  assets = signal<{ id: number; name: string; assetTag: string }[]>([]);
  employees = signal<{ id: number; name: string; employeeNumber: string }[]>([]);

  assignmentForm: FormGroup;

  get assetOptions(): SearchableSelectOption[] {
    return this.assets().map(a => ({ value: a.id, label: `${a.assetTag} - ${a.name}` }));
  }

  get employeeOptions(): SearchableSelectOption[] {
    return this.employees().map(e => ({ value: e.id, label: e.name }));
  }

  constructor() {
    this.assignmentForm = this.fb.group({
      assetId: [null, Validators.required],
      employeeId: [null, Validators.required],
      assignedDate: [new Date().toISOString().substring(0, 10), Validators.required],
      expectedReturnDate: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdowns();
  }

  private loadDropdowns(): void {
    this.assetService.getAvailableAssetsDropdown().subscribe({
      next: (data) => this.assets.set(data),
      error: () => {}
    });
    this.http.get<{ id: number; name: string; employeeNumber: string }[]>(`${environment.apiUrl}/api/v1/employees/dropdown`).subscribe({
      next: (data) => this.employees.set(data),
      error: () => {}
    });
  }

  onSubmit(): void {
    if (this.assignmentForm.invalid) {
      this.assignmentForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.assignmentForm.value;
    const request: CreateAssetAssignmentRequest = {
      assetId: formValue.assetId,
      employeeId: formValue.employeeId,
      assignedDate: formValue.assignedDate,
      expectedReturnDate: formValue.expectedReturnDate || undefined,
      notes: formValue.notes || undefined
    };

    this.assetService.createAssignment(request).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('assets.assignments.created'));
        this.router.navigate(['/assets/assignments']);
        this.saving.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.assignments.create_failed'));
        this.saving.set(false);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/assets/assignments']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.assignmentForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(field: string): boolean {
    const control = this.assignmentForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.assignmentForm.get(field);
    if (control?.hasError('required')) return this.i18n.t('validation.required');
    return '';
  }
}
