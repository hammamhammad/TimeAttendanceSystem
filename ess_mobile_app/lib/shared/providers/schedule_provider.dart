import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/shift_model.dart';

/// Repository for shift operations.
class ShiftRepository {
  final Dio _dio;

  ShiftRepository(this._dio);

  /// Get schedule for a week.
  Future<WeeklySchedule> getWeeklySchedule(DateTime weekStart) async {
    try {
      final response = await _dio.get(
        '/api/v1/mobile/schedule/weekly',
        queryParameters: {
          'weekStart': weekStart.toIso8601String(),
        },
      );
      return WeeklySchedule.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get schedule');
    }
  }

  /// Get schedule for a date range.
  Future<List<ShiftAssignment>> getSchedule({
    required DateTime startDate,
    required DateTime endDate,
  }) async {
    try {
      final response = await _dio.get(
        '/api/v1/mobile/schedule',
        queryParameters: {
          'startDate': startDate.toIso8601String(),
          'endDate': endDate.toIso8601String(),
        },
      );
      
      final List<dynamic> data = response.data;
      return data.map((e) => ShiftAssignment.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get schedule');
    }
  }

  /// Get today's shift.
  Future<ShiftAssignment?> getTodayShift() async {
    try {
      final response = await _dio.get('/api/v1/mobile/schedule/today');
      if (response.data == null) return null;
      return ShiftAssignment.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get shift');
    }
  }
}

/// Provider for ShiftRepository.
final shiftRepositoryProvider = Provider<ShiftRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return ShiftRepository(dio);
});

/// Schedule state.
class ScheduleState {
  final bool isLoading;
  final String? error;
  final DateTime selectedWeekStart;
  final WeeklySchedule? weeklySchedule;
  final ShiftAssignment? todayShift;
  
  const ScheduleState({
    this.isLoading = false,
    this.error,
    required this.selectedWeekStart,
    this.weeklySchedule,
    this.todayShift,
  });
  
  ScheduleState copyWith({
    bool? isLoading,
    String? error,
    DateTime? selectedWeekStart,
    WeeklySchedule? weeklySchedule,
    ShiftAssignment? todayShift,
  }) {
    return ScheduleState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      selectedWeekStart: selectedWeekStart ?? this.selectedWeekStart,
      weeklySchedule: weeklySchedule ?? this.weeklySchedule,
      todayShift: todayShift ?? this.todayShift,
    );
  }
}

/// Schedule notifier.
class ScheduleNotifier extends StateNotifier<ScheduleState> {
  final ShiftRepository _repository;
  
  ScheduleNotifier(this._repository) : super(ScheduleState(
    selectedWeekStart: _getWeekStart(DateTime.now()),
  ));
  
  static DateTime _getWeekStart(DateTime date) {
    return date.subtract(Duration(days: date.weekday - 1));
  }
  
  /// Load current week's schedule.
  Future<void> loadCurrentWeek() async {
    await loadWeek(state.selectedWeekStart);
  }
  
  /// Load a specific week.
  Future<void> loadWeek(DateTime weekStart) async {
    final normalizedStart = _getWeekStart(weekStart);
    state = state.copyWith(
      isLoading: true,
      error: null,
      selectedWeekStart: normalizedStart,
    );
    
    try {
      final results = await Future.wait([
        _repository.getWeeklySchedule(normalizedStart),
        _repository.getTodayShift(),
      ]);
      
      state = state.copyWith(
        isLoading: false,
        weeklySchedule: results[0] as WeeklySchedule,
        todayShift: results[1] as ShiftAssignment?,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Go to previous week.
  void previousWeek() {
    final prevWeek = state.selectedWeekStart.subtract(const Duration(days: 7));
    loadWeek(prevWeek);
  }
  
  /// Go to next week.
  void nextWeek() {
    final nextWeekStart = state.selectedWeekStart.add(const Duration(days: 7));
    loadWeek(nextWeekStart);
  }
  
  /// Go to current week.
  void goToCurrentWeek() {
    loadWeek(DateTime.now());
  }
}

/// Provider for ScheduleNotifier.
final scheduleProvider = StateNotifierProvider<ScheduleNotifier, ScheduleState>((ref) {
  final repository = ref.watch(shiftRepositoryProvider);
  return ScheduleNotifier(repository);
});
