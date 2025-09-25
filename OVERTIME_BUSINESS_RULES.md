# Overtime Configuration Business Rules

## Overview
This document outlines the business rules and field descriptions for the overtime configuration system in the Time Attendance System. These rules define how overtime calculations are performed and what each configuration parameter controls.

## Configuration Fields and Business Rules

### 1. Overtime Types

#### Enable Pre-Shift Overtime
- **Description**: Allow overtime calculation for hours worked before the scheduled shift start time
- **Business Rule**: When enabled, any time worked before the official shift start time will be calculated as overtime using the appropriate rate multiplier
- **Default**: Disabled
- **Impact**: Affects payroll calculations for early arrivals

#### Enable Post-Shift Overtime
- **Description**: Allow overtime calculation for hours worked after the scheduled shift end time
- **Business Rule**: When enabled, any time worked after the official shift end time will be calculated as overtime using the appropriate rate multiplier
- **Default**: Enabled
- **Impact**: Affects payroll calculations for late departures

### 2. Overtime Rate Multipliers

#### Normal Day Rate
- **Description**: Multiplier applied to base hourly rate for overtime worked on regular working days (e.g., 1.5 means 150% of normal rate)
- **Business Rule**: Standard overtime rate for regular business days
- **Valid Range**: 1.0 - 5.0
- **Typical Value**: 1.5 (150%)
- **Required**: Yes

#### Public Holiday Rate
- **Description**: Multiplier applied to base hourly rate for overtime worked on public holidays (usually higher than normal day rate)
- **Business Rule**: Premium overtime rate for designated public holidays
- **Valid Range**: 1.0 - 5.0
- **Typical Value**: 2.0 - 3.0 (200% - 300%)
- **Required**: Yes

#### Off-Day Rate
- **Description**: Multiplier applied to base hourly rate for overtime worked on weekends and designated off days
- **Business Rule**: Special overtime rate for non-working days (weekends, company-designated off days)
- **Valid Range**: 1.0 - 5.0
- **Typical Value**: 1.75 - 2.0 (175% - 200%)
- **Required**: Yes

### 3. Overtime Limits

#### Maximum Pre-Shift Hours
- **Description**: Maximum number of overtime hours allowed before the scheduled shift start (leave empty for unlimited)
- **Business Rule**: Caps the amount of pre-shift overtime that can be claimed per day
- **Valid Range**: 0.5 - 8.0 hours
- **Default**: Unlimited (empty)
- **Impact**: Prevents excessive early overtime claims

#### Maximum Post-Shift Hours
- **Description**: Maximum number of overtime hours allowed after the scheduled shift end (leave empty for unlimited)
- **Business Rule**: Caps the amount of post-shift overtime that can be claimed per day
- **Valid Range**: 0.5 - 12.0 hours
- **Default**: Unlimited (empty)
- **Impact**: Prevents excessive late overtime claims

### 4. Calculation Settings

#### Minimum Overtime Minutes
- **Description**: Minimum number of minutes required for overtime to be counted (time less than this won't count as overtime)
- **Business Rule**: Filters out minor overtime periods to avoid micro-overtime claims
- **Valid Range**: 0 - 60 minutes
- **Typical Value**: 15-30 minutes
- **Impact**: Reduces administrative overhead for small overtime periods

#### Grace Period Minutes
- **Description**: Grace period minutes before counting lateness or overtime (free period that doesn't count)
- **Business Rule**: Allows for minor timing variations without penalty or overtime credit
- **Valid Range**: 0 - 30 minutes
- **Typical Value**: 5-15 minutes
- **Impact**: Provides flexibility for punch-in/out timing

#### Rounding Interval Minutes
- **Description**: Rounding interval for overtime calculation (e.g., 15 minutes means round to nearest 15 minutes)
- **Business Rule**: Standardizes overtime calculations to specific time intervals
- **Valid Options**: 1, 5, 10, 15, 30 minutes
- **Typical Value**: 15 minutes
- **Impact**: Simplifies payroll processing and time tracking

### 5. Advanced Calculation Options

#### Consider Flexible Time
- **Description**: Include flexible work hours in overtime calculations (may affect total overtime hours)
- **Business Rule**: When enabled, flexible time adjustments are factored into overtime calculations
- **Default**: Disabled
- **Impact**: Can reduce or increase overtime based on flexible time usage

#### Weekend as Off-Day
- **Description**: Treat weekends as off-days for applying the off-day overtime rate
- **Business Rule**: Automatically applies off-day rates to Saturday and Sunday work
- **Default**: Enabled
- **Impact**: Ensures weekend work receives premium pay rates

#### Require Approval
- **Description**: Require supervisor or manager approval before counting overtime
- **Business Rule**: Overtime is only calculated after explicit approval is given
- **Default**: Disabled
- **Impact**: Provides management control over overtime authorization

### 6. Policy Period

#### Effective From Date
- **Description**: Date when this overtime policy becomes active and starts being used for calculations
- **Business Rule**: Policy applies to all attendance records from this date forward
- **Required**: Yes
- **Impact**: Determines when policy takes effect

#### Effective To Date
- **Description**: Date when this overtime policy expires (leave empty for permanent policy)
- **Business Rule**: Policy automatically expires on this date if specified
- **Default**: Permanent (empty)
- **Impact**: Allows for temporary or seasonal overtime policies

#### Policy Notes
- **Description**: Additional notes or instructions about this overtime policy to clarify any special requirements
- **Business Rule**: Provides context and special instructions for policy application
- **Usage**: Documentation, special conditions, exceptions

## System Rules and Constraints

### 1. Active Policy Rules
- Only one overtime policy can be active at any given time
- New policy activation automatically deactivates the current active policy
- Overlapping effective periods are not allowed for active policies

### 2. Calculation Precedence
1. Grace period is applied first
2. Minimum overtime threshold is checked
3. Overtime limits are enforced
4. Rate multipliers are applied based on day type
5. Rounding is applied last

### 3. Day Type Determination
- **Public Holiday**: Based on system holiday calendar
- **Off-Day**: Weekends (if weekend-as-off-day enabled) or employee-specific off days
- **Normal Day**: All other working days

### 4. Approval Workflow
- If approval is required, overtime hours are calculated but marked as "pending"
- Approved overtime is included in payroll calculations
- Rejected overtime is excluded from payroll but remains in audit trail

## Implementation Notes

### Database Design
- Each policy is versioned with effective date ranges
- Historical policies are preserved for audit and reporting
- Employee-specific overrides can be implemented at the assignment level

### Performance Considerations
- Overtime calculations are performed during attendance processing
- Bulk recalculation procedures are available for policy changes
- Real-time validation prevents conflicting policy configurations

### Compliance and Auditing
- All policy changes are logged with user and timestamp
- Overtime calculations include policy version references
- Detailed audit trails are maintained for compliance reporting

## Common Use Cases

### Standard Corporate Policy
- Normal Day Rate: 1.5x
- Holiday Rate: 2.0x
- Off-Day Rate: 1.75x
- Minimum: 30 minutes
- Grace Period: 15 minutes
- Rounding: 15 minutes

### Manufacturing Shift Policy
- Pre/Post Shift: Enabled
- Maximum Limits: 4 hours pre, 8 hours post
- Approval Required: Yes
- Flexible Time: Disabled

### Service Industry Policy
- Weekend as Off-Day: Enabled
- Holiday Rate: 2.5x
- Off-Day Rate: 2.0x
- Grace Period: 5 minutes
- Minimum: 15 minutes

## Validation Rules

### Field Validation
- All rate multipliers must be ≥ 1.0
- Effective from date cannot be in the past (for new policies)
- Effective to date must be after effective from date
- Maximum hour limits must be reasonable (≤ 24 hours)

### Business Logic Validation
- No overlapping active policies allowed
- Holiday rates should typically be higher than normal rates
- Off-day rates should typically be higher than normal rates
- Minimum overtime should be reasonable for business operations

---

*This document serves as the authoritative reference for overtime configuration business rules and should be updated whenever policy logic changes.*