import { Component, Input, Output, EventEmitter, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { PortalService } from '../../../pages/portal/services/portal.service';

export interface DelegationResult {
  userId: number;
  employeeName: string;
  reason?: string;
}

export interface TeamMemberOption {
  id: number;
  userId: number;
  fullName: string;
  fullNameAr?: string;
  jobTitle?: string;
  departmentName?: string;
  email?: string;
}

@Component({
  selector: 'app-delegation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalWrapperComponent
  ],
  templateUrl: './delegation-modal.component.html',
  styleUrls: ['./delegation-modal.component.css']
})
export class DelegationModalComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);

  @Input() show = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() delegate = new EventEmitter<DelegationResult>();

  // State
  searchTerm = signal('');
  employees = signal<TeamMemberOption[]>([]);
  filteredEmployees = signal<TeamMemberOption[]>([]);
  selectedEmployee = signal<TeamMemberOption | null>(null);
  loading = signal(false);
  searchLoading = signal(false);
  delegationReason = signal('');
  searchPerformed = signal(false);

  // Computed
  canDelegate = computed(() => this.selectedEmployee() !== null);

  displayName = computed(() => {
    const employee = this.selectedEmployee();
    if (!employee) return '';
    return this.i18n.getCurrentLocale() === 'ar' && employee.fullNameAr
      ? employee.fullNameAr
      : employee.fullName;
  });

  ngOnInit(): void {
    if (!this.title) {
      this.title = this.i18n.t('portal.delegate_approval');
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const term = target.value;
    this.searchTerm.set(term);

    if (term.length >= 2) {
      this.performSearch(term);
    } else {
      this.filteredEmployees.set([]);
      this.searchPerformed.set(false);
    }
  }

  private performSearch(term: string): void {
    this.searchLoading.set(true);
    this.searchPerformed.set(true);

    // Use team-members endpoint with search
    this.portalService.searchEmployeesForDelegation(term).subscribe({
      next: (employees) => {
        this.filteredEmployees.set(employees);
        this.searchLoading.set(false);
      },
      error: (error) => {
        console.error('Error searching employees:', error);
        this.filteredEmployees.set([]);
        this.searchLoading.set(false);
      }
    });
  }

  selectEmployee(employee: TeamMemberOption): void {
    this.selectedEmployee.set(employee);
    this.searchTerm.set('');
    this.filteredEmployees.set([]);
    this.searchPerformed.set(false);
  }

  clearSelection(): void {
    this.selectedEmployee.set(null);
  }

  onCancel(): void {
    this.resetState();
    this.close.emit();
  }

  onConfirmDelegate(): void {
    const employee = this.selectedEmployee();
    if (!employee) return;

    this.delegate.emit({
      userId: employee.userId,
      employeeName: this.displayName(),
      reason: this.delegationReason() || undefined
    });

    this.resetState();
  }

  private resetState(): void {
    this.searchTerm.set('');
    this.employees.set([]);
    this.filteredEmployees.set([]);
    this.selectedEmployee.set(null);
    this.delegationReason.set('');
    this.searchPerformed.set(false);
  }

  getEmployeeDisplayName(employee: TeamMemberOption): string {
    return this.i18n.getCurrentLocale() === 'ar' && employee.fullNameAr
      ? employee.fullNameAr
      : employee.fullName;
  }

  trackByUserId(index: number, employee: TeamMemberOption): number {
    return employee.userId;
  }
}
