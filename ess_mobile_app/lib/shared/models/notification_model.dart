import 'package:freezed_annotation/freezed_annotation.dart';

part 'notification_model.freezed.dart';
part 'notification_model.g.dart';

/// Notification type matching backend NotificationType enum.
enum NotificationType {
  @JsonValue(0)
  requestSubmitted,
  @JsonValue(1)
  requestApproved,
  @JsonValue(2)
  requestRejected,
  @JsonValue(3)
  requestDelegated,
  @JsonValue(4)
  requestEscalated,
  @JsonValue(5)
  approvalPending,
  @JsonValue(6)
  delegationReceived,
  @JsonValue(7)
  approvalReminder,
  @JsonValue(8)
  info,
  @JsonValue(9)
  alert,
}

/// In-app notification model matching backend NotificationDto.
@freezed
class AppNotification with _$AppNotification {
  const factory AppNotification({
    required int id,
    required String titleEn,
    String? titleAr,
    required String messageEn,
    String? messageAr,
    @Default(NotificationType.info) NotificationType type,
    required bool isRead,
    DateTime? readAt,
    String? entityType,
    int? entityId,
    String? actionUrl,
    required DateTime createdAtUtc,
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
