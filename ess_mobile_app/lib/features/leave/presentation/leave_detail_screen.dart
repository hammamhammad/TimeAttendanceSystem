import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/leave_model.dart';
import '../../../shared/providers/leave_provider.dart';

/// Detail screen showing full information about a leave request.
class LeaveDetailScreen extends ConsumerWidget {
  const LeaveDetailScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final leave = GoRouterState.of(context).extra as LeaveRequest?;

    if (leave == null) {
      return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => context.pop(),
          ),
          title: const Text('Leave Request'),
        ),
        body: const Center(
          child: Text('Leave request data not available.'),
        ),
      );
    }

    final dateFormat = DateFormat('MMM dd, yyyy');
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');
    final statusColor = _getStatusColor(leave.status);
    final statusName = _getStatusName(leave.status, l10n);
    final isPending = leave.status == LeaveStatus.pending;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        slivers: [
          // App bar
          SliverAppBar(
            expandedHeight: 140,
            pinned: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => context.pop(),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      AppColors.primary,
                      AppColors.primaryDark,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(56, 8, 16, 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text(
                          leave.vacationTypeName ?? 'Leave Request',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: statusColor.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: Colors.white.withOpacity(0.3),
                            ),
                          ),
                          child: Text(
                            statusName,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Content
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Request details card
                  _SectionCard(
                    title: 'Request Details',
                    icon: Icons.description_outlined,
                    children: [
                      _DetailRow(
                        label: l10n.leaveType,
                        value: leave.vacationTypeName ?? 'Leave',
                        icon: Icons.category_outlined,
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: l10n.startDate,
                        value: dateFormat.format(leave.startDate),
                        icon: Icons.calendar_today_outlined,
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: l10n.endDate,
                        value: dateFormat.format(leave.endDate),
                        icon: Icons.event_outlined,
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: 'Total Days',
                        value: leave.totalDays != null
                            ? '${leave.totalDays} day${leave.totalDays! > 1 ? 's' : ''}'
                            : '${leave.endDate.difference(leave.startDate).inDays + 1} day(s)',
                        icon: Icons.timelapse_outlined,
                        valueColor: AppColors.primary,
                        valueBold: true,
                      ),
                      if (leave.reason != null && leave.reason!.isNotEmpty) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: l10n.reason,
                          value: leave.reason!,
                          icon: Icons.notes_outlined,
                          isMultiline: true,
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Status and processing info
                  _SectionCard(
                    title: 'Status Information',
                    icon: Icons.info_outline,
                    children: [
                      _DetailRow(
                        label: 'Status',
                        value: statusName,
                        icon: Icons.flag_outlined,
                        valueWidget: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: statusColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            statusName,
                            style: TextStyle(
                              color: statusColor,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                      if (leave.createdAtUtc != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Submitted On',
                          value: dateTimeFormat.format(leave.createdAtUtc!.toLocal()),
                          icon: Icons.access_time_outlined,
                        ),
                      ],
                      if (leave.currentApproverName != null &&
                          leave.currentApproverName!.isNotEmpty) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Current Approver',
                          value: leave.currentApproverName!,
                          icon: Icons.person_outline,
                        ),
                      ],
                    ],
                  ),

                  // Approval workflow timeline
                  const SizedBox(height: 16),
                  _ApprovalTimeline(leave: leave),

                  // Bottom spacing for the action button
                  if (isPending) const SizedBox(height: 80),
                ],
              ),
            ),
          ),
        ],
      ),
      // Cancel button for pending requests
      bottomNavigationBar: isPending
          ? SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: SizedBox(
                  height: 52,
                  child: OutlinedButton.icon(
                    onPressed: () => _cancelLeave(context, ref, leave.id),
                    icon: const Icon(Icons.cancel_outlined),
                    label: const Text('Cancel Request'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.error,
                      side: const BorderSide(color: AppColors.error),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
              ),
            )
          : null,
    );
  }

  Future<void> _cancelLeave(
    BuildContext context,
    WidgetRef ref,
    int id,
  ) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Leave Request'),
        content:
            const Text('Are you sure you want to cancel this leave request?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('No'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
            child: const Text('Yes, Cancel'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      final success =
          await ref.read(leaveNotifierProvider.notifier).cancelRequest(id);
      if (success && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Leave request cancelled'),
            backgroundColor: Colors.green,
          ),
        );
        context.pop();
      }
    }
  }

  Color _getStatusColor(LeaveStatus status) {
    switch (status) {
      case LeaveStatus.pending:
        return AppColors.warning;
      case LeaveStatus.approved:
        return AppColors.success;
      case LeaveStatus.rejected:
        return AppColors.error;
      case LeaveStatus.cancelled:
        return AppColors.textTertiary;
    }
  }

  String _getStatusName(LeaveStatus status, AppLocalizations l10n) {
    switch (status) {
      case LeaveStatus.pending:
        return l10n.pending;
      case LeaveStatus.approved:
        return l10n.approved;
      case LeaveStatus.rejected:
        return l10n.rejected;
      case LeaveStatus.cancelled:
        return 'Cancelled';
    }
  }
}

/// Approval workflow timeline for leave requests.
class _ApprovalTimeline extends StatelessWidget {
  final LeaveRequest leave;

  const _ApprovalTimeline({required this.leave});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');

    // Build timeline steps from available data
    final steps = <_TimelineStep>[];

    // Step 1: Request submitted
    steps.add(_TimelineStep(
      title: 'Request Submitted',
      subtitle: leave.createdAtUtc != null
          ? dateTimeFormat.format(leave.createdAtUtc!.toLocal())
          : 'Date not available',
      icon: Icons.send_outlined,
      color: AppColors.success,
      isCompleted: true,
    ));

    // Step 2: Under review / processed
    if (leave.status == LeaveStatus.pending) {
      steps.add(_TimelineStep(
        title: 'Pending Review',
        subtitle: leave.currentApproverName != null
            ? 'Waiting for ${leave.currentApproverName}'
            : 'Waiting for manager approval',
        icon: Icons.hourglass_top_outlined,
        color: AppColors.warning,
        isCompleted: false,
        isActive: true,
      ));
    } else if (leave.status == LeaveStatus.approved) {
      steps.add(_TimelineStep(
        title: 'Approved',
        subtitle: 'Request has been approved',
        icon: Icons.check_circle_outlined,
        color: AppColors.success,
        isCompleted: true,
      ));
    } else if (leave.status == LeaveStatus.rejected) {
      steps.add(_TimelineStep(
        title: 'Rejected',
        subtitle: 'Request has been rejected',
        icon: Icons.cancel_outlined,
        color: AppColors.error,
        isCompleted: true,
      ));
    } else if (leave.status == LeaveStatus.cancelled) {
      steps.add(_TimelineStep(
        title: 'Cancelled',
        subtitle: 'Request was cancelled',
        icon: Icons.block_outlined,
        color: AppColors.textTertiary,
        isCompleted: true,
      ));
    }

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.timeline_outlined,
                  size: 20,
                  color: AppColors.primary,
                ),
                const SizedBox(width: 8),
                Text(
                  'Approval Workflow',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            ...List.generate(steps.length, (index) {
              final step = steps[index];
              final isLast = index == steps.length - 1;
              return _TimelineStepWidget(
                step: step,
                isLast: isLast,
              );
            }),
          ],
        ),
      ),
    );
  }
}

/// A single section card with a title and children.
class _SectionCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final List<Widget> children;

  const _SectionCard({
    required this.title,
    required this.icon,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, size: 20, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...children,
          ],
        ),
      ),
    );
  }
}

/// A single detail row with label, value, and optional icon.
class _DetailRow extends StatelessWidget {
  final String label;
  final String value;
  final IconData? icon;
  final Color? valueColor;
  final bool valueBold;
  final bool isMultiline;
  final Widget? valueWidget;

  const _DetailRow({
    required this.label,
    required this.value,
    this.icon,
    this.valueColor,
    this.valueBold = false,
    this.isMultiline = false,
    this.valueWidget,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (isMultiline) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (icon != null) ...[
                Icon(icon, size: 16, color: theme.colorScheme.onSurfaceVariant),
                const SizedBox(width: 8),
              ],
              Text(
                label,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Padding(
            padding: EdgeInsets.only(left: icon != null ? 24.0 : 0),
            child: Text(
              value,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: valueColor ?? theme.colorScheme.onSurface,
                fontWeight: valueBold ? FontWeight.w600 : FontWeight.normal,
                height: 1.4,
              ),
            ),
          ),
        ],
      );
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 16, color: theme.colorScheme.onSurfaceVariant),
          const SizedBox(width: 8),
        ],
        Expanded(
          flex: 2,
          child: Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          flex: 3,
          child: valueWidget ??
              Text(
                value,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: valueColor ?? theme.colorScheme.onSurface,
                  fontWeight: valueBold ? FontWeight.w600 : FontWeight.normal,
                ),
                textAlign: TextAlign.end,
              ),
        ),
      ],
    );
  }
}

/// Divider between detail rows.
class _DetailDivider extends StatelessWidget {
  const _DetailDivider();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Divider(
        height: 1,
        color: Theme.of(context).dividerColor,
      ),
    );
  }
}

/// Timeline step data.
class _TimelineStep {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final bool isCompleted;
  final bool isActive;

  const _TimelineStep({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    this.isCompleted = false,
    this.isActive = false,
  });
}

/// Widget for rendering a single timeline step.
class _TimelineStepWidget extends StatelessWidget {
  final _TimelineStep step;
  final bool isLast;

  const _TimelineStepWidget({
    required this.step,
    required this.isLast,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline indicator
          SizedBox(
            width: 40,
            child: Column(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: step.isCompleted || step.isActive
                        ? step.color.withOpacity(0.15)
                        : theme.colorScheme.surfaceContainerHighest,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: step.isCompleted || step.isActive
                          ? step.color
                          : theme.colorScheme.outline,
                      width: 2,
                    ),
                  ),
                  child: Icon(
                    step.icon,
                    size: 16,
                    color: step.isCompleted || step.isActive
                        ? step.color
                        : theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      color: step.isCompleted
                          ? step.color.withOpacity(0.3)
                          : theme.dividerColor,
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          // Step content
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 0 : 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    step.title,
                    style: theme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: step.isCompleted || step.isActive
                          ? theme.colorScheme.onSurface
                          : theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    step.subtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
