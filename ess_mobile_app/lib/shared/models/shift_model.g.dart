// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'shift_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ShiftAssignmentImpl _$$ShiftAssignmentImplFromJson(
        Map<String, dynamic> json) =>
    _$ShiftAssignmentImpl(
      id: json['id'] as String,
      date: DateTime.parse(json['date'] as String),
      shiftName: json['shiftName'] as String,
      startTime: json['startTime'] as String,
      endTime: json['endTime'] as String,
      breakDuration: json['breakDuration'] as String?,
      isNightShift: json['isNightShift'] as bool?,
      notes: json['notes'] as String?,
      shiftType: $enumDecodeNullable(_$ShiftTypeEnumMap, json['shiftType']),
    );

Map<String, dynamic> _$$ShiftAssignmentImplToJson(
        _$ShiftAssignmentImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'date': instance.date.toIso8601String(),
      'shiftName': instance.shiftName,
      'startTime': instance.startTime,
      'endTime': instance.endTime,
      'breakDuration': instance.breakDuration,
      'isNightShift': instance.isNightShift,
      'notes': instance.notes,
      'shiftType': _$ShiftTypeEnumMap[instance.shiftType],
    };

const _$ShiftTypeEnumMap = {
  ShiftType.regular: 0,
  ShiftType.overtime: 1,
  ShiftType.remote: 2,
  ShiftType.onCall: 3,
};

_$WeeklyScheduleImpl _$$WeeklyScheduleImplFromJson(Map<String, dynamic> json) =>
    _$WeeklyScheduleImpl(
      weekStart: DateTime.parse(json['weekStart'] as String),
      weekEnd: DateTime.parse(json['weekEnd'] as String),
      shifts: (json['shifts'] as List<dynamic>)
          .map((e) => ShiftAssignment.fromJson(e as Map<String, dynamic>))
          .toList(),
      totalHours: (json['totalHours'] as num).toInt(),
    );

Map<String, dynamic> _$$WeeklyScheduleImplToJson(
        _$WeeklyScheduleImpl instance) =>
    <String, dynamic>{
      'weekStart': instance.weekStart.toIso8601String(),
      'weekEnd': instance.weekEnd.toIso8601String(),
      'shifts': instance.shifts,
      'totalHours': instance.totalHours,
    };

_$ShiftDefinitionImpl _$$ShiftDefinitionImplFromJson(
        Map<String, dynamic> json) =>
    _$ShiftDefinitionImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      startTime: json['startTime'] as String,
      endTime: json['endTime'] as String,
      breakDuration: json['breakDuration'] as String?,
      isNightShift: json['isNightShift'] as bool?,
      color: json['color'] as String?,
    );

Map<String, dynamic> _$$ShiftDefinitionImplToJson(
        _$ShiftDefinitionImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'startTime': instance.startTime,
      'endTime': instance.endTime,
      'breakDuration': instance.breakDuration,
      'isNightShift': instance.isNightShift,
      'color': instance.color,
    };
