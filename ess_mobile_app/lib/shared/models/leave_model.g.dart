// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'leave_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$LeaveRequestImpl _$$LeaveRequestImplFromJson(Map<String, dynamic> json) =>
    _$LeaveRequestImpl(
      id: json['id'] as String,
      type: $enumDecode(_$LeaveTypeEnumMap, json['type']),
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      status: $enumDecode(_$LeaveStatusEnumMap, json['status']),
      reason: json['reason'] as String?,
      managerNotes: json['managerNotes'] as String?,
      createdAt: json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
      processedAt: json['processedAt'] == null
          ? null
          : DateTime.parse(json['processedAt'] as String),
      processedByName: json['processedByName'] as String?,
    );

Map<String, dynamic> _$$LeaveRequestImplToJson(_$LeaveRequestImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': _$LeaveTypeEnumMap[instance.type]!,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'status': _$LeaveStatusEnumMap[instance.status]!,
      'reason': instance.reason,
      'managerNotes': instance.managerNotes,
      'createdAt': instance.createdAt?.toIso8601String(),
      'processedAt': instance.processedAt?.toIso8601String(),
      'processedByName': instance.processedByName,
    };

const _$LeaveTypeEnumMap = {
  LeaveType.annual: 0,
  LeaveType.sick: 1,
  LeaveType.unpaid: 2,
  LeaveType.maternity: 3,
  LeaveType.paternity: 4,
  LeaveType.bereavement: 5,
  LeaveType.emergency: 6,
  LeaveType.other: 7,
};

const _$LeaveStatusEnumMap = {
  LeaveStatus.pending: 0,
  LeaveStatus.approved: 1,
  LeaveStatus.rejected: 2,
  LeaveStatus.cancelled: 3,
};

_$CreateLeaveRequestImpl _$$CreateLeaveRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CreateLeaveRequestImpl(
      type: $enumDecode(_$LeaveTypeEnumMap, json['type']),
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      reason: json['reason'] as String?,
    );

Map<String, dynamic> _$$CreateLeaveRequestImplToJson(
        _$CreateLeaveRequestImpl instance) =>
    <String, dynamic>{
      'type': _$LeaveTypeEnumMap[instance.type]!,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'reason': instance.reason,
    };

_$LeaveBalanceImpl _$$LeaveBalanceImplFromJson(Map<String, dynamic> json) =>
    _$LeaveBalanceImpl(
      type: $enumDecode(_$LeaveTypeEnumMap, json['type']),
      typeName: json['typeName'] as String,
      totalDays: (json['totalDays'] as num).toDouble(),
      usedDays: (json['usedDays'] as num).toDouble(),
      remainingDays: (json['remainingDays'] as num).toDouble(),
      pendingDays: (json['pendingDays'] as num).toDouble(),
    );

Map<String, dynamic> _$$LeaveBalanceImplToJson(_$LeaveBalanceImpl instance) =>
    <String, dynamic>{
      'type': _$LeaveTypeEnumMap[instance.type]!,
      'typeName': instance.typeName,
      'totalDays': instance.totalDays,
      'usedDays': instance.usedDays,
      'remainingDays': instance.remainingDays,
      'pendingDays': instance.pendingDays,
    };

_$LeaveSummaryImpl _$$LeaveSummaryImplFromJson(Map<String, dynamic> json) =>
    _$LeaveSummaryImpl(
      balances: (json['balances'] as List<dynamic>)
          .map((e) => LeaveBalance.fromJson(e as Map<String, dynamic>))
          .toList(),
      recentRequests: (json['recentRequests'] as List<dynamic>)
          .map((e) => LeaveRequest.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$LeaveSummaryImplToJson(_$LeaveSummaryImpl instance) =>
    <String, dynamic>{
      'balances': instance.balances,
      'recentRequests': instance.recentRequests,
    };
