# Time Attendance System - Backend Technical Documentation

**Version**: 1.0
**Date**: November 3, 2025
**Framework**: .NET 9.0 (C# 13)
**Architecture**: Clean Architecture + CQRS + DDD

---

## 📖 Welcome to the Backend Documentation

This is the master entry point for the Time Attendance System backend documentation. The documentation is organized into comprehensive guides covering all aspects of the .NET backend architecture.

---

## 📚 Documentation Structure

### Quick Access

| Document | Description | Lines | Focus |
|----------|-------------|-------|-------|
| **[Master Index](./docs/backend/00-INDEX.md)** | Complete navigation guide | ~600 | Architecture overview, navigation |
| **[Quick Reference](./docs/backend/01-QUICK-REFERENCE.md)** | Developer cheat sheet | ~800 | Common patterns, commands, snippets |
| **[Domain Layer](./docs/backend/02-DOMAIN-LAYER.md)** | Core business entities | ~800 | Entities, aggregates, business logic |
| **[Application Layer](./docs/backend/03-APPLICATION-LAYER.md)** | CQRS implementation | ~1,200 | Commands, queries, handlers |
| **[Infrastructure Layer](./docs/backend/04-INFRASTRUCTURE-LAYER.md)** | Persistence & services | ~1,400 | EF Core, services, repositories |
| **[API Layer](./docs/backend/05-API-LAYER.md)** | RESTful endpoints | ~1,000 | Controllers, middleware, auth |

**Total Documentation**: 5,800+ lines covering 4 architectural layers

---

## 🚀 Quick Start

### For New Developers
1. Start with **[Master Index](./docs/backend/00-INDEX.md)** for architecture overview
2. Read **[Domain Layer](./docs/backend/02-DOMAIN-LAYER.md)** to understand entities
3. Study **[Application Layer](./docs/backend/03-APPLICATION-LAYER.md)** for CQRS patterns
4. Keep **[Quick Reference](./docs/backend/01-QUICK-REFERENCE.md)** handy for daily work

### For API Integration
- Jump to **[API Layer](./docs/backend/05-API-LAYER.md)** for endpoint reference
- Review authentication flow in **[Master Index](./docs/backend/00-INDEX.md#security-architecture)**

### For Database Work
- Check **[Infrastructure Layer](./docs/backend/04-INFRASTRUCTURE-LAYER.md)** for EF Core setup
- Review schema in **[Master Index](./docs/backend/00-INDEX.md#database-schema)**

---

## 🏗️ Architecture Overview

### Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│           API Layer (Web)               │
│  Controllers, Middleware, Auth          │
│  📄 Docs: 05-API-LAYER.md               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Application Layer (CQRS)          │
│  Commands, Queries, Handlers            │
│  📄 Docs: 03-APPLICATION-LAYER.md       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Infrastructure Layer (Data)        │
│  EF Core, Services, Repositories        │
│  📄 Docs: 04-INFRASTRUCTURE-LAYER.md    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Domain Layer (Core)              │
│  Entities, Aggregates, Business Logic   │
│  📄 Docs: 02-DOMAIN-LAYER.md            │
└─────────────────────────────────────────┘
```

### Key Technologies

- **.NET 9.0** - Latest runtime with C# 13
- **PostgreSQL 15+** - Primary database
- **Entity Framework Core 9.0** - ORM
- **MediatR** - CQRS/Mediator pattern
- **FluentValidation** - Input validation
- **JWT** - Authentication tokens
- **Coravel** - Background jobs
- **Swagger/OpenAPI** - API documentation

---

## 📊 System Capabilities

### Core Features
- **Employee Management** - Full CRUD with departments, positions, branches
- **Attendance Tracking** - Check-in/out with device integration
- **Leave Management** - Request, approve, track vacation/sick leave
- **Shift Scheduling** - Flexible shifts with assignments
- **Overtime Tracking** - Record and approve extra hours
- **Payroll Processing** - Automated salary calculations
- **Multi-Tenancy** - Branch-based data isolation
- **Role-Based Access** - 150+ granular permissions
- **Two-Factor Authentication** - TOTP-based 2FA
- **Audit Logging** - Complete change tracking
- **Localization** - English/Arabic support
- **Background Jobs** - Automated tasks with Coravel

### Security Features
- **Password Hashing**: PBKDF2-SHA256 (10,000 iterations)
- **JWT Tokens**: HMAC-SHA256 signed
- **2FA**: TOTP (RFC 6238)
- **Rate Limiting**: 100 req/60s per client
- **Multi-Tenant Security**: Branch-based isolation
- **Permission System**: 150+ granular permissions
- **Audit Trail**: Complete change history

---

## 🎯 Documentation Coverage

### Layer 1: Domain Layer (02-DOMAIN-LAYER.md)
✅ 15 Aggregate Roots documented
✅ 47 Total Entities documented
✅ 200+ Business Logic Methods cataloged
✅ Entity Relationships diagrammed
✅ Validation Patterns explained
✅ Domain Events covered

**Key Aggregates**: User, Employee, Branch, Shift, AttendanceRecord, LeaveRequest, VacationType, Overtime, PublicHoliday, Department, Position, Payroll, Device, Notification, AuditLog

### Layer 2: Application Layer (03-APPLICATION-LAYER.md)
✅ 20+ Feature Modules documented
✅ CQRS Pattern explained
✅ Command/Query Handlers detailed
✅ FluentValidation patterns shown
✅ Result Pattern implementation
✅ Multi-Tenant security patterns
✅ DTO projection strategies

**Key Features**: Authentication, Employees, Attendance, Leave, Shifts, Overtime, Payroll, Users, Roles, Permissions, Departments, Positions, Branches, Devices, Reports

### Layer 3: Infrastructure Layer (04-INFRASTRUCTURE-LAYER.md)
✅ 47 Entity Configurations documented
✅ EF Core setup explained
✅ 6 Core Services detailed
✅ Repository pattern covered
✅ Background jobs documented
✅ Seed data (150+ permissions) cataloged
✅ Security services explained

**Key Services**: JwtTokenService, PasswordService, TwoFactorAuthService, EmailService, DeviceService, PublicHolidayService

### Layer 4: API Layer (05-API-LAYER.md)
✅ 24 Controllers documented
✅ All endpoints cataloged
✅ Middleware pipeline explained
✅ Rate limiting detailed
✅ Authentication flow documented
✅ 40+ Authorization policies listed
✅ Swagger/OpenAPI setup covered

**Key Controllers**: Auth, Employees, Attendance, Shifts, Users, Roles, Permissions, Leave, Overtime, Payroll, Departments, Positions, Branches, Devices, Reports

---

## 🔍 Common Use Cases

### 1. Adding a New Feature
```
Step 1: Read Quick Reference → Common Patterns section
Step 2: Define Domain Entity (if needed) → Domain Layer docs
Step 3: Create CQRS Commands/Queries → Application Layer docs
Step 4: Configure EF Core (if needed) → Infrastructure Layer docs
Step 5: Create API Endpoint → API Layer docs
```

### 2. Understanding Existing Code
```
Step 1: Start with Master Index for overview
Step 2: Read layer-specific documentation
Step 3: Reference Quick Reference for patterns
Step 4: Check code examples in docs
```

### 3. Troubleshooting Issues
```
Step 1: Check Quick Reference → Debugging Tips
Step 2: Review Infrastructure Layer → Services section
Step 3: Check Master Index → Troubleshooting section
Step 4: Enable detailed logging (see Quick Reference)
```

### 4. API Integration
```
Step 1: Read API Layer docs for endpoints
Step 2: Check Master Index → Authentication Flow
Step 3: Review Quick Reference → Authentication section
Step 4: Test with Swagger UI (http://localhost:5099/swagger)
```

---

## 📝 Code Examples

### Quick Pattern Examples

**Creating a Command**:
```csharp
public record CreateEmployeeCommand(
    long BranchId,
    string EmployeeNumber,
    string FirstName,
    string LastName
) : IRequest<Result<long>>;
```

**Creating a Query**:
```csharp
public record GetEmployeeByIdQuery(long Id) : IRequest<Result<EmployeeDto>>;
```

**Creating a Controller Endpoint**:
```csharp
[HttpGet("{id}")]
[Authorize(Policy = "Employee.View")]
public async Task<IActionResult> GetById(long id)
{
    var result = await _mediator.Send(new GetEmployeeByIdQuery(id));
    return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
}
```

For complete examples, see **[Quick Reference](./docs/backend/01-QUICK-REFERENCE.md)**.

---

## 🛠️ Development Commands

### Running the Backend
```bash
cd src/Api/TimeAttendanceSystem.Api
dotnet run  # Runs on http://localhost:5099
```

### Database Operations
```bash
# Create migration
dotnet ef migrations add MigrationName --startup-project "../../Api/TimeAttendanceSystem.Api"

# Apply migrations
dotnet ef database update --startup-project "../../Api/TimeAttendanceSystem.Api"

# Drop database (dev only)
dotnet ef database drop --startup-project "../../Api/TimeAttendanceSystem.Api" --force
```

For more commands, see **[Quick Reference](./docs/backend/01-QUICK-REFERENCE.md)**.

---

## 🔐 Default Credentials (Development)

| Username | Password | Role | Access |
|----------|----------|------|--------|
| admin | Admin@123 | Admin | Full access |
| manager | Manager@123 | Manager | Most features |
| employee | Employee@123 | Employee | Basic features |

**Swagger UI**: http://localhost:5099/swagger

---

## 📖 How to Use This Documentation

### 1. Navigation Strategy

**Top-Down Approach** (Recommended for new developers):
```
Start → Master Index (00-INDEX.md)
     → Domain Layer (02-DOMAIN-LAYER.md)
     → Application Layer (03-APPLICATION-LAYER.md)
     → Infrastructure Layer (04-INFRASTRUCTURE-LAYER.md)
     → API Layer (05-API-LAYER.md)
```

**Bottom-Up Approach** (For specific tasks):
```
Start → Quick Reference (01-QUICK-REFERENCE.md)
     → Find relevant pattern
     → Reference layer-specific docs as needed
```

**API-First Approach** (For frontend developers):
```
Start → API Layer (05-API-LAYER.md)
     → Master Index for auth flow
     → Quick Reference for examples
```

### 2. Document Cross-References

All documents are cross-referenced:
- Each layer doc links to related layers
- Master Index links to all docs
- Quick Reference provides practical examples
- Code examples reference actual source files

### 3. Search Tips

**Finding Specific Topics**:
- Use your IDE's search across `docs/backend/` folder
- Search for entity names (e.g., "Employee", "Shift")
- Search for pattern names (e.g., "CQRS", "Repository")
- Search for code snippets (e.g., "IRequest", "BaseHandler")

---

## 🎓 Learning Path

### Week 1: Foundations
- [ ] Read Master Index for architecture overview
- [ ] Study Domain Layer documentation
- [ ] Understand core entities and relationships
- [ ] Review domain business logic

### Week 2: Application Logic
- [ ] Study CQRS pattern in Application Layer docs
- [ ] Understand command/query separation
- [ ] Learn handler patterns
- [ ] Practice with validators

### Week 3: Infrastructure
- [ ] Study Infrastructure Layer documentation
- [ ] Understand EF Core configuration
- [ ] Learn service implementations
- [ ] Explore background jobs

### Week 4: API & Integration
- [ ] Study API Layer documentation
- [ ] Understand middleware pipeline
- [ ] Learn authentication/authorization
- [ ] Practice with Swagger UI

---

## 📚 Additional Resources

### Related Documentation
- **API_DOCUMENTATION.md** - Legacy API reference
- **PROJECT_ARCHITECTURE.md** - High-level system design
- **CLAUDE.md** - Development guidelines
- **Frontend Docs** - Angular application documentation

### External References
- [.NET 9.0 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [MediatR Documentation](https://github.com/jbogard/MediatR/wiki)
- [FluentValidation](https://docs.fluentvalidation.net/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)

---

## 🔗 Quick Links

### Documentation
- [Master Index (Navigation Hub)](./docs/backend/00-INDEX.md)
- [Quick Reference (Cheat Sheet)](./docs/backend/01-QUICK-REFERENCE.md)
- [Domain Layer (Entities)](./docs/backend/02-DOMAIN-LAYER.md)
- [Application Layer (CQRS)](./docs/backend/03-APPLICATION-LAYER.md)
- [Infrastructure Layer (Data)](./docs/backend/04-INFRASTRUCTURE-LAYER.md)
- [API Layer (Endpoints)](./docs/backend/05-API-LAYER.md)

### Development
- **Swagger UI**: http://localhost:5099/swagger
- **API Base URL**: http://localhost:5099/api
- **Health Check**: http://localhost:5099/health

### Source Code
- **Domain**: `src/Domain/TimeAttendanceSystem.Domain/`
- **Application**: `src/Application/TimeAttendanceSystem.Application/`
- **Infrastructure**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/`
- **API**: `src/Api/TimeAttendanceSystem.Api/`

---

## 📞 Support

For questions about the documentation:
1. Check the relevant layer documentation
2. Review Quick Reference for examples
3. Search code comments in source files
4. Consult the development team

---

## 📄 Document Maintenance

### Version History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 3, 2025 | Initial comprehensive documentation release |

### Update Schedule
- Documentation is updated with major feature additions
- Code examples are validated against current codebase
- New patterns are documented as they're introduced

---

## 🎯 What's Documented

### Complete Coverage
✅ All 47 domain entities
✅ All 20+ feature modules
✅ All 24 API controllers
✅ All 6 infrastructure services
✅ Complete CQRS implementation
✅ Complete security architecture
✅ Database schema and migrations
✅ Background job system
✅ Multi-tenancy implementation
✅ Authentication & authorization flows

### Code Examples
✅ Command pattern examples
✅ Query pattern examples
✅ Handler implementations
✅ Validator patterns
✅ Controller endpoints
✅ Entity configurations
✅ Service implementations
✅ Common query patterns

---

## 🚀 Next Steps

**Choose your path**:

1. **New to the project?** → Start with [Master Index](./docs/backend/00-INDEX.md)
2. **Need quick reference?** → Go to [Quick Reference](./docs/backend/01-QUICK-REFERENCE.md)
3. **Adding a feature?** → Check [Application Layer](./docs/backend/03-APPLICATION-LAYER.md)
4. **Integrating API?** → Read [API Layer](./docs/backend/05-API-LAYER.md)
5. **Database work?** → See [Infrastructure Layer](./docs/backend/04-INFRASTRUCTURE-LAYER.md)

---

**Happy Coding!** 🎉

---

*Last Updated: November 3, 2025*
*Documentation Version: 1.0*
*Backend Framework: .NET 9.0 with Clean Architecture + CQRS + DDD*
