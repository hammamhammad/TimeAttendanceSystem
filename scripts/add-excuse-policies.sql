-- ============================================
-- Add Excuse Policies for Sample Data
-- ============================================
-- Creates one organization-wide default policy (BranchId = NULL)
-- ============================================

DO $$
DECLARE
    v_now TIMESTAMP := NOW() AT TIME ZONE 'UTC';
BEGIN
    -- Check if an active excuse policy already exists
    IF EXISTS (SELECT 1 FROM "ExcusePolicies" WHERE NOT "IsDeleted" AND "IsActive") THEN
        RAISE NOTICE 'Active excuse policy already exists. Skipping insertion.';
        RETURN;
    END IF;

    -- Insert organization-wide default excuse policy (BranchId = NULL)
    INSERT INTO "ExcusePolicies" (
        "BranchId",
        "MaxPersonalExcusesPerMonth",
        "MaxPersonalExcuseHoursPerMonth",
        "MaxPersonalExcuseHoursPerDay",
        "MaxHoursPerExcuse",
        "RequiresApproval",
        "AllowPartialHourExcuses",
        "MinimumExcuseDuration",
        "IsActive",
        "MaxRetroactiveDays",
        "AllowSelfServiceRequests",
        "CreatedAtUtc",
        "CreatedBy",
        "IsDeleted",
        "RowVersion"
    ) VALUES (
        NULL,       -- Organization-wide policy (applies to all branches)
        5,          -- Max 5 personal excuses per month
        8.0,        -- Max 8 hours of personal excuses per month
        4.0,        -- Max 4 hours of personal excuses per day
        2.0,        -- Max 2 hours per individual excuse
        true,       -- Requires approval
        true,       -- Allow partial hour excuses (e.g., 30 minutes)
        0.5,        -- Minimum 30 minutes per excuse
        true,       -- Policy is active
        7,          -- Can create excuses up to 7 days in the past
        true,       -- Allow self-service requests
        v_now,
        'SYSTEM',
        false,
        E'\\x00'
    );

    RAISE NOTICE 'Organization-wide excuse policy created successfully!';
    RAISE NOTICE 'Policy settings:';
    RAISE NOTICE '  - Max 5 personal excuses per month';
    RAISE NOTICE '  - Max 8 hours per month';
    RAISE NOTICE '  - Max 4 hours per day';
    RAISE NOTICE '  - Max 2 hours per excuse';
    RAISE NOTICE '  - Minimum 30 minutes per excuse';
    RAISE NOTICE '  - Requires approval';
    RAISE NOTICE '  - Allows self-service requests';
    RAISE NOTICE '  - Retroactive limit: 7 days';

END $$;
