using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class LatestModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EncryptedPayload",
                table: "NfcTags",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                comment: "HMAC-signed payload written to the physical tag during provisioning");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastScannedAt",
                table: "NfcTags",
                type: "timestamp with time zone",
                nullable: true,
                comment: "Timestamp of the last successful scan");

            migrationBuilder.AddColumn<int>(
                name: "ScanCount",
                table: "NfcTags",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                comment: "Total number of successful scans");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "NfcTags",
                type: "integer",
                nullable: false,
                defaultValue: 1,
                comment: "Lifecycle status: Unregistered(0), Registered(1), Active(2), Disabled(3), Lost(4)");

            migrationBuilder.AddColumn<string>(
                name: "VerificationHash",
                table: "NfcTags",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                comment: "SHA256 hash of the encrypted payload for integrity verification");

            migrationBuilder.CreateIndex(
                name: "IX_NfcTags_Status",
                table: "NfcTags",
                column: "Status",
                filter: "\"IsDeleted\" = false");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_NfcTags_Status",
                table: "NfcTags");

            migrationBuilder.DropColumn(
                name: "EncryptedPayload",
                table: "NfcTags");

            migrationBuilder.DropColumn(
                name: "LastScannedAt",
                table: "NfcTags");

            migrationBuilder.DropColumn(
                name: "ScanCount",
                table: "NfcTags");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "NfcTags");

            migrationBuilder.DropColumn(
                name: "VerificationHash",
                table: "NfcTags");
        }
    }
}
