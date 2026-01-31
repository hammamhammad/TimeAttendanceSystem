using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddMobileEssFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FingerprintRequests");

            migrationBuilder.AddColumn<long>(
                name: "BroadcastId",
                table: "Notifications",
                type: "bigint",
                nullable: true,
                comment: "ID of the broadcast this notification belongs to");

            migrationBuilder.AddColumn<int>(
                name: "Channel",
                table: "Notifications",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                comment: "Delivery channel: InApp, Push, Both");

            migrationBuilder.AddColumn<string>(
                name: "DeepLink",
                table: "Notifications",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                comment: "Deep link path for mobile app navigation");

            migrationBuilder.AddColumn<int>(
                name: "GeofenceRadiusMeters",
                table: "Branches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Branches",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Branches",
                type: "double precision",
                nullable: true);

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
                    table.ForeignKey(
                        name: "FK_AttendanceVerificationLogs_Branches",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AttendanceVerificationLogs_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
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
                name: "Tenants",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Subdomain = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Subdomain identifier for tenant (e.g., acme)"),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Display name of the tenant organization"),
                    NameAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Arabic display name of the tenant organization"),
                    LogoUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "URL to tenant's logo image"),
                    ApiBaseUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, comment: "Base URL for tenant's API endpoint"),
                    CustomDomain = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Optional custom domain for enterprise tenants"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether tenant account is active"),
                    DatabaseIdentifier = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Database connection identifier for tenant isolation"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tenants", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_BroadcastId",
                table: "Notifications",
                column: "BroadcastId",
                filter: "\"IsDeleted\" = false AND \"BroadcastId\" IS NOT NULL");

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
                name: "IX_Tenants_CustomDomain",
                table: "Tenants",
                column: "CustomDomain",
                unique: true,
                filter: "\"IsDeleted\" = false AND \"CustomDomain\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Tenants_IsActive",
                table: "Tenants",
                column: "IsActive",
                filter: "\"IsDeleted\" = false AND \"IsActive\" = true");

            migrationBuilder.CreateIndex(
                name: "IX_Tenants_Subdomain",
                table: "Tenants",
                column: "Subdomain",
                unique: true,
                filter: "\"IsDeleted\" = false");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationBroadcasts",
                table: "Notifications",
                column: "BroadcastId",
                principalTable: "NotificationBroadcasts",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_NotificationBroadcasts",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "AttendanceVerificationLogs");

            migrationBuilder.DropTable(
                name: "NfcTags");

            migrationBuilder.DropTable(
                name: "NotificationBroadcasts");

            migrationBuilder.DropTable(
                name: "PushNotificationTokens");

            migrationBuilder.DropTable(
                name: "Tenants");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_BroadcastId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "BroadcastId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Channel",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "DeepLink",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "GeofenceRadiusMeters",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Branches");

            migrationBuilder.CreateTable(
                name: "FingerprintRequests",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    TechnicianId = table.Column<long>(type: "bigint", nullable: true),
                    AffectedFingers = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    CompletedDate = table.Column<DateTime>(type: "timestamp", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    IssueDescription = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModifiedBy = table.Column<string>(type: "text", nullable: true),
                    PreferredDate = table.Column<DateTime>(type: "timestamp", nullable: true),
                    PreferredTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    RequestType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp", nullable: true),
                    ScheduledTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    TechnicianNotes = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FingerprintRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FingerprintRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FingerprintRequests_Users_TechnicianId",
                        column: x => x.TechnicianId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_EmployeeId",
                table: "FingerprintRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_EmployeeId_Status",
                table: "FingerprintRequests",
                columns: new[] { "EmployeeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_ScheduledDate",
                table: "FingerprintRequests",
                column: "ScheduledDate");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_Status",
                table: "FingerprintRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_FingerprintRequests_TechnicianId",
                table: "FingerprintRequests",
                column: "TechnicianId");
        }
    }
}
