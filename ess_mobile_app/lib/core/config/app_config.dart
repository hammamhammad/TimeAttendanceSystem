/// Application configuration constants.
class AppConfig {
  AppConfig._();

  /// Development mode - set to true for local API testing
  static const bool isDevelopment = true;

  /// Local API URL for Android emulator (10.0.2.2 = host localhost)
  static const String localApiUrl = 'http://10.0.2.2:5099';

  /// Default API base URL (before tenant discovery)
  static const String apiBaseUrl = 'https://api.example.com';

  /// Default API timeout in seconds
  static const int apiTimeoutSeconds = 30;
  
  /// Maximum retry attempts for failed API calls
  static const int maxRetryAttempts = 3;
  
  /// Geofence radius fallback in meters (if not configured in branch)
  static const int defaultGeofenceRadiusMeters = 100;
  
  /// Minimum GPS accuracy required for check-in (meters)
  static const double minGpsAccuracyMeters = 50.0;
  
  /// Token refresh threshold (minutes before expiry)
  static const int tokenRefreshThresholdMinutes = 5;
  
  /// Secure storage keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String tenantConfigKey = 'tenant_config';
  static const String userDataKey = 'user_data';
  static const String biometricEnabledKey = 'biometric_enabled';
  static const String localeKey = 'app_locale';
  static const String themeKey = 'app_theme';
  
  /// Push notification channel
  static const String pushNotificationChannelId = 'ess_notifications';
  static const String pushNotificationChannelName = 'ESS Notifications';
  static const String pushNotificationChannelDesc = 'Notifications from Time Attendance System';
}

/// Tenant configuration model for multi-tenant support.
class TenantConfig {
  final int tenantId;
  final String subdomain;
  final String name;
  final String? nameAr;
  final String? logoUrl;
  final String apiBaseUrl;
  
  TenantConfig({
    required this.tenantId,
    required this.subdomain,
    required this.name,
    this.nameAr,
    this.logoUrl,
    required this.apiBaseUrl,
  });
  
  factory TenantConfig.fromJson(Map<String, dynamic> json) {
    return TenantConfig(
      tenantId: json['tenantId'] as int,
      subdomain: json['subdomain'] as String,
      name: json['name'] as String,
      nameAr: json['nameAr'] as String?,
      logoUrl: json['logoUrl'] as String?,
      apiBaseUrl: json['apiBaseUrl'] as String,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'tenantId': tenantId,
      'subdomain': subdomain,
      'name': name,
      'nameAr': nameAr,
      'logoUrl': logoUrl,
      'apiBaseUrl': apiBaseUrl,
    };
  }
}
