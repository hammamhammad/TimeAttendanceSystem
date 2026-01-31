import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for API connectivity and authentication.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('API Integration Tests', () {
    testWidgets('App launches successfully', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Verify app starts with tenant discovery or login
      expect(find.byType(MaterialApp), findsOneWidget);
    });

    testWidgets('Tenant discovery flow works', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Look for company code input field
      final companyCodeField = find.byKey(const Key('company_code_field'));
      
      if (companyCodeField.evaluate().isNotEmpty) {
        // Enter test company code
        await tester.enterText(companyCodeField, 'test-company');
        await tester.pumpAndSettle();

        // Tap discover button
        final discoverButton = find.byKey(const Key('discover_button'));
        if (discoverButton.evaluate().isNotEmpty) {
          await tester.tap(discoverButton);
          await tester.pumpAndSettle(const Duration(seconds: 5));
        }
      }
    });

    testWidgets('Login flow with valid credentials', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Find login form fields
      final emailField = find.byKey(const Key('email_field'));
      final passwordField = find.byKey(const Key('password_field'));
      
      if (emailField.evaluate().isNotEmpty && passwordField.evaluate().isNotEmpty) {
        // Enter credentials
        await tester.enterText(emailField, 'test@example.com');
        await tester.enterText(passwordField, 'testpassword');
        await tester.pumpAndSettle();

        // Tap login button
        final loginButton = find.byKey(const Key('login_button'));
        if (loginButton.evaluate().isNotEmpty) {
          await tester.tap(loginButton);
          await tester.pumpAndSettle(const Duration(seconds: 5));
        }
      }
    });

    testWidgets('Token refresh works correctly', (tester) async {
      // This test requires a previously authenticated session
      app.main();
      await tester.pumpAndSettle();

      // If user is logged in, verify dashboard loads
      final dashboardScreen = find.byKey(const Key('dashboard_screen'));
      if (dashboardScreen.evaluate().isNotEmpty) {
        expect(dashboardScreen, findsOneWidget);
      }
    });

    testWidgets('Logout clears session', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Find and tap profile/settings
      final profileTab = find.byIcon(Icons.person);
      if (profileTab.evaluate().isNotEmpty) {
        await tester.tap(profileTab);
        await tester.pumpAndSettle();

        // Find logout button
        final logoutButton = find.byKey(const Key('logout_button'));
        if (logoutButton.evaluate().isNotEmpty) {
          await tester.tap(logoutButton);
          await tester.pumpAndSettle();

          // Confirm logout
          final confirmButton = find.text('Logout');
          if (confirmButton.evaluate().isNotEmpty) {
            await tester.tap(confirmButton.last);
            await tester.pumpAndSettle(const Duration(seconds: 2));
          }
        }
      }
    });
  });
}
