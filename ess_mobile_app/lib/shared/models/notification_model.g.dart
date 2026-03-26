// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'notification_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AppNotificationImpl _$$AppNotificationImplFromJson(
        Map<String, dynamic> json) =>
    _$AppNotificationImpl(
      id: (json['id'] as num).toInt(),
      titleEn: json['titleEn'] as String,
      titleAr: json['titleAr'] as String?,
      messageEn: json['messageEn'] as String,
      messageAr: json['messageAr'] as String?,
      type: $enumDecodeNullable(_$NotificationTypeEnumMap, json['type']) ??
          NotificationType.info,
      isRead: json['isRead'] as bool,
      readAt: json['readAt'] == null
          ? null
          : DateTime.parse(json['readAt'] as String),
      entityType: json['entityType'] as String?,
      entityId: (json['entityId'] as num?)?.toInt(),
      actionUrl: json['actionUrl'] as String?,
      createdAtUtc: DateTime.parse(json['createdAtUtc'] as String),
    );

Map<String, dynamic> _$$AppNotificationImplToJson(
        _$AppNotificationImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'titleEn': instance.titleEn,
      'titleAr': instance.titleAr,
      'messageEn': instance.messageEn,
      'messageAr': instance.messageAr,
      'type': _$NotificationTypeEnumMap[instance.type]!,
      'isRead': instance.isRead,
      'readAt': instance.readAt?.toIso8601String(),
      'entityType': instance.entityType,
      'entityId': instance.entityId,
      'actionUrl': instance.actionUrl,
      'createdAtUtc': instance.createdAtUtc.toIso8601String(),
    };

const _$NotificationTypeEnumMap = {
  NotificationType.requestSubmitted: 0,
  NotificationType.requestApproved: 1,
  NotificationType.requestRejected: 2,
  NotificationType.requestDelegated: 3,
  NotificationType.requestEscalated: 4,
  NotificationType.approvalPending: 5,
  NotificationType.delegationReceived: 6,
  NotificationType.approvalReminder: 7,
  NotificationType.info: 8,
  NotificationType.alert: 9,
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
