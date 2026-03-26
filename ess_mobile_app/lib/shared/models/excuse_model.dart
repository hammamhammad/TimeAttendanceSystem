import 'package:freezed_annotation/freezed_annotation.dart';

part 'excuse_model.freezed.dart';
part 'excuse_model.g.dart';

/// Excuse type matching backend ExcuseType enum.
enum ExcuseType {
  @JsonValue(1)
  personalExcuse,
  @JsonValue(2)
  officialDuty,
}

/// Excuse status.
enum ExcuseStatus {
  @JsonValue(0)
  pending,
  @JsonValue(1)
  approved,
  @JsonValue(2)
  rejected,
}

/// Excuse request model.
@freezed
class ExcuseRequest with _$ExcuseRequest {
  const factory ExcuseRequest({
    required String id,
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    required ExcuseStatus status,
    DateTime? requestedTime,
    DateTime? actualTime,
    int? minutesDifference,
    String? managerNotes,
    DateTime? createdAt,
    DateTime? processedAt,
  }) = _ExcuseRequest;

  factory ExcuseRequest.fromJson(Map<String, dynamic> json) =>
      _$ExcuseRequestFromJson(json);
}

/// Create excuse request payload matching backend CreateEmployeeExcuseCommand.
@freezed
class CreateExcuseRequest with _$CreateExcuseRequest {
  const factory CreateExcuseRequest({
    required int employeeId,
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    required String startTime,
    required String endTime,
    String? attachmentPath,
  }) = _CreateExcuseRequest;

  factory CreateExcuseRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateExcuseRequestFromJson(json);
}
