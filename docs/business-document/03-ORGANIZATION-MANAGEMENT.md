# 03 - Organization Management

## 3.1 Overview

The organization management module provides the foundational structure for the entire system. It manages branches (offices/locations), departments (organizational units), and employees (workforce). All other modules depend on this structure for data scoping, reporting, and access control.

## 3.2 Features

| Feature | Description |
|---------|-------------|
| Multi-Branch Support | Multiple office locations with independent configurations |
| GPS Geofencing | Branch coordinates and radius for mobile attendance verification |
| Hierarchical Departments | Parent-child department structure within branches |
| Complete Employee Records | Personal info, job details, contact info, emergency contacts |
| Employee-User Linking | Map employees to system user accounts |
| Bilingual Names | All entities support English and Arabic names |

## 3.3 Entities

| Entity | Key Fields |
|--------|------------|
| Branch | Name, NameAr, Address, City, Latitude, Longitude, GeofenceRadiusMeters, IsActive |
| Department | Name, NameAr, BranchId, ParentDepartmentId, ManagerId, IsActive |
| Employee | FirstName, LastName, EmployeeNumber, Email, Phone, BranchId, DepartmentId, ManagerId, HireDate, JobTitle, IsActive |
| EmployeeUserLink | EmployeeId, UserId (links employee record to login account) |

## 3.4 Branch Management Flow

```mermaid
graph TD
    A((Admin Creates Branch)) --> B[Enter Branch Details]
    B --> C[Name English + Arabic]
    C --> D[Address, City, Country]
    D --> E[GPS Coordinates: Latitude, Longitude]
    E --> F[Geofence Radius in Meters]
    F --> G[Set Active Status]
    G --> H[POST /api/v1/branches]
    H --> I[Branch Created]
    
    I --> J[Configure Branch Settings]
    J --> K[Assign Shifts to Branch]
    J --> L[Create Departments under Branch]
    J --> M[Configure Overtime Rules]
    J --> N[Set Public Holidays]
    J --> O[Configure Remote Work Policy]
    J --> P[Register NFC Tags for Branch]
    
    K --> Q((Branch Operational))
    L --> Q
    M --> Q
    N --> Q
    O --> Q
    P --> Q
```

## 3.5 Department Hierarchy Flow

```mermaid
graph TD
    A((Create Department)) --> B[Select Branch]
    B --> C[Enter Department Name EN/AR]
    C --> D{Has Parent Department?}
    
    D -->|Yes| E[Select Parent Department]
    D -->|No| F[Top-Level Department]
    
    E --> G[Set Department Manager]
    F --> G
    
    G --> H[POST /api/v1/departments]
    H --> I[Department Created]
    
    I --> J[Assign Employees]
    I --> K[Create Sub-Departments]
    
    subgraph "Example Hierarchy"
        L[Headquarters Branch]
        L --> M[Human Resources]
        L --> N[Information Technology]
        L --> O[Finance]
        L --> P[Operations]
        N --> Q[Software Development]
        N --> R[Infrastructure]
        N --> S[QA & Testing]
    end
```

## 3.6 Employee Creation Flow

```mermaid
graph TD
    A((HR Creates Employee)) --> B[Enter Personal Information]
    B --> B1[First Name EN/AR, Last Name EN/AR]
    B1 --> B2[Employee Number Auto/Manual]
    B2 --> B3[National ID, Date of Birth, Gender]
    B3 --> B4[Nationality, Marital Status]
    
    B4 --> C[Enter Contact Information]
    C --> C1[Email, Phone, Address]
    
    C1 --> D[Enter Job Details]
    D --> D1[Select Branch]
    D1 --> D2[Select Department]
    D2 --> D3[Job Title, Job Grade]
    D3 --> D4[Hire Date, Employment Type]
    D4 --> D5[Select Manager/Supervisor]
    
    D5 --> E[Upload Photo]
    
    E --> F[POST /api/v1/employees]
    F --> G[Employee Record Created]
    
    G --> H{Create User Account?}
    H -->|Yes| I[Create User Account]
    I --> J[Assign Role]
    J --> K[Assign Branch Scope]
    K --> L[Link Employee to User]
    L --> M[Employee Can Login]
    
    H -->|No| N[Employee Record Only]
    
    M --> O{Assign Shift?}
    N --> O
    O -->|Yes| P[Create Shift Assignment]
    O -->|No| Q[Uses Default Branch Shift]
    
    P --> R((Employee Active))
    Q --> R
```

## 3.7 Employee Sub-Entity Management

```mermaid
graph TD
    A((Employee Record)) --> B{Manage Sub-Entities}
    
    B --> C[Addresses]
    C --> C1[Home Address, Mailing Address]
    
    B --> D[Bank Details]
    D --> D1[Bank Name, IBAN, Account Number]
    
    B --> E[Dependents]
    E --> E1[Name, Relationship, DOB, ID Number]
    
    B --> F[Education]
    F --> F1[Degree, Institution, Year, Major]
    
    B --> G[Work Experience]
    G --> G1[Company, Title, Duration, Responsibilities]
    
    B --> H[Emergency Contacts]
    H --> H1[Name, Phone, Relationship]
    
    B --> I[Visa Information]
    I --> I1[Visa Type, Number, Expiry Date]
    
    B --> J[Documents]
    J --> J1[Upload PDF, DOC, Images]
    
    B --> K[Contracts]
    K --> K1[Contract Type, Start/End Date, Terms]
```

## 3.8 Employee Search & Filter Flow

```mermaid
graph TD
    A((Employee List Page)) --> B[Load Default View]
    B --> C{Apply Filters?}
    
    C -->|Yes| D[Filter Options]
    D --> D1[By Branch]
    D --> D2[By Department]
    D --> D3[By Status Active/Inactive]
    D --> D4[By Job Title]
    D --> D5[By Manager]
    D --> D6[By Search Text Name/Number/Email]
    
    D1 --> E[Apply Filters + Pagination]
    D2 --> E
    D3 --> E
    D4 --> E
    D5 --> E
    D6 --> E
    
    C -->|No| E
    
    E --> F[GET /api/v1/employees?filters]
    F --> G[Display Paginated Results]
    
    G --> H{User Action}
    H -->|View| I[Navigate to Employee Detail Page]
    H -->|Edit| J[Navigate to Employee Edit Form]
    H -->|Delete| K[Confirm Deletion Dialog]
    K --> L{Confirmed?}
    L -->|Yes| M[Soft Delete Employee]
    L -->|No| G
```

## 3.9 Data Scoping by Branch

```
All API Requests for Branch-Scoped Data:

1. User authenticates --> JWT contains UserId
2. System looks up UserBranchScope for UserId
3. Query filters applied:

   Example: GET /api/v1/employees
   
   - SystemAdmin --> Sees ALL employees across ALL branches
   - Branch Manager (Branch: HQ) --> Sees only HQ employees
   - Department Head (Branch: HQ, Dept: IT) --> Sees only HQ IT employees
   
   SQL equivalent:
   WHERE BranchId IN (user's branch scopes)
   AND (DepartmentId = user's department OR user has full branch access)
```

## 3.10 Organization Statistics Dashboard

```
+------------------------------------------+
|         Organization Overview             |
+------------------------------------------+
| Total Branches: 5                         |
| Total Departments: 20                     |
| Total Employees: 50                       |
| Active Employees: 48                      |
| New Hires (This Month): 3                |
| Departures (This Month): 1               |
+------------------------------------------+
|                                           |
| Branch Distribution:                      |
| - Riyadh HQ: 15 employees               |
| - Jeddah: 12 employees                   |
| - Dammam: 10 employees                   |
| - Madinah: 8 employees                   |
| - Makkah: 5 employees                    |
+------------------------------------------+
```
