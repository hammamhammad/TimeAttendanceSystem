import 'dart:convert';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:device_info_plus/device_info_plus.dart';

import '../models/notification_model.dart';
import '../providers/notification_provider.dart';
import '../../core/network/api_client.dart';
import '../../app/router.dart';

/// Service for handling push notifications.
class PushNotificationService {
  static final PushNotificationService _instance = PushNotificationService._();
  static PushNotificationService get instance => _instance;
  
  PushNotificationService._();
  
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  FirebaseMessaging? _messaging;
  String? _token;
  WidgetRef? _ref;
  
  /// Initialize push notifications.
  Future<void> initialize(WidgetRef ref) async {
    _ref = ref;
    
    // Initialize Firebase
    await Firebase.initializeApp();
    _messaging = FirebaseMessaging.instance;
    
    // Request permission
    await _messaging?.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    // Initialize local notifications
    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings();
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    
    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: _onNotificationTap,
    );
    
    // Get FCM token
    _token = await _messaging?.getToken();
    if (_token != null) {
      await _registerToken(_token!);
    }
    
    // Listen for token refresh
    _messaging?.onTokenRefresh.listen((token) async {
      _token = token;
      await _registerToken(token);
    });
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    
    // Handle background/terminated message tap
    FirebaseMessaging.onMessageOpenedApp.listen(_handleMessageOpenedApp);
    
    // Check for initial message (app opened from terminated state)
    final initialMessage = await _messaging?.getInitialMessage();
    if (initialMessage != null) {
      _handleMessageOpenedApp(initialMessage);
    }
  }
  
  /// Register FCM token with backend.
  Future<void> _registerToken(String token) async {
    try {
      final deviceId = await _getDeviceId();
      final platform = Platform.isAndroid ? 'android' : 'ios';
      
      final dio = _ref?.read(dioProvider);
      await dio?.post(
        '/api/v1/push-tokens/register',
        data: {
          'token': token,
          'platform': platform,
          'deviceId': deviceId,
        },
      );
    } catch (e) {
      print('Failed to register push token: $e');
    }
  }
  
  /// Get device ID.
  Future<String> _getDeviceId() async {
    final deviceInfo = DeviceInfoPlugin();
    
    if (Platform.isAndroid) {
      final android = await deviceInfo.androidInfo;
      return android.id;
    } else if (Platform.isIOS) {
      final ios = await deviceInfo.iosInfo;
      return ios.identifierForVendor ?? 'unknown';
    }
    
    return 'unknown';
  }
  
  /// Handle foreground message.
  void _handleForegroundMessage(RemoteMessage message) {
    final notification = message.notification;
    
    if (notification != null) {
      // Show local notification with JSON payload for navigation
      _showLocalNotification(
        title: notification.title ?? 'Notification',
        body: notification.body ?? '',
        payload: json.encode(message.data),
      );
      
      // Add to notification list
      final appNotification = AppNotification(
        id: DateTime.now().millisecondsSinceEpoch,
        titleEn: notification.title ?? 'Notification',
        messageEn: notification.body ?? '',
        type: _parseNotificationType(message.data['type']),
        createdAtUtc: DateTime.now().toUtc(),
        isRead: false,
        entityType: message.data['entityType'],
        actionUrl: message.data['actionUrl'],
      );
      
      _ref?.read(notificationNotifierProvider.notifier).addNotification(appNotification);
    }
  }
  
  /// Handle message opened (background/terminated).
  void _handleMessageOpenedApp(RemoteMessage message) {
    final entityType = message.data['entityType'] as String?;
    final route = _resolveRoute(entityType);
    _navigateTo(route);
  }

  /// Handle local notification tap.
  void _onNotificationTap(NotificationResponse response) {
    // Try to parse entity type from payload
    String? entityType;
    final payload = response.payload;
    if (payload != null) {
      try {
        final data = json.decode(payload) as Map<String, dynamic>;
        entityType = data['entityType'] as String?;
      } catch (_) {
        // payload may not be valid JSON — fall through to default route
      }
    }
    final route = _resolveRoute(entityType);
    _navigateTo(route);
  }

  /// Map entity type to a GoRouter path.
  String _resolveRoute(String? entityType) {
    switch (entityType?.toLowerCase()) {
      case 'vacation':
      case 'employeevacation':
        return '/leave';
      case 'excuse':
      case 'employeeexcuse':
        return '/excuses';
      case 'remotework':
      case 'remoteworkrequest':
        return '/remote-work';
      case 'attendancecorrection':
        return '/attendance-corrections';
      default:
        return '/notifications';
    }
  }

  /// Navigate using the GoRouter instance from Riverpod.
  void _navigateTo(String route) {
    try {
      final router = _ref?.read(routerProvider);
      router?.go(route);
    } catch (e) {
      // Router may not be available yet (e.g., during app startup)
      print('Navigation failed: $e');
    }
  }
  
  /// Show local notification.
  Future<void> _showLocalNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'default_channel',
      'Default',
      channelDescription: 'Default notification channel',
      importance: Importance.high,
      priority: Priority.high,
    );
    
    const iosDetails = DarwinNotificationDetails();
    
    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch.remainder(100000),
      title,
      body,
      details,
      payload: payload,
    );
  }
  
  NotificationType _parseNotificationType(String? type) {
    switch (type) {
      case 'RequestApproved':
        return NotificationType.requestApproved;
      case 'RequestRejected':
        return NotificationType.requestRejected;
      case 'RequestSubmitted':
        return NotificationType.requestSubmitted;
      case 'ApprovalPending':
        return NotificationType.approvalPending;
      case 'ApprovalReminder':
        return NotificationType.approvalReminder;
      case 'RequestDelegated':
        return NotificationType.requestDelegated;
      case 'RequestEscalated':
        return NotificationType.requestEscalated;
      case 'DelegationReceived':
        return NotificationType.delegationReceived;
      case 'Alert':
        return NotificationType.alert;
      default:
        return NotificationType.info;
    }
  }
  
  /// Unregister token (on logout).
  Future<void> unregister() async {
    try {
      final deviceId = await _getDeviceId();
      final dio = _ref?.read(dioProvider);
      await dio?.post(
        '/api/v1/push-tokens/unregister',
        data: {'deviceId': deviceId},
      );
    } catch (e) {
      print('Failed to unregister push token: $e');
    }
  }
}
