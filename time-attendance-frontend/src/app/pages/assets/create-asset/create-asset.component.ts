import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { AssetService } from '../../../core/services/asset.service';
import { AssetDto, AssetStatus, AssetCondition, CreateAssetRequest, UpdateAssetRequest } from '../../../shared/models/asset.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { environment } from '../../../../environments/environment';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-asset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-asset.component.html',
  styleUrl: './create-asset.component.css'
})
export class CreateAssetComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('asset.update');
  }
  loading = signal(false);
  saving = signal(false);
  isEditMode = signal(false);
  assetId = signal<number | undefined>(undefined);

  categories = signal<{ id: number; name: string }[]>([]);
  branches = signal<{ id: number; name: string }[]>([]);

  assetForm: FormGroup;

  readonly statusOptions = [
    { value: AssetStatus.Available, label: 'assets.status_Available' },
    { value: AssetStatus.Assigned, label: 'assets.status_Assigned' },
    { value: AssetStatus.UnderMaintenance, label: 'assets.status_UnderMaintenance' },
    { value: AssetStatus.Retired, label: 'assets.status_Retired' },
    { value: AssetStatus.Lost, label: 'assets.status_Lost' },
    { value: AssetStatus.Disposed, label: 'assets.status_Disposed' }
  ];

  readonly conditionOptions = [
    { value: AssetCondition.New, label: 'assets.condition_New' },
    { value: AssetCondition.Good, label: 'assets.condition_Good' },
    { value: AssetCondition.Fair, label: 'assets.condition_Fair' },
    { value: AssetCondition.Poor, label: 'assets.condition_Poor' },
    { value: AssetCondition.Damaged, label: 'assets.condition_Damaged' }
  ];

  readonly currencyOptions = ['SAR', 'USD', 'EUR', 'GBP', 'AED'];

  get categoryOptions(): SearchableSelectOption[] {
    return this.categories().map(c => ({ value: c.id, label: c.name }));
  }

  get branchOptions(): SearchableSelectOption[] {
    return this.branches().map(b => ({ value: b.id, label: b.name }));
  }

  constructor() {
    this.assetForm = this.fb.group({
      assetTag: ['', Validators.required],
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      categoryId: [null, Validators.required],
      branchId: [null, Validators.required],
      serialNumber: [''],
      model: [''],
      manufacturer: [''],
      purchaseDate: [''],
      purchasePrice: [null],
      currency: ['SAR'],
      warrantyExpiryDate: [''],
      status: [AssetStatus.Available, Validators.required],
      condition: [AssetCondition.New, Validators.required],
      location: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdowns();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.assetId.set(+id as number);
      this.loadAsset(+id);
    }
  }

  private loadDropdowns(): void {
    this.assetService.getCategoryDropdown().subscribe({
      next: (data) => this.categories.set(data),
      error: () => {}
    });
    this.http.get<{ id: number; name: string }[]>(`${environment.apiUrl}/api/v1/branches/dropdown`).subscribe({
      next: (data) => this.branches.set(data),
      error: () => {}
    });
  }

  private loadAsset(id: number): void {
    this.loading.set(true);
    this.assetService.getAsset(id).subscribe({
      next: (asset) => {
        this.assetForm.patchValue({
          assetTag: asset.assetTag,
          name: asset.name,
          nameAr: asset.nameAr || '',
          description: asset.description || '',
          categoryId: asset.categoryId,
          branchId: asset.branchId,
          serialNumber: asset.serialNumber || '',
          model: asset.model || '',
          manufacturer: asset.manufacturer || '',
          purchaseDate: asset.purchaseDate ? asset.purchaseDate.substring(0, 10) : '',
          purchasePrice: asset.purchasePrice,
          currency: asset.currency || 'SAR',
          warrantyExpiryDate: asset.warrantyExpiryDate ? asset.warrantyExpiryDate.substring(0, 10) : '',
          status: asset.status,
          condition: asset.condition,
          location: asset.location || '',
          notes: asset.notes || ''
        });
        if (!this.canEdit()) {
          this.assetForm.disable();
        }
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.load_failed'));
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.assetForm.value;

    if (this.isEditMode()) {
      const request: UpdateAssetRequest = {
        ...formValue,
        purchaseDate: formValue.purchaseDate || undefined,
        warrantyExpiryDate: formValue.warrantyExpiryDate || undefined,
        purchasePrice: formValue.purchasePrice || undefined
      };
      this.assetService.updateAsset(this.assetId()!, request).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.updated'));
          this.router.navigate(['/assets']);
          this.saving.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.update_failed'));
          this.saving.set(false);
        }
      });
    } else {
      const request: CreateAssetRequest = {
        ...formValue,
        purchaseDate: formValue.purchaseDate || undefined,
        warrantyExpiryDate: formValue.warrantyExpiryDate || undefined,
        purchasePrice: formValue.purchasePrice || undefined
      };
      this.assetService.createAsset(request).subscribe({
        next: (asset) => {
          this.notification.success(this.i18n.t('assets.created'));
          this.router.navigate(['/assets']);
          this.saving.set(false);
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.create_failed'));
          this.saving.set(false);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/assets']);
  }

  onReset(): void {
    this.assetForm.reset({ status: AssetStatus.Available, condition: AssetCondition.New, currency: 'SAR' });
  }

  getFormMode(): 'create' | 'edit' {
    return this.isEditMode() ? 'edit' : 'create';
  }

  isFieldInvalid(field: string): boolean {
    const control = this.assetForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(field: string): boolean {
    const control = this.assetForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.assetForm.get(field);
    if (control?.hasError('required')) {
      return this.i18n.t('validation.required');
    }
    return '';
  }
}
