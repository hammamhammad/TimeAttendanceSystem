import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';

/// Notifications screen showing in-app notifications.
class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    // Placeholder notifications
    final notifications = _getPlaceholderNotifications();

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.notifications),
        actions: [
          if (notifications.isNotEmpty)
            TextButton(
              onPressed: () {
                // TODO: Mark all as read
              },
              child: Text(l10n.markAllRead),
            ),
        ],
      ),
      body: notifications.isEmpty
          ? _buildEmptyState(context, l10n)
          : _buildNotificationsList(context, notifications),
    );
  }

  Widget _buildEmptyState(BuildContext context, AppLocalizations l10n) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: AppColors.surfaceVariant,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.notifications_none,
              size: 48,
              color: AppColors.textTertiary,
            ),
          ),
          const SizedBox(height: 24),
          Text(
            l10n.noNotifications,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              color: AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'You\'re all caught up!',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppColors.textTertiary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationsList(
    BuildContext context,
    List<Map<String, dynamic>> notifications,
  ) {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: notifications.length,
      separatorBuilder: (context, index) => const SizedBox(height: 8),
      itemBuilder: (context, index) {
        final notification = notifications[index];
        return _NotificationCard(notification: notification);
      },
    );
  }

  List<Map<String, dynamic>> _getPlaceholderNotifications() {
    return [
      {
        'title': 'Leave Request Approved',
        'message': 'Your annual leave request for Feb 10-12 has been approved.',
        'type': 'RequestApproved',
        'time': '2 hours ago',
        'isRead': false,
      },
      {
        'title': 'Approval Pending',
        'message': 'Your excuse request is pending manager approval.',
        'type': 'ApprovalPending',
        'time': '1 day ago',
        'isRead': false,
      },
      {
        'title': 'Check-in Reminder',
        'message': 'Don\'t forget to check in before 9:00 AM.',
        'type': 'Reminder',
        'time': '2 days ago',
        'isRead': true,
      },
      {
        'title': 'Company Announcement',
        'message': 'Office will be closed on Feb 15 for maintenance.',
        'type': 'Broadcast',
        'time': '3 days ago',
        'isRead': true,
      },
    ];
  }
}

class _NotificationCard extends StatelessWidget {
  final Map<String, dynamic> notification;

  const _NotificationCard({required this.notification});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isRead = notification['isRead'] as bool;
    final type = notification['type'] as String;

    IconData iconData;
    Color iconColor;
    
    switch (type) {
      case 'RequestApproved':
        iconData = Icons.check_circle;
        iconColor = AppColors.success;
        break;
      case 'RequestRejected':
        iconData = Icons.cancel;
        iconColor = AppColors.error;
        break;
      case 'ApprovalPending':
        iconData = Icons.pending;
        iconColor = AppColors.warning;
        break;
      case 'Reminder':
        iconData = Icons.alarm;
        iconColor = AppColors.primary;
        break;
      case 'Broadcast':
        iconData = Icons.campaign;
        iconColor = AppColors.secondary;
        break;
      default:
        iconData = Icons.notifications;
        iconColor = AppColors.primary;
    }

    return Material(
      color: isRead ? theme.colorScheme.surface : AppColors.primary.withOpacity(0.05),
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: () {
          // TODO: Navigate to notification detail or related screen
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isRead ? AppColors.outlineVariant : AppColors.primary.withOpacity(0.2),
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Icon
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: iconColor.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  iconData,
                  color: iconColor,
                  size: 22,
                ),
              ),
              const SizedBox(width: 12),
              
              // Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            notification['title'],
                            style: theme.textTheme.titleSmall?.copyWith(
                              fontWeight: isRead ? FontWeight.normal : FontWeight.w600,
                            ),
                          ),
                        ),
                        if (!isRead)
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: AppColors.primary,
                              shape: BoxShape.circle,
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      notification['message'],
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: AppColors.textSecondary,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      notification['time'],
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: AppColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
