import {
  UserFormComponent
} from "./chunk-SWYVJKM7.js";
import "./chunk-YPZLTOXZ.js";
import "./chunk-I3BAAGQQ.js";
import "./chunk-P7LM43DG.js";
import "./chunk-CVUMC7BN.js";
import {
  Router,
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
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/users/create-user-page/create-user-page.component.ts
var _CreateUserPageComponent = class _CreateUserPageComponent {
  router = inject(Router);
  i18n = inject(I18nService);
  onUserCreated(user) {
    this.router.navigate(["/users", user.id, "view"]);
  }
};
__name(_CreateUserPageComponent, "CreateUserPageComponent");
__publicField(_CreateUserPageComponent, "\u0275fac", /* @__PURE__ */ __name(function CreateUserPageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateUserPageComponent)();
}, "CreateUserPageComponent_Factory"));
__publicField(_CreateUserPageComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateUserPageComponent, selectors: [["app-create-user-page"]], decls: 1, vars: 2, consts: [[3, "userCreated", "user", "show"]], template: /* @__PURE__ */ __name(function CreateUserPageComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "app-user-form", 0);
    \u0275\u0275listener("userCreated", /* @__PURE__ */ __name(function CreateUserPageComponent_Template_app_user_form_userCreated_0_listener($event) {
      return ctx.onUserCreated($event);
    }, "CreateUserPageComponent_Template_app_user_form_userCreated_0_listener"));
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("user", null)("show", true);
  }
}, "CreateUserPageComponent_Template"), dependencies: [RouterModule, UserFormComponent], encapsulation: 2 }));
var CreateUserPageComponent = _CreateUserPageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateUserPageComponent, [{
    type: Component,
    args: [{
      selector: "app-create-user-page",
      standalone: true,
      imports: [RouterModule, UserFormComponent],
      template: `
    <app-user-form 
      [user]="null" 
      [show]="true"
      (userCreated)="onUserCreated($event)">
    </app-user-form>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateUserPageComponent, { className: "CreateUserPageComponent", filePath: "src/app/pages/users/create-user-page/create-user-page.component.ts", lineNumber: 20 });
})();
export {
  CreateUserPageComponent
};
//# sourceMappingURL=chunk-MEZL2VHB.js.map
