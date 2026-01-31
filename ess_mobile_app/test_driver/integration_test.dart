import 'package:integration_test/integration_test_driver.dart';

/// Entry point for integration tests.
/// 
/// Run with:
/// flutter drive --driver=test_driver/integration_test.dart \
///   --target=integration_test/api_integration_test.dart
Future<void> main() => integrationDriver();
