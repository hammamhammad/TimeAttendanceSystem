// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'excuse_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ExcuseRequestImpl _$$ExcuseRequestImplFromJson(Map<String, dynamic> json) =>
    _$ExcuseRequestImpl(
      id: json['id'] as String,
      type: $enumDecode(_$ExcuseTypeEnumMap, json['type']),
      excuseDate: DateTime.parse(json['excuseDate'] as String),
      reason: json['reason'] as String,
      status: $enumDecode(_$ExcuseStatusEnumMap, json['status']),
      requestedTime: json['requestedTime'] == null
          ? null
          : DateTime.parse(json['requestedTime'] as String),
      actualTime: json['actualTime'] == null
          ? null
          : DateTime.parse(json['actualTime'] as String),
      minutesDifference: (json['minutesDifference'] as num?)?.toInt(),
      managerNotes: json['managerNotes'] as String?,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      processedAt: json['processedAt'] == null
          ? null
          : DateTime.parse(json['processedAt'] as String),
    );

Map<String, dynamic> _$$ExcuseRequestImplToJson(_$ExcuseRequestImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': _$ExcuseTypeEnumMap[instance.type]!,
      'excuseDate': instance.excuseDate.toIso8601String(),
      'reason': instance.reason,
      'status': _$ExcuseStatusEnumMap[instance.status]!,
      'requestedTime': instance.requestedTime?.toIso8601String(),
      'actualTime': instance.actualTime?.toIso8601String(),
      'minutesDifference': instance.minutesDifference,
      'managerNotes': instance.managerNotes,
      'createdAt': instance.createdAt?.toIso8601String(),
      'processedAt': instance.processedAt?.toIso8601String(),
    };

const _$ExcuseTypeEnumMap = {
  ExcuseType.lateArrival: 0,
  ExcuseType.earlyDeparture: 1,
  ExcuseType.missedPunch: 2,
  ExcuseType.other: 3,
};

const _$ExcuseStatusEnumMap = {
  ExcuseStatus.pending: 0,
  ExcuseStatus.approved: 1,
  ExcuseStatus.rejected: 2,
};

_$CreateExcuseRequestImpl _$$CreateExcuseRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CreateExcuseRequestImpl(
      type: $enumDecode(_$ExcuseTypeEnumMap, json['type']),
      excuseDate: DateTime.parse(json['excuseDate'] as String),
      reason: json['reason'] as String,
      requestedTime: json['requestedTime'] == null
          ? null
          : DateTime.parse(json['requestedTime'] as String),
    );

Map<String, dynamic> _$$CreateExcuseRequestImplToJson(
        _$CreateExcuseRequestImpl instance) =>
    <String, dynamic>{
      'type': _$ExcuseTypeEnumMap[instance.type]!,
      'excuseDate': instance.excuseDate.toIso8601String(),
      'reason': instance.reason,
      'requestedTime': instance.requestedTime?.toIso8601String(),
    };
