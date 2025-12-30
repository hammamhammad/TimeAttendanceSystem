import {
  VacationTypesService
} from "./chunk-5ZTOQBVY.js";
import {
  ShiftsService
} from "./chunk-3L6JDBEN.js";
import {
  RolesService
} from "./chunk-EHLSZ7TE.js";
import {
  BranchesService
} from "./chunk-VA62FO4C.js";
import {
  DepartmentsService
} from "./chunk-MPELPKFG.js";
import {
  EmployeesService
} from "./chunk-IR2IKZBB.js";
import {
  CommonFilterTypes,
  FILTER_CONFIGURATIONS
} from "./chunk-DS3UNCKJ.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-7XYWDBYG.js";
import {
  PermissionService
} from "./chunk-HT4DZZW3.js";
import "./chunk-6LEZROWG.js";
import {
  AuthService
} from "./chunk-HZ2IZU2F.js";
import {
  Router,
  RouterOutlet,
  Title,
  TitleStrategy,
  bootstrapApplication,
  provideRouter,
  withComponentInputBinding,
  withHashLocation
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  APP_INITIALIZER,
  BehaviorSubject,
  Component,
  HttpClient,
  Injectable,
  catchError,
  effect,
  inject,
  map,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideZoneChangeDetection,
  setClassMetadata,
  switchMap,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵgetInheritedFactory
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-EUAPD56R.js";

// src/app/core/auth/auth.guard.ts
var authGuard = /* @__PURE__ */ __name((route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }
  if (authService.isTokenExpired()) {
    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      authService.refreshToken().subscribe({
        error: /* @__PURE__ */ __name(() => {
          router.navigate(["/login"]);
        }, "error")
      });
    } else {
      router.navigate(["/login"]);
      return false;
    }
  }
  const requiredPermission = route.data?.["permission"];
  if (requiredPermission && !permissionService.has(requiredPermission)) {
    router.navigate(["/unauthorized"]);
    return false;
  }
  return true;
}, "authGuard");

// src/app/core/auth/guards/admin.guard.ts
var adminGuard = /* @__PURE__ */ __name((route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }
  if (authService.isAdmin() || authService.isSystemAdmin()) {
    return true;
  }
  const requiredPermission = route.data?.["permission"];
  if (requiredPermission && permissionService.has(requiredPermission)) {
    return true;
  }
  router.navigate(["/unauthorized"]);
  return false;
}, "adminGuard");

// src/app/core/auth/guards/manager.guard.ts
var managerGuard = /* @__PURE__ */ __name((route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }
  if (authService.isSystemAdmin() || authService.isAdmin() || permissionService.hasRole("Manager")) {
    return true;
  }
  const managementPermissions = [
    "employee.read",
    "employee.assign",
    "shift.read",
    "shift.assign",
    "department.read",
    "attendance.read",
    "report.read"
  ];
  if (permissionService.hasAny(managementPermissions)) {
    return true;
  }
  const requiredPermission = route.data?.["permission"];
  if (requiredPermission && permissionService.has(requiredPermission)) {
    return true;
  }
  router.navigate(["/unauthorized"]);
  return false;
}, "managerGuard");

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-OFVR2QB4.js").then((m) => m.LoginComponent), "loadComponent"),
    data: { title: "auth.login" }
  },
  {
    path: "auth/change-password",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PMXF4KUR.js").then((m) => m.ChangePasswordComponent), "loadComponent"),
    canMatch: [authGuard],
    data: { title: "auth.change_password" }
  },
  {
    path: "",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-HATR5UVM.js").then((m) => m.LayoutComponent), "loadComponent"),
    canMatch: [authGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GGFETQI7.js").then((m) => m.DashboardComponent), "loadComponent"),
        data: { title: "dashboard.title" }
      },
      {
        path: "users",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-SWIY2QHO.js").then((m) => m.UsersComponent), "loadComponent"),
        data: {
          title: "users.title",
          permission: "user.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-MEZL2VHB.js").then((m) => m.CreateUserPageComponent), "loadComponent"),
        data: {
          title: "users.create_user",
          permission: "user.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-7FMTGMGK.js").then((m) => m.ViewUserComponent), "loadComponent"),
        data: {
          title: "users.view_details",
          permission: "user.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GFCKCUVW.js").then((m) => m.EditUserPageComponent), "loadComponent"),
        data: {
          title: "users.edit_user",
          permission: "user.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QW24TSO3.js").then((m) => m.EmployeesComponent), "loadComponent"),
        data: {
          title: "employees.title",
          permission: "employee.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "employees/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-M7TBHSDW.js").then((m) => m.CreateEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.create_employee",
          permission: "employee.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-YYRNYWRT.js").then((m) => m.ViewEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.view_details",
          permission: "employee.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "employees/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QCTW6NEY.js").then((m) => m.EditEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.edit_employee",
          permission: "employee.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees/:employeeId/change-shift",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-2PJVZCEX.js").then((m) => m.ChangeEmployeeShiftComponent), "loadComponent"),
        data: {
          title: "employees.change_shift",
          permission: "employee.update"
        },
        canMatch: [managerGuard]
      },
      {
        path: "roles",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-LMVCI5ZU.js").then((m) => m.RolesComponent), "loadComponent"),
        data: {
          title: "roles.title",
          permission: "role.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NHFRWF5L.js").then((m) => m.CreateRoleComponent), "loadComponent"),
        data: {
          title: "roles.create_role",
          permission: "role.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-46GXOOPB.js").then((m) => m.ViewRoleComponent), "loadComponent"),
        data: {
          title: "roles.view_details",
          permission: "role.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-2RUFZR4D.js").then((m) => m.EditRoleComponent), "loadComponent"),
        data: {
          title: "roles.edit_role",
          permission: "role.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "branches",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-FHY3RU4T.js").then((m) => m.BranchesComponent), "loadComponent"),
        data: {
          title: "branches.title",
          permission: "branch.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "branches/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-T52XA5VS.js").then((m) => m.ViewBranchComponent), "loadComponent"),
        data: {
          title: "branches.view_details",
          permission: "branch.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "branches/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NOUWVPSN.js").then((m) => m.EditBranchComponent), "loadComponent"),
        data: {
          title: "branches.edit_branch",
          permission: "branch.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-XIJ23SSJ.js").then((m) => m.DepartmentsComponent), "loadComponent"),
        data: {
          title: "departments.title",
          permission: "department.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-DCS6Q65A.js").then((m) => m.CreateDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.create",
          permission: "department.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GRHDOS4V.js").then((m) => m.ViewDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.view_details",
          permission: "department.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-I4XHLFU6.js").then((m) => m.EditDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.edit",
          permission: "department.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "shifts",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-TQP6X2AZ.js").then((m) => m.ShiftsComponent), "loadComponent"),
        data: {
          title: "shifts.title",
          permission: "shift.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "shifts/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-W4534RHA.js").then((m) => m.CreateShiftComponent), "loadComponent"),
        data: {
          title: "shifts.create_shift",
          permission: "shift.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "shifts/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-VF5DMHCS.js").then((m) => m.ViewShiftComponent), "loadComponent"),
        data: {
          title: "shifts.view_details",
          permission: "shift.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "shifts/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QN5KCED5.js").then((m) => m.EditShiftComponent), "loadComponent"),
        data: {
          title: "shifts.edit_shift",
          permission: "shift.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "shifts/assign",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-TKMYYB5V.js").then((m) => m.AssignShiftsComponent), "loadComponent"),
        data: {
          title: "shifts.assignments.title",
          permission: "shift.assign"
        },
        canMatch: [managerGuard]
      },
      {
        path: "attendance",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-T7G5O77V.js").then((m) => m.AttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.dashboard_title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/daily",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-G3IOVJ6T.js").then((m) => m.DailyAttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.daily_view",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/monthly-report",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-WPRNW7YV.js").then((m) => m.MonthlyReportComponent), "loadComponent"),
        data: {
          title: "attendance.monthly_report",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/daily-detail/:employeeId/:date",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-OOBNEYED.js").then((m) => m.DailyAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.daily_detail.title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/employee-history",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QMOQTXDD.js").then((m) => m.EmployeeAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.employee_history.title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/employee/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QMOQTXDD.js").then((m) => m.EmployeeAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.employee_detail",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-3JGIKRQ6.js").then((m) => m.EditAttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.edit.title",
          permission: "attendance.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/:attendanceId/change-shift",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-2XI5Z6NF.js").then((m) => m.ChangeAttendanceShiftComponent), "loadComponent"),
        data: {
          title: "attendance.change_shift_title",
          permission: "attendance.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "settings",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-VVJ3KZD2.js").then((m) => m.SettingsComponent), "loadComponent"),
        data: { title: "settings.title" }
      },
      {
        path: "settings/overtime",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-4MG6UF27.js").then((m) => m.OvertimeConfigurationsComponent), "loadComponent"),
        data: {
          title: "settings.overtime.title",
          permission: "settings.overtime.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-YERUAY5D.js").then((m) => m.CreateOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.create",
          permission: "settings.overtime.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-EZH3LII3.js").then((m) => m.EditOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.edit",
          permission: "settings.overtime.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-RMN3ELZU.js").then((m) => m.ViewOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.view_details",
          permission: "settings.overtime.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-USOZFBN7.js").then((m) => m.PublicHolidaysComponent), "loadComponent"),
        data: {
          title: "settings.holidays.title",
          permission: "publicHoliday.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-G7HFJNQG.js").then((m) => m.CreatePublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.create",
          permission: "publicHoliday.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-E4DLYXSQ.js").then((m) => m.ViewPublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.view_details",
          permission: "publicHoliday.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-VMJBQGYE.js").then((m) => m.EditPublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.edit",
          permission: "publicHoliday.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "reports/attendance",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-5MRFHDG4.js").then((m) => m.AttendanceReportComponent), "loadComponent"),
        data: {
          title: "reports.attendance",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "reports/leaves",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JMIKHR3A.js").then((m) => m.LeaveReportComponent), "loadComponent"),
        data: {
          title: "reports.leaves",
          permission: "vacation.read"
        },
        canMatch: [authGuard]
      },
      // Vacation Types Routes
      {
        path: "vacation-types",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-2ZQDSY5X.js").then((m) => m.VacationTypesComponent), "loadComponent"),
        data: {
          title: "vacation_types.title",
          permission: "vacationType.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "vacation-types/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-3FVDAI3J.js").then((m) => m.ViewVacationTypeComponent), "loadComponent"),
        data: {
          title: "vacation_types.view_details",
          permission: "vacationType.read"
        },
        canMatch: [managerGuard]
      },
      // Employee Vacations Routes
      {
        path: "employee-vacations",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-OE2MWUNJ.js").then((m) => m.EmployeeVacationsComponent), "loadComponent"),
        data: {
          title: "employee_vacations.title",
          permission: "vacation.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-SOFFDG4L.js").then((m) => m.CreateEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.create_vacation",
          permission: "vacation.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-HDF4XA4K.js").then((m) => m.ViewEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.view_details",
          permission: "vacation.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JG6XYTDS.js").then((m) => m.EditEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.edit_vacation",
          permission: "vacation.update"
        },
        canMatch: [authGuard]
      },
      // Employee Excuses Routes
      {
        path: "employee-excuses",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-W7KOTGE2.js").then((m) => m.EmployeeExcusesComponent), "loadComponent"),
        data: {
          title: "employee_excuses.title",
          permission: "excuse.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-FEE25L5D.js").then((m) => m.ExcuseRequestFormComponent), "loadComponent"),
        data: {
          title: "employee_excuses.create_request",
          permission: "excuse.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-O3YO44UE.js").then((m) => m.ExcuseDetailsComponent), "loadComponent"),
        data: {
          title: "employee_excuses.excuse_details",
          permission: "excuse.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-FEE25L5D.js").then((m) => m.ExcuseRequestFormComponent), "loadComponent"),
        data: {
          title: "employee_excuses.edit_request",
          permission: "excuse.update"
        },
        canMatch: [authGuard]
      },
      // Remote Work Routes
      {
        path: "remote-work",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-AZASXLGP.js").then((m) => m.RemoteWorkListComponent), "loadComponent"),
        data: {
          title: "remoteWork.request.title",
          permission: "remoteWork.request.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "remote-work/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-MSJ2RKTU.js").then((m) => m.AssignRemoteWorkComponent), "loadComponent"),
        data: {
          title: "remoteWork.request.create",
          permission: "remoteWork.request.create"
        },
        canMatch: [managerGuard]
      },
      {
        path: "remote-work/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-N2IOO6OZ.js").then((m) => m.ViewRemoteWorkAssignmentComponent), "loadComponent"),
        data: {
          title: "remoteWork.request.view_details",
          permission: "remoteWork.request.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "remote-work/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-HNYH7HKL.js").then((m) => m.EditRemoteWorkComponent), "loadComponent"),
        data: {
          title: "remoteWork.request.edit",
          permission: "remoteWork.request.update"
        },
        canMatch: [managerGuard]
      },
      {
        path: "settings/remote-work-policy",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-IRLI62UQ.js").then((m) => m.RemoteWorkPolicyListComponent), "loadComponent"),
        data: {
          title: "remoteWork.policy.title",
          permission: "remoteWork.policy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/remote-work-policy/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-I7GLDVIJ.js").then((m) => m.CreateRemoteWorkPolicyComponent), "loadComponent"),
        data: {
          title: "remoteWork.policy.create_policy",
          permission: "remoteWork.policy.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/remote-work-policy/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NY2ADYQC.js").then((m) => m.ViewRemoteWorkPolicyComponent), "loadComponent"),
        data: {
          title: "remoteWork.policy.policy_details",
          permission: "remoteWork.policy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/remote-work-policy/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-3H3AJFCX.js").then((m) => m.EditRemoteWorkPolicyComponent), "loadComponent"),
        data: {
          title: "remoteWork.policy.edit_policy",
          permission: "remoteWork.policy.update"
        },
        canMatch: [adminGuard]
      },
      // Excuse Policies Routes
      {
        path: "settings/excuse-policies",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-SC6HF6HN.js").then((m) => m.ExcusePoliciesComponent), "loadComponent"),
        data: {
          title: "excuse_policies.title",
          permission: "settings.excusePolicy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-A3ENWKTZ.js").then((m) => m.CreateExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.create_policy",
          permission: "settings.excusePolicy.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-KAHBSC37.js").then((m) => m.ViewExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.view_policy",
          permission: "settings.excusePolicy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-W676VSOP.js").then((m) => m.EditExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.edit_policy",
          permission: "settings.excusePolicy.update"
        },
        canMatch: [adminGuard]
      },
      // Workflow Routes
      {
        path: "settings/workflows",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-KIIZFBXF.js").then((m) => m.WorkflowListComponent), "loadComponent"),
        data: {
          title: "workflows.title",
          permission: "workflow.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/workflows/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-5XPWBAAN.js").then((m) => m.WorkflowFormComponent), "loadComponent"),
        data: {
          title: "workflows.create_workflow",
          permission: "workflow.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/workflows/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-5XPWBAAN.js").then((m) => m.WorkflowFormComponent), "loadComponent"),
        data: {
          title: "workflows.view_workflow",
          permission: "workflow.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/workflows/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-5XPWBAAN.js").then((m) => m.WorkflowFormComponent), "loadComponent"),
        data: {
          title: "workflows.edit_workflow",
          permission: "workflow.update"
        },
        canMatch: [adminGuard]
      },
      // Leave Entitlements Routes
      {
        path: "settings/leave-entitlements",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-AGE4HJFE.js").then((m) => m.LeaveEntitlementsListComponent), "loadComponent"),
        data: {
          title: "leaveBalance.leaveEntitlements",
          permission: "leaveBalance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "settings/leave-entitlements/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PNRNGXOJ.js").then((m) => m.LeaveEntitlementFormComponent), "loadComponent"),
        data: {
          title: "leaveBalance.createEntitlementTitle",
          permission: "leaveBalance.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "settings/leave-entitlements/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PNRNGXOJ.js").then((m) => m.LeaveEntitlementFormComponent), "loadComponent"),
        data: {
          title: "leaveBalance.editEntitlementTitle",
          permission: "leaveBalance.update"
        },
        canMatch: [authGuard]
      },
      // Approvals Routes
      {
        path: "approvals",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-C3CY67GX.js").then((m) => m.PendingApprovalsComponent), "loadComponent"),
        data: {
          title: "approvals.pending_title",
          permission: "approval.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "approvals/history",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-FAMQUZFP.js").then((m) => m.ApprovalHistoryComponent), "loadComponent"),
        data: {
          title: "approvals.history_title",
          permission: "approval.read"
        },
        canMatch: [authGuard]
      },
      // Reports Routes
      {
        path: "reports/sessions",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-BLLNYIWJ.js").then((m) => m.SessionsComponent), "loadComponent"),
        data: {
          title: "sessions.title",
          permission: "session.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "reports/audit-logs",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-63DE5DGO.js").then((m) => m.AuditLogsComponent), "loadComponent"),
        data: {
          title: "audit_logs.title",
          permission: "audit.read"
        },
        canMatch: [adminGuard]
      }
    ]
  },
  {
    path: "unauthorized",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QCMKR5TD.js").then((m) => m.UnauthorizedComponent), "loadComponent"),
    data: { title: "Unauthorized Access" }
  },
  {
    path: "**",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NHQOYO56.js").then((m) => m.NotFoundComponent), "loadComponent"),
    data: { title: "Page Not Found" }
  }
];

// src/app/core/auth/auth.interceptor.ts
var authInterceptor = /* @__PURE__ */ __name((req, next) => {
  const authService = inject(AuthService);
  if (req.url.includes("/auth/login") || req.url.includes("/auth/refresh")) {
    return next(req);
  }
  const token = authService.getAccessToken();
  let authReq = req;
  if (token) {
    authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });
  }
  return next(authReq).pipe(catchError((error) => {
    if (error.status === 401 && !req.url.includes("/auth/refresh")) {
      if (authService.getRefreshToken()) {
        return authService.refreshToken().pipe(switchMap(() => {
          const newToken = authService.getAccessToken();
          const retryReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${newToken}`)
          });
          return next(retryReq);
        }), catchError((refreshError) => {
          authService.logout();
          return throwError(() => refreshError);
        }));
      } else {
        authService.logout();
      }
    }
    return throwError(() => error);
  }));
}, "authInterceptor");

// src/app/core/title/app-title.strategy.ts
var _AppTitleStrategy = class _AppTitleStrategy extends TitleStrategy {
  title = inject(Title);
  i18n = inject(I18nService);
  updateTitle(routerState) {
    const title = this.buildTitle(routerState);
    if (title) {
      const translatedTitle = this.i18n.t(title);
      const finalTitle = `${translatedTitle} | Time Attendance System`;
      this.title.setTitle(finalTitle);
    } else {
      this.title.setTitle("Time Attendance System");
    }
  }
};
__name(_AppTitleStrategy, "AppTitleStrategy");
__publicField(_AppTitleStrategy, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275AppTitleStrategy_BaseFactory;
  return /* @__PURE__ */ __name(function AppTitleStrategy_Factory(__ngFactoryType__) {
    return (\u0275AppTitleStrategy_BaseFactory || (\u0275AppTitleStrategy_BaseFactory = \u0275\u0275getInheritedFactory(_AppTitleStrategy)))(__ngFactoryType__ || _AppTitleStrategy);
  }, "AppTitleStrategy_Factory");
})());
__publicField(_AppTitleStrategy, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AppTitleStrategy, factory: _AppTitleStrategy.\u0275fac, providedIn: "root" }));
var AppTitleStrategy = _AppTitleStrategy;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppTitleStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/filter-registry.service.ts
var _FilterRegistryService = class _FilterRegistryService {
  http = inject(HttpClient);
  i18n = inject(I18nService);
  branchesService = inject(BranchesService);
  departmentsService = inject(DepartmentsService);
  employeesService = inject(EmployeesService);
  shiftsService = inject(ShiftsService);
  vacationTypesService = inject(VacationTypesService);
  rolesService = inject(RolesService);
  authService = inject(AuthService);
  registry = {};
  dataCache = new BehaviorSubject({});
  dataInitialized = false;
  constructor() {
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated();
      if (isAuthenticated && !this.dataInitialized) {
        this.initializeCommonData();
        this.dataInitialized = true;
      } else if (!isAuthenticated) {
        this.dataCache.next({});
        this.dataInitialized = false;
      }
    });
  }
  registerModule(moduleName, config) {
    this.registry[moduleName] = config;
  }
  getModuleConfig(moduleName) {
    return this.registry[moduleName] || null;
  }
  getAllModules() {
    return Object.keys(this.registry);
  }
  initializeCommonData() {
    this.loadBranches();
    this.initShiftsData();
    this.initRolesData();
  }
  loadBranches() {
    this.branchesService.getBranches(1, 1e3).subscribe({
      next: /* @__PURE__ */ __name((result) => {
        const currentData = this.dataCache.value;
        this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
          branches: result.items
        }));
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches for filter registry:", error);
      }, "error")
    });
  }
  loadDepartments(branchId) {
    return this.departmentsService.getDepartments(branchId ? { branchId } : {}).pipe(map((departments) => {
      const currentData = this.dataCache.value;
      const cacheKey = branchId ? `departments_${branchId}` : "departments_all";
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        [cacheKey]: departments
      }));
      return departments;
    }));
  }
  loadEmployees(branchId) {
    return this.employeesService.getEmployeesForSelection(branchId).pipe(map((employees) => {
      const currentData = this.dataCache.value;
      const cacheKey = branchId ? `employees_${branchId}` : "employees_all";
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        [cacheKey]: employees
      }));
      return employees;
    }));
  }
  loadShifts(branchId) {
    return this.shiftsService.getShifts(1, 1e3).pipe(map((response) => {
      const shifts = response.items || [];
      const currentData = this.dataCache.value;
      const cacheKey = branchId ? `shifts_${branchId}` : "shifts_all";
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        [cacheKey]: shifts,
        shifts
      }));
      return shifts;
    }));
  }
  initShiftsData() {
    this.loadShifts().subscribe({
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load shifts for filter registry:", error);
      }, "error")
    });
  }
  loadVacationTypes(branchId) {
    return this.vacationTypesService.getVacationTypes({ branchId }).pipe(map((response) => {
      const vacationTypes = response.items || [];
      const currentData = this.dataCache.value;
      const cacheKey = branchId ? `vacationTypes_${branchId}` : "vacationTypes_all";
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        [cacheKey]: vacationTypes,
        vacationTypes
      }));
      return vacationTypes;
    }));
  }
  loadRoles() {
    return this.rolesService.getRoles().pipe(map((roles) => {
      const currentData = this.dataCache.value;
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        roles
      }));
      return roles;
    }));
  }
  initRolesData() {
    this.loadRoles().subscribe({
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load roles for filter registry:", error);
      }, "error")
    });
  }
  getCachedData() {
    return this.dataCache.asObservable();
  }
  buildFilterOptions(filterDef, cachedData, currentFilters) {
    const allOption = {
      value: "",
      label: this.i18n.t("common.all")
    };
    switch (filterDef.type) {
      case CommonFilterTypes.Branch:
        return [
          allOption,
          ...(cachedData.branches || []).map((branch) => ({
            value: branch.id.toString(),
            label: branch.name,
            subLabel: branch.code
          }))
        ];
      case CommonFilterTypes.Department:
        const branchIdForDepts = filterDef.dependsOn && currentFilters ? currentFilters[filterDef.dependsOn] : null;
        const departmentKey = branchIdForDepts ? `departments_${branchIdForDepts}` : "departments_all";
        return [
          allOption,
          ...(cachedData[departmentKey] || []).map((dept) => ({
            value: dept.id.toString(),
            label: dept.name,
            subLabel: dept.nameAr
          }))
        ];
      case CommonFilterTypes.Employee:
        const branchIdForEmps = filterDef.dependsOn && currentFilters ? currentFilters[filterDef.dependsOn] : null;
        const employeeKey = branchIdForEmps ? `employees_${branchIdForEmps}` : "employees_all";
        return [
          allOption,
          ...(cachedData[employeeKey] || []).map((emp) => ({
            value: emp.id.toString(),
            label: emp.name,
            subLabel: emp.employeeNumber
          }))
        ];
      case CommonFilterTypes.Status:
        if (filterDef.statusEnum && filterDef.statusLabels) {
          return [
            allOption,
            ...Object.keys(filterDef.statusEnum).filter((key) => isNaN(Number(key))).map((key) => ({
              value: filterDef.statusEnum[key],
              label: this.i18n.t(filterDef.statusLabels[key] || key)
            }))
          ];
        }
        return [allOption];
      case CommonFilterTypes.Shift:
        const shiftKey = filterDef.dependsOn ? `shifts_${cachedData[filterDef.dependsOn]}` : "shifts_all";
        return [
          allOption,
          ...(cachedData[shiftKey] || cachedData.shifts || []).map((shift) => ({
            value: shift.id.toString(),
            label: shift.name,
            subLabel: shift.description || shift.shiftType
          }))
        ];
      case CommonFilterTypes.VacationType:
        const vacationTypeKey = filterDef.dependsOn ? `vacationTypes_${cachedData[filterDef.dependsOn]}` : "vacationTypes_all";
        return [
          allOption,
          ...(cachedData[vacationTypeKey] || cachedData.vacationTypes || []).map((vacationType) => ({
            value: vacationType.id.toString(),
            label: vacationType.name,
            subLabel: vacationType.nameAr
          }))
        ];
      case CommonFilterTypes.Role:
        return [
          allOption,
          ...(cachedData.roles || []).map((role) => ({
            value: role.id.toString(),
            label: role.name,
            subLabel: role.type
          }))
        ];
      case CommonFilterTypes.Custom:
        return filterDef.options?.map((option) => __spreadProps(__spreadValues({}, option), {
          label: this.i18n.t(option.label)
        })) || [allOption];
      default:
        return [allOption];
    }
  }
  buildActiveInactiveOptions() {
    return [
      { value: "", label: this.i18n.t("common.all") },
      { value: "true", label: this.i18n.t("common.active") },
      { value: "false", label: this.i18n.t("common.inactive") }
    ];
  }
  clearCache() {
    this.dataCache.next({});
    if (this.authService.isAuthenticated()) {
      this.initializeCommonData();
    }
  }
};
__name(_FilterRegistryService, "FilterRegistryService");
__publicField(_FilterRegistryService, "\u0275fac", /* @__PURE__ */ __name(function FilterRegistryService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilterRegistryService)();
}, "FilterRegistryService_Factory"));
__publicField(_FilterRegistryService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FilterRegistryService, factory: _FilterRegistryService.\u0275fac, providedIn: "root" }));
var FilterRegistryService = _FilterRegistryService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterRegistryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/core/services/filter-initialization.service.ts
var _FilterInitializationService = class _FilterInitializationService {
  filterRegistry = inject(FilterRegistryService);
  constructor() {
    this.initializeConfigurations();
  }
  initializeConfigurations() {
    Object.keys(FILTER_CONFIGURATIONS).forEach((moduleName) => {
      this.filterRegistry.registerModule(moduleName, FILTER_CONFIGURATIONS[moduleName]);
    });
    console.log(`Registered ${Object.keys(FILTER_CONFIGURATIONS).length} filter configurations`);
  }
  // Method to re-initialize if needed
  reinitialize() {
    this.initializeConfigurations();
  }
  // Method to get all registered modules
  getRegisteredModules() {
    return this.filterRegistry.getAllModules();
  }
};
__name(_FilterInitializationService, "FilterInitializationService");
__publicField(_FilterInitializationService, "\u0275fac", /* @__PURE__ */ __name(function FilterInitializationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilterInitializationService)();
}, "FilterInitializationService_Factory"));
__publicField(_FilterInitializationService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FilterInitializationService, factory: _FilterInitializationService.\u0275fac, providedIn: "root" }));
var FilterInitializationService = _FilterInitializationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterInitializationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: /* @__PURE__ */ __name((filterInitService) => () => {
        console.log("Initializing filter configurations...");
        return Promise.resolve();
      }, "useFactory"),
      deps: [FilterInitializationService],
      multi: true
    }
  ]
};

// src/app/app.ts
var _App = class _App {
  i18n;
  constructor(i18n) {
    this.i18n = i18n;
  }
  ngOnInit() {
    const savedLocale = localStorage.getItem("app_locale") || "en";
    this.i18n.setLocale(savedLocale);
  }
};
__name(_App, "App");
__publicField(_App, "\u0275fac", /* @__PURE__ */ __name(function App_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _App)(\u0275\u0275directiveInject(I18nService));
}, "App_Factory"));
__publicField(_App, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: /* @__PURE__ */ __name(function App_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}, "App_Template"), dependencies: [RouterOutlet], encapsulation: 2 }));
var App = _App;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "<router-outlet />\n" }]
  }], () => [{ type: I18nService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
