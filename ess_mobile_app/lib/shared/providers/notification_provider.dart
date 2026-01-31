import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/notification_model.dart';

/// Repository for notification operations.
class NotificationRepository {
  final Dio _dio;

  NotificationRepository(this._dio);

  /// Get all notifications.
  Future<List<AppNotification>> getNotifications({int page = 1, int pageSize = 20}) async {
    try {
      final response = await _dio.get(
        '/api/v1/notifications',
        queryParameters: {
          'page': page,
          'pageSize': pageSize,
        },
      );
      final List<dynamic> data = response.data['items'] ?? response.data;
      return data.map((e) => AppNotification.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get notifications');
    }
  }

  /// Mark notification as read.
  Future<void> markAsRead(String notificationId) async {
    try {
      await _dio.put('/api/v1/notifications/$notificationId/read');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to mark as read');
    }
  }

  /// Mark all notifications as read.
  Future<void> markAllAsRead() async {
    try {
      await _dio.put('/api/v1/notifications/read-all');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to mark all as read');
    }
  }

  /// Register push notification token.
  Future<void> registerPushToken(PushTokenRequest request) async {
    try {
      await _dio.post(
        '/api/v1/push-tokens/register',
        data: {
          'token': request.token,
          'platform': request.platform,
          'deviceId': request.deviceId,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to register token');
    }
  }

  /// Unregister push notification token.
  Future<void> unregisterPushToken(String deviceId) async {
    try {
      await _dio.post(
        '/api/v1/push-tokens/unregister',
        data: {'deviceId': deviceId},
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to unregister token');
    }
  }
}

/// Provider for NotificationRepository.
final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return NotificationRepository(dio);
});

/// Notification state.
class NotificationState {
  final bool isLoading;
  final String? error;
  final List<AppNotification> notifications;
  final int unreadCount;
  
  const NotificationState({
    this.isLoading = false,
    this.error,
    this.notifications = const [],
    this.unreadCount = 0,
  });
  
  NotificationState copyWith({
    bool? isLoading,
    String? error,
    List<AppNotification>? notifications,
    int? unreadCount,
  }) {
    return NotificationState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      notifications: notifications ?? this.notifications,
      unreadCount: unreadCount ?? this.unreadCount,
    );
  }
}

/// Notification notifier.
class NotificationNotifier extends StateNotifier<NotificationState> {
  final NotificationRepository _repository;
  
  NotificationNotifier(this._repository) : super(const NotificationState());
  
  /// Load notifications.
  Future<void> loadNotifications() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final notifications = await _repository.getNotifications();
      final unreadCount = notifications.where((n) => !n.isRead).length;
      
      state = state.copyWith(
        isLoading: false,
        notifications: notifications,
        unreadCount: unreadCount,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Mark single notification as read.
  Future<void> markAsRead(String notificationId) async {
    try {
      await _repository.markAsRead(notificationId);
      
      state = state.copyWith(
        notifications: state.notifications.map((n) {
          if (n.id == notificationId) {
            return AppNotification(
              id: n.id,
              title: n.title,
              message: n.message,
              type: n.type,
              createdAt: n.createdAt,
              isRead: true,
              actionUrl: n.actionUrl,
              data: n.data,
            );
          }
          return n;
        }).toList(),
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
  
  /// Mark all as read.
  Future<void> markAllAsRead() async {
    try {
      await _repository.markAllAsRead();
      
      state = state.copyWith(
        notifications: state.notifications.map((n) {
          return AppNotification(
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
            createdAt: n.createdAt,
            isRead: true,
            actionUrl: n.actionUrl,
            data: n.data,
          );
        }).toList(),
        unreadCount: 0,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
  
  /// Add new notification (from push).
  void addNotification(AppNotification notification) {
    state = state.copyWith(
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    );
  }
}

/// Provider for NotificationNotifier.
final notificationNotifierProvider = StateNotifierProvider<NotificationNotifier, NotificationState>((ref) {
  final repository = ref.watch(notificationRepositoryProvider);
  return NotificationNotifier(repository);
});

/// Provider for unread count (useful for badge).
final unreadNotificationCountProvider = Provider<int>((ref) {
  return ref.watch(notificationNotifierProvider).unreadCount;
});
