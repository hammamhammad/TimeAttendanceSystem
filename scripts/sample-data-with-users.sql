-- ============================================
-- Sample Data Script for Time Attendance System
-- Includes: 5 Branches, 20 Departments, 50 Employees with User Accounts
-- ============================================
--
-- Default Password for all employees: Emp@123!
-- All employees have MustChangePassword = true (will be forced to change on first login)
--
-- Hierarchy:
-- - Branch Managers (5) - no manager, have Manager role
-- - Department Managers (20) - report to Branch Manager, have Manager role
-- - Regular Employees (25) - report to Department Manager, have Employee role
-- ============================================

-- Pre-computed password hash for "Emp@123!"
-- Salt and Hash generated using PBKDF2-SHA256 with 10000 iterations, 32-byte key
-- Salt bytes (hex): 53616D706C654461746153616C74323032355469 6D654174 74656E64616E6365
DO $$
DECLARE
    v_password_salt TEXT := 'U2FtcGxlRGF0YVNhbHQyMDI1VGltZUF0dGVuZGFuY2U=';
    v_password_hash TEXT := 'zFjvPvlzbseOE7YV+Z0pkWaCK40N6PQvJibakq8H5X4=';
    v_now TIMESTAMP := NOW() AT TIME ZONE 'UTC';
    v_employee_role_id BIGINT;
    v_manager_role_id BIGINT;
BEGIN
    -- ============================================
    -- Step 1: Ensure Employee and Manager roles exist
    -- ============================================

    -- Get or create Employee role
    SELECT "Id" INTO v_employee_role_id FROM "Roles" WHERE "Name" = 'Employee' AND NOT "IsDeleted" LIMIT 1;
    IF v_employee_role_id IS NULL THEN
        INSERT INTO "Roles" ("Name", "IsSystem", "IsEditable", "IsDeletable", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
        VALUES ('Employee', false, true, true, v_now, 'SYSTEM', false, E'\\x00')
        RETURNING "Id" INTO v_employee_role_id;
    END IF;

    -- Get or create Manager role
    SELECT "Id" INTO v_manager_role_id FROM "Roles" WHERE "Name" = 'Manager' AND NOT "IsDeleted" LIMIT 1;
    IF v_manager_role_id IS NULL THEN
        INSERT INTO "Roles" ("Name", "IsSystem", "IsEditable", "IsDeletable", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
        VALUES ('Manager', false, true, true, v_now, 'SYSTEM', false, E'\\x00')
        RETURNING "Id" INTO v_manager_role_id;
    END IF;

    RAISE NOTICE 'Employee Role ID: %, Manager Role ID: %', v_employee_role_id, v_manager_role_id;

    -- ============================================
    -- Step 2: Insert Branches (IDs 101-105)
    -- ============================================
    INSERT INTO "Branches" ("Id", "Code", "Name", "TimeZone", "IsActive", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    VALUES
        (101, 'HQ', 'Headquarters - Riyadh', 'Asia/Riyadh', true, v_now, 'SYSTEM', false, E'\\x00'),
        (102, 'JED', 'Jeddah Branch', 'Asia/Riyadh', true, v_now, 'SYSTEM', false, E'\\x00'),
        (103, 'DAM', 'Dammam Branch', 'Asia/Riyadh', true, v_now, 'SYSTEM', false, E'\\x00'),
        (104, 'MED', 'Madinah Branch', 'Asia/Riyadh', true, v_now, 'SYSTEM', false, E'\\x00'),
        (105, 'MAK', 'Makkah Branch', 'Asia/Riyadh', true, v_now, 'SYSTEM', false, E'\\x00')
    ON CONFLICT ("Id") DO NOTHING;

    -- ============================================
    -- Step 3: Insert Departments (IDs 101-120, 4 per branch)
    -- ============================================
    -- HQ Departments (101-104)
    INSERT INTO "Departments" ("Id", "BranchId", "Code", "Name", "NameAr", "Description", "SortOrder", "IsActive", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    VALUES
        (101, 101, 'HQ-HR', 'Human Resources', 'الموارد البشرية', 'HR Department at HQ', 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (102, 101, 'HQ-IT', 'Information Technology', 'تقنية المعلومات', 'IT Department at HQ', 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (103, 101, 'HQ-FIN', 'Finance', 'المالية', 'Finance Department at HQ', 3, true, v_now, 'SYSTEM', false, E'\\x00'),
        (104, 101, 'HQ-OPS', 'Operations', 'العمليات', 'Operations Department at HQ', 4, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Jeddah Departments (105-108)
        (105, 102, 'JED-HR', 'Human Resources', 'الموارد البشرية', 'HR Department at Jeddah', 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (106, 102, 'JED-IT', 'Information Technology', 'تقنية المعلومات', 'IT Department at Jeddah', 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (107, 102, 'JED-FIN', 'Finance', 'المالية', 'Finance Department at Jeddah', 3, true, v_now, 'SYSTEM', false, E'\\x00'),
        (108, 102, 'JED-OPS', 'Operations', 'العمليات', 'Operations Department at Jeddah', 4, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Dammam Departments (109-112)
        (109, 103, 'DAM-HR', 'Human Resources', 'الموارد البشرية', 'HR Department at Dammam', 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (110, 103, 'DAM-IT', 'Information Technology', 'تقنية المعلومات', 'IT Department at Dammam', 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (111, 103, 'DAM-FIN', 'Finance', 'المالية', 'Finance Department at Dammam', 3, true, v_now, 'SYSTEM', false, E'\\x00'),
        (112, 103, 'DAM-OPS', 'Operations', 'العمليات', 'Operations Department at Dammam', 4, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Madinah Departments (113-116)
        (113, 104, 'MED-HR', 'Human Resources', 'الموارد البشرية', 'HR Department at Madinah', 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (114, 104, 'MED-IT', 'Information Technology', 'تقنية المعلومات', 'IT Department at Madinah', 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (115, 104, 'MED-FIN', 'Finance', 'المالية', 'Finance Department at Madinah', 3, true, v_now, 'SYSTEM', false, E'\\x00'),
        (116, 104, 'MED-OPS', 'Operations', 'العمليات', 'Operations Department at Madinah', 4, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Makkah Departments (117-120)
        (117, 105, 'MAK-HR', 'Human Resources', 'الموارد البشرية', 'HR Department at Makkah', 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (118, 105, 'MAK-IT', 'Information Technology', 'تقنية المعلومات', 'IT Department at Makkah', 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (119, 105, 'MAK-FIN', 'Finance', 'المالية', 'Finance Department at Makkah', 3, true, v_now, 'SYSTEM', false, E'\\x00'),
        (120, 105, 'MAK-OPS', 'Operations', 'العمليات', 'Operations Department at Makkah', 4, true, v_now, 'SYSTEM', false, E'\\x00')
    ON CONFLICT ("Id") DO NOTHING;

    -- ============================================
    -- Step 4: Insert Employees (IDs 1001-1050)
    -- ============================================

    -- Branch Managers (1001-1005) - No manager, assigned to branch
    INSERT INTO "Employees" ("Id", "BranchId", "EmployeeNumber", "FirstName", "LastName", "FirstNameAr", "LastNameAr",
        "Email", "Phone", "HireDate", "EmploymentStatus", "JobTitle", "JobTitleAr", "Gender", "WorkLocationType",
        "IsActive", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    VALUES
        (1001, 101, 'HQ-MGR-001', 'Ahmed', 'Al-Rashid', 'أحمد', 'الراشد', 'ahmed.rashid@company.com', '+966501001001', '2020-01-15', 1, 'Branch Manager', 'مدير الفرع', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1002, 102, 'JED-MGR-001', 'Mohammed', 'Al-Harbi', 'محمد', 'الحربي', 'mohammed.harbi@company.com', '+966501002002', '2020-02-01', 1, 'Branch Manager', 'مدير الفرع', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1003, 103, 'DAM-MGR-001', 'Khalid', 'Al-Otaibi', 'خالد', 'العتيبي', 'khalid.otaibi@company.com', '+966501003003', '2020-03-01', 1, 'Branch Manager', 'مدير الفرع', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1004, 104, 'MED-MGR-001', 'Abdullah', 'Al-Qahtani', 'عبدالله', 'القحطاني', 'abdullah.qahtani@company.com', '+966501004004', '2020-04-01', 1, 'Branch Manager', 'مدير الفرع', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1005, 105, 'MAK-MGR-001', 'Faisal', 'Al-Dosari', 'فيصل', 'الدوسري', 'faisal.dosari@company.com', '+966501005005', '2020-05-01', 1, 'Branch Manager', 'مدير الفرع', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00')
    ON CONFLICT ("Id") DO NOTHING;

    -- Department Managers (1006-1025) - Report to Branch Managers
    INSERT INTO "Employees" ("Id", "BranchId", "DepartmentId", "ManagerEmployeeId", "EmployeeNumber", "FirstName", "LastName",
        "FirstNameAr", "LastNameAr", "Email", "Phone", "HireDate", "EmploymentStatus", "JobTitle", "JobTitleAr", "Gender",
        "WorkLocationType", "IsActive", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    VALUES
        -- HQ Department Managers (report to 1001)
        (1006, 101, 101, 1001, 'HQ-HR-MGR', 'Sara', 'Al-Fahad', 'سارة', 'الفهد', 'sara.fahad@company.com', '+966501006006', '2021-01-15', 1, 'HR Manager', 'مدير الموارد البشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1007, 101, 102, 1001, 'HQ-IT-MGR', 'Omar', 'Al-Zahrani', 'عمر', 'الزهراني', 'omar.zahrani@company.com', '+966501007007', '2021-02-01', 1, 'IT Manager', 'مدير تقنية المعلومات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1008, 101, 103, 1001, 'HQ-FIN-MGR', 'Noura', 'Al-Salem', 'نورة', 'السالم', 'noura.salem@company.com', '+966501008008', '2021-03-01', 1, 'Finance Manager', 'مدير المالية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1009, 101, 104, 1001, 'HQ-OPS-MGR', 'Hassan', 'Al-Ghamdi', 'حسن', 'الغامدي', 'hassan.ghamdi@company.com', '+966501009009', '2021-04-01', 1, 'Operations Manager', 'مدير العمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Jeddah Department Managers (report to 1002)
        (1010, 102, 105, 1002, 'JED-HR-MGR', 'Fatima', 'Al-Shammari', 'فاطمة', 'الشمري', 'fatima.shammari@company.com', '+966501010010', '2021-05-01', 1, 'HR Manager', 'مدير الموارد البشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1011, 102, 106, 1002, 'JED-IT-MGR', 'Youssef', 'Al-Mutairi', 'يوسف', 'المطيري', 'youssef.mutairi@company.com', '+966501011011', '2021-06-01', 1, 'IT Manager', 'مدير تقنية المعلومات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1012, 102, 107, 1002, 'JED-FIN-MGR', 'Layla', 'Al-Anazi', 'ليلى', 'العنزي', 'layla.anazi@company.com', '+966501012012', '2021-07-01', 1, 'Finance Manager', 'مدير المالية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1013, 102, 108, 1002, 'JED-OPS-MGR', 'Ibrahim', 'Al-Subaie', 'إبراهيم', 'السبيعي', 'ibrahim.subaie@company.com', '+966501013013', '2021-08-01', 1, 'Operations Manager', 'مدير العمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Dammam Department Managers (report to 1003)
        (1014, 103, 109, 1003, 'DAM-HR-MGR', 'Maha', 'Al-Juhani', 'مها', 'الجهني', 'maha.juhani@company.com', '+966501014014', '2021-09-01', 1, 'HR Manager', 'مدير الموارد البشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1015, 103, 110, 1003, 'DAM-IT-MGR', 'Ali', 'Al-Bishi', 'علي', 'البيشي', 'ali.bishi@company.com', '+966501015015', '2021-10-01', 1, 'IT Manager', 'مدير تقنية المعلومات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1016, 103, 111, 1003, 'DAM-FIN-MGR', 'Huda', 'Al-Enezi', 'هدى', 'العنزي', 'huda.enezi@company.com', '+966501016016', '2021-11-01', 1, 'Finance Manager', 'مدير المالية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1017, 103, 112, 1003, 'DAM-OPS-MGR', 'Nasser', 'Al-Yami', 'ناصر', 'اليامي', 'nasser.yami@company.com', '+966501017017', '2021-12-01', 1, 'Operations Manager', 'مدير العمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Madinah Department Managers (report to 1004)
        (1018, 104, 113, 1004, 'MED-HR-MGR', 'Reem', 'Al-Harthy', 'ريم', 'الحارثي', 'reem.harthy@company.com', '+966501018018', '2022-01-01', 1, 'HR Manager', 'مدير الموارد البشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1019, 104, 114, 1004, 'MED-IT-MGR', 'Turki', 'Al-Sulami', 'تركي', 'السلمي', 'turki.sulami@company.com', '+966501019019', '2022-02-01', 1, 'IT Manager', 'مدير تقنية المعلومات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1020, 104, 115, 1004, 'MED-FIN-MGR', 'Amira', 'Al-Malki', 'أميرة', 'المالكي', 'amira.malki@company.com', '+966501020020', '2022-03-01', 1, 'Finance Manager', 'مدير المالية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1021, 104, 116, 1004, 'MED-OPS-MGR', 'Saleh', 'Al-Tamimi', 'صالح', 'التميمي', 'saleh.tamimi@company.com', '+966501021021', '2022-04-01', 1, 'Operations Manager', 'مدير العمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Makkah Department Managers (report to 1005)
        (1022, 105, 117, 1005, 'MAK-HR-MGR', 'Amal', 'Al-Saud', 'أمل', 'السعود', 'amal.saud@company.com', '+966501022022', '2022-05-01', 1, 'HR Manager', 'مدير الموارد البشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1023, 105, 118, 1005, 'MAK-IT-MGR', 'Majed', 'Al-Ruwaili', 'ماجد', 'الرويلي', 'majed.ruwaili@company.com', '+966501023023', '2022-06-01', 1, 'IT Manager', 'مدير تقنية المعلومات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1024, 105, 119, 1005, 'MAK-FIN-MGR', 'Dalal', 'Al-Ajmi', 'دلال', 'العجمي', 'dalal.ajmi@company.com', '+966501024024', '2022-07-01', 1, 'Finance Manager', 'مدير المالية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1025, 105, 120, 1005, 'MAK-OPS-MGR', 'Waleed', 'Al-Harthi', 'وليد', 'الحارثي', 'waleed.harthi@company.com', '+966501025025', '2022-08-01', 1, 'Operations Manager', 'مدير العمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00')
    ON CONFLICT ("Id") DO NOTHING;

    -- Regular Employees (1026-1050) - Report to Department Managers
    INSERT INTO "Employees" ("Id", "BranchId", "DepartmentId", "ManagerEmployeeId", "EmployeeNumber", "FirstName", "LastName",
        "FirstNameAr", "LastNameAr", "Email", "Phone", "HireDate", "EmploymentStatus", "JobTitle", "JobTitleAr", "Gender",
        "WorkLocationType", "IsActive", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    VALUES
        -- HQ Employees
        (1026, 101, 101, 1006, 'HQ-HR-001', 'Salma', 'Al-Khaldi', 'سلمى', 'الخالدي', 'salma.khaldi@company.com', '+966501026026', '2023-01-15', 1, 'HR Specialist', 'أخصائي موارد بشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1027, 101, 102, 1007, 'HQ-IT-001', 'Bandar', 'Al-Shehri', 'بندر', 'الشهري', 'bandar.shehri@company.com', '+966501027027', '2023-02-01', 1, 'Software Developer', 'مطور برمجيات', 1, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1028, 101, 102, 1007, 'HQ-IT-002', 'Lina', 'Al-Dossary', 'لينا', 'الدوسري', 'lina.dossary@company.com', '+966501028028', '2023-03-01', 1, 'System Analyst', 'محلل نظم', 2, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1029, 101, 103, 1008, 'HQ-FIN-001', 'Mansour', 'Al-Thubaiti', 'منصور', 'الثبيتي', 'mansour.thubaiti@company.com', '+966501029029', '2023-04-01', 1, 'Accountant', 'محاسب', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1030, 101, 104, 1009, 'HQ-OPS-001', 'Ghada', 'Al-Obaid', 'غادة', 'العبيد', 'ghada.obaid@company.com', '+966501030030', '2023-05-01', 1, 'Operations Coordinator', 'منسق عمليات', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Jeddah Employees
        (1031, 102, 105, 1010, 'JED-HR-001', 'Rakan', 'Al-Marri', 'راكان', 'المري', 'rakan.marri@company.com', '+966501031031', '2023-06-01', 1, 'HR Specialist', 'أخصائي موارد بشرية', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1032, 102, 106, 1011, 'JED-IT-001', 'Hadeel', 'Al-Sudairi', 'هديل', 'السديري', 'hadeel.sudairi@company.com', '+966501032032', '2023-07-01', 1, 'Software Developer', 'مطور برمجيات', 2, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1033, 102, 107, 1012, 'JED-FIN-001', 'Sultan', 'Al-Rabie', 'سلطان', 'الربيع', 'sultan.rabie@company.com', '+966501033033', '2023-08-01', 1, 'Accountant', 'محاسب', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1034, 102, 108, 1013, 'JED-OPS-001', 'Abeer', 'Al-Amri', 'عبير', 'العمري', 'abeer.amri@company.com', '+966501034034', '2023-09-01', 1, 'Operations Coordinator', 'منسق عمليات', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1035, 102, 106, 1011, 'JED-IT-002', 'Nawaf', 'Al-Qahtani', 'نواف', 'القحطاني', 'nawaf.qahtani@company.com', '+966501035035', '2023-10-01', 1, 'Network Engineer', 'مهندس شبكات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Dammam Employees
        (1036, 103, 109, 1014, 'DAM-HR-001', 'Jawahir', 'Al-Fayez', 'جواهر', 'الفايز', 'jawahir.fayez@company.com', '+966501036036', '2023-11-01', 1, 'HR Specialist', 'أخصائي موارد بشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1037, 103, 110, 1015, 'DAM-IT-001', 'Fahad', 'Al-Dawsari', 'فهد', 'الدوسري', 'fahad.dawsari@company.com', '+966501037037', '2023-12-01', 1, 'Software Developer', 'مطور برمجيات', 1, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1038, 103, 111, 1016, 'DAM-FIN-001', 'Mashael', 'Al-Otaibi', 'مشاعل', 'العتيبي', 'mashael.otaibi@company.com', '+966501038038', '2024-01-01', 1, 'Accountant', 'محاسب', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1039, 103, 112, 1017, 'DAM-OPS-001', 'Badr', 'Al-Shehab', 'بدر', 'الشهاب', 'badr.shehab@company.com', '+966501039039', '2024-02-01', 1, 'Operations Coordinator', 'منسق عمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1040, 103, 110, 1015, 'DAM-IT-002', 'Deema', 'Al-Rasheed', 'ديما', 'الرشيد', 'deema.rasheed@company.com', '+966501040040', '2024-03-01', 1, 'System Analyst', 'محلل نظم', 2, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Madinah Employees
        (1041, 104, 113, 1018, 'MED-HR-001', 'Mishal', 'Al-Harbi', 'مشعل', 'الحربي', 'mishal.harbi@company.com', '+966501041041', '2024-04-01', 1, 'HR Specialist', 'أخصائي موارد بشرية', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1042, 104, 114, 1019, 'MED-IT-001', 'Nada', 'Al-Ghamdi', 'ندى', 'الغامدي', 'nada.ghamdi@company.com', '+966501042042', '2024-05-01', 1, 'Software Developer', 'مطور برمجيات', 2, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1043, 104, 115, 1020, 'MED-FIN-001', 'Thamer', 'Al-Qahtani', 'ثامر', 'القحطاني', 'thamer.qahtani@company.com', '+966501043043', '2024-06-01', 1, 'Accountant', 'محاسب', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1044, 104, 116, 1021, 'MED-OPS-001', 'Aseel', 'Al-Zahrani', 'أسيل', 'الزهراني', 'aseel.zahrani@company.com', '+966501044044', '2024-07-01', 1, 'Operations Coordinator', 'منسق عمليات', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1045, 104, 114, 1019, 'MED-IT-002', 'Ziyad', 'Al-Mutairi', 'زياد', 'المطيري', 'ziyad.mutairi@company.com', '+966501045045', '2024-08-01', 1, 'Network Engineer', 'مهندس شبكات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        -- Makkah Employees
        (1046, 105, 117, 1022, 'MAK-HR-001', 'Lamia', 'Al-Subaie', 'لمياء', 'السبيعي', 'lamia.subaie@company.com', '+966501046046', '2024-09-01', 1, 'HR Specialist', 'أخصائي موارد بشرية', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1047, 105, 118, 1023, 'MAK-IT-001', 'Abdulaziz', 'Al-Anazi', 'عبدالعزيز', 'العنزي', 'abdulaziz.anazi@company.com', '+966501047047', '2024-10-01', 1, 'Software Developer', 'مطور برمجيات', 1, 2, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1048, 105, 119, 1024, 'MAK-FIN-001', 'Shahad', 'Al-Jaber', 'شهد', 'الجابر', 'shahad.jaber@company.com', '+966501048048', '2024-11-01', 1, 'Accountant', 'محاسب', 2, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1049, 105, 120, 1025, 'MAK-OPS-001', 'Hamad', 'Al-Dosari', 'حمد', 'الدوسري', 'hamad.dosari@company.com', '+966501049049', '2024-12-01', 1, 'Operations Coordinator', 'منسق عمليات', 1, 1, true, v_now, 'SYSTEM', false, E'\\x00'),
        (1050, 105, 118, 1023, 'MAK-IT-002', 'Maram', 'Al-Shammari', 'مرام', 'الشمري', 'maram.shammari@company.com', '+966501050050', '2024-12-15', 1, 'System Analyst', 'محلل نظم', 2, 2, true, v_now, 'SYSTEM', false, E'\\x00')
    ON CONFLICT ("Id") DO NOTHING;

    -- ============================================
    -- Step 5: Create Users for all Employees
    -- ============================================

    -- Create users for each employee (using email prefix as username)
    INSERT INTO "Users" ("Id", "Username", "Email", "Phone", "PasswordHash", "PasswordSalt", "MustChangePassword",
        "FailedLoginAttempts", "PreferredLanguage", "IsActive", "TwoFactorEnabled", "EmailConfirmed", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
    SELECT
        e."Id" as "Id",  -- Use same ID as employee for simplicity
        LOWER(SPLIT_PART(e."Email", '@', 1)) as "Username",
        e."Email",
        e."Phone",
        v_password_hash as "PasswordHash",
        v_password_salt as "PasswordSalt",
        true as "MustChangePassword",  -- Force password change on first login
        0 as "FailedLoginAttempts",
        'en' as "PreferredLanguage",
        true as "IsActive",
        false as "TwoFactorEnabled",
        true as "EmailConfirmed",
        v_now as "CreatedAtUtc",
        'SYSTEM' as "CreatedBy",
        false as "IsDeleted",
        E'\\x00' as "RowVersion"
    FROM "Employees" e
    WHERE e."Id" BETWEEN 1001 AND 1050
    ON CONFLICT ("Id") DO NOTHING;

    -- ============================================
    -- Step 6: Create Employee-User Links
    -- ============================================
    INSERT INTO "EmployeeUserLinks" ("EmployeeId", "UserId")
    SELECT e."Id", e."Id"  -- Since we used same IDs
    FROM "Employees" e
    WHERE e."Id" BETWEEN 1001 AND 1050
    ON CONFLICT DO NOTHING;

    -- ============================================
    -- Step 7: Assign Roles to Users
    -- ============================================

    -- Assign Manager role to Branch Managers (1001-1005) and Department Managers (1006-1025)
    INSERT INTO "UserRoles" ("UserId", "RoleId")
    SELECT e."Id", v_manager_role_id
    FROM "Employees" e
    WHERE e."Id" BETWEEN 1001 AND 1025
    ON CONFLICT DO NOTHING;

    -- Assign Employee role to all users (including managers - they have both roles)
    INSERT INTO "UserRoles" ("UserId", "RoleId")
    SELECT e."Id", v_employee_role_id
    FROM "Employees" e
    WHERE e."Id" BETWEEN 1001 AND 1050
    ON CONFLICT DO NOTHING;

    -- ============================================
    -- Step 8: Assign Branch Scopes to Users
    -- ============================================
    INSERT INTO "UserBranchScopes" ("UserId", "BranchId")
    SELECT e."Id", e."BranchId"
    FROM "Employees" e
    WHERE e."Id" BETWEEN 1001 AND 1050
    ON CONFLICT DO NOTHING;

    -- ============================================
    -- Step 9: Update Department Managers
    -- ============================================
    UPDATE "Departments" SET "ManagerEmployeeId" = 1006 WHERE "Id" = 101;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1007 WHERE "Id" = 102;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1008 WHERE "Id" = 103;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1009 WHERE "Id" = 104;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1010 WHERE "Id" = 105;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1011 WHERE "Id" = 106;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1012 WHERE "Id" = 107;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1013 WHERE "Id" = 108;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1014 WHERE "Id" = 109;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1015 WHERE "Id" = 110;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1016 WHERE "Id" = 111;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1017 WHERE "Id" = 112;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1018 WHERE "Id" = 113;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1019 WHERE "Id" = 114;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1020 WHERE "Id" = 115;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1021 WHERE "Id" = 116;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1022 WHERE "Id" = 117;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1023 WHERE "Id" = 118;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1024 WHERE "Id" = 119;
    UPDATE "Departments" SET "ManagerEmployeeId" = 1025 WHERE "Id" = 120;

    -- ============================================
    -- Step 10: Insert Leave Balances for all Employees (2025 & 2026)
    -- ============================================
    -- Vacation Type IDs (from seed data):
    -- 1 = Annual Leave (21 days)
    -- 2 = Sick Leave (10 days)
    -- 3 = Unpaid Leave (0 days - no balance)
    -- 4 = Emergency Leave (5 days)
    -- 5 = Maternity Leave (90 days)
    -- 6 = Paternity Leave (5 days)
    -- 7 = Bereavement Leave (3 days)
    -- 8 = Marriage Leave (5 days)

    -- Insert leave balances for 2025
    INSERT INTO "LeaveBalances" ("EmployeeId", "VacationTypeId", "Year", "EntitledDays", "AccruedDays", "UsedDays", "PendingDays", "AdjustedDays", "CreatedAtUtc", "ModifiedAtUtc")
    SELECT
        e."Id",
        vt."Id",
        2025,
        CASE vt."Id"
            WHEN 1 THEN 21  -- Annual Leave
            WHEN 2 THEN 10  -- Sick Leave
            WHEN 3 THEN 0   -- Unpaid Leave (no balance)
            WHEN 4 THEN 5   -- Emergency Leave
            WHEN 5 THEN 90  -- Maternity Leave
            WHEN 6 THEN 5   -- Paternity Leave
            WHEN 7 THEN 3   -- Bereavement Leave
            WHEN 8 THEN 5   -- Marriage Leave
            ELSE 0
        END,
        CASE vt."Id"
            WHEN 1 THEN 21  -- Annual Leave - fully accrued
            WHEN 2 THEN 10  -- Sick Leave - fully accrued
            WHEN 3 THEN 0   -- Unpaid Leave
            WHEN 4 THEN 5   -- Emergency Leave - fully accrued
            WHEN 5 THEN 90  -- Maternity Leave - fully accrued
            WHEN 6 THEN 5   -- Paternity Leave - fully accrued
            WHEN 7 THEN 3   -- Bereavement Leave - fully accrued
            WHEN 8 THEN 5   -- Marriage Leave - fully accrued
            ELSE 0
        END,
        0, -- UsedDays
        0, -- PendingDays
        0, -- AdjustedDays
        v_now,
        v_now
    FROM "Employees" e
    CROSS JOIN "VacationTypes" vt
    WHERE e."Id" BETWEEN 1001 AND 1050
      AND vt."Id" BETWEEN 1 AND 8
      AND NOT vt."IsDeleted"
      AND vt."Id" != 3  -- Skip Unpaid Leave (no balance needed)
    ON CONFLICT DO NOTHING;

    -- Insert leave balances for 2026
    INSERT INTO "LeaveBalances" ("EmployeeId", "VacationTypeId", "Year", "EntitledDays", "AccruedDays", "UsedDays", "PendingDays", "AdjustedDays", "CreatedAtUtc", "ModifiedAtUtc")
    SELECT
        e."Id",
        vt."Id",
        2026,
        CASE vt."Id"
            WHEN 1 THEN 21  -- Annual Leave
            WHEN 2 THEN 10  -- Sick Leave
            WHEN 3 THEN 0   -- Unpaid Leave (no balance)
            WHEN 4 THEN 5   -- Emergency Leave
            WHEN 5 THEN 90  -- Maternity Leave
            WHEN 6 THEN 5   -- Paternity Leave
            WHEN 7 THEN 3   -- Bereavement Leave
            WHEN 8 THEN 5   -- Marriage Leave
            ELSE 0
        END,
        CASE vt."Id"
            WHEN 1 THEN 21  -- Annual Leave - fully accrued
            WHEN 2 THEN 10  -- Sick Leave - fully accrued
            WHEN 3 THEN 0   -- Unpaid Leave
            WHEN 4 THEN 5   -- Emergency Leave - fully accrued
            WHEN 5 THEN 90  -- Maternity Leave - fully accrued
            WHEN 6 THEN 5   -- Paternity Leave - fully accrued
            WHEN 7 THEN 3   -- Bereavement Leave - fully accrued
            WHEN 8 THEN 5   -- Marriage Leave - fully accrued
            ELSE 0
        END,
        0, -- UsedDays
        0, -- PendingDays
        0, -- AdjustedDays
        v_now,
        v_now
    FROM "Employees" e
    CROSS JOIN "VacationTypes" vt
    WHERE e."Id" BETWEEN 1001 AND 1050
      AND vt."Id" BETWEEN 1 AND 8
      AND NOT vt."IsDeleted"
      AND vt."Id" != 3  -- Skip Unpaid Leave (no balance needed)
    ON CONFLICT DO NOTHING;

    -- ============================================
    -- Step 11: Assign Default Shift to All Branches
    -- ============================================
    -- This ensures all employees have shift coverage through branch-level assignment
    -- The default shift (ID 1) is created by the system seeder

    -- First, get the default shift ID
    DECLARE
        v_default_shift_id BIGINT;
    BEGIN
        SELECT "Id" INTO v_default_shift_id FROM "Shifts" WHERE "IsDefault" = true AND NOT "IsDeleted" LIMIT 1;

        IF v_default_shift_id IS NOT NULL THEN
            -- Create branch-level shift assignments for all sample branches
            -- AssignmentType: 1=Employee, 2=Department, 3=Branch
            INSERT INTO "ShiftAssignments" ("ShiftId", "AssignmentType", "BranchId", "EffectiveFromDate", "Status", "Priority", "Notes", "AssignedByUserId", "CreatedAtUtc", "CreatedBy", "IsDeleted", "RowVersion")
            VALUES
                (v_default_shift_id, 3, 101, '2020-01-01', 2, 10, 'Default shift assignment for Headquarters', 1, v_now, 'SYSTEM', false, E'\\x00'),
                (v_default_shift_id, 3, 102, '2020-01-01', 2, 10, 'Default shift assignment for Jeddah Branch', 1, v_now, 'SYSTEM', false, E'\\x00'),
                (v_default_shift_id, 3, 103, '2020-01-01', 2, 10, 'Default shift assignment for Dammam Branch', 1, v_now, 'SYSTEM', false, E'\\x00'),
                (v_default_shift_id, 3, 104, '2020-01-01', 2, 10, 'Default shift assignment for Madinah Branch', 1, v_now, 'SYSTEM', false, E'\\x00'),
                (v_default_shift_id, 3, 105, '2020-01-01', 2, 10, 'Default shift assignment for Makkah Branch', 1, v_now, 'SYSTEM', false, E'\\x00')
            ON CONFLICT DO NOTHING;

            RAISE NOTICE 'Assigned default shift (ID: %) to all 5 branches', v_default_shift_id;
        ELSE
            RAISE WARNING 'Default shift not found! Please run the system seeder first to create the default shift.';
        END IF;
    END;

    RAISE NOTICE 'Sample data inserted successfully!';
    RAISE NOTICE 'Created: 5 Branches, 20 Departments, 50 Employees with User Accounts';
    RAISE NOTICE 'Created: 5 Branch-level Shift Assignments (default shift for all branches)';
    RAISE NOTICE 'Created: 700 Leave Balances (50 employees x 7 vacation types x 2 years)';
    RAISE NOTICE 'Default password for all employees: Emp@123!';
    RAISE NOTICE 'All users have MustChangePassword=true (will be forced to change on first login)';

END $$;

-- ============================================
-- Summary
-- ============================================
-- Branches: 101-105 (5 total)
--   - Headquarters Riyadh, Jeddah, Dammam, Madinah, Makkah
--
-- Departments: 101-120 (20 total, 4 per branch)
--   - HR, IT, Finance, Operations per branch
--
-- Employees & Users: 1001-1050 (50 total)
--   - Branch Managers (1001-1005): Manager role, no manager
--   - Department Managers (1006-1025): Manager + Employee roles, report to Branch Managers
--   - Regular Employees (1026-1050): Employee role, report to Department Managers
--
-- Shift Assignments: 5 branch-level assignments
--   - Default shift assigned to all 5 branches
--   - All employees inherit shift through branch assignment
--   - Effective from 2020-01-01 (covers all employees)
--
-- Leave Balances: 700 total (50 employees x 7 vacation types x 2 years)
--   - Years: 2025, 2026
--   - Vacation Types: Annual (21d), Sick (10d), Emergency (5d), Maternity (90d),
--                     Paternity (5d), Bereavement (3d), Marriage (5d)
--   - Note: Unpaid Leave excluded (no balance needed)
--
-- Login Credentials:
-- - Username: email prefix (e.g., ahmed.rashid for ahmed.rashid@company.com)
-- - Password: Emp@123! (forced to change on first login)
-- ============================================
