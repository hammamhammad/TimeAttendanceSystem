// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'attendance_correction_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

AttendanceCorrectionRequest _$AttendanceCorrectionRequestFromJson(
    Map<String, dynamic> json) {
  return _AttendanceCorrectionRequest.fromJson(json);
}

/// @nodoc
mixin _$AttendanceCorrectionRequest {
  int get id => throw _privateConstructorUsedError;
  int get employeeId => throw _privateConstructorUsedError;
  String? get employeeName => throw _privateConstructorUsedError;
  String get correctionDate => throw _privateConstructorUsedError;
  String get correctionTime => throw _privateConstructorUsedError;
  AttendanceCorrectionType get correctionType =>
      throw _privateConstructorUsedError;
  String? get correctionTypeDisplay => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;
  CorrectionApprovalStatus get approvalStatus =>
      throw _privateConstructorUsedError;
  String? get approvalStatusDisplay => throw _privateConstructorUsedError;
  String? get approvedByName => throw _privateConstructorUsedError;
  String? get approvedAt => throw _privateConstructorUsedError;
  String? get rejectionReason => throw _privateConstructorUsedError;
  bool get canBeModified => throw _privateConstructorUsedError;
  String? get correctionSummary => throw _privateConstructorUsedError;
  String get createdAtUtc => throw _privateConstructorUsedError;
  String? get workflowStatus => throw _privateConstructorUsedError;
  String? get currentApproverName => throw _privateConstructorUsedError;

  /// Serializes this AttendanceCorrectionRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AttendanceCorrectionRequestCopyWith<AttendanceCorrectionRequest>
      get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AttendanceCorrectionRequestCopyWith<$Res> {
  factory $AttendanceCorrectionRequestCopyWith(
          AttendanceCorrectionRequest value,
          $Res Function(AttendanceCorrectionRequest) then) =
      _$AttendanceCorrectionRequestCopyWithImpl<$Res,
          AttendanceCorrectionRequest>;
  @useResult
  $Res call(
      {int id,
      int employeeId,
      String? employeeName,
      String correctionDate,
      String correctionTime,
      AttendanceCorrectionType correctionType,
      String? correctionTypeDisplay,
      String reason,
      CorrectionApprovalStatus approvalStatus,
      String? approvalStatusDisplay,
      String? approvedByName,
      String? approvedAt,
      String? rejectionReason,
      bool canBeModified,
      String? correctionSummary,
      String createdAtUtc,
      String? workflowStatus,
      String? currentApproverName});
}

/// @nodoc
class _$AttendanceCorrectionRequestCopyWithImpl<$Res,
        $Val extends AttendanceCorrectionRequest>
    implements $AttendanceCorrectionRequestCopyWith<$Res> {
  _$AttendanceCorrectionRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? employeeId = null,
    Object? employeeName = freezed,
    Object? correctionDate = null,
    Object? correctionTime = null,
    Object? correctionType = null,
    Object? correctionTypeDisplay = freezed,
    Object? reason = null,
    Object? approvalStatus = null,
    Object? approvalStatusDisplay = freezed,
    Object? approvedByName = freezed,
    Object? approvedAt = freezed,
    Object? rejectionReason = freezed,
    Object? canBeModified = null,
    Object? correctionSummary = freezed,
    Object? createdAtUtc = null,
    Object? workflowStatus = freezed,
    Object? currentApproverName = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      employeeName: freezed == employeeName
          ? _value.employeeName
          : employeeName // ignore: cast_nullable_to_non_nullable
              as String?,
      correctionDate: null == correctionDate
          ? _value.correctionDate
          : correctionDate // ignore: cast_nullable_to_non_nullable
              as String,
      correctionTime: null == correctionTime
          ? _value.correctionTime
          : correctionTime // ignore: cast_nullable_to_non_nullable
              as String,
      correctionType: null == correctionType
          ? _value.correctionType
          : correctionType // ignore: cast_nullable_to_non_nullable
              as AttendanceCorrectionType,
      correctionTypeDisplay: freezed == correctionTypeDisplay
          ? _value.correctionTypeDisplay
          : correctionTypeDisplay // ignore: cast_nullable_to_non_nullable
              as String?,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      approvalStatus: null == approvalStatus
          ? _value.approvalStatus
          : approvalStatus // ignore: cast_nullable_to_non_nullable
              as CorrectionApprovalStatus,
      approvalStatusDisplay: freezed == approvalStatusDisplay
          ? _value.approvalStatusDisplay
          : approvalStatusDisplay // ignore: cast_nullable_to_non_nullable
              as String?,
      approvedByName: freezed == approvedByName
          ? _value.approvedByName
          : approvedByName // ignore: cast_nullable_to_non_nullable
              as String?,
      approvedAt: freezed == approvedAt
          ? _value.approvedAt
          : approvedAt // ignore: cast_nullable_to_non_nullable
              as String?,
      rejectionReason: freezed == rejectionReason
          ? _value.rejectionReason
          : rejectionReason // ignore: cast_nullable_to_non_nullable
              as String?,
      canBeModified: null == canBeModified
          ? _value.canBeModified
          : canBeModified // ignore: cast_nullable_to_non_nullable
              as bool,
      correctionSummary: freezed == correctionSummary
          ? _value.correctionSummary
          : correctionSummary // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAtUtc: null == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as String,
      workflowStatus: freezed == workflowStatus
          ? _value.workflowStatus
          : workflowStatus // ignore: cast_nullable_to_non_nullable
              as String?,
      currentApproverName: freezed == currentApproverName
          ? _value.currentApproverName
          : currentApproverName // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$AttendanceCorrectionRequestImplCopyWith<$Res>
    implements $AttendanceCorrectionRequestCopyWith<$Res> {
  factory _$$AttendanceCorrectionRequestImplCopyWith(
          _$AttendanceCorrectionRequestImpl value,
          $Res Function(_$AttendanceCorrectionRequestImpl) then) =
      __$$AttendanceCorrectionRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int id,
      int employeeId,
      String? employeeName,
      String correctionDate,
      String correctionTime,
      AttendanceCorrectionType correctionType,
      String? correctionTypeDisplay,
      String reason,
      CorrectionApprovalStatus approvalStatus,
      String? approvalStatusDisplay,
      String? approvedByName,
      String? approvedAt,
      String? rejectionReason,
      bool canBeModified,
      String? correctionSummary,
      String createdAtUtc,
      String? workflowStatus,
      String? currentApproverName});
}

/// @nodoc
class __$$AttendanceCorrectionRequestImplCopyWithImpl<$Res>
    extends _$AttendanceCorrectionRequestCopyWithImpl<$Res,
        _$AttendanceCorrectionRequestImpl>
    implements _$$AttendanceCorrectionRequestImplCopyWith<$Res> {
  __$$AttendanceCorrectionRequestImplCopyWithImpl(
      _$AttendanceCorrectionRequestImpl _value,
      $Res Function(_$AttendanceCorrectionRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of AttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? employeeId = null,
    Object? employeeName = freezed,
    Object? correctionDate = null,
    Object? correctionTime = null,
    Object? correctionType = null,
    Object? correctionTypeDisplay = freezed,
    Object? reason = null,
    Object? approvalStatus = null,
    Object? approvalStatusDisplay = freezed,
    Object? approvedByName = freezed,
    Object? approvedAt = freezed,
    Object? rejectionReason = freezed,
    Object? canBeModified = null,
    Object? correctionSummary = freezed,
    Object? createdAtUtc = null,
    Object? workflowStatus = freezed,
    Object? currentApproverName = freezed,
  }) {
    return _then(_$AttendanceCorrectionRequestImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      employeeName: freezed == employeeName
          ? _value.employeeName
          : employeeName // ignore: cast_nullable_to_non_nullable
              as String?,
      correctionDate: null == correctionDate
          ? _value.correctionDate
          : correctionDate // ignore: cast_nullable_to_non_nullable
              as String,
      correctionTime: null == correctionTime
          ? _value.correctionTime
          : correctionTime // ignore: cast_nullable_to_non_nullable
              as String,
      correctionType: null == correctionType
          ? _value.correctionType
          : correctionType // ignore: cast_nullable_to_non_nullable
              as AttendanceCorrectionType,
      correctionTypeDisplay: freezed == correctionTypeDisplay
          ? _value.correctionTypeDisplay
          : correctionTypeDisplay // ignore: cast_nullable_to_non_nullable
              as String?,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
      approvalStatus: null == approvalStatus
          ? _value.approvalStatus
          : approvalStatus // ignore: cast_nullable_to_non_nullable
              as CorrectionApprovalStatus,
      approvalStatusDisplay: freezed == approvalStatusDisplay
          ? _value.approvalStatusDisplay
          : approvalStatusDisplay // ignore: cast_nullable_to_non_nullable
              as String?,
      approvedByName: freezed == approvedByName
          ? _value.approvedByName
          : approvedByName // ignore: cast_nullable_to_non_nullable
              as String?,
      approvedAt: freezed == approvedAt
          ? _value.approvedAt
          : approvedAt // ignore: cast_nullable_to_non_nullable
              as String?,
      rejectionReason: freezed == rejectionReason
          ? _value.rejectionReason
          : rejectionReason // ignore: cast_nullable_to_non_nullable
              as String?,
      canBeModified: null == canBeModified
          ? _value.canBeModified
          : canBeModified // ignore: cast_nullable_to_non_nullable
              as bool,
      correctionSummary: freezed == correctionSummary
          ? _value.correctionSummary
          : correctionSummary // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAtUtc: null == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as String,
      workflowStatus: freezed == workflowStatus
          ? _value.workflowStatus
          : workflowStatus // ignore: cast_nullable_to_non_nullable
              as String?,
      currentApproverName: freezed == currentApproverName
          ? _value.currentApproverName
          : currentApproverName // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$AttendanceCorrectionRequestImpl
    implements _AttendanceCorrectionRequest {
  const _$AttendanceCorrectionRequestImpl(
      {required this.id,
      required this.employeeId,
      this.employeeName,
      required this.correctionDate,
      required this.correctionTime,
      required this.correctionType,
      this.correctionTypeDisplay,
      required this.reason,
      required this.approvalStatus,
      this.approvalStatusDisplay,
      this.approvedByName,
      this.approvedAt,
      this.rejectionReason,
      this.canBeModified = false,
      this.correctionSummary,
      required this.createdAtUtc,
      this.workflowStatus,
      this.currentApproverName});

  factory _$AttendanceCorrectionRequestImpl.fromJson(
          Map<String, dynamic> json) =>
      _$$AttendanceCorrectionRequestImplFromJson(json);

  @override
  final int id;
  @override
  final int employeeId;
  @override
  final String? employeeName;
  @override
  final String correctionDate;
  @override
  final String correctionTime;
  @override
  final AttendanceCorrectionType correctionType;
  @override
  final String? correctionTypeDisplay;
  @override
  final String reason;
  @override
  final CorrectionApprovalStatus approvalStatus;
  @override
  final String? approvalStatusDisplay;
  @override
  final String? approvedByName;
  @override
  final String? approvedAt;
  @override
  final String? rejectionReason;
  @override
  @JsonKey()
  final bool canBeModified;
  @override
  final String? correctionSummary;
  @override
  final String createdAtUtc;
  @override
  final String? workflowStatus;
  @override
  final String? currentApproverName;

  @override
  String toString() {
    return 'AttendanceCorrectionRequest(id: $id, employeeId: $employeeId, employeeName: $employeeName, correctionDate: $correctionDate, correctionTime: $correctionTime, correctionType: $correctionType, correctionTypeDisplay: $correctionTypeDisplay, reason: $reason, approvalStatus: $approvalStatus, approvalStatusDisplay: $approvalStatusDisplay, approvedByName: $approvedByName, approvedAt: $approvedAt, rejectionReason: $rejectionReason, canBeModified: $canBeModified, correctionSummary: $correctionSummary, createdAtUtc: $createdAtUtc, workflowStatus: $workflowStatus, currentApproverName: $currentApproverName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AttendanceCorrectionRequestImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.employeeId, employeeId) ||
                other.employeeId == employeeId) &&
            (identical(other.employeeName, employeeName) ||
                other.employeeName == employeeName) &&
            (identical(other.correctionDate, correctionDate) ||
                other.correctionDate == correctionDate) &&
            (identical(other.correctionTime, correctionTime) ||
                other.correctionTime == correctionTime) &&
            (identical(other.correctionType, correctionType) ||
                other.correctionType == correctionType) &&
            (identical(other.correctionTypeDisplay, correctionTypeDisplay) ||
                other.correctionTypeDisplay == correctionTypeDisplay) &&
            (identical(other.reason, reason) || other.reason == reason) &&
            (identical(other.approvalStatus, approvalStatus) ||
                other.approvalStatus == approvalStatus) &&
            (identical(other.approvalStatusDisplay, approvalStatusDisplay) ||
                other.approvalStatusDisplay == approvalStatusDisplay) &&
            (identical(other.approvedByName, approvedByName) ||
                other.approvedByName == approvedByName) &&
            (identical(other.approvedAt, approvedAt) ||
                other.approvedAt == approvedAt) &&
            (identical(other.rejectionReason, rejectionReason) ||
                other.rejectionReason == rejectionReason) &&
            (identical(other.canBeModified, canBeModified) ||
                other.canBeModified == canBeModified) &&
            (identical(other.correctionSummary, correctionSummary) ||
                other.correctionSummary == correctionSummary) &&
            (identical(other.createdAtUtc, createdAtUtc) ||
                other.createdAtUtc == createdAtUtc) &&
            (identical(other.workflowStatus, workflowStatus) ||
                other.workflowStatus == workflowStatus) &&
            (identical(other.currentApproverName, currentApproverName) ||
                other.currentApproverName == currentApproverName));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      employeeId,
      employeeName,
      correctionDate,
      correctionTime,
      correctionType,
      correctionTypeDisplay,
      reason,
      approvalStatus,
      approvalStatusDisplay,
      approvedByName,
      approvedAt,
      rejectionReason,
      canBeModified,
      correctionSummary,
      createdAtUtc,
      workflowStatus,
      currentApproverName);

  /// Create a copy of AttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AttendanceCorrectionRequestImplCopyWith<_$AttendanceCorrectionRequestImpl>
      get copyWith => __$$AttendanceCorrectionRequestImplCopyWithImpl<
          _$AttendanceCorrectionRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AttendanceCorrectionRequestImplToJson(
      this,
    );
  }
}

abstract class _AttendanceCorrectionRequest
    implements AttendanceCorrectionRequest {
  const factory _AttendanceCorrectionRequest(
      {required final int id,
      required final int employeeId,
      final String? employeeName,
      required final String correctionDate,
      required final String correctionTime,
      required final AttendanceCorrectionType correctionType,
      final String? correctionTypeDisplay,
      required final String reason,
      required final CorrectionApprovalStatus approvalStatus,
      final String? approvalStatusDisplay,
      final String? approvedByName,
      final String? approvedAt,
      final String? rejectionReason,
      final bool canBeModified,
      final String? correctionSummary,
      required final String createdAtUtc,
      final String? workflowStatus,
      final String? currentApproverName}) = _$AttendanceCorrectionRequestImpl;

  factory _AttendanceCorrectionRequest.fromJson(Map<String, dynamic> json) =
      _$AttendanceCorrectionRequestImpl.fromJson;

  @override
  int get id;
  @override
  int get employeeId;
  @override
  String? get employeeName;
  @override
  String get correctionDate;
  @override
  String get correctionTime;
  @override
  AttendanceCorrectionType get correctionType;
  @override
  String? get correctionTypeDisplay;
  @override
  String get reason;
  @override
  CorrectionApprovalStatus get approvalStatus;
  @override
  String? get approvalStatusDisplay;
  @override
  String? get approvedByName;
  @override
  String? get approvedAt;
  @override
  String? get rejectionReason;
  @override
  bool get canBeModified;
  @override
  String? get correctionSummary;
  @override
  String get createdAtUtc;
  @override
  String? get workflowStatus;
  @override
  String? get currentApproverName;

  /// Create a copy of AttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AttendanceCorrectionRequestImplCopyWith<_$AttendanceCorrectionRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}

CreateAttendanceCorrectionRequest _$CreateAttendanceCorrectionRequestFromJson(
    Map<String, dynamic> json) {
  return _CreateAttendanceCorrectionRequest.fromJson(json);
}

/// @nodoc
mixin _$CreateAttendanceCorrectionRequest {
  int get employeeId => throw _privateConstructorUsedError;
  String get correctionDate => throw _privateConstructorUsedError;
  String get correctionTime => throw _privateConstructorUsedError;
  int get correctionType => throw _privateConstructorUsedError;
  String get reason => throw _privateConstructorUsedError;

  /// Serializes this CreateAttendanceCorrectionRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateAttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateAttendanceCorrectionRequestCopyWith<CreateAttendanceCorrectionRequest>
      get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateAttendanceCorrectionRequestCopyWith<$Res> {
  factory $CreateAttendanceCorrectionRequestCopyWith(
          CreateAttendanceCorrectionRequest value,
          $Res Function(CreateAttendanceCorrectionRequest) then) =
      _$CreateAttendanceCorrectionRequestCopyWithImpl<$Res,
          CreateAttendanceCorrectionRequest>;
  @useResult
  $Res call(
      {int employeeId,
      String correctionDate,
      String correctionTime,
      int correctionType,
      String reason});
}

/// @nodoc
class _$CreateAttendanceCorrectionRequestCopyWithImpl<$Res,
        $Val extends CreateAttendanceCorrectionRequest>
    implements $CreateAttendanceCorrectionRequestCopyWith<$Res> {
  _$CreateAttendanceCorrectionRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateAttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? employeeId = null,
    Object? correctionDate = null,
    Object? correctionTime = null,
    Object? correctionType = null,
    Object? reason = null,
  }) {
    return _then(_value.copyWith(
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      correctionDate: null == correctionDate
          ? _value.correctionDate
          : correctionDate // ignore: cast_nullable_to_non_nullable
              as String,
      correctionTime: null == correctionTime
          ? _value.correctionTime
          : correctionTime // ignore: cast_nullable_to_non_nullable
              as String,
      correctionType: null == correctionType
          ? _value.correctionType
          : correctionType // ignore: cast_nullable_to_non_nullable
              as int,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CreateAttendanceCorrectionRequestImplCopyWith<$Res>
    implements $CreateAttendanceCorrectionRequestCopyWith<$Res> {
  factory _$$CreateAttendanceCorrectionRequestImplCopyWith(
          _$CreateAttendanceCorrectionRequestImpl value,
          $Res Function(_$CreateAttendanceCorrectionRequestImpl) then) =
      __$$CreateAttendanceCorrectionRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int employeeId,
      String correctionDate,
      String correctionTime,
      int correctionType,
      String reason});
}

/// @nodoc
class __$$CreateAttendanceCorrectionRequestImplCopyWithImpl<$Res>
    extends _$CreateAttendanceCorrectionRequestCopyWithImpl<$Res,
        _$CreateAttendanceCorrectionRequestImpl>
    implements _$$CreateAttendanceCorrectionRequestImplCopyWith<$Res> {
  __$$CreateAttendanceCorrectionRequestImplCopyWithImpl(
      _$CreateAttendanceCorrectionRequestImpl _value,
      $Res Function(_$CreateAttendanceCorrectionRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CreateAttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? employeeId = null,
    Object? correctionDate = null,
    Object? correctionTime = null,
    Object? correctionType = null,
    Object? reason = null,
  }) {
    return _then(_$CreateAttendanceCorrectionRequestImpl(
      employeeId: null == employeeId
          ? _value.employeeId
          : employeeId // ignore: cast_nullable_to_non_nullable
              as int,
      correctionDate: null == correctionDate
          ? _value.correctionDate
          : correctionDate // ignore: cast_nullable_to_non_nullable
              as String,
      correctionTime: null == correctionTime
          ? _value.correctionTime
          : correctionTime // ignore: cast_nullable_to_non_nullable
              as String,
      correctionType: null == correctionType
          ? _value.correctionType
          : correctionType // ignore: cast_nullable_to_non_nullable
              as int,
      reason: null == reason
          ? _value.reason
          : reason // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateAttendanceCorrectionRequestImpl
    implements _CreateAttendanceCorrectionRequest {
  const _$CreateAttendanceCorrectionRequestImpl(
      {required this.employeeId,
      required this.correctionDate,
      required this.correctionTime,
      required this.correctionType,
      required this.reason});

  factory _$CreateAttendanceCorrectionRequestImpl.fromJson(
          Map<String, dynamic> json) =>
      _$$CreateAttendanceCorrectionRequestImplFromJson(json);

  @override
  final int employeeId;
  @override
  final String correctionDate;
  @override
  final String correctionTime;
  @override
  final int correctionType;
  @override
  final String reason;

  @override
  String toString() {
    return 'CreateAttendanceCorrectionRequest(employeeId: $employeeId, correctionDate: $correctionDate, correctionTime: $correctionTime, correctionType: $correctionType, reason: $reason)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateAttendanceCorrectionRequestImpl &&
            (identical(other.employeeId, employeeId) ||
                other.employeeId == employeeId) &&
            (identical(other.correctionDate, correctionDate) ||
                other.correctionDate == correctionDate) &&
            (identical(other.correctionTime, correctionTime) ||
                other.correctionTime == correctionTime) &&
            (identical(other.correctionType, correctionType) ||
                other.correctionType == correctionType) &&
            (identical(other.reason, reason) || other.reason == reason));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, employeeId, correctionDate,
      correctionTime, correctionType, reason);

  /// Create a copy of CreateAttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateAttendanceCorrectionRequestImplCopyWith<
          _$CreateAttendanceCorrectionRequestImpl>
      get copyWith => __$$CreateAttendanceCorrectionRequestImplCopyWithImpl<
          _$CreateAttendanceCorrectionRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateAttendanceCorrectionRequestImplToJson(
      this,
    );
  }
}

abstract class _CreateAttendanceCorrectionRequest
    implements CreateAttendanceCorrectionRequest {
  const factory _CreateAttendanceCorrectionRequest(
      {required final int employeeId,
      required final String correctionDate,
      required final String correctionTime,
      required final int correctionType,
      required final String reason}) = _$CreateAttendanceCorrectionRequestImpl;

  factory _CreateAttendanceCorrectionRequest.fromJson(
          Map<String, dynamic> json) =
      _$CreateAttendanceCorrectionRequestImpl.fromJson;

  @override
  int get employeeId;
  @override
  String get correctionDate;
  @override
  String get correctionTime;
  @override
  int get correctionType;
  @override
  String get reason;

  /// Create a copy of CreateAttendanceCorrectionRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateAttendanceCorrectionRequestImplCopyWith<
          _$CreateAttendanceCorrectionRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}
