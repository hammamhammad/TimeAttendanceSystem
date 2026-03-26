import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/attendance_correction_model.dart';

/// Repository for attendance correction operations.
class AttendanceCorrectionRepository {
  final Dio _dio;

  AttendanceCorrectionRepository(this._dio);

  /// Get all attendance correction requests for the current employee.
  Future<List<AttendanceCorrectionRequest>> getMyCorrections() async {
    try {
      final queryParams = <String, dynamic>{
        'page': 1,
        'pageSize': 50,
      };

      final response = await _dio.get(
        '/api/v1/portal/my-attendance-corrections',
        queryParameters: queryParams,
      );

      // Handle paginated response
      final data = response.data;
      List<dynamic> items;
      if (data is Map<String, dynamic>) {
        items = data['items'] ?? data['data'] ?? [];
      } else if (data is List) {
        items = data;
      } else {
        items = [];
      }
      return items.map((e) => AttendanceCorrectionRequest.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get attendance corrections');
    }
  }

  /// Create a new attendance correction request.
  Future<void> createCorrection(CreateAttendanceCorrectionRequest request) async {
    try {
      await _dio.post(
        '/api/v1/attendance-corrections',
        data: {
          'employeeId': request.employeeId,
          'correctionDate': request.correctionDate,
          'correctionTime': request.correctionTime,
          'correctionType': request.correctionType,
          'reason': request.reason,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? e.response?.data?['error'] ?? 'Failed to create attendance correction');
    }
  }

  /// Cancel a pending attendance correction request.
  Future<void> cancelCorrection(int id) async {
    try {
      await _dio.delete('/api/v1/portal/my-attendance-corrections/$id');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to cancel attendance correction');
    }
  }
}

/// Provider for AttendanceCorrectionRepository.
final attendanceCorrectionRepositoryProvider = Provider<AttendanceCorrectionRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return AttendanceCorrectionRepository(dio);
});

/// Attendance correction state.
class AttendanceCorrectionState {
  final bool isLoading;
  final String? error;
  final List<AttendanceCorrectionRequest> requests;

  const AttendanceCorrectionState({
    this.isLoading = false,
    this.error,
    this.requests = const [],
  });

  AttendanceCorrectionState copyWith({
    bool? isLoading,
    String? error,
    List<AttendanceCorrectionRequest>? requests,
  }) {
    return AttendanceCorrectionState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      requests: requests ?? this.requests,
    );
  }

  List<AttendanceCorrectionRequest> get pendingRequests =>
      requests.where((r) => r.approvalStatus == CorrectionApprovalStatus.pending).toList();

  List<AttendanceCorrectionRequest> get approvedRequests =>
      requests.where((r) => r.approvalStatus == CorrectionApprovalStatus.approved).toList();

  List<AttendanceCorrectionRequest> get rejectedRequests =>
      requests.where((r) =>
          r.approvalStatus == CorrectionApprovalStatus.rejected ||
          r.approvalStatus == CorrectionApprovalStatus.cancelled).toList();
}

/// Attendance correction notifier.
class AttendanceCorrectionNotifier extends StateNotifier<AttendanceCorrectionState> {
  final AttendanceCorrectionRepository _repository;

  AttendanceCorrectionNotifier(this._repository) : super(const AttendanceCorrectionState());

  /// Load all attendance corrections.
  Future<void> loadCorrections() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final requests = await _repository.getMyCorrections();
      state = state.copyWith(
        isLoading: false,
        requests: requests,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Create a new attendance correction.
  Future<bool> createCorrection({
    required int employeeId,
    required String correctionDate,
    required String correctionTime,
    required int correctionType,
    required String reason,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final request = CreateAttendanceCorrectionRequest(
        employeeId: employeeId,
        correctionDate: correctionDate,
        correctionTime: correctionTime,
        correctionType: correctionType,
        reason: reason,
      );

      await _repository.createCorrection(request);

      // Reload the list to get the newly created correction with server-assigned fields
      await loadCorrections();

      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  /// Cancel a pending attendance correction.
  Future<bool> cancelCorrection(int id) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      await _repository.cancelCorrection(id);

      state = state.copyWith(
        isLoading: false,
        requests: state.requests.where((r) => r.id != id).toList(),
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

/// Provider for AttendanceCorrectionNotifier.
final attendanceCorrectionNotifierProvider =
    StateNotifierProvider<AttendanceCorrectionNotifier, AttendanceCorrectionState>((ref) {
  final repository = ref.watch(attendanceCorrectionRepositoryProvider);
  return AttendanceCorrectionNotifier(repository);
});
