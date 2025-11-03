# Backend Technical Documentation - Master Index

**Time Attendance System**
**Version**: 1.0
**Date**: November 3, 2025
**Framework**: .NET 9.0 (C# 13)
**Architecture**: Clean Architecture + CQRS + DDD

---

## 📚 Documentation Overview

This comprehensive backend documentation covers the entire .NET backend architecture, from domain entities to RESTful API endpoints. The documentation is organized by architectural layers, following Clean Architecture principles.

### Total Coverage
- **4 Major Layers Documented**: Domain, Application, Infrastructure, API
- **3,400+ Lines of Documentation**
- **47 Entities Detailed**
- **20+ Feature Modules Explained**
- **24 API Controllers Documented**
- **150+ Permissions Catalogued**

---

## 🗂️ Documentation Structure

### Layer 1: Domain Layer
**File**: [02-DOMAIN-LAYER.md](./02-DOMAIN-LAYER.md)
**Lines**: ~800
**Focus**: Core business entities, aggregates, and domain logic

**Contents**:
- 15 Aggregate Roots
- 47 Total Domain Entities
- Entity Relationships & Diagrams
- Business Logic Methods (200+)
- Validation Patterns
- Domain Events
- Value Objects

**Key Entities**: User, Employee, Branch, Shift, AttendanceRecord, LeaveRequest, VacationType, Overtime, PublicHoliday, Department, Position, Payroll, Device, Notification, AuditLog

---

### Layer 2: Application Layer
**File**: [03-APPLICATION-LAYER.md](./03-APPLICATION-LAYER.md)
**Lines**: ~1,200
**Focus**: CQRS implementation with MediatR

**Contents**:
- CQRS Pattern Architecture
- 20+ Feature Modules
- Command & Query Handlers
- FluentValidation Validators
- Result Pattern Implementation
- DTO Projection Strategies
- Multi-Tenant Security
- Business Rule Validation

**Key Features**: Authentication, Employees, Attendance, Leave Management, Shifts, Overtime, Payroll, Users, Roles, Permissions, Departments, Positions, Branches, Devices, Reports

---

### Layer 3: Infrastructure Layer
**File**: [04-INFRASTRUCTURE-LAYER.md](./04-INFRASTRUCTURE-LAYER.md)
**Lines**: ~1,400
**Focus**: Data persistence and infrastructure services

**Contents**:
- Entity Framework Core 9.0 Configuration
- 47 Entity Type Configurations
- Service Implementations
  - JWT Token Service
  - Password Hashing Service (PBKDF2-SHA256)
  - Two-Factor Authentication Service (TOTP)
  - Email Service (SMTP)
  - Device Management Service
  - Public Holiday Service
- Custom Repository Pattern
- Background Jobs (Coravel)
- Seed Data (150+ permissions)
- Database Migrations

**Key Services**: JwtTokenService, PasswordService, TwoFactorAuthService, EmailService, DeviceService, PublicHolidayService

---

### Layer 4: API Layer
**File**: [05-API-LAYER.md](./05-API-LAYER.md)
**Lines**: ~1,000
**Focus**: RESTful API endpoints and middleware

**Contents**:
- 24 API Controllers
- Middleware Pipeline
  - Rate Limiting (100 req/60s)
  - CORS Configuration
  - Localization (en/ar)
  - Authentication & Authorization
  - Security Headers
  - Error Handling
- JWT Authentication Setup
- 40+ Authorization Policies
- Swagger/OpenAPI Configuration
- Audit Logging
- Request/Response Patterns

**Key Controllers**: AuthController, EmployeesController, AttendanceController, ShiftsController, UsersController, RolesController, PermissionsController, LeaveRequestsController, OvertimeController, PayrollController

---

## 🏗️ Architecture Overview

### Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│           API Layer (Web)               │
│  Controllers, Middleware, Auth          │
│  Port: 5099                             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Application Layer (CQRS)          │
│  Commands, Queries, Handlers            │
│  Validators, DTOs, Mappers              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      Infrastructure Layer (Data)        │
│  EF Core, Services, Repositories        │
│  PostgreSQL, Background Jobs            │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│        Domain Layer (Core)              │
│  Entities, Aggregates, Business Logic   │
│  Value Objects, Domain Events           │
└─────────────────────────────────────────┘
```

### Key Architectural Patterns

1. **Clean Architecture**
   - Dependency Inversion Principle
   - Separation of Concerns
   - Independent of Frameworks
   - Testable Business Logic

2. **CQRS (Command Query Responsibility Segregation)**
   - Separate models for reads and writes
   - MediatR for request/response pipeline
   - Pipeline behaviors for cross-cutting concerns

3. **Domain-Driven Design (DDD)**
   - Rich domain models with behavior
   - Aggregate roots for consistency boundaries
   - Value objects for immutable concepts
   - Domain events for decoupling

4. **Result Pattern**
   - Functional error handling
   - No exception throwing for business errors
   - Explicit success/failure states

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User Login → AuthController.Login
2. Validate Credentials → PasswordService.VerifyPassword
3. Check 2FA Required → User.IsTwoFactorEnabled
4. If 2FA: Generate TOTP → TwoFactorAuthService.GenerateTwoFactorCode
5. Send Code → EmailService.SendAsync
6. Verify Code → AuthController.VerifyTwoFactorCode
7. Generate JWT → JwtTokenService.GenerateAccessToken
8. Return Tokens (Access + Refresh)
```

### Security Implementation Details

**Password Hashing**: PBKDF2-SHA256 with 10,000 iterations
**JWT Algorithm**: HMAC-SHA256
**Access Token Expiry**: 1 hour (15 minutes if not remember me)
**Refresh Token Expiry**: 7 days (1 day if not remember me)
**2FA Algorithm**: TOTP (RFC 6238) with 30-second time step
**Rate Limiting**: 100 requests per 60 seconds per client

### Authorization Model

**Policies**: 40+ fine-grained authorization policies
**Permissions**: 150+ granular permissions
**Roles**: Admin, Manager, Employee (seedable)
**Multi-Tenancy**: Branch-based data isolation

---

## 📊 Database Schema

### Core Tables (15 Aggregates)

1. **Users** - System user accounts
2. **Employees** - Company employees
3. **Branches** - Company locations
4. **Departments** - Organizational units
5. **Positions** - Job positions
6. **Shifts** - Work schedules
7. **ShiftAssignments** - Employee shift mapping
8. **AttendanceRecords** - Check-in/check-out logs
9. **LeaveRequests** - Time-off requests
10. **VacationTypes** - Leave categories
11. **OvertimeRecords** - Extra work hours
12. **PayrollRecords** - Salary calculations
13. **PublicHolidays** - Non-working days
14. **Devices** - Attendance devices
15. **Notifications** - User notifications

### Supporting Tables (32 Additional)

- EmployeeLeaveBalances
- EmployeeDocuments
- EmployeeDepartments
- UserRoles, RolePermissions
- AttendanceExceptions
- ShiftSchedules
- DeviceEmployees
- AuditLogs
- And more...

### Database Features

- **Soft Deletes**: `IsDeleted` flag for logical deletion
- **Optimistic Concurrency**: `RowVersion` for conflict detection
- **Audit Trail**: Created/Modified timestamp and user tracking
- **Multi-Tenancy**: Branch-based data isolation via `BranchId`
- **Indexing**: Strategic indexes for performance
- **Constraints**: Foreign keys, unique constraints, check constraints

---

## 🔄 CQRS Pattern Implementation

### Command Pattern
```csharp
// Command Definition
public record CreateEmployeeCommand(
    long BranchId,
    string EmployeeNumber,
    string FirstName,
    string LastName
) : IRequest<Result<long>>;

// Command Handler
public class CreateEmployeeCommandHandler : BaseHandler<CreateEmployeeCommand, Result<long>>
{
    public override async Task<Result<long>> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Validate business rules
        // 2. Check multi-tenant access
        // 3. Create entity
        // 4. Save changes
        // 5. Return result
    }
}

// Command Validator
public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
        // ... more rules
    }
}
```

### Query Pattern
```csharp
// Query Definition
public record GetEmployeeByIdQuery(long Id) : IRequest<Result<EmployeeDto>>;

// Query Handler
public class GetEmployeeByIdQueryHandler : BaseHandler<GetEmployeeByIdQuery, Result<EmployeeDto>>
{
    public override async Task<Result<EmployeeDto>> Handle(
        GetEmployeeByIdQuery request,
        CancellationToken cancellationToken)
    {
        // 1. Check multi-tenant access
        // 2. Query database with projections
        // 3. Map to DTO
        // 4. Return result
    }
}
```

### MediatR Pipeline
```
Request → ValidationBehavior → Handler → Response
           ↓ (if invalid)
           ValidationException
```

---

## 🛠️ Technology Stack

### Core Framework
- **.NET 9.0** - Latest .NET runtime
- **C# 13** - Latest language features
- **ASP.NET Core 9.0** - Web framework

### Data Access
- **Entity Framework Core 9.0** - ORM
- **Npgsql 9.0** - PostgreSQL provider
- **PostgreSQL 15+** - Database server

### Libraries & Packages
- **MediatR** - CQRS/Mediator pattern
- **FluentValidation** - Input validation
- **AutoMapper** - Object mapping
- **Coravel** - Background jobs and scheduling
- **Swashbuckle** - Swagger/OpenAPI documentation
- **Microsoft.AspNetCore.Authentication.JwtBearer** - JWT authentication
- **OtpNet** - TOTP 2FA implementation

### Development Tools
- **Swagger UI** - API testing
- **Entity Framework CLI** - Migrations
- **dotnet CLI** - Build and run

---

## 📖 Quick Navigation Guide

### For New Developers
1. Start with [Architecture Overview](#architecture-overview) (this file)
2. Read [Domain Layer](./02-DOMAIN-LAYER.md) to understand entities
3. Study [Application Layer](./03-APPLICATION-LAYER.md) for CQRS patterns
4. Review [Infrastructure Layer](./04-INFRASTRUCTURE-LAYER.md) for implementation
5. Explore [API Layer](./05-API-LAYER.md) for endpoints

### For Frontend Developers
- Start with [API Layer](./05-API-LAYER.md) for endpoint reference
- Check [Authentication Flow](#authentication-flow) for login integration
- Review [Authorization Model](#authorization-model) for permissions

### For Database Administrators
- Review [Database Schema](#database-schema)
- Check [Infrastructure Layer](./04-INFRASTRUCTURE-LAYER.md) for EF Core configuration
- See migration files in `src/Infrastructure/.../Migrations/`

### For Security Auditors
- Read [Security Architecture](#security-architecture)
- Review [Infrastructure Layer](./04-INFRASTRUCTURE-LAYER.md) security services
- Check [API Layer](./05-API-LAYER.md) middleware pipeline

---

## 🚀 Getting Started

### Prerequisites
- .NET 9.0 SDK
- PostgreSQL 15+
- Visual Studio 2022 / VS Code / Rider

### Running the Backend

1. **Configure Database**
   ```bash
   # Update connection string in appsettings.json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=TimeAttendance;Username=postgres;Password=yourpassword"
   }
   ```

2. **Apply Migrations**
   ```bash
   cd src/Api/TimeAttendanceSystem.Api
   dotnet ef database update --context TimeAttendanceDbContext
   ```

3. **Run Application**
   ```bash
   dotnet run
   # Backend runs on http://localhost:5099
   ```

4. **Access Swagger**
   ```
   http://localhost:5099/swagger
   ```

### Default Credentials (Seeded)
- **Admin User**: admin / Admin@123
- **Manager User**: manager / Manager@123
- **Employee User**: employee / Employee@123

---

## 📝 Development Workflow

### Adding a New Feature

1. **Define Domain Entity** (if needed)
   - Create entity in `Domain/` layer
   - Define business logic methods
   - Add validation rules

2. **Create CQRS Commands/Queries**
   - Define command/query record in `Application/`
   - Implement handler with business logic
   - Create FluentValidation validator
   - Define DTOs for response

3. **Configure Infrastructure**
   - Add EF Core entity configuration
   - Create migration
   - Implement any required services

4. **Create API Endpoint**
   - Add controller action in `Api/`
   - Apply authorization policies
   - Document with XML comments
   - Test with Swagger

### Example: Adding a New Entity

```csharp
// 1. Domain Entity
public class Asset : BaseEntity
{
    public string AssetNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public long EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
}

// 2. Application Command
public record CreateAssetCommand(
    string AssetNumber,
    string Name,
    long EmployeeId
) : IRequest<Result<long>>;

// 3. Infrastructure Configuration
public class AssetConfiguration : IEntityTypeConfiguration<Asset>
{
    public void Configure(EntityTypeBuilder<Asset> builder)
    {
        builder.ToTable("Assets");
        builder.HasKey(x => x.Id);
        // ... more configuration
    }
}

// 4. API Controller
[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    [HttpPost]
    [Authorize(Policy = "Asset.Create")]
    public async Task<IActionResult> Create([FromBody] CreateAssetCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- Domain logic tests (business rules)
- Validator tests (FluentValidation rules)
- Service tests (infrastructure services)

### Integration Tests
- Handler tests (CQRS commands/queries)
- Repository tests (database operations)
- API endpoint tests (controller actions)

### Test Projects
- `TimeAttendanceSystem.Domain.Tests`
- `TimeAttendanceSystem.Application.Tests`
- `TimeAttendanceSystem.Infrastructure.Tests`
- `TimeAttendanceSystem.Api.Tests`

---

## 📐 Code Conventions

### Naming Conventions
- **Commands**: `{Action}{Entity}Command` (e.g., `CreateEmployeeCommand`)
- **Queries**: `Get{Entity}By{Criteria}Query` (e.g., `GetEmployeeByIdQuery`)
- **Handlers**: `{CommandOrQuery}Handler`
- **Validators**: `{CommandOrQuery}Validator`
- **DTOs**: `{Entity}Dto`
- **Services**: `I{Service}` (interface), `{Service}` (implementation)

### File Organization
```
Feature/
├── Commands/
│   ├── CreateEntity/
│   │   ├── CreateEntityCommand.cs
│   │   ├── CreateEntityCommandHandler.cs
│   │   └── CreateEntityCommandValidator.cs
│   └── UpdateEntity/
│       ├── UpdateEntityCommand.cs
│       ├── UpdateEntityCommandHandler.cs
│       └── UpdateEntityCommandValidator.cs
├── Queries/
│   ├── GetEntityById/
│   │   ├── GetEntityByIdQuery.cs
│   │   ├── GetEntityByIdQueryHandler.cs
│   │   └── EntityDto.cs
│   └── GetEntities/
│       ├── GetEntitiesQuery.cs
│       ├── GetEntitiesQueryHandler.cs
│       └── EntityListDto.cs
```

---

## 🔍 Troubleshooting

### Common Issues

**Issue**: Database connection fails
**Solution**: Check PostgreSQL is running and connection string is correct

**Issue**: Migrations fail to apply
**Solution**: Drop database and recreate from migrations (development only)

**Issue**: JWT token validation fails
**Solution**: Ensure JWT secret key matches between token generation and validation

**Issue**: 2FA codes don't work
**Solution**: Check server time synchronization (TOTP requires accurate time)

**Issue**: Rate limiting triggers too often
**Solution**: Adjust `MaxRequests` and `TimeWindowSeconds` in middleware

---

## 📚 Additional Resources

### External Documentation
- [.NET 9.0 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [MediatR Documentation](https://github.com/jbogard/MediatR/wiki)
- [FluentValidation Documentation](https://docs.fluentvalidation.net/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Project Documentation
- `API_DOCUMENTATION.md` - Detailed API endpoint reference
- `PROJECT_ARCHITECTURE.md` - High-level system architecture
- `CLAUDE.md` - Development guidelines and standards
- `SHARED_COMPONENTS_QUICK_REFERENCE.md` - Frontend component guide

---

## 📄 Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 3, 2025 | Claude Code | Initial comprehensive documentation |

---

## 📧 Contact & Support

For questions or clarifications about this documentation:
- Review the specific layer documentation
- Check code comments in the source files
- Consult the development team

---

**Navigation**:
- **Current**: Master Index (You are here)
- **Next**: [Domain Layer Documentation →](./02-DOMAIN-LAYER.md)

---

*This documentation is auto-generated and maintained as part of the Time Attendance System project. Last updated: November 3, 2025*
