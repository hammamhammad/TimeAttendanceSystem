import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/leave_model.dart';

/// Repository for leave operations.
class LeaveRepository {
  final Dio _dio;

  LeaveRepository(this._dio);

  /// Get leave balance summary.
  Future<List<LeaveBalance>> getBalances() async {
    try {
      final response = await _dio.get('/api/v1/leave/balance');
      final List<dynamic> data = response.data;
      return data.map((e) => LeaveBalance.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get balances');
    }
  }

  /// Get leave requests with optional filter.
  Future<List<LeaveRequest>> getRequests({LeaveStatus? status}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (status != null) {
        queryParams['status'] = status.index;
      }
      
      final response = await _dio.get(
        '/api/v1/leave/requests',
        queryParameters: queryParams,
      );
      
      final List<dynamic> data = response.data;
      return data.map((e) => LeaveRequest.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get requests');
    }
  }

  /// Create a new leave request.
  Future<LeaveRequest> createRequest(CreateLeaveRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/leave/requests',
        data: {
          'leaveType': request.type.index,
          'startDate': request.startDate.toIso8601String(),
          'endDate': request.endDate.toIso8601String(),
          'reason': request.reason,
        },
      );
      return LeaveRequest.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to create request');
    }
  }

  /// Cancel a pending leave request.
  Future<void> cancelRequest(String requestId) async {
    try {
      await _dio.delete('/api/v1/leave/requests/$requestId');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to cancel request');
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
  final List<LeaveBalance> balances;
  final List<LeaveRequest> requests;
  final LeaveStatus? filterStatus;
  
  const LeaveState({
    this.isLoading = false,
    this.error,
    this.balances = const [],
    this.requests = const [],
    this.filterStatus,
  });
  
  LeaveState copyWith({
    bool? isLoading,
    String? error,
    List<LeaveBalance>? balances,
    List<LeaveRequest>? requests,
    LeaveStatus? filterStatus,
  }) {
    return LeaveState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      balances: balances ?? this.balances,
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
      final balances = await _repository.getBalances();
      final requests = await _repository.getRequests();
      
      state = state.copyWith(
        isLoading: false,
        balances: balances,
        requests: requests,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Refresh only requests.
  Future<void> refreshRequests() async {
    try {
      final requests = await _repository.getRequests(status: state.filterStatus);
      state = state.copyWith(requests: requests);
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
  
  /// Create new leave request.
  Future<bool> createRequest({
    required LeaveType type,
    required DateTime startDate,
    required DateTime endDate,
    String? reason,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final request = CreateLeaveRequest(
        type: type,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
      );
      
      final created = await _repository.createRequest(request);
      
      // Add to list
      state = state.copyWith(
        isLoading: false,
        requests: [created, ...state.requests],
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
  
  /// Cancel a pending request.
  Future<bool> cancelRequest(String requestId) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      await _repository.cancelRequest(requestId);
      
      // Update list
      state = state.copyWith(
        isLoading: false,
        requests: state.requests.map((r) {
          if (r.id == requestId) {
            return LeaveRequest(
              id: r.id,
              type: r.type,
              startDate: r.startDate,
              endDate: r.endDate,
              status: LeaveStatus.cancelled,
              reason: r.reason,
            );
          }
          return r;
        }).toList(),
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
final leaveNotifierProvider = StateNotifierProvider<LeaveNotifier, LeaveState>((ref) {
  final repository = ref.watch(leaveRepositoryProvider);
  return LeaveNotifier(repository);
});
