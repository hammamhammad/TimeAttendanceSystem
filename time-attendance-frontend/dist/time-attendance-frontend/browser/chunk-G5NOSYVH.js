import {
  RemoteWorkRequestStatus,
  RemoteWorkRequestsService
} from "./chunk-P7VFNCII.js";
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
  ConfirmationService
} from "./chunk-X57ZQ5VD.js";
import "./chunk-DWXA666M.js";
import "./chunk-EVMJ7ILG.js";
import {
  LoadingSpinnerComponent
} from "./chunk-VATI3GP6.js";
import {
  NotificationService
} from "./chunk-KJWBMNEV.js";
import "./chunk-O2IS3HK2.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
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
} from "./chunk-DUNHAUAW.js";
import {
  __name,
  __publicField
} from "./chunk-26Y7QVDB.js";

// src/app/pages/remote-work/view-remote-work-assignment/view-remote-work-assignment.component.ts
function ViewRemoteWorkAssignmentComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
__name(ViewRemoteWorkAssignmentComponent_Conditional_2_Template, "ViewRemoteWorkAssignmentComponent_Conditional_2_Template");
function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.i18n.t("remoteWork.request.reason"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.request().reason);
  }
}
__name(ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_8_Template, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_8_Template");
function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h5", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 7);
    \u0275\u0275element(5, "app-definition-list", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.approval_information"));
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r1.approvalInfoItems())("labelWidth", "4")("valueWidth", "8");
  }
}
__name(ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_9_Template, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_9_Template");
function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onReject());
    }, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_0_listener"));
    \u0275\u0275element(1, "i", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 15);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onApprove());
    }, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_3_listener"));
    \u0275\u0275element(4, "i", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 17);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCancel());
    }, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template_button_click_6_listener"));
    \u0275\u0275element(7, "i", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.reject"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.approve"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("remoteWork.request.cancel"), " ");
  }
}
__name(ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template, "ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template");
function ViewRemoteWorkAssignmentComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h5", 5);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "app-status-badge", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275element(7, "app-definition-list", 8);
    \u0275\u0275conditionalCreate(8, ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_8_Template, 5, 2, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_9_Template, 6, 4, "div", 2);
    \u0275\u0275elementStart(10, "div", 10)(11, "button", 11);
    \u0275\u0275listener("click", /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Conditional_3_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBack());
    }, "ViewRemoteWorkAssignmentComponent_Conditional_3_Template_button_click_11_listener"));
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ViewRemoteWorkAssignmentComponent_Conditional_3_Conditional_13_Template, 9, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.i18n.t("remoteWork.request.basic_information"));
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r1.statusBadge().variant)("label", ctx_r1.statusBadge().label);
    \u0275\u0275advance(2);
    \u0275\u0275property("items", ctx_r1.basicInfoItems())("labelWidth", "4")("valueWidth", "8");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.request().reason ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.approvalInfoItems().length > 0 ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.i18n.t("common.back"), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.request().status === 0 ? 13 : -1);
  }
}
__name(ViewRemoteWorkAssignmentComponent_Conditional_3_Template, "ViewRemoteWorkAssignmentComponent_Conditional_3_Template");
var _ViewRemoteWorkAssignmentComponent = class _ViewRemoteWorkAssignmentComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  remoteWorkService = inject(RemoteWorkRequestsService);
  notification = inject(NotificationService);
  confirmation = inject(ConfirmationService);
  i18n = inject(I18nService);
  request = signal(null, ...ngDevMode ? [{ debugName: "request" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  requestId = signal(null, ...ngDevMode ? [{ debugName: "requestId" }] : []);
  statusBadge = computed(() => {
    const status = this.request()?.status;
    if (status === void 0)
      return { label: "", variant: "secondary" };
    return {
      label: this.getStatusText(status),
      variant: this.getStatusVariant(status)
    };
  }, ...ngDevMode ? [{ debugName: "statusBadge" }] : []);
  basicInfoItems = computed(() => {
    const request = this.request();
    if (!request)
      return [];
    return [
      {
        label: this.i18n.t("remoteWork.request.employee"),
        value: request.employeeName || "-"
      },
      {
        label: this.i18n.t("remoteWork.request.startDate"),
        value: this.formatDate(request.startDate)
      },
      {
        label: this.i18n.t("remoteWork.request.endDate"),
        value: this.formatDate(request.endDate)
      },
      {
        label: this.i18n.t("remoteWork.request.workingDays"),
        value: request.workingDaysCount.toString()
      },
      {
        label: this.i18n.t("remoteWork.request.created_by"),
        value: request.createdByUserName || "-"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "basicInfoItems" }] : []);
  approvalInfoItems = computed(() => {
    const request = this.request();
    if (!request)
      return [];
    const items = [];
    if (request.approvedByUserName) {
      items.push({
        label: this.i18n.t("remoteWork.request.approved_by"),
        value: request.approvedByUserName
      });
    }
    if (request.approvedAt) {
      items.push({
        label: this.i18n.t("remoteWork.request.approval_date"),
        value: this.formatDateTime(request.approvedAt)
      });
    }
    if (request.rejectionReason) {
      items.push({
        label: this.i18n.t("remoteWork.request.rejection_reason"),
        value: request.rejectionReason
      });
    }
    return items;
  }, ...ngDevMode ? [{ debugName: "approvalInfoItems" }] : []);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.requestId.set(parseInt(id, 10));
      this.loadRequest();
    }
  }
  loadRequest() {
    const id = this.requestId();
    if (!id)
      return;
    this.loading.set(true);
    this.remoteWorkService.getById(id).subscribe({
      next: /* @__PURE__ */ __name((request) => {
        this.request.set(request);
        this.loading.set(false);
      }, "next"),
      error: /* @__PURE__ */ __name(() => {
        this.notification.error(this.i18n.t("remoteWork.request.errors.load_failed"));
        this.loading.set(false);
        this.router.navigate(["/remote-work"]);
      }, "error")
    });
  }
  onEdit() {
    const id = this.requestId();
    if (id) {
      this.router.navigate(["/remote-work/edit", id]);
    }
  }
  onApprove() {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t("remoteWork.request.errors.cannot_approve"));
      return;
    }
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.request.approveConfirm"),
      message: this.i18n.t("remoteWork.request.approveMessage"),
      confirmText: this.i18n.t("common.yes"),
      cancelText: this.i18n.t("common.no")
    }).then((result) => {
      if (result.confirmed && request) {
        const approverId = 1;
        this.remoteWorkService.approve({
          requestId: request.id,
          approverId,
          decision: RemoteWorkRequestStatus.Approved
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.request.success.approved"));
            this.loadRequest();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.request.errors.approve_failed"));
          }, "error")
        });
      }
    });
  }
  onReject() {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t("remoteWork.request.errors.cannot_reject"));
      return;
    }
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.request.rejectConfirm"),
      message: this.i18n.t("remoteWork.request.rejectMessage"),
      confirmText: this.i18n.t("common.yes"),
      cancelText: this.i18n.t("common.no")
    }).then((result) => {
      if (result.confirmed && request) {
        const approverId = 1;
        this.remoteWorkService.approve({
          requestId: request.id,
          approverId,
          decision: RemoteWorkRequestStatus.Rejected,
          rejectionReason: ""
        }).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.request.success.rejected"));
            this.loadRequest();
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.request.errors.reject_failed"));
          }, "error")
        });
      }
    });
  }
  onCancel() {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t("remoteWork.request.errors.cannot_cancel"));
      return;
    }
    this.confirmation.confirm({
      title: this.i18n.t("remoteWork.request.cancelConfirm"),
      message: this.i18n.t("remoteWork.request.cancelMessage"),
      confirmText: this.i18n.t("common.yes"),
      cancelText: this.i18n.t("common.no")
    }).then((result) => {
      if (result.confirmed && request) {
        this.remoteWorkService.cancel(request.id).subscribe({
          next: /* @__PURE__ */ __name(() => {
            this.notification.success(this.i18n.t("remoteWork.request.success.cancelled"));
            this.router.navigate(["/remote-work"]);
          }, "next"),
          error: /* @__PURE__ */ __name(() => {
            this.notification.error(this.i18n.t("remoteWork.request.errors.cancel_failed"));
          }, "error")
        });
      }
    });
  }
  onBack() {
    this.router.navigate(["/remote-work"]);
  }
  getStatusText(status) {
    const statusMap = {
      [RemoteWorkRequestStatus.Pending]: this.i18n.t("remoteWork.status.pending"),
      [RemoteWorkRequestStatus.Approved]: this.i18n.t("remoteWork.status.approved"),
      [RemoteWorkRequestStatus.Rejected]: this.i18n.t("remoteWork.status.rejected"),
      [RemoteWorkRequestStatus.Cancelled]: this.i18n.t("remoteWork.status.cancelled")
    };
    return statusMap[status] || "";
  }
  getStatusVariant(status) {
    const statusMap = {
      [RemoteWorkRequestStatus.Pending]: "warning",
      [RemoteWorkRequestStatus.Approved]: "success",
      [RemoteWorkRequestStatus.Rejected]: "danger",
      [RemoteWorkRequestStatus.Cancelled]: "secondary"
    };
    return statusMap[status] || "secondary";
  }
  formatDate(date) {
    if (!date)
      return "-";
    return new Date(date).toLocaleDateString();
  }
  formatDateTime(dateTime) {
    if (!dateTime)
      return "-";
    return new Date(dateTime).toLocaleString();
  }
};
__name(_ViewRemoteWorkAssignmentComponent, "ViewRemoteWorkAssignmentComponent");
__publicField(_ViewRemoteWorkAssignmentComponent, "\u0275fac", /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ViewRemoteWorkAssignmentComponent)();
}, "ViewRemoteWorkAssignmentComponent_Factory"));
__publicField(_ViewRemoteWorkAssignmentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ViewRemoteWorkAssignmentComponent, selectors: [["app-view-remote-work-assignment"]], decls: 4, vars: 4, consts: [[1, "view-remote-work-page"], ["mode", "view", "moduleName", "remoteWork.request", "moduleRoute", "remote-work", 3, "title", "entityId"], [1, "card", "mb-3"], [1, "card-header"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "mb-0"], [3, "status", "label"], [1, "card-body"], [3, "items", "labelWidth", "valueWidth"], [1, "mt-3"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "mt-2", "mb-0"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "fas", "fa-times", "me-2"], ["type", "button", 1, "btn", "btn-success", 3, "click"], [1, "fas", "fa-check", "me-2"], ["type", "button", 1, "btn", "btn-warning", 3, "click"], [1, "fas", "fa-ban", "me-2"]], template: /* @__PURE__ */ __name(function ViewRemoteWorkAssignmentComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "app-form-header", 1);
    \u0275\u0275conditionalCreate(2, ViewRemoteWorkAssignmentComponent_Conditional_2_Template, 1, 0, "app-loading-spinner");
    \u0275\u0275conditionalCreate(3, ViewRemoteWorkAssignmentComponent_Conditional_3_Template, 14, 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx.i18n.t("remoteWork.request.view_details"))("entityId", (tmp_1_0 = ctx.request()) == null ? null : tmp_1_0.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.loading() && ctx.request() ? 3 : -1);
  }
}, "ViewRemoteWorkAssignmentComponent_Template"), dependencies: [
  RouterModule,
  FormHeaderComponent,
  DefinitionListComponent,
  StatusBadgeComponent,
  LoadingSpinnerComponent
], styles: ["\n\n.view-remote-work-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n/*# sourceMappingURL=view-remote-work-assignment.component.css.map */"] }));
var ViewRemoteWorkAssignmentComponent = _ViewRemoteWorkAssignmentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewRemoteWorkAssignmentComponent, [{
    type: Component,
    args: [{ selector: "app-view-remote-work-assignment", standalone: true, imports: [
      RouterModule,
      FormHeaderComponent,
      DefinitionListComponent,
      StatusBadgeComponent,
      LoadingSpinnerComponent
    ], template: `<div class="view-remote-work-page">\r
  <!-- Form Header -->\r
  <app-form-header\r
    mode="view"\r
    [title]="i18n.t('remoteWork.request.view_details')"\r
    moduleName="remoteWork.request"\r
    moduleRoute="remote-work"\r
    [entityId]="request()?.id">\r
  </app-form-header>\r
\r
  <!-- Loading State -->\r
  @if (loading()) {\r
    <app-loading-spinner></app-loading-spinner>\r
  }\r
\r
  <!-- Request Details -->\r
  @if (!loading() && request()) {\r
    <!-- Basic Information Card -->\r
    <div class="card mb-3">\r
      <div class="card-header">\r
        <div class="d-flex justify-content-between align-items-center">\r
          <h5 class="mb-0">{{ i18n.t('remoteWork.request.basic_information') }}</h5>\r
          <app-status-badge\r
            [status]="statusBadge().variant"\r
            [label]="statusBadge().label">\r
          </app-status-badge>\r
        </div>\r
      </div>\r
      <div class="card-body">\r
        <app-definition-list\r
          [items]="basicInfoItems()"\r
          [labelWidth]="'4'"\r
          [valueWidth]="'8'">\r
        </app-definition-list>\r
\r
        @if (request()!.reason) {\r
          <div class="mt-3">\r
            <strong>{{ i18n.t('remoteWork.request.reason') }}:</strong>\r
            <p class="mt-2 mb-0">{{ request()!.reason }}</p>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- Approval Information Card -->\r
    @if (approvalInfoItems().length > 0) {\r
      <div class="card mb-3">\r
        <div class="card-header">\r
          <h5 class="mb-0">{{ i18n.t('remoteWork.request.approval_information') }}</h5>\r
        </div>\r
        <div class="card-body">\r
          <app-definition-list\r
            [items]="approvalInfoItems()"\r
            [labelWidth]="'4'"\r
            [valueWidth]="'8'">\r
          </app-definition-list>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Actions -->\r
    <div class="d-flex justify-content-end gap-2 mt-4">\r
      <button\r
        type="button"\r
        class="btn btn-secondary"\r
        (click)="onBack()">\r
        {{ i18n.t('common.back') }}\r
      </button>\r
      @if (request()!.status === 0) {\r
        <button\r
          type="button"\r
          class="btn btn-danger"\r
          (click)="onReject()">\r
          <i class="fas fa-times me-2"></i>\r
          {{ i18n.t('common.reject') }}\r
        </button>\r
        <button\r
          type="button"\r
          class="btn btn-success"\r
          (click)="onApprove()">\r
          <i class="fas fa-check me-2"></i>\r
          {{ i18n.t('common.approve') }}\r
        </button>\r
        <button\r
          type="button"\r
          class="btn btn-warning"\r
          (click)="onCancel()">\r
          <i class="fas fa-ban me-2"></i>\r
          {{ i18n.t('remoteWork.request.cancel') }}\r
        </button>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/pages/remote-work/view-remote-work-assignment/view-remote-work-assignment.component.css */\n.view-remote-work-page {\n  padding: 1.5rem;\n}\n.card-header h5 {\n  font-weight: 600;\n}\n/*# sourceMappingURL=view-remote-work-assignment.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ViewRemoteWorkAssignmentComponent, { className: "ViewRemoteWorkAssignmentComponent", filePath: "src/app/pages/remote-work/view-remote-work-assignment/view-remote-work-assignment.component.ts", lineNumber: 27 });
})();
export {
  ViewRemoteWorkAssignmentComponent
};
//# sourceMappingURL=chunk-G5NOSYVH.js.map
