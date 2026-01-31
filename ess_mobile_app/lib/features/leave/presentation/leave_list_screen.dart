import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';

/// Leave list screen showing user's leave requests.
class LeaveListScreen extends ConsumerWidget {
  const LeaveListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.myLeaves),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // TODO: Navigate to create leave request
          _showCreateLeaveDialog(context);
        },
        icon: const Icon(Icons.add),
        label: Text(l10n.requestLeave),
      ),
      body: DefaultTabController(
        length: 3,
        child: Column(
          children: [
            // Tab bar
            Container(
              color: theme.colorScheme.surface,
              child: TabBar(
                tabs: [
                  Tab(text: l10n.pending),
                  Tab(text: l10n.approved),
                  Tab(text: l10n.rejected),
                ],
              ),
            ),
            
            // Tab content
            Expanded(
              child: TabBarView(
                children: [
                  _buildLeaveList(context, 'pending'),
                  _buildLeaveList(context, 'approved'),
                  _buildLeaveList(context, 'rejected'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLeaveList(BuildContext context, String status) {
    // Placeholder data
    final leaves = _getPlaceholderLeaves(status);
    
    if (leaves.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.event_busy,
              size: 64,
              color: AppColors.textTertiary,
            ),
            const SizedBox(height: 16),
            Text(
              'No $status leave requests',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: leaves.length,
      itemBuilder: (context, index) {
        final leave = leaves[index];
        return _LeaveCard(leave: leave);
      },
    );
  }

  List<Map<String, dynamic>> _getPlaceholderLeaves(String status) {
    if (status == 'pending') {
      return [
        {
          'type': 'Annual Leave',
          'startDate': 'Feb 10, 2026',
          'endDate': 'Feb 12, 2026',
          'days': 3,
          'status': 'Pending',
          'reason': 'Family vacation',
        },
      ];
    } else if (status == 'approved') {
      return [
        {
          'type': 'Annual Leave',
          'startDate': 'Jan 15, 2026',
          'endDate': 'Jan 16, 2026',
          'days': 2,
          'status': 'Approved',
          'reason': 'Personal matters',
        },
        {
          'type': 'Sick Leave',
          'startDate': 'Dec 20, 2025',
          'endDate': 'Dec 20, 2025',
          'days': 1,
          'status': 'Approved',
          'reason': 'Flu',
        },
      ];
    }
    return [];
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
}

class _LeaveCard extends StatelessWidget {
  final Map<String, dynamic> leave;

  const _LeaveCard({required this.leave});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final status = leave['status'] as String;
    
    Color statusColor;
    switch (status.toLowerCase()) {
      case 'approved':
        statusColor = AppColors.success;
        break;
      case 'rejected':
        statusColor = AppColors.error;
        break;
      default:
        statusColor = AppColors.warning;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
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
                    leave['type'],
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
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    status,
                    style: TextStyle(
                      color: statusColor,
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
                  color: AppColors.textSecondary,
                ),
                const SizedBox(width: 8),
                Text(
                  '${leave['startDate']} - ${leave['endDate']}',
                  style: theme.textTheme.bodyMedium,
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceVariant,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    '${leave['days']} days',
                    style: theme.textTheme.bodySmall?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
            if (leave['reason'] != null) ...[
              const SizedBox(height: 12),
              Text(
                leave['reason'],
                style: theme.textTheme.bodySmall?.copyWith(
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _CreateLeaveForm extends StatefulWidget {
  final ScrollController scrollController;

  const _CreateLeaveForm({required this.scrollController});

  @override
  State<_CreateLeaveForm> createState() => _CreateLeaveFormState();
}

class _CreateLeaveFormState extends State<_CreateLeaveForm> {
  final _formKey = GlobalKey<FormState>();
  String? _selectedLeaveType;
  DateTime? _startDate;
  DateTime? _endDate;
  final _reasonController = TextEditingController();

  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

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

            // Leave type dropdown
            DropdownButtonFormField<String>(
              value: _selectedLeaveType,
              decoration: InputDecoration(
                labelText: l10n.leaveType,
                prefixIcon: const Icon(Icons.category),
              ),
              items: const [
                DropdownMenuItem(value: 'annual', child: Text('Annual Leave')),
                DropdownMenuItem(value: 'sick', child: Text('Sick Leave')),
                DropdownMenuItem(value: 'personal', child: Text('Personal Leave')),
                DropdownMenuItem(value: 'unpaid', child: Text('Unpaid Leave')),
              ],
              onChanged: (value) {
                setState(() => _selectedLeaveType = value);
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
                  ? '${_startDate!.day}/${_startDate!.month}/${_startDate!.year}'
                  : l10n.startDate),
              subtitle: _startDate == null ? const Text('Tap to select') : null,
              tileColor: AppColors.surfaceVariant,
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
                  ? '${_endDate!.day}/${_endDate!.month}/${_endDate!.year}'
                  : l10n.endDate),
              subtitle: _endDate == null ? const Text('Tap to select') : null,
              tileColor: AppColors.surfaceVariant,
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
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return 'Please provide a reason';
                }
                return null;
              },
            ),
            const SizedBox(height: 32),

            // Submit button
            SizedBox(
              height: 56,
              child: ElevatedButton(
                onPressed: _submit,
                child: Text(l10n.submit),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      if (_startDate == null || _endDate == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please select dates')),
        );
        return;
      }

      // TODO: Submit leave request via API
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Leave request submitted')),
      );
    }
  }
}
