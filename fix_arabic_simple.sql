-- Simple Arabic Encoding Fix
USE TimeAttendanceSystem;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

-- Delete test data
DELETE FROM Employees;
DELETE FROM Departments;
PRINT 'Test data cleared';

-- Reset identity
DBCC CHECKIDENT ('Departments', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);
PRINT 'Identity reset';

-- Insert departments with proper Arabic encoding
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, DescriptionAr, IsActive, SortOrder, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- Branch 1
(1, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript', 0),
(1, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript', 0),
(1, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript', 0),

-- Branch 2
(2, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript', 0),
(2, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript', 0),
(2, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript', 0),

-- Branch 3
(3, 'DEPT01', 'Human Resources', N'الموارد البشرية', 'Employee relations, recruitment, and HR policies', N'علاقات الموظفين والتوظيف وسياسات الموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript', 0),
(3, 'DEPT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development, infrastructure, and technical support', N'تطوير البرمجيات والبنية التحتية والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript', 0),
(3, 'DEPT03', 'Finance', N'المالية', 'Financial planning, accounting, and budget management', N'التخطيط المالي والمحاسبة وإدارة الميزانية', 1, 3, GETUTCDATE(), 'TestDataScript', 0);

PRINT 'Departments inserted with proper Arabic encoding';

-- Insert sample employees
INSERT INTO Employees (BranchId, DepartmentId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr,
                      Email, Phone, HireDate, EmploymentStatus, JobTitle, JobTitleAr, WorkLocationType, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- HR Department Employees
(1, 1, 'EMP001', 'Ahmed', 'Hassan', N'أحمد', N'حسن', 'ahmed.hassan@company.com', '+966501234567', '2023-01-15', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(1, 1, 'EMP002', 'Fatima', 'Al-Zahra', N'فاطمة', N'الزهراء', 'fatima.alzahra@company.com', '+966501234568', '2023-02-01', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),

-- IT Department Employees
(1, 2, 'EMP003', 'Mohammed', 'Al-Rashid', N'محمد', N'الراشد', 'mohammed.alrashid@company.com', '+966501234570', '2023-03-01', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(1, 2, 'EMP004', 'Aisha', 'Salem', N'عائشة', N'سالم', 'aisha.salem@company.com', '+966501234571', '2023-03-15', 1, 'Software Developer', N'مطور برمجيات', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Finance Department Employees
(1, 3, 'EMP005', 'Layla', 'Al-Habib', N'ليلى', N'الحبيب', 'layla.alhabib@company.com', '+966501234573', '2023-04-01', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(1, 3, 'EMP006', 'Youssef', 'Al-Kindi', N'يوسف', N'الكندي', 'youssef.alkindi@company.com', '+966501234574', '2023-04-15', 1, 'Accountant', N'محاسب', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Branch 2 Employees
(2, 4, 'EMP007', 'Omar', 'Abdullah', N'عمر', N'عبدالله', 'omar.abdullah@company.com', '+966501234569', '2023-01-20', 1, 'HR Coordinator', N'منسق موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(2, 5, 'EMP008', 'Khalid', 'Al-Mansouri', N'خالد', N'المنصوري', 'khalid.almansouri@company.com', '+966501234572', '2023-02-10', 1, 'System Administrator', N'مدير النظام', 1, GETUTCDATE(), 'TestDataScript', 0),
(2, 6, 'EMP009', 'Zainab', 'Al-Farisi', N'زينب', N'الفارسي', 'zainab.alfarisi@company.com', '+966501234575', '2023-05-01', 1, 'Financial Analyst', N'محلل مالي', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Branch 3 Employees
(3, 7, 'EMP010', 'Hassan', 'Al-Omari', N'حسان', N'العمري', 'hassan.alomari@company.com', '+966501234576', '2023-05-15', 1, 'HR Assistant', N'مساعد موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(3, 8, 'EMP011', 'Mariam', 'Al-Dosari', N'مريم', N'الدوسري', 'mariam.aldosari@company.com', '+966501234577', '2023-06-01', 1, 'IT Support', N'دعم تقني', 1, GETUTCDATE(), 'TestDataScript', 0),
(3, 9, 'EMP012', 'Saeed', 'Al-Ghamdi', N'سعيد', N'الغامدي', 'saeed.alghamdi@company.com', '+966501234578', '2023-06-15', 1, 'Budget Analyst', N'محلل الميزانية', 1, GETUTCDATE(), 'TestDataScript', 0);

PRINT 'Employees inserted with proper Arabic encoding';

-- Verify the data
SELECT 'Departments with Arabic names:' as [Result];
SELECT Id, BranchId, Code, Name, NameAr FROM Departments WHERE NameAr IS NOT NULL ORDER BY BranchId, SortOrder;

SELECT 'Employees with Arabic names:' as [Result];
SELECT Id, BranchId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr, JobTitle, JobTitleAr
FROM Employees WHERE FirstNameAr IS NOT NULL ORDER BY BranchId, Id;

PRINT 'Arabic encoding fix completed successfully';