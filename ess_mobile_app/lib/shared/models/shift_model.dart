import 'package:freezed_annotation/freezed_annotation.dart';

part 'shift_model.freezed.dart';
part 'shift_model.g.dart';

/// Shift assignment for an employee.
@freezed
class ShiftAssignment with _$ShiftAssignment {
  const factory ShiftAssignment({
    required String id,
    required DateTime date,
    required String shiftName,
    required String startTime,
    required String endTime,
    String? breakDuration,
    bool? isNightShift,
    String? notes,
    ShiftType? shiftType,
  }) = _ShiftAssignment;

  factory ShiftAssignment.fromJson(Map<String, dynamic> json) =>
      _$ShiftAssignmentFromJson(json);
}

/// Shift type enum.
enum ShiftType {
  @JsonValue(0)
  regular,
  @JsonValue(1)
  overtime,
  @JsonValue(2)
  remote,
  @JsonValue(3)
  onCall,
}

/// Weekly schedule.
@freezed
class WeeklySchedule with _$WeeklySchedule {
  const factory WeeklySchedule({
    required DateTime weekStart,
    required DateTime weekEnd,
    required List<ShiftAssignment> shifts,
    required int totalHours,
  }) = _WeeklySchedule;

  factory WeeklySchedule.fromJson(Map<String, dynamic> json) =>
      _$WeeklyScheduleFromJson(json);
}

/// Shift definition.
@freezed
class ShiftDefinition with _$ShiftDefinition {
  const factory ShiftDefinition({
    required String id,
    required String name,
    required String startTime,
    required String endTime,
    String? breakDuration,
    bool? isNightShift,
    String? color,
  }) = _ShiftDefinition;

  factory ShiftDefinition.fromJson(Map<String, dynamic> json) =>
      _$ShiftDefinitionFromJson(json);
}
