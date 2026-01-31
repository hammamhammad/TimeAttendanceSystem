# ESS Mobile App - Release Guide

## Prerequisites

### Development Environment
- Flutter SDK 3.x+
- Dart SDK 3.0+
- Android Studio (for Android builds)
- Xcode 15+ (for iOS builds, macOS only)
- CocoaPods (for iOS)

### Required Tools
```bash
# Verify Flutter installation
flutter doctor

# Install dependencies
flutter pub get

# Generate code
flutter pub run build_runner build --delete-conflicting-outputs
```

## App Icons

### Icon Requirements
Place the following icon files in `assets/icons/`:

| File | Size | Description |
|------|------|-------------|
| `app_icon.png` | 1024x1024 | Main app icon (iOS & Android) |
| `app_icon_foreground.png` | 512x512 | Android adaptive icon foreground |
| `splash_logo.png` | 288x288 | Splash screen logo |
| `splash_branding.png` | 200x50 | Splash branding text (optional) |
| `splash_android12.png` | 192x192 | Android 12+ splash icon |

### Generate Icons
```bash
# Generate app icons
flutter pub run flutter_launcher_icons:main

# Generate splash screens
flutter pub run flutter_native_splash:create
```

## Android Release Build

### 1. Configure Signing

Create `android/key.properties`:
```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=your_key_alias
storeFile=/path/to/your/keystore.jks
```

### 2. Create Keystore (if new)
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
  -storetype JKS -keyalg RSA -keysize 2048 \
  -validity 10000 -alias upload
```

### 3. Build APK
```bash
# Debug APK
flutter build apk --debug

# Release APK
flutter build apk --release

# Split APKs by ABI (smaller files)
flutter build apk --split-per-abi --release
```

### 4. Build App Bundle (for Play Store)
```bash
flutter build appbundle --release
```

### Output Locations
- Debug APK: `build/app/outputs/flutter-apk/app-debug.apk`
- Release APK: `build/app/outputs/flutter-apk/app-release.apk`
- App Bundle: `build/app/outputs/bundle/release/app-release.aab`

## iOS Release Build

### 1. Configure Signing
Open `ios/Runner.xcworkspace` in Xcode and configure:
- Team (Apple Developer Account)
- Bundle Identifier
- Signing Certificates

### 2. Update Identifiers

Edit `ios/Runner/Info.plist`:
```xml
<key>CFBundleIdentifier</key>
<string>com.yourcompany.ess</string>
<key>CFBundleDisplayName</key>
<string>ESS Mobile</string>
```

### 3. Build Archive
```bash
# Install CocoaPods
cd ios && pod install --repo-update && cd ..

# Build for release
flutter build ios --release

# Build IPA (requires signing)
flutter build ipa --release
```

### 4. Submit to App Store
1. Open `build/ios/archive/Runner.xcarchive` in Xcode
2. Window > Organizer
3. Distribute App > App Store Connect

## Firebase Configuration

### Android
1. Download `google-services.json` from Firebase Console
2. Place in `android/app/google-services.json`

### iOS
1. Download `GoogleService-Info.plist` from Firebase Console
2. Place in `ios/Runner/GoogleService-Info.plist`

## Environment Configuration

### API Endpoints
Update `lib/shared/config/app_config.dart`:
```dart
class AppConfig {
  static const String productionApiUrl = 'https://api.yourcompany.com';
  static const String stagingApiUrl = 'https://staging-api.yourcompany.com';
}
```

### Build Flavors (Optional)
```bash
# Development
flutter build apk --flavor dev -t lib/main_dev.dart

# Staging
flutter build apk --flavor staging -t lib/main_staging.dart

# Production
flutter build apk --flavor prod -t lib/main.dart
```

## Testing

### Run Integration Tests
```bash
# Run all integration tests
flutter test integration_test/

# Run specific test
flutter test integration_test/api_integration_test.dart

# Run on device
flutter drive --driver=test_driver/integration_test.dart \
  --target=integration_test/api_integration_test.dart
```

### Test Coverage
```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
```

## Release Checklist

### Pre-Release
- [ ] Update version in `pubspec.yaml`
- [ ] Update changelog
- [ ] Run all tests
- [ ] Generate fresh icons and splash screens
- [ ] Verify Firebase configuration
- [ ] Test on real devices

### Android Release
- [ ] Build signed APK/AAB
- [ ] Test on multiple Android versions (API 21+)
- [ ] Test on different screen sizes
- [ ] Upload to Play Console
- [ ] Fill store listing
- [ ] Create release notes

### iOS Release
- [ ] Build archived IPA
- [ ] Test on iPhone and iPad
- [ ] Test on different iOS versions (13+)
- [ ] Upload to App Store Connect
- [ ] Fill store listing
- [ ] Submit for review

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0.0 | 2026-01-31 | Initial release |

## Support

For issues or questions, contact the development team.
