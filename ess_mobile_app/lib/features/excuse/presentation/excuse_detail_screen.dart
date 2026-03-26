import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/excuse_model.dart';
import '../../../shared/providers/excuse_provider.dart';

/// Detail screen showing full information about an excuse request.
class ExcuseDetailScreen extends ConsumerWidget {
  const ExcuseDetailScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final excuse = GoRouterState.of(context).extra as ExcuseRequest?;

    if (excuse == null) {
      return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => context.pop(),
          ),
          title: const Text('Excuse Request'),
        ),
        body: const Center(
          child: Text('Excuse request data not available.'),
        ),
      );
    }

    final dateFormat = DateFormat('MMM dd, yyyy');
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');
    final timeFormat = DateFormat('HH:mm');
    final statusColor = _getStatusColor(excuse.status);
    final statusName = _getStatusName(excuse.status, l10n);
    final typeColor = _getTypeColor(excuse.type);
    final isPending = excuse.status == ExcuseStatus.pending;

    return Scaffold(
      backgroundColor: AppColors.background,
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
                      typeColor,
                      typeColor.withOpacity(0.8),
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
                          _getTypeName(excuse.type),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
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
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                dateFormat.format(excuse.excuseDate),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          ],
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
                        label: 'Excuse Type',
                        value: _getTypeName(excuse.type),
                        icon: Icons.category_outlined,
                        valueWidget: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: typeColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            _getTypeName(excuse.type),
                            style: TextStyle(
                              color: typeColor,
                              fontWeight: FontWeight.w600,
                              fontSize: 13,
                            ),
                          ),
                        ),
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: 'Date',
                        value: dateFormat.format(excuse.excuseDate),
                        icon: Icons.calendar_today_outlined,
                      ),
                      if (excuse.requestedTime != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Requested Time',
                          value: timeFormat.format(excuse.requestedTime!),
                          icon: Icons.access_time_outlined,
                        ),
                      ],
                      if (excuse.actualTime != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Actual Time',
                          value: timeFormat.format(excuse.actualTime!),
                          icon: Icons.schedule_outlined,
                        ),
                      ],
                      if (excuse.minutesDifference != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Duration',
                          value: _formatDuration(excuse.minutesDifference!),
                          icon: Icons.timelapse_outlined,
                          valueColor: AppColors.primary,
                          valueBold: true,
                        ),
                      ],
                      const _DetailDivider(),
                      _DetailRow(
                        label: l10n.reason,
                        value: excuse.reason,
                        icon: Icons.notes_outlined,
                        isMultiline: true,
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Status information card
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
                      if (excuse.createdAt != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Submitted On',
                          value: dateTimeFormat.format(excuse.createdAt!),
                          icon: Icons.access_time_outlined,
                        ),
                      ],
                      if (excuse.processedAt != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Processed On',
                          value: dateTimeFormat.format(excuse.processedAt!),
                          icon: Icons.check_circle_outline,
                        ),
                      ],
                    ],
                  ),

                  // Manager notes
                  if (excuse.managerNotes != null &&
                      excuse.managerNotes!.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    _SectionCard(
                      title: 'Manager Notes',
                      icon: Icons.comment_outlined,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Text(
                            excuse.managerNotes!,
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: AppColors.textSecondary,
                              height: 1.5,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],

                  // Approval workflow timeline
                  const SizedBox(height: 16),
                  _ApprovalTimeline(excuse: excuse),

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
                    onPressed: () => _cancelExcuse(context, ref, excuse.id),
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

  Future<void> _cancelExcuse(
    BuildContext context,
    WidgetRef ref,
    String id,
  ) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Excuse Request'),
        content: const Text(
            'Are you sure you want to cancel this excuse request?'),
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
          await ref.read(excuseNotifierProvider.notifier).cancelExcuse(id);
      if (success && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Excuse request cancelled'),
            backgroundColor: Colors.green,
          ),
        );
        context.pop();
      }
    }
  }

  String _formatDuration(int minutes) {
    if (minutes < 60) {
      return '$minutes minute${minutes != 1 ? 's' : ''}';
    }
    final hours = minutes ~/ 60;
    final remainingMinutes = minutes % 60;
    if (remainingMinutes == 0) {
      return '$hours hour${hours != 1 ? 's' : ''}';
    }
    return '$hours hr ${remainingMinutes} min';
  }

  String _getTypeName(ExcuseType type) {
    switch (type) {
      case ExcuseType.personalExcuse:
        return 'Personal Excuse';
      case ExcuseType.officialDuty:
        return 'Official Duty';
    }
  }

  Color _getTypeColor(ExcuseType type) {
    switch (type) {
      case ExcuseType.personalExcuse:
        return AppColors.warning;
      case ExcuseType.officialDuty:
        return AppColors.info;
    }
  }

  Color _getStatusColor(ExcuseStatus status) {
    switch (status) {
      case ExcuseStatus.pending:
        return AppColors.warning;
      case ExcuseStatus.approved:
        return AppColors.success;
      case ExcuseStatus.rejected:
        return AppColors.error;
    }
  }

  String _getStatusName(ExcuseStatus status, AppLocalizations l10n) {
    switch (status) {
      case ExcuseStatus.pending:
        return l10n.pending;
      case ExcuseStatus.approved:
        return l10n.approved;
      case ExcuseStatus.rejected:
        return l10n.rejected;
    }
  }
}

/// Approval workflow timeline for excuse requests.
class _ApprovalTimeline extends StatelessWidget {
  final ExcuseRequest excuse;

  const _ApprovalTimeline({required this.excuse});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');

    // Build timeline steps from available data
    final steps = <_TimelineStep>[];

    // Step 1: Request submitted
    steps.add(_TimelineStep(
      title: 'Request Submitted',
      subtitle: excuse.createdAt != null
          ? dateTimeFormat.format(excuse.createdAt!)
          : 'Date not available',
      icon: Icons.send_outlined,
      color: AppColors.success,
      isCompleted: true,
    ));

    // Step 2: Status-dependent step
    if (excuse.status == ExcuseStatus.pending) {
      steps.add(const _TimelineStep(
        title: 'Pending Review',
        subtitle: 'Waiting for manager approval',
        icon: Icons.hourglass_top_outlined,
        color: AppColors.warning,
        isCompleted: false,
        isActive: true,
      ));
    } else if (excuse.status == ExcuseStatus.approved) {
      steps.add(_TimelineStep(
        title: 'Approved',
        subtitle: excuse.processedAt != null
            ? dateTimeFormat.format(excuse.processedAt!)
            : 'Approved',
        icon: Icons.check_circle_outlined,
        color: AppColors.success,
        isCompleted: true,
      ));
    } else if (excuse.status == ExcuseStatus.rejected) {
      steps.add(_TimelineStep(
        title: 'Rejected',
        subtitle: excuse.processedAt != null
            ? dateTimeFormat.format(excuse.processedAt!)
            : 'Rejected',
        icon: Icons.cancel_outlined,
        color: AppColors.error,
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
                Icon(icon, size: 16, color: AppColors.textTertiary),
                const SizedBox(width: 8),
              ],
              Text(
                label,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: AppColors.textTertiary,
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
                color: valueColor ?? AppColors.textPrimary,
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
          Icon(icon, size: 16, color: AppColors.textTertiary),
          const SizedBox(width: 8),
        ],
        Expanded(
          flex: 2,
          child: Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
              color: AppColors.textTertiary,
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
                  color: valueColor ?? AppColors.textPrimary,
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
        color: AppColors.outlineVariant,
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
                        : AppColors.surfaceVariant,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: step.isCompleted || step.isActive
                          ? step.color
                          : AppColors.outline,
                      width: 2,
                    ),
                  ),
                  child: Icon(
                    step.icon,
                    size: 16,
                    color: step.isCompleted || step.isActive
                        ? step.color
                        : AppColors.textTertiary,
                  ),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      color: step.isCompleted
                          ? step.color.withOpacity(0.3)
                          : AppColors.outlineVariant,
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
                          ? AppColors.textPrimary
                          : AppColors.textTertiary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    step.subtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: AppColors.textSecondary,
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
