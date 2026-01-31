import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/excuse_model.dart';

/// Repository for excuse operations.
class ExcuseRepository {
  final Dio _dio;

  ExcuseRepository(this._dio);

  /// Get all excuse requests.
  Future<List<ExcuseRequest>> getRequests({ExcuseStatus? status}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (status != null) {
        queryParams['status'] = status.index;
      }
      
      final response = await _dio.get(
        '/api/v1/excuses',
        queryParameters: queryParams,
      );
      
      final List<dynamic> data = response.data;
      return data.map((e) => ExcuseRequest.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get excuses');
    }
  }

  /// Create new excuse request.
  Future<ExcuseRequest> createRequest(CreateExcuseRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/excuses',
        data: {
          'excuseType': request.type.index,
          'excuseDate': request.excuseDate.toIso8601String(),
          'reason': request.reason,
          'requestedTime': request.requestedTime?.toIso8601String(),
        },
      );
      return ExcuseRequest.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to create excuse');
    }
  }

  /// Cancel pending excuse request.
  Future<void> cancelRequest(String requestId) async {
    try {
      await _dio.delete('/api/v1/excuses/$requestId');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to cancel excuse');
    }
  }
}

/// Provider for ExcuseRepository.
final excuseRepositoryProvider = Provider<ExcuseRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return ExcuseRepository(dio);
});

/// Excuse state.
class ExcuseState {
  final bool isLoading;
  final String? error;
  final List<ExcuseRequest> requests;
  
  const ExcuseState({
    this.isLoading = false,
    this.error,
    this.requests = const [],
  });
  
  ExcuseState copyWith({
    bool? isLoading,
    String? error,
    List<ExcuseRequest>? requests,
  }) {
    return ExcuseState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      requests: requests ?? this.requests,
    );
  }

  List<ExcuseRequest> get pendingRequests =>
      requests.where((r) => r.status == ExcuseStatus.pending).toList();
  
  List<ExcuseRequest> get approvedRequests =>
      requests.where((r) => r.status == ExcuseStatus.approved).toList();
  
  List<ExcuseRequest> get rejectedRequests =>
      requests.where((r) => r.status == ExcuseStatus.rejected).toList();
}

/// Excuse notifier.
class ExcuseNotifier extends StateNotifier<ExcuseState> {
  final ExcuseRepository _repository;
  
  ExcuseNotifier(this._repository) : super(const ExcuseState());
  
  /// Load all excuses.
  Future<void> loadExcuses() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final requests = await _repository.getRequests();
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
  
  /// Create new excuse.
  Future<bool> createExcuse({
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    DateTime? requestedTime,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final request = CreateExcuseRequest(
        type: type,
        excuseDate: excuseDate,
        reason: reason,
        requestedTime: requestedTime,
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
  
  /// Cancel excuse.
  Future<bool> cancelExcuse(String requestId) async {
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

/// Provider for ExcuseNotifier.
final excuseNotifierProvider = StateNotifierProvider<ExcuseNotifier, ExcuseState>((ref) {
  final repository = ref.watch(excuseRepositoryProvider);
  return ExcuseNotifier(repository);
});
