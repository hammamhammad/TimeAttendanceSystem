// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'notification_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AppNotificationImpl _$$AppNotificationImplFromJson(
        Map<String, dynamic> json) =>
    _$AppNotificationImpl(
      id: json['id'] as String,
      title: json['title'] as String,
      message: json['message'] as String,
      type: $enumDecode(_$NotificationTypeEnumMap, json['type']),
      createdAt: DateTime.parse(json['createdAt'] as String),
      isRead: json['isRead'] as bool,
      actionUrl: json['actionUrl'] as String?,
      data: json['data'] as Map<String, dynamic>?,
    );

Map<String, dynamic> _$$AppNotificationImplToJson(
        _$AppNotificationImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'message': instance.message,
      'type': _$NotificationTypeEnumMap[instance.type]!,
      'createdAt': instance.createdAt.toIso8601String(),
      'isRead': instance.isRead,
      'actionUrl': instance.actionUrl,
      'data': instance.data,
    };

const _$NotificationTypeEnumMap = {
  NotificationType.info: 0,
  NotificationType.leaveApproved: 1,
  NotificationType.leaveRejected: 2,
  NotificationType.attendanceReminder: 3,
  NotificationType.announcement: 4,
  NotificationType.alert: 5,
};

_$PushTokenRequestImpl _$$PushTokenRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$PushTokenRequestImpl(
      token: json['token'] as String,
      platform: json['platform'] as String,
      deviceId: json['deviceId'] as String,
    );

Map<String, dynamic> _$$PushTokenRequestImplToJson(
        _$PushTokenRequestImpl instance) =>
    <String, dynamic>{
      'token': instance.token,
      'platform': instance.platform,
      'deviceId': instance.deviceId,
    };
