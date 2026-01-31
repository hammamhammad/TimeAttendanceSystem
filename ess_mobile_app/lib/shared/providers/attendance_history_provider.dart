import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/attendance_history_model.dart';

/// Repository for attendance history operations.
class AttendanceHistoryRepository {
  final Dio _dio;

  AttendanceHistoryRepository(this._dio);

  /// Get attendance history for a date range.
  Future<List<DailyAttendance>> getHistory({
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final response = await _dio.get(
        '/api/v1/mobile/attendance/history',
        queryParameters: {
          'startDate': startDate.toIso8601String(),
          'endDate': endDate.toIso8601String(),
        },
      );
      
      final List<dynamic> data = response.data;
      return data.map((e) => DailyAttendance.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get history');
    }
  }

  /// Get monthly summary.
  Future<MonthlyAttendanceSummary> getMonthlySummary(int year, int month) async {
    try {
      final response = await _dio.get(
        '/api/v1/mobile/attendance/summary',
        queryParameters: {
          'year': year,
          'month': month,
        },
      );
      return MonthlyAttendanceSummary.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get summary');
    }
  }
}

/// Provider for AttendanceHistoryRepository.
final attendanceHistoryRepositoryProvider = Provider<AttendanceHistoryRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return AttendanceHistoryRepository(dio);
});

/// Attendance history state.
class AttendanceHistoryState {
  final bool isLoading;
  final String? error;
  final DateTime selectedMonth;
  final Map<DateTime, DailyAttendance> dailyRecords;
  final MonthlyAttendanceSummary? summary;
  final DailyAttendance? selectedDay;
  
  const AttendanceHistoryState({
    this.isLoading = false,
    this.error,
    required this.selectedMonth,
    this.dailyRecords = const {},
    this.summary,
    this.selectedDay,
  });
  
  AttendanceHistoryState copyWith({
    bool? isLoading,
    String? error,
    DateTime? selectedMonth,
    Map<DateTime, DailyAttendance>? dailyRecords,
    MonthlyAttendanceSummary? summary,
    DailyAttendance? selectedDay,
  }) {
    return AttendanceHistoryState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      selectedMonth: selectedMonth ?? this.selectedMonth,
      dailyRecords: dailyRecords ?? this.dailyRecords,
      summary: summary ?? this.summary,
      selectedDay: selectedDay ?? this.selectedDay,
    );
  }
}

/// Attendance history notifier.
class AttendanceHistoryNotifier extends StateNotifier<AttendanceHistoryState> {
  final AttendanceHistoryRepository _repository;
  
  AttendanceHistoryNotifier(this._repository) 
      : super(AttendanceHistoryState(selectedMonth: DateTime.now()));
  
  /// Load attendance for a month.
  Future<void> loadMonth(DateTime month) async {
    state = state.copyWith(isLoading: true, error: null, selectedMonth: month);
    
    try {
      // Calculate date range for the month
      final startDate = DateTime(month.year, month.month, 1);
      final endDate = DateTime(month.year, month.month + 1, 0);
      
      // Fetch data in parallel
      final results = await Future.wait([
        _repository.getHistory(startDate: startDate, endDate: endDate),
        _repository.getMonthlySummary(month.year, month.month),
      ]);
      
      final history = results[0] as List<DailyAttendance>;
      final summary = results[1] as MonthlyAttendanceSummary;
      
      // Convert list to map for easy lookup
      final dailyMap = <DateTime, DailyAttendance>{};
      for (final record in history) {
        final dateKey = DateTime(record.date.year, record.date.month, record.date.day);
        dailyMap[dateKey] = record;
      }
      
      state = state.copyWith(
        isLoading: false,
        dailyRecords: dailyMap,
        summary: summary,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Navigate to previous month.
  void previousMonth() {
    final prev = DateTime(state.selectedMonth.year, state.selectedMonth.month - 1);
    loadMonth(prev);
  }
  
  /// Navigate to next month.
  void nextMonth() {
    final next = DateTime(state.selectedMonth.year, state.selectedMonth.month + 1);
    loadMonth(next);
  }
  
  /// Select a specific day.
  void selectDay(DateTime date) {
    final dateKey = DateTime(date.year, date.month, date.day);
    state = state.copyWith(selectedDay: state.dailyRecords[dateKey]);
  }
  
  /// Clear selected day.
  void clearSelection() {
    state = state.copyWith(selectedDay: null);
  }
  
  /// Get attendance for a specific date.
  DailyAttendance? getAttendanceForDate(DateTime date) {
    final dateKey = DateTime(date.year, date.month, date.day);
    return state.dailyRecords[dateKey];
  }
}

/// Provider for AttendanceHistoryNotifier.
final attendanceHistoryProvider = StateNotifierProvider<AttendanceHistoryNotifier, AttendanceHistoryState>((ref) {
  final repository = ref.watch(attendanceHistoryRepositoryProvider);
  return AttendanceHistoryNotifier(repository);
});
