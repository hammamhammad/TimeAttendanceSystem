import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/providers/admin_dashboard_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Admin dashboard screen.
class AdminDashboardScreen extends ConsumerStatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  ConsumerState<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends ConsumerState<AdminDashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(adminDashboardProvider.notifier).loadStats();
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(adminDashboardProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.read(adminDashboardProvider.notifier).loadStats(),
          ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(adminDashboardProvider.notifier).loadStats(),
                )
              : RefreshIndicator(
                  onRefresh: () => ref.read(adminDashboardProvider.notifier).loadStats(),
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Today's Summary
                        _SectionHeader(title: "Today's Attendance"),
                        const SizedBox(height: 12),
                        _TodayAttendanceCard(stats: state.stats!),
                        const SizedBox(height: 24),
                        
                        // Pending Approvals
                        _SectionHeader(
                          title: 'Pending Approvals',
                          badge: state.stats!.totalPendingRequests,
                        ),
                        const SizedBox(height: 12),
                        _PendingApprovalsCard(stats: state.stats!),
                        const SizedBox(height: 24),
                        
                        // Quick Actions
                        _SectionHeader(title: 'Quick Actions'),
                        const SizedBox(height: 12),
                        _QuickActionsGrid(),
                        const SizedBox(height: 24),
                        
                        // System Overview
                        _SectionHeader(title: 'System Overview'),
                        const SizedBox(height: 12),
                        _SystemOverviewCard(stats: state.stats!),
                      ],
                    ),
                  ),
                ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final int? badge;
  
  const _SectionHeader({required this.title, this.badge});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        if (badge != null && badge! > 0) ...[
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: AppColors.error,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              '$badge',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ],
    );
  }
}

/// Today's attendance summary card.
class _TodayAttendanceCard extends StatelessWidget {
  final AdminDashboardStats stats;
  
  const _TodayAttendanceCard({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.primary, AppColors.primary.withBlue(200)],
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '${stats.overallAttendanceRate.toStringAsFixed(1)}%',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 42,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Attendance\nRate',
                style: TextStyle(color: Colors.white70),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _AttendanceStat(
                value: stats.presentToday,
                label: 'Present',
                icon: Icons.check_circle,
              ),
              _AttendanceStat(
                value: stats.absentToday,
                label: 'Absent',
                icon: Icons.cancel,
              ),
              _AttendanceStat(
                value: stats.lateToday,
                label: 'Late',
                icon: Icons.schedule,
              ),
              _AttendanceStat(
                value: stats.onLeaveToday,
                label: 'Leave',
                icon: Icons.beach_access,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _AttendanceStat extends StatelessWidget {
  final int value;
  final String label;
  final IconData icon;
  
  const _AttendanceStat({
    required this.value,
    required this.label,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70, size: 20),
        const SizedBox(height: 4),
        Text(
          '$value',
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.7),
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

/// Pending approvals card.
class _PendingApprovalsCard extends StatelessWidget {
  final AdminDashboardStats stats;
  
  const _PendingApprovalsCard({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Expanded(
              child: _ApprovalItem(
                label: 'Leave',
                count: stats.pendingLeaveRequests,
                icon: Icons.event_busy,
                color: AppColors.info,
              ),
            ),
            Container(
              width: 1,
              height: 60,
              color: AppColors.divider,
            ),
            Expanded(
              child: _ApprovalItem(
                label: 'Excuse',
                count: stats.pendingExcuseRequests,
                icon: Icons.timer_off,
                color: AppColors.warning,
              ),
            ),
            Container(
              width: 1,
              height: 60,
              color: AppColors.divider,
            ),
            Expanded(
              child: _ApprovalItem(
                label: 'Remote',
                count: stats.pendingRemoteWorkRequests,
                icon: Icons.home_work,
                color: AppColors.secondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ApprovalItem extends StatelessWidget {
  final String label;
  final int count;
  final IconData icon;
  final Color color;
  
  const _ApprovalItem({
    required this.label,
    required this.count,
    required this.icon,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: color),
        ),
        const SizedBox(height: 8),
        Text(
          '$count',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
            color: count > 0 ? color : AppColors.textSecondary,
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
    );
  }
}

/// Quick actions grid.
class _QuickActionsGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      children: [
        _QuickActionItem(
          icon: Icons.business,
          label: 'Branches',
          color: AppColors.primary,
          onTap: () => context.push('/admin/branches'),
        ),
        _QuickActionItem(
          icon: Icons.nfc,
          label: 'NFC Tags',
          color: AppColors.secondary,
          onTap: () => context.push('/admin/nfc-tags'),
        ),
        _QuickActionItem(
          icon: Icons.notifications,
          label: 'Broadcast',
          color: AppColors.info,
          onTap: () => context.push('/admin/broadcast'),
        ),
        _QuickActionItem(
          icon: Icons.approval,
          label: 'Approvals',
          color: AppColors.warning,
          onTap: () => context.push('/admin/approvals'),
        ),
        _QuickActionItem(
          icon: Icons.people,
          label: 'Employees',
          color: AppColors.success,
          onTap: () => context.push('/admin/employees'),
        ),
        _QuickActionItem(
          icon: Icons.analytics,
          label: 'Reports',
          color: AppColors.error,
          onTap: () => context.push('/admin/reports'),
        ),
      ],
    );
  }
}

class _QuickActionItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  
  const _QuickActionItem({
    required this.icon,
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}

/// System overview card.
class _SystemOverviewCard extends StatelessWidget {
  final AdminDashboardStats stats;
  
  const _SystemOverviewCard({required this.stats});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            _OverviewRow(
              icon: Icons.people,
              label: 'Total Employees',
              value: '${stats.activeEmployees}/${stats.totalEmployees}',
              subLabel: 'active',
            ),
            const Divider(height: 24),
            _OverviewRow(
              icon: Icons.business,
              label: 'Branches',
              value: '${stats.activeBranches}/${stats.totalBranches}',
              subLabel: 'active',
            ),
            const Divider(height: 24),
            _OverviewRow(
              icon: Icons.nfc,
              label: 'NFC Tags',
              value: '${stats.activeNfcTags}/${stats.totalNfcTags}',
              subLabel: 'active',
            ),
          ],
        ),
      ),
    );
  }
}

class _OverviewRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final String subLabel;
  
  const _OverviewRow({
    required this.icon,
    required this.label,
    required this.value,
    required this.subLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: AppColors.textTertiary),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            label,
            style: const TextStyle(fontWeight: FontWeight.w500),
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              value,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            Text(
              subLabel,
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
