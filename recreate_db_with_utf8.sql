-- Recreate database with proper UTF-8 Arabic collation
USE master;
GO

-- Drop existing database
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'TimeAttendanceSystem')
BEGIN
    ALTER DATABASE TimeAttendanceSystem SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE TimeAttendanceSystem;
    PRINT 'Existing database dropped';
END

-- Create new database with UTF-8 Arabic collation
CREATE DATABASE TimeAttendanceSystem
COLLATE Arabic_100_CI_AS_SC_UTF8;

PRINT 'New database created with Arabic UTF-8 collation';

-- Verify the collation
USE TimeAttendanceSystem;
SELECT DATABASEPROPERTYEX('TimeAttendanceSystem', 'Collation') AS NewCollation;
GO