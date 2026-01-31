// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'shift_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ShiftAssignment _$ShiftAssignmentFromJson(Map<String, dynamic> json) {
  return _ShiftAssignment.fromJson(json);
}

/// @nodoc
mixin _$ShiftAssignment {
  String get id => throw _privateConstructorUsedError;
  DateTime get date => throw _privateConstructorUsedError;
  String get shiftName => throw _privateConstructorUsedError;
  String get startTime => throw _privateConstructorUsedError;
  String get endTime => throw _privateConstructorUsedError;
  String? get breakDuration => throw _privateConstructorUsedError;
  bool? get isNightShift => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;
  ShiftType? get shiftType => throw _privateConstructorUsedError;

  /// Serializes this ShiftAssignment to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ShiftAssignment
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ShiftAssignmentCopyWith<ShiftAssignment> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ShiftAssignmentCopyWith<$Res> {
  factory $ShiftAssignmentCopyWith(
          ShiftAssignment value, $Res Function(ShiftAssignment) then) =
      _$ShiftAssignmentCopyWithImpl<$Res, ShiftAssignment>;
  @useResult
  $Res call(
      {String id,
      DateTime date,
      String shiftName,
      String startTime,
      String endTime,
      String? breakDuration,
      bool? isNightShift,
      String? notes,
      ShiftType? shiftType});
}

/// @nodoc
class _$ShiftAssignmentCopyWithImpl<$Res, $Val extends ShiftAssignment>
    implements $ShiftAssignmentCopyWith<$Res> {
  _$ShiftAssignmentCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ShiftAssignment
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? date = null,
    Object? shiftName = null,
    Object? startTime = null,
    Object? endTime = null,
    Object? breakDuration = freezed,
    Object? isNightShift = freezed,
    Object? notes = freezed,
    Object? shiftType = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      date: null == date
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      shiftName: null == shiftName
          ? _value.shiftName
          : shiftName // ignore: cast_nullable_to_non_nullable
              as String,
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as String,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as String,
      breakDuration: freezed == breakDuration
          ? _value.breakDuration
          : breakDuration // ignore: cast_nullable_to_non_nullable
              as String?,
      isNightShift: freezed == isNightShift
          ? _value.isNightShift
          : isNightShift // ignore: cast_nullable_to_non_nullable
              as bool?,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
      shiftType: freezed == shiftType
          ? _value.shiftType
          : shiftType // ignore: cast_nullable_to_non_nullable
              as ShiftType?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ShiftAssignmentImplCopyWith<$Res>
    implements $ShiftAssignmentCopyWith<$Res> {
  factory _$$ShiftAssignmentImplCopyWith(_$ShiftAssignmentImpl value,
          $Res Function(_$ShiftAssignmentImpl) then) =
      __$$ShiftAssignmentImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      DateTime date,
      String shiftName,
      String startTime,
      String endTime,
      String? breakDuration,
      bool? isNightShift,
      String? notes,
      ShiftType? shiftType});
}

/// @nodoc
class __$$ShiftAssignmentImplCopyWithImpl<$Res>
    extends _$ShiftAssignmentCopyWithImpl<$Res, _$ShiftAssignmentImpl>
    implements _$$ShiftAssignmentImplCopyWith<$Res> {
  __$$ShiftAssignmentImplCopyWithImpl(
      _$ShiftAssignmentImpl _value, $Res Function(_$ShiftAssignmentImpl) _then)
      : super(_value, _then);

  /// Create a copy of ShiftAssignment
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? date = null,
    Object? shiftName = null,
    Object? startTime = null,
    Object? endTime = null,
    Object? breakDuration = freezed,
    Object? isNightShift = freezed,
    Object? notes = freezed,
    Object? shiftType = freezed,
  }) {
    return _then(_$ShiftAssignmentImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      date: null == date
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      shiftName: null == shiftName
          ? _value.shiftName
          : shiftName // ignore: cast_nullable_to_non_nullable
              as String,
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as String,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as String,
      breakDuration: freezed == breakDuration
          ? _value.breakDuration
          : breakDuration // ignore: cast_nullable_to_non_nullable
              as String?,
      isNightShift: freezed == isNightShift
          ? _value.isNightShift
          : isNightShift // ignore: cast_nullable_to_non_nullable
              as bool?,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
      shiftType: freezed == shiftType
          ? _value.shiftType
          : shiftType // ignore: cast_nullable_to_non_nullable
              as ShiftType?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ShiftAssignmentImpl implements _ShiftAssignment {
  const _$ShiftAssignmentImpl(
      {required this.id,
      required this.date,
      required this.shiftName,
      required this.startTime,
      required this.endTime,
      this.breakDuration,
      this.isNightShift,
      this.notes,
      this.shiftType});

  factory _$ShiftAssignmentImpl.fromJson(Map<String, dynamic> json) =>
      _$$ShiftAssignmentImplFromJson(json);

  @override
  final String id;
  @override
  final DateTime date;
  @override
  final String shiftName;
  @override
  final String startTime;
  @override
  final String endTime;
  @override
  final String? breakDuration;
  @override
  final bool? isNightShift;
  @override
  final String? notes;
  @override
  final ShiftType? shiftType;

  @override
  String toString() {
    return 'ShiftAssignment(id: $id, date: $date, shiftName: $shiftName, startTime: $startTime, endTime: $endTime, breakDuration: $breakDuration, isNightShift: $isNightShift, notes: $notes, shiftType: $shiftType)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ShiftAssignmentImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.shiftName, shiftName) ||
                other.shiftName == shiftName) &&
            (identical(other.startTime, startTime) ||
                other.startTime == startTime) &&
            (identical(other.endTime, endTime) || other.endTime == endTime) &&
            (identical(other.breakDuration, breakDuration) ||
                other.breakDuration == breakDuration) &&
            (identical(other.isNightShift, isNightShift) ||
                other.isNightShift == isNightShift) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            (identical(other.shiftType, shiftType) ||
                other.shiftType == shiftType));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, date, shiftName, startTime,
      endTime, breakDuration, isNightShift, notes, shiftType);

  /// Create a copy of ShiftAssignment
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ShiftAssignmentImplCopyWith<_$ShiftAssignmentImpl> get copyWith =>
      __$$ShiftAssignmentImplCopyWithImpl<_$ShiftAssignmentImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ShiftAssignmentImplToJson(
      this,
    );
  }
}

abstract class _ShiftAssignment implements ShiftAssignment {
  const factory _ShiftAssignment(
      {required final String id,
      required final DateTime date,
      required final String shiftName,
      required final String startTime,
      required final String endTime,
      final String? breakDuration,
      final bool? isNightShift,
      final String? notes,
      final ShiftType? shiftType}) = _$ShiftAssignmentImpl;

  factory _ShiftAssignment.fromJson(Map<String, dynamic> json) =
      _$ShiftAssignmentImpl.fromJson;

  @override
  String get id;
  @override
  DateTime get date;
  @override
  String get shiftName;
  @override
  String get startTime;
  @override
  String get endTime;
  @override
  String? get breakDuration;
  @override
  bool? get isNightShift;
  @override
  String? get notes;
  @override
  ShiftType? get shiftType;

  /// Create a copy of ShiftAssignment
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ShiftAssignmentImplCopyWith<_$ShiftAssignmentImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

WeeklySchedule _$WeeklyScheduleFromJson(Map<String, dynamic> json) {
  return _WeeklySchedule.fromJson(json);
}

/// @nodoc
mixin _$WeeklySchedule {
  DateTime get weekStart => throw _privateConstructorUsedError;
  DateTime get weekEnd => throw _privateConstructorUsedError;
  List<ShiftAssignment> get shifts => throw _privateConstructorUsedError;
  int get totalHours => throw _privateConstructorUsedError;

  /// Serializes this WeeklySchedule to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of WeeklySchedule
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $WeeklyScheduleCopyWith<WeeklySchedule> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $WeeklyScheduleCopyWith<$Res> {
  factory $WeeklyScheduleCopyWith(
          WeeklySchedule value, $Res Function(WeeklySchedule) then) =
      _$WeeklyScheduleCopyWithImpl<$Res, WeeklySchedule>;
  @useResult
  $Res call(
      {DateTime weekStart,
      DateTime weekEnd,
      List<ShiftAssignment> shifts,
      int totalHours});
}

/// @nodoc
class _$WeeklyScheduleCopyWithImpl<$Res, $Val extends WeeklySchedule>
    implements $WeeklyScheduleCopyWith<$Res> {
  _$WeeklyScheduleCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of WeeklySchedule
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? weekStart = null,
    Object? weekEnd = null,
    Object? shifts = null,
    Object? totalHours = null,
  }) {
    return _then(_value.copyWith(
      weekStart: null == weekStart
          ? _value.weekStart
          : weekStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      weekEnd: null == weekEnd
          ? _value.weekEnd
          : weekEnd // ignore: cast_nullable_to_non_nullable
              as DateTime,
      shifts: null == shifts
          ? _value.shifts
          : shifts // ignore: cast_nullable_to_non_nullable
              as List<ShiftAssignment>,
      totalHours: null == totalHours
          ? _value.totalHours
          : totalHours // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$WeeklyScheduleImplCopyWith<$Res>
    implements $WeeklyScheduleCopyWith<$Res> {
  factory _$$WeeklyScheduleImplCopyWith(_$WeeklyScheduleImpl value,
          $Res Function(_$WeeklyScheduleImpl) then) =
      __$$WeeklyScheduleImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {DateTime weekStart,
      DateTime weekEnd,
      List<ShiftAssignment> shifts,
      int totalHours});
}

/// @nodoc
class __$$WeeklyScheduleImplCopyWithImpl<$Res>
    extends _$WeeklyScheduleCopyWithImpl<$Res, _$WeeklyScheduleImpl>
    implements _$$WeeklyScheduleImplCopyWith<$Res> {
  __$$WeeklyScheduleImplCopyWithImpl(
      _$WeeklyScheduleImpl _value, $Res Function(_$WeeklyScheduleImpl) _then)
      : super(_value, _then);

  /// Create a copy of WeeklySchedule
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? weekStart = null,
    Object? weekEnd = null,
    Object? shifts = null,
    Object? totalHours = null,
  }) {
    return _then(_$WeeklyScheduleImpl(
      weekStart: null == weekStart
          ? _value.weekStart
          : weekStart // ignore: cast_nullable_to_non_nullable
              as DateTime,
      weekEnd: null == weekEnd
          ? _value.weekEnd
          : weekEnd // ignore: cast_nullable_to_non_nullable
              as DateTime,
      shifts: null == shifts
          ? _value._shifts
          : shifts // ignore: cast_nullable_to_non_nullable
              as List<ShiftAssignment>,
      totalHours: null == totalHours
          ? _value.totalHours
          : totalHours // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$WeeklyScheduleImpl implements _WeeklySchedule {
  const _$WeeklyScheduleImpl(
      {required this.weekStart,
      required this.weekEnd,
      required final List<ShiftAssignment> shifts,
      required this.totalHours})
      : _shifts = shifts;

  factory _$WeeklyScheduleImpl.fromJson(Map<String, dynamic> json) =>
      _$$WeeklyScheduleImplFromJson(json);

  @override
  final DateTime weekStart;
  @override
  final DateTime weekEnd;
  final List<ShiftAssignment> _shifts;
  @override
  List<ShiftAssignment> get shifts {
    if (_shifts is EqualUnmodifiableListView) return _shifts;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_shifts);
  }

  @override
  final int totalHours;

  @override
  String toString() {
    return 'WeeklySchedule(weekStart: $weekStart, weekEnd: $weekEnd, shifts: $shifts, totalHours: $totalHours)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$WeeklyScheduleImpl &&
            (identical(other.weekStart, weekStart) ||
                other.weekStart == weekStart) &&
            (identical(other.weekEnd, weekEnd) || other.weekEnd == weekEnd) &&
            const DeepCollectionEquality().equals(other._shifts, _shifts) &&
            (identical(other.totalHours, totalHours) ||
                other.totalHours == totalHours));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, weekStart, weekEnd,
      const DeepCollectionEquality().hash(_shifts), totalHours);

  /// Create a copy of WeeklySchedule
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$WeeklyScheduleImplCopyWith<_$WeeklyScheduleImpl> get copyWith =>
      __$$WeeklyScheduleImplCopyWithImpl<_$WeeklyScheduleImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$WeeklyScheduleImplToJson(
      this,
    );
  }
}

abstract class _WeeklySchedule implements WeeklySchedule {
  const factory _WeeklySchedule(
      {required final DateTime weekStart,
      required final DateTime weekEnd,
      required final List<ShiftAssignment> shifts,
      required final int totalHours}) = _$WeeklyScheduleImpl;

  factory _WeeklySchedule.fromJson(Map<String, dynamic> json) =
      _$WeeklyScheduleImpl.fromJson;

  @override
  DateTime get weekStart;
  @override
  DateTime get weekEnd;
  @override
  List<ShiftAssignment> get shifts;
  @override
  int get totalHours;

  /// Create a copy of WeeklySchedule
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$WeeklyScheduleImplCopyWith<_$WeeklyScheduleImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

ShiftDefinition _$ShiftDefinitionFromJson(Map<String, dynamic> json) {
  return _ShiftDefinition.fromJson(json);
}

/// @nodoc
mixin _$ShiftDefinition {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String get startTime => throw _privateConstructorUsedError;
  String get endTime => throw _privateConstructorUsedError;
  String? get breakDuration => throw _privateConstructorUsedError;
  bool? get isNightShift => throw _privateConstructorUsedError;
  String? get color => throw _privateConstructorUsedError;

  /// Serializes this ShiftDefinition to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ShiftDefinition
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ShiftDefinitionCopyWith<ShiftDefinition> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ShiftDefinitionCopyWith<$Res> {
  factory $ShiftDefinitionCopyWith(
          ShiftDefinition value, $Res Function(ShiftDefinition) then) =
      _$ShiftDefinitionCopyWithImpl<$Res, ShiftDefinition>;
  @useResult
  $Res call(
      {String id,
      String name,
      String startTime,
      String endTime,
      String? breakDuration,
      bool? isNightShift,
      String? color});
}

/// @nodoc
class _$ShiftDefinitionCopyWithImpl<$Res, $Val extends ShiftDefinition>
    implements $ShiftDefinitionCopyWith<$Res> {
  _$ShiftDefinitionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ShiftDefinition
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? startTime = null,
    Object? endTime = null,
    Object? breakDuration = freezed,
    Object? isNightShift = freezed,
    Object? color = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as String,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as String,
      breakDuration: freezed == breakDuration
          ? _value.breakDuration
          : breakDuration // ignore: cast_nullable_to_non_nullable
              as String?,
      isNightShift: freezed == isNightShift
          ? _value.isNightShift
          : isNightShift // ignore: cast_nullable_to_non_nullable
              as bool?,
      color: freezed == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ShiftDefinitionImplCopyWith<$Res>
    implements $ShiftDefinitionCopyWith<$Res> {
  factory _$$ShiftDefinitionImplCopyWith(_$ShiftDefinitionImpl value,
          $Res Function(_$ShiftDefinitionImpl) then) =
      __$$ShiftDefinitionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String startTime,
      String endTime,
      String? breakDuration,
      bool? isNightShift,
      String? color});
}

/// @nodoc
class __$$ShiftDefinitionImplCopyWithImpl<$Res>
    extends _$ShiftDefinitionCopyWithImpl<$Res, _$ShiftDefinitionImpl>
    implements _$$ShiftDefinitionImplCopyWith<$Res> {
  __$$ShiftDefinitionImplCopyWithImpl(
      _$ShiftDefinitionImpl _value, $Res Function(_$ShiftDefinitionImpl) _then)
      : super(_value, _then);

  /// Create a copy of ShiftDefinition
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? startTime = null,
    Object? endTime = null,
    Object? breakDuration = freezed,
    Object? isNightShift = freezed,
    Object? color = freezed,
  }) {
    return _then(_$ShiftDefinitionImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as String,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as String,
      breakDuration: freezed == breakDuration
          ? _value.breakDuration
          : breakDuration // ignore: cast_nullable_to_non_nullable
              as String?,
      isNightShift: freezed == isNightShift
          ? _value.isNightShift
          : isNightShift // ignore: cast_nullable_to_non_nullable
              as bool?,
      color: freezed == color
          ? _value.color
          : color // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ShiftDefinitionImpl implements _ShiftDefinition {
  const _$ShiftDefinitionImpl(
      {required this.id,
      required this.name,
      required this.startTime,
      required this.endTime,
      this.breakDuration,
      this.isNightShift,
      this.color});

  factory _$ShiftDefinitionImpl.fromJson(Map<String, dynamic> json) =>
      _$$ShiftDefinitionImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String startTime;
  @override
  final String endTime;
  @override
  final String? breakDuration;
  @override
  final bool? isNightShift;
  @override
  final String? color;

  @override
  String toString() {
    return 'ShiftDefinition(id: $id, name: $name, startTime: $startTime, endTime: $endTime, breakDuration: $breakDuration, isNightShift: $isNightShift, color: $color)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ShiftDefinitionImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.startTime, startTime) ||
                other.startTime == startTime) &&
            (identical(other.endTime, endTime) || other.endTime == endTime) &&
            (identical(other.breakDuration, breakDuration) ||
                other.breakDuration == breakDuration) &&
            (identical(other.isNightShift, isNightShift) ||
                other.isNightShift == isNightShift) &&
            (identical(other.color, color) || other.color == color));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, name, startTime, endTime,
      breakDuration, isNightShift, color);

  /// Create a copy of ShiftDefinition
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ShiftDefinitionImplCopyWith<_$ShiftDefinitionImpl> get copyWith =>
      __$$ShiftDefinitionImplCopyWithImpl<_$ShiftDefinitionImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ShiftDefinitionImplToJson(
      this,
    );
  }
}

abstract class _ShiftDefinition implements ShiftDefinition {
  const factory _ShiftDefinition(
      {required final String id,
      required final String name,
      required final String startTime,
      required final String endTime,
      final String? breakDuration,
      final bool? isNightShift,
      final String? color}) = _$ShiftDefinitionImpl;

  factory _ShiftDefinition.fromJson(Map<String, dynamic> json) =
      _$ShiftDefinitionImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String get startTime;
  @override
  String get endTime;
  @override
  String? get breakDuration;
  @override
  bool? get isNightShift;
  @override
  String? get color;

  /// Create a copy of ShiftDefinition
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ShiftDefinitionImplCopyWith<_$ShiftDefinitionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
