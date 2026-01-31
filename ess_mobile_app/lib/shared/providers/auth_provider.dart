import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/storage/secure_storage_service.dart';
import '../../core/config/app_config.dart';
import '../../core/network/api_client.dart';

/// Authentication state model.
class AuthState {
  final bool isAuthenticated;
  final bool hasTenant;
  final String? accessToken;
  final Map<String, dynamic>? user;
  final TenantConfig? tenantConfig;
  
  const AuthState({
    this.isAuthenticated = false,
    this.hasTenant = false,
    this.accessToken,
    this.user,
    this.tenantConfig,
  });
  
  AuthState copyWith({
    bool? isAuthenticated,
    bool? hasTenant,
    String? accessToken,
    Map<String, dynamic>? user,
    TenantConfig? tenantConfig,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      hasTenant: hasTenant ?? this.hasTenant,
      accessToken: accessToken ?? this.accessToken,
      user: user ?? this.user,
      tenantConfig: tenantConfig ?? this.tenantConfig,
    );
  }
}

/// Auth state provider with stream for router refresh.
final authStateProvider = AsyncNotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});

class AuthNotifier extends AsyncNotifier<AuthState> {
  final _controller = StreamController<AuthState>.broadcast();
  
  Stream<AuthState> get stream => _controller.stream;
  
  @override
  Future<AuthState> build() async {
    // Load saved auth state on startup
    final tenantConfig = await SecureStorageService.instance.getTenantConfig();
    final accessToken = await SecureStorageService.instance.getAccessToken();
    final userData = await SecureStorageService.instance.getUserData();
    
    // Update API client base URL if tenant exists
    if (tenantConfig != null) {
      ref.read(apiClientProvider).updateBaseUrl(tenantConfig.apiBaseUrl);
    }
    
    final authState = AuthState(
      hasTenant: tenantConfig != null,
      isAuthenticated: accessToken != null,
      accessToken: accessToken,
      user: userData,
      tenantConfig: tenantConfig,
    );
    
    return authState;
  }
  
  /// Set tenant configuration after discovery.
  Future<void> setTenant(TenantConfig config) async {
    await SecureStorageService.instance.saveTenantConfig(config);
    
    // Update API client base URL
    ref.read(apiClientProvider).updateBaseUrl(config.apiBaseUrl);
    
    final newState = state.value?.copyWith(
      hasTenant: true,
      tenantConfig: config,
    ) ?? AuthState(hasTenant: true, tenantConfig: config);
    
    state = AsyncData(newState);
    _controller.add(newState);
  }
  
  /// Login with tokens and user data.
  Future<void> login({
    required String accessToken,
    required String refreshToken,
    required Map<String, dynamic> user,
  }) async {
    await SecureStorageService.instance.saveAccessToken(accessToken);
    await SecureStorageService.instance.saveRefreshToken(refreshToken);
    await SecureStorageService.instance.saveUserData(user);
    
    final newState = state.value?.copyWith(
      isAuthenticated: true,
      accessToken: accessToken,
      user: user,
    ) ?? AuthState(
      isAuthenticated: true,
      accessToken: accessToken,
      user: user,
    );
    
    state = AsyncData(newState);
    _controller.add(newState);
  }
  
  /// Logout and clear all data.
  Future<void> logout() async {
    await SecureStorageService.instance.clearTokens();
    
    final newState = state.value?.copyWith(
      isAuthenticated: false,
      accessToken: null,
      user: null,
    ) ?? AuthState(isAuthenticated: false);
    
    state = AsyncData(newState);
    _controller.add(newState);
  }
  
  /// Full reset (clear tenant too).
  Future<void> reset() async {
    await SecureStorageService.instance.clearAll();
    
    // Reset API client base URL to default
    // We create a temporary ApiClient instance via provider or ensure updateBaseUrl handles it?
    // ref.read(apiClientProvider) returns the ApiClient instance.
    // AppConfig.apiBaseUrl from app_config.dart
    
    // However, AppConfig.apiBaseUrl is static constant.
    // If ApiClient was initialized with it, we can reset to it.
    // But we need to import AppConfig.
    
    // Assuming AppConfig is imported (it is).
    
    ref.read(apiClientProvider).updateBaseUrl('https://api.timeattendance.com'); 
    // Or better: AppConfig.apiBaseUrl but we need to check if that constant is public.
    // Step 496 defined: static const String apiBaseUrl = 'https://api.timeattendance.com';
    // So yes.
    
    const newState = AuthState();
    state = const AsyncData(AuthState());
    _controller.add(newState);
  }
}
