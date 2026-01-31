import 'package:freezed_annotation/freezed_annotation.dart';

part 'branch_model.freezed.dart';
part 'branch_model.g.dart';

/// Branch model.
@freezed
class Branch with _$Branch {
  const factory Branch({
    required String id,
    required String name,
    String? code,
    String? address,
    String? city,
    String? country,
    double? latitude,
    double? longitude,
    int? geofenceRadius,
    String? timezone,
    bool? isActive,
    int? employeeCount,
  }) = _Branch;

  factory Branch.fromJson(Map<String, dynamic> json) =>
      _$BranchFromJson(json);
}

/// Update branch GPS coordinates request.
@freezed
class UpdateBranchGpsRequest with _$UpdateBranchGpsRequest {
  const factory UpdateBranchGpsRequest({
    required String branchId,
    required double latitude,
    required double longitude,
    int? geofenceRadius,
  }) = _UpdateBranchGpsRequest;

  factory UpdateBranchGpsRequest.fromJson(Map<String, dynamic> json) =>
      _$UpdateBranchGpsRequestFromJson(json);
}
