import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/branch_model.dart';

/// Helper to extract list from a paginated or raw API response.
List<dynamic> _extractItems(dynamic data) {
  if (data is List) return data;
  if (data is Map<String, dynamic>) {
    if (data.containsKey('items')) return data['items'] as List<dynamic>;
    if (data.containsKey('value') && data['value'] is List) return data['value'];
  }
  return [];
}

/// Normalize branch JSON from backend (int IDs → String, field name mapping).
Map<String, dynamic> _normalizeBranchJson(Map<String, dynamic> raw) {
  return {
    ...raw,
    'id': raw['id']?.toString(),
    'geofenceRadius': raw['geofenceRadius'] ?? raw['geofenceRadiusMeters'],
  };
}

/// Repository for branch admin operations.
class BranchAdminRepository {
  final Dio _dio;

  BranchAdminRepository(this._dio);

  /// Get all branches.
  Future<List<Branch>> getBranches() async {
    try {
      final response = await _dio.get(
        '/api/v1/branches',
        queryParameters: {'pageSize': 1000},
      );
      final items = _extractItems(response.data);
      return items
          .map((e) => Branch.fromJson(_normalizeBranchJson(e as Map<String, dynamic>)))
          .toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get branches');
    }
  }

  /// Get branch by ID.
  Future<Branch> getBranch(String id) async {
    try {
      final response = await _dio.get('/api/v1/branches/$id');
      final data = response.data is Map<String, dynamic>
          ? response.data as Map<String, dynamic>
          : <String, dynamic>{};
      return Branch.fromJson(_normalizeBranchJson(data));
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get branch');
    }
  }

  /// Update branch GPS coordinates.
  Future<Branch> updateGpsCoordinates(UpdateBranchGpsRequest request) async {
    try {
      final response = await _dio.put(
        '/api/v1/branches/${request.branchId}/coordinates',
        data: {
          'latitude': request.latitude,
          'longitude': request.longitude,
          'geofenceRadius': request.geofenceRadius ?? 100,
        },
      );
      final data = response.data is Map<String, dynamic>
          ? response.data as Map<String, dynamic>
          : <String, dynamic>{};
      return Branch.fromJson(_normalizeBranchJson(data));
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to update GPS');
    }
  }
}

/// Provider for BranchAdminRepository.
final branchAdminRepositoryProvider = Provider<BranchAdminRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return BranchAdminRepository(dio);
});

/// Branch admin state.
class BranchAdminState {
  final bool isLoading;
  final String? error;
  final List<Branch> branches;
  final Branch? selectedBranch;

  const BranchAdminState({
    this.isLoading = false,
    this.error,
    this.branches = const [],
    this.selectedBranch,
  });

  BranchAdminState copyWith({
    bool? isLoading,
    String? error,
    List<Branch>? branches,
    Branch? selectedBranch,
  }) {
    return BranchAdminState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      branches: branches ?? this.branches,
      selectedBranch: selectedBranch ?? this.selectedBranch,
    );
  }
}

/// Branch admin notifier.
class BranchAdminNotifier extends StateNotifier<BranchAdminState> {
  final BranchAdminRepository _repository;

  BranchAdminNotifier(this._repository) : super(const BranchAdminState());

  /// Load all branches.
  Future<void> loadBranches() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final branches = await _repository.getBranches();
      state = state.copyWith(
        isLoading: false,
        branches: branches,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Select a branch.
  void selectBranch(Branch branch) {
    state = state.copyWith(selectedBranch: branch);
  }

  /// Update GPS coordinates.
  Future<bool> updateGpsCoordinates({
    required String branchId,
    required double latitude,
    required double longitude,
    int? geofenceRadius,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final request = UpdateBranchGpsRequest(
        branchId: branchId,
        latitude: latitude,
        longitude: longitude,
        geofenceRadius: geofenceRadius,
      );

      final updated = await _repository.updateGpsCoordinates(request);

      // Update in list
      final updatedList = state.branches.map((b) {
        return b.id == branchId ? updated : b;
      }).toList();

      state = state.copyWith(
        isLoading: false,
        branches: updatedList,
        selectedBranch: updated,
      );

      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }
}

/// Provider for BranchAdminNotifier.
final branchAdminProvider = StateNotifierProvider<BranchAdminNotifier, BranchAdminState>((ref) {
  final repository = ref.watch(branchAdminRepositoryProvider);
  return BranchAdminNotifier(repository);
});
