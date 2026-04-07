using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TecAxle.Hrms.Infrastructure.Persistence.PostgreSql.Migrations
{
    /// <inheritdoc />
    public partial class AddPhase6SuccessionPlanning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CareerPathSteps");

            migrationBuilder.DropTable(
                name: "SuccessionCandidates");

            migrationBuilder.DropTable(
                name: "TalentSkills");

            migrationBuilder.DropTable(
                name: "CareerPaths");

            migrationBuilder.DropTable(
                name: "SuccessionPlans");

            migrationBuilder.DropTable(
                name: "TalentProfiles");

            migrationBuilder.DropTable(
                name: "KeyPositions");
        }
    }
}
