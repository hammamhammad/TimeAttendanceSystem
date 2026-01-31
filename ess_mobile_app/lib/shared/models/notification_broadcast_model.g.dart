// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'notification_broadcast_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$NotificationBroadcastImpl _$$NotificationBroadcastImplFromJson(
        Map<String, dynamic> json) =>
    _$NotificationBroadcastImpl(
      id: json['id'] as String,
      title: json['title'] as String,
      message: json['message'] as String,
      targetType: $enumDecode(_$BroadcastTargetTypeEnumMap, json['targetType']),
      targetId: json['targetId'] as String?,
      targetName: json['targetName'] as String?,
      recipientCount: (json['recipientCount'] as num?)?.toInt(),
      deliveredCount: (json['deliveredCount'] as num?)?.toInt(),
      readCount: (json['readCount'] as num?)?.toInt(),
      sentAt: json['sentAt'] == null
          ? null
          : DateTime.parse(json['sentAt'] as String),
      sentByName: json['sentByName'] as String?,
    );

Map<String, dynamic> _$$NotificationBroadcastImplToJson(
        _$NotificationBroadcastImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'message': instance.message,
      'targetType': _$BroadcastTargetTypeEnumMap[instance.targetType]!,
      'targetId': instance.targetId,
      'targetName': instance.targetName,
      'recipientCount': instance.recipientCount,
      'deliveredCount': instance.deliveredCount,
      'readCount': instance.readCount,
      'sentAt': instance.sentAt?.toIso8601String(),
      'sentByName': instance.sentByName,
    };

const _$BroadcastTargetTypeEnumMap = {
  BroadcastTargetType.all: 0,
  BroadcastTargetType.branch: 1,
  BroadcastTargetType.department: 2,
  BroadcastTargetType.individual: 3,
};

_$CreateBroadcastRequestImpl _$$CreateBroadcastRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CreateBroadcastRequestImpl(
      title: json['title'] as String,
      message: json['message'] as String,
      targetType: $enumDecode(_$BroadcastTargetTypeEnumMap, json['targetType']),
      targetId: json['targetId'] as String?,
      sendPush: json['sendPush'] as bool?,
    );

Map<String, dynamic> _$$CreateBroadcastRequestImplToJson(
        _$CreateBroadcastRequestImpl instance) =>
    <String, dynamic>{
      'title': instance.title,
      'message': instance.message,
      'targetType': _$BroadcastTargetTypeEnumMap[instance.targetType]!,
      'targetId': instance.targetId,
      'sendPush': instance.sendPush,
    };
