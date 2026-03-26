import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/shift_model.dart';

/// Repository for shift operations.
class ShiftRepository {
  final Dio _dio;

  ShiftRepository(this._dio);

  /// Get schedule for a week. Backend returns List<DailyScheduleDto>.
  Future<WeeklySchedule> getWeeklySchedule(DateTime weekStart) async {
    try {
      final response = await _dio.get(
        '/api/v1/mobile/schedule/weekly',
        queryParameters: {
          'weekStart': weekStart.toIso8601String(),
        },
      );

      final data = response.data;
      List<dynamic> items;

      // Backend returns List<DailyScheduleDto> directly
      if (data is List) {
        items = data;
      } else if (data is Map<String, dynamic>) {
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          final value = data['value'];
          items = value is List ? value : [];
        } else {
          items = data['shifts'] ?? data['days'] ?? data['items'] ?? [];
        }
      } else {
        items = [];
      }

      // Convert DailyScheduleDto list to ShiftAssignment list
      final shifts = <ShiftAssignment>[];
      double totalHrs = 0;
      for (final item in items) {
        if (item is Map<String, dynamic>) {
          final dateStr = item['date']?.toString() ?? '';
          final shiftName = item['shiftName']?.toString() ?? 'No Shift';
          final isOffDay = item['isOffDay'] == true;
          final hours = (item['totalHours'] ?? 0).toDouble();
          totalHrs += hours;

          String startTime = '09:00';
          String endTime = '17:00';
          final periods = item['periods'] as List<dynamic>?;
          if (periods != null && periods.isNotEmpty) {
            final first = periods.first;
            if (first is Map<String, dynamic>) {
              startTime = first['startTime']?.toString() ?? startTime;
              endTime = first['endTime']?.toString() ?? endTime;
            }
          }

          DateTime date;
          try {
            date = DateTime.parse(dateStr);
          } catch (_) {
            continue;
          }

          shifts.add(ShiftAssignment(
            id: (item['shiftId'] ?? 0).toString(),
            date: date,
            shiftName: isOffDay ? 'Off Day' : shiftName,
            startTime: isOffDay ? '--:--' : startTime,
            endTime: isOffDay ? '--:--' : endTime,
            isNightShift: item['isNightShift'] == true,
            notes: isOffDay ? 'Off Day' : null,
          ));
        }
      }

      final weekEnd = weekStart.add(const Duration(days: 6));
      return WeeklySchedule(
        weekStart: weekStart,
        weekEnd: weekEnd,
        shifts: shifts,
        totalHours: totalHrs.round(),
      );
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

      final data = response.data;
      List<dynamic> items;
      if (data is List) {
        items = data;
      } else if (data is Map<String, dynamic>) {
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          items = data['value'] is List ? data['value'] : [];
        } else {
          items = data['items'] ?? [];
        }
      } else {
        items = [];
      }

      return items
          .whereType<Map<String, dynamic>>()
          .map((e) => ShiftAssignment.fromJson(e))
          .toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get schedule');
    }
  }

  /// Get today's shift.
  Future<ShiftAssignment?> getTodayShift() async {
    try {
      final response = await _dio.get('/api/v1/mobile/schedule/today');
      final data = response.data;
      if (data == null) return null;

      Map<String, dynamic>? shiftData;
      if (data is Map<String, dynamic>) {
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          shiftData = data['value'] as Map<String, dynamic>?;
        } else if (data.containsKey('date') || data.containsKey('shiftName')) {
          shiftData = data;
        }
      }

      if (shiftData == null) return null;

      final dateStr = shiftData['date']?.toString() ?? '';
      final shiftName = shiftData['shiftName']?.toString() ?? 'No Shift';
      final isOffDay = shiftData['isOffDay'] == true;

      String startTime = '09:00';
      String endTime = '17:00';
      final periods = shiftData['periods'] as List<dynamic>?;
      if (periods != null && periods.isNotEmpty) {
        final first = periods.first;
        if (first is Map<String, dynamic>) {
          startTime = first['startTime']?.toString() ?? startTime;
          endTime = first['endTime']?.toString() ?? endTime;
        }
      }

      DateTime date;
      try {
        date = DateTime.parse(dateStr);
      } catch (_) {
        date = DateTime.now();
      }

      return ShiftAssignment(
        id: (shiftData['shiftId'] ?? 0).toString(),
        date: date,
        shiftName: isOffDay ? 'Off Day' : shiftName,
        startTime: isOffDay ? '--:--' : startTime,
        endTime: isOffDay ? '--:--' : endTime,
        isNightShift: shiftData['isNightShift'] == true,
        notes: isOffDay ? 'Off Day' : null,
      );
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

  void previousWeek() {
    final prevWeek = state.selectedWeekStart.subtract(const Duration(days: 7));
    loadWeek(prevWeek);
  }

  void nextWeek() {
    final nextWeekStart = state.selectedWeekStart.add(const Duration(days: 7));
    loadWeek(nextWeekStart);
  }

  void goToCurrentWeek() {
    loadWeek(DateTime.now());
  }
}

/// Provider for ScheduleNotifier.
final scheduleProvider = StateNotifierProvider<ScheduleNotifier, ScheduleState>((ref) {
  final repository = ref.watch(shiftRepositoryProvider);
  return ScheduleNotifier(repository);
});
