import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/leave_model.dart';
import '../../../shared/providers/leave_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Leave balance visualization screen.
/// Shows available vacation types (detailed balances require the web portal).
class LeaveBalanceScreen extends ConsumerStatefulWidget {
  const LeaveBalanceScreen({super.key});

  @override
  ConsumerState<LeaveBalanceScreen> createState() => _LeaveBalanceScreenState();
}

class _LeaveBalanceScreenState extends ConsumerState<LeaveBalanceScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(leaveNotifierProvider.notifier).loadBalances();
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final state = ref.watch(leaveNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Leave Balance'),
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () =>
                      ref.read(leaveNotifierProvider.notifier).loadBalances(),
                )
              : RefreshIndicator(
                  onRefresh: () =>
                      ref.read(leaveNotifierProvider.notifier).loadBalances(),
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Summary Card
                        _SummaryCard(
                          vacationTypes: state.vacationTypes,
                          requests: state.requests,
                        ),
                        const SizedBox(height: 24),

                        // Vacation Types
                        Text(
                          'Leave Types',
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 12),

                        if (state.vacationTypes.isEmpty)
                          const AppEmpty(
                            message: 'No vacation types available',
                            icon: Icons.beach_access,
                          )
                        else
                          ...state.vacationTypes.map((vt) => Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: _VacationTypeCard(
                                  vacationType: vt,
                                  requestCount: state.requests
                                      .where(
                                          (r) => r.vacationTypeId == vt.id)
                                      .length,
                                ),
                              )),

                        const SizedBox(height: 16),

                        // Recent requests summary
                        if (state.requests.isNotEmpty) ...[
                          Text(
                            'Recent Requests',
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),
                          ...state.requests.take(5).map((r) => _RequestTile(
                                request: r,
                              )),
                        ],
                      ],
                    ),
                  ),
                ),
    );
  }
}

/// Summary card showing overall leave stats.
class _SummaryCard extends StatelessWidget {
  final List<VacationType> vacationTypes;
  final List<LeaveRequest> requests;

  const _SummaryCard({
    required this.vacationTypes,
    required this.requests,
  });

  @override
  Widget build(BuildContext context) {
    final pendingCount =
        requests.where((r) => r.status == LeaveStatus.pending).length;
    final approvedCount =
        requests.where((r) => r.status == LeaveStatus.approved).length;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.primary,
            AppColors.primary.withBlue(200),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withOpacity(0.4),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Icon(Icons.beach_access, color: Colors.white, size: 28),
              SizedBox(width: 8),
              Text(
                'Leave Overview',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            '${vacationTypes.length}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 48,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            'Leave Types Available',
            style: TextStyle(
              color: Colors.white.withOpacity(0.8),
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _BalanceStat(
                label: 'Pending',
                value: '$pendingCount',
                icon: Icons.hourglass_empty,
              ),
              Container(
                width: 1,
                height: 40,
                color: Colors.white24,
              ),
              _BalanceStat(
                label: 'Approved',
                value: '$approvedCount',
                icon: Icons.check_circle_outline,
              ),
              Container(
                width: 1,
                height: 40,
                color: Colors.white24,
              ),
              _BalanceStat(
                label: 'Total',
                value: '${requests.length}',
                icon: Icons.list_alt,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _BalanceStat extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _BalanceStat({
    required this.label,
    required this.value,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white70, size: 18),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
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

/// Card for a single vacation type.
class _VacationTypeCard extends StatelessWidget {
  final VacationType vacationType;
  final int requestCount;

  const _VacationTypeCard({
    required this.vacationType,
    required this.requestCount,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = _getLeaveTypeColor(vacationType.name);

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                _getLeaveTypeIcon(vacationType.name),
                color: color,
                size: 24,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    vacationType.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  Text(
                    '$requestCount request${requestCount != 1 ? 's' : ''}',
                    style: TextStyle(
                      color: theme.colorScheme.onSurfaceVariant,
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ],
        ),
      ),
    );
  }

  Color _getLeaveTypeColor(String typeName) {
    final lowerName = typeName.toLowerCase();
    if (lowerName.contains('annual') || lowerName.contains('vacation')) {
      return AppColors.primary;
    } else if (lowerName.contains('sick')) {
      return AppColors.error;
    } else if (lowerName.contains('personal') ||
        lowerName.contains('emergency')) {
      return AppColors.warning;
    } else if (lowerName.contains('maternity') ||
        lowerName.contains('paternity')) {
      return AppColors.secondary;
    } else if (lowerName.contains('study') ||
        lowerName.contains('education')) {
      return AppColors.info;
    } else {
      return AppColors.textSecondary;
    }
  }

  IconData _getLeaveTypeIcon(String typeName) {
    final lowerName = typeName.toLowerCase();
    if (lowerName.contains('annual') || lowerName.contains('vacation')) {
      return Icons.beach_access;
    } else if (lowerName.contains('sick')) {
      return Icons.local_hospital;
    } else if (lowerName.contains('personal') ||
        lowerName.contains('emergency')) {
      return Icons.person;
    } else if (lowerName.contains('maternity')) {
      return Icons.child_care;
    } else if (lowerName.contains('paternity')) {
      return Icons.family_restroom;
    } else if (lowerName.contains('unpaid')) {
      return Icons.money_off;
    } else {
      return Icons.event_available;
    }
  }
}

/// Tile for a recent leave request.
class _RequestTile extends StatelessWidget {
  final LeaveRequest request;

  const _RequestTile({required this.request});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final statusColor = _getStatusColor(request.status);

    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Container(
          width: 4,
          height: 40,
          decoration: BoxDecoration(
            color: statusColor,
            borderRadius: BorderRadius.circular(2),
          ),
        ),
        title: Text(
          request.vacationTypeName ?? 'Leave',
          style: const TextStyle(fontWeight: FontWeight.w500),
        ),
        subtitle: Text(
          '${request.totalDays ?? 0} days',
          style: TextStyle(color: theme.colorScheme.onSurfaceVariant),
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            request.status.name[0].toUpperCase() +
                request.status.name.substring(1),
            style: TextStyle(
              color: statusColor,
              fontWeight: FontWeight.w500,
              fontSize: 12,
            ),
          ),
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
}
