// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'attendance_history_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

DailyAttendance _$DailyAttendanceFromJson(Map<String, dynamic> json) {
  return _DailyAttendance.fromJson(json);
}

/// @nodoc
mixin _$DailyAttendance {
  DateTime get date => throw _privateConstructorUsedError;
  AttendanceStatus get status => throw _privateConstructorUsedError;
  String? get checkInTime => throw _privateConstructorUsedError;
  String? get checkOutTime => throw _privateConstructorUsedError;
  int? get workedMinutes => throw _privateConstructorUsedError;
  int? get overtimeMinutes => throw _privateConstructorUsedError;
  int? get lateMinutes => throw _privateConstructorUsedError;
  int? get earlyLeaveMinutes => throw _privateConstructorUsedError;
  String? get shiftName => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;
  List<AttendanceTransaction>? get transactions =>
      throw _privateConstructorUsedError;

  /// Serializes this DailyAttendance to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of DailyAttendance
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $DailyAttendanceCopyWith<DailyAttendance> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DailyAttendanceCopyWith<$Res> {
  factory $DailyAttendanceCopyWith(
          DailyAttendance value, $Res Function(DailyAttendance) then) =
      _$DailyAttendanceCopyWithImpl<$Res, DailyAttendance>;
  @useResult
  $Res call(
      {DateTime date,
      AttendanceStatus status,
      String? checkInTime,
      String? checkOutTime,
      int? workedMinutes,
      int? overtimeMinutes,
      int? lateMinutes,
      int? earlyLeaveMinutes,
      String? shiftName,
      String? notes,
      List<AttendanceTransaction>? transactions});
}

/// @nodoc
class _$DailyAttendanceCopyWithImpl<$Res, $Val extends DailyAttendance>
    implements $DailyAttendanceCopyWith<$Res> {
  _$DailyAttendanceCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of DailyAttendance
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? date = null,
    Object? status = null,
    Object? checkInTime = freezed,
    Object? checkOutTime = freezed,
    Object? workedMinutes = freezed,
    Object? overtimeMinutes = freezed,
    Object? lateMinutes = freezed,
    Object? earlyLeaveMinutes = freezed,
    Object? shiftName = freezed,
    Object? notes = freezed,
    Object? transactions = freezed,
  }) {
    return _then(_value.copyWith(
      date: null == date
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as AttendanceStatus,
      checkInTime: freezed == checkInTime
          ? _value.checkInTime
          : checkInTime // ignore: cast_nullable_to_non_nullable
              as String?,
      checkOutTime: freezed == checkOutTime
          ? _value.checkOutTime
          : checkOutTime // ignore: cast_nullable_to_non_nullable
              as String?,
      workedMinutes: freezed == workedMinutes
          ? _value.workedMinutes
          : workedMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      overtimeMinutes: freezed == overtimeMinutes
          ? _value.overtimeMinutes
          : overtimeMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      lateMinutes: freezed == lateMinutes
          ? _value.lateMinutes
          : lateMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      earlyLeaveMinutes: freezed == earlyLeaveMinutes
          ? _value.earlyLeaveMinutes
          : earlyLeaveMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      shiftName: freezed == shiftName
          ? _value.shiftName
          : shiftName // ignore: cast_nullable_to_non_nullable
              as String?,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
      transactions: freezed == transactions
          ? _value.transactions
          : transactions // ignore: cast_nullable_to_non_nullable
              as List<AttendanceTransaction>?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$DailyAttendanceImplCopyWith<$Res>
    implements $DailyAttendanceCopyWith<$Res> {
  factory _$$DailyAttendanceImplCopyWith(_$DailyAttendanceImpl value,
          $Res Function(_$DailyAttendanceImpl) then) =
      __$$DailyAttendanceImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {DateTime date,
      AttendanceStatus status,
      String? checkInTime,
      String? checkOutTime,
      int? workedMinutes,
      int? overtimeMinutes,
      int? lateMinutes,
      int? earlyLeaveMinutes,
      String? shiftName,
      String? notes,
      List<AttendanceTransaction>? transactions});
}

/// @nodoc
class __$$DailyAttendanceImplCopyWithImpl<$Res>
    extends _$DailyAttendanceCopyWithImpl<$Res, _$DailyAttendanceImpl>
    implements _$$DailyAttendanceImplCopyWith<$Res> {
  __$$DailyAttendanceImplCopyWithImpl(
      _$DailyAttendanceImpl _value, $Res Function(_$DailyAttendanceImpl) _then)
      : super(_value, _then);

  /// Create a copy of DailyAttendance
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? date = null,
    Object? status = null,
    Object? checkInTime = freezed,
    Object? checkOutTime = freezed,
    Object? workedMinutes = freezed,
    Object? overtimeMinutes = freezed,
    Object? lateMinutes = freezed,
    Object? earlyLeaveMinutes = freezed,
    Object? shiftName = freezed,
    Object? notes = freezed,
    Object? transactions = freezed,
  }) {
    return _then(_$DailyAttendanceImpl(
      date: null == date
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as AttendanceStatus,
      checkInTime: freezed == checkInTime
          ? _value.checkInTime
          : checkInTime // ignore: cast_nullable_to_non_nullable
              as String?,
      checkOutTime: freezed == checkOutTime
          ? _value.checkOutTime
          : checkOutTime // ignore: cast_nullable_to_non_nullable
              as String?,
      workedMinutes: freezed == workedMinutes
          ? _value.workedMinutes
          : workedMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      overtimeMinutes: freezed == overtimeMinutes
          ? _value.overtimeMinutes
          : overtimeMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      lateMinutes: freezed == lateMinutes
          ? _value.lateMinutes
          : lateMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      earlyLeaveMinutes: freezed == earlyLeaveMinutes
          ? _value.earlyLeaveMinutes
          : earlyLeaveMinutes // ignore: cast_nullable_to_non_nullable
              as int?,
      shiftName: freezed == shiftName
          ? _value.shiftName
          : shiftName // ignore: cast_nullable_to_non_nullable
              as String?,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
      transactions: freezed == transactions
          ? _value._transactions
          : transactions // ignore: cast_nullable_to_non_nullable
              as List<AttendanceTransaction>?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$DailyAttendanceImpl implements _DailyAttendance {
  const _$DailyAttendanceImpl(
      {required this.date,
      required this.status,
      this.checkInTime,
      this.checkOutTime,
      this.workedMinutes,
      this.overtimeMinutes,
      this.lateMinutes,
      this.earlyLeaveMinutes,
      this.shiftName,
      this.notes,
      final List<AttendanceTransaction>? transactions})
      : _transactions = transactions;

  factory _$DailyAttendanceImpl.fromJson(Map<String, dynamic> json) =>
      _$$DailyAttendanceImplFromJson(json);

  @override
  final DateTime date;
  @override
  final AttendanceStatus status;
  @override
  final String? checkInTime;
  @override
  final String? checkOutTime;
  @override
  final int? workedMinutes;
  @override
  final int? overtimeMinutes;
  @override
  final int? lateMinutes;
  @override
  final int? earlyLeaveMinutes;
  @override
  final String? shiftName;
  @override
  final String? notes;
  final List<AttendanceTransaction>? _transactions;
  @override
  List<AttendanceTransaction>? get transactions {
    final value = _transactions;
    if (value == null) return null;
    if (_transactions is EqualUnmodifiableListView) return _transactions;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString() {
    return 'DailyAttendance(date: $date, status: $status, checkInTime: $checkInTime, checkOutTime: $checkOutTime, workedMinutes: $workedMinutes, overtimeMinutes: $overtimeMinutes, lateMinutes: $lateMinutes, earlyLeaveMinutes: $earlyLeaveMinutes, shiftName: $shiftName, notes: $notes, transactions: $transactions)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DailyAttendanceImpl &&
            (identical(other.date, date) || other.date == date) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.checkInTime, checkInTime) ||
                other.checkInTime == checkInTime) &&
            (identical(other.checkOutTime, checkOutTime) ||
                other.checkOutTime == checkOutTime) &&
            (identical(other.workedMinutes, workedMinutes) ||
                other.workedMinutes == workedMinutes) &&
            (identical(other.overtimeMinutes, overtimeMinutes) ||
                other.overtimeMinutes == overtimeMinutes) &&
            (identical(other.lateMinutes, lateMinutes) ||
                other.lateMinutes == lateMinutes) &&
            (identical(other.earlyLeaveMinutes, earlyLeaveMinutes) ||
                other.earlyLeaveMinutes == earlyLeaveMinutes) &&
            (identical(other.shiftName, shiftName) ||
                other.shiftName == shiftName) &&
            (identical(other.notes, notes) || other.notes == notes) &&
            const DeepCollectionEquality()
                .equals(other._transactions, _transactions));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      date,
      status,
      checkInTime,
      checkOutTime,
      workedMinutes,
      overtimeMinutes,
      lateMinutes,
      earlyLeaveMinutes,
      shiftName,
      notes,
      const DeepCollectionEquality().hash(_transactions));

  /// Create a copy of DailyAttendance
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$DailyAttendanceImplCopyWith<_$DailyAttendanceImpl> get copyWith =>
      __$$DailyAttendanceImplCopyWithImpl<_$DailyAttendanceImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$DailyAttendanceImplToJson(
      this,
    );
  }
}

abstract class _DailyAttendance implements DailyAttendance {
  const factory _DailyAttendance(
      {required final DateTime date,
      required final AttendanceStatus status,
      final String? checkInTime,
      final String? checkOutTime,
      final int? workedMinutes,
      final int? overtimeMinutes,
      final int? lateMinutes,
      final int? earlyLeaveMinutes,
      final String? shiftName,
      final String? notes,
      final List<AttendanceTransaction>? transactions}) = _$DailyAttendanceImpl;

  factory _DailyAttendance.fromJson(Map<String, dynamic> json) =
      _$DailyAttendanceImpl.fromJson;

  @override
  DateTime get date;
  @override
  AttendanceStatus get status;
  @override
  String? get checkInTime;
  @override
  String? get checkOutTime;
  @override
  int? get workedMinutes;
  @override
  int? get overtimeMinutes;
  @override
  int? get lateMinutes;
  @override
  int? get earlyLeaveMinutes;
  @override
  String? get shiftName;
  @override
  String? get notes;
  @override
  List<AttendanceTransaction>? get transactions;

  /// Create a copy of DailyAttendance
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$DailyAttendanceImplCopyWith<_$DailyAttendanceImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

AttendanceTransaction _$AttendanceTransactionFromJson(
    Map<String, dynamic> json) {
  return _AttendanceTransaction.fromJson(json);
}

/// @nodoc
mixin _$AttendanceTransaction {
  String get id => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;
  String get type => throw _privateConstructorUsedError; // CheckIn, CheckOut
  double? get latitude => throw _privateConstructorUsedError;
  double? get longitude => throw _privateConstructorUsedError;
  String? get nfcTagId => throw _privateConstructorUsedError;
  String? get verificationMethod =>
      throw _privateConstructorUsedError; // GPS, NFC, Both
  bool? get isValid => throw _privateConstructorUsedError;
  String? get invalidReason => throw _privateConstructorUsedError;

  /// Serializes this AttendanceTransaction to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AttendanceTransaction
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AttendanceTransactionCopyWith<AttendanceTransaction> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AttendanceTransactionCopyWith<$Res> {
  factory $AttendanceTransactionCopyWith(AttendanceTransaction value,
          $Res Function(AttendanceTransaction) then) =
      _$AttendanceTransactionCopyWithImpl<$Res, AttendanceTransaction>;
  @useResult
  $Res call(
      {String id,
      DateTime timestamp,
      String type,
      double? latitude,
      double? longitude,
      String? nfcTagId,
      String? verificationMethod,
      bool? isValid,
      String? invalidReason});
}

/// @nodoc
class _$AttendanceTransactionCopyWithImpl<$Res,
        $Val extends AttendanceTransaction>
    implements $AttendanceTransactionCopyWith<$Res> {
  _$AttendanceTransactionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AttendanceTransaction
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? timestamp = null,
    Object? type = null,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? nfcTagId = freezed,
    Object? verificationMethod = freezed,
    Object? isValid = freezed,
    Object? invalidReason = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      nfcTagId: freezed == nfcTagId
          ? _value.nfcTagId
          : nfcTagId // ignore: cast_nullable_to_non_nullable
              as String?,
      verificationMethod: freezed == verificationMethod
          ? _value.verificationMethod
          : verificationMethod // ignore: cast_nullable_to_non_nullable
              as String?,
      isValid: freezed == isValid
          ? _value.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool?,
      invalidReason: freezed == invalidReason
          ? _value.invalidReason
          : invalidReason // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$AttendanceTransactionImplCopyWith<$Res>
    implements $AttendanceTransactionCopyWith<$Res> {
  factory _$$AttendanceTransactionImplCopyWith(
          _$AttendanceTransactionImpl value,
          $Res Function(_$AttendanceTransactionImpl) then) =
      __$$AttendanceTransactionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      DateTime timestamp,
      String type,
      double? latitude,
      double? longitude,
      String? nfcTagId,
      String? verificationMethod,
      bool? isValid,
      String? invalidReason});
}

/// @nodoc
class __$$AttendanceTransactionImplCopyWithImpl<$Res>
    extends _$AttendanceTransactionCopyWithImpl<$Res,
        _$AttendanceTransactionImpl>
    implements _$$AttendanceTransactionImplCopyWith<$Res> {
  __$$AttendanceTransactionImplCopyWithImpl(_$AttendanceTransactionImpl _value,
      $Res Function(_$AttendanceTransactionImpl) _then)
      : super(_value, _then);

  /// Create a copy of AttendanceTransaction
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? timestamp = null,
    Object? type = null,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? nfcTagId = freezed,
    Object? verificationMethod = freezed,
    Object? isValid = freezed,
    Object? invalidReason = freezed,
  }) {
    return _then(_$AttendanceTransactionImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      nfcTagId: freezed == nfcTagId
          ? _value.nfcTagId
          : nfcTagId // ignore: cast_nullable_to_non_nullable
              as String?,
      verificationMethod: freezed == verificationMethod
          ? _value.verificationMethod
          : verificationMethod // ignore: cast_nullable_to_non_nullable
              as String?,
      isValid: freezed == isValid
          ? _value.isValid
          : isValid // ignore: cast_nullable_to_non_nullable
              as bool?,
      invalidReason: freezed == invalidReason
          ? _value.invalidReason
          : invalidReason // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$AttendanceTransactionImpl implements _AttendanceTransaction {
  const _$AttendanceTransactionImpl(
      {required this.id,
      required this.timestamp,
      required this.type,
      this.latitude,
      this.longitude,
      this.nfcTagId,
      this.verificationMethod,
      this.isValid,
      this.invalidReason});

  factory _$AttendanceTransactionImpl.fromJson(Map<String, dynamic> json) =>
      _$$AttendanceTransactionImplFromJson(json);

  @override
  final String id;
  @override
  final DateTime timestamp;
  @override
  final String type;
// CheckIn, CheckOut
  @override
  final double? latitude;
  @override
  final double? longitude;
  @override
  final String? nfcTagId;
  @override
  final String? verificationMethod;
// GPS, NFC, Both
  @override
  final bool? isValid;
  @override
  final String? invalidReason;

  @override
  String toString() {
    return 'AttendanceTransaction(id: $id, timestamp: $timestamp, type: $type, latitude: $latitude, longitude: $longitude, nfcTagId: $nfcTagId, verificationMethod: $verificationMethod, isValid: $isValid, invalidReason: $invalidReason)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AttendanceTransactionImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.nfcTagId, nfcTagId) ||
                other.nfcTagId == nfcTagId) &&
            (identical(other.verificationMethod, verificationMethod) ||
                other.verificationMethod == verificationMethod) &&
            (identical(other.isValid, isValid) || other.isValid == isValid) &&
            (identical(other.invalidReason, invalidReason) ||
                other.invalidReason == invalidReason));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, id, timestamp, type, latitude,
      longitude, nfcTagId, verificationMethod, isValid, invalidReason);

  /// Create a copy of AttendanceTransaction
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AttendanceTransactionImplCopyWith<_$AttendanceTransactionImpl>
      get copyWith => __$$AttendanceTransactionImplCopyWithImpl<
          _$AttendanceTransactionImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AttendanceTransactionImplToJson(
      this,
    );
  }
}

abstract class _AttendanceTransaction implements AttendanceTransaction {
  const factory _AttendanceTransaction(
      {required final String id,
      required final DateTime timestamp,
      required final String type,
      final double? latitude,
      final double? longitude,
      final String? nfcTagId,
      final String? verificationMethod,
      final bool? isValid,
      final String? invalidReason}) = _$AttendanceTransactionImpl;

  factory _AttendanceTransaction.fromJson(Map<String, dynamic> json) =
      _$AttendanceTransactionImpl.fromJson;

  @override
  String get id;
  @override
  DateTime get timestamp;
  @override
  String get type; // CheckIn, CheckOut
  @override
  double? get latitude;
  @override
  double? get longitude;
  @override
  String? get nfcTagId;
  @override
  String? get verificationMethod; // GPS, NFC, Both
  @override
  bool? get isValid;
  @override
  String? get invalidReason;

  /// Create a copy of AttendanceTransaction
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AttendanceTransactionImplCopyWith<_$AttendanceTransactionImpl>
      get copyWith => throw _privateConstructorUsedError;
}

MonthlyAttendanceSummary _$MonthlyAttendanceSummaryFromJson(
    Map<String, dynamic> json) {
  return _MonthlyAttendanceSummary.fromJson(json);
}

/// @nodoc
mixin _$MonthlyAttendanceSummary {
  int get year => throw _privateConstructorUsedError;
  int get month => throw _privateConstructorUsedError;
  int get totalWorkingDays => throw _privateConstructorUsedError;
  int get presentDays => throw _privateConstructorUsedError;
  int get absentDays => throw _privateConstructorUsedError;
  int get lateDays => throw _privateConstructorUsedError;
  int get leaveDays => throw _privateConstructorUsedError;
  int get holidayDays => throw _privateConstructorUsedError;
  int get totalWorkedMinutes => throw _privateConstructorUsedError;
  int get totalOvertimeMinutes => throw _privateConstructorUsedError;
  double get attendancePercentage => throw _privateConstructorUsedError;

  /// Serializes this MonthlyAttendanceSummary to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of MonthlyAttendanceSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $MonthlyAttendanceSummaryCopyWith<MonthlyAttendanceSummary> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MonthlyAttendanceSummaryCopyWith<$Res> {
  factory $MonthlyAttendanceSummaryCopyWith(MonthlyAttendanceSummary value,
          $Res Function(MonthlyAttendanceSummary) then) =
      _$MonthlyAttendanceSummaryCopyWithImpl<$Res, MonthlyAttendanceSummary>;
  @useResult
  $Res call(
      {int year,
      int month,
      int totalWorkingDays,
      int presentDays,
      int absentDays,
      int lateDays,
      int leaveDays,
      int holidayDays,
      int totalWorkedMinutes,
      int totalOvertimeMinutes,
      double attendancePercentage});
}

/// @nodoc
class _$MonthlyAttendanceSummaryCopyWithImpl<$Res,
        $Val extends MonthlyAttendanceSummary>
    implements $MonthlyAttendanceSummaryCopyWith<$Res> {
  _$MonthlyAttendanceSummaryCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of MonthlyAttendanceSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? year = null,
    Object? month = null,
    Object? totalWorkingDays = null,
    Object? presentDays = null,
    Object? absentDays = null,
    Object? lateDays = null,
    Object? leaveDays = null,
    Object? holidayDays = null,
    Object? totalWorkedMinutes = null,
    Object? totalOvertimeMinutes = null,
    Object? attendancePercentage = null,
  }) {
    return _then(_value.copyWith(
      year: null == year
          ? _value.year
          : year // ignore: cast_nullable_to_non_nullable
              as int,
      month: null == month
          ? _value.month
          : month // ignore: cast_nullable_to_non_nullable
              as int,
      totalWorkingDays: null == totalWorkingDays
          ? _value.totalWorkingDays
          : totalWorkingDays // ignore: cast_nullable_to_non_nullable
              as int,
      presentDays: null == presentDays
          ? _value.presentDays
          : presentDays // ignore: cast_nullable_to_non_nullable
              as int,
      absentDays: null == absentDays
          ? _value.absentDays
          : absentDays // ignore: cast_nullable_to_non_nullable
              as int,
      lateDays: null == lateDays
          ? _value.lateDays
          : lateDays // ignore: cast_nullable_to_non_nullable
              as int,
      leaveDays: null == leaveDays
          ? _value.leaveDays
          : leaveDays // ignore: cast_nullable_to_non_nullable
              as int,
      holidayDays: null == holidayDays
          ? _value.holidayDays
          : holidayDays // ignore: cast_nullable_to_non_nullable
              as int,
      totalWorkedMinutes: null == totalWorkedMinutes
          ? _value.totalWorkedMinutes
          : totalWorkedMinutes // ignore: cast_nullable_to_non_nullable
              as int,
      totalOvertimeMinutes: null == totalOvertimeMinutes
          ? _value.totalOvertimeMinutes
          : totalOvertimeMinutes // ignore: cast_nullable_to_non_nullable
              as int,
      attendancePercentage: null == attendancePercentage
          ? _value.attendancePercentage
          : attendancePercentage // ignore: cast_nullable_to_non_nullable
              as double,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$MonthlyAttendanceSummaryImplCopyWith<$Res>
    implements $MonthlyAttendanceSummaryCopyWith<$Res> {
  factory _$$MonthlyAttendanceSummaryImplCopyWith(
          _$MonthlyAttendanceSummaryImpl value,
          $Res Function(_$MonthlyAttendanceSummaryImpl) then) =
      __$$MonthlyAttendanceSummaryImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int year,
      int month,
      int totalWorkingDays,
      int presentDays,
      int absentDays,
      int lateDays,
      int leaveDays,
      int holidayDays,
      int totalWorkedMinutes,
      int totalOvertimeMinutes,
      double attendancePercentage});
}

/// @nodoc
class __$$MonthlyAttendanceSummaryImplCopyWithImpl<$Res>
    extends _$MonthlyAttendanceSummaryCopyWithImpl<$Res,
        _$MonthlyAttendanceSummaryImpl>
    implements _$$MonthlyAttendanceSummaryImplCopyWith<$Res> {
  __$$MonthlyAttendanceSummaryImplCopyWithImpl(
      _$MonthlyAttendanceSummaryImpl _value,
      $Res Function(_$MonthlyAttendanceSummaryImpl) _then)
      : super(_value, _then);

  /// Create a copy of MonthlyAttendanceSummary
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? year = null,
    Object? month = null,
    Object? totalWorkingDays = null,
    Object? presentDays = null,
    Object? absentDays = null,
    Object? lateDays = null,
    Object? leaveDays = null,
    Object? holidayDays = null,
    Object? totalWorkedMinutes = null,
    Object? totalOvertimeMinutes = null,
    Object? attendancePercentage = null,
  }) {
    return _then(_$MonthlyAttendanceSummaryImpl(
      year: null == year
          ? _value.year
          : year // ignore: cast_nullable_to_non_nullable
              as int,
      month: null == month
          ? _value.month
          : month // ignore: cast_nullable_to_non_nullable
              as int,
      totalWorkingDays: null == totalWorkingDays
          ? _value.totalWorkingDays
          : totalWorkingDays // ignore: cast_nullable_to_non_nullable
              as int,
      presentDays: null == presentDays
          ? _value.presentDays
          : presentDays // ignore: cast_nullable_to_non_nullable
              as int,
      absentDays: null == absentDays
          ? _value.absentDays
          : absentDays // ignore: cast_nullable_to_non_nullable
              as int,
      lateDays: null == lateDays
          ? _value.lateDays
          : lateDays // ignore: cast_nullable_to_non_nullable
              as int,
      leaveDays: null == leaveDays
          ? _value.leaveDays
          : leaveDays // ignore: cast_nullable_to_non_nullable
              as int,
      holidayDays: null == holidayDays
          ? _value.holidayDays
          : holidayDays // ignore: cast_nullable_to_non_nullable
              as int,
      totalWorkedMinutes: null == totalWorkedMinutes
          ? _value.totalWorkedMinutes
          : totalWorkedMinutes // ignore: cast_nullable_to_non_nullable
              as int,
      totalOvertimeMinutes: null == totalOvertimeMinutes
          ? _value.totalOvertimeMinutes
          : totalOvertimeMinutes // ignore: cast_nullable_to_non_nullable
              as int,
      attendancePercentage: null == attendancePercentage
          ? _value.attendancePercentage
          : attendancePercentage // ignore: cast_nullable_to_non_nullable
              as double,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$MonthlyAttendanceSummaryImpl implements _MonthlyAttendanceSummary {
  const _$MonthlyAttendanceSummaryImpl(
      {required this.year,
      required this.month,
      required this.totalWorkingDays,
      required this.presentDays,
      required this.absentDays,
      required this.lateDays,
      required this.leaveDays,
      required this.holidayDays,
      required this.totalWorkedMinutes,
      required this.totalOvertimeMinutes,
      required this.attendancePercentage});

  factory _$MonthlyAttendanceSummaryImpl.fromJson(Map<String, dynamic> json) =>
      _$$MonthlyAttendanceSummaryImplFromJson(json);

  @override
  final int year;
  @override
  final int month;
  @override
  final int totalWorkingDays;
  @override
  final int presentDays;
  @override
  final int absentDays;
  @override
  final int lateDays;
  @override
  final int leaveDays;
  @override
  final int holidayDays;
  @override
  final int totalWorkedMinutes;
  @override
  final int totalOvertimeMinutes;
  @override
  final double attendancePercentage;

  @override
  String toString() {
    return 'MonthlyAttendanceSummary(year: $year, month: $month, totalWorkingDays: $totalWorkingDays, presentDays: $presentDays, absentDays: $absentDays, lateDays: $lateDays, leaveDays: $leaveDays, holidayDays: $holidayDays, totalWorkedMinutes: $totalWorkedMinutes, totalOvertimeMinutes: $totalOvertimeMinutes, attendancePercentage: $attendancePercentage)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MonthlyAttendanceSummaryImpl &&
            (identical(other.year, year) || other.year == year) &&
            (identical(other.month, month) || other.month == month) &&
            (identical(other.totalWorkingDays, totalWorkingDays) ||
                other.totalWorkingDays == totalWorkingDays) &&
            (identical(other.presentDays, presentDays) ||
                other.presentDays == presentDays) &&
            (identical(other.absentDays, absentDays) ||
                other.absentDays == absentDays) &&
            (identical(other.lateDays, lateDays) ||
                other.lateDays == lateDays) &&
            (identical(other.leaveDays, leaveDays) ||
                other.leaveDays == leaveDays) &&
            (identical(other.holidayDays, holidayDays) ||
                other.holidayDays == holidayDays) &&
            (identical(other.totalWorkedMinutes, totalWorkedMinutes) ||
                other.totalWorkedMinutes == totalWorkedMinutes) &&
            (identical(other.totalOvertimeMinutes, totalOvertimeMinutes) ||
                other.totalOvertimeMinutes == totalOvertimeMinutes) &&
            (identical(other.attendancePercentage, attendancePercentage) ||
                other.attendancePercentage == attendancePercentage));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      year,
      month,
      totalWorkingDays,
      presentDays,
      absentDays,
      lateDays,
      leaveDays,
      holidayDays,
      totalWorkedMinutes,
      totalOvertimeMinutes,
      attendancePercentage);

  /// Create a copy of MonthlyAttendanceSummary
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$MonthlyAttendanceSummaryImplCopyWith<_$MonthlyAttendanceSummaryImpl>
      get copyWith => __$$MonthlyAttendanceSummaryImplCopyWithImpl<
          _$MonthlyAttendanceSummaryImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$MonthlyAttendanceSummaryImplToJson(
      this,
    );
  }
}

abstract class _MonthlyAttendanceSummary implements MonthlyAttendanceSummary {
  const factory _MonthlyAttendanceSummary(
          {required final int year,
          required final int month,
          required final int totalWorkingDays,
          required final int presentDays,
          required final int absentDays,
          required final int lateDays,
          required final int leaveDays,
          required final int holidayDays,
          required final int totalWorkedMinutes,
          required final int totalOvertimeMinutes,
          required final double attendancePercentage}) =
      _$MonthlyAttendanceSummaryImpl;

  factory _MonthlyAttendanceSummary.fromJson(Map<String, dynamic> json) =
      _$MonthlyAttendanceSummaryImpl.fromJson;

  @override
  int get year;
  @override
  int get month;
  @override
  int get totalWorkingDays;
  @override
  int get presentDays;
  @override
  int get absentDays;
  @override
  int get lateDays;
  @override
  int get leaveDays;
  @override
  int get holidayDays;
  @override
  int get totalWorkedMinutes;
  @override
  int get totalOvertimeMinutes;
  @override
  double get attendancePercentage;

  /// Create a copy of MonthlyAttendanceSummary
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$MonthlyAttendanceSummaryImplCopyWith<_$MonthlyAttendanceSummaryImpl>
      get copyWith => throw _privateConstructorUsedError;
}
