import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../shared/models/leave_model.dart';
import '../../../shared/providers/leave_provider.dart';
import '../../../shared/providers/dashboard_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Leave list screen showing user's leave requests.
class LeaveListScreen extends ConsumerStatefulWidget {
  const LeaveListScreen({super.key});

  @override
  ConsumerState<LeaveListScreen> createState() => _LeaveListScreenState();
}

class _LeaveListScreenState extends ConsumerState<LeaveListScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);

    // Load leave data on init
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(leaveNotifierProvider.notifier).loadData();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final state = ref.watch(leaveNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: Text(l10n.myLeaves),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: '${l10n.pending} (${state.pendingRequests.length})'),
            Tab(text: '${l10n.approved} (${state.approvedRequests.length})'),
            Tab(text: '${l10n.rejected} (${state.rejectedRequests.length})'),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateLeaveDialog(context),
        icon: const Icon(Icons.add),
        label: Text(l10n.requestLeave),
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(leaveNotifierProvider.notifier).loadData(),
                )
              : TabBarView(
                  controller: _tabController,
                  children: [
                    _buildLeaveList(state.pendingRequests, showCancel: true),
                    _buildLeaveList(state.approvedRequests),
                    _buildLeaveList(state.rejectedRequests),
                  ],
                ),
    );
  }

  Widget _buildLeaveList(List<LeaveRequest> requests, {bool showCancel = false}) {
    if (requests.isEmpty) {
      return const AppEmpty(
        message: 'No leave requests',
        icon: Icons.event_busy,
      );
    }

    return RefreshIndicator(
      onRefresh: () => ref.read(leaveNotifierProvider.notifier).loadData(),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: requests.length,
        itemBuilder: (context, index) {
          final leave = requests[index];
          return _LeaveCard(
            leave: leave,
            showCancel: showCancel,
            onCancel: () => _cancelLeave(leave.id),
            onEdit: () => _showEditLeaveDialog(context, leave),
          );
        },
      ),
    );
  }

  void _showCreateLeaveDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.9,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) {
          return _CreateLeaveForm(scrollController: scrollController);
        },
      ),
    );
  }

  void _showEditLeaveDialog(BuildContext context, LeaveRequest leave) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.9,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) {
          return _EditLeaveForm(
            scrollController: scrollController,
            leave: leave,
          );
        },
      ),
    );
  }

  Future<void> _cancelLeave(int id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Leave'),
        content: const Text('Are you sure you want to cancel this leave request?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('No'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Yes'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      await ref.read(leaveNotifierProvider.notifier).cancelRequest(id);
    }
  }
}

class _LeaveCard extends StatelessWidget {
  final LeaveRequest leave;
  final bool showCancel;
  final VoidCallback? onCancel;
  final VoidCallback? onEdit;

  const _LeaveCard({
    required this.leave,
    this.showCancel = false,
    this.onCancel,
    this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    leave.vacationTypeName ?? 'Leave',
                    style: TextStyle(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: _getStatusColor(leave.status).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _getStatusName(leave.status),
                    style: TextStyle(
                      color: _getStatusColor(leave.status),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Icon(
                  Icons.calendar_today,
                  size: 16,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
                const SizedBox(width: 8),
                Text(
                  '${dateFormat.format(leave.startDate)} - ${dateFormat.format(leave.endDate)}',
                  style: theme.textTheme.bodyMedium,
                ),
                const Spacer(),
                if (leave.totalDays != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surfaceContainerHighest,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      '${leave.totalDays} days',
                      style: theme.textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
              ],
            ),
            if (leave.reason != null && leave.reason!.isNotEmpty) ...[
              const SizedBox(height: 12),
              Text(
                leave.reason!,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
            if (leave.currentApproverName != null && leave.currentApproverName!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(Icons.person, size: 16, color: theme.colorScheme.onSurfaceVariant),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Approver: ${leave.currentApproverName}',
                        style: TextStyle(
                          color: theme.colorScheme.onSurfaceVariant,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            if (showCancel) ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: onEdit,
                      icon: const Icon(Icons.edit, size: 18),
                      label: const Text('Edit'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.primary,
                        side: BorderSide(color: AppColors.primary),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: onCancel,
                      icon: const Icon(Icons.close, size: 18),
                      label: const Text('Cancel'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.error,
                        side: BorderSide(color: AppColors.error),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
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

  String _getStatusName(LeaveStatus status) {
    switch (status) {
      case LeaveStatus.pending:
        return 'Pending';
      case LeaveStatus.approved:
        return 'Approved';
      case LeaveStatus.rejected:
        return 'Rejected';
      case LeaveStatus.cancelled:
        return 'Cancelled';
    }
  }
}

class _CreateLeaveForm extends ConsumerStatefulWidget {
  final ScrollController scrollController;

  const _CreateLeaveForm({required this.scrollController});

  @override
  ConsumerState<_CreateLeaveForm> createState() => _CreateLeaveFormState();
}

class _CreateLeaveFormState extends ConsumerState<_CreateLeaveForm> {
  final _formKey = GlobalKey<FormState>();
  int? _selectedVacationTypeId;
  DateTime? _startDate;
  DateTime? _endDate;
  final _reasonController = TextEditingController();
  bool _isSubmitting = false;

  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final leaveState = ref.watch(leaveNotifierProvider);

    return Padding(
      padding: const EdgeInsets.all(24),
      child: Form(
        key: _formKey,
        child: ListView(
          controller: widget.scrollController,
          children: [
            // Header
            Row(
              children: [
                Text(
                  l10n.requestLeave,
                  style: theme.textTheme.headlineSmall,
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Leave type dropdown - populated from vacation types
            DropdownButtonFormField<int>(
              value: _selectedVacationTypeId,
              decoration: InputDecoration(
                labelText: l10n.leaveType,
                prefixIcon: const Icon(Icons.category),
              ),
              items: leaveState.vacationTypes.map((vt) {
                return DropdownMenuItem<int>(
                  value: vt.id,
                  child: Text(vt.name),
                );
              }).toList(),
              onChanged: (value) {
                setState(() => _selectedVacationTypeId = value);
              },
              validator: (value) {
                if (value == null) return 'Please select a leave type';
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Start date
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.calendar_today),
              title: Text(_startDate != null
                  ? DateFormat('MMM dd, yyyy').format(_startDate!)
                  : l10n.startDate),
              subtitle: _startDate == null ? const Text('Tap to select') : null,
              tileColor: theme.colorScheme.surfaceContainerHighest,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now(),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                );
                if (date != null) {
                  setState(() => _startDate = date);
                }
              },
            ),
            const SizedBox(height: 16),

            // End date
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.calendar_today),
              title: Text(_endDate != null
                  ? DateFormat('MMM dd, yyyy').format(_endDate!)
                  : l10n.endDate),
              subtitle: _endDate == null ? const Text('Tap to select') : null,
              tileColor: theme.colorScheme.surfaceContainerHighest,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: _startDate ?? DateTime.now(),
                  firstDate: _startDate ?? DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                );
                if (date != null) {
                  setState(() => _endDate = date);
                }
              },
            ),
            const SizedBox(height: 16),

            // Reason
            TextFormField(
              controller: _reasonController,
              maxLines: 3,
              decoration: InputDecoration(
                labelText: l10n.reason,
                alignLabelWithHint: true,
              ),
            ),
            const SizedBox(height: 32),

            // Submit button
            SizedBox(
              height: 56,
              child: ElevatedButton(
                onPressed: _isSubmitting ? null : _submit,
                child: _isSubmitting
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : Text(l10n.submit),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      if (_startDate == null || _endDate == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please select dates')),
        );
        return;
      }

      final dashboardState = ref.read(dashboardNotifierProvider);
      final employeeId = dashboardState.data?.employeeId;
      if (employeeId == null || employeeId == 0) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Employee data not loaded. Please try again.')),
        );
        return;
      }

      setState(() => _isSubmitting = true);

      final success = await ref.read(leaveNotifierProvider.notifier).createRequest(
        employeeId: employeeId,
        vacationTypeId: _selectedVacationTypeId!,
        startDate: _startDate!,
        endDate: _endDate!,
        notes: _reasonController.text.isEmpty ? null : _reasonController.text,
      );

      setState(() => _isSubmitting = false);

      if (success && mounted) {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Leave request submitted'),
            backgroundColor: Colors.green,
          ),
        );
      }
    }
  }
}

class _EditLeaveForm extends ConsumerStatefulWidget {
  final ScrollController scrollController;
  final LeaveRequest leave;

  const _EditLeaveForm({
    required this.scrollController,
    required this.leave,
  });

  @override
  ConsumerState<_EditLeaveForm> createState() => _EditLeaveFormState();
}

class _EditLeaveFormState extends ConsumerState<_EditLeaveForm> {
  final _formKey = GlobalKey<FormState>();
  int? _selectedVacationTypeId;
  DateTime? _startDate;
  DateTime? _endDate;
  final _reasonController = TextEditingController();
  bool _isSubmitting = false;

  @override
  void initState() {
    super.initState();
    // Pre-populate with existing leave data
    _selectedVacationTypeId = widget.leave.vacationTypeId;
    _startDate = widget.leave.startDate;
    _endDate = widget.leave.endDate;
    _reasonController.text = widget.leave.reason ?? '';
  }

  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final leaveState = ref.watch(leaveNotifierProvider);

    return Padding(
      padding: const EdgeInsets.all(24),
      child: Form(
        key: _formKey,
        child: ListView(
          controller: widget.scrollController,
          children: [
            // Header
            Row(
              children: [
                Text(
                  l10n.editLeave,
                  style: theme.textTheme.headlineSmall,
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Leave type dropdown - populated from vacation types
            DropdownButtonFormField<int>(
              value: _selectedVacationTypeId,
              decoration: InputDecoration(
                labelText: l10n.leaveType,
                prefixIcon: const Icon(Icons.category),
              ),
              items: leaveState.vacationTypes.map((vt) {
                return DropdownMenuItem<int>(
                  value: vt.id,
                  child: Text(vt.name),
                );
              }).toList(),
              onChanged: (value) {
                setState(() => _selectedVacationTypeId = value);
              },
              validator: (value) {
                if (value == null) return 'Please select a leave type';
                return null;
              },
            ),
            const SizedBox(height: 16),

            // Start date
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.calendar_today),
              title: Text(_startDate != null
                  ? DateFormat('MMM dd, yyyy').format(_startDate!)
                  : l10n.startDate),
              subtitle: _startDate == null ? const Text('Tap to select') : null,
              tileColor: theme.colorScheme.surfaceContainerHighest,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: _startDate ?? DateTime.now(),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                );
                if (date != null) {
                  setState(() => _startDate = date);
                }
              },
            ),
            const SizedBox(height: 16),

            // End date
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.calendar_today),
              title: Text(_endDate != null
                  ? DateFormat('MMM dd, yyyy').format(_endDate!)
                  : l10n.endDate),
              subtitle: _endDate == null ? const Text('Tap to select') : null,
              tileColor: theme.colorScheme.surfaceContainerHighest,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: _endDate ?? _startDate ?? DateTime.now(),
                  firstDate: _startDate ?? DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 365)),
                );
                if (date != null) {
                  setState(() => _endDate = date);
                }
              },
            ),
            const SizedBox(height: 16),

            // Reason
            TextFormField(
              controller: _reasonController,
              maxLines: 3,
              decoration: InputDecoration(
                labelText: l10n.reason,
                alignLabelWithHint: true,
              ),
            ),
            const SizedBox(height: 32),

            // Update button
            SizedBox(
              height: 56,
              child: ElevatedButton(
                onPressed: _isSubmitting ? null : _submit,
                child: _isSubmitting
                    ? const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : Text(l10n.updateRequest),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      if (_startDate == null || _endDate == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please select dates')),
        );
        return;
      }

      final dashboardState = ref.read(dashboardNotifierProvider);
      final employeeId = dashboardState.data?.employeeId;
      if (employeeId == null || employeeId == 0) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Employee data not loaded. Please try again.')),
        );
        return;
      }

      setState(() => _isSubmitting = true);

      final success = await ref.read(leaveNotifierProvider.notifier).updateRequest(
        requestId: widget.leave.id,
        employeeId: employeeId,
        vacationTypeId: _selectedVacationTypeId!,
        startDate: _startDate!,
        endDate: _endDate!,
        notes: _reasonController.text.isEmpty ? null : _reasonController.text,
      );

      setState(() => _isSubmitting = false);

      if (success && mounted) {
        Navigator.pop(context);
        final l10n = AppLocalizations.of(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(l10n.requestUpdated),
            backgroundColor: Colors.green,
          ),
        );
      }
    }
  }
}
