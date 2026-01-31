// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'remote_work_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

RemoteWorkRequest _$RemoteWorkRequestFromJson(Map<String, dynamic> json) {
  return _RemoteWorkRequest.fromJson(json);
}

/// @nodoc
mixin _$RemoteWorkRequest {
  String get id => throw _privateConstructorUsedError;
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;
  RemoteWorkStatus get status => throw _privateConstructorUsedError;
  String? get workLocation => throw _privateConstructorUsedError;
  String? get contactPhone => throw _privateConstructorUsedError;
  String? get managerNotes => throw _privateConstructorUsedError;
  DateTime? get createdAt => throw _privateConstructorUsedError;
  DateTime? get processedAt => throw _privateConstructorUsedError;
  String? get processedByName => throw _privateConstructorUsedError;

  /// Serializes this RemoteWorkRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RemoteWorkRequestCopyWith<RemoteWorkRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RemoteWorkRequestCopyWith<$Res> {
  factory $RemoteWorkRequestCopyWith(
          RemoteWorkRequest value, $Res Function(RemoteWorkRequest) then) =
      _$RemoteWorkRequestCopyWithImpl<$Res, RemoteWorkRequest>;
  @useResult
  $Res call(
      {String id,
      DateTime startDate,
      DateTime endDate,
      String reason,
      RemoteWorkStatus status,
      String? workLocation,
      String? contactPhone,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt,
      String? processedByName});
}

/// @nodoc
class _$RemoteWorkRequestCopyWithImpl<$Res, $Val extends RemoteWorkRequest>
    implements $RemoteWorkRequestCopyWith<$Res> {
  _$RemoteWorkRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = null,
    Object? status = null,
    Object? workLocation = freezed,
    Object? contactPhone = freezed,
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
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as RemoteWorkStatus,
      workLocation: freezed == workLocation
          ? _value.workLocation
          : workLocation // ignore: cast_nullable_to_non_nullable
              as String?,
      contactPhone: freezed == contactPhone
          ? _value.contactPhone
          : contactPhone // ignore: cast_nullable_to_non_nullable
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
abstract class _$$RemoteWorkRequestImplCopyWith<$Res>
    implements $RemoteWorkRequestCopyWith<$Res> {
  factory _$$RemoteWorkRequestImplCopyWith(_$RemoteWorkRequestImpl value,
          $Res Function(_$RemoteWorkRequestImpl) then) =
      __$$RemoteWorkRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      DateTime startDate,
      DateTime endDate,
      String reason,
      RemoteWorkStatus status,
      String? workLocation,
      String? contactPhone,
      String? managerNotes,
      DateTime? createdAt,
      DateTime? processedAt,
      String? processedByName});
}

/// @nodoc
class __$$RemoteWorkRequestImplCopyWithImpl<$Res>
    extends _$RemoteWorkRequestCopyWithImpl<$Res, _$RemoteWorkRequestImpl>
    implements _$$RemoteWorkRequestImplCopyWith<$Res> {
  __$$RemoteWorkRequestImplCopyWithImpl(_$RemoteWorkRequestImpl _value,
      $Res Function(_$RemoteWorkRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of RemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = null,
    Object? status = null,
    Object? workLocation = freezed,
    Object? contactPhone = freezed,
    Object? managerNotes = freezed,
    Object? createdAt = freezed,
    Object? processedAt = freezed,
    Object? processedByName = freezed,
  }) {
    return _then(_$RemoteWorkRequestImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as RemoteWorkStatus,
      workLocation: freezed == workLocation
          ? _value.workLocation
          : workLocation // ignore: cast_nullable_to_non_nullable
              as String?,
      contactPhone: freezed == contactPhone
          ? _value.contactPhone
          : contactPhone // ignore: cast_nullable_to_non_nullable
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
class _$RemoteWorkRequestImpl implements _RemoteWorkRequest {
  const _$RemoteWorkRequestImpl(
      {required this.id,
      required this.startDate,
      required this.endDate,
      required this.reason,
      required this.status,
      this.workLocation,
      this.contactPhone,
      this.managerNotes,
      this.createdAt,
      this.processedAt,
      this.processedByName});

  factory _$RemoteWorkRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$RemoteWorkRequestImplFromJson(json);

  @override
  final String id;
  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  final String reason;
  @override
  final RemoteWorkStatus status;
  @override
  final String? workLocation;
  @override
  final String? contactPhone;
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
    return 'RemoteWorkRequest(id: $id, startDate: $startDate, endDate: $endDate, reason: $reason, status: $status, workLocation: $workLocation, contactPhone: $contactPhone, managerNotes: $managerNotes, createdAt: $createdAt, processedAt: $processedAt, processedByName: $processedByName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RemoteWorkRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.workLocation, workLocation) ||
                other.workLocation == workLocation) &&
            (identical(other.contactPhone, contactPhone) ||
                other.contactPhone == contactPhone) &&
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
  int get hashCode => Object.hash(
      runtimeType,
      id,
      startDate,
      endDate,
      reason,
      status,
      workLocation,
      contactPhone,
      managerNotes,
      createdAt,
      processedAt,
      processedByName);

  /// Create a copy of RemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RemoteWorkRequestImplCopyWith<_$RemoteWorkRequestImpl> get copyWith =>
      __$$RemoteWorkRequestImplCopyWithImpl<_$RemoteWorkRequestImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RemoteWorkRequestImplToJson(
      this,
    );
  }
}

abstract class _RemoteWorkRequest implements RemoteWorkRequest {
  const factory _RemoteWorkRequest(
      {required final String id,
      required final DateTime startDate,
      required final DateTime endDate,
      required final String reason,
      required final RemoteWorkStatus status,
      final String? workLocation,
      final String? contactPhone,
      final String? managerNotes,
      final DateTime? createdAt,
      final DateTime? processedAt,
      final String? processedByName}) = _$RemoteWorkRequestImpl;

  factory _RemoteWorkRequest.fromJson(Map<String, dynamic> json) =
      _$RemoteWorkRequestImpl.fromJson;

  @override
  String get id;
  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  String get reason;
  @override
  RemoteWorkStatus get status;
  @override
  String? get workLocation;
  @override
  String? get contactPhone;
  @override
  String? get managerNotes;
  @override
  DateTime? get createdAt;
  @override
  DateTime? get processedAt;
  @override
  String? get processedByName;

  /// Create a copy of RemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RemoteWorkRequestImplCopyWith<_$RemoteWorkRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

CreateRemoteWorkRequest _$CreateRemoteWorkRequestFromJson(
    Map<String, dynamic> json) {
  return _CreateRemoteWorkRequest.fromJson(json);
}

/// @nodoc
mixin _$CreateRemoteWorkRequest {
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;
  String? get workLocation => throw _privateConstructorUsedError;
  String? get contactPhone => throw _privateConstructorUsedError;

  /// Serializes this CreateRemoteWorkRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateRemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateRemoteWorkRequestCopyWith<CreateRemoteWorkRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateRemoteWorkRequestCopyWith<$Res> {
  factory $CreateRemoteWorkRequestCopyWith(CreateRemoteWorkRequest value,
          $Res Function(CreateRemoteWorkRequest) then) =
      _$CreateRemoteWorkRequestCopyWithImpl<$Res, CreateRemoteWorkRequest>;
  @useResult
  $Res call(
      {DateTime startDate,
      DateTime endDate,
      String reason,
      String? workLocation,
      String? contactPhone});
}

/// @nodoc
class _$CreateRemoteWorkRequestCopyWithImpl<$Res,
        $Val extends CreateRemoteWorkRequest>
    implements $CreateRemoteWorkRequestCopyWith<$Res> {
  _$CreateRemoteWorkRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateRemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = null,
    Object? workLocation = freezed,
    Object? contactPhone = freezed,
  }) {
    return _then(_value.copyWith(
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      workLocation: freezed == workLocation
          ? _value.workLocation
          : workLocation // ignore: cast_nullable_to_non_nullable
              as String?,
      contactPhone: freezed == contactPhone
          ? _value.contactPhone
          : contactPhone // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CreateRemoteWorkRequestImplCopyWith<$Res>
    implements $CreateRemoteWorkRequestCopyWith<$Res> {
  factory _$$CreateRemoteWorkRequestImplCopyWith(
          _$CreateRemoteWorkRequestImpl value,
          $Res Function(_$CreateRemoteWorkRequestImpl) then) =
      __$$CreateRemoteWorkRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {DateTime startDate,
      DateTime endDate,
      String reason,
      String? workLocation,
      String? contactPhone});
}

/// @nodoc
class __$$CreateRemoteWorkRequestImplCopyWithImpl<$Res>
    extends _$CreateRemoteWorkRequestCopyWithImpl<$Res,
        _$CreateRemoteWorkRequestImpl>
    implements _$$CreateRemoteWorkRequestImplCopyWith<$Res> {
  __$$CreateRemoteWorkRequestImplCopyWithImpl(
      _$CreateRemoteWorkRequestImpl _value,
      $Res Function(_$CreateRemoteWorkRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CreateRemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? startDate = null,
    Object? endDate = null,
    Object? reason = null,
    Object? workLocation = freezed,
    Object? contactPhone = freezed,
  }) {
    return _then(_$CreateRemoteWorkRequestImpl(
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      workLocation: freezed == workLocation
          ? _value.workLocation
          : workLocation // ignore: cast_nullable_to_non_nullable
              as String?,
      contactPhone: freezed == contactPhone
          ? _value.contactPhone
          : contactPhone // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateRemoteWorkRequestImpl implements _CreateRemoteWorkRequest {
  const _$CreateRemoteWorkRequestImpl(
      {required this.startDate,
      required this.endDate,
      required this.reason,
      this.workLocation,
      this.contactPhone});

  factory _$CreateRemoteWorkRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateRemoteWorkRequestImplFromJson(json);

  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  final String reason;
  @override
  final String? workLocation;
  @override
  final String? contactPhone;

  @override
  String toString() {
    return 'CreateRemoteWorkRequest(startDate: $startDate, endDate: $endDate, reason: $reason, workLocation: $workLocation, contactPhone: $contactPhone)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateRemoteWorkRequestImpl &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.workLocation, workLocation) ||
                other.workLocation == workLocation) &&
            (identical(other.contactPhone, contactPhone) ||
                other.contactPhone == contactPhone));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType, startDate, endDate, reason, workLocation, contactPhone);

  /// Create a copy of CreateRemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateRemoteWorkRequestImplCopyWith<_$CreateRemoteWorkRequestImpl>
      get copyWith => __$$CreateRemoteWorkRequestImplCopyWithImpl<
          _$CreateRemoteWorkRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateRemoteWorkRequestImplToJson(
      this,
    );
  }
}

abstract class _CreateRemoteWorkRequest implements CreateRemoteWorkRequest {
  const factory _CreateRemoteWorkRequest(
      {required final DateTime startDate,
      required final DateTime endDate,
      required final String reason,
      final String? workLocation,
      final String? contactPhone}) = _$CreateRemoteWorkRequestImpl;

  factory _CreateRemoteWorkRequest.fromJson(Map<String, dynamic> json) =
      _$CreateRemoteWorkRequestImpl.fromJson;

  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  String get reason;
  @override
  String? get workLocation;
  @override
  String? get contactPhone;

  /// Create a copy of CreateRemoteWorkRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateRemoteWorkRequestImplCopyWith<_$CreateRemoteWorkRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}

RemoteWorkPolicy _$RemoteWorkPolicyFromJson(Map<String, dynamic> json) {
  return _RemoteWorkPolicy.fromJson(json);
}

/// @nodoc
mixin _$RemoteWorkPolicy {
  int get maxDaysPerMonth => throw _privateConstructorUsedError;
  int get maxConsecutiveDays => throw _privateConstructorUsedError;
  bool get requiresApproval => throw _privateConstructorUsedError;
  int get advanceNoticeDays => throw _privateConstructorUsedError;
  List<int>? get allowedDaysOfWeek => throw _privateConstructorUsedError;

  /// Serializes this RemoteWorkPolicy to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RemoteWorkPolicy
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RemoteWorkPolicyCopyWith<RemoteWorkPolicy> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RemoteWorkPolicyCopyWith<$Res> {
  factory $RemoteWorkPolicyCopyWith(
          RemoteWorkPolicy value, $Res Function(RemoteWorkPolicy) then) =
      _$RemoteWorkPolicyCopyWithImpl<$Res, RemoteWorkPolicy>;
  @useResult
  $Res call(
      {int maxDaysPerMonth,
      int maxConsecutiveDays,
      bool requiresApproval,
      int advanceNoticeDays,
      List<int>? allowedDaysOfWeek});
}

/// @nodoc
class _$RemoteWorkPolicyCopyWithImpl<$Res, $Val extends RemoteWorkPolicy>
    implements $RemoteWorkPolicyCopyWith<$Res> {
  _$RemoteWorkPolicyCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RemoteWorkPolicy
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? maxDaysPerMonth = null,
    Object? maxConsecutiveDays = null,
    Object? requiresApproval = null,
    Object? advanceNoticeDays = null,
    Object? allowedDaysOfWeek = freezed,
  }) {
    return _then(_value.copyWith(
      maxDaysPerMonth: null == maxDaysPerMonth
          ? _value.maxDaysPerMonth
          : maxDaysPerMonth // ignore: cast_nullable_to_non_nullable
              as int,
      maxConsecutiveDays: null == maxConsecutiveDays
          ? _value.maxConsecutiveDays
          : maxConsecutiveDays // ignore: cast_nullable_to_non_nullable
              as int,
      requiresApproval: null == requiresApproval
          ? _value.requiresApproval
          : requiresApproval // ignore: cast_nullable_to_non_nullable
              as bool,
      advanceNoticeDays: null == advanceNoticeDays
          ? _value.advanceNoticeDays
          : advanceNoticeDays // ignore: cast_nullable_to_non_nullable
              as int,
      allowedDaysOfWeek: freezed == allowedDaysOfWeek
          ? _value.allowedDaysOfWeek
          : allowedDaysOfWeek // ignore: cast_nullable_to_non_nullable
              as List<int>?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$RemoteWorkPolicyImplCopyWith<$Res>
    implements $RemoteWorkPolicyCopyWith<$Res> {
  factory _$$RemoteWorkPolicyImplCopyWith(_$RemoteWorkPolicyImpl value,
          $Res Function(_$RemoteWorkPolicyImpl) then) =
      __$$RemoteWorkPolicyImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int maxDaysPerMonth,
      int maxConsecutiveDays,
      bool requiresApproval,
      int advanceNoticeDays,
      List<int>? allowedDaysOfWeek});
}

/// @nodoc
class __$$RemoteWorkPolicyImplCopyWithImpl<$Res>
    extends _$RemoteWorkPolicyCopyWithImpl<$Res, _$RemoteWorkPolicyImpl>
    implements _$$RemoteWorkPolicyImplCopyWith<$Res> {
  __$$RemoteWorkPolicyImplCopyWithImpl(_$RemoteWorkPolicyImpl _value,
      $Res Function(_$RemoteWorkPolicyImpl) _then)
      : super(_value, _then);

  /// Create a copy of RemoteWorkPolicy
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? maxDaysPerMonth = null,
    Object? maxConsecutiveDays = null,
    Object? requiresApproval = null,
    Object? advanceNoticeDays = null,
    Object? allowedDaysOfWeek = freezed,
  }) {
    return _then(_$RemoteWorkPolicyImpl(
      maxDaysPerMonth: null == maxDaysPerMonth
          ? _value.maxDaysPerMonth
          : maxDaysPerMonth // ignore: cast_nullable_to_non_nullable
              as int,
      maxConsecutiveDays: null == maxConsecutiveDays
          ? _value.maxConsecutiveDays
          : maxConsecutiveDays // ignore: cast_nullable_to_non_nullable
              as int,
      requiresApproval: null == requiresApproval
          ? _value.requiresApproval
          : requiresApproval // ignore: cast_nullable_to_non_nullable
              as bool,
      advanceNoticeDays: null == advanceNoticeDays
          ? _value.advanceNoticeDays
          : advanceNoticeDays // ignore: cast_nullable_to_non_nullable
              as int,
      allowedDaysOfWeek: freezed == allowedDaysOfWeek
          ? _value._allowedDaysOfWeek
          : allowedDaysOfWeek // ignore: cast_nullable_to_non_nullable
              as List<int>?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$RemoteWorkPolicyImpl implements _RemoteWorkPolicy {
  const _$RemoteWorkPolicyImpl(
      {required this.maxDaysPerMonth,
      required this.maxConsecutiveDays,
      required this.requiresApproval,
      required this.advanceNoticeDays,
      final List<int>? allowedDaysOfWeek})
      : _allowedDaysOfWeek = allowedDaysOfWeek;

  factory _$RemoteWorkPolicyImpl.fromJson(Map<String, dynamic> json) =>
      _$$RemoteWorkPolicyImplFromJson(json);

  @override
  final int maxDaysPerMonth;
  @override
  final int maxConsecutiveDays;
  @override
  final bool requiresApproval;
  @override
  final int advanceNoticeDays;
  final List<int>? _allowedDaysOfWeek;
  @override
  List<int>? get allowedDaysOfWeek {
    final value = _allowedDaysOfWeek;
    if (value == null) return null;
    if (_allowedDaysOfWeek is EqualUnmodifiableListView)
      return _allowedDaysOfWeek;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString() {
    return 'RemoteWorkPolicy(maxDaysPerMonth: $maxDaysPerMonth, maxConsecutiveDays: $maxConsecutiveDays, requiresApproval: $requiresApproval, advanceNoticeDays: $advanceNoticeDays, allowedDaysOfWeek: $allowedDaysOfWeek)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RemoteWorkPolicyImpl &&
            (identical(other.maxDaysPerMonth, maxDaysPerMonth) ||
                other.maxDaysPerMonth == maxDaysPerMonth) &&
            (identical(other.maxConsecutiveDays, maxConsecutiveDays) ||
                other.maxConsecutiveDays == maxConsecutiveDays) &&
            (identical(other.requiresApproval, requiresApproval) ||
                other.requiresApproval == requiresApproval) &&
            (identical(other.advanceNoticeDays, advanceNoticeDays) ||
                other.advanceNoticeDays == advanceNoticeDays) &&
            const DeepCollectionEquality()
                .equals(other._allowedDaysOfWeek, _allowedDaysOfWeek));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      maxDaysPerMonth,
      maxConsecutiveDays,
      requiresApproval,
      advanceNoticeDays,
      const DeepCollectionEquality().hash(_allowedDaysOfWeek));

  /// Create a copy of RemoteWorkPolicy
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RemoteWorkPolicyImplCopyWith<_$RemoteWorkPolicyImpl> get copyWith =>
      __$$RemoteWorkPolicyImplCopyWithImpl<_$RemoteWorkPolicyImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RemoteWorkPolicyImplToJson(
      this,
    );
  }
}

abstract class _RemoteWorkPolicy implements RemoteWorkPolicy {
  const factory _RemoteWorkPolicy(
      {required final int maxDaysPerMonth,
      required final int maxConsecutiveDays,
      required final bool requiresApproval,
      required final int advanceNoticeDays,
      final List<int>? allowedDaysOfWeek}) = _$RemoteWorkPolicyImpl;

  factory _RemoteWorkPolicy.fromJson(Map<String, dynamic> json) =
      _$RemoteWorkPolicyImpl.fromJson;

  @override
  int get maxDaysPerMonth;
  @override
  int get maxConsecutiveDays;
  @override
  bool get requiresApproval;
  @override
  int get advanceNoticeDays;
  @override
  List<int>? get allowedDaysOfWeek;

  /// Create a copy of RemoteWorkPolicy
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RemoteWorkPolicyImplCopyWith<_$RemoteWorkPolicyImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
