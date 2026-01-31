import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../config/app_config.dart';

/// Secure storage service for sensitive data (tokens, credentials).
class SecureStorageService {
  SecureStorageService._();
  
  static final SecureStorageService instance = SecureStorageService._();
  
  late FlutterSecureStorage _storage;
  
  /// Initialize secure storage with platform-specific options.
  Future<void> init() async {
    const androidOptions = AndroidOptions(
      encryptedSharedPreferences: true,
    );
    const iosOptions = IOSOptions(
      accessibility: KeychainAccessibility.first_unlock_this_device,
    );
    
    _storage = const FlutterSecureStorage(
      aOptions: androidOptions,
      iOptions: iosOptions,
    );
  }
  
  // ===== TOKEN MANAGEMENT =====
  
  /// Save access token.
  Future<void> saveAccessToken(String token) async {
    await _storage.write(key: AppConfig.accessTokenKey, value: token);
  }
  
  /// Get access token.
  Future<String?> getAccessToken() async {
    return await _storage.read(key: AppConfig.accessTokenKey);
  }
  
  /// Save refresh token.
  Future<void> saveRefreshToken(String token) async {
    await _storage.write(key: AppConfig.refreshTokenKey, value: token);
  }
  
  /// Get refresh token.
  Future<String?> getRefreshToken() async {
    return await _storage.read(key: AppConfig.refreshTokenKey);
  }
  
  /// Clear all tokens (on logout).
  Future<void> clearTokens() async {
    await _storage.delete(key: AppConfig.accessTokenKey);
    await _storage.delete(key: AppConfig.refreshTokenKey);
  }
  
  // ===== TENANT CONFIGURATION =====
  
  /// Save tenant configuration.
  Future<void> saveTenantConfig(TenantConfig config) async {
    final json = jsonEncode(config.toJson());
    await _storage.write(key: AppConfig.tenantConfigKey, value: json);
  }
  
  /// Get tenant configuration.
  Future<TenantConfig?> getTenantConfig() async {
    final json = await _storage.read(key: AppConfig.tenantConfigKey);
    if (json == null) return null;
    
    try {
      final map = jsonDecode(json) as Map<String, dynamic>;
      return TenantConfig.fromJson(map);
    } catch (e) {
      return null;
    }
  }
  
  /// Clear tenant configuration.
  Future<void> clearTenantConfig() async {
    await _storage.delete(key: AppConfig.tenantConfigKey);
  }
  
  // ===== USER DATA =====
  
  /// Save user data as JSON.
  Future<void> saveUserData(Map<String, dynamic> userData) async {
    final json = jsonEncode(userData);
    await _storage.write(key: AppConfig.userDataKey, value: json);
  }
  
  /// Get user data.
  Future<Map<String, dynamic>?> getUserData() async {
    final json = await _storage.read(key: AppConfig.userDataKey);
    if (json == null) return null;
    
    try {
      return jsonDecode(json) as Map<String, dynamic>;
    } catch (e) {
      return null;
    }
  }
  
  // ===== BIOMETRIC SETTINGS =====
  
  /// Check if biometric login is enabled.
  Future<bool> isBiometricEnabled() async {
    final value = await _storage.read(key: AppConfig.biometricEnabledKey);
    return value == 'true';
  }
  
  /// Set biometric login enabled/disabled.
  Future<void> setBiometricEnabled(bool enabled) async {
    await _storage.write(
      key: AppConfig.biometricEnabledKey,
      value: enabled.toString(),
    );
  }
  
  // ===== PREFERENCES =====
  
  /// Save locale preference.
  Future<void> saveLocale(String locale) async {
    await _storage.write(key: AppConfig.localeKey, value: locale);
  }
  
  /// Get locale preference.
  Future<String?> getLocale() async {
    return await _storage.read(key: AppConfig.localeKey);
  }
  
  /// Clear all stored data (full logout/reset).
  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}
