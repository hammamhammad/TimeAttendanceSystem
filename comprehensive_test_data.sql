-- Comprehensive Test Data Script
-- Creates 10 branches, 20 departments, and 50 employees with proper Arabic UTF-8 encoding
USE TimeAttendanceSystem;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

PRINT '🚀 Starting comprehensive test data insertion...';
PRINT 'This will create:';
PRINT '  📍 10 Branches (Saudi cities)';
PRINT '  🏬 20 Departments (4 core departments × 5 branches)';
PRINT '  👥 50 Employees (with Arabic names)';
PRINT '';

-- Clear existing test data
DELETE FROM Employees WHERE CreatedBy = 'TestDataScript';
DELETE FROM Departments WHERE CreatedBy = 'TestDataScript';
DELETE FROM Branches WHERE CreatedBy = 'TestDataScript';

PRINT '🧹 Existing test data cleared';

-- Reset identity columns
DBCC CHECKIDENT ('Branches', RESEED, 1);
DBCC CHECKIDENT ('Departments', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);

-- Insert 10 Branches (Major Saudi Cities)
INSERT INTO Branches (Code, Name, TimeZone, IsActive, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
('RYD01', 'Riyadh Head Office', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('JED01', 'Jeddah Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('DAM01', 'Dammam Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('MED01', 'Medina Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('MEC01', 'Mecca Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('TAI01', 'Taif Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('ABH01', 'Abha Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('TAB01', 'Tabuk Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('HAI01', 'Hail Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0),
('KHO01', 'Khobar Branch', 'Asia/Riyadh', 1, GETUTCDATE(), 'TestDataScript', 0);

PRINT '🏢 Created 10 branches';

-- Get branch IDs for department insertion
DECLARE @RiyadhId BIGINT = (SELECT Id FROM Branches WHERE Code = 'RYD01');
DECLARE @JeddahId BIGINT = (SELECT Id FROM Branches WHERE Code = 'JED01');
DECLARE @DammamId BIGINT = (SELECT Id FROM Branches WHERE Code = 'DAM01');
DECLARE @MedinaId BIGINT = (SELECT Id FROM Branches WHERE Code = 'MED01');
DECLARE @MeccaId BIGINT = (SELECT Id FROM Branches WHERE Code = 'MEC01');

-- Insert 20 Departments (4 departments × 5 branches)
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, DescriptionAr, IsActive, SortOrder, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- Riyadh Departments
(@RiyadhId, 'HR01', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'IT01', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'FIN01', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 3, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'MKT01', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 4, GETUTCDATE(), 'TestDataScript', 0),

-- Jeddah Departments
(@JeddahId, 'HR02', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 5, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'IT02', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 6, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'FIN02', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 7, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'MKT02', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 8, GETUTCDATE(), 'TestDataScript', 0),

-- Dammam Departments
(@DammamId, 'HR03', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 9, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'IT03', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 10, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'FIN03', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 11, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'MKT03', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 12, GETUTCDATE(), 'TestDataScript', 0),

-- Medina Departments
(@MedinaId, 'HR04', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 13, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'IT04', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 14, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'FIN04', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 15, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'MKT04', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 16, GETUTCDATE(), 'TestDataScript', 0),

-- Mecca Departments
(@MeccaId, 'HR05', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 17, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'IT05', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 18, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'FIN05', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 19, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'MKT05', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 20, GETUTCDATE(), 'TestDataScript', 0);

PRINT '🏬 Created 20 departments';

-- Get department IDs for employee insertion
DECLARE @HR01 BIGINT = (SELECT Id FROM Departments WHERE Code = 'HR01');
DECLARE @IT01 BIGINT = (SELECT Id FROM Departments WHERE Code = 'IT01');
DECLARE @FIN01 BIGINT = (SELECT Id FROM Departments WHERE Code = 'FIN01');
DECLARE @MKT01 BIGINT = (SELECT Id FROM Departments WHERE Code = 'MKT01');

DECLARE @HR02 BIGINT = (SELECT Id FROM Departments WHERE Code = 'HR02');
DECLARE @IT02 BIGINT = (SELECT Id FROM Departments WHERE Code = 'IT02');
DECLARE @FIN02 BIGINT = (SELECT Id FROM Departments WHERE Code = 'FIN02');
DECLARE @MKT02 BIGINT = (SELECT Id FROM Departments WHERE Code = 'MKT02');

DECLARE @HR03 BIGINT = (SELECT Id FROM Departments WHERE Code = 'HR03');
DECLARE @IT03 BIGINT = (SELECT Id FROM Departments WHERE Code = 'IT03');
DECLARE @FIN03 BIGINT = (SELECT Id FROM Departments WHERE Code = 'FIN03');
DECLARE @MKT03 BIGINT = (SELECT Id FROM Departments WHERE Code = 'MKT03');

DECLARE @HR04 BIGINT = (SELECT Id FROM Departments WHERE Code = 'HR04');
DECLARE @IT04 BIGINT = (SELECT Id FROM Departments WHERE Code = 'IT04');
DECLARE @FIN04 BIGINT = (SELECT Id FROM Departments WHERE Code = 'FIN04');
DECLARE @MKT04 BIGINT = (SELECT Id FROM Departments WHERE Code = 'MKT04');

DECLARE @HR05 BIGINT = (SELECT Id FROM Departments WHERE Code = 'HR05');
DECLARE @IT05 BIGINT = (SELECT Id FROM Departments WHERE Code = 'IT05');
DECLARE @FIN05 BIGINT = (SELECT Id FROM Departments WHERE Code = 'FIN05');
DECLARE @MKT05 BIGINT = (SELECT Id FROM Departments WHERE Code = 'MKT05');

-- Insert 50 Employees with Arabic names (10 per branch for 5 branches)
INSERT INTO Employees (BranchId, DepartmentId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr, Email, Phone, HireDate, EmploymentStatus, JobTitle, JobTitleAr, WorkLocationType, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- Riyadh Branch Employees (10 employees)
(@RiyadhId, @HR01, 'EMP001', 'Ahmed', 'Al-Rashid', N'أحمد', N'الراشد', 'ahmed.alrashid@company.com', '+966501234001', '2023-01-15', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @HR01, 'EMP002', 'Fatima', 'Al-Ghamdi', N'فاطمة', N'الغامدي', 'fatima.alghamdi@company.com', '+966501234002', '2023-02-01', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @IT01, 'EMP003', 'Mohammed', 'Al-Dosari', N'محمد', N'الدوسري', 'mohammed.aldosari@company.com', '+966501234003', '2023-03-01', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @IT01, 'EMP004', 'Aisha', 'Salem', N'عائشة', N'سالم', 'aisha.salem@company.com', '+966501234004', '2023-03-15', 1, 'Software Developer', N'مطور برمجيات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @FIN01, 'EMP005', 'Omar', 'Al-Farisi', N'عمر', N'الفارسي', 'omar.alfarisi@company.com', '+966501234005', '2023-04-01', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @FIN01, 'EMP006', 'Layla', 'Al-Habib', N'ليلى', N'الحبيب', 'layla.alhabib@company.com', '+966501234006', '2023-04-15', 1, 'Accountant', N'محاسب', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @MKT01, 'EMP007', 'Khalid', 'Al-Omari', N'خالد', N'العمري', 'khalid.alomari@company.com', '+966501234007', '2023-05-01', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @MKT01, 'EMP008', 'Zainab', 'Al-Mansouri', N'زينب', N'المنصوري', 'zainab.almansouri@company.com', '+966501234008', '2023-05-15', 1, 'Marketing Specialist', N'أخصائي تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @HR01, 'EMP009', 'Youssef', 'Al-Kindi', N'يوسف', N'الكندي', 'youssef.alkindi@company.com', '+966501234009', '2023-06-01', 1, 'HR Coordinator', N'منسق موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @IT01, 'EMP010', 'Mariam', 'Hassan', N'مريم', N'حسن', 'mariam.hassan@company.com', '+966501234010', '2023-06-15', 1, 'System Administrator', N'مدير النظام', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Jeddah Branch Employees (10 employees)
(@JeddahId, @HR02, 'EMP011', 'Saeed', 'Al-Maliki', N'سعيد', N'المالكي', 'saeed.almaliki@company.com', '+966501234011', '2023-01-20', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @HR02, 'EMP012', 'Noura', 'Al-Shehri', N'نورا', N'الشهري', 'noura.alshehri@company.com', '+966501234012', '2023-02-05', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @IT02, 'EMP013', 'Abdullah', 'Al-Harbi', N'عبدالله', N'الحربي', 'abdullah.alharbi@company.com', '+966501234013', '2023-03-10', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @IT02, 'EMP014', 'Sara', 'Al-Otaibi', N'سارة', N'العتيبي', 'sara.alotaibi@company.com', '+966501234014', '2023-03-25', 1, 'Software Developer', N'مطور برمجيات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @FIN02, 'EMP015', 'Faisal', 'Al-Zahra', N'فيصل', N'الزهراء', 'faisal.alzahra@company.com', '+966501234015', '2023-04-10', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @FIN02, 'EMP016', 'Hala', 'Al-Najjar', N'هالة', N'النجار', 'hala.alnajjar@company.com', '+966501234016', '2023-04-25', 1, 'Financial Analyst', N'محلل مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @MKT02, 'EMP017', 'Nasser', 'Al-Qasimi', N'ناصر', N'القاسمي', 'nasser.alqasimi@company.com', '+966501234017', '2023-05-10', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @MKT02, 'EMP018', 'Reem', 'Al-Fahd', N'ريم', N'الفهد', 'reem.alfahd@company.com', '+966501234018', '2023-05-25', 1, 'Content Creator', N'منشئ محتوى', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @HR02, 'EMP019', 'Majed', 'Al-Balushi', N'ماجد', N'البلوشي', 'majed.albalushi@company.com', '+966501234019', '2023-06-10', 1, 'HR Assistant', N'مساعد موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @IT02, 'EMP020', 'Amira', 'Al-Tamimi', N'أميرة', N'التميمي', 'amira.altamimi@company.com', '+966501234020', '2023-06-25', 1, 'IT Support', N'دعم تقني', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Dammam Branch Employees (10 employees)
(@DammamId, @HR03, 'EMP021', 'Turki', 'Al-Sudairi', N'تركي', N'السديري', 'turki.alsudairi@company.com', '+966501234021', '2023-01-25', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @HR03, 'EMP022', 'Lina', 'Al-Mutairi', N'لينا', N'المطيري', 'lina.almutairi@company.com', '+966501234022', '2023-02-10', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @IT03, 'EMP023', 'Saud', 'Al-Ajmi', N'سعود', N'العجمي', 'saud.alajmi@company.com', '+966501234023', '2023-03-15', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @IT03, 'EMP024', 'Dina', 'Al-Subai', N'دينا', N'الصباي', 'dina.alsubai@company.com', '+966501234024', '2023-03-30', 1, 'Database Administrator', N'مدير قاعدة البيانات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @FIN03, 'EMP025', 'Bandar', 'Al-Rashed', N'بندر', N'الراشد', 'bandar.alrashed@company.com', '+966501234025', '2023-04-15', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @FIN03, 'EMP026', 'Salma', 'Al-Harthy', N'سلمى', N'الحارثي', 'salma.alharthy@company.com', '+966501234026', '2023-04-30', 1, 'Budget Analyst', N'محلل الميزانية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @MKT03, 'EMP027', 'Waleed', 'Al-Zahrani', N'وليد', N'الزهراني', 'waleed.alzahrani@company.com', '+966501234027', '2023-05-15', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @MKT03, 'EMP028', 'Nour', 'Al-Dawood', N'نور', N'الداود', 'nour.aldawood@company.com', '+966501234028', '2023-05-30', 1, 'Digital Marketing', N'التسويق الرقمي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @HR03, 'EMP029', 'Tariq', 'Al-Suwaidi', N'طارق', N'السويدي', 'tariq.alsuwaidi@company.com', '+966501234029', '2023-06-15', 1, 'Recruitment Specialist', N'أخصائي توظيف', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @IT03, 'EMP030', 'Jana', 'Al-Mansouri', N'جنى', N'المنصوري', 'jana.almansouri@company.com', '+966501234030', '2023-06-30', 1, 'Web Developer', N'مطور مواقع', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Medina Branch Employees (10 employees)
(@MedinaId, @HR04, 'EMP031', 'Adnan', 'Al-Ghanim', N'عدنان', N'الغانم', 'adnan.alghanim@company.com', '+966501234031', '2023-02-01', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @HR04, 'EMP032', 'Ghada', 'Al-Thuwaini', N'غادة', N'الثويني', 'ghada.althuwaini@company.com', '+966501234032', '2023-02-15', 1, 'Training Coordinator', N'منسق التدريب', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @IT04, 'EMP033', 'Rashid', 'Al-Bin Ali', N'راشد', N'البن علي', 'rashid.albinali@company.com', '+966501234033', '2023-03-20', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @IT04, 'EMP034', 'Wafa', 'Al-Nasser', N'وفاء', N'الناصر', 'wafa.alnasser@company.com', '+966501234034', '2023-04-05', 1, 'Network Engineer', N'مهندس شبكات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @FIN04, 'EMP035', 'Mansour', 'Al-Khaldi', N'منصور', N'الخالدي', 'mansour.alkhaldi@company.com', '+966501234035', '2023-04-20', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @FIN04, 'EMP036', 'Samira', 'Al-Qahtani', N'سميرة', N'القحطاني', 'samira.alqahtani@company.com', '+966501234036', '2023-05-05', 1, 'Cost Analyst', N'محلل التكاليف', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @MKT04, 'EMP037', 'Fahad', 'Al-Salam', N'فهد', N'السلام', 'fahad.alsalam@company.com', '+966501234037', '2023-05-20', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @MKT04, 'EMP038', 'Rania', 'Al-Jadaan', N'رانيا', N'الجدعان', 'rania.aljadaan@company.com', '+966501234038', '2023-06-05', 1, 'Brand Manager', N'مدير العلامة التجارية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @HR04, 'EMP039', 'Sultan', 'Al-Meshari', N'سلطان', N'المشاري', 'sultan.almeshari@company.com', '+966501234039', '2023-06-20', 1, 'HR Business Partner', N'شريك أعمال الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, @IT04, 'EMP040', 'Hanadi', 'Al-Dossary', N'هنادي', N'الدوسري', 'hanadi.aldossary@company.com', '+966501234040', '2023-07-05', 1, 'UI/UX Designer', N'مصمم واجهات المستخدم', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Mecca Branch Employees (10 employees)
(@MeccaId, @HR05, 'EMP041', 'Abdulaziz', 'Al-Rabiah', N'عبدالعزيز', N'الربيعة', 'abdulaziz.alrabiah@company.com', '+966501234041', '2023-02-05', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @HR05, 'EMP042', 'Khadija', 'Al-Owais', N'خديجة', N'العويس', 'khadija.alowais@company.com', '+966501234042', '2023-02-20', 1, 'Compensation Specialist', N'أخصائي التعويضات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @IT05, 'EMP043', 'Ibrahim', 'Al-Shamsi', N'إبراهيم', N'الشامسي', 'ibrahim.alshamsi@company.com', '+966501234043', '2023-03-25', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @IT05, 'EMP044', 'Amani', 'Al-Hussain', N'أماني', N'الحسين', 'amani.alhussain@company.com', '+966501234044', '2023-04-10', 1, 'DevOps Engineer', N'مهندس عمليات التطوير', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @FIN05, 'EMP045', 'Zayed', 'Al-Faisal', N'زايد', N'الفيصل', 'zayed.alfaisal@company.com', '+966501234045', '2023-04-25', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @FIN05, 'EMP046', 'Raghad', 'Al-Mubarek', N'رغد', N'المبارك', 'raghad.almubarek@company.com', '+966501234046', '2023-05-10', 1, 'Tax Specialist', N'أخصائي الضرائب', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @MKT05, 'EMP047', 'Mishal', 'Al-Saud', N'مشعل', N'السعود', 'mishal.alsaud@company.com', '+966501234047', '2023-05-25', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @MKT05, 'EMP048', 'Nadia', 'Al-Yamani', N'نادية', N'اليماني', 'nadia.alyamani@company.com', '+966501234048', '2023-06-10', 1, 'Social Media Manager', N'مدير وسائل التواصل الاجتماعي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @HR05, 'EMP049', 'Hassan', 'Al-Khaldi', N'حسن', N'الخالدي', 'hassan.alkhaldi@company.com', '+966501234049', '2023-06-25', 1, 'Employee Relations', N'علاقات الموظفين', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, @IT05, 'EMP050', 'Maha', 'Al-Rasheed', N'مها', N'الرشيد', 'maha.alrasheed@company.com', '+966501234050', '2023-07-10', 1, 'Security Analyst', N'محلل أمن المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0);

PRINT '👥 Created 50 employees with Arabic names';

-- Display summary
SELECT 'SUMMARY: Comprehensive Test Data Created' as [Result];
SELECT 'Branches: ' + CAST(COUNT(*) AS VARCHAR) as [Count] FROM Branches WHERE CreatedBy = 'TestDataScript'
UNION ALL
SELECT 'Departments: ' + CAST(COUNT(*) AS VARCHAR) FROM Departments WHERE CreatedBy = 'TestDataScript'
UNION ALL
SELECT 'Employees: ' + CAST(COUNT(*) AS VARCHAR) FROM Employees WHERE CreatedBy = 'TestDataScript';

PRINT '';
PRINT '🎉 Comprehensive test data creation completed successfully!';
PRINT '🔗 You can now test the system with comprehensive data:';
PRINT '   • Backend: http://localhost:5099';
PRINT '   • Frontend: http://localhost:4200';
PRINT '';
PRINT '📊 Data Summary:';
PRINT '   • 10 Branches (Saudi cities: Riyadh, Jeddah, Dammam, Medina, Mecca, Taif, Abha, Tabuk, Hail, Khobar)';
PRINT '   • 20 Departments (HR, IT, Finance, Marketing across 5 main branches)';
PRINT '   • 50 Employees (with proper Arabic names and realistic job titles)';