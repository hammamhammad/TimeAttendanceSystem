# 12 - Notifications & Real-Time Communication

## 12.1 Overview

The notification system provides multi-channel communication including real-time in-app notifications via SignalR WebSocket, push notifications via Firebase Cloud Messaging for mobile devices, and admin broadcast notifications. All notifications are bilingual (English/Arabic).

## 12.2 Features

| Feature | Description |
|---------|-------------|
| Real-Time Delivery | SignalR WebSocket for instant notifications |
| Push Notifications | Firebase Cloud Messaging for mobile |
| Bilingual Content | Title and message in English and Arabic |
| Read Tracking | Mark individual or all notifications as read |
| Action URLs | Click to navigate directly to related entity |
| User Targeting | Send to specific users or user groups |
| Broadcast System | Admin-wide announcements |
| Notification Types | 8+ event types for different scenarios |
| Unread Count Badge | Real-time unread count in navigation |

## 12.3 Entities

| Entity | Key Fields |
|--------|------------|
| Notification | UserId, Title, TitleAr, Message, MessageAr, Type, ActionUrl, IsRead, CreatedAt |
| NotificationBroadcast | Title, TitleAr, Message, MessageAr, TargetBranch, TargetDepartment, CreatedBy |
| PushNotificationToken | UserId, DeviceToken, Platform, DeviceId |

## 12.4 Notification Types

| Type | Trigger | Recipients |
|------|---------|------------|
| RequestSubmitted | New request created | Submitting employee |
| RequestApproved | Request approved | Submitting employee |
| RequestRejected | Request rejected | Submitting employee |
| RequestDelegated | Approval delegated | New delegatee |
| RequestEscalated | Timeout escalation | Escalation target |
| ApprovalPending | New request needs approval | Assigned approver |
| DelegationReceived | Delegation assigned to user | Delegatee |
| ApprovalReminder | Pending approval reminder | Assigned approver |

## 12.5 SignalR Real-Time Notification Flow

```mermaid
graph TD
    A((Client Application Loads)) --> B[Establish SignalR Connection]
    B --> C[Connect to /hubs/notifications]
    C --> D[Send JWT Token for Authentication]
    
    D --> E{Authentication Valid?}
    E -->|No| F[Connection Rejected]
    E -->|Yes| G[Connection Established]
    
    G --> H[Server: OnConnectedAsync]
    H --> I[Add User to Personal Group: user-{userId}]
    I --> J[Add User to Role Groups]
    J --> K[Connection Ready]
    
    K --> L((Listening for Events))
    
    subgraph "Server-Side Event"
        M[Business Event Occurs]
        M --> N[InAppNotificationService.SendAsync]
        N --> O[Create Notification Record in DB]
        O --> P[Determine Target Users]
        P --> Q[Hub.Clients.Group user-{id}.SendAsync]
    end
    
    Q --> R[Client Receives Event]
    R --> S[Display Toast Notification]
    S --> T[Update Notification Bell Badge]
    T --> U[Play Sound if Enabled]
    
    U --> L
    
    subgraph "Client Disconnection"
        V[User Navigates Away / Tab Closes]
        V --> W[Server: OnDisconnectedAsync]
        W --> X[Remove from All Groups]
    end
```

## 12.6 Push Notification Flow (Mobile)

```mermaid
graph TD
    A((Mobile App Starts)) --> B[Initialize Firebase Messaging]
    B --> C[Request Notification Permission]
    
    C --> D{Permission Granted?}
    D -->|No| E[Notifications Disabled]
    
    D -->|Yes| F[Get FCM Device Token]
    F --> G[POST /api/v1/push-tokens/register]
    G --> H[Store: UserId + DeviceToken + Platform]
    
    H --> I((Push Notifications Active))
    
    subgraph "Sending Push Notification"
        J[Business Event Occurs on Server]
        J --> K[InAppNotificationService Creates Notification]
        K --> L[Get User's Push Tokens]
        L --> M[For Each Token]
        M --> N[Send via Firebase Cloud Messaging]
        N --> O{Delivery Status}
        O -->|Success| P[Push Delivered to Device]
        O -->|Token Invalid| Q[Remove Invalid Token]
    end
    
    P --> R[Device Shows Push Notification]
    R --> S{User Taps Notification?}
    S -->|Yes| T[Open App to Relevant Screen]
    S -->|No| U[Notification in System Tray]
```

## 12.7 Admin Broadcast Notification Flow

```mermaid
graph TD
    A((Admin Creates Broadcast)) --> B[Enter Broadcast Details]
    B --> B1[Title EN + AR]
    B1 --> B2[Message EN + AR]
    
    B2 --> C[Select Target Audience]
    C --> C1[All Users]
    C --> C2[Specific Branch]
    C --> C3[Specific Department]
    C --> C4[Specific Roles]
    
    C1 --> D[POST /api/v1/notification-broadcasts]
    C2 --> D
    C3 --> D
    C4 --> D
    
    D --> E[Create NotificationBroadcast Record]
    E --> F[Determine All Target Users]
    F --> G[For Each Target User]
    G --> H[Create Individual Notification]
    H --> I[Send via SignalR if Online]
    I --> J[Queue Push Notification if Mobile]
    
    J --> K((Broadcast Sent))
```

## 12.8 Notification Management Flow

```mermaid
graph TD
    A((User Opens Notification Panel)) --> B[GET /api/v1/notifications?unreadOnly=false]
    B --> C[Display Notification List]
    C --> D[Show Unread Count Badge]
    
    D --> E{User Action}
    
    E -->|Click Notification| F[Navigate to ActionUrl]
    F --> G[POST /api/v1/notifications/{id}/mark-read]
    G --> H[Update IsRead = true]
    H --> I[Decrement Unread Count]
    
    E -->|Mark All Read| J[POST /api/v1/notifications/mark-all-read]
    J --> K[Update All IsRead = true]
    K --> L[Reset Unread Count to 0]
    
    E -->|Delete Notification| M[DELETE /api/v1/notifications/{id}]
    M --> N[Remove from List]
    
    E -->|Filter| O[Toggle: All / Unread Only]
    O --> P[Re-fetch with Filter]
    
    I --> Q((Action Complete))
    L --> Q
    N --> Q
    P --> Q
```

## 12.9 Notification Template Examples

```
Vacation Request Submitted:
--------------------------
EN: "Your vacation request for Apr 10-12 has been submitted for approval"
AR: "تم تقديم طلب إجازتك للفترة من 10-12 أبريل للموافقة"
Action: /vacation-requests/{id}

Vacation Approved:
-----------------
EN: "Your vacation request for Apr 10-12 has been approved by Ahmed Al-Rashid"
AR: "تمت الموافقة على طلب إجازتك للفترة من 10-12 أبريل بواسطة أحمد الراشد"
Action: /vacation-requests/{id}

Approval Pending:
----------------
EN: "New vacation request from Sara Fahad requires your approval"
AR: "طلب إجازة جديد من سارة فهد يتطلب موافقتك"
Action: /pending-approvals/{id}

Approval Reminder:
-----------------
EN: "Reminder: You have 3 pending approvals waiting for your action"
AR: "تذكير: لديك 3 طلبات معلقة في انتظار إجراءك"
Action: /pending-approvals
```
