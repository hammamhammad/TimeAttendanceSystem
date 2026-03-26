import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/remote_work_model.dart';

/// Repository for remote work operations.
class RemoteWorkRepository {
  final Dio _dio;

  RemoteWorkRepository(this._dio);

  /// Get all remote work requests.
  Future<List<RemoteWorkRequest>> getRequests({RemoteWorkStatus? status}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (status != null) {
        queryParams['status'] = status.index;
      }
      
      final response = await _dio.get(
        '/api/v1/portal/my-remote-work-requests',
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
      return items.map((e) => RemoteWorkRequest.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get requests');
    }
  }

  /// Create new remote work request.
  Future<RemoteWorkRequest> createRequest(CreateRemoteWorkRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/remote-work-requests',
        data: {
          'employeeId': request.employeeId,
          'startDate': request.startDate.toIso8601String().split('T')[0],
          'endDate': request.endDate.toIso8601String().split('T')[0],
          'reason': request.reason,
        },
      );

      // Backend returns Result<long> with the new request ID
      final data = response.data;
      if (data is Map<String, dynamic> && data.containsKey('value')) {
        final requests = await getRequests();
        return requests.firstWhere(
          (r) => r.id == data['value'].toString(),
          orElse: () => RemoteWorkRequest(
            id: data['value'].toString(),
            startDate: request.startDate,
            endDate: request.endDate,
            reason: request.reason,
            status: RemoteWorkStatus.pending,
          ),
        );
      }
      return RemoteWorkRequest.fromJson(data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to create request');
    }
  }

  /// Update a pending remote work request.
  Future<void> updateRequest({
    required String requestId,
    required int employeeId,
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
  }) async {
    try {
      await _dio.put(
        '/api/v1/remote-work-requests/$requestId',
        data: {
          'id': int.tryParse(requestId) ?? requestId,
          'employeeId': employeeId,
          'startDate': startDate.toIso8601String().split('T')[0],
          'endDate': endDate.toIso8601String().split('T')[0],
          'reason': reason,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? e.response?.data?['error'] ?? 'Failed to update request');
    }
  }

  /// Cancel pending request.
  Future<void> cancelRequest(String requestId) async {
    try {
      await _dio.post('/api/v1/remote-work-requests/$requestId/cancel');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to cancel request');
    }
  }

  /// Get remote work policy.
  Future<RemoteWorkPolicy> getPolicy() async {
    try {
      final response = await _dio.get('/api/v1/remote-work-policies');
      // Get the first active policy (filtered by employee's branch on backend)
      final data = response.data;
      List<dynamic> items;
      if (data is Map<String, dynamic>) {
        items = data['items'] ?? data['data'] ?? [];
      } else if (data is List) {
        items = data;
      } else {
        items = [];
      }
      if (items.isEmpty) {
        return RemoteWorkPolicy(
          maxDaysPerMonth: 0,
          maxConsecutiveDays: 0,
          requiresApproval: true,
          advanceNoticeDays: 0,
        );
      }
      return RemoteWorkPolicy.fromJson(items.first as Map<String, dynamic>);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get policy');
    }
  }

  /// Get remaining remote work days for current month.
  Future<int> getRemainingDays() async {
    try {
      final response = await _dio.get('/api/v1/remote-work-requests/remaining-days');
      return response.data['remainingDays'] ?? 0;
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get remaining days');
    }
  }
}

/// Provider for RemoteWorkRepository.
final remoteWorkRepositoryProvider = Provider<RemoteWorkRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return RemoteWorkRepository(dio);
});

/// Remote work state.
class RemoteWorkState {
  final bool isLoading;
  final String? error;
  final List<RemoteWorkRequest> requests;
  final RemoteWorkPolicy? policy;
  final int remainingDays;
  
  const RemoteWorkState({
    this.isLoading = false,
    this.error,
    this.requests = const [],
    this.policy,
    this.remainingDays = 0,
  });
  
  RemoteWorkState copyWith({
    bool? isLoading,
    String? error,
    List<RemoteWorkRequest>? requests,
    RemoteWorkPolicy? policy,
    int? remainingDays,
  }) {
    return RemoteWorkState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      requests: requests ?? this.requests,
      policy: policy ?? this.policy,
      remainingDays: remainingDays ?? this.remainingDays,
    );
  }

  List<RemoteWorkRequest> get pendingRequests =>
      requests.where((r) => r.status == RemoteWorkStatus.pending).toList();
  
  List<RemoteWorkRequest> get approvedRequests =>
      requests.where((r) => r.status == RemoteWorkStatus.approved).toList();
  
  List<RemoteWorkRequest> get rejectedRequests =>
      requests.where((r) => r.status == RemoteWorkStatus.rejected).toList();
}

/// Remote work notifier.
class RemoteWorkNotifier extends StateNotifier<RemoteWorkState> {
  final RemoteWorkRepository _repository;
  
  RemoteWorkNotifier(this._repository) : super(const RemoteWorkState());
  
  /// Load all data.
  Future<void> loadAll() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final results = await Future.wait([
        _repository.getRequests(),
        _repository.getPolicy(),
        _repository.getRemainingDays(),
      ]);
      
      state = state.copyWith(
        isLoading: false,
        requests: results[0] as List<RemoteWorkRequest>,
        policy: results[1] as RemoteWorkPolicy,
        remainingDays: results[2] as int,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Create new request.
  Future<bool> createRequest({
    required int employeeId,
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final request = CreateRemoteWorkRequest(
        employeeId: employeeId,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
      );
      
      final created = await _repository.createRequest(request);
      
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
  
  /// Update a pending request.
  Future<bool> updateRequest({
    required String requestId,
    required int employeeId,
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
  }) async {
    try {
      await _repository.updateRequest(
        requestId: requestId,
        employeeId: employeeId,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
      );

      // Reload data to get fresh state
      await loadAll();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }

  /// Cancel request.
  Future<bool> cancelRequest(String requestId) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      await _repository.cancelRequest(requestId);
      
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
}

/// Provider for RemoteWorkNotifier.
final remoteWorkProvider = StateNotifierProvider<RemoteWorkNotifier, RemoteWorkState>((ref) {
  final repository = ref.watch(remoteWorkRepositoryProvider);
  return RemoteWorkNotifier(repository);
});
