import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/excuse_model.dart';
import '../../../shared/providers/excuse_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Screen for managing excuse requests.
class ExcuseListScreen extends ConsumerStatefulWidget {
  const ExcuseListScreen({super.key});

  @override
  ConsumerState<ExcuseListScreen> createState() => _ExcuseListScreenState();
}

class _ExcuseListScreenState extends ConsumerState<ExcuseListScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    
    // Load excuses on init
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(excuseNotifierProvider.notifier).loadExcuses();
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
    final state = ref.watch(excuseNotifierProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Excuses'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: '${l10n.pending} (${state.pendingRequests.length})'),
            Tab(text: '${l10n.approved} (${state.approvedRequests.length})'),
            Tab(text: '${l10n.rejected} (${state.rejectedRequests.length})'),
          ],
        ),
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(excuseNotifierProvider.notifier).loadExcuses(),
                )
              : TabBarView(
                  controller: _tabController,
                  children: [
                    _buildExcuseList(state.pendingRequests, showCancel: true),
                    _buildExcuseList(state.approvedRequests),
                    _buildExcuseList(state.rejectedRequests),
                  ],
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateExcuseSheet(context),
        icon: const Icon(Icons.add),
        label: const Text('Request Excuse'),
      ),
    );
  }
  
  Widget _buildExcuseList(List<ExcuseRequest> requests, {bool showCancel = false}) {
    if (requests.isEmpty) {
      return const AppEmpty(
        message: 'No excuse requests',
        icon: Icons.assignment_outlined,
      );
    }
    
    return RefreshIndicator(
      onRefresh: () => ref.read(excuseNotifierProvider.notifier).loadExcuses(),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: requests.length,
        itemBuilder: (context, index) {
          final excuse = requests[index];
          return _ExcuseCard(
            excuse: excuse,
            showCancel: showCancel,
            onCancel: () => _cancelExcuse(excuse.id),
          );
        },
      ),
    );
  }
  
  void _showCreateExcuseSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => const _CreateExcuseSheet(),
    );
  }
  
  Future<void> _cancelExcuse(String id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Excuse'),
        content: const Text('Are you sure you want to cancel this excuse request?'),
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
      await ref.read(excuseNotifierProvider.notifier).cancelExcuse(id);
    }
  }
}

/// Excuse card widget.
class _ExcuseCard extends StatelessWidget {
  final ExcuseRequest excuse;
  final bool showCancel;
  final VoidCallback? onCancel;
  
  const _ExcuseCard({
    required this.excuse,
    this.showCancel = false,
    this.onCancel,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');
    final timeFormat = DateFormat('HH:mm');
    
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
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getTypeColor(excuse.type).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    _getTypeName(excuse.type),
                    style: TextStyle(
                      color: _getTypeColor(excuse.type),
                      fontWeight: FontWeight.w500,
                      fontSize: 12,
                    ),
                  ),
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _getStatusColor(excuse.status).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    _getStatusName(excuse.status),
                    style: TextStyle(
                      color: _getStatusColor(excuse.status),
                      fontWeight: FontWeight.w500,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              dateFormat.format(excuse.excuseDate),
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              excuse.reason,
              style: TextStyle(color: AppColors.textSecondary),
            ),
            if (excuse.minutesDifference != null) ...[
              const SizedBox(height: 8),
              Text(
                '${excuse.minutesDifference} minutes difference',
                style: TextStyle(
                  color: AppColors.textTertiary,
                  fontSize: 12,
                ),
              ),
            ],
            if (excuse.managerNotes != null) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    Icon(Icons.comment, size: 16, color: AppColors.textTertiary),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        excuse.managerNotes!,
                        style: TextStyle(
                          color: AppColors.textSecondary,
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
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: onCancel,
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.error,
                    side: BorderSide(color: AppColors.error),
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
  
  Color _getTypeColor(ExcuseType type) {
    switch (type) {
      case ExcuseType.lateArrival:
        return AppColors.warning;
      case ExcuseType.earlyDeparture:
        return AppColors.info;
      case ExcuseType.missedPunch:
        return AppColors.error;
      case ExcuseType.other:
        return AppColors.textSecondary;
    }
  }
  
  String _getTypeName(ExcuseType type) {
    switch (type) {
      case ExcuseType.lateArrival:
        return 'Late Arrival';
      case ExcuseType.earlyDeparture:
        return 'Early Departure';
      case ExcuseType.missedPunch:
        return 'Missed Punch';
      case ExcuseType.other:
        return 'Other';
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
  
  String _getStatusName(ExcuseStatus status) {
    switch (status) {
      case ExcuseStatus.pending:
        return 'Pending';
      case ExcuseStatus.approved:
        return 'Approved';
      case ExcuseStatus.rejected:
        return 'Rejected';
    }
  }
}

/// Create excuse bottom sheet.
class _CreateExcuseSheet extends ConsumerStatefulWidget {
  const _CreateExcuseSheet();

  @override
  ConsumerState<_CreateExcuseSheet> createState() => _CreateExcuseSheetState();
}

class _CreateExcuseSheetState extends ConsumerState<_CreateExcuseSheet> {
  ExcuseType _selectedType = ExcuseType.lateArrival;
  DateTime _selectedDate = DateTime.now();
  final _reasonController = TextEditingController();
  bool _isSubmitting = false;
  
  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 24,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Request Excuse',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          // Type dropdown
          AppDropdown<ExcuseType>(
            label: 'Excuse Type',
            value: _selectedType,
            items: ExcuseType.values.map((type) {
              return DropdownMenuItem(
                value: type,
                child: Text(_getTypeName(type)),
              );
            }).toList(),
            onChanged: (value) {
              if (value != null) setState(() => _selectedType = value);
            },
          ),
          const SizedBox(height: 16),
          
          // Date picker
          AppDateField(
            label: 'Date',
            value: _selectedDate,
            firstDate: DateTime.now().subtract(const Duration(days: 30)),
            lastDate: DateTime.now(),
            onChanged: (date) => setState(() => _selectedDate = date),
          ),
          const SizedBox(height: 16),
          
          // Reason
          AppTextField(
            controller: _reasonController,
            label: 'Reason',
            hint: 'Explain your reason...',
            maxLines: 3,
          ),
          const SizedBox(height: 24),
          
          // Submit button
          AppButton(
            label: 'Submit Request',
            width: double.infinity,
            isLoading: _isSubmitting,
            onPressed: _submit,
          ),
        ],
      ),
    );
  }
  
  String _getTypeName(ExcuseType type) {
    switch (type) {
      case ExcuseType.lateArrival:
        return 'Late Arrival';
      case ExcuseType.earlyDeparture:
        return 'Early Departure';
      case ExcuseType.missedPunch:
        return 'Missed Punch';
      case ExcuseType.other:
        return 'Other';
    }
  }
  
  Future<void> _submit() async {
    if (_reasonController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a reason')),
      );
      return;
    }
    
    setState(() => _isSubmitting = true);
    
    final success = await ref.read(excuseNotifierProvider.notifier).createExcuse(
      type: _selectedType,
      excuseDate: _selectedDate,
      reason: _reasonController.text,
    );
    
    setState(() => _isSubmitting = false);
    
    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Excuse request submitted'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }
}
