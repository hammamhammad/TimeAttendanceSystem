-- Fix Arabic Encoding - Clear test data and reinsert with proper UTF-8 encoding
-- This script will clean all test data and reinsert with correct Arabic characters

USE TimeAttendanceSystem;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

-- Delete test data in proper order to avoid foreign key constraints
DELETE FROM EmployeeUserLinks;
DELETE FROM Employees;
DELETE FROM Departments;
DELETE FROM UserBranchScopes;
DELETE FROM UserSessions WHERE UserId > 1; -- Keep system admin session
DELETE FROM RefreshTokens WHERE UserId > 1;
DELETE FROM UserRoles WHERE UserId > 1;
DELETE FROM Users WHERE Id > 1; -- Keep system admin user
DELETE FROM RolePermissions WHERE RoleId > 1; -- Keep system admin role permissions
DELETE FROM Roles WHERE Id > 1; -- Keep system admin role
-- Keep Branches and Permissions as they might be needed by system admin

PRINT 'Test data cleared successfully';

-- Reset identity columns
DBCC CHECKIDENT ('Users', RESEED, 1);
DBCC CHECKIDENT ('Roles', RESEED, 1);
DBCC CHECKIDENT ('Departments', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);

PRINT 'Identity columns reset';

-- Insert new departments with proper Arabic encoding
-- Using NVARCHAR and N'' prefix for Unicode strings
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, DescriptionAr, IsActive, SortOrder, CreatedAtUtc, CreatedBy)
VALUES
-- HR Departments
(1, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),
(2, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),
(3, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),

-- IT Departments
(1, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript'),
(2, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript'),
(3, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript'),

-- Finance Departments
(1, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript'),
(2, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript'),
(3, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript'),

-- Marketing Departments
(1, 'DEPT04', 'Marketing', N'التسويق', 'Brand management, advertising, and customer outreach', N'إدارة العلامة التجارية والإعلان والتواصل مع العملاء', 1, 4, GETUTCDATE(), 'TestDataScript'),
(2, 'DEPT04', 'Marketing', N'التسويق', 'Brand management, advertising, and customer outreach', N'إدارة العلامة التجارية والإعلان والتواصل مع العملاء', 1, 4, GETUTCDATE(), 'TestDataScript'),
(4, 'DEPT04', 'Marketing', N'التسويق', 'Brand management, advertising, and customer outreach', N'إدارة العلامة التجارية والإعلان والتواصل مع العملاء', 1, 4, GETUTCDATE(), 'TestDataScript'),

-- Operations Departments
(4, 'DEPT05', 'Operations', N'العمليات', 'Daily operations, logistics, and process management', N'العمليات اليومية واللوجستيات وإدارة العمليات', 1, 5, GETUTCDATE(), 'TestDataScript'),
(5, 'DEPT05', 'Operations', N'العمليات', 'Daily operations, logistics, and process management', N'العمليات اليومية واللوجستيات وإدارة العمليات', 1, 5, GETUTCDATE(), 'TestDataScript'),
(6, 'DEPT05', 'Operations', N'العمليات', 'Daily operations, logistics, and process management', N'العمليات اليومية واللوجستيات وإدارة العمليات', 1, 5, GETUTCDATE(), 'TestDataScript');

PRINT 'Departments with proper Arabic encoding inserted';

-- Insert sample employees with proper Arabic names
INSERT INTO Employees (BranchId, DepartmentId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr,
                      Email, Phone, HireDate, EmploymentStatus, JobTitle, JobTitleAr, WorkLocationType, IsActive, CreatedAtUtc, CreatedBy)
VALUES
-- HR Employees
(1, 1, 'EMP001', 'Ahmed', 'Hassan', N'أحمد', N'حسن', 'ahmed.hassan@company.com', '+966501234567', '2023-01-15', 1, 'HR Manager', N'مدير الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),
(1, 1, 'EMP002', 'Fatima', 'Al-Zahra', N'فاطمة', N'الزهراء', 'fatima.alzahra@company.com', '+966501234568', '2023-02-01', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),
(2, 2, 'EMP003', 'Omar', 'Abdullah', N'عمر', N'عبدالله', 'omar.abdullah@company.com', '+966501234569', '2023-01-20', 1, 'HR Coordinator', N'منسق موارد بشرية', 1, 1, GETUTCDATE(), 'TestDataScript'),

-- IT Employees
(1, 4, 'EMP004', 'Mohammed', 'Al-Rashid', N'محمد', N'الراشد', 'mohammed.alrashid@company.com', '+966501234570', '2023-03-01', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, 1, GETUTCDATE(), 'TestDataScript'),
(1, 4, 'EMP005', 'Aisha', 'Salem', N'عائشة', N'سالم', 'aisha.salem@company.com', '+966501234571', '2023-03-15', 1, 'Software Developer', N'مطور برمجيات', 1, 1, GETUTCDATE(), 'TestDataScript'),
(2, 5, 'EMP006', 'Khalid', 'Al-Mansouri', N'خالد', N'المنصوري', 'khalid.almansouri@company.com', '+966501234572', '2023-02-10', 1, 'System Administrator', N'مدير النظام', 1, 1, GETUTCDATE(), 'TestDataScript'),

-- Finance Employees
(1, 7, 'EMP007', 'Layla', 'Al-Habib', N'ليلى', N'الحبيب', 'layla.alhabib@company.com', '+966501234573', '2023-04-01', 1, 'Finance Manager', N'مدير مالي', 1, 1, GETUTCDATE(), 'TestDataScript'),
(2, 8, 'EMP008', 'Youssef', 'Al-Kindi', N'يوسف', N'الكندي', 'youssef.alkindi@company.com', '+966501234574', '2023-04-15', 1, 'Accountant', N'محاسب', 1, 1, GETUTCDATE(), 'TestDataScript'),

-- Marketing Employees
(1, 10, 'EMP009', 'Zainab', 'Al-Farisi', N'زينب', N'الفارسي', 'zainab.alfarisi@company.com', '+966501234575', '2023-05-01', 1, 'Marketing Manager', N'مدير تسويق', 1, 1, GETUTCDATE(), 'TestDataScript'),
(2, 11, 'EMP010', 'Hassan', 'Al-Omari', N'حسان', N'العمري', 'hassan.alomari@company.com', '+966501234576', '2023-05-15', 1, 'Marketing Specialist', N'أخصائي تسويق', 1, 1, GETUTCDATE(), 'TestDataScript'),

-- Operations Employees
(4, 13, 'EMP011', 'Mariam', 'Al-Dosari', N'مريم', N'الدوسري', 'mariam.aldosari@company.com', '+966501234577', '2023-06-01', 1, 'Operations Manager', N'مدير العمليات', 1, 1, GETUTCDATE(), 'TestDataScript'),
(5, 14, 'EMP012', 'Saeed', 'Al-Ghamdi', N'سعيد', N'الغامدي', 'saeed.alghamdi@company.com', '+966501234578', '2023-06-15', 1, 'Operations Coordinator', N'منسق عمليات', 1, 1, GETUTCDATE(), 'TestDataScript');

PRINT 'Employees with proper Arabic encoding inserted';

-- Verify the data was inserted correctly
SELECT 'Departments with Arabic names:' as Info;
SELECT Id, BranchId, Code, Name, NameAr FROM Departments WHERE NameAr IS NOT NULL;

SELECT 'Employees with Arabic names:' as Info;
SELECT Id, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr, JobTitle, JobTitleAr
FROM Employees WHERE FirstNameAr IS NOT NULL;

PRINT 'Arabic encoding fix completed successfully';