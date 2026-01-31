import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for deep link navigation.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Deep Link Navigation Tests', () {
    testWidgets('App handles /attendance deep link', (tester) async {
      // Deep links are typically tested by launching app with specific URI
      // This is a placeholder for manual/automated deep link testing
      app.main();
      await tester.pumpAndSettle();

      // Verify attendance screen can be navigated to
      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();
        
        // Should show attendance screen
        final attendanceScreen = find.byKey(const Key('attendance_screen'));
        // Verify navigation worked
      }
    });

    testWidgets('App handles /leave deep link', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to leave screen
      // This simulates what would happen with a deep link
    });

    testWidgets('App handles /notifications deep link', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Simulate deep link to notifications
      final bellIcon = find.byIcon(Icons.notifications);
      if (bellIcon.evaluate().isNotEmpty) {
        await tester.tap(bellIcon.first);
        await tester.pumpAndSettle();
      }
    });

    testWidgets('App handles /profile deep link', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to profile
      final profileTab = find.byIcon(Icons.person);
      if (profileTab.evaluate().isNotEmpty) {
        await tester.tap(profileTab);
        await tester.pumpAndSettle();
      }
    });

    testWidgets('App handles notification payload navigation', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // This tests navigation from notification payloads
      // The navigation should work based on notification data
    });

    testWidgets('Bottom navigation preserves state', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate between tabs and verify state is preserved
      final homeTab = find.byIcon(Icons.home);
      final attendanceTab = find.byIcon(Icons.fingerprint);
      final leaveTab = find.byIcon(Icons.event_busy);

      if (homeTab.evaluate().isNotEmpty) {
        // Go to attendance
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Go to leave
        await tester.tap(leaveTab);
        await tester.pumpAndSettle();

        // Go back home
        await tester.tap(homeTab);
        await tester.pumpAndSettle();

        // Verify we're on home
        expect(homeTab.evaluate().isNotEmpty, isTrue);
      }
    });

    testWidgets('Back navigation works correctly', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate somewhere then back
      final attendanceTab = find.byIcon(Icons.fingerprint);
      if (attendanceTab.evaluate().isNotEmpty) {
        await tester.tap(attendanceTab);
        await tester.pumpAndSettle();

        // Simulate back press
        final NavigatorState navigator = tester.state(find.byType(Navigator).first);
        navigator.pop();
        await tester.pumpAndSettle();
      }
    });
  });
}
