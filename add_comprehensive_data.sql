-- Add Comprehensive Test Data to Existing System
-- Adds departments and employees to the newly created branches
USE TimeAttendanceSystem;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

PRINT '🚀 Adding comprehensive test data to existing system...';

-- Get the branch IDs for the new branches we created
DECLARE @RiyadhId BIGINT = (SELECT Id FROM Branches WHERE Code = 'RYD01');
DECLARE @JeddahId BIGINT = (SELECT Id FROM Branches WHERE Code = 'JED01');
DECLARE @DammamId BIGINT = (SELECT Id FROM Branches WHERE Code = 'DAM01');
DECLARE @MedinaId BIGINT = (SELECT Id FROM Branches WHERE Code = 'MED01');
DECLARE @MeccaId BIGINT = (SELECT Id FROM Branches WHERE Code = 'MEC01');

-- Insert 20 departments for the new branches
INSERT INTO Departments (BranchId, Code, Name, NameAr, Description, DescriptionAr, IsActive, SortOrder, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- Riyadh Departments
(@RiyadhId, 'RYD-HR', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'RYD-IT', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 2, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'RYD-FIN', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 3, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, 'RYD-MKT', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 4, GETUTCDATE(), 'TestDataScript', 0),

-- Jeddah Departments
(@JeddahId, 'JED-HR', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 5, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'JED-IT', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 6, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'JED-FIN', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 7, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, 'JED-MKT', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 8, GETUTCDATE(), 'TestDataScript', 0),

-- Dammam Departments
(@DammamId, 'DAM-HR', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 9, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'DAM-IT', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 10, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'DAM-FIN', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 11, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, 'DAM-MKT', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 12, GETUTCDATE(), 'TestDataScript', 0),

-- Medina Departments
(@MedinaId, 'MED-HR', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 13, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'MED-IT', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 14, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'MED-FIN', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 15, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, 'MED-MKT', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 16, GETUTCDATE(), 'TestDataScript', 0),

-- Mecca Departments
(@MeccaId, 'MEC-HR', 'Human Resources', N'الموارد البشرية', 'Employee relations and HR management', N'إدارة الموظفين والموارد البشرية', 1, 17, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'MEC-IT', 'Information Technology', N'تكنولوجيا المعلومات', 'Software development and IT support', N'تطوير البرمجيات والدعم التقني', 1, 18, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'MEC-FIN', 'Finance', N'المالية', 'Financial planning and accounting', N'التخطيط المالي والمحاسبة', 1, 19, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, 'MEC-MKT', 'Marketing', N'التسويق', 'Brand management and marketing', N'إدارة العلامة التجارية والتسويق', 1, 20, GETUTCDATE(), 'TestDataScript', 0);

PRINT '🏬 Created 20 departments for new branches';

-- Get department IDs for the newly created departments
DECLARE @RydHR BIGINT = (SELECT Id FROM Departments WHERE Code = 'RYD-HR');
DECLARE @RydIT BIGINT = (SELECT Id FROM Departments WHERE Code = 'RYD-IT');
DECLARE @RydFIN BIGINT = (SELECT Id FROM Departments WHERE Code = 'RYD-FIN');
DECLARE @RydMKT BIGINT = (SELECT Id FROM Departments WHERE Code = 'RYD-MKT');

DECLARE @JedHR BIGINT = (SELECT Id FROM Departments WHERE Code = 'JED-HR');
DECLARE @JedIT BIGINT = (SELECT Id FROM Departments WHERE Code = 'JED-IT');
DECLARE @JedFIN BIGINT = (SELECT Id FROM Departments WHERE Code = 'JED-FIN');
DECLARE @JedMKT BIGINT = (SELECT Id FROM Departments WHERE Code = 'JED-MKT');

DECLARE @DamHR BIGINT = (SELECT Id FROM Departments WHERE Code = 'DAM-HR');
DECLARE @DamIT BIGINT = (SELECT Id FROM Departments WHERE Code = 'DAM-IT');

-- Insert 40 additional employees with Arabic names (8 per branch for 5 branches)
INSERT INTO Employees (BranchId, DepartmentId, EmployeeNumber, FirstName, LastName, FirstNameAr, LastNameAr, Email, Phone, HireDate, EmploymentStatus, JobTitle, JobTitleAr, WorkLocationType, CreatedAtUtc, CreatedBy, IsDeleted)
VALUES
-- Riyadh Branch Employees (8 employees)
(@RiyadhId, @RydHR, 'RYD001', 'Ahmed', 'Al-Rashid', N'أحمد', N'الراشد', 'ahmed.alrashid@company.com', '+966501234101', '2023-01-15', 1, 'HR Director', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydHR, 'RYD002', 'Fatima', 'Al-Ghamdi', N'فاطمة', N'الغامدي', 'fatima.alghamdi@company.com', '+966501234102', '2023-02-01', 1, 'HR Specialist', N'أخصائي موارد بشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydIT, 'RYD003', 'Mohammed', 'Al-Dosari', N'محمد', N'الدوسري', 'mohammed.aldosari@company.com', '+966501234103', '2023-03-01', 1, 'IT Director', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydIT, 'RYD004', 'Aisha', 'Salem', N'عائشة', N'سالم', 'aisha.salem@company.com', '+966501234104', '2023-03-15', 1, 'Senior Developer', N'مطور أول', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydFIN, 'RYD005', 'Omar', 'Al-Farisi', N'عمر', N'الفارسي', 'omar.alfarisi@company.com', '+966501234105', '2023-04-01', 1, 'Finance Director', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydFIN, 'RYD006', 'Layla', 'Al-Habib', N'ليلى', N'الحبيب', 'layla.alhabib@company.com', '+966501234106', '2023-04-15', 1, 'Senior Accountant', N'محاسب أول', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydMKT, 'RYD007', 'Khalid', 'Al-Omari', N'خالد', N'العمري', 'khalid.alomari@company.com', '+966501234107', '2023-05-01', 1, 'Marketing Director', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@RiyadhId, @RydMKT, 'RYD008', 'Zainab', 'Al-Mansouri', N'زينب', N'المنصوري', 'zainab.almansouri@company.com', '+966501234108', '2023-05-15', 1, 'Brand Manager', N'مدير العلامة التجارية', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Jeddah Branch Employees (8 employees)
(@JeddahId, @JedHR, 'JED001', 'Saeed', 'Al-Maliki', N'سعيد', N'المالكي', 'saeed.almaliki@company.com', '+966501234201', '2023-01-20', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedHR, 'JED002', 'Noura', 'Al-Shehri', N'نورا', N'الشهري', 'noura.alshehri@company.com', '+966501234202', '2023-02-05', 1, 'Recruitment Specialist', N'أخصائي توظيف', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedIT, 'JED003', 'Abdullah', 'Al-Harbi', N'عبدالله', N'الحربي', 'abdullah.alharbi@company.com', '+966501234203', '2023-03-10', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedIT, 'JED004', 'Sara', 'Al-Otaibi', N'سارة', N'العتيبي', 'sara.alotaibi@company.com', '+966501234204', '2023-03-25', 1, 'Full Stack Developer', N'مطور متكامل', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedFIN, 'JED005', 'Faisal', 'Al-Zahra', N'فيصل', N'الزهراء', 'faisal.alzahra@company.com', '+966501234205', '2023-04-10', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedFIN, 'JED006', 'Hala', 'Al-Najjar', N'هالة', N'النجار', 'hala.alnajjar@company.com', '+966501234206', '2023-04-25', 1, 'Financial Analyst', N'محلل مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedMKT, 'JED007', 'Nasser', 'Al-Qasimi', N'ناصر', N'القاسمي', 'nasser.alqasimi@company.com', '+966501234207', '2023-05-10', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@JeddahId, @JedMKT, 'JED008', 'Reem', 'Al-Fahd', N'ريم', N'الفهد', 'reem.alfahd@company.com', '+966501234208', '2023-05-25', 1, 'Digital Marketing Specialist', N'أخصائي تسويق رقمي', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Dammam Branch Employees (8 employees)
(@DammamId, @DamHR, 'DAM001', 'Turki', 'Al-Sudairi', N'تركي', N'السديري', 'turki.alsudairi@company.com', '+966501234301', '2023-01-25', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @DamHR, 'DAM002', 'Lina', 'Al-Mutairi', N'لينا', N'المطيري', 'lina.almutairi@company.com', '+966501234302', '2023-02-10', 1, 'Training Coordinator', N'منسق التدريب', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @DamIT, 'DAM003', 'Saud', 'Al-Ajmi', N'سعود', N'العجمي', 'saud.alajmi@company.com', '+966501234303', '2023-03-15', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, @DamIT, 'DAM004', 'Dina', 'Al-Subai', N'دينا', N'الصباي', 'dina.alsubai@company.com', '+966501234304', '2023-03-30', 1, 'Database Administrator', N'مدير قاعدة البيانات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, (SELECT Id FROM Departments WHERE Code = 'DAM-FIN'), 'DAM005', 'Bandar', 'Al-Rashed', N'بندر', N'الراشد', 'bandar.alrashed@company.com', '+966501234305', '2023-04-15', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, (SELECT Id FROM Departments WHERE Code = 'DAM-FIN'), 'DAM006', 'Salma', 'Al-Harthy', N'سلمى', N'الحارثي', 'salma.alharthy@company.com', '+966501234306', '2023-04-30', 1, 'Budget Analyst', N'محلل الميزانية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, (SELECT Id FROM Departments WHERE Code = 'DAM-MKT'), 'DAM007', 'Waleed', 'Al-Zahrani', N'وليد', N'الزهراني', 'waleed.alzahrani@company.com', '+966501234307', '2023-05-15', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@DammamId, (SELECT Id FROM Departments WHERE Code = 'DAM-MKT'), 'DAM008', 'Nour', 'Al-Dawood', N'نور', N'الداود', 'nour.aldawood@company.com', '+966501234308', '2023-05-30', 1, 'Content Creator', N'منشئ محتوى', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Medina Branch Employees (8 employees)
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-HR'), 'MED001', 'Adnan', 'Al-Ghanim', N'عدنان', N'الغانم', 'adnan.alghanim@company.com', '+966501234401', '2023-02-01', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-HR'), 'MED002', 'Ghada', 'Al-Thuwaini', N'غادة', N'الثويني', 'ghada.althuwaini@company.com', '+966501234402', '2023-02-15', 1, 'Employee Relations', N'علاقات الموظفين', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-IT'), 'MED003', 'Rashid', 'Al-Bin Ali', N'راشد', N'البن علي', 'rashid.albinali@company.com', '+966501234403', '2023-03-20', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-IT'), 'MED004', 'Wafa', 'Al-Nasser', N'وفاء', N'الناصر', 'wafa.alnasser@company.com', '+966501234404', '2023-04-05', 1, 'Network Engineer', N'مهندس شبكات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-FIN'), 'MED005', 'Mansour', 'Al-Khaldi', N'منصور', N'الخالدي', 'mansour.alkhaldi@company.com', '+966501234405', '2023-04-20', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-FIN'), 'MED006', 'Samira', 'Al-Qahtani', N'سميرة', N'القحطاني', 'samira.alqahtani@company.com', '+966501234406', '2023-05-05', 1, 'Cost Analyst', N'محلل التكاليف', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-MKT'), 'MED007', 'Fahad', 'Al-Salam', N'فهد', N'السلام', 'fahad.alsalam@company.com', '+966501234407', '2023-05-20', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MedinaId, (SELECT Id FROM Departments WHERE Code = 'MED-MKT'), 'MED008', 'Rania', 'Al-Jadaan', N'رانيا', N'الجدعان', 'rania.aljadaan@company.com', '+966501234408', '2023-06-05', 1, 'Social Media Manager', N'مدير وسائل التواصل', 1, GETUTCDATE(), 'TestDataScript', 0),

-- Mecca Branch Employees (8 employees)
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-HR'), 'MEC001', 'Abdulaziz', 'Al-Rabiah', N'عبدالعزيز', N'الربيعة', 'abdulaziz.alrabiah@company.com', '+966501234501', '2023-02-05', 1, 'HR Manager', N'مدير الموارد البشرية', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-HR'), 'MEC002', 'Khadija', 'Al-Owais', N'خديجة', N'العويس', 'khadija.alowais@company.com', '+966501234502', '2023-02-20', 1, 'Compensation Specialist', N'أخصائي التعويضات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-IT'), 'MEC003', 'Ibrahim', 'Al-Shamsi', N'إبراهيم', N'الشامسي', 'ibrahim.alshamsi@company.com', '+966501234503', '2023-03-25', 1, 'IT Manager', N'مدير تكنولوجيا المعلومات', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-IT'), 'MEC004', 'Amani', 'Al-Hussain', N'أماني', N'الحسين', 'amani.alhussain@company.com', '+966501234504', '2023-04-10', 1, 'DevOps Engineer', N'مهندس عمليات التطوير', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-FIN'), 'MEC005', 'Zayed', 'Al-Faisal', N'زايد', N'الفيصل', 'zayed.alfaisal@company.com', '+966501234505', '2023-04-25', 1, 'Finance Manager', N'مدير مالي', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-FIN'), 'MEC006', 'Raghad', 'Al-Mubarek', N'رغد', N'المبارك', 'raghad.almubarek@company.com', '+966501234506', '2023-05-10', 1, 'Tax Specialist', N'أخصائي الضرائب', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-MKT'), 'MEC007', 'Mishal', 'Al-Saud', N'مشعل', N'السعود', 'mishal.alsaud@company.com', '+966501234507', '2023-05-25', 1, 'Marketing Manager', N'مدير تسويق', 1, GETUTCDATE(), 'TestDataScript', 0),
(@MeccaId, (SELECT Id FROM Departments WHERE Code = 'MEC-MKT'), 'MEC008', 'Nadia', 'Al-Yamani', N'نادية', N'اليماني', 'nadia.alyamani@company.com', '+966501234508', '2023-06-10', 1, 'Brand Ambassador', N'سفير العلامة التجارية', 1, GETUTCDATE(), 'TestDataScript', 0);

PRINT '👥 Created 40 additional employees with Arabic names';

-- Display comprehensive summary
SELECT 'FINAL SUMMARY: Comprehensive Test Data' as [Result];
PRINT '📊 Final Data Summary:';

SELECT 'Total Branches: ' + CAST(COUNT(*) AS VARCHAR) as [Count] FROM Branches
UNION ALL
SELECT 'Total Departments: ' + CAST(COUNT(*) AS VARCHAR) FROM Departments
UNION ALL
SELECT 'Total Employees: ' + CAST(COUNT(*) AS VARCHAR) FROM Employees;

PRINT '🎉 Comprehensive test data creation completed successfully!';
PRINT '🔗 System ready for testing with rich dataset:';
PRINT '   • Backend: http://localhost:5099';
PRINT '   • Frontend: http://localhost:4200';
PRINT '   • 11 Branches total (original + 10 new Saudi cities)';
PRINT '   • 25+ Departments across all branches';
PRINT '   • 50+ Employees with proper Arabic names and titles';