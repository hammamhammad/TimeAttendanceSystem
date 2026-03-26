import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../shared/models/notification_model.dart';
import '../../../shared/providers/notification_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Notifications screen showing in-app notifications.
class NotificationsScreen extends ConsumerStatefulWidget {
  const NotificationsScreen({super.key});

  @override
  ConsumerState<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends ConsumerState<NotificationsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(notificationNotifierProvider.notifier).loadNotifications();
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final state = ref.watch(notificationNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.notifications),
        actions: [
          if (state.unreadCount > 0)
            TextButton(
              onPressed: () {
                ref.read(notificationNotifierProvider.notifier).markAllAsRead();
              },
              child: Text(l10n.markAllRead),
            ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(notificationNotifierProvider.notifier).loadNotifications(),
                )
              : state.notifications.isEmpty
                  ? _buildEmptyState(context, l10n)
                  : _buildNotificationsList(context, l10n, state.notifications),
    );
  }

  Widget _buildEmptyState(BuildContext context, AppLocalizations l10n) {
    final theme = Theme.of(context);
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest,
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.notifications_none,
              size: 48,
              color: theme.colorScheme.onSurface.withOpacity(0.4),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            l10n.noNotifications,
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.6),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'You\'re all caught up!',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface.withOpacity(0.4),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationsList(
    BuildContext context,
    AppLocalizations l10n,
    List<AppNotification> notifications,
  ) {
    return RefreshIndicator(
      onRefresh: () => ref.read(notificationNotifierProvider.notifier).loadNotifications(),
      child: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: notifications.length,
        separatorBuilder: (context, index) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final notification = notifications[index];
          return _NotificationCard(
            notification: notification,
            isArabic: l10n.isArabic,
            onTap: () {
              if (!notification.isRead) {
                ref.read(notificationNotifierProvider.notifier).markAsRead(notification.id);
              }
            },
          );
        },
      ),
    );
  }
}

class _NotificationCard extends StatelessWidget {
  final AppNotification notification;
  final bool isArabic;
  final VoidCallback? onTap;

  const _NotificationCard({
    required this.notification,
    required this.isArabic,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isRead = notification.isRead;
    final timeFormat = DateFormat('MMM dd, HH:mm');

    // Use locale-aware title and message
    final title = isArabic
        ? (notification.titleAr ?? notification.titleEn)
        : notification.titleEn;
    final message = isArabic
        ? (notification.messageAr ?? notification.messageEn)
        : notification.messageEn;

    IconData iconData;
    Color iconColor;

    switch (notification.type) {
      case NotificationType.requestApproved:
        iconData = Icons.check_circle;
        iconColor = AppColors.success;
        break;
      case NotificationType.requestRejected:
        iconData = Icons.cancel;
        iconColor = AppColors.error;
        break;
      case NotificationType.approvalPending:
      case NotificationType.approvalReminder:
        iconData = Icons.pending_actions;
        iconColor = AppColors.warning;
        break;
      case NotificationType.requestSubmitted:
        iconData = Icons.send;
        iconColor = AppColors.info;
        break;
      case NotificationType.requestDelegated:
      case NotificationType.delegationReceived:
        iconData = Icons.swap_horiz;
        iconColor = AppColors.secondary;
        break;
      case NotificationType.requestEscalated:
        iconData = Icons.priority_high;
        iconColor = AppColors.error;
        break;
      case NotificationType.alert:
        iconData = Icons.warning;
        iconColor = AppColors.error;
        break;
      case NotificationType.info:
      default:
        iconData = Icons.notifications;
        iconColor = AppColors.primary;
    }

    return Material(
      color: isRead ? theme.colorScheme.surface : AppColors.primary.withOpacity(0.05),
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isRead ? theme.dividerColor : AppColors.primary.withOpacity(0.2),
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
                            title,
                            style: theme.textTheme.titleSmall?.copyWith(
                              fontWeight: isRead ? FontWeight.normal : FontWeight.w600,
                            ),
                          ),
                        ),
                        if (!isRead)
                          Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: AppColors.primary,
                              shape: BoxShape.circle,
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      message,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.6),
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      timeFormat.format(notification.createdAtUtc.toLocal()),
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.4),
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
