import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/app_config.dart';
import '../storage/secure_storage_service.dart';
import 'auth_interceptor.dart';

/// Provider for the Dio HTTP client.
/// The base URL is set dynamically based on tenant configuration.
final dioProvider = Provider<Dio>((ref) {
  final dio = Dio();

  // Set default options
  dio.options = BaseOptions(
    connectTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
    receiveTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  );

  // Add interceptors
  dio.interceptors.add(_BaseUrlInterceptor());
  dio.interceptors.add(AuthInterceptor(ref));
  dio.interceptors.add(LogInterceptor(
    requestBody: true,
    responseBody: true,
    logPrint: (obj) => print('🌐 $obj'),
  ));

  return dio;
});

/// Interceptor to set the base URL from tenant config before each request.
class _BaseUrlInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // Get tenant config and set base URL
    final tenantConfig = await SecureStorageService.instance.getTenantConfig();
    if (tenantConfig != null && options.baseUrl.isEmpty) {
      options.baseUrl = tenantConfig.apiBaseUrl;
    }
    handler.next(options);
  }
}

/// Provider for the base API URL from tenant config.
final apiBaseUrlProvider = FutureProvider<String>((ref) async {
  final tenantConfig = await SecureStorageService.instance.getTenantConfig();
  return tenantConfig?.apiBaseUrl ?? '';
});

/// API client configuration for making HTTP requests.
class ApiClient {
  final Dio dio;
  final String baseUrl;
  
  ApiClient({required this.dio, required this.baseUrl}) {
    dio.options = BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
      receiveTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    );
  }
  
  /// Create an API client with the current tenant's base URL.
  static Future<ApiClient> create(Dio dio) async {
    final tenantConfig = await SecureStorageService.instance.getTenantConfig();
    final baseUrl = tenantConfig?.apiBaseUrl ?? '';
    return ApiClient(dio: dio, baseUrl: baseUrl);
  }
  
  /// Update the base URL (after tenant discovery).
  void updateBaseUrl(String newBaseUrl) {
    dio.options.baseUrl = newBaseUrl;
  }
}


/// Provider for the ApiClient.
final apiClientProvider = Provider<ApiClient>((ref) {
  final dio = ref.watch(dioProvider);
  return ApiClient(dio: dio, baseUrl: AppConfig.apiBaseUrl);
});

/// Result wrapper for API responses.
class ApiResult<T> {
  final T? data;
  final String? error;
  final bool isSuccess;
  
  ApiResult.success(this.data) : error = null, isSuccess = true;
  ApiResult.failure(this.error) : data = null, isSuccess = false;
}
