-- Fix RowVersion column defaults for workflow-related tables
-- This ensures new records get a default RowVersion value in PostgreSQL

-- Update WorkflowDefinitions table
ALTER TABLE "WorkflowDefinitions"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

-- Update existing NULL values if any
UPDATE "WorkflowDefinitions"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

-- Update WorkflowSteps table
ALTER TABLE "WorkflowSteps"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

UPDATE "WorkflowSteps"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

-- Update WorkflowInstances table
ALTER TABLE "WorkflowInstances"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

UPDATE "WorkflowInstances"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

-- Update WorkflowStepExecutions table
ALTER TABLE "WorkflowStepExecutions"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

UPDATE "WorkflowStepExecutions"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

-- Update ApprovalDelegations table
ALTER TABLE "ApprovalDelegations"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

UPDATE "ApprovalDelegations"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

-- Update EmployeeVacations table
ALTER TABLE "EmployeeVacations"
ALTER COLUMN "RowVersion" SET DEFAULT E'\\x01'::bytea;

UPDATE "EmployeeVacations"
SET "RowVersion" = E'\\x01'::bytea
WHERE "RowVersion" IS NULL;

SELECT 'RowVersion defaults applied successfully' as status;
