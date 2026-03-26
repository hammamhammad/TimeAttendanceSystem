import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/providers/manager_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Team Members screen showing all direct and indirect reports.
class TeamMembersScreen extends ConsumerStatefulWidget {
  const TeamMembersScreen({super.key});

  @override
  ConsumerState<TeamMembersScreen> createState() => _TeamMembersScreenState();
}

class _TeamMembersScreenState extends ConsumerState<TeamMembersScreen> {
  bool _isSearching = false;
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(teamMembersProvider.notifier).loadMembers();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _onRefresh() async {
    if (_searchController.text.isNotEmpty) {
      await ref
          .read(teamMembersProvider.notifier)
          .searchMembers(_searchController.text);
    } else {
      await ref.read(teamMembersProvider.notifier).loadMembers();
    }
  }

  void _toggleSearch() {
    setState(() {
      _isSearching = !_isSearching;
      if (!_isSearching) {
        _searchController.clear();
        ref.read(teamMembersProvider.notifier).loadMembers();
      }
    });
  }

  void _onSearchChanged(String query) {
    ref.read(teamMembersProvider.notifier).searchMembers(query);
  }

  void _showMemberDetail(
      BuildContext context, Map<String, dynamic> member) {
    final name = _getMemberName(member);
    final department =
        member['departmentName'] ?? member['department'] ?? 'N/A';
    final position = member['position'] ?? member['jobTitle'] ?? 'N/A';
    final email = member['email'] ?? '';
    final phone = member['phoneNumber'] ?? member['phone'] ?? '';
    final status = _getMemberStatus(member);
    final statusColor = _getStatusColor(status);
    final employeeId =
        member['employeeNumber'] ?? member['employeeId']?.toString() ?? '';
    final branchName = member['branchName'] ?? member['branch'] ?? '';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Handle bar
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 20),
                decoration: BoxDecoration(
                  color: AppColors.outlineVariant,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),

              // Avatar and name
              CircleAvatar(
                radius: 36,
                backgroundColor: AppColors.primary.withOpacity(0.1),
                child: Text(
                  _getInitials(name),
                  style: TextStyle(
                    color: AppColors.primary,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Text(
                name,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 4),
              Text(
                position,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),
              const SizedBox(height: 8),

              // Status badge
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Detail rows
              _DetailRow(
                icon: Icons.business,
                label: 'Department',
                value: department,
              ),
              if (branchName.isNotEmpty)
                _DetailRow(
                  icon: Icons.location_on,
                  label: 'Branch',
                  value: branchName,
                ),
              if (employeeId.isNotEmpty)
                _DetailRow(
                  icon: Icons.badge,
                  label: 'Employee ID',
                  value: employeeId,
                ),
              if (email.isNotEmpty)
                _DetailRow(
                  icon: Icons.email,
                  label: 'Email',
                  value: email,
                ),
              if (phone.isNotEmpty)
                _DetailRow(
                  icon: Icons.phone,
                  label: 'Phone',
                  value: phone,
                ),

              const SizedBox(height: 16),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(teamMembersProvider);

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
        title: _isSearching
            ? TextField(
                controller: _searchController,
                autofocus: true,
                decoration: const InputDecoration(
                  hintText: 'Search team members...',
                  border: InputBorder.none,
                  filled: false,
                ),
                onChanged: _onSearchChanged,
              )
            : const Text('Team Members'),
        actions: [
          IconButton(
            icon: Icon(_isSearching ? Icons.close : Icons.search),
            onPressed: _toggleSearch,
          ),
        ],
      ),
      body: state.isLoading && state.members.isEmpty
          ? const AppLoading()
          : state.error != null && state.members.isEmpty
              ? AppError(
                  message: state.error,
                  onRetry: () =>
                      ref.read(teamMembersProvider.notifier).loadMembers(),
                )
              : state.members.isEmpty
                  ? const AppEmpty(
                      message: 'No team members found',
                      icon: Icons.people_outline,
                    )
                  : RefreshIndicator(
                      onRefresh: _onRefresh,
                      child: ListView.builder(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 8),
                        itemCount: state.members.length,
                        itemBuilder: (context, index) {
                          final member = state.members[index];
                          return _TeamMemberCard(
                            member: member,
                            onTap: () =>
                                _showMemberDetail(context, member),
                          );
                        },
                      ),
                    ),
    );
  }

  String _getMemberName(Map<String, dynamic> member) {
    final fullName = member['fullName'] ?? member['name'];
    if (fullName != null) return fullName.toString();

    final firstName = member['firstName'] ?? '';
    final lastName = member['lastName'] ?? '';
    if (firstName.toString().isNotEmpty || lastName.toString().isNotEmpty) {
      return '$firstName $lastName'.trim();
    }
    return 'Unknown';
  }

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name.isNotEmpty ? name[0].toUpperCase() : '?';
  }

  String _getMemberStatus(Map<String, dynamic> member) {
    final status = member['todayStatus'] ??
        member['attendanceStatus'] ??
        member['status'];
    if (status == null) return 'Unknown';

    final statusStr = status.toString().toLowerCase();
    if (statusStr.contains('present')) return 'Present';
    if (statusStr.contains('absent')) return 'Absent';
    if (statusStr.contains('late')) return 'Late';
    if (statusStr.contains('leave') || statusStr.contains('vacation')) {
      return 'On Leave';
    }
    if (statusStr.contains('remote')) return 'Remote Work';
    if (statusStr.contains('weekend')) return 'Weekend';
    if (statusStr.contains('holiday')) return 'Holiday';
    return status.toString();
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'present':
        return AppColors.success;
      case 'absent':
        return AppColors.error;
      case 'late':
        return AppColors.warning;
      case 'on leave':
        return AppColors.info;
      case 'remote work':
        return AppColors.secondary;
      case 'weekend':
      case 'holiday':
        return AppColors.textTertiary;
      default:
        return AppColors.textSecondary;
    }
  }
}

/// Individual team member card.
class _TeamMemberCard extends StatelessWidget {
  final Map<String, dynamic> member;
  final VoidCallback onTap;

  const _TeamMemberCard({
    required this.member,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final name = _getMemberName(member);
    final department =
        member['departmentName'] ?? member['department'] ?? '';
    final position = member['position'] ?? member['jobTitle'] ?? '';
    final status = _getMemberStatus(member);
    final statusColor = _getStatusColor(status);

    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: AppColors.outlineVariant),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              // Avatar
              CircleAvatar(
                radius: 22,
                backgroundColor: AppColors.primary.withOpacity(0.1),
                child: Text(
                  _getInitials(name),
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              ),
              const SizedBox(width: 14),

              // Name and details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      name,
                      style: const TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(height: 2),
                    if (position.isNotEmpty)
                      Text(
                        position,
                        style: TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 13,
                        ),
                      ),
                    if (department.isNotEmpty)
                      Text(
                        department,
                        style: TextStyle(
                          color: AppColors.textTertiary,
                          fontSize: 12,
                        ),
                      ),
                  ],
                ),
              ),

              // Status badge
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Text(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 11,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _getMemberName(Map<String, dynamic> member) {
    final fullName = member['fullName'] ?? member['name'];
    if (fullName != null) return fullName.toString();

    final firstName = member['firstName'] ?? '';
    final lastName = member['lastName'] ?? '';
    if (firstName.toString().isNotEmpty || lastName.toString().isNotEmpty) {
      return '$firstName $lastName'.trim();
    }
    return 'Unknown';
  }

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return name.isNotEmpty ? name[0].toUpperCase() : '?';
  }

  String _getMemberStatus(Map<String, dynamic> member) {
    final status = member['todayStatus'] ??
        member['attendanceStatus'] ??
        member['status'];
    if (status == null) return 'Unknown';

    final statusStr = status.toString().toLowerCase();
    if (statusStr.contains('present')) return 'Present';
    if (statusStr.contains('absent')) return 'Absent';
    if (statusStr.contains('late')) return 'Late';
    if (statusStr.contains('leave') || statusStr.contains('vacation')) {
      return 'On Leave';
    }
    if (statusStr.contains('remote')) return 'Remote Work';
    if (statusStr.contains('weekend')) return 'Weekend';
    if (statusStr.contains('holiday')) return 'Holiday';
    return status.toString();
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'present':
        return AppColors.success;
      case 'absent':
        return AppColors.error;
      case 'late':
        return AppColors.warning;
      case 'on leave':
        return AppColors.info;
      case 'remote work':
        return AppColors.secondary;
      case 'weekend':
      case 'holiday':
        return AppColors.textTertiary;
      default:
        return AppColors.textSecondary;
    }
  }
}

/// Detail row for the member bottom sheet.
class _DetailRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _DetailRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, size: 20, color: AppColors.textTertiary),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    color: AppColors.textTertiary,
                    fontSize: 11,
                  ),
                ),
                Text(
                  value,
                  style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
