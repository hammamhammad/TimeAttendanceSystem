SET TIME ZONE 'UTC';
DELETE FROM "AttendanceRecords";

DO $$
DECLARE
  emp_id BIGINT := (SELECT "Id" FROM "Employees" WHERE "EmployeeNumber"='E2E-001');
  d DATE := '2026-04-01'::date;
  emp_status INT;
  ot NUMERIC;
  day_type INT;
  dow INT;
BEGIN
  WHILE d <= '2026-04-30'::date LOOP
    emp_status := 1;
    ot := 0;
    day_type := 0;
    dow := EXTRACT(DOW FROM d)::int;

    IF dow IN (5,6) THEN
      IF d = '2026-04-18'::date THEN
        ot := 3; day_type := 2;
      ELSE
        d := d + 1; CONTINUE;
      END IF;
    ELSIF d = '2026-04-08'::date THEN
      ot := 2; day_type := 1;
    ELSIF d = '2026-04-20'::date OR d = '2026-04-21'::date THEN
      emp_status := 3;
    ELSIF d IN ('2026-04-02'::date, '2026-04-09'::date, '2026-04-16'::date) THEN
      ot := 1; day_type := 0;
    END IF;

    INSERT INTO "AttendanceRecords"
      ("EmployeeId","AttendanceDate","Status","ScheduledHours","WorkingHours","BreakHours",
       "OvertimeHours","PreShiftOvertimeHours","PostShiftOvertimeHours","OvertimeRate",
       "OvertimeAmount","OvertimeDayType","LateMinutes","EarlyLeaveMinutes","IsManualOverride",
       "IsApproved","IsFinalized","WorkLocation",
       "CreatedAtUtc","CreatedBy","IsDeleted","RowVersion")
    VALUES
      (emp_id, (d::text || ' 12:00:00')::timestamptz AT TIME ZONE 'UTC',
       emp_status, 8, CASE WHEN emp_status=1 THEN 8 ELSE 0 END, 0,
       ot, 0, ot, 1.0, 0, day_type, 0, 0, false,
       false, false, 1,
       NOW(),'SEED',false,E'\\x01');

    d := d + 1;
  END LOOP;
END $$;

UPDATE "PublicHolidays" SET "SpecificDate" = ('2026-04-08 12:00:00')::timestamp;

SELECT "AttendanceDate" AT TIME ZONE 'UTC' AS utc_ts, "OvertimeHours"
FROM "AttendanceRecords" WHERE "OvertimeHours" > 0 ORDER BY "AttendanceDate";
SELECT "SpecificDate" AT TIME ZONE 'UTC' FROM "PublicHolidays";
