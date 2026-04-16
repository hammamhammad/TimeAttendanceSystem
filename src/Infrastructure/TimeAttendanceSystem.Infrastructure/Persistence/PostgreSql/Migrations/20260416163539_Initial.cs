using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AnnouncementCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Icon = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncementCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssetCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ParentCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    DepreciationRatePercent = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    DefaultUsefulLifeMonths = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssetCategories_AssetCategories_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "AssetCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CareerPaths",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerPaths", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompetencyFrameworks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetencyFrameworks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomReportDefinitions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DataSource = table.Column<int>(type: "integer", nullable: false),
                    ColumnsJson = table.Column<string>(type: "character varying(10000)", maxLength: 10000, nullable: false),
                    FiltersJson = table.Column<string>(type: "character varying(10000)", maxLength: 10000, nullable: true),
                    SortingJson = table.Column<string>(type: "character varying(5000)", maxLength: 5000, nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportDefinitions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DocumentCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServicePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CountryCode = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    MinimumServiceYearsForEligibility = table.Column<decimal>(type: "numeric(5,2)", nullable: false, defaultValue: 0m),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServicePolicies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    RequiresReceipt = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileAttachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OriginalFileName = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    StoredFileName = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    FilePath = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ContentType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    EntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EntityId = table.Column<long>(type: "bigint", nullable: true),
                    FieldName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    UploadedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Category = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileAttachments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceProviders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Insurance provider name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Insurance provider name in Arabic"),
                    ContactPerson = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Contact person name"),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true, comment: "Contact phone number"),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Contact email address"),
                    PolicyNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Insurance policy number"),
                    InsuranceType = table.Column<int>(type: "integer", nullable: false, comment: "Type of insurance (Health, Life, Dental, etc.)"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this provider is active"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceProviders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobGrades",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    MinSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    MidSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    MaxSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobGrades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LifecycleAutomationAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AutomationType = table.Column<int>(type: "integer", nullable: false),
                    SourceEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SourceEntityId = table.Column<long>(type: "bigint", nullable: false),
                    TargetEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    TargetEntityId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TriggeredAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TriggeredByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ContextJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LifecycleAutomationAudits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoanTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    MaxRepaymentMonths = table.Column<int>(type: "integer", nullable: false),
                    InterestRate = table.Column<decimal>(type: "numeric(8,4)", nullable: false),
                    RequiresGuarantor = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanTypes", x => x.Id);
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    SurveyType = table.Column<int>(type: "integer", nullable: false),
                    IsAnonymous = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    EstimatedDurationMinutes = table.Column<int>(type: "integer", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TenantSettings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FiscalYearStartMonth = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false, defaultValue: "01"),
                    WeekStartDay = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Sunday"),
                    DateFormat = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "dd/MM/yyyy"),
                    TimeFormat = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "HH:mm"),
                    NumberFormat = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "en-US"),
                    EnableGpsAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableNfcAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableBiometricAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    EnableManualAttendance = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCheckOutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCheckOutTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    LateGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false),
                    EarlyLeaveGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false),
                    TrackBreakTime = table.Column<bool>(type: "boolean", nullable: false),
                    MinimumWorkingHoursForPresent = table.Column<int>(type: "integer", nullable: false),
                    AllowNegativeLeaveBalance = table.Column<bool>(type: "boolean", nullable: false),
                    RequireAttachmentForSickLeave = table.Column<bool>(type: "boolean", nullable: false),
                    MinDaysBeforeLeaveRequest = table.Column<int>(type: "integer", nullable: false),
                    AllowHalfDayLeave = table.Column<bool>(type: "boolean", nullable: false),
                    AllowLeaveEncashment = table.Column<bool>(type: "boolean", nullable: false),
                    LeaveYearStart = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: true),
                    PayrollCutOffDay = table.Column<int>(type: "integer", nullable: false),
                    PayrollCurrency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    EnableEndOfServiceCalc = table.Column<bool>(type: "boolean", nullable: false),
                    SalaryCalculationBasis = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Calendar"),
                    AutoApproveAfterTimeout = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultApprovalTimeoutHours = table.Column<int>(type: "integer", nullable: false),
                    AllowSelfApproval = table.Column<bool>(type: "boolean", nullable: false),
                    RequireApprovalComments = table.Column<bool>(type: "boolean", nullable: false),
                    EnableEmailNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    EnablePushNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    EnableSmsNotifications = table.Column<bool>(type: "boolean", nullable: false),
                    NotifyManagerOnLeaveRequest = table.Column<bool>(type: "boolean", nullable: false),
                    NotifyEmployeeOnApproval = table.Column<bool>(type: "boolean", nullable: false),
                    DailyAttendanceSummaryEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    MobileCheckInEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    RequireNfcForMobile = table.Column<bool>(type: "boolean", nullable: false),
                    RequireGpsForMobile = table.Column<bool>(type: "boolean", nullable: false),
                    AllowMockLocation = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordExpiryDays = table.Column<int>(type: "integer", nullable: false),
                    MaxLoginAttempts = table.Column<int>(type: "integer", nullable: false),
                    SessionTimeoutMinutes = table.Column<int>(type: "integer", nullable: false),
                    Require2FA = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHistoryCount = table.Column<int>(type: "integer", nullable: false),
                    PasswordMinLength = table.Column<int>(type: "integer", nullable: false, defaultValue: 8),
                    LoginLockoutPolicyJson = table.Column<string>(type: "jsonb", nullable: true),
                    ContractExpiryAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "30,15,7"),
                    VisaExpiryAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "90,60,30,15,7"),
                    ReviewReminderDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "7,3,1"),
                    LoanRepaymentReminderDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 7),
                    FrozenWorkflowCleanupDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 90),
                    DefaultProbationDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 90),
                    MaxUploadSizeMb = table.Column<int>(type: "integer", nullable: false, defaultValue: 10),
                    MaxVacationDaysPerRequest = table.Column<int>(type: "integer", nullable: false, defaultValue: 365),
                    MaxVacationFuturePlanningYears = table.Column<int>(type: "integer", nullable: false, defaultValue: 2),
                    MaxShiftGracePeriodMinutes = table.Column<int>(type: "integer", nullable: false, defaultValue: 120),
                    ExcuseBackwardWindowDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 365),
                    ExcuseForwardWindowDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 30),
                    OvertimeConfigMaxFutureDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 30),
                    AttendanceCorrectionMaxRetroactiveDays = table.Column<int>(type: "integer", nullable: false, defaultValue: 30),
                    DocumentExpiryAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "30,15,7"),
                    AssetWarrantyExpiryAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "30,15,7,1"),
                    AssetOverdueReturnAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "1,3,7,14,30"),
                    TrainingSessionReminderDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "7,3,1"),
                    SuccessionPlanReminderDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "30,7,1"),
                    TimesheetSubmissionReminderDaysBefore = table.Column<int>(type: "integer", nullable: false, defaultValue: 2),
                    GrievanceSlaAlertDaysCsv = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "3,1"),
                    NotificationRecipientRolesCsv = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, defaultValue: "HRManager,SystemAdmin"),
                    LifecycleAutomationEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCreateOnboardingOnOfferAcceptance = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultOnboardingTemplateId = table.Column<long>(type: "bigint", nullable: true),
                    CreateEmployeeInactiveAtOfferAcceptance = table.Column<bool>(type: "boolean", nullable: false),
                    AutoActivateEmployeeOnOnboardingComplete = table.Column<bool>(type: "boolean", nullable: false),
                    OnboardingCompletionRequiresAllRequiredTasks = table.Column<bool>(type: "boolean", nullable: false),
                    OnboardingCompletionRequiresAllRequiredDocuments = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCreateTerminationOnResignationApproved = table.Column<bool>(type: "boolean", nullable: false),
                    AutoCreateClearanceOnTermination = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultClearanceTemplateId = table.Column<long>(type: "bigint", nullable: true),
                    AutoSuspendEmployeeOnTerminationCreated = table.Column<bool>(type: "boolean", nullable: false),
                    RequireClearanceCompleteBeforeFinalSettlement = table.Column<bool>(type: "boolean", nullable: false),
                    AutoEnableFinalSettlementCalcOnClearanceComplete = table.Column<bool>(type: "boolean", nullable: false),
                    AutoDeactivateEmployeeOnFinalSettlementPaid = table.Column<bool>(type: "boolean", nullable: false),
                    ContractExpiredAction = table.Column<string>(type: "text", nullable: false),
                    WorkflowFallbackApproverRole = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, defaultValue: "HRManager"),
                    WorkflowFallbackApproverUserId = table.Column<long>(type: "bigint", nullable: true),
                    MaxWorkflowDelegationDepth = table.Column<int>(type: "integer", nullable: false, defaultValue: 2),
                    MaxWorkflowResubmissions = table.Column<int>(type: "integer", nullable: false, defaultValue: 3),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainingCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrainingPrograms",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TargetAudience = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    TargetAudienceAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    TotalDurationHours = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingPrograms", x => x.Id);
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
                    IsSystemUser = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnnouncementCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ContentAr = table.Column<string>(type: "text", nullable: true),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TargetAudience = table.Column<int>(type: "integer", nullable: false),
                    TargetIds = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    PublishedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    PublishedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ScheduledPublishDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsPinned = table.Column<bool>(type: "boolean", nullable: false),
                    RequiresAcknowledgment = table.Column<bool>(type: "boolean", nullable: false),
                    SendNotification = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announcements_AnnouncementCategories_AnnouncementCategoryId",
                        column: x => x.AnnouncementCategoryId,
                        principalTable: "AnnouncementCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                name: "Competencies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompetencyFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CategoryAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Competencies_CompetencyFrameworks_CompetencyFrameworkId",
                        column: x => x.CompetencyFrameworkId,
                        principalTable: "CompetencyFrameworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScheduledReports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomReportDefinitionId = table.Column<long>(type: "bigint", nullable: false),
                    CronExpression = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EmailRecipients = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    Format = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    LastRunAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    NextRunAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastRunStatus = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduledReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduledReports_CustomReportDefinitions_CustomReportDefini~",
                        column: x => x.CustomReportDefinitionId,
                        principalTable: "CustomReportDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    DocumentCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Version = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RequiresAcknowledgment = table.Column<bool>(type: "boolean", nullable: false),
                    PublishedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyPolicies_DocumentCategories_DocumentCategoryId",
                        column: x => x.DocumentCategoryId,
                        principalTable: "DocumentCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServicePolicyTiers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EndOfServicePolicyId = table.Column<long>(type: "bigint", nullable: false),
                    MinYearsInclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    MaxYearsExclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    MonthsPerYearMultiplier = table.Column<decimal>(type: "numeric(6,3)", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServicePolicyTiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EndOfServicePolicyTiers_EndOfServicePolicies_EndOfServicePo~",
                        column: x => x.EndOfServicePolicyId,
                        principalTable: "EndOfServicePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServiceResignationDeductionTiers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EndOfServicePolicyId = table.Column<long>(type: "bigint", nullable: false),
                    MinYearsInclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: false),
                    MaxYearsExclusive = table.Column<decimal>(type: "numeric(6,2)", nullable: true),
                    DeductionFraction = table.Column<decimal>(type: "numeric(6,4)", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServiceResignationDeductionTiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EndOfServiceResignationDeductionTiers_EndOfServicePolicies_~",
                        column: x => x.EndOfServicePolicyId,
                        principalTable: "EndOfServicePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BenefitPlans",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    BenefitType = table.Column<int>(type: "integer", nullable: false),
                    InsuranceProviderId = table.Column<long>(type: "bigint", nullable: true),
                    PlanYear = table.Column<int>(type: "integer", nullable: false),
                    EffectiveStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EmployeePremiumAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    EmployerPremiumAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR"),
                    CoverageDetails = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    CoverageDetailsAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    MaxDependents = table.Column<int>(type: "integer", nullable: true),
                    DependentPremiumAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenefitPlans_InsuranceProviders_InsuranceProviderId",
                        column: x => x.InsuranceProviderId,
                        principalTable: "InsuranceProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CareerPathSteps",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CareerPathId = table.Column<long>(type: "bigint", nullable: false),
                    FromJobGradeId = table.Column<long>(type: "bigint", nullable: true),
                    ToJobGradeId = table.Column<long>(type: "bigint", nullable: false),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    TypicalDurationMonths = table.Column<int>(type: "integer", nullable: true),
                    RequiredCompetencies = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    StepOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerPathSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerPathSteps_CareerPaths_CareerPathId",
                        column: x => x.CareerPathId,
                        principalTable: "CareerPaths",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CareerPathSteps_JobGrades_FromJobGradeId",
                        column: x => x.FromJobGradeId,
                        principalTable: "JobGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CareerPathSteps_JobGrades_ToJobGradeId",
                        column: x => x.ToJobGradeId,
                        principalTable: "JobGrades",
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                name: "SurveyDistributions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SurveyTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    TargetAudience = table.Column<int>(type: "integer", nullable: false),
                    TargetIds = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReminderFrequencyDays = table.Column<int>(type: "integer", nullable: true),
                    LastReminderSentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalRecipients = table.Column<int>(type: "integer", nullable: false),
                    TotalResponses = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyDistributions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyDistributions_SurveyTemplates_SurveyTemplateId",
                        column: x => x.SurveyTemplateId,
                        principalTable: "SurveyTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SurveyQuestions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SurveyTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    QuestionText = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    QuestionTextAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    QuestionType = table.Column<int>(type: "integer", nullable: false),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    SectionName = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    SectionNameAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    OptionsJson = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    MinValue = table.Column<int>(type: "integer", nullable: true),
                    MaxValue = table.Column<int>(type: "integer", nullable: true),
                    MinLabel = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    MaxLabel = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    MinLabelAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    MaxLabelAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyQuestions_SurveyTemplates_SurveyTemplateId",
                        column: x => x.SurveyTemplateId,
                        principalTable: "SurveyTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingCourses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Provider = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    ProviderAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    DeliveryMethod = table.Column<int>(type: "integer", nullable: false),
                    DurationHours = table.Column<decimal>(type: "numeric(8,2)", nullable: false),
                    MaxParticipants = table.Column<int>(type: "integer", nullable: true),
                    Cost = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Prerequisites = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    PrerequisitesAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CertificationAwarded = table.Column<bool>(type: "boolean", nullable: false),
                    CertificationName = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    CertificationValidityMonths = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingCourses_TrainingCategories_TrainingCategoryId",
                        column: x => x.TrainingCategoryId,
                        principalTable: "TrainingCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ApprovalDelegations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DelegatorUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User delegating their authority"),
                    DelegateUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User receiving delegated authority"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Start of delegation period"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "End of delegation period"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether delegation is currently active"),
                    EntityTypesJson = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Comma-separated entity types (null = all)"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for delegation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalDelegations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalDelegations_DelegateUser",
                        column: x => x.DelegateUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApprovalDelegations_DelegatorUser",
                        column: x => x.DelegatorUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "NotificationBroadcasts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Broadcast title in English"),
                    TitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Broadcast title in Arabic"),
                    Message = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false, comment: "Broadcast message in English"),
                    MessageAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false, comment: "Broadcast message in Arabic"),
                    TargetType = table.Column<int>(type: "integer", nullable: false, comment: "Target type: All, Branch, Department, Employees"),
                    TargetIds = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "JSON array of target IDs based on TargetType"),
                    Channel = table.Column<int>(type: "integer", nullable: false, comment: "Delivery channel: InApp, Push, Both"),
                    SentByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "Admin user who initiated the broadcast"),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When broadcast was initiated"),
                    TotalRecipients = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Total number of intended recipients"),
                    DeliveredCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Number of successfully delivered notifications"),
                    ActionUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Optional URL to navigate on notification tap"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationBroadcasts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationBroadcasts_Users",
                        column: x => x.SentByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "PushNotificationTokens",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who owns this device"),
                    DeviceToken = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, comment: "Firebase Cloud Messaging device token"),
                    DeviceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Unique identifier for the device"),
                    Platform = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, comment: "Device platform: android or ios"),
                    DeviceModel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Device model/name for admin reference"),
                    RegisteredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When token was registered"),
                    LastUsedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When token was last used for notification"),
                    AppVersion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "App version when token was registered"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether token is active for notifications"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PushNotificationTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PushNotificationTokens_Users",
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                name: "SavedDashboards",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    LayoutJson = table.Column<string>(type: "text", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedDashboards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedDashboards_Users_UserId",
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
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Seniority priority within role; higher wins under FixedPriority strategy (v13.6)")
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
                name: "WorkflowRoleAssignmentCursors",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<long>(type: "bigint", nullable: false, comment: "Role whose user pool is rotated by this cursor"),
                    LastAssignedUserId = table.Column<long>(type: "bigint", nullable: true, comment: "Most recently assigned user id (null before first rotation)"),
                    LastAssignedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp of the last advance — diagnostic only"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowRoleAssignmentCursors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowRoleAssignmentCursors_Roles",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkflowRoleAssignmentCursors_Users",
                        column: x => x.LastAssignedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AnnouncementAttachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnnouncementId = table.Column<long>(type: "bigint", nullable: false),
                    FileAttachmentId = table.Column<long>(type: "bigint", nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncementAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnouncementAttachments_Announcements_AnnouncementId",
                        column: x => x.AnnouncementId,
                        principalTable: "Announcements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnnouncementAttachments_FileAttachments_FileAttachmentId",
                        column: x => x.FileAttachmentId,
                        principalTable: "FileAttachments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BenefitPlanOptions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BenefitPlanId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    EmployeeCost = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    EmployerCost = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR"),
                    CoverageLevel = table.Column<int>(type: "integer", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitPlanOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenefitPlanOptions_BenefitPlans_BenefitPlanId",
                        column: x => x.BenefitPlanId,
                        principalTable: "BenefitPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyResponses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SurveyDistributionId = table.Column<long>(type: "bigint", nullable: false),
                    SurveyQuestionId = table.Column<long>(type: "bigint", nullable: false),
                    ParticipantToken = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ResponseText = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ResponseValue = table.Column<int>(type: "integer", nullable: true),
                    SelectedOptions = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyResponses_SurveyDistributions_SurveyDistributionId",
                        column: x => x.SurveyDistributionId,
                        principalTable: "SurveyDistributions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SurveyResponses_SurveyQuestions_SurveyQuestionId",
                        column: x => x.SurveyQuestionId,
                        principalTable: "SurveyQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingProgramCourses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingProgramId = table.Column<long>(type: "bigint", nullable: false),
                    TrainingCourseId = table.Column<long>(type: "bigint", nullable: false),
                    SequenceOrder = table.Column<int>(type: "integer", nullable: false),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingProgramCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingProgramCourses_TrainingCourses_TrainingCourseId",
                        column: x => x.TrainingCourseId,
                        principalTable: "TrainingCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingProgramCourses_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who receives this notification"),
                    Type = table.Column<int>(type: "integer", nullable: false, comment: "Type of notification"),
                    TitleEn = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Notification title in English"),
                    TitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Notification title in Arabic"),
                    MessageEn = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false, comment: "Notification message in English"),
                    MessageAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false, comment: "Notification message in Arabic"),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether notification has been read"),
                    ReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When notification was read"),
                    EntityType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "Type of related entity (e.g., Vacation, Excuse)"),
                    EntityId = table.Column<long>(type: "bigint", nullable: true, comment: "ID of the related entity"),
                    ActionUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "URL to navigate when notification is clicked"),
                    Channel = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Delivery channel: InApp, Push, Both"),
                    BroadcastId = table.Column<long>(type: "bigint", nullable: true, comment: "ID of the broadcast this notification belongs to"),
                    DeepLink = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Deep link path for mobile app navigation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_NotificationBroadcasts",
                        column: x => x.BroadcastId,
                        principalTable: "NotificationBroadcasts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Notifications_Users",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AllowanceAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CalculationType = table.Column<int>(type: "integer", nullable: false),
                    Percentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    AssignedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AllowanceRequestId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowanceAssignments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AllowanceChangeLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: false),
                    ChangeType = table.Column<int>(type: "integer", nullable: false),
                    PreviousAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    NewAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    PreviousPercentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    NewPercentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AllowanceRequestId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedEntityId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ChangedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowanceChangeLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AllowancePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    EligibilityRules = table.Column<string>(type: "text", nullable: true),
                    RequiresApproval = table.Column<bool>(type: "boolean", nullable: false),
                    MinAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    MaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    MaxPercentageOfBasic = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    IsTemporaryAllowed = table.Column<bool>(type: "boolean", nullable: false),
                    MaxDurationMonths = table.Column<int>(type: "integer", nullable: true),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowancePolicies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AllowanceRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: false),
                    AllowancePolicyId = table.Column<long>(type: "bigint", nullable: true),
                    RequestType = table.Column<int>(type: "integer", nullable: false),
                    RequestedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    RequestedPercentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Justification = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    SupportingDocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApprovalComments = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowanceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AllowanceRequests_AllowancePolicies_AllowancePolicyId",
                        column: x => x.AllowancePolicyId,
                        principalTable: "AllowancePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "AllowanceTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    DefaultCalculationType = table.Column<int>(type: "integer", nullable: false),
                    DefaultAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    DefaultPercentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true),
                    IsTaxable = table.Column<bool>(type: "boolean", nullable: false),
                    IsSocialInsurable = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllowanceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnalyticsSnapshots",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SnapshotDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    MetricType = table.Column<int>(type: "integer", nullable: false),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    Value = table.Column<decimal>(type: "numeric(18,4)", precision: 18, scale: 4, nullable: false),
                    AdditionalDataJson = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    PeriodType = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalyticsSnapshots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnnouncementAcknowledgments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AnnouncementId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AcknowledgedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IpAddress = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnouncementAcknowledgments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnouncementAcknowledgments_Announcements_AnnouncementId",
                        column: x => x.AnnouncementId,
                        principalTable: "Announcements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AssetAssignments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssetId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AssignedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpectedReturnDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ActualReturnDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    AssignmentNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ReturnNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ReturnCondition = table.Column<int>(type: "integer", nullable: true),
                    AssignedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ReturnReceivedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetAssignments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssetMaintenanceRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssetId = table.Column<long>(type: "bigint", nullable: false),
                    MaintenanceType = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Cost = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Vendor = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetMaintenanceRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AssetCategoryId = table.Column<long>(type: "bigint", nullable: false),
                    AssetTag = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    SerialNumber = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Model = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Manufacturer = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PurchasePrice = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    WarrantyExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    LocationDescription = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Condition = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assets_AssetCategories_AssetCategoryId",
                        column: x => x.AssetCategoryId,
                        principalTable: "AssetCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AttendanceCorrectionRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CorrectionDate = table.Column<DateTime>(type: "date", nullable: false),
                    CorrectionTime = table.Column<TimeOnly>(type: "time", nullable: false),
                    CorrectionType = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    AttachmentPath = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovalStatus = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    ApprovedById = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ProcessingNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedTransactionId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceCorrectionRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceCorrectionRequests_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 2),
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
                name: "AttendanceVerificationLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee attempting check-in/out"),
                    BranchId = table.Column<long>(type: "bigint", nullable: false, comment: "Branch where verification was attempted"),
                    AttemptedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Timestamp of verification attempt"),
                    TransactionType = table.Column<int>(type: "integer", nullable: false, comment: "Type of transaction: CheckIn, CheckOut, BreakStart, BreakEnd"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Outcome: Success or Failed"),
                    FailureReason = table.Column<int>(type: "integer", nullable: true, comment: "Specific reason for failure if applicable"),
                    DeviceLatitude = table.Column<double>(type: "double precision", nullable: true, comment: "Latitude reported by employee's device"),
                    DeviceLongitude = table.Column<double>(type: "double precision", nullable: true, comment: "Longitude reported by employee's device"),
                    DistanceFromBranch = table.Column<double>(type: "double precision", nullable: true, comment: "Calculated distance in meters from branch"),
                    ScannedTagUid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "NFC tag UID that was scanned"),
                    ExpectedTagUids = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Expected tag UIDs for the branch (comma-separated)"),
                    DeviceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Unique identifier of the mobile device"),
                    DeviceModel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Device model/manufacturer"),
                    DevicePlatform = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true, comment: "Device platform: ios or android"),
                    AppVersion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "Version of the mobile app used"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag - should remain false for audit logs"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceVerificationLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BankTransferFiles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollPeriodId = table.Column<long>(type: "bigint", nullable: false, comment: "Payroll period identifier"),
                    FileName = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, comment: "Generated file name"),
                    FileFormat = table.Column<int>(type: "integer", nullable: false, comment: "Bank file format (CSV, WPS, SAM, etc.)"),
                    GeneratedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When the file was generated"),
                    GeneratedByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who generated the file"),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total transfer amount in the file"),
                    RecordCount = table.Column<int>(type: "integer", nullable: false, comment: "Number of transfer records in the file"),
                    FileUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "URL or path to the generated file"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankTransferFiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BenefitClaims",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BenefitEnrollmentId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ClaimDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ClaimAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ApprovedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR"),
                    ClaimType = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ProcessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProcessedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BenefitDependents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BenefitEnrollmentId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeDependentId = table.Column<long>(type: "bigint", nullable: true),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FirstNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Relationship = table.Column<int>(type: "integer", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    NationalId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CoverageStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CoverageEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AdditionalPremium = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitDependents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BenefitEligibilityRules",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BenefitPlanId = table.Column<long>(type: "bigint", nullable: false),
                    RuleType = table.Column<int>(type: "integer", nullable: false),
                    MinServiceMonths = table.Column<int>(type: "integer", nullable: true),
                    MinJobGradeLevel = table.Column<int>(type: "integer", nullable: true),
                    MaxJobGradeLevel = table.Column<int>(type: "integer", nullable: true),
                    EmploymentStatusRequired = table.Column<int>(type: "integer", nullable: true),
                    ContractTypeRequired = table.Column<int>(type: "integer", nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitEligibilityRules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenefitEligibilityRules_BenefitPlans_BenefitPlanId",
                        column: x => x.BenefitPlanId,
                        principalTable: "BenefitPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BenefitEnrollments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    BenefitPlanId = table.Column<long>(type: "bigint", nullable: false),
                    BenefitPlanOptionId = table.Column<long>(type: "bigint", nullable: true),
                    OpenEnrollmentPeriodId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    EnrollmentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TerminationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TerminationReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    EmployeeMonthlyContribution = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    EmployerMonthlyContribution = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR"),
                    LifeEventType = table.Column<int>(type: "integer", nullable: true),
                    LifeEventDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitEnrollments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenefitEnrollments_BenefitPlanOptions_BenefitPlanOptionId",
                        column: x => x.BenefitPlanOptionId,
                        principalTable: "BenefitPlanOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BenefitEnrollments_BenefitPlans_BenefitPlanId",
                        column: x => x.BenefitPlanId,
                        principalTable: "BenefitPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    Latitude = table.Column<double>(type: "double precision", nullable: true),
                    Longitude = table.Column<double>(type: "double precision", nullable: true),
                    GeofenceRadiusMeters = table.Column<int>(type: "integer", nullable: false),
                    ManagerEmployeeId = table.Column<long>(type: "bigint", nullable: true, comment: "FK to designated branch-manager Employee, used by workflow engine for BranchManager approver type (v13.6)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BranchSettingsOverrides",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    EnableGpsAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableNfcAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableBiometricAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    EnableManualAttendance = table.Column<bool>(type: "boolean", nullable: true),
                    AutoCheckOutEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    AutoCheckOutTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    LateGracePeriodMinutes = table.Column<int>(type: "integer", nullable: true),
                    EarlyLeaveGracePeriodMinutes = table.Column<int>(type: "integer", nullable: true),
                    TrackBreakTime = table.Column<bool>(type: "boolean", nullable: true),
                    MinimumWorkingHoursForPresent = table.Column<int>(type: "integer", nullable: true),
                    MobileCheckInEnabled = table.Column<bool>(type: "boolean", nullable: true),
                    RequireNfcForMobile = table.Column<bool>(type: "boolean", nullable: true),
                    RequireGpsForMobile = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BranchSettingsOverrides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BranchSettingsOverrides_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                name: "ExpensePolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    MaxClaimPerMonth = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    MaxClaimPerYear = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    RequiresApproval = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpensePolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpensePolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LetterTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LetterType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Content = table.Column<string>(type: "text", nullable: true),
                    ContentAr = table.Column<string>(type: "text", nullable: true),
                    HeaderLogoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    FooterText = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    FooterTextAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LetterTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LetterTemplates_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LoanPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    LoanTypeId = table.Column<long>(type: "bigint", nullable: false),
                    MaxConcurrentLoans = table.Column<int>(type: "integer", nullable: false),
                    MinServiceMonths = table.Column<int>(type: "integer", nullable: false),
                    MaxPercentageOfSalary = table.Column<decimal>(type: "numeric(8,4)", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanPolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LoanPolicies_LoanTypes_LoanTypeId",
                        column: x => x.LoanTypeId,
                        principalTable: "LoanTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NfcTags",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagUid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Unique hardware identifier of the NFC tag"),
                    BranchId = table.Column<long>(type: "bigint", nullable: false, comment: "Branch this tag is registered to"),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Descriptive name for tag location (e.g., Main Entrance)"),
                    IsWriteProtected = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether tag has been permanently write-protected"),
                    LockedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Timestamp when tag was write-protected"),
                    LockedByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who applied write protection"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether tag is active for verification"),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Lifecycle status: Unregistered(0), Registered(1), Active(2), Disabled(3), Lost(4)"),
                    EncryptedPayload = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "HMAC-signed payload written to the physical tag during provisioning"),
                    VerificationHash = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "SHA256 hash of the encrypted payload for integrity verification"),
                    LastScannedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Timestamp of the last successful scan"),
                    ScanCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Total number of successful scans"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NfcTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NfcTags_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "OpenEnrollmentPeriods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    PlanYear = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    AllowLifeEventChanges = table.Column<bool>(type: "boolean", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenEnrollmentPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenEnrollmentPeriods_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PayrollCalendarPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    BasisType = table.Column<int>(type: "integer", nullable: false),
                    FixedBasisDays = table.Column<int>(type: "integer", nullable: true),
                    StandardHoursPerDay = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    TreatPublicHolidaysAsPaid = table.Column<bool>(type: "boolean", nullable: false),
                    EffectiveFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveToDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollCalendarPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollCalendarPolicies_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PerformanceReviewCycles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CycleType = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SelfAssessmentDeadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ManagerAssessmentDeadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CompetencyFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceReviewCycles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceReviewCycles_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PerformanceReviewCycles_CompetencyFrameworks_CompetencyFram~",
                        column: x => x.CompetencyFrameworkId,
                        principalTable: "CompetencyFrameworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                name: "SalaryStructures",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Salary structure name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Salary structure name in Arabic"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Description of the salary structure"),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Description in Arabic"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this salary structure is active"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryStructures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryStructures_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SocialInsuranceConfigs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Social insurance configuration name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Name in Arabic"),
                    EmployeeContributionRate = table.Column<decimal>(type: "numeric(8,4)", nullable: false, comment: "Employee contribution rate (e.g., 0.0975 for 9.75%)"),
                    EmployerContributionRate = table.Column<decimal>(type: "numeric(8,4)", nullable: false, comment: "Employer contribution rate (e.g., 0.1175 for 11.75%)"),
                    MaxInsurableSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Maximum salary subject to social insurance"),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date when this configuration becomes effective"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this configuration is active"),
                    AppliesToNationalityCode = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialInsuranceConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialInsuranceConfigs_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TaxConfigurations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Tax configuration name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Tax configuration name in Arabic"),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date when this tax configuration becomes effective"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this tax configuration is active"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxConfigurations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaxConfigurations_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TimesheetPeriods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PeriodType = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SubmissionDeadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimesheetPeriods_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrainingSessions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingCourseId = table.Column<long>(type: "bigint", nullable: false),
                    TrainingProgramId = table.Column<long>(type: "bigint", nullable: true),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Location = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    LocationAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    InstructorName = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    InstructorNameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "interval", nullable: true),
                    EndTime = table.Column<TimeSpan>(type: "interval", nullable: true),
                    MaxParticipants = table.Column<int>(type: "integer", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_TrainingCourses_TrainingCourseId",
                        column: x => x.TrainingCourseId,
                        principalTable: "TrainingCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                name: "VacationTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    AllowHalfDay = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether half-day leave is allowed for this vacation type"),
                    AllowEncashment = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether leave encashment is allowed for this vacation type"),
                    EncashmentMaxDays = table.Column<int>(type: "integer", nullable: true, comment: "Maximum number of days that can be encashed (null = no limit)"),
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
                name: "WorkflowDefinitions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Display name of the workflow definition"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic display name of the workflow definition"),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Description of the workflow purpose"),
                    DescriptionAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Arabic description of the workflow"),
                    EntityType = table.Column<int>(type: "integer", nullable: false, comment: "Type of entity this workflow applies to"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether workflow is active for new requests"),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether this is the default workflow for entity type"),
                    BranchId = table.Column<long>(type: "bigint", nullable: true, comment: "Branch scope (null = organization-wide)"),
                    Version = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Version number incremented on modifications"),
                    Priority = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Priority for workflow selection"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowDefinitions_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DepartmentSettingsOverrides",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: false),
                    DefaultShiftId = table.Column<long>(type: "bigint", nullable: true),
                    RequireApprovalComments = table.Column<bool>(type: "boolean", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentSettingsOverrides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepartmentSettingsOverrides_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentSettingsOverrides_Shifts_DefaultShiftId",
                        column: x => x.DefaultShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    MiddleName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    MiddleNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    MaritalStatus = table.Column<int>(type: "integer", nullable: true),
                    Nationality = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    NationalityAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Religion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PassportNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PassportExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    NumberOfDependents = table.Column<int>(type: "integer", nullable: true),
                    JobGradeId = table.Column<long>(type: "bigint", nullable: true),
                    CostCenter = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentContractType = table.Column<int>(type: "integer", nullable: true),
                    ProbationEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProbationStatus = table.Column<int>(type: "integer", nullable: false),
                    NoticePeriodDays = table.Column<int>(type: "integer", nullable: true),
                    TerminationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastWorkingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsSuspended = table.Column<bool>(type: "boolean", nullable: false),
                    IsPreHire = table.Column<bool>(type: "boolean", nullable: false),
                    OnboardingCompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DepartmentId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                    table.ForeignKey(
                        name: "FK_Employees_JobGrades_JobGradeId",
                        column: x => x.JobGradeId,
                        principalTable: "JobGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingTemplates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingTemplates_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OnboardingTemplates_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TrainingBudgets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    FiscalYear = table.Column<int>(type: "integer", nullable: false),
                    AllocatedBudget = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    SpentAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingBudgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingBudgets_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TrainingBudgets_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SalaryComponents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SalaryStructureId = table.Column<long>(type: "bigint", nullable: false),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Component name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Component name in Arabic"),
                    ComponentType = table.Column<int>(type: "integer", nullable: false, comment: "Type of salary component (Earning, Deduction, etc.)"),
                    CalculationType = table.Column<int>(type: "integer", nullable: false, comment: "How the component amount is calculated"),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: true, comment: "Fixed amount for the component"),
                    Percentage = table.Column<decimal>(type: "numeric(8,4)", nullable: true, comment: "Percentage of base salary"),
                    IsRecurring = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this component recurs every pay period"),
                    IsTaxable = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this component is subject to tax"),
                    IsSocialInsurable = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this component is subject to social insurance"),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false, comment: "Display order for UI rendering"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryComponents_AllowanceTypes_AllowanceTypeId",
                        column: x => x.AllowanceTypeId,
                        principalTable: "AllowanceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SalaryComponents_SalaryStructures",
                        column: x => x.SalaryStructureId,
                        principalTable: "SalaryStructures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaxBrackets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TaxConfigurationId = table.Column<long>(type: "bigint", nullable: false, comment: "Tax configuration identifier"),
                    MinAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Minimum income amount for this bracket"),
                    MaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Maximum income amount for this bracket"),
                    Rate = table.Column<decimal>(type: "numeric(18,4)", nullable: false, comment: "Tax rate for this bracket"),
                    FixedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Fixed tax amount for this bracket"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxBrackets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaxBrackets_TaxConfigurations",
                        column: x => x.TaxConfigurationId,
                        principalTable: "TaxConfigurations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LeaveAccrualPolicies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AccrualFrequency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false, defaultValue: "Monthly"),
                    IsMonthlyAccrual = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    ProrateMidYearHires = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    MinimumServiceMonths = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    MaxAccrualCap = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    AllowsCarryOver = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    MaxCarryOverDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    ExpiresAtYearEnd = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CarryOverExpiryMonths = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    EffectiveStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EffectiveEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveAccrualPolicies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveAccrualPolicies_VacationTypes_VacationTypeId",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowSteps",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowDefinitionId = table.Column<long>(type: "bigint", nullable: false, comment: "Parent workflow definition"),
                    StepOrder = table.Column<int>(type: "integer", nullable: false, comment: "Sequential order within workflow"),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Display name of the step"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic display name"),
                    StepType = table.Column<int>(type: "integer", nullable: false, comment: "Type of workflow step"),
                    ApproverType = table.Column<int>(type: "integer", nullable: false, comment: "How approver is determined"),
                    ApproverRoleId = table.Column<long>(type: "bigint", nullable: true, comment: "Role ID for role-based approval"),
                    ApproverUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User ID for specific user approval"),
                    ConditionJson = table.Column<string>(type: "jsonb", nullable: true, comment: "JSON condition for conditional steps"),
                    TimeoutHours = table.Column<int>(type: "integer", nullable: true, comment: "Hours before escalation"),
                    EscalationStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Step to escalate to on timeout"),
                    TimeoutAction = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Action to take when step times out (0=Expire, 1=Escalate, 2=AutoApprove, 3=AutoReject)"),
                    OnApproveNextStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Next step on approval"),
                    OnRejectNextStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Next step on rejection"),
                    AllowDelegation = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether step allows delegation"),
                    NotifyOnAction = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Send notifications for actions"),
                    NotifyRequesterOnReach = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Notify requester when step is reached"),
                    ApproverInstructions = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Instructions for approver"),
                    ApproverInstructionsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Arabic instructions for approver"),
                    RequireCommentsOnApprove = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Require comments when approving"),
                    RequireCommentsOnReject = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Require comments when rejecting"),
                    RoleAssignmentStrategy = table.Column<int>(type: "integer", nullable: false, defaultValue: 3, comment: "Role-based approver-selection strategy (v13.6): 1=FirstMatch, 2=RoundRobin, 3=LeastPendingApprovals, 4=FixedPriority"),
                    AllowReturnForCorrection = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether approver can use the non-final Return-for-Correction action (v13.6)"),
                    ValidationRuleCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Identifier of the IWorkflowValidationRule to execute on Validation steps (v13.6)"),
                    ValidationConfigJson = table.Column<string>(type: "jsonb", nullable: true, comment: "Per-step configuration passed to the validation rule (v13.6)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_EscalationStep",
                        column: x => x.EscalationStepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_Roles",
                        column: x => x.ApproverRoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_Users",
                        column: x => x.ApproverUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSteps_WorkflowDefinitions",
                        column: x => x.WorkflowDefinitionId,
                        principalTable: "WorkflowDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Candidates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FirstNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LastNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Phone = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    NationalId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<int>(type: "integer", nullable: true),
                    Nationality = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    NationalityAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ResumeUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    LinkedInUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    PortfolioUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Source = table.Column<int>(type: "integer", nullable: false),
                    ReferredByEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    CurrentCompany = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CurrentJobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    YearsOfExperience = table.Column<int>(type: "integer", nullable: true),
                    Skills = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ConvertedToEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Candidates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Candidates_Employees_ConvertedToEmployeeId",
                        column: x => x.ConvertedToEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Candidates_Employees_ReferredByEmployeeId",
                        column: x => x.ReferredByEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EmergencyContacts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Relationship = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AlternatePhone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyContacts_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeAddresses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AddressType = table.Column<int>(type: "integer", nullable: false),
                    AddressLine1 = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    AddressLine2 = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CityAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    State = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    StateAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PostalCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CountryAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeAddresses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeBankDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    BankName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    BankNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    AccountHolderName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    AccountNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IBAN = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SwiftCode = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    BranchName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    IsPrimary = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeBankDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeBankDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeCertifications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TrainingCourseId = table.Column<long>(type: "bigint", nullable: true),
                    CertificationName = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CertificationNameAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IssuingAuthority = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    IssuingAuthorityAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    CertificationNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IssueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    RenewalRequired = table.Column<bool>(type: "boolean", nullable: false),
                    RenewalReminderDays = table.Column<int>(type: "integer", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeCertifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeCertifications_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeCertifications_TrainingCourses_TrainingCourseId",
                        column: x => x.TrainingCourseId,
                        principalTable: "TrainingCourses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeContracts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ContractNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ContractType = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RenewalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AutoRenew = table.Column<bool>(type: "boolean", nullable: false),
                    BasicSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    ProbationPeriodDays = table.Column<int>(type: "integer", nullable: true),
                    ProbationEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProbationStatus = table.Column<int>(type: "integer", nullable: false),
                    NoticePeriodDays = table.Column<int>(type: "integer", nullable: true),
                    Terms = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    TermsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PreviousContractId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeContracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeContracts_EmployeeContracts_PreviousContractId",
                        column: x => x.PreviousContractId,
                        principalTable: "EmployeeContracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EmployeeContracts_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeDependents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FirstNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    LastNameAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Relationship = table.Column<int>(type: "integer", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Gender = table.Column<int>(type: "integer", nullable: true),
                    NationalId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    IsEmergencyContact = table.Column<bool>(type: "boolean", nullable: false),
                    IsBeneficiary = table.Column<bool>(type: "boolean", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDependents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDependents_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeDocuments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    DocumentCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    DocumentName = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    DocumentNameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    DocumentType = table.Column<int>(type: "integer", nullable: false),
                    FileUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IssuedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    VerificationStatus = table.Column<int>(type: "integer", nullable: false),
                    VerifiedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDocuments_DocumentCategories_DocumentCategoryId",
                        column: x => x.DocumentCategoryId,
                        principalTable: "DocumentCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EmployeeDocuments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeEducations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Level = table.Column<int>(type: "integer", nullable: false),
                    InstitutionName = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    InstitutionNameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Degree = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DegreeAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    FieldOfStudy = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    FieldOfStudyAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Grade = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CertificateUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsHighestDegree = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeEducations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeInsurances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    InsuranceProviderId = table.Column<long>(type: "bigint", nullable: false, comment: "Insurance provider identifier"),
                    MembershipNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Insurance membership number"),
                    InsuranceClass = table.Column<int>(type: "integer", nullable: false, comment: "Insurance class/tier"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Insurance coverage start date"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Insurance coverage end date (null = ongoing)"),
                    MonthlyPremium = table.Column<decimal>(type: "numeric(18,2)", nullable: true, comment: "Monthly premium amount"),
                    EmployeeContribution = table.Column<decimal>(type: "numeric(18,2)", nullable: true, comment: "Employee contribution amount"),
                    EmployerContribution = table.Column<decimal>(type: "numeric(18,2)", nullable: true, comment: "Employer contribution amount"),
                    IncludesDependents = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether coverage includes dependents"),
                    CoveredDependentsCount = table.Column<int>(type: "integer", nullable: true, comment: "Number of covered dependents"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this insurance is active"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    EmployeeId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeInsurances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeInsurances_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeInsurances_Employees_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeInsurances_InsuranceProviders",
                        column: x => x.InsuranceProviderId,
                        principalTable: "InsuranceProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeProfileChanges",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ChangeType = table.Column<int>(type: "integer", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsApplied = table.Column<bool>(type: "boolean", nullable: false),
                    AppliedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FieldName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    OldValue = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    NewValue = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    OldDisplayValue = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    NewDisplayValue = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsCorrection = table.Column<bool>(type: "boolean", nullable: false),
                    RelatedEntityId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedEntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeProfileChanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeProfileChanges_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSalaries",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    SalaryStructureId = table.Column<long>(type: "bigint", nullable: false, comment: "Salary structure identifier"),
                    BaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Base salary amount"),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false, defaultValue: "SAR", comment: "Currency code (e.g., SAR, USD)"),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date when this salary becomes effective"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Date when this salary ends (null = current)"),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Reason for salary change"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsCurrent = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this is the current active salary"),
                    EmployeeId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_Employees_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_SalaryStructures",
                        column: x => x.SalaryStructureId,
                        principalTable: "SalaryStructures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "EmployeeVisas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    VisaType = table.Column<int>(type: "integer", nullable: false),
                    VisaNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SponsorName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IssueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IssuingCountry = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeVisas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeVisas_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeWorkExperiences",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CompanyName = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    CompanyNameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Responsibilities = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ReasonForLeaving = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ReferenceContactName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ReferenceContactPhone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    CertificateUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWorkExperiences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeWorkExperiences_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Grievances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GrievanceNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    GrievanceType = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    SubjectAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    DescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsConfidential = table.Column<bool>(type: "boolean", nullable: false),
                    AssignedToUserId = table.Column<long>(type: "bigint", nullable: true),
                    AgainstEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    ResolutionSummary = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ResolutionSummaryAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ResolutionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FiledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ClosedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    EscalatedToUserId = table.Column<long>(type: "bigint", nullable: true),
                    EscalationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    EmployeeId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grievances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grievances_Employees_AgainstEmployeeId",
                        column: x => x.AgainstEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Grievances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Grievances_Employees_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KeyPositions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    JobGradeId = table.Column<long>(type: "bigint", nullable: true),
                    CurrentHolderId = table.Column<long>(type: "bigint", nullable: true),
                    CriticalityLevel = table.Column<int>(type: "integer", nullable: false),
                    VacancyRisk = table.Column<int>(type: "integer", nullable: false),
                    ImpactOfVacancy = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ImpactOfVacancyAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RequiredCompetencies = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    MinExperienceYears = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeyPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KeyPositions_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KeyPositions_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_KeyPositions_Employees_CurrentHolderId",
                        column: x => x.CurrentHolderId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_KeyPositions_JobGrades_JobGradeId",
                        column: x => x.JobGradeId,
                        principalTable: "JobGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LeaveBalances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    EntitledDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    AccruedDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0m),
                    UsedDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0m),
                    PendingDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0m),
                    AdjustedDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0m),
                    LastAccrualDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveBalances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveBalances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LeaveBalances_VacationTypes_VacationTypeId",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LeaveEntitlements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    AnnualDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    CarryOverDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false, defaultValue: 0m),
                    MaxCarryOverDays = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    ExpiresAtYearEnd = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    EffectiveStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EffectiveEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveEntitlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveEntitlements_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LeaveEntitlements_VacationTypes_VacationTypeId",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OnCallSchedules",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OnCallType = table.Column<int>(type: "integer", nullable: false),
                    ShiftId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    NotesAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnCallSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnCallSchedules_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OnCallSchedules_Shifts_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PolicyAcknowledgments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyPolicyId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AcknowledgedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IpAddress = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyAcknowledgments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyAcknowledgments_CompanyPolicies_CompanyPolicyId",
                        column: x => x.CompanyPolicyId,
                        principalTable: "CompanyPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PolicyAcknowledgments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ClientName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ClientNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ManagerEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    BudgetHours = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    IsChargeable = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Projects_Employees_ManagerEmployeeId",
                        column: x => x.ManagerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                name: "SurveyParticipants",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SurveyDistributionId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    InvitedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    AnonymousToken = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyParticipants_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SurveyParticipants_SurveyDistributions_SurveyDistributionId",
                        column: x => x.SurveyDistributionId,
                        principalTable: "SurveyDistributions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TalentProfiles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    PerformanceRating = table.Column<int>(type: "integer", nullable: true),
                    PotentialRating = table.Column<int>(type: "integer", nullable: false),
                    NineBoxPosition = table.Column<int>(type: "integer", nullable: false),
                    ReadinessLevel = table.Column<int>(type: "integer", nullable: false),
                    RetentionRisk = table.Column<int>(type: "integer", nullable: false),
                    CareerAspiration = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CareerAspirationAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    StrengthsSummary = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DevelopmentAreas = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    LastAssessmentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AssessedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsHighPotential = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TalentProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TalentProfiles_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TrainingAttendanceRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingSessionId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AttendanceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CheckInTime = table.Column<TimeSpan>(type: "interval", nullable: true),
                    CheckOutTime = table.Column<TimeSpan>(type: "interval", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingAttendanceRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingAttendanceRecords_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrainingAttendanceRecords_TrainingSessions_TrainingSessionId",
                        column: x => x.TrainingSessionId,
                        principalTable: "TrainingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingEvaluations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TrainingSessionId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    OverallRating = table.Column<int>(type: "integer", nullable: false),
                    ContentRating = table.Column<int>(type: "integer", nullable: true),
                    InstructorRating = table.Column<int>(type: "integer", nullable: true),
                    MaterialRating = table.Column<int>(type: "integer", nullable: true),
                    Comments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CommentsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingEvaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingEvaluations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrainingEvaluations_TrainingSessions_TrainingSessionId",
                        column: x => x.TrainingSessionId,
                        principalTable: "TrainingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingProcesses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    OnboardingTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpectedCompletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ActualCompletionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BuddyEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    MentorEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    TotalTasks = table.Column<int>(type: "integer", nullable: false),
                    CompletedTasks = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    OfferLetterId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingProcesses_Employees_BuddyEmployeeId",
                        column: x => x.BuddyEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OnboardingProcesses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OnboardingProcesses_Employees_MentorEmployeeId",
                        column: x => x.MentorEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OnboardingProcesses_OnboardingTemplates_OnboardingTemplateId",
                        column: x => x.OnboardingTemplateId,
                        principalTable: "OnboardingTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingTemplateTasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OnboardingTemplateId = table.Column<long>(type: "bigint", nullable: false),
                    TaskName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TaskNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    DueDaysAfterJoining = table.Column<int>(type: "integer", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingTemplateTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingTemplateTasks_OnboardingTemplates_OnboardingTempl~",
                        column: x => x.OnboardingTemplateId,
                        principalTable: "OnboardingTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowInstances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowDefinitionId = table.Column<long>(type: "bigint", nullable: false, comment: "Workflow definition being executed"),
                    EntityType = table.Column<int>(type: "integer", nullable: false, comment: "Type of entity being processed"),
                    EntityId = table.Column<long>(type: "bigint", nullable: false, comment: "ID of the entity being processed"),
                    CurrentStepId = table.Column<long>(type: "bigint", nullable: true, comment: "Current step in workflow (null if completed)"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Current workflow status"),
                    RequestedByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who initiated the workflow"),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When workflow was initiated"),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When workflow was completed"),
                    FinalOutcome = table.Column<int>(type: "integer", nullable: true, comment: "Final outcome of workflow"),
                    ContextJson = table.Column<string>(type: "jsonb", nullable: true, comment: "Runtime context variables"),
                    FinalComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Comments from final action"),
                    CompletedByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who completed the workflow"),
                    DefinitionVersion = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Snapshotted workflow definition version at instance creation (v13.6)"),
                    DefinitionSnapshotJson = table.Column<string>(type: "jsonb", nullable: false, defaultValueSql: "'{}'::jsonb", comment: "Frozen snapshot of workflow definition consumed for step transitions (v13.6)"),
                    ReturnedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC when an approver returned the workflow for correction (v13.6)"),
                    ReturnedByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "Approver who returned the workflow for correction (v13.6)"),
                    ResubmissionCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Resubmission counter; capped by TenantSettings.MaxWorkflowResubmissions (v13.6)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_CompletedByUser",
                        column: x => x.CompletedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_CurrentStep",
                        column: x => x.CurrentStepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_RequestedByUser",
                        column: x => x.RequestedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_ReturnedByUser",
                        column: x => x.ReturnedByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowInstances_WorkflowDefinitions",
                        column: x => x.WorkflowDefinitionId,
                        principalTable: "WorkflowDefinitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSalaryComponents",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeSalaryId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee salary record identifier"),
                    SalaryComponentId = table.Column<long>(type: "bigint", nullable: false, comment: "Salary component identifier"),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Calculated component amount"),
                    OverrideAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true, comment: "Manual override amount (null = use calculated)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaryComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryComponents_EmployeeSalaries",
                        column: x => x.EmployeeSalaryId,
                        principalTable: "EmployeeSalaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaryComponents_SalaryComponents",
                        column: x => x.SalaryComponentId,
                        principalTable: "SalaryComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GrievanceAttachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GrievanceId = table.Column<long>(type: "bigint", nullable: false),
                    FileAttachmentId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrievanceAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrievanceAttachments_FileAttachments_FileAttachmentId",
                        column: x => x.FileAttachmentId,
                        principalTable: "FileAttachments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GrievanceAttachments_Grievances_GrievanceId",
                        column: x => x.GrievanceId,
                        principalTable: "Grievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GrievanceNotes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GrievanceId = table.Column<long>(type: "bigint", nullable: false),
                    AuthorUserId = table.Column<long>(type: "bigint", nullable: false),
                    Content = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    IsInternal = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrievanceNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrievanceNotes_Grievances_GrievanceId",
                        column: x => x.GrievanceId,
                        principalTable: "Grievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Investigations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InvestigationNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SubjectEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    DescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IsConfidential = table.Column<bool>(type: "boolean", nullable: false),
                    InvestigatorUserId = table.Column<long>(type: "bigint", nullable: false),
                    RelatedGrievanceId = table.Column<long>(type: "bigint", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Findings = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    FindingsAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Recommendation = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    RecommendationAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Investigations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Investigations_Employees_SubjectEmployeeId",
                        column: x => x.SubjectEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Investigations_Grievances_RelatedGrievanceId",
                        column: x => x.RelatedGrievanceId,
                        principalTable: "Grievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SuccessionPlans",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    KeyPositionId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ReviewedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuccessionPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuccessionPlans_KeyPositions_KeyPositionId",
                        column: x => x.KeyPositionId,
                        principalTable: "KeyPositions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LeaveTransactions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LeaveBalanceId = table.Column<long>(type: "bigint", nullable: false),
                    TransactionType = table.Column<string>(type: "text", nullable: false),
                    Days = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    ReferenceType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ReferenceId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    TransactionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    BalanceAfterTransaction = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveTransactions_LeaveBalances_LeaveBalanceId",
                        column: x => x.LeaveBalanceId,
                        principalTable: "LeaveBalances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    Code = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    BudgetHours = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TalentSkills",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TalentProfileId = table.Column<long>(type: "bigint", nullable: false),
                    SkillName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    SkillNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ProficiencyLevel = table.Column<int>(type: "integer", nullable: false),
                    YearsOfExperience = table.Column<int>(type: "integer", nullable: true),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    VerifiedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    VerifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TalentSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TalentSkills_TalentProfiles_TalentProfileId",
                        column: x => x.TalentProfileId,
                        principalTable: "TalentProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingDocuments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OnboardingProcessId = table.Column<long>(type: "bigint", nullable: false),
                    DocumentType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    DocumentTypeAr = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    DocumentName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    FileUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    SubmittedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    VerifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    VerifiedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingDocuments_OnboardingProcesses_OnboardingProcessId",
                        column: x => x.OnboardingProcessId,
                        principalTable: "OnboardingProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnboardingTasks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OnboardingProcessId = table.Column<long>(type: "bigint", nullable: false),
                    OnboardingTemplateTaskId = table.Column<long>(type: "bigint", nullable: true),
                    TaskName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TaskNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    AssignedToEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardingTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnboardingTasks_Employees_AssignedToEmployeeId",
                        column: x => x.AssignedToEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OnboardingTasks_OnboardingProcesses_OnboardingProcessId",
                        column: x => x.OnboardingProcessId,
                        principalTable: "OnboardingProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OnboardingTasks_OnboardingTemplateTasks_OnboardingTemplateT~",
                        column: x => x.OnboardingTemplateTaskId,
                        principalTable: "OnboardingTemplateTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
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
                    table.ForeignKey(
                        name: "FK_EmployeeExcuses_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EmployeePromotions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    OldJobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    NewJobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    OldJobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    NewJobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    OldGrade = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    NewGrade = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OldDepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    NewDepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    OldBaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    NewBaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    RequestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePromotions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePromotions_Departments_NewDepartmentId",
                        column: x => x.NewDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePromotions_Departments_OldDepartmentId",
                        column: x => x.OldDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePromotions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePromotions_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeTransfers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    FromBranchId = table.Column<long>(type: "bigint", nullable: false),
                    ToBranchId = table.Column<long>(type: "bigint", nullable: false),
                    FromDepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    ToDepartmentId = table.Column<long>(type: "bigint", nullable: true),
                    FromJobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ToJobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    FromJobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ToJobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    RequestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeTransfers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_Branches_FromBranchId",
                        column: x => x.FromBranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_Branches_ToBranchId",
                        column: x => x.ToBranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_Departments_FromDepartmentId",
                        column: x => x.FromDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_Departments_ToDepartmentId",
                        column: x => x.ToDepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeTransfers_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true, comment: "Workflow instance ID for approval tracking"),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsHalfDay = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether this is a half-day leave"),
                    HalfDayType = table.Column<int>(type: "integer", nullable: true, comment: "Half-day type: Morning or Afternoon (nullable)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
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
                    table.ForeignKey(
                        name: "FK_EmployeeVacations_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseClaims",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ClaimNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    ExpensePolicyId = table.Column<long>(type: "bigint", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpenseClaims_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExpenseClaims_ExpensePolicies_ExpensePolicyId",
                        column: x => x.ExpensePolicyId,
                        principalTable: "ExpensePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ExpenseClaims_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "JobRequisitions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false),
                    DepartmentId = table.Column<long>(type: "bigint", nullable: false),
                    RequisitionNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    JobGradeId = table.Column<long>(type: "bigint", nullable: true),
                    EmploymentType = table.Column<int>(type: "integer", nullable: false),
                    NumberOfPositions = table.Column<int>(type: "integer", nullable: false),
                    FilledPositions = table.Column<int>(type: "integer", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    BudgetedSalaryMin = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    BudgetedSalaryMax = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    RequiredSkills = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RequiredQualifications = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RequiredQualificationsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RequiredExperienceYears = table.Column<int>(type: "integer", nullable: true),
                    TargetHireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Justification = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    JustificationAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsReplacement = table.Column<bool>(type: "boolean", nullable: false),
                    ReplacingEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RequestedByEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobRequisitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_Employees_ReplacingEmployeeId",
                        column: x => x.ReplacingEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_Employees_RequestedByEmployeeId",
                        column: x => x.RequestedByEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_JobGrades_JobGradeId",
                        column: x => x.JobGradeId,
                        principalTable: "JobGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_JobRequisitions_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LetterRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    LetterType = table.Column<int>(type: "integer", nullable: false),
                    Purpose = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    PurposeAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    AdditionalNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    GeneratedDocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    GeneratedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TemplateId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LetterRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LetterRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LetterRequests_LetterTemplates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "LetterTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LetterRequests_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LoanApplications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    LoanTypeId = table.Column<long>(type: "bigint", nullable: false),
                    LoanPolicyId = table.Column<long>(type: "bigint", nullable: true),
                    RequestedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ApprovedAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    RepaymentMonths = table.Column<int>(type: "integer", nullable: false),
                    MonthlyInstallment = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    InterestRate = table.Column<decimal>(type: "numeric(8,4)", nullable: false),
                    Purpose = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    PurposeAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OutstandingBalance = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanApplications_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LoanApplications_LoanPolicies_LoanPolicyId",
                        column: x => x.LoanPolicyId,
                        principalTable: "LoanPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LoanApplications_LoanTypes_LoanTypeId",
                        column: x => x.LoanTypeId,
                        principalTable: "LoanTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LoanApplications_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PayrollPeriods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false, comment: "Branch identifier"),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Payroll period name"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Payroll period name in Arabic"),
                    PeriodType = table.Column<int>(type: "integer", nullable: false, comment: "Payroll period type (Monthly, Bi-Weekly, etc.)"),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Period start date"),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Period end date"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Payroll period status (Draft, Processing, etc.)"),
                    TotalGross = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total gross earnings for the period"),
                    TotalDeductions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total deductions for the period"),
                    TotalNet = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total net salary for the period"),
                    EmployeeCount = table.Column<int>(type: "integer", nullable: false, comment: "Number of employees in this payroll period"),
                    ProcessedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ProcessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the payroll was processed"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the payroll was approved"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true, comment: "Workflow instance ID for approval tracking"),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    LockedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LockedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollPeriods_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayrollPeriods_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
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
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
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
                    table.ForeignKey(
                        name: "FK_RemoteWorkRequests_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ResignationRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    ResignationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date resignation was submitted"),
                    LastWorkingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Last working date for the employee"),
                    NoticePeriodDays = table.Column<int>(type: "integer", nullable: false, comment: "Required notice period in days"),
                    WaivedNoticeDays = table.Column<int>(type: "integer", nullable: false, comment: "Number of notice days waived"),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for resignation"),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for resignation in Arabic"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Resignation request status"),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Reason for rejection if applicable"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the resignation was approved"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true, comment: "Workflow instance ID for approval tracking"),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResignationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResignationRequests_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ResignationRequests_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ShiftSwapRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    SwapWithEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    OriginalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SwapDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OriginalShiftId = table.Column<long>(type: "bigint", nullable: true),
                    SwapShiftId = table.Column<long>(type: "bigint", nullable: true),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftSwapRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftSwapRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShiftSwapRequests_Employees_SwapWithEmployeeId",
                        column: x => x.SwapWithEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShiftSwapRequests_Shifts_OriginalShiftId",
                        column: x => x.OriginalShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ShiftSwapRequests_Shifts_SwapShiftId",
                        column: x => x.SwapShiftId,
                        principalTable: "Shifts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ShiftSwapRequests_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Timesheets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TimesheetPeriodId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    TotalHours = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    RegularHours = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    OvertimeHours = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    RejectedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timesheets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Timesheets_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Timesheets_TimesheetPeriods_TimesheetPeriodId",
                        column: x => x.TimesheetPeriodId,
                        principalTable: "TimesheetPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Timesheets_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TrainingEnrollments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TrainingSessionId = table.Column<long>(type: "bigint", nullable: true),
                    TrainingProgramId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    EnrolledByUserId = table.Column<long>(type: "bigint", nullable: true),
                    EnrolledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CancelledAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CancellationReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingEnrollments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingEnrollments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TrainingEnrollments_TrainingPrograms_TrainingProgramId",
                        column: x => x.TrainingProgramId,
                        principalTable: "TrainingPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TrainingEnrollments_TrainingSessions_TrainingSessionId",
                        column: x => x.TrainingSessionId,
                        principalTable: "TrainingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TrainingEnrollments_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowStepExecutions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: false, comment: "Parent workflow instance"),
                    StepId = table.Column<long>(type: "bigint", nullable: false, comment: "Workflow step being executed"),
                    AssignedToUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User assigned to approve"),
                    AssignedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When step was assigned"),
                    ActionTakenByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who took the action"),
                    ActionTakenAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When action was taken"),
                    Action = table.Column<int>(type: "integer", nullable: true, comment: "Action taken on this step"),
                    Comments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Comments provided with action"),
                    DelegatedToUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User delegated to"),
                    DueAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Due date for action"),
                    IsDelegated = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether created by delegation"),
                    DelegatedFromExecutionId = table.Column<long>(type: "bigint", nullable: true, comment: "Original execution delegated from"),
                    ReminderSent = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether reminder was sent"),
                    ReminderSentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When reminder was sent"),
                    ValidationDetailsJson = table.Column<string>(type: "jsonb", nullable: true, comment: "Validation-rule output for Validation steps (v13.6)"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowStepExecutions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_ActionTakenByUser",
                        column: x => x.ActionTakenByUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_AssignedToUser",
                        column: x => x.AssignedToUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_DelegatedFromExecution",
                        column: x => x.DelegatedFromExecutionId,
                        principalTable: "WorkflowStepExecutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_DelegatedToUser",
                        column: x => x.DelegatedToUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkflowStepExecutions_WorkflowSteps",
                        column: x => x.StepId,
                        principalTable: "WorkflowSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DisciplinaryActions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ActionNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ActionType = table.Column<int>(type: "integer", nullable: false),
                    Severity = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    SubjectAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    DescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    IncidentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ActionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsConfidential = table.Column<bool>(type: "boolean", nullable: false),
                    RelatedGrievanceId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedInvestigationId = table.Column<long>(type: "bigint", nullable: true),
                    IssuedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    AcknowledgedByEmployee = table.Column<bool>(type: "boolean", nullable: false),
                    AcknowledgedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AppealSubmitted = table.Column<bool>(type: "boolean", nullable: false),
                    AppealNotes = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    AppealDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AppealResolvedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AppealOutcome = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RelatedTerminationId = table.Column<long>(type: "bigint", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    EmployeeId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisciplinaryActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DisciplinaryActions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DisciplinaryActions_Employees_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DisciplinaryActions_Grievances_RelatedGrievanceId",
                        column: x => x.RelatedGrievanceId,
                        principalTable: "Grievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_DisciplinaryActions_Investigations_RelatedInvestigationId",
                        column: x => x.RelatedInvestigationId,
                        principalTable: "Investigations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "InvestigationAttachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InvestigationId = table.Column<long>(type: "bigint", nullable: false),
                    FileAttachmentId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestigationAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvestigationAttachments_FileAttachments_FileAttachmentId",
                        column: x => x.FileAttachmentId,
                        principalTable: "FileAttachments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InvestigationAttachments_Investigations_InvestigationId",
                        column: x => x.InvestigationId,
                        principalTable: "Investigations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvestigationNotes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InvestigationId = table.Column<long>(type: "bigint", nullable: false),
                    AuthorUserId = table.Column<long>(type: "bigint", nullable: false),
                    Content = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: false),
                    IsInternal = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestigationNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvestigationNotes_Investigations_InvestigationId",
                        column: x => x.InvestigationId,
                        principalTable: "Investigations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuccessionCandidates",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SuccessionPlanId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TalentProfileId = table.Column<long>(type: "bigint", nullable: true),
                    ReadinessLevel = table.Column<int>(type: "integer", nullable: false),
                    ReadinessTimeline = table.Column<int>(type: "integer", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    DevelopmentPlan = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DevelopmentPlanAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    GapAnalysis = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuccessionCandidates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuccessionCandidates_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SuccessionCandidates_SuccessionPlans_SuccessionPlanId",
                        column: x => x.SuccessionPlanId,
                        principalTable: "SuccessionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SuccessionCandidates_TalentProfiles_TalentProfileId",
                        column: x => x.TalentProfileId,
                        principalTable: "TalentProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SalaryAdjustments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    AdjustmentType = table.Column<int>(type: "integer", nullable: false),
                    CurrentBaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    CurrentTotalPackage = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    NewBaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    AdjustmentAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PercentageChange = table.Column<decimal>(type: "numeric(8,4)", nullable: false),
                    ComponentAdjustments = table.Column<string>(type: "text", nullable: true),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsApplied = table.Column<bool>(type: "boolean", nullable: false),
                    AppliedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Justification = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RelatedPromotionId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedContractId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedTransferId = table.Column<long>(type: "bigint", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryAdjustments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryAdjustments_EmployeeContracts_RelatedContractId",
                        column: x => x.RelatedContractId,
                        principalTable: "EmployeeContracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SalaryAdjustments_EmployeePromotions_RelatedPromotionId",
                        column: x => x.RelatedPromotionId,
                        principalTable: "EmployeePromotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SalaryAdjustments_EmployeeTransfers_RelatedTransferId",
                        column: x => x.RelatedTransferId,
                        principalTable: "EmployeeTransfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SalaryAdjustments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SalaryAdjustments_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CompensatoryOffs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    EarnedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    ReasonAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    UsedVacationId = table.Column<long>(type: "bigint", nullable: true),
                    HoursWorked = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompensatoryOffs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompensatoryOffs_EmployeeVacations_UsedVacationId",
                        column: x => x.UsedVacationId,
                        principalTable: "EmployeeVacations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CompensatoryOffs_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseClaimItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExpenseClaimId = table.Column<long>(type: "bigint", nullable: false),
                    ExpenseCategoryId = table.Column<long>(type: "bigint", nullable: true),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ReceiptUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ExpenseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseClaimItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpenseClaimItems_ExpenseCategories_ExpenseCategoryId",
                        column: x => x.ExpenseCategoryId,
                        principalTable: "ExpenseCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ExpenseClaimItems_ExpenseClaims_ExpenseClaimId",
                        column: x => x.ExpenseClaimId,
                        principalTable: "ExpenseClaims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobPostings",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobRequisitionId = table.Column<long>(type: "bigint", nullable: false),
                    PostingTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    PostingTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    ExternalDescription = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ExternalDescriptionAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Responsibilities = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ResponsibilitiesAr = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Benefits = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    BenefitsAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    LocationAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    IsInternal = table.Column<bool>(type: "boolean", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    PublishDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApplicationCount = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobPostings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobPostings_JobRequisitions_JobRequisitionId",
                        column: x => x.JobRequisitionId,
                        principalTable: "JobRequisitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayrollAdjustments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollPeriodId = table.Column<long>(type: "bigint", nullable: false, comment: "Payroll period identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    AdjustmentType = table.Column<int>(type: "integer", nullable: false, comment: "Type of payroll adjustment"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, comment: "Adjustment description"),
                    DescriptionAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Adjustment description in Arabic"),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Adjustment amount"),
                    IsRecurring = table.Column<bool>(type: "boolean", nullable: false, comment: "Whether this adjustment recurs"),
                    RecurringMonths = table.Column<int>(type: "integer", nullable: true, comment: "Number of months for recurring adjustment"),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Reason for the adjustment"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the adjustment was approved"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollAdjustments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollAdjustments_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayrollAdjustments_PayrollPeriods",
                        column: x => x.PayrollPeriodId,
                        principalTable: "PayrollPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollPeriodId = table.Column<long>(type: "bigint", nullable: false, comment: "Payroll period identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    BaseSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Employee base salary for this period"),
                    TotalAllowances = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total allowances amount"),
                    GrossEarnings = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Gross earnings before deductions"),
                    TotalDeductions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total deductions amount"),
                    TaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Tax deduction amount"),
                    SocialInsuranceEmployee = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Employee social insurance contribution"),
                    SocialInsuranceEmployer = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Employer social insurance contribution"),
                    OvertimePay = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Overtime pay amount"),
                    AbsenceDeduction = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Deduction for absences"),
                    LoanDeduction = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Loan repayment deduction"),
                    OtherDeductions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Other miscellaneous deductions"),
                    NetSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Net salary after all deductions"),
                    WorkingDays = table.Column<int>(type: "integer", nullable: false, comment: "Number of working days in period"),
                    PaidDays = table.Column<int>(type: "integer", nullable: false, comment: "Number of paid days"),
                    OvertimeHours = table.Column<decimal>(type: "numeric(8,2)", nullable: false, comment: "Total overtime hours worked"),
                    AbsentDays = table.Column<int>(type: "integer", nullable: false, comment: "Number of absent days"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Payroll record status"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    PaySlipGeneratedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When pay slip was generated"),
                    LockedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LockedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CalculationVersion = table.Column<int>(type: "integer", nullable: false),
                    LastRunId = table.Column<long>(type: "bigint", nullable: true),
                    CalculationBreakdownJson = table.Column<string>(type: "text", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRecords_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayrollRecords_PayrollPeriods",
                        column: x => x.PayrollPeriodId,
                        principalTable: "PayrollPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRunAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollPeriodId = table.Column<long>(type: "bigint", nullable: false),
                    RunType = table.Column<int>(type: "integer", nullable: false),
                    TriggeredByUserId = table.Column<long>(type: "bigint", nullable: true),
                    TriggeredByUsername = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    StartedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ConfigSnapshotJson = table.Column<string>(type: "jsonb", nullable: true),
                    EmployeesProcessed = table.Column<int>(type: "integer", nullable: false),
                    EmployeesFailed = table.Column<int>(type: "integer", nullable: false),
                    EmployeesSkipped = table.Column<int>(type: "integer", nullable: false),
                    WarningCount = table.Column<int>(type: "integer", nullable: false),
                    WarningsJson = table.Column<string>(type: "jsonb", nullable: true),
                    ErrorsJson = table.Column<string>(type: "jsonb", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRunAudits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRunAudits_PayrollPeriods_PayrollPeriodId",
                        column: x => x.PayrollPeriodId,
                        principalTable: "PayrollPeriods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TerminationRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    TerminationType = table.Column<int>(type: "integer", nullable: false, comment: "Type of termination (Resignation, Dismissal, etc.)"),
                    TerminationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date of termination"),
                    LastWorkingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Last working date"),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for termination"),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for termination in Arabic"),
                    ResignationRequestId = table.Column<long>(type: "bigint", nullable: true, comment: "Linked resignation request if applicable"),
                    ProcessedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TerminationRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TerminationRecords_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TerminationRecords_ResignationRequests",
                        column: x => x.ResignationRequestId,
                        principalTable: "ResignationRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TimesheetEntries",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TimesheetId = table.Column<long>(type: "bigint", nullable: false),
                    ProjectId = table.Column<long>(type: "bigint", nullable: false),
                    ProjectTaskId = table.Column<long>(type: "bigint", nullable: true),
                    EntryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Hours = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    OvertimeHours = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    IsAutoPopulated = table.Column<bool>(type: "boolean", nullable: false),
                    AttendanceRecordId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimesheetEntries_AttendanceRecords_AttendanceRecordId",
                        column: x => x.AttendanceRecordId,
                        principalTable: "AttendanceRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TimesheetEntries_ProjectTasks_ProjectTaskId",
                        column: x => x.ProjectTaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TimesheetEntries_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimesheetEntries_Timesheets_TimesheetId",
                        column: x => x.TimesheetId,
                        principalTable: "Timesheets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowSystemActionAudits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: false),
                    StepExecutionId = table.Column<long>(type: "bigint", nullable: true),
                    ActionType = table.Column<int>(type: "integer", nullable: false),
                    TriggeredAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SystemUserId = table.Column<long>(type: "bigint", nullable: false, comment: "Resolved via ISystemUserResolver at the moment the action fired — never 0"),
                    DetailsJson = table.Column<string>(type: "jsonb", nullable: true),
                    Reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowSystemActionAudits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_StepExecution",
                        column: x => x.StepExecutionId,
                        principalTable: "WorkflowStepExecutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_SystemUser",
                        column: x => x.SystemUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkflowSystemActionAudits_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CounselingRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CounselorUserId = table.Column<long>(type: "bigint", nullable: false),
                    SessionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SessionType = table.Column<int>(type: "integer", nullable: false),
                    Subject = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    SubjectAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    IsConfidential = table.Column<bool>(type: "boolean", nullable: false),
                    FollowUpRequired = table.Column<bool>(type: "boolean", nullable: false),
                    FollowUpDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FollowUpCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    RelatedDisciplinaryActionId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedGrievanceId = table.Column<long>(type: "bigint", nullable: true),
                    Outcome = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    OutcomeAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    EmployeeId1 = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CounselingRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CounselingRecords_DisciplinaryActions_RelatedDisciplinaryAc~",
                        column: x => x.RelatedDisciplinaryActionId,
                        principalTable: "DisciplinaryActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_CounselingRecords_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CounselingRecords_Employees_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CounselingRecords_Grievances_RelatedGrievanceId",
                        column: x => x.RelatedGrievanceId,
                        principalTable: "Grievances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "DisciplinaryAttachments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DisciplinaryActionId = table.Column<long>(type: "bigint", nullable: false),
                    FileAttachmentId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DisciplinaryAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DisciplinaryAttachments_DisciplinaryActions_DisciplinaryAct~",
                        column: x => x.DisciplinaryActionId,
                        principalTable: "DisciplinaryActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DisciplinaryAttachments_FileAttachments_FileAttachmentId",
                        column: x => x.FileAttachmentId,
                        principalTable: "FileAttachments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PerformanceReviews",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PerformanceReviewCycleId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ReviewerEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    SelfRating = table.Column<int>(type: "integer", nullable: true),
                    ManagerRating = table.Column<int>(type: "integer", nullable: true),
                    FinalRating = table.Column<int>(type: "integer", nullable: true),
                    SelfAssessmentComments = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    ManagerComments = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    OverallComments = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    SelfAssessmentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ManagerReviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    AcknowledgedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedPromotionId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedSalaryAdjustmentId = table.Column<long>(type: "bigint", nullable: true),
                    RelatedPipId = table.Column<long>(type: "bigint", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_EmployeePromotions_RelatedPromotionId",
                        column: x => x.RelatedPromotionId,
                        principalTable: "EmployeePromotions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_Employees_ReviewerEmployeeId",
                        column: x => x.ReviewerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_PerformanceReviewCycles_PerformanceRevie~",
                        column: x => x.PerformanceReviewCycleId,
                        principalTable: "PerformanceReviewCycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_SalaryAdjustments_RelatedSalaryAdjustmen~",
                        column: x => x.RelatedSalaryAdjustmentId,
                        principalTable: "SalaryAdjustments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PerformanceReviews_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CandidateId = table.Column<long>(type: "bigint", nullable: false),
                    JobPostingId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    AppliedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CoverLetterUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ScreeningNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    RejectionReasonAr = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ReviewedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ReviewedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplications_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JobApplications_JobPostings_JobPostingId",
                        column: x => x.JobPostingId,
                        principalTable: "JobPostings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExpenseReimbursements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ExpenseClaimId = table.Column<long>(type: "bigint", nullable: false),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    ReimbursementDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Method = table.Column<int>(type: "integer", nullable: false),
                    ReferenceNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExpenseReimbursements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExpenseReimbursements_ExpenseClaims_ExpenseClaimId",
                        column: x => x.ExpenseClaimId,
                        principalTable: "ExpenseClaims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExpenseReimbursements_PayrollRecords_PayrollRecordId",
                        column: x => x.PayrollRecordId,
                        principalTable: "PayrollRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LeaveEncashments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    VacationTypeId = table.Column<long>(type: "bigint", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    DaysEncashed = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    AmountPerDay = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveEncashments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveEncashments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LeaveEncashments_PayrollRecords_PayrollRecordId",
                        column: x => x.PayrollRecordId,
                        principalTable: "PayrollRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LeaveEncashments_VacationTypes_VacationTypeId",
                        column: x => x.VacationTypeId,
                        principalTable: "VacationTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LoanRepayments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LoanApplicationId = table.Column<long>(type: "bigint", nullable: false),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    InstallmentNumber = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    PrincipalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    InterestAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PaidDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    BalanceRemaining = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanRepayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanRepayments_LoanApplications_LoanApplicationId",
                        column: x => x.LoanApplicationId,
                        principalTable: "LoanApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LoanRepayments_PayrollRecords_PayrollRecordId",
                        column: x => x.PayrollRecordId,
                        principalTable: "PayrollRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRecordDetails",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: false, comment: "Payroll record identifier"),
                    SalaryComponentId = table.Column<long>(type: "bigint", nullable: true, comment: "Salary component identifier (null for ad-hoc items)"),
                    ComponentName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Component name snapshot"),
                    ComponentNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Component name in Arabic"),
                    ComponentType = table.Column<int>(type: "integer", nullable: false, comment: "Type of salary component"),
                    AllowanceTypeId = table.Column<long>(type: "bigint", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Component amount"),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Additional notes"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRecordDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRecordDetails_AllowanceTypes",
                        column: x => x.AllowanceTypeId,
                        principalTable: "AllowanceTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PayrollRecordDetails_PayrollRecords",
                        column: x => x.PayrollRecordId,
                        principalTable: "PayrollRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayrollRecordDetails_SalaryComponents",
                        column: x => x.SalaryComponentId,
                        principalTable: "SalaryComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SalaryAdvances",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    RequestDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeductionMonth = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryAdvances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryAdvances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SalaryAdvances_PayrollRecords_PayrollRecordId",
                        column: x => x.PayrollRecordId,
                        principalTable: "PayrollRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SalaryAdvances_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PayrollRunAuditItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollRunAuditId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    PayrollRecordId = table.Column<long>(type: "bigint", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    GrossEarnings = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    NetSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    TaxAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    SocialInsuranceEmployee = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    OvertimePay = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    AbsenceDeduction = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    WarningsJson = table.Column<string>(type: "jsonb", nullable: true),
                    ErrorMessage = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollRunAuditItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollRunAuditItems_PayrollRunAudits_PayrollRunAuditId",
                        column: x => x.PayrollRunAuditId,
                        principalTable: "PayrollRunAudits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClearanceChecklists",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TerminationRecordId = table.Column<long>(type: "bigint", nullable: false, comment: "Termination record identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    OverallStatus = table.Column<int>(type: "integer", nullable: false, comment: "Overall clearance status"),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When clearance was completed"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClearanceChecklists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClearanceChecklists_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClearanceChecklists_TerminationRecords",
                        column: x => x.TerminationRecordId,
                        principalTable: "TerminationRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EndOfServiceBenefits",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TerminationRecordId = table.Column<long>(type: "bigint", nullable: false, comment: "Termination record identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    ServiceYears = table.Column<int>(type: "integer", nullable: false, comment: "Total years of service"),
                    ServiceMonths = table.Column<int>(type: "integer", nullable: false, comment: "Additional months of service beyond full years"),
                    ServiceDays = table.Column<int>(type: "integer", nullable: false, comment: "Additional days of service beyond full months"),
                    BasicSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Employee basic salary at time of termination"),
                    TotalAllowances = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total allowances at time of termination"),
                    CalculationBasis = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Salary basis used for EOS calculation"),
                    TotalAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total end of service benefit amount"),
                    DeductionAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Deductions from EOS benefit"),
                    NetAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Net EOS benefit after deductions"),
                    CalculationDetails = table.Column<string>(type: "text", nullable: true, comment: "JSON details of the calculation breakdown"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    EndOfServicePolicyId = table.Column<long>(type: "bigint", nullable: true, comment: "FK to the EOS policy used for this calculation"),
                    AppliedPolicySnapshotJson = table.Column<string>(type: "jsonb", nullable: true, comment: "JSON snapshot of the policy + tiers at calculation time"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EndOfServiceBenefits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EndOfServiceBenefits_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EndOfServiceBenefits_EndOfServicePolicies_EndOfServicePolic~",
                        column: x => x.EndOfServicePolicyId,
                        principalTable: "EndOfServicePolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_EndOfServiceBenefits_TerminationRecords",
                        column: x => x.TerminationRecordId,
                        principalTable: "TerminationRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExitInterviews",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TerminationRecordId = table.Column<long>(type: "bigint", nullable: false, comment: "Termination record identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    InterviewDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Date of the exit interview"),
                    InterviewerUserId = table.Column<long>(type: "bigint", nullable: false, comment: "User who conducted the interview"),
                    OverallSatisfactionRating = table.Column<int>(type: "integer", nullable: true, comment: "Overall satisfaction rating (1-5)"),
                    ReasonForLeaving = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Primary reason for leaving"),
                    ReasonForLeavingAr = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Reason for leaving in Arabic"),
                    WouldRejoin = table.Column<bool>(type: "boolean", nullable: true, comment: "Whether employee would consider rejoining"),
                    LikedMost = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "What the employee liked most about the organization"),
                    ImprovementSuggestions = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Suggestions for improvement"),
                    AdditionalComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true, comment: "Any additional comments"),
                    IsConfidential = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether this interview is confidential"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExitInterviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExitInterviews_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExitInterviews_TerminationRecords",
                        column: x => x.TerminationRecordId,
                        principalTable: "TerminationRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinalSettlements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TerminationRecordId = table.Column<long>(type: "bigint", nullable: false, comment: "Termination record identifier"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee identifier"),
                    BasicSalaryDue = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Basic salary due for remaining period"),
                    AllowancesDue = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Allowances due for remaining period"),
                    LeaveEncashmentAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Leave encashment amount"),
                    LeaveEncashmentDays = table.Column<int>(type: "integer", nullable: false, comment: "Number of leave days encashed"),
                    EndOfServiceAmount = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "End of service benefit amount"),
                    OvertimeDue = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Overtime pay due"),
                    LoanOutstanding = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Outstanding loan balance to deduct"),
                    AdvanceOutstanding = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Outstanding advance balance to deduct"),
                    OtherDeductions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Other deductions"),
                    OtherAdditions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Other additions"),
                    GrossSettlement = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Gross settlement amount before deductions"),
                    TotalDeductions = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Total deductions from settlement"),
                    NetSettlement = table.Column<decimal>(type: "numeric(18,2)", nullable: false, comment: "Net settlement amount to pay"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Settlement status (Draft, Pending, Approved, Paid)"),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the settlement was approved"),
                    PaidAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When the settlement was paid"),
                    CalculationDetails = table.Column<string>(type: "text", nullable: true, comment: "JSON details of the calculation breakdown"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true, comment: "Workflow instance ID for approval tracking"),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinalSettlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinalSettlements_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FinalSettlements_TerminationRecords",
                        column: x => x.TerminationRecordId,
                        principalTable: "TerminationRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinalSettlements_WorkflowInstances",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "CompetencyAssessments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PerformanceReviewId = table.Column<long>(type: "bigint", nullable: false),
                    CompetencyId = table.Column<long>(type: "bigint", nullable: false),
                    SelfRating = table.Column<int>(type: "integer", nullable: true),
                    ManagerRating = table.Column<int>(type: "integer", nullable: true),
                    FinalRating = table.Column<int>(type: "integer", nullable: true),
                    SelfComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ManagerComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetencyAssessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompetencyAssessments_Competencies_CompetencyId",
                        column: x => x.CompetencyId,
                        principalTable: "Competencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CompetencyAssessments_PerformanceReviews_PerformanceReviewId",
                        column: x => x.PerformanceReviewId,
                        principalTable: "PerformanceReviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FeedbackRequests360",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PerformanceReviewId = table.Column<long>(type: "bigint", nullable: false),
                    RequestedFromEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Deadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SubmittedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackRequests360", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedbackRequests360_Employees_RequestedFromEmployeeId",
                        column: x => x.RequestedFromEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FeedbackRequests360_PerformanceReviews_PerformanceReviewId",
                        column: x => x.PerformanceReviewId,
                        principalTable: "PerformanceReviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoalDefinitions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PerformanceReviewId = table.Column<long>(type: "bigint", nullable: true),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    GoalType = table.Column<int>(type: "integer", nullable: false),
                    TargetValue = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CurrentValue = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Unit = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Weight = table.Column<decimal>(type: "numeric(8,4)", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    SelfRating = table.Column<int>(type: "integer", nullable: true),
                    ManagerRating = table.Column<int>(type: "integer", nullable: true),
                    SelfComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ManagerComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ProgressPercentage = table.Column<int>(type: "integer", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoalDefinitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoalDefinitions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GoalDefinitions_PerformanceReviews_PerformanceReviewId",
                        column: x => x.PerformanceReviewId,
                        principalTable: "PerformanceReviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PerformanceImprovementPlans",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ManagerEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    PerformanceReviewId = table.Column<long>(type: "bigint", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Reason = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ReasonAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Goals = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Milestones = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    OutcomeNotes = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceImprovementPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceImprovementPlans_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PerformanceImprovementPlans_Employees_ManagerEmployeeId",
                        column: x => x.ManagerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PerformanceImprovementPlans_PerformanceReviews_PerformanceR~",
                        column: x => x.PerformanceReviewId,
                        principalTable: "PerformanceReviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PerformanceImprovementPlans_WorkflowInstances_WorkflowInsta~",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "InterviewSchedules",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobApplicationId = table.Column<long>(type: "bigint", nullable: false),
                    InterviewType = table.Column<int>(type: "integer", nullable: false),
                    InterviewerEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DurationMinutes = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    MeetingLink = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Result = table.Column<int>(type: "integer", nullable: false),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    CancellationReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewSchedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewSchedules_Employees_InterviewerEmployeeId",
                        column: x => x.InterviewerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InterviewSchedules_JobApplications_JobApplicationId",
                        column: x => x.JobApplicationId,
                        principalTable: "JobApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OfferLetters",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    JobApplicationId = table.Column<long>(type: "bigint", nullable: false),
                    CandidateId = table.Column<long>(type: "bigint", nullable: false),
                    JobTitle = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    JobTitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    JobGradeId = table.Column<long>(type: "bigint", nullable: true),
                    OfferedSalary = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    ContractType = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    BenefitsDescription = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    BenefitsDescriptionAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    SpecialConditions = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    DocumentUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RespondedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    WorkflowInstanceId = table.Column<long>(type: "bigint", nullable: true),
                    SubmittedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OfferLetters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OfferLetters_Candidates_CandidateId",
                        column: x => x.CandidateId,
                        principalTable: "Candidates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OfferLetters_Employees_CreatedEmployeeId",
                        column: x => x.CreatedEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OfferLetters_JobApplications_JobApplicationId",
                        column: x => x.JobApplicationId,
                        principalTable: "JobApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OfferLetters_JobGrades_JobGradeId",
                        column: x => x.JobGradeId,
                        principalTable: "JobGrades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_OfferLetters_WorkflowInstances_WorkflowInstanceId",
                        column: x => x.WorkflowInstanceId,
                        principalTable: "WorkflowInstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ClearanceItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClearanceChecklistId = table.Column<long>(type: "bigint", nullable: false, comment: "Clearance checklist identifier"),
                    Department = table.Column<int>(type: "integer", nullable: false, comment: "Department responsible for this clearance item"),
                    ItemName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Clearance item name"),
                    ItemNameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Clearance item name in Arabic"),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Item description"),
                    IsCompleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether this item is completed"),
                    CompletedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When this item was completed"),
                    Notes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true, comment: "Additional notes"),
                    DisplayOrder = table.Column<int>(type: "integer", nullable: false, comment: "Display order for UI rendering"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClearanceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClearanceItems_ClearanceChecklists",
                        column: x => x.ClearanceChecklistId,
                        principalTable: "ClearanceChecklists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback360Responses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FeedbackRequest360Id = table.Column<long>(type: "bigint", nullable: false),
                    Ratings = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true),
                    Strengths = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    AreasForImprovement = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    AdditionalComments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    IsAnonymous = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback360Responses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Feedback360Responses_FeedbackRequests360_FeedbackRequest360~",
                        column: x => x.FeedbackRequest360Id,
                        principalTable: "FeedbackRequests360",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InterviewFeedbacks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InterviewScheduleId = table.Column<long>(type: "bigint", nullable: false),
                    InterviewerEmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TechnicalScore = table.Column<int>(type: "integer", nullable: false),
                    CommunicationScore = table.Column<int>(type: "integer", nullable: false),
                    CulturalFitScore = table.Column<int>(type: "integer", nullable: false),
                    OverallScore = table.Column<int>(type: "integer", nullable: false),
                    Recommendation = table.Column<int>(type: "integer", nullable: false),
                    Strengths = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Weaknesses = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Comments = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 })
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewFeedbacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewFeedbacks_Employees_InterviewerEmployeeId",
                        column: x => x.InterviewerEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InterviewFeedbacks_InterviewSchedules_InterviewScheduleId",
                        column: x => x.InterviewScheduleId,
                        principalTable: "InterviewSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceAssignments_AllowanceRequestId",
                table: "AllowanceAssignments",
                column: "AllowanceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceAssignments_AllowanceTypeId",
                table: "AllowanceAssignments",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceAssignments_Employee_Type_Status",
                table: "AllowanceAssignments",
                columns: new[] { "EmployeeId", "AllowanceTypeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceAssignments_EmployeeId",
                table: "AllowanceAssignments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceAssignments_Status",
                table: "AllowanceAssignments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceChangeLogs_AllowanceRequestId",
                table: "AllowanceChangeLogs",
                column: "AllowanceRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceChangeLogs_AllowanceTypeId",
                table: "AllowanceChangeLogs",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceChangeLogs_EffectiveDate",
                table: "AllowanceChangeLogs",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceChangeLogs_Employee_EffectiveDate",
                table: "AllowanceChangeLogs",
                columns: new[] { "EmployeeId", "EffectiveDate" });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceChangeLogs_EmployeeId",
                table: "AllowanceChangeLogs",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowancePolicies_AllowanceTypeId",
                table: "AllowancePolicies",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowancePolicies_BranchId",
                table: "AllowancePolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowancePolicies_TypeId_IsActive",
                table: "AllowancePolicies",
                columns: new[] { "AllowanceTypeId", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_AllowancePolicyId",
                table: "AllowanceRequests",
                column: "AllowancePolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_AllowanceTypeId",
                table: "AllowanceRequests",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_Employee_Status",
                table: "AllowanceRequests",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_EmployeeId",
                table: "AllowanceRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_Status",
                table: "AllowanceRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceRequests_WorkflowInstanceId",
                table: "AllowanceRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceTypes_BranchId",
                table: "AllowanceTypes",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_AllowanceTypes_Code_Unique",
                table: "AllowanceTypes",
                column: "Code",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsSnapshots_BranchId",
                table: "AnalyticsSnapshots",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsSnapshots_Date_Metric_Branch_Dept_Period",
                table: "AnalyticsSnapshots",
                columns: new[] { "SnapshotDate", "MetricType", "BranchId", "DepartmentId", "PeriodType" });

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsSnapshots_DepartmentId",
                table: "AnalyticsSnapshots",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsSnapshots_MetricType",
                table: "AnalyticsSnapshots",
                column: "MetricType");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsSnapshots_PeriodType",
                table: "AnalyticsSnapshots",
                column: "PeriodType");

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementAcknowledgments_Announcement_Employee",
                table: "AnnouncementAcknowledgments",
                columns: new[] { "AnnouncementId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementAcknowledgments_EmployeeId",
                table: "AnnouncementAcknowledgments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementAttachments_AnnouncementId",
                table: "AnnouncementAttachments",
                column: "AnnouncementId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnouncementAttachments_FileAttachmentId",
                table: "AnnouncementAttachments",
                column: "FileAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_AnnouncementCategoryId",
                table: "Announcements",
                column: "AnnouncementCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_ExpiryDate",
                table: "Announcements",
                column: "ExpiryDate");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_Priority",
                table: "Announcements",
                column: "Priority");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_ScheduledPublishDate",
                table: "Announcements",
                column: "ScheduledPublishDate");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_Status",
                table: "Announcements",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_Active_Dates",
                table: "ApprovalDelegations",
                columns: new[] { "DelegatorUserId", "IsActive", "StartDate", "EndDate" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_DelegateUserId",
                table: "ApprovalDelegations",
                column: "DelegateUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_DelegatorUserId",
                table: "ApprovalDelegations",
                column: "DelegatorUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_EndDate",
                table: "ApprovalDelegations",
                column: "EndDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalDelegations_StartDate",
                table: "ApprovalDelegations",
                column: "StartDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_Asset_Status",
                table: "AssetAssignments",
                columns: new[] { "AssetId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_AssetId",
                table: "AssetAssignments",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_Employee_Status",
                table: "AssetAssignments",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_EmployeeId",
                table: "AssetAssignments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_Status",
                table: "AssetAssignments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AssetCategories_Code_Unique",
                table: "AssetCategories",
                column: "Code",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_AssetCategories_ParentCategoryId",
                table: "AssetCategories",
                column: "ParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetMaintenanceRecords_AssetId",
                table: "AssetMaintenanceRecords",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_AssetMaintenanceRecords_MaintenanceType",
                table: "AssetMaintenanceRecords",
                column: "MaintenanceType");

            migrationBuilder.CreateIndex(
                name: "IX_AssetMaintenanceRecords_Status",
                table: "AssetMaintenanceRecords",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_AssetCategoryId",
                table: "Assets",
                column: "AssetCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_AssetTag_Unique",
                table: "Assets",
                column: "AssetTag",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_BranchId",
                table: "Assets",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_SerialNumber",
                table: "Assets",
                column: "SerialNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_Status",
                table: "Assets",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_ApprovalStatus",
                table: "AttendanceCorrectionRequests",
                column: "ApprovalStatus");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_ApprovedById",
                table: "AttendanceCorrectionRequests",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionDate",
                table: "AttendanceCorrectionRequests",
                column: "CorrectionDate");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionDate_ApprovalStatus",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "CorrectionDate", "ApprovalStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CorrectionType",
                table: "AttendanceCorrectionRequests",
                column: "CorrectionType");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_CreatedTransactionId",
                table: "AttendanceCorrectionRequests",
                column: "CreatedTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_EmployeeId",
                table: "AttendanceCorrectionRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_EmployeeId_CorrectionDate",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "EmployeeId", "CorrectionDate" });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceCorrectionRequests_WorkflowInstanceId",
                table: "AttendanceCorrectionRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "UQ_AttendanceCorrectionRequests_EmployeeId_CorrectionDate_CorrectionType",
                table: "AttendanceCorrectionRequests",
                columns: new[] { "EmployeeId", "CorrectionDate", "CorrectionType" },
                unique: true,
                filter: "\"IsDeleted\" = false AND \"ApprovalStatus\" = 1");

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
                name: "IX_AttendanceVerificationLogs_AttemptedAt",
                table: "AttendanceVerificationLogs",
                column: "AttemptedAt",
                descending: new bool[0]);

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceVerificationLogs_BranchId",
                table: "AttendanceVerificationLogs",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceVerificationLogs_EmployeeId",
                table: "AttendanceVerificationLogs",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceVerificationLogs_EmployeeId_AttemptedAt",
                table: "AttendanceVerificationLogs",
                columns: new[] { "EmployeeId", "AttemptedAt" },
                descending: new[] { false, true });

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceVerificationLogs_Status",
                table: "AttendanceVerificationLogs",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceVerificationLogs_Status_AttemptedAt",
                table: "AttendanceVerificationLogs",
                columns: new[] { "Status", "AttemptedAt" },
                descending: new[] { false, true },
                filter: "\"Status\" = 2");

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
                name: "IX_BankTransferFiles_PayrollPeriodId",
                table: "BankTransferFiles",
                column: "PayrollPeriodId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitClaims_BenefitEnrollmentId",
                table: "BenefitClaims",
                column: "BenefitEnrollmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitClaims_ClaimDate",
                table: "BenefitClaims",
                column: "ClaimDate");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitClaims_Employee_Status",
                table: "BenefitClaims",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_BenefitClaims_EmployeeId",
                table: "BenefitClaims",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitClaims_Status",
                table: "BenefitClaims",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitDependents_BenefitEnrollmentId",
                table: "BenefitDependents",
                column: "BenefitEnrollmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitDependents_EmployeeDependentId",
                table: "BenefitDependents",
                column: "EmployeeDependentId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEligibilityRules_BenefitPlanId",
                table: "BenefitEligibilityRules",
                column: "BenefitPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEligibilityRules_BranchId",
                table: "BenefitEligibilityRules",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEligibilityRules_DepartmentId",
                table: "BenefitEligibilityRules",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_BenefitPlanId",
                table: "BenefitEnrollments",
                column: "BenefitPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_BenefitPlanOptionId",
                table: "BenefitEnrollments",
                column: "BenefitPlanOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_Employee_Plan_Status",
                table: "BenefitEnrollments",
                columns: new[] { "EmployeeId", "BenefitPlanId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_EmployeeId",
                table: "BenefitEnrollments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_OpenEnrollmentPeriodId",
                table: "BenefitEnrollments",
                column: "OpenEnrollmentPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_Status",
                table: "BenefitEnrollments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitEnrollments_WorkflowInstanceId",
                table: "BenefitEnrollments",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlanOptions_BenefitPlanId",
                table: "BenefitPlanOptions",
                column: "BenefitPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlanOptions_IsActive",
                table: "BenefitPlanOptions",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlans_BenefitType",
                table: "BenefitPlans",
                column: "BenefitType");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlans_Code",
                table: "BenefitPlans",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlans_InsuranceProviderId",
                table: "BenefitPlans",
                column: "InsuranceProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlans_IsActive",
                table: "BenefitPlans",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitPlans_PlanYear",
                table: "BenefitPlans",
                column: "PlanYear");

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
                name: "IX_Branches_ManagerEmployeeId",
                table: "Branches",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BranchSettingsOverrides_BranchId",
                table: "BranchSettingsOverrides",
                column: "BranchId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ConvertedToEmployeeId",
                table: "Candidates",
                column: "ConvertedToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_Email",
                table: "Candidates",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_NationalId",
                table: "Candidates",
                column: "NationalId");

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_ReferredByEmployeeId",
                table: "Candidates",
                column: "ReferredByEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerPathSteps_CareerPathId",
                table: "CareerPathSteps",
                column: "CareerPathId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerPathSteps_FromJobGradeId",
                table: "CareerPathSteps",
                column: "FromJobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerPathSteps_Path_Order",
                table: "CareerPathSteps",
                columns: new[] { "CareerPathId", "StepOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_CareerPathSteps_ToJobGradeId",
                table: "CareerPathSteps",
                column: "ToJobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_ClearanceChecklists_EmployeeId",
                table: "ClearanceChecklists",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ClearanceChecklists_OverallStatus",
                table: "ClearanceChecklists",
                column: "OverallStatus",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ClearanceChecklists_TerminationRecordId",
                table: "ClearanceChecklists",
                column: "TerminationRecordId",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ClearanceItems_ClearanceChecklistId",
                table: "ClearanceItems",
                column: "ClearanceChecklistId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ClearanceItems_Department",
                table: "ClearanceItems",
                column: "Department",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPolicies_DocumentCategoryId",
                table: "CompanyPolicies",
                column: "DocumentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyPolicies_Status",
                table: "CompanyPolicies",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_CompensatoryOffs_EmployeeId_Status",
                table: "CompensatoryOffs",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_CompensatoryOffs_UsedVacationId",
                table: "CompensatoryOffs",
                column: "UsedVacationId");

            migrationBuilder.CreateIndex(
                name: "IX_Competencies_Framework_Order",
                table: "Competencies",
                columns: new[] { "CompetencyFrameworkId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_Competencies_FrameworkId",
                table: "Competencies",
                column: "CompetencyFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyAssessments_CompetencyId",
                table: "CompetencyAssessments",
                column: "CompetencyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyAssessments_Review_Competency",
                table: "CompetencyAssessments",
                columns: new[] { "PerformanceReviewId", "CompetencyId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyAssessments_ReviewId",
                table: "CompetencyAssessments",
                column: "PerformanceReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetencyFrameworks_IsActive",
                table: "CompetencyFrameworks",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_EmployeeId",
                table: "CounselingRecords",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_EmployeeId1",
                table: "CounselingRecords",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_FollowUp",
                table: "CounselingRecords",
                columns: new[] { "FollowUpRequired", "FollowUpCompleted" },
                filter: "\"IsDeleted\" = false AND \"FollowUpRequired\" = true AND \"FollowUpCompleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_RelatedDisciplinaryActionId",
                table: "CounselingRecords",
                column: "RelatedDisciplinaryActionId");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_RelatedGrievanceId",
                table: "CounselingRecords",
                column: "RelatedGrievanceId");

            migrationBuilder.CreateIndex(
                name: "IX_CounselingRecords_SessionType",
                table: "CounselingRecords",
                column: "SessionType",
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
                name: "IX_DepartmentSettingsOverrides_DefaultShiftId",
                table: "DepartmentSettingsOverrides",
                column: "DefaultShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentSettingsOverrides_DepartmentId",
                table: "DepartmentSettingsOverrides",
                column: "DepartmentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_ActionNumber",
                table: "DisciplinaryActions",
                column: "ActionNumber",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_EmployeeId",
                table: "DisciplinaryActions",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_EmployeeId1",
                table: "DisciplinaryActions",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_RelatedGrievanceId",
                table: "DisciplinaryActions",
                column: "RelatedGrievanceId");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_RelatedInvestigationId",
                table: "DisciplinaryActions",
                column: "RelatedInvestigationId");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryActions_Status",
                table: "DisciplinaryActions",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryAttachments_DisciplinaryActionId",
                table: "DisciplinaryAttachments",
                column: "DisciplinaryActionId");

            migrationBuilder.CreateIndex(
                name: "IX_DisciplinaryAttachments_FileAttachmentId",
                table: "DisciplinaryAttachments",
                column: "FileAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyContacts_EmployeeId",
                table: "EmergencyContacts",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBankDetails_EmployeeId",
                table: "EmployeeBankDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCertifications_CourseId",
                table: "EmployeeCertifications",
                column: "TrainingCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCertifications_EmployeeId",
                table: "EmployeeCertifications",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCertifications_ExpiryDate",
                table: "EmployeeCertifications",
                column: "ExpiryDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeCertifications_Status",
                table: "EmployeeCertifications",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeContracts_EmployeeId",
                table: "EmployeeContracts",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeContracts_EmployeeId_Status",
                table: "EmployeeContracts",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeContracts_PreviousContractId",
                table: "EmployeeContracts",
                column: "PreviousContractId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeContracts_Status",
                table: "EmployeeContracts",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDependents_EmployeeId",
                table: "EmployeeDependents",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_DocumentCategoryId",
                table: "EmployeeDocuments",
                column: "DocumentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_ExpiryDate",
                table: "EmployeeDocuments",
                column: "ExpiryDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducations_EmployeeId",
                table: "EmployeeEducations",
                column: "EmployeeId");

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
                name: "IX_EmployeeExcuses_WorkflowInstanceId",
                table: "EmployeeExcuses",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "UQ_EmployeeExcuses_EmployeeId_ExcuseDate_TimeRange",
                table: "EmployeeExcuses",
                columns: new[] { "EmployeeId", "ExcuseDate", "StartTime", "EndTime" },
                unique: true,
                filter: "\"IsDeleted\" = false AND \"ApprovalStatus\" IN (1, 2)");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsurances_EmployeeId",
                table: "EmployeeInsurances",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsurances_EmployeeId1",
                table: "EmployeeInsurances",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsurances_InsuranceProviderId",
                table: "EmployeeInsurances",
                column: "InsuranceProviderId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsurances_IsActive",
                table: "EmployeeInsurances",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeProfileChanges_EffectiveDate",
                table: "EmployeeProfileChanges",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeProfileChanges_EmployeeId",
                table: "EmployeeProfileChanges",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeProfileChanges_IsApplied",
                table: "EmployeeProfileChanges",
                column: "IsApplied");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_EffectiveDate",
                table: "EmployeePromotions",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_EmployeeId",
                table: "EmployeePromotions",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_NewDepartmentId",
                table: "EmployeePromotions",
                column: "NewDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_OldDepartmentId",
                table: "EmployeePromotions",
                column: "OldDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_Status",
                table: "EmployeePromotions",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePromotions_WorkflowInstanceId",
                table: "EmployeePromotions",
                column: "WorkflowInstanceId");

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
                name: "IX_Employees_JobGradeId",
                table: "Employees",
                column: "JobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ManagerEmployeeId",
                table: "Employees",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmployeeId",
                table: "EmployeeSalaries",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmployeeId_IsCurrent",
                table: "EmployeeSalaries",
                columns: new[] { "EmployeeId", "IsCurrent" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmployeeId1",
                table: "EmployeeSalaries",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_SalaryStructureId",
                table: "EmployeeSalaries",
                column: "SalaryStructureId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryComponents_EmployeeSalaryId",
                table: "EmployeeSalaryComponents",
                column: "EmployeeSalaryId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaryComponents_SalaryComponentId",
                table: "EmployeeSalaryComponents",
                column: "SalaryComponentId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_EffectiveDate",
                table: "EmployeeTransfers",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_EmployeeId",
                table: "EmployeeTransfers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_FromBranchId",
                table: "EmployeeTransfers",
                column: "FromBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_FromDepartmentId",
                table: "EmployeeTransfers",
                column: "FromDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_Status",
                table: "EmployeeTransfers",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_ToBranchId",
                table: "EmployeeTransfers",
                column: "ToBranchId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_ToDepartmentId",
                table: "EmployeeTransfers",
                column: "ToDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfers_WorkflowInstanceId",
                table: "EmployeeTransfers",
                column: "WorkflowInstanceId");

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
                name: "IX_EmployeeVacations_WorkflowInstanceId",
                table: "EmployeeVacations",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVisas_EmployeeId",
                table: "EmployeeVisas",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeVisas_ExpiryDate",
                table: "EmployeeVisas",
                column: "ExpiryDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkExperiences_EmployeeId",
                table: "EmployeeWorkExperiences",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceBenefits_EmployeeId",
                table: "EndOfServiceBenefits",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceBenefits_EndOfServicePolicyId",
                table: "EndOfServiceBenefits",
                column: "EndOfServicePolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceBenefits_TerminationRecordId",
                table: "EndOfServiceBenefits",
                column: "TerminationRecordId",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServicePolicies_Active_Effective_Country",
                table: "EndOfServicePolicies",
                columns: new[] { "IsActive", "EffectiveFromDate", "CountryCode" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServicePolicyTiers_Policy_Sort",
                table: "EndOfServicePolicyTiers",
                columns: new[] { "EndOfServicePolicyId", "SortOrder" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_EndOfServiceResignationDeductionTiers_Policy_Sort",
                table: "EndOfServiceResignationDeductionTiers",
                columns: new[] { "EndOfServicePolicyId", "SortOrder" },
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
                name: "IX_ExitInterviews_EmployeeId",
                table: "ExitInterviews",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ExitInterviews_InterviewDate",
                table: "ExitInterviews",
                column: "InterviewDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ExitInterviews_TerminationRecordId",
                table: "ExitInterviews",
                column: "TerminationRecordId",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaimItems_ExpenseCategoryId",
                table: "ExpenseClaimItems",
                column: "ExpenseCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaimItems_ExpenseClaimId",
                table: "ExpenseClaimItems",
                column: "ExpenseClaimId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaims_ClaimNumber",
                table: "ExpenseClaims",
                column: "ClaimNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaims_EmployeeId",
                table: "ExpenseClaims",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaims_ExpensePolicyId",
                table: "ExpenseClaims",
                column: "ExpensePolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaims_Status",
                table: "ExpenseClaims",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseClaims_WorkflowInstanceId",
                table: "ExpenseClaims",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpensePolicies_BranchId",
                table: "ExpensePolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseReimbursements_ExpenseClaimId",
                table: "ExpenseReimbursements",
                column: "ExpenseClaimId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExpenseReimbursements_PayrollRecordId",
                table: "ExpenseReimbursements",
                column: "PayrollRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback360Responses_RequestId",
                table: "Feedback360Responses",
                column: "FeedbackRequest360Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackRequests360_RequestedFromId",
                table: "FeedbackRequests360",
                column: "RequestedFromEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackRequests360_ReviewId",
                table: "FeedbackRequests360",
                column: "PerformanceReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedbackRequests360_Status",
                table: "FeedbackRequests360",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_Category",
                table: "FileAttachments",
                column: "Category");

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_EntityType_EntityId",
                table: "FileAttachments",
                columns: new[] { "EntityType", "EntityId" });

            migrationBuilder.CreateIndex(
                name: "IX_FileAttachments_StoredFileName",
                table: "FileAttachments",
                column: "StoredFileName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FinalSettlements_EmployeeId",
                table: "FinalSettlements",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_FinalSettlements_Status",
                table: "FinalSettlements",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_FinalSettlements_TerminationRecordId",
                table: "FinalSettlements",
                column: "TerminationRecordId",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_FinalSettlements_WorkflowInstanceId",
                table: "FinalSettlements",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_GoalDefinitions_EmployeeId",
                table: "GoalDefinitions",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_GoalDefinitions_PerformanceReviewId",
                table: "GoalDefinitions",
                column: "PerformanceReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_GoalDefinitions_Status",
                table: "GoalDefinitions",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_GrievanceAttachments_FileAttachmentId",
                table: "GrievanceAttachments",
                column: "FileAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_GrievanceAttachments_GrievanceId",
                table: "GrievanceAttachments",
                column: "GrievanceId");

            migrationBuilder.CreateIndex(
                name: "IX_GrievanceNotes_GrievanceId",
                table: "GrievanceNotes",
                column: "GrievanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_AgainstEmployeeId",
                table: "Grievances",
                column: "AgainstEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_AssignedToUserId",
                table: "Grievances",
                column: "AssignedToUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_EmployeeId",
                table: "Grievances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_EmployeeId1",
                table: "Grievances",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_GrievanceNumber",
                table: "Grievances",
                column: "GrievanceNumber",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Grievances_Status",
                table: "Grievances",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceProviders_InsuranceType",
                table: "InsuranceProviders",
                column: "InsuranceType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceProviders_IsActive",
                table: "InsuranceProviders",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewFeedbacks_InterviewerEmployeeId",
                table: "InterviewFeedbacks",
                column: "InterviewerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewFeedbacks_InterviewScheduleId",
                table: "InterviewFeedbacks",
                column: "InterviewScheduleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InterviewSchedules_InterviewerEmployeeId",
                table: "InterviewSchedules",
                column: "InterviewerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewSchedules_JobApplicationId",
                table: "InterviewSchedules",
                column: "JobApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewSchedules_ScheduledDate",
                table: "InterviewSchedules",
                column: "ScheduledDate");

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationAttachments_FileAttachmentId",
                table: "InvestigationAttachments",
                column: "FileAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationAttachments_InvestigationId",
                table: "InvestigationAttachments",
                column: "InvestigationId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationNotes_InvestigationId",
                table: "InvestigationNotes",
                column: "InvestigationId");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_InvestigationNumber",
                table: "Investigations",
                column: "InvestigationNumber",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_InvestigatorUserId",
                table: "Investigations",
                column: "InvestigatorUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_RelatedGrievanceId",
                table: "Investigations",
                column: "RelatedGrievanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_Status",
                table: "Investigations",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Investigations_SubjectEmployeeId",
                table: "Investigations",
                column: "SubjectEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_Candidate_Posting",
                table: "JobApplications",
                columns: new[] { "CandidateId", "JobPostingId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_CandidateId",
                table: "JobApplications",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_JobPostingId",
                table: "JobApplications",
                column: "JobPostingId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_Status",
                table: "JobApplications",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_JobGrades_Code",
                table: "JobGrades",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobPostings_JobRequisitionId",
                table: "JobPostings",
                column: "JobRequisitionId");

            migrationBuilder.CreateIndex(
                name: "IX_JobPostings_Status",
                table: "JobPostings",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_BranchId",
                table: "JobRequisitions",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_DepartmentId",
                table: "JobRequisitions",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_JobGradeId",
                table: "JobRequisitions",
                column: "JobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_ReplacingEmployeeId",
                table: "JobRequisitions",
                column: "ReplacingEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_RequestedByEmployeeId",
                table: "JobRequisitions",
                column: "RequestedByEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_RequisitionNumber",
                table: "JobRequisitions",
                column: "RequisitionNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_Status",
                table: "JobRequisitions",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequisitions_WorkflowInstanceId",
                table: "JobRequisitions",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_BranchId",
                table: "KeyPositions",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_CriticalityLevel",
                table: "KeyPositions",
                column: "CriticalityLevel");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_CurrentHolderId",
                table: "KeyPositions",
                column: "CurrentHolderId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_DepartmentId",
                table: "KeyPositions",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_JobGradeId",
                table: "KeyPositions",
                column: "JobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyPositions_VacancyRisk",
                table: "KeyPositions",
                column: "VacancyRisk");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveAccrualPolicies_IsActive",
                table: "LeaveAccrualPolicies",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveAccrualPolicies_VacationType_Active",
                table: "LeaveAccrualPolicies",
                columns: new[] { "VacationTypeId", "IsActive" },
                filter: "\"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveAccrualPolicies_VacationTypeId",
                table: "LeaveAccrualPolicies",
                column: "VacationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_Employee_VacationType_Year",
                table: "LeaveBalances",
                columns: new[] { "EmployeeId", "VacationTypeId", "Year" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_EmployeeId",
                table: "LeaveBalances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_VacationTypeId",
                table: "LeaveBalances",
                column: "VacationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_Year",
                table: "LeaveBalances",
                column: "Year");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEncashments_EmployeeId_Year",
                table: "LeaveEncashments",
                columns: new[] { "EmployeeId", "Year" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEncashments_PayrollRecordId",
                table: "LeaveEncashments",
                column: "PayrollRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEncashments_VacationTypeId",
                table: "LeaveEncashments",
                column: "VacationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEntitlements_Employee_VacationType_Year",
                table: "LeaveEntitlements",
                columns: new[] { "EmployeeId", "VacationTypeId", "Year" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEntitlements_VacationTypeId",
                table: "LeaveEntitlements",
                column: "VacationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEntitlements_Year",
                table: "LeaveEntitlements",
                column: "Year");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTransactions_LeaveBalanceId",
                table: "LeaveTransactions",
                column: "LeaveBalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTransactions_Reference",
                table: "LeaveTransactions",
                columns: new[] { "ReferenceType", "ReferenceId" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTransactions_TransactionDate",
                table: "LeaveTransactions",
                column: "TransactionDate");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTransactions_TransactionType",
                table: "LeaveTransactions",
                column: "TransactionType");

            migrationBuilder.CreateIndex(
                name: "IX_LetterRequests_EmployeeId",
                table: "LetterRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LetterRequests_Status",
                table: "LetterRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_LetterRequests_TemplateId",
                table: "LetterRequests",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_LetterRequests_WorkflowInstanceId",
                table: "LetterRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_LetterTemplates_BranchId",
                table: "LetterTemplates",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_LetterTemplates_LetterType",
                table: "LetterTemplates",
                column: "LetterType");

            migrationBuilder.CreateIndex(
                name: "IX_LifecycleAutomationAudits_Source",
                table: "LifecycleAutomationAudits",
                columns: new[] { "SourceEntityType", "SourceEntityId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_LifecycleAutomationAudits_Source_Type_Status",
                table: "LifecycleAutomationAudits",
                columns: new[] { "SourceEntityType", "SourceEntityId", "AutomationType", "Status" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_Employee_Status",
                table: "LoanApplications",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_EmployeeId",
                table: "LoanApplications",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_LoanPolicyId",
                table: "LoanApplications",
                column: "LoanPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_LoanTypeId",
                table: "LoanApplications",
                column: "LoanTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_Status",
                table: "LoanApplications",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_LoanApplications_WorkflowInstanceId",
                table: "LoanApplications",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanPolicies_BranchId",
                table: "LoanPolicies",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanPolicies_LoanTypeId",
                table: "LoanPolicies",
                column: "LoanTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRepayments_DueDate",
                table: "LoanRepayments",
                column: "DueDate");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRepayments_LoanApplicationId",
                table: "LoanRepayments",
                column: "LoanApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRepayments_PayrollRecordId",
                table: "LoanRepayments",
                column: "PayrollRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRepayments_Status",
                table: "LoanRepayments",
                column: "Status");

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
                name: "IX_NfcTags_BranchId",
                table: "NfcTags",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_NfcTags_BranchId_IsActive",
                table: "NfcTags",
                columns: new[] { "BranchId", "IsActive" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_NfcTags_Status",
                table: "NfcTags",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_NfcTags_TagUid",
                table: "NfcTags",
                column: "TagUid",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationBroadcasts_SentAt",
                table: "NotificationBroadcasts",
                column: "SentAt",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationBroadcasts_SentByUserId",
                table: "NotificationBroadcasts",
                column: "SentByUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationBroadcasts_TargetType",
                table: "NotificationBroadcasts",
                column: "TargetType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_BroadcastId",
                table: "Notifications",
                column: "BroadcastId",
                filter: "\"IsDeleted\" = false AND \"BroadcastId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedAtUtc",
                table: "Notifications",
                column: "CreatedAtUtc",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_EntityType_EntityId",
                table: "Notifications",
                columns: new[] { "EntityType", "EntityId" },
                filter: "\"IsDeleted\" = false AND \"EntityType\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Type",
                table: "Notifications",
                column: "Type",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId_IsRead",
                table: "Notifications",
                columns: new[] { "UserId", "IsRead" },
                filter: "\"IsDeleted\" = false AND \"IsRead\" = false");

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
                name: "IX_OfferLetters_CandidateId",
                table: "OfferLetters",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferLetters_CreatedEmployeeId",
                table: "OfferLetters",
                column: "CreatedEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferLetters_JobApplicationId",
                table: "OfferLetters",
                column: "JobApplicationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OfferLetters_JobGradeId",
                table: "OfferLetters",
                column: "JobGradeId");

            migrationBuilder.CreateIndex(
                name: "IX_OfferLetters_Status",
                table: "OfferLetters",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_OfferLetters_WorkflowInstanceId",
                table: "OfferLetters",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingDocuments_ProcessId",
                table: "OnboardingDocuments",
                column: "OnboardingProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingDocuments_Status",
                table: "OnboardingDocuments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingProcesses_BuddyEmployeeId",
                table: "OnboardingProcesses",
                column: "BuddyEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingProcesses_EmployeeId",
                table: "OnboardingProcesses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingProcesses_MentorEmployeeId",
                table: "OnboardingProcesses",
                column: "MentorEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingProcesses_Status",
                table: "OnboardingProcesses",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingProcesses_TemplateId",
                table: "OnboardingProcesses",
                column: "OnboardingTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTasks_AssignedToEmployeeId",
                table: "OnboardingTasks",
                column: "AssignedToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTasks_OnboardingTemplateTaskId",
                table: "OnboardingTasks",
                column: "OnboardingTemplateTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTasks_ProcessId",
                table: "OnboardingTasks",
                column: "OnboardingProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTasks_Status",
                table: "OnboardingTasks",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTemplates_BranchId",
                table: "OnboardingTemplates",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTemplates_DepartmentId",
                table: "OnboardingTemplates",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTemplates_IsActive",
                table: "OnboardingTemplates",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTemplateTasks_Template_Order",
                table: "OnboardingTemplateTasks",
                columns: new[] { "OnboardingTemplateId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_OnboardingTemplateTasks_TemplateId",
                table: "OnboardingTemplateTasks",
                column: "OnboardingTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_OnCallSchedules_EmployeeId_StartDate_EndDate",
                table: "OnCallSchedules",
                columns: new[] { "EmployeeId", "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OnCallSchedules_ShiftId",
                table: "OnCallSchedules",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenEnrollmentPeriods_BranchId",
                table: "OpenEnrollmentPeriods",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenEnrollmentPeriods_DateRange",
                table: "OpenEnrollmentPeriods",
                columns: new[] { "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenEnrollmentPeriods_PlanYear",
                table: "OpenEnrollmentPeriods",
                column: "PlanYear");

            migrationBuilder.CreateIndex(
                name: "IX_OpenEnrollmentPeriods_Status",
                table: "OpenEnrollmentPeriods",
                column: "Status");

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
                name: "IX_PayrollAdjustments_AdjustmentType",
                table: "PayrollAdjustments",
                column: "AdjustmentType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollAdjustments_EmployeeId",
                table: "PayrollAdjustments",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollAdjustments_PayrollPeriodId",
                table: "PayrollAdjustments",
                column: "PayrollPeriodId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollCalendarPolicies_Branch_Active_Effective",
                table: "PayrollCalendarPolicies",
                columns: new[] { "BranchId", "IsActive", "EffectiveFromDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollPeriods_BranchId",
                table: "PayrollPeriods",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollPeriods_BranchId_StartDate_EndDate",
                table: "PayrollPeriods",
                columns: new[] { "BranchId", "StartDate", "EndDate" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollPeriods_Status",
                table: "PayrollPeriods",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollPeriods_WorkflowInstanceId",
                table: "PayrollPeriods",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecordDetails_AllowanceTypeId",
                table: "PayrollRecordDetails",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecordDetails_ComponentType",
                table: "PayrollRecordDetails",
                column: "ComponentType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecordDetails_PayrollRecordId",
                table: "PayrollRecordDetails",
                column: "PayrollRecordId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecordDetails_SalaryComponentId",
                table: "PayrollRecordDetails",
                column: "SalaryComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecords_EmployeeId",
                table: "PayrollRecords",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecords_PayrollPeriodId_EmployeeId",
                table: "PayrollRecords",
                columns: new[] { "PayrollPeriodId", "EmployeeId" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRecords_Status",
                table: "PayrollRecords",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAuditItems_Audit_Employee",
                table: "PayrollRunAuditItems",
                columns: new[] { "PayrollRunAuditId", "EmployeeId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAudits_PayrollPeriod_StartedAt",
                table: "PayrollRunAudits",
                columns: new[] { "PayrollPeriodId", "StartedAtUtc" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollRunAudits_PayrollPeriodId",
                table: "PayrollRunAudits",
                column: "PayrollPeriodId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceImprovementPlans_EmployeeId",
                table: "PerformanceImprovementPlans",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceImprovementPlans_ManagerId",
                table: "PerformanceImprovementPlans",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceImprovementPlans_PerformanceReviewId",
                table: "PerformanceImprovementPlans",
                column: "PerformanceReviewId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceImprovementPlans_Status",
                table: "PerformanceImprovementPlans",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceImprovementPlans_WorkflowInstanceId",
                table: "PerformanceImprovementPlans",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviewCycles_BranchId",
                table: "PerformanceReviewCycles",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviewCycles_CompetencyFrameworkId",
                table: "PerformanceReviewCycles",
                column: "CompetencyFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviewCycles_Status",
                table: "PerformanceReviewCycles",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_Cycle_Employee",
                table: "PerformanceReviews",
                columns: new[] { "PerformanceReviewCycleId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_CycleId",
                table: "PerformanceReviews",
                column: "PerformanceReviewCycleId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_EmployeeId",
                table: "PerformanceReviews",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_RelatedPromotionId",
                table: "PerformanceReviews",
                column: "RelatedPromotionId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_RelatedSalaryAdjustmentId",
                table: "PerformanceReviews",
                column: "RelatedSalaryAdjustmentId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_ReviewerEmployeeId",
                table: "PerformanceReviews",
                column: "ReviewerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_Status",
                table: "PerformanceReviews",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceReviews_WorkflowInstanceId",
                table: "PerformanceReviews",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_Key",
                table: "Permissions",
                column: "Key",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyAcknowledgments_EmployeeId",
                table: "PolicyAcknowledgments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyAcknowledgments_Policy_Employee",
                table: "PolicyAcknowledgments",
                columns: new[] { "CompanyPolicyId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_BranchId",
                table: "Projects",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Code",
                table: "Projects",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ManagerEmployeeId",
                table: "Projects",
                column: "ManagerEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Status",
                table: "Projects",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_Project_Code",
                table: "ProjectTasks",
                columns: new[] { "ProjectId", "Code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectId",
                table: "ProjectTasks",
                column: "ProjectId");

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
                name: "IX_PushNotificationTokens_DeviceId",
                table: "PushNotificationTokens",
                column: "DeviceId",
                unique: true,
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_PushNotificationTokens_DeviceToken",
                table: "PushNotificationTokens",
                column: "DeviceToken",
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_PushNotificationTokens_UserId",
                table: "PushNotificationTokens",
                column: "UserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_PushNotificationTokens_UserId_IsActive",
                table: "PushNotificationTokens",
                columns: new[] { "UserId", "IsActive" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

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
                name: "IX_RemoteWorkRequests_WorkflowInstanceId",
                table: "RemoteWorkRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_EmployeeId",
                table: "ResignationRequests",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_Status",
                table: "ResignationRequests",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_WorkflowInstanceId",
                table: "ResignationRequests",
                column: "WorkflowInstanceId");

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
                name: "IX_SalaryAdjustments_EffectiveDate",
                table: "SalaryAdjustments",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_EmployeeId",
                table: "SalaryAdjustments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_RelatedContractId",
                table: "SalaryAdjustments",
                column: "RelatedContractId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_RelatedPromotionId",
                table: "SalaryAdjustments",
                column: "RelatedPromotionId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_RelatedTransferId",
                table: "SalaryAdjustments",
                column: "RelatedTransferId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_Status",
                table: "SalaryAdjustments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdjustments_WorkflowInstanceId",
                table: "SalaryAdjustments",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_DeductionMonth",
                table: "SalaryAdvances",
                column: "DeductionMonth");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_EmployeeId",
                table: "SalaryAdvances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_PayrollRecordId",
                table: "SalaryAdvances",
                column: "PayrollRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_Status",
                table: "SalaryAdvances",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryAdvances_WorkflowInstanceId",
                table: "SalaryAdvances",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryComponents_AllowanceTypeId",
                table: "SalaryComponents",
                column: "AllowanceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryComponents_ComponentType",
                table: "SalaryComponents",
                column: "ComponentType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryComponents_SalaryStructureId",
                table: "SalaryComponents",
                column: "SalaryStructureId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryStructures_BranchId",
                table: "SalaryStructures",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryStructures_IsActive",
                table: "SalaryStructures",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SavedDashboards_UserId",
                table: "SavedDashboards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduledReports_CustomReportDefinitionId",
                table: "ScheduledReports",
                column: "CustomReportDefinitionId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduledReports_NextRunAt_IsActive",
                table: "ScheduledReports",
                columns: new[] { "NextRunAt", "IsActive" });

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
                name: "IX_ShiftSwapRequests_EmployeeId_OriginalDate",
                table: "ShiftSwapRequests",
                columns: new[] { "EmployeeId", "OriginalDate" });

            migrationBuilder.CreateIndex(
                name: "IX_ShiftSwapRequests_OriginalShiftId",
                table: "ShiftSwapRequests",
                column: "OriginalShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftSwapRequests_SwapShiftId",
                table: "ShiftSwapRequests",
                column: "SwapShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftSwapRequests_SwapWithEmployeeId_SwapDate",
                table: "ShiftSwapRequests",
                columns: new[] { "SwapWithEmployeeId", "SwapDate" });

            migrationBuilder.CreateIndex(
                name: "IX_ShiftSwapRequests_WorkflowInstanceId",
                table: "ShiftSwapRequests",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialInsuranceConfigs_BranchId",
                table: "SocialInsuranceConfigs",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SocialInsuranceConfigs_IsActive",
                table: "SocialInsuranceConfigs",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionCandidates_EmployeeId",
                table: "SuccessionCandidates",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionCandidates_Plan_Employee_Unique",
                table: "SuccessionCandidates",
                columns: new[] { "SuccessionPlanId", "EmployeeId" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionCandidates_SuccessionPlanId",
                table: "SuccessionCandidates",
                column: "SuccessionPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionCandidates_TalentProfileId",
                table: "SuccessionCandidates",
                column: "TalentProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionPlans_KeyPositionId",
                table: "SuccessionPlans",
                column: "KeyPositionId");

            migrationBuilder.CreateIndex(
                name: "IX_SuccessionPlans_Status",
                table: "SuccessionPlans",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyDistributions_Status",
                table: "SurveyDistributions",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyDistributions_Status_EndDate",
                table: "SurveyDistributions",
                columns: new[] { "Status", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyDistributions_Status_StartDate",
                table: "SurveyDistributions",
                columns: new[] { "Status", "StartDate" });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyDistributions_SurveyTemplateId",
                table: "SurveyDistributions",
                column: "SurveyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyParticipants_AnonymousToken",
                table: "SurveyParticipants",
                column: "AnonymousToken",
                unique: true,
                filter: "\"AnonymousToken\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyParticipants_Distribution_Employee",
                table: "SurveyParticipants",
                columns: new[] { "SurveyDistributionId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SurveyParticipants_EmployeeId",
                table: "SurveyParticipants",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyParticipants_Status",
                table: "SurveyParticipants",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyParticipants_SurveyDistributionId",
                table: "SurveyParticipants",
                column: "SurveyDistributionId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyQuestions_SurveyTemplateId",
                table: "SurveyQuestions",
                column: "SurveyTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyQuestions_Template_Order",
                table: "SurveyQuestions",
                columns: new[] { "SurveyTemplateId", "DisplayOrder" });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResponses_Distribution_Token",
                table: "SurveyResponses",
                columns: new[] { "SurveyDistributionId", "ParticipantToken" });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResponses_ParticipantToken",
                table: "SurveyResponses",
                column: "ParticipantToken");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResponses_SurveyDistributionId",
                table: "SurveyResponses",
                column: "SurveyDistributionId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResponses_SurveyQuestionId",
                table: "SurveyResponses",
                column: "SurveyQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyTemplates_IsActive",
                table: "SurveyTemplates",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyTemplates_SurveyType",
                table: "SurveyTemplates",
                column: "SurveyType");

            migrationBuilder.CreateIndex(
                name: "IX_TalentProfiles_EmployeeId_Unique",
                table: "TalentProfiles",
                column: "EmployeeId",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TalentProfiles_IsHighPotential",
                table: "TalentProfiles",
                column: "IsHighPotential");

            migrationBuilder.CreateIndex(
                name: "IX_TalentProfiles_NineBoxPosition",
                table: "TalentProfiles",
                column: "NineBoxPosition");

            migrationBuilder.CreateIndex(
                name: "IX_TalentProfiles_RetentionRisk",
                table: "TalentProfiles",
                column: "RetentionRisk");

            migrationBuilder.CreateIndex(
                name: "IX_TalentSkills_Profile_Skill",
                table: "TalentSkills",
                columns: new[] { "TalentProfileId", "SkillName" });

            migrationBuilder.CreateIndex(
                name: "IX_TalentSkills_TalentProfileId",
                table: "TalentSkills",
                column: "TalentProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_TaxBrackets_TaxConfigurationId",
                table: "TaxBrackets",
                column: "TaxConfigurationId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TaxConfigurations_BranchId",
                table: "TaxConfigurations",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TaxConfigurations_IsActive",
                table: "TaxConfigurations",
                column: "IsActive",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TerminationRecords_EmployeeId",
                table: "TerminationRecords",
                column: "EmployeeId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TerminationRecords_ResignationRequestId",
                table: "TerminationRecords",
                column: "ResignationRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_TerminationRecords_TerminationDate",
                table: "TerminationRecords",
                column: "TerminationDate",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TerminationRecords_TerminationType",
                table: "TerminationRecords",
                column: "TerminationType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetEntries_AttendanceRecordId",
                table: "TimesheetEntries",
                column: "AttendanceRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetEntries_ProjectId",
                table: "TimesheetEntries",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetEntries_ProjectTaskId",
                table: "TimesheetEntries",
                column: "ProjectTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetEntries_Timesheet_Date",
                table: "TimesheetEntries",
                columns: new[] { "TimesheetId", "EntryDate" });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetEntries_TimesheetId",
                table: "TimesheetEntries",
                column: "TimesheetId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetPeriods_Branch_Dates",
                table: "TimesheetPeriods",
                columns: new[] { "BranchId", "StartDate", "EndDate" });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetPeriods_BranchId",
                table: "TimesheetPeriods",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetPeriods_Status",
                table: "TimesheetPeriods",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_EmployeeId",
                table: "Timesheets",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_Period_Employee",
                table: "Timesheets",
                columns: new[] { "TimesheetPeriodId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_Status",
                table: "Timesheets",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_WorkflowInstanceId",
                table: "Timesheets",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingAttendance_EmployeeId",
                table: "TrainingAttendanceRecords",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingAttendance_Session_Employee_Date",
                table: "TrainingAttendanceRecords",
                columns: new[] { "TrainingSessionId", "EmployeeId", "AttendanceDate" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingAttendance_SessionId",
                table: "TrainingAttendanceRecords",
                column: "TrainingSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingBudgets_BranchId",
                table: "TrainingBudgets",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingBudgets_DepartmentId",
                table: "TrainingBudgets",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingBudgets_FiscalYear",
                table: "TrainingBudgets",
                column: "FiscalYear");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingBudgets_Year_Branch_Dept",
                table: "TrainingBudgets",
                columns: new[] { "FiscalYear", "BranchId", "DepartmentId" });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingCategories_IsActive",
                table: "TrainingCategories",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingCourses_CategoryId",
                table: "TrainingCourses",
                column: "TrainingCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingCourses_Code",
                table: "TrainingCourses",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingCourses_IsActive",
                table: "TrainingCourses",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_EmployeeId",
                table: "TrainingEnrollments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_EmployeeId_SessionId",
                table: "TrainingEnrollments",
                columns: new[] { "EmployeeId", "TrainingSessionId" });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_ProgramId",
                table: "TrainingEnrollments",
                column: "TrainingProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_SessionId",
                table: "TrainingEnrollments",
                column: "TrainingSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_Status",
                table: "TrainingEnrollments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEnrollments_WorkflowInstanceId",
                table: "TrainingEnrollments",
                column: "WorkflowInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEvaluations_EmployeeId",
                table: "TrainingEvaluations",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEvaluations_Session_Employee",
                table: "TrainingEvaluations",
                columns: new[] { "TrainingSessionId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingEvaluations_SessionId",
                table: "TrainingEvaluations",
                column: "TrainingSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingProgramCourses_ProgramId_CourseId",
                table: "TrainingProgramCourses",
                columns: new[] { "TrainingProgramId", "TrainingCourseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingProgramCourses_TrainingCourseId",
                table: "TrainingProgramCourses",
                column: "TrainingCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPrograms_Code",
                table: "TrainingPrograms",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPrograms_IsActive",
                table: "TrainingPrograms",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPrograms_Status",
                table: "TrainingPrograms",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_BranchId",
                table: "TrainingSessions",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_CourseId",
                table: "TrainingSessions",
                column: "TrainingCourseId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_ProgramId",
                table: "TrainingSessions",
                column: "TrainingProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_StartDate",
                table: "TrainingSessions",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_Status",
                table: "TrainingSessions",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_TwoFactorBackupCodes_UserId",
                table: "TwoFactorBackupCodes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBranchScopes_BranchId",
                table: "UserBranchScopes",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId_Priority",
                table: "UserRoles",
                columns: new[] { "RoleId", "Priority" });

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
                name: "IX_WorkflowDefinitions_BranchId",
                table: "WorkflowDefinitions",
                column: "BranchId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType",
                table: "WorkflowDefinitions",
                column: "EntityType",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType_Active",
                table: "WorkflowDefinitions",
                columns: new[] { "EntityType", "IsActive" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowDefinitions_EntityType_Branch_Default",
                table: "WorkflowDefinitions",
                columns: new[] { "EntityType", "BranchId", "IsDefault" },
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_CompletedByUserId",
                table: "WorkflowInstances",
                column: "CompletedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_CurrentStepId",
                table: "WorkflowInstances",
                column: "CurrentStepId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_EntityType_EntityId",
                table: "WorkflowInstances",
                columns: new[] { "EntityType", "EntityId" },
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_RequestedAt",
                table: "WorkflowInstances",
                column: "RequestedAt",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_RequestedByUserId",
                table: "WorkflowInstances",
                column: "RequestedByUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_ReturnedByUserId",
                table: "WorkflowInstances",
                column: "ReturnedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_Status",
                table: "WorkflowInstances",
                column: "Status",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_Status_CurrentStep",
                table: "WorkflowInstances",
                columns: new[] { "Status", "CurrentStepId" },
                filter: "\"IsDeleted\" = false AND \"Status\" = 2");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowInstances_WorkflowDefinitionId",
                table: "WorkflowInstances",
                column: "WorkflowDefinitionId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowRoleAssignmentCursors_LastAssignedUserId",
                table: "WorkflowRoleAssignmentCursors",
                column: "LastAssignedUserId");

            migrationBuilder.CreateIndex(
                name: "UX_WorkflowRoleAssignmentCursors_RoleId",
                table: "WorkflowRoleAssignmentCursors",
                column: "RoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_ActionTakenAt",
                table: "WorkflowStepExecutions",
                column: "ActionTakenAt",
                descending: new bool[0],
                filter: "\"IsDeleted\" = false AND \"ActionTakenAt\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_ActionTakenByUserId",
                table: "WorkflowStepExecutions",
                column: "ActionTakenByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_AssignedTo_Action",
                table: "WorkflowStepExecutions",
                columns: new[] { "AssignedToUserId", "Action" },
                filter: "\"IsDeleted\" = false AND \"Action\" IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_AssignedToUserId",
                table: "WorkflowStepExecutions",
                column: "AssignedToUserId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DelegatedFromExecutionId",
                table: "WorkflowStepExecutions",
                column: "DelegatedFromExecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DelegatedToUserId",
                table: "WorkflowStepExecutions",
                column: "DelegatedToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_DueAt",
                table: "WorkflowStepExecutions",
                column: "DueAt",
                filter: "\"IsDeleted\" = false AND \"Action\" IS NULL AND \"DueAt\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_StepId",
                table: "WorkflowStepExecutions",
                column: "StepId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowStepExecutions_WorkflowInstanceId",
                table: "WorkflowStepExecutions",
                column: "WorkflowInstanceId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_ApproverRoleId",
                table: "WorkflowSteps",
                column: "ApproverRoleId",
                filter: "\"IsDeleted\" = false AND \"ApproverRoleId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_ApproverUserId",
                table: "WorkflowSteps",
                column: "ApproverUserId",
                filter: "\"IsDeleted\" = false AND \"ApproverUserId\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_Definition_Order",
                table: "WorkflowSteps",
                columns: new[] { "WorkflowDefinitionId", "StepOrder" },
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_EscalationStepId",
                table: "WorkflowSteps",
                column: "EscalationStepId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSteps_WorkflowDefinitionId",
                table: "WorkflowSteps",
                column: "WorkflowDefinitionId",
                filter: "\"IsDeleted\" = false");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_ActionType",
                table: "WorkflowSystemActionAudits",
                column: "ActionType");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_Instance_TriggeredAt",
                table: "WorkflowSystemActionAudits",
                columns: new[] { "WorkflowInstanceId", "TriggeredAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_StepExecutionId",
                table: "WorkflowSystemActionAudits",
                column: "StepExecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowSystemActionAudits_SystemUserId",
                table: "WorkflowSystemActionAudits",
                column: "SystemUserId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceAssignments_AllowanceRequests_AllowanceRequestId",
                table: "AllowanceAssignments",
                column: "AllowanceRequestId",
                principalTable: "AllowanceRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceAssignments_AllowanceTypes_AllowanceTypeId",
                table: "AllowanceAssignments",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceAssignments_Employees_EmployeeId",
                table: "AllowanceAssignments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceChangeLogs_AllowanceRequests_AllowanceRequestId",
                table: "AllowanceChangeLogs",
                column: "AllowanceRequestId",
                principalTable: "AllowanceRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceChangeLogs_AllowanceTypes_AllowanceTypeId",
                table: "AllowanceChangeLogs",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceChangeLogs_Employees_EmployeeId",
                table: "AllowanceChangeLogs",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowancePolicies_AllowanceTypes_AllowanceTypeId",
                table: "AllowancePolicies",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowancePolicies_Branches_BranchId",
                table: "AllowancePolicies",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceRequests_AllowanceTypes_AllowanceTypeId",
                table: "AllowanceRequests",
                column: "AllowanceTypeId",
                principalTable: "AllowanceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceRequests_Employees_EmployeeId",
                table: "AllowanceRequests",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceRequests_WorkflowInstances_WorkflowInstanceId",
                table: "AllowanceRequests",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AllowanceTypes_Branches_BranchId",
                table: "AllowanceTypes",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AnalyticsSnapshots_Branches_BranchId",
                table: "AnalyticsSnapshots",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AnalyticsSnapshots_Departments_DepartmentId",
                table: "AnalyticsSnapshots",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnouncementAcknowledgments_Employees_EmployeeId",
                table: "AnnouncementAcknowledgments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetAssignments_Assets_AssetId",
                table: "AssetAssignments",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetAssignments_Employees_EmployeeId",
                table: "AssetAssignments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AssetMaintenanceRecords_Assets_AssetId",
                table: "AssetMaintenanceRecords",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Branches_BranchId",
                table: "Assets",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceCorrectionRequests_AttendanceTransactions_Created~",
                table: "AttendanceCorrectionRequests",
                column: "CreatedTransactionId",
                principalTable: "AttendanceTransactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceCorrectionRequests_Employees_EmployeeId",
                table: "AttendanceCorrectionRequests",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceCorrectionRequests_WorkflowInstances_WorkflowInst~",
                table: "AttendanceCorrectionRequests",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_Employees_EmployeeId",
                table: "AttendanceRecords",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_RemoteWorkRequests_RemoteWorkRequestId",
                table: "AttendanceRecords",
                column: "RemoteWorkRequestId",
                principalTable: "RemoteWorkRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_ShiftAssignments_ShiftAssignmentId",
                table: "AttendanceRecords",
                column: "ShiftAssignmentId",
                principalTable: "ShiftAssignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceTransactions_Employees_EmployeeId",
                table: "AttendanceTransactions",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceVerificationLogs_Branches",
                table: "AttendanceVerificationLogs",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceVerificationLogs_Employees",
                table: "AttendanceVerificationLogs",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BankTransferFiles_PayrollPeriods",
                table: "BankTransferFiles",
                column: "PayrollPeriodId",
                principalTable: "PayrollPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitClaims_BenefitEnrollments_BenefitEnrollmentId",
                table: "BenefitClaims",
                column: "BenefitEnrollmentId",
                principalTable: "BenefitEnrollments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitClaims_Employees_EmployeeId",
                table: "BenefitClaims",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitDependents_BenefitEnrollments_BenefitEnrollmentId",
                table: "BenefitDependents",
                column: "BenefitEnrollmentId",
                principalTable: "BenefitEnrollments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitDependents_EmployeeDependents_EmployeeDependentId",
                table: "BenefitDependents",
                column: "EmployeeDependentId",
                principalTable: "EmployeeDependents",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitEligibilityRules_Branches_BranchId",
                table: "BenefitEligibilityRules",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitEligibilityRules_Departments_DepartmentId",
                table: "BenefitEligibilityRules",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitEnrollments_Employees_EmployeeId",
                table: "BenefitEnrollments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitEnrollments_OpenEnrollmentPeriods_OpenEnrollmentPeri~",
                table: "BenefitEnrollments",
                column: "OpenEnrollmentPeriodId",
                principalTable: "OpenEnrollmentPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_BenefitEnrollments_WorkflowInstances_WorkflowInstanceId",
                table: "BenefitEnrollments",
                column: "WorkflowInstanceId",
                principalTable: "WorkflowInstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Branches_ManagerEmployee",
                table: "Branches",
                column: "ManagerEmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branches_ManagerEmployee",
                table: "Branches");

            migrationBuilder.DropTable(
                name: "AllowanceAssignments");

            migrationBuilder.DropTable(
                name: "AllowanceChangeLogs");

            migrationBuilder.DropTable(
                name: "AnalyticsSnapshots");

            migrationBuilder.DropTable(
                name: "AnnouncementAcknowledgments");

            migrationBuilder.DropTable(
                name: "AnnouncementAttachments");

            migrationBuilder.DropTable(
                name: "ApprovalDelegations");

            migrationBuilder.DropTable(
                name: "AssetAssignments");

            migrationBuilder.DropTable(
                name: "AssetMaintenanceRecords");

            migrationBuilder.DropTable(
                name: "AttendanceCorrectionRequests");

            migrationBuilder.DropTable(
                name: "AttendanceVerificationLogs");

            migrationBuilder.DropTable(
                name: "AuditChanges");

            migrationBuilder.DropTable(
                name: "BankTransferFiles");

            migrationBuilder.DropTable(
                name: "BenefitClaims");

            migrationBuilder.DropTable(
                name: "BenefitDependents");

            migrationBuilder.DropTable(
                name: "BenefitEligibilityRules");

            migrationBuilder.DropTable(
                name: "BlacklistedTokens");

            migrationBuilder.DropTable(
                name: "BranchSettingsOverrides");

            migrationBuilder.DropTable(
                name: "CareerPathSteps");

            migrationBuilder.DropTable(
                name: "ClearanceItems");

            migrationBuilder.DropTable(
                name: "CompensatoryOffs");

            migrationBuilder.DropTable(
                name: "CompetencyAssessments");

            migrationBuilder.DropTable(
                name: "CounselingRecords");

            migrationBuilder.DropTable(
                name: "DepartmentSettingsOverrides");

            migrationBuilder.DropTable(
                name: "DisciplinaryAttachments");

            migrationBuilder.DropTable(
                name: "EmergencyContacts");

            migrationBuilder.DropTable(
                name: "EmployeeAddresses");

            migrationBuilder.DropTable(
                name: "EmployeeBankDetails");

            migrationBuilder.DropTable(
                name: "EmployeeCertifications");

            migrationBuilder.DropTable(
                name: "EmployeeDocuments");

            migrationBuilder.DropTable(
                name: "EmployeeEducations");

            migrationBuilder.DropTable(
                name: "EmployeeExcuses");

            migrationBuilder.DropTable(
                name: "EmployeeInsurances");

            migrationBuilder.DropTable(
                name: "EmployeeProfileChanges");

            migrationBuilder.DropTable(
                name: "EmployeeSalaryComponents");

            migrationBuilder.DropTable(
                name: "EmployeeUserLinks");

            migrationBuilder.DropTable(
                name: "EmployeeVisas");

            migrationBuilder.DropTable(
                name: "EmployeeWorkExperiences");

            migrationBuilder.DropTable(
                name: "EndOfServiceBenefits");

            migrationBuilder.DropTable(
                name: "EndOfServicePolicyTiers");

            migrationBuilder.DropTable(
                name: "EndOfServiceResignationDeductionTiers");

            migrationBuilder.DropTable(
                name: "ExcusePolicies");

            migrationBuilder.DropTable(
                name: "ExitInterviews");

            migrationBuilder.DropTable(
                name: "ExpenseClaimItems");

            migrationBuilder.DropTable(
                name: "ExpenseReimbursements");

            migrationBuilder.DropTable(
                name: "Feedback360Responses");

            migrationBuilder.DropTable(
                name: "FinalSettlements");

            migrationBuilder.DropTable(
                name: "GoalDefinitions");

            migrationBuilder.DropTable(
                name: "GrievanceAttachments");

            migrationBuilder.DropTable(
                name: "GrievanceNotes");

            migrationBuilder.DropTable(
                name: "InterviewFeedbacks");

            migrationBuilder.DropTable(
                name: "InvestigationAttachments");

            migrationBuilder.DropTable(
                name: "InvestigationNotes");

            migrationBuilder.DropTable(
                name: "LeaveAccrualPolicies");

            migrationBuilder.DropTable(
                name: "LeaveEncashments");

            migrationBuilder.DropTable(
                name: "LeaveEntitlements");

            migrationBuilder.DropTable(
                name: "LeaveTransactions");

            migrationBuilder.DropTable(
                name: "LetterRequests");

            migrationBuilder.DropTable(
                name: "LifecycleAutomationAudits");

            migrationBuilder.DropTable(
                name: "LoanRepayments");

            migrationBuilder.DropTable(
                name: "LoginAttempts");

            migrationBuilder.DropTable(
                name: "NfcTags");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OffDays");

            migrationBuilder.DropTable(
                name: "OfferLetters");

            migrationBuilder.DropTable(
                name: "OnboardingDocuments");

            migrationBuilder.DropTable(
                name: "OnboardingTasks");

            migrationBuilder.DropTable(
                name: "OnCallSchedules");

            migrationBuilder.DropTable(
                name: "OvertimeConfigurations");

            migrationBuilder.DropTable(
                name: "PasswordHistory");

            migrationBuilder.DropTable(
                name: "PayrollAdjustments");

            migrationBuilder.DropTable(
                name: "PayrollCalendarPolicies");

            migrationBuilder.DropTable(
                name: "PayrollRecordDetails");

            migrationBuilder.DropTable(
                name: "PayrollRunAuditItems");

            migrationBuilder.DropTable(
                name: "PerformanceImprovementPlans");

            migrationBuilder.DropTable(
                name: "PolicyAcknowledgments");

            migrationBuilder.DropTable(
                name: "PublicHolidays");

            migrationBuilder.DropTable(
                name: "PushNotificationTokens");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "SalaryAdvances");

            migrationBuilder.DropTable(
                name: "SavedDashboards");

            migrationBuilder.DropTable(
                name: "ScheduledReports");

            migrationBuilder.DropTable(
                name: "ShiftPeriods");

            migrationBuilder.DropTable(
                name: "ShiftSwapRequests");

            migrationBuilder.DropTable(
                name: "SocialInsuranceConfigs");

            migrationBuilder.DropTable(
                name: "SuccessionCandidates");

            migrationBuilder.DropTable(
                name: "SurveyParticipants");

            migrationBuilder.DropTable(
                name: "SurveyResponses");

            migrationBuilder.DropTable(
                name: "TalentSkills");

            migrationBuilder.DropTable(
                name: "TaxBrackets");

            migrationBuilder.DropTable(
                name: "TenantSettings");

            migrationBuilder.DropTable(
                name: "TimesheetEntries");

            migrationBuilder.DropTable(
                name: "TrainingAttendanceRecords");

            migrationBuilder.DropTable(
                name: "TrainingBudgets");

            migrationBuilder.DropTable(
                name: "TrainingEnrollments");

            migrationBuilder.DropTable(
                name: "TrainingEvaluations");

            migrationBuilder.DropTable(
                name: "TrainingProgramCourses");

            migrationBuilder.DropTable(
                name: "TwoFactorBackupCodes");

            migrationBuilder.DropTable(
                name: "UserBranchScopes");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserSessions");

            migrationBuilder.DropTable(
                name: "WorkflowRoleAssignmentCursors");

            migrationBuilder.DropTable(
                name: "WorkflowSystemActionAudits");

            migrationBuilder.DropTable(
                name: "WorkingDays");

            migrationBuilder.DropTable(
                name: "AllowanceRequests");

            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "AttendanceTransactions");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "BenefitEnrollments");

            migrationBuilder.DropTable(
                name: "EmployeeDependents");

            migrationBuilder.DropTable(
                name: "CareerPaths");

            migrationBuilder.DropTable(
                name: "ClearanceChecklists");

            migrationBuilder.DropTable(
                name: "EmployeeVacations");

            migrationBuilder.DropTable(
                name: "Competencies");

            migrationBuilder.DropTable(
                name: "DisciplinaryActions");

            migrationBuilder.DropTable(
                name: "EmployeeSalaries");

            migrationBuilder.DropTable(
                name: "EndOfServicePolicies");

            migrationBuilder.DropTable(
                name: "ExpenseCategories");

            migrationBuilder.DropTable(
                name: "ExpenseClaims");

            migrationBuilder.DropTable(
                name: "FeedbackRequests360");

            migrationBuilder.DropTable(
                name: "InterviewSchedules");

            migrationBuilder.DropTable(
                name: "FileAttachments");

            migrationBuilder.DropTable(
                name: "LeaveBalances");

            migrationBuilder.DropTable(
                name: "LetterTemplates");

            migrationBuilder.DropTable(
                name: "LoanApplications");

            migrationBuilder.DropTable(
                name: "NotificationBroadcasts");

            migrationBuilder.DropTable(
                name: "OnboardingProcesses");

            migrationBuilder.DropTable(
                name: "OnboardingTemplateTasks");

            migrationBuilder.DropTable(
                name: "SalaryComponents");

            migrationBuilder.DropTable(
                name: "PayrollRunAudits");

            migrationBuilder.DropTable(
                name: "CompanyPolicies");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "PayrollRecords");

            migrationBuilder.DropTable(
                name: "CustomReportDefinitions");

            migrationBuilder.DropTable(
                name: "SuccessionPlans");

            migrationBuilder.DropTable(
                name: "SurveyDistributions");

            migrationBuilder.DropTable(
                name: "SurveyQuestions");

            migrationBuilder.DropTable(
                name: "TalentProfiles");

            migrationBuilder.DropTable(
                name: "TaxConfigurations");

            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "Timesheets");

            migrationBuilder.DropTable(
                name: "TrainingSessions");

            migrationBuilder.DropTable(
                name: "WorkflowStepExecutions");

            migrationBuilder.DropTable(
                name: "AllowancePolicies");

            migrationBuilder.DropTable(
                name: "AnnouncementCategories");

            migrationBuilder.DropTable(
                name: "AssetCategories");

            migrationBuilder.DropTable(
                name: "AttendanceRecords");

            migrationBuilder.DropTable(
                name: "BenefitPlanOptions");

            migrationBuilder.DropTable(
                name: "OpenEnrollmentPeriods");

            migrationBuilder.DropTable(
                name: "TerminationRecords");

            migrationBuilder.DropTable(
                name: "Investigations");

            migrationBuilder.DropTable(
                name: "ExpensePolicies");

            migrationBuilder.DropTable(
                name: "PerformanceReviews");

            migrationBuilder.DropTable(
                name: "JobApplications");

            migrationBuilder.DropTable(
                name: "VacationTypes");

            migrationBuilder.DropTable(
                name: "LoanPolicies");

            migrationBuilder.DropTable(
                name: "OnboardingTemplates");

            migrationBuilder.DropTable(
                name: "SalaryStructures");

            migrationBuilder.DropTable(
                name: "DocumentCategories");

            migrationBuilder.DropTable(
                name: "PayrollPeriods");

            migrationBuilder.DropTable(
                name: "KeyPositions");

            migrationBuilder.DropTable(
                name: "SurveyTemplates");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "TimesheetPeriods");

            migrationBuilder.DropTable(
                name: "TrainingCourses");

            migrationBuilder.DropTable(
                name: "TrainingPrograms");

            migrationBuilder.DropTable(
                name: "AllowanceTypes");

            migrationBuilder.DropTable(
                name: "RemoteWorkRequests");

            migrationBuilder.DropTable(
                name: "ShiftAssignments");

            migrationBuilder.DropTable(
                name: "BenefitPlans");

            migrationBuilder.DropTable(
                name: "ResignationRequests");

            migrationBuilder.DropTable(
                name: "Grievances");

            migrationBuilder.DropTable(
                name: "PerformanceReviewCycles");

            migrationBuilder.DropTable(
                name: "SalaryAdjustments");

            migrationBuilder.DropTable(
                name: "Candidates");

            migrationBuilder.DropTable(
                name: "JobPostings");

            migrationBuilder.DropTable(
                name: "LoanTypes");

            migrationBuilder.DropTable(
                name: "TrainingCategories");

            migrationBuilder.DropTable(
                name: "RemoteWorkPolicies");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "InsuranceProviders");

            migrationBuilder.DropTable(
                name: "CompetencyFrameworks");

            migrationBuilder.DropTable(
                name: "EmployeeContracts");

            migrationBuilder.DropTable(
                name: "EmployeePromotions");

            migrationBuilder.DropTable(
                name: "EmployeeTransfers");

            migrationBuilder.DropTable(
                name: "JobRequisitions");

            migrationBuilder.DropTable(
                name: "WorkflowInstances");

            migrationBuilder.DropTable(
                name: "WorkflowSteps");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "WorkflowDefinitions");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "JobGrades");

            migrationBuilder.DropTable(
                name: "Branches");
        }
    }
}
