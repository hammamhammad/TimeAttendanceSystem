# 28 - Document Management

## 28.1 Overview

The document management module provides centralized file storage, employee document management, letter generation from templates, company policy distribution with acknowledgment tracking, and entity-linked file attachments across the entire system.

## 28.2 Features

| Feature | Description |
|---------|-------------|
| File Upload & Storage | Centralized file storage with 10MB limit |
| Entity Attachments | Link files to any entity (employee, contract, application, etc.) |
| Employee Documents | Manage employee-specific documents with categories |
| Letter Templates | Reusable templates for experience letters, salary certificates, etc. |
| Letter Requests | Employees request official letters through self-service |
| Company Policies | Distribute policies and track acknowledgments |
| Document Categories | Organize documents by type |
| Document Expiry Alerts | Background alerts for expiring documents |

## 28.3 Entities

| Entity | Key Fields |
|--------|------------|
| FileAttachment | EntityType, EntityId, FileName, StoredFileName, ContentType, FileSize, UploadedBy |
| EmployeeDocument | EmployeeId, CategoryId, DocumentName, FilePath, ExpiryDate, Status |
| DocumentCategory | Name, Description |
| LetterTemplate | Name, Type, TemplateContent, Placeholders[] |
| LetterRequest | EmployeeId, TemplateId, Purpose, Status, GeneratedFilePath |
| CompanyPolicy | Title, Description, Version, FilePath, EffectiveDate, IsActive |
| PolicyAcknowledgment | PolicyId, EmployeeId, AcknowledgedAt |

## 28.4 File Upload Flow

```mermaid
graph TD
    A((User Uploads File)) --> B[Select File from Device]
    B --> C{Validation}
    
    C --> D{File Size <= 10MB?}
    D -->|No| E[Error: File Too Large]
    
    D -->|Yes| F{Supported Type?}
    F -->|No| G[Error: Unsupported File Type]
    
    F -->|Yes| H[POST /api/v1/files/upload]
    H --> I[Multipart Form Data]
    I --> J[Generate Unique Stored File Name]
    J --> K[Save to uploads/ Directory]
    K --> L[Create FileAttachment Record]
    L --> M[Link to Entity: EntityType + EntityId]
    
    M --> N[Return File Reference]
    N --> O((Upload Complete))
    
    subgraph "Supported File Types"
        P[PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX]
    end
    
    subgraph "Download"
        Q[GET /api/v1/files/storedFileName]
        Q --> R[Serve File from Storage]
    end
```

## 28.5 Employee Document Management Flow

```mermaid
graph TD
    A((HR Manages Employee Documents)) --> B[Select Employee]
    B --> C[View Document List]
    
    C --> D{Action}
    
    D -->|Upload| E[Select Category]
    E --> F[ID Documents / Certificates / Contracts / Visas / Other]
    F --> G[Upload File]
    G --> H[Set Expiry Date if Applicable]
    H --> I[POST /api/v1/employee-documents]
    
    D -->|View| J[Download/Preview Document]
    
    D -->|Delete| K[Confirm Deletion]
    K --> L[Soft Delete Document]
    
    I --> M((Document Managed))
    J --> M
    L --> M
    
    subgraph "Expiry Alert - DocumentExpiryAlertJob"
        N[Daily Check]
        N --> O[Find Documents Expiring in 30 Days]
        O --> P[Alert HR: Document Renewal Needed]
        P --> Q[Alert Employee: Document Expiring]
    end
```

## 28.6 Letter Request Flow

```mermaid
graph TD
    A((Employee Requests Letter)) --> B[Select Letter Type]
    B --> C{Available Types}
    C --> C1[Experience Certificate]
    C --> C2[Salary Certificate]
    C --> C3[Employment Verification]
    C --> C4[No Objection Certificate NOC]
    C --> C5[Bank Introduction Letter]
    
    C1 --> D[Enter Purpose/Addressed To]
    C2 --> D
    C3 --> D
    C4 --> D
    C5 --> D
    
    D --> E[POST /api/v1/letter-requests]
    E --> F[Status: Pending]
    
    F --> G[HR Reviews Request]
    G --> H{Approved?}
    
    H -->|Yes| I[System Generates Letter]
    I --> J[Fill Template with Employee Data]
    J --> K[Placeholders Replaced:]
    K --> K1[employee_name, employee_number]
    K --> K2[job_title, department, branch]
    K --> K3[hire_date, salary if applicable]
    K --> K4[current_date, company_name]
    
    K1 --> L[Generate PDF]
    L --> M[Status: Ready]
    M --> N[Notify Employee: Letter Ready]
    N --> O[Employee Downloads Letter]
    
    H -->|No| P[Status: Rejected]
    P --> Q[Notify Employee with Reason]
    
    O --> R((Letter Delivered))
    Q --> R
```

## 28.7 Company Policy Distribution Flow

```mermaid
graph TD
    A((HR Publishes Policy)) --> B[Create/Update Company Policy]
    B --> C[Enter Policy Details]
    C --> C1[Title: Remote Work Policy v2.0]
    C1 --> C2[Description]
    C2 --> C3[Upload Policy Document]
    C3 --> C4[Set Effective Date]
    C4 --> C5[Version Number]
    
    C5 --> D[POST /api/v1/company-policies]
    D --> E[Policy Published]
    
    E --> F[Notify All Employees]
    F --> G[Employees Must Acknowledge]
    
    G --> H[Employee Opens Policy]
    H --> I[Reviews Policy Document]
    I --> J[Clicks Acknowledge]
    J --> K[POST /api/v1/policy-acknowledgments]
    K --> L[Record Acknowledgment with Timestamp]
    
    L --> M{All Employees Acknowledged?}
    M -->|No| N[Track Pending Acknowledgments]
    N --> O[Send Reminders]
    O --> G
    
    M -->|Yes| P[100% Compliance Achieved]
    
    P --> Q((Policy Distribution Complete))
```

## 28.8 Announcement System Flow

```mermaid
graph TD
    A((Admin Creates Announcement)) --> B[Enter Announcement Details]
    B --> C[Title EN + AR]
    C --> D[Content/Body]
    D --> E[Select Category]
    E --> F[Set Priority: Normal/Important/Urgent]
    F --> G[Attach Files if Any]
    
    G --> H[Set Target Audience]
    H --> H1[All Employees]
    H --> H2[Specific Branch]
    H --> H3[Specific Department]
    
    H1 --> I{Scheduling}
    H2 --> I
    H3 --> I
    
    I -->|Publish Now| J[Status: Published]
    I -->|Schedule| K[Set Publish Date/Time]
    K --> L[Status: Scheduled]
    L --> M[AnnouncementSchedulerJob]
    M --> N{Publish Time Reached?}
    N -->|Yes| J
    
    J --> O[Notify Target Employees]
    O --> P[Employees View Announcement]
    P --> Q[Track Views/Acknowledgments]
    
    Q --> R{Has Expiry Date?}
    R -->|Yes| S[AnnouncementExpiryJob]
    S --> T[Auto-Archive After Expiry]
    R -->|No| U[Stays Published]
    
    T --> V((Announcement Lifecycle Complete))
    U --> V
```

## 28.9 File Integration Points

| Module | File Usage |
|--------|------------|
| Employees | Profile photo upload |
| Contracts | Contract document attachment |
| Salary Adjustments | Supporting documentation |
| Candidates | Resume/CV upload |
| Applications | Cover letter attachment |
| Offer Letters | Offer document PDF |
| Onboarding | Onboarding documents |
| Allowance Requests | Supporting documents |
| Expense Claims | Receipt attachments |
| Grievances | Evidence attachments |
| Investigations | Case documents |
| Disciplinary Actions | Supporting documentation |
| Certifications | Certificate files |
| Company Policies | Policy documents |
| Announcements | Announcement attachments |
