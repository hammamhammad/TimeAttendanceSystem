import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:package_info_plus/package_info_plus.dart';

/// Service for getting device information.
class DeviceInfoService {
  static final DeviceInfoService _instance = DeviceInfoService._();
  static DeviceInfoService get instance => _instance;
  
  DeviceInfoService._();
  
  final DeviceInfoPlugin _deviceInfo = DeviceInfoPlugin();
  
  String? _cachedDeviceId;
  String? _cachedDeviceModel;
  String? _cachedOsVersion;
  String? _cachedAppVersion;
  
  /// Get unique device identifier.
  Future<String> getDeviceId() async {
    if (_cachedDeviceId != null) return _cachedDeviceId!;
    
    if (Platform.isAndroid) {
      final android = await _deviceInfo.androidInfo;
      _cachedDeviceId = android.id;
    } else if (Platform.isIOS) {
      final ios = await _deviceInfo.iosInfo;
      _cachedDeviceId = ios.identifierForVendor ?? 'unknown';
    } else if (Platform.isWindows) {
      final windows = await _deviceInfo.windowsInfo;
      _cachedDeviceId = windows.deviceId;
    } else {
      _cachedDeviceId = 'unknown';
    }
    
    return _cachedDeviceId!;
  }
  
  /// Get device model name.
  Future<String> getDeviceModel() async {
    if (_cachedDeviceModel != null) return _cachedDeviceModel!;
    
    if (Platform.isAndroid) {
      final android = await _deviceInfo.androidInfo;
      _cachedDeviceModel = '${android.manufacturer} ${android.model}';
    } else if (Platform.isIOS) {
      final ios = await _deviceInfo.iosInfo;
      _cachedDeviceModel = ios.utsname.machine;
    } else if (Platform.isWindows) {
      final windows = await _deviceInfo.windowsInfo;
      _cachedDeviceModel = windows.computerName;
    } else {
      _cachedDeviceModel = 'Unknown Device';
    }
    
    return _cachedDeviceModel!;
  }
  
  /// Get OS version.
  Future<String> getOsVersion() async {
    if (_cachedOsVersion != null) return _cachedOsVersion!;
    
    if (Platform.isAndroid) {
      final android = await _deviceInfo.androidInfo;
      _cachedOsVersion = 'Android ${android.version.release}';
    } else if (Platform.isIOS) {
      final ios = await _deviceInfo.iosInfo;
      _cachedOsVersion = 'iOS ${ios.systemVersion}';
    } else if (Platform.isWindows) {
      _cachedOsVersion = 'Windows';
    } else {
      _cachedOsVersion = Platform.operatingSystem;
    }
    
    return _cachedOsVersion!;
  }
  
  /// Get app version.
  Future<String> getAppVersion() async {
    if (_cachedAppVersion != null) return _cachedAppVersion!;
    
    final packageInfo = await PackageInfo.fromPlatform();
    _cachedAppVersion = '${packageInfo.version}+${packageInfo.buildNumber}';
    
    return _cachedAppVersion!;
  }
  
  /// Get all device info as a map.
  Future<Map<String, String>> getAllInfo() async {
    return {
      'deviceId': await getDeviceId(),
      'deviceModel': await getDeviceModel(),
      'osVersion': await getOsVersion(),
      'appVersion': await getAppVersion(),
      'platform': Platform.operatingSystem,
    };
  }
}
