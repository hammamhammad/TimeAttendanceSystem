// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'branch_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$BranchImpl _$$BranchImplFromJson(Map<String, dynamic> json) => _$BranchImpl(
      id: json['id'] as String,
      name: json['name'] as String,
      code: json['code'] as String?,
      address: json['address'] as String?,
      city: json['city'] as String?,
      country: json['country'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      geofenceRadius: (json['geofenceRadius'] as num?)?.toInt(),
      timezone: json['timezone'] as String?,
      isActive: json['isActive'] as bool?,
      employeeCount: (json['employeeCount'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$BranchImplToJson(_$BranchImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'code': instance.code,
      'address': instance.address,
      'city': instance.city,
      'country': instance.country,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'geofenceRadius': instance.geofenceRadius,
      'timezone': instance.timezone,
      'isActive': instance.isActive,
      'employeeCount': instance.employeeCount,
    };

_$UpdateBranchGpsRequestImpl _$$UpdateBranchGpsRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$UpdateBranchGpsRequestImpl(
      branchId: json['branchId'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      geofenceRadius: (json['geofenceRadius'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$UpdateBranchGpsRequestImplToJson(
        _$UpdateBranchGpsRequestImpl instance) =>
    <String, dynamic>{
      'branchId': instance.branchId,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'geofenceRadius': instance.geofenceRadius,
    };
