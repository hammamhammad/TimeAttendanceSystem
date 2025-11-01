# Background Jobs Tests

## Overview
This test suite covers Coravel-based background job execution, scheduling, error handling, and monitoring.

---

## Test Case JOB-001: Daily Attendance Generation Job Execution

**Priority:** High
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that DailyAttendanceGenerationJob executes successfully on schedule.

### Preconditions
- Coravel configured in Startup/Program.cs
- Job scheduled for midnight UTC
- Active employees exist in database

### Test Steps
1. Configure job to run immediately (for testing)
2. Trigger job execution
3. Monitor execution logs
4. Verify attendance records created

### Expected Results
- Job executes successfully
- Logs show:
  - Job start timestamp
  - "Processing daily attendance generation for [date]"
  - "Generated X records, Updated Y records"
  - "Job completed successfully"
  - Execution duration
- Attendance records created for all active employees
- No exceptions thrown
- Job completion status: Success

---

## Test Case JOB-002: Job Scheduling Configuration

**Priority:** High
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job is correctly scheduled to run daily at midnight.

### Preconditions
- Coravel scheduler configured

### Test Steps
1. Check job configuration in code:
   ```csharp
   services.AddScheduler(scheduler =>
   {
       scheduler.Schedule<DailyAttendanceGenerationJob>()
           .DailyAt(0, 0); // Midnight UTC
   });
   ```
2. Verify schedule registration
3. Check next execution time

### Expected Results
- Job scheduled for 00:00 UTC daily
- Next execution time calculated correctly
- Schedule persists across application restarts
- Timezone handling correct (UTC or configured timezone)

---

## Test Case JOB-003: Job Error Handling

**Priority:** High
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job handles errors gracefully without crashing the application.

### Preconditions
- Job configured
- Database temporarily unavailable or error condition simulated

### Test Steps
1. Simulate database connection failure
2. Trigger job execution
3. Observe error handling
4. Restore database connection
5. Re-run job

### Expected Results
- Job catches exception
- Logs error:
  - Error message
  - Stack trace
  - Timestamp
- Application continues running (doesn't crash)
- Job status: Failed
- Retry mechanism (if configured):
  - Automatic retry after delay
  - Exponential backoff
- Error notification (if configured):
  - Admin email or alert
- Step 5 (after recovery):
  - Job succeeds
  - Normal operation restored

---

## Test Case JOB-004: Partial Success Handling

**Priority:** Medium
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job handles partial failures (some employees fail, others succeed).

### Preconditions
- 100 employees
- 5 employees have data issues (invalid shift assignments)

### Test Steps
1. Trigger job execution
2. Monitor execution
3. Check results

### Expected Results
- Job completes (doesn't abort on first error)
- Results logged:
  - "Generated 95 records successfully"
  - "Failed to generate 5 records"
  - Error details for each failure
- Successful records created
- Failed records skipped
- Error summary provided
- Admin can investigate failed cases

---

## Test Case JOB-005: Job Execution Logging

**Priority:** Medium
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job execution is properly logged for monitoring and debugging.

### Preconditions
- Logging configured (ILogger)
- Log sink configured (file, database, Application Insights)

### Test Steps
1. Trigger job execution
2. Check logs

### Expected Results
- Logs contain:
  - **Start**: "Starting DailyAttendanceGenerationJob for [date]"
  - **Progress**: "Processing employee batch 1-100"
  - **Results**: "Generated X records, Updated Y records, Errors Z"
  - **End**: "DailyAttendanceGenerationJob completed in [duration]"
  - **Errors**: Detailed error messages for failures
- Log levels appropriate:
  - Information: Start/end, summary
  - Warning: Partial failures
  - Error: Critical failures
- Structured logging (JSON format for parsing)

---

## Test Case JOB-006: Job Performance Monitoring

**Priority:** Medium
**Type:** Performance
**Module:** Background Jobs

### Description
Verify that job execution time is monitored and meets SLAs.

### Preconditions
- Performance monitoring configured
- SLA: Job should complete in < 30 seconds for 1000 employees

### Test Steps
1. Create 1000 active employees
2. Trigger job
3. Measure execution time
4. Check performance metrics

### Expected Results
- Execution time: < 30 seconds
- Performance metrics logged:
  - Total duration
  - Records processed per second
  - Database query time
  - Memory usage
- Performance alerts if SLA exceeded
- Metrics available for monitoring dashboard

---

## Test Case JOB-007: Concurrent Job Execution Prevention

**Priority:** High
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job prevents concurrent executions (no overlapping runs).

### Preconditions
- Job configured
- Long-running job scenario (simulated delay)

### Test Steps
1. Start job execution (add delay to simulate long run)
2. Attempt to trigger job again while first is running
3. Observe behavior

### Expected Results
- Second execution:
  - Blocked (doesn't start)
  - Log message: "Job already running, skipping execution"
  - OR queued to run after first completes
- No duplicate attendance records created
- Concurrency control mechanism:
  - Database lock
  - In-memory flag
  - Coravel's built-in prevention
- First execution completes normally

---

## Test Case JOB-008: Job Retry Mechanism

**Priority:** Medium
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that failed jobs can be retried automatically or manually.

### Preconditions
- Job retry policy configured (e.g., 3 retries with exponential backoff)

### Test Steps
1. Simulate transient failure (network timeout)
2. Trigger job
3. Observe retry behavior
4. Simulate persistent failure
5. Observe final result

### Expected Results
- Transient failure (Step 2-3):
  - First attempt fails
  - Retry 1 after 1 minute: Fails
  - Retry 2 after 2 minutes: Fails
  - Retry 3 after 4 minutes: Succeeds (if error resolved)
- Persistent failure (Step 4-5):
  - All retries exhausted
  - Job marked as failed
  - Admin notification sent
  - Manual intervention required

---

## Test Case JOB-009: Job Idempotency

**Priority:** High
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that running job multiple times for same date doesn't create duplicates.

### Preconditions
- Job executed once for 2024-02-15
- Attendance records created

### Test Steps
1. Run job again for same date (2024-02-15)
2. Check database for duplicates

### Expected Results
- No duplicate attendance records
- Job detects existing records:
  - Updates existing records OR
  - Skips already-processed employees
  - Log: "Found X existing records, updated Y records"
- Idempotent operation:
  - Safe to run multiple times
  - Same result regardless of executions
- Database constraints prevent duplicates:
  - Unique index on (EmployeeId, Date)

---

## Test Case JOB-010: Job Monitoring Dashboard

**Priority:** Low
**Type:** Functional
**Module:** Background Jobs

### Description
Verify that job execution status is visible in monitoring dashboard.

### Preconditions
- Admin logged in
- Monitoring dashboard implemented (or using Hangfire Dashboard if integrated)

### Test Steps
1. Navigate to `/admin/jobs` or Hangfire Dashboard
2. View job execution history
3. Check job details

### Expected Results
- Dashboard shows:
  - Job name: "DailyAttendanceGenerationJob"
  - Last execution: Timestamp
  - Status: Success/Failed
  - Next execution: Timestamp
  - Execution history (last 10 runs)
  - Execution duration for each run
  - Success/failure counts
- Ability to:
  - Trigger job manually
  - View detailed logs
  - See error messages
  - Cancel running job (if applicable)
- Real-time status updates

---

## Test Execution Notes

### Test Data Requirements
- Active employees with shift assignments
- Test dates for various scenarios
- Simulated error conditions

### Environment Setup
- Backend with Coravel configured
- Logging infrastructure
- Database access
- Scheduler running

### Dependencies
- Coravel NuGet package
- ILogger implementation
- Database with attendance schema
- Shift management system

### Monitoring Setup
- Application Insights or equivalent
- Log aggregation (Seq, ELK, Splunk)
- Alert configuration for job failures

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| JOB-001 | Job Execution | High | ⬜ Not Run |
| JOB-002 | Scheduling | High | ⬜ Not Run |
| JOB-003 | Error Handling | High | ⬜ Not Run |
| JOB-004 | Partial Success | Medium | ⬜ Not Run |
| JOB-005 | Logging | Medium | ⬜ Not Run |
| JOB-006 | Performance | Medium | ⬜ Not Run |
| JOB-007 | Concurrency | High | ⬜ Not Run |
| JOB-008 | Retry Mechanism | Medium | ⬜ Not Run |
| JOB-009 | Idempotency | High | ⬜ Not Run |
| JOB-010 | Monitoring | Low | ⬜ Not Run |
