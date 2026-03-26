import 'package:freezed_annotation/freezed_annotation.dart';

part 'attendance_correction_model.freezed.dart';
part 'attendance_correction_model.g.dart';

/// Correction type matching backend AttendanceCorrectionType enum.
enum AttendanceCorrectionType {
  @JsonValue(1)
  checkIn,
  @JsonValue(2)
  checkOut,
}

/// Correction approval status matching backend CorrectionApprovalStatus enum.
enum CorrectionApprovalStatus {
  @JsonValue(1)
  pending,
  @JsonValue(2)
  approved,
  @JsonValue(3)
  rejected,
  @JsonValue(4)
  cancelled,
}

/// Attendance correction request model.
@freezed
class AttendanceCorrectionRequest with _$AttendanceCorrectionRequest {
  const factory AttendanceCorrectionRequest({
    required int id,
    required int employeeId,
    String? employeeName,
    required String correctionDate,
    required String correctionTime,
    required AttendanceCorrectionType correctionType,
    String? correctionTypeDisplay,
    required String reason,
    required CorrectionApprovalStatus approvalStatus,
    String? approvalStatusDisplay,
    String? approvedByName,
    String? approvedAt,
    String? rejectionReason,
    @Default(false) bool canBeModified,
    String? correctionSummary,
    required String createdAtUtc,
    String? workflowStatus,
    String? currentApproverName,
  }) = _AttendanceCorrectionRequest;

  factory AttendanceCorrectionRequest.fromJson(Map<String, dynamic> json) =>
      _$AttendanceCorrectionRequestFromJson(json);
}

/// Create attendance correction request payload.
@freezed
class CreateAttendanceCorrectionRequest with _$CreateAttendanceCorrectionRequest {
  const factory CreateAttendanceCorrectionRequest({
    required int employeeId,
    required String correctionDate,
    required String correctionTime,
    required int correctionType,
    required String reason,
  }) = _CreateAttendanceCorrectionRequest;

  factory CreateAttendanceCorrectionRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateAttendanceCorrectionRequestFromJson(json);
}
