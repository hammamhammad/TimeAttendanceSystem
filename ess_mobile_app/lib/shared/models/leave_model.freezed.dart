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
  int get id => throw _privateConstructorUsedError;
  int? get vacationTypeId => throw _privateConstructorUsedError;
  String? get vacationTypeName => throw _privateConstructorUsedError;
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  @JsonKey(
      name: 'workflowStatus',
      fromJson: _parseLeaveStatus,
      toJson: _leaveStatusToJson)
  LeaveStatus get status => throw _privateConstructorUsedError;
  @JsonKey(name: 'notes')
  String? get reason => throw _privateConstructorUsedError;
  int? get employeeId => throw _privateConstructorUsedError;
  String? get employeeName => throw _privateConstructorUsedError;
  int? get totalDays => throw _privateConstructorUsedError;
  int? get businessDays => throw _privateConstructorUsedError;
  DateTime? get createdAtUtc => throw _privateConstructorUsedError;
  String? get createdBy => throw _privateConstructorUsedError;
  String? get currentApproverName => throw _privateConstructorUsedError;
  int? get workflowInstanceId => throw _privateConstructorUsedError;

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
      {int id,
      int? vacationTypeId,
      String? vacationTypeName,
      DateTime startDate,
      DateTime endDate,
      @JsonKey(
          name: 'workflowStatus',
          fromJson: _parseLeaveStatus,
          toJson: _leaveStatusToJson)
      LeaveStatus status,
      @JsonKey(name: 'notes') String? reason,
      int? employeeId,
      String? employeeName,
      int? totalDays,
      int? businessDays,
      DateTime? createdAtUtc,
      String? createdBy,
      String? currentApproverName,
      int? workflowInstanceId});
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
    Object? vacationTypeId = freezed,
    Object? vacationTypeName = freezed,
    Object? startDate = null,
    Object? endDate = null,
    Object? status = null,
    Object? reason = freezed,
    Object? employeeId = freezed,
    Object? employeeName = freezed,
    Object? totalDays = freezed,
    Object? businessDays = freezed,
    Object? createdAtUtc = freezed,
    Object? createdBy = freezed,
    Object? currentApproverName = freezed,
    Object? workflowInstanceId = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      vacationTypeId: freezed == vacationTypeId
          ? _value.vacationTypeId
          : vacationTypeId // ignore: cast_nullable_to_non_nullable
              as int?,
      vacationTypeName: freezed == vacationTypeName
          ? _value.vacationTypeName
          : vacationTypeName // ignore: cast_nullable_to_non_nullable
              as String?,
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
      employeeId: freezed == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int?,
      employeeName: freezed == employeeName
          ? _value.employeeName
          : employeeName // ignore: cast_nullable_to_non_nullable
              as String?,
      totalDays: freezed == totalDays
          ? _value.totalDays
          : totalDays // ignore: cast_nullable_to_non_nullable
              as int?,
      businessDays: freezed == businessDays
          ? _value.businessDays
          : businessDays // ignore: cast_nullable_to_non_nullable
              as int?,
      createdAtUtc: freezed == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdBy: freezed == createdBy
          ? _value.createdBy
          : createdBy // ignore: cast_nullable_to_non_nullable
              as String?,
      currentApproverName: freezed == currentApproverName
          ? _value.currentApproverName
          : currentApproverName // ignore: cast_nullable_to_non_nullable
              as String?,
      workflowInstanceId: freezed == workflowInstanceId
          ? _value.workflowInstanceId
          : workflowInstanceId // ignore: cast_nullable_to_non_nullable
              as int?,
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
      {int id,
      int? vacationTypeId,
      String? vacationTypeName,
      DateTime startDate,
      DateTime endDate,
      @JsonKey(
          name: 'workflowStatus',
          fromJson: _parseLeaveStatus,
          toJson: _leaveStatusToJson)
      LeaveStatus status,
      @JsonKey(name: 'notes') String? reason,
      int? employeeId,
      String? employeeName,
      int? totalDays,
      int? businessDays,
      DateTime? createdAtUtc,
      String? createdBy,
      String? currentApproverName,
      int? workflowInstanceId});
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
    Object? vacationTypeId = freezed,
    Object? vacationTypeName = freezed,
    Object? startDate = null,
    Object? endDate = null,
    Object? status = null,
    Object? reason = freezed,
    Object? employeeId = freezed,
    Object? employeeName = freezed,
    Object? totalDays = freezed,
    Object? businessDays = freezed,
    Object? createdAtUtc = freezed,
    Object? createdBy = freezed,
    Object? currentApproverName = freezed,
    Object? workflowInstanceId = freezed,
  }) {
    return _then(_$LeaveRequestImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      vacationTypeId: freezed == vacationTypeId
          ? _value.vacationTypeId
          : vacationTypeId // ignore: cast_nullable_to_non_nullable
              as int?,
      vacationTypeName: freezed == vacationTypeName
          ? _value.vacationTypeName
          : vacationTypeName // ignore: cast_nullable_to_non_nullable
              as String?,
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
      employeeId: freezed == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int?,
      employeeName: freezed == employeeName
          ? _value.employeeName
          : employeeName // ignore: cast_nullable_to_non_nullable
              as String?,
      totalDays: freezed == totalDays
          ? _value.totalDays
          : totalDays // ignore: cast_nullable_to_non_nullable
              as int?,
      businessDays: freezed == businessDays
          ? _value.businessDays
          : businessDays // ignore: cast_nullable_to_non_nullable
              as int?,
      createdAtUtc: freezed == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      createdBy: freezed == createdBy
          ? _value.createdBy
          : createdBy // ignore: cast_nullable_to_non_nullable
              as String?,
      currentApproverName: freezed == currentApproverName
          ? _value.currentApproverName
          : currentApproverName // ignore: cast_nullable_to_non_nullable
              as String?,
      workflowInstanceId: freezed == workflowInstanceId
          ? _value.workflowInstanceId
          : workflowInstanceId // ignore: cast_nullable_to_non_nullable
              as int?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$LeaveRequestImpl implements _LeaveRequest {
  const _$LeaveRequestImpl(
      {required this.id,
      this.vacationTypeId,
      this.vacationTypeName,
      required this.startDate,
      required this.endDate,
      @JsonKey(
          name: 'workflowStatus',
          fromJson: _parseLeaveStatus,
          toJson: _leaveStatusToJson)
      required this.status,
      @JsonKey(name: 'notes') this.reason,
      this.employeeId,
      this.employeeName,
      this.totalDays,
      this.businessDays,
      this.createdAtUtc,
      this.createdBy,
      this.currentApproverName,
      this.workflowInstanceId});

  factory _$LeaveRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$LeaveRequestImplFromJson(json);

  @override
  final int id;
  @override
  final int? vacationTypeId;
  @override
  final String? vacationTypeName;
  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  @JsonKey(
      name: 'workflowStatus',
      fromJson: _parseLeaveStatus,
      toJson: _leaveStatusToJson)
  final LeaveStatus status;
  @override
  @JsonKey(name: 'notes')
  final String? reason;
  @override
  final int? employeeId;
  @override
  final String? employeeName;
  @override
  final int? totalDays;
  @override
  final int? businessDays;
  @override
  final DateTime? createdAtUtc;
  @override
  final String? createdBy;
  @override
  final String? currentApproverName;
  @override
  final int? workflowInstanceId;

  @override
  String toString() {
    return 'LeaveRequest(id: $id, vacationTypeId: $vacationTypeId, vacationTypeName: $vacationTypeName, startDate: $startDate, endDate: $endDate, status: $status, reason: $reason, employeeId: $employeeId, employeeName: $employeeName, totalDays: $totalDays, businessDays: $businessDays, createdAtUtc: $createdAtUtc, createdBy: $createdBy, currentApproverName: $currentApproverName, workflowInstanceId: $workflowInstanceId)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$LeaveRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.vacationTypeId, vacationTypeId) ||
                other.vacationTypeId == vacationTypeId) &&
            (identical(other.vacationTypeName, vacationTypeName) ||
                other.vacationTypeName == vacationTypeName) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.employeeId, employeeId) ||
                other.employeeId == employeeId) &&
            (identical(other.employeeName, employeeName) ||
                other.employeeName == employeeName) &&
            (identical(other.totalDays, totalDays) ||
                other.totalDays == totalDays) &&
            (identical(other.businessDays, businessDays) ||
                other.businessDays == businessDays) &&
            (identical(other.createdAtUtc, createdAtUtc) ||
                other.createdAtUtc == createdAtUtc) &&
            (identical(other.createdBy, createdBy) ||
                other.createdBy == createdBy) &&
            (identical(other.currentApproverName, currentApproverName) ||
                other.currentApproverName == currentApproverName) &&
            (identical(other.workflowInstanceId, workflowInstanceId) ||
                other.workflowInstanceId == workflowInstanceId));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      vacationTypeId,
      vacationTypeName,
      startDate,
      endDate,
      status,
      reason,
      employeeId,
      employeeName,
      totalDays,
      businessDays,
      createdAtUtc,
      createdBy,
      currentApproverName,
      workflowInstanceId);

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
      {required final int id,
      final int? vacationTypeId,
      final String? vacationTypeName,
      required final DateTime startDate,
      required final DateTime endDate,
      @JsonKey(
          name: 'workflowStatus',
          fromJson: _parseLeaveStatus,
          toJson: _leaveStatusToJson)
      required final LeaveStatus status,
      @JsonKey(name: 'notes') final String? reason,
      final int? employeeId,
      final String? employeeName,
      final int? totalDays,
      final int? businessDays,
      final DateTime? createdAtUtc,
      final String? createdBy,
      final String? currentApproverName,
      final int? workflowInstanceId}) = _$LeaveRequestImpl;

  factory _LeaveRequest.fromJson(Map<String, dynamic> json) =
      _$LeaveRequestImpl.fromJson;

  @override
  int get id;
  @override
  int? get vacationTypeId;
  @override
  String? get vacationTypeName;
  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  @JsonKey(
      name: 'workflowStatus',
      fromJson: _parseLeaveStatus,
      toJson: _leaveStatusToJson)
  LeaveStatus get status;
  @override
  @JsonKey(name: 'notes')
  String? get reason;
  @override
  int? get employeeId;
  @override
  String? get employeeName;
  @override
  int? get totalDays;
  @override
  int? get businessDays;
  @override
  DateTime? get createdAtUtc;
  @override
  String? get createdBy;
  @override
  String? get currentApproverName;
  @override
  int? get workflowInstanceId;

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
  int get employeeId => throw _privateConstructorUsedError;
  int get vacationTypeId => throw _privateConstructorUsedError;
  DateTime get startDate => throw _privateConstructorUsedError;
  DateTime get endDate => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;

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
      {int employeeId,
      int vacationTypeId,
      DateTime startDate,
      DateTime endDate,
      String? notes});
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
    Object? employeeId = null,
    Object? vacationTypeId = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? notes = freezed,
  }) {
    return _then(_value.copyWith(
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      vacationTypeId: null == vacationTypeId
          ? _value.vacationTypeId
          : vacationTypeId // ignore: cast_nullable_to_non_nullable
              as int,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
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
      {int employeeId,
      int vacationTypeId,
      DateTime startDate,
      DateTime endDate,
      String? notes});
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
    Object? employeeId = null,
    Object? vacationTypeId = null,
    Object? startDate = null,
    Object? endDate = null,
    Object? notes = freezed,
  }) {
    return _then(_$CreateLeaveRequestImpl(
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      vacationTypeId: null == vacationTypeId
          ? _value.vacationTypeId
          : vacationTypeId // ignore: cast_nullable_to_non_nullable
              as int,
      startDate: null == startDate
          ? _value.startDate
          : startDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endDate: null == endDate
          ? _value.endDate
          : endDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateLeaveRequestImpl implements _CreateLeaveRequest {
  const _$CreateLeaveRequestImpl(
      {required this.employeeId,
      required this.vacationTypeId,
      required this.startDate,
      required this.endDate,
      this.notes});

  factory _$CreateLeaveRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateLeaveRequestImplFromJson(json);

  @override
  final int employeeId;
  @override
  final int vacationTypeId;
  @override
  final DateTime startDate;
  @override
  final DateTime endDate;
  @override
  final String? notes;

  @override
  String toString() {
    return 'CreateLeaveRequest(employeeId: $employeeId, vacationTypeId: $vacationTypeId, startDate: $startDate, endDate: $endDate, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateLeaveRequestImpl &&
            (identical(other.employeeId, employeeId) ||
                other.employeeId == employeeId) &&
            (identical(other.vacationTypeId, vacationTypeId) ||
                other.vacationTypeId == vacationTypeId) &&
            (identical(other.startDate, startDate) ||
                other.startDate == startDate) &&
            (identical(other.endDate, endDate) || other.endDate == endDate) &&
            (identical(other.notes, notes) || other.notes == notes));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType, employeeId, vacationTypeId, startDate, endDate, notes);

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
      {required final int employeeId,
      required final int vacationTypeId,
      required final DateTime startDate,
      required final DateTime endDate,
      final String? notes}) = _$CreateLeaveRequestImpl;

  factory _CreateLeaveRequest.fromJson(Map<String, dynamic> json) =
      _$CreateLeaveRequestImpl.fromJson;

  @override
  int get employeeId;
  @override
  int get vacationTypeId;
  @override
  DateTime get startDate;
  @override
  DateTime get endDate;
  @override
  String? get notes;

  /// Create a copy of CreateLeaveRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateLeaveRequestImplCopyWith<_$CreateLeaveRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

VacationType _$VacationTypeFromJson(Map<String, dynamic> json) {
  return _VacationType.fromJson(json);
}

/// @nodoc
mixin _$VacationType {
  int get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;

  /// Serializes this VacationType to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of VacationType
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $VacationTypeCopyWith<VacationType> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $VacationTypeCopyWith<$Res> {
  factory $VacationTypeCopyWith(
          VacationType value, $Res Function(VacationType) then) =
      _$VacationTypeCopyWithImpl<$Res, VacationType>;
  @useResult
  $Res call({int id, String name});
}

/// @nodoc
class _$VacationTypeCopyWithImpl<$Res, $Val extends VacationType>
    implements $VacationTypeCopyWith<$Res> {
  _$VacationTypeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of VacationType
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$VacationTypeImplCopyWith<$Res>
    implements $VacationTypeCopyWith<$Res> {
  factory _$$VacationTypeImplCopyWith(
          _$VacationTypeImpl value, $Res Function(_$VacationTypeImpl) then) =
      __$$VacationTypeImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int id, String name});
}

/// @nodoc
class __$$VacationTypeImplCopyWithImpl<$Res>
    extends _$VacationTypeCopyWithImpl<$Res, _$VacationTypeImpl>
    implements _$$VacationTypeImplCopyWith<$Res> {
  __$$VacationTypeImplCopyWithImpl(
      _$VacationTypeImpl _value, $Res Function(_$VacationTypeImpl) _then)
      : super(_value, _then);

  /// Create a copy of VacationType
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
  }) {
    return _then(_$VacationTypeImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$VacationTypeImpl implements _VacationType {
  const _$VacationTypeImpl({required this.id, required this.name});

  factory _$VacationTypeImpl.fromJson(Map<String, dynamic> json) =>
      _$$VacationTypeImplFromJson(json);

  @override
  final int id;
  @override
  final String name;

  @override
  String toString() {
    return 'VacationType(id: $id, name: $name)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$VacationTypeImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, name);

  /// Create a copy of VacationType
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$VacationTypeImplCopyWith<_$VacationTypeImpl> get copyWith =>
      __$$VacationTypeImplCopyWithImpl<_$VacationTypeImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$VacationTypeImplToJson(
      this,
    );
  }
}

abstract class _VacationType implements VacationType {
  const factory _VacationType(
      {required final int id, required final String name}) = _$VacationTypeImpl;

  factory _VacationType.fromJson(Map<String, dynamic> json) =
      _$VacationTypeImpl.fromJson;

  @override
  int get id;
  @override
  String get name;

  /// Create a copy of VacationType
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$VacationTypeImplCopyWith<_$VacationTypeImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
