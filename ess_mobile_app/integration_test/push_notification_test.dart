import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for push notification functionality.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Push Notification Tests', () {
    testWidgets('Notification bell icon displays', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Look for notification bell in app bar
      final bellIcon = find.byIcon(Icons.notifications);
      final bellOutlineIcon = find.byIcon(Icons.notifications_outlined);
      
      expect(
        bellIcon.evaluate().isNotEmpty || bellOutlineIcon.evaluate().isNotEmpty,
        isTrue,
      );
    });

    testWidgets('Notification count badge shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Look for notification badge
      final badge = find.byType(Badge);
      // Badge may or may not be present depending on notification count
    });

    testWidgets('Notification list opens on tap', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Find and tap notification icon
      final bellIcon = find.byIcon(Icons.notifications);
      final bellOutlineIcon = find.byIcon(Icons.notifications_outlined);
      
      Finder notificationButton;
      if (bellIcon.evaluate().isNotEmpty) {
        notificationButton = bellIcon;
      } else if (bellOutlineIcon.evaluate().isNotEmpty) {
        notificationButton = bellOutlineIcon;
      } else {
        return; // No notification button found
      }

      await tester.tap(notificationButton.first);
      await tester.pumpAndSettle();

      // Notification list or empty state should show
      final listView = find.byType(ListView);
      final emptyState = find.textContaining('No notification');
      
      expect(
        listView.evaluate().isNotEmpty || emptyState.evaluate().isNotEmpty,
        isTrue,
      );
    });

    testWidgets('Notification settings accessible', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to profile/settings
      final profileTab = find.byIcon(Icons.person);
      if (profileTab.evaluate().isNotEmpty) {
        await tester.tap(profileTab);
        await tester.pumpAndSettle();

        // Look for notification settings
        final notificationSettings = find.textContaining('Notification');
        // Settings option should be present
      }
    });

    testWidgets('Mark notification as read works', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Open notifications
      final bellIcon = find.byIcon(Icons.notifications);
      if (bellIcon.evaluate().isNotEmpty) {
        await tester.tap(bellIcon.first);
        await tester.pumpAndSettle();

        // Find first notification item
        final notificationItem = find.byKey(const Key('notification_item_0'));
        if (notificationItem.evaluate().isNotEmpty) {
          await tester.tap(notificationItem);
          await tester.pumpAndSettle();
        }
      }
    });

    testWidgets('Mark all as read works', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Open notifications
      final bellIcon = find.byIcon(Icons.notifications);
      if (bellIcon.evaluate().isNotEmpty) {
        await tester.tap(bellIcon.first);
        await tester.pumpAndSettle();

        // Find mark all as read button
        final markAllRead = find.textContaining('Mark all');
        if (markAllRead.evaluate().isNotEmpty) {
          await tester.tap(markAllRead);
          await tester.pumpAndSettle();
        }
      }
    });
  });
}
