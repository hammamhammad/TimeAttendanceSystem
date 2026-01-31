# Flutter ESS Mobile App Setup Script
# Run this script after installing Flutter SDK

Write-Host "ESS Mobile App Setup" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green

# Check Flutter
Write-Host "`nChecking Flutter installation..."
flutter --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Flutter not found. Please install Flutter SDK first." -ForegroundColor Red
    exit 1
}

# Get dependencies
Write-Host "`nGetting dependencies..."
flutter pub get

# Generate code (Riverpod, Freezed, Retrofit)
Write-Host "`nGenerating code..."
flutter pub run build_runner build --delete-conflicting-outputs

# Create the platform-specific projects
Write-Host "`nCreating platform projects..."
flutter create . --platforms=android,ios

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "  1. Add google-services.json to android/app/"
Write-Host "  2. Add GoogleService-Info.plist to ios/Runner/"
Write-Host "  3. Run 'flutter run' to start the app"
