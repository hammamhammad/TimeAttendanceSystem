# ERP Design System Migration Plan

## Context

The Time Attendance System currently uses a ClockN-branded purple (#9D99EA) color scheme with system fonts, Bootstrap-based badges, Material Design floating label forms, and a dark (#212529) sidebar. A new ERP Design System (`ERP_Design_System.html`) defines a professional indigo-blue (#4F6BF6) palette, Inter + JetBrains Mono typography, deep navy sidebar, pill badges with dot indicators, clean label-above-input forms, and refined shadow/spacing tokens.

This plan migrates both frontends (admin + self-service) to the new design system using a **CSS-first approach** that maximizes visual impact while minimizing HTML template changes.

---

## Key Architectural Decisions

1. **erp-tokens.css overlay** — New file imported after `variables.css` overrides all `--app-*` tokens. Easy rollback by removing one import line.
2. **CSS-only form adaptation** — Restyle `.app-modern-form .form-floating` to force labels permanently above inputs with full borders, avoiding changes to 89+ form HTML files.
3. **Bootstrap coexistence** — Override `--bs-*-rgb` variables rather than removing Bootstrap. Grid, utilities, and form structure continue to work.
4. **Both frontends in lockstep** — Changes apply to both `time-attendance-frontend/` and `time-attendance-selfservice-frontend/` simultaneously since they share identical CSS architecture.

---

## Phase 0: Infrastructure (No Visual Changes)

### 0.1 Add Inter + JetBrains Mono Fonts
**Files:**
- `time-attendance-frontend/src/index.html`
- `time-attendance-selfservice-frontend/src/index.html`

Add Google Fonts preconnect + stylesheet link for Inter (300-800) and JetBrains Mono (400, 500).

### 0.2 Create ERP Token Override Files
**Files to CREATE:**
- `time-attendance-frontend/src/styles/erp-tokens.css`
- `time-attendance-selfservice-frontend/src/styles/erp-tokens.css`

Empty initially — will be populated in Phase 1.

### 0.3 Wire Up Import Order
**Files:**
- `time-attendance-frontend/src/styles.css`
- `time-attendance-selfservice-frontend/src/styles.css`

Change import order to:
```
@import './styles/variables.css';
@import './styles/erp-tokens.css';    /* NEW */
@import './styles/utilities.css';
@import './styles/components.css';
@import './styles/patterns.css';
```

---

## Phase 1: Design Token Swap (Biggest Visual Impact)

### 1.1 Color Palette Override
**File:** Both `erp-tokens.css`

Replace all `--app-*` color tokens:

| Token | Old Value | New Value |
|-------|-----------|-----------|
| `--app-primary` | `#9D99EA` (purple) | `#4F6BF6` (indigo) |
| `--app-secondary` | `#747A90` | `#475467` |
| `--app-accent` | `#E1DD8B` | `#F97316` (orange) |
| `--app-success` | `#198754` | `#22C55E` |
| `--app-danger` | `#dc3545` | `#EF4444` |
| `--app-warning` | `#ffc107` | `#F59E0B` |
| `--app-info` | `#0dcaf0` | `#3B82F6` |

Add full shade scales (50-900) for primary, plus 50/600 shades for each semantic color.

Add 12-step gray scale: `--app-gray-25` (#FCFCFD) through `--app-gray-900` (#101828).

Add new sidebar tokens: `--app-sidebar-bg: #0F1629`, `--app-sidebar-hover: #1A2342`, `--app-sidebar-active: #252F4A`, `--app-sidebar-text: #94A3C4`.

### 1.2 Typography Tokens
**File:** Both `erp-tokens.css`

```css
--app-font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--app-font-family-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### 1.3 Shadow Tokens
**File:** Both `erp-tokens.css`

Replace shadows to use `rgba(16,24,40,...)` instead of `rgba(0,0,0,...)` — 5-level scale matching ERP spec.

### 1.4 Bootstrap Variable Sync
**File:** Both `styles.css`

Update `--bs-*-rgb` values to match new palette so Bootstrap-dependent code picks up new colors.

### 1.5 Body + Page Background
**File:** Both `styles.css`

- `body` font-family → `var(--app-font-family)`
- `body` background → `#F5F6FA` (ERP page bg)
- RTL font fallback → `'Inter', "Segoe UI", Tahoma, "Noto Sans Arabic", sans-serif`

### 1.6 Monospace Utility
**File:** Both `utilities.css`

Add `.app-font-mono { font-family: var(--app-font-family-mono) !important; }`

**After Phase 1:** The entire UI shifts to indigo palette, Inter font, new grays, and new shadows. All components using `--app-*` tokens update automatically.

---

## Phase 2: Sidebar + Topbar Restyling

### 2.1 Admin Sidebar
**File:** `time-attendance-frontend/src/app/layout/sidenav/sidenav.component.css`

- Background: `var(--app-sidebar-bg)` (#0F1629 deep navy)
- Nav link color: `var(--app-sidebar-text)` (#94A3C4)
- Hover: `var(--app-sidebar-hover)` (#1A2342) background
- Active: `var(--app-sidebar-active)` (#252F4A) bg + white text + primary left border
- Section title labels: uppercase, 11px, `#4B5A7A` color, 1.2px letter-spacing
- Submenu: `rgba(0,0,0,0.15)` background (slightly darker)
- Update all RTL rules to use new tokens

### 2.2 Self-Service Sidebar
**File:** `time-attendance-selfservice-frontend/src/app/layout/sidenav/sidenav.component.css`

Same changes as admin sidebar.

### 2.3 Topbar Updates
**Files:** Both `topbar.component.css`

- Replace `border-bottom` with `box-shadow: var(--app-shadow-xs)` for subtler separation
- Button hover: use `var(--app-gray-100)` background
- User avatar: gradient from `var(--app-primary-400)` to `var(--app-primary-600)`

---

## Phase 3: StatusBadge + Button Restyling

### 3.1 StatusBadge → ERP Pill Badges with Dot Indicators
**Files:**
- `time-attendance-frontend/src/app/shared/components/status-badge/status-badge.component.ts`
- `time-attendance-selfservice-frontend/src/app/shared/components/status-badge/status-badge.component.ts`

Changes:
- Add `<span class="erp-badge-dot">` before label in template
- Replace Bootstrap `bg-*` classes with custom ERP classes
- New styles: pill shape (border-radius: 16px), semantic-50 background, semantic-600 text, 6px colored dot

```css
.erp-badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 16px; font-size: 12px; font-weight: 500; }
.erp-badge-dot { width: 6px; height: 6px; border-radius: 50%; }
.erp-badge-success { background: var(--app-success-50); color: var(--app-success-600); }
.erp-badge-success .erp-badge-dot { background: var(--app-success); }
/* ... danger, warning, info, primary, secondary, accent variants */
```

### 3.2 Button Style Overrides
**Files:** Both `components.css`

Override Bootstrap button classes globally (no template changes needed):
- `.btn-primary` → indigo bg with subtle shadow
- `.btn-outline-secondary` → white bg, gray-300 border, gray-700 text
- `.btn:hover` → darker variant, slight lift
- Update padding to ERP spec: sm (6px 12px), default (10px 18px), lg (12px 24px)

---

## Phase 4: DataTable + Pagination Restyling

### 4.1 DataTable Component
**File:** Both `data-table.component.ts` (inline styles array)

Replace all hardcoded hex colors with `--app-*` tokens:
- `#2196f3` → `var(--app-primary)` (selected rows, active sort)
- `#e3f2fd` → `var(--app-primary-50)` (row hover/selection bg)
- `#f8f9fa` → `var(--app-gray-50)` (header bg)
- `#dee2e6` → `var(--app-gray-200)` (borders)

Style updates to match ERP data grid:
- Container: `border: 1px solid var(--app-gray-200)`, `border-radius: 12px`, `overflow: hidden`
- Headers: `font-size: 12px`, `text-transform: uppercase`, `letter-spacing: 0.5px`, `background: var(--app-gray-50)`, `color: var(--app-gray-600)`
- Row hover: `var(--app-primary-50)` background
- Checkboxes: `accent-color: var(--app-primary)`
- Action buttons: bordered icon buttons (not colored)

### 4.2 Pagination Component
**File:** Both `pagination.component.ts` (inline styles)

Replace `#007bff` → `var(--app-primary)`, `#dee2e6` → `var(--app-gray-300)`.
Active page: `background: var(--app-primary)`, white text.
Match ERP pattern: "Showing X of Y" left, page buttons right.

---

## Phase 5: Form Design Migration (Highest Risk)

### 5.1 CSS-Only Adaptation of Floating Labels
**Files:** Both `components.css` (replace `MODERN FORM STYLES` section)

**Strategy:** Force `.form-floating` labels to ALWAYS stay in the "above" position with full-bordered inputs — achieving the ERP label-above-input look WITHOUT changing any HTML templates.

Key CSS changes:
- Input: `border: 1px solid var(--app-gray-300)` (full border, not bottom-only)
- Input border-radius: `6px`
- Focus: `border-color: var(--app-primary)` + `box-shadow: 0 0 0 3px rgba(79,107,246,0.1)`
- Invalid: `border-color: var(--app-danger)` + red ring
- Label: `position: absolute; top: 0; font-size: 12px; font-weight: 500; color: var(--app-gray-600)` — always above, no float animation
- Label on focus: `color: var(--app-primary)`
- Remove underline `::after` pseudo-element
- Section cards: clean white bg with `1px solid var(--app-gray-200)` border, icon + title + separator line

### 5.2 SearchableSelect Component
**Files:** Both `searchable-select.component.css`

- Input border: `var(--app-gray-300)`, focus: primary + ring
- Dropdown: clean white bg, hover: `var(--app-primary-50)`
- Border-radius: `var(--app-border-radius-sm)` (6px)

### 5.3 RTL Form Overrides
**Files:** Both `styles.css` (RTL section)

Simplify floating-label RTL transforms (labels are now static, no transform-origin needed). Keep text-align: right, padding mirrors, section border-right.

---

## Phase 6: Detail/View Page Restyling

### 6.1 Modern View CSS
**Files:** Both `components.css` (view patterns section) + Both `erp-tokens.css`

Update view tokens:
- `--app-view-header-bg` → gradient from new primary to primary-700
- `--app-view-accent` → `var(--app-primary)`
- Card borders: `1px solid var(--app-gray-200)` with 3px primary left accent

### 6.2 DefinitionList Component
**Files:** Both `definition-list.component.css`

- Label color: `var(--app-gray-500)` (lighter per ERP)
- Currency/code values: `font-family: var(--app-font-family-mono)`

### 6.3 PageHeader Enhancement (Additive)
**Files:** Both `page-header.component.ts`

Optional new inputs: `avatarInitials`, `referenceCode`, `entityType`, `statusBadge` — for detail page headers with avatar + metadata. Won't break existing usage.

---

## Phase 7: Modal + Toast Restyling

### 7.1 Modal Wrapper
**Files:** Both `modal-wrapper.component.css`

- Header: `padding: 20px 24px`, bottom border `var(--app-gray-200)`
- Body: `padding: 24px`
- Footer: `padding: 16px 24px`, top border
- Content: `border-radius: var(--app-border-radius-lg)`, `box-shadow: var(--app-shadow-xl)`

### 7.2 Toast/Notification Styles
**Files:** Both notification component TS files

ERP toast pattern:
- Semantic-50 background + semantic-200 border
- Icon + title + message layout
- Max-width: 400px, border-radius: 8px, shadow-lg

---

## Phase 8: Dashboard + Card Components

### 8.1 Stats Cards
**Files:** Both `patterns.css`

Update `.app-metric-card`, `.app-stats-card`: ERP shadow, border-radius, icon container with semantic-50 background.

### 8.2 General Cards
**Files:** Both `components.css`

Adjust `.app-card` border from `--app-gray-300` to `--app-gray-200` for lighter ERP aesthetic.

---

## Phase 9: Polish + Hardcoded Color Audit

### 9.1 Grep and Replace Hardcoded Hex Colors
Across all component `.css` and inline `styles` arrays, replace:
- `#2196f3`, `#007bff` → `var(--app-primary)`
- `#e3f2fd` → `var(--app-primary-50)`
- `#dee2e6` → `var(--app-gray-200)`
- `#6c757d` → `var(--app-gray-500)`
- `#495057` → `var(--app-gray-700)`
- `#f8f9fa` → `var(--app-gray-50)`

### 9.2 JetBrains Mono Application
Update `.app-employee-id`, currency formatters, reference code displays to use `var(--app-font-family-mono)`.

### 9.3 RTL Full Validation
Test all phases in Arabic RTL mode. Key areas: sidebar border-right, form labels, table alignment, modal positioning.

### 9.4 Responsive/Mobile Validation
Verify DataTable mobile card view, sidebar collapse, form stacking all work with new styles.

---

## Phase Summary

| Phase | Description | Risk | Effort |
|-------|-------------|------|--------|
| 0 | Infrastructure (fonts, erp-tokens file, imports) | None | 1 day |
| 1 | Token swap (colors, shadows, typography, body) | Low-Med | 2-3 days |
| 2 | Sidebar + Topbar | Low | 2-3 days |
| 3 | StatusBadge + Buttons | Medium | 2-3 days |
| 4 | DataTable + Pagination | Med-High | 3-4 days |
| 5 | Form design migration (CSS-only) | **High** | 5-8 days |
| 6 | Detail/View pages + Cards | Medium | 2-3 days |
| 7 | Modals + Toasts | Low | 1-2 days |
| 8 | Dashboard/Stats components | Low-Med | 2-3 days |
| 9 | Polish, audit, RTL, responsive | Medium | 3-5 days |

**Total estimated: 22-36 days**

---

## Verification Plan

After each phase:
1. `cd time-attendance-frontend && npx ng build` — verify no compilation errors
2. `cd time-attendance-selfservice-frontend && npx ng build` — verify no compilation errors
3. Run both apps and visually inspect:
   - Admin: `http://localhost:4200` — check list pages, form pages, view pages, dashboard
   - Self-Service: `http://localhost:4201` — check employee dashboard, request forms, attendance
4. Test in Arabic/RTL mode (toggle language)
5. Test responsive at 768px and 576px breakpoints
6. Verify no console errors
