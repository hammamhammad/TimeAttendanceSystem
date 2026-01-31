// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'nfc_tag_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

NfcTag _$NfcTagFromJson(Map<String, dynamic> json) {
  return _NfcTag.fromJson(json);
}

/// @nodoc
mixin _$NfcTag {
  String get id => throw _privateConstructorUsedError;
  String get tagUid => throw _privateConstructorUsedError;
  NfcTagStatus get status => throw _privateConstructorUsedError;
  String? get branchId => throw _privateConstructorUsedError;
  String? get branchName => throw _privateConstructorUsedError;
  String? get locationDescription => throw _privateConstructorUsedError;
  bool? get isWriteProtected => throw _privateConstructorUsedError;
  DateTime? get registeredAt => throw _privateConstructorUsedError;
  DateTime? get lastScannedAt => throw _privateConstructorUsedError;
  int? get scanCount => throw _privateConstructorUsedError;

  /// Serializes this NfcTag to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of NfcTag
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NfcTagCopyWith<NfcTag> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NfcTagCopyWith<$Res> {
  factory $NfcTagCopyWith(NfcTag value, $Res Function(NfcTag) then) =
      _$NfcTagCopyWithImpl<$Res, NfcTag>;
  @useResult
  $Res call(
      {String id,
      String tagUid,
      NfcTagStatus status,
      String? branchId,
      String? branchName,
      String? locationDescription,
      bool? isWriteProtected,
      DateTime? registeredAt,
      DateTime? lastScannedAt,
      int? scanCount});
}

/// @nodoc
class _$NfcTagCopyWithImpl<$Res, $Val extends NfcTag>
    implements $NfcTagCopyWith<$Res> {
  _$NfcTagCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NfcTag
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tagUid = null,
    Object? status = null,
    Object? branchId = freezed,
    Object? branchName = freezed,
    Object? locationDescription = freezed,
    Object? isWriteProtected = freezed,
    Object? registeredAt = freezed,
    Object? lastScannedAt = freezed,
    Object? scanCount = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      tagUid: null == tagUid
          ? _value.tagUid
          : tagUid // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as NfcTagStatus,
      branchId: freezed == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String?,
      branchName: freezed == branchName
          ? _value.branchName
          : branchName // ignore: cast_nullable_to_non_nullable
              as String?,
      locationDescription: freezed == locationDescription
          ? _value.locationDescription
          : locationDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      isWriteProtected: freezed == isWriteProtected
          ? _value.isWriteProtected
          : isWriteProtected // ignore: cast_nullable_to_non_nullable
              as bool?,
      registeredAt: freezed == registeredAt
          ? _value.registeredAt
          : registeredAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      lastScannedAt: freezed == lastScannedAt
          ? _value.lastScannedAt
          : lastScannedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      scanCount: freezed == scanCount
          ? _value.scanCount
          : scanCount // ignore: cast_nullable_to_non_nullable
              as int?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$NfcTagImplCopyWith<$Res> implements $NfcTagCopyWith<$Res> {
  factory _$$NfcTagImplCopyWith(
          _$NfcTagImpl value, $Res Function(_$NfcTagImpl) then) =
      __$$NfcTagImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String tagUid,
      NfcTagStatus status,
      String? branchId,
      String? branchName,
      String? locationDescription,
      bool? isWriteProtected,
      DateTime? registeredAt,
      DateTime? lastScannedAt,
      int? scanCount});
}

/// @nodoc
class __$$NfcTagImplCopyWithImpl<$Res>
    extends _$NfcTagCopyWithImpl<$Res, _$NfcTagImpl>
    implements _$$NfcTagImplCopyWith<$Res> {
  __$$NfcTagImplCopyWithImpl(
      _$NfcTagImpl _value, $Res Function(_$NfcTagImpl) _then)
      : super(_value, _then);

  /// Create a copy of NfcTag
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? tagUid = null,
    Object? status = null,
    Object? branchId = freezed,
    Object? branchName = freezed,
    Object? locationDescription = freezed,
    Object? isWriteProtected = freezed,
    Object? registeredAt = freezed,
    Object? lastScannedAt = freezed,
    Object? scanCount = freezed,
  }) {
    return _then(_$NfcTagImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      tagUid: null == tagUid
          ? _value.tagUid
          : tagUid // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as NfcTagStatus,
      branchId: freezed == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String?,
      branchName: freezed == branchName
          ? _value.branchName
          : branchName // ignore: cast_nullable_to_non_nullable
              as String?,
      locationDescription: freezed == locationDescription
          ? _value.locationDescription
          : locationDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      isWriteProtected: freezed == isWriteProtected
          ? _value.isWriteProtected
          : isWriteProtected // ignore: cast_nullable_to_non_nullable
              as bool?,
      registeredAt: freezed == registeredAt
          ? _value.registeredAt
          : registeredAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      lastScannedAt: freezed == lastScannedAt
          ? _value.lastScannedAt
          : lastScannedAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      scanCount: freezed == scanCount
          ? _value.scanCount
          : scanCount // ignore: cast_nullable_to_non_nullable
              as int?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$NfcTagImpl implements _NfcTag {
  const _$NfcTagImpl(
      {required this.id,
      required this.tagUid,
      required this.status,
      this.branchId,
      this.branchName,
      this.locationDescription,
      this.isWriteProtected,
      this.registeredAt,
      this.lastScannedAt,
      this.scanCount});

  factory _$NfcTagImpl.fromJson(Map<String, dynamic> json) =>
      _$$NfcTagImplFromJson(json);

  @override
  final String id;
  @override
  final String tagUid;
  @override
  final NfcTagStatus status;
  @override
  final String? branchId;
  @override
  final String? branchName;
  @override
  final String? locationDescription;
  @override
  final bool? isWriteProtected;
  @override
  final DateTime? registeredAt;
  @override
  final DateTime? lastScannedAt;
  @override
  final int? scanCount;

  @override
  String toString() {
    return 'NfcTag(id: $id, tagUid: $tagUid, status: $status, branchId: $branchId, branchName: $branchName, locationDescription: $locationDescription, isWriteProtected: $isWriteProtected, registeredAt: $registeredAt, lastScannedAt: $lastScannedAt, scanCount: $scanCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NfcTagImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.tagUid, tagUid) || other.tagUid == tagUid) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.branchId, branchId) ||
                other.branchId == branchId) &&
            (identical(other.branchName, branchName) ||
                other.branchName == branchName) &&
            (identical(other.locationDescription, locationDescription) ||
                other.locationDescription == locationDescription) &&
            (identical(other.isWriteProtected, isWriteProtected) ||
                other.isWriteProtected == isWriteProtected) &&
            (identical(other.registeredAt, registeredAt) ||
                other.registeredAt == registeredAt) &&
            (identical(other.lastScannedAt, lastScannedAt) ||
                other.lastScannedAt == lastScannedAt) &&
            (identical(other.scanCount, scanCount) ||
                other.scanCount == scanCount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      tagUid,
      status,
      branchId,
      branchName,
      locationDescription,
      isWriteProtected,
      registeredAt,
      lastScannedAt,
      scanCount);

  /// Create a copy of NfcTag
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NfcTagImplCopyWith<_$NfcTagImpl> get copyWith =>
      __$$NfcTagImplCopyWithImpl<_$NfcTagImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$NfcTagImplToJson(
      this,
    );
  }
}

abstract class _NfcTag implements NfcTag {
  const factory _NfcTag(
      {required final String id,
      required final String tagUid,
      required final NfcTagStatus status,
      final String? branchId,
      final String? branchName,
      final String? locationDescription,
      final bool? isWriteProtected,
      final DateTime? registeredAt,
      final DateTime? lastScannedAt,
      final int? scanCount}) = _$NfcTagImpl;

  factory _NfcTag.fromJson(Map<String, dynamic> json) = _$NfcTagImpl.fromJson;

  @override
  String get id;
  @override
  String get tagUid;
  @override
  NfcTagStatus get status;
  @override
  String? get branchId;
  @override
  String? get branchName;
  @override
  String? get locationDescription;
  @override
  bool? get isWriteProtected;
  @override
  DateTime? get registeredAt;
  @override
  DateTime? get lastScannedAt;
  @override
  int? get scanCount;

  /// Create a copy of NfcTag
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NfcTagImplCopyWith<_$NfcTagImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

RegisterNfcTagRequest _$RegisterNfcTagRequestFromJson(
    Map<String, dynamic> json) {
  return _RegisterNfcTagRequest.fromJson(json);
}

/// @nodoc
mixin _$RegisterNfcTagRequest {
  String get tagUid => throw _privateConstructorUsedError;
  String get branchId => throw _privateConstructorUsedError;
  String? get locationDescription => throw _privateConstructorUsedError;
  bool? get enableWriteProtection => throw _privateConstructorUsedError;

  /// Serializes this RegisterNfcTagRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of RegisterNfcTagRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $RegisterNfcTagRequestCopyWith<RegisterNfcTagRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RegisterNfcTagRequestCopyWith<$Res> {
  factory $RegisterNfcTagRequestCopyWith(RegisterNfcTagRequest value,
          $Res Function(RegisterNfcTagRequest) then) =
      _$RegisterNfcTagRequestCopyWithImpl<$Res, RegisterNfcTagRequest>;
  @useResult
  $Res call(
      {String tagUid,
      String branchId,
      String? locationDescription,
      bool? enableWriteProtection});
}

/// @nodoc
class _$RegisterNfcTagRequestCopyWithImpl<$Res,
        $Val extends RegisterNfcTagRequest>
    implements $RegisterNfcTagRequestCopyWith<$Res> {
  _$RegisterNfcTagRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of RegisterNfcTagRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tagUid = null,
    Object? branchId = null,
    Object? locationDescription = freezed,
    Object? enableWriteProtection = freezed,
  }) {
    return _then(_value.copyWith(
      tagUid: null == tagUid
          ? _value.tagUid
          : tagUid // ignore: cast_nullable_to_non_nullable
              as String,
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      locationDescription: freezed == locationDescription
          ? _value.locationDescription
          : locationDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      enableWriteProtection: freezed == enableWriteProtection
          ? _value.enableWriteProtection
          : enableWriteProtection // ignore: cast_nullable_to_non_nullable
              as bool?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$RegisterNfcTagRequestImplCopyWith<$Res>
    implements $RegisterNfcTagRequestCopyWith<$Res> {
  factory _$$RegisterNfcTagRequestImplCopyWith(
          _$RegisterNfcTagRequestImpl value,
          $Res Function(_$RegisterNfcTagRequestImpl) then) =
      __$$RegisterNfcTagRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String tagUid,
      String branchId,
      String? locationDescription,
      bool? enableWriteProtection});
}

/// @nodoc
class __$$RegisterNfcTagRequestImplCopyWithImpl<$Res>
    extends _$RegisterNfcTagRequestCopyWithImpl<$Res,
        _$RegisterNfcTagRequestImpl>
    implements _$$RegisterNfcTagRequestImplCopyWith<$Res> {
  __$$RegisterNfcTagRequestImplCopyWithImpl(_$RegisterNfcTagRequestImpl _value,
      $Res Function(_$RegisterNfcTagRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of RegisterNfcTagRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tagUid = null,
    Object? branchId = null,
    Object? locationDescription = freezed,
    Object? enableWriteProtection = freezed,
  }) {
    return _then(_$RegisterNfcTagRequestImpl(
      tagUid: null == tagUid
          ? _value.tagUid
          : tagUid // ignore: cast_nullable_to_non_nullable
              as String,
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      locationDescription: freezed == locationDescription
          ? _value.locationDescription
          : locationDescription // ignore: cast_nullable_to_non_nullable
              as String?,
      enableWriteProtection: freezed == enableWriteProtection
          ? _value.enableWriteProtection
          : enableWriteProtection // ignore: cast_nullable_to_non_nullable
              as bool?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$RegisterNfcTagRequestImpl implements _RegisterNfcTagRequest {
  const _$RegisterNfcTagRequestImpl(
      {required this.tagUid,
      required this.branchId,
      this.locationDescription,
      this.enableWriteProtection});

  factory _$RegisterNfcTagRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$RegisterNfcTagRequestImplFromJson(json);

  @override
  final String tagUid;
  @override
  final String branchId;
  @override
  final String? locationDescription;
  @override
  final bool? enableWriteProtection;

  @override
  String toString() {
    return 'RegisterNfcTagRequest(tagUid: $tagUid, branchId: $branchId, locationDescription: $locationDescription, enableWriteProtection: $enableWriteProtection)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$RegisterNfcTagRequestImpl &&
            (identical(other.tagUid, tagUid) || other.tagUid == tagUid) &&
            (identical(other.branchId, branchId) ||
                other.branchId == branchId) &&
            (identical(other.locationDescription, locationDescription) ||
                other.locationDescription == locationDescription) &&
            (identical(other.enableWriteProtection, enableWriteProtection) ||
                other.enableWriteProtection == enableWriteProtection));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, tagUid, branchId,
      locationDescription, enableWriteProtection);

  /// Create a copy of RegisterNfcTagRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$RegisterNfcTagRequestImplCopyWith<_$RegisterNfcTagRequestImpl>
      get copyWith => __$$RegisterNfcTagRequestImplCopyWithImpl<
          _$RegisterNfcTagRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$RegisterNfcTagRequestImplToJson(
      this,
    );
  }
}

abstract class _RegisterNfcTagRequest implements RegisterNfcTagRequest {
  const factory _RegisterNfcTagRequest(
      {required final String tagUid,
      required final String branchId,
      final String? locationDescription,
      final bool? enableWriteProtection}) = _$RegisterNfcTagRequestImpl;

  factory _RegisterNfcTagRequest.fromJson(Map<String, dynamic> json) =
      _$RegisterNfcTagRequestImpl.fromJson;

  @override
  String get tagUid;
  @override
  String get branchId;
  @override
  String? get locationDescription;
  @override
  bool? get enableWriteProtection;

  /// Create a copy of RegisterNfcTagRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$RegisterNfcTagRequestImplCopyWith<_$RegisterNfcTagRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}

NfcWriteData _$NfcWriteDataFromJson(Map<String, dynamic> json) {
  return _NfcWriteData.fromJson(json);
}

/// @nodoc
mixin _$NfcWriteData {
  String get tagId => throw _privateConstructorUsedError;
  String get branchId => throw _privateConstructorUsedError;
  String get verificationCode => throw _privateConstructorUsedError;
  int get timestamp => throw _privateConstructorUsedError;

  /// Serializes this NfcWriteData to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of NfcWriteData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NfcWriteDataCopyWith<NfcWriteData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NfcWriteDataCopyWith<$Res> {
  factory $NfcWriteDataCopyWith(
          NfcWriteData value, $Res Function(NfcWriteData) then) =
      _$NfcWriteDataCopyWithImpl<$Res, NfcWriteData>;
  @useResult
  $Res call(
      {String tagId, String branchId, String verificationCode, int timestamp});
}

/// @nodoc
class _$NfcWriteDataCopyWithImpl<$Res, $Val extends NfcWriteData>
    implements $NfcWriteDataCopyWith<$Res> {
  _$NfcWriteDataCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NfcWriteData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tagId = null,
    Object? branchId = null,
    Object? verificationCode = null,
    Object? timestamp = null,
  }) {
    return _then(_value.copyWith(
      tagId: null == tagId
          ? _value.tagId
          : tagId // ignore: cast_nullable_to_non_nullable
              as String,
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      verificationCode: null == verificationCode
          ? _value.verificationCode
          : verificationCode // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$NfcWriteDataImplCopyWith<$Res>
    implements $NfcWriteDataCopyWith<$Res> {
  factory _$$NfcWriteDataImplCopyWith(
          _$NfcWriteDataImpl value, $Res Function(_$NfcWriteDataImpl) then) =
      __$$NfcWriteDataImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String tagId, String branchId, String verificationCode, int timestamp});
}

/// @nodoc
class __$$NfcWriteDataImplCopyWithImpl<$Res>
    extends _$NfcWriteDataCopyWithImpl<$Res, _$NfcWriteDataImpl>
    implements _$$NfcWriteDataImplCopyWith<$Res> {
  __$$NfcWriteDataImplCopyWithImpl(
      _$NfcWriteDataImpl _value, $Res Function(_$NfcWriteDataImpl) _then)
      : super(_value, _then);

  /// Create a copy of NfcWriteData
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tagId = null,
    Object? branchId = null,
    Object? verificationCode = null,
    Object? timestamp = null,
  }) {
    return _then(_$NfcWriteDataImpl(
      tagId: null == tagId
          ? _value.tagId
          : tagId // ignore: cast_nullable_to_non_nullable
              as String,
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      verificationCode: null == verificationCode
          ? _value.verificationCode
          : verificationCode // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$NfcWriteDataImpl implements _NfcWriteData {
  const _$NfcWriteDataImpl(
      {required this.tagId,
      required this.branchId,
      required this.verificationCode,
      required this.timestamp});

  factory _$NfcWriteDataImpl.fromJson(Map<String, dynamic> json) =>
      _$$NfcWriteDataImplFromJson(json);

  @override
  final String tagId;
  @override
  final String branchId;
  @override
  final String verificationCode;
  @override
  final int timestamp;

  @override
  String toString() {
    return 'NfcWriteData(tagId: $tagId, branchId: $branchId, verificationCode: $verificationCode, timestamp: $timestamp)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NfcWriteDataImpl &&
            (identical(other.tagId, tagId) || other.tagId == tagId) &&
            (identical(other.branchId, branchId) ||
                other.branchId == branchId) &&
            (identical(other.verificationCode, verificationCode) ||
                other.verificationCode == verificationCode) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, tagId, branchId, verificationCode, timestamp);

  /// Create a copy of NfcWriteData
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NfcWriteDataImplCopyWith<_$NfcWriteDataImpl> get copyWith =>
      __$$NfcWriteDataImplCopyWithImpl<_$NfcWriteDataImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$NfcWriteDataImplToJson(
      this,
    );
  }
}

abstract class _NfcWriteData implements NfcWriteData {
  const factory _NfcWriteData(
      {required final String tagId,
      required final String branchId,
      required final String verificationCode,
      required final int timestamp}) = _$NfcWriteDataImpl;

  factory _NfcWriteData.fromJson(Map<String, dynamic> json) =
      _$NfcWriteDataImpl.fromJson;

  @override
  String get tagId;
  @override
  String get branchId;
  @override
  String get verificationCode;
  @override
  int get timestamp;

  /// Create a copy of NfcWriteData
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NfcWriteDataImplCopyWith<_$NfcWriteDataImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
