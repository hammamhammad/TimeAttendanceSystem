// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'attendance_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$CheckLocationRequestImpl _$$CheckLocationRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$CheckLocationRequestImpl(
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
    );

Map<String, dynamic> _$$CheckLocationRequestImplToJson(
        _$CheckLocationRequestImpl instance) =>
    <String, dynamic>{
      'latitude': instance.latitude,
      'longitude': instance.longitude,
    };

_$CheckLocationResponseImpl _$$CheckLocationResponseImplFromJson(
        Map<String, dynamic> json) =>
    _$CheckLocationResponseImpl(
      isWithinGeofence: json['isWithinGeofence'] as bool,
      distanceMeters: (json['distanceMeters'] as num?)?.toDouble(),
      message: json['message'] as String?,
    );

Map<String, dynamic> _$$CheckLocationResponseImplToJson(
        _$CheckLocationResponseImpl instance) =>
    <String, dynamic>{
      'isWithinGeofence': instance.isWithinGeofence,
      'distanceMeters': instance.distanceMeters,
      'message': instance.message,
    };

_$AttendanceTransactionRequestImpl _$$AttendanceTransactionRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$AttendanceTransactionRequestImpl(
      transactionType:
          $enumDecode(_$TransactionTypeEnumMap, json['transactionType']),
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      nfcTagUid: json['nfcTagUid'] as String?,
      deviceId: json['deviceId'] as String,
      notes: json['notes'] as String?,
    );

Map<String, dynamic> _$$AttendanceTransactionRequestImplToJson(
        _$AttendanceTransactionRequestImpl instance) =>
    <String, dynamic>{
      'transactionType': _$TransactionTypeEnumMap[instance.transactionType]!,
      'latitude': instance.latitude,
      'longitude': instance.longitude,
      'nfcTagUid': instance.nfcTagUid,
      'deviceId': instance.deviceId,
      'notes': instance.notes,
    };

const _$TransactionTypeEnumMap = {
  TransactionType.checkIn: 0,
  TransactionType.checkOut: 1,
  TransactionType.breakStart: 2,
  TransactionType.breakEnd: 3,
  TransactionType.unknown: 4,
};

_$AttendanceTransactionResponseImpl
    _$$AttendanceTransactionResponseImplFromJson(Map<String, dynamic> json) =>
        _$AttendanceTransactionResponseImpl(
          success: json['success'] as bool,
          message: json['message'] as String,
          timestamp: DateTime.parse(json['timestamp'] as String),
        );

Map<String, dynamic> _$$AttendanceTransactionResponseImplToJson(
        _$AttendanceTransactionResponseImpl instance) =>
    <String, dynamic>{
      'success': instance.success,
      'message': instance.message,
      'timestamp': instance.timestamp.toIso8601String(),
    };
