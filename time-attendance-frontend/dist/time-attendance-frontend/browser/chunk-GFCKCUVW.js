import {
  UserFormComponent
} from "./chunk-SWYVJKM7.js";
import "./chunk-YPZLTOXZ.js";
import "./chunk-I3BAAGQQ.js";
import {
  UsersService
} from "./chunk-P7LM43DG.js";
import "./chunk-CVUMC7BN.js";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from "./chunk-APWG5MB4.js";
import {
  I18nService
} from "./chunk-GNCBCLZN.js";
import "./chunk-ZTCQ26FY.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/edit-user-page/edit-user-page.component.ts
function EditUserPageComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
  }
}
__name(EditUserPageComponent_Conditional_0_Template, "EditUserPageComponent_Conditional_0_Template");
function EditUserPageComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 6);
    \u0275\u0275element(2, "i", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "button", 9);
    \u0275\u0275element(6, "i", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("users.system_admin_cannot_be_edited"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.back"), " ");
  }
}
__name(EditUserPageComponent_Conditional_1_Conditional_0_Template, "EditUserPageComponent_Conditional_1_Conditional_0_Template");
function EditUserPageComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-user-form", 11);
    \u0275\u0275listener("userSaved", /* @__PURE__ */ __name(function EditUserPageComponent_Conditional_1_Conditional_1_Template_app_user_form_userSaved_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onUserSaved($event));
    }, "EditUserPageComponent_Conditional_1_Conditional_1_Template_app_user_form_userSaved_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("user", ctx_r0.user())("show", true);
  }
}
__name(EditUserPageComponent_Conditional_1_Conditional_1_Template, "EditUserPageComponent_Conditional_1_Conditional_1_Template");
function EditUserPageComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EditUserPageComponent_Conditional_1_Conditional_0_Template, 8, 2, "div", 4)(1, EditUserPageComponent_Conditional_1_Conditional_1_Template, 1, 2, "app-user-form", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isSystemAdmin(ctx_r0.user()) ? 0 : 1);
  }
}
__name(EditUserPageComponent_Conditional_1_Template, "EditUserPageComponent_Conditional_1_Template");
function EditUserPageComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error() || ctx_r0.i18n.t("users.user_not_found"), " ");
  }
}
__name(EditUserPageComponent_Conditional_2_Template, "EditUserPageComponent_Conditional_2_Template");
var _EditUserPageComponent = class _EditUserPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);
  i18n = inject(I18nService);
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal("", ...ngDevMode ? [{ debugName: "error" }] : []);
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("id");
    if (userId) {
      this.loadUser(userId);
    } else {
      this.error.set("Invalid user ID");
      this.loading.set(false);
    }
  }
  isSystemAdmin(user) {
    return user.username.toLowerCase() === "systemadmin";
  }
  loadUser(userId) {
    this.usersService.getUserById(+userId).subscribe({
      next: /* @__PURE__ */ __name((user) => {
        this.user.set(user);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }, "error")
    });
  }
  onUserSaved(user) {
    this.router.navigate(["/users", user.id, "view"]);
  }
  getErrorMessage(error) {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t("errors.unknown");
  }
};
__name(_EditUserPageComponent, "EditUserPageComponent");
__publicField(_EditUserPageComponent, "\u0275fac", /* @__PURE__ */ __name(function EditUserPageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditUserPageComponent)();
}, "EditUserPageComponent_Factory"));
__publicField(_EditUserPageComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditUserPageComponent, selectors: [["app-edit-user-page"]], decls: 3, vars: 1, consts: [[1, "d-flex", "justify-content-center", "py-5"], [1, "alert", "alert-danger"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"], [1, "container-fluid"], [3, "user", "show"], [1, "alert", "alert-warning"], [1, "fa-solid", "fa-shield-alt", "me-2"], [1, "d-flex", "justify-content-start"], ["type", "button", "routerLink", "/users", 1, "btn", "btn-outline-secondary"], [1, "fa-solid", "fa-arrow-left", "me-2"], [3, "userSaved", "user", "show"], [1, "fa-solid", "fa-exclamation-triangle", "me-2"]], template: /* @__PURE__ */ __name(function EditUserPageComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, EditUserPageComponent_Conditional_0_Template, 4, 1, "div", 0)(1, EditUserPageComponent_Conditional_1_Template, 2, 1)(2, EditUserPageComponent_Conditional_2_Template, 3, 1, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.loading() ? 0 : ctx.user() ? 1 : 2);
  }
}, "EditUserPageComponent_Template"), dependencies: [RouterModule, RouterLink, UserFormComponent], encapsulation: 2 }));
var EditUserPageComponent = _EditUserPageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditUserPageComponent, [{
    type: Component,
    args: [{
      selector: "app-edit-user-page",
      standalone: true,
      imports: [RouterModule, UserFormComponent],
      template: `
    @if (loading()) {
      <div class="d-flex justify-content-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
        </div>
      </div>
    } @else if (user()) {
      @if (isSystemAdmin(user()!)) {
        <div class="container-fluid">
          <div class="alert alert-warning">
            <i class="fa-solid fa-shield-alt me-2"></i>
            {{ i18n.t('users.system_admin_cannot_be_edited') }}
          </div>
          <div class="d-flex justify-content-start">
            <button type="button" class="btn btn-outline-secondary" routerLink="/users">
              <i class="fa-solid fa-arrow-left me-2"></i>
              {{ i18n.t('common.back') }}
            </button>
          </div>
        </div>
      } @else {
        <app-user-form 
          [user]="user()" 
          [show]="true"
          (userSaved)="onUserSaved($event)">
        </app-user-form>
      }
    } @else {
      <div class="alert alert-danger">
        <i class="fa-solid fa-exclamation-triangle me-2"></i>
        {{ error() || i18n.t('users.user_not_found') }}
      </div>
    }
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditUserPageComponent, { className: "EditUserPageComponent", filePath: "src/app/pages/users/edit-user-page/edit-user-page.component.ts", lineNumber: 49 });
})();
export {
  EditUserPageComponent
};
//# sourceMappingURL=chunk-GFCKCUVW.js.map
