#!/bin/bash
# ESS Mobile App - Release Build Script for iOS

set -e

echo "🚀 Building ESS Mobile App for iOS..."
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ iOS builds can only be run on macOS"
    exit 1
fi

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

# Install CocoaPods dependencies
echo "📦 Installing CocoaPods dependencies..."
cd ios
pod install --repo-update
cd ..

# Build iOS (Debug)
echo "📱 Building iOS Debug..."
flutter build ios --debug --no-codesign

# Build iOS (Release)
echo "📱 Building iOS Release..."
flutter build ios --release --no-codesign

# Build IPA (requires valid signing)
# Uncomment when signing is configured:
# echo "📦 Building IPA..."
# flutter build ipa --release

echo ""
echo "✅ Build complete!"
echo ""
echo "📍 To create IPA for App Store/TestFlight:"
echo "   1. Open ios/Runner.xcworkspace in Xcode"
echo "   2. Configure signing with your Apple Developer account"
echo "   3. Archive and distribute from Xcode"
echo ""
