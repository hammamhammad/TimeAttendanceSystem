import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/remote_work_model.dart';
import '../../../shared/providers/remote_work_provider.dart';

/// Detail screen showing full information about a remote work request.
class RemoteWorkDetailScreen extends ConsumerWidget {
  const RemoteWorkDetailScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final request = GoRouterState.of(context).extra as RemoteWorkRequest?;

    if (request == null) {
      return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => context.pop(),
          ),
          title: const Text('Remote Work Request'),
        ),
        body: const Center(
          child: Text('Remote work request data not available.'),
        ),
      );
    }

    final dateFormat = DateFormat('MMM dd, yyyy');
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');
    final statusColor = _getStatusColor(request.status);
    final statusName = _getStatusName(request.status, l10n);
    final isPending = request.status == RemoteWorkStatus.pending;
    final totalDays = request.endDate.difference(request.startDate).inDays + 1;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // App bar
          SliverAppBar(
            expandedHeight: 160,
            pinned: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => context.pop(),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      AppColors.info,
                      Color(0xFF2563EB),
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
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Icon(
                                Icons.home_work_outlined,
                                color: Colors.white,
                                size: 24,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '$totalDays Day${totalDays > 1 ? 's' : ''} Remote Work',
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 22,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${dateFormat.format(request.startDate)} - ${dateFormat.format(request.endDate)}',
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.85),
                                      fontSize: 14,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
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
                        label: l10n.startDate,
                        value: dateFormat.format(request.startDate),
                        icon: Icons.calendar_today_outlined,
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: l10n.endDate,
                        value: dateFormat.format(request.endDate),
                        icon: Icons.event_outlined,
                      ),
                      const _DetailDivider(),
                      _DetailRow(
                        label: 'Total Days',
                        value: '$totalDays day${totalDays > 1 ? 's' : ''}',
                        icon: Icons.timelapse_outlined,
                        valueColor: AppColors.primary,
                        valueBold: true,
                      ),
                      if (request.workLocation != null &&
                          request.workLocation!.isNotEmpty) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Work Location',
                          value: request.workLocation!,
                          icon: Icons.location_on_outlined,
                        ),
                      ],
                      if (request.contactPhone != null &&
                          request.contactPhone!.isNotEmpty) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Contact Phone',
                          value: request.contactPhone!,
                          icon: Icons.phone_outlined,
                        ),
                      ],
                      const _DetailDivider(),
                      _DetailRow(
                        label: l10n.reason,
                        value: request.reason,
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
                      if (request.createdAt != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Submitted On',
                          value: dateTimeFormat.format(request.createdAt!),
                          icon: Icons.access_time_outlined,
                        ),
                      ],
                      if (request.processedAt != null) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Processed On',
                          value: dateTimeFormat.format(request.processedAt!),
                          icon: Icons.check_circle_outline,
                        ),
                      ],
                      if (request.processedByName != null &&
                          request.processedByName!.isNotEmpty) ...[
                        const _DetailDivider(),
                        _DetailRow(
                          label: 'Processed By',
                          value: request.processedByName!,
                          icon: Icons.person_outline,
                        ),
                      ],
                    ],
                  ),

                  // Manager notes
                  if (request.managerNotes != null &&
                      request.managerNotes!.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    _SectionCard(
                      title: 'Manager Notes',
                      icon: Icons.comment_outlined,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Text(
                            request.managerNotes!,
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
                  _ApprovalTimeline(request: request),

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
                    onPressed: () =>
                        _cancelRequest(context, ref, request.id),
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

  Future<void> _cancelRequest(
    BuildContext context,
    WidgetRef ref,
    String id,
  ) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Remote Work Request'),
        content: const Text(
            'Are you sure you want to cancel this remote work request?'),
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
          await ref.read(remoteWorkProvider.notifier).cancelRequest(id);
      if (success && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Remote work request cancelled'),
            backgroundColor: Colors.green,
          ),
        );
        context.pop();
      }
    }
  }

  Color _getStatusColor(RemoteWorkStatus status) {
    switch (status) {
      case RemoteWorkStatus.pending:
        return AppColors.warning;
      case RemoteWorkStatus.approved:
        return AppColors.success;
      case RemoteWorkStatus.rejected:
        return AppColors.error;
      case RemoteWorkStatus.cancelled:
        return AppColors.textTertiary;
    }
  }

  String _getStatusName(RemoteWorkStatus status, AppLocalizations l10n) {
    switch (status) {
      case RemoteWorkStatus.pending:
        return l10n.pending;
      case RemoteWorkStatus.approved:
        return l10n.approved;
      case RemoteWorkStatus.rejected:
        return l10n.rejected;
      case RemoteWorkStatus.cancelled:
        return 'Cancelled';
    }
  }
}

/// Approval workflow timeline for remote work requests.
class _ApprovalTimeline extends StatelessWidget {
  final RemoteWorkRequest request;

  const _ApprovalTimeline({required this.request});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dateTimeFormat = DateFormat('MMM dd, yyyy - HH:mm');

    // Build timeline steps from available data
    final steps = <_TimelineStep>[];

    // Step 1: Request submitted
    steps.add(_TimelineStep(
      title: 'Request Submitted',
      subtitle: request.createdAt != null
          ? dateTimeFormat.format(request.createdAt!)
          : 'Date not available',
      icon: Icons.send_outlined,
      color: AppColors.success,
      isCompleted: true,
    ));

    // Step 2: Status-dependent step
    if (request.status == RemoteWorkStatus.pending) {
      steps.add(const _TimelineStep(
        title: 'Pending Review',
        subtitle: 'Waiting for manager approval',
        icon: Icons.hourglass_top_outlined,
        color: AppColors.warning,
        isCompleted: false,
        isActive: true,
      ));
    } else if (request.status == RemoteWorkStatus.approved) {
      steps.add(_TimelineStep(
        title: 'Approved',
        subtitle: _buildProcessedSubtitle(dateTimeFormat),
        icon: Icons.check_circle_outlined,
        color: AppColors.success,
        isCompleted: true,
      ));
    } else if (request.status == RemoteWorkStatus.rejected) {
      steps.add(_TimelineStep(
        title: 'Rejected',
        subtitle: _buildProcessedSubtitle(dateTimeFormat),
        icon: Icons.cancel_outlined,
        color: AppColors.error,
        isCompleted: true,
      ));
    } else if (request.status == RemoteWorkStatus.cancelled) {
      steps.add(const _TimelineStep(
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

  String _buildProcessedSubtitle(DateFormat format) {
    final parts = <String>[];
    if (request.processedByName != null &&
        request.processedByName!.isNotEmpty) {
      parts.add('By ${request.processedByName}');
    }
    if (request.processedAt != null) {
      parts.add(format.format(request.processedAt!));
    }
    return parts.isNotEmpty ? parts.join(' - ') : 'Processed';
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
