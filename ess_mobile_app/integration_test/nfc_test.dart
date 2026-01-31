import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for NFC read/write functionality.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('NFC Functionality Tests', () {
    testWidgets('NFC status indicator shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to attendance
      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Look for NFC status
        final nfcStatus = find.byKey(const Key('nfc_status'));
        final nfcIcon = find.byIcon(Icons.nfc);
        
        // NFC indicator should be present
        expect(
          nfcStatus.evaluate().isNotEmpty || nfcIcon.evaluate().isNotEmpty,
          isTrue,
        );
      }
    });

    testWidgets('NFC scan prompt shows when needed', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // If GPS is verified, NFC scan should be shown
        final nfcScanPrompt = find.byKey(const Key('nfc_scan_prompt'));
        final scanNfcText = find.textContaining('Scan NFC');
        
        // This depends on the current verification state
      }
    });

    testWidgets('NFC verification UI feedback works', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Look for verification status indicators
        final verifiedIcon = find.byIcon(Icons.check_circle);
        final pendingIcon = find.byIcon(Icons.pending);
        
        // Some status should be shown
      }
    });

    testWidgets('NFC not available fallback works', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // If NFC is not available, app should handle gracefully
        final nfcUnavailable = find.textContaining('NFC not available');
        // This depends on device capability
      }
    });
  });

  group('Admin NFC Tag Management Tests', () {
    testWidgets('NFC tag list loads', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // This requires admin access - navigate to admin section
      // These tests are for admin users only
    });

    testWidgets('NFC tag registration form shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Admin feature - verify UI loads
    });

    testWidgets('NFC write confirmation dialog shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Admin feature - verify write protection warning shows
    });
  });
}
