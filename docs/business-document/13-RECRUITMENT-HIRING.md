# 13 - Recruitment & Hiring

## 13.1 Overview

The recruitment module manages the end-to-end hiring process from job requisition to offer letter acceptance. It tracks candidates through a structured pipeline, manages interviews with multi-rater feedback, and generates offer letters with approval workflows.

## 13.2 Features

| Feature | Description |
|---------|-------------|
| Job Requisitions | Create and approve hiring requests with budget and priority |
| Job Postings | Publish positions internally/externally |
| Candidate Management | Track candidate profiles, resumes, and skills |
| Application Pipeline | Move candidates through stages (Applied to Hired) |
| Interview Scheduling | Phone, video, in-person, panel, technical, HR interviews |
| Interview Feedback | Structured feedback with technical/communication/culture ratings |
| Offer Letters | Generate, approve, send, and track offers |
| Recruitment Dashboard | Pipeline analytics and time-to-hire metrics |

## 13.3 Entities

| Entity | Key Fields |
|--------|------------|
| JobRequisition | Title, DepartmentId, BranchId, Priority, BudgetMin, BudgetMax, TargetDate, Status, ApprovedBy |
| JobPosting | RequisitionId, Description, Requirements, Benefits, PostingType (Internal/External), Status |
| Candidate | FirstName, LastName, Email, Phone, ResumeUrl, Skills, Experience, SalaryExpectation |
| JobApplication | CandidateId, PostingId, Stage, Status, AppliedDate |
| InterviewSchedule | ApplicationId, InterviewType, ScheduledDate, Location, InterviewerIds |
| InterviewFeedback | InterviewId, InterviewerId, TechnicalRating, CommunicationRating, CultureFitRating, OverallRating, Comments |
| OfferLetter | ApplicationId, Salary, Benefits, StartDate, ExpiryDate, Status |

## 13.4 End-to-End Recruitment Flow

```mermaid
graph TD
    A((Hiring Need Identified)) --> B[Create Job Requisition]
    B --> C[Approval Workflow]
    C --> D{Approved?}
    D -->|No| E[Requisition Rejected]
    D -->|Yes| F[Create Job Posting]
    
    F --> G[Publish Posting]
    G --> G1[Internal: Employee Portal]
    G --> G2[External: Job Boards]
    
    G1 --> H[Candidates Apply]
    G2 --> H
    
    H --> I[Screen Applications]
    I --> J[Shortlist Candidates]
    J --> K[Schedule Interviews]
    K --> L[Conduct Interviews]
    L --> M[Collect Feedback]
    M --> N[Evaluate Candidates]
    
    N --> O{Select Candidate?}
    O -->|No| P[Continue Search]
    P --> H
    
    O -->|Yes| Q[Generate Offer Letter]
    Q --> R[Offer Approval Workflow]
    R --> S{Approved?}
    S -->|No| T[Revise Offer]
    T --> Q
    
    S -->|Yes| U[Send Offer to Candidate]
    U --> V{Candidate Response}
    V -->|Accept| W[Mark as Hired]
    W --> X[Initiate Onboarding]
    
    V -->|Reject| Y[Offer Declined]
    Y --> Z{Other Candidates?}
    Z -->|Yes| N
    Z -->|No| P
    
    V -->|Negotiate| AA[Revise Terms]
    AA --> Q
    
    X --> AB((Recruitment Complete))
```

## 13.5 Job Requisition Flow

```mermaid
graph TD
    A((Manager Creates Requisition)) --> B[Enter Job Details]
    B --> B1[Title, Description]
    B1 --> B2[Department, Branch]
    B2 --> B3[Number of Positions]
    B3 --> B4[Priority: Low/Medium/High/Urgent]
    B4 --> B5[Salary Range: Min - Max]
    B5 --> B6[Target Hire Date]
    B6 --> B7[Required Skills & Experience]
    
    B7 --> C[POST /api/v1/job-requisitions]
    C --> D[Status: Draft]
    
    D --> E[Submit for Approval]
    E --> F[Status: PendingApproval]
    F --> G[HR Reviews]
    
    G --> H{HR Decision}
    H -->|Approve| I[Status: Approved]
    I --> J[Budget Allocated]
    J --> K[Ready for Posting]
    
    H -->|Reject| L[Status: Rejected]
    L --> M[Notify Manager with Reason]
    
    H -->|Request Changes| N[Status: Draft]
    N --> O[Manager Revises]
    O --> E
    
    K --> P((Ready to Post))
```

## 13.6 Application Pipeline Stages

```mermaid
graph LR
    A[Applied] --> B[Screening]
    B --> C[Interview]
    C --> D[Assessment]
    D --> E[Offered]
    E --> F[Hired]
    
    B -.->|Rejected| G[Rejected]
    C -.->|Rejected| G
    D -.->|Rejected| G
    E -.->|Declined| H[Declined]
```

```
Stage Descriptions:
==================
1. Applied     - Candidate submitted application
2. Screening   - Resume review and initial qualification check
3. Interview   - One or more interview rounds scheduled
4. Assessment  - Technical tests, assignments, or evaluations
5. Offered     - Offer letter generated and sent
6. Hired       - Offer accepted, candidate to become employee
7. Rejected    - Candidate did not pass a stage
8. Declined    - Candidate declined the offer
```

## 13.7 Interview Scheduling & Feedback Flow

```mermaid
graph TD
    A((HR Schedules Interview)) --> B[Select Application]
    B --> C[Select Interview Type]
    C --> C1[Phone Screen]
    C --> C2[Video Interview]
    C --> C3[In-Person]
    C --> C4[Panel Interview]
    C --> C5[Technical Interview]
    C --> C6[HR Interview]
    
    C1 --> D[Set Date/Time]
    C2 --> D
    C3 --> D
    C4 --> D
    C5 --> D
    C6 --> D
    
    D --> E[Select Interviewers]
    E --> F[Set Location / Meeting Link]
    F --> G[POST /api/v1/interviews]
    G --> H[Notify Interviewers]
    H --> I[Notify Candidate]
    
    I --> J((Interview Scheduled))
    
    J --> K[Interview Conducted]
    K --> L[Each Interviewer Submits Feedback]
    
    L --> M[Rate: Technical Skills 1-5]
    M --> N[Rate: Communication 1-5]
    N --> O[Rate: Culture Fit 1-5]
    O --> P[Rate: Overall Impression 1-5]
    P --> Q[Add Written Comments]
    Q --> R[Recommendation: Hire / No Hire / Maybe]
    
    R --> S[POST /api/v1/interview-feedbacks]
    S --> T[All Feedback Collected]
    T --> U[HR Reviews Aggregate Scores]
    
    U --> V{Decision}
    V -->|Advance| W[Move to Next Stage]
    V -->|Reject| X[Reject Application]
    V -->|Another Round| Y[Schedule Another Interview]
    
    W --> Z((Candidate Advanced))
    X --> AA((Candidate Rejected))
    Y --> A
```

## 13.8 Offer Letter Flow

```mermaid
graph TD
    A((HR Generates Offer)) --> B[Select Candidate/Application]
    B --> C[Enter Offer Details]
    C --> C1[Position Title]
    C1 --> C2[Base Salary]
    C2 --> C3[Allowances & Benefits]
    C3 --> C4[Start Date]
    C4 --> C5[Offer Expiry Date]
    C5 --> C6[Terms & Conditions]
    
    C6 --> D[POST /api/v1/offers]
    D --> E[Offer Status: Draft]
    
    E --> F[Submit for Approval]
    F --> G[HR Manager Reviews]
    G --> H{Approved?}
    
    H -->|No| I[Revise Offer Terms]
    I --> C
    
    H -->|Yes| J[Finance Reviews]
    J --> K{Finance Approved?}
    
    K -->|No| I
    K -->|Yes| L[Offer Status: Approved]
    
    L --> M[Send Offer to Candidate]
    M --> N[Offer Status: Sent]
    N --> O[Candidate Reviews]
    
    O --> P{Candidate Response}
    P -->|Accept| Q[Offer Status: Accepted]
    Q --> R[Application Stage: Hired]
    R --> S[Create Employee Record]
    S --> T[Initiate Onboarding]
    
    P -->|Reject| U[Offer Status: Declined]
    P -->|Negotiate| V[Offer Status: Negotiating]
    V --> W[Revise and Re-send]
    W --> M
    P -->|No Response| X[Offer Status: Expired]
    
    T --> Y((Offer Process Complete))
```

## 13.9 Recruitment Dashboard Metrics

```
Recruitment Analytics:
=====================
+------------------------------------------+
| Open Requisitions: 12                     |
| Active Postings: 8                        |
| Total Applications: 156                   |
| Interviews This Week: 14                  |
| Offers Pending: 3                         |
| Hires This Month: 5                       |
+------------------------------------------+
| Pipeline Breakdown:                       |
| - Applied: 45                             |
| - Screening: 32                           |
| - Interview: 18                           |
| - Assessment: 8                           |
| - Offered: 5                              |
+------------------------------------------+
| Average Time-to-Hire: 28 days             |
| Offer Acceptance Rate: 78%               |
| Source Effectiveness:                     |
|   - Internal Referral: 35%               |
|   - Job Board: 40%                        |
|   - LinkedIn: 25%                         |
+------------------------------------------+
```
