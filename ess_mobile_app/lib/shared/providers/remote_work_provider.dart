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
        '/api/v1/remote-work',
        queryParameters: queryParams,
      );
      
      final List<dynamic> data = response.data;
      return data.map((e) => RemoteWorkRequest.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get requests');
    }
  }

  /// Create new remote work request.
  Future<RemoteWorkRequest> createRequest(CreateRemoteWorkRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/remote-work',
        data: {
          'startDate': request.startDate.toIso8601String(),
          'endDate': request.endDate.toIso8601String(),
          'reason': request.reason,
          'workLocation': request.workLocation,
          'contactPhone': request.contactPhone,
        },
      );
      return RemoteWorkRequest.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to create request');
    }
  }

  /// Cancel pending request.
  Future<void> cancelRequest(String requestId) async {
    try {
      await _dio.post('/api/v1/remote-work/$requestId/cancel');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to cancel request');
    }
  }

  /// Get remote work policy.
  Future<RemoteWorkPolicy> getPolicy() async {
    try {
      final response = await _dio.get('/api/v1/remote-work/policy');
      return RemoteWorkPolicy.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get policy');
    }
  }

  /// Get remaining remote work days for current month.
  Future<int> getRemainingDays() async {
    try {
      final response = await _dio.get('/api/v1/remote-work/remaining-days');
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
    required DateTime startDate,
    required DateTime endDate,
    required String reason,
    String? workLocation,
    String? contactPhone,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final request = CreateRemoteWorkRequest(
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        workLocation: workLocation,
        contactPhone: contactPhone,
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
