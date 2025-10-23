# PostgreSQL Migration Instructions

## Fixed: PostgreSqlDbContextFactory

I've updated the `PostgreSqlDbContextFactory` to use an environment variable to control when it should be used. This prevents conflicts with the SQL Server factory.

### File Modified:
- [PostgreSqlDbContextFactory.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/PostgreSqlDbContextFactory.cs)

### How It Works:

The factory now checks for the `USE_POSTGRESQL` environment variable. If not set, it returns `null` and lets the SQL Server factory handle migrations.

---

## Creating PostgreSQL Migrations

### Step 1: Stop All Running Processes

Make sure no backend processes are running (they lock DLL files):

**PowerShell:**
```powershell
Get-Process | Where-Object {$_.Path -like "*TimeAttendanceSystem*"} | Stop-Process -Force
```

**Or manually:**
- Close all running backend instances
- Stop any `dotnet run` processes

### Step 2: Set Environment Variable

**PowerShell:**
```powershell
$env:USE_POSTGRESQL = "true"
```

**Command Prompt:**
```cmd
set USE_POSTGRESQL=true
```

**Git Bash (if you're using it):**
```bash
export USE_POSTGRESQL=true
```

### Step 3: Create PostgreSQL Migration

```bash
cd "d:\Work\AI Code\TimeAttendanceSystem"

dotnet ef migrations add PostgreSqlInitial \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api \
  --output-dir Persistence/PostgreSql/Migrations
```

### Step 4: Apply Migration to PostgreSQL

```bash
dotnet ef database update \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api
```

### Step 5: Generate SQL Script (Optional)

If you want a SQL file for review:

```bash
dotnet ef migrations script \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api \
  --output PostgreSQL_Schema.sql \
  --idempotent
```

This will generate a PROPER PostgreSQL schema script (not SQL Server syntax anymore).

### Step 6: Unset Environment Variable

After creating migrations, unset the variable:

**PowerShell:**
```powershell
Remove-Item Env:USE_POSTGRESQL
```

**Command Prompt:**
```cmd
set USE_POSTGRESQL=
```

**Git Bash:**
```bash
unset USE_POSTGRESQL
```

---

## Starting the Application with PostgreSQL

### Step 1: Ensure Configuration

Make sure [appsettings.Development.json](src/Api/TimeAttendanceSystem.Api/appsettings.Development.json) has:

```json
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true"
  }
}
```

### Step 2: Start Backend

```bash
cd "d:\Work\AI Code\TimeAttendanceSystem\src\Api\TimeAttendanceSystem.Api"
dotnet run
```

The backend will:
1. Connect to PostgreSQL
2. Run `EnsureCreatedAsync()` to create tables if they don't exist (or use migrations if available)
3. Seed initial data (Permissions, Roles, SystemAdmin user, default shift, etc.)
4. Start listening on http://localhost:5099

### Step 3: Verify

Check the console output for:
- ✅ "Essential system data seeding completed"
- ✅ "Now listening on: http://localhost:5099"

---

## Summary of Changes Made

### 1. Database-Agnostic Architecture
- ✅ Separate configurations for SQL Server and PostgreSQL
- ✅ Configuration-based provider switching
- ✅ 33 PostgreSQL-specific entity configurations

### 2. PostgreSQL Factory Fix
- ✅ Updated to use `USE_POSTGRESQL` environment variable
- ✅ Returns `null` when not in PostgreSQL mode
- ✅ Allows SQL Server factory to handle migrations by default

### 3. Files Modified
1. [PostgreSqlDbContextFactory.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/PostgreSqlDbContextFactory.cs) - Added environment variable check
2. [DependencyInjection.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs) - Multi-provider support
3. [Program.cs](src/Api/TimeAttendanceSystem.Api/Program.cs) - Auto-schema creation with `EnsureCreatedAsync()`
4. [appsettings.json](src/Api/TimeAttendanceSystem.Api/appsettings.json) - PostgreSQL connection strings
5. All 33 PostgreSQL entity configuration files in `Persistence/PostgreSql/Configurations/`

---

## Troubleshooting

### Issue: "Build failed" when creating migration
**Solution:** Stop all running `dotnet run` processes - they lock DLL files

### Issue: "type 'nvarchar' does not exist" in PostgreSQL
**Solution:** Make sure `USE_POSTGRESQL=true` is set BEFORE running `dotnet ef` commands

### Issue: Tables not created in PostgreSQL
**Solution:**
1. Drop the database: `dotnet ef database drop --force`
2. Apply migrations again with `USE_POSTGRESQL=true`
3. Restart the backend

### Issue: Want to switch back to SQL Server
**Solution:** Change `DatabaseProvider` to `"SqlServer"` in appsettings.Development.json and restart

---

## Next Steps

1. Stop all running backend processes
2. Set `USE_POSTGRESQL=true` environment variable
3. Create fresh PostgreSQL migration
4. Apply migration to create database schema
5. Start backend - it will seed the data automatically
6. Open http://localhost:4200 in browser
7. Login with SystemAdmin credentials

The system is now fully configured for PostgreSQL support!
