USE TimeAttendanceSystem;
SET QUOTED_IDENTIFIER ON;
SET ANSI_NULLS ON;
GO

DELETE FROM Employees;
DELETE FROM Departments;

DBCC CHECKIDENT ('Departments', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);

PRINT 'Test data cleared successfully';