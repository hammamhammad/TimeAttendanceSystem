# ESS Mobile App

A Flutter-based Employee Self-Service mobile application for the Time Attendance System.

## Features

- 📍 **GPS + NFC Verification** - Dual-verification attendance using geofencing and NFC tags
- 🔐 **Secure Authentication** - JWT-based auth with biometric login
- 📱 **Push Notifications** - Firebase Cloud Messaging integration
- 🌐 **Multi-Tenant** - Support for multiple organizations via subdomain discovery
- 🌍 **Bilingual** - English and Arabic with RTL support

## Getting Started

### Prerequisites

- Flutter SDK 3.0+ 
- Android Studio / Xcode
- Firebase project (for push notifications)

### Installation

1. Install dependencies:
   ```bash
   flutter pub get
   ```

2. Generate code (Riverpod, Freezed, Retrofit):
   ```bash
   flutter pub run build_runner build --delete-conflicting-outputs
   ```

3. Configure Firebase:
   - Add `google-services.json` to `android/app/`
   - Add `GoogleService-Info.plist` to `ios/Runner/`

4. Run the app:
   ```bash
   flutter run
   ```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── app/
│   ├── app.dart              # MaterialApp configuration
│   └── router.dart           # GoRouter configuration
├── core/
│   ├── config/               # App configuration constants
│   ├── network/              # Dio client & interceptors
│   ├── storage/              # Secure storage service
│   ├── theme/                # App theme & colors
│   └── utils/                # Utility functions
├── features/
│   ├── auth/                 # Login, biometric auth
│   ├── tenant_discovery/     # Company URL entry
│   ├── home/                 # Dashboard
│   ├── attendance/           # GPS+NFC check-in
│   ├── leave/                # Leave requests
│   ├── notifications/        # Push & in-app notifications
│   └── profile/              # User profile
├── shared/
│   ├── models/               # Shared data models
│   ├── providers/            # Global providers
│   └── widgets/              # Reusable widgets
└── l10n/                     # Localization files
```

## Architecture

This app follows **Clean Architecture** with **Riverpod** for state management:

- **Presentation Layer**: UI widgets, screens, controllers
- **Domain Layer**: Business logic, use cases
- **Data Layer**: API clients, repositories, data sources

## API Integration

The app connects to the Time Attendance System backend API:

| Feature | Endpoint |
|---------|----------|
| Tenant Discovery | `GET /api/v1/tenants/discover` |
| Login | `POST /api/v1/auth/login` |
| Check-In/Out | `POST /api/v1/mobile/attendance/transaction` |
| Location Check | `POST /api/v1/mobile/attendance/check-location` |
| Push Token | `POST /api/v1/push-tokens/register` |
| Notifications | `GET /api/v1/notifications` |

## Screenshots

[Screenshots to be added]

## License

Proprietary - Time Attendance System
