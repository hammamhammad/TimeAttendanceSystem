import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/notification_broadcast_model.dart';
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

/// Target type string to int mapping for BroadcastTargetType enum.
const _targetTypeMap = {
  'all': 0,
  'branch': 1,
  'department': 2,
  'individual': 3,
};

/// Normalize broadcast JSON from backend (int IDs → String, enum strings → int).
Map<String, dynamic> _normalizeBroadcastJson(Map<String, dynamic> raw) {
  return {
    ...raw,
    'id': raw['id']?.toString(),
    'targetId': raw['targetId']?.toString(),
    'targetType': raw['targetType'] is String
        ? _targetTypeMap[raw['targetType'].toString().toLowerCase()] ?? 0
        : raw['targetType'],
  };
}

/// Normalize branch JSON from backend (int IDs → String).
Map<String, dynamic> _normalizeBranchJson(Map<String, dynamic> raw) {
  return {
    ...raw,
    'id': raw['id']?.toString(),
    'geofenceRadius': raw['geofenceRadius'] ?? raw['geofenceRadiusMeters'],
  };
}

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
      id: json['id']?.toString() ?? '',
      name: json['name'] ?? '',
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
      final response = await _dio.get(
        '/api/v1/notification-broadcasts',
        queryParameters: {'pageSize': 1000},
      );
      final items = _extractItems(response.data);
      return items
          .map((e) => NotificationBroadcast.fromJson(
              _normalizeBroadcastJson(e as Map<String, dynamic>)))
          .toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get broadcasts');
    }
  }

  /// Send broadcast notification.
  Future<NotificationBroadcast> sendBroadcast(CreateBroadcastRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/notification-broadcasts',
        data: {
          'title': request.title,
          'message': request.message,
          'targetType': request.targetType.index,
          'targetId': request.targetId,
          'sendPush': request.sendPush ?? true,
        },
      );
      final data = response.data is Map<String, dynamic>
          ? response.data as Map<String, dynamic>
          : <String, dynamic>{};
      return NotificationBroadcast.fromJson(_normalizeBroadcastJson(data));
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to send broadcast');
    }
  }

  /// Get departments for targeting.
  Future<List<Department>> getDepartments() async {
    try {
      final response = await _dio.get(
        '/api/v1/departments',
        queryParameters: {'pageSize': 1000},
      );
      final items = _extractItems(response.data);
      return items
          .map((e) => Department.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get departments');
    }
  }

  /// Get branches for targeting.
  Future<List<Branch>> getBranches() async {
    try {
      final response = await _dio.get(
        '/api/v1/branches',
        queryParameters: {'pageSize': 1000},
      );
      final items = _extractItems(response.data);
      return items
          .map((e) => Branch.fromJson(
              _normalizeBranchJson(e as Map<String, dynamic>)))
          .toList();
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
