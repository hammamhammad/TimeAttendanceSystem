// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'attendance_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

CheckLocationRequest _$CheckLocationRequestFromJson(Map<String, dynamic> json) {
  return _CheckLocationRequest.fromJson(json);
}

/// @nodoc
mixin _$CheckLocationRequest {
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;

  /// Serializes this CheckLocationRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CheckLocationRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CheckLocationRequestCopyWith<CheckLocationRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CheckLocationRequestCopyWith<$Res> {
  factory $CheckLocationRequestCopyWith(CheckLocationRequest value,
          $Res Function(CheckLocationRequest) then) =
      _$CheckLocationRequestCopyWithImpl<$Res, CheckLocationRequest>;
  @useResult
  $Res call({double latitude, double longitude});
}

/// @nodoc
class _$CheckLocationRequestCopyWithImpl<$Res,
        $Val extends CheckLocationRequest>
    implements $CheckLocationRequestCopyWith<$Res> {
  _$CheckLocationRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CheckLocationRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? latitude = null,
    Object? longitude = null,
  }) {
    return _then(_value.copyWith(
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CheckLocationRequestImplCopyWith<$Res>
    implements $CheckLocationRequestCopyWith<$Res> {
  factory _$$CheckLocationRequestImplCopyWith(_$CheckLocationRequestImpl value,
          $Res Function(_$CheckLocationRequestImpl) then) =
      __$$CheckLocationRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({double latitude, double longitude});
}

/// @nodoc
class __$$CheckLocationRequestImplCopyWithImpl<$Res>
    extends _$CheckLocationRequestCopyWithImpl<$Res, _$CheckLocationRequestImpl>
    implements _$$CheckLocationRequestImplCopyWith<$Res> {
  __$$CheckLocationRequestImplCopyWithImpl(_$CheckLocationRequestImpl _value,
      $Res Function(_$CheckLocationRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CheckLocationRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? latitude = null,
    Object? longitude = null,
  }) {
    return _then(_$CheckLocationRequestImpl(
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CheckLocationRequestImpl implements _CheckLocationRequest {
  const _$CheckLocationRequestImpl(
      {required this.latitude, required this.longitude});

  factory _$CheckLocationRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CheckLocationRequestImplFromJson(json);

  @override
  final double latitude;
  @override
  final double longitude;

  @override
  String toString() {
    return 'CheckLocationRequest(latitude: $latitude, longitude: $longitude)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CheckLocationRequestImpl &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, latitude, longitude);

  /// Create a copy of CheckLocationRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CheckLocationRequestImplCopyWith<_$CheckLocationRequestImpl>
      get copyWith =>
          __$$CheckLocationRequestImplCopyWithImpl<_$CheckLocationRequestImpl>(
              this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CheckLocationRequestImplToJson(
      this,
    );
  }
}

abstract class _CheckLocationRequest implements CheckLocationRequest {
  const factory _CheckLocationRequest(
      {required final double latitude,
      required final double longitude}) = _$CheckLocationRequestImpl;

  factory _CheckLocationRequest.fromJson(Map<String, dynamic> json) =
      _$CheckLocationRequestImpl.fromJson;

  @override
  double get latitude;
  @override
  double get longitude;

  /// Create a copy of CheckLocationRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CheckLocationRequestImplCopyWith<_$CheckLocationRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}

CheckLocationResponse _$CheckLocationResponseFromJson(
    Map<String, dynamic> json) {
  return _CheckLocationResponse.fromJson(json);
}

/// @nodoc
mixin _$CheckLocationResponse {
  bool get isWithinGeofence => throw _privateConstructorUsedError;
  double? get distanceMeters => throw _privateConstructorUsedError;
  String? get message => throw _privateConstructorUsedError;

  /// Serializes this CheckLocationResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CheckLocationResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CheckLocationResponseCopyWith<CheckLocationResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CheckLocationResponseCopyWith<$Res> {
  factory $CheckLocationResponseCopyWith(CheckLocationResponse value,
          $Res Function(CheckLocationResponse) then) =
      _$CheckLocationResponseCopyWithImpl<$Res, CheckLocationResponse>;
  @useResult
  $Res call({bool isWithinGeofence, double? distanceMeters, String? message});
}

/// @nodoc
class _$CheckLocationResponseCopyWithImpl<$Res,
        $Val extends CheckLocationResponse>
    implements $CheckLocationResponseCopyWith<$Res> {
  _$CheckLocationResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CheckLocationResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? isWithinGeofence = null,
    Object? distanceMeters = freezed,
    Object? message = freezed,
  }) {
    return _then(_value.copyWith(
      isWithinGeofence: null == isWithinGeofence
          ? _value.isWithinGeofence
          : isWithinGeofence // ignore: cast_nullable_to_non_nullable
              as bool,
      distanceMeters: freezed == distanceMeters
          ? _value.distanceMeters
          : distanceMeters // ignore: cast_nullable_to_non_nullable
              as double?,
      message: freezed == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CheckLocationResponseImplCopyWith<$Res>
    implements $CheckLocationResponseCopyWith<$Res> {
  factory _$$CheckLocationResponseImplCopyWith(
          _$CheckLocationResponseImpl value,
          $Res Function(_$CheckLocationResponseImpl) then) =
      __$$CheckLocationResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({bool isWithinGeofence, double? distanceMeters, String? message});
}

/// @nodoc
class __$$CheckLocationResponseImplCopyWithImpl<$Res>
    extends _$CheckLocationResponseCopyWithImpl<$Res,
        _$CheckLocationResponseImpl>
    implements _$$CheckLocationResponseImplCopyWith<$Res> {
  __$$CheckLocationResponseImplCopyWithImpl(_$CheckLocationResponseImpl _value,
      $Res Function(_$CheckLocationResponseImpl) _then)
      : super(_value, _then);

  /// Create a copy of CheckLocationResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? isWithinGeofence = null,
    Object? distanceMeters = freezed,
    Object? message = freezed,
  }) {
    return _then(_$CheckLocationResponseImpl(
      isWithinGeofence: null == isWithinGeofence
          ? _value.isWithinGeofence
          : isWithinGeofence // ignore: cast_nullable_to_non_nullable
              as bool,
      distanceMeters: freezed == distanceMeters
          ? _value.distanceMeters
          : distanceMeters // ignore: cast_nullable_to_non_nullable
              as double?,
      message: freezed == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CheckLocationResponseImpl implements _CheckLocationResponse {
  const _$CheckLocationResponseImpl(
      {required this.isWithinGeofence,
      required this.distanceMeters,
      this.message});

  factory _$CheckLocationResponseImpl.fromJson(Map<String, dynamic> json) =>
      _$$CheckLocationResponseImplFromJson(json);

  @override
  final bool isWithinGeofence;
  @override
  final double? distanceMeters;
  @override
  final String? message;

  @override
  String toString() {
    return 'CheckLocationResponse(isWithinGeofence: $isWithinGeofence, distanceMeters: $distanceMeters, message: $message)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CheckLocationResponseImpl &&
            (identical(other.isWithinGeofence, isWithinGeofence) ||
                other.isWithinGeofence == isWithinGeofence) &&
            (identical(other.distanceMeters, distanceMeters) ||
                other.distanceMeters == distanceMeters) &&
            (identical(other.message, message) || other.message == message));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, isWithinGeofence, distanceMeters, message);

  /// Create a copy of CheckLocationResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CheckLocationResponseImplCopyWith<_$CheckLocationResponseImpl>
      get copyWith => __$$CheckLocationResponseImplCopyWithImpl<
          _$CheckLocationResponseImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CheckLocationResponseImplToJson(
      this,
    );
  }
}

abstract class _CheckLocationResponse implements CheckLocationResponse {
  const factory _CheckLocationResponse(
      {required final bool isWithinGeofence,
      required final double? distanceMeters,
      final String? message}) = _$CheckLocationResponseImpl;

  factory _CheckLocationResponse.fromJson(Map<String, dynamic> json) =
      _$CheckLocationResponseImpl.fromJson;

  @override
  bool get isWithinGeofence;
  @override
  double? get distanceMeters;
  @override
  String? get message;

  /// Create a copy of CheckLocationResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CheckLocationResponseImplCopyWith<_$CheckLocationResponseImpl>
      get copyWith => throw _privateConstructorUsedError;
}

AttendanceTransactionRequest _$AttendanceTransactionRequestFromJson(
    Map<String, dynamic> json) {
  return _AttendanceTransactionRequest.fromJson(json);
}

/// @nodoc
mixin _$AttendanceTransactionRequest {
  TransactionType get transactionType => throw _privateConstructorUsedError;
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  String? get nfcTagUid => throw _privateConstructorUsedError;
  String get deviceId => throw _privateConstructorUsedError;
  String? get notes => throw _privateConstructorUsedError;

  /// Serializes this AttendanceTransactionRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AttendanceTransactionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AttendanceTransactionRequestCopyWith<AttendanceTransactionRequest>
      get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AttendanceTransactionRequestCopyWith<$Res> {
  factory $AttendanceTransactionRequestCopyWith(
          AttendanceTransactionRequest value,
          $Res Function(AttendanceTransactionRequest) then) =
      _$AttendanceTransactionRequestCopyWithImpl<$Res,
          AttendanceTransactionRequest>;
  @useResult
  $Res call(
      {TransactionType transactionType,
      double latitude,
      double longitude,
      String? nfcTagUid,
      String deviceId,
      String? notes});
}

/// @nodoc
class _$AttendanceTransactionRequestCopyWithImpl<$Res,
        $Val extends AttendanceTransactionRequest>
    implements $AttendanceTransactionRequestCopyWith<$Res> {
  _$AttendanceTransactionRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AttendanceTransactionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? transactionType = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? nfcTagUid = freezed,
    Object? deviceId = null,
    Object? notes = freezed,
  }) {
    return _then(_value.copyWith(
      transactionType: null == transactionType
          ? _value.transactionType
          : transactionType // ignore: cast_nullable_to_non_nullable
              as TransactionType,
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
      nfcTagUid: freezed == nfcTagUid
          ? _value.nfcTagUid
          : nfcTagUid // ignore: cast_nullable_to_non_nullable
              as String?,
      deviceId: null == deviceId
          ? _value.deviceId
          : deviceId // ignore: cast_nullable_to_non_nullable
              as String,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$AttendanceTransactionRequestImplCopyWith<$Res>
    implements $AttendanceTransactionRequestCopyWith<$Res> {
  factory _$$AttendanceTransactionRequestImplCopyWith(
          _$AttendanceTransactionRequestImpl value,
          $Res Function(_$AttendanceTransactionRequestImpl) then) =
      __$$AttendanceTransactionRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {TransactionType transactionType,
      double latitude,
      double longitude,
      String? nfcTagUid,
      String deviceId,
      String? notes});
}

/// @nodoc
class __$$AttendanceTransactionRequestImplCopyWithImpl<$Res>
    extends _$AttendanceTransactionRequestCopyWithImpl<$Res,
        _$AttendanceTransactionRequestImpl>
    implements _$$AttendanceTransactionRequestImplCopyWith<$Res> {
  __$$AttendanceTransactionRequestImplCopyWithImpl(
      _$AttendanceTransactionRequestImpl _value,
      $Res Function(_$AttendanceTransactionRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of AttendanceTransactionRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? transactionType = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? nfcTagUid = freezed,
    Object? deviceId = null,
    Object? notes = freezed,
  }) {
    return _then(_$AttendanceTransactionRequestImpl(
      transactionType: null == transactionType
          ? _value.transactionType
          : transactionType // ignore: cast_nullable_to_non_nullable
              as TransactionType,
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
      nfcTagUid: freezed == nfcTagUid
          ? _value.nfcTagUid
          : nfcTagUid // ignore: cast_nullable_to_non_nullable
              as String?,
      deviceId: null == deviceId
          ? _value.deviceId
          : deviceId // ignore: cast_nullable_to_non_nullable
              as String,
      notes: freezed == notes
          ? _value.notes
          : notes // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$AttendanceTransactionRequestImpl
    implements _AttendanceTransactionRequest {
  const _$AttendanceTransactionRequestImpl(
      {required this.transactionType,
      required this.latitude,
      required this.longitude,
      this.nfcTagUid,
      required this.deviceId,
      this.notes});

  factory _$AttendanceTransactionRequestImpl.fromJson(
          Map<String, dynamic> json) =>
      _$$AttendanceTransactionRequestImplFromJson(json);

  @override
  final TransactionType transactionType;
  @override
  final double latitude;
  @override
  final double longitude;
  @override
  final String? nfcTagUid;
  @override
  final String deviceId;
  @override
  final String? notes;

  @override
  String toString() {
    return 'AttendanceTransactionRequest(transactionType: $transactionType, latitude: $latitude, longitude: $longitude, nfcTagUid: $nfcTagUid, deviceId: $deviceId, notes: $notes)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AttendanceTransactionRequestImpl &&
            (identical(other.transactionType, transactionType) ||
                other.transactionType == transactionType) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.nfcTagUid, nfcTagUid) ||
                other.nfcTagUid == nfcTagUid) &&
            (identical(other.deviceId, deviceId) ||
                other.deviceId == deviceId) &&
            (identical(other.notes, notes) || other.notes == notes));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, transactionType, latitude,
      longitude, nfcTagUid, deviceId, notes);

  /// Create a copy of AttendanceTransactionRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AttendanceTransactionRequestImplCopyWith<
          _$AttendanceTransactionRequestImpl>
      get copyWith => __$$AttendanceTransactionRequestImplCopyWithImpl<
          _$AttendanceTransactionRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AttendanceTransactionRequestImplToJson(
      this,
    );
  }
}

abstract class _AttendanceTransactionRequest
    implements AttendanceTransactionRequest {
  const factory _AttendanceTransactionRequest(
      {required final TransactionType transactionType,
      required final double latitude,
      required final double longitude,
      final String? nfcTagUid,
      required final String deviceId,
      final String? notes}) = _$AttendanceTransactionRequestImpl;

  factory _AttendanceTransactionRequest.fromJson(Map<String, dynamic> json) =
      _$AttendanceTransactionRequestImpl.fromJson;

  @override
  TransactionType get transactionType;
  @override
  double get latitude;
  @override
  double get longitude;
  @override
  String? get nfcTagUid;
  @override
  String get deviceId;
  @override
  String? get notes;

  /// Create a copy of AttendanceTransactionRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AttendanceTransactionRequestImplCopyWith<
          _$AttendanceTransactionRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}

AttendanceTransactionResponse _$AttendanceTransactionResponseFromJson(
    Map<String, dynamic> json) {
  return _AttendanceTransactionResponse.fromJson(json);
}

/// @nodoc
mixin _$AttendanceTransactionResponse {
  bool get success => throw _privateConstructorUsedError;
  String get message => throw _privateConstructorUsedError;
  DateTime get timestamp => throw _privateConstructorUsedError;

  /// Serializes this AttendanceTransactionResponse to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AttendanceTransactionResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AttendanceTransactionResponseCopyWith<AttendanceTransactionResponse>
      get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AttendanceTransactionResponseCopyWith<$Res> {
  factory $AttendanceTransactionResponseCopyWith(
          AttendanceTransactionResponse value,
          $Res Function(AttendanceTransactionResponse) then) =
      _$AttendanceTransactionResponseCopyWithImpl<$Res,
          AttendanceTransactionResponse>;
  @useResult
  $Res call({bool success, String message, DateTime timestamp});
}

/// @nodoc
class _$AttendanceTransactionResponseCopyWithImpl<$Res,
        $Val extends AttendanceTransactionResponse>
    implements $AttendanceTransactionResponseCopyWith<$Res> {
  _$AttendanceTransactionResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AttendanceTransactionResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? success = null,
    Object? message = null,
    Object? timestamp = null,
  }) {
    return _then(_value.copyWith(
      success: null == success
          ? _value.success
          : success // ignore: cast_nullable_to_non_nullable
              as bool,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$AttendanceTransactionResponseImplCopyWith<$Res>
    implements $AttendanceTransactionResponseCopyWith<$Res> {
  factory _$$AttendanceTransactionResponseImplCopyWith(
          _$AttendanceTransactionResponseImpl value,
          $Res Function(_$AttendanceTransactionResponseImpl) then) =
      __$$AttendanceTransactionResponseImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({bool success, String message, DateTime timestamp});
}

/// @nodoc
class __$$AttendanceTransactionResponseImplCopyWithImpl<$Res>
    extends _$AttendanceTransactionResponseCopyWithImpl<$Res,
        _$AttendanceTransactionResponseImpl>
    implements _$$AttendanceTransactionResponseImplCopyWith<$Res> {
  __$$AttendanceTransactionResponseImplCopyWithImpl(
      _$AttendanceTransactionResponseImpl _value,
      $Res Function(_$AttendanceTransactionResponseImpl) _then)
      : super(_value, _then);

  /// Create a copy of AttendanceTransactionResponse
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? success = null,
    Object? message = null,
    Object? timestamp = null,
  }) {
    return _then(_$AttendanceTransactionResponseImpl(
      success: null == success
          ? _value.success
          : success // ignore: cast_nullable_to_non_nullable
              as bool,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$AttendanceTransactionResponseImpl
    implements _AttendanceTransactionResponse {
  const _$AttendanceTransactionResponseImpl(
      {required this.success, required this.message, required this.timestamp});

  factory _$AttendanceTransactionResponseImpl.fromJson(
          Map<String, dynamic> json) =>
      _$$AttendanceTransactionResponseImplFromJson(json);

  @override
  final bool success;
  @override
  final String message;
  @override
  final DateTime timestamp;

  @override
  String toString() {
    return 'AttendanceTransactionResponse(success: $success, message: $message, timestamp: $timestamp)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AttendanceTransactionResponseImpl &&
            (identical(other.success, success) || other.success == success) &&
            (identical(other.message, message) || other.message == message) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, success, message, timestamp);

  /// Create a copy of AttendanceTransactionResponse
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AttendanceTransactionResponseImplCopyWith<
          _$AttendanceTransactionResponseImpl>
      get copyWith => __$$AttendanceTransactionResponseImplCopyWithImpl<
          _$AttendanceTransactionResponseImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AttendanceTransactionResponseImplToJson(
      this,
    );
  }
}

abstract class _AttendanceTransactionResponse
    implements AttendanceTransactionResponse {
  const factory _AttendanceTransactionResponse(
      {required final bool success,
      required final String message,
      required final DateTime timestamp}) = _$AttendanceTransactionResponseImpl;

  factory _AttendanceTransactionResponse.fromJson(Map<String, dynamic> json) =
      _$AttendanceTransactionResponseImpl.fromJson;

  @override
  bool get success;
  @override
  String get message;
  @override
  DateTime get timestamp;

  /// Create a copy of AttendanceTransactionResponse
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AttendanceTransactionResponseImplCopyWith<
          _$AttendanceTransactionResponseImpl>
      get copyWith => throw _privateConstructorUsedError;
}
