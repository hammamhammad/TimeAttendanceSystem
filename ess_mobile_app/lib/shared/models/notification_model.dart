import 'package:freezed_annotation/freezed_annotation.dart';

part 'notification_model.freezed.dart';
part 'notification_model.g.dart';

/// Notification type.
enum NotificationType {
  @JsonValue(0)
  info,
  @JsonValue(1)
  leaveApproved,
  @JsonValue(2)
  leaveRejected,
  @JsonValue(3)
  attendanceReminder,
  @JsonValue(4)
  announcement,
  @JsonValue(5)
  alert,
}

/// In-app notification model.
@freezed
class AppNotification with _$AppNotification {
  const factory AppNotification({
    required String id,
    required String title,
    required String message,
    required NotificationType type,
    required DateTime createdAt,
    required bool isRead,
    String? actionUrl,
    Map<String, dynamic>? data,
  }) = _AppNotification;

  factory AppNotification.fromJson(Map<String, dynamic> json) =>
      _$AppNotificationFromJson(json);
}

/// Push notification registration.
@freezed
class PushTokenRequest with _$PushTokenRequest {
  const factory PushTokenRequest({
    required String token,
    required String platform,
    required String deviceId,
  }) = _PushTokenRequest;

  factory PushTokenRequest.fromJson(Map<String, dynamic> json) =>
      _$PushTokenRequestFromJson(json);
}
