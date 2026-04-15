-- E2E payroll seed for ta_tt_tt_3. Period under test: 2026-04-01 .. 2026-04-30.
BEGIN;

-- Clean slate: tenant DB is empty except for AllowanceTypes
DO $$
DECLARE
  branch_id BIGINT;
  emp_id BIGINT;
  ss_id BIGINT;
  tax_id BIGINT;
  prov_id BIGINT;
  housing_type_id BIGINT;
  d DATE := '2026-04-01'::date;
  emp_status INT;
  ot NUMERIC;
  day_type INT;
  dow INT;
BEGIN
  -- 1. Branch
  INSERT INTO "Branches" ("Code","Name","TimeZone","IsActive","GeofenceRadiusMeters",
                          "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES ('E2E','E2E Test Branch','Asia/Riyadh',true,100,NOW(),'SEED',false,E'\\x01')
  RETURNING "Id" INTO branch_id;
  RAISE NOTICE 'Branch Id=%', branch_id;

  -- 2. Employee
  INSERT INTO "Employees"
    ("BranchId","EmployeeNumber","FirstName","LastName","HireDate","EmploymentStatus",
     "JobTitle","WorkLocationType","IsActive","ProbationStatus",
     "Nationality","Email","Gender",
     "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (branch_id,'E2E-001','Ahmed','Saudi','2024-01-01'::timestamptz,1,
          'Engineer',1,true,3,'SA','e2e1@test.local',1,
          NOW(),'SEED',false,E'\\x01')
  RETURNING "Id" INTO emp_id;
  RAISE NOTICE 'Employee Id=%', emp_id;

  -- 3. Salary structure
  INSERT INTO "SalaryStructures" ("BranchId","Name","IsActive","CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (branch_id,'Default',true,NOW(),'SEED',false,E'\\x01')
  RETURNING "Id" INTO ss_id;

  -- 4. TWO salary slices (mid-period change on 2026-04-15)
  INSERT INTO "EmployeeSalaries"
    ("EmployeeId","SalaryStructureId","BaseSalary","Currency","EffectiveDate","EndDate","IsCurrent",
     "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES
    (emp_id, ss_id, 10000.00, 'SAR', '2026-01-01'::timestamptz, '2026-04-14'::timestamptz, false,
     NOW(),'SEED',false,E'\\x01'),
    (emp_id, ss_id, 12000.00, 'SAR', '2026-04-15'::timestamptz, NULL, true,
     NOW(),'SEED',false,E'\\x01');

  -- 5. Public holiday on 2026-04-08 (Wednesday)
  INSERT INTO "PublicHolidays"
    ("Name","NameAr","SpecificDate","HolidayType","IsActive","IsNational","Priority",
     "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES ('E2E Holiday','عطلة','2026-04-08'::timestamptz,1,true,true,1,
          NOW(),'SEED',false,E'\\x01');

  -- 6. Overtime configuration
  INSERT INTO "OvertimeConfigurations"
    ("EnablePreShiftOvertime","EnablePostShiftOvertime","NormalDayRate","PublicHolidayRate","OffDayRate",
     "MinimumOvertimeMinutes","ConsiderFlexibleTime","MaxPreShiftOvertimeHours","MaxPostShiftOvertimeHours",
     "RequireApproval","OvertimeGracePeriodMinutes","WeekendAsOffDay","RoundingIntervalMinutes","IsActive",
     "EffectiveFromDate","CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (false,true,1.5,2.0,2.5,15,true,2.0,4.0,false,5,true,15,true,
          '2024-01-01'::timestamptz,NOW(),'SEED',false,E'\\x01');

  -- 7. Tax configuration: 0-5000:0%, 5000-10000:10%, 10000+:20%
  INSERT INTO "TaxConfigurations" ("BranchId","Name","EffectiveDate","IsActive",
                                    "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (branch_id,'E2E Tax','2024-01-01'::timestamptz,true,NOW(),'SEED',false,E'\\x01')
  RETURNING "Id" INTO tax_id;

  INSERT INTO "TaxBrackets" ("TaxConfigurationId","MinAmount","MaxAmount","Rate","FixedAmount",
                              "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES
    (tax_id,     0,  5000, 0.00, 0, NOW(),'SEED',false,E'\\x01'),
    (tax_id,  5000, 10000, 0.10, 0, NOW(),'SEED',false,E'\\x01'),
    (tax_id, 10000, 999999, 0.20, 0, NOW(),'SEED',false,E'\\x01');

  -- 8. SocialInsuranceConfig for Saudi nationality
  INSERT INTO "SocialInsuranceConfigs"
    ("BranchId","Name","EmployeeContributionRate","EmployerContributionRate","MaxInsurableSalary",
     "EffectiveDate","IsActive","AppliesToNationalityCode",
     "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (branch_id,'GOSI Saudi',0.0975,0.1200,45000.00,'2024-01-01'::timestamptz,true,'SA',
          NOW(),'SEED',false,E'\\x01');

  -- 9. Insurance provider + employee enrollment
  INSERT INTO "InsuranceProviders"
    ("Name","InsuranceType","IsActive","CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES ('GOSI',1,true,NOW(),'SEED',false,E'\\x01')
  RETURNING "Id" INTO prov_id;

  INSERT INTO "EmployeeInsurances"
    ("EmployeeId","InsuranceProviderId","InsuranceClass","StartDate","IsActive","IncludesDependents",
     "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (emp_id, prov_id, 1, '2024-01-01'::timestamptz, true, false,
          NOW(),'SEED',false,E'\\x01');

  -- 10. PayrollCalendarPolicy: WorkingDays basis
  INSERT INTO "PayrollCalendarPolicies"
    ("BranchId","BasisType","FixedBasisDays","StandardHoursPerDay","TreatPublicHolidaysAsPaid",
     "EffectiveFromDate","IsActive","CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
  VALUES (branch_id, 2, NULL, 8.00, true, '2024-01-01'::timestamptz, true,
          NOW(),'SEED',false,E'\\x01');

  -- 11. Allowance assignment: housing 1500, covers whole period
  SELECT "Id" INTO housing_type_id FROM "AllowanceTypes" WHERE "Code"='HOUSING' LIMIT 1;
  IF housing_type_id IS NOT NULL THEN
    INSERT INTO "AllowanceAssignments"
      ("EmployeeId","AllowanceTypeId","Amount","CalculationType","Currency",
       "EffectiveFromDate","Status","CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
    VALUES (emp_id, housing_type_id, 1500.00, 1, 'SAR',
            '2026-01-01'::timestamptz, 1,
            NOW(),'SEED',false,E'\\x01');
  END IF;

  -- 12. Attendance records
  WHILE d <= '2026-04-30'::date LOOP
    emp_status := 1;  -- Present
    ot := 0;
    day_type := 0;    -- Normal
    dow := EXTRACT(DOW FROM d)::int;  -- Sun=0 ... Sat=6

    IF dow IN (5,6) THEN
      -- SA weekend = Fri(5) + Sat(6). Skip except OT-off-day Saturday 2026-04-18.
      IF d = '2026-04-18'::date THEN
        ot := 3;
        day_type := 2;
      ELSE
        d := d + 1;
        CONTINUE;
      END IF;
    ELSIF d = '2026-04-08'::date THEN
      ot := 2;
      day_type := 1;
    ELSIF d = '2026-04-20'::date OR d = '2026-04-21'::date THEN
      emp_status := 3; -- Absent
    ELSIF d IN ('2026-04-02'::date, '2026-04-09'::date, '2026-04-16'::date) THEN
      ot := 1;
      day_type := 0;
    END IF;

    INSERT INTO "AttendanceRecords"
      ("EmployeeId","AttendanceDate","Status","ScheduledHours","WorkingHours","BreakHours",
       "OvertimeHours","PreShiftOvertimeHours","PostShiftOvertimeHours","OvertimeRate",
       "OvertimeAmount","OvertimeDayType","LateMinutes","EarlyLeaveMinutes","IsManualOverride",
       "IsApproved","IsFinalized","WorkLocation",
       "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
    VALUES
      (emp_id, d::timestamptz, emp_status, 8,
       CASE WHEN emp_status=1 THEN 8 ELSE 0 END,
       0, ot, 0, ot, 1.0, 0, day_type, 0, 0, false,
       false, false, 1,
       NOW(),'SEED',false,E'\\x01');

    d := d + 1;
  END LOOP;
END $$;

COMMIT;

SELECT 'Branches' AS t, COUNT(*) FROM "Branches"
UNION ALL SELECT 'Employees', COUNT(*) FROM "Employees"
UNION ALL SELECT 'EmployeeSalaries', COUNT(*) FROM "EmployeeSalaries"
UNION ALL SELECT 'TaxConfigs', COUNT(*) FROM "TaxConfigurations"
UNION ALL SELECT 'TaxBrackets', COUNT(*) FROM "TaxBrackets"
UNION ALL SELECT 'SIConfigs', COUNT(*) FROM "SocialInsuranceConfigs"
UNION ALL SELECT 'InsuranceProviders', COUNT(*) FROM "InsuranceProviders"
UNION ALL SELECT 'EmployeeInsurances', COUNT(*) FROM "EmployeeInsurances"
UNION ALL SELECT 'OTConfigs', COUNT(*) FROM "OvertimeConfigurations"
UNION ALL SELECT 'CalendarPolicies', COUNT(*) FROM "PayrollCalendarPolicies"
UNION ALL SELECT 'PublicHolidays', COUNT(*) FROM "PublicHolidays"
UNION ALL SELECT 'AllowanceAssignments', COUNT(*) FROM "AllowanceAssignments"
UNION ALL SELECT 'AttendanceRecords', COUNT(*) FROM "AttendanceRecords";
