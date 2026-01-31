// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'notification_broadcast_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

NotificationBroadcast _$NotificationBroadcastFromJson(
    Map<String, dynamic> json) {
  return _NotificationBroadcast.fromJson(json);
}

/// @nodoc
mixin _$NotificationBroadcast {
  String get id => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get message => throw _privateConstructorUsedError;
  BroadcastTargetType get targetType => throw _privateConstructorUsedError;
  String? get targetId => throw _privateConstructorUsedError;
  String? get targetName => throw _privateConstructorUsedError;
  int? get recipientCount => throw _privateConstructorUsedError;
  int? get deliveredCount => throw _privateConstructorUsedError;
  int? get readCount => throw _privateConstructorUsedError;
  DateTime? get sentAt => throw _privateConstructorUsedError;
  String? get sentByName => throw _privateConstructorUsedError;

  /// Serializes this NotificationBroadcast to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of NotificationBroadcast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $NotificationBroadcastCopyWith<NotificationBroadcast> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NotificationBroadcastCopyWith<$Res> {
  factory $NotificationBroadcastCopyWith(NotificationBroadcast value,
          $Res Function(NotificationBroadcast) then) =
      _$NotificationBroadcastCopyWithImpl<$Res, NotificationBroadcast>;
  @useResult
  $Res call(
      {String id,
      String title,
      String message,
      BroadcastTargetType targetType,
      String? targetId,
      String? targetName,
      int? recipientCount,
      int? deliveredCount,
      int? readCount,
      DateTime? sentAt,
      String? sentByName});
}

/// @nodoc
class _$NotificationBroadcastCopyWithImpl<$Res,
        $Val extends NotificationBroadcast>
    implements $NotificationBroadcastCopyWith<$Res> {
  _$NotificationBroadcastCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of NotificationBroadcast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? message = null,
    Object? targetType = null,
    Object? targetId = freezed,
    Object? targetName = freezed,
    Object? recipientCount = freezed,
    Object? deliveredCount = freezed,
    Object? readCount = freezed,
    Object? sentAt = freezed,
    Object? sentByName = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      targetType: null == targetType
          ? _value.targetType
          : targetType // ignore: cast_nullable_to_non_nullable
              as BroadcastTargetType,
      targetId: freezed == targetId
          ? _value.targetId
          : targetId // ignore: cast_nullable_to_non_nullable
              as String?,
      targetName: freezed == targetName
          ? _value.targetName
          : targetName // ignore: cast_nullable_to_non_nullable
              as String?,
      recipientCount: freezed == recipientCount
          ? _value.recipientCount
          : recipientCount // ignore: cast_nullable_to_non_nullable
              as int?,
      deliveredCount: freezed == deliveredCount
          ? _value.deliveredCount
          : deliveredCount // ignore: cast_nullable_to_non_nullable
              as int?,
      readCount: freezed == readCount
          ? _value.readCount
          : readCount // ignore: cast_nullable_to_non_nullable
              as int?,
      sentAt: freezed == sentAt
          ? _value.sentAt
          : sentAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      sentByName: freezed == sentByName
          ? _value.sentByName
          : sentByName // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$NotificationBroadcastImplCopyWith<$Res>
    implements $NotificationBroadcastCopyWith<$Res> {
  factory _$$NotificationBroadcastImplCopyWith(
          _$NotificationBroadcastImpl value,
          $Res Function(_$NotificationBroadcastImpl) then) =
      __$$NotificationBroadcastImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String title,
      String message,
      BroadcastTargetType targetType,
      String? targetId,
      String? targetName,
      int? recipientCount,
      int? deliveredCount,
      int? readCount,
      DateTime? sentAt,
      String? sentByName});
}

/// @nodoc
class __$$NotificationBroadcastImplCopyWithImpl<$Res>
    extends _$NotificationBroadcastCopyWithImpl<$Res,
        _$NotificationBroadcastImpl>
    implements _$$NotificationBroadcastImplCopyWith<$Res> {
  __$$NotificationBroadcastImplCopyWithImpl(_$NotificationBroadcastImpl _value,
      $Res Function(_$NotificationBroadcastImpl) _then)
      : super(_value, _then);

  /// Create a copy of NotificationBroadcast
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? title = null,
    Object? message = null,
    Object? targetType = null,
    Object? targetId = freezed,
    Object? targetName = freezed,
    Object? recipientCount = freezed,
    Object? deliveredCount = freezed,
    Object? readCount = freezed,
    Object? sentAt = freezed,
    Object? sentByName = freezed,
  }) {
    return _then(_$NotificationBroadcastImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      targetType: null == targetType
          ? _value.targetType
          : targetType // ignore: cast_nullable_to_non_nullable
              as BroadcastTargetType,
      targetId: freezed == targetId
          ? _value.targetId
          : targetId // ignore: cast_nullable_to_non_nullable
              as String?,
      targetName: freezed == targetName
          ? _value.targetName
          : targetName // ignore: cast_nullable_to_non_nullable
              as String?,
      recipientCount: freezed == recipientCount
          ? _value.recipientCount
          : recipientCount // ignore: cast_nullable_to_non_nullable
              as int?,
      deliveredCount: freezed == deliveredCount
          ? _value.deliveredCount
          : deliveredCount // ignore: cast_nullable_to_non_nullable
              as int?,
      readCount: freezed == readCount
          ? _value.readCount
          : readCount // ignore: cast_nullable_to_non_nullable
              as int?,
      sentAt: freezed == sentAt
          ? _value.sentAt
          : sentAt // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      sentByName: freezed == sentByName
          ? _value.sentByName
          : sentByName // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$NotificationBroadcastImpl implements _NotificationBroadcast {
  const _$NotificationBroadcastImpl(
      {required this.id,
      required this.title,
      required this.message,
      required this.targetType,
      this.targetId,
      this.targetName,
      this.recipientCount,
      this.deliveredCount,
      this.readCount,
      this.sentAt,
      this.sentByName});

  factory _$NotificationBroadcastImpl.fromJson(Map<String, dynamic> json) =>
      _$$NotificationBroadcastImplFromJson(json);

  @override
  final String id;
  @override
  final String title;
  @override
  final String message;
  @override
  final BroadcastTargetType targetType;
  @override
  final String? targetId;
  @override
  final String? targetName;
  @override
  final int? recipientCount;
  @override
  final int? deliveredCount;
  @override
  final int? readCount;
  @override
  final DateTime? sentAt;
  @override
  final String? sentByName;

  @override
  String toString() {
    return 'NotificationBroadcast(id: $id, title: $title, message: $message, targetType: $targetType, targetId: $targetId, targetName: $targetName, recipientCount: $recipientCount, deliveredCount: $deliveredCount, readCount: $readCount, sentAt: $sentAt, sentByName: $sentByName)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NotificationBroadcastImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.message, message) || other.message == message) &&
            (identical(other.targetType, targetType) ||
                other.targetType == targetType) &&
            (identical(other.targetId, targetId) ||
                other.targetId == targetId) &&
            (identical(other.targetName, targetName) ||
                other.targetName == targetName) &&
            (identical(other.recipientCount, recipientCount) ||
                other.recipientCount == recipientCount) &&
            (identical(other.deliveredCount, deliveredCount) ||
                other.deliveredCount == deliveredCount) &&
            (identical(other.readCount, readCount) ||
                other.readCount == readCount) &&
            (identical(other.sentAt, sentAt) || other.sentAt == sentAt) &&
            (identical(other.sentByName, sentByName) ||
                other.sentByName == sentByName));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      title,
      message,
      targetType,
      targetId,
      targetName,
      recipientCount,
      deliveredCount,
      readCount,
      sentAt,
      sentByName);

  /// Create a copy of NotificationBroadcast
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$NotificationBroadcastImplCopyWith<_$NotificationBroadcastImpl>
      get copyWith => __$$NotificationBroadcastImplCopyWithImpl<
          _$NotificationBroadcastImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$NotificationBroadcastImplToJson(
      this,
    );
  }
}

abstract class _NotificationBroadcast implements NotificationBroadcast {
  const factory _NotificationBroadcast(
      {required final String id,
      required final String title,
      required final String message,
      required final BroadcastTargetType targetType,
      final String? targetId,
      final String? targetName,
      final int? recipientCount,
      final int? deliveredCount,
      final int? readCount,
      final DateTime? sentAt,
      final String? sentByName}) = _$NotificationBroadcastImpl;

  factory _NotificationBroadcast.fromJson(Map<String, dynamic> json) =
      _$NotificationBroadcastImpl.fromJson;

  @override
  String get id;
  @override
  String get title;
  @override
  String get message;
  @override
  BroadcastTargetType get targetType;
  @override
  String? get targetId;
  @override
  String? get targetName;
  @override
  int? get recipientCount;
  @override
  int? get deliveredCount;
  @override
  int? get readCount;
  @override
  DateTime? get sentAt;
  @override
  String? get sentByName;

  /// Create a copy of NotificationBroadcast
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$NotificationBroadcastImplCopyWith<_$NotificationBroadcastImpl>
      get copyWith => throw _privateConstructorUsedError;
}

CreateBroadcastRequest _$CreateBroadcastRequestFromJson(
    Map<String, dynamic> json) {
  return _CreateBroadcastRequest.fromJson(json);
}

/// @nodoc
mixin _$CreateBroadcastRequest {
  String get title => throw _privateConstructorUsedError;
  String get message => throw _privateConstructorUsedError;
  BroadcastTargetType get targetType => throw _privateConstructorUsedError;
  String? get targetId => throw _privateConstructorUsedError;
  bool? get sendPush => throw _privateConstructorUsedError;

  /// Serializes this CreateBroadcastRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of CreateBroadcastRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $CreateBroadcastRequestCopyWith<CreateBroadcastRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CreateBroadcastRequestCopyWith<$Res> {
  factory $CreateBroadcastRequestCopyWith(CreateBroadcastRequest value,
          $Res Function(CreateBroadcastRequest) then) =
      _$CreateBroadcastRequestCopyWithImpl<$Res, CreateBroadcastRequest>;
  @useResult
  $Res call(
      {String title,
      String message,
      BroadcastTargetType targetType,
      String? targetId,
      bool? sendPush});
}

/// @nodoc
class _$CreateBroadcastRequestCopyWithImpl<$Res,
        $Val extends CreateBroadcastRequest>
    implements $CreateBroadcastRequestCopyWith<$Res> {
  _$CreateBroadcastRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of CreateBroadcastRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? message = null,
    Object? targetType = null,
    Object? targetId = freezed,
    Object? sendPush = freezed,
  }) {
    return _then(_value.copyWith(
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      targetType: null == targetType
          ? _value.targetType
          : targetType // ignore: cast_nullable_to_non_nullable
              as BroadcastTargetType,
      targetId: freezed == targetId
          ? _value.targetId
          : targetId // ignore: cast_nullable_to_non_nullable
              as String?,
      sendPush: freezed == sendPush
          ? _value.sendPush
          : sendPush // ignore: cast_nullable_to_non_nullable
              as bool?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$CreateBroadcastRequestImplCopyWith<$Res>
    implements $CreateBroadcastRequestCopyWith<$Res> {
  factory _$$CreateBroadcastRequestImplCopyWith(
          _$CreateBroadcastRequestImpl value,
          $Res Function(_$CreateBroadcastRequestImpl) then) =
      __$$CreateBroadcastRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String title,
      String message,
      BroadcastTargetType targetType,
      String? targetId,
      bool? sendPush});
}

/// @nodoc
class __$$CreateBroadcastRequestImplCopyWithImpl<$Res>
    extends _$CreateBroadcastRequestCopyWithImpl<$Res,
        _$CreateBroadcastRequestImpl>
    implements _$$CreateBroadcastRequestImplCopyWith<$Res> {
  __$$CreateBroadcastRequestImplCopyWithImpl(
      _$CreateBroadcastRequestImpl _value,
      $Res Function(_$CreateBroadcastRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of CreateBroadcastRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? title = null,
    Object? message = null,
    Object? targetType = null,
    Object? targetId = freezed,
    Object? sendPush = freezed,
  }) {
    return _then(_$CreateBroadcastRequestImpl(
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      message: null == message
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
      targetType: null == targetType
          ? _value.targetType
          : targetType // ignore: cast_nullable_to_non_nullable
              as BroadcastTargetType,
      targetId: freezed == targetId
          ? _value.targetId
          : targetId // ignore: cast_nullable_to_non_nullable
              as String?,
      sendPush: freezed == sendPush
          ? _value.sendPush
          : sendPush // ignore: cast_nullable_to_non_nullable
              as bool?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$CreateBroadcastRequestImpl implements _CreateBroadcastRequest {
  const _$CreateBroadcastRequestImpl(
      {required this.title,
      required this.message,
      required this.targetType,
      this.targetId,
      this.sendPush});

  factory _$CreateBroadcastRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$CreateBroadcastRequestImplFromJson(json);

  @override
  final String title;
  @override
  final String message;
  @override
  final BroadcastTargetType targetType;
  @override
  final String? targetId;
  @override
  final bool? sendPush;

  @override
  String toString() {
    return 'CreateBroadcastRequest(title: $title, message: $message, targetType: $targetType, targetId: $targetId, sendPush: $sendPush)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CreateBroadcastRequestImpl &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.message, message) || other.message == message) &&
            (identical(other.targetType, targetType) ||
                other.targetType == targetType) &&
            (identical(other.targetId, targetId) ||
                other.targetId == targetId) &&
            (identical(other.sendPush, sendPush) ||
                other.sendPush == sendPush));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, title, message, targetType, targetId, sendPush);

  /// Create a copy of CreateBroadcastRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$CreateBroadcastRequestImplCopyWith<_$CreateBroadcastRequestImpl>
      get copyWith => __$$CreateBroadcastRequestImplCopyWithImpl<
          _$CreateBroadcastRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$CreateBroadcastRequestImplToJson(
      this,
    );
  }
}

abstract class _CreateBroadcastRequest implements CreateBroadcastRequest {
  const factory _CreateBroadcastRequest(
      {required final String title,
      required final String message,
      required final BroadcastTargetType targetType,
      final String? targetId,
      final bool? sendPush}) = _$CreateBroadcastRequestImpl;

  factory _CreateBroadcastRequest.fromJson(Map<String, dynamic> json) =
      _$CreateBroadcastRequestImpl.fromJson;

  @override
  String get title;
  @override
  String get message;
  @override
  BroadcastTargetType get targetType;
  @override
  String? get targetId;
  @override
  bool? get sendPush;

  /// Create a copy of CreateBroadcastRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$CreateBroadcastRequestImplCopyWith<_$CreateBroadcastRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}
