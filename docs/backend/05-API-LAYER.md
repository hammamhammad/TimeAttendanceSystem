# Time Attendance System - API Layer Documentation

**Version**: 1.0
**Last Updated**: November 3, 2025
**Framework**: ASP.NET Core 9.0
**Base URL**: `http://localhost:5099/api/v1`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [Controllers](#3-controllers)
4. [Middleware Pipeline](#4-middleware-pipeline)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [CORS Configuration](#6-cors-configuration)
7. [Rate Limiting](#7-rate-limiting)
8. [Error Handling](#8-error-handling)
9. [Localization](#9-localization)
10. [Swagger/OpenAPI](#10-swaggeropenapi)
11. [Security](#11-security)
12. [Development Guide](#12-development-guide)

---

## 1. Overview

### 1.1 Purpose

The API Layer provides **RESTful HTTP endpoints** for the Time Attendance System. It handles HTTP requests/responses, authentication, authorization, and delegates business logic to the Application Layer via MediatR.

### 1.2 Architecture

```
┌──────────────────────────────────────────────┐
│         Client (Browser/Mobile App)          │
└────────────────┬─────────────────────────────┘
                 │ HTTP/HTTPS
                 ▼
┌──────────────────────────────────────────────┐
│              API Layer                       │
│  ┌────────────────────────────────────┐     │
│  │  Middleware Pipeline               │     │
│  │  - CORS                            │     │
│  │  - Rate Limiting                   │     │
│  │  - Localization                    │     │
│  │  - Authentication                  │     │
│  │  - Authorization                   │     │
│  └────────────────────────────────────┘     │
│  ┌────────────────────────────────────┐     │
│  │  Controllers (24 total)            │     │
│  │  - Parse HTTP requests             │     │
│  │  - Send commands/queries           │     │
│  │  - Format HTTP responses           │     │
│  └────────────────────────────────────┘     │
└────────────────┬─────────────────────────────┘
                 │ MediatR
                 ▼
┌──────────────────────────────────────────────┐
│          Application Layer (CQRS)            │
└──────────────────────────────────────────────┘
```

### 1.3 Key Responsibilities

- ✅ **HTTP Handling**: Request/response processing
- ✅ **Routing**: URL-to-controller mapping
- ✅ **Authentication**: JWT token validation
- ✅ **Authorization**: Permission checking
- ✅ **CORS**: Cross-origin resource sharing
- ✅ **Rate Limiting**: Request throttling
- ✅ **Localization**: Multi-language support
- ✅ **Error Handling**: Global exception handling
- ✅ **API Documentation**: Swagger/OpenAPI

---

## 2. Project Structure

### 2.1 Folder Organization

**Location**: `src/Api/TimeAttendanceSystem.Api/`

```
TimeAttendanceSystem.Api/
│
├── Controllers/                    # 24 API controllers
│   ├── AuthController.cs           # Authentication
│   ├── EmployeesController.cs      # Employee management
│   ├── AttendanceController.cs     # Attendance tracking
│   ├── ShiftsController.cs         # Shift configuration
│   ├── UsersController.cs          # User management
│   ├── RolesController.cs          # Role management
│   ├── BranchesController.cs       # Branch management
│   ├── DepartmentsController.cs    # Department management
│   ├── VacationTypesController.cs  # Vacation types
│   ├── EmployeeVacationsController.cs
│   ├── ExcusePoliciesController.cs
│   ├── EmployeeExcusesController.cs
│   ├── PublicHolidaysController.cs
│   ├── RemoteWorkPoliciesController.cs
│   ├── RemoteWorkRequestsController.cs
│   ├── ShiftAssignmentsController.cs
│   ├── SessionsController.cs       # Session management
│   ├── AuditLogsController.cs      # Audit trail
│   ├── DashboardController.cs      # Statistics
│   ├── PermissionsController.cs    # Permissions
│   ├── PortalController.cs         # Employee portal
│   ├── FingerprintRequestsController.cs
│   ├── OvertimeConfigurationController.cs
│   └── SeedController.cs           # Database seeding
│
├── Middleware/                     # Custom middleware
│   ├── RateLimitingMiddleware.cs
│   └── LocalizationMiddleware.cs
│
├── Filters/                        # Action filters
│   ├── AuditActionFilter.cs
│   └── SecurityHeadersFilter.cs
│
├── Configuration/                  # Configuration models
│   └── CorsSettings.cs
│
├── Properties/
│   └── launchSettings.json         # Development settings
│
├── appsettings.json                # Configuration
├── appsettings.Development.json    # Dev overrides
└── Program.cs                      # Application entry point
```

---

## 3. Controllers

### 3.1 Controller Pattern

All controllers follow a consistent pattern:

```csharp
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]  // Require authentication by default
public class ExampleController : ControllerBase
{
    private readonly IMediator _mediator;

    public ExampleController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Policy = "ExampleRead")]
    public async Task<IActionResult> GetAll([FromQuery] GetExamplesQuery query)
    {
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize(Policy = "ExampleManagement")]
    public async Task<IActionResult> Create([FromBody] CreateExampleCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { id = result.Value });
    }
}
```

### 3.2 Controllers Overview

| Controller | Route | Purpose | Key Endpoints |
|------------|-------|---------|---------------|
| **AuthController** | `/api/v1/auth` | Authentication | Login, Register, Logout, 2FA, Token Refresh |
| **EmployeesController** | `/api/v1/employees` | Employee management | CRUD, Toggle Status, Assign Shift |
| **AttendanceController** | `/api/v1/attendance` | Attendance tracking | Report, Transactions, Statistics |
| **ShiftsController** | `/api/v1/shifts` | Shift configuration | CRUD, Set Default |
| **UsersController** | `/api/v1/users` | User management | CRUD, Assign Roles, Assign Branches |
| **RolesController** | `/api/v1/roles` | Role management | CRUD, Assign Permissions |
| **BranchesController** | `/api/v1/branches` | Branch management | List |
| **DepartmentsController** | `/api/v1/departments` | Department management | List, Tree Structure |
| **VacationTypesController** | `/api/v1/vacationtypes` | Vacation types | CRUD, Toggle Status |
| **EmployeeVacationsController** | `/api/v1/employeevacations` | Vacation requests | CRUD, Bulk Create |
| **ExcusePoliciesController** | `/api/v1/excusepolicies` | Excuse policies | CRUD, Toggle Status |
| **EmployeeExcusesController** | `/api/v1/employeeexcuses` | Excuse requests | CRUD, Approve, Validate |
| **PublicHolidaysController** | `/api/v1/publicholidays` | Public holidays | CRUD, Calendar, Export/Import |
| **RemoteWorkPoliciesController** | `/api/v1/remoteworkpolicies` | Remote work policies | CRUD, Toggle Status |
| **RemoteWorkRequestsController** | `/api/v1/remoteworkrequests` | Remote work requests | CRUD, Approve, Cancel |
| **ShiftAssignmentsController** | `/api/v1/shiftassignments` | Shift assignments | CRUD |
| **SessionsController** | `/api/v1/sessions` | Session management | List, Terminate |
| **AuditLogsController** | `/api/v1/auditlogs` | Audit trail | List |
| **DashboardController** | `/api/v1/dashboard` | Statistics | Overview, Widgets |
| **PermissionsController** | `/api/v1/permissions` | Permissions | List |
| **PortalController** | `/api/v1/portal` | Employee portal | Dashboard, Profile, Attendance |
| **FingerprintRequestsController** | `/api/v1/fingerprintrequests` | Fingerprint requests | CRUD, Approve |
| **OvertimeConfigurationController** | `/api/v1/overtimeconfiguration` | Overtime settings | CRUD, Activate |
| **SeedController** | `/api/v1/seed` | Database seeding | Seed (Dev only) |

---

### 3.3 Authentication Controller

**Location**: [Controllers/AuthController.cs](../../../src/Api/TimeAttendanceSystem.Api/Controllers/AuthController.cs)

#### Endpoints

```csharp
// ──────────────────────────────────────────────────────────
// LOGIN
// ──────────────────────────────────────────────────────────
[HttpPost("login")]
[AllowAnonymous]
public async Task<IActionResult> Login([FromBody] LoginCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    // Set HTTP-only cookie for refresh token
    Response.Cookies.Append("refreshToken", result.Value.RefreshToken, new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Expires = DateTimeOffset.UtcNow.AddDays(7)
    });

    return Ok(new
    {
        accessToken = result.Value.AccessToken,
        expiresAt = result.Value.ExpiresAt,
        mustChangePassword = result.Value.MustChangePassword,
        user = result.Value.UserInfo
    });
}

// ──────────────────────────────────────────────────────────
// REFRESH TOKEN
// ──────────────────────────────────────────────────────────
[HttpPost("refresh")]
[AllowAnonymous]
public async Task<IActionResult> RefreshToken()
{
    var refreshToken = Request.Cookies["refreshToken"];

    if (string.IsNullOrEmpty(refreshToken))
        return Unauthorized(new { error = "Refresh token not found" });

    var command = new RefreshTokenCommand(refreshToken);
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return Unauthorized(new { error = result.Error });

    // Update refresh token cookie
    Response.Cookies.Append("refreshToken", result.Value.RefreshToken, new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Expires = DateTimeOffset.UtcNow.AddDays(7)
    });

    return Ok(new
    {
        accessToken = result.Value.AccessToken,
        expiresAt = result.Value.ExpiresAt
    });
}

// ──────────────────────────────────────────────────────────
// LOGOUT
// ──────────────────────────────────────────────────────────
[HttpPost("logout")]
public async Task<IActionResult> Logout()
{
    var command = new LogoutCommand();
    await _mediator.Send(command);

    // Clear refresh token cookie
    Response.Cookies.Delete("refreshToken");

    return NoContent();
}

// ──────────────────────────────────────────────────────────
// TWO-FACTOR AUTHENTICATION
// ──────────────────────────────────────────────────────────
[HttpPost("enable-2fa")]
public async Task<IActionResult> EnableTwoFactor()
{
    var command = new EnableTwoFactorCommand();
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(new
    {
        secretKey = result.Value.SecretKey,
        qrCodeUri = result.Value.QrCodeUri,
        backupCodes = result.Value.BackupCodes
    });
}

[HttpPost("verify-2fa")]
[AllowAnonymous]
public async Task<IActionResult> VerifyTwoFactor([FromBody] VerifyTwoFactorCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(result.Value);
}

// ──────────────────────────────────────────────────────────
// PASSWORD MANAGEMENT
// ──────────────────────────────────────────────────────────
[HttpPost("change-password")]
public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return NoContent();
}

[HttpPost("request-password-reset")]
[AllowAnonymous]
public async Task<IActionResult> RequestPasswordReset([FromBody] RequestPasswordResetCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(new { message = "Password reset email sent" });
}
```

---

### 3.4 Employees Controller

**Location**: [Controllers/EmployeesController.cs](../../../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeesController.cs)

```csharp
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;

    // GET /api/v1/employees
    [HttpGet]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeesQuery query)
    {
        var result = await _mediator.Send(query);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    // GET /api/v1/employees/{id}
    [HttpGet("{id}")]
    [Authorize(Policy = "EmployeeRead")]
    public async Task<IActionResult> GetEmployeeById(long id)
    {
        var query = new GetEmployeeByIdQuery(id);
        var result = await _mediator.Send(query);
        return result.IsFailure ? NotFound(new { error = result.Error }) : Ok(result.Value);
    }

    // POST /api/v1/employees
    [HttpPost]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(new { id = result.Value });
    }

    // PUT /api/v1/employees/{id}
    [HttpPut("{id}")]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> UpdateEmployee(long id, [FromBody] UpdateEmployeeCommand command)
    {
        if (id != command.Id)
            return BadRequest(new { error = "ID mismatch" });

        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : NoContent();
    }

    // DELETE /api/v1/employees/{id}
    [HttpDelete("{id}")]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> DeleteEmployee(long id)
    {
        var command = new DeleteEmployeeCommand(id);
        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : NoContent();
    }

    // POST /api/v1/employees/{id}/toggle-status
    [HttpPost("{id}/toggle-status")]
    [Authorize(Policy = "EmployeeManagement")]
    public async Task<IActionResult> ToggleEmployeeStatus(long id)
    {
        var command = new ToggleEmployeeStatusCommand(id);
        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : NoContent();
    }
}
```

---

## 4. Middleware Pipeline

### 4.1 Execution Order

**Location**: [Program.cs](../../../src/Api/TimeAttendanceSystem.Api/Program.cs)

```csharp
// ══════════════════════════════════════════════════════════
// MIDDLEWARE PIPELINE (EXECUTION ORDER)
// ══════════════════════════════════════════════════════════

app.UseHttpsRedirection();              // 1. Redirect HTTP → HTTPS
app.UseCors("AllowFrontend");           // 2. CORS handling
app.UseStaticFiles();                   // 3. Static files (if any)

app.UseRouting();                       // 4. Route matching

app.UseMiddleware<RateLimitingMiddleware>();  // 5. Rate limiting
app.UseMiddleware<LocalizationMiddleware>();  // 6. Localization

app.UseAuthentication();                // 7. JWT authentication
app.UseAuthorization();                 // 8. Permission checking

app.MapControllers();                   // 9. Controller endpoints

app.Run();
```

### 4.2 Rate Limiting Middleware

**Location**: [Middleware/RateLimitingMiddleware.cs](../../../src/Api/TimeAttendanceSystem.Api/Middleware/RateLimitingMiddleware.cs)

```csharp
public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ConcurrentDictionary<string, (int Count, DateTime ResetTime)> _requests = new();
    private const int MaxRequests = 100;
    private const int TimeWindowSeconds = 60;

    public async Task InvokeAsync(HttpContext context)
    {
        // ──────────────────────────────────────────────────────────
        // IDENTIFY CLIENT
        // ──────────────────────────────────────────────────────────
        var clientId = context.User.Identity?.IsAuthenticated == true
            ? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? context.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            : context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        // ──────────────────────────────────────────────────────────
        // CHECK RATE LIMIT
        // ──────────────────────────────────────────────────────────
        var now = DateTime.UtcNow;

        if (_requests.TryGetValue(clientId, out var clientData))
        {
            if (now < clientData.ResetTime)
            {
                if (clientData.Count >= MaxRequests)
                {
                    // Rate limit exceeded
                    context.Response.StatusCode = 429; // Too Many Requests
                    context.Response.Headers.Add("Retry-After", ((int)(clientData.ResetTime - now).TotalSeconds).ToString());
                    await context.Response.WriteAsync("Rate limit exceeded. Please try again later.");
                    return;
                }

                // Increment count
                _requests[clientId] = (clientData.Count + 1, clientData.ResetTime);
            }
            else
            {
                // Reset window
                _requests[clientId] = (1, now.AddSeconds(TimeWindowSeconds));
            }
        }
        else
        {
            // First request
            _requests[clientId] = (1, now.AddSeconds(TimeWindowSeconds));
        }

        // ──────────────────────────────────────────────────────────
        // ADD RATE LIMIT HEADERS
        // ──────────────────────────────────────────────────────────
        var current = _requests[clientId];
        context.Response.Headers.Add("X-RateLimit-Limit", MaxRequests.ToString());
        context.Response.Headers.Add("X-RateLimit-Remaining", (MaxRequests - current.Count).ToString());
        context.Response.Headers.Add("X-RateLimit-Reset", new DateTimeOffset(current.ResetTime).ToUnixTimeSeconds().ToString());

        await _next(context);
    }
}
```

**Features**:
- ✅ **Token Bucket Algorithm**: 100 requests per 60 seconds
- ✅ **Client Identification**: User ID (authenticated) or IP (anonymous)
- ✅ **Standard Headers**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
- ✅ **429 Response**: Too Many Requests with Retry-After header

---

### 4.3 Localization Middleware

**Location**: [Middleware/LocalizationMiddleware.cs](../../../src/Api/TimeAttendanceSystem.Api/Middleware/LocalizationMiddleware.cs)

```csharp
public class LocalizationMiddleware
{
    private readonly RequestDelegate _next;

    public async Task InvokeAsync(HttpContext context)
    {
        // ──────────────────────────────────────────────────────────
        // DETERMINE PREFERRED LANGUAGE
        // ──────────────────────────────────────────────────────────
        string preferredLanguage = "en";  // Default

        // Priority 1: User's preferred language from JWT claims
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var langClaim = context.User.FindFirst("preferred_language")?.Value;
            if (!string.IsNullOrEmpty(langClaim))
                preferredLanguage = langClaim;
        }

        // Priority 2: Accept-Language header
        if (preferredLanguage == "en" && context.Request.Headers.ContainsKey("Accept-Language"))
        {
            var acceptLanguage = context.Request.Headers["Accept-Language"].ToString();
            if (acceptLanguage.StartsWith("ar", StringComparison.OrdinalIgnoreCase))
                preferredLanguage = "ar";
        }

        // ──────────────────────────────────────────────────────────
        // SET CULTURE
        // ──────────────────────────────────────────────────────────
        var culture = new CultureInfo(preferredLanguage);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;

        // ──────────────────────────────────────────────────────────
        // ADD CONTENT-LANGUAGE HEADER
        // ──────────────────────────────────────────────────────────
        context.Response.Headers.Add("Content-Language", preferredLanguage);

        await _next(context);
    }
}
```

**Supported Languages**:
- **en**: English (default)
- **ar**: Arabic (RTL support)

---

## 5. Authentication & Authorization

### 5.1 JWT Authentication

**Configuration** (in Program.cs):

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ClockSkew = TimeSpan.Zero  // Exact expiration
        };
    });
```

**Token Structure**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Claims**:
- `sub`: User ID
- `unique_name`: Username
- `email`: Email address
- `role`: User roles (multiple)
- `permission`: Permissions (multiple)
- `branch_scope`: Branch IDs (multiple)
- `preferred_language`: User language

---

### 5.2 Authorization Policies

**40+ Policies** defined in Infrastructure layer:

```csharp
// System Administration
[Authorize(Policy = "SystemAdmin")]

// Employee Management
[Authorize(Policy = "EmployeeRead")]        // View employees
[Authorize(Policy = "EmployeeManagement")]  // Full CRUD

// Attendance Management
[Authorize(Policy = "AttendanceManagement")]
[Authorize(Policy = "AttendanceApproval")]

// Shift Management
[Authorize(Policy = "ShiftRead")]
[Authorize(Policy = "ShiftManagement")]

// User Management
[Authorize(Policy = "UserRead")]
[Authorize(Policy = "UserManagement")]
```

---

## 6. CORS Configuration

**Location**: [Program.cs](../../../src/Api/TimeAttendanceSystem.Api/Program.cs)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",    // Angular dev server
                "http://localhost:3000"     // React dev server (if applicable)
            )
            .AllowAnyMethod()               // GET, POST, PUT, DELETE, etc.
            .AllowAnyHeader()               // Content-Type, Authorization, etc.
            .AllowCredentials()             // Allow cookies
            .SetPreflightMaxAge(TimeSpan.FromHours(24));  // Cache preflight for 24 hours
    });
});
```

**Production Configuration**:
```csharp
policy.WithOrigins(
    "https://yourdomain.com",
    "https://www.yourdomain.com"
)
```

---

## 7. Rate Limiting

### 7.1 Configuration

**Settings**:
- **Max Requests**: 100 per client
- **Time Window**: 60 seconds
- **Client Identification**: User ID or IP address
- **Algorithm**: Token bucket

### 7.2 Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699564800
```

### 7.3 Rate Limit Exceeded Response

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 45

Rate limit exceeded. Please try again later.
```

---

## 8. Error Handling

### 8.1 Global Exception Handler

ASP.NET Core's built-in exception handling with developer/production modes.

**Development**:
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "An error occurred while processing your request.",
  "status": 500,
  "traceId": "00-abc123...",
  "exception": "System.InvalidOperationException: ...",
  "stackTrace": "..."
}
```

**Production**:
```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
  "title": "An error occurred while processing your request.",
  "status": 500,
  "traceId": "00-abc123..."
}
```

### 8.2 Validation Errors

**FluentValidation** errors return 400 Bad Request:

```json
{
  "error": "Validation failed: Email is required; Password must be at least 8 characters"
}
```

### 8.3 Business Logic Errors

**Result Pattern** errors return 400 Bad Request:

```json
{
  "error": "Employee number already exists in this branch."
}
```

---

## 9. Localization

### 9.1 Language Detection

**Priority Order**:
1. User's `preferred_language` JWT claim
2. `Accept-Language` HTTP header
3. System default (English)

### 9.2 Request Example

```http
GET /api/v1/employees
Accept-Language: ar
Authorization: Bearer eyJ...
```

### 9.3 Response Headers

```http
HTTP/1.1 200 OK
Content-Language: ar
Content-Type: application/json; charset=utf-8
```

### 9.4 Supported Languages

- **English** (`en`): Default, LTR
- **Arabic** (`ar`): RTL support

---

## 10. Swagger/OpenAPI

### 10.1 Configuration

**Location**: [Program.cs](../../../src/Api/TimeAttendanceSystem.Api/Program.cs)

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Time Attendance System API",
        Version = "v1",
        Description = "RESTful API for Time Attendance Management",
        Contact = new OpenApiContact
        {
            Name = "Development Team",
            Email = "dev@example.com"
        }
    });

    // JWT Authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
```

### 10.2 Accessing Swagger UI

**Development URL**: http://localhost:5099/swagger/index.html

**Features**:
- ✅ Interactive API documentation
- ✅ Try-it-out functionality
- ✅ JWT Bearer token configuration
- ✅ Request/response schemas
- ✅ Model definitions

---

## 11. Security

### 11.1 Security Headers

**Location**: [Filters/SecurityHeadersFilter.cs](../../../src/Api/TimeAttendanceSystem.Api/Filters/SecurityHeadersFilter.cs)

```csharp
public class SecurityHeadersFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context) { }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        if (context.HttpContext.Response.HasStarted)
            return;

        var headers = context.HttpContext.Response.Headers;

        // Prevent MIME sniffing
        headers["X-Content-Type-Options"] = "nosniff";

        // Prevent clickjacking
        headers["X-Frame-Options"] = "DENY";

        // XSS protection
        headers["X-XSS-Protection"] = "1; mode=block";

        // HSTS (HTTPS only)
        headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";

        // Content Security Policy
        headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:";

        // Referrer Policy
        headers["Referrer-Policy"] = "strict-origin-when-cross-origin";

        // Permissions Policy
        headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()";
    }
}
```

### 11.2 HTTPS Enforcement

**Development**: HTTP allowed
**Production**: HTTPS required (enforced by UseHttpsRedirection())

---

### 11.3 Audit Logging

**Location**: [Filters/AuditActionFilter.cs](../../../src/Api/TimeAttendanceSystem.Api/Filters/AuditActionFilter.cs)

```csharp
public class AuditActionFilter : IAsyncActionFilter
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var resultContext = await next();

        // Only audit successful data-modifying operations
        if (resultContext.HttpContext.Response.StatusCode >= 200 &&
            resultContext.HttpContext.Response.StatusCode < 300)
        {
            var method = context.HttpContext.Request.Method;

            if (method == "POST" || method == "PUT" || method == "PATCH" || method == "DELETE")
            {
                var auditLog = new AuditLog
                {
                    ActorUserId = _currentUser.UserId,
                    Action = DetermineAction(method, context.ActionDescriptor.DisplayName),
                    EntityName = GetEntityName(context.ActionDescriptor),
                    PayloadJson = JsonSerializer.Serialize(context.ActionArguments),
                    IpAddress = context.HttpContext.Connection.RemoteIpAddress?.ToString(),
                    UserAgent = context.HttpContext.Request.Headers["User-Agent"].ToString(),
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.UserId ?? 0
                };

                _context.AuditLogs.Add(auditLog);
                await _context.SaveChangesAsync();
            }
        }
    }
}
```

---

## 12. Development Guide

### 12.1 Adding a New Controller

**Step 1**: Create controller class

```csharp
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class MyEntityController : ControllerBase
{
    private readonly IMediator _mediator;

    public MyEntityController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Policy = "MyEntityRead")]
    public async Task<IActionResult> GetAll([FromQuery] GetMyEntitiesQuery query)
    {
        var result = await _mediator.Send(query);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }
}
```

**Step 2**: Test with Swagger
- Navigate to http://localhost:5099/swagger
- Authorize with JWT token
- Test endpoints

---

### 12.2 Running the API

**Development**:
```bash
dotnet run --project src/Api/TimeAttendanceSystem.Api
```

**Access Points**:
- API: http://localhost:5099
- Swagger: http://localhost:5099/swagger

---

## Summary

The API Layer provides:

✅ **24 Controllers** - RESTful endpoints for all features
✅ **JWT Authentication** - Secure token-based auth
✅ **Authorization Policies** - 40+ fine-grained policies
✅ **CORS** - Cross-origin support for frontend
✅ **Rate Limiting** - 100 req/60s per client
✅ **Localization** - English/Arabic support
✅ **Swagger** - Interactive API documentation
✅ **Security Headers** - HSTS, CSP, X-Frame-Options
✅ **Audit Logging** - Automatic change tracking
✅ **Error Handling** - Consistent error responses

**Next Steps**:
- Review [Application Layer](03-APPLICATION-LAYER.md) for business logic
- Review [Infrastructure Layer](04-INFRASTRUCTURE-LAYER.md) for services
- Review [Domain Layer](02-DOMAIN-LAYER.md) for entities

---

**Document Version**: 1.0
**Last Updated**: November 3, 2025
**Maintained By**: Development Team
