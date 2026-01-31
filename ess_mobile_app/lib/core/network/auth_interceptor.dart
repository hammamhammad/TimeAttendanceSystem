import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../storage/secure_storage_service.dart';

/// Dio interceptor for handling JWT authentication.
/// Automatically adds Authorization header and handles token refresh.
class AuthInterceptor extends Interceptor {
  final Ref _ref;
  
  AuthInterceptor(this._ref);
  
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // Skip auth header for public endpoints
    final publicEndpoints = [
      '/api/v1/tenants/discover',
      '/api/v1/tenants/validate',
      '/api/v1/auth/login',
      '/api/v1/auth/refresh-token',
    ];
    
    final isPublicEndpoint = publicEndpoints.any(
      (endpoint) => options.path.contains(endpoint),
    );
    
    if (!isPublicEndpoint) {
      final accessToken = await SecureStorageService.instance.getAccessToken();
      if (accessToken != null) {
        options.headers['Authorization'] = 'Bearer $accessToken';
      }
    }
    
    handler.next(options);
  }
  
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    // Handle 401 Unauthorized - try to refresh token
    if (err.response?.statusCode == 401) {
      final refreshed = await _tryRefreshToken();
      
      if (refreshed) {
        // Retry the original request with new token
        try {
          final accessToken = await SecureStorageService.instance.getAccessToken();
          err.requestOptions.headers['Authorization'] = 'Bearer $accessToken';
          
          final response = await Dio().fetch(err.requestOptions);
          return handler.resolve(response);
        } catch (e) {
          // Refresh failed, let the error pass through
        }
      }
      
      // Token refresh failed - clear tokens and redirect to login
      await SecureStorageService.instance.clearTokens();
      // TODO: Trigger logout/redirect to login
    }
    
    handler.next(err);
  }
  
  /// Attempt to refresh the access token using the refresh token.
  Future<bool> _tryRefreshToken() async {
    try {
      final refreshToken = await SecureStorageService.instance.getRefreshToken();
      if (refreshToken == null) return false;
      
      final tenantConfig = await SecureStorageService.instance.getTenantConfig();
      if (tenantConfig == null) return false;
      
      final dio = Dio();
      final response = await dio.post(
        '${tenantConfig.apiBaseUrl}/api/v1/auth/refresh-token',
        data: {'refreshToken': refreshToken},
      );
      
      if (response.statusCode == 200) {
        final newAccessToken = response.data['accessToken'] as String;
        final newRefreshToken = response.data['refreshToken'] as String?;
        
        await SecureStorageService.instance.saveAccessToken(newAccessToken);
        if (newRefreshToken != null) {
          await SecureStorageService.instance.saveRefreshToken(newRefreshToken);
        }
        
        return true;
      }
    } catch (e) {
      print('Token refresh failed: $e');
    }
    
    return false;
  }
}
