import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/notification_broadcast_model.dart';
import '../models/branch_model.dart';

/// Department model for broadcast targeting.
class Department {
  final String id;
  final String name;
  final int employeeCount;
  
  Department({
    required this.id,
    required this.name,
    required this.employeeCount,
  });
  
  factory Department.fromJson(Map<String, dynamic> json) {
    return Department(
      id: json['id'],
      name: json['name'],
      employeeCount: json['employeeCount'] ?? 0,
    );
  }
}

/// Repository for broadcast operations.
class BroadcastRepository {
  final Dio _dio;

  BroadcastRepository(this._dio);

  /// Get broadcast history.
  Future<List<NotificationBroadcast>> getBroadcasts() async {
    try {
      final response = await _dio.get('/api/v1/notifications/broadcasts');
      final List<dynamic> data = response.data;
      return data.map((e) => NotificationBroadcast.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get broadcasts');
    }
  }

  /// Send broadcast notification.
  Future<NotificationBroadcast> sendBroadcast(CreateBroadcastRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/notifications/broadcasts',
        data: {
          'title': request.title,
          'message': request.message,
          'targetType': request.targetType.index,
          'targetId': request.targetId,
          'sendPush': request.sendPush ?? true,
        },
      );
      return NotificationBroadcast.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to send broadcast');
    }
  }

  /// Get departments for targeting.
  Future<List<Department>> getDepartments() async {
    try {
      final response = await _dio.get('/api/v1/departments');
      final List<dynamic> data = response.data;
      return data.map((e) => Department.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get departments');
    }
  }

  /// Get branches for targeting.
  Future<List<Branch>> getBranches() async {
    try {
      final response = await _dio.get('/api/v1/branches');
      final List<dynamic> data = response.data;
      return data.map((e) => Branch.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get branches');
    }
  }
}

/// Provider for BroadcastRepository.
final broadcastRepositoryProvider = Provider<BroadcastRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return BroadcastRepository(dio);
});

/// Broadcast state.
class BroadcastState {
  final bool isLoading;
  final String? error;
  final List<NotificationBroadcast> broadcasts;
  final List<Branch> branches;
  final List<Department> departments;
  
  const BroadcastState({
    this.isLoading = false,
    this.error,
    this.broadcasts = const [],
    this.branches = const [],
    this.departments = const [],
  });
  
  BroadcastState copyWith({
    bool? isLoading,
    String? error,
    List<NotificationBroadcast>? broadcasts,
    List<Branch>? branches,
    List<Department>? departments,
  }) {
    return BroadcastState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      broadcasts: broadcasts ?? this.broadcasts,
      branches: branches ?? this.branches,
      departments: departments ?? this.departments,
    );
  }
}

/// Broadcast notifier.
class BroadcastNotifier extends StateNotifier<BroadcastState> {
  final BroadcastRepository _repository;
  
  BroadcastNotifier(this._repository) : super(const BroadcastState());
  
  /// Load all data.
  Future<void> loadAll() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final results = await Future.wait([
        _repository.getBroadcasts(),
        _repository.getBranches(),
        _repository.getDepartments(),
      ]);
      
      state = state.copyWith(
        isLoading: false,
        broadcasts: results[0] as List<NotificationBroadcast>,
        branches: results[1] as List<Branch>,
        departments: results[2] as List<Department>,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Send broadcast.
  Future<bool> sendBroadcast({
    required String title,
    required String message,
    required BroadcastTargetType targetType,
    String? targetId,
    bool sendPush = true,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final request = CreateBroadcastRequest(
        title: title,
        message: message,
        targetType: targetType,
        targetId: targetId,
        sendPush: sendPush,
      );
      
      final broadcast = await _repository.sendBroadcast(request);
      
      state = state.copyWith(
        isLoading: false,
        broadcasts: [broadcast, ...state.broadcasts],
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

/// Provider for BroadcastNotifier.
final broadcastProvider = StateNotifierProvider<BroadcastNotifier, BroadcastState>((ref) {
  final repository = ref.watch(broadcastRepositoryProvider);
  return BroadcastNotifier(repository);
});
