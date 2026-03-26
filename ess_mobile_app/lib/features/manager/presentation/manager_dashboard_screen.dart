import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/providers/manager_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Manager Dashboard screen showing team statistics and pending approvals.
class ManagerDashboardScreen extends ConsumerStatefulWidget {
  const ManagerDashboardScreen({super.key});

  @override
  ConsumerState<ManagerDashboardScreen> createState() =>
      _ManagerDashboardScreenState();
}

class _ManagerDashboardScreenState
    extends ConsumerState<ManagerDashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(managerDashboardProvider.notifier).loadDashboard();
    });
  }

  Future<void> _onRefresh() async {
    await ref.read(managerDashboardProvider.notifier).refresh();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(managerDashboardProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: const Text('Manager Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () =>
                ref.read(managerDashboardProvider.notifier).loadDashboard(),
          ),
        ],
      ),
      body: state.isLoading && state.dashboard == null
          ? const AppLoading()
          : state.error != null && state.dashboard == null
              ? AppError(
                  message: state.error,
                  onRetry: () =>
                      ref.read(managerDashboardProvider.notifier).loadDashboard(),
                )
              : RefreshIndicator(
                  onRefresh: _onRefresh,
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Welcome header
                        if (state.managerName.isNotEmpty) ...[
                          Text(
                            'Hello, ${state.managerName}',
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            DateFormat('EEEE, MMMM d, yyyy')
                                .format(DateTime.now()),
                            style: Theme.of(context)
                                .textTheme
                                .bodyMedium
                                ?.copyWith(color: AppColors.textSecondary),
                          ),
                          const SizedBox(height: 20),
                        ],

                        // Attendance rate card
                        _AttendanceRateCard(rate: state.teamAttendanceRate),
                        const SizedBox(height: 20),

                        // Team stats grid
                        SectionHeader(title: 'Team Overview'),
                        const SizedBox(height: 8),
                        _TeamStatsGrid(state: state),
                        const SizedBox(height: 24),

                        // Pending approvals summary
                        SectionHeader(
                          title: 'Pending Approvals',
                          actionText: state.totalPendingApprovals > 0
                              ? 'View All'
                              : null,
                          onAction: state.totalPendingApprovals > 0
                              ? () => context.push('/pending-approvals')
                              : null,
                        ),
                        const SizedBox(height: 8),
                        _PendingApprovalsSummary(state: state),
                        const SizedBox(height: 24),

                        // Recent team activity
                        if (state.recentTeamActivity.isNotEmpty) ...[
                          SectionHeader(title: 'Recent Team Activity'),
                          const SizedBox(height: 8),
                          _RecentActivityList(
                              activities: state.recentTeamActivity),
                        ],

                        const SizedBox(height: 24),
                      ],
                    ),
                  ),
                ),
    );
  }
}

/// Attendance rate hero card.
class _AttendanceRateCard extends StatelessWidget {
  final double rate;

  const _AttendanceRateCard({required this.rate});

  @override
  Widget build(BuildContext context) {
    final percentage = (rate * 100).clamp(0, 100);
    final displayRate = rate > 1 ? rate : percentage;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.primary,
            AppColors.primaryDark,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.3),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Team Attendance Rate',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${displayRate.toStringAsFixed(1)}%',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  DateFormat('MMMM d, yyyy').format(DateTime.now()),
                  style: const TextStyle(
                    color: Colors.white60,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.15),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.groups,
              color: Colors.white,
              size: 32,
            ),
          ),
        ],
      ),
    );
  }
}

/// Grid of team statistics cards.
class _TeamStatsGrid extends StatelessWidget {
  final ManagerDashboardState state;

  const _TeamStatsGrid({required this.state});

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 0.95,
      children: [
        _MiniStatCard(
          label: 'Team Size',
          value: '${state.teamSize}',
          icon: Icons.people,
          color: AppColors.primary,
        ),
        _MiniStatCard(
          label: 'Present',
          value: '${state.presentToday}',
          icon: Icons.check_circle,
          color: AppColors.success,
        ),
        _MiniStatCard(
          label: 'Absent',
          value: '${state.absentToday}',
          icon: Icons.cancel,
          color: AppColors.error,
        ),
        _MiniStatCard(
          label: 'Late',
          value: '${state.lateToday}',
          icon: Icons.schedule,
          color: AppColors.warning,
        ),
        _MiniStatCard(
          label: 'On Leave',
          value: '${state.onLeaveToday}',
          icon: Icons.beach_access,
          color: AppColors.info,
        ),
        _MiniStatCard(
          label: 'Remote',
          value: '${state.remoteWorkToday}',
          icon: Icons.home_work,
          color: AppColors.secondary,
        ),
      ],
    );
  }
}

/// Compact stat card for the 3-column grid.
class _MiniStatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final Color color;

  const _MiniStatCard({
    required this.label,
    required this.value,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.cardColor,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: theme.dividerColor),
      ),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.6),
                ),
            textAlign: TextAlign.center,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}

/// Pending approvals summary card with type breakdown.
class _PendingApprovalsSummary extends StatelessWidget {
  final ManagerDashboardState state;

  const _PendingApprovalsSummary({required this.state});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    if (state.totalPendingApprovals == 0) {
      return Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: BorderSide(color: theme.dividerColor),
        ),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              Icon(
                Icons.check_circle_outline,
                size: 40,
                color: AppColors.success,
              ),
              const SizedBox(height: 12),
              Text(
                'All caught up!',
                style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
              const SizedBox(height: 4),
              Text(
                'No pending approvals',
                style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurface.withOpacity(0.6),
                    ),
              ),
            ],
          ),
        ),
      );
    }

    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: theme.dividerColor),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Total count header
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.warning.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(
                    Icons.pending_actions,
                    color: AppColors.warning,
                    size: 22,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${state.totalPendingApprovals} Pending',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                      ),
                      Text(
                        'Requests awaiting your review',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppColors.textSecondary,
                            ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.arrow_forward_ios,
                  size: 14,
                  color: AppColors.textTertiary,
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Divider(height: 1),
            const SizedBox(height: 12),

            // Breakdown by type
            Row(
              children: [
                Expanded(
                  child: _ApprovalTypeChip(
                    label: 'Vacation',
                    count: state.pendingVacations,
                    icon: Icons.beach_access,
                    color: AppColors.info,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _ApprovalTypeChip(
                    label: 'Excuse',
                    count: state.pendingExcuses,
                    icon: Icons.assignment_outlined,
                    color: AppColors.warning,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: _ApprovalTypeChip(
                    label: 'Remote',
                    count: state.pendingRemoteWork,
                    icon: Icons.home_work,
                    color: AppColors.secondary,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _ApprovalTypeChip(
                    label: 'Correction',
                    count: state.pendingAttendanceCorrection,
                    icon: Icons.edit_note,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Chip showing approval type and count.
class _ApprovalTypeChip extends StatelessWidget {
  final String label;
  final int count;
  final IconData icon;
  final Color color;

  const _ApprovalTypeChip({
    required this.label,
    required this.count,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final muted = theme.colorScheme.onSurface.withOpacity(0.4);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: count > 0 ? color.withOpacity(0.08) : theme.colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Icon(icon, size: 16, color: count > 0 ? color : muted),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: count > 0 ? theme.colorScheme.onSurface : muted,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: count > 0 ? color.withOpacity(0.15) : Colors.transparent,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              '$count',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 12,
                color: count > 0 ? color : muted,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Recent team activity list.
class _RecentActivityList extends StatelessWidget {
  final List<dynamic> activities;

  const _RecentActivityList({required this.activities});

  @override
  Widget build(BuildContext context) {
    final displayActivities = activities.take(5).toList();

    if (displayActivities.isEmpty) {
      return const AppEmpty(
        message: 'No recent activity',
        icon: Icons.history,
      );
    }

    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: Theme.of(context).dividerColor),
      ),
      child: ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: displayActivities.length,
        separatorBuilder: (_, __) => const Divider(height: 1, indent: 56),
        itemBuilder: (context, index) {
          final activity = displayActivities[index];
          if (activity is! Map<String, dynamic>) {
            return const SizedBox.shrink();
          }

          final type = (activity['type'] ?? activity['activityType'] ?? '')
              .toString()
              .toLowerCase();
          final employeeName =
              activity['employeeName'] ?? activity['employee'] ?? 'Unknown';
          final description = activity['description'] ??
              activity['message'] ??
              activity['summary'] ??
              type;
          final dateStr = activity['date'] ??
              activity['createdAt'] ??
              activity['timestamp'];

          String formattedDate = '';
          if (dateStr != null) {
            try {
              final date = DateTime.parse(dateStr.toString());
              formattedDate = DateFormat('MMM d, HH:mm').format(date);
            } catch (_) {
              formattedDate = dateStr.toString();
            }
          }

          return ListTile(
            leading: CircleAvatar(
              radius: 18,
              backgroundColor: _getActivityColor(type).withOpacity(0.1),
              child: Icon(
                _getActivityIcon(type),
                size: 18,
                color: _getActivityColor(type),
              ),
            ),
            title: Text(
              employeeName.toString(),
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
            ),
            subtitle: Text(
              description.toString(),
              style: TextStyle(
                color: AppColors.textSecondary,
                fontSize: 12,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            trailing: formattedDate.isNotEmpty
                ? Text(
                    formattedDate,
                    style: TextStyle(
                      color: AppColors.textTertiary,
                      fontSize: 11,
                    ),
                  )
                : null,
            dense: true,
          );
        },
      ),
    );
  }

  IconData _getActivityIcon(String type) {
    if (type.contains('vacation') || type.contains('leave')) {
      return Icons.beach_access;
    } else if (type.contains('excuse')) {
      return Icons.assignment_outlined;
    } else if (type.contains('remote')) {
      return Icons.home_work;
    } else if (type.contains('check') || type.contains('attendance')) {
      return Icons.access_time;
    } else if (type.contains('approv')) {
      return Icons.check_circle;
    } else if (type.contains('reject')) {
      return Icons.cancel;
    }
    return Icons.notifications_none;
  }

  Color _getActivityColor(String type) {
    if (type.contains('vacation') || type.contains('leave')) {
      return AppColors.info;
    } else if (type.contains('excuse')) {
      return AppColors.warning;
    } else if (type.contains('remote')) {
      return AppColors.secondary;
    } else if (type.contains('check') || type.contains('attendance')) {
      return AppColors.primary;
    } else if (type.contains('approv')) {
      return AppColors.success;
    } else if (type.contains('reject')) {
      return AppColors.error;
    }
    return AppColors.textSecondary;
  }
}

