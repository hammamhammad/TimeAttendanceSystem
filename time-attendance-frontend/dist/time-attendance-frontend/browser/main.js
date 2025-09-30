import {
  VacationTypesService
} from "./chunk-SVB2YIGO.js";
import {
  ExcusePoliciesService
} from "./chunk-X6RX6YJF.js";
import {
  ShiftsService
} from "./chunk-BDBUQZLA.js";
import {
  BranchesService
} from "./chunk-GHUXGLMI.js";
import {
  DepartmentsService
} from "./chunk-ZEREPA2X.js";
import {
  EmployeesService
} from "./chunk-WMEU4YDP.js";
import {
  RolesService
} from "./chunk-VGYB4IQS.js";
import {
  CommonFilterTypes,
  FILTER_CONFIGURATIONS
} from "./chunk-3AZFD5ID.js";
import "./chunk-MMUPQRFG.js";
import "./chunk-T6ZZRW4R.js";
import {
  PermissionService
} from "./chunk-DKGIYIS4.js";
import {
  AuthService
} from "./chunk-IL4NCC2P.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  APP_INITIALIZER,
  BehaviorSubject,
  Component,
  HttpClient,
  Injectable,
  Router,
  RouterOutlet,
  Title,
  TitleStrategy,
  bootstrapApplication,
  catchError,
  inject,
  map,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  switchMap,
  throwError,
  withComponentInputBinding,
  withHashLocation,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵgetInheritedFactory
} from "./chunk-54H4HALB.js";
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
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-J2GEFWVQ.js").then((m) => m.LoginComponent), "loadComponent"),
    data: { title: "auth.login" }
  },
  {
    path: "",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PHOBOBNQ.js").then((m) => m.LayoutComponent), "loadComponent"),
    canMatch: [authGuard],
    children: [
      {
        path: "dashboard",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-6OPECNJS.js").then((m) => m.DashboardComponent), "loadComponent"),
        data: { title: "dashboard.title" }
      },
      {
        path: "users",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-RRJ4WS2L.js").then((m) => m.UsersComponent), "loadComponent"),
        data: {
          title: "users.title",
          permission: "user.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-UOWAEINV.js").then((m) => m.CreateUserPageComponent), "loadComponent"),
        data: {
          title: "users.create_user",
          permission: "user.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-VA46VUGB.js").then((m) => m.ViewUserComponent), "loadComponent"),
        data: {
          title: "users.view_details",
          permission: "user.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "users/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-WFEEFKPC.js").then((m) => m.EditUserPageComponent), "loadComponent"),
        data: {
          title: "users.edit_user",
          permission: "user.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JP4LZ6VA.js").then((m) => m.EmployeesComponent), "loadComponent"),
        data: {
          title: "employees.title",
          permission: "employee.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "employees/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-FJAH6NWV.js").then((m) => m.CreateEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.create_employee",
          permission: "employee.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-27PSSOLA.js").then((m) => m.ViewEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.view_details",
          permission: "employee.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "employees/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NGZHSOVJ.js").then((m) => m.EditEmployeeComponent), "loadComponent"),
        data: {
          title: "employees.edit_employee",
          permission: "employee.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "employees/:employeeId/change-shift",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-6IS6VA6M.js").then((m) => m.ChangeEmployeeShiftComponent), "loadComponent"),
        data: {
          title: "employees.change_shift",
          permission: "employee.update"
        },
        canMatch: [managerGuard]
      },
      {
        path: "roles",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-AWWYH3X3.js").then((m) => m.RolesComponent), "loadComponent"),
        data: {
          title: "roles.title",
          permission: "role.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-KCBAGLIS.js").then((m) => m.CreateRoleComponent), "loadComponent"),
        data: {
          title: "roles.create_role",
          permission: "role.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PDTY7XR7.js").then((m) => m.ViewRoleComponent), "loadComponent"),
        data: {
          title: "roles.view_details",
          permission: "role.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "roles/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-UWJ4YJYJ.js").then((m) => m.EditRoleComponent), "loadComponent"),
        data: {
          title: "roles.edit_role",
          permission: "role.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "branches",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-VULYJ2I2.js").then((m) => m.BranchesComponent), "loadComponent"),
        data: {
          title: "branches.title",
          permission: "branch.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "branches/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-SPDXRXE7.js").then((m) => m.ViewBranchComponent), "loadComponent"),
        data: {
          title: "branches.view_details",
          permission: "branch.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "branches/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-Y7PXPDXJ.js").then((m) => m.EditBranchComponent), "loadComponent"),
        data: {
          title: "branches.edit_branch",
          permission: "branch.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-BLHSMRIC.js").then((m) => m.DepartmentsComponent), "loadComponent"),
        data: {
          title: "departments.title",
          permission: "department.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-HBZ2WUCS.js").then((m) => m.CreateDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.create",
          permission: "department.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-BZPE3JAR.js").then((m) => m.ViewDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.view_details",
          permission: "department.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "departments/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-TW6K6OUP.js").then((m) => m.EditDepartmentComponent), "loadComponent"),
        data: {
          title: "departments.edit",
          permission: "department.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "shifts",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-ZHP3IIXG.js").then((m) => m.ShiftsComponent), "loadComponent"),
        data: {
          title: "shifts.title",
          permission: "shift.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "shifts/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-OW3YWCWL.js").then((m) => m.CreateShiftComponent), "loadComponent"),
        data: {
          title: "shifts.create_shift",
          permission: "shift.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "shifts/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QN5JTY2W.js").then((m) => m.ViewShiftComponent), "loadComponent"),
        data: {
          title: "shifts.view_details",
          permission: "shift.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "shifts/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-2SWBC6HQ.js").then((m) => m.EditShiftComponent), "loadComponent"),
        data: {
          title: "shifts.edit_shift",
          permission: "shift.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "shifts/assign",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-MU5NA4EH.js").then((m) => m.AssignShiftsComponent), "loadComponent"),
        data: {
          title: "shifts.assignments.title",
          permission: "shift.assign"
        },
        canMatch: [managerGuard]
      },
      {
        path: "attendance",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-APYRJOCD.js").then((m) => m.AttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.dashboard_title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/daily",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-4R75JKZS.js").then((m) => m.DailyAttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.daily_view",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/monthly-report",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GZ5CTA56.js").then((m) => m.MonthlyReportComponent), "loadComponent"),
        data: {
          title: "attendance.monthly_report",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/daily-detail/:employeeId/:date",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-ZUFS2GQQ.js").then((m) => m.DailyAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.daily_detail.title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/employee-history",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-27O5EUEC.js").then((m) => m.EmployeeAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.employee_history.title",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/employee/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-27O5EUEC.js").then((m) => m.EmployeeAttendanceDetailComponent), "loadComponent"),
        data: {
          title: "attendance.employee_detail",
          permission: "attendance.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-UBXZ4U7E.js").then((m) => m.EditAttendanceComponent), "loadComponent"),
        data: {
          title: "attendance.edit.title",
          permission: "attendance.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "attendance/:attendanceId/change-shift",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GM2EVGWJ.js").then((m) => m.ChangeAttendanceShiftComponent), "loadComponent"),
        data: {
          title: "attendance.change_shift_title",
          permission: "attendance.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "settings",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-SRXZMX2X.js").then((m) => m.SettingsComponent), "loadComponent"),
        data: { title: "settings.title" }
      },
      {
        path: "settings/overtime",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-TW2QVESY.js").then((m) => m.OvertimeConfigurationsComponent), "loadComponent"),
        data: {
          title: "settings.overtime.title",
          permission: "settings.overtime.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-E7GROBJ5.js").then((m) => m.CreateOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.create",
          permission: "settings.overtime.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/edit/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-UZPJ4HWG.js").then((m) => m.EditOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.edit",
          permission: "settings.overtime.update"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/overtime/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PDSDP3CK.js").then((m) => m.ViewOvertimeConfigurationComponent), "loadComponent"),
        data: {
          title: "settings.overtime.view_details",
          permission: "settings.overtime.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-ZTK2WL5Q.js").then((m) => m.PublicHolidaysComponent), "loadComponent"),
        data: {
          title: "settings.holidays.title",
          permission: "publicHoliday.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JFV2EQDT.js").then((m) => m.CreatePublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.create",
          permission: "publicHoliday.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-GX6GUXYW.js").then((m) => m.ViewPublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.view_details",
          permission: "publicHoliday.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/public-holidays/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-WDAEAY6G.js").then((m) => m.EditPublicHolidayComponent), "loadComponent"),
        data: {
          title: "settings.holidays.edit",
          permission: "publicHoliday.update"
        },
        canMatch: [adminGuard]
      },
      // Vacation Types Routes
      {
        path: "vacation-types",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-3KVCCVCY.js").then((m) => m.VacationTypesComponent), "loadComponent"),
        data: {
          title: "vacation_types.title",
          permission: "vacationType.read"
        },
        canMatch: [managerGuard]
      },
      {
        path: "vacation-types/:id",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-PBE7VOIQ.js").then((m) => m.ViewVacationTypeComponent), "loadComponent"),
        data: {
          title: "vacation_types.view_details",
          permission: "vacationType.read"
        },
        canMatch: [managerGuard]
      },
      // Employee Vacations Routes
      {
        path: "employee-vacations",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-RIDGUHRU.js").then((m) => m.EmployeeVacationsComponent), "loadComponent"),
        data: {
          title: "employee_vacations.title",
          permission: "vacation.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JMWMS3WS.js").then((m) => m.CreateEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.create_vacation",
          permission: "vacation.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-M7NLBGTU.js").then((m) => m.ViewEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.view_details",
          permission: "vacation.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-vacations/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-3U44TA7U.js").then((m) => m.EditEmployeeVacationComponent), "loadComponent"),
        data: {
          title: "employee_vacations.edit_vacation",
          permission: "vacation.update"
        },
        canMatch: [authGuard]
      },
      {
        path: "settings/excuse-policies",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-WX3RRT2F.js").then((m) => m.ExcusePoliciesComponent), "loadComponent"),
        data: {
          title: "excuse_policies.title",
          permission: "settings.excusePolicy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-DMRH7SBH.js").then((m) => m.CreateExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.create_policy",
          permission: "settings.excusePolicy.create"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-EWKMKEII.js").then((m) => m.ViewExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.view_details",
          permission: "settings.excusePolicy.read"
        },
        canMatch: [adminGuard]
      },
      {
        path: "settings/excuse-policies/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-DFX4B24O.js").then((m) => m.EditExcusePolicyComponent), "loadComponent"),
        data: {
          title: "excuse_policies.edit_policy",
          permission: "settings.excusePolicy.update"
        },
        canMatch: [adminGuard]
      },
      // Employee Excuses Routes
      {
        path: "employee-excuses",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-QBZWDZ3O.js").then((m) => m.EmployeeExcusesComponent), "loadComponent"),
        data: {
          title: "employee_excuses.title",
          permission: "excuse.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/create",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NZMNLLD7.js").then((m) => m.ExcuseRequestFormComponent), "loadComponent"),
        data: {
          title: "employee_excuses.create_request",
          permission: "excuse.create"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/:id/view",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-CPQMJABY.js").then((m) => m.ExcuseDetailsComponent), "loadComponent"),
        data: {
          title: "employee_excuses.excuse_details",
          permission: "excuse.read"
        },
        canMatch: [authGuard]
      },
      {
        path: "employee-excuses/:id/edit",
        loadComponent: /* @__PURE__ */ __name(() => import("./chunk-NZMNLLD7.js").then((m) => m.ExcuseRequestFormComponent), "loadComponent"),
        data: {
          title: "employee_excuses.edit_request",
          permission: "excuse.update"
        },
        canMatch: [authGuard]
      }
    ]
  },
  {
    path: "unauthorized",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-JQ34FTXB.js").then((m) => m.UnauthorizedComponent), "loadComponent"),
    data: { title: "Unauthorized Access" }
  },
  {
    path: "**",
    loadComponent: /* @__PURE__ */ __name(() => import("./chunk-ZQYX425E.js").then((m) => m.NotFoundComponent), "loadComponent"),
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
  excusePoliciesService = inject(ExcusePoliciesService);
  registry = {};
  dataCache = new BehaviorSubject({});
  constructor() {
    this.initializeCommonData();
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
  loadExcusePolicies(branchId) {
    return this.excusePoliciesService.getExcusePolicies({ branchId }).pipe(map((response) => {
      const excusePolicies = response.items || [];
      const currentData = this.dataCache.value;
      const cacheKey = branchId ? `excusePolicies_${branchId}` : "excusePolicies_all";
      this.dataCache.next(__spreadProps(__spreadValues({}, currentData), {
        [cacheKey]: excusePolicies,
        excusePolicies
      }));
      return excusePolicies;
    }));
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
      case CommonFilterTypes.ExcusePolicy:
        const excusePolicyKey = filterDef.dependsOn ? `excusePolicies_${cachedData[filterDef.dependsOn]}` : "excusePolicies_all";
        return [
          allOption,
          ...(cachedData[excusePolicyKey] || cachedData.excusePolicies || []).map((policy) => ({
            value: policy.id.toString(),
            label: policy.branchName || "Organization Wide",
            subLabel: policy.maxExcusesPerMonth ? `${policy.maxExcusesPerMonth}/month` : ""
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
    this.initializeCommonData();
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
