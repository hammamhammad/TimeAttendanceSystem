export interface EmployeeSalaryComponent {
  id: number;
  salaryComponentName: string;
  type: string;
  calculationType: string;
  amount: number;
  percentage?: number;
}

export interface EmployeeSalary {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  salaryStructureId: number;
  salaryStructureName: string;
  basicSalary: number;
  grossSalary: number;
  netSalary: number;
  effectiveDate: string;
  endDate?: string;
  isActive: boolean;
  components: EmployeeSalaryComponent[];
  createdAtUtc: string;
}

export interface AssignEmployeeSalaryRequest {
  employeeId: number;
  salaryStructureId: number;
  basicSalary: number;
  effectiveDate: string;
  componentOverrides?: ComponentOverride[];
}

export interface ComponentOverride {
  salaryComponentId: number;
  overrideAmount?: number;
  overridePercentage?: number;
}

export interface EmployeeSalaryHistory {
  items: EmployeeSalary[];
  totalCount: number;
}
