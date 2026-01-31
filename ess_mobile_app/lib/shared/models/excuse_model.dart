import 'package:freezed_annotation/freezed_annotation.dart';

part 'excuse_model.freezed.dart';
part 'excuse_model.g.dart';

/// Excuse type.
enum ExcuseType {
  @JsonValue(0)
  lateArrival,
  @JsonValue(1)
  earlyDeparture,
  @JsonValue(2)
  missedPunch,
  @JsonValue(3)
  other,
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

/// Create excuse request payload.
@freezed
class CreateExcuseRequest with _$CreateExcuseRequest {
  const factory CreateExcuseRequest({
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    DateTime? requestedTime,
  }) = _CreateExcuseRequest;

  factory CreateExcuseRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateExcuseRequestFromJson(json);
}
