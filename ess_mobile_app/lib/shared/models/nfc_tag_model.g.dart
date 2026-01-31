// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'nfc_tag_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$NfcTagImpl _$$NfcTagImplFromJson(Map<String, dynamic> json) => _$NfcTagImpl(
      id: json['id'] as String,
      tagUid: json['tagUid'] as String,
      status: $enumDecode(_$NfcTagStatusEnumMap, json['status']),
      branchId: json['branchId'] as String?,
      branchName: json['branchName'] as String?,
      locationDescription: json['locationDescription'] as String?,
      isWriteProtected: json['isWriteProtected'] as bool?,
      registeredAt: json['registeredAt'] == null
          ? null
          : DateTime.parse(json['registeredAt'] as String),
      lastScannedAt: json['lastScannedAt'] == null
          ? null
          : DateTime.parse(json['lastScannedAt'] as String),
      scanCount: (json['scanCount'] as num?)?.toInt(),
    );

Map<String, dynamic> _$$NfcTagImplToJson(_$NfcTagImpl instance) =>
    <String, dynamic>{
      'id': instance.id,
      'tagUid': instance.tagUid,
      'status': _$NfcTagStatusEnumMap[instance.status]!,
      'branchId': instance.branchId,
      'branchName': instance.branchName,
      'locationDescription': instance.locationDescription,
      'isWriteProtected': instance.isWriteProtected,
      'registeredAt': instance.registeredAt?.toIso8601String(),
      'lastScannedAt': instance.lastScannedAt?.toIso8601String(),
      'scanCount': instance.scanCount,
    };

const _$NfcTagStatusEnumMap = {
  NfcTagStatus.unregistered: 0,
  NfcTagStatus.registered: 1,
  NfcTagStatus.active: 2,
  NfcTagStatus.disabled: 3,
  NfcTagStatus.lost: 4,
};

_$RegisterNfcTagRequestImpl _$$RegisterNfcTagRequestImplFromJson(
        Map<String, dynamic> json) =>
    _$RegisterNfcTagRequestImpl(
      tagUid: json['tagUid'] as String,
      branchId: json['branchId'] as String,
      locationDescription: json['locationDescription'] as String?,
      enableWriteProtection: json['enableWriteProtection'] as bool?,
    );

Map<String, dynamic> _$$RegisterNfcTagRequestImplToJson(
        _$RegisterNfcTagRequestImpl instance) =>
    <String, dynamic>{
      'tagUid': instance.tagUid,
      'branchId': instance.branchId,
      'locationDescription': instance.locationDescription,
      'enableWriteProtection': instance.enableWriteProtection,
    };

_$NfcWriteDataImpl _$$NfcWriteDataImplFromJson(Map<String, dynamic> json) =>
    _$NfcWriteDataImpl(
      tagId: json['tagId'] as String,
      branchId: json['branchId'] as String,
      verificationCode: json['verificationCode'] as String,
      timestamp: (json['timestamp'] as num).toInt(),
    );

Map<String, dynamic> _$$NfcWriteDataImplToJson(_$NfcWriteDataImpl instance) =>
    <String, dynamic>{
      'tagId': instance.tagId,
      'branchId': instance.branchId,
      'verificationCode': instance.verificationCode,
      'timestamp': instance.timestamp,
    };
