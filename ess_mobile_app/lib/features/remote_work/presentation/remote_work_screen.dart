import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/remote_work_model.dart';
import '../../../shared/providers/remote_work_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Remote work request screen.
class RemoteWorkScreen extends ConsumerStatefulWidget {
  const RemoteWorkScreen({super.key});

  @override
  ConsumerState<RemoteWorkScreen> createState() => _RemoteWorkScreenState();
}

class _RemoteWorkScreenState extends ConsumerState<RemoteWorkScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(remoteWorkProvider.notifier).loadAll();
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
    final state = ref.watch(remoteWorkProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Remote Work'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: '${l10n.pending} (${state.pendingRequests.length})'),
            Tab(text: '${l10n.approved} (${state.approvedRequests.length})'),
            Tab(text: '${l10n.rejected} (${state.rejectedRequests.length})'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Policy info card
          if (state.policy != null && !state.isLoading)
            _PolicyInfoCard(
              policy: state.policy!,
              remainingDays: state.remainingDays,
            ),
          
          // Request list
          Expanded(
            child: state.isLoading
                ? const AppLoading()
                : state.error != null
                    ? AppError(
                        message: state.error,
                        onRetry: () => ref.read(remoteWorkProvider.notifier).loadAll(),
                      )
                    : TabBarView(
                        controller: _tabController,
                        children: [
                          _buildRequestList(state.pendingRequests, showCancel: true),
                          _buildRequestList(state.approvedRequests),
                          _buildRequestList(state.rejectedRequests),
                        ],
                      ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateSheet(context),
        icon: const Icon(Icons.add),
        label: const Text('Request'),
      ),
    );
  }
  
  Widget _buildRequestList(List<RemoteWorkRequest> requests, {bool showCancel = false}) {
    if (requests.isEmpty) {
      return const AppEmpty(
        message: 'No remote work requests',
        icon: Icons.home_work_outlined,
      );
    }
    
    return RefreshIndicator(
      onRefresh: () => ref.read(remoteWorkProvider.notifier).loadAll(),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: requests.length,
        itemBuilder: (context, index) {
          final request = requests[index];
          return _RemoteWorkCard(
            request: request,
            showCancel: showCancel,
            onCancel: () => _cancelRequest(request.id),
          );
        },
      ),
    );
  }
  
  void _showCreateSheet(BuildContext context) {
    final state = ref.read(remoteWorkProvider);
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _CreateRemoteWorkSheet(
        policy: state.policy,
        remainingDays: state.remainingDays,
      ),
    );
  }
  
  Future<void> _cancelRequest(String id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Request'),
        content: const Text('Are you sure you want to cancel this request?'),
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
      await ref.read(remoteWorkProvider.notifier).cancelRequest(id);
    }
  }
}

/// Policy information card.
class _PolicyInfoCard extends StatelessWidget {
  final RemoteWorkPolicy policy;
  final int remainingDays;
  
  const _PolicyInfoCard({
    required this.policy,
    required this.remainingDays,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.info, AppColors.info.withOpacity(0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.home_work, color: Colors.white, size: 28),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Remote Work Days',
                  style: TextStyle(color: Colors.white70),
                ),
                Text(
                  '$remainingDays days remaining',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  'Max ${policy.maxDaysPerMonth} days/month',
                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              '${policy.advanceNoticeDays}d notice',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Remote work request card.
class _RemoteWorkCard extends StatelessWidget {
  final RemoteWorkRequest request;
  final bool showCancel;
  final VoidCallback? onCancel;
  
  const _RemoteWorkCard({
    required this.request,
    this.showCancel = false,
    this.onCancel,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');
    final days = request.endDate.difference(request.startDate).inDays + 1;
    
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
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.info.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(Icons.home_work, color: AppColors.info),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '$days day${days > 1 ? 's' : ''} Remote Work',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        '${dateFormat.format(request.startDate)} - ${dateFormat.format(request.endDate)}',
                        style: TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
                _StatusBadge(status: request.status),
              ],
            ),
            const SizedBox(height: 12),
            
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.description, size: 16, color: AppColors.textTertiary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      request.reason,
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                  ),
                ],
              ),
            ),
            
            if (request.workLocation != null) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(Icons.location_on, size: 16, color: AppColors.textTertiary),
                  const SizedBox(width: 4),
                  Text(
                    request.workLocation!,
                    style: TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ],
            
            if (request.managerNotes != null) ...[
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: _getStatusColor(request.status).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: _getStatusColor(request.status).withOpacity(0.3),
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.comment,
                      size: 16,
                      color: _getStatusColor(request.status),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        request.managerNotes!,
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
  
  Color _getStatusColor(RemoteWorkStatus status) {
    switch (status) {
      case RemoteWorkStatus.pending:
        return AppColors.warning;
      case RemoteWorkStatus.approved:
        return AppColors.success;
      case RemoteWorkStatus.rejected:
        return AppColors.error;
      case RemoteWorkStatus.cancelled:
        return AppColors.textSecondary;
    }
  }
}

class _StatusBadge extends StatelessWidget {
  final RemoteWorkStatus status;
  
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    Color color;
    String label;
    
    switch (status) {
      case RemoteWorkStatus.pending:
        color = AppColors.warning;
        label = 'Pending';
        break;
      case RemoteWorkStatus.approved:
        color = AppColors.success;
        label = 'Approved';
        break;
      case RemoteWorkStatus.rejected:
        color = AppColors.error;
        label = 'Rejected';
        break;
      case RemoteWorkStatus.cancelled:
        color = AppColors.textSecondary;
        label = 'Cancelled';
        break;
    }
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w500,
          fontSize: 12,
        ),
      ),
    );
  }
}

/// Create remote work request sheet.
class _CreateRemoteWorkSheet extends ConsumerStatefulWidget {
  final RemoteWorkPolicy? policy;
  final int remainingDays;
  
  const _CreateRemoteWorkSheet({
    this.policy,
    required this.remainingDays,
  });

  @override
  ConsumerState<_CreateRemoteWorkSheet> createState() => _CreateRemoteWorkSheetState();
}

class _CreateRemoteWorkSheetState extends ConsumerState<_CreateRemoteWorkSheet> {
  DateTime _startDate = DateTime.now().add(const Duration(days: 1));
  DateTime _endDate = DateTime.now().add(const Duration(days: 1));
  final _reasonController = TextEditingController();
  final _locationController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _isSubmitting = false;
  
  @override
  void dispose() {
    _reasonController.dispose();
    _locationController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final days = _endDate.difference(_startDate).inDays + 1;
    
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Request Remote Work',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 8),
            
            // Remaining days info
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.info.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  Icon(Icons.info_outline, color: AppColors.info, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    'You have ${widget.remainingDays} remote days remaining this month',
                    style: TextStyle(color: AppColors.info),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            
            // Date range
            Row(
              children: [
                Expanded(
                  child: AppDateField(
                    label: 'Start Date',
                    value: _startDate,
                    firstDate: DateTime.now(),
                    lastDate: DateTime.now().add(const Duration(days: 90)),
                    onChanged: (date) => setState(() {
                      _startDate = date;
                      if (_endDate.isBefore(_startDate)) {
                        _endDate = _startDate;
                      }
                    }),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: AppDateField(
                    label: 'End Date',
                    value: _endDate,
                    firstDate: _startDate,
                    lastDate: DateTime.now().add(const Duration(days: 90)),
                    onChanged: (date) => setState(() => _endDate = date),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              '$days day${days > 1 ? 's' : ''} of remote work',
              style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
            ),
            const SizedBox(height: 16),
            
            // Reason
            AppTextField(
              controller: _reasonController,
              label: 'Reason',
              hint: 'Why do you need to work remotely?',
              maxLines: 2,
            ),
            const SizedBox(height: 16),
            
            // Work location
            AppTextField(
              controller: _locationController,
              label: 'Work Location (Optional)',
              hint: 'e.g., Home, Coffee Shop, Co-working Space',
              prefixIcon: Icons.location_on_outlined,
            ),
            const SizedBox(height: 16),
            
            // Contact phone
            AppTextField(
              controller: _phoneController,
              label: 'Contact Phone (Optional)',
              hint: 'Alternative contact number',
              prefixIcon: Icons.phone_outlined,
              keyboardType: TextInputType.phone,
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
      ),
    );
  }
  
  Future<void> _submit() async {
    if (_reasonController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter a reason')),
      );
      return;
    }
    
    final days = _endDate.difference(_startDate).inDays + 1;
    if (days > widget.remainingDays) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('You only have ${widget.remainingDays} days remaining'),
          backgroundColor: AppColors.error,
        ),
      );
      return;
    }
    
    setState(() => _isSubmitting = true);
    
    final success = await ref.read(remoteWorkProvider.notifier).createRequest(
      startDate: _startDate,
      endDate: _endDate,
      reason: _reasonController.text,
      workLocation: _locationController.text.isEmpty ? null : _locationController.text,
      contactPhone: _phoneController.text.isEmpty ? null : _phoneController.text,
    );
    
    setState(() => _isSubmitting = false);
    
    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Remote work request submitted'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }
}
