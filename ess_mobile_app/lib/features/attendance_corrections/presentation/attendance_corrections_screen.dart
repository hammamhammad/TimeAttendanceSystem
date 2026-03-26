import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/models/attendance_correction_model.dart';
import '../../../shared/providers/attendance_correction_provider.dart';
import '../../../shared/providers/dashboard_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Screen for managing attendance correction requests.
class AttendanceCorrectionsScreen extends ConsumerStatefulWidget {
  const AttendanceCorrectionsScreen({super.key});

  @override
  ConsumerState<AttendanceCorrectionsScreen> createState() =>
      _AttendanceCorrectionsScreenState();
}

class _AttendanceCorrectionsScreenState
    extends ConsumerState<AttendanceCorrectionsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);

    // Load corrections on init
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(attendanceCorrectionNotifierProvider.notifier).loadCorrections();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(attendanceCorrectionNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: const Text('Attendance Corrections'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'All (${state.requests.length})'),
            Tab(text: 'Pending (${state.pendingRequests.length})'),
            Tab(text: 'Resolved (${state.approvedRequests.length + state.rejectedRequests.length})'),
          ],
        ),
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref
                      .read(attendanceCorrectionNotifierProvider.notifier)
                      .loadCorrections(),
                )
              : TabBarView(
                  controller: _tabController,
                  children: [
                    _buildCorrectionList(state.requests, showCancel: true),
                    _buildCorrectionList(state.pendingRequests,
                        showCancel: true),
                    _buildCorrectionList([
                      ...state.approvedRequests,
                      ...state.rejectedRequests,
                    ]),
                  ],
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateCorrectionSheet(context),
        icon: const Icon(Icons.add),
        label: const Text('New Correction'),
      ),
    );
  }

  Widget _buildCorrectionList(List<AttendanceCorrectionRequest> requests,
      {bool showCancel = false}) {
    if (requests.isEmpty) {
      return const AppEmpty(
        message: 'No attendance correction requests',
        icon: Icons.edit_calendar_outlined,
      );
    }

    return RefreshIndicator(
      onRefresh: () => ref
          .read(attendanceCorrectionNotifierProvider.notifier)
          .loadCorrections(),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: requests.length,
        itemBuilder: (context, index) {
          final correction = requests[index];
          return _CorrectionCard(
            correction: correction,
            showCancel: showCancel &&
                correction.approvalStatus == CorrectionApprovalStatus.pending,
            onCancel: () => _cancelCorrection(correction.id),
          );
        },
      ),
    );
  }

  void _showCreateCorrectionSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => const _CreateCorrectionSheet(),
    );
  }

  Future<void> _cancelCorrection(int id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Correction'),
        content: const Text(
            'Are you sure you want to cancel this correction request?'),
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
      await ref
          .read(attendanceCorrectionNotifierProvider.notifier)
          .cancelCorrection(id);
    }
  }
}

/// Correction card widget.
class _CorrectionCard extends StatelessWidget {
  final AttendanceCorrectionRequest correction;
  final bool showCancel;
  final VoidCallback? onCancel;

  const _CorrectionCard({
    required this.correction,
    this.showCancel = false,
    this.onCancel,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Type badge and status badge row
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getTypeColor(correction.correctionType)
                        .withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        _getTypeIcon(correction.correctionType),
                        size: 14,
                        color: _getTypeColor(correction.correctionType),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        correction.correctionTypeDisplay ??
                            _getTypeName(correction.correctionType),
                        style: TextStyle(
                          color: _getTypeColor(correction.correctionType),
                          fontWeight: FontWeight.w500,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getStatusColor(correction.approvalStatus)
                        .withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    correction.approvalStatusDisplay ??
                        _getStatusName(correction.approvalStatus),
                    style: TextStyle(
                      color: _getStatusColor(correction.approvalStatus),
                      fontWeight: FontWeight.w500,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Date and time row
            Row(
              children: [
                const Icon(Icons.calendar_today,
                    size: 16, color: AppColors.textTertiary),
                const SizedBox(width: 6),
                Text(
                  _formatDate(correction.correctionDate),
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
                const SizedBox(width: 16),
                const Icon(Icons.access_time,
                    size: 16, color: AppColors.textTertiary),
                const SizedBox(width: 6),
                Text(
                  correction.correctionTime,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: AppColors.primary,
                      ),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Reason
            Text(
              correction.reason,
              style: const TextStyle(color: AppColors.textSecondary),
            ),

            // Workflow status
            if (correction.workflowStatus != null ||
                correction.currentApproverName != null) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.route, size: 16, color: AppColors.textTertiary),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        correction.currentApproverName != null
                            ? 'Pending: ${correction.currentApproverName}'
                            : correction.workflowStatus ?? '',
                        style: const TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            // Rejection reason
            if (correction.rejectionReason != null &&
                correction.rejectionReason!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.error.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.error.withOpacity(0.2)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.comment, size: 16, color: AppColors.error),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        correction.rejectionReason!,
                        style: const TextStyle(
                          color: AppColors.error,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            // Approved by info
            if (correction.approvedByName != null) ...[
              const SizedBox(height: 8),
              Text(
                'Approved by: ${correction.approvedByName}',
                style: const TextStyle(
                  color: AppColors.textTertiary,
                  fontSize: 12,
                ),
              ),
            ],

            // Cancel button
            if (showCancel) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: onCancel,
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.error,
                    side: const BorderSide(color: AppColors.error),
                  ),
                  child: const Text('Cancel Request'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  String _formatDate(String dateStr) {
    try {
      final date = DateTime.parse(dateStr);
      return DateFormat('MMM dd, yyyy').format(date);
    } catch (_) {
      return dateStr;
    }
  }

  Color _getTypeColor(AttendanceCorrectionType type) {
    switch (type) {
      case AttendanceCorrectionType.checkIn:
        return AppColors.success;
      case AttendanceCorrectionType.checkOut:
        return AppColors.info;
    }
  }

  IconData _getTypeIcon(AttendanceCorrectionType type) {
    switch (type) {
      case AttendanceCorrectionType.checkIn:
        return Icons.login;
      case AttendanceCorrectionType.checkOut:
        return Icons.logout;
    }
  }

  String _getTypeName(AttendanceCorrectionType type) {
    switch (type) {
      case AttendanceCorrectionType.checkIn:
        return 'Check In';
      case AttendanceCorrectionType.checkOut:
        return 'Check Out';
    }
  }

  Color _getStatusColor(CorrectionApprovalStatus status) {
    switch (status) {
      case CorrectionApprovalStatus.pending:
        return AppColors.warning;
      case CorrectionApprovalStatus.approved:
        return AppColors.success;
      case CorrectionApprovalStatus.rejected:
        return AppColors.error;
      case CorrectionApprovalStatus.cancelled:
        return AppColors.textTertiary;
    }
  }

  String _getStatusName(CorrectionApprovalStatus status) {
    switch (status) {
      case CorrectionApprovalStatus.pending:
        return 'Pending';
      case CorrectionApprovalStatus.approved:
        return 'Approved';
      case CorrectionApprovalStatus.rejected:
        return 'Rejected';
      case CorrectionApprovalStatus.cancelled:
        return 'Cancelled';
    }
  }
}

/// Create correction bottom sheet.
class _CreateCorrectionSheet extends ConsumerStatefulWidget {
  const _CreateCorrectionSheet();

  @override
  ConsumerState<_CreateCorrectionSheet> createState() =>
      _CreateCorrectionSheetState();
}

class _CreateCorrectionSheetState
    extends ConsumerState<_CreateCorrectionSheet> {
  AttendanceCorrectionType _selectedType = AttendanceCorrectionType.checkIn;
  DateTime _selectedDate = DateTime.now().subtract(const Duration(days: 1));
  TimeOfDay _selectedTime = const TimeOfDay(hour: 8, minute: 0);
  final _reasonController = TextEditingController();
  bool _isSubmitting = false;
  String? _reasonError;

  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  String _formatTime(TimeOfDay time) {
    return '${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}';
  }

  String _formatTimeDisplay(TimeOfDay time) {
    final hour = time.hour > 12
        ? time.hour - 12
        : (time.hour == 0 ? 12 : time.hour);
    final period = time.hour >= 12 ? 'PM' : 'AM';
    return '${hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')} $period';
  }

  @override
  Widget build(BuildContext context) {
    final now = DateTime.now();
    final yesterday = DateTime(now.year, now.month, now.day)
        .subtract(const Duration(days: 1));
    final minDate = DateTime(now.year, now.month, now.day)
        .subtract(const Duration(days: 30));

    return Padding(
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 24,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'New Correction Request',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Correction type dropdown
            AppDropdown<AttendanceCorrectionType>(
              label: 'Correction Type',
              value: _selectedType,
              items: AttendanceCorrectionType.values.map((type) {
                return DropdownMenuItem(
                  value: type,
                  child: Row(
                    children: [
                      Icon(
                        type == AttendanceCorrectionType.checkIn
                            ? Icons.login
                            : Icons.logout,
                        size: 18,
                        color: type == AttendanceCorrectionType.checkIn
                            ? AppColors.success
                            : AppColors.info,
                      ),
                      const SizedBox(width: 8),
                      Text(type == AttendanceCorrectionType.checkIn
                          ? 'Check In'
                          : 'Check Out'),
                    ],
                  ),
                );
              }).toList(),
              onChanged: (value) {
                if (value != null) setState(() => _selectedType = value);
              },
            ),
            const SizedBox(height: 16),

            // Date picker
            AppDateField(
              label: 'Correction Date',
              value: _selectedDate,
              firstDate: minDate,
              lastDate: yesterday,
              onChanged: (date) => setState(() => _selectedDate = date),
            ),
            const SizedBox(height: 16),

            // Time picker
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Correction Time',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                ),
                const SizedBox(height: 8),
                InkWell(
                  onTap: () async {
                    final time = await showTimePicker(
                      context: context,
                      initialTime: _selectedTime,
                    );
                    if (time != null) setState(() => _selectedTime = time);
                  },
                  borderRadius: BorderRadius.circular(12),
                  child: InputDecorator(
                    decoration: const InputDecoration(
                      suffixIcon: Icon(Icons.access_time),
                    ),
                    child: Text(
                      _formatTimeDisplay(_selectedTime),
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Reason
            AppTextField(
              controller: _reasonController,
              label: 'Reason',
              hint: 'Explain why you need this correction (min 10 characters)...',
              maxLines: 3,
              errorText: _reasonError,
              onChanged: (_) {
                if (_reasonError != null) {
                  setState(() => _reasonError = null);
                }
              },
            ),
            const SizedBox(height: 24),

            // Submit button
            AppButton(
              label: 'Submit Correction',
              width: double.infinity,
              isLoading: _isSubmitting,
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    // Validate reason
    final reason = _reasonController.text.trim();
    if (reason.isEmpty) {
      setState(() => _reasonError = 'Please enter a reason');
      return;
    }
    if (reason.length < 10) {
      setState(
          () => _reasonError = 'Reason must be at least 10 characters long');
      return;
    }

    final dashboardState = ref.read(dashboardNotifierProvider);
    final employeeId = dashboardState.data?.employeeId;
    if (employeeId == null || employeeId == 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Employee data not loaded. Please try again.')),
      );
      return;
    }

    setState(() => _isSubmitting = true);

    final correctionTypeValue =
        _selectedType == AttendanceCorrectionType.checkIn ? 1 : 2;

    final success = await ref
        .read(attendanceCorrectionNotifierProvider.notifier)
        .createCorrection(
          employeeId: employeeId,
          correctionDate: _selectedDate.toIso8601String().split('T').first,
          correctionTime: _formatTime(_selectedTime),
          correctionType: correctionTypeValue,
          reason: reason,
        );

    setState(() => _isSubmitting = false);

    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Correction request submitted successfully'),
          backgroundColor: Colors.green,
        ),
      );
    } else if (mounted) {
      final errorState = ref.read(attendanceCorrectionNotifierProvider);
      if (errorState.error != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(errorState.error!),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }
}
