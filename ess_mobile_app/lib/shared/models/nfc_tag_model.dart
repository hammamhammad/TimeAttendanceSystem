import 'package:freezed_annotation/freezed_annotation.dart';

part 'nfc_tag_model.freezed.dart';
part 'nfc_tag_model.g.dart';

/// NFC tag status.
enum NfcTagStatus {
  @JsonValue(0)
  unregistered,
  @JsonValue(1)
  registered,
  @JsonValue(2)
  active,
  @JsonValue(3)
  disabled,
  @JsonValue(4)
  lost,
}

/// NFC tag model.
@freezed
class NfcTag with _$NfcTag {
  const factory NfcTag({
    required String id,
    required String tagUid,
    required NfcTagStatus status,
    String? branchId,
    String? branchName,
    String? locationDescription,
    bool? isWriteProtected,
    DateTime? registeredAt,
    DateTime? lastScannedAt,
    int? scanCount,
  }) = _NfcTag;

  factory NfcTag.fromJson(Map<String, dynamic> json) =>
      _$NfcTagFromJson(json);
}

/// Register NFC tag request.
@freezed
class RegisterNfcTagRequest with _$RegisterNfcTagRequest {
  const factory RegisterNfcTagRequest({
    required String tagUid,
    required String branchId,
    String? locationDescription,
    bool? enableWriteProtection,
  }) = _RegisterNfcTagRequest;

  factory RegisterNfcTagRequest.fromJson(Map<String, dynamic> json) =>
      _$RegisterNfcTagRequestFromJson(json);
}

/// NFC write data to be written to tag.
@freezed
class NfcWriteData with _$NfcWriteData {
  const factory NfcWriteData({
    required String tagId,
    required String branchId,
    required String verificationCode,
    required int timestamp,
  }) = _NfcWriteData;

  factory NfcWriteData.fromJson(Map<String, dynamic> json) =>
      _$NfcWriteDataFromJson(json);
}
