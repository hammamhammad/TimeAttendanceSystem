import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/attendance_history_model.dart';
import '../../../shared/providers/attendance_history_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Attendance history screen with calendar view.
class AttendanceHistoryScreen extends ConsumerStatefulWidget {
  const AttendanceHistoryScreen({super.key});

  @override
  ConsumerState<AttendanceHistoryScreen> createState() => _AttendanceHistoryScreenState();
}

class _AttendanceHistoryScreenState extends ConsumerState<AttendanceHistoryScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(attendanceHistoryProvider.notifier).loadMonth(DateTime.now());
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final state = ref.watch(attendanceHistoryProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.attendance),
        actions: [
          IconButton(
            icon: const Icon(Icons.today),
            onPressed: () {
              ref.read(attendanceHistoryProvider.notifier).loadMonth(DateTime.now());
            },
            tooltip: 'Go to today',
          ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(attendanceHistoryProvider.notifier)
                      .loadMonth(state.selectedMonth),
                )
              : Column(
                  children: [
                    // Month Summary Card
                    if (state.summary != null)
                      _MonthlySummaryCard(summary: state.summary!),
                    
                    // Calendar
                    Expanded(
                      child: _AttendanceCalendar(
                        selectedMonth: state.selectedMonth,
                        dailyRecords: state.dailyRecords,
                        onPreviousMonth: () => ref.read(attendanceHistoryProvider.notifier).previousMonth(),
                        onNextMonth: () => ref.read(attendanceHistoryProvider.notifier).nextMonth(),
                        onDaySelected: (date) {
                          ref.read(attendanceHistoryProvider.notifier).selectDay(date);
                          _showDayDetail(context, date);
                        },
                      ),
                    ),
                  ],
                ),
    );
  }
  
  void _showDayDetail(BuildContext context, DateTime date) {
    final state = ref.read(attendanceHistoryProvider);
    final attendance = state.dailyRecords[DateTime(date.year, date.month, date.day)];
    
    if (attendance == null) return;
    
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _DayDetailSheet(attendance: attendance),
    );
  }
}

/// Monthly summary card.
class _MonthlySummaryCard extends StatelessWidget {
  final MonthlyAttendanceSummary summary;
  
  const _MonthlySummaryCard({required this.summary});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary, AppColors.primary.withOpacity(0.8)],
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
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _SummaryItem(
                value: '${summary.presentDays}',
                label: 'Present',
                icon: Icons.check_circle,
              ),
              _SummaryItem(
                value: '${summary.absentDays}',
                label: 'Absent',
                icon: Icons.cancel,
              ),
              _SummaryItem(
                value: '${summary.lateDays}',
                label: 'Late',
                icon: Icons.schedule,
              ),
              _SummaryItem(
                value: '${summary.leaveDays}',
                label: 'Leave',
                icon: Icons.beach_access,
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(color: Colors.white24),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Attendance Rate',
                style: TextStyle(color: Colors.white.withOpacity(0.9)),
              ),
              Text(
                '${summary.attendancePercentage.toStringAsFixed(1)}%',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: summary.attendancePercentage / 100,
              backgroundColor: Colors.white24,
              valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
              minHeight: 8,
            ),
          ),
        ],
      ),
    );
  }
}

class _SummaryItem extends StatelessWidget {
  final String value;
  final String label;
  final IconData icon;
  
  const _SummaryItem({
    required this.value,
    required this.label,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white, size: 24),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.8),
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

/// Calendar widget for attendance.
class _AttendanceCalendar extends StatelessWidget {
  final DateTime selectedMonth;
  final Map<DateTime, DailyAttendance> dailyRecords;
  final VoidCallback onPreviousMonth;
  final VoidCallback onNextMonth;
  final void Function(DateTime) onDaySelected;
  
  const _AttendanceCalendar({
    required this.selectedMonth,
    required this.dailyRecords,
    required this.onPreviousMonth,
    required this.onNextMonth,
    required this.onDaySelected,
  });

  @override
  Widget build(BuildContext context) {
    final monthFormat = DateFormat('MMMM yyyy');
    final firstDayOfMonth = DateTime(selectedMonth.year, selectedMonth.month, 1);
    final lastDayOfMonth = DateTime(selectedMonth.year, selectedMonth.month + 1, 0);
    final startWeekday = firstDayOfMonth.weekday;
    final daysInMonth = lastDayOfMonth.day;
    
    // Calculate grid
    final totalCells = ((startWeekday - 1) + daysInMonth);
    final rows = (totalCells / 7).ceil();
    
    return Column(
      children: [
        // Month navigation
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              IconButton(
                onPressed: onPreviousMonth,
                icon: const Icon(Icons.chevron_left),
              ),
              Text(
                monthFormat.format(selectedMonth),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              IconButton(
                onPressed: onNextMonth,
                icon: const Icon(Icons.chevron_right),
              ),
            ],
          ),
        ),
        
        // Weekday headers
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          child: Row(
            children: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                .map((day) => Expanded(
                      child: Center(
                        child: Text(
                          day,
                          style: TextStyle(
                            color: day == 'Sat' || day == 'Sun'
                                ? AppColors.error.withOpacity(0.7)
                                : AppColors.textSecondary,
                            fontWeight: FontWeight.w500,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ))
                .toList(),
          ),
        ),
        const SizedBox(height: 8),
        
        // Calendar grid
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              childAspectRatio: 1,
            ),
            itemCount: rows * 7,
            itemBuilder: (context, index) {
              final dayOffset = index - (startWeekday - 1);
              
              if (dayOffset < 0 || dayOffset >= daysInMonth) {
                return const SizedBox();
              }
              
              final date = DateTime(selectedMonth.year, selectedMonth.month, dayOffset + 1);
              final attendance = dailyRecords[date];
              final isToday = _isToday(date);
              
              return _CalendarDay(
                date: date,
                attendance: attendance,
                isToday: isToday,
                onTap: () => onDaySelected(date),
              );
            },
          ),
        ),
        
        // Legend
        const _CalendarLegend(),
      ],
    );
  }
  
  bool _isToday(DateTime date) {
    final now = DateTime.now();
    return date.year == now.year && date.month == now.month && date.day == now.day;
  }
}

/// Individual calendar day cell.
class _CalendarDay extends StatelessWidget {
  final DateTime date;
  final DailyAttendance? attendance;
  final bool isToday;
  final VoidCallback onTap;
  
  const _CalendarDay({
    required this.date,
    this.attendance,
    required this.isToday,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final status = attendance?.status;
    final color = _getStatusColor(status);
    final isWeekend = date.weekday == 6 || date.weekday == 7;
    
    return GestureDetector(
      onTap: attendance != null ? onTap : null,
      child: Container(
        margin: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: color.withOpacity(0.15),
          borderRadius: BorderRadius.circular(8),
          border: isToday
              ? Border.all(color: AppColors.primary, width: 2)
              : null,
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Text(
              '${date.day}',
              style: TextStyle(
                color: isWeekend && status == null
                    ? AppColors.error.withOpacity(0.7)
                    : color,
                fontWeight: isToday ? FontWeight.bold : FontWeight.normal,
              ),
            ),
            if (status != null)
              Positioned(
                bottom: 4,
                child: Container(
                  width: 6,
                  height: 6,
                  decoration: BoxDecoration(
                    color: color,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
  
  Color _getStatusColor(AttendanceStatus? status) {
    switch (status) {
      case AttendanceStatus.present:
        return AppColors.success;
      case AttendanceStatus.absent:
        return AppColors.error;
      case AttendanceStatus.late:
        return AppColors.warning;
      case AttendanceStatus.earlyLeave:
        return AppColors.warning;
      case AttendanceStatus.halfDay:
        return AppColors.info;
      case AttendanceStatus.onLeave:
        return AppColors.secondary;
      case AttendanceStatus.holiday:
        return AppColors.textTertiary;
      case AttendanceStatus.weekend:
        return AppColors.textTertiary;
      case AttendanceStatus.remoteWork:
        return AppColors.info;
      case AttendanceStatus.pending:
        return AppColors.textSecondary;
      default:
        return AppColors.textTertiary;
    }
  }
}

/// Calendar legend.
class _CalendarLegend extends StatelessWidget {
  const _CalendarLegend();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Wrap(
        spacing: 16,
        runSpacing: 8,
        alignment: WrapAlignment.center,
        children: [
          _LegendItem(color: AppColors.success, label: 'Present'),
          _LegendItem(color: AppColors.error, label: 'Absent'),
          _LegendItem(color: AppColors.warning, label: 'Late'),
          _LegendItem(color: AppColors.secondary, label: 'Leave'),
          _LegendItem(color: AppColors.info, label: 'Remote'),
        ],
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;
  
  const _LegendItem({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            color: AppColors.textSecondary,
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

/// Day detail bottom sheet.
class _DayDetailSheet extends StatelessWidget {
  final DailyAttendance attendance;
  
  const _DayDetailSheet({required this.attendance});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('EEEE, MMMM d, yyyy');
    
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                dateFormat.format(attendance.date),
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              _StatusBadge(status: attendance.status),
            ],
          ),
          const SizedBox(height: 24),
          
          if (attendance.shiftName != null) ...[
            _DetailRow(
              icon: Icons.work_outline,
              label: 'Shift',
              value: attendance.shiftName!,
            ),
            const SizedBox(height: 12),
          ],
          
          Row(
            children: [
              Expanded(
                child: _TimeCard(
                  label: 'Check In',
                  time: attendance.checkInTime ?? '--:--',
                  icon: Icons.login,
                  color: AppColors.success,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _TimeCard(
                  label: 'Check Out',
                  time: attendance.checkOutTime ?? '--:--',
                  icon: Icons.logout,
                  color: AppColors.error,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          
          Row(
            children: [
              Expanded(
                child: _StatCard(
                  label: 'Worked',
                  value: _formatMinutes(attendance.workedMinutes ?? 0),
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _StatCard(
                  label: 'Overtime',
                  value: _formatMinutes(attendance.overtimeMinutes ?? 0),
                  color: AppColors.info,
                ),
              ),
              const SizedBox(width: 8),
              if (attendance.lateMinutes != null && attendance.lateMinutes! > 0)
                Expanded(
                  child: _StatCard(
                    label: 'Late',
                    value: _formatMinutes(attendance.lateMinutes!),
                    color: AppColors.warning,
                  ),
                ),
            ],
          ),
          
          if (attendance.notes != null) ...[
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.note, color: AppColors.textTertiary, size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      attendance.notes!,
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                  ),
                ],
              ),
            ),
          ],
          
          const SizedBox(height: 24),
        ],
      ),
    );
  }
  
  String _formatMinutes(int minutes) {
    final hours = minutes ~/ 60;
    final mins = minutes % 60;
    if (hours > 0) {
      return '${hours}h ${mins}m';
    }
    return '${mins}m';
  }
}

class _StatusBadge extends StatelessWidget {
  final AttendanceStatus status;
  
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    final color = _getColor();
    final label = _getLabel();
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w600,
          fontSize: 12,
        ),
      ),
    );
  }
  
  Color _getColor() {
    switch (status) {
      case AttendanceStatus.present:
        return AppColors.success;
      case AttendanceStatus.absent:
        return AppColors.error;
      case AttendanceStatus.late:
      case AttendanceStatus.earlyLeave:
        return AppColors.warning;
      case AttendanceStatus.onLeave:
        return AppColors.secondary;
      default:
        return AppColors.textSecondary;
    }
  }
  
  String _getLabel() {
    switch (status) {
      case AttendanceStatus.present:
        return 'Present';
      case AttendanceStatus.absent:
        return 'Absent';
      case AttendanceStatus.late:
        return 'Late';
      case AttendanceStatus.earlyLeave:
        return 'Early Leave';
      case AttendanceStatus.halfDay:
        return 'Half Day';
      case AttendanceStatus.onLeave:
        return 'On Leave';
      case AttendanceStatus.holiday:
        return 'Holiday';
      case AttendanceStatus.weekend:
        return 'Weekend';
      case AttendanceStatus.remoteWork:
        return 'Remote Work';
      case AttendanceStatus.pending:
        return 'Pending';
    }
  }
}

class _DetailRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  
  const _DetailRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: AppColors.textTertiary, size: 18),
        const SizedBox(width: 8),
        Text(
          '$label: ',
          style: TextStyle(color: AppColors.textSecondary),
        ),
        Text(
          value,
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}

class _TimeCard extends StatelessWidget {
  final String label;
  final String time;
  final IconData icon;
  final Color color;
  
  const _TimeCard({
    required this.label,
    required this.time,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 4),
          Text(
            time,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),
          Text(
            label,
            style: TextStyle(
              color: AppColors.textSecondary,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final Color color;
  
  const _StatCard({
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      decoration: BoxDecoration(
        color: AppColors.surfaceVariant,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.bold,
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
    );
  }
}
