import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-2WKN5CRJ.js";
import {
  __name,
  __publicField
} from "./chunk-EUAPD56R.js";

// src/app/core/confirmation/confirmation.service.ts
var _ConfirmationService = class _ConfirmationService {
  isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  config = signal(null, ...ngDevMode ? [{ debugName: "config" }] : []);
  comments = signal("", ...ngDevMode ? [{ debugName: "comments" }] : []);
  resolvePromise = null;
  isVisible$ = this.isVisible.asReadonly();
  config$ = this.config.asReadonly();
  comments$ = this.comments.asReadonly();
  /**
   * Show a confirmation dialog
   */
  confirm(config) {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      const defaultConfig = {
        title: config.title,
        message: config.message,
        confirmText: config.confirmText || "Confirm",
        cancelText: config.cancelText || "Cancel",
        confirmButtonClass: config.confirmButtonClass || "btn-danger",
        cancelButtonClass: config.cancelButtonClass || "btn-secondary",
        icon: config.icon || "fa-question-circle",
        iconClass: config.iconClass || "text-warning",
        requireComments: config.requireComments || false
      };
      this.config.set(defaultConfig);
      this.comments.set("");
      this.isVisible.set(true);
    });
  }
  /**
   * Handle confirm action
   */
  onConfirm() {
    if (this.resolvePromise) {
      this.resolvePromise({
        confirmed: true,
        comments: this.comments() || void 0
      });
    }
    this.close();
  }
  /**
   * Handle cancel action
   */
  onCancel() {
    if (this.resolvePromise) {
      this.resolvePromise({ confirmed: false });
    }
    this.close();
  }
  /**
   * Update comments
   */
  setComments(comments) {
    this.comments.set(comments);
  }
  /**
   * Close the modal
   */
  close() {
    this.isVisible.set(false);
    this.config.set(null);
    this.comments.set("");
    this.resolvePromise = null;
  }
  /**
   * Quick confirmation for delete actions
   */
  confirmDelete(itemName, itemType = "item") {
    return this.confirm({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete this ${itemType}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmButtonClass: "btn-danger",
      icon: "fa-trash",
      iconClass: "text-danger"
    });
  }
  /**
   * Quick confirmation for save actions
   */
  confirmSave(message = "Do you want to save your changes?") {
    return this.confirm({
      title: "Save Changes",
      message,
      confirmText: "Save",
      cancelText: "Cancel",
      confirmButtonClass: "btn-primary",
      icon: "fa-save",
      iconClass: "text-primary"
    });
  }
  /**
   * Quick confirmation for discard actions
   */
  confirmDiscard(message = "You have unsaved changes. Are you sure you want to discard them?") {
    return this.confirm({
      title: "Discard Changes",
      message,
      confirmText: "Discard",
      cancelText: "Keep Editing",
      confirmButtonClass: "btn-warning",
      icon: "fa-exclamation-triangle",
      iconClass: "text-warning"
    });
  }
};
__name(_ConfirmationService, "ConfirmationService");
__publicField(_ConfirmationService, "\u0275fac", /* @__PURE__ */ __name(function ConfirmationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ConfirmationService)();
}, "ConfirmationService_Factory"));
__publicField(_ConfirmationService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ConfirmationService, factory: _ConfirmationService.\u0275fac, providedIn: "root" }));
var ConfirmationService = _ConfirmationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ConfirmationService
};
//# sourceMappingURL=chunk-NUNE7G5P.js.map
