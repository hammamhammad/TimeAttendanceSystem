# Time Attendance System

**Version**: 1.0
**Status**: Active Development

## 📖 Overview

The **Time Attendance System** is a comprehensive enterprise solution for managing employee attendance, shifts, leave requests, and payroll. It features a modern, high-performance architecture split into a robust .NET 9 backend and a reactive Angular 17+ frontend.

## 🏗️ Technical Architecture

### Backend
- **Framework**: .NET 9.0 (C# 13)
- **Architecture**: Clean Architecture + CQRS + DDD
- **Database**: PostgreSQL 15+ with Entity Framework Core 9.0
- **Key Tech**: MediatR, FluentValidation, Coravel, SignalR
- **Documentation**: [Backend Technical Documentation](./BACKEND_TECHNICAL_DOCUMENTATION.md)

### Frontend
- **Framework**: Angular 17+
- **Architecture**: Standalone Components + Signals + Modern Control Flow
- **UI Library**: Bootstrap 5.3 + FontAwesome 6
- **Key Tech**: RxJS, ngx-translate (i18n)
- **Documentation**: [Frontend Technical Documentation](./FRONTEND_TECHNICAL_DOCUMENTATION.md)

## 📚 Documentation Hub

The project maintains extensive technical documentation. Please refer to the following guides:

### Core Documentation
- **[Development Guidelines (CLAUDE.md)](./CLAUDE.md)** - **START HERE**. Contains crucial development rules, coding standards, and workflows.
- [Backend Master Index](./docs/backend/00-INDEX.md) - Complete navigation for backend architecture.
- [Frontend Core Architecture](./docs/frontend/02-CORE-ARCHITECTURE.md) - Deep dive into frontend patterns.

### Specific Guides
- [Backend Quick Reference](./docs/backend/01-QUICK-REFERENCE.md) - Cheat sheet for backend developers.
- [Shared Components Catalog](./SHARED_COMPONENTS_QUICK_REFERENCE.md) - Frontend component library usage.
- [System Enhancement Plan](./SYSTEM_ENHANCEMENT_PLAN.md) - Roadmap and future improvements.
- [Deployment Guide](./UBUNTU_DEPLOYMENT_GUIDE.md) - Production deployment instructions.

## 🚀 Quick Start

### Prerequisites
- .NET 9.0 SDK
- Node.js 18+
- PostgreSQL 15+

### Running the Backend
```bash
cd src/Api/TimeAttendanceSystem.Api
dotnet run
# Server starts on http://localhost:5099
# Swagger UI: http://localhost:5099/swagger
```

### Running the Frontend
```bash
cd time-attendance-frontend
npm install
ng serve
# Application starts on http://localhost:4200
```

## 🔐 Default Credentials (Dev)

| Role | Username | Password |
|------|----------|----------|
| **Admin** | admin | Admin@123 |
| **Manager** | manager | Manager@123 |
| **Employee** | employee | Employee@123 |

## 🛠️ Development Workflow

Please strictly follow the guidelines in **[CLAUDE.md](./CLAUDE.md)** for all development activities.

- **Backend**: Always run on port `5099`. Use Coravel for background jobs.
- **Frontend**: Always run on port `4200`. Use `DataTableComponent` and shared components strictly.
- **Process**: Plan -> Confirm -> Implement -> Verify.

---

*Generated for Time Attendance System*
