SET QUOTED_IDENTIFIER ON;

-- Clear all employees and departments
DELETE FROM Employees;
DELETE FROM Departments;

-- Reset identity seeds
DBCC CHECKIDENT ('Departments', RESEED, 0);
DBCC CHECKIDENT ('Employees', RESEED, 0);

PRINT '✅ All employees and departments cleared, identity seeds reset';