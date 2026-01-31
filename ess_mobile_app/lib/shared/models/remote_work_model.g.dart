// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'remote_work_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$RemoteWorkRequestImpl _$$RemoteWorkRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$RemoteWorkRequestImpl(
      id: json['id'] as String,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      reason: json['reason'] as String,
      status: $enumDecode(_$RemoteWorkStatusEnumMap, json['status']),
      workLocation: json['workLocation'] as String?,
      contactPhone: json['contactPhone'] as String?,
      managerNotes: json['managerNotes'] as String?,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      processedAt: json['processedAt'] == null
          ? null
          : DateTime.parse(json['processedAt'] as String),
      processedByName: json['processedByName'] as String?,
    );

Map<String, dynamic> _$$RemoteWorkRequestImplToJson(
        _$RemoteWorkRequestImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'reason': instance.reason,
      'status': _$RemoteWorkStatusEnumMap[instance.status]!,
      'workLocation': instance.workLocation,
      'contactPhone': instance.contactPhone,
      'managerNotes': instance.managerNotes,
      'createdAt': instance.createdAt?.toIso8601String(),
      'processedAt': instance.processedAt?.toIso8601String(),
      'processedByName': instance.processedByName,
    };

const _$RemoteWorkStatusEnumMap = {
  RemoteWorkStatus.pending: 0,
  RemoteWorkStatus.approved: 1,
  RemoteWorkStatus.rejected: 2,
  RemoteWorkStatus.cancelled: 3,
};

_$CreateRemoteWorkRequestImpl _$$CreateRemoteWorkRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CreateRemoteWorkRequestImpl(
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      reason: json['reason'] as String,
      workLocation: json['workLocation'] as String?,
      contactPhone: json['contactPhone'] as String?,
    );

Map<String, dynamic> _$$CreateRemoteWorkRequestImplToJson(
        _$CreateRemoteWorkRequestImpl instance) =>
    <String, dynamic>{
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'reason': instance.reason,
      'workLocation': instance.workLocation,
      'contactPhone': instance.contactPhone,
    };

_$RemoteWorkPolicyImpl _$$RemoteWorkPolicyImplFromJson(
        Map<String, dynamic> json) =>
    _$RemoteWorkPolicyImpl(
      maxDaysPerMonth: (json['maxDaysPerMonth'] as num).toInt(),
      maxConsecutiveDays: (json['maxConsecutiveDays'] as num).toInt(),
      requiresApproval: json['requiresApproval'] as bool,
      advanceNoticeDays: (json['advanceNoticeDays'] as num).toInt(),
      allowedDaysOfWeek: (json['allowedDaysOfWeek'] as List<dynamic>?)
          ?.map((e) => (e as num).toInt())
          .toList(),
    );

Map<String, dynamic> _$$RemoteWorkPolicyImplToJson(
        _$RemoteWorkPolicyImpl instance) =>
    <String, dynamic>{
      'maxDaysPerMonth': instance.maxDaysPerMonth,
      'maxConsecutiveDays': instance.maxConsecutiveDays,
      'requiresApproval': instance.requiresApproval,
      'advanceNoticeDays': instance.advanceNoticeDays,
      'allowedDaysOfWeek': instance.allowedDaysOfWeek,
    };
