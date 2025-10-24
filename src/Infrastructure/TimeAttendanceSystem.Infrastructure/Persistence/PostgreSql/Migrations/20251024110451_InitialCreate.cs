using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ActorUserId = table.Column<long>(type: "bigint", nullable: true),
                    Action = table.Column<int>(type: "integer", nullable: false),
                    EntityName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EntityId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PayloadJson = table.Column<string>(type: "text", nullable: true),
                    IpAddress = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: true),
                    UserAgent = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TimeZone = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OvertimeConfigurations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EnablePreShiftOvertime = table.Column<bool>(type: "boolean", nullable: false),
                    EnablePostShiftOvertime = table.Column<bool>(type: "boolean", nullable: false),
                    NormalDayRate = table.Column<decimal>(type: "numeric(5,2)", nullable: false, comment: "Overtime rate multiplier for normal working days (e.g., 1.5 for 150%)"),
                    PublicHolidayRate = table.Column<decimal>(type: "numeric(5,2)", nullable: false, comment: "Overtime rate multiplier for public holidays (e.g., 2.0 for 200%)"),
                    OffDayRate = table.Column<decimal>(type: "numeric(5,2)", nullable: false, comment: "Overtime rate multiplier for off days/weekends (e.g., 2.5 for 250%)"),
                    MinimumOvertimeMinutes = table.Column<int>(type: "integer", nullable: false, comment: "Minimum minutes of overtime before it counts (e.g., 15)"),
                    ConsiderFlexibleTime = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether to consider flexible time rules when calculating overtime"),
                    MaxPreShiftOvertimeHours = table.Column<decimal>(type: "numeric(4,2)", nullable: false, comment: "Maximum pre-shift overtime hours allowed per day"),
                    MaxPostShiftOvertimeHours = table.Column<decimal>(type: "numeric(4,2)", nullable: false, comment: "Maximum post-shift overtime hours allowed per day"),
                    RequireApproval = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether overtime requires manager approval"),
                    OvertimeGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false, comment: "Grace period in minutes before overtime calculation begins"),
                    WeekendAsOffDay = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether weekends are automatically considered off days"),
                    RoundingIntervalMinutes = table.Column<int>(type: "integer", nullable: false, comment: "Rounding interval for overtime hours (0 = no rounding)"),
                    PolicyNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes about overtime policies"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this configuration is currently active"),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date from which this configuration becomes effective"),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Date until which this configuration is valid (null = indefinite)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OvertimeConfigurations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Group = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IsSystem = table.Column<bool>(type: "boolean", nullable: false),
                    IsEditable = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeletable = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ShiftType = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RequiredHours = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    RequiresCheckInOut = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsAutoCheckOut = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    AllowFlexibleHours = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    FlexMinutesBefore = table.Column<int>(type: "integer", nullable: true),
                    FlexMinutesAfter = table.Column<int>(type: "integer", nullable: true),
                    GracePeriodMinutes = table.Column<int>(type: "integer", nullable: true),
                    RequiredWeeklyHours = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    HasCoreHours = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CoreStart = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    CoreEnd = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    IsSunday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsMonday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsTuesday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsWednesday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsThursday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsFriday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    IsSaturday = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsNightShift = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    PasswordHash = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    PasswordSalt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorSecretKey = table.Column<string>(type: "text", nullable: true),
                    LockoutEndUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FailedLoginAttempts = table.Column<int>(type: "integer", nullable: false),
                    LastFailedLoginAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MustChangePassword = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordChangedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    EmailConfirmationToken = table.Column<string>(type: "text", nullable: true),
                    PasswordResetToken = table.Column<string>(type: "text", nullable: true),
                    PasswordResetTokenExpiresAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PreferredLanguage = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "en"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditChanges",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AuditLogId = table.Column<long>(type: "bigint", nullable: false),
                    FieldName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    OldValue = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    NewValue = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditChanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditChanges_AuditLogs_AuditLogId",
                        column: x => x.AuditLogId,
                        principalTable: "AuditLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ParentDepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    ManagerEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    CostCenter = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Location = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Phone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Departments_Departments_ParentDepartmentId",
                        column: x => x.ParentDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExcusePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    MaxPersonalExcusesPerMonth = table.Column<int>(type: "integer", nullable: false, defaultValue: 5),
                    MaxPersonalExcuseHoursPerMonth = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 8.0m),
                    MaxPersonalExcuseHoursPerDay = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 4.0m),
                    MaxHoursPerExcuse = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 2.0m),
                    RequiresApproval = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    AllowPartialHourExcuses = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    MinimumExcuseDuration = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0.5m),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    MaxRetroactiveDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 7),
                    AllowSelfServiceRequests = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExcusePolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExcusePolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "OffDays",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Name/description of the off day configuration"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic name of the off day configuration"),
                    OffDayType = table.Column<int>(type: "integer", nullable: false, comment: "Type of off day configuration (weekly/custom period)"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this off day configuration is currently active"),
                    IsCompanyWide = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this applies to all branches"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Specific branch ID for branch-specific off days"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Start date for custom period off days"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "End date for custom period off days"),
                    IsSunday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Sunday is an off day"),
                    IsMonday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Monday is an off day"),
                    IsTuesday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Tuesday is an off day"),
                    IsWednesday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Wednesday is an off day"),
                    IsThursday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Thursday is an off day"),
                    IsFriday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Friday is an off day"),
                    IsSaturday = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether Saturday is an off day"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Description or notes about the off day configuration"),
                    Priority = table.Column<int>(type: "integer", nullable: false, comment: "Priority when multiple configurations overlap"),
                    OverridesPublicHolidays = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this off day overrides public holidays"),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date from which this configuration becomes effective"),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Date until which this configuration is valid"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OffDays_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PublicHolidays",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Name of the public holiday"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic name of the public holiday"),
                    SpecificDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Specific date for one-time holidays"),
                    Month = table.Column<int>(type: "integer", nullable: true, comment: "Month for recurring holidays (1-12)"),
                    Day = table.Column<int>(type: "integer", nullable: true, comment: "Day of month for recurring holidays (1-31)"),
                    HolidayType = table.Column<int>(type: "integer", nullable: false, comment: "Type of holiday recurrence pattern"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this holiday is currently active"),
                    IsNational = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this holiday applies to all branches"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Specific branch ID for regional holidays"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Description or notes about the holiday"),
                    EffectiveFromYear = table.Column<int>(type: "integer", nullable: true, comment: "Year from which this holiday becomes effective"),
                    EffectiveToYear = table.Column<int>(type: "integer", nullable: true, comment: "Year until which this holiday is valid"),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: true, comment: "Day of week for floating holidays"),
                    WeekOccurrence = table.Column<int>(type: "integer", nullable: true, comment: "Week occurrence for floating holidays (1-5, -1 for last)"),
                    CountryCode = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true, comment: "Country code for international holiday support"),
                    Priority = table.Column<int>(type: "integer", nullable: false, comment: "Priority when multiple holidays fall on same date"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicHolidays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublicHolidays_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RemoteWorkPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    MaxDaysPerWeek = table.Column<int>(type: "integer", nullable: true),
                    MaxDaysPerMonth = table.Column<int>(type: "integer", nullable: true),
                    MaxDaysPerYear = table.Column<int>(type: "integer", nullable: true),
                    RequiresManagerApproval = table.Column<bool>(type: "boolean", nullable: false),
                    AllowConsecutiveDays = table.Column<bool>(type: "boolean", nullable: false),
                    MaxConsecutiveDays = table.Column<int>(type: "integer", nullable: true),
                    MinAdvanceNoticeDays = table.Column<int>(type: "integer", nullable: true),
                    BlackoutPeriods = table.Column<string>(type: "text", nullable: true),
                    CountForOvertime = table.Column<bool>(type: "boolean", nullable: false),
                    EnforceShiftTimes = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemoteWorkPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemoteWorkPolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VacationTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacationTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacationTypes_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RoleId = table.Column<long>(type: "bigint", nullable: false),
                    PermissionId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShiftPeriods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ShiftId = table.Column<long>(type: "bigint", nullable: false),
                    PeriodOrder = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    Hours = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    IsNightPeriod = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftPeriods_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BlacklistedTokens",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TokenId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TokenType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    ExpiresAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Reason = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlacklistedTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlacklistedTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LoginAttempts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IpAddress = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: false),
                    UserAgent = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsSuccessful = table.Column<bool>(type: "boolean", nullable: false),
                    FailureReason = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    AttemptedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginAttempts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoginAttempts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PasswordHistory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    PasswordSalt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    ChangedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PasswordHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Token = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    ExpiresAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RevokedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeviceInfo = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TwoFactorBackupCodes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false),
                    UsedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TwoFactorBackupCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TwoFactorBackupCodes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBranchScopes",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    BranchId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBranchScopes", x => new { x.UserId, x.BranchId });
                    table.ForeignKey(
                        name: "FK_UserBranchScopes_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBranchScopes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSessions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    SessionId = table.Column<string>(type: "text", nullable: false),
                    DeviceFingerprint = table.Column<string>(type: "text", nullable: false),
                    DeviceName = table.Column<string>(type: "text", nullable: false),
                    IpAddress = table.Column<string>(type: "text", nullable: false),
                    UserAgent = table.Column<string>(type: "text", nullable: false),
                    Platform = table.Column<string>(type: "text", nullable: false),
                    Browser = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    LastAccessedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiresAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsCurrentSession = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FirstNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LastNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    NationalId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<int>(type: "integer", nullable: true),
                    HireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EmploymentStatus = table.Column<int>(type: "integer", nullable: false),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    ManagerEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    WorkLocationType = table.Column<int>(type: "integer", nullable: false),
                    PhotoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DepartmentId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_DepartmentId1",
                        column: x => x.DepartmentId1,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_Employees_ManagerEmployeeId",
                        column: x => x.ManagerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeExcuses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ExcuseDate = table.Column<DateTime>(type: "date", nullable: false),
                    ExcuseType = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    DurationHours = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, computedColumnSql: "EXTRACT(EPOCH FROM (\"EndTime\" - \"StartTime\")) / 3600.0", stored: true),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    ApprovalStatus = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    ApprovedById = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AttachmentPath = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AffectsSalary = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    ProcessingNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeExcuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeExcuses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeExcuses_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeUserLinks",
                columns: table => new
                {
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeUserLinks", x => new { x.EmployeeId, x.UserId });
                    table.ForeignKey(
                        name: "FK_EmployeeUserLinks_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeUserLinks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeVacations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier for vacation assignment"),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false, comment: "Vacation type identifier for categorization"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Start date of vacation period"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "End date of vacation period"),
                    TotalDays = table.Column<int>(type: "integer", nullable: false, comment: "Total number of vacation days"),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether vacation is approved and affects attendance"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Optional notes about the vacation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeVacations_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeVacations_VacationTypes",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RemoteWorkRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: true),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "text", nullable: true),
                    ApprovalComments = table.Column<string>(type: "text", nullable: true),
                    RemoteWorkPolicyId = table.Column<long>(type: "bigint", nullable: false),
                    WorkingDaysCount = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemoteWorkRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_RemoteWorkPolicies_RemoteWorkPolicyId",
                        column: x => x.RemoteWorkPolicyId,
                        principalTable: "RemoteWorkPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Users_ApprovedByUserId",
                        column: x => x.ApprovedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShiftAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ShiftId = table.Column<long>(type: "bigint", nullable: false, comment: "Foreign key to the Shift entity being assigned"),
                    AssignmentType = table.Column<int>(type: "integer", nullable: false, comment: "Type of assignment: Employee (1), Department (2), or Branch (3)"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true, comment: "Employee ID for employee-level assignments (null for department/branch assignments)"),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true, comment: "Department ID for department-level assignments (null for employee/branch assignments)"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Branch ID for branch-level assignments (null for employee/department assignments)"),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date when this assignment becomes active"),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Optional end date for temporary assignments"),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Assignment status: Pending (1), Active (2), Inactive (3), Expired (4), Cancelled (5)"),
                    Priority = table.Column<int>(type: "integer", nullable: false, defaultValue: 10, comment: "Assignment priority for conflict resolution (higher values take precedence)"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Optional notes about the assignment"),
                    AssignedByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "ID of the user who created this assignment"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", rowVersion: true, nullable: false, defaultValueSql: "E'\\\\x01'::bytea")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftAssignments_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShiftAssignments_Departments",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShiftAssignments_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShiftAssignments_Shifts",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AttendanceRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AttendanceDate = table.Column<DateTime>(type: "date", nullable: false),
                    ShiftAssignmentId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ScheduledStartTime = table.Column<TimeOnly>(type: "time", nullable: true),
                    ScheduledEndTime = table.Column<TimeOnly>(type: "time", nullable: true),
                    ActualCheckInTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ActualCheckOutTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ScheduledHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    WorkingHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    BreakHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    OvertimeHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    PreShiftOvertimeHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false, defaultValue: 0m),
                    PostShiftOvertimeHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false, defaultValue: 0m),
                    OvertimeRate = table.Column<decimal>(type: "numeric(4,2)", nullable: false, defaultValue: 0m),
                    OvertimeAmount = table.Column<decimal>(type: "numeric(10,2)", nullable: false, defaultValue: 0m),
                    OvertimeDayType = table.Column<int>(type: "integer", nullable: false),
                    OvertimeConfigurationId = table.Column<long>(type: "bigint", nullable: true),
                    OvertimeCalculationNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    LateMinutes = table.Column<int>(type: "integer", nullable: false),
                    EarlyLeaveMinutes = table.Column<int>(type: "integer", nullable: false),
                    IsManualOverride = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    OverrideByUserId = table.Column<long>(type: "bigint", nullable: true),
                    OverrideAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OverrideNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsFinalized = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    WorkLocation = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    RemoteWorkRequestId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceRecords_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttendanceRecords_RemoteWorkRequests_RemoteWorkRequestId",
                        column: x => x.RemoteWorkRequestId,
                        principalTable: "RemoteWorkRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_AttendanceRecords_ShiftAssignments_ShiftAssignmentId",
                        column: x => x.ShiftAssignmentId,
                        principalTable: "ShiftAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "AttendanceTransactions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TransactionType = table.Column<int>(type: "integer", nullable: false),
                    TransactionTimeUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TransactionTimeLocal = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AttendanceDate = table.Column<DateTime>(type: "date", nullable: false),
                    IsManual = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    EnteredByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DeviceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IpAddress = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    VerifiedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    VerifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AttendanceRecordId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceTransactions_AttendanceRecords_AttendanceRecordId",
                        column: x => x.AttendanceRecordId,
                        principalTable: "AttendanceRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttendanceTransactions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttendanceTransactions_Users_EnteredByUserId",
                        column: x => x.EnteredByUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AttendanceTransactions_Users_VerifiedByUserId",
                        column: x => x.VerifiedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkingDays",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AttendanceRecordId = table.Column<long>(type: "bigint", nullable: false),
                    WorkStartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WorkEndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalTimeOnPremises = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    ProductiveWorkingTime = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    TotalBreakTime = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    BreakPeriodCount = table.Column<int>(type: "integer", nullable: false),
                    LongestBreakDuration = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    CoreHoursWorked = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    CoreHoursCompliant = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    RegularOvertimeHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    PremiumOvertimeHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    EarlyStartHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    LateEndHours = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    EfficiencyPercentage = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    TrackingGaps = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    IsCalculationComplete = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    CalculationNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingDays_AttendanceRecords_AttendanceRecordId",
                        column: x => x.AttendanceRecordId,
                        principalTable: "AttendanceRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_Approval_Status",
                table: "AttendanceRecords",
                columns: new[] { "IsApproved", "IsFinalized" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_AttendanceDate",
                table: "AttendanceRecords",
                column: "AttendanceDate");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_Employee_Date",
                table: "AttendanceRecords",
                columns: new[] { "EmployeeId", "AttendanceDate" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_OvertimeConfiguration",
                table: "AttendanceRecords",
                column: "OvertimeConfigurationId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_OvertimeDayType",
                table: "AttendanceRecords",
                column: "OvertimeDayType");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_RemoteWorkRequest",
                table: "AttendanceRecords",
                column: "RemoteWorkRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_ShiftAssignmentId",
                table: "AttendanceRecords",
                column: "ShiftAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_Status",
                table: "AttendanceRecords",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_WorkLocation",
                table: "AttendanceRecords",
                column: "WorkLocation");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_AttendanceDate",
                table: "AttendanceTransactions",
                column: "AttendanceDate");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_AttendanceRecordId",
                table: "AttendanceTransactions",
                column: "AttendanceRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_DeviceId",
                table: "AttendanceTransactions",
                column: "DeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_Employee_Date_Time",
                table: "AttendanceTransactions",
                columns: new[] { "EmployeeId", "AttendanceDate", "TransactionTimeUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_EnteredByUserId",
                table: "AttendanceTransactions",
                column: "EnteredByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_IsManual",
                table: "AttendanceTransactions",
                column: "IsManual");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_IsVerified",
                table: "AttendanceTransactions",
                column: "IsVerified");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_TransactionType",
                table: "AttendanceTransactions",
                column: "TransactionType");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceTransactions_VerifiedByUserId",
                table: "AttendanceTransactions",
                column: "VerifiedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditChanges_AuditLogId",
                table: "AuditChanges",
                column: "AuditLogId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditChanges_FieldName",
                table: "AuditChanges",
                column: "FieldName");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_ActorUserId",
                table: "AuditLogs",
                column: "ActorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_CreatedAtUtc",
                table: "AuditLogs",
                column: "CreatedAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_EntityName",
                table: "AuditLogs",
                column: "EntityName");

            migrationBuilder.CreateIndex(
                name: "IX_BlacklistedTokens_ExpiresAtUtc",
                table: "BlacklistedTokens",
                column: "ExpiresAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_BlacklistedTokens_TokenId",
                table: "BlacklistedTokens",
                column: "TokenId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BlacklistedTokens_UserId",
                table: "BlacklistedTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_Code",
                table: "Branches",
                column: "Code",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_BranchId_Code",
                table: "Departments",
                columns: new[] { "BranchId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Departments_BranchId_IsActive_SortOrder",
                table: "Departments",
                columns: new[] { "BranchId", "IsActive", "SortOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Departments_ManagerEmployeeId",
                table: "Departments",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_ParentDepartmentId",
                table: "Departments",
                column: "ParentDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ApprovalStatus",
                table: "EmployeeExcuses",
                column: "ApprovalStatus");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ApprovedById",
                table: "EmployeeExcuses",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_EmployeeId",
                table: "EmployeeExcuses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_EmployeeId_ExcuseDate",
                table: "EmployeeExcuses",
                columns: new[] { "EmployeeId", "ExcuseDate" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseDate",
                table: "EmployeeExcuses",
                column: "ExcuseDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseDate_ApprovalStatus",
                table: "EmployeeExcuses",
                columns: new[] { "ExcuseDate", "ApprovalStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeExcuses_ExcuseType",
                table: "EmployeeExcuses",
                column: "ExcuseType");

            migrationBuilder.CreateIndex(
                name: "UQ_EmployeeExcuses_EmployeeId_ExcuseDate_TimeRange",
                table: "EmployeeExcuses",
                columns: new[] { "EmployeeId", "ExcuseDate", "StartTime", "EndTime" },
                unique: true,
                filter: "\"IsDeleted\" = false AND \"ApprovalStatus\" IN (1, 2)");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_BranchId_EmployeeNumber",
                table: "Employees",
                columns: new[] { "BranchId", "EmployeeNumber" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId1",
                table: "Employees",
                column: "DepartmentId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagerEmployeeId",
                table: "Employees",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeUserLinks_EmployeeId",
                table: "EmployeeUserLinks",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeUserLinks_UserId",
                table: "EmployeeUserLinks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_DateRange",
                table: "EmployeeVacations",
                columns: new[] { "StartDate", "EndDate" },
                filter: "\"IsDeleted\" = false AND \"IsApproved\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_Employee_EndDate",
                table: "EmployeeVacations",
                columns: new[] { "EmployeeId", "EndDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_Employee_StartDate",
                table: "EmployeeVacations",
                columns: new[] { "EmployeeId", "StartDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_EmployeeId",
                table: "EmployeeVacations",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_IsApproved",
                table: "EmployeeVacations",
                column: "IsApproved",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVacations_VacationTypeId",
                table: "EmployeeVacations",
                column: "VacationTypeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_BranchId",
                table: "ExcusePolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_BranchId_IsActive",
                table: "ExcusePolicies",
                columns: new[] { "BranchId", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_ExcusePolicies_IsActive",
                table: "ExcusePolicies",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_LoginAttempts_AttemptedAtUtc",
                table: "LoginAttempts",
                column: "AttemptedAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_LoginAttempts_IpAddress",
                table: "LoginAttempts",
                column: "IpAddress");

            migrationBuilder.CreateIndex(
                name: "IX_LoginAttempts_UserId",
                table: "LoginAttempts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LoginAttempts_Username",
                table: "LoginAttempts",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_LoginAttempts_Username_AttemptedAtUtc",
                table: "LoginAttempts",
                columns: new[] { "Username", "AttemptedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_BranchId",
                table: "OffDays",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_DateRange",
                table: "OffDays",
                columns: new[] { "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_EffectiveDates",
                table: "OffDays",
                columns: new[] { "EffectiveFromDate", "EffectiveToDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_IsActive",
                table: "OffDays",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_IsCompanyWide",
                table: "OffDays",
                column: "IsCompanyWide");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_OffDayType",
                table: "OffDays",
                column: "OffDayType");

            migrationBuilder.CreateIndex(
                name: "IX_OffDays_Priority",
                table: "OffDays",
                column: "Priority");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeConfigurations_EffectiveDates",
                table: "OvertimeConfigurations",
                columns: new[] { "EffectiveFromDate", "EffectiveToDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeConfigurations_IsActive",
                table: "OvertimeConfigurations",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_PasswordHistory_ChangedAtUtc",
                table: "PasswordHistory",
                column: "ChangedAtUtc");

            migrationBuilder.CreateIndex(
                name: "IX_PasswordHistory_UserId",
                table: "PasswordHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_Key",
                table: "Permissions",
                column: "Key",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_BranchId",
                table: "PublicHolidays",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_EffectiveYears",
                table: "PublicHolidays",
                columns: new[] { "EffectiveFromYear", "EffectiveToYear" });

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_HolidayType",
                table: "PublicHolidays",
                column: "HolidayType");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_IsActive",
                table: "PublicHolidays",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_IsNational",
                table: "PublicHolidays",
                column: "IsNational");

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_MonthDay",
                table: "PublicHolidays",
                columns: new[] { "Month", "Day" });

            migrationBuilder.CreateIndex(
                name: "IX_PublicHolidays_SpecificDate",
                table: "PublicHolidays",
                column: "SpecificDate");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Token",
                table: "RefreshTokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkPolicies_BranchId",
                table: "RemoteWorkPolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_ApprovedByUserId",
                table: "RemoteWorkRequests",
                column: "ApprovedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_CreatedByUserId",
                table: "RemoteWorkRequests",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_EmployeeId",
                table: "RemoteWorkRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_RemoteWorkRequests_RemoteWorkPolicyId",
                table: "RemoteWorkRequests",
                column: "RemoteWorkPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Name",
                table: "Roles",
                column: "Name",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_Branch_EffectiveFromDate",
                table: "ShiftAssignments",
                columns: new[] { "AssignmentType", "BranchId", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false AND \"AssignmentType\" = 3 AND \"BranchId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_BranchId",
                table: "ShiftAssignments",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_Department_EffectiveFromDate",
                table: "ShiftAssignments",
                columns: new[] { "AssignmentType", "DepartmentId", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false AND \"AssignmentType\" = 2 AND \"DepartmentId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_DepartmentId",
                table: "ShiftAssignments",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_Employee_EffectiveFromDate",
                table: "ShiftAssignments",
                columns: new[] { "AssignmentType", "EmployeeId", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false AND \"AssignmentType\" = 1 AND \"EmployeeId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_EmployeeId",
                table: "ShiftAssignments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_Priority_Status_EffectiveFromDate",
                table: "ShiftAssignments",
                columns: new[] { "Priority", "Status", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_ShiftId",
                table: "ShiftAssignments",
                column: "ShiftId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftAssignments_Status_EffectiveFromDate_EffectiveToDate",
                table: "ShiftAssignments",
                columns: new[] { "Status", "EffectiveFromDate", "EffectiveToDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftPeriods_ShiftId_PeriodOrder",
                table: "ShiftPeriods",
                columns: new[] { "ShiftId", "PeriodOrder" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_Name",
                table: "Shifts",
                column: "Name",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TwoFactorBackupCodes_UserId",
                table: "TwoFactorBackupCodes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBranchScopes_BranchId",
                table: "UserBranchScopes",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_UserSessions_UserId",
                table: "UserSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId",
                table: "VacationTypes",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId_IsActive",
                table: "VacationTypes",
                columns: new[] { "BranchId", "IsActive" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_BranchId_Name_Unique",
                table: "VacationTypes",
                columns: new[] { "BranchId", "Name" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_VacationTypes_IsActive",
                table: "VacationTypes",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDays_AttendanceRecordId",
                table: "WorkingDays",
                column: "AttendanceRecordId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDays_CoreHoursCompliant",
                table: "WorkingDays",
                column: "CoreHoursCompliant");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingDays_IsCalculationComplete",
                table: "WorkingDays",
                column: "IsCalculationComplete");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttendanceTransactions");

            migrationBuilder.DropTable(
                name: "AuditChanges");

            migrationBuilder.DropTable(
                name: "BlacklistedTokens");

            migrationBuilder.DropTable(
                name: "EmployeeExcuses");

            migrationBuilder.DropTable(
                name: "EmployeeUserLinks");

            migrationBuilder.DropTable(
                name: "EmployeeVacations");

            migrationBuilder.DropTable(
                name: "ExcusePolicies");

            migrationBuilder.DropTable(
                name: "LoginAttempts");

            migrationBuilder.DropTable(
                name: "OffDays");

            migrationBuilder.DropTable(
                name: "OvertimeConfigurations");

            migrationBuilder.DropTable(
                name: "PasswordHistory");

            migrationBuilder.DropTable(
                name: "PublicHolidays");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "ShiftPeriods");

            migrationBuilder.DropTable(
                name: "TwoFactorBackupCodes");

            migrationBuilder.DropTable(
                name: "UserBranchScopes");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.DropTable(
                name: "WorkingDays");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "VacationTypes");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "AttendanceRecords");

            migrationBuilder.DropTable(
                name: "RemoteWorkRequests");

            migrationBuilder.DropTable(
                name: "ShiftAssignments");

            migrationBuilder.DropTable(
                name: "RemoteWorkPolicies");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Branches");
        }
    }
}
