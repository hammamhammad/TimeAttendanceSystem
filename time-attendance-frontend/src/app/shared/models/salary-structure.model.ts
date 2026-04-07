export interface SalaryComponent {
  id?: number;
  name: string;
  nameAr?: string;
  type: SalaryComponentType;
  calculationType: CalculationType;
  amount?: number;
  percentage?: number;
  isTaxable: boolean;
  isFixed: boolean;
  sortOrder: number;
}

export interface SalaryStructure {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  branchId?: number;
  branchName?: string;
  isActive: boolean;
  components: SalaryComponent[];
  componentCount: number;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CreateSalaryStructureRequest {
  name: string;
  nameAr?: string;
  description?: string;
  branchId?: number;
  isActive: boolean;
  components: Omit<SalaryComponent, 'id'>[];
}

export interface UpdateSalaryStructureRequest extends CreateSalaryStructureRequest {
  id: number;
}

export type SalaryComponentType = 'Basic' | 'HousingAllowance' | 'TransportAllowance' | 'PhoneAllowance' | 'FoodAllowance' | 'OtherAllowance' | 'TaxDeduction' | 'SocialInsuranceDeduction' | 'LoanDeduction' | 'OtherDeduction' | 'Benefit';
export type CalculationType = 'Fixed' | 'PercentageOfBasic' | 'PercentageOfGross';

export interface SalaryStructureDropdown {
  id: number;
  name: string;
  nameAr?: string;
}
