import {
  EmployeeExcusesService
} from "./chunk-OD7FZ73P.js";
import {
  DefinitionListComponent
} from "./chunk-YAIJIRYX.js";
import {
  FormHeaderComponent
} from "./chunk-U5KRTQNT.js";
import {
  StatusBadgeComponent
} from "./chunk-TT5VOWGP.js";
import {
  ExcuseStatus
} from "./chunk-MMUPQRFG.js";
import {
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import {
  PermissionService
} from "./chunk-DWXA666M.js";
import {
  PermissionActions
} from "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
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
  ɵɵclassMap,
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
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/employee-excuses/excuse-details/excuse-details.component.ts
function ExcuseDetailsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-loading-spinner", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", ctx_r0.i18n.t("common.loading"))("centered", true);
  }
}
__name(ExcuseDetailsComponent_Conditional_2_Template, "ExcuseDetailsComponent_Conditional_2_Template");
function ExcuseDetailsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "i", 6);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.error(), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_3_Template, "ExcuseDetailsComponent_Conditional_3_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-definition-list", 41);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("items", ctx_r0.reviewInfo())("labelWidth", "3")("valueWidth", "9");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_4_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_4_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.i18n.t("employee_excuses.reviewer_comments"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx_r0.excuse()) == null ? null : tmp_4_0.reviewerComments, " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_5_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_5_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "h6", 39);
    \u0275\u0275element(2, "i", 40);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_4_Template, 1, 3, "app-definition-list", 41);
    \u0275\u0275conditionalCreate(5, ExcuseDetailsComponent_Conditional_4_Conditional_33_Conditional_5_Template, 5, 2, "div", 42);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.review_information"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.reviewInfo().length > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.excuse().reviewerComments ? 5 : -1);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_33_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_33_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.downloadAttachment());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.download"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "h6", 26);
    \u0275\u0275element(2, "i", 44);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 45)(5, "div", 12);
    \u0275\u0275element(6, "i", 46);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, ExcuseDetailsComponent_Conditional_4_Conditional_34_Conditional_9_Template, 3, 1, "button", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.attachment"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.attachment_available"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDownload() ? 9 : -1);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_34_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_34_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.navigateToEdit());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.edit"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 60);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_1_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_1_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 61);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_2_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_2_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.approveExcuse());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_1_Template, 1, 0, "span", 60)(2, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Conditional_2_Template, 1, 0, "i", 61);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.approve"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 60);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_1_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_1_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 63);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_2_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_2_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.rejectExcuse());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_1_Template, 1, 0, "span", 60)(2, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Conditional_2_Template, 1, 0, "i", 63);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.reject"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 60);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_1_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_1_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 65);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_2_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_2_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelExcuse());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template_button_click_0_listener"));
    \u0275\u0275conditionalCreate(1, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_1_Template, 1, 0, "span", 60)(2, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Conditional_2_Template, 1, 0, "i", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.processing());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.processing() ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.cancel"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.downloadAttachment());
    }, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.download_attachment"), " ");
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template");
function ExcuseDetailsComponent_Conditional_4_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 9)(2, "h6", 10);
    \u0275\u0275element(3, "i", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 20)(6, "div", 51);
    \u0275\u0275conditionalCreate(7, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_7_Template, 3, 2, "button", 52);
    \u0275\u0275conditionalCreate(8, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_8_Template, 4, 3, "button", 53);
    \u0275\u0275conditionalCreate(9, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_9_Template, 4, 3, "button", 54);
    \u0275\u0275conditionalCreate(10, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_10_Template, 4, 3, "button", 55);
    \u0275\u0275conditionalCreate(11, ExcuseDetailsComponent_Conditional_4_Conditional_36_Conditional_11_Template, 3, 1, "button", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("common.actions"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canEdit() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canApprove() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canReject() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canCancel() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.canDownload() ? 11 : -1);
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Conditional_36_Template, "ExcuseDetailsComponent_Conditional_4_Conditional_36_Template");
function ExcuseDetailsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "h5", 10)(5, "div", 11)(6, "div", 12)(7, "div", 13)(8, "div", 14);
    \u0275\u0275element(9, "i", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div")(11, "div", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "small", 17);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 18);
    \u0275\u0275element(16, "app-status-badge", 19);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 20)(18, "div", 21)(19, "h6", 22);
    \u0275\u0275element(20, "i", 23);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 4)(23, "div", 24);
    \u0275\u0275element(24, "app-definition-list", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 24);
    \u0275\u0275element(26, "app-definition-list", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 21)(28, "h6", 26);
    \u0275\u0275element(29, "i", 27);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 28);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(33, ExcuseDetailsComponent_Conditional_4_Conditional_33_Template, 6, 3, "div", 21);
    \u0275\u0275conditionalCreate(34, ExcuseDetailsComponent_Conditional_4_Conditional_34_Template, 10, 3, "div", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 29);
    \u0275\u0275conditionalCreate(36, ExcuseDetailsComponent_Conditional_4_Conditional_36_Template, 12, 6, "div", 30);
    \u0275\u0275elementStart(37, "div", 8)(38, "div", 9)(39, "h6", 10);
    \u0275\u0275element(40, "i", 31);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 20)(43, "div", 32)(44, "div", 33)(45, "div", 34)(46, "div", 35);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 36);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 33)(51, "div", 34)(52, "div", 37);
    \u0275\u0275element(53, "app-status-badge", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 36);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 38)(57, "div", 34)(58, "div", 37)(59, "span");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 36);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_14_0;
    let tmp_25_0;
    let tmp_26_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r0.excuse()) == null ? null : tmp_1_0.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.i18n.t("employee_excuses.request_id"), ": #", (tmp_2_0 = ctx_r0.excuse()) == null ? null : tmp_2_0.id);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r0.formatStatus(ctx_r0.excuse().status))("variant", ctx_r0.getStatusVariant(ctx_r0.excuse().status))("icon", ctx_r0.getStatusIcon(ctx_r0.excuse().status));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.basic_information"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("items", ctx_r0.basicInfoColumn1())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r0.basicInfoColumn2())("labelWidth", "5")("valueWidth", "7");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.reason"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_14_0 = ctx_r0.excuse()) == null ? null : tmp_14_0.reason, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.excuse().reviewDate || ctx_r0.excuse().reviewerComments ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.excuse().attachmentUrl ? 34 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.hasActiveActions() ? 36 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.i18n.t("employee_excuses.request_summary"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.formatDuration(ctx_r0.excuse().durationHours));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.duration"));
    \u0275\u0275advance(4);
    \u0275\u0275property("label", ctx_r0.formatStatus(ctx_r0.excuse().status))("variant", ctx_r0.getStatusVariant(ctx_r0.excuse().status))("icon", ctx_r0.getStatusIcon(ctx_r0.excuse().status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.status"));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(((tmp_25_0 = ctx_r0.excuse()) == null ? null : tmp_25_0.isWithinPolicy) ? "text-success" : "text-warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_26_0 = ctx_r0.excuse()) == null ? null : tmp_26_0.isWithinPolicy) ? ctx_r0.i18n.t("employee_excuses.compliant") : ctx_r0.i18n.t("employee_excuses.violation"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.i18n.t("employee_excuses.policy_compliance"));
  }
}
__name(ExcuseDetailsComponent_Conditional_4_Template, "ExcuseDetailsComponent_Conditional_4_Template");
var _ExcuseDetailsComponent = class _ExcuseDetailsComponent {
  i18n = inject(I18nService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  employeeExcusesService = inject(EmployeeExcusesService);
  notificationService = inject(NotificationService);
  confirmationService = inject(ConfirmationService);
  permissionService = inject(PermissionService);
  // Signals
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  excuse = signal(null, ...ngDevMode ? [{ debugName: "excuse" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  // Enum reference for template
  ExcuseStatus = ExcuseStatus;
  ngOnInit() {
    this.loadExcuseDetails();
  }
  loadExcuseDetails() {
    const excuseId = this.route.snapshot.paramMap.get("id");
    if (!excuseId) {
      this.router.navigate(["/employee-excuses"]);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.employeeExcusesService.getEmployeeExcuseById(+excuseId).subscribe({
      next: /* @__PURE__ */ __name((excuse) => {
        this.excuse.set(excuse);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to load excuse details:", error);
        this.error.set(this.i18n.t("employee_excuses.load_error"));
        this.loading.set(false);
      }, "error")
    });
  }
  navigateBack() {
    this.router.navigate(["/employee-excuses"]);
  }
  navigateToEdit() {
    if (this.excuse()) {
      this.router.navigate(["/employee-excuses", this.excuse().id, "edit"]);
    }
  }
  approveExcuse() {
    if (!this.excuse())
      return;
    const message = this.i18n.t("employee_excuses.confirm_approve");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.approve_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.approve")
    }).then((result) => {
      if (result.confirmed) {
        this.processing.set(true);
        this.employeeExcusesService.reviewEmployeeExcuse(this.excuse().id, {
          status: ExcuseStatus.Approved,
          reviewerComments: result.comments
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.approve_success"));
            this.loadExcuseDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to approve excuse:", error);
            this.notificationService.error(this.i18n.t("employee_excuses.approve_error"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  rejectExcuse() {
    if (!this.excuse())
      return;
    const message = this.i18n.t("employee_excuses.confirm_reject");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.reject_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.reject"),
      requireComments: true
    }).then((result) => {
      if (result.confirmed) {
        this.processing.set(true);
        this.employeeExcusesService.reviewEmployeeExcuse(this.excuse().id, {
          status: ExcuseStatus.Rejected,
          reviewerComments: result.comments
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.reject_success"));
            this.loadExcuseDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to reject excuse:", error);
            this.notificationService.error(this.i18n.t("employee_excuses.reject_error"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  cancelExcuse() {
    if (!this.excuse())
      return;
    const message = this.i18n.t("employee_excuses.confirm_cancel");
    this.confirmationService.confirm({
      title: this.i18n.t("employee_excuses.cancel_title"),
      message,
      confirmText: this.i18n.t("employee_excuses.cancel")
    }).then((result) => {
      if (result.confirmed) {
        this.processing.set(true);
        this.employeeExcusesService.cancelEmployeeExcuse(this.excuse().id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notificationService.success(this.i18n.t("employee_excuses.cancel_success"));
            this.loadExcuseDetails();
            this.processing.set(false);
          }, "next"),
          error: /* @__PURE__ */ __name((error) => {
            console.error("Failed to cancel excuse:", error);
            this.notificationService.error(this.i18n.t("employee_excuses.cancel_error"));
            this.processing.set(false);
          }, "error")
        });
      }
    });
  }
  downloadAttachment() {
    if (!this.excuse() || !this.excuse().attachmentUrl)
      return;
    this.employeeExcusesService.downloadAttachment(this.excuse().id).subscribe({
      next: /* @__PURE__ */ __name((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `excuse_${this.excuse().id}_attachment`;
        link.click();
        window.URL.revokeObjectURL(url);
      }, "next"),
      error: /* @__PURE__ */ __name((error) => {
        console.error("Failed to download attachment:", error);
        this.notificationService.error(this.i18n.t("employee_excuses.download_error"));
      }, "error")
    });
  }
  // Permission checks
  canEdit() {
    const excuse = this.excuse();
    if (!excuse)
      return false;
    return this.permissionService.has(`excuse.${PermissionActions.UPDATE}`) && this.canEditExcuse(excuse);
  }
  canApprove() {
    const excuse = this.excuse();
    if (!excuse)
      return false;
    return excuse.status === ExcuseStatus.Pending && this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) && this.canReviewExcuse(excuse);
  }
  canReject() {
    const excuse = this.excuse();
    if (!excuse)
      return false;
    return excuse.status === ExcuseStatus.Pending && this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) && this.canReviewExcuse(excuse);
  }
  canCancel() {
    const excuse = this.excuse();
    if (!excuse)
      return false;
    return excuse.status === ExcuseStatus.Pending && this.permissionService.has(`excuse.${PermissionActions.DELETE}`) && this.canCancelExcuse(excuse);
  }
  canDownload() {
    const excuse = this.excuse();
    if (!excuse)
      return false;
    return !!excuse.attachmentUrl && this.permissionService.has(`excuse.${PermissionActions.READ}`);
  }
  canEditExcuse(excuse) {
    return this.permissionService.hasRole("Admin") || this.permissionService.getCurrentUser()?.employeeId === excuse.employeeId;
  }
  canReviewExcuse(excuse) {
    return (this.permissionService.hasRole("Admin") || this.permissionService.hasRole("Manager")) && this.permissionService.getCurrentUser()?.employeeId !== excuse.employeeId;
  }
  canCancelExcuse(excuse) {
    return this.permissionService.hasRole("Admin") || this.permissionService.getCurrentUser()?.employeeId === excuse.employeeId;
  }
  // Display helpers
  formatDuration(hours) {
    if (hours < 1) {
      return `${Math.round(hours * 60)} ${this.i18n.t("common.minutes")}`;
    }
    return `${hours} ${this.i18n.t("common.hours")}`;
  }
  formatStatus(status) {
    if (!status) {
      return this.i18n.t("employee_excuses.status_pending");
    }
    return this.i18n.t(`employee_excuses.status_${status.toLowerCase()}`);
  }
  getStatusClass(status) {
    switch (status) {
      case ExcuseStatus.Pending:
        return "badge bg-warning";
      case ExcuseStatus.Approved:
        return "badge bg-success";
      case ExcuseStatus.Rejected:
        return "badge bg-danger";
      case ExcuseStatus.Cancelled:
        return "badge bg-secondary";
      default:
        return "badge bg-light";
    }
  }
  getStatusIcon(status) {
    switch (status) {
      case ExcuseStatus.Pending:
        return "fas fa-hourglass-half";
      case ExcuseStatus.Approved:
        return "fas fa-check-circle";
      case ExcuseStatus.Rejected:
        return "fas fa-times-circle";
      case ExcuseStatus.Cancelled:
        return "fas fa-ban";
      default:
        return "fas fa-question-circle";
    }
  }
  getStatusVariant(status) {
    switch (status) {
      case ExcuseStatus.Approved:
        return "success";
      case ExcuseStatus.Pending:
        return "warning";
      case ExcuseStatus.Rejected:
        return "danger";
      case ExcuseStatus.Cancelled:
        return "secondary";
      default:
        return "warning";
    }
  }
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
  formatDateTime(dateString) {
    return new Date(dateString).toLocaleString();
  }
  hasActiveActions() {
    return this.canEdit() || this.canApprove() || this.canReject() || this.canCancel() || this.canDownload();
  }
  getExcuseId() {
    return this.excuse()?.id;
  }
  // Computed properties for definition lists
  basicInfoColumn1 = computed(() => {
    const excuse = this.excuse();
    if (!excuse)
      return [];
    return [
      {
        label: this.i18n.t("employee_excuses.employee"),
        value: `${excuse.employeeName} (${excuse.employeeNumber})`
      },
      {
        label: this.i18n.t("employee_excuses.department"),
        value: excuse.departmentName || "-"
      },
      {
        label: this.i18n.t("employee_excuses.excuse_date"),
        value: excuse.excuseDate,
        type: "date"
      },
      {
        label: this.i18n.t("employee_excuses.excuse_type"),
        value: excuse.excuseType === "PersonalExcuse" ? this.i18n.t("employee_excuses.personal") : this.i18n.t("employee_excuses.official")
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoColumn1" }] : []);
  basicInfoColumn2 = computed(() => {
    const excuse = this.excuse();
    if (!excuse)
      return [];
    return [
      {
        label: this.i18n.t("employee_excuses.time_range"),
        value: `${excuse.startTime} - ${excuse.endTime}`
      },
      {
        label: this.i18n.t("employee_excuses.duration"),
        value: this.formatDuration(excuse.durationHours)
      },
      {
        label: this.i18n.t("employee_excuses.submission_date"),
        value: excuse.submissionDate,
        type: "date"
      },
      {
        label: this.i18n.t("employee_excuses.policy_compliance"),
        value: excuse.isWithinPolicy ? this.i18n.t("employee_excuses.compliant") : this.i18n.t("employee_excuses.violation"),
        type: "badge",
        badgeVariant: excuse.isWithinPolicy ? "success" : "warning",
        icon: excuse.isWithinPolicy ? "fas fa-check-circle" : "fas fa-exclamation-triangle"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoColumn2" }] : []);
  reviewInfo = computed(() => {
    const excuse = this.excuse();
    if (!excuse)
      return [];
    const items = [];
    if (excuse.reviewerName) {
      items.push({
        label: this.i18n.t("employee_excuses.reviewer"),
        value: excuse.reviewerName
      });
    }
    if (excuse.reviewDate) {
      items.push({
        label: this.i18n.t("employee_excuses.review_date"),
        value: excuse.reviewDate,
        type: "date"
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "reviewInfo" }] : []);
};
__name(_ExcuseDetailsComponent, "ExcuseDetailsComponent");
__publicField(_ExcuseDetailsComponent, "\u0275fac", /* @__PURE__ */ __name(function ExcuseDetailsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExcuseDetailsComponent)();
}, "ExcuseDetailsComponent_Factory"));
__publicField(_ExcuseDetailsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExcuseDetailsComponent, selectors: [["app-excuse-details"]], decls: 5, vars: 4, consts: [[1, "container-fluid"], ["mode", "view", "moduleName", "employee-excuses", "moduleRoute", "employee-excuses", 3, "title", "entityId", "loading"], [1, "d-flex", "justify-content-center", "py-5"], ["role", "alert", 1, "alert", "alert-danger"], [1, "row"], [3, "message", "centered"], [1, "fas", "fa-exclamation-triangle", "me-2"], [1, "col-lg-8"], [1, "card"], [1, "card-header"], [1, "card-title", "mb-0"], [1, "d-flex", "align-items-center", "justify-content-between"], [1, "d-flex", "align-items-center"], [1, "avatar-sm", "me-3"], [1, "avatar-title", "bg-primary-subtle", "text-primary", "rounded-circle"], [1, "fas", "fa-clipboard-user"], [1, "fw-medium"], [1, "text-muted"], [1, "text-end"], [3, "label", "variant", "icon"], [1, "card-body"], [1, "mb-4"], [1, "text-primary", "mb-3"], [1, "fa-solid", "fa-info-circle", "me-2"], [1, "col-md-6"], [3, "items", "labelWidth", "valueWidth"], [1, "text-secondary", "mb-3"], [1, "fa-solid", "fa-comment", "me-2"], [1, "bg-light", "p-3", "rounded"], [1, "col-lg-4"], [1, "card", "mb-4"], [1, "fas", "fa-chart-bar", "me-2"], [1, "row", "text-center"], [1, "col-12", "mb-3"], [1, "border", "rounded", "p-3"], [1, "h5", "mb-1", "text-primary"], [1, "text-muted", "small"], [1, "h6", "mb-1"], [1, "col-12"], [1, "text-info", "mb-3"], [1, "fa-solid", "fa-user-check", "me-2"], ["layout", "single", 3, "items", "labelWidth", "valueWidth"], [1, "mt-2"], [1, "bg-light", "p-3", "rounded", "mt-2"], [1, "fa-solid", "fa-paperclip", "me-2"], [1, "d-flex", "align-items-center", "justify-content-between", "bg-light", "p-3", "rounded"], [1, "fas", "fa-file", "text-primary", "me-2"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click"], [1, "fas", "fa-download", "me-1"], [1, "fas", "fa-cogs", "me-2"], [1, "d-grid", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-success", 3, "disabled"], ["type", "button", 1, "btn", "btn-danger", 3, "disabled"], ["type", "button", 1, "btn", "btn-warning", 3, "disabled"], ["type", "button", 1, "btn", "btn-outline-info"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click", "disabled"], [1, "fas", "fa-edit", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], ["role", "status", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "fas", "fa-check", "me-2"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "fas", "fa-times", "me-2"], ["type", "button", 1, "btn", "btn-warning", 3, "click", "disabled"], [1, "fas", "fa-ban", "me-2"], ["type", "button", 1, "btn", "btn-outline-info", 3, "click"], [1, "fas", "fa-download", "me-2"]], template: /* @__PURE__ */ __name(function ExcuseDetailsComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ExcuseDetailsComponent_Conditional_2_Template, 2, 2, "div", 2)(3, ExcuseDetailsComponent_Conditional_3_Template, 3, 1, "div", 3)(4, ExcuseDetailsComponent_Conditional_4_Template, 63, 29, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("employee_excuses.excuse_details"))("entityId", ctx.getExcuseId())("loading", ctx.loading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : ctx.error() ? 3 : ctx.excuse() ? 4 : -1);
  }
}, "ExcuseDetailsComponent_Template"), dependencies: [
  FormHeaderComponent,
  LoadingSpinnerComponent,
  StatusBadgeComponent,
  DefinitionListComponent
], styles: ["\n\n.excuse-details-page[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n  transition: box-shadow 0.15s ease-in-out;\n}\n.card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.card-header[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #495057;\n  margin-bottom: 0;\n  font-weight: 600;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n  margin-bottom: 0.25rem;\n}\n.fw-medium[_ngcontent-%COMP%] {\n  font-weight: 500 !important;\n  color: #495057;\n  font-size: 1rem;\n}\n.reason-text[_ngcontent-%COMP%], \n.review-comments[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  padding: 0.75rem;\n  color: #495057;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  min-height: 60px;\n}\n.review-comments[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  border-color: #ffeaa7;\n}\n.badge[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n  font-weight: 500;\n}\n.bg-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.bg-success[_ngcontent-%COMP%] {\n  background-color: #198754 !important;\n}\n.bg-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545 !important;\n}\n.bg-secondary[_ngcontent-%COMP%] {\n  background-color: #6c757d !important;\n}\n.bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  color: #212529 !important;\n}\n.text-dark[_ngcontent-%COMP%] {\n  color: #212529 !important;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary) !important;\n}\n.text-info[_ngcontent-%COMP%] {\n  color: #0dcaf0 !important;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #198754 !important;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #ffc107 !important;\n}\n.me-1[_ngcontent-%COMP%] {\n  margin-right: 0.25rem !important;\n}\n.me-2[_ngcontent-%COMP%] {\n  margin-right: 0.5rem !important;\n}\n.attachment-section[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.attachment-section[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  border-color: #dee2e6;\n}\n.attachment-section[_ngcontent-%COMP%]   .bg-light[_ngcontent-%COMP%] {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef;\n}\n.btn[_ngcontent-%COMP%] {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #fff;\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-success[_ngcontent-%COMP%] {\n  background-color: #198754;\n  border-color: #198754;\n}\n.btn-success[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #157347;\n  border-color: #146c43;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #bb2d3b;\n  border-color: #b02a37;\n}\n.btn-warning[_ngcontent-%COMP%] {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #000;\n}\n.btn-warning[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #ffca2c;\n  border-color: #ffc720;\n  color: #000;\n}\n.btn-outline-info[_ngcontent-%COMP%] {\n  color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-outline-info[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.d-grid.gap-2[_ngcontent-%COMP%] {\n  gap: 0.5rem !important;\n}\n.summary-item[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f1f3f4;\n}\n.summary-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.summary-item[_ngcontent-%COMP%]   .d-flex[_ngcontent-%COMP%] {\n  align-items: center;\n}\n.spinner-border[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n}\n.spinner-border-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.text-center.py-5[_ngcontent-%COMP%] {\n  padding: 3rem 1rem !important;\n}\n.alert[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n  border-left: 4px solid #dc3545;\n}\n@media (max-width: 768px) {\n  .excuse-details-page[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card-header[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    align-self: flex-end;\n    width: auto;\n  }\n  .col-lg-4[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .excuse-details-page[_ngcontent-%COMP%] {\n    padding: 0.25rem;\n  }\n  .card-body[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .summary-item[_ngcontent-%COMP%] {\n    padding: 0.5rem 0;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    align-self: stretch;\n  }\n}\n.badge.bg-warning.text-dark[_ngcontent-%COMP%] {\n  background-color: #fff3cd !important;\n  color: #664d03 !important;\n  border: 1px solid #ffeaa7;\n}\n.btn[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.btn-success[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);\n}\n.btn-danger[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.btn-warning[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n.form-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.fw-medium[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  display: block;\n}\n.text-muted.small[_ngcontent-%COMP%] {\n  font-size: 0.825rem !important;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n.badge[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  vertical-align: text-top;\n}\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n}\n.card[_ngcontent-%COMP%]:nth-child(2)   .card-header[_ngcontent-%COMP%] {\n  background-color: #fff3cd;\n  border-bottom-color: #ffeaa7;\n}\n.card[_ngcontent-%COMP%]:nth-child(2)   .card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  color: #664d03;\n}\n.summary-item[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n  margin: 0 -1rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  border-radius: 0.25rem;\n}\n.visually-hidden[_ngcontent-%COMP%] {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n/*# sourceMappingURL=excuse-details.component.css.map */"] }));
var ExcuseDetailsComponent = _ExcuseDetailsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcuseDetailsComponent, [{
    type: Component,
    args: [{ selector: "app-excuse-details", standalone: true, imports: [
      FormHeaderComponent,
      LoadingSpinnerComponent,
      StatusBadgeComponent,
      DefinitionListComponent
    ], template: `<div class="container-fluid">\r
  <!-- Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('employee_excuses.excuse_details')"\r
    moduleName="employee-excuses"\r
    moduleRoute="employee-excuses"\r
    [entityId]="getExcuseId()"\r
    [loading]="loading()">\r
  </app-form-header>\r
\r
  @if (loading()) {\r
    <div class="d-flex justify-content-center py-5">\r
      <app-loading-spinner\r
        [message]="i18n.t('common.loading')"\r
        [centered]="true">\r
      </app-loading-spinner>\r
    </div>\r
  } @else if (error()) {\r
    <div class="alert alert-danger" role="alert">\r
      <i class="fas fa-exclamation-triangle me-2"></i>\r
      {{ error() }}\r
    </div>\r
  } @else if (excuse()) {\r
    <!-- Excuse Details -->\r
    <div class="row">\r
      <!-- Main Information Card -->\r
      <div class="col-lg-8">\r
        <div class="card">\r
          <div class="card-header">\r
            <h5 class="card-title mb-0">\r
              <div class="d-flex align-items-center justify-content-between">\r
                <div class="d-flex align-items-center">\r
                  <div class="avatar-sm me-3">\r
                    <div class="avatar-title bg-primary-subtle text-primary rounded-circle">\r
                      <i class="fas fa-clipboard-user"></i>\r
                    </div>\r
                  </div>\r
                  <div>\r
                    <div class="fw-medium">{{ excuse()?.employeeName }}</div>\r
                    <small class="text-muted">{{ i18n.t('employee_excuses.request_id') }}: #{{ excuse()?.id }}</small>\r
                  </div>\r
                </div>\r
                <div class="text-end">\r
                  <app-status-badge\r
                    [label]="formatStatus(excuse()!.status)"\r
                    [variant]="getStatusVariant(excuse()!.status)"\r
                    [icon]="getStatusIcon(excuse()!.status)">\r
                  </app-status-badge>\r
                </div>\r
              </div>\r
            </h5>\r
          </div>\r
          <div class="card-body">\r
            <!-- Basic Information Section -->\r
            <div class="mb-4">\r
              <h6 class="text-primary mb-3">\r
                <i class="fa-solid fa-info-circle me-2"></i>\r
                {{ i18n.t('employee_excuses.basic_information') }}\r
              </h6>\r
              <div class="row">\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="basicInfoColumn1()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
                <div class="col-md-6">\r
                  <app-definition-list\r
                    [items]="basicInfoColumn2()"\r
                    [labelWidth]="'5'"\r
                    [valueWidth]="'7'">\r
                  </app-definition-list>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <!-- Reason Section -->\r
            <div class="mb-4">\r
              <h6 class="text-secondary mb-3">\r
                <i class="fa-solid fa-comment me-2"></i>\r
                {{ i18n.t('employee_excuses.reason') }}\r
              </h6>\r
              <div class="bg-light p-3 rounded">\r
                {{ excuse()?.reason }}\r
              </div>\r
            </div>\r
\r
            <!-- Review Information Section -->\r
            @if (excuse()!.reviewDate || excuse()!.reviewerComments) {\r
              <div class="mb-4">\r
                <h6 class="text-info mb-3">\r
                  <i class="fa-solid fa-user-check me-2"></i>\r
                  {{ i18n.t('employee_excuses.review_information') }}\r
                </h6>\r
                @if (reviewInfo().length > 0) {\r
                  <app-definition-list\r
                    [items]="reviewInfo()"\r
                    [labelWidth]="'3'"\r
                    [valueWidth]="'9'"\r
                    layout="single">\r
                  </app-definition-list>\r
                }\r
                @if (excuse()!.reviewerComments) {\r
                  <div class="mt-2">\r
                    <strong>{{ i18n.t('employee_excuses.reviewer_comments') }}:</strong>\r
                    <div class="bg-light p-3 rounded mt-2">\r
                      {{ excuse()?.reviewerComments }}\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            }\r
\r
            <!-- Attachment Section -->\r
            @if (excuse()!.attachmentUrl) {\r
              <div class="mb-4">\r
                <h6 class="text-secondary mb-3">\r
                  <i class="fa-solid fa-paperclip me-2"></i>\r
                  {{ i18n.t('employee_excuses.attachment') }}\r
                </h6>\r
                <div class="d-flex align-items-center justify-content-between bg-light p-3 rounded">\r
                  <div class="d-flex align-items-center">\r
                    <i class="fas fa-file text-primary me-2"></i>\r
                    <span>{{ i18n.t('employee_excuses.attachment_available') }}</span>\r
                  </div>\r
                  @if (canDownload()) {\r
                    <button\r
                      type="button"\r
                      class="btn btn-sm btn-outline-primary"\r
                      (click)="downloadAttachment()">\r
                      <i class="fas fa-download me-1"></i>\r
                      {{ i18n.t('employee_excuses.download') }}\r
                    </button>\r
                  }\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Actions Sidebar -->\r
      <div class="col-lg-4">\r
        <!-- Actions Card -->\r
        @if (hasActiveActions()) {\r
          <div class="card mb-4">\r
            <div class="card-header">\r
              <h6 class="card-title mb-0">\r
                <i class="fas fa-cogs me-2"></i>\r
                {{ i18n.t('common.actions') }}\r
              </h6>\r
            </div>\r
            <div class="card-body">\r
              <div class="d-grid gap-2">\r
                <!-- Edit Action -->\r
                @if (canEdit()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-primary"\r
                    (click)="navigateToEdit()"\r
                    [disabled]="processing()">\r
                    <i class="fas fa-edit me-2"></i>\r
                    {{ i18n.t('common.edit') }}\r
                  </button>\r
                }\r
\r
                <!-- Approve Action -->\r
                @if (canApprove()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-success"\r
                    (click)="approveExcuse()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-check me-2"></i>\r
                    }\r
                    {{ i18n.t('employee_excuses.approve') }}\r
                  </button>\r
                }\r
\r
                <!-- Reject Action -->\r
                @if (canReject()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-danger"\r
                    (click)="rejectExcuse()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-times me-2"></i>\r
                    }\r
                    {{ i18n.t('employee_excuses.reject') }}\r
                  </button>\r
                }\r
\r
                <!-- Cancel Action -->\r
                @if (canCancel()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-warning"\r
                    (click)="cancelExcuse()"\r
                    [disabled]="processing()">\r
                    @if (processing()) {\r
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>\r
                    } @else {\r
                      <i class="fas fa-ban me-2"></i>\r
                    }\r
                    {{ i18n.t('employee_excuses.cancel') }}\r
                  </button>\r
                }\r
\r
                <!-- Download Action -->\r
                @if (canDownload()) {\r
                  <button\r
                    type="button"\r
                    class="btn btn-outline-info"\r
                    (click)="downloadAttachment()">\r
                    <i class="fas fa-download me-2"></i>\r
                    {{ i18n.t('employee_excuses.download_attachment') }}\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        <!-- Summary Card -->\r
        <div class="card">\r
          <div class="card-header">\r
            <h6 class="card-title mb-0">\r
              <i class="fas fa-chart-bar me-2"></i>\r
              {{ i18n.t('employee_excuses.request_summary') }}\r
            </h6>\r
          </div>\r
          <div class="card-body">\r
            <div class="row text-center">\r
              <div class="col-12 mb-3">\r
                <div class="border rounded p-3">\r
                  <div class="h5 mb-1 text-primary">{{ formatDuration(excuse()!.durationHours) }}</div>\r
                  <div class="text-muted small">{{ i18n.t('employee_excuses.duration') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-12 mb-3">\r
                <div class="border rounded p-3">\r
                  <div class="h6 mb-1">\r
                    <app-status-badge\r
                      [label]="formatStatus(excuse()!.status)"\r
                      [variant]="getStatusVariant(excuse()!.status)"\r
                      [icon]="getStatusIcon(excuse()!.status)">\r
                    </app-status-badge>\r
                  </div>\r
                  <div class="text-muted small">{{ i18n.t('employee_excuses.status') }}</div>\r
                </div>\r
              </div>\r
              <div class="col-12">\r
                <div class="border rounded p-3">\r
                  <div class="h6 mb-1">\r
                    <span [class]="excuse()?.isWithinPolicy ? 'text-success' : 'text-warning'">\r
                      {{ excuse()?.isWithinPolicy ? i18n.t('employee_excuses.compliant') : i18n.t('employee_excuses.violation') }}\r
                    </span>\r
                  </div>\r
                  <div class="text-muted small">{{ i18n.t('employee_excuses.policy_compliance') }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  }`, styles: ["/* src/app/pages/employee-excuses/excuse-details/excuse-details.component.css */\n.excuse-details-page {\n  padding: 1rem;\n}\n.card {\n  border: none;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n  border-radius: 0.5rem;\n  transition: box-shadow 0.15s ease-in-out;\n}\n.card:hover {\n  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);\n}\n.card-header {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 0.5rem 0.5rem 0 0 !important;\n  padding: 1rem 1.5rem;\n}\n.card-header h5 {\n  color: #495057;\n  margin-bottom: 0;\n  font-weight: 600;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.form-label {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.025em;\n  margin-bottom: 0.25rem;\n}\n.fw-medium {\n  font-weight: 500 !important;\n  color: #495057;\n  font-size: 1rem;\n}\n.reason-text,\n.review-comments {\n  background-color: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 0.375rem;\n  padding: 0.75rem;\n  color: #495057;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  min-height: 60px;\n}\n.review-comments {\n  background-color: #fff3cd;\n  border-color: #ffeaa7;\n}\n.badge {\n  font-size: 0.875rem;\n  padding: 0.375rem 0.75rem;\n  font-weight: 500;\n}\n.bg-warning {\n  background-color: #ffc107 !important;\n  color: #000 !important;\n}\n.bg-success {\n  background-color: #198754 !important;\n}\n.bg-danger {\n  background-color: #dc3545 !important;\n}\n.bg-secondary {\n  background-color: #6c757d !important;\n}\n.bg-light {\n  background-color: #f8f9fa !important;\n  color: #212529 !important;\n}\n.text-dark {\n  color: #212529 !important;\n}\n.text-primary {\n  color: var(--bs-primary) !important;\n}\n.text-info {\n  color: #0dcaf0 !important;\n}\n.text-success {\n  color: #198754 !important;\n}\n.text-warning {\n  color: #ffc107 !important;\n}\n.me-1 {\n  margin-right: 0.25rem !important;\n}\n.me-2 {\n  margin-right: 0.5rem !important;\n}\n.attachment-section {\n  margin-top: 1.5rem;\n}\n.attachment-section hr {\n  margin: 1rem 0;\n  border-color: #dee2e6;\n}\n.attachment-section .bg-light {\n  background-color: #f8f9fa !important;\n  border: 1px solid #e9ecef;\n}\n.btn {\n  border-radius: 0.375rem;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n}\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover:not(:disabled) {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-primary {\n  color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-outline-primary:hover:not(:disabled) {\n  color: #fff;\n  background-color: var(--bs-primary);\n  border-color: var(--bs-primary);\n}\n.btn-success {\n  background-color: #198754;\n  border-color: #198754;\n}\n.btn-success:hover:not(:disabled) {\n  background-color: #157347;\n  border-color: #146c43;\n}\n.btn-danger {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-danger:hover:not(:disabled) {\n  background-color: #bb2d3b;\n  border-color: #b02a37;\n}\n.btn-warning {\n  background-color: #ffc107;\n  border-color: #ffc107;\n  color: #000;\n}\n.btn-warning:hover:not(:disabled) {\n  background-color: #ffca2c;\n  border-color: #ffc720;\n  color: #000;\n}\n.btn-outline-info {\n  color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-outline-info:hover:not(:disabled) {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.d-grid.gap-2 {\n  gap: 0.5rem !important;\n}\n.summary-item {\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f1f3f4;\n}\n.summary-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.summary-item .d-flex {\n  align-items: center;\n}\n.spinner-border {\n  width: 2rem;\n  height: 2rem;\n}\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n}\n.text-center.py-5 {\n  padding: 3rem 1rem !important;\n}\n.alert {\n  border: none;\n  border-radius: 0.5rem;\n}\n.alert-danger {\n  background-color: #f8d7da;\n  color: #721c24;\n  border-left: 4px solid #dc3545;\n}\n@media (max-width: 768px) {\n  .excuse-details-page {\n    padding: 0.5rem;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .card-header {\n    padding: 0.75rem 1rem;\n  }\n  .d-flex.justify-content-between {\n    flex-direction: column;\n    gap: 1rem;\n  }\n  .d-flex.justify-content-between .btn {\n    align-self: flex-end;\n    width: auto;\n  }\n  .col-lg-4 .card {\n    margin-top: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .excuse-details-page {\n    padding: 0.25rem;\n  }\n  .card-body {\n    padding: 0.75rem;\n  }\n  .summary-item {\n    padding: 0.5rem 0;\n  }\n  .d-flex.justify-content-between .btn {\n    width: 100%;\n    align-self: stretch;\n  }\n}\n.badge.bg-warning.text-dark {\n  background-color: #fff3cd !important;\n  color: #664d03 !important;\n  border: 1px solid #ffeaa7;\n}\n.btn:focus {\n  outline: none;\n  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);\n}\n.btn-success:focus {\n  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);\n}\n.btn-danger:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.btn-warning:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);\n}\n.card-header h5 i {\n  opacity: 0.8;\n}\n.form-label {\n  margin-bottom: 0.5rem;\n}\n.fw-medium {\n  margin-bottom: 0.25rem;\n  display: block;\n}\n.text-muted.small {\n  font-size: 0.825rem !important;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.card {\n  animation: fadeIn 0.3s ease-in-out;\n}\n.badge i {\n  vertical-align: text-top;\n}\n.btn-sm {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.25rem;\n}\n.card:nth-child(2) .card-header {\n  background-color: #fff3cd;\n  border-bottom-color: #ffeaa7;\n}\n.card:nth-child(2) .card-header h5 {\n  color: #664d03;\n}\n.summary-item:hover {\n  background-color: #f8f9fa;\n  margin: 0 -1rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  border-radius: 0.25rem;\n}\n.visually-hidden {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n/*# sourceMappingURL=excuse-details.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExcuseDetailsComponent, { className: "ExcuseDetailsComponent", filePath: "src/app/pages/employee-excuses/excuse-details/excuse-details.component.ts", lineNumber: 28 });
})();
export {
  ExcuseDetailsComponent
};
//# sourceMappingURL=chunk-DX4PNOGX.js.map
