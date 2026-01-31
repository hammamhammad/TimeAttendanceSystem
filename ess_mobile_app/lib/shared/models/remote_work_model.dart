import 'package:freezed_annotation/freezed_annotation.dart';

part 'remote_work_model.freezed.dart';
part 'remote_work_model.g.dart';

/// Remote work request status.
enum RemoteWorkStatus {
  @JsonValue(0)
  pending,
  @JsonValue(1)
  approved,
  @JsonValue(2)
  rejected,
  @JsonValue(3)
  cancelled,
}

/// Remote work request model.
@freezed
class RemoteWorkRequest with _$RemoteWorkRequest {
  const factory RemoteWorkRequest({
    required String id,
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
    required RemoteWorkStatus status,
    String? workLocation,
    String? contactPhone,
    String? managerNotes,
    DateTime? createdAt,
    DateTime? processedAt,
    String? processedByName,
  }) = _RemoteWorkRequest;

  factory RemoteWorkRequest.fromJson(Map<String, dynamic> json) =>
      _$RemoteWorkRequestFromJson(json);
}

/// Create remote work request payload.
@freezed
class CreateRemoteWorkRequest with _$CreateRemoteWorkRequest {
  const factory CreateRemoteWorkRequest({
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
    String? workLocation,
    String? contactPhone,
  }) = _CreateRemoteWorkRequest;

  factory CreateRemoteWorkRequest.fromJson(Map<String, dynamic> json) =>
      _$CreateRemoteWorkRequestFromJson(json);
}

/// Remote work policy.
@freezed
class RemoteWorkPolicy with _$RemoteWorkPolicy {
  const factory RemoteWorkPolicy({
    required int maxDaysPerMonth,
    required int maxConsecutiveDays,
    required bool requiresApproval,
    required int advanceNoticeDays,
    List<int>? allowedDaysOfWeek,
  }) = _RemoteWorkPolicy;

  factory RemoteWorkPolicy.fromJson(Map<String, dynamic> json) =>
      _$RemoteWorkPolicyFromJson(json);
}
