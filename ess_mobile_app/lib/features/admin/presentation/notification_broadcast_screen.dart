import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/models/notification_broadcast_model.dart';
import '../../../shared/providers/broadcast_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Notification broadcast screen.
class NotificationBroadcastScreen extends ConsumerStatefulWidget {
  const NotificationBroadcastScreen({super.key});

  @override
  ConsumerState<NotificationBroadcastScreen> createState() => _NotificationBroadcastScreenState();
}

class _NotificationBroadcastScreenState extends ConsumerState<NotificationBroadcastScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(broadcastProvider.notifier).loadAll();
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(broadcastProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notification Broadcast'),
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(broadcastProvider.notifier).loadAll(),
                )
              : RefreshIndicator(
                  onRefresh: () => ref.read(broadcastProvider.notifier).loadAll(),
                  child: ListView(
                    padding: const EdgeInsets.all(16),
                    children: [
                      // Stats card
                      _BroadcastStatsCard(broadcasts: state.broadcasts),
                      const SizedBox(height: 24),
                      
                      // History
                      Text(
                        'Broadcast History',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 12),
                      
                      if (state.broadcasts.isEmpty)
                        const AppEmpty(
                          message: 'No broadcasts sent yet',
                          icon: Icons.campaign,
                        )
                      else
                        ...state.broadcasts.map((broadcast) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _BroadcastCard(broadcast: broadcast),
                        )),
                    ],
                  ),
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showCreateSheet(context),
        icon: const Icon(Icons.campaign),
        label: const Text('New Broadcast'),
      ),
    );
  }
  
  void _showCreateSheet(BuildContext context) {
    final state = ref.read(broadcastProvider);
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _CreateBroadcastSheet(
        branches: state.branches,
        departments: state.departments,
      ),
    );
  }
}

/// Broadcast stats card.
class _BroadcastStatsCard extends StatelessWidget {
  final List<NotificationBroadcast> broadcasts;
  
  const _BroadcastStatsCard({required this.broadcasts});

  @override
  Widget build(BuildContext context) {
    final totalSent = broadcasts.length;
    final totalDelivered = broadcasts.fold<int>(0, (sum, b) => sum + (b.deliveredCount ?? 0));
    final totalRead = broadcasts.fold<int>(0, (sum, b) => sum + (b.readCount ?? 0));
    
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.info, AppColors.info.withOpacity(0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppColors.info.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _StatItem(
            value: '$totalSent',
            label: 'Sent',
            icon: Icons.send,
          ),
          Container(
            width: 1,
            height: 40,
            color: Colors.white24,
          ),
          _StatItem(
            value: '$totalDelivered',
            label: 'Delivered',
            icon: Icons.done_all,
          ),
          Container(
            width: 1,
            height: 40,
            color: Colors.white24,
          ),
          _StatItem(
            value: '$totalRead',
            label: 'Read',
            icon: Icons.visibility,
          ),
        ],
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String value;
  final String label;
  final IconData icon;
  
  const _StatItem({
    required this.value,
    required this.label,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 20,
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

/// Broadcast history card.
class _BroadcastCard extends StatelessWidget {
  final NotificationBroadcast broadcast;
  
  const _BroadcastCard({required this.broadcast});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy HH:mm');
    
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.info.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(Icons.campaign, color: AppColors.info),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        broadcast.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      if (broadcast.sentAt != null)
                        Text(
                          dateFormat.format(broadcast.sentAt!),
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 12,
                          ),
                        ),
                    ],
                  ),
                ),
                _TargetBadge(
                  targetType: broadcast.targetType,
                  targetName: broadcast.targetName,
                ),
              ],
            ),
            const SizedBox(height: 12),
            
            Text(
              broadcast.message,
              style: TextStyle(color: AppColors.textSecondary),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 12),
            
            // Delivery stats
            Row(
              children: [
                _DeliveryStat(
                  icon: Icons.people,
                  value: broadcast.recipientCount ?? 0,
                  label: 'Recipients',
                ),
                const SizedBox(width: 16),
                _DeliveryStat(
                  icon: Icons.done_all,
                  value: broadcast.deliveredCount ?? 0,
                  label: 'Delivered',
                  color: AppColors.success,
                ),
                const SizedBox(width: 16),
                _DeliveryStat(
                  icon: Icons.visibility,
                  value: broadcast.readCount ?? 0,
                  label: 'Read',
                  color: AppColors.info,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _TargetBadge extends StatelessWidget {
  final BroadcastTargetType targetType;
  final String? targetName;
  
  const _TargetBadge({
    required this.targetType,
    this.targetName,
  });

  @override
  Widget build(BuildContext context) {
    String label;
    Color color;
    
    switch (targetType) {
      case BroadcastTargetType.all:
        label = 'All';
        color = AppColors.primary;
        break;
      case BroadcastTargetType.branch:
        label = targetName ?? 'Branch';
        color = AppColors.secondary;
        break;
      case BroadcastTargetType.department:
        label = targetName ?? 'Department';
        color = AppColors.info;
        break;
      case BroadcastTargetType.individual:
        label = 'Individual';
        color = AppColors.warning;
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
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class _DeliveryStat extends StatelessWidget {
  final IconData icon;
  final int value;
  final String label;
  final Color? color;
  
  const _DeliveryStat({
    required this.icon,
    required this.value,
    required this.label,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final statColor = color ?? AppColors.textSecondary;
    
    return Row(
      children: [
        Icon(icon, size: 14, color: statColor),
        const SizedBox(width: 4),
        Text(
          '$value',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: statColor,
          ),
        ),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            color: AppColors.textTertiary,
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}

/// Create broadcast bottom sheet.
class _CreateBroadcastSheet extends ConsumerStatefulWidget {
  final List<dynamic> branches;
  final List<dynamic> departments;
  
  const _CreateBroadcastSheet({
    required this.branches,
    required this.departments,
  });

  @override
  ConsumerState<_CreateBroadcastSheet> createState() => _CreateBroadcastSheetState();
}

class _CreateBroadcastSheetState extends ConsumerState<_CreateBroadcastSheet> {
  final _titleController = TextEditingController();
  final _messageController = TextEditingController();
  BroadcastTargetType _targetType = BroadcastTargetType.all;
  String? _targetId;
  bool _sendPush = true;
  bool _isSubmitting = false;
  
  @override
  void dispose() {
    _titleController.dispose();
    _messageController.dispose();
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
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Send Broadcast',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 24),
            
            // Title
            AppTextField(
              controller: _titleController,
              label: 'Title',
              hint: 'Notification title',
              prefixIcon: Icons.title,
            ),
            const SizedBox(height: 16),
            
            // Message
            AppTextField(
              controller: _messageController,
              label: 'Message',
              hint: 'Notification message',
              maxLines: 3,
              prefixIcon: Icons.message,
            ),
            const SizedBox(height: 16),
            
            // Target type
            Text(
              'Send To',
              style: TextStyle(
                fontWeight: FontWeight.w500,
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: [
                _TargetChip(
                  label: 'Everyone',
                  icon: Icons.public,
                  selected: _targetType == BroadcastTargetType.all,
                  onTap: () => setState(() {
                    _targetType = BroadcastTargetType.all;
                    _targetId = null;
                  }),
                ),
                _TargetChip(
                  label: 'Branch',
                  icon: Icons.business,
                  selected: _targetType == BroadcastTargetType.branch,
                  onTap: () => setState(() {
                    _targetType = BroadcastTargetType.branch;
                    _targetId = null;
                  }),
                ),
                _TargetChip(
                  label: 'Department',
                  icon: Icons.groups,
                  selected: _targetType == BroadcastTargetType.department,
                  onTap: () => setState(() {
                    _targetType = BroadcastTargetType.department;
                    _targetId = null;
                  }),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            // Target selection
            if (_targetType == BroadcastTargetType.branch)
              AppDropdownField<String>(
                label: 'Select Branch',
                hint: 'Choose a branch',
                value: _targetId,
                items: widget.branches.map((b) => DropdownMenuItem(
                  value: b.id as String,
                  child: Text(b.name as String),
                )).toList(),
                onChanged: (value) => setState(() => _targetId = value),
              )
            else if (_targetType == BroadcastTargetType.department)
              AppDropdownField<String>(
                label: 'Select Department',
                hint: 'Choose a department',
                value: _targetId,
                items: widget.departments.map((d) => DropdownMenuItem(
                  value: d.id as String,
                  child: Text(d.name as String),
                )).toList(),
                onChanged: (value) => setState(() => _targetId = value),
              ),
            
            if (_targetType != BroadcastTargetType.all)
              const SizedBox(height: 16),
            
            // Push notification toggle
            SwitchListTile(
              title: const Text('Send Push Notification'),
              subtitle: const Text('Also send as push notification to devices'),
              value: _sendPush,
              onChanged: (value) => setState(() => _sendPush = value),
              contentPadding: EdgeInsets.zero,
            ),
            const SizedBox(height: 24),
            
            // Send button
            AppButton(
              label: 'Send Broadcast',
              width: double.infinity,
              isLoading: _isSubmitting,
              onPressed: _canSubmit ? _submit : null,
            ),
          ],
        ),
      ),
    );
  }
  
  bool get _canSubmit {
    if (_titleController.text.isEmpty) return false;
    if (_messageController.text.isEmpty) return false;
    if (_targetType != BroadcastTargetType.all && _targetId == null) return false;
    return true;
  }
  
  Future<void> _submit() async {
    setState(() => _isSubmitting = true);
    
    final success = await ref.read(broadcastProvider.notifier).sendBroadcast(
      title: _titleController.text,
      message: _messageController.text,
      targetType: _targetType,
      targetId: _targetId,
      sendPush: _sendPush,
    );
    
    setState(() => _isSubmitting = false);
    
    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Broadcast sent successfully'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }
}

class _TargetChip extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;
  
  const _TargetChip({
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? AppColors.primary : AppColors.surfaceVariant,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 16,
              color: selected ? Colors.white : AppColors.textSecondary,
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                color: selected ? Colors.white : AppColors.textSecondary,
                fontWeight: selected ? FontWeight.w600 : FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
