import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_service.dart';
import '../../core/storage/secure_storage_service.dart';
import '../models/user_model.dart';
import '../../core/config/app_config.dart';
import '../providers/api_provider.dart';

/// Repository for authentication operations.
class AuthRepository {
  final ApiService _apiService;
  final SecureStorageService _storage;

  AuthRepository(this._apiService, this._storage);

  /// Authenticate user credentials.
  Future<AuthResponse> login(String email, String password) async {
    final response = await _apiService.login({
      'email': email,
      'password': password,
    });
    return response;
  }

  /// Create a new access token using a refresh token.
  Future<AuthResponse> refreshToken(String refreshToken) async {
    final response = await _apiService.refreshToken({
      'refreshToken': refreshToken,
    });
    return response;
  }

  /// Logout the user.
  Future<void> logout() async {
    await _storage.clearTokens();
  }
}

/// Provider for the AuthRepository.
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  final storage = SecureStorageService.instance;
  return AuthRepository(apiService, storage);
});
