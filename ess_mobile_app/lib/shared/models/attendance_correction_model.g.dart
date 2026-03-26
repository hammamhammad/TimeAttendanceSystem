// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'attendance_correction_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$AttendanceCorrectionRequestImpl _$$AttendanceCorrectionRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$AttendanceCorrectionRequestImpl(
      id: (json['id'] as num).toInt(),
      employeeId: (json['employeeId'] as num).toInt(),
      employeeName: json['employeeName'] as String?,
      correctionDate: json['correctionDate'] as String,
      correctionTime: json['correctionTime'] as String,
      correctionType: $enumDecode(
          _$AttendanceCorrectionTypeEnumMap, json['correctionType']),
      correctionTypeDisplay: json['correctionTypeDisplay'] as String?,
      reason: json['reason'] as String,
      approvalStatus: $enumDecode(
          _$CorrectionApprovalStatusEnumMap, json['approvalStatus']),
      approvalStatusDisplay: json['approvalStatusDisplay'] as String?,
      approvedByName: json['approvedByName'] as String?,
      approvedAt: json['approvedAt'] as String?,
      rejectionReason: json['rejectionReason'] as String?,
      canBeModified: json['canBeModified'] as bool? ?? false,
      correctionSummary: json['correctionSummary'] as String?,
      createdAtUtc: json['createdAtUtc'] as String,
      workflowStatus: json['workflowStatus'] as String?,
      currentApproverName: json['currentApproverName'] as String?,
    );

Map<String, dynamic> _$$AttendanceCorrectionRequestImplToJson(
        _$AttendanceCorrectionRequestImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'employeeId': instance.employeeId,
      'employeeName': instance.employeeName,
      'correctionDate': instance.correctionDate,
      'correctionTime': instance.correctionTime,
      'correctionType':
          _$AttendanceCorrectionTypeEnumMap[instance.correctionType]!,
      'correctionTypeDisplay': instance.correctionTypeDisplay,
      'reason': instance.reason,
      'approvalStatus':
          _$CorrectionApprovalStatusEnumMap[instance.approvalStatus]!,
      'approvalStatusDisplay': instance.approvalStatusDisplay,
      'approvedByName': instance.approvedByName,
      'approvedAt': instance.approvedAt,
      'rejectionReason': instance.rejectionReason,
      'canBeModified': instance.canBeModified,
      'correctionSummary': instance.correctionSummary,
      'createdAtUtc': instance.createdAtUtc,
      'workflowStatus': instance.workflowStatus,
      'currentApproverName': instance.currentApproverName,
    };

const _$AttendanceCorrectionTypeEnumMap = {
  AttendanceCorrectionType.checkIn: 1,
  AttendanceCorrectionType.checkOut: 2,
};

const _$CorrectionApprovalStatusEnumMap = {
  CorrectionApprovalStatus.pending: 1,
  CorrectionApprovalStatus.approved: 2,
  CorrectionApprovalStatus.rejected: 3,
  CorrectionApprovalStatus.cancelled: 4,
};

_$CreateAttendanceCorrectionRequestImpl
    _$$CreateAttendanceCorrectionRequestImplFromJson(
            Map<String, dynamic> json) =>
        _$CreateAttendanceCorrectionRequestImpl(
          employeeId: (json['employeeId'] as num).toInt(),
          correctionDate: json['correctionDate'] as String,
          correctionTime: json['correctionTime'] as String,
          correctionType: (json['correctionType'] as num).toInt(),
          reason: json['reason'] as String,
        );

Map<String, dynamic> _$$CreateAttendanceCorrectionRequestImplToJson(
        _$CreateAttendanceCorrectionRequestImpl instance) =>
    <String, dynamic>{
      'employeeId': instance.employeeId,
      'correctionDate': instance.correctionDate,
      'correctionTime': instance.correctionTime,
      'correctionType': instance.correctionType,
      'reason': instance.reason,
    };
