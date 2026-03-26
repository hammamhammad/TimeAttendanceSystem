import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';

/// Requests hub screen - Central navigation for all request types.
class RequestsHubScreen extends ConsumerWidget {
  const RequestsHubScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.requests),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _RequestCard(
            icon: Icons.calendar_today,
            color: AppColors.primary,
            title: l10n.leaveRequests,
            subtitle: l10n.leaveRequestsDesc,
            onTap: () => context.push('/leave'),
          ),
          const SizedBox(height: 12),
          _RequestCard(
            icon: Icons.access_time,
            color: Colors.orange,
            title: l10n.excuseRequests,
            subtitle: l10n.excuseRequestsDesc,
            onTap: () => context.push('/excuses'),
          ),
          const SizedBox(height: 12),
          _RequestCard(
            icon: Icons.laptop_mac,
            color: Colors.teal,
            title: l10n.remoteWork,
            subtitle: l10n.remoteWorkDesc,
            onTap: () => context.push('/remote-work'),
          ),
          const SizedBox(height: 12),
          _RequestCard(
            icon: Icons.edit_calendar,
            color: Colors.deepPurple,
            title: l10n.attendanceCorrections,
            subtitle: l10n.attendanceCorrectionsDesc,
            onTap: () => context.push('/attendance-corrections'),
          ),
          const SizedBox(height: 12),
          _RequestCard(
            icon: Icons.schedule,
            color: Colors.blueGrey,
            title: l10n.mySchedule,
            subtitle: l10n.myScheduleDesc,
            onTap: () => context.push('/schedule'),
          ),
        ],
      ),
    );
  }
}

class _RequestCard extends StatelessWidget {
  final IconData icon;
  final Color color;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _RequestCard({
    required this.icon,
    required this.color,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurface.withOpacity(0.6),
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.chevron_right,
                color: theme.colorScheme.onSurface.withOpacity(0.3),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
