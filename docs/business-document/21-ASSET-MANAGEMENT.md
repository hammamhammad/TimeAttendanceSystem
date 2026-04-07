# 21 - Asset Management

## 21.1 Overview

The asset management module tracks company assets (laptops, phones, vehicles, furniture), manages asset assignments to employees, tracks maintenance records, and monitors warranty expirations.

## 21.2 Features

| Feature | Description |
|---------|-------------|
| Asset Inventory | Track all company assets with details |
| Asset Categories | Organize assets by type |
| Asset Assignment | Assign and track assets per employee |
| Maintenance Tracking | Schedule and record maintenance |
| Warranty Tracking | Monitor warranty expiration dates |
| Return Tracking | Track overdue asset returns |
| Lifecycle Management | Track asset from procurement to disposal |

## 21.3 Entities

| Entity | Key Fields |
|--------|------------|
| AssetCategory | Name, Description |
| Asset | Name, CategoryId, SerialNumber, PurchaseDate, PurchasePrice, WarrantyExpiry, Status, Condition |
| AssetAssignment | AssetId, EmployeeId, AssignedDate, ReturnDate, Status |
| AssetMaintenanceRecord | AssetId, MaintenanceDate, Description, Cost, NextMaintenanceDue |

## 21.4 Asset Lifecycle Flow

```mermaid
graph TD
    A((Asset Procured)) --> B[Register Asset]
    B --> C[Enter Details: Name, Serial, Category]
    C --> D[Status: Available]
    
    D --> E{Assign to Employee?}
    E -->|Yes| F[Create Assignment]
    F --> G[Status: Assigned]
    G --> H[Notify Employee: Asset Assigned]
    
    G --> I{Asset Events}
    I -->|Maintenance Due| J[Schedule Maintenance]
    J --> K[Record Maintenance]
    K --> L[Update Next Due Date]
    
    I -->|Employee Leaves| M[Asset Return Process]
    M --> N{Returned?}
    N -->|Yes| O[Inspect Condition]
    O --> P{Condition?}
    P -->|Good| Q[Status: Available]
    P -->|Damaged| R[Status: UnderMaintenance]
    P -->|Beyond Repair| S[Status: Disposed]
    
    N -->|No| T[OverdueAssetReturnAlertJob]
    T --> U[Alert HR & Manager]
    
    I -->|Warranty Expiring| V[AssetWarrantyExpiryAlertJob]
    V --> W[Alert: Warranty Expiring in 30 Days]
    
    I -->|Transfer| X[Reassign to New Employee]
    X --> G
    
    Q --> D
    R --> Y[Repair Asset]
    Y --> Q
    S --> Z((Asset Retired))
```

## 21.5 Asset Assignment & Return Flow

```mermaid
graph TD
    A((Assign Asset)) --> B[Select Asset from Available]
    B --> C[Select Employee]
    C --> D[Set Assignment Date]
    D --> E[Employee Acknowledges Receipt]
    E --> F[POST /api/v1/asset-assignments]
    F --> G[Assignment Active]
    
    G --> H((Employee Uses Asset))
    
    H --> I[Return Triggered]
    I --> J{Return Reason}
    J -->|Employee Exit| K[Part of Clearance]
    J -->|Upgrade| L[Return Old, Get New]
    J -->|No Longer Needed| M[Voluntary Return]
    
    K --> N[Set Return Date]
    L --> N
    M --> N
    
    N --> O[Inspect Asset Condition]
    O --> P[Note Any Damage]
    P --> Q[Complete Return]
    Q --> R[Asset Back to Available Pool]
    
    R --> S((Return Complete))
```
