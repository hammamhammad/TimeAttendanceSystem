# ESS Mobile App - Windows Build Script
# Use PowerShell to run this script

Write-Host "🚀 Building ESS Mobile App for Android..." -ForegroundColor Cyan
Write-Host ""

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
flutter clean
flutter pub get

# Generate code
Write-Host "⚙️ Running code generation..." -ForegroundColor Yellow
flutter pub run build_runner build --delete-conflicting-outputs

# Generate app icons (if assets are available)
Write-Host "🎨 Generating app icons..." -ForegroundColor Yellow
try {
    flutter pub run flutter_launcher_icons:main
}
catch {
    Write-Host "⚠️ App icon generation skipped - add app_icon.png to assets/icons/" -ForegroundColor DarkYellow
}

# Generate splash screen (if assets are available)
Write-Host "💦 Generating splash screen..." -ForegroundColor Yellow
try {
    flutter pub run flutter_native_splash:create
}
catch {
    Write-Host "⚠️ Splash screen generation skipped - add splash assets to assets/icons/" -ForegroundColor DarkYellow
}

# Build APK (Debug)
Write-Host "📦 Building Debug APK..." -ForegroundColor Yellow
flutter build apk --debug

# Build APK (Release)
Write-Host "📦 Building Release APK..." -ForegroundColor Yellow
flutter build apk --release

# Build App Bundle (for Play Store)
Write-Host "📦 Building App Bundle..." -ForegroundColor Yellow
flutter build appbundle --release

Write-Host ""
Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Output locations:" -ForegroundColor Cyan
Write-Host "   Debug APK:     build\app\outputs\flutter-apk\app-debug.apk" -ForegroundColor White
Write-Host "   Release APK:   build\app\outputs\flutter-apk\app-release.apk" -ForegroundColor White
Write-Host "   App Bundle:    build\app\outputs\bundle\release\app-release.aab" -ForegroundColor White
Write-Host ""
