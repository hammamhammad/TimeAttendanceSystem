# HRMS Module Detailed Plans

Each module requires a detailed implementation plan before any code is written. Plans are created in order of the implementation sequence defined in the [Master Plan](../00-MASTER-PLAN.md).

## Plan Status

| # | Module | Plan File | Status | Phase |
|---|--------|-----------|--------|-------|
| 01-03 | **Phase 1: Employee Lifecycle + Payroll + Offboarding** | `01-03-phase1-detailed-plan.md` | **Approved** | Phase 1 |
| 04 | Recruitment & Hiring | `04-recruitment.md` | Pending | Phase 2 |
| 05 | Onboarding | `05-onboarding.md` | Pending | Phase 2 |
| 06 | Performance Management | `06-performance.md` | Pending | Phase 2 |
| 07 | Document Management | `07-documents.md` | Pending | Phase 3 |
| 08 | Employee Letters & Certificates | `08-letters.md` | Pending | Phase 3 |
| 09 | Expense Management | `09-expenses.md` | Pending | Phase 3 |
| 10 | Loans & Salary Advances | `10-loans.md` | Pending | Phase 3 |
| 11 | Training & Development | `11-training.md` | Pending | Phase 4 |
| 12 | Employee Relations | `12-employee-relations.md` | Pending | Phase 4 |
| 13 | Company Announcements | `13-announcements.md` | Pending | Phase 4 |
| 14 | Asset Management | `14-assets.md` | Pending | Phase 5 |
| 15 | Succession Planning | `15-succession-planning.md` | Pending | Phase 5 |
| 16 | Analytics & HR Dashboard | `16-analytics.md` | Pending | Phase 5 |
| 17 | Existing Module Enhancements | `17-enhancements.md` | Pending | Enhancements |

## What Each Detailed Plan Must Include

1. **Complete entity definitions** - all properties with C# data types, constraints, relationships, indexes
2. **Full API endpoint specifications** - HTTP method, route, request/response DTOs, authorization policies, validation rules
3. **Database schema** - table definitions, foreign keys, indexes, seed data
4. **Frontend component tree** - every component with its inputs/outputs, routes, guards
5. **i18n key list** - all translation keys for EN and AR
6. **Business rules** - validation logic, calculation formulas, workflow integration
7. **Step-by-step implementation order** - what to build first within the module
8. **Test scenarios** - critical test cases to verify after implementation

## Implementation Workflow

1. Create the detailed plan for the next module in sequence
2. Review and approve the plan
3. Implement backend (domain -> application -> infrastructure -> API)
4. Implement admin frontend
5. Implement self-service frontend (if applicable)
6. Implement mobile app features (if applicable)
7. Run verification checklist
8. Mark plan status as "Complete"
9. Move to next module
