import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';

/// Today's attendance data from the portal API.
class TodayAttendance {
  final DateTime? checkInTime;
  final DateTime? checkOutTime;
  final String status;
  final double workingHours;
  final bool isRemoteWork;
  final bool isOnVacation;

  TodayAttendance({
    this.checkInTime,
    this.checkOutTime,
    this.status = '',
    this.workingHours = 0,
    this.isRemoteWork = false,
    this.isOnVacation = false,
  });

  factory TodayAttendance.fromJson(Map<String, dynamic> json) {
    return TodayAttendance(
      checkInTime: json['checkInTime'] != null
          ? DateTime.tryParse(json['checkInTime'])
          : null,
      checkOutTime: json['checkOutTime'] != null
          ? DateTime.tryParse(json['checkOutTime'])
          : null,
      status: json['status'] ?? '',
      workingHours: (json['workingHours'] ?? 0).toDouble(),
      isRemoteWork: json['isRemoteWork'] ?? false,
      isOnVacation: json['isOnVacation'] ?? false,
    );
  }
}

/// Recent activity item from the portal API.
class RecentActivity {
  final int? entityId;
  final String type;
  final String description;
  final DateTime timestamp;
  final String icon;
  final String variant;

  RecentActivity({
    this.entityId,
    required this.type,
    required this.description,
    required this.timestamp,
    this.icon = 'fa-info-circle',
    this.variant = 'info',
  });

  factory RecentActivity.fromJson(Map<String, dynamic> json) {
    return RecentActivity(
      entityId: json['entityId'],
      type: json['type'] ?? '',
      description: json['description'] ?? '',
      timestamp: DateTime.tryParse(json['timestamp'] ?? '') ?? DateTime.now(),
      icon: json['icon'] ?? 'fa-info-circle',
      variant: json['variant'] ?? 'info',
    );
  }
}

/// Dashboard summary data matching backend EmployeeDashboardDto.
class DashboardData {
  final int employeeId;
  final String employeeName;
  final String employeeCode;
  final String? departmentName;
  final String? branchName;
  final double attendanceRate;
  final double attendanceTrend;
  final double totalWorkingHours;
  final double totalOvertimeHours;
  final int remainingVacationDays;
  final int pendingRequestsCount;
  final List<RecentActivity> recentActivity;
  final TodayAttendance? todayAttendance;

  DashboardData({
    required this.employeeId,
    required this.employeeName,
    required this.employeeCode,
    this.departmentName,
    this.branchName,
    this.attendanceRate = 0,
    this.attendanceTrend = 0,
    this.totalWorkingHours = 0,
    this.totalOvertimeHours = 0,
    this.remainingVacationDays = 0,
    this.pendingRequestsCount = 0,
    this.recentActivity = const [],
    this.todayAttendance,
  });

  factory DashboardData.fromJson(Map<String, dynamic> json) {
    return DashboardData(
      employeeId: json['employeeId'] ?? 0,
      employeeName: json['employeeName'] ?? '',
      employeeCode: json['employeeCode'] ?? '',
      departmentName: json['departmentName'],
      branchName: json['branchName'],
      attendanceRate: (json['attendanceRate'] ?? 0).toDouble(),
      attendanceTrend: (json['attendanceTrend'] ?? 0).toDouble(),
      totalWorkingHours: (json['totalWorkingHours'] ?? 0).toDouble(),
      totalOvertimeHours: (json['totalOvertimeHours'] ?? 0).toDouble(),
      remainingVacationDays: json['remainingVacationDays'] ?? 0,
      pendingRequestsCount: json['pendingRequestsCount'] ?? 0,
      recentActivity: (json['recentActivity'] as List<dynamic>?)
              ?.map((e) => RecentActivity.fromJson(e))
              .toList() ??
          [],
      todayAttendance: json['todayAttendance'] != null
          ? TodayAttendance.fromJson(json['todayAttendance'])
          : null,
    );
  }

  /// Formatted check-in time for display.
  String get formattedCheckIn {
    if (todayAttendance?.checkInTime == null) return '--:--';
    final time = todayAttendance!.checkInTime!;
    final hour = time.hour > 12 ? time.hour - 12 : (time.hour == 0 ? 12 : time.hour);
    final period = time.hour >= 12 ? 'PM' : 'AM';
    return '${hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')} $period';
  }

  /// Formatted check-out time for display.
  String get formattedCheckOut {
    if (todayAttendance?.checkOutTime == null) return '--:--';
    final time = todayAttendance!.checkOutTime!;
    final hour = time.hour > 12 ? time.hour - 12 : (time.hour == 0 ? 12 : time.hour);
    final period = time.hour >= 12 ? 'PM' : 'AM';
    return '${hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')} $period';
  }

  /// Formatted working hours for display.
  String get formattedWorkingHours {
    final hours = todayAttendance?.workingHours ?? 0;
    final h = hours.floor();
    final m = ((hours - h) * 60).round();
    return '${h}h ${m}m';
  }
}

/// Repository for dashboard data.
class DashboardRepository {
  final Dio _dio;

  DashboardRepository(this._dio);

  /// Get dashboard summary from portal API.
  Future<DashboardData> getDashboard() async {
    try {
      final response = await _dio.get('/api/v1/portal/employee-dashboard');

      // The backend returns Result<EmployeeDashboardDto> wrapper
      // Check if we have a successful result
      final data = response.data;
      if (data is Map<String, dynamic>) {
        // Handle Result wrapper from backend
        if (data.containsKey('isSuccess') && data['isSuccess'] == true && data.containsKey('value')) {
          return DashboardData.fromJson(data['value']);
        }
        // Handle direct response (no wrapper)
        if (data.containsKey('employeeId') || data.containsKey('employeeName')) {
          return DashboardData.fromJson(data);
        }
        // Handle error from Result wrapper
        if (data.containsKey('isSuccess') && data['isSuccess'] == false) {
          throw Exception(data['error'] ?? 'Failed to load dashboard');
        }
      }

      throw Exception('Invalid response format');
    } on DioException catch (e) {
      final errorMessage = e.response?.data?['error'] ??
                          e.response?.data?['message'] ??
                          'Failed to load dashboard';
      throw Exception(errorMessage);
    }
  }
}

/// Provider for DashboardRepository.
final dashboardRepositoryProvider = Provider<DashboardRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return DashboardRepository(dio);
});

/// Dashboard state.
class DashboardState {
  final bool isLoading;
  final String? error;
  final DashboardData? data;
  final DateTime? lastUpdated;
  
  const DashboardState({
    this.isLoading = false,
    this.error,
    this.data,
    this.lastUpdated,
  });
  
  DashboardState copyWith({
    bool? isLoading,
    String? error,
    DashboardData? data,
    DateTime? lastUpdated,
  }) {
    return DashboardState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      data: data ?? this.data,
      lastUpdated: lastUpdated ?? this.lastUpdated,
    );
  }
}

/// Dashboard notifier.
class DashboardNotifier extends StateNotifier<DashboardState> {
  final DashboardRepository _repository;
  
  DashboardNotifier(this._repository) : super(const DashboardState());
  
  /// Load dashboard data.
  Future<void> loadDashboard() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final data = await _repository.getDashboard();
      state = state.copyWith(
        isLoading: false,
        data: data,
        lastUpdated: DateTime.now(),
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Refresh dashboard.
  Future<void> refresh() async {
    await loadDashboard();
  }
}

/// Provider for DashboardNotifier.
final dashboardNotifierProvider = StateNotifierProvider<DashboardNotifier, DashboardState>((ref) {
  final repository = ref.watch(dashboardRepositoryProvider);
  return DashboardNotifier(repository);
});
