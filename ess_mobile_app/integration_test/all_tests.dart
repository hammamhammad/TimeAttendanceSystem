import 'api_integration_test.dart' as api_tests;
import 'geofence_test.dart' as geofence_tests;
import 'nfc_test.dart' as nfc_tests;
import 'push_notification_test.dart' as notification_tests;
import 'deep_link_test.dart' as deeplink_tests;
import 'multi_tenant_test.dart' as tenant_tests;

/// Run all integration tests.
/// 
/// Usage: flutter test integration_test/
void main() {
  api_tests.main();
  geofence_tests.main();
  nfc_tests.main();
  notification_tests.main();
  deeplink_tests.main();
  tenant_tests.main();
}
