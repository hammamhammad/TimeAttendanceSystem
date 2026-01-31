import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/network/api_client.dart';
import '../../core/network/api_service.dart';

/// Provider for the ApiService (Retrofit client).
/// Updates when Dio provider updates (e.g. base URL change).
final apiServiceProvider = Provider<ApiService>((ref) {
  final dio = ref.watch(dioProvider);
  return ApiService(dio);
});
