// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'leave_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$LeaveRequestImpl _$$LeaveRequestImplFromJson(Map<String, dynamic> json) =>
    _$LeaveRequestImpl(
      id: (json['id'] as num).toInt(),
      vacationTypeId: (json['vacationTypeId'] as num?)?.toInt(),
      vacationTypeName: json['vacationTypeName'] as String?,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      status: _parseLeaveStatus(json['workflowStatus']),
      reason: json['notes'] as String?,
      employeeId: (json['employeeId'] as num?)?.toInt(),
      employeeName: json['employeeName'] as String?,
      totalDays: (json['totalDays'] as num?)?.toInt(),
      businessDays: (json['businessDays'] as num?)?.toInt(),
      createdAtUtc: json['createdAtUtc'] == null
          ? null
          : DateTime.parse(json['createdAtUtc'] as String),
      createdBy: json['createdBy'] as String?,
      currentApproverName: json['currentApproverName'] as String?,
      workflowInstanceId: (json['workflowInstanceId'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$LeaveRequestImplToJson(_$LeaveRequestImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'vacationTypeId': instance.vacationTypeId,
      'vacationTypeName': instance.vacationTypeName,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'workflowStatus': _leaveStatusToJson(instance.status),
      'notes': instance.reason,
      'employeeId': instance.employeeId,
      'employeeName': instance.employeeName,
      'totalDays': instance.totalDays,
      'businessDays': instance.businessDays,
      'createdAtUtc': instance.createdAtUtc?.toIso8601String(),
      'createdBy': instance.createdBy,
      'currentApproverName': instance.currentApproverName,
      'workflowInstanceId': instance.workflowInstanceId,
    };

_$CreateLeaveRequestImpl _$$CreateLeaveRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CreateLeaveRequestImpl(
      employeeId: (json['employeeId'] as num).toInt(),
      vacationTypeId: (json['vacationTypeId'] as num).toInt(),
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      notes: json['notes'] as String?,
    );

Map<String, dynamic> _$$CreateLeaveRequestImplToJson(
        _$CreateLeaveRequestImpl instance) =>
    <String, dynamic>{
      'employeeId': instance.employeeId,
      'vacationTypeId': instance.vacationTypeId,
      'startDate': instance.startDate.toIso8601String(),
      'endDate': instance.endDate.toIso8601String(),
      'notes': instance.notes,
    };

_$VacationTypeImpl _$$VacationTypeImplFromJson(Map<String, dynamic> json) =>
    _$VacationTypeImpl(
      id: (json['id'] as num).toInt(),
      name: json['name'] as String,
    );

Map<String, dynamic> _$$VacationTypeImplToJson(_$VacationTypeImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };
