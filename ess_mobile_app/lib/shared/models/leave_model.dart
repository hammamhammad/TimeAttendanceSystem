import 'package:freezed_annotation/freezed_annotation.dart';

part 'leave_model.freezed.dart';
part 'leave_model.g.dart';

/// Leave request status.
enum LeaveStatus {
  pending,
  approved,
  rejected,
  cancelled,
}

/// Parse workflow status string from backend to LeaveStatus enum.
LeaveStatus _parseLeaveStatus(dynamic value) {
  if (value == null) return LeaveStatus.pending;
  final str = value.toString().toLowerCase();
  switch (str) {
    case 'approved':
      return LeaveStatus.approved;
    case 'rejected':
      return LeaveStatus.rejected;
    case 'cancelled':
    case 'canceled':
      return LeaveStatus.cancelled;
    default:
      return LeaveStatus.pending;
  }
}

String _leaveStatusToJson(LeaveStatus status) {
  return status.name[0].toUpperCase() + status.name.substring(1);
}

/// Leave request model matching backend EmployeeVacationDto.
@freezed
class LeaveRequest with _$LeaveRequest {
  const factory LeaveRequest({
    required int id,
    int? vacationTypeId,
    String? vacationTypeName,
    required DateTime startDate,
    required DateTime endDate,
    @JsonKey(name: 'workflowStatus', fromJson: _parseLeaveStatus, toJson: _leaveStatusToJson)
    required LeaveStatus status,
    @JsonKey(name: 'notes')
    String? reason,
    int? employeeId,
    String? employeeName,
    int? totalDays,
    int? businessDays,
    DateTime? createdAtUtc,
    String? createdBy,
    String? currentApproverName,
    int? workflowInstanceId,
  }) = _LeaveRequest;

  factory LeaveRequest.fromJson(Map<String, dynamic> json) =>
      _$LeaveRequestFromJson(json);
}

/// Create leave request payload matching backend CreateEmployeeVacationCommand.
@freezed
class CreateLeaveRequest with _$CreateLeaveRequest {
  const factory CreateLeaveRequest({
    required int employeeId,
    required int vacationTypeId,
    required DateTime startDate,
    required DateTime endDate,
    String? notes,
  }) = _CreateLeaveRequest;

  factory CreateLeaveRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateLeaveRequestFromJson(json);
}

/// Vacation type for dropdown selection.
@freezed
class VacationType with _$VacationType {
  const factory VacationType({
    required int id,
    required String name,
  }) = _VacationType;

  factory VacationType.fromJson(Map<String, dynamic> json) =>
      _$VacationTypeFromJson(json);
}
