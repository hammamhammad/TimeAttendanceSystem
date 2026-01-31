import 'package:freezed_annotation/freezed_annotation.dart';

part 'attendance_history_model.freezed.dart';
part 'attendance_history_model.g.dart';

/// Daily attendance summary for history view.
@freezed
class DailyAttendance with _$DailyAttendance {
  const factory DailyAttendance({
    required DateTime date,
    required AttendanceStatus status,
    String? checkInTime,
    String? checkOutTime,
    int? workedMinutes,
    int? overtimeMinutes,
    int? lateMinutes,
    int? earlyLeaveMinutes,
    String? shiftName,
    String? notes,
    List<AttendanceTransaction>? transactions,
  }) = _DailyAttendance;

  factory DailyAttendance.fromJson(Map<String, dynamic> json) =>
      _$DailyAttendanceFromJson(json);
}

/// Attendance status for a day.
enum AttendanceStatus {
  @JsonValue(0)
  present,
  @JsonValue(1)
  absent,
  @JsonValue(2)
  late,
  @JsonValue(3)
  earlyLeave,
  @JsonValue(4)
  halfDay,
  @JsonValue(5)
  onLeave,
  @JsonValue(6)
  holiday,
  @JsonValue(7)
  weekend,
  @JsonValue(8)
  remoteWork,
  @JsonValue(9)
  pending,
}

/// Individual attendance transaction (check-in/out).
@freezed
class AttendanceTransaction with _$AttendanceTransaction {
  const factory AttendanceTransaction({
    required String id,
    required DateTime timestamp,
    required String type, // CheckIn, CheckOut
    double? latitude,
    double? longitude,
    String? nfcTagId,
    String? verificationMethod, // GPS, NFC, Both
    bool? isValid,
    String? invalidReason,
  }) = _AttendanceTransaction;

  factory AttendanceTransaction.fromJson(Map<String, dynamic> json) =>
      _$AttendanceTransactionFromJson(json);
}

/// Monthly attendance summary.
@freezed
class MonthlyAttendanceSummary with _$MonthlyAttendanceSummary {
  const factory MonthlyAttendanceSummary({
    required int year,
    required int month,
    required int totalWorkingDays,
    required int presentDays,
    required int absentDays,
    required int lateDays,
    required int leaveDays,
    required int holidayDays,
    required int totalWorkedMinutes,
    required int totalOvertimeMinutes,
    required double attendancePercentage,
  }) = _MonthlyAttendanceSummary;

  factory MonthlyAttendanceSummary.fromJson(Map<String, dynamic> json) =>
      _$MonthlyAttendanceSummaryFromJson(json);
}
