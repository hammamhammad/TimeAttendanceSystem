import { Component, signal, inject, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { DepartmentsService } from '../departments.service';
import { DepartmentDto, CreateDepartmentRequest, UpdateDepartmentRequest } from '../../../shared/models/department.model';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit, OnChanges {
  @Input() department: DepartmentDto | null = null;
  @Input() branchId: number | null = null;
  @Input() parentId: number | null = null;
  @Input() isEditMode = false;
  @Output() save = new EventEmitter<CreateDepartmentRequest | UpdateDepartmentRequest>();
  @Output() cancel = new EventEmitter<void>();

  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private departmentsService = inject(DepartmentsService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  departments = signal<DepartmentDto[]>([]);
  
  // Form
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit() {
    this.loadDepartments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['department'] && this.department) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nameAr: ['', [Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(500)]],
      descriptionAr: ['', [Validators.maxLength(500)]],
      parentDepartmentId: [null],
      managerEmployeeId: [null],
      costCenter: ['', [Validators.maxLength(50)]],
      location: ['', [Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      sortOrder: [0, [Validators.min(0)]],
      isActive: [true]
    });
  }

  private populateForm() {
    if (!this.department) return;

    this.form.patchValue({
      name: this.department.name,
      nameAr: this.department.nameAr,
      code: this.department.code,
      description: this.department.description,
      descriptionAr: this.department.descriptionAr,
      parentDepartmentId: this.department.parentDepartmentId,
      managerEmployeeId: this.department.managerEmployeeId,
      costCenter: this.department.costCenter,
      location: this.department.location,
      phone: this.department.phone,
      email: this.department.email,
      sortOrder: this.department.sortOrder,
      isActive: this.department.isActive
    });
  }

  private async loadDepartments() {
    if (!this.branchId) return;

    this.loading.set(true);
    try {
      const departments = await this.departmentsService.getDepartments({
        branchId: this.branchId,
        includeInactive: false
      }).toPromise();
      
      if (departments) {
        // Filter out current department and its children to prevent circular references
        const filtered = this.isEditMode && this.department 
          ? departments.filter(d => d.id !== this.department!.id && !d.path.includes(this.department!.name))
          : departments;
        
        this.departments.set(filtered);
      }
    } catch (error) {
      console.error('Failed to load departments:', error);
    } finally {
      this.loading.set(false);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.form.value;

    const data = {
      ...formValue,
      branchId: this.branchId,
      parentDepartmentId: this.parentId || formValue.parentDepartmentId || null,
    };

    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }

  onReset() {
    if (this.isEditMode && this.department) {
      this.populateForm();
    } else {
      this.form.reset({
        isActive: true,
        sortOrder: 0,
        parentDepartmentId: this.parentId
      });
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    const errors = field.errors;
    if (errors['required']) return this.i18n.t('validation.required');
    if (errors['maxlength']) return this.i18n.t('validation.maxLength');
    if (errors['email']) return this.i18n.t('validation.email');
    if (errors['min']) return this.i18n.t('validation.min');

    return '';
  }
}