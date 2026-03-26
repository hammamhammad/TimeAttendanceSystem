import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/providers/manager_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Screen for viewing and acting on pending approval requests.
class PendingApprovalsScreen extends ConsumerStatefulWidget {
  const PendingApprovalsScreen({super.key});

  @override
  ConsumerState<PendingApprovalsScreen> createState() =>
      _PendingApprovalsScreenState();
}

class _PendingApprovalsScreenState
    extends ConsumerState<PendingApprovalsScreen> {
  String _selectedFilter = 'All';

  static const _filterOptions = [
    'All',
    'Vacation',
    'Excuse',
    'Remote Work',
    'Correction',
  ];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(pendingApprovalsProvider.notifier).loadApprovals();
    });
  }

  Future<void> _onRefresh() async {
    final entityType = _getEntityTypeParam(_selectedFilter);
    await ref
        .read(pendingApprovalsProvider.notifier)
        .loadApprovals(entityType: entityType);
  }

  void _onFilterChanged(String filter) {
    setState(() => _selectedFilter = filter);
    final entityType = _getEntityTypeParam(filter);
    ref
        .read(pendingApprovalsProvider.notifier)
        .loadApprovals(entityType: entityType);
  }

  String? _getEntityTypeParam(String filter) {
    switch (filter) {
      case 'Vacation':
        return 'EmployeeVacation';
      case 'Excuse':
        return 'EmployeeExcuse';
      case 'Remote Work':
        return 'RemoteWorkRequest';
      case 'Correction':
        return 'AttendanceCorrection';
      default:
        return null;
    }
  }

  Future<void> _showApproveDialog(Map<String, dynamic> approval) async {
    final commentsController = TextEditingController();
    final workflowInstanceId =
        approval['workflowInstanceId'] ?? approval['id'];

    if (workflowInstanceId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid request data')),
      );
      return;
    }

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.success.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(Icons.check_circle, color: AppColors.success, size: 20),
            ),
            const SizedBox(width: 12),
            const Text('Approve Request'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Are you sure you want to approve this request?',
              style: TextStyle(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: commentsController,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: 'Add comments (optional)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          FilledButton.icon(
            onPressed: () => Navigator.pop(context, true),
            icon: const Icon(Icons.check, size: 18),
            label: const Text('Approve'),
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.success,
            ),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      final comments = commentsController.text.isNotEmpty
          ? commentsController.text
          : null;
      final success = await ref
          .read(pendingApprovalsProvider.notifier)
          .approve(workflowInstanceId as int, comments: comments);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
                success ? 'Request approved' : 'Failed to approve request'),
            backgroundColor: success ? AppColors.success : AppColors.error,
          ),
        );
        // Refresh dashboard counts too
        if (success) {
          ref.read(managerDashboardProvider.notifier).refresh();
        }
      }
    }
    commentsController.dispose();
  }

  Future<void> _showRejectDialog(Map<String, dynamic> approval) async {
    final commentsController = TextEditingController();
    final workflowInstanceId =
        approval['workflowInstanceId'] ?? approval['id'];

    if (workflowInstanceId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid request data')),
      );
      return;
    }

    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.error.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(Icons.cancel, color: AppColors.error, size: 20),
            ),
            const SizedBox(width: 12),
            const Text('Reject Request'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Are you sure you want to reject this request?',
              style: TextStyle(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: commentsController,
              maxLines: 3,
              decoration: InputDecoration(
                hintText: 'Add reason for rejection (optional)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          FilledButton.icon(
            onPressed: () => Navigator.pop(context, true),
            icon: const Icon(Icons.close, size: 18),
            label: const Text('Reject'),
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      final comments = commentsController.text.isNotEmpty
          ? commentsController.text
          : null;
      final success = await ref
          .read(pendingApprovalsProvider.notifier)
          .reject(workflowInstanceId as int, comments: comments);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
                success ? 'Request rejected' : 'Failed to reject request'),
            backgroundColor: success ? AppColors.warning : AppColors.error,
          ),
        );
        if (success) {
          ref.read(managerDashboardProvider.notifier).refresh();
        }
      }
    }
    commentsController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(pendingApprovalsProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: const Text('Pending Approvals'),
      ),
      body: Column(
        children: [
          // Filter chips
          _FilterChipsRow(
            options: _filterOptions,
            selected: _selectedFilter,
            onSelected: _onFilterChanged,
          ),

          // Content
          Expanded(
            child: state.isLoading && state.approvals.isEmpty
                ? const AppLoading()
                : state.error != null && state.approvals.isEmpty
                    ? AppError(
                        message: state.error,
                        onRetry: _onRefresh,
                      )
                    : state.approvals.isEmpty
                        ? const AppEmpty(
                            message: 'No pending approvals',
                            icon: Icons.check_circle_outline,
                          )
                        : RefreshIndicator(
                            onRefresh: _onRefresh,
                            child: ListView.builder(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 16, vertical: 8),
                              itemCount: state.approvals.length,
                              itemBuilder: (context, index) {
                                final approval = state.approvals[index];
                                return _ApprovalCard(
                                  approval: approval,
                                  onApprove: () =>
                                      _showApproveDialog(approval),
                                  onReject: () =>
                                      _showRejectDialog(approval),
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}

/// Horizontally scrollable filter chips.
class _FilterChipsRow extends StatelessWidget {
  final List<String> options;
  final String selected;
  final ValueChanged<String> onSelected;

  const _FilterChipsRow({
    required this.options,
    required this.selected,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 52,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: options.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final option = options[index];
          final isSelected = option == selected;
          return FilterChip(
            label: Text(option),
            selected: isSelected,
            onSelected: (_) => onSelected(option),
            selectedColor: AppColors.primary.withOpacity(0.15),
            checkmarkColor: AppColors.primary,
            labelStyle: TextStyle(
              color: isSelected ? AppColors.primary : AppColors.textSecondary,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
            ),
            side: BorderSide(
              color: isSelected ? AppColors.primary : AppColors.outlineVariant,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
          );
        },
      ),
    );
  }
}

/// Individual approval request card with approve/reject actions.
class _ApprovalCard extends StatelessWidget {
  final Map<String, dynamic> approval;
  final VoidCallback onApprove;
  final VoidCallback onReject;

  const _ApprovalCard({
    required this.approval,
    required this.onApprove,
    required this.onReject,
  });

  @override
  Widget build(BuildContext context) {
    final employeeName = approval['employeeName'] ??
        approval['employee'] ??
        'Unknown Employee';
    final entityType = approval['entityType'] ??
        approval['requestType'] ??
        approval['type'] ??
        'Request';
    final summary = approval['summary'] ??
        approval['description'] ??
        approval['notes'] ??
        '';
    final requestedDate = _parseDate(
        approval['requestedDate'] ?? approval['createdAt'] ?? approval['date']);
    final dueDate =
        _parseDate(approval['dueDate'] ?? approval['expiresAt']);

    final typeLabel = _getTypeLabel(entityType.toString());
    final typeColor = _getTypeColor(entityType.toString());
    final typeIcon = _getTypeIcon(entityType.toString());

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: AppColors.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header row: employee name + type badge
            Row(
              children: [
                CircleAvatar(
                  radius: 18,
                  backgroundColor: typeColor.withOpacity(0.1),
                  child: Icon(typeIcon, size: 18, color: typeColor),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        employeeName.toString(),
                        style: const TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 15,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: typeColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          typeLabel,
                          style: TextStyle(
                            color: typeColor,
                            fontWeight: FontWeight.w600,
                            fontSize: 11,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            // Summary
            if (summary.toString().isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(
                summary.toString(),
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 13,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],

            // Dates
            const SizedBox(height: 12),
            Row(
              children: [
                if (requestedDate != null) ...[
                  Icon(Icons.calendar_today,
                      size: 14, color: AppColors.textTertiary),
                  const SizedBox(width: 4),
                  Text(
                    'Requested: ${DateFormat('MMM d, yyyy').format(requestedDate)}',
                    style: TextStyle(
                      color: AppColors.textTertiary,
                      fontSize: 12,
                    ),
                  ),
                ],
                if (requestedDate != null && dueDate != null)
                  const SizedBox(width: 16),
                if (dueDate != null) ...[
                  Icon(Icons.timer_outlined,
                      size: 14, color: _isDueSoon(dueDate) ? AppColors.error : AppColors.textTertiary),
                  const SizedBox(width: 4),
                  Text(
                    'Due: ${DateFormat('MMM d').format(dueDate)}',
                    style: TextStyle(
                      color: _isDueSoon(dueDate) ? AppColors.error : AppColors.textTertiary,
                      fontSize: 12,
                      fontWeight: _isDueSoon(dueDate)
                          ? FontWeight.w600
                          : FontWeight.normal,
                    ),
                  ),
                ],
              ],
            ),

            // Action buttons
            const SizedBox(height: 14),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: onReject,
                    icon: const Icon(Icons.close, size: 18),
                    label: const Text('Reject'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.error,
                      side: BorderSide(color: AppColors.error.withOpacity(0.5)),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: FilledButton.icon(
                    onPressed: onApprove,
                    icon: const Icon(Icons.check, size: 18),
                    label: const Text('Approve'),
                    style: FilledButton.styleFrom(
                      backgroundColor: AppColors.success,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  DateTime? _parseDate(dynamic value) {
    if (value == null) return null;
    try {
      return DateTime.parse(value.toString());
    } catch (_) {
      return null;
    }
  }

  bool _isDueSoon(DateTime dueDate) {
    return dueDate.difference(DateTime.now()).inDays <= 1;
  }

  String _getTypeLabel(String type) {
    final lower = type.toLowerCase();
    if (lower.contains('vacation') || lower.contains('leave')) {
      return 'Vacation';
    } else if (lower.contains('excuse')) {
      return 'Excuse';
    } else if (lower.contains('remote')) {
      return 'Remote Work';
    } else if (lower.contains('correction') || lower.contains('attendance')) {
      return 'Correction';
    }
    return type;
  }

  Color _getTypeColor(String type) {
    final lower = type.toLowerCase();
    if (lower.contains('vacation') || lower.contains('leave')) {
      return AppColors.info;
    } else if (lower.contains('excuse')) {
      return AppColors.warning;
    } else if (lower.contains('remote')) {
      return AppColors.secondary;
    } else if (lower.contains('correction') || lower.contains('attendance')) {
      return AppColors.primary;
    }
    return AppColors.textSecondary;
  }

  IconData _getTypeIcon(String type) {
    final lower = type.toLowerCase();
    if (lower.contains('vacation') || lower.contains('leave')) {
      return Icons.beach_access;
    } else if (lower.contains('excuse')) {
      return Icons.assignment_outlined;
    } else if (lower.contains('remote')) {
      return Icons.home_work;
    } else if (lower.contains('correction') || lower.contains('attendance')) {
      return Icons.edit_note;
    }
    return Icons.pending_actions;
  }
}
