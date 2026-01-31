import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';

/// Admin dashboard statistics.
class AdminDashboardStats {
  final int totalEmployees;
  final int activeEmployees;
  final int presentToday;
  final int absentToday;
  final int onLeaveToday;
  final int lateToday;
  final int pendingLeaveRequests;
  final int pendingExcuseRequests;
  final int pendingRemoteWorkRequests;
  final int totalBranches;
  final int activeBranches;
  final int totalNfcTags;
  final int activeNfcTags;
  final double overallAttendanceRate;
  
  AdminDashboardStats({
    required this.totalEmployees,
    required this.activeEmployees,
    required this.presentToday,
    required this.absentToday,
    required this.onLeaveToday,
    required this.lateToday,
    required this.pendingLeaveRequests,
    required this.pendingExcuseRequests,
    required this.pendingRemoteWorkRequests,
    required this.totalBranches,
    required this.activeBranches,
    required this.totalNfcTags,
    required this.activeNfcTags,
    required this.overallAttendanceRate,
  });
  
  factory AdminDashboardStats.fromJson(Map<String, dynamic> json) {
    return AdminDashboardStats(
      totalEmployees: json['totalEmployees'] ?? 0,
      activeEmployees: json['activeEmployees'] ?? 0,
      presentToday: json['presentToday'] ?? 0,
      absentToday: json['absentToday'] ?? 0,
      onLeaveToday: json['onLeaveToday'] ?? 0,
      lateToday: json['lateToday'] ?? 0,
      pendingLeaveRequests: json['pendingLeaveRequests'] ?? 0,
      pendingExcuseRequests: json['pendingExcuseRequests'] ?? 0,
      pendingRemoteWorkRequests: json['pendingRemoteWorkRequests'] ?? 0,
      totalBranches: json['totalBranches'] ?? 0,
      activeBranches: json['activeBranches'] ?? 0,
      totalNfcTags: json['totalNfcTags'] ?? 0,
      activeNfcTags: json['activeNfcTags'] ?? 0,
      overallAttendanceRate: (json['overallAttendanceRate'] ?? 0).toDouble(),
    );
  }
  
  int get totalPendingRequests => 
      pendingLeaveRequests + pendingExcuseRequests + pendingRemoteWorkRequests;
}

/// Repository for admin dashboard.
class AdminDashboardRepository {
  final Dio _dio;

  AdminDashboardRepository(this._dio);

  /// Get dashboard statistics.
  Future<AdminDashboardStats> getStats() async {
    try {
      final response = await _dio.get('/api/v1/admin/dashboard/stats');
      return AdminDashboardStats.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get stats');
    }
  }
}

/// Provider for AdminDashboardRepository.
final adminDashboardRepositoryProvider = Provider<AdminDashboardRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return AdminDashboardRepository(dio);
});

/// Admin dashboard state.
class AdminDashboardState {
  final bool isLoading;
  final String? error;
  final AdminDashboardStats? stats;
  
  const AdminDashboardState({
    this.isLoading = false,
    this.error,
    this.stats,
  });
  
  AdminDashboardState copyWith({
    bool? isLoading,
    String? error,
    AdminDashboardStats? stats,
  }) {
    return AdminDashboardState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      stats: stats ?? this.stats,
    );
  }
}

/// Admin dashboard notifier.
class AdminDashboardNotifier extends StateNotifier<AdminDashboardState> {
  final AdminDashboardRepository _repository;
  
  AdminDashboardNotifier(this._repository) : super(const AdminDashboardState());
  
  /// Load dashboard stats.
  Future<void> loadStats() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final stats = await _repository.getStats();
      state = state.copyWith(
        isLoading: false,
        stats: stats,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
}

/// Provider for AdminDashboardNotifier.
final adminDashboardProvider = StateNotifierProvider<AdminDashboardNotifier, AdminDashboardState>((ref) {
  final repository = ref.watch(adminDashboardRepositoryProvider);
  return AdminDashboardNotifier(repository);
});
