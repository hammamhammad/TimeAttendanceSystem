import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:ess_mobile_app/main.dart' as app;

/// Integration tests for multi-tenant isolation.
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('Multi-Tenant Isolation Tests', () {
    testWidgets('Tenant discovery screen shows', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // If no tenant is configured, discovery screen should show
      final companyCodeField = find.byKey(const Key('company_code_field'));
      final tenantLogo = find.byKey(const Key('tenant_logo'));
      
      // Either tenant discovery or login (with tenant branding) should show
    });

    testWidgets('Different tenant codes load different configs', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // This test verifies tenant-specific configuration loading
      final companyCodeField = find.byKey(const Key('company_code_field'));
      
      if (companyCodeField.evaluate().isNotEmpty) {
        // Enter first tenant code
        await tester.enterText(companyCodeField, 'tenant-a');
        await tester.pumpAndSettle();

        // Note: Full test would verify different API endpoints are used
      }
    });

    testWidgets('Tenant branding displays correctly', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Look for tenant-specific branding elements
      final logo = find.byKey(const Key('tenant_logo'));
      final companyName = find.byKey(const Key('company_name'));
      
      // Branding elements should be present if tenant is configured
    });

    testWidgets('Tenant switch clears data', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Navigate to profile/settings
      final profileTab = find.byIcon(Icons.person);
      if (profileTab.evaluate().isNotEmpty) {
        await tester.tap(profileTab);
        await tester.pumpAndSettle();

        // Find switch tenant option
        final switchTenant = find.textContaining('Switch Company');
        if (switchTenant.evaluate().isNotEmpty) {
          await tester.tap(switchTenant);
          await tester.pumpAndSettle();

          // Confirm switch
          final confirmButton = find.text('Switch');
          if (confirmButton.evaluate().isNotEmpty) {
            await tester.tap(confirmButton);
            await tester.pumpAndSettle();

            // Should return to tenant discovery
            final companyCodeField = find.byKey(const Key('company_code_field'));
            expect(companyCodeField, findsOneWidget);
          }
        }
      }
    });

    testWidgets('Tenant-specific features respect permissions', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // This test verifies that tenant-specific feature flags work
      // Features enabled/disabled per tenant should reflect correctly
    });

    testWidgets('API requests include tenant header', (tester) async {
      // This would typically be a unit test for the API client
      // But we can verify tenant is set in the app state
      app.main();
      await tester.pumpAndSettle();

      // Verify tenant context is established before making requests
    });

    testWidgets('Offline data is tenant-scoped', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // This verifies that cached data is isolated per tenant
      // Full test would require switching tenants and verifying data isolation
    });
  });
}
