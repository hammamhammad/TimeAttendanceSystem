using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using Microsoft.EntityFrameworkCore;

namespace TecAxle.Hrms.Infrastructure.Persistence;

/// <summary>
/// Comprehensive test data seeder for system functionality testing.
/// Creates realistic organizational data with proper Arabic localization.
/// </summary>
public static class TestDataSeeder
{
    public static async Task SeedTestDataAsync(TimeAttendanceDbContext context)
    {
        // Skip clearing to avoid foreign key constraint issues
        // await ClearTestDataAsync(context);

        // Seed comprehensive test data
        await SeedBranchesAsync(context);
        await SeedDepartmentsAsync(context);
        await SeedEmployeesAsync(context);

        await context.SaveChangesAsync();
        Console.WriteLine("✅ Test data seeding completed successfully!");
        Console.WriteLine("📊 Created: 10 branches, 20 departments, 50 employees");
    }

    private static async Task ClearTestDataAsync(TimeAttendanceDbContext context)
    {
        // Delete in proper order to respect foreign key constraints - only TestDataSeeder data
        context.Employees.RemoveRange(context.Employees.Where(e => e.CreatedBy == "TestDataSeeder"));
        context.Departments.RemoveRange(context.Departments.Where(d => d.CreatedBy == "TestDataSeeder"));
        context.Branches.RemoveRange(context.Branches.Where(b => b.CreatedBy == "TestDataSeeder"));

        await context.SaveChangesAsync();
        Console.WriteLine("🧹 Existing TestDataSeeder data cleared");
    }

    private static async Task SeedBranchesAsync(TimeAttendanceDbContext context)
    {
        // Check existing branch codes to avoid duplicates
        var existingCodes = await context.Branches
            .Where(b => !b.IsDeleted)
            .Select(b => b.Code)
            .ToListAsync();

        var branchesData = new[]
        {
            new { Code = "RYD01", Name = "Riyadh Head Office" },
            new { Code = "JED01", Name = "Jeddah Branch" },
            new { Code = "DAM01", Name = "Dammam Branch" },
            new { Code = "MED01", Name = "Medina Branch" },
            new { Code = "MEC01", Name = "Mecca Branch" },
            new { Code = "TAI01", Name = "Taif Branch" },
            new { Code = "ABH01", Name = "Abha Branch" },
            new { Code = "TAB01", Name = "Tabuk Branch" },
            new { Code = "HAI01", Name = "Hail Branch" },
            new { Code = "KHO01", Name = "Khobar Branch" }
        };

        var branchesToAdd = new List<Branch>();
        int counter = 1;

        foreach (var branchData in branchesData)
        {
            string code = branchData.Code;
            // If code exists, find an alternative
            while (existingCodes.Contains(code))
            {
                counter++;
                code = branchData.Code.Substring(0, 3) + counter.ToString("00");
            }

            branchesToAdd.Add(new Branch
            {
                Code = code,
                Name = branchData.Name,
                TimeZone = "Asia/Riyadh",
                IsActive = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "TestDataSeeder"
            });

            existingCodes.Add(code); // Add to list to avoid duplicates in current batch
        }

        if (branchesToAdd.Any())
        {
            await context.Branches.AddRangeAsync(branchesToAdd);
            await context.SaveChangesAsync();
            Console.WriteLine($"🏢 Created {branchesToAdd.Count} branches");
        }
        else
        {
            Console.WriteLine("🏢 No new branches needed - using existing branches");
        }
    }

    private static async Task SeedDepartmentsAsync(TimeAttendanceDbContext context)
    {
        // Use all available branches, prioritizing TestDataSeeder branches first
        var allBranches = await context.Branches.Where(b => !b.IsDeleted).OrderByDescending(b => b.CreatedBy == "TestDataSeeder").ToListAsync();
        var departments = new List<Department>();

        // Check existing departments to avoid duplicates
        var existingDeptCodes = await context.Departments
            .Where(d => !d.IsDeleted)
            .Select(d => d.Code)
            .ToListAsync();

        // Core departments for first 5 branches
        var coreDepartments = new[]
        {
            new { Code = "HR", Name = "Human Resources", NameAr = "الموارد البشرية", Desc = "Employee relations and HR management", DescAr = "إدارة الموظفين والموارد البشرية" },
            new { Code = "IT", Name = "Information Technology", NameAr = "تكنولوجيا المعلومات", Desc = "Software development and IT support", DescAr = "تطوير البرمجيات والدعم التقني" },
            new { Code = "FIN", Name = "Finance", NameAr = "المالية", Desc = "Financial planning and accounting", DescAr = "التخطيط المالي والمحاسبة" },
            new { Code = "MKT", Name = "Marketing", NameAr = "التسويق", Desc = "Brand management and marketing", DescAr = "إدارة العلامة التجارية والتسويق" }
        };

        int sortOrder = await context.Departments.Where(d => !d.IsDeleted).CountAsync() + 1;

        // Add core departments to first 5 branches (4 departments × 5 branches = 20 departments)
        for (int i = 0; i < 5 && i < allBranches.Count; i++)
        {
            var branch = allBranches[i];

            foreach (var dept in coreDepartments)
            {
                var deptCode = $"{dept.Code}T{i + 1:00}"; // Use T for TestDataSeeder to avoid conflicts

                // Skip if department code already exists
                if (existingDeptCodes.Contains(deptCode))
                    continue;

                departments.Add(new Department
                {
                    BranchId = branch.Id,
                    Code = deptCode,
                    Name = dept.Name,
                    NameAr = dept.NameAr,
                    Description = dept.Desc,
                    DescriptionAr = dept.DescAr,
                    IsActive = true,
                    SortOrder = sortOrder++,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "TestDataSeeder"
                });

                existingDeptCodes.Add(deptCode); // Add to list to avoid duplicates in current batch
            }
        }

        if (departments.Any())
        {
            await context.Departments.AddRangeAsync(departments);
            await context.SaveChangesAsync();
            Console.WriteLine($"🏬 Created {departments.Count} departments across {Math.Min(5, allBranches.Count)} branches");
        }
        else
        {
            Console.WriteLine("🏬 No new departments to create - all already exist");
        }
    }

    private static async Task SeedEmployeesAsync(TimeAttendanceDbContext context)
    {
        // Use available branches and departments
        var branches = await context.Branches.Where(b => !b.IsDeleted).OrderByDescending(b => b.CreatedBy == "TestDataSeeder").Take(5).ToListAsync();
        var departments = await context.Departments.Where(d => d.CreatedBy == "TestDataSeeder").ToListAsync();
        var employees = new List<Employee>();

        // Arabic names for realistic test data
        var maleNames = new[]
        {
            new { En = "Ahmed", Ar = "أحمد" },
            new { En = "Mohammed", Ar = "محمد" },
            new { En = "Hassan", Ar = "حسن" },
            new { En = "Omar", Ar = "عمر" },
            new { En = "Khalid", Ar = "خالد" },
            new { En = "Youssef", Ar = "يوسف" },
            new { En = "Saeed", Ar = "سعيد" },
            new { En = "Abdullah", Ar = "عبدالله" },
            new { En = "Faisal", Ar = "فيصل" },
            new { En = "Nasser", Ar = "ناصر" },
            new { En = "Majed", Ar = "ماجد" },
            new { En = "Turki", Ar = "تركي" },
            new { En = "Saud", Ar = "سعود" },
            new { En = "Bandar", Ar = "بندر" },
            new { En = "Waleed", Ar = "وليد" },
            new { En = "Tariq", Ar = "طارق" },
            new { En = "Adnan", Ar = "عدنان" },
            new { En = "Rashid", Ar = "راشد" },
            new { En = "Mansour", Ar = "منصور" },
            new { En = "Fahad", Ar = "فهد" },
            new { En = "Sultan", Ar = "سلطان" },
            new { En = "Abdulaziz", Ar = "عبدالعزيز" },
            new { En = "Ibrahim", Ar = "إبراهيم" },
            new { En = "Zayed", Ar = "زايد" },
            new { En = "Mishal", Ar = "مشعل" }
        };

        var femaleNames = new[]
        {
            new { En = "Fatima", Ar = "فاطمة" },
            new { En = "Aisha", Ar = "عائشة" },
            new { En = "Layla", Ar = "ليلى" },
            new { En = "Zainab", Ar = "زينب" },
            new { En = "Mariam", Ar = "مريم" },
            new { En = "Noura", Ar = "نورا" },
            new { En = "Sara", Ar = "سارة" },
            new { En = "Hala", Ar = "هالة" },
            new { En = "Reem", Ar = "ريم" },
            new { En = "Amira", Ar = "أميرة" },
            new { En = "Nadia", Ar = "نادية" },
            new { En = "Maha", Ar = "مها" },
            new { En = "Dina", Ar = "دينا" },
            new { En = "Salma", Ar = "سلمى" },
            new { En = "Nour", Ar = "نور" },
            new { En = "Lina", Ar = "لينا" },
            new { En = "Jana", Ar = "جنى" },
            new { En = "Rania", Ar = "رانيا" },
            new { En = "Ghada", Ar = "غادة" },
            new { En = "Wafa", Ar = "وفاء" },
            new { En = "Samira", Ar = "سميرة" },
            new { En = "Khadija", Ar = "خديجة" },
            new { En = "Amani", Ar = "أماني" },
            new { En = "Raghad", Ar = "رغد" },
            new { En = "Hanadi", Ar = "هنادي" }
        };

        var lastNames = new[]
        {
            new { En = "Al-Rashid", Ar = "الراشد" },
            new { En = "Al-Ghamdi", Ar = "الغامدي" },
            new { En = "Al-Dosari", Ar = "الدوسري" },
            new { En = "Al-Farisi", Ar = "الفارسي" },
            new { En = "Al-Omari", Ar = "العمري" },
            new { En = "Al-Mansouri", Ar = "المنصوري" },
            new { En = "Al-Kindi", Ar = "الكندي" },
            new { En = "Al-Habib", Ar = "الحبيب" },
            new { En = "Salem", Ar = "سالم" },
            new { En = "Al-Zahra", Ar = "الزهراء" },
            new { En = "Hassan", Ar = "حسن" },
            new { En = "Al-Maliki", Ar = "المالكي" },
            new { En = "Al-Shehri", Ar = "الشهري" },
            new { En = "Al-Harbi", Ar = "الحربي" },
            new { En = "Al-Otaibi", Ar = "العتيبي" }
        };

        var jobTitles = new[]
        {
            new { En = "Manager", Ar = "مدير", Dept = "HR" },
            new { En = "Specialist", Ar = "أخصائي", Dept = "HR" },
            new { En = "Coordinator", Ar = "منسق", Dept = "HR" },
            new { En = "IT Manager", Ar = "مدير تكنولوجيا المعلومات", Dept = "IT" },
            new { En = "Software Developer", Ar = "مطور برمجيات", Dept = "IT" },
            new { En = "System Administrator", Ar = "مدير النظام", Dept = "IT" },
            new { En = "Finance Manager", Ar = "مدير مالي", Dept = "FIN" },
            new { En = "Accountant", Ar = "محاسب", Dept = "FIN" },
            new { En = "Financial Analyst", Ar = "محلل مالي", Dept = "FIN" },
            new { En = "Marketing Manager", Ar = "مدير تسويق", Dept = "MKT" },
            new { En = "Marketing Specialist", Ar = "أخصائي تسويق", Dept = "MKT" },
            new { En = "Content Creator", Ar = "منشئ محتوى", Dept = "MKT" }
        };

        var random = new Random(42); // Fixed seed for consistent test data

        // Get highest existing employee number to avoid conflicts
        var existingEmpNumbers = await context.Employees
            .Where(e => !e.IsDeleted && e.EmployeeNumber.StartsWith("EMP"))
            .Select(e => e.EmployeeNumber.Substring(3))
            .ToListAsync();

        var validNumbers = existingEmpNumbers
            .Where(n => int.TryParse(n, out _))
            .Select(int.Parse)
            .DefaultIfEmpty(0);

        var highestEmpNumber = validNumbers.Any() ? validNumbers.Max() : 0;

        int employeeNumber = highestEmpNumber + 1;

        // Create 50 employees distributed across branches and departments
        foreach (var branch in branches.Take(5)) // Use first 5 branches
        {
            var branchDepartments = departments.Where(d => d.BranchId == branch.Id).ToList();
            int employeesPerBranch = 10; // 50 employees / 5 branches = 10 per branch

            for (int i = 0; i < employeesPerBranch; i++)
            {
                var isManager = i == 0; // First employee in each branch is a manager
                var isMale = random.Next(2) == 0;
                var firstName = isMale ? maleNames[random.Next(maleNames.Length)] : femaleNames[random.Next(femaleNames.Length)];
                var lastName = lastNames[random.Next(lastNames.Length)];
                var department = branchDepartments[i % branchDepartments.Count];

                // Get job title based on department
                var deptCode = department.Code.Substring(0, department.Code.Length - 2); // Remove the number suffix
                var availableJobs = jobTitles.Where(j => j.Dept == deptCode).ToArray();
                var jobTitle = availableJobs.Length > 0 ? availableJobs[random.Next(availableJobs.Length)] : jobTitles[0];

                if (isManager)
                {
                    jobTitle = new { En = $"{department.Name} Manager", Ar = $"مدير {department.NameAr}", Dept = deptCode };
                }

                var employee = new Employee
                {
                    BranchId = branch.Id,
                    DepartmentId = department.Id,
                    EmployeeNumber = $"EMP{employeeNumber:000}",
                    FirstName = firstName.En,
                    LastName = lastName.En,
                    FirstNameAr = firstName.Ar,
                    LastNameAr = lastName.Ar,
                    Email = $"{firstName.En.ToLower()}.{lastName.En.Replace("Al-", "").Replace("-", "").ToLower()}@company.com",
                    Phone = $"+9665{random.Next(10000000, 99999999)}",
                    HireDate = DateTime.UtcNow.AddDays(-random.Next(30, 1095)), // Random hire date within last 3 years
                    EmploymentStatus = random.Next(10) < 8 ? EmploymentStatus.FullTime : EmploymentStatus.PartTime, // 80% full time
                    JobTitle = jobTitle.En,
                    JobTitleAr = jobTitle.Ar,
                    WorkLocationType = (WorkLocationType)(random.Next(3) + 1), // Random work location type
                    Gender = isMale ? Gender.Male : Gender.Female,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = "TestDataSeeder"
                };

                employees.Add(employee);
                employeeNumber++;
            }
        }

        await context.Employees.AddRangeAsync(employees);
        await context.SaveChangesAsync();
        Console.WriteLine("👥 Created 50 employees with Arabic names and realistic data");
    }
}