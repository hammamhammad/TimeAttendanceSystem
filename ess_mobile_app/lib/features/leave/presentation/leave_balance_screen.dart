import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'dart:math' as math;

import '../../../core/theme/app_theme.dart';
import '../../../core/l10n/app_localizations.dart';
import '../../../shared/models/leave_model.dart';
import '../../../shared/providers/leave_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Leave balance visualization screen.
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
                  onRetry: () => ref.read(leaveNotifierProvider.notifier).loadBalances(),
                )
              : RefreshIndicator(
                  onRefresh: () => ref.read(leaveNotifierProvider.notifier).loadBalances(),
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Total Available Card
                        _TotalBalanceCard(balances: state.balances),
                        const SizedBox(height: 24),
                        
                        // Individual Leave Types
                        Text(
                          'Leave Types',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 12),
                        
                        ...state.balances.map((balance) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _LeaveTypeCard(balance: balance),
                        )),
                        
                        const SizedBox(height: 24),
                        
                        // Distribution Chart
                        if (state.balances.isNotEmpty) ...[
                          Text(
                            'Balance Distribution',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),
                          _DistributionChart(balances: state.balances),
                        ],
                      ],
                    ),
                  ),
                ),
    );
  }
}

/// Total balance overview card.
class _TotalBalanceCard extends StatelessWidget {
  final List<LeaveBalance> balances;
  
  const _TotalBalanceCard({required this.balances});

  @override
  Widget build(BuildContext context) {
    final totalAvailable = balances.fold<double>(0, (sum, b) => sum + b.availableDays);
    final totalEntitled = balances.fold<double>(0, (sum, b) => sum + b.entitledDays);
    final totalUsed = balances.fold<double>(0, (sum, b) => sum + b.usedDays);
    final totalPending = balances.fold<double>(0, (sum, b) => sum + b.pendingDays);
    
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
            children: [
              const Icon(Icons.beach_access, color: Colors.white, size: 28),
              const SizedBox(width: 8),
              const Text(
                'Available Leave Days',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            totalAvailable.toStringAsFixed(1),
            style: const TextStyle(
              color: Colors.white,
              fontSize: 48,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            'of ${totalEntitled.toStringAsFixed(0)} days entitled',
            style: TextStyle(
              color: Colors.white.withOpacity(0.8),
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _BalanceStat(
                label: 'Used',
                value: totalUsed.toStringAsFixed(1),
                icon: Icons.event_busy,
              ),
              Container(
                width: 1,
                height: 40,
                color: Colors.white24,
              ),
              _BalanceStat(
                label: 'Pending',
                value: totalPending.toStringAsFixed(1),
                icon: Icons.hourglass_empty,
              ),
              Container(
                width: 1,
                height: 40,
                color: Colors.white24,
              ),
              _BalanceStat(
                label: 'Entitled',
                value: totalEntitled.toStringAsFixed(0),
                icon: Icons.card_giftcard,
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

/// Individual leave type card with progress.
class _LeaveTypeCard extends StatelessWidget {
  final LeaveBalance balance;
  
  const _LeaveTypeCard({required this.balance});

  @override
  Widget build(BuildContext context) {
    final progress = balance.entitledDays > 0
        ? (balance.usedDays + balance.pendingDays) / balance.entitledDays
        : 0.0;
    final color = _getLeaveTypeColor(balance.leaveTypeName);
    
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
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
                    color: color.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getLeaveTypeIcon(balance.leaveTypeName),
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
                        balance.leaveTypeName,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        '${balance.availableDays.toStringAsFixed(1)} days available',
                        style: TextStyle(
                          color: color,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
                _CircularProgress(
                  progress: progress,
                  color: color,
                  size: 50,
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            // Progress bar
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: progress.clamp(0.0, 1.0),
                backgroundColor: AppColors.surfaceVariant,
                valueColor: AlwaysStoppedAnimation<Color>(color),
                minHeight: 8,
              ),
            ),
            const SizedBox(height: 12),
            
            // Stats row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _MiniStat(
                  label: 'Entitled',
                  value: balance.entitledDays.toStringAsFixed(0),
                ),
                _MiniStat(
                  label: 'Used',
                  value: balance.usedDays.toStringAsFixed(1),
                  color: AppColors.error,
                ),
                _MiniStat(
                  label: 'Pending',
                  value: balance.pendingDays.toStringAsFixed(1),
                  color: AppColors.warning,
                ),
                _MiniStat(
                  label: 'Available',
                  value: balance.availableDays.toStringAsFixed(1),
                  color: AppColors.success,
                ),
              ],
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
    } else if (lowerName.contains('personal') || lowerName.contains('emergency')) {
      return AppColors.warning;
    } else if (lowerName.contains('maternity') || lowerName.contains('paternity')) {
      return AppColors.secondary;
    } else if (lowerName.contains('study') || lowerName.contains('education')) {
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
    } else if (lowerName.contains('personal') || lowerName.contains('emergency')) {
      return Icons.person;
    } else if (lowerName.contains('maternity')) {
      return Icons.child_care;
    } else if (lowerName.contains('paternity')) {
      return Icons.family_restroom;
    } else if (lowerName.contains('study') || lowerName.contains('education')) {
      return Icons.school;
    } else if (lowerName.contains('unpaid')) {
      return Icons.money_off;
    } else {
      return Icons.event_available;
    }
  }
}

class _MiniStat extends StatelessWidget {
  final String label;
  final String value;
  final Color? color;
  
  const _MiniStat({
    required this.label,
    required this.value,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: color ?? AppColors.textPrimary,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: AppColors.textTertiary,
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}

/// Circular progress indicator.
class _CircularProgress extends StatelessWidget {
  final double progress;
  final Color color;
  final double size;
  
  const _CircularProgress({
    required this.progress,
    required this.color,
    required this.size,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _CircularProgressPainter(
          progress: progress.clamp(0.0, 1.0),
          color: color,
          backgroundColor: AppColors.surfaceVariant,
        ),
        child: Center(
          child: Text(
            '${(progress * 100).clamp(0, 100).toInt()}%',
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.bold,
              fontSize: 10,
            ),
          ),
        ),
      ),
    );
  }
}

class _CircularProgressPainter extends CustomPainter {
  final double progress;
  final Color color;
  final Color backgroundColor;
  
  _CircularProgressPainter({
    required this.progress,
    required this.color,
    required this.backgroundColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width - 8) / 2;
    
    // Background circle
    final bgPaint = Paint()
      ..color = backgroundColor
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke;
    
    canvas.drawCircle(center, radius, bgPaint);
    
    // Progress arc
    final progressPaint = Paint()
      ..color = color
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      2 * math.pi * progress,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

/// Distribution pie chart.
class _DistributionChart extends StatelessWidget {
  final List<LeaveBalance> balances;
  
  const _DistributionChart({required this.balances});

  @override
  Widget build(BuildContext context) {
    final validBalances = balances.where((b) => b.entitledDays > 0).toList();
    if (validBalances.isEmpty) return const SizedBox.shrink();
    
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            SizedBox(
              height: 180,
              child: CustomPaint(
                size: const Size(180, 180),
                painter: _PieChartPainter(balances: validBalances),
              ),
            ),
            const SizedBox(height: 20),
            Wrap(
              spacing: 16,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: validBalances.asMap().entries.map((entry) {
                final colors = [
                  AppColors.primary,
                  AppColors.secondary,
                  AppColors.success,
                  AppColors.warning,
                  AppColors.info,
                  AppColors.error,
                ];
                final color = colors[entry.key % colors.length];
                return _ChartLegendItem(
                  color: color,
                  label: entry.value.leaveTypeName,
                  value: '${entry.value.availableDays.toStringAsFixed(0)} days',
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
}

class _PieChartPainter extends CustomPainter {
  final List<LeaveBalance> balances;
  
  _PieChartPainter({required this.balances});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 10;
    
    final colors = [
      AppColors.primary,
      AppColors.secondary,
      AppColors.success,
      AppColors.warning,
      AppColors.info,
      AppColors.error,
    ];
    
    final total = balances.fold<double>(0, (sum, b) => sum + b.availableDays);
    if (total <= 0) return;
    
    var startAngle = -math.pi / 2;
    
    for (var i = 0; i < balances.length; i++) {
      final balance = balances[i];
      final sweepAngle = (balance.availableDays / total) * 2 * math.pi;
      
      final paint = Paint()
        ..color = colors[i % colors.length]
        ..style = PaintingStyle.fill;
      
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sweepAngle,
        true,
        paint,
      );
      
      startAngle += sweepAngle;
    }
    
    // Inner circle for donut effect
    final innerPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(center, radius * 0.6, innerPaint);
    
    // Total text
    final textPainter = TextPainter(
      text: TextSpan(
        text: '${total.toStringAsFixed(0)}',
        style: const TextStyle(
          color: Colors.black87,
          fontSize: 28,
          fontWeight: FontWeight.bold,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(
        center.dx - textPainter.width / 2,
        center.dy - textPainter.height / 2 - 8,
      ),
    );
    
    final labelPainter = TextPainter(
      text: const TextSpan(
        text: 'days',
        style: TextStyle(
          color: Colors.black54,
          fontSize: 12,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    labelPainter.layout();
    labelPainter.paint(
      canvas,
      Offset(
        center.dx - labelPainter.width / 2,
        center.dy + 8,
      ),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

class _ChartLegendItem extends StatelessWidget {
  final Color color;
  final String label;
  final String value;
  
  const _ChartLegendItem({
    required this.color,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 6),
        Text(
          '$label: ',
          style: TextStyle(
            color: AppColors.textSecondary,
            fontSize: 12,
          ),
        ),
        Text(
          value,
          style: const TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 12,
          ),
        ),
      ],
    );
  }
}
