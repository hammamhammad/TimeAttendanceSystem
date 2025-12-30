import { UnifiedFilterConfig, CommonFilterTypes } from '../../shared/models/unified-filter.model';
import { ExcuseStatus } from '../../shared/models/employee-excuse.model';
import { VacationStatus } from '../../shared/models/employee-vacation.model';
import { AttendanceStatus } from '../../shared/models/attendance.model';
import { EmploymentStatus } from '../../shared/models/employee.model';
import { PermissionActions } from '../../shared/utils/permission.utils';

export const FILTER_CONFIGURATIONS: { [key: string]: UnifiedFilterConfig } = {
  'employee-excuses': {
    searchPlaceholder: 'employee_excuses.search_placeholder',
    addButtonText: 'employee_excuses.create_excuse',
    addButtonPermission: `excuse.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'status',
        label: 'employee_excuses.status',
        type: CommonFilterTypes.Status,
        statusEnum: ExcuseStatus,
        statusLabels: {
          'Pending': 'employee_excuses.status_pending',
          'Approved': 'employee_excuses.status_approved',
          'Rejected': 'employee_excuses.status_rejected',
          'Cancelled': 'employee_excuses.status_cancelled'
        }
      },
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch,
        dependent: ['departmentId']
      },
      {
        key: 'departmentId',
        label: 'employees.department',
        type: CommonFilterTypes.Department,
        dependsOn: 'branchId'
      }
    ]
  },

  'employee-vacations': {
    searchPlaceholder: 'employee_vacations.search_placeholder',
    addButtonText: 'employee_vacations.create_vacation',
    addButtonPermission: `vacation.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'status',
        label: 'employee_vacations.status',
        type: CommonFilterTypes.Status,
        statusEnum: VacationStatus,
        statusLabels: {
          'approved': 'employee_vacations.status_approved',
          'pending': 'employee_vacations.status_pending',
          'active': 'employee_vacations.status_active',
          'upcoming': 'employee_vacations.status_upcoming',
          'completed': 'employee_vacations.status_completed'
        }
      },
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch,
        dependent: ['departmentId']
      },
      {
        key: 'departmentId',
        label: 'employees.department',
        type: CommonFilterTypes.Department,
        dependsOn: 'branchId'
      }
    ]
  },

  'employees': {
    searchPlaceholder: 'employees.search_placeholder',
    addButtonText: 'employees.add_employee',
    addButtonPermission: `employee.${PermissionActions.CREATE}`,
    filters: []
  },

  'attendance': {
    searchPlaceholder: 'attendance.fields.search_placeholder',
    addButtonText: 'attendance.actions.create_transaction',
    addButtonPermission: `attendance.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'status',
        label: 'attendance.status',
        type: CommonFilterTypes.Status,
        statusEnum: AttendanceStatus,
        statusLabels: {
          'Present': 'attendance.status_present',
          'Absent': 'attendance.status_absent',
          'Late': 'attendance.status_late',
          'EarlyLeave': 'attendance.status_early_leave',
          'OnLeave': 'attendance.status_on_leave',
          'DayOff': 'attendance.status_day_off',
          'Overtime': 'attendance.status_overtime',
          'Incomplete': 'attendance.status_incomplete',
          'Holiday': 'attendance.status_holiday',
          'SickLeave': 'attendance.status_sick_leave',
          'Pending': 'attendance.status_pending'
        }
      },
      {
        key: 'dateRange',
        label: 'common.date_range',
        type: CommonFilterTypes.DateRange
      },
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch,
        dependent: ['departmentId']
      },
      {
        key: 'departmentId',
        label: 'employees.department',
        type: CommonFilterTypes.Department,
        dependsOn: 'branchId'
      }
    ]
  },

  'users': {
    searchPlaceholder: 'users.search_placeholder',
    addButtonText: 'users.add_user',
    addButtonPermission: `user.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'departments': {
    searchPlaceholder: 'department.searchPlaceholder',
    addButtonText: 'department.addDepartment',
    addButtonPermission: `department.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'branches': {
    searchPlaceholder: 'branches.search_placeholder',
    addButtonText: 'branches.create_branch',
    addButtonPermission: `branch.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'shifts': {
    searchPlaceholder: 'shifts.searchPlaceholder',
    addButtonText: 'shifts.create',
    addButtonPermission: `shift.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'roles': {
    searchPlaceholder: 'roles.search_placeholder',
    addButtonText: 'roles.create_role',
    addButtonPermission: `role.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'vacation-types': {
    searchPlaceholder: 'vacation_types.search_placeholder',
    addButtonText: 'vacation_types.create_vacation_type',
    addButtonPermission: `vacationType.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'public-holidays': {
    searchPlaceholder: 'settings.holidays.searchPlaceholder',
    addButtonText: 'settings.holidays.create',
    addButtonPermission: `publicHoliday.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'year',
        label: 'common.year',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: '2024', label: '2024' },
          { value: '2025', label: '2025' },
          { value: '2026', label: '2026' }
        ]
      }
    ]
  },

  'overtime-configurations': {
    searchPlaceholder: 'settings.overtime.searchPlaceholder',
    addButtonText: 'settings.overtime.createPolicy',
    addButtonPermission: `settings.${PermissionActions.CREATE}`,
    filters: [
      {
        key: 'branchId',
        label: 'employees.branch',
        type: CommonFilterTypes.Branch
      },
      {
        key: 'isActive',
        label: 'common.status',
        type: CommonFilterTypes.Custom,
        options: [
          { value: '', label: 'common.all' },
          { value: 'true', label: 'common.active' },
          { value: 'false', label: 'common.inactive' }
        ]
      }
    ]
  },

  'shift-assignments': {
    searchPlaceholder: 'shifts.assignments.searchPlaceholder',
    addButtonText: 'shifts.assignments.createButton',
    addButtonPermission: `shift.${PermissionActions.CREATE}`,
    filters: []
  }
};