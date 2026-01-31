// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'leave_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

LeaveRequest _$LeaveRequestFromJson(Map<String, dynamic> json) {
  return _LeaveRequest.fromJson(json);
}

/// @nodoc
mixin _$LeaveRequest {
  String get id => throw _privateConstructorUsedError;
  LeaveType get type => throw _privateConstructorUsedError;
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  LeaveStatus get status => throw _privateConstructorUsedError;
  String? get reason => throw _privateConstructorUsedError;
  String? get managerNotes => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get processedAt => throw _privateConstructorUsedError;
  String? get processedByName => throw _privateConstructorUsedError;

  /// Serializes this LeaveRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LeaveRequestCopyWith<LeaveRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LeaveRequestCopyWith<$Res> {
  factory $LeaveRequestCopyWith(
          LeaveRequest value, $Res Function(LeaveRequest) then) =
      _$LeaveRequestCopyWithImpl<$Res, LeaveRequest>;
  @useResult
  $Res call(
      {String id,
      LeaveType type,
      DateTime startDate,
      DateTime endDate,
      LeaveStatus status,
      String? reason,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt,
      String? processedByName});
}

/// @nodoc
class _$LeaveRequestCopyWithImpl<$Res, $Val extends LeaveRequest>
    implements $LeaveRequestCopyWith<$Res> {
  _$LeaveRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? status = null,
    Object? reason = freezed,
    Object? managerNotes = freezed,
    Object? createdAt = freezed,
    Object? processedAt = freezed,
    Object? processedByName = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as LeaveStatus,
      reason: freezed == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String?,
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
      processedByName: freezed == processedByName
          ? _value.processedByName
          : processedByName // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LeaveRequestImplCopyWith<$Res>
    implements $LeaveRequestCopyWith<$Res> {
  factory _$$LeaveRequestImplCopyWith(
          _$LeaveRequestImpl value, $Res Function(_$LeaveRequestImpl) then) =
      __$$LeaveRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      LeaveType type,
      DateTime startDate,
      DateTime endDate,
      LeaveStatus status,
      String? reason,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt,
      String? processedByName});
}

/// @nodoc
class __$$LeaveRequestImplCopyWithImpl<$Res>
    extends _$LeaveRequestCopyWithImpl<$Res, _$LeaveRequestImpl>
    implements _$$LeaveRequestImplCopyWith<$Res> {
  __$$LeaveRequestImplCopyWithImpl(
      _$LeaveRequestImpl _value, $Res Function(_$LeaveRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of LeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? type = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? status = null,
    Object? reason = freezed,
    Object? managerNotes = freezed,
    Object? createdAt = freezed,
    Object? processedAt = freezed,
    Object? processedByName = freezed,
  }) {
    return _then(_$LeaveRequestImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as LeaveStatus,
      reason: freezed == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String?,
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
      processedByName: freezed == processedByName
          ? _value.processedByName
          : processedByName // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LeaveRequestImpl implements _LeaveRequest {
  const _$LeaveRequestImpl(
      {required this.id,
      required this.type,
      required this.startDate,
      required this.endDate,
      required this.status,
      this.reason,
      this.managerNotes,
      this.createdAt,
      this.processedAt,
      this.processedByName});

  factory _$LeaveRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$LeaveRequestImplFromJson(json);

  @override
  final String id;
  @override
  final LeaveType type;
  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  final LeaveStatus status;
  @override
  final String? reason;
  @override
  final String? managerNotes;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? processedAt;
  @override
  final String? processedByName;

  @override
  String toString() {
    return 'LeaveRequest(id: $id, type: $type, startDate: $startDate, endDate: $endDate, status: $status, reason: $reason, managerNotes: $managerNotes, createdAt: $createdAt, processedAt: $processedAt, processedByName: $processedByName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LeaveRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.managerNotes, managerNotes) ||
                other.managerNotes == managerNotes) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt) &&
            (identical(other.processedAt, processedAt) ||
                other.processedAt == processedAt) &&
            (identical(other.processedByName, processedByName) ||
                other.processedByName == processedByName));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, type, startDate, endDate,
      status, reason, managerNotes, createdAt, processedAt, processedByName);

  /// Create a copy of LeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LeaveRequestImplCopyWith<_$LeaveRequestImpl> get copyWith =>
      __$$LeaveRequestImplCopyWithImpl<_$LeaveRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LeaveRequestImplToJson(
      this,
    );
  }
}

abstract class _LeaveRequest implements LeaveRequest {
  const factory _LeaveRequest(
      {required final String id,
      required final LeaveType type,
      required final DateTime startDate,
      required final DateTime endDate,
      required final LeaveStatus status,
      final String? reason,
      final String? managerNotes,
      final DateTime? createdAt,
      final DateTime? processedAt,
      final String? processedByName}) = _$LeaveRequestImpl;

  factory _LeaveRequest.fromJson(Map<String, dynamic> json) =
      _$LeaveRequestImpl.fromJson;

  @override
  String get id;
  @override
  LeaveType get type;
  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  LeaveStatus get status;
  @override
  String? get reason;
  @override
  String? get managerNotes;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get processedAt;
  @override
  String? get processedByName;

  /// Create a copy of LeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LeaveRequestImplCopyWith<_$LeaveRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CreateLeaveRequest _$CreateLeaveRequestFromJson(Map<String, dynamic> json) {
  return _CreateLeaveRequest.fromJson(json);
}

/// @nodoc
mixin _$CreateLeaveRequest {
  LeaveType get type => throw _privateConstructorUsedError;
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  String? get reason => throw _privateConstructorUsedError;

  /// Serializes this CreateLeaveRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateLeaveRequestCopyWith<CreateLeaveRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateLeaveRequestCopyWith<$Res> {
  factory $CreateLeaveRequestCopyWith(
          CreateLeaveRequest value, $Res Function(CreateLeaveRequest) then) =
      _$CreateLeaveRequestCopyWithImpl<$Res, CreateLeaveRequest>;
  @useResult
  $Res call(
      {LeaveType type, DateTime startDate, DateTime endDate, String? reason});
}

/// @nodoc
class _$CreateLeaveRequestCopyWithImpl<$Res, $Val extends CreateLeaveRequest>
    implements $CreateLeaveRequestCopyWith<$Res> {
  _$CreateLeaveRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = freezed,
  }) {
    return _then(_value.copyWith(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: freezed == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CreateLeaveRequestImplCopyWith<$Res>
    implements $CreateLeaveRequestCopyWith<$Res> {
  factory _$$CreateLeaveRequestImplCopyWith(_$CreateLeaveRequestImpl value,
          $Res Function(_$CreateLeaveRequestImpl) then) =
      __$$CreateLeaveRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {LeaveType type, DateTime startDate, DateTime endDate, String? reason});
}

/// @nodoc
class __$$CreateLeaveRequestImplCopyWithImpl<$Res>
    extends _$CreateLeaveRequestCopyWithImpl<$Res, _$CreateLeaveRequestImpl>
    implements _$$CreateLeaveRequestImplCopyWith<$Res> {
  __$$CreateLeaveRequestImplCopyWithImpl(_$CreateLeaveRequestImpl _value,
      $Res Function(_$CreateLeaveRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = freezed,
  }) {
    return _then(_$CreateLeaveRequestImpl(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: freezed == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateLeaveRequestImpl implements _CreateLeaveRequest {
  const _$CreateLeaveRequestImpl(
      {required this.type,
      required this.startDate,
      required this.endDate,
      this.reason});

  factory _$CreateLeaveRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateLeaveRequestImplFromJson(json);

  @override
  final LeaveType type;
  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  final String? reason;

  @override
  String toString() {
    return 'CreateLeaveRequest(type: $type, startDate: $startDate, endDate: $endDate, reason: $reason)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateLeaveRequestImpl &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.reason, reason) || other.reason == reason));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, type, startDate, endDate, reason);

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateLeaveRequestImplCopyWith<_$CreateLeaveRequestImpl> get copyWith =>
      __$$CreateLeaveRequestImplCopyWithImpl<_$CreateLeaveRequestImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateLeaveRequestImplToJson(
      this,
    );
  }
}

abstract class _CreateLeaveRequest implements CreateLeaveRequest {
  const factory _CreateLeaveRequest(
      {required final LeaveType type,
      required final DateTime startDate,
      required final DateTime endDate,
      final String? reason}) = _$CreateLeaveRequestImpl;

  factory _CreateLeaveRequest.fromJson(Map<String, dynamic> json) =
      _$CreateLeaveRequestImpl.fromJson;

  @override
  LeaveType get type;
  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  String? get reason;

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateLeaveRequestImplCopyWith<_$CreateLeaveRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LeaveBalance _$LeaveBalanceFromJson(Map<String, dynamic> json) {
  return _LeaveBalance.fromJson(json);
}

/// @nodoc
mixin _$LeaveBalance {
  LeaveType get type => throw _privateConstructorUsedError;
  String get typeName => throw _privateConstructorUsedError;
  double get totalDays => throw _privateConstructorUsedError;
  double get usedDays => throw _privateConstructorUsedError;
  double get remainingDays => throw _privateConstructorUsedError;
  double get pendingDays => throw _privateConstructorUsedError;

  /// Serializes this LeaveBalance to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LeaveBalance
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LeaveBalanceCopyWith<LeaveBalance> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LeaveBalanceCopyWith<$Res> {
  factory $LeaveBalanceCopyWith(
          LeaveBalance value, $Res Function(LeaveBalance) then) =
      _$LeaveBalanceCopyWithImpl<$Res, LeaveBalance>;
  @useResult
  $Res call(
      {LeaveType type,
      String typeName,
      double totalDays,
      double usedDays,
      double remainingDays,
      double pendingDays});
}

/// @nodoc
class _$LeaveBalanceCopyWithImpl<$Res, $Val extends LeaveBalance>
    implements $LeaveBalanceCopyWith<$Res> {
  _$LeaveBalanceCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LeaveBalance
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? typeName = null,
    Object? totalDays = null,
    Object? usedDays = null,
    Object? remainingDays = null,
    Object? pendingDays = null,
  }) {
    return _then(_value.copyWith(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      typeName: null == typeName
          ? _value.typeName
          : typeName // ignore: cast_nullable_to_non_nullable
              as String,
      totalDays: null == totalDays
          ? _value.totalDays
          : totalDays // ignore: cast_nullable_to_non_nullable
              as double,
      usedDays: null == usedDays
          ? _value.usedDays
          : usedDays // ignore: cast_nullable_to_non_nullable
              as double,
      remainingDays: null == remainingDays
          ? _value.remainingDays
          : remainingDays // ignore: cast_nullable_to_non_nullable
              as double,
      pendingDays: null == pendingDays
          ? _value.pendingDays
          : pendingDays // ignore: cast_nullable_to_non_nullable
              as double,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LeaveBalanceImplCopyWith<$Res>
    implements $LeaveBalanceCopyWith<$Res> {
  factory _$$LeaveBalanceImplCopyWith(
          _$LeaveBalanceImpl value, $Res Function(_$LeaveBalanceImpl) then) =
      __$$LeaveBalanceImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {LeaveType type,
      String typeName,
      double totalDays,
      double usedDays,
      double remainingDays,
      double pendingDays});
}

/// @nodoc
class __$$LeaveBalanceImplCopyWithImpl<$Res>
    extends _$LeaveBalanceCopyWithImpl<$Res, _$LeaveBalanceImpl>
    implements _$$LeaveBalanceImplCopyWith<$Res> {
  __$$LeaveBalanceImplCopyWithImpl(
      _$LeaveBalanceImpl _value, $Res Function(_$LeaveBalanceImpl) _then)
      : super(_value, _then);

  /// Create a copy of LeaveBalance
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? typeName = null,
    Object? totalDays = null,
    Object? usedDays = null,
    Object? remainingDays = null,
    Object? pendingDays = null,
  }) {
    return _then(_$LeaveBalanceImpl(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as LeaveType,
      typeName: null == typeName
          ? _value.typeName
          : typeName // ignore: cast_nullable_to_non_nullable
              as String,
      totalDays: null == totalDays
          ? _value.totalDays
          : totalDays // ignore: cast_nullable_to_non_nullable
              as double,
      usedDays: null == usedDays
          ? _value.usedDays
          : usedDays // ignore: cast_nullable_to_non_nullable
              as double,
      remainingDays: null == remainingDays
          ? _value.remainingDays
          : remainingDays // ignore: cast_nullable_to_non_nullable
              as double,
      pendingDays: null == pendingDays
          ? _value.pendingDays
          : pendingDays // ignore: cast_nullable_to_non_nullable
              as double,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LeaveBalanceImpl implements _LeaveBalance {
  const _$LeaveBalanceImpl(
      {required this.type,
      required this.typeName,
      required this.totalDays,
      required this.usedDays,
      required this.remainingDays,
      required this.pendingDays});

  factory _$LeaveBalanceImpl.fromJson(Map<String, dynamic> json) =>
      _$$LeaveBalanceImplFromJson(json);

  @override
  final LeaveType type;
  @override
  final String typeName;
  @override
  final double totalDays;
  @override
  final double usedDays;
  @override
  final double remainingDays;
  @override
  final double pendingDays;

  @override
  String toString() {
    return 'LeaveBalance(type: $type, typeName: $typeName, totalDays: $totalDays, usedDays: $usedDays, remainingDays: $remainingDays, pendingDays: $pendingDays)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LeaveBalanceImpl &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.typeName, typeName) ||
                other.typeName == typeName) &&
            (identical(other.totalDays, totalDays) ||
                other.totalDays == totalDays) &&
            (identical(other.usedDays, usedDays) ||
                other.usedDays == usedDays) &&
            (identical(other.remainingDays, remainingDays) ||
                other.remainingDays == remainingDays) &&
            (identical(other.pendingDays, pendingDays) ||
                other.pendingDays == pendingDays));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, type, typeName, totalDays,
      usedDays, remainingDays, pendingDays);

  /// Create a copy of LeaveBalance
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LeaveBalanceImplCopyWith<_$LeaveBalanceImpl> get copyWith =>
      __$$LeaveBalanceImplCopyWithImpl<_$LeaveBalanceImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LeaveBalanceImplToJson(
      this,
    );
  }
}

abstract class _LeaveBalance implements LeaveBalance {
  const factory _LeaveBalance(
      {required final LeaveType type,
      required final String typeName,
      required final double totalDays,
      required final double usedDays,
      required final double remainingDays,
      required final double pendingDays}) = _$LeaveBalanceImpl;

  factory _LeaveBalance.fromJson(Map<String, dynamic> json) =
      _$LeaveBalanceImpl.fromJson;

  @override
  LeaveType get type;
  @override
  String get typeName;
  @override
  double get totalDays;
  @override
  double get usedDays;
  @override
  double get remainingDays;
  @override
  double get pendingDays;

  /// Create a copy of LeaveBalance
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LeaveBalanceImplCopyWith<_$LeaveBalanceImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

LeaveSummary _$LeaveSummaryFromJson(Map<String, dynamic> json) {
  return _LeaveSummary.fromJson(json);
}

/// @nodoc
mixin _$LeaveSummary {
  List<LeaveBalance> get balances => throw _privateConstructorUsedError;
  List<LeaveRequest> get recentRequests => throw _privateConstructorUsedError;

  /// Serializes this LeaveSummary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of LeaveSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $LeaveSummaryCopyWith<LeaveSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LeaveSummaryCopyWith<$Res> {
  factory $LeaveSummaryCopyWith(
          LeaveSummary value, $Res Function(LeaveSummary) then) =
      _$LeaveSummaryCopyWithImpl<$Res, LeaveSummary>;
  @useResult
  $Res call({List<LeaveBalance> balances, List<LeaveRequest> recentRequests});
}

/// @nodoc
class _$LeaveSummaryCopyWithImpl<$Res, $Val extends LeaveSummary>
    implements $LeaveSummaryCopyWith<$Res> {
  _$LeaveSummaryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of LeaveSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? balances = null,
    Object? recentRequests = null,
  }) {
    return _then(_value.copyWith(
      balances: null == balances
          ? _value.balances
          : balances // ignore: cast_nullable_to_non_nullable
              as List<LeaveBalance>,
      recentRequests: null == recentRequests
          ? _value.recentRequests
          : recentRequests // ignore: cast_nullable_to_non_nullable
              as List<LeaveRequest>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$LeaveSummaryImplCopyWith<$Res>
    implements $LeaveSummaryCopyWith<$Res> {
  factory _$$LeaveSummaryImplCopyWith(
          _$LeaveSummaryImpl value, $Res Function(_$LeaveSummaryImpl) then) =
      __$$LeaveSummaryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<LeaveBalance> balances, List<LeaveRequest> recentRequests});
}

/// @nodoc
class __$$LeaveSummaryImplCopyWithImpl<$Res>
    extends _$LeaveSummaryCopyWithImpl<$Res, _$LeaveSummaryImpl>
    implements _$$LeaveSummaryImplCopyWith<$Res> {
  __$$LeaveSummaryImplCopyWithImpl(
      _$LeaveSummaryImpl _value, $Res Function(_$LeaveSummaryImpl) _then)
      : super(_value, _then);

  /// Create a copy of LeaveSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? balances = null,
    Object? recentRequests = null,
  }) {
    return _then(_$LeaveSummaryImpl(
      balances: null == balances
          ? _value._balances
          : balances // ignore: cast_nullable_to_non_nullable
              as List<LeaveBalance>,
      recentRequests: null == recentRequests
          ? _value._recentRequests
          : recentRequests // ignore: cast_nullable_to_non_nullable
              as List<LeaveRequest>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LeaveSummaryImpl implements _LeaveSummary {
  const _$LeaveSummaryImpl(
      {required final List<LeaveBalance> balances,
      required final List<LeaveRequest> recentRequests})
      : _balances = balances,
        _recentRequests = recentRequests;

  factory _$LeaveSummaryImpl.fromJson(Map<String, dynamic> json) =>
      _$$LeaveSummaryImplFromJson(json);

  final List<LeaveBalance> _balances;
  @override
  List<LeaveBalance> get balances {
    if (_balances is EqualUnmodifiableListView) return _balances;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_balances);
  }

  final List<LeaveRequest> _recentRequests;
  @override
  List<LeaveRequest> get recentRequests {
    if (_recentRequests is EqualUnmodifiableListView) return _recentRequests;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_recentRequests);
  }

  @override
  String toString() {
    return 'LeaveSummary(balances: $balances, recentRequests: $recentRequests)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LeaveSummaryImpl &&
            const DeepCollectionEquality().equals(other._balances, _balances) &&
            const DeepCollectionEquality()
                .equals(other._recentRequests, _recentRequests));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(_balances),
      const DeepCollectionEquality().hash(_recentRequests));

  /// Create a copy of LeaveSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$LeaveSummaryImplCopyWith<_$LeaveSummaryImpl> get copyWith =>
      __$$LeaveSummaryImplCopyWithImpl<_$LeaveSummaryImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$LeaveSummaryImplToJson(
      this,
    );
  }
}

abstract class _LeaveSummary implements LeaveSummary {
  const factory _LeaveSummary(
      {required final List<LeaveBalance> balances,
      required final List<LeaveRequest> recentRequests}) = _$LeaveSummaryImpl;

  factory _LeaveSummary.fromJson(Map<String, dynamic> json) =
      _$LeaveSummaryImpl.fromJson;

  @override
  List<LeaveBalance> get balances;
  @override
  List<LeaveRequest> get recentRequests;

  /// Create a copy of LeaveSummary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$LeaveSummaryImplCopyWith<_$LeaveSummaryImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
