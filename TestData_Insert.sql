-- Test Data Insertion Script for Time Attendance System
-- This script inserts 10 branches, 20 departments, and 50 employees for testing

USE TimeAttendanceSystem;
GO

SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

DECLARE @CreatedBy NVARCHAR(100) = 'TestDataScript';
DECLARE @CreatedAtUtc DATETIME2 = GETUTCDATE();

-- Clear existing test data (optional - uncomment if needed)
-- DELETE FROM Employees WHERE EmployeeNumber LIKE 'EMP%';
-- DELETE FROM Departments WHERE Code LIKE 'DEPT%';
-- DELETE FROM Branches WHERE Code LIKE 'BR%';

-- Insert 10 Branches
INSERT INTO Branches (Code, Name, TimeZone, IsActive, IsDeleted, CreatedAtUtc, CreatedBy)
VALUES
    ('BR001', 'New York Headquarters', 'America/New_York', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR002', 'Los Angeles Office', 'America/Los_Angeles', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR003', 'London Branch', 'Europe/London', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR004', 'Tokyo Office', 'Asia/Tokyo', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR005', 'Dubai Branch', 'Asia/Dubai', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR006', 'Toronto Office', 'America/Toronto', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR007', 'Sydney Branch', 'Australia/Sydney', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR008', 'Berlin Office', 'Europe/Berlin', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR009', 'Singapore Branch', 'Asia/Singapore', 1, 0, @CreatedAtUtc, @CreatedBy),
    ('BR010', 'Mumbai Office', 'Asia/Kolkata', 1, 0, @CreatedAtUtc, @CreatedBy);

-- Insert 20 Departments (2 per branch)
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, IsActive, SortOrder, IsDeleted, CreatedAtUtc, CreatedBy)
SELECT
    b.Id as BranchId,
    dept.Code,
    dept.Name,
    dept.NameAr,
    dept.Description,
    1 as IsActive,
    dept.SortOrder,
    0 as IsDeleted,
    @CreatedAtUtc,
    @CreatedBy
FROM Branches b
CROSS JOIN (
    SELECT 'DEPT01' as Code, 'Human Resources' as Name, N'الموارد البشرية' as NameAr, 'Employee relations, recruitment, and HR policies' as Description, 1 as SortOrder
    UNION ALL SELECT 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', 2
) dept
WHERE b.Code IN ('BR001', 'BR002', 'BR003', 'BR004', 'BR005', 'BR006', 'BR007', 'BR008', 'BR009', 'BR010');

-- Additional specialized departments for larger branches
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, IsActive, SortOrder, IsDeleted, CreatedAtUtc, CreatedBy)
SELECT
    b.Id as BranchId,
    dept.Code,
    dept.Name,
    dept.NameAr,
    dept.Description,
    1 as IsActive,
    dept.SortOrder,
    0 as IsDeleted,
    @CreatedAtUtc,
    @CreatedBy
FROM Branches b
CROSS JOIN (
    SELECT 'DEPT03' as Code, 'Finance & Accounting' as Name, N'المالية والمحاسبة' as NameAr, 'Financial planning, accounting, and budget management' as Description, 3 as SortOrder
    UNION ALL SELECT 'DEPT04', 'Sales & Marketing', N'المبيعات والتسويق', 'Customer acquisition, sales operations, and marketing campaigns', 4
    UNION ALL SELECT 'DEPT05', 'Operations', N'العمليات', 'Daily operations, logistics, and process management', 5
    UNION ALL SELECT 'DEPT06', 'Customer Support', N'دعم العملاء', 'Customer service, technical support, and client relations', 6
) dept
WHERE b.Code IN ('BR001', 'BR002', 'BR003', 'BR004', 'BR005'); -- Only for first 5 branches

-- Insert 50 Employees distributed across branches and departments
WITH EmployeeData AS (
    SELECT
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) as RowNum,
        b.Id as BranchId,
        d.Id as DepartmentId,
        emp.*
    FROM Branches b
    INNER JOIN Departments d ON b.Id = d.BranchId
    CROSS JOIN (
        -- Employee template data
        SELECT 'John' as FirstName, 'Smith' as LastName, N'جون' as FirstNameAr, N'سميث' as LastNameAr, 'john.smith' as EmailPrefix, 'Software Developer' as JobTitle, N'مطور برمجيات' as JobTitleAr, '1990-05-15' as DOB, 1 as Gender, 1 as EmploymentStatus, 1 as WorkLocationType
        UNION ALL SELECT 'Sarah', 'Johnson', N'سارة', N'جونسون', 'sarah.johnson', 'HR Manager', N'مدير الموارد البشرية', '1985-03-22', 2, 1, 1
        UNION ALL SELECT 'Michael', 'Brown', N'مايكل', N'براون', 'michael.brown', 'Financial Analyst', N'محلل مالي', '1992-11-08', 1, 1, 2
        UNION ALL SELECT 'Emily', 'Davis', N'إيميلي', N'ديفيس', 'emily.davis', 'Sales Representative', N'مندوب مبيعات', '1988-07-30', 2, 1, 3
        UNION ALL SELECT 'David', 'Wilson', N'ديفيد', N'ويلسون', 'david.wilson', 'Operations Coordinator', N'منسق العمليات', '1991-12-03', 1, 1, 1
        UNION ALL SELECT 'Jessica', 'Miller', N'جيسيكا', N'ميلر', 'jessica.miller', 'Customer Support Specialist', N'أخصائي دعم العملاء', '1993-09-18', 2, 1, 2
        UNION ALL SELECT 'Christopher', 'Garcia', N'كريستوفر', N'غارسيا', 'christopher.garcia', 'System Administrator', N'مدير النظام', '1987-04-25', 1, 1, 1
        UNION ALL SELECT 'Amanda', 'Martinez', N'أماندا', N'مارتينيز', 'amanda.martinez', 'Marketing Coordinator', N'منسق التسويق', '1994-01-12', 2, 2, 3
        UNION ALL SELECT 'Matthew', 'Anderson', N'ماثيو', N'أندرسون', 'matthew.anderson', 'Business Analyst', N'محلل أعمال', '1989-06-07', 1, 1, 1
        UNION ALL SELECT 'Ashley', 'Taylor', N'آشلي', N'تايلور', 'ashley.taylor', 'Project Manager', N'مدير المشروع', '1986-10-14', 2, 1, 2
    ) emp
)
INSERT INTO Employees (
    BranchId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr,
    NationalId, Email, Phone, DateOfBirth, Gender, HireDate, EmploymentStatus,
    JobTitle, JobTitleAr, DepartmentId, WorkLocationType,
    IsDeleted, CreatedAtUtc, CreatedBy
)
SELECT
    BranchId,
    'EMP' + RIGHT('0000' + CAST(RowNum as VARCHAR(4)), 4) as EmployeeNumber,
    FirstName,
    LastName,
    FirstNameAr,
    LastNameAr,
    'NID' + RIGHT('00000000' + CAST(ABS(CHECKSUM(NEWID())) % 100000000 as VARCHAR(8)), 8) as NationalId,
    EmailPrefix + '@company.com' as Email,
    '+1-' + RIGHT('000' + CAST(ABS(CHECKSUM(NEWID())) % 1000 as VARCHAR(3)), 3) + '-' + RIGHT('0000' + CAST(ABS(CHECKSUM(NEWID())) % 10000 as VARCHAR(4)), 4) as Phone,
    CAST(DOB as DATE) as DateOfBirth,
    Gender,
    DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 1825, @CreatedAtUtc) as HireDate, -- Random hire date within last 5 years
    EmploymentStatus,
    JobTitle,
    JobTitleAr,
    DepartmentId,
    WorkLocationType,
    0 as IsDeleted,
    @CreatedAtUtc,
    @CreatedBy
FROM EmployeeData
WHERE RowNum <= 50;

-- Update some employees to have managers (create hierarchy)
WITH ManagerAssignments AS (
    SELECT
        e1.Id as EmployeeId,
        e2.Id as ManagerId
    FROM Employees e1
    INNER JOIN Employees e2 ON e1.BranchId = e2.BranchId
        AND e1.DepartmentId = e2.DepartmentId
        AND e1.Id != e2.Id
        AND e2.JobTitle IN ('HR Manager', 'Project Manager', 'System Administrator')
    WHERE e1.JobTitle NOT IN ('HR Manager', 'Project Manager', 'System Administrator')
    AND EXISTS (
        SELECT 1 FROM (
            SELECT TOP 3 Id FROM Employees e3
            WHERE e3.BranchId = e1.BranchId
            AND e3.DepartmentId = e1.DepartmentId
            ORDER BY e3.Id
        ) t WHERE t.Id = e1.Id
    )
)
UPDATE e
SET ManagerEmployeeId = ma.ManagerId,
    ModifiedAtUtc = @CreatedAtUtc,
    ModifiedBy = @CreatedBy
FROM Employees e
INNER JOIN ManagerAssignments ma ON e.Id = ma.EmployeeId;

-- Display summary of inserted data
SELECT
    'Branches' as EntityType,
    COUNT(*) as TotalCount,
    COUNT(CASE WHEN IsActive = 1 THEN 1 END) as ActiveCount
FROM Branches
WHERE Code LIKE 'BR%'

UNION ALL

SELECT
    'Departments' as EntityType,
    COUNT(*) as TotalCount,
    COUNT(CASE WHEN IsActive = 1 THEN 1 END) as ActiveCount
FROM Departments
WHERE Code LIKE 'DEPT%'

UNION ALL

SELECT
    'Employees' as EntityType,
    COUNT(*) as TotalCount,
    COUNT(CASE WHEN EmploymentStatus != 6 THEN 1 END) as ActiveCount -- Not terminated
FROM Employees
WHERE EmployeeNumber LIKE 'EMP%';

-- Display branch-wise employee distribution
SELECT
    b.Code as BranchCode,
    b.Name as BranchName,
    COUNT(e.Id) as EmployeeCount,
    COUNT(DISTINCT d.Id) as DepartmentCount
FROM Branches b
LEFT JOIN Departments d ON b.Id = d.BranchId
LEFT JOIN Employees e ON d.Id = e.DepartmentId
WHERE b.Code LIKE 'BR%'
GROUP BY b.Code, b.Name
ORDER BY b.Code;

-- Display department-wise employee distribution
SELECT
    b.Code as BranchCode,
    d.Code as DeptCode,
    d.Name as DepartmentName,
    COUNT(e.Id) as EmployeeCount
FROM Branches b
INNER JOIN Departments d ON b.Id = d.BranchId
LEFT JOIN Employees e ON d.Id = e.DepartmentId
WHERE b.Code LIKE 'BR%' AND d.Code LIKE 'DEPT%'
GROUP BY b.Code, d.Code, d.Name
ORDER BY b.Code, d.Code;

PRINT 'Test data insertion completed successfully!';
PRINT 'Summary:';
PRINT '- 10 Branches inserted';
PRINT '- 20+ Departments inserted (2+ per branch)';
PRINT '- 50 Employees inserted across all branches and departments';
PRINT '- Manager relationships established for hierarchical structure';