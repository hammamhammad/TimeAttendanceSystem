using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RestoreSystemAdminPermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Restore all permissions to SystemAdmin role
            // This SQL assigns all existing permissions to the SystemAdmin role
            migrationBuilder.Sql(@"
                INSERT INTO RolePermissions (RoleId, PermissionId)
                SELECT 
                    r.Id, 
                    p.Id
                FROM Roles r
                CROSS JOIN Permissions p
                WHERE r.Name = 'SystemAdmin'
                AND r.IsDeleted = 0
                AND p.IsDeleted = 0
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
