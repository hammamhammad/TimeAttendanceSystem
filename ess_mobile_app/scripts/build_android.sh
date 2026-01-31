#!/bin/bash
# ESS Mobile App - Release Build Script for Android

set -e

echo "🚀 Building ESS Mobile App for Android..."
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
flutter clean
flutter pub get

# Generate code
echo "⚙️ Running code generation..."
flutter pub run build_runner build --delete-conflicting-outputs

# Generate app icons
echo "🎨 Generating app icons..."
flutter pub run flutter_launcher_icons:main

# Generate splash screen
echo "💦 Generating splash screen..."
flutter pub run flutter_native_splash:create

# Build APK (Debug)
echo "📦 Building Debug APK..."
flutter build apk --debug

# Build APK (Release)
echo "📦 Building Release APK..."
flutter build apk --release

# Build App Bundle (for Play Store)
echo "📦 Building App Bundle..."
flutter build appbundle --release

echo ""
echo "✅ Build complete!"
echo ""
echo "📍 Output locations:"
echo "   Debug APK:     build/app/outputs/flutter-apk/app-debug.apk"
echo "   Release APK:   build/app/outputs/flutter-apk/app-release.apk"
echo "   App Bundle:    build/app/outputs/bundle/release/app-release.aab"
echo ""
