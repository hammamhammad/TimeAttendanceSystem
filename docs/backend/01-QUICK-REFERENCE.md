# Backend Quick Reference Guide

**Time Attendance System - Developer Cheat Sheet**

This is a condensed quick reference for developers who need immediate access to common patterns, code snippets, and frequently used commands.

---

## 🚀 Quick Start Commands

### Running the Backend
```bash
# Navigate to API project
cd src/Api/TimeAttendanceSystem.Api

# Run the application
dotnet run
# Backend runs on http://localhost:5099

# Run with hot reload (development)
dotnet watch run
```

### Database Operations
```bash
# Create a new migration
dotnet ef migrations add MigrationName --startup-project "../../Api/TimeAttendanceSystem.Api" --context TimeAttendanceDbContext --output-dir Persistence/PostgreSql/Migrations

# Apply migrations
dotnet ef database update --startup-project "../../Api/TimeAttendanceSystem.Api" --context TimeAttendanceDbContext

# Drop database (development only)
dotnet ef database drop --startup-project "../../Api/TimeAttendanceSystem.Api" --context TimeAttendanceDbContext --force

# Generate SQL script from migrations
dotnet ef migrations script --startup-project "../../Api/TimeAttendanceSystem.Api" --context TimeAttendanceDbContext --output migration.sql
```

### Build & Test
```bash
# Build solution
dotnet build

# Build specific project
dotnet build src/Api/TimeAttendanceSystem.Api

# Run tests
dotnet test

# Clean build artifacts
dotnet clean
```

---

## 📦 Common Patterns

### 1. Creating a Command

**File**: `Application/{Feature}/Commands/{Action}{Entity}/{Action}{Entity}Command.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.{Feature}.Commands.{Action}{Entity};

public record {Action}{Entity}Command(
    // Required parameters
    string PropertyName,
    long NumericProperty
) : IRequest<Result<long>>; // Returns entity ID on success

// Example:
public record CreateEmployeeCommand(
    long BranchId,
    string EmployeeNumber,
    string FirstName,
    string LastName,
    string Email
) : IRequest<Result<long>>;
```

### 2. Creating a Command Handler

**File**: `Application/{Feature}/Commands/{Action}{Entity}/{Action}{Entity}CommandHandler.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.{Entity};

namespace TimeAttendanceSystem.Application.{Feature}.Commands.{Action}{Entity};

public class {Action}{Entity}CommandHandler : BaseHandler<{Action}{Entity}Command, Result<long>>
{
    public {Action}{Entity}CommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(
        {Action}{Entity}Command request,
        CancellationToken cancellationToken)
    {
        // 1. Validate business rules
        var existingEntity = await Context.{Entities}
            .FirstOrDefaultAsync(e => e.SomeProperty == request.PropertyName, cancellationToken);

        if (existingEntity != null)
            return Result<long>.Failure("Entity already exists");

        // 2. Check multi-tenant access (if applicable)
        if (!await HasAccessToBranch(request.BranchId, cancellationToken))
            return Result<long>.Failure("Access denied to branch");

        // 3. Create entity
        var entity = new {Entity}
        {
            PropertyName = request.PropertyName,
            BranchId = request.BranchId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.UserId
        };

        Context.{Entities}.Add(entity);

        // 4. Save changes
        await Context.SaveChangesAsync(cancellationToken);

        // 5. Return result
        return Result<long>.Success(entity.Id);
    }
}
```

### 3. Creating a Validator

**File**: `Application/{Feature}/Commands/{Action}{Entity}/{Action}{Entity}CommandValidator.cs`

```csharp
using FluentValidation;

namespace TimeAttendanceSystem.Application.{Feature}.Commands.{Action}{Entity};

public class {Action}{Entity}CommandValidator : AbstractValidator<{Action}{Entity}Command>
{
    public {Action}{Entity}CommandValidator()
    {
        // String validation
        RuleFor(x => x.PropertyName)
            .NotEmpty().WithMessage("Property is required")
            .MaximumLength(100).WithMessage("Property cannot exceed 100 characters");

        // Numeric validation
        RuleFor(x => x.NumericProperty)
            .GreaterThan(0).WithMessage("Must be greater than 0");

        // Email validation
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress().WithMessage("Invalid email format");

        // Custom validation
        RuleFor(x => x.SomeProperty)
            .Must(BeValidValue).WithMessage("Invalid value");
    }

    private bool BeValidValue(string value)
    {
        // Custom validation logic
        return !string.IsNullOrWhiteSpace(value);
    }
}
```

### 4. Creating a Query

**File**: `Application/{Feature}/Queries/Get{Entity}By{Criteria}/Get{Entity}By{Criteria}Query.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.{Feature}.Queries.Get{Entity}By{Criteria};

public record Get{Entity}By{Criteria}Query(
    long Id
) : IRequest<Result<{Entity}Dto>>;

// Example:
public record GetEmployeeByIdQuery(long Id) : IRequest<Result<EmployeeDto>>;
```

### 5. Creating a Query Handler with DTO

**File**: `Application/{Feature}/Queries/Get{Entity}By{Criteria}/Get{Entity}By{Criteria}QueryHandler.cs`

```csharp
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.{Feature}.Queries.Get{Entity}By{Criteria};

public class Get{Entity}By{Criteria}QueryHandler : BaseHandler<Get{Entity}By{Criteria}Query, Result<{Entity}Dto>>
{
    public Get{Entity}By{Criteria}QueryHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<{Entity}Dto>> Handle(
        Get{Entity}By{Criteria}Query request,
        CancellationToken cancellationToken)
    {
        // 1. Query with projection (efficient - only selects needed columns)
        var entity = await Context.{Entities}
            .Where(e => e.Id == request.Id && !e.IsDeleted)
            .Select(e => new {Entity}Dto
            {
                Id = e.Id,
                Name = e.Name,
                // ... other properties
            })
            .FirstOrDefaultAsync(cancellationToken);

        // 2. Check if found
        if (entity == null)
            return Result<{Entity}Dto>.Failure($"{Entity} not found");

        // 3. Check multi-tenant access (if applicable)
        if (!await HasAccessToBranch(entity.BranchId, cancellationToken))
            return Result<{Entity}Dto>.Failure("Access denied");

        // 4. Return result
        return Result<{Entity}Dto>.Success(entity);
    }
}
```

### 6. Creating a DTO

**File**: `Application/{Feature}/Queries/Get{Entity}By{Criteria}/{Entity}Dto.cs`

```csharp
namespace TimeAttendanceSystem.Application.{Feature}.Queries.Get{Entity}By{Criteria};

public class {Entity}Dto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }

    // Navigation properties as nested DTOs
    public BranchDto? Branch { get; set; }

    // Collections
    public List<RelatedEntityDto> RelatedEntities { get; set; } = new();
}

// Nested DTO
public class BranchDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
```

### 7. Creating an API Controller

**File**: `Api/Controllers/{Entities}Controller.cs`

```csharp
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.{Feature}.Commands.{Action}{Entity};
using TimeAttendanceSystem.Application.{Feature}.Queries.Get{Entity}By{Criteria};

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Requires authentication
public class {Entities}Controller : ControllerBase
{
    private readonly IMediator _mediator;

    public {Entities}Controller(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get {entity} by ID
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "{Entity}.View")]
    public async Task<IActionResult> GetById(long id)
    {
        var query = new Get{Entity}By{Criteria}Query(id);
        var result = await _mediator.Send(query);

        return result.IsSuccess
            ? Ok(result.Value)
            : NotFound(new { error = result.Error });
    }

    /// <summary>
    /// Create a new {entity}
    /// </summary>
    [HttpPost]
    [Authorize(Policy = "{Entity}.Create")]
    public async Task<IActionResult> Create([FromBody] {Action}{Entity}Command command)
    {
        var result = await _mediator.Send(command);

        if (result.IsSuccess)
        {
            return CreatedAtAction(
                nameof(GetById),
                new { id = result.Value },
                new { id = result.Value });
        }

        return BadRequest(new { error = result.Error });
    }

    /// <summary>
    /// Update an existing {entity}
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "{Entity}.Update")]
    public async Task<IActionResult> Update(long id, [FromBody] Update{Entity}Command command)
    {
        if (id != command.Id)
            return BadRequest(new { error = "ID mismatch" });

        var result = await _mediator.Send(command);

        return result.IsSuccess
            ? NoContent()
            : BadRequest(new { error = result.Error });
    }

    /// <summary>
    /// Delete a {entity}
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "{Entity}.Delete")]
    public async Task<IActionResult> Delete(long id)
    {
        var command = new Delete{Entity}Command(id);
        var result = await _mediator.Send(command);

        return result.IsSuccess
            ? NoContent()
            : BadRequest(new { error = result.Error });
    }
}
```

### 8. Creating a Domain Entity

**File**: `Domain/{Entities}/{Entity}.cs`

```csharp
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Domain.{Entities};

public class {Entity} : BaseEntity
{
    // Properties
    public string Name { get; set; } = string.Empty;
    public long BranchId { get; set; }

    // Navigation properties
    public Branch Branch { get; set; } = null!;
    public ICollection<RelatedEntity> RelatedEntities { get; set; } = new List<RelatedEntity>();

    // Business logic methods
    public void UpdateName(string newName)
    {
        if (string.IsNullOrWhiteSpace(newName))
            throw new ArgumentException("Name cannot be empty", nameof(newName));

        Name = newName;
        ModifiedAtUtc = DateTime.UtcNow;
    }

    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(Name) && BranchId > 0;
    }
}
```

### 9. Creating an Entity Configuration (EF Core)

**File**: `Infrastructure/Persistence/EntityConfigurations/{Entity}Configuration.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.{Entities};

namespace TimeAttendanceSystem.Infrastructure.Persistence.EntityConfigurations;

public class {Entity}Configuration : IEntityTypeConfiguration<{Entity}>
{
    public void Configure(EntityTypeBuilder<{Entity}> builder)
    {
        // Table name
        builder.ToTable("{Entities}");

        // Primary key
        builder.HasKey(x => x.Id);

        // Properties
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.BranchId)
            .IsRequired();

        // Indexes
        builder.HasIndex(x => x.Name);
        builder.HasIndex(x => x.BranchId);
        builder.HasIndex(x => new { x.BranchId, x.Name }).IsUnique();

        // Relationships
        builder.HasOne(x => x.Branch)
            .WithMany()
            .HasForeignKey(x => x.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.RelatedEntities)
            .WithOne(x => x.{Entity})
            .HasForeignKey(x => x.{Entity}Id)
            .OnDelete(DeleteBehavior.Cascade);

        // Soft delete query filter
        builder.HasQueryFilter(x => !x.IsDeleted);

        // Optimistic concurrency
        builder.Property(x => x.RowVersion)
            .IsRowVersion();

        // Audit fields
        builder.Property(x => x.CreatedAtUtc)
            .IsRequired();

        builder.Property(x => x.ModifiedAtUtc);
    }
}
```

---

## 🔐 Authentication & Authorization

### Login Flow
```csharp
// 1. Login endpoint
POST /api/auth/login
{
  "username": "admin",
  "password": "Admin@123",
  "rememberMe": true
}

// 2. Response (if 2FA disabled)
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "a1b2c3...",
  "expiresIn": 3600,
  "user": { ... }
}

// 3. Response (if 2FA enabled)
{
  "requiresTwoFactor": true,
  "message": "Two-factor code sent to email"
}

// 4. Verify 2FA
POST /api/auth/verify-two-factor
{
  "username": "admin",
  "code": "123456"
}
```

### Using JWT Token
```csharp
// Add to request headers
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Refresh Token
```csharp
POST /api/auth/refresh-token
{
  "refreshToken": "a1b2c3d4e5..."
}

// Response
{
  "accessToken": "new_token...",
  "refreshToken": "new_refresh_token...",
  "expiresIn": 3600
}
```

### Authorization Policies

**Common Policies**:
- `Employee.View` - View employee details
- `Employee.Create` - Create new employees
- `Employee.Update` - Update employee information
- `Employee.Delete` - Delete employees
- `Employee.Manage` - Full employee management

**Using in Controller**:
```csharp
[Authorize(Policy = "Employee.View")]
public async Task<IActionResult> GetById(long id) { ... }
```

**Checking in Handler**:
```csharp
if (!CurrentUser.HasPermission("Employee.View"))
    return Result<T>.Failure("Access denied");
```

---

## 📊 Database Queries

### Common Query Patterns

**1. Get Single Entity**:
```csharp
var entity = await Context.Entities
    .Where(e => e.Id == id && !e.IsDeleted)
    .FirstOrDefaultAsync(cancellationToken);
```

**2. Get with Related Data**:
```csharp
var entity = await Context.Entities
    .Include(e => e.Branch)
    .Include(e => e.Department)
    .Where(e => e.Id == id && !e.IsDeleted)
    .FirstOrDefaultAsync(cancellationToken);
```

**3. Projection to DTO**:
```csharp
var dto = await Context.Entities
    .Where(e => e.Id == id && !e.IsDeleted)
    .Select(e => new EntityDto
    {
        Id = e.Id,
        Name = e.Name,
        BranchName = e.Branch.Name
    })
    .FirstOrDefaultAsync(cancellationToken);
```

**4. Paginated List**:
```csharp
var query = Context.Entities
    .Where(e => !e.IsDeleted);

// Apply filters
if (!string.IsNullOrEmpty(searchTerm))
    query = query.Where(e => e.Name.Contains(searchTerm));

// Total count
var totalCount = await query.CountAsync(cancellationToken);

// Paginate
var entities = await query
    .OrderBy(e => e.Name)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync(cancellationToken);
```

**5. Multi-Tenant Query**:
```csharp
var userBranchIds = CurrentUser.BranchIds;

var entities = await Context.Entities
    .Where(e => userBranchIds.Contains(e.BranchId) && !e.IsDeleted)
    .ToListAsync(cancellationToken);
```

---

## 🛠️ Common Services

### ICurrentUserService
```csharp
// Get current user ID
var userId = CurrentUser.UserId;

// Get current user's branch IDs
var branchIds = CurrentUser.BranchIds;

// Check permission
if (CurrentUser.HasPermission("Employee.Create"))
{
    // User has permission
}

// Check role
if (CurrentUser.IsInRole("Admin"))
{
    // User is admin
}
```

### IJwtTokenService
```csharp
// Inject service
private readonly IJwtTokenService _jwtTokenService;

// Generate access token
var accessToken = _jwtTokenService.GenerateAccessToken(
    user,
    roles: new[] { "Admin" },
    permissions: new[] { "Employee.View", "Employee.Create" },
    branchIds: new[] { 1L, 2L },
    rememberMe: true
);

// Generate refresh token
var refreshToken = _jwtTokenService.GenerateRefreshToken();

// Validate token
var principal = _jwtTokenService.ValidateToken(token);
```

### IPasswordService
```csharp
// Hash password
var hashedPassword = _passwordService.HashPassword("MyPassword123");

// Verify password
bool isValid = _passwordService.VerifyPassword("MyPassword123", hashedPassword);
```

### ITwoFactorAuthService
```csharp
// Generate secret key
var secretKey = _twoFactorAuthService.GenerateSecretKey();

// Generate QR code for setup
var qrCodeUrl = _twoFactorAuthService.GenerateQrCodeUrl(user.Email, secretKey, "TimeAttendance");

// Generate TOTP code
var code = _twoFactorAuthService.GenerateTwoFactorCode(secretKey);

// Verify code
bool isValid = _twoFactorAuthService.VerifyTwoFactorCode(secretKey, userCode);
```

---

## 📝 Result Pattern

### Using Result<T>
```csharp
// Success
return Result<long>.Success(entity.Id);

// Failure
return Result<long>.Failure("Error message");

// Check result
if (result.IsSuccess)
{
    var value = result.Value;
}
else
{
    var error = result.Error;
}
```

### In Controllers
```csharp
var result = await _mediator.Send(command);

return result.IsSuccess
    ? Ok(result.Value)
    : BadRequest(new { error = result.Error });
```

---

## 🔄 Background Jobs (Coravel)

### Defining a Job
```csharp
public class MyBackgroundJob : IInvocable
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MyBackgroundJob(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task Invoke()
    {
        using var scope = _scopeFactory.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();

        // Job logic here
        await DoWork(context);
    }

    private async Task DoWork(IApplicationDbContext context)
    {
        // Implementation
    }
}
```

### Scheduling a Job
```csharp
// In Program.cs or Startup
services.AddTransient<MyBackgroundJob>();

app.Services.UseScheduler(scheduler =>
{
    scheduler
        .Schedule<MyBackgroundJob>()
        .DailyAtHour(3); // Run at 3 AM daily

    scheduler
        .Schedule<AnotherJob>()
        .EveryMinute(); // Run every minute

    scheduler
        .Schedule<WeeklyJob>()
        .Weekly()
        .Monday()
        .AtHour(0); // Monday at midnight
});
```

---

## 🧪 Testing Examples

### Unit Test Example
```csharp
[Fact]
public void Employee_UpdateName_ShouldUpdateNameAndModifiedDate()
{
    // Arrange
    var employee = new Employee
    {
        FirstName = "John",
        LastName = "Doe"
    };
    var newName = "Jane";

    // Act
    employee.UpdateFirstName(newName);

    // Assert
    Assert.Equal(newName, employee.FirstName);
    Assert.NotNull(employee.ModifiedAtUtc);
}
```

### Integration Test Example
```csharp
[Fact]
public async Task CreateEmployeeCommandHandler_ShouldCreateEmployee()
{
    // Arrange
    var command = new CreateEmployeeCommand(
        BranchId: 1,
        EmployeeNumber: "EMP001",
        FirstName: "John",
        LastName: "Doe",
        Email: "john.doe@example.com"
    );

    // Act
    var result = await _handler.Handle(command, CancellationToken.None);

    // Assert
    Assert.True(result.IsSuccess);
    Assert.True(result.Value > 0);

    var employee = await _context.Employees.FindAsync(result.Value);
    Assert.NotNull(employee);
    Assert.Equal("John", employee.FirstName);
}
```

---

## 🐛 Debugging Tips

### Enable Detailed EF Core Logging
```csharp
// In appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

### SQL Query Logging
```csharp
// See generated SQL in console
var employees = await Context.Employees
    .Where(e => e.BranchId == 1)
    .ToQueryString(); // Shows SQL without executing

Console.WriteLine(employees);
```

### Debugging MediatR Pipeline
```csharp
// Create a logging pipeline behavior
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger;

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation("Handling {RequestName}", typeof(TRequest).Name);
        var response = await next();
        _logger.LogInformation("Handled {RequestName}", typeof(TRequest).Name);
        return response;
    }
}
```

---

## 📚 Useful Extensions

### String Extensions
```csharp
// Check if string is null or whitespace
if (name.IsNullOrWhiteSpace()) { }

// Safe substring
var sub = longString.SafeSubstring(0, 10);
```

### IQueryable Extensions
```csharp
// Apply pagination
var paged = query.ApplyPagination(pageNumber, pageSize);

// Apply sorting
var sorted = query.ApplySorting("Name", isDescending: false);
```

### DateTime Extensions
```csharp
// Start of day
var startOfDay = date.StartOfDay(); // 00:00:00

// End of day
var endOfDay = date.EndOfDay(); // 23:59:59

// Is weekend
if (date.IsWeekend()) { }
```

---

## 🔗 Quick Links

- **Swagger UI**: http://localhost:5099/swagger
- **Health Check**: http://localhost:5099/health
- **Database Migrations**: `src/Infrastructure/Persistence/PostgreSql/Migrations/`
- **Seed Data**: `src/Infrastructure/Persistence/Common/SeedData.cs`

---

## 📞 Default Credentials (Seeded)

| Username | Password | Role | Permissions |
|----------|----------|------|-------------|
| admin | Admin@123 | Admin | All permissions |
| manager | Manager@123 | Manager | Most permissions |
| employee | Employee@123 | Employee | Basic permissions |

---

## 💡 Pro Tips

1. **Always use Result<T> pattern** instead of throwing exceptions for business errors
2. **Use projections in queries** (Select to DTO) to avoid loading unnecessary data
3. **Implement validators** for all commands to catch errors early
4. **Check multi-tenant access** in handlers to ensure data isolation
5. **Use soft deletes** (IsDeleted flag) instead of hard deletes
6. **Apply query filters** in EF Core configuration for automatic soft delete filtering
7. **Use AsNoTracking()** for read-only queries to improve performance
8. **Leverage optimistic concurrency** (RowVersion) for conflict detection
9. **Follow CQRS strictly** - Commands change state, Queries don't
10. **Keep handlers thin** - Move complex logic to domain entities or services

---

**Last Updated**: November 3, 2025
**For detailed documentation**, see [Master Index (00-INDEX.md)](./00-INDEX.md)
