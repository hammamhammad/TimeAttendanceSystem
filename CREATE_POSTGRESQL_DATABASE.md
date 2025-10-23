# PostgreSQL Database Creation Guide

## Issue Summary

The Time Attendance System has been successfully configured to support PostgreSQL, but EF Core migrations cannot create the schema due to a limitation: having two `IDesignTimeDbContextFactory` implementations (SQL Server and PostgreSQL) in the same assembly causes EF Core to always use the SQL Server factory, generating SQL Server syntax.

## Solution

You need to manually create the PostgreSQL database schema using one of the methods below.

---

## Method 1: Run SQL Server with the Existing System (Recommended Quick Fix)

Since the SQL Server version is fully working:

1. Change `appsettings.Development.json`:
   ```json
   "DatabaseProvider": "SqlServer"
   ```

2. Restart the backend - tables will be created in SQL Server automatically

3. Later, we can export the data and import to PostgreSQL

---

## Method 2: Manually Create PostgreSQL Schema (Complete PostgreSQL Setup)

### Step 1: Connect to PostgreSQL

Use pgAdmin, DBeaver, or psql command line:
```bash
psql -U postgres -h localhost -p 5432
```

### Step 2: Create the Database
```sql
CREATE DATABASE "TimeAttendanceSystem";
```

### Step 3: Connect to the Database
```sql
\c TimeAttendanceSystem
```

### Step 4: Run the Schema Creation Script

**IMPORTANT**: I will create a complete PostgreSQL schema script in the next file. Due to the size (33 tables), I'll generate it properly with PostgreSQL syntax.

---

## Method 3: Use a Separate PostgreSQL-Only Project (Future Enhancement)

To properly support both databases, consider creating two separate migration projects:
- `TimeAttendanceSystem.Infrastructure.SqlServer`
- `TimeAttendanceSystem.Infrastructure.PostgreSql`

This allows each to have its own `IDesignTimeDbContextFactory` without conflicts.

---

## Current Status

✅ **Backend API**: Running on http://localhost:5099
✅ **Frontend**: Running on http://localhost:4200
✅ **PostgreSQL Connection**: Configured and working
✅ **Entity Configurations**: PostgreSQL-specific configurations created (33 files)
✅ **Dependency Injection**: Multi-provider support implemented
❌ **Database Schema**: Not created due to EF Core factory conflict

---

## Files Modified for PostgreSQL Support

1. [DependencyInjection.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs) - Provider selection logic
2. [TimeAttendanceDbContext.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/TimeAttendanceDbContext.cs) - Conditional configuration loading
3. [appsettings.json](src/Api/TimeAttendanceSystem.Api/appsettings.json) - PostgreSQL connection strings
4. [appsettings.Development.json](src/Api/TimeAttendanceSystem.Api/appsettings.Development.json) - PostgreSQL connection strings
5. [Program.cs](src/Api/TimeAttendanceSystem.Api/Program.cs) - Auto-schema creation attempt
6. 33 PostgreSQL-specific entity configuration files in `Persistence/PostgreSql/Configurations/`

---

## Next Steps

Choose one of the methods above. Method 1 (using SQL Server) is the quickest path to a working system.

For Method 2, wait for the complete PostgreSQL schema SQL script in the next file.
