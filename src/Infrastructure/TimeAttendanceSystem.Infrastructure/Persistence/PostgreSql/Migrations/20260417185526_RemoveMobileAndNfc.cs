using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMobileAndNfc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "AllowMockLocation",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "EnableGpsAttendance",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "EnableNfcAttendance",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "EnablePushNotifications",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "MobileCheckInEnabled",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "RequireGpsForMobile",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "RequireNfcForMobile",
                table: "CompanySettings");

            migrationBuilder.DropColumn(
                name: "EnableGpsAttendance",
                table: "BranchSettingsOverrides");

            migrationBuilder.DropColumn(
                name: "EnableNfcAttendance",
                table: "BranchSettingsOverrides");

            migrationBuilder.DropColumn(
                name: "MobileCheckInEnabled",
                table: "BranchSettingsOverrides");

            migrationBuilder.DropColumn(
                name: "RequireGpsForMobile",
                table: "BranchSettingsOverrides");

            migrationBuilder.DropColumn(
                name: "RequireNfcForMobile",
                table: "BranchSettingsOverrides");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<bool>(
                name: "AllowMockLocation",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EnableGpsAttendance",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EnableNfcAttendance",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EnablePushNotifications",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MobileCheckInEnabled",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequireGpsForMobile",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RequireNfcForMobile",
                table: "CompanySettings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EnableGpsAttendance",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EnableNfcAttendance",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "MobileCheckInEnabled",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireGpsForMobile",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireNfcForMobile",
                table: "BranchSettingsOverrides",
                type: "boolean",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AttendanceVerificationLogs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BranchId = table.Column<long>(type: "bigint", nullable: false, comment: "Branch where verification was attempted"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false, comment: "Employee attempting check-in/out"),
                    AppVersion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "Version of the mobile app used"),
                    AttemptedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "Timestamp of verification attempt"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    DeviceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Unique identifier of the mobile device"),
                    DeviceLatitude = table.Column<double>(type: "double precision", nullable: true, comment: "Latitude reported by employee's device"),
                    DeviceLongitude = table.Column<double>(type: "double precision", nullable: true, comment: "Longitude reported by employee's device"),
                    DeviceModel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Device model/manufacturer"),
                    DevicePlatform = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true, comment: "Device platform: ios or android"),
                    DistanceFromBranch = table.Column<double>(type: "double precision", nullable: true, comment: "Calculated distance in meters from branch"),
                    ExpectedTagUids = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Expected tag UIDs for the branch (comma-separated)"),
                    FailureReason = table.Column<int>(type: "integer", nullable: true, comment: "Specific reason for failure if applicable"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag - should remain false for audit logs"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp"),
                    ScannedTagUid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "NFC tag UID that was scanned"),
                    Status = table.Column<int>(type: "integer", nullable: false, comment: "Outcome: Success or Failed"),
                    TransactionType = table.Column<int>(type: "integer", nullable: false, comment: "Type of transaction: CheckIn, CheckOut, BreakStart, BreakEnd")
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
                    BranchId = table.Column<long>(type: "bigint", nullable: false, comment: "Branch this tag is registered to"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true, comment: "Descriptive name for tag location (e.g., Main Entrance)"),
                    EncryptedPayload = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "HMAC-signed payload written to the physical tag during provisioning"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether tag is active for verification"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    IsWriteProtected = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Whether tag has been permanently write-protected"),
                    LastScannedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Timestamp of the last successful scan"),
                    LockedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Timestamp when tag was write-protected"),
                    LockedByUserId = table.Column<long>(type: "bigint", nullable: true, comment: "User who applied write protection"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp"),
                    ScanCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Total number of successful scans"),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1, comment: "Lifecycle status: Unregistered(0), Registered(1), Active(2), Disabled(3), Lost(4)"),
                    TagUid = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Unique hardware identifier of the NFC tag"),
                    VerificationHash = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "SHA256 hash of the encrypted payload for integrity verification")
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
                    SentByUserId = table.Column<long>(type: "bigint", nullable: false, comment: "Admin user who initiated the broadcast"),
                    ActionUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true, comment: "Optional URL to navigate on notification tap"),
                    Channel = table.Column<int>(type: "integer", nullable: false, comment: "Delivery channel: InApp, Push, Both"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    DeliveredCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Number of successfully delivered notifications"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    Message = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false, comment: "Broadcast message in English"),
                    MessageAr = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false, comment: "Broadcast message in Arabic"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    RowVersion = table.Column<byte[]>(type: "bytea", nullable: false, defaultValue: new byte[] { 1 }, comment: "Concurrency control timestamp"),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When broadcast was initiated"),
                    TargetIds = table.Column<string>(type: "character varying(4000)", maxLength: 4000, nullable: true, comment: "JSON array of target IDs based on TargetType"),
                    TargetType = table.Column<int>(type: "integer", nullable: false, comment: "Target type: All, Branch, Department, Employees"),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Broadcast title in English"),
                    TitleAr = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false, comment: "Broadcast title in Arabic"),
                    TotalRecipients = table.Column<int>(type: "integer", nullable: false, defaultValue: 0, comment: "Total number of intended recipients")
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
                    AppVersion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true, comment: "App version when token was registered"),
                    CreatedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()", comment: "UTC timestamp when record was created"),
                    CreatedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "User who created the record"),
                    DeviceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false, comment: "Unique identifier for the device"),
                    DeviceModel = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "Device model/name for admin reference"),
                    DeviceToken = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false, comment: "Firebase Cloud Messaging device token"),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true, comment: "Whether token is active for notifications"),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Soft delete flag"),
                    LastUsedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "When token was last used for notification"),
                    ModifiedAtUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "UTC timestamp when record was last modified"),
                    ModifiedBy = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true, comment: "User who last modified the record"),
                    Platform = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, comment: "Device platform: android or ios"),
                    RegisteredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, comment: "When token was registered"),
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

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_NotificationBroadcasts",
                table: "Notifications",
                column: "BroadcastId",
                principalTable: "NotificationBroadcasts",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
