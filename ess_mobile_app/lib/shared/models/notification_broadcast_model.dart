import 'package:freezed_annotation/freezed_annotation.dart';

part 'notification_broadcast_model.freezed.dart';
part 'notification_broadcast_model.g.dart';

/// Broadcast target type.
enum BroadcastTargetType {
  @JsonValue(0)
  all,
  @JsonValue(1)
  branch,
  @JsonValue(2)
  department,
  @JsonValue(3)
  individual,
}

/// Notification broadcast model.
@freezed
class NotificationBroadcast with _$NotificationBroadcast {
  const factory NotificationBroadcast({
    required String id,
    required String title,
    required String message,
    required BroadcastTargetType targetType,
    String? targetId,
    String? targetName,
    int? recipientCount,
    int? deliveredCount,
    int? readCount,
    DateTime? sentAt,
    String? sentByName,
  }) = _NotificationBroadcast;

  factory NotificationBroadcast.fromJson(Map<String, dynamic> json) =>
      _$NotificationBroadcastFromJson(json);
}

/// Create broadcast request.
@freezed
class CreateBroadcastRequest with _$CreateBroadcastRequest {
  const factory CreateBroadcastRequest({
    required String title,
    required String message,
    required BroadcastTargetType targetType,
    String? targetId,
    bool? sendPush,
  }) = _CreateBroadcastRequest;

  factory CreateBroadcastRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateBroadcastRequestFromJson(json);
}
