import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/app_config.dart';
import 'auth_interceptor.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio();

  dio.options = BaseOptions(
    baseUrl: AppConfig.isDevelopment ? AppConfig.localApiUrl : AppConfig.apiBaseUrl,
    connectTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
    receiveTimeout: Duration(seconds: AppConfig.apiTimeoutSeconds),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  );

  dio.interceptors.add(AuthInterceptor(ref));
  dio.interceptors.add(LogInterceptor(
    requestBody: true,
    responseBody: true,
    logPrint: (obj) => print('🌐 $obj'),
  ));

  return dio;
});

final apiBaseUrlProvider = Provider<String>((ref) {
  return AppConfig.isDevelopment ? AppConfig.localApiUrl : AppConfig.apiBaseUrl;
});

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

  void updateBaseUrl(String newBaseUrl) {
    dio.options.baseUrl = newBaseUrl;
  }
}

final apiClientProvider = Provider<ApiClient>((ref) {
  final dio = ref.watch(dioProvider);
  return ApiClient(
    dio: dio,
    baseUrl: AppConfig.isDevelopment ? AppConfig.localApiUrl : AppConfig.apiBaseUrl,
  );
});

class ApiResult<T> {
  final T? data;
  final String? error;
  final bool isSuccess;

  ApiResult.success(this.data) : error = null, isSuccess = true;
  ApiResult.failure(this.error) : data = null, isSuccess = false;
}
