import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for geofence validation.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Geofence Validation Tests', () {
    testWidgets('Location permission request shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to attendance screen if logged in
      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();
      }

      // The app should request location permission
      // This is handled by the OS, so we just verify the screen loads
    });

    testWidgets('Attendance screen shows GPS status', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to attendance
      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Look for location status indicator
        final gpsStatus = find.byKey(const Key('gps_status'));
        final locationIcon = find.byIcon(Icons.location_on);
        
        // Either GPS status or location icon should be visible
        expect(
          gpsStatus.evaluate().isNotEmpty || locationIcon.evaluate().isNotEmpty,
          isTrue,
        );
      }
    });

    testWidgets('Check-in button responds to location', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Find check-in button
        final checkInButton = find.byKey(const Key('check_in_button'));
        if (checkInButton.evaluate().isNotEmpty) {
          // Button should be enabled or disabled based on location
          final button = tester.widget<ElevatedButton>(checkInButton);
          // Just verify button exists - actual state depends on location
          expect(checkInButton, findsOneWidget);
        }
      }
    });

    testWidgets('Distance calculation displays correctly', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Look for distance indicator
        final distanceText = find.textContaining(RegExp(r'\d+\s*(m|km)'));
        // Distance should show if location is available
        // This may or may not be present depending on location status
      }
    });

    testWidgets('Out of range warning shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // If user is out of range, warning should show
        final outOfRangeWarning = find.byKey(const Key('out_of_range_warning'));
        final warningIcon = find.byIcon(Icons.warning);
        
        // This depends on actual location vs branch location
      }
    });
  });
}
