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
      final queryParams = <String, dynamic>{
        'page': 1,
        'pageSize': 50,
      };
      if (status != null) {
        queryParams['status'] = status.index;
      }

      final response = await _dio.get(
        '/api/v1/portal/my-excuses',
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
      return items.map((e) => ExcuseRequest.fromJson(e as Map<String, dynamic>)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get excuses');
    }
  }

  /// Create new excuse request.
  Future<ExcuseRequest> createRequest(CreateExcuseRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/employee-excuses',
        data: {
          'employeeId': request.employeeId,
          'excuseType': request.type.index,
          'excuseDate': request.excuseDate.toIso8601String(),
          'startTime': request.startTime,
          'endTime': request.endTime,
          'reason': request.reason,
          'attachmentPath': request.attachmentPath,
        },
      );

      // Backend returns Result<long> with the new excuse ID
      final data = response.data;
      if (data is Map<String, dynamic> && data.containsKey('value')) {
        final requests = await getRequests();
        return requests.firstWhere(
          (r) => r.id == data['value'].toString(),
          orElse: () => ExcuseRequest(
            id: data['value'].toString(),
            type: request.type,
            excuseDate: request.excuseDate,
            reason: request.reason,
            status: ExcuseStatus.pending,
          ),
        );
      }

      return ExcuseRequest.fromJson(data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? e.response?.data?['error'] ?? 'Failed to create excuse');
    }
  }

  /// Update a pending excuse request.
  Future<void> updateRequest({
    required String requestId,
    required int employeeId,
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    required String startTime,
    required String endTime,
    String? attachmentPath,
  }) async {
    try {
      await _dio.put(
        '/api/v1/employee-excuses/$requestId',
        data: {
          'id': int.tryParse(requestId) ?? requestId,
          'employeeId': employeeId,
          'excuseType': type.index,
          'excuseDate': excuseDate.toIso8601String(),
          'startTime': startTime,
          'endTime': endTime,
          'reason': reason,
          'attachmentPath': attachmentPath,
        },
      );
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? e.response?.data?['error'] ?? 'Failed to update excuse');
    }
  }

  /// Cancel pending excuse request.
  Future<void> cancelRequest(String requestId) async {
    try {
      await _dio.delete('/api/v1/portal/my-excuses/$requestId');
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
    required int employeeId,
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    required String startTime,
    required String endTime,
    String? attachmentPath,
  }) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final request = CreateExcuseRequest(
        employeeId: employeeId,
        type: type,
        excuseDate: excuseDate,
        reason: reason,
        startTime: startTime,
        endTime: endTime,
        attachmentPath: attachmentPath,
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
  
  /// Update a pending excuse.
  Future<bool> updateExcuse({
    required String requestId,
    required int employeeId,
    required ExcuseType type,
    required DateTime excuseDate,
    required String reason,
    required String startTime,
    required String endTime,
    String? attachmentPath,
  }) async {
    try {
      await _repository.updateRequest(
        requestId: requestId,
        employeeId: employeeId,
        type: type,
        excuseDate: excuseDate,
        reason: reason,
        startTime: startTime,
        endTime: endTime,
        attachmentPath: attachmentPath,
      );

      // Reload data to get fresh state
      await loadExcuses();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
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
