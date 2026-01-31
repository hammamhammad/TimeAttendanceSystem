import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/shift_model.dart';
import '../../../shared/providers/schedule_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Schedule screen showing weekly shift assignments.
class ScheduleScreen extends ConsumerStatefulWidget {
  const ScheduleScreen({super.key});

  @override
  ConsumerState<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends ConsumerState<ScheduleScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(scheduleProvider.notifier).loadCurrentWeek();
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final state = ref.watch(scheduleProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Schedule'),
        actions: [
          IconButton(
            icon: const Icon(Icons.today),
            onPressed: () => ref.read(scheduleProvider.notifier).goToCurrentWeek(),
            tooltip: 'Go to today',
          ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(scheduleProvider.notifier).loadCurrentWeek(),
                )
              : Column(
                  children: [
                    // Today's shift card
                    if (state.todayShift != null)
                      _TodayShiftCard(shift: state.todayShift!),
                    
                    // Week navigation
                    _WeekNavigator(
                      weekStart: state.selectedWeekStart,
                      onPrevious: () => ref.read(scheduleProvider.notifier).previousWeek(),
                      onNext: () => ref.read(scheduleProvider.notifier).nextWeek(),
                    ),
                    
                    // Weekly summary
                    if (state.weeklySchedule != null)
                      _WeeklySummary(schedule: state.weeklySchedule!),
                    
                    // Schedule list
                    Expanded(
                      child: state.weeklySchedule != null
                          ? _WeeklyScheduleList(
                              weekStart: state.selectedWeekStart,
                              shifts: state.weeklySchedule!.shifts,
                            )
                          : const AppEmpty(
                              message: 'No schedule available',
                              icon: Icons.calendar_today,
                            ),
                    ),
                  ],
                ),
    );
  }
}

/// Today's shift highlight card.
class _TodayShiftCard extends StatelessWidget {
  final ShiftAssignment shift;
  
  const _TodayShiftCard({required this.shift});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.primary,
            AppColors.primary.withBlue(200),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.access_time, color: Colors.white, size: 28),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Today's Shift",
                  style: TextStyle(color: Colors.white70),
                ),
                Text(
                  shift.shiftName,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                shift.startTime,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'to ${shift.endTime}',
                style: const TextStyle(color: Colors.white70),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

/// Week navigation header.
class _WeekNavigator extends StatelessWidget {
  final DateTime weekStart;
  final VoidCallback onPrevious;
  final VoidCallback onNext;
  
  const _WeekNavigator({
    required this.weekStart,
    required this.onPrevious,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    final weekEnd = weekStart.add(const Duration(days: 6));
    final format = DateFormat('MMM d');
    final isCurrentWeek = _isCurrentWeek(weekStart);
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          IconButton(
            onPressed: onPrevious,
            icon: const Icon(Icons.chevron_left),
          ),
          Column(
            children: [
              Text(
                '${format.format(weekStart)} - ${format.format(weekEnd)}',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              if (isCurrentWeek)
                Container(
                  margin: const EdgeInsets.only(top: 4),
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    'Current Week',
                    style: TextStyle(
                      color: AppColors.primary,
                      fontSize: 10,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
            ],
          ),
          IconButton(
            onPressed: onNext,
            icon: const Icon(Icons.chevron_right),
          ),
        ],
      ),
    );
  }
  
  bool _isCurrentWeek(DateTime weekStart) {
    final now = DateTime.now();
    final currentWeekStart = now.subtract(Duration(days: now.weekday - 1));
    return weekStart.year == currentWeekStart.year &&
           weekStart.month == currentWeekStart.month &&
           weekStart.day == currentWeekStart.day;
  }
}

/// Weekly summary bar.
class _WeeklySummary extends StatelessWidget {
  final WeeklySchedule schedule;
  
  const _WeeklySummary({required this.schedule});

  @override
  Widget build(BuildContext context) {
    final hours = schedule.totalHours;
    final shifts = schedule.shifts.length;
    
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceVariant,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _SummaryItem(
            icon: Icons.calendar_today,
            value: '$shifts',
            label: 'Shifts',
          ),
          Container(
            width: 1,
            height: 30,
            color: AppColors.divider,
          ),
          _SummaryItem(
            icon: Icons.access_time,
            value: '${hours}h',
            label: 'Total Hours',
          ),
          Container(
            width: 1,
            height: 30,
            color: AppColors.divider,
          ),
          _SummaryItem(
            icon: Icons.trending_up,
            value: '${(hours / 40 * 100).toInt()}%',
            label: 'Utilization',
          ),
        ],
      ),
    );
  }
}

class _SummaryItem extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;
  
  const _SummaryItem({
    required this.icon,
    required this.value,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: AppColors.textTertiary, size: 18),
        const SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              value,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            Text(
              label,
              style: TextStyle(
                color: AppColors.textTertiary,
                fontSize: 10,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

/// Weekly schedule list.
class _WeeklyScheduleList extends StatelessWidget {
  final DateTime weekStart;
  final List<ShiftAssignment> shifts;
  
  const _WeeklyScheduleList({
    required this.weekStart,
    required this.shifts,
  });

  @override
  Widget build(BuildContext context) {
    // Generate 7 days
    final days = List.generate(7, (i) => weekStart.add(Duration(days: i)));
    
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: 7,
      itemBuilder: (context, index) {
        final date = days[index];
        final dayShift = shifts.firstWhere(
          (s) => _isSameDay(s.date, date),
          orElse: () => ShiftAssignment(
            id: '',
            date: date,
            shiftName: 'Off',
            startTime: '',
            endTime: '',
          ),
        );
        
        return _DayShiftCard(
          date: date,
          shift: dayShift,
          isToday: _isToday(date),
        );
      },
    );
  }
  
  bool _isSameDay(DateTime a, DateTime b) {
    return a.year == b.year && a.month == b.month && a.day == b.day;
  }
  
  bool _isToday(DateTime date) {
    final now = DateTime.now();
    return _isSameDay(date, now);
  }
}

/// Individual day shift card.
class _DayShiftCard extends StatelessWidget {
  final DateTime date;
  final ShiftAssignment shift;
  final bool isToday;
  
  const _DayShiftCard({
    required this.date,
    required this.shift,
    required this.isToday,
  });

  @override
  Widget build(BuildContext context) {
    final dayFormat = DateFormat('EEE');
    final dateFormat = DateFormat('d');
    final isOff = shift.startTime.isEmpty;
    final isWeekend = date.weekday == 6 || date.weekday == 7;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isToday 
            ? AppColors.primary.withOpacity(0.05)
            : Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(12),
        border: isToday
            ? Border.all(color: AppColors.primary, width: 2)
            : Border.all(color: AppColors.divider),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            // Date column
            Container(
              width: 50,
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isToday
                    ? AppColors.primary
                    : isWeekend
                        ? AppColors.error.withOpacity(0.1)
                        : AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  Text(
                    dayFormat.format(date),
                    style: TextStyle(
                      color: isToday
                          ? Colors.white
                          : isWeekend
                              ? AppColors.error
                              : AppColors.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    dateFormat.format(date),
                    style: TextStyle(
                      color: isToday ? Colors.white : AppColors.textPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            
            // Shift info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    shift.shiftName,
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: isOff ? AppColors.textTertiary : AppColors.textPrimary,
                    ),
                  ),
                  if (!isOff) ...[
                    const SizedBox(height: 4),
                    Text(
                      '${shift.startTime} - ${shift.endTime}',
                      style: TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            
            // Shift type indicator
            if (!isOff)
              _ShiftTypeIndicator(shift: shift),
          ],
        ),
      ),
    );
  }
}

class _ShiftTypeIndicator extends StatelessWidget {
  final ShiftAssignment shift;
  
  const _ShiftTypeIndicator({required this.shift});

  @override
  Widget build(BuildContext context) {
    IconData icon;
    Color color;
    String label;
    
    if (shift.isNightShift == true) {
      icon = Icons.nightlight_round;
      color = AppColors.secondary;
      label = 'Night';
    } else if (shift.shiftType == ShiftType.remote) {
      icon = Icons.home_work;
      color = AppColors.info;
      label = 'Remote';
    } else if (shift.shiftType == ShiftType.overtime) {
      icon = Icons.add_circle_outline;
      color = AppColors.warning;
      label = 'OT';
    } else {
      icon = Icons.wb_sunny;
      color = AppColors.success;
      label = 'Day';
    }
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: color, size: 14),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontSize: 11,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
