# Employee Self-Service Portal - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

## Prerequisites
- .NET 9.0 SDK installed
- PostgreSQL 14+ running  
- Node.js 18+ and npm installed

## Step 1: Start Backend (2 min)
```bash
cd "D:\Work\AI Code\TimeAttendanceSystem\src\Api\TimeAttendanceSystem.Api"
dotnet run
```
Backend: **http://localhost:5099**
Swagger: **http://localhost:5099/swagger**

## Step 2: Start Frontend (2 min)
```bash
cd "D:\Work\AI Code\TimeAttendanceSystem\time-attendance-frontend"
npm install  # First time only
ng serve
```
Frontend: **http://localhost:4200**

## Step 3: Access Portal (1 min)
Navigate to: **http://localhost:4200/portal/employee-dashboard**

## Available Features
1. **Dashboard** - Stats, activity, quick actions
2. **My Attendance** - History with filtering
3. **My Profile** - View/edit information
4. **Fingerprint Requests** - Request and track
5. **Vacation Requests** - View and manage

## Test Routes
- http://localhost:4200/portal/employee-dashboard
- http://localhost:4200/portal/my-attendance
- http://localhost:4200/portal/my-profile
- http://localhost:4200/portal/fingerprint-requests
- http://localhost:4200/portal/vacation-requests

## Troubleshooting
Backend not starting? Check .NET version: `dotnet --version`
Frontend issues? Clear cache: `ng cache clean && npm install`
Port conflicts? Kill process or change port in launchSettings.json

## You're Ready! 🎉
