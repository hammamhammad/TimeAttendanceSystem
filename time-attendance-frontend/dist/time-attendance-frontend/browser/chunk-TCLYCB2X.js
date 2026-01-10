import {
  HolidayType,
  PublicHolidaysService
} from "./chunk-SBZVYMGF.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  FormSectionComponent
} from "./chunk-JTLHOQFH.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
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
} from "./chunk-GYSVNBR7.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  Router
} from "./chunk-UBDTZQTK.js";
import {
  I18nService
} from "./chunk-6BO32D3M.js";
import "./chunk-TNEZPYQG.js";
import {
  Component,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/settings/public-holidays/create-public-holiday/create-public-holiday.component.ts
var _forTrack0 = /* @__PURE__ */ __name(($index, $item) => $item.value, "_forTrack0");
function CreatePublicHolidayComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("name"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_14_Template, "CreatePublicHolidayComponent_Conditional_14_Template");
function CreatePublicHolidayComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("nameAr"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_19_Template, "CreatePublicHolidayComponent_Conditional_19_Template");
function CreatePublicHolidayComponent_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r2 = ctx.$implicit;
    \u0275\u0275property("value", type_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r2.label);
  }
}
__name(CreatePublicHolidayComponent_For_27_Template, "CreatePublicHolidayComponent_For_27_Template");
function CreatePublicHolidayComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("holidayType"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_28_Template, "CreatePublicHolidayComponent_Conditional_28_Template");
function CreatePublicHolidayComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("description"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_36_Template, "CreatePublicHolidayComponent_Conditional_36_Template");
function CreatePublicHolidayComponent_Conditional_39_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("specificDate"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_39_Conditional_6_Template, "CreatePublicHolidayComponent_Conditional_39_Conditional_6_Template");
function CreatePublicHolidayComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 40);
    \u0275\u0275conditionalCreate(6, CreatePublicHolidayComponent_Conditional_39_Conditional_6_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.holidays.specificDate"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("specificDate"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("specificDate") ? 6 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_39_Template, "CreatePublicHolidayComponent_Conditional_39_Template");
function CreatePublicHolidayComponent_Conditional_40_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const month_r3 = ctx.$implicit;
    \u0275\u0275property("value", month_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(month_r3.label);
  }
}
__name(CreatePublicHolidayComponent_Conditional_40_For_9_Template, "CreatePublicHolidayComponent_Conditional_40_For_9_Template");
function CreatePublicHolidayComponent_Conditional_40_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("month"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_40_Conditional_10_Template, "CreatePublicHolidayComponent_Conditional_40_Conditional_10_Template");
function CreatePublicHolidayComponent_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 42)(6, "option", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CreatePublicHolidayComponent_Conditional_40_For_9_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, CreatePublicHolidayComponent_Conditional_40_Conditional_10_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.holidays.month"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("month"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getMonthOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("month") ? 10 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_40_Template, "CreatePublicHolidayComponent_Conditional_40_Template");
function CreatePublicHolidayComponent_Conditional_41_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r4 = ctx.$implicit;
    \u0275\u0275property("value", day_r4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(day_r4);
  }
}
__name(CreatePublicHolidayComponent_Conditional_41_For_9_Template, "CreatePublicHolidayComponent_Conditional_41_For_9_Template");
function CreatePublicHolidayComponent_Conditional_41_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("day"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_41_Conditional_10_Template, "CreatePublicHolidayComponent_Conditional_41_Conditional_10_Template");
function CreatePublicHolidayComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 44)(6, "option", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CreatePublicHolidayComponent_Conditional_41_For_9_Template, 2, 2, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, CreatePublicHolidayComponent_Conditional_41_Conditional_10_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.holidays.day"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("day"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getDayOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("day") ? 10 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_41_Template, "CreatePublicHolidayComponent_Conditional_41_Template");
function CreatePublicHolidayComponent_Conditional_42_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const week_r5 = ctx.$implicit;
    \u0275\u0275property("value", week_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(week_r5.label);
  }
}
__name(CreatePublicHolidayComponent_Conditional_42_For_9_Template, "CreatePublicHolidayComponent_Conditional_42_For_9_Template");
function CreatePublicHolidayComponent_Conditional_42_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("weekOfMonth"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_42_Conditional_10_Template, "CreatePublicHolidayComponent_Conditional_42_Conditional_10_Template");
function CreatePublicHolidayComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 46)(6, "option", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CreatePublicHolidayComponent_Conditional_42_For_9_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, CreatePublicHolidayComponent_Conditional_42_Conditional_10_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.holidays.weekOfMonth"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("weekOfMonth"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getWeekOfMonthOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("weekOfMonth") ? 10 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_42_Template, "CreatePublicHolidayComponent_Conditional_42_Template");
function CreatePublicHolidayComponent_Conditional_43_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dayOfWeek_r6 = ctx.$implicit;
    \u0275\u0275property("value", dayOfWeek_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(dayOfWeek_r6.label);
  }
}
__name(CreatePublicHolidayComponent_Conditional_43_For_9_Template, "CreatePublicHolidayComponent_Conditional_43_For_9_Template");
function CreatePublicHolidayComponent_Conditional_43_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("dayOfWeek"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_43_Conditional_10_Template, "CreatePublicHolidayComponent_Conditional_43_Conditional_10_Template");
function CreatePublicHolidayComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 47);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 48)(6, "option", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CreatePublicHolidayComponent_Conditional_43_For_9_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, CreatePublicHolidayComponent_Conditional_43_Conditional_10_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.t("settings.holidays.dayOfWeek"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("dayOfWeek"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.getDayOfWeekOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("dayOfWeek") ? 10 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_43_Template, "CreatePublicHolidayComponent_Conditional_43_Template");
function CreatePublicHolidayComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("priority"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_48_Template, "CreatePublicHolidayComponent_Conditional_48_Template");
function CreatePublicHolidayComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("countryCode"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_72_Template, "CreatePublicHolidayComponent_Conditional_72_Template");
function CreatePublicHolidayComponent_For_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r7 = ctx.$implicit;
    \u0275\u0275property("value", year_r7);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r7);
  }
}
__name(CreatePublicHolidayComponent_For_83_Template, "CreatePublicHolidayComponent_For_83_Template");
function CreatePublicHolidayComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("effectiveFromYear"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_84_Template, "CreatePublicHolidayComponent_Conditional_84_Template");
function CreatePublicHolidayComponent_For_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const year_r8 = ctx.$implicit;
    \u0275\u0275property("value", year_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(year_r8);
  }
}
__name(CreatePublicHolidayComponent_For_92_Template, "CreatePublicHolidayComponent_For_92_Template");
function CreatePublicHolidayComponent_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("effectiveToYear"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_93_Template, "CreatePublicHolidayComponent_Conditional_93_Template");
function CreatePublicHolidayComponent_Conditional_94_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("branchId"), " ");
  }
}
__name(CreatePublicHolidayComponent_Conditional_94_Conditional_6_Template, "CreatePublicHolidayComponent_Conditional_94_Conditional_6_Template");
function CreatePublicHolidayComponent_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "label", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 50)(4, "option", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, CreatePublicHolidayComponent_Conditional_94_Conditional_6_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("settings.holidays.branch"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx_r0.isFieldInvalid("branchId"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.t("common.select"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFieldInvalid("branchId") ? 6 : -1);
  }
}
__name(CreatePublicHolidayComponent_Conditional_94_Template, "CreatePublicHolidayComponent_Conditional_94_Template");
function CreatePublicHolidayComponent_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 38);
  }
}
__name(CreatePublicHolidayComponent_Conditional_99_Template, "CreatePublicHolidayComponent_Conditional_99_Template");
var _CreatePublicHolidayComponent = class _CreatePublicHolidayComponent {
  formBuilder = inject(FormBuilder);
  publicHolidaysService = inject(PublicHolidaysService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  i18n = inject(I18nService);
  // Holiday type reference for template
  HolidayType = HolidayType;
  // Signals for state management
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  selectedHolidayType = signal(HolidayType.Annual, ...ngDevMode ? [{ debugName: "selectedHolidayType" }] : []);
  // Form
  holidayForm;
  // Available options
  holidayTypes = computed(() => this.publicHolidaysService.getHolidayTypes(), ...ngDevMode ? [{ debugName: "holidayTypes" }] : []);
  // Field visibility computed signals
  showSpecificDateField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.OneTime;
  }, ...ngDevMode ? [{ debugName: "showSpecificDateField" }] : []);
  showMonthField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Annual || type === HolidayType.Floating;
  }, ...ngDevMode ? [{ debugName: "showMonthField" }] : []);
  showDayField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Annual || type === HolidayType.Monthly;
  }, ...ngDevMode ? [{ debugName: "showDayField" }] : []);
  showWeekOfMonthField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Floating;
  }, ...ngDevMode ? [{ debugName: "showWeekOfMonthField" }] : []);
  showDayOfWeekField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Floating;
  }, ...ngDevMode ? [{ debugName: "showDayOfWeekField" }] : []);
  ngOnInit() {
    this.initializeForm();
  }
  t(key) {
    return this.i18n.t(key);
  }
  initializeForm() {
    this.holidayForm = this.formBuilder.group({
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
      branchId: [""],
      description: ["", [Validators.maxLength(1e3)]],
      effectiveFromYear: [""],
      effectiveToYear: [""],
      countryCode: ["", [Validators.maxLength(10)]],
      priority: [50, [Validators.min(1), Validators.max(100)]]
    });
    this.holidayForm.get("holidayType")?.valueChanges.subscribe((type) => {
      const numericType = Number(type);
      this.selectedHolidayType.set(numericType);
      this.updateValidationBasedOnType(numericType);
    });
    this.selectedHolidayType.set(HolidayType.Annual);
    this.updateValidationBasedOnType(HolidayType.Annual);
  }
  updateValidationBasedOnType(type) {
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
    specificDateControl?.setValue("");
    monthControl?.setValue("");
    dayControl?.setValue("");
    weekOfMonthControl?.setValue("");
    dayOfWeekControl?.setValue("");
    switch (type) {
      case HolidayType.OneTime:
        specificDateControl?.setValidators([Validators.required]);
        break;
      case HolidayType.Annual:
        monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
        dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
        break;
      case HolidayType.Monthly:
        dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
        break;
      case HolidayType.Floating:
        monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
        weekOfMonthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(5)]);
        dayOfWeekControl?.setValidators([Validators.required, Validators.min(0), Validators.max(6)]);
        break;
    }
    specificDateControl?.updateValueAndValidity();
    monthControl?.updateValueAndValidity();
    dayControl?.updateValueAndValidity();
    weekOfMonthControl?.updateValueAndValidity();
    dayOfWeekControl?.updateValueAndValidity();
  }
  onSubmit() {
    if (this.holidayForm.valid) {
      const formValue = this.holidayForm.value;
      const validationErrors = this.publicHolidaysService.validateHolidayData(formValue);
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          this.notificationService.error(this.t("app.error"), error);
        });
        return;
      }
      const request = {
        name: formValue.name,
        nameAr: formValue.nameAr || void 0,
        holidayType: formValue.holidayType,
        specificDate: formValue.specificDate || void 0,
        month: formValue.month || void 0,
        day: formValue.day || void 0,
        weekOfMonth: formValue.weekOfMonth || void 0,
        dayOfWeek: formValue.dayOfWeek || void 0,
        isActive: formValue.isActive,
        isNational: formValue.isNational,
        branchId: formValue.branchId || void 0,
        description: formValue.description || void 0,
        effectiveFromYear: formValue.effectiveFromYear || void 0,
        effectiveToYear: formValue.effectiveToYear || void 0,
        countryCode: formValue.countryCode || void 0,
        priority: formValue.priority || 50
      };
      this.submitting.set(true);
      this.publicHolidaysService.createPublicHoliday(request).subscribe({
        next: /* @__PURE__ */ __name(() => {
          this.submitting.set(false);
          this.notificationService.success(this.t("app.success"), this.t("settings.holidays.holidayCreatedSuccessfully"));
          this.router.navigate(["/settings/public-holidays"]);
        }, "next"),
        error: /* @__PURE__ */ __name((error) => {
          console.error("Failed to create holiday:", error);
          this.submitting.set(false);
          this.notificationService.error(this.t("app.error"), this.t("errors.server"));
        }, "error")
      });
    } else {
      this.markFormGroupTouched();
    }
  }
  onCancel() {
    this.router.navigate(["/settings/public-holidays"]);
  }
  markFormGroupTouched() {
    Object.keys(this.holidayForm.controls).forEach((key) => {
      const control = this.holidayForm.get(key);
      control?.markAsTouched();
    });
  }
  isFieldInvalid(fieldName) {
    const field = this.holidayForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  getFieldError(fieldName) {
    const field = this.holidayForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors["required"]) {
        return this.t("validation.required");
      }
      if (field.errors["maxlength"]) {
        return this.t("validation.maxLength");
      }
      if (field.errors["min"]) {
        return this.t("validation.min");
      }
      if (field.errors["max"]) {
        return this.t("validation.max");
      }
    }
    return "";
  }
  getHolidayTypeDescription() {
    const selectedValue = this.holidayForm.get("holidayType")?.value;
    const selectedType = this.holidayTypes().find((t) => t.value === selectedValue);
    return selectedType?.description || "";
  }
  // Helper methods for template
  getMonthOptions() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const date = new Date(2024, i - 1, 1);
      months.push({
        value: i,
        label: date.toLocaleDateString(this.i18n.getCurrentLocale(), { month: "long" })
      });
    }
    return months;
  }
  getDayOptions() {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  }
  getWeekOfMonthOptions() {
    return [
      { value: 1, label: this.t("settings.holidays.firstWeek") },
      { value: 2, label: this.t("settings.holidays.secondWeek") },
      { value: 3, label: this.t("settings.holidays.thirdWeek") },
      { value: 4, label: this.t("settings.holidays.fourthWeek") },
      { value: 5, label: this.t("settings.holidays.lastWeek") }
    ];
  }
  getDayOfWeekOptions() {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, 7 + i);
      daysOfWeek.push({
        value: i,
        label: date.toLocaleDateString(this.i18n.getCurrentLocale(), { weekday: "long" })
      });
    }
    return daysOfWeek;
  }
  getYearOptions() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  }
  shouldShowField(fieldName) {
    const holidayType = this.selectedHolidayType();
    switch (fieldName) {
      case "specificDate":
        return holidayType === HolidayType.OneTime;
      case "month":
        return holidayType === HolidayType.Annual || holidayType === HolidayType.Floating;
      case "day":
        return holidayType === HolidayType.Annual || holidayType === HolidayType.Monthly;
      case "weekOfMonth":
      case "dayOfWeek":
        return holidayType === HolidayType.Floating;
      default:
        return true;
    }
  }
};
__name(_CreatePublicHolidayComponent, "CreatePublicHolidayComponent");
__publicField(_CreatePublicHolidayComponent, "\u0275fac", /* @__PURE__ */ __name(function CreatePublicHolidayComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreatePublicHolidayComponent)();
}, "CreatePublicHolidayComponent_Factory"));
__publicField(_CreatePublicHolidayComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreatePublicHolidayComponent, selectors: [["app-create-public-holiday"]], decls: 101, vars: 62, consts: [[1, "container-fluid"], ["mode", "create", "moduleName", "settings", "moduleRoute", "settings/public-holidays", 3, "title", "loading"], [1, "card"], [1, "card-body"], [3, "ngSubmit", "formGroup"], [1, "row"], [1, "col-md-6"], [3, "title"], [1, "mb-3"], ["for", "name", 1, "form-label"], [1, "text-danger"], ["type", "text", "id", "name", "formControlName", "name", 1, "form-control", 3, "placeholder"], [1, "invalid-feedback"], ["for", "nameAr", 1, "form-label"], ["type", "text", "id", "nameAr", "formControlName", "nameAr", 1, "form-control", 3, "placeholder"], ["for", "holidayType", 1, "form-label"], ["id", "holidayType", "formControlName", "holidayType", 1, "form-select"], [3, "value"], [1, "form-text"], ["for", "description", 1, "form-label"], ["id", "description", "formControlName", "description", "rows", "3", 1, "form-control", 3, "placeholder"], ["for", "priority", 1, "form-label"], ["type", "number", "id", "priority", "formControlName", "priority", "min", "1", "max", "100", 1, "form-control"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "isNational", "formControlName", "isNational", 1, "form-check-input"], ["for", "isNational", 1, "form-check-label"], ["type", "checkbox", "id", "isActive", "formControlName", "isActive", 1, "form-check-input"], ["for", "isActive", 1, "form-check-label"], ["for", "countryCode", 1, "form-label"], ["type", "text", "id", "countryCode", "formControlName", "countryCode", 1, "form-control", 3, "placeholder"], ["for", "effectiveFromYear", 1, "form-label"], ["id", "effectiveFromYear", "formControlName", "effectiveFromYear", 1, "form-select"], ["value", ""], ["for", "effectiveToYear", 1, "form-label"], ["id", "effectiveToYear", "formControlName", "effectiveToYear", 1, "form-select"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-1"], ["for", "specificDate", 1, "form-label"], ["type", "date", "id", "specificDate", "formControlName", "specificDate", 1, "form-control"], ["for", "month", 1, "form-label"], ["id", "month", "formControlName", "month", 1, "form-select"], ["for", "day", 1, "form-label"], ["id", "day", "formControlName", "day", 1, "form-select"], ["for", "weekOfMonth", 1, "form-label"], ["id", "weekOfMonth", "formControlName", "weekOfMonth", 1, "form-select"], ["for", "dayOfWeek", 1, "form-label"], ["id", "dayOfWeek", "formControlName", "dayOfWeek", 1, "form-select"], ["for", "branchId", 1, "form-label"], ["id", "branchId", "formControlName", "branchId", 1, "form-select"]], template: /* @__PURE__ */ __name(function CreatePublicHolidayComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "form", 4);
    \u0275\u0275listener("ngSubmit", /* @__PURE__ */ __name(function CreatePublicHolidayComponent_Template_form_ngSubmit_4_listener() {
      return ctx.onSubmit();
    }, "CreatePublicHolidayComponent_Template_form_ngSubmit_4_listener"));
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "app-form-section", 7)(8, "div", 8)(9, "label", 9);
    \u0275\u0275text(10);
    \u0275\u0275elementStart(11, "span", 10);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(13, "input", 11);
    \u0275\u0275conditionalCreate(14, CreatePublicHolidayComponent_Conditional_14_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 8)(16, "label", 13);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 14);
    \u0275\u0275conditionalCreate(19, CreatePublicHolidayComponent_Conditional_19_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 8)(21, "label", 15);
    \u0275\u0275text(22);
    \u0275\u0275elementStart(23, "span", 10);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "select", 16);
    \u0275\u0275repeaterCreate(26, CreatePublicHolidayComponent_For_27_Template, 2, 2, "option", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, CreatePublicHolidayComponent_Conditional_28_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(29, "div", 18);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 8)(32, "label", 19);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "textarea", 20);
    \u0275\u0275text(35, "              ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, CreatePublicHolidayComponent_Conditional_36_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div", 6)(38, "app-form-section", 7);
    \u0275\u0275conditionalCreate(39, CreatePublicHolidayComponent_Conditional_39_Template, 7, 4, "div", 8);
    \u0275\u0275conditionalCreate(40, CreatePublicHolidayComponent_Conditional_40_Template, 11, 5, "div", 8);
    \u0275\u0275conditionalCreate(41, CreatePublicHolidayComponent_Conditional_41_Template, 11, 5, "div", 8);
    \u0275\u0275conditionalCreate(42, CreatePublicHolidayComponent_Conditional_42_Template, 11, 5, "div", 8);
    \u0275\u0275conditionalCreate(43, CreatePublicHolidayComponent_Conditional_43_Template, 11, 5, "div", 8);
    \u0275\u0275elementStart(44, "div", 8)(45, "label", 21);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 22);
    \u0275\u0275conditionalCreate(48, CreatePublicHolidayComponent_Conditional_48_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(49, "div", 18);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(51, "app-form-section", 7)(52, "div", 5)(53, "div", 6)(54, "div", 8)(55, "div", 23);
    \u0275\u0275element(56, "input", 24);
    \u0275\u0275elementStart(57, "label", 25);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 18);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 8)(62, "div", 23);
    \u0275\u0275element(63, "input", 26);
    \u0275\u0275elementStart(64, "label", 27);
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(66, "div", 18);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 8)(69, "label", 28);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275element(71, "input", 29);
    \u0275\u0275conditionalCreate(72, CreatePublicHolidayComponent_Conditional_72_Template, 2, 1, "div", 12);
    \u0275\u0275elementStart(73, "div", 18);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "div", 6)(76, "div", 8)(77, "label", 30);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "select", 31)(80, "option", 32);
    \u0275\u0275text(81);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(82, CreatePublicHolidayComponent_For_83_Template, 2, 2, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(84, CreatePublicHolidayComponent_Conditional_84_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 8)(86, "label", 33);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "select", 34)(89, "option", 32);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(91, CreatePublicHolidayComponent_For_92_Template, 2, 2, "option", 17, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(93, CreatePublicHolidayComponent_Conditional_93_Template, 2, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(94, CreatePublicHolidayComponent_Conditional_94_Template, 7, 5, "div", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(95, "div", 35)(96, "button", 36);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function CreatePublicHolidayComponent_Template_button_click_96_listener() {
      return ctx.onCancel();
    }, "CreatePublicHolidayComponent_Template_button_click_96_listener"));
    \u0275\u0275text(97);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "button", 37);
    \u0275\u0275conditionalCreate(99, CreatePublicHolidayComponent_Conditional_99_Template, 1, 0, "span", 38);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_51_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.holidays.createHoliday"))("loading", ctx.submitting());
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx.holidayForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("title", ctx.t("settings.holidays.basicInformation"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.name"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("name"));
    \u0275\u0275property("placeholder", ctx.t("settings.holidays.namePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("name") ? 14 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.nameAr"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("nameAr"));
    \u0275\u0275property("placeholder", ctx.t("settings.holidays.nameArPlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("nameAr") ? 19 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.type"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("holidayType"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.holidayTypes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("holidayType") ? 28 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.getHolidayTypeDescription(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.description"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("description"));
    \u0275\u0275property("placeholder", ctx.t("settings.holidays.descriptionPlaceholder"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("description") ? 36 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx.t("settings.holidays.dateConfiguration"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showSpecificDateField() ? 39 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showMonthField() ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showDayField() ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showWeekOfMonthField() ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.showDayOfWeekField() ? 43 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.priority"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("priority"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("priority") ? 48 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.priorityHelp"));
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.t("settings.holidays.additionalSettings"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.isNational"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.isNationalHelp"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.isActive"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.isActiveHelp"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.countryCode"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("countryCode"));
    \u0275\u0275property("placeholder", ctx.t("settings.holidays.countryCodePlaceholder"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isFieldInvalid("countryCode") ? 72 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.countryCodeHelp"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.effectiveFromYear"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("effectiveFromYear"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.noLimit"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.getYearOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("effectiveFromYear") ? 84 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.effectiveToYear"));
    \u0275\u0275advance();
    \u0275\u0275classProp("is-invalid", ctx.isFieldInvalid("effectiveToYear"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.t("settings.holidays.noLimit"));
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx.getYearOptions());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.isFieldInvalid("effectiveToYear") ? 93 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!((tmp_51_0 = ctx.holidayForm.get("isNational")) == null ? null : tmp_51_0.value) ? 94 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.submitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("common.cancel"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.submitting() || ctx.holidayForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.submitting() ? 99 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.t("settings.holidays.createHoliday"), " ");
  }
}, "CreatePublicHolidayComponent_Template"), dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, ReactiveFormsModule, FormGroupDirective, FormControlName, FormHeaderComponent, FormSectionComponent], styles: [`

.container-fluid[_ngcontent-%COMP%] {
  padding: 0 1.5rem;
}
.h3[_ngcontent-%COMP%] {
  color: var(--bs-gray-800);
  font-weight: 600;
}
.text-muted[_ngcontent-%COMP%] {
  color: var(--bs-gray-600) !important;
}
h5[_ngcontent-%COMP%] {
  color: var(--bs-gray-800);
  font-weight: 600;
  border-bottom: 2px solid var(--bs-primary);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem !important;
}
.form-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: var(--bs-gray-700);
  margin-bottom: 0.5rem;
}
.form-label[_ngcontent-%COMP%]   .text-danger[_ngcontent-%COMP%] {
  color: var(--bs-danger) !important;
}
.form-control[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%] {
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.375rem;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
.form-control.is-invalid[_ngcontent-%COMP%], 
.form-select.is-invalid[_ngcontent-%COMP%] {
  border-color: var(--bs-danger);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
}
.invalid-feedback[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--bs-danger);
}
.form-text[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: var(--bs-gray-600);
  margin-top: 0.25rem;
}
.form-check-input[_ngcontent-%COMP%] {
  width: 2rem;
  height: 1rem;
  margin-top: 0.25rem;
  margin-right: 0.5rem;
  background-color: var(--bs-gray-300);
  border: none;
  border-radius: 1rem;
  transition: background-color 0.15s ease-in-out;
}
.form-check-input[_ngcontent-%COMP%]:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}
.form-check-input[_ngcontent-%COMP%]:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
.form-check-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: var(--bs-gray-700);
  margin-bottom: 0;
}
.card[_ngcontent-%COMP%] {
  border: 1px solid var(--bs-gray-200);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.card-body[_ngcontent-%COMP%] {
  padding: 2rem;
}
.btn[_ngcontent-%COMP%] {
  border-radius: 0.375rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  transition: all 0.15s ease-in-out;
}
.btn-primary[_ngcontent-%COMP%] {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}
.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-primary[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-outline-secondary[_ngcontent-%COMP%] {
  color: var(--bs-gray-600);
  border-color: var(--bs-gray-300);
}
.btn-outline-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-400);
  color: var(--bs-gray-700);
}
.gap-2[_ngcontent-%COMP%] {
  gap: 0.5rem !important;
}
input[type=number][_ngcontent-%COMP%] {
  -moz-appearance: textfield;
}
input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, 
input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=date][_ngcontent-%COMP%] {
  position: relative;
}
input[type=date][_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--bs-gray-600);
}
textarea.form-control[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: calc(2.25rem + 2px);
}
.spinner-border-sm[_ngcontent-%COMP%] {
  width: 0.875rem;
  height: 0.875rem;
}
.mb-3[_ngcontent-%COMP%]:last-child {
  margin-bottom: 0 !important;
}
@media (max-width: 768px) {
  .container-fluid[_ngcontent-%COMP%] {
    padding: 0 1rem;
  }
  .card-body[_ngcontent-%COMP%] {
    padding: 1.5rem;
  }
  .d-flex.gap-2[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .btn[_ngcontent-%COMP%] {
    width: 100%;
  }
  h5[_ngcontent-%COMP%] {
    font-size: 1.1rem;
    margin-bottom: 1rem !important;
  }
}
@media (max-width: 576px) {
  .h3[_ngcontent-%COMP%] {
    font-size: 1.25rem;
  }
  .text-muted[_ngcontent-%COMP%] {
    font-size: 0.875rem;
  }
  .card-body[_ngcontent-%COMP%] {
    padding: 1rem;
  }
  .row[_ngcontent-%COMP%]    > [class*=col-][_ngcontent-%COMP%] {
    margin-bottom: 1rem;
  }
}
.btn[_ngcontent-%COMP%]:focus, 
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus, 
.form-check-input[_ngcontent-%COMP%]:focus {
  outline: none;
}
@media (prefers-contrast: high) {
  .form-control[_ngcontent-%COMP%], 
   .form-select[_ngcontent-%COMP%] {
    border-width: 2px;
  }
  .btn[_ngcontent-%COMP%] {
    border-width: 2px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .btn[_ngcontent-%COMP%], 
   .form-control[_ngcontent-%COMP%], 
   .form-select[_ngcontent-%COMP%], 
   .form-check-input[_ngcontent-%COMP%] {
    transition: none;
  }
}
.row[_ngcontent-%COMP%]    + .row[_ngcontent-%COMP%] {
  margin-top: 2rem;
}
.text-danger[_ngcontent-%COMP%] {
  font-weight: 600;
}
.form-text[_ngcontent-%COMP%] {
  line-height: 1.4;
}
@keyframes _ngcontent-%COMP%_shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.is-invalid[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_shake 0.3s ease-in-out;
}
.form-control[_ngcontent-%COMP%]:valid:not(:focus), 
.form-select[_ngcontent-%COMP%]:valid:not(:focus) {
  border-color: var(--bs-success);
}
.form-select[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
}
.col-md-6[_ngcontent-%COMP%]    + .col-md-6[_ngcontent-%COMP%] {
  border-left: 1px solid var(--bs-gray-200);
  padding-left: 2rem;
}
@media (max-width: 768px) {
  .col-md-6[_ngcontent-%COMP%]    + .col-md-6[_ngcontent-%COMP%] {
    border-left: none;
    border-top: 1px solid var(--bs-gray-200);
    padding-left: 0;
    padding-top: 2rem;
    margin-top: 2rem;
  }
}
/*# sourceMappingURL=create-public-holiday.component.css.map */`] }));
var CreatePublicHolidayComponent = _CreatePublicHolidayComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreatePublicHolidayComponent, [{
    type: Component,
    args: [{ selector: "app-create-public-holiday", standalone: true, imports: [FormsModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent], template: `<div class="container-fluid">\r
  <!-- Page Header -->\r
  <app-form-header\r
    mode="create"\r
    [title]="t('settings.holidays.createHoliday')"\r
    moduleName="settings"\r
    moduleRoute="settings/public-holidays"\r
    [loading]="submitting()">\r
  </app-form-header>\r
\r
  <!-- Form Card -->\r
  <div class="card">\r
    <div class="card-body">\r
      <form [formGroup]="holidayForm" (ngSubmit)="onSubmit()">\r
        <div class="row">\r
          <!-- Basic Information -->\r
          <div class="col-md-6">\r
            <app-form-section [title]="t('settings.holidays.basicInformation')">\r
            <!-- Name -->\r
            <div class="mb-3">\r
              <label for="name" class="form-label">\r
                {{ t('settings.holidays.name') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <input type="text"\r
                     id="name"\r
                     class="form-control"\r
                     formControlName="name"\r
                     [class.is-invalid]="isFieldInvalid('name')"\r
                     [placeholder]="t('settings.holidays.namePlaceholder')">\r
              @if (isFieldInvalid('name')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('name') }}\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Arabic Name -->\r
            <div class="mb-3">\r
              <label for="nameAr" class="form-label">{{ t('settings.holidays.nameAr') }}</label>\r
              <input type="text"\r
                     id="nameAr"\r
                     class="form-control"\r
                     formControlName="nameAr"\r
                     [class.is-invalid]="isFieldInvalid('nameAr')"\r
                     [placeholder]="t('settings.holidays.nameArPlaceholder')">\r
              @if (isFieldInvalid('nameAr')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('nameAr') }}\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Holiday Type -->\r
            <div class="mb-3">\r
              <label for="holidayType" class="form-label">\r
                {{ t('settings.holidays.type') }}\r
                <span class="text-danger">*</span>\r
              </label>\r
              <select id="holidayType"\r
                      class="form-select"\r
                      formControlName="holidayType"\r
                      [class.is-invalid]="isFieldInvalid('holidayType')">\r
                @for (type of holidayTypes(); track type.value) {\r
                  <option [value]="type.value">{{ type.label }}</option>\r
                }\r
              </select>\r
              @if (isFieldInvalid('holidayType')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('holidayType') }}\r
                </div>\r
              }\r
              <div class="form-text">\r
                {{ getHolidayTypeDescription() }}\r
              </div>\r
            </div>\r
\r
            <!-- Description -->\r
            <div class="mb-3">\r
              <label for="description" class="form-label">{{ t('settings.holidays.description') }}</label>\r
              <textarea id="description"\r
                        class="form-control"\r
                        formControlName="description"\r
                        rows="3"\r
                        [class.is-invalid]="isFieldInvalid('description')"\r
                        [placeholder]="t('settings.holidays.descriptionPlaceholder')">\r
              </textarea>\r
              @if (isFieldInvalid('description')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('description') }}\r
                </div>\r
              }\r
            </div>\r
            </app-form-section>\r
          </div>\r
\r
          <!-- Date Configuration -->\r
          <div class="col-md-6">\r
            <app-form-section [title]="t('settings.holidays.dateConfiguration')">\r
            <!-- Specific Date (One Time only) -->\r
            @if (showSpecificDateField()) {\r
              <div class="mb-3">\r
                <label for="specificDate" class="form-label">\r
                  {{ t('settings.holidays.specificDate') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <input type="date"\r
                       id="specificDate"\r
                       class="form-control"\r
                       formControlName="specificDate"\r
                       [class.is-invalid]="isFieldInvalid('specificDate')">\r
                @if (isFieldInvalid('specificDate')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('specificDate') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Month (Annual and Floating) -->\r
            @if (showMonthField()) {\r
              <div class="mb-3">\r
                <label for="month" class="form-label">\r
                  {{ t('settings.holidays.month') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select id="month"\r
                        class="form-select"\r
                        formControlName="month"\r
                        [class.is-invalid]="isFieldInvalid('month')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  @for (month of getMonthOptions(); track month.value) {\r
                    <option [value]="month.value">{{ month.label }}</option>\r
                  }\r
                </select>\r
                @if (isFieldInvalid('month')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('month') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Day (Annual and Monthly) -->\r
            @if (showDayField()) {\r
              <div class="mb-3">\r
                <label for="day" class="form-label">\r
                  {{ t('settings.holidays.day') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select id="day"\r
                        class="form-select"\r
                        formControlName="day"\r
                        [class.is-invalid]="isFieldInvalid('day')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  @for (day of getDayOptions(); track day) {\r
                    <option [value]="day">{{ day }}</option>\r
                  }\r
                </select>\r
                @if (isFieldInvalid('day')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('day') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Week of Month (Floating only) -->\r
            @if (showWeekOfMonthField()) {\r
              <div class="mb-3">\r
                <label for="weekOfMonth" class="form-label">\r
                  {{ t('settings.holidays.weekOfMonth') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select id="weekOfMonth"\r
                        class="form-select"\r
                        formControlName="weekOfMonth"\r
                        [class.is-invalid]="isFieldInvalid('weekOfMonth')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  @for (week of getWeekOfMonthOptions(); track week.value) {\r
                    <option [value]="week.value">{{ week.label }}</option>\r
                  }\r
                </select>\r
                @if (isFieldInvalid('weekOfMonth')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('weekOfMonth') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Day of Week (Floating only) -->\r
            @if (showDayOfWeekField()) {\r
              <div class="mb-3">\r
                <label for="dayOfWeek" class="form-label">\r
                  {{ t('settings.holidays.dayOfWeek') }}\r
                  <span class="text-danger">*</span>\r
                </label>\r
                <select id="dayOfWeek"\r
                        class="form-select"\r
                        formControlName="dayOfWeek"\r
                        [class.is-invalid]="isFieldInvalid('dayOfWeek')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  @for (dayOfWeek of getDayOfWeekOptions(); track dayOfWeek.value) {\r
                    <option [value]="dayOfWeek.value">{{ dayOfWeek.label }}</option>\r
                  }\r
                </select>\r
                @if (isFieldInvalid('dayOfWeek')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('dayOfWeek') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Priority -->\r
            <div class="mb-3">\r
              <label for="priority" class="form-label">{{ t('settings.holidays.priority') }}</label>\r
              <input type="number"\r
                     id="priority"\r
                     class="form-control"\r
                     formControlName="priority"\r
                     min="1"\r
                     max="100"\r
                     [class.is-invalid]="isFieldInvalid('priority')">\r
              @if (isFieldInvalid('priority')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('priority') }}\r
                </div>\r
              }\r
              <div class="form-text">{{ t('settings.holidays.priorityHelp') }}</div>\r
            </div>\r
            </app-form-section>\r
          </div>\r
        </div>\r
\r
        <!-- Additional Settings -->\r
        <app-form-section [title]="t('settings.holidays.additionalSettings')">\r
        <div class="row">\r
          <div class="col-md-6">\r
            <!-- Scope -->\r
            <div class="mb-3">\r
              <div class="form-check form-switch">\r
                <input class="form-check-input"\r
                       type="checkbox"\r
                       id="isNational"\r
                       formControlName="isNational">\r
                <label class="form-check-label" for="isNational">\r
                  {{ t('settings.holidays.isNational') }}\r
                </label>\r
              </div>\r
              <div class="form-text">{{ t('settings.holidays.isNationalHelp') }}</div>\r
            </div>\r
\r
            <!-- Active Status -->\r
            <div class="mb-3">\r
              <div class="form-check form-switch">\r
                <input class="form-check-input"\r
                       type="checkbox"\r
                       id="isActive"\r
                       formControlName="isActive">\r
                <label class="form-check-label" for="isActive">\r
                  {{ t('settings.holidays.isActive') }}\r
                </label>\r
              </div>\r
              <div class="form-text">{{ t('settings.holidays.isActiveHelp') }}</div>\r
            </div>\r
\r
            <!-- Country Code -->\r
            <div class="mb-3">\r
              <label for="countryCode" class="form-label">{{ t('settings.holidays.countryCode') }}</label>\r
              <input type="text"\r
                     id="countryCode"\r
                     class="form-control"\r
                     formControlName="countryCode"\r
                     [class.is-invalid]="isFieldInvalid('countryCode')"\r
                     [placeholder]="t('settings.holidays.countryCodePlaceholder')">\r
              @if (isFieldInvalid('countryCode')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('countryCode') }}\r
                </div>\r
              }\r
              <div class="form-text">{{ t('settings.holidays.countryCodeHelp') }}</div>\r
            </div>\r
          </div>\r
\r
          <div class="col-md-6">\r
            <!-- Effective From Year -->\r
            <div class="mb-3">\r
              <label for="effectiveFromYear" class="form-label">{{ t('settings.holidays.effectiveFromYear') }}</label>\r
              <select id="effectiveFromYear"\r
                      class="form-select"\r
                      formControlName="effectiveFromYear"\r
                      [class.is-invalid]="isFieldInvalid('effectiveFromYear')">\r
                <option value="">{{ t('settings.holidays.noLimit') }}</option>\r
                @for (year of getYearOptions(); track year) {\r
                  <option [value]="year">{{ year }}</option>\r
                }\r
              </select>\r
              @if (isFieldInvalid('effectiveFromYear')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('effectiveFromYear') }}\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Effective To Year -->\r
            <div class="mb-3">\r
              <label for="effectiveToYear" class="form-label">{{ t('settings.holidays.effectiveToYear') }}</label>\r
              <select id="effectiveToYear"\r
                      class="form-select"\r
                      formControlName="effectiveToYear"\r
                      [class.is-invalid]="isFieldInvalid('effectiveToYear')">\r
                <option value="">{{ t('settings.holidays.noLimit') }}</option>\r
                @for (year of getYearOptions(); track year) {\r
                  <option [value]="year">{{ year }}</option>\r
                }\r
              </select>\r
              @if (isFieldInvalid('effectiveToYear')) {\r
                <div class="invalid-feedback">\r
                  {{ getFieldError('effectiveToYear') }}\r
                </div>\r
              }\r
            </div>\r
\r
            <!-- Branch (shown when not national) -->\r
            @if (!holidayForm.get('isNational')?.value) {\r
              <div class="mb-3">\r
                <label for="branchId" class="form-label">{{ t('settings.holidays.branch') }}</label>\r
                <select id="branchId"\r
                        class="form-select"\r
                        formControlName="branchId"\r
                        [class.is-invalid]="isFieldInvalid('branchId')">\r
                  <option value="">{{ t('common.select') }}</option>\r
                  <!-- Branch options would be loaded from a branches service -->\r
                </select>\r
                @if (isFieldInvalid('branchId')) {\r
                  <div class="invalid-feedback">\r
                    {{ getFieldError('branchId') }}\r
                  </div>\r
                }\r
              </div>\r
            }\r
          </div>\r
        </div>\r
        </app-form-section>\r
\r
        <!-- Form Actions -->\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button type="button"\r
                  class="btn btn-outline-secondary"\r
                  (click)="onCancel()"\r
                  [disabled]="submitting()">\r
            {{ t('common.cancel') }}\r
          </button>\r
          <button type="submit"\r
                  class="btn btn-primary"\r
                  [disabled]="submitting() || holidayForm.invalid">\r
            @if (submitting()) {\r
              <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>\r
            }\r
            {{ t('settings.holidays.createHoliday') }}\r
          </button>\r
        </div>\r
      </form>\r
    </div>\r
  </div>\r
</div>`, styles: [`/* src/app/pages/settings/public-holidays/create-public-holiday/create-public-holiday.component.css */
.container-fluid {
  padding: 0 1.5rem;
}
.h3 {
  color: var(--bs-gray-800);
  font-weight: 600;
}
.text-muted {
  color: var(--bs-gray-600) !important;
}
h5 {
  color: var(--bs-gray-800);
  font-weight: 600;
  border-bottom: 2px solid var(--bs-primary);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem !important;
}
.form-label {
  font-weight: 500;
  color: var(--bs-gray-700);
  margin-bottom: 0.5rem;
}
.form-label .text-danger {
  color: var(--bs-danger) !important;
}
.form-control,
.form-select {
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.375rem;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control:focus,
.form-select:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
.form-control.is-invalid,
.form-select.is-invalid {
  border-color: var(--bs-danger);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
}
.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--bs-danger);
}
.form-text {
  font-size: 0.8rem;
  color: var(--bs-gray-600);
  margin-top: 0.25rem;
}
.form-check-input {
  width: 2rem;
  height: 1rem;
  margin-top: 0.25rem;
  margin-right: 0.5rem;
  background-color: var(--bs-gray-300);
  border: none;
  border-radius: 1rem;
  transition: background-color 0.15s ease-in-out;
}
.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
.form-check-label {
  font-weight: 500;
  color: var(--bs-gray-700);
  margin-bottom: 0;
}
.card {
  border: 1px solid var(--bs-gray-200);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.card-body {
  padding: 2rem;
}
.btn {
  border-radius: 0.375rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  transition: all 0.15s ease-in-out;
}
.btn-primary {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}
.btn-primary:hover:not(:disabled) {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-outline-secondary {
  color: var(--bs-gray-600);
  border-color: var(--bs-gray-300);
}
.btn-outline-secondary:hover:not(:disabled) {
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-400);
  color: var(--bs-gray-700);
}
.gap-2 {
  gap: 0.5rem !important;
}
input[type=number] {
  -moz-appearance: textfield;
}
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=date] {
  position: relative;
}
input[type=date]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--bs-gray-600);
}
textarea.form-control {
  resize: vertical;
  min-height: calc(2.25rem + 2px);
}
.spinner-border-sm {
  width: 0.875rem;
  height: 0.875rem;
}
.mb-3:last-child {
  margin-bottom: 0 !important;
}
@media (max-width: 768px) {
  .container-fluid {
    padding: 0 1rem;
  }
  .card-body {
    padding: 1.5rem;
  }
  .d-flex.gap-2 {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  h5 {
    font-size: 1.1rem;
    margin-bottom: 1rem !important;
  }
}
@media (max-width: 576px) {
  .h3 {
    font-size: 1.25rem;
  }
  .text-muted {
    font-size: 0.875rem;
  }
  .card-body {
    padding: 1rem;
  }
  .row > [class*=col-] {
    margin-bottom: 1rem;
  }
}
.btn:focus,
.form-control:focus,
.form-select:focus,
.form-check-input:focus {
  outline: none;
}
@media (prefers-contrast: high) {
  .form-control,
  .form-select {
    border-width: 2px;
  }
  .btn {
    border-width: 2px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .btn,
  .form-control,
  .form-select,
  .form-check-input {
    transition: none;
  }
}
.row + .row {
  margin-top: 2rem;
}
.text-danger {
  font-weight: 600;
}
.form-text {
  line-height: 1.4;
}
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.is-invalid {
  animation: shake 0.3s ease-in-out;
}
.form-control:valid:not(:focus),
.form-select:valid:not(:focus) {
  border-color: var(--bs-success);
}
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
}
.col-md-6 + .col-md-6 {
  border-left: 1px solid var(--bs-gray-200);
  padding-left: 2rem;
}
@media (max-width: 768px) {
  .col-md-6 + .col-md-6 {
    border-left: none;
    border-top: 1px solid var(--bs-gray-200);
    padding-left: 0;
    padding-top: 2rem;
    margin-top: 2rem;
  }
}
/*# sourceMappingURL=create-public-holiday.component.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreatePublicHolidayComponent, { className: "CreatePublicHolidayComponent", filePath: "src/app/pages/settings/public-holidays/create-public-holiday/create-public-holiday.component.ts", lineNumber: 19 });
})();
export {
  CreatePublicHolidayComponent
};
//# sourceMappingURL=chunk-TCLYCB2X.js.map
