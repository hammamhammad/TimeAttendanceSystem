import 'package:freezed_annotation/freezed_annotation.dart';

part 'leave_model.freezed.dart';
part 'leave_model.g.dart';

/// Leave request status.
enum LeaveStatus {
  @JsonValue(0)
  pending,
  @JsonValue(1)
  approved,
  @JsonValue(2)
  rejected,
  @JsonValue(3)
  cancelled,
}

/// Leave type.
enum LeaveType {
  @JsonValue(0)
  annual,
  @JsonValue(1)
  sick,
  @JsonValue(2)
  unpaid,
  @JsonValue(3)
  maternity,
  @JsonValue(4)
  paternity,
  @JsonValue(5)
  bereavement,
  @JsonValue(6)
  emergency,
  @JsonValue(7)
  other,
}

/// Leave request model.
@freezed
class LeaveRequest with _$LeaveRequest {
  const factory LeaveRequest({
    required String id,
    required LeaveType type,
    required DateTime startDate,
    required DateTime endDate,
    required LeaveStatus status,
    String? reason,
    String? managerNotes,
    DateTime? createdAt,
    DateTime? processedAt,
    String? processedByName,
  }) = _LeaveRequest;

  factory LeaveRequest.fromJson(Map<String, dynamic> json) =>
      _$LeaveRequestFromJson(json);
}

/// Create leave request payload.
@freezed
class CreateLeaveRequest with _$CreateLeaveRequest {
  const factory CreateLeaveRequest({
    required LeaveType type,
    required DateTime startDate,
    required DateTime endDate,
    String? reason,
  }) = _CreateLeaveRequest;

  factory CreateLeaveRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateLeaveRequestFromJson(json);
}

/// Leave balance model.
@freezed
class LeaveBalance with _$LeaveBalance {
  const factory LeaveBalance({
    required LeaveType type,
    required String typeName,
    required double totalDays,
    required double usedDays,
    required double remainingDays,
    required double pendingDays,
  }) = _LeaveBalance;

  factory LeaveBalance.fromJson(Map<String, dynamic> json) =>
      _$LeaveBalanceFromJson(json);
}

/// Leave summary response.
@freezed
class LeaveSummary with _$LeaveSummary {
  const factory LeaveSummary({
    required List<LeaveBalance> balances,
    required List<LeaveRequest> recentRequests,
  }) = _LeaveSummary;

  factory LeaveSummary.fromJson(Map<String, dynamic> json) =>
      _$LeaveSummaryFromJson(json);
}
