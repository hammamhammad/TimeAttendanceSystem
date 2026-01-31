import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:device_info_plus/device_info_plus.dart';

import '../models/notification_model.dart';
import '../providers/notification_provider.dart';
import '../../core/network/api_client.dart';

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
      // Show local notification
      _showLocalNotification(
        title: notification.title ?? 'Notification',
        body: notification.body ?? '',
        payload: message.data.toString(),
      );
      
      // Add to notification list
      final appNotification = AppNotification(
        id: message.messageId ?? DateTime.now().toIso8601String(),
        title: notification.title ?? 'Notification',
        message: notification.body ?? '',
        type: _parseNotificationType(message.data['type']),
        createdAt: DateTime.now(),
        isRead: false,
        data: message.data,
      );
      
      _ref?.read(notificationNotifierProvider.notifier).addNotification(appNotification);
    }
  }
  
  /// Handle message opened (background/terminated).
  void _handleMessageOpenedApp(RemoteMessage message) {
    // Navigate based on message data
    final action = message.data['action'];
    final targetId = message.data['targetId'];
    
    // TODO: Implement navigation based on action
    print('Message opened: action=$action, targetId=$targetId');
  }
  
  /// Handle local notification tap.
  void _onNotificationTap(NotificationResponse response) {
    final payload = response.payload;
    print('Notification tapped: $payload');
    // TODO: Navigate based on payload
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
      case 'leave_approved':
        return NotificationType.leaveApproved;
      case 'leave_rejected':
        return NotificationType.leaveRejected;
      case 'attendance_reminder':
        return NotificationType.attendanceReminder;
      case 'announcement':
        return NotificationType.announcement;
      case 'alert':
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
