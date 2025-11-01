# Performance Tests

## Overview
This test suite covers system performance, scalability, response times, bulk operations, and concurrent access scenarios.

---

## Test Case PERF-001: Bulk Attendance Record Generation Performance

**Priority:** High
**Type:** Performance
**Module:** Background Jobs

### Description
Verify that daily attendance generation completes within acceptable time for large employee counts.

### Preconditions
- 1000 active employees
- All employees have shift assignments
- Background job configured

### Test Steps
1. Record start time
2. Trigger DailyAttendanceGenerationJob
3. Record end time
4. Measure execution time
5. Verify all records created

### Expected Results
- Execution time: < 30 seconds for 1000 employees
- All 1000 attendance records created successfully
- No errors or timeouts
- Database query optimization:
  - Batch inserts used
  - Minimal round trips
  - Efficient shift resolution
- Memory usage acceptable (< 512 MB)
- CPU usage reasonable (< 80%)

**Performance Benchmarks:**
- 100 employees: < 5 seconds
- 500 employees: < 15 seconds
- 1000 employees: < 30 seconds
- 5000 employees: < 2 minutes

---

## Test Case PERF-002: Employee List Query with Pagination

**Priority:** High
**Type:** Performance
**Module:** Employee Management

### Description
Verify that employee list queries with pagination perform well with large datasets.

### Preconditions
- Database contains 10,000 employees
- User logged in

### Test Steps
1. Send GET `/api/v1/employees?pageNumber=1&pageSize=50`
2. Measure response time
3. Send GET `/api/v1/employees?pageNumber=100&pageSize=50`
4. Measure response time
5. Apply filters and search

### Expected Results
- Page 1 response time: < 500ms
- Page 100 response time: < 500ms
- Consistent response time across pages
- Database optimizations:
  - Indexed queries (on Code, Name, DepartmentId, BranchId)
  - Efficient pagination (OFFSET/LIMIT or cursor-based)
  - Count query optimized
- Filtered search: < 1 second
- No N+1 query problems

---

## Test Case PERF-003: Attendance Report Generation for Large Date Range

**Priority:** Medium
**Type:** Performance
**Module:** Reporting

### Description
Verify that monthly attendance reports generate efficiently for many employees.

### Preconditions
- 500 employees with daily attendance for 1 month (30 days)
- Total records: 15,000 (500 × 30)

### Test Steps
1. Request monthly report:
   - GET `/api/v1/reports/monthly-attendance?month=2024-02&format=json`
2. Measure response time
3. Request export:
   - GET `/api/v1/reports/monthly-attendance?month=2024-02&format=csv`
4. Measure export time

### Expected Results
- JSON response: < 3 seconds
- CSV export: < 5 seconds
- Report includes:
  - All 500 employees
  - Aggregated statistics (total hours, overtime, absences)
  - Daily breakdown
- Database query optimization:
  - Single query with JOINs
  - Aggregations at database level
  - No in-memory processing of large datasets
- Memory efficient streaming for exports

---

## Test Case PERF-004: Concurrent Clock-In Transactions

**Priority:** High
**Type:** Performance - Concurrency
**Module:** Attendance

### Description
Verify that system handles concurrent clock-in requests from multiple employees.

### Preconditions
- 100 employees ready to clock in simultaneously
- Load testing tool configured (e.g., JMeter, k6)

### Test Steps
1. Simulate 100 concurrent POST requests to `/api/v1/attendance/clock-in`
2. Each request for different employee
3. Measure response times
4. Verify all transactions created
5. Check for race conditions or deadlocks

### Expected Results
- All 100 clock-in requests succeed
- Average response time: < 1 second
- 95th percentile: < 2 seconds
- No failed transactions
- No database deadlocks
- No duplicate transactions
- Attendance records correctly created
- Concurrent write handling:
  - Transaction isolation
  - Row-level locking
  - Optimistic concurrency control

---

## Test Case PERF-005: Vacation Request Conflict Detection Performance

**Priority:** Medium
**Type:** Performance
**Module:** Vacation Management

### Description
Verify that vacation conflict detection performs well with many existing vacations.

### Preconditions
- Employee has 50 historical vacation requests
- Database contains 10,000 total vacation records

### Test Steps
1. Create new vacation request overlapping with existing
2. Measure conflict detection time
3. Create non-overlapping request
4. Measure validation time

### Expected Results
- Conflict detection: < 500ms
- Non-conflict validation: < 200ms
- Database optimization:
  - Indexed on EmployeeId, StartDate, EndDate
  - Efficient date range query
  - Early exit on first conflict found
- Scales well with data growth

---

## Test Case PERF-006: API Response Time Under Normal Load

**Priority:** High
**Type:** Performance
**Module:** API

### Description
Verify that API endpoints meet response time SLAs under normal load.

### Preconditions
- System under normal load (50 concurrent users)
- Various API endpoints

### Test Steps
Measure response times for critical endpoints:
1. GET `/api/v1/employees` (list)
2. GET `/api/v1/employees/{id}` (detail)
3. POST `/api/v1/attendance/clock-in`
4. GET `/api/v1/attendance` (list with filters)
5. PUT `/api/v1/vacations/{id}/approve`

### Expected Results
**Response Time SLAs:**
- Read operations (GET list): < 500ms
- Read operations (GET detail): < 200ms
- Write operations (POST/PUT): < 1 second
- Complex queries (reports): < 3 seconds

**Throughput:**
- 100 requests/second sustainable
- No performance degradation over time
- CPU: < 60% average
- Memory: stable, no leaks

---

## Test Case PERF-007: Database Query Optimization Verification

**Priority:** Medium
**Type:** Performance
**Module:** Database

### Description
Verify that database queries are optimized with proper indexing.

### Preconditions
- Database fully loaded with production-like data
- Database profiling tools enabled

### Test Steps
1. Enable query logging
2. Execute common queries:
   - Employee list by branch
   - Attendance by date range
   - Vacation balance calculation
3. Analyze execution plans
4. Check for missing indexes

### Expected Results
- All queries use indexes (no full table scans)
- Query execution plans optimized:
  - Index Seek (not Index Scan)
  - Minimal rows examined
  - Efficient JOINs
- Critical indexes present:
  - Employees: Code, BranchId, DepartmentId, IsActive
  - Attendance: EmployeeId, Date, Status
  - Vacations: EmployeeId, StartDate, EndDate, Status
- Foreign keys indexed
- Composite indexes for common filter combinations

---

## Test Case PERF-008: Frontend Page Load Performance

**Priority:** Medium
**Type:** Performance - Frontend
**Module:** Portal

### Description
Verify that frontend pages load quickly and meet performance budgets.

### Preconditions
- Frontend built for production (ng build --configuration=production)
- Browser: Chrome

### Test Steps
1. Measure page load times for key routes:
   - `/portal/dashboard`
   - `/portal/attendance`
   - `/portal/excuse-requests`
2. Use Lighthouse audit
3. Check bundle sizes

### Expected Results
**Page Load Times:**
- First Contentful Paint (FCP): < 1.5 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Time to Interactive (TTI): < 3.5 seconds

**Lighthouse Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90

**Bundle Sizes:**
- Main bundle: < 500 KB (gzipped)
- Lazy-loaded routes: < 100 KB each
- Total initial load: < 1 MB

**Optimizations:**
- Code splitting (lazy loading)
- Tree shaking
- Minification
- Compression (gzip/brotli)

---

## Test Case PERF-009: Memory Leak Detection

**Priority:** Medium
**Type:** Performance - Stability
**Module:** Backend

### Description
Verify that application does not have memory leaks during extended operation.

### Preconditions
- Application running
- Monitoring tools enabled

### Test Steps
1. Record initial memory usage
2. Run continuous load test for 4 hours:
   - Mix of read/write operations
   - Typical user workflows
3. Monitor memory usage every 15 minutes
4. Check for memory growth

### Expected Results
- Memory usage stabilizes after initial warmup
- No continuous memory growth
- Garbage collection working properly
- After 4 hours:
  - Memory increase: < 20% from baseline
  - No OutOfMemory errors
  - Application remains responsive
- Proper resource disposal:
  - Database connections closed
  - HTTP clients disposed
  - Event handlers unregistered

---

## Test Case PERF-010: Scalability Test - Increasing Load

**Priority:** Medium
**Type:** Performance - Scalability
**Module:** System

### Description
Verify that system scales gracefully with increasing load.

### Preconditions
- Load testing tool configured
- Monitoring in place

### Test Steps
1. Start with 10 concurrent users
2. Increase load every 5 minutes:
   - 10 → 50 → 100 → 200 → 500 users
3. Monitor response times at each level
4. Identify breaking point

### Expected Results
**Performance at each level:**
- 10 users: < 200ms average response
- 50 users: < 500ms average response
- 100 users: < 1 second average response
- 200 users: < 2 seconds average response
- 500 users: Graceful degradation (not crash)

**Scalability characteristics:**
- Linear scalability up to 200 users
- System remains stable
- Error rate: < 1%
- Resource utilization:
  - CPU: < 80% at 200 users
  - Memory: < 4 GB
  - Database connections: properly pooled
- Bottleneck identification for future optimization

---

## Test Execution Notes

### Test Data Requirements
- Large datasets: 1000+ employees, 10,000+ attendance records
- Historical data spanning multiple months
- Various entity types and statuses

### Testing Tools
- Load testing: JMeter, k6, Artillery
- Database profiling: pgAdmin, SQL profiler
- Frontend: Lighthouse, WebPageTest
- Monitoring: Application Insights, Prometheus

### Environment Setup
- Dedicated performance testing environment
- Production-like hardware specifications
- Database tuning applied
- Caching configured

### Performance Baselines
Document baseline metrics for comparison:
- Average response time
- Throughput (requests/second)
- Resource utilization
- Database query times

---

## Traceability Matrix

| Test Case | Requirement | Priority | Status |
|-----------|-------------|----------|--------|
| PERF-001 | Bulk Generation | High | ⬜ Not Run |
| PERF-002 | Pagination | High | ⬜ Not Run |
| PERF-003 | Report Generation | Medium | ⬜ Not Run |
| PERF-004 | Concurrent Access | High | ⬜ Not Run |
| PERF-005 | Conflict Detection | Medium | ⬜ Not Run |
| PERF-006 | API Response Time | High | ⬜ Not Run |
| PERF-007 | Query Optimization | Medium | ⬜ Not Run |
| PERF-008 | Frontend Load | Medium | ⬜ Not Run |
| PERF-009 | Memory Leaks | Medium | ⬜ Not Run |
| PERF-010 | Scalability | Medium | ⬜ Not Run |
