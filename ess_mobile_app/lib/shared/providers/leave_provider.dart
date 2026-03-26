import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/leave_model.dart';

/// Repository for leave operations.
class LeaveRepository {
  final Dio _dio;

  LeaveRepository(this._dio);

  /// Get vacation types for the dropdown.
  /// Uses /api/v1/vacation-types/dropdown which returns [{id, name}].
  Future<List<VacationType>> getVacationTypes() async {
    try {
      final response = await _dio.get('/api/v1/vacation-types/dropdown');
      final data = response.data;

      List<dynamic> items;
      if (data is List) {
        items = data;
      } else if (data is Map<String, dynamic>) {
        // Handle Result wrapper
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          final value = data['value'];
          items = value is List ? value : [];
        } else {
          items = data['items'] ?? [];
        }
      } else {
        items = [];
      }

      return items
          .whereType<Map<String, dynamic>>()
          .map((e) => VacationType(
                id: (e['id'] as num).toInt(),
                name: e['name']?.toString() ?? '',
              ))
          .toList();
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to get vacation types');
    }
  }

  /// Get leave requests with optional filter.
  Future<List<LeaveRequest>> getRequests({LeaveStatus? status}) async {
    try {
      final queryParams = <String, dynamic>{
        'page': 1,
        'pageSize': 50,
      };

      final response = await _dio.get(
        '/api/v1/portal/my-vacations',
        queryParameters: queryParams,
      );

      final data = response.data;
      List<dynamic> items;

      if (data is Map<String, dynamic>) {
        // Handle Result wrapper
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          final value = data['value'];
          if (value is Map<String, dynamic>) {
            items = value['items'] ?? value['data'] ?? [];
          } else if (value is List) {
            items = value;
          } else {
            items = [];
          }
        } else {
          items = data['items'] ?? data['data'] ?? [];
        }
      } else if (data is List) {
        items = data;
      } else {
        items = [];
      }

      final requests = <LeaveRequest>[];
      for (final item in items) {
        if (item is Map<String, dynamic>) {
          try {
            requests.add(LeaveRequest.fromJson(item));
          } catch (_) {
            // Skip items that fail to parse
          }
        }
      }

      // Filter by status client-side if needed
      if (status != null) {
        return requests.where((r) => r.status == status).toList();
      }

      return requests;
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to get requests');
    }
  }

  /// Create a new leave request.
  Future<void> createRequest(CreateLeaveRequest request) async {
    try {
      await _dio.post(
        '/api/v1/employee-vacations',
        data: {
          'employeeId': request.employeeId,
          'vacationTypeId': request.vacationTypeId,
          'startDate': request.startDate.toIso8601String(),
          'endDate': request.endDate.toIso8601String(),
          'notes': request.notes,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ??
          e.response?.data?['error'] ??
          'Failed to create request');
    }
  }

  /// Update a pending leave request.
  Future<void> updateRequest({
    required int requestId,
    required int employeeId,
    required int vacationTypeId,
    required DateTime startDate,
    required DateTime endDate,
    String? notes,
  }) async {
    try {
      await _dio.put(
        '/api/v1/employee-vacations/$requestId',
        data: {
          'id': requestId,
          'employeeId': employeeId,
          'vacationTypeId': vacationTypeId,
          'startDate': startDate.toIso8601String(),
          'endDate': endDate.toIso8601String(),
          'notes': notes,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ??
          e.response?.data?['error'] ??
          'Failed to update request');
    }
  }

  /// Cancel a pending leave request.
  Future<void> cancelRequest(int requestId) async {
    try {
      await _dio.delete('/api/v1/employee-vacations/$requestId');
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to cancel request');
    }
  }
}

/// Provider for LeaveRepository.
final leaveRepositoryProvider = Provider<LeaveRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return LeaveRepository(dio);
});

/// Leave state for the leave management feature.
class LeaveState {
  final bool isLoading;
  final String? error;
  final List<VacationType> vacationTypes;
  final List<LeaveRequest> requests;
  final LeaveStatus? filterStatus;

  const LeaveState({
    this.isLoading = false,
    this.error,
    this.vacationTypes = const [],
    this.requests = const [],
    this.filterStatus,
  });

  LeaveState copyWith({
    bool? isLoading,
    String? error,
    List<VacationType>? vacationTypes,
    List<LeaveRequest>? requests,
    LeaveStatus? filterStatus,
  }) {
    return LeaveState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      vacationTypes: vacationTypes ?? this.vacationTypes,
      requests: requests ?? this.requests,
      filterStatus: filterStatus ?? this.filterStatus,
    );
  }

  List<LeaveRequest> get pendingRequests =>
      requests.where((r) => r.status == LeaveStatus.pending).toList();

  List<LeaveRequest> get approvedRequests =>
      requests.where((r) => r.status == LeaveStatus.approved).toList();

  List<LeaveRequest> get rejectedRequests =>
      requests.where((r) => r.status == LeaveStatus.rejected).toList();
}

/// Leave notifier for managing leave state.
class LeaveNotifier extends StateNotifier<LeaveState> {
  final LeaveRepository _repository;

  LeaveNotifier(this._repository) : super(const LeaveState());

  /// Load all leave data.
  Future<void> loadData() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final results = await Future.wait([
        _repository.getVacationTypes(),
        _repository.getRequests(),
      ]);

      state = state.copyWith(
        isLoading: false,
        vacationTypes: results[0] as List<VacationType>,
        requests: results[1] as List<LeaveRequest>,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Load data alias for balance screen.
  Future<void> loadBalances() async => loadData();

  /// Refresh only requests.
  Future<void> refreshRequests() async {
    try {
      final requests =
          await _repository.getRequests(status: state.filterStatus);
      state = state.copyWith(requests: requests);
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  /// Create new leave request.
  Future<bool> createRequest({
    required int employeeId,
    required int vacationTypeId,
    required DateTime startDate,
    required DateTime endDate,
    String? notes,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final request = CreateLeaveRequest(
        employeeId: employeeId,
        vacationTypeId: vacationTypeId,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
      );

      await _repository.createRequest(request);

      // Reload requests to get the fresh list from server
      final requests = await _repository.getRequests();
      state = state.copyWith(
        isLoading: false,
        requests: requests,
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

  /// Update a pending request.
  Future<bool> updateRequest({
    required int requestId,
    required int employeeId,
    required int vacationTypeId,
    required DateTime startDate,
    required DateTime endDate,
    String? notes,
  }) async {
    try {
      await _repository.updateRequest(
        requestId: requestId,
        employeeId: employeeId,
        vacationTypeId: vacationTypeId,
        startDate: startDate,
        endDate: endDate,
        notes: notes,
      );

      // Reload data to get fresh state
      await loadData();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }

  /// Cancel a pending request.
  Future<bool> cancelRequest(int requestId) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      await _repository.cancelRequest(requestId);

      // Remove from list
      state = state.copyWith(
        isLoading: false,
        requests: state.requests.where((r) => r.id != requestId).toList(),
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

  /// Filter by status.
  void setFilter(LeaveStatus? status) {
    state = state.copyWith(filterStatus: status);
    refreshRequests();
  }
}

/// Provider for LeaveNotifier.
final leaveNotifierProvider =
    StateNotifierProvider<LeaveNotifier, LeaveState>((ref) {
  final repository = ref.watch(leaveRepositoryProvider);
  return LeaveNotifier(repository);
});
