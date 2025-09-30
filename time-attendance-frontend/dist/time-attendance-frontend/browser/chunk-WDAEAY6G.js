import {
  HolidayType,
  PublicHolidaysService
} from "./chunk-WH4F4K6L.js";
import {
  FormHeaderComponent
} from "./chunk-Z5T46DE2.js";
import {
  SearchableSelectComponent
} from "./chunk-YVOT2QSR.js";
import {
  FormSectionComponent
} from "./chunk-D5G6MELX.js";
import "./chunk-DKGIYIS4.js";
import {
  NotificationService
} from "./chunk-TDD355PI.js";
import "./chunk-IL4NCC2P.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-JBVPS774.js";
import {
  I18nService
} from "./chunk-5UND7ZIG.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-54H4HALB.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/pages/settings/public-holidays/edit-public-holiday/edit-public-holiday.component.ts
var _c0 = /* @__PURE__ */ __name(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "_c0");
function EditPublicHolidayComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 4)(2, "span", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("common.loading"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.loading_details"));
  }
}
__name(EditPublicHolidayComponent_Conditional_2_Template, "EditPublicHolidayComponent_Conditional_2_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("name"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_11_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_11_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("nameAr"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_16_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_16_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("holidayType"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_23_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_23_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("priority"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_30_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_30_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_35_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("specificDate"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_35_Conditional_6_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_35_Conditional_6_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 54);
    \u0275\u0275conditionalCreate(6, EditPublicHolidayComponent_Conditional_3_Conditional_35_Conditional_6_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.specificDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("specificDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("specificDate") ? 6 : -1);
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_35_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_35_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_36_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const month_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", month_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("months.month_" + month_r3));
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_36_For_9_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_36_For_9_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_36_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("month"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_36_Conditional_10_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_36_Conditional_10_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 56)(6, "option", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, EditPublicHolidayComponent_Conditional_3_Conditional_36_For_9_Template, 2, 2, "option", 58, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, EditPublicHolidayComponent_Conditional_3_Conditional_36_Conditional_10_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.month"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("month"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.placeholders.select_month"));
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(5, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasError("month") ? 10 : -1);
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_36_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_36_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_37_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("day"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_37_Conditional_6_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_37_Conditional_6_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 60);
    \u0275\u0275conditionalCreate(6, EditPublicHolidayComponent_Conditional_3_Conditional_37_Conditional_6_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.day"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("day"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("day") ? 6 : -1);
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_37_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_37_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("weekOfMonth"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_18_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_18_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("dayOfWeek"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_41_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_41_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 62)(6, "option", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 63);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 64);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "option", 65);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 66);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 67);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_18_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 12)(20, "label", 68);
    \u0275\u0275text(21);
    \u0275\u0275elementStart(22, "span", 14);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "select", 69)(25, "option", 57);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 70);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "option", 63);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "option", 64);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "option", 65);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 66);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 67);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 71);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(41, EditPublicHolidayComponent_Conditional_3_Conditional_38_Conditional_41_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.weekOfMonth"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("weekOfMonth"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.placeholders.select_week"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.first_week"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.second_week"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.third_week"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.fourth_week"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.last_week"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("weekOfMonth") ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.dayOfWeek"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("dayOfWeek"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("public_holidays.placeholders.select_day"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.sunday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.monday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.tuesday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.wednesday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.thursday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.friday"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("days.saturday"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("dayOfWeek") ? 41 : -1);
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_38_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_38_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_55_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getErrorMessage("branchId"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_55_Conditional_4_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_55_Conditional_4_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "label", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "app-searchable-select", 73);
    \u0275\u0275conditionalCreate(4, EditPublicHolidayComponent_Conditional_3_Conditional_55_Conditional_4_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.branch"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r0.branchOptions)("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.select_branch"))("isInvalid", ctx_r0.isFieldInvalid("branchId"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("branchId") ? 4 : -1);
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_55_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_55_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 74);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.saving"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_70_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_70_Template");
function EditPublicHolidayComponent_Conditional_3_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 75);
    \u0275\u0275text(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.save"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Conditional_71_Template, "EditPublicHolidayComponent_Conditional_3_Conditional_71_Template");
function EditPublicHolidayComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function EditPublicHolidayComponent_Conditional_3_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    }, "EditPublicHolidayComponent_Conditional_3_Template_form_ngSubmit_0_listener"));
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9)(3, "app-form-section", 10)(4, "div", 11)(5, "div", 12)(6, "label", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "span", 14);
    \u0275\u0275text(9, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "input", 15);
    \u0275\u0275conditionalCreate(11, EditPublicHolidayComponent_Conditional_3_Conditional_11_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 12)(13, "label", 17);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 18);
    \u0275\u0275conditionalCreate(16, EditPublicHolidayComponent_Conditional_3_Conditional_16_Template, 2, 1, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 12)(18, "label", 19);
    \u0275\u0275text(19);
    \u0275\u0275elementStart(20, "span", 14);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "app-searchable-select", 20);
    \u0275\u0275conditionalCreate(23, EditPublicHolidayComponent_Conditional_3_Conditional_23_Template, 2, 1, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 12)(25, "label", 22);
    \u0275\u0275text(26);
    \u0275\u0275elementStart(27, "span", 14);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(29, "input", 23);
    \u0275\u0275conditionalCreate(30, EditPublicHolidayComponent_Conditional_3_Conditional_30_Template, 2, 1, "div", 16);
    \u0275\u0275elementStart(31, "div", 24);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "app-form-section", 10)(34, "div", 11);
    \u0275\u0275conditionalCreate(35, EditPublicHolidayComponent_Conditional_3_Conditional_35_Template, 7, 4, "div", 12);
    \u0275\u0275conditionalCreate(36, EditPublicHolidayComponent_Conditional_3_Conditional_36_Template, 11, 6, "div", 12);
    \u0275\u0275conditionalCreate(37, EditPublicHolidayComponent_Conditional_3_Conditional_37_Template, 7, 4, "div", 12);
    \u0275\u0275conditionalCreate(38, EditPublicHolidayComponent_Conditional_3_Conditional_38_Template, 42, 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "app-form-section", 10)(40, "div", 11)(41, "div", 12)(42, "div", 25);
    \u0275\u0275element(43, "input", 26);
    \u0275\u0275elementStart(44, "label", 27);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 24);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 12)(49, "div", 25);
    \u0275\u0275element(50, "input", 28);
    \u0275\u0275elementStart(51, "label", 29);
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 24);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(55, EditPublicHolidayComponent_Conditional_3_Conditional_55_Template, 5, 5, "div", 12);
    \u0275\u0275elementStart(56, "div", 30)(57, "label", 31);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "textarea", 32);
    \u0275\u0275text(60, "                ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(61, "div", 33)(62, "div", 34)(63, "div", 35)(64, "h6", 36);
    \u0275\u0275element(65, "i", 37);
    \u0275\u0275text(66);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 38)(68, "div", 39)(69, "button", 40);
    \u0275\u0275conditionalCreate(70, EditPublicHolidayComponent_Conditional_3_Conditional_70_Template, 2, 1)(71, EditPublicHolidayComponent_Conditional_3_Conditional_71_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "button", 41);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditPublicHolidayComponent_Conditional_3_Template_button_click_72_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onReset());
    }, "EditPublicHolidayComponent_Conditional_3_Template_button_click_72_listener"));
    \u0275\u0275element(73, "i", 42);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "button", 43);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function EditPublicHolidayComponent_Conditional_3_Template_button_click_75_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    }, "EditPublicHolidayComponent_Conditional_3_Template_button_click_75_listener"));
    \u0275\u0275element(76, "i", 44);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(78, "div", 45)(79, "div", 35)(80, "h6", 36);
    \u0275\u0275element(81, "i", 46);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 38)(84, "p", 47);
    \u0275\u0275text(85);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "ul", 48)(87, "li", 49);
    \u0275\u0275element(88, "i", 50);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "li", 49);
    \u0275\u0275element(91, "i", 51);
    \u0275\u0275text(92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "li");
    \u0275\u0275element(94, "i", 52);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    let tmp_31_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.holidayForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.basic_information"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.enter_name"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("name") ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.nameAr"), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("nameAr"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.enter_name_ar"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("nameAr") ? 16 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.holidayType"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r0.holidayTypeOptions)("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.select_type"))("isInvalid", ctx_r0.isFieldInvalid("holidayType"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("holidayType") ? 23 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.priority"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("priority"));
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.enter_priority"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasError("priority") ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.priority_info"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.date_configuration"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.OneTime ? 35 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.Annual || ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.Floating ? 36 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.Annual || ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.Monthly ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedHolidayType() === ctx_r0.HolidayType.Floating ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r0.i18n.t("public_holidays.scope_settings"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.is_active"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.active_status"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.is_national"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.national_scope"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!((tmp_31_0 = ctx_r0.holidayForm.get("isNational")) == null ? null : tmp_31_0.value) ? 55 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("fields.description"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r0.i18n.t("public_holidays.placeholders.enter_description"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.holidayForm.invalid || ctx_r0.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving() ? 70 : 71);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.reset"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.saving());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.cancel"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.help"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.edit_instructions"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.required_fields"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.date_patterns"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("public_holidays.help.scope_info"), " ");
  }
}
__name(EditPublicHolidayComponent_Conditional_3_Template, "EditPublicHolidayComponent_Conditional_3_Template");
var _EditPublicHolidayComponent = class _EditPublicHolidayComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  notificationService = inject(NotificationService);
  publicHolidaysService = inject(PublicHolidaysService);
  i18n = inject(I18nService);
  // State
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  currentHoliday = signal(null, ...ngDevMode ? [{ debugName: "currentHoliday" }] : []);
  holidayId = null;
  // Form
  holidayForm;
  // Available options
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  // Form field signals for reactive behavior
  selectedHolidayType = signal(HolidayType.Annual, ...ngDevMode ? [{ debugName: "selectedHolidayType" }] : []);
  // Holiday types enum access
  HolidayType = HolidayType;
  // Computed properties
  get isFloatingHoliday() {
    return computed(() => {
      const type = Number(this.selectedHolidayType());
      return type === HolidayType.Floating;
    });
  }
  get holidayTypeOptions() {
    return this.publicHolidaysService.getHolidayTypes().map((type) => ({
      value: type.value,
      label: type.label,
      description: type.description
    }));
  }
  get branchOptions() {
    const options = [
      { value: null, label: this.i18n.t("public_holidays.national_holiday") }
    ];
    return options.concat(this.branches().map((branch) => ({
      value: branch.id,
      label: branch.name
    })));
  }
  constructor() {
    this.holidayForm = this.createForm();
    this.holidayForm.get("holidayType")?.valueChanges.subscribe((value) => {
      this.selectedHolidayType.set(Number(value));
      this.updateFormValidation();
    });
  }
  ngOnInit() {
    this.loadBranches();
    this.loadHoliday();
  }
  /**
   * Create reactive form
   */
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      nameAr: ["", [Validators.maxLength(200)]],
      holidayType: [HolidayType.Annual, [Validators.required]],
      specificDate: [""],
      month: [""],
      day: [""],
      weekOfMonth: [""],
      dayOfWeek: [""],
      isActive: [true],
      isNational: [true],
      branchId: [null],
      description: ["", [Validators.maxLength(1e3)]],
      effectiveFromYear: [""],
      effectiveToYear: [""],
      countryCode: ["", [Validators.maxLength(10)]],
      priority: [50, [Validators.min(1), Validators.max(100)]]
    });
  }
  /**
   * Load branches for dropdown
   */
  loadBranches() {
    this.publicHolidaysService.getBranches().subscribe({
      next: /* @__PURE__ */ __name((branches) => {
        this.branches.set(branches);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load branches:", error);
        this.notificationService.error(this.i18n.t("public_holidays.errors.load_branches_failed"));
      }, "error")
    });
  }
  /**
   * Load holiday for editing
   */
  loadHoliday() {
    const holidayIdParam = this.route.snapshot.paramMap.get("id");
    if (!holidayIdParam) {
      this.router.navigate(["/settings/public-holidays"]);
      return;
    }
    this.holidayId = +holidayIdParam;
    this.loading.set(true);
    this.publicHolidaysService.getPublicHolidayById(this.holidayId, false).subscribe({
      next: /* @__PURE__ */ __name((holiday) => {
        this.currentHoliday.set(holiday);
        this.populateForm(holiday);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load holiday:", error);
        this.notificationService.error(this.i18n.t("public_holidays.errors.load_failed"));
        this.loading.set(false);
        this.router.navigate(["/settings/public-holidays"]);
      }, "error")
    });
  }
  /**
   * Populate form with holiday data
   */
  populateForm(holiday) {
    this.selectedHolidayType.set(holiday.holidayType);
    this.holidayForm.patchValue({
      name: holiday.name,
      nameAr: holiday.nameAr || "",
      holidayType: holiday.holidayType,
      isActive: holiday.isActive,
      isNational: holiday.isNational,
      branchId: holiday.branchId,
      description: holiday.description || "",
      effectiveFromYear: holiday.effectiveFromYear || "",
      effectiveToYear: holiday.effectiveToYear || "",
      countryCode: holiday.countryCode || "",
      priority: holiday.priority
    });
    this.updateFormValidation();
  }
  /**
   * Update form validation based on holiday type
   */
  updateFormValidation() {
    const holidayType = Number(this.holidayForm.get("holidayType")?.value);
    const specificDateControl = this.holidayForm.get("specificDate");
    const monthControl = this.holidayForm.get("month");
    const dayControl = this.holidayForm.get("day");
    const weekOfMonthControl = this.holidayForm.get("weekOfMonth");
    const dayOfWeekControl = this.holidayForm.get("dayOfWeek");
    specificDateControl?.clearValidators();
    monthControl?.clearValidators();
    dayControl?.clearValidators();
    weekOfMonthControl?.clearValidators();
    dayOfWeekControl?.clearValidators();
    if (holidayType === HolidayType.OneTime) {
      specificDateControl?.setValidators([Validators.required]);
    } else if (holidayType === HolidayType.Annual) {
      monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    } else if (holidayType === HolidayType.Monthly) {
      dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    } else if (holidayType === HolidayType.Floating) {
      monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      weekOfMonthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(5)]);
      dayOfWeekControl?.setValidators([Validators.required, Validators.min(0), Validators.max(6)]);
    }
    specificDateControl?.updateValueAndValidity();
    monthControl?.updateValueAndValidity();
    dayControl?.updateValueAndValidity();
    weekOfMonthControl?.updateValueAndValidity();
    dayOfWeekControl?.updateValueAndValidity();
  }
  /**
   * Handle form submission
   */
  onSubmit() {
    if (this.holidayForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    const holiday = this.currentHoliday();
    if (!holiday)
      return;
    this.saving.set(true);
    const formValue = this.holidayForm.value;
    const request = {
      name: formValue.name,
      nameAr: formValue.nameAr || void 0,
      holidayType: Number(formValue.holidayType),
      specificDate: formValue.specificDate || void 0,
      month: formValue.month ? Number(formValue.month) : void 0,
      day: formValue.day ? Number(formValue.day) : void 0,
      weekOfMonth: formValue.weekOfMonth ? Number(formValue.weekOfMonth) : void 0,
      dayOfWeek: formValue.dayOfWeek ? Number(formValue.dayOfWeek) : void 0,
      isActive: formValue.isActive,
      isNational: formValue.isNational,
      branchId: formValue.branchId || void 0,
      description: formValue.description || void 0,
      effectiveFromYear: formValue.effectiveFromYear ? Number(formValue.effectiveFromYear) : void 0,
      effectiveToYear: formValue.effectiveToYear ? Number(formValue.effectiveToYear) : void 0,
      countryCode: formValue.countryCode || void 0,
      priority: Number(formValue.priority)
    };
    this.publicHolidaysService.updatePublicHoliday(holiday.id, request).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t("public_holidays.success.updated"));
        this.router.navigate(["/settings/public-holidays", holiday.id, "view"]);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        this.saving.set(false);
        console.error("Failed to update holiday:", error);
        this.notificationService.error(this.i18n.t("public_holidays.errors.update_failed"));
      }, "error")
    });
  }
  /**
   * Cancel and navigate back
   */
  onCancel() {
    const holiday = this.currentHoliday();
    if (holiday) {
      this.router.navigate(["/settings/public-holidays", holiday.id, "view"]);
    } else {
      this.router.navigate(["/settings/public-holidays"]);
    }
  }
  /**
   * Reset form to original values
   */
  onReset() {
    const holiday = this.currentHoliday();
    if (holiday) {
      this.populateForm(holiday);
    }
  }
  /**
   * Mark all form fields as touched
   */
  markFormGroupTouched() {
    Object.keys(this.holidayForm.controls).forEach((key) => {
      const control = this.holidayForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
  /**
   * Check if form field has error
   */
  hasError(fieldName) {
    const field = this.holidayForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  /**
   * Get error message for field
   */
  getErrorMessage(fieldName) {
    const field = this.holidayForm.get(fieldName);
    if (!field || !field.errors)
      return "";
    if (field.errors["required"]) {
      return this.i18n.t("validation.required");
    }
    if (field.errors["maxlength"]) {
      return this.i18n.t("validation.max_length") + " " + field.errors["maxlength"].requiredLength;
    }
    if (field.errors["min"]) {
      return this.i18n.t("validation.min_value") + " " + field.errors["min"].min;
    }
    if (field.errors["max"]) {
      return this.i18n.t("validation.max_value") + " " + field.errors["max"].max;
    }
    return "";
  }
  /**
   * Check if field is invalid for styling
   */
  isFieldInvalid(fieldName) {
    return this.hasError(fieldName);
  }
  /**
   * Get holiday name for display
   */
  getHolidayName() {
    return this.currentHoliday()?.name || "";
  }
};
__name(_EditPublicHolidayComponent, "EditPublicHolidayComponent");
__publicField(_EditPublicHolidayComponent, "\u0275fac", /* @__PURE__ */ __name(function EditPublicHolidayComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditPublicHolidayComponent)();
}, "EditPublicHolidayComponent_Factory"));
__publicField(_EditPublicHolidayComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditPublicHolidayComponent, selectors: [["app-edit-public-holiday"]], decls: 4, vars: 5, consts: [[1, "app-form-page"], ["mode", "edit", "moduleName", "settings", "moduleRoute", "settings/public-holidays", 3, "title", "entityId", "loading"], [1, "text-center", "py-5"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3", "text-muted"], [3, "ngSubmit", "formGroup"], [1, "app-desktop-sidebar"], [1, "app-main-content"], [3, "title"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "name", 1, "form-label"], [1, "text-danger"], ["type", "text", "id", "name", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["for", "nameAr", 1, "form-label"], ["type", "text", "id", "nameAr", "formControlName", "nameAr", 1, "form-control", 3, "placeholder"], ["for", "holidayType", 1, "form-label"], ["id", "holidayType", "formControlName", "holidayType", 3, "options", "placeholder", "isInvalid"], [1, "invalid-feedback", "d-block"], ["for", "priority", 1, "form-label"], ["type", "number", "id", "priority", "formControlName", "priority", "min", "1", "max", "100", 1, "form-control", 3, "placeholder"], [1, "form-text"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "isActive", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActive", 1, "form-check-label"], ["type", "checkbox", "id", "isNational", "formControlName", "isNational", 1, "form-check-input"], ["for", "isNational", 1, "form-check-label"], [1, "col-12", "mb-3"], ["for", "description", 1, "form-label"], ["id", "description", "formControlName", "description", "rows", "3", 1, "form-control", 3, "placeholder"], [1, "app-sidebar-content"], [1, "card", "mb-3"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "fas", "fa-cogs", "me-2"], [1, "card-body"], [1, "d-grid", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], [1, "fas", "fa-undo", "me-2"], ["type", "button", 1, "btn", "btn-outline-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], [1, "card"], [1, "fas", "fa-info-circle", "me-2"], [1, "card-text", "small", "text-muted", "mb-2"], [1, "list-unstyled", "small", "text-muted", "mb-0"], [1, "mb-1"], [1, "fas", "fa-check-circle", "text-success", "me-1"], [1, "fas", "fa-calendar", "text-info", "me-1"], [1, "fas", "fa-globe", "text-primary", "me-1"], ["for", "specificDate", 1, "form-label"], ["type", "date", "id", "specificDate", "formControlName", "specificDate", 1, "form-control"], ["for", "month", 1, "form-label"], ["id", "month", "formControlName", "month", 1, "form-select"], ["value", ""], [3, "value"], ["for", "day", 1, "form-label"], ["type", "number", "id", "day", "formControlName", "day", "min", "1", "max", "31", 1, "form-control"], ["for", "weekOfMonth", 1, "form-label"], ["id", "weekOfMonth", "formControlName", "weekOfMonth", 1, "form-select"], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["value", "5"], ["for", "dayOfWeek", 1, "form-label"], ["id", "dayOfWeek", "formControlName", "dayOfWeek", 1, "form-select"], ["value", "0"], ["value", "6"], ["for", "branchId", 1, "form-label"], ["id", "branchId", "formControlName", "branchId", 3, "options", "placeholder", "isInvalid"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-save", "me-2"]], template: /* @__PURE__ */ __name(function EditPublicHolidayComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, EditPublicHolidayComponent_Conditional_2_Template, 6, 2, "div", 2);
    \u0275\u0275conditionalCreate(3, EditPublicHolidayComponent_Conditional_3_Template, 96, 48, "form", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("public_holidays.edit_holiday"))("entityId", ctx.holidayId || 0)("loading", ctx.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.currentHoliday() ? 3 : -1);
  }
}, "EditPublicHolidayComponent_Template"), dependencies: [
  CommonModule,
  FormsModule,
  \u0275NgNoValidate,
  NgSelectOption,
  \u0275NgSelectMultipleOption,
  DefaultValueAccessor,
  NumberValueAccessor,
  CheckboxControlValueAccessor,
  SelectControlValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  MinValidator,
  MaxValidator,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  SearchableSelectComponent,
  FormHeaderComponent,
  FormSectionComponent
], styles: ["\n\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control[_ngcontent-%COMP%]:disabled, \n.form-select[_ngcontent-%COMP%]:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.form-check-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n}\n.btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  background: var(--bs-white);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  padding: 1rem 1.5rem;\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.form-section[_ngcontent-%COMP%]   .section-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.holiday-type-info[_ngcontent-%COMP%] {\n  background-color: var(--bs-info-bg-subtle);\n  border-left: 4px solid var(--bs-info);\n  padding: 0.75rem 1rem;\n  border-radius: 0.25rem;\n  margin-bottom: 1rem;\n}\n.holiday-type-info[_ngcontent-%COMP%]   .type-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-info-text-emphasis);\n  margin-bottom: 0.25rem;\n}\n.holiday-type-info[_ngcontent-%COMP%]   .type-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n  margin-bottom: 0;\n}\n.date-config-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.date-config-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--bs-primary-text-emphasis);\n  margin-bottom: 0.75rem;\n  font-size: 0.95rem;\n}\n.form-text[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--bs-gray-500);\n  margin-top: 0.25rem;\n}\n.form-switch[_ngcontent-%COMP%] {\n  padding-left: 2.5rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 1rem;\n  margin-left: -2.5rem;\n}\n.form-switch[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n}\ninput[type=number][_ngcontent-%COMP%] {\n  -moz-appearance: textfield;\n}\ninput[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, \ninput[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.priority-input-group[_ngcontent-%COMP%] {\n  position: relative;\n}\n.priority-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.5rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  width: 1.5rem;\n  height: 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  pointer-events: none;\n}\n.scope-settings[_ngcontent-%COMP%] {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.scope-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.25rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.scope-indicator.national[_ngcontent-%COMP%] {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n  border: 1px solid var(--bs-primary-border-subtle);\n}\n.scope-indicator.branch[_ngcontent-%COMP%] {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .app-sidebar-content[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n  .help-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n  .d-grid.gap-2[_ngcontent-%COMP%] {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%] {\n    margin-bottom: 0.5rem;\n  }\n  .btn[_ngcontent-%COMP%]:last-child {\n    margin-bottom: 0;\n  }\n  .form-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]   .section-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .date-config-section[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .scope-settings[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=edit-public-holiday.component.css.map */"] }));
var EditPublicHolidayComponent = _EditPublicHolidayComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditPublicHolidayComponent, [{
    type: Component,
    args: [{ selector: "app-edit-public-holiday", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SearchableSelectComponent,
      FormHeaderComponent,
      FormSectionComponent
    ], template: `<div class="app-form-page">\r
  <app-form-header\r
    mode="edit"\r
    [title]="i18n.t('public_holidays.edit_holiday')"\r
    moduleName="settings"\r
    moduleRoute="settings/public-holidays"\r
    [entityId]="holidayId || 0"\r
    [loading]="saving()">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <div class="text-center py-5">\r
      <div class="spinner-border text-primary" role="status">\r
        <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>\r
      </div>\r
      <p class="mt-3 text-muted">{{ i18n.t('public_holidays.loading_details') }}</p>\r
    </div>\r
  }\r
\r
  <!-- Main Form Content -->\r
  @if (!loading() && currentHoliday()) {\r
    <form [formGroup]="holidayForm" (ngSubmit)="onSubmit()">\r
      <div class="app-desktop-sidebar">\r
        <!-- Main Form Content -->\r
        <div class="app-main-content">\r
          <!-- Basic Information Section -->\r
          <app-form-section [title]="i18n.t('public_holidays.basic_information')">\r
            <div class="row">\r
              <!-- Holiday Name -->\r
              <div class="col-md-6 mb-3">\r
                <label for="name" class="form-label">\r
                  {{ i18n.t('fields.name') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="text"\r
                  id="name"\r
                  formControlName="name"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('name')"\r
                  [placeholder]="i18n.t('public_holidays.placeholders.enter_name')">\r
                @if (hasError('name')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('name') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Holiday Name (Arabic) -->\r
              <div class="col-md-6 mb-3">\r
                <label for="nameAr" class="form-label">\r
                  {{ i18n.t('fields.nameAr') }}\r
                </label>\r
                <input\r
                  type="text"\r
                  id="nameAr"\r
                  formControlName="nameAr"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('nameAr')"\r
                  [placeholder]="i18n.t('public_holidays.placeholders.enter_name_ar')">\r
                @if (hasError('nameAr')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('nameAr') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Holiday Type -->\r
              <div class="col-md-6 mb-3">\r
                <label for="holidayType" class="form-label">\r
                  {{ i18n.t('fields.holidayType') }} <span class="text-danger">*</span>\r
                </label>\r
                <app-searchable-select\r
                  id="holidayType"\r
                  formControlName="holidayType"\r
                  [options]="holidayTypeOptions"\r
                  [placeholder]="i18n.t('public_holidays.placeholders.select_type')"\r
                  [isInvalid]="isFieldInvalid('holidayType')">\r
                </app-searchable-select>\r
                @if (hasError('holidayType')) {\r
                  <div class="invalid-feedback d-block">\r
                    {{ getErrorMessage('holidayType') }}\r
                  </div>\r
                }\r
              </div>\r
\r
              <!-- Priority -->\r
              <div class="col-md-6 mb-3">\r
                <label for="priority" class="form-label">\r
                  {{ i18n.t('fields.priority') }} <span class="text-danger">*</span>\r
                </label>\r
                <input\r
                  type="number"\r
                  id="priority"\r
                  formControlName="priority"\r
                  class="form-control"\r
                  [class.is-invalid]="isFieldInvalid('priority')"\r
                  min="1"\r
                  max="100"\r
                  [placeholder]="i18n.t('public_holidays.placeholders.enter_priority')">\r
                @if (hasError('priority')) {\r
                  <div class="invalid-feedback">\r
                    {{ getErrorMessage('priority') }}\r
                  </div>\r
                }\r
                <div class="form-text">\r
                  {{ i18n.t('public_holidays.help.priority_info') }}\r
                </div>\r
              </div>\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Date Configuration Section -->\r
          <app-form-section [title]="i18n.t('public_holidays.date_configuration')">\r
            <div class="row">\r
              <!-- One Time Date -->\r
              @if (selectedHolidayType() === HolidayType.OneTime) {\r
                <div class="col-md-6 mb-3">\r
                  <label for="specificDate" class="form-label">\r
                    {{ i18n.t('fields.specificDate') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <input\r
                    type="date"\r
                    id="specificDate"\r
                    formControlName="specificDate"\r
                    class="form-control"\r
                    [class.is-invalid]="isFieldInvalid('specificDate')">\r
                  @if (hasError('specificDate')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('specificDate') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Annual/Monthly Date -->\r
              @if (selectedHolidayType() === HolidayType.Annual || selectedHolidayType() === HolidayType.Floating) {\r
                <div class="col-md-6 mb-3">\r
                  <label for="month" class="form-label">\r
                    {{ i18n.t('fields.month') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <select\r
                    id="month"\r
                    formControlName="month"\r
                    class="form-select"\r
                    [class.is-invalid]="isFieldInvalid('month')">\r
                    <option value="">{{ i18n.t('public_holidays.placeholders.select_month') }}</option>\r
                    @for (month of [1,2,3,4,5,6,7,8,9,10,11,12]; track month) {\r
                      <option [value]="month">{{ i18n.t('months.month_' + month) }}</option>\r
                    }\r
                  </select>\r
                  @if (hasError('month')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('month') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              @if (selectedHolidayType() === HolidayType.Annual || selectedHolidayType() === HolidayType.Monthly) {\r
                <div class="col-md-6 mb-3">\r
                  <label for="day" class="form-label">\r
                    {{ i18n.t('fields.day') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="day"\r
                    formControlName="day"\r
                    class="form-control"\r
                    [class.is-invalid]="isFieldInvalid('day')"\r
                    min="1"\r
                    max="31">\r
                  @if (hasError('day')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('day') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Floating Holiday Fields -->\r
              @if (selectedHolidayType() === HolidayType.Floating) {\r
                <div class="col-md-6 mb-3">\r
                  <label for="weekOfMonth" class="form-label">\r
                    {{ i18n.t('fields.weekOfMonth') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <select\r
                    id="weekOfMonth"\r
                    formControlName="weekOfMonth"\r
                    class="form-select"\r
                    [class.is-invalid]="isFieldInvalid('weekOfMonth')">\r
                    <option value="">{{ i18n.t('public_holidays.placeholders.select_week') }}</option>\r
                    <option value="1">{{ i18n.t('public_holidays.first_week') }}</option>\r
                    <option value="2">{{ i18n.t('public_holidays.second_week') }}</option>\r
                    <option value="3">{{ i18n.t('public_holidays.third_week') }}</option>\r
                    <option value="4">{{ i18n.t('public_holidays.fourth_week') }}</option>\r
                    <option value="5">{{ i18n.t('public_holidays.last_week') }}</option>\r
                  </select>\r
                  @if (hasError('weekOfMonth')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('weekOfMonth') }}\r
                    </div>\r
                  }\r
                </div>\r
\r
                <div class="col-md-6 mb-3">\r
                  <label for="dayOfWeek" class="form-label">\r
                    {{ i18n.t('fields.dayOfWeek') }} <span class="text-danger">*</span>\r
                  </label>\r
                  <select\r
                    id="dayOfWeek"\r
                    formControlName="dayOfWeek"\r
                    class="form-select"\r
                    [class.is-invalid]="isFieldInvalid('dayOfWeek')">\r
                    <option value="">{{ i18n.t('public_holidays.placeholders.select_day') }}</option>\r
                    <option value="0">{{ i18n.t('days.sunday') }}</option>\r
                    <option value="1">{{ i18n.t('days.monday') }}</option>\r
                    <option value="2">{{ i18n.t('days.tuesday') }}</option>\r
                    <option value="3">{{ i18n.t('days.wednesday') }}</option>\r
                    <option value="4">{{ i18n.t('days.thursday') }}</option>\r
                    <option value="5">{{ i18n.t('days.friday') }}</option>\r
                    <option value="6">{{ i18n.t('days.saturday') }}</option>\r
                  </select>\r
                  @if (hasError('dayOfWeek')) {\r
                    <div class="invalid-feedback">\r
                      {{ getErrorMessage('dayOfWeek') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </div>\r
          </app-form-section>\r
\r
          <!-- Scope and Settings Section -->\r
          <app-form-section [title]="i18n.t('public_holidays.scope_settings')">\r
            <div class="row">\r
              <!-- Status -->\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    id="isActive"\r
                    formControlName="isActive"\r
                    class="form-check-input">\r
                  <label for="isActive" class="form-check-label">\r
                    {{ i18n.t('public_holidays.is_active') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">\r
                  {{ i18n.t('public_holidays.help.active_status') }}\r
                </div>\r
              </div>\r
\r
              <!-- National/Branch -->\r
              <div class="col-md-6 mb-3">\r
                <div class="form-check form-switch">\r
                  <input\r
                    type="checkbox"\r
                    id="isNational"\r
                    formControlName="isNational"\r
                    class="form-check-input">\r
                  <label for="isNational" class="form-check-label">\r
                    {{ i18n.t('public_holidays.is_national') }}\r
                  </label>\r
                </div>\r
                <div class="form-text">\r
                  {{ i18n.t('public_holidays.help.national_scope') }}\r
                </div>\r
              </div>\r
\r
              <!-- Branch Selection (when not national) -->\r
              @if (!holidayForm.get('isNational')?.value) {\r
                <div class="col-md-6 mb-3">\r
                  <label for="branchId" class="form-label">\r
                    {{ i18n.t('fields.branch') }}\r
                  </label>\r
                  <app-searchable-select\r
                    id="branchId"\r
                    formControlName="branchId"\r
                    [options]="branchOptions"\r
                    [placeholder]="i18n.t('public_holidays.placeholders.select_branch')"\r
                    [isInvalid]="isFieldInvalid('branchId')">\r
                  </app-searchable-select>\r
                  @if (hasError('branchId')) {\r
                    <div class="invalid-feedback d-block">\r
                      {{ getErrorMessage('branchId') }}\r
                    </div>\r
                  }\r
                </div>\r
              }\r
\r
              <!-- Description -->\r
              <div class="col-12 mb-3">\r
                <label for="description" class="form-label">\r
                  {{ i18n.t('fields.description') }}\r
                </label>\r
                <textarea\r
                  id="description"\r
                  formControlName="description"\r
                  class="form-control"\r
                  rows="3"\r
                  [placeholder]="i18n.t('public_holidays.placeholders.enter_description')">\r
                </textarea>\r
              </div>\r
            </div>\r
          </app-form-section>\r
        </div>\r
\r
        <!-- Sidebar Actions -->\r
        <div class="app-sidebar-content">\r
          <!-- Form Actions Card -->\r
          <div class="card mb-3">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
                <!-- Save Button -->\r
                <button\r
                  type="submit"\r
                  class="btn btn-primary"\r
                  [disabled]="holidayForm.invalid || saving()">\r
                  @if (saving()) {\r
                    <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    {{ i18n.t('common.saving') }}\r
                  } @else {\r
                    <i class="fas fa-save me-2"></i>\r
                    {{ i18n.t('common.save') }}\r
                  }\r
                </button>\r
\r
                <!-- Reset Button -->\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="onReset()"\r
                  [disabled]="saving()">\r
                  <i class="fas fa-undo me-2"></i>\r
                  {{ i18n.t('common.reset') }}\r
                </button>\r
\r
                <!-- Cancel Button -->\r
                <button\r
                  type="button"\r
                  class="btn btn-outline-danger"\r
                  (click)="onCancel()"\r
                  [disabled]="saving()">\r
                  <i class="fas fa-times me-2"></i>\r
                  {{ i18n.t('common.cancel') }}\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Help Card -->\r
          <div class="card">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-info-circle me-2"></i>\r
                {{ i18n.t('common.help') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <p class="card-text small text-muted mb-2">\r
                {{ i18n.t('public_holidays.help.edit_instructions') }}\r
              </p>\r
              <ul class="list-unstyled small text-muted mb-0">\r
                <li class="mb-1">\r
                  <i class="fas fa-check-circle text-success me-1"></i>\r
                  {{ i18n.t('public_holidays.help.required_fields') }}\r
                </li>\r
                <li class="mb-1">\r
                  <i class="fas fa-calendar text-info me-1"></i>\r
                  {{ i18n.t('public_holidays.help.date_patterns') }}\r
                </li>\r
                <li>\r
                  <i class="fas fa-globe text-primary me-1"></i>\r
                  {{ i18n.t('public_holidays.help.scope_info') }}\r
                </li>\r
              </ul>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </form>\r
  }\r
</div>`, styles: ["/* src/app/pages/settings/public-holidays/edit-public-holiday/edit-public-holiday.component.css */\n.form-label {\n  font-weight: 500;\n  color: var(--bs-gray-700);\n}\n.form-control:disabled,\n.form-select:disabled {\n  background-color: var(--bs-gray-100);\n  opacity: 0.8;\n}\n.invalid-feedback {\n  font-size: 0.875rem;\n}\n.form-check-label {\n  font-weight: 400;\n  cursor: pointer;\n}\n.form-check-input:checked {\n  background-color: var(--bs-success);\n  border-color: var(--bs-success);\n}\n.form-switch .form-check-input:checked {\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.card-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.btn-group .btn {\n  border-radius: 0.375rem;\n}\n.btn-group .btn:not(:last-child) {\n  margin-right: 0.5rem;\n}\n.help-card {\n  position: sticky;\n  top: 1rem;\n}\n.form-section {\n  background: var(--bs-white);\n  border: 1px solid var(--bs-border-color);\n  border-radius: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.form-section .section-header {\n  background: var(--bs-light);\n  border-bottom: 1px solid var(--bs-border-color);\n  padding: 1rem 1.5rem;\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n.form-section .section-body {\n  padding: 1.5rem;\n}\n.holiday-type-info {\n  background-color: var(--bs-info-bg-subtle);\n  border-left: 4px solid var(--bs-info);\n  padding: 0.75rem 1rem;\n  border-radius: 0.25rem;\n  margin-bottom: 1rem;\n}\n.holiday-type-info .type-name {\n  font-weight: 600;\n  color: var(--bs-info-text-emphasis);\n  margin-bottom: 0.25rem;\n}\n.holiday-type-info .type-description {\n  font-size: 0.875rem;\n  color: var(--bs-info-text-emphasis);\n  margin-bottom: 0;\n}\n.date-config-section {\n  background:\n    linear-gradient(\n      135deg,\n      var(--bs-primary-bg-subtle) 0%,\n      var(--bs-info-bg-subtle) 100%);\n  border: 1px solid var(--bs-primary-border-subtle);\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.date-config-title {\n  font-weight: 600;\n  color: var(--bs-primary-text-emphasis);\n  margin-bottom: 0.75rem;\n  font-size: 0.95rem;\n}\n.form-text {\n  font-size: 0.8rem;\n  color: var(--bs-gray-500);\n  margin-top: 0.25rem;\n}\n.form-switch {\n  padding-left: 2.5rem;\n}\n.form-switch .form-check-input {\n  width: 2rem;\n  height: 1rem;\n  margin-left: -2.5rem;\n}\n.form-switch .form-check-label {\n  margin-left: 0.5rem;\n}\ninput[type=number] {\n  -moz-appearance: textfield;\n}\ninput[type=number]::-webkit-outer-spin-button,\ninput[type=number]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.priority-input-group {\n  position: relative;\n}\n.priority-indicator {\n  position: absolute;\n  right: 0.5rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background-color: var(--bs-primary);\n  color: white;\n  border-radius: 50%;\n  width: 1.5rem;\n  height: 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  pointer-events: none;\n}\n.scope-settings {\n  background: var(--bs-light);\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.scope-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.25rem 0.75rem;\n  border-radius: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  margin-bottom: 0.5rem;\n}\n.scope-indicator.national {\n  background-color: var(--bs-primary-bg-subtle);\n  color: var(--bs-primary-text-emphasis);\n  border: 1px solid var(--bs-primary-border-subtle);\n}\n.scope-indicator.branch {\n  background-color: var(--bs-secondary-bg-subtle);\n  color: var(--bs-secondary-text-emphasis);\n  border: 1px solid var(--bs-secondary-border-subtle);\n}\n.loading-container {\n  min-height: 200px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n@media (max-width: 768px) {\n  .app-desktop-sidebar {\n    flex-direction: column;\n  }\n  .app-sidebar-content {\n    margin-top: 1rem;\n  }\n  .help-card {\n    position: static;\n  }\n  .d-grid.gap-2 {\n    display: flex !important;\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .btn {\n    margin-bottom: 0.5rem;\n  }\n  .btn:last-child {\n    margin-bottom: 0;\n  }\n  .form-section .section-header,\n  .form-section .section-body {\n    padding: 1rem;\n  }\n  .date-config-section {\n    padding: 0.75rem;\n  }\n  .scope-settings {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=edit-public-holiday.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditPublicHolidayComponent, { className: "EditPublicHolidayComponent", filePath: "src/app/pages/settings/public-holidays/edit-public-holiday/edit-public-holiday.component.ts", lineNumber: 27 });
})();
export {
  EditPublicHolidayComponent
};
//# sourceMappingURL=chunk-WDAEAY6G.js.map
