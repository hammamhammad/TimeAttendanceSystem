// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'branch_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

Branch _$BranchFromJson(Map<String, dynamic> json) {
  return _Branch.fromJson(json);
}

/// @nodoc
mixin _$Branch {
  String get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  String? get code => throw _privateConstructorUsedError;
  String? get address => throw _privateConstructorUsedError;
  String? get city => throw _privateConstructorUsedError;
  String? get country => throw _privateConstructorUsedError;
  double? get latitude => throw _privateConstructorUsedError;
  double? get longitude => throw _privateConstructorUsedError;
  int? get geofenceRadius => throw _privateConstructorUsedError;
  String? get timezone => throw _privateConstructorUsedError;
  bool? get isActive => throw _privateConstructorUsedError;
  int? get employeeCount => throw _privateConstructorUsedError;

  /// Serializes this Branch to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of Branch
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $BranchCopyWith<Branch> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BranchCopyWith<$Res> {
  factory $BranchCopyWith(Branch value, $Res Function(Branch) then) =
      _$BranchCopyWithImpl<$Res, Branch>;
  @useResult
  $Res call(
      {String id,
      String name,
      String? code,
      String? address,
      String? city,
      String? country,
      double? latitude,
      double? longitude,
      int? geofenceRadius,
      String? timezone,
      bool? isActive,
      int? employeeCount});
}

/// @nodoc
class _$BranchCopyWithImpl<$Res, $Val extends Branch>
    implements $BranchCopyWith<$Res> {
  _$BranchCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of Branch
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? code = freezed,
    Object? address = freezed,
    Object? city = freezed,
    Object? country = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? geofenceRadius = freezed,
    Object? timezone = freezed,
    Object? isActive = freezed,
    Object? employeeCount = freezed,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      code: freezed == code
          ? _value.code
          : code // ignore: cast_nullable_to_non_nullable
              as String?,
      address: freezed == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String?,
      city: freezed == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String?,
      country: freezed == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      geofenceRadius: freezed == geofenceRadius
          ? _value.geofenceRadius
          : geofenceRadius // ignore: cast_nullable_to_non_nullable
              as int?,
      timezone: freezed == timezone
          ? _value.timezone
          : timezone // ignore: cast_nullable_to_non_nullable
              as String?,
      isActive: freezed == isActive
          ? _value.isActive
          : isActive // ignore: cast_nullable_to_non_nullable
              as bool?,
      employeeCount: freezed == employeeCount
          ? _value.employeeCount
          : employeeCount // ignore: cast_nullable_to_non_nullable
              as int?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$BranchImplCopyWith<$Res> implements $BranchCopyWith<$Res> {
  factory _$$BranchImplCopyWith(
          _$BranchImpl value, $Res Function(_$BranchImpl) then) =
      __$$BranchImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String id,
      String name,
      String? code,
      String? address,
      String? city,
      String? country,
      double? latitude,
      double? longitude,
      int? geofenceRadius,
      String? timezone,
      bool? isActive,
      int? employeeCount});
}

/// @nodoc
class __$$BranchImplCopyWithImpl<$Res>
    extends _$BranchCopyWithImpl<$Res, _$BranchImpl>
    implements _$$BranchImplCopyWith<$Res> {
  __$$BranchImplCopyWithImpl(
      _$BranchImpl _value, $Res Function(_$BranchImpl) _then)
      : super(_value, _then);

  /// Create a copy of Branch
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? code = freezed,
    Object? address = freezed,
    Object? city = freezed,
    Object? country = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? geofenceRadius = freezed,
    Object? timezone = freezed,
    Object? isActive = freezed,
    Object? employeeCount = freezed,
  }) {
    return _then(_$BranchImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      code: freezed == code
          ? _value.code
          : code // ignore: cast_nullable_to_non_nullable
              as String?,
      address: freezed == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String?,
      city: freezed == city
          ? _value.city
          : city // ignore: cast_nullable_to_non_nullable
              as String?,
      country: freezed == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: freezed == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: freezed == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      geofenceRadius: freezed == geofenceRadius
          ? _value.geofenceRadius
          : geofenceRadius // ignore: cast_nullable_to_non_nullable
              as int?,
      timezone: freezed == timezone
          ? _value.timezone
          : timezone // ignore: cast_nullable_to_non_nullable
              as String?,
      isActive: freezed == isActive
          ? _value.isActive
          : isActive // ignore: cast_nullable_to_non_nullable
              as bool?,
      employeeCount: freezed == employeeCount
          ? _value.employeeCount
          : employeeCount // ignore: cast_nullable_to_non_nullable
              as int?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$BranchImpl implements _Branch {
  const _$BranchImpl(
      {required this.id,
      required this.name,
      this.code,
      this.address,
      this.city,
      this.country,
      this.latitude,
      this.longitude,
      this.geofenceRadius,
      this.timezone,
      this.isActive,
      this.employeeCount});

  factory _$BranchImpl.fromJson(Map<String, dynamic> json) =>
      _$$BranchImplFromJson(json);

  @override
  final String id;
  @override
  final String name;
  @override
  final String? code;
  @override
  final String? address;
  @override
  final String? city;
  @override
  final String? country;
  @override
  final double? latitude;
  @override
  final double? longitude;
  @override
  final int? geofenceRadius;
  @override
  final String? timezone;
  @override
  final bool? isActive;
  @override
  final int? employeeCount;

  @override
  String toString() {
    return 'Branch(id: $id, name: $name, code: $code, address: $address, city: $city, country: $country, latitude: $latitude, longitude: $longitude, geofenceRadius: $geofenceRadius, timezone: $timezone, isActive: $isActive, employeeCount: $employeeCount)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$BranchImpl &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.code, code) || other.code == code) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.city, city) || other.city == city) &&
            (identical(other.country, country) || other.country == country) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.geofenceRadius, geofenceRadius) ||
                other.geofenceRadius == geofenceRadius) &&
            (identical(other.timezone, timezone) ||
                other.timezone == timezone) &&
            (identical(other.isActive, isActive) ||
                other.isActive == isActive) &&
            (identical(other.employeeCount, employeeCount) ||
                other.employeeCount == employeeCount));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      name,
      code,
      address,
      city,
      country,
      latitude,
      longitude,
      geofenceRadius,
      timezone,
      isActive,
      employeeCount);

  /// Create a copy of Branch
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$BranchImplCopyWith<_$BranchImpl> get copyWith =>
      __$$BranchImplCopyWithImpl<_$BranchImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$BranchImplToJson(
      this,
    );
  }
}

abstract class _Branch implements Branch {
  const factory _Branch(
      {required final String id,
      required final String name,
      final String? code,
      final String? address,
      final String? city,
      final String? country,
      final double? latitude,
      final double? longitude,
      final int? geofenceRadius,
      final String? timezone,
      final bool? isActive,
      final int? employeeCount}) = _$BranchImpl;

  factory _Branch.fromJson(Map<String, dynamic> json) = _$BranchImpl.fromJson;

  @override
  String get id;
  @override
  String get name;
  @override
  String? get code;
  @override
  String? get address;
  @override
  String? get city;
  @override
  String? get country;
  @override
  double? get latitude;
  @override
  double? get longitude;
  @override
  int? get geofenceRadius;
  @override
  String? get timezone;
  @override
  bool? get isActive;
  @override
  int? get employeeCount;

  /// Create a copy of Branch
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$BranchImplCopyWith<_$BranchImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

UpdateBranchGpsRequest _$UpdateBranchGpsRequestFromJson(
    Map<String, dynamic> json) {
  return _UpdateBranchGpsRequest.fromJson(json);
}

/// @nodoc
mixin _$UpdateBranchGpsRequest {
  String get branchId => throw _privateConstructorUsedError;
  double get latitude => throw _privateConstructorUsedError;
  double get longitude => throw _privateConstructorUsedError;
  int? get geofenceRadius => throw _privateConstructorUsedError;

  /// Serializes this UpdateBranchGpsRequest to a JSON map.
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;

  /// Create a copy of UpdateBranchGpsRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  $UpdateBranchGpsRequestCopyWith<UpdateBranchGpsRequest> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UpdateBranchGpsRequestCopyWith<$Res> {
  factory $UpdateBranchGpsRequestCopyWith(UpdateBranchGpsRequest value,
          $Res Function(UpdateBranchGpsRequest) then) =
      _$UpdateBranchGpsRequestCopyWithImpl<$Res, UpdateBranchGpsRequest>;
  @useResult
  $Res call(
      {String branchId,
      double latitude,
      double longitude,
      int? geofenceRadius});
}

/// @nodoc
class _$UpdateBranchGpsRequestCopyWithImpl<$Res,
        $Val extends UpdateBranchGpsRequest>
    implements $UpdateBranchGpsRequestCopyWith<$Res> {
  _$UpdateBranchGpsRequestCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of UpdateBranchGpsRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? branchId = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? geofenceRadius = freezed,
  }) {
    return _then(_value.copyWith(
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
      geofenceRadius: freezed == geofenceRadius
          ? _value.geofenceRadius
          : geofenceRadius // ignore: cast_nullable_to_non_nullable
              as int?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$UpdateBranchGpsRequestImplCopyWith<$Res>
    implements $UpdateBranchGpsRequestCopyWith<$Res> {
  factory _$$UpdateBranchGpsRequestImplCopyWith(
          _$UpdateBranchGpsRequestImpl value,
          $Res Function(_$UpdateBranchGpsRequestImpl) then) =
      __$$UpdateBranchGpsRequestImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String branchId,
      double latitude,
      double longitude,
      int? geofenceRadius});
}

/// @nodoc
class __$$UpdateBranchGpsRequestImplCopyWithImpl<$Res>
    extends _$UpdateBranchGpsRequestCopyWithImpl<$Res,
        _$UpdateBranchGpsRequestImpl>
    implements _$$UpdateBranchGpsRequestImplCopyWith<$Res> {
  __$$UpdateBranchGpsRequestImplCopyWithImpl(
      _$UpdateBranchGpsRequestImpl _value,
      $Res Function(_$UpdateBranchGpsRequestImpl) _then)
      : super(_value, _then);

  /// Create a copy of UpdateBranchGpsRequest
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? branchId = null,
    Object? latitude = null,
    Object? longitude = null,
    Object? geofenceRadius = freezed,
  }) {
    return _then(_$UpdateBranchGpsRequestImpl(
      branchId: null == branchId
          ? _value.branchId
          : branchId // ignore: cast_nullable_to_non_nullable
              as String,
      latitude: null == latitude
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double,
      longitude: null == longitude
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double,
      geofenceRadius: freezed == geofenceRadius
          ? _value.geofenceRadius
          : geofenceRadius // ignore: cast_nullable_to_non_nullable
              as int?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$UpdateBranchGpsRequestImpl implements _UpdateBranchGpsRequest {
  const _$UpdateBranchGpsRequestImpl(
      {required this.branchId,
      required this.latitude,
      required this.longitude,
      this.geofenceRadius});

  factory _$UpdateBranchGpsRequestImpl.fromJson(Map<String, dynamic> json) =>
      _$$UpdateBranchGpsRequestImplFromJson(json);

  @override
  final String branchId;
  @override
  final double latitude;
  @override
  final double longitude;
  @override
  final int? geofenceRadius;

  @override
  String toString() {
    return 'UpdateBranchGpsRequest(branchId: $branchId, latitude: $latitude, longitude: $longitude, geofenceRadius: $geofenceRadius)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UpdateBranchGpsRequestImpl &&
            (identical(other.branchId, branchId) ||
                other.branchId == branchId) &&
            (identical(other.latitude, latitude) ||
                other.latitude == latitude) &&
            (identical(other.longitude, longitude) ||
                other.longitude == longitude) &&
            (identical(other.geofenceRadius, geofenceRadius) ||
                other.geofenceRadius == geofenceRadius));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode =>
      Object.hash(runtimeType, branchId, latitude, longitude, geofenceRadius);

  /// Create a copy of UpdateBranchGpsRequest
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  @pragma('vm:prefer-inline')
  _$$UpdateBranchGpsRequestImplCopyWith<_$UpdateBranchGpsRequestImpl>
      get copyWith => __$$UpdateBranchGpsRequestImplCopyWithImpl<
          _$UpdateBranchGpsRequestImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UpdateBranchGpsRequestImplToJson(
      this,
    );
  }
}

abstract class _UpdateBranchGpsRequest implements UpdateBranchGpsRequest {
  const factory _UpdateBranchGpsRequest(
      {required final String branchId,
      required final double latitude,
      required final double longitude,
      final int? geofenceRadius}) = _$UpdateBranchGpsRequestImpl;

  factory _UpdateBranchGpsRequest.fromJson(Map<String, dynamic> json) =
      _$UpdateBranchGpsRequestImpl.fromJson;

  @override
  String get branchId;
  @override
  double get latitude;
  @override
  double get longitude;
  @override
  int? get geofenceRadius;

  /// Create a copy of UpdateBranchGpsRequest
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  _$$UpdateBranchGpsRequestImplCopyWith<_$UpdateBranchGpsRequestImpl>
      get copyWith => throw _privateConstructorUsedError;
}
