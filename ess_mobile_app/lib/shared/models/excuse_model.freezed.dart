// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'excuse_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ExcuseRequest _$ExcuseRequestFromJson(Map<String, dynamic> json) {
  return _ExcuseRequest.fromJson(json);
}

/// @nodoc
mixin _$ExcuseRequest {
  String get id => throw _privateConstructorUsedError;
  ExcuseType get type => throw _privateConstructorUsedError;
  DateTime get excuseDate => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;
  ExcuseStatus get status => throw _privateConstructorUsedError;
  DateTime? get requestedTime => throw _privateConstructorUsedError;
  DateTime? get actualTime => throw _privateConstructorUsedError;
  int? get minutesDifference => throw _privateConstructorUsedError;
  String? get managerNotes => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get processedAt => throw _privateConstructorUsedError;

  /// Serializes this ExcuseRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of ExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $ExcuseRequestCopyWith<ExcuseRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ExcuseRequestCopyWith<$Res> {
  factory $ExcuseRequestCopyWith(
          ExcuseRequest value, $Res Function(ExcuseRequest) then) =
      _$ExcuseRequestCopyWithImpl<$Res, ExcuseRequest>;
  @useResult
  $Res call(
      {String id,
      ExcuseType type,
      DateTime excuseDate,
      String reason,
      ExcuseStatus status,
      DateTime? requestedTime,
      DateTime? actualTime,
      int? minutesDifference,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt});
}

/// @nodoc
class _$ExcuseRequestCopyWithImpl<$Res, $Val extends ExcuseRequest>
    implements $ExcuseRequestCopyWith<$Res> {
  _$ExcuseRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of ExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? excuseDate = null,
    Object? reason = null,
    Object? status = null,
    Object? requestedTime = freezed,
    Object? actualTime = freezed,
    Object? minutesDifference = freezed,
    Object? managerNotes = freezed,
    Object? createdAt = freezed,
    Object? processedAt = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as ExcuseType,
      excuseDate: null == excuseDate
          ? _value.excuseDate
          : excuseDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ExcuseStatus,
      requestedTime: freezed == requestedTime
          ? _value.requestedTime
          : requestedTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      actualTime: freezed == actualTime
          ? _value.actualTime
          : actualTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      minutesDifference: freezed == minutesDifference
          ? _value.minutesDifference
          : minutesDifference // ignore: cast_nullable_to_non_nullable
              as int?,
      managerNotes: freezed == managerNotes
          ? _value.managerNotes
          : managerNotes // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      processedAt: freezed == processedAt
          ? _value.processedAt
          : processedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ExcuseRequestImplCopyWith<$Res>
    implements $ExcuseRequestCopyWith<$Res> {
  factory _$$ExcuseRequestImplCopyWith(
          _$ExcuseRequestImpl value, $Res Function(_$ExcuseRequestImpl) then) =
      __$$ExcuseRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      ExcuseType type,
      DateTime excuseDate,
      String reason,
      ExcuseStatus status,
      DateTime? requestedTime,
      DateTime? actualTime,
      int? minutesDifference,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt});
}

/// @nodoc
class __$$ExcuseRequestImplCopyWithImpl<$Res>
    extends _$ExcuseRequestCopyWithImpl<$Res, _$ExcuseRequestImpl>
    implements _$$ExcuseRequestImplCopyWith<$Res> {
  __$$ExcuseRequestImplCopyWithImpl(
      _$ExcuseRequestImpl _value, $Res Function(_$ExcuseRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of ExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? excuseDate = null,
    Object? reason = null,
    Object? status = null,
    Object? requestedTime = freezed,
    Object? actualTime = freezed,
    Object? minutesDifference = freezed,
    Object? managerNotes = freezed,
    Object? createdAt = freezed,
    Object? processedAt = freezed,
  }) {
    return _then(_$ExcuseRequestImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as ExcuseType,
      excuseDate: null == excuseDate
          ? _value.excuseDate
          : excuseDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as ExcuseStatus,
      requestedTime: freezed == requestedTime
          ? _value.requestedTime
          : requestedTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      actualTime: freezed == actualTime
          ? _value.actualTime
          : actualTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      minutesDifference: freezed == minutesDifference
          ? _value.minutesDifference
          : minutesDifference // ignore: cast_nullable_to_non_nullable
              as int?,
      managerNotes: freezed == managerNotes
          ? _value.managerNotes
          : managerNotes // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAt: freezed == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      processedAt: freezed == processedAt
          ? _value.processedAt
          : processedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ExcuseRequestImpl implements _ExcuseRequest {
  const _$ExcuseRequestImpl(
      {required this.id,
      required this.type,
      required this.excuseDate,
      required this.reason,
      required this.status,
      this.requestedTime,
      this.actualTime,
      this.minutesDifference,
      this.managerNotes,
      this.createdAt,
      this.processedAt});

  factory _$ExcuseRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$ExcuseRequestImplFromJson(json);

  @override
  final String id;
  @override
  final ExcuseType type;
  @override
  final DateTime excuseDate;
  @override
  final String reason;
  @override
  final ExcuseStatus status;
  @override
  final DateTime? requestedTime;
  @override
  final DateTime? actualTime;
  @override
  final int? minutesDifference;
  @override
  final String? managerNotes;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? processedAt;

  @override
  String toString() {
    return 'ExcuseRequest(id: $id, type: $type, excuseDate: $excuseDate, reason: $reason, status: $status, requestedTime: $requestedTime, actualTime: $actualTime, minutesDifference: $minutesDifference, managerNotes: $managerNotes, createdAt: $createdAt, processedAt: $processedAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ExcuseRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.excuseDate, excuseDate) ||
                other.excuseDate == excuseDate) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.requestedTime, requestedTime) ||
                other.requestedTime == requestedTime) &&
            (identical(other.actualTime, actualTime) ||
                other.actualTime == actualTime) &&
            (identical(other.minutesDifference, minutesDifference) ||
                other.minutesDifference == minutesDifference) &&
            (identical(other.managerNotes, managerNotes) ||
                other.managerNotes == managerNotes) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.processedAt, processedAt) ||
                other.processedAt == processedAt));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      type,
      excuseDate,
      reason,
      status,
      requestedTime,
      actualTime,
      minutesDifference,
      managerNotes,
      createdAt,
      processedAt);

  /// Create a copy of ExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$ExcuseRequestImplCopyWith<_$ExcuseRequestImpl> get copyWith =>
      __$$ExcuseRequestImplCopyWithImpl<_$ExcuseRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ExcuseRequestImplToJson(
      this,
    );
  }
}

abstract class _ExcuseRequest implements ExcuseRequest {
  const factory _ExcuseRequest(
      {required final String id,
      required final ExcuseType type,
      required final DateTime excuseDate,
      required final String reason,
      required final ExcuseStatus status,
      final DateTime? requestedTime,
      final DateTime? actualTime,
      final int? minutesDifference,
      final String? managerNotes,
      final DateTime? createdAt,
      final DateTime? processedAt}) = _$ExcuseRequestImpl;

  factory _ExcuseRequest.fromJson(Map<String, dynamic> json) =
      _$ExcuseRequestImpl.fromJson;

  @override
  String get id;
  @override
  ExcuseType get type;
  @override
  DateTime get excuseDate;
  @override
  String get reason;
  @override
  ExcuseStatus get status;
  @override
  DateTime? get requestedTime;
  @override
  DateTime? get actualTime;
  @override
  int? get minutesDifference;
  @override
  String? get managerNotes;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get processedAt;

  /// Create a copy of ExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$ExcuseRequestImplCopyWith<_$ExcuseRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CreateExcuseRequest _$CreateExcuseRequestFromJson(Map<String, dynamic> json) {
  return _CreateExcuseRequest.fromJson(json);
}

/// @nodoc
mixin _$CreateExcuseRequest {
  ExcuseType get type => throw _privateConstructorUsedError;
  DateTime get excuseDate => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;
  DateTime? get requestedTime => throw _privateConstructorUsedError;

  /// Serializes this CreateExcuseRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateExcuseRequestCopyWith<CreateExcuseRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateExcuseRequestCopyWith<$Res> {
  factory $CreateExcuseRequestCopyWith(
          CreateExcuseRequest value, $Res Function(CreateExcuseRequest) then) =
      _$CreateExcuseRequestCopyWithImpl<$Res, CreateExcuseRequest>;
  @useResult
  $Res call(
      {ExcuseType type,
      DateTime excuseDate,
      String reason,
      DateTime? requestedTime});
}

/// @nodoc
class _$CreateExcuseRequestCopyWithImpl<$Res, $Val extends CreateExcuseRequest>
    implements $CreateExcuseRequestCopyWith<$Res> {
  _$CreateExcuseRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? excuseDate = null,
    Object? reason = null,
    Object? requestedTime = freezed,
  }) {
    return _then(_value.copyWith(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as ExcuseType,
      excuseDate: null == excuseDate
          ? _value.excuseDate
          : excuseDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      requestedTime: freezed == requestedTime
          ? _value.requestedTime
          : requestedTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CreateExcuseRequestImplCopyWith<$Res>
    implements $CreateExcuseRequestCopyWith<$Res> {
  factory _$$CreateExcuseRequestImplCopyWith(_$CreateExcuseRequestImpl value,
          $Res Function(_$CreateExcuseRequestImpl) then) =
      __$$CreateExcuseRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {ExcuseType type,
      DateTime excuseDate,
      String reason,
      DateTime? requestedTime});
}

/// @nodoc
class __$$CreateExcuseRequestImplCopyWithImpl<$Res>
    extends _$CreateExcuseRequestCopyWithImpl<$Res, _$CreateExcuseRequestImpl>
    implements _$$CreateExcuseRequestImplCopyWith<$Res> {
  __$$CreateExcuseRequestImplCopyWithImpl(_$CreateExcuseRequestImpl _value,
      $Res Function(_$CreateExcuseRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CreateExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? excuseDate = null,
    Object? reason = null,
    Object? requestedTime = freezed,
  }) {
    return _then(_$CreateExcuseRequestImpl(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as ExcuseType,
      excuseDate: null == excuseDate
          ? _value.excuseDate
          : excuseDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      requestedTime: freezed == requestedTime
          ? _value.requestedTime
          : requestedTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateExcuseRequestImpl implements _CreateExcuseRequest {
  const _$CreateExcuseRequestImpl(
      {required this.type,
      required this.excuseDate,
      required this.reason,
      this.requestedTime});

  factory _$CreateExcuseRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateExcuseRequestImplFromJson(json);

  @override
  final ExcuseType type;
  @override
  final DateTime excuseDate;
  @override
  final String reason;
  @override
  final DateTime? requestedTime;

  @override
  String toString() {
    return 'CreateExcuseRequest(type: $type, excuseDate: $excuseDate, reason: $reason, requestedTime: $requestedTime)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateExcuseRequestImpl &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.excuseDate, excuseDate) ||
                other.excuseDate == excuseDate) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.requestedTime, requestedTime) ||
                other.requestedTime == requestedTime));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, type, excuseDate, reason, requestedTime);

  /// Create a copy of CreateExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateExcuseRequestImplCopyWith<_$CreateExcuseRequestImpl> get copyWith =>
      __$$CreateExcuseRequestImplCopyWithImpl<_$CreateExcuseRequestImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateExcuseRequestImplToJson(
      this,
    );
  }
}

abstract class _CreateExcuseRequest implements CreateExcuseRequest {
  const factory _CreateExcuseRequest(
      {required final ExcuseType type,
      required final DateTime excuseDate,
      required final String reason,
      final DateTime? requestedTime}) = _$CreateExcuseRequestImpl;

  factory _CreateExcuseRequest.fromJson(Map<String, dynamic> json) =
      _$CreateExcuseRequestImpl.fromJson;

  @override
  ExcuseType get type;
  @override
  DateTime get excuseDate;
  @override
  String get reason;
  @override
  DateTime? get requestedTime;

  /// Create a copy of CreateExcuseRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateExcuseRequestImplCopyWith<_$CreateExcuseRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
