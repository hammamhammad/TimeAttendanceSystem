// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'attendance_history_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$DailyAttendanceImpl _$$DailyAttendanceImplFromJson(
        Map<String, dynamic> json) =>
    _$DailyAttendanceImpl(
      date: DateTime.parse(json['date'] as String),
      status: $enumDecode(_$AttendanceStatusEnumMap, json['status']),
      checkInTime: json['checkInTime'] as String?,
      checkOutTime: json['checkOutTime'] as String?,
      workedMinutes: (json['workedMinutes'] as num?)?.toInt(),
      overtimeMinutes: (json['overtimeMinutes'] as num?)?.toInt(),
      lateMinutes: (json['lateMinutes'] as num?)?.toInt(),
      earlyLeaveMinutes: (json['earlyLeaveMinutes'] as num?)?.toInt(),
      shiftName: json['shiftName'] as String?,
      notes: json['notes'] as String?,
      transactions: (json['transactions'] as List<dynamic>?)
          ?.map(
              (e) => AttendanceTransaction.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$$DailyAttendanceImplToJson(
        _$DailyAttendanceImpl instance) =>
    <String, dynamic>{
      'date': instance.date.toIso8601String(),
      'status': _$AttendanceStatusEnumMap[instance.status]!,
      'checkInTime': instance.checkInTime,
      'checkOutTime': instance.checkOutTime,
      'workedMinutes': instance.workedMinutes,
      'overtimeMinutes': instance.overtimeMinutes,
      'lateMinutes': instance.lateMinutes,
      'earlyLeaveMinutes': instance.earlyLeaveMinutes,
      'shiftName': instance.shiftName,
      'notes': instance.notes,
      'transactions': instance.transactions,
    };

const _$AttendanceStatusEnumMap = {
  AttendanceStatus.present: 0,
  AttendanceStatus.absent: 1,
  AttendanceStatus.late: 2,
  AttendanceStatus.earlyLeave: 3,
  AttendanceStatus.halfDay: 4,
  AttendanceStatus.onLeave: 5,
  AttendanceStatus.holiday: 6,
  AttendanceStatus.weekend: 7,
  AttendanceStatus.remoteWork: 8,
  AttendanceStatus.pending: 9,
};

_$AttendanceTransactionImpl _$$AttendanceTransactionImplFromJson(
        Map<String, dynamic> json) =>
    _$AttendanceTransactionImpl(
      id: json['id'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      type: json['type'] as String,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      nfcTagId: json['nfcTagId'] as String?,
      verificationMethod: json['verificationMethod'] as String?,
      isValid: json['isValid'] as bool?,
      invalidReason: json['invalidReason'] as String?,
    );

Map<String, dynamic> _$$AttendanceTransactionImplToJson(
        _$AttendanceTransactionImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'timestamp': instance.timestamp.toIso8601String(),
      'type': instance.type,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'nfcTagId': instance.nfcTagId,
      'verificationMethod': instance.verificationMethod,
      'isValid': instance.isValid,
      'invalidReason': instance.invalidReason,
    };

_$MonthlyAttendanceSummaryImpl _$$MonthlyAttendanceSummaryImplFromJson(
        Map<String, dynamic> json) =>
    _$MonthlyAttendanceSummaryImpl(
      year: (json['year'] as num).toInt(),
      month: (json['month'] as num).toInt(),
      totalWorkingDays: (json['totalWorkingDays'] as num).toInt(),
      presentDays: (json['presentDays'] as num).toInt(),
      absentDays: (json['absentDays'] as num).toInt(),
      lateDays: (json['lateDays'] as num).toInt(),
      leaveDays: (json['leaveDays'] as num).toInt(),
      holidayDays: (json['holidayDays'] as num).toInt(),
      totalWorkedMinutes: (json['totalWorkedMinutes'] as num).toInt(),
      totalOvertimeMinutes: (json['totalOvertimeMinutes'] as num).toInt(),
      attendancePercentage: (json['attendancePercentage'] as num).toDouble(),
    );

Map<String, dynamic> _$$MonthlyAttendanceSummaryImplToJson(
        _$MonthlyAttendanceSummaryImpl instance) =>
    <String, dynamic>{
      'year': instance.year,
      'month': instance.month,
      'totalWorkingDays': instance.totalWorkingDays,
      'presentDays': instance.presentDays,
      'absentDays': instance.absentDays,
      'lateDays': instance.lateDays,
      'leaveDays': instance.leaveDays,
      'holidayDays': instance.holidayDays,
      'totalWorkedMinutes': instance.totalWorkedMinutes,
      'totalOvertimeMinutes': instance.totalOvertimeMinutes,
      'attendancePercentage': instance.attendancePercentage,
    };
