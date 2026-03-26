// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'notification_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

AppNotification _$AppNotificationFromJson(Map<String, dynamic> json) {
  return _AppNotification.fromJson(json);
}

/// @nodoc
mixin _$AppNotification {
  int get id => throw _privateConstructorUsedError;
  String get titleEn => throw _privateConstructorUsedError;
  String? get titleAr => throw _privateConstructorUsedError;
  String get messageEn => throw _privateConstructorUsedError;
  String? get messageAr => throw _privateConstructorUsedError;
  NotificationType get type => throw _privateConstructorUsedError;
  bool get isRead => throw _privateConstructorUsedError;
  DateTime? get readAt => throw _privateConstructorUsedError;
  String? get entityType => throw _privateConstructorUsedError;
  int? get entityId => throw _privateConstructorUsedError;
  String? get actionUrl => throw _privateConstructorUsedError;
  DateTime get createdAtUtc => throw _privateConstructorUsedError;

  /// Serializes this AppNotification to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of AppNotification
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $AppNotificationCopyWith<AppNotification> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AppNotificationCopyWith<$Res> {
  factory $AppNotificationCopyWith(
          AppNotification value, $Res Function(AppNotification) then) =
      _$AppNotificationCopyWithImpl<$Res, AppNotification>;
  @useResult
  $Res call(
      {int id,
      String titleEn,
      String? titleAr,
      String messageEn,
      String? messageAr,
      NotificationType type,
      bool isRead,
      DateTime? readAt,
      String? entityType,
      int? entityId,
      String? actionUrl,
      DateTime createdAtUtc});
}

/// @nodoc
class _$AppNotificationCopyWithImpl<$Res, $Val extends AppNotification>
    implements $AppNotificationCopyWith<$Res> {
  _$AppNotificationCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of AppNotification
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? titleEn = null,
    Object? titleAr = freezed,
    Object? messageEn = null,
    Object? messageAr = freezed,
    Object? type = null,
    Object? isRead = null,
    Object? readAt = freezed,
    Object? entityType = freezed,
    Object? entityId = freezed,
    Object? actionUrl = freezed,
    Object? createdAtUtc = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      titleEn: null == titleEn
          ? _value.titleEn
          : titleEn // ignore: cast_nullable_to_non_nullable
              as String,
      titleAr: freezed == titleAr
          ? _value.titleAr
          : titleAr // ignore: cast_nullable_to_non_nullable
              as String?,
      messageEn: null == messageEn
          ? _value.messageEn
          : messageEn // ignore: cast_nullable_to_non_nullable
              as String,
      messageAr: freezed == messageAr
          ? _value.messageAr
          : messageAr // ignore: cast_nullable_to_non_nullable
              as String?,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as NotificationType,
      isRead: null == isRead
          ? _value.isRead
          : isRead // ignore: cast_nullable_to_non_nullable
              as bool,
      readAt: freezed == readAt
          ? _value.readAt
          : readAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      entityType: freezed == entityType
          ? _value.entityType
          : entityType // ignore: cast_nullable_to_non_nullable
              as String?,
      entityId: freezed == entityId
          ? _value.entityId
          : entityId // ignore: cast_nullable_to_non_nullable
              as int?,
      actionUrl: freezed == actionUrl
          ? _value.actionUrl
          : actionUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAtUtc: null == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$AppNotificationImplCopyWith<$Res>
    implements $AppNotificationCopyWith<$Res> {
  factory _$$AppNotificationImplCopyWith(_$AppNotificationImpl value,
          $Res Function(_$AppNotificationImpl) then) =
      __$$AppNotificationImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int id,
      String titleEn,
      String? titleAr,
      String messageEn,
      String? messageAr,
      NotificationType type,
      bool isRead,
      DateTime? readAt,
      String? entityType,
      int? entityId,
      String? actionUrl,
      DateTime createdAtUtc});
}

/// @nodoc
class __$$AppNotificationImplCopyWithImpl<$Res>
    extends _$AppNotificationCopyWithImpl<$Res, _$AppNotificationImpl>
    implements _$$AppNotificationImplCopyWith<$Res> {
  __$$AppNotificationImplCopyWithImpl(
      _$AppNotificationImpl _value, $Res Function(_$AppNotificationImpl) _then)
      : super(_value, _then);

  /// Create a copy of AppNotification
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? titleEn = null,
    Object? titleAr = freezed,
    Object? messageEn = null,
    Object? messageAr = freezed,
    Object? type = null,
    Object? isRead = null,
    Object? readAt = freezed,
    Object? entityType = freezed,
    Object? entityId = freezed,
    Object? actionUrl = freezed,
    Object? createdAtUtc = null,
  }) {
    return _then(_$AppNotificationImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      titleEn: null == titleEn
          ? _value.titleEn
          : titleEn // ignore: cast_nullable_to_non_nullable
              as String,
      titleAr: freezed == titleAr
          ? _value.titleAr
          : titleAr // ignore: cast_nullable_to_non_nullable
              as String?,
      messageEn: null == messageEn
          ? _value.messageEn
          : messageEn // ignore: cast_nullable_to_non_nullable
              as String,
      messageAr: freezed == messageAr
          ? _value.messageAr
          : messageAr // ignore: cast_nullable_to_non_nullable
              as String?,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as NotificationType,
      isRead: null == isRead
          ? _value.isRead
          : isRead // ignore: cast_nullable_to_non_nullable
              as bool,
      readAt: freezed == readAt
          ? _value.readAt
          : readAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      entityType: freezed == entityType
          ? _value.entityType
          : entityType // ignore: cast_nullable_to_non_nullable
              as String?,
      entityId: freezed == entityId
          ? _value.entityId
          : entityId // ignore: cast_nullable_to_non_nullable
              as int?,
      actionUrl: freezed == actionUrl
          ? _value.actionUrl
          : actionUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      createdAtUtc: null == createdAtUtc
          ? _value.createdAtUtc
          : createdAtUtc // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$AppNotificationImpl implements _AppNotification {
  const _$AppNotificationImpl(
      {required this.id,
      required this.titleEn,
      this.titleAr,
      required this.messageEn,
      this.messageAr,
      this.type = NotificationType.info,
      required this.isRead,
      this.readAt,
      this.entityType,
      this.entityId,
      this.actionUrl,
      required this.createdAtUtc});

  factory _$AppNotificationImpl.fromJson(Map<String, dynamic> json) =>
      _$$AppNotificationImplFromJson(json);

  @override
  final int id;
  @override
  final String titleEn;
  @override
  final String? titleAr;
  @override
  final String messageEn;
  @override
  final String? messageAr;
  @override
  @JsonKey()
  final NotificationType type;
  @override
  final bool isRead;
  @override
  final DateTime? readAt;
  @override
  final String? entityType;
  @override
  final int? entityId;
  @override
  final String? actionUrl;
  @override
  final DateTime createdAtUtc;

  @override
  String toString() {
    return 'AppNotification(id: $id, titleEn: $titleEn, titleAr: $titleAr, messageEn: $messageEn, messageAr: $messageAr, type: $type, isRead: $isRead, readAt: $readAt, entityType: $entityType, entityId: $entityId, actionUrl: $actionUrl, createdAtUtc: $createdAtUtc)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$AppNotificationImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.titleEn, titleEn) || other.titleEn == titleEn) &&
            (identical(other.titleAr, titleAr) || other.titleAr == titleAr) &&
            (identical(other.messageEn, messageEn) ||
                other.messageEn == messageEn) &&
            (identical(other.messageAr, messageAr) ||
                other.messageAr == messageAr) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.isRead, isRead) || other.isRead == isRead) &&
            (identical(other.readAt, readAt) || other.readAt == readAt) &&
            (identical(other.entityType, entityType) ||
                other.entityType == entityType) &&
            (identical(other.entityId, entityId) ||
                other.entityId == entityId) &&
            (identical(other.actionUrl, actionUrl) ||
                other.actionUrl == actionUrl) &&
            (identical(other.createdAtUtc, createdAtUtc) ||
                other.createdAtUtc == createdAtUtc));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      titleEn,
      titleAr,
      messageEn,
      messageAr,
      type,
      isRead,
      readAt,
      entityType,
      entityId,
      actionUrl,
      createdAtUtc);

  /// Create a copy of AppNotification
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$AppNotificationImplCopyWith<_$AppNotificationImpl> get copyWith =>
      __$$AppNotificationImplCopyWithImpl<_$AppNotificationImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$AppNotificationImplToJson(
      this,
    );
  }
}

abstract class _AppNotification implements AppNotification {
  const factory _AppNotification(
      {required final int id,
      required final String titleEn,
      final String? titleAr,
      required final String messageEn,
      final String? messageAr,
      final NotificationType type,
      required final bool isRead,
      final DateTime? readAt,
      final String? entityType,
      final int? entityId,
      final String? actionUrl,
      required final DateTime createdAtUtc}) = _$AppNotificationImpl;

  factory _AppNotification.fromJson(Map<String, dynamic> json) =
      _$AppNotificationImpl.fromJson;

  @override
  int get id;
  @override
  String get titleEn;
  @override
  String? get titleAr;
  @override
  String get messageEn;
  @override
  String? get messageAr;
  @override
  NotificationType get type;
  @override
  bool get isRead;
  @override
  DateTime? get readAt;
  @override
  String? get entityType;
  @override
  int? get entityId;
  @override
  String? get actionUrl;
  @override
  DateTime get createdAtUtc;

  /// Create a copy of AppNotification
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$AppNotificationImplCopyWith<_$AppNotificationImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

PushTokenRequest _$PushTokenRequestFromJson(Map<String, dynamic> json) {
  return _PushTokenRequest.fromJson(json);
}

/// @nodoc
mixin _$PushTokenRequest {
  String get token => throw _privateConstructorUsedError;
  String get platform => throw _privateConstructorUsedError;
  String get deviceId => throw _privateConstructorUsedError;

  /// Serializes this PushTokenRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of PushTokenRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $PushTokenRequestCopyWith<PushTokenRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PushTokenRequestCopyWith<$Res> {
  factory $PushTokenRequestCopyWith(
          PushTokenRequest value, $Res Function(PushTokenRequest) then) =
      _$PushTokenRequestCopyWithImpl<$Res, PushTokenRequest>;
  @useResult
  $Res call({String token, String platform, String deviceId});
}

/// @nodoc
class _$PushTokenRequestCopyWithImpl<$Res, $Val extends PushTokenRequest>
    implements $PushTokenRequestCopyWith<$Res> {
  _$PushTokenRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of PushTokenRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
    Object? platform = null,
    Object? deviceId = null,
  }) {
    return _then(_value.copyWith(
      token: null == token
          ? _value.token
          : token // ignore: cast_nullable_to_non_nullable
              as String,
      platform: null == platform
          ? _value.platform
          : platform // ignore: cast_nullable_to_non_nullable
              as String,
      deviceId: null == deviceId
          ? _value.deviceId
          : deviceId // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PushTokenRequestImplCopyWith<$Res>
    implements $PushTokenRequestCopyWith<$Res> {
  factory _$$PushTokenRequestImplCopyWith(_$PushTokenRequestImpl value,
          $Res Function(_$PushTokenRequestImpl) then) =
      __$$PushTokenRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String token, String platform, String deviceId});
}

/// @nodoc
class __$$PushTokenRequestImplCopyWithImpl<$Res>
    extends _$PushTokenRequestCopyWithImpl<$Res, _$PushTokenRequestImpl>
    implements _$$PushTokenRequestImplCopyWith<$Res> {
  __$$PushTokenRequestImplCopyWithImpl(_$PushTokenRequestImpl _value,
      $Res Function(_$PushTokenRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of PushTokenRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? token = null,
    Object? platform = null,
    Object? deviceId = null,
  }) {
    return _then(_$PushTokenRequestImpl(
      token: null == token
          ? _value.token
          : token // ignore: cast_nullable_to_non_nullable
              as String,
      platform: null == platform
          ? _value.platform
          : platform // ignore: cast_nullable_to_non_nullable
              as String,
      deviceId: null == deviceId
          ? _value.deviceId
          : deviceId // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PushTokenRequestImpl implements _PushTokenRequest {
  const _$PushTokenRequestImpl(
      {required this.token, required this.platform, required this.deviceId});

  factory _$PushTokenRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$PushTokenRequestImplFromJson(json);

  @override
  final String token;
  @override
  final String platform;
  @override
  final String deviceId;

  @override
  String toString() {
    return 'PushTokenRequest(token: $token, platform: $platform, deviceId: $deviceId)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PushTokenRequestImpl &&
            (identical(other.token, token) || other.token == token) &&
            (identical(other.platform, platform) ||
                other.platform == platform) &&
            (identical(other.deviceId, deviceId) ||
                other.deviceId == deviceId));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(runtimeType, token, platform, deviceId);

  /// Create a copy of PushTokenRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$PushTokenRequestImplCopyWith<_$PushTokenRequestImpl> get copyWith =>
      __$$PushTokenRequestImplCopyWithImpl<_$PushTokenRequestImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PushTokenRequestImplToJson(
      this,
    );
  }
}

abstract class _PushTokenRequest implements PushTokenRequest {
  const factory _PushTokenRequest(
      {required final String token,
      required final String platform,
      required final String deviceId}) = _$PushTokenRequestImpl;

  factory _PushTokenRequest.fromJson(Map<String, dynamic> json) =
      _$PushTokenRequestImpl.fromJson;

  @override
  String get token;
  @override
  String get platform;
  @override
  String get deviceId;

  /// Create a copy of PushTokenRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$PushTokenRequestImplCopyWith<_$PushTokenRequestImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
