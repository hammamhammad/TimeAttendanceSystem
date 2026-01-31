import 'package:freezed_annotation/freezed_annotation.dart';

part 'attendance_model.freezed.dart';
part 'attendance_model.g.dart';

enum TransactionType {
  @JsonValue(0)
  checkIn,
  @JsonValue(1)
  checkOut,
  @JsonValue(2)
  breakStart,
  @JsonValue(3)
  breakEnd,
  @JsonValue(4)
  unknown,
}

@freezed
class CheckLocationRequest with _$CheckLocationRequest {
  const factory CheckLocationRequest({
    required double latitude,
    required double longitude,
  }) = _CheckLocationRequest;

  factory CheckLocationRequest.fromJson(Map<String, dynamic> json) =>
      _$CheckLocationRequestFromJson(json);
}

@freezed
class CheckLocationResponse with _$CheckLocationResponse {
  const factory CheckLocationResponse({
    required bool isWithinGeofence,
    required double? distanceMeters,
    String? message,
  }) = _CheckLocationResponse;

  factory CheckLocationResponse.fromJson(Map<String, dynamic> json) =>
      _$CheckLocationResponseFromJson(json);
}

@freezed
class AttendanceTransactionRequest with _$AttendanceTransactionRequest {
  const factory AttendanceTransactionRequest({
    required TransactionType transactionType,
    required double latitude,
    required double longitude,
    String? nfcTagUid,
    required String deviceId,
    String? notes,
  }) = _AttendanceTransactionRequest;

  factory AttendanceTransactionRequest.fromJson(Map<String, dynamic> json) =>
      _$AttendanceTransactionRequestFromJson(json);
}

@freezed
class AttendanceTransactionResponse with _$AttendanceTransactionResponse {
  const factory AttendanceTransactionResponse({
    required bool success,
    required String message,
    required DateTime timestamp,
  }) = _AttendanceTransactionResponse;

  factory AttendanceTransactionResponse.fromJson(Map<String, dynamic> json) =>
      _$AttendanceTransactionResponseFromJson(json);
}
