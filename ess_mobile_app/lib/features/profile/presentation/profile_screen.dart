import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:local_auth/local_auth.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/storage/secure_storage_service.dart';
import '../../../core/network/api_client.dart';
import '../../../shared/providers/auth_provider.dart';
import '../../../shared/providers/locale_provider.dart';

// ============================================================
// Profile Data Models
// ============================================================

/// Employee info nested inside the profile response.
class EmployeeProfile {
  final int employeeId;
  final String employeeCode;
  final String fullName;
  final String? fullNameAr;
  final String? department;
  final String? departmentAr;
  final String? branch;
  final String? position;
  final String? positionAr;
  final DateTime? hireDate;
  final String? email;
  final String? phone;

  EmployeeProfile({
    required this.employeeId,
    required this.employeeCode,
    required this.fullName,
    this.fullNameAr,
    this.department,
    this.departmentAr,
    this.branch,
    this.position,
    this.positionAr,
    this.hireDate,
    this.email,
    this.phone,
  });

  factory EmployeeProfile.fromJson(Map<String, dynamic> json) {
    return EmployeeProfile(
      employeeId: json['employeeId'] ?? 0,
      employeeCode: json['employeeCode'] ?? '',
      fullName: json['fullName'] ?? '',
      fullNameAr: json['fullNameAr'],
      department: json['department'],
      departmentAr: json['departmentAr'],
      branch: json['branch'],
      position: json['position'],
      positionAr: json['positionAr'],
      hireDate: json['hireDate'] != null
          ? DateTime.tryParse(json['hireDate'])
          : null,
      email: json['email'],
      phone: json['phone'],
    );
  }
}

/// Full profile data returned by GET /api/v1/portal/my-profile.
class MyProfileData {
  final int userId;
  final String userName;
  final String? email;
  final String? phoneNumber;
  final String? displayName;
  final String? displayNameAr;
  final bool isActive;
  final List<String> roles;
  final DateTime? createdAtUtc;
  final EmployeeProfile? employeeInfo;

  MyProfileData({
    required this.userId,
    required this.userName,
    this.email,
    this.phoneNumber,
    this.displayName,
    this.displayNameAr,
    this.isActive = true,
    this.roles = const [],
    this.createdAtUtc,
    this.employeeInfo,
  });

  factory MyProfileData.fromJson(Map<String, dynamic> json) {
    return MyProfileData(
      userId: json['userId'] ?? 0,
      userName: json['userName'] ?? '',
      email: json['email'],
      phoneNumber: json['phoneNumber'],
      displayName: json['displayName'],
      displayNameAr: json['displayNameAr'],
      isActive: json['isActive'] ?? true,
      roles: (json['roles'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      createdAtUtc: json['createdAtUtc'] != null
          ? DateTime.tryParse(json['createdAtUtc'])
          : null,
      employeeInfo: json['employeeInfo'] != null
          ? EmployeeProfile.fromJson(json['employeeInfo'])
          : null,
    );
  }

  /// Whether this user has a manager role (contains "manager" case-insensitive).
  bool get isManager {
    return roles.any(
      (role) => role.toLowerCase().contains('manager'),
    );
  }

  /// Whether this user has an admin role.
  bool get isAdmin {
    return roles.any(
      (role) => role.toLowerCase().contains('admin'),
    );
  }
}

// ============================================================
// Profile Provider
// ============================================================

/// Provider that fetches profile data from the API.
final myProfileProvider =
    FutureProvider.autoDispose<MyProfileData>((ref) async {
  final dio = ref.watch(dioProvider);
  try {
    final response = await dio.get('/api/v1/portal/my-profile');
    final data = response.data;
    if (data is Map<String, dynamic>) {
      // Handle Result wrapper: { isSuccess: true, value: { ... } }
      if (data.containsKey('isSuccess') &&
          data['isSuccess'] == true &&
          data.containsKey('value')) {
        return MyProfileData.fromJson(data['value']);
      }
      // Handle direct response
      if (data.containsKey('userId') || data.containsKey('userName')) {
        return MyProfileData.fromJson(data);
      }
      if (data.containsKey('isSuccess') && data['isSuccess'] == false) {
        throw Exception(data['error'] ?? 'Failed to load profile');
      }
    }
    throw Exception('Invalid profile response format');
  } on DioException catch (e) {
    final msg = e.response?.data?['error'] ??
        e.response?.data?['message'] ??
        'Failed to load profile';
    throw Exception(msg);
  }
});

// ============================================================
// Profile Screen
// ============================================================

/// User profile screen with full employee details, settings, and logout.
class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  bool _biometricEnabled = false;
  bool _canUseBiometric = false;
  final _localAuth = LocalAuthentication();

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final canCheckBiometrics = await _localAuth.canCheckBiometrics;
    final isDeviceSupported = await _localAuth.isDeviceSupported();
    _canUseBiometric = canCheckBiometrics && isDeviceSupported;
    _biometricEnabled =
        await SecureStorageService.instance.isBiometricEnabled();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final authState = ref.watch(authStateProvider);
    final locale = ref.watch(localeProvider);
    final profileAsync = ref.watch(myProfileProvider);

    final user = authState.valueOrNull?.user;
    final fallbackName = user?['fullName'] ?? 'User';
    final fallbackEmail = user?['email'] ?? '';
    final tenantName = authState.valueOrNull?.tenantConfig?.name ?? '';

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.profile),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          ref.invalidate(myProfileProvider);
        },
        child: profileAsync.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (error, _) => _buildFallbackBody(
            theme,
            l10n,
            locale,
            fallbackName,
            fallbackEmail,
            tenantName,
            error.toString(),
          ),
          data: (profile) => _buildProfileBody(
            theme,
            l10n,
            locale,
            profile,
            tenantName,
          ),
        ),
      ),
    );
  }

  // ----------------------------------------------------------
  // Full profile body (when API data is available)
  // ----------------------------------------------------------

  Widget _buildProfileBody(
    ThemeData theme,
    AppLocalizations l10n,
    Locale locale,
    MyProfileData profile,
    String tenantName,
  ) {
    final isArabic = l10n.isArabic;
    final emp = profile.employeeInfo;

    // Determine display values
    final displayName = isArabic
        ? (profile.displayNameAr ?? profile.displayName ?? profile.userName)
        : (profile.displayName ?? profile.userName);
    final employeeCode = emp?.employeeCode ?? '';
    final department = isArabic
        ? (emp?.departmentAr ?? emp?.department ?? '-')
        : (emp?.department ?? '-');
    final branch = emp?.branch ?? '-';
    final position = isArabic
        ? (emp?.positionAr ?? emp?.position ?? '-')
        : (emp?.position ?? '-');
    final hireDate = emp?.hireDate != null
        ? DateFormat.yMMMd(locale.languageCode).format(emp!.hireDate!)
        : '-';
    final email = emp?.email ?? profile.email ?? '-';
    final phone = emp?.phone ?? profile.phoneNumber;

    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Profile header card
          _buildProfileHeaderCard(
            theme,
            displayName,
            employeeCode,
            tenantName,
          ),

          const SizedBox(height: 20),

          // Personal information section
          _buildSectionHeader(
            theme,
            isArabic ? 'المعلومات الشخصية' : 'Personal Information',
          ),
          const SizedBox(height: 8),
          _buildPersonalInfoCard(
            theme,
            l10n,
            employeeCode: employeeCode,
            department: department,
            branch: branch,
            position: position,
            hireDate: hireDate,
          ),

          const SizedBox(height: 20),

          // Contact information section
          _buildSectionHeader(
            theme,
            isArabic ? 'معلومات الاتصال' : 'Contact Information',
          ),
          const SizedBox(height: 8),
          _buildContactInfoCard(theme, l10n, email: email, phone: phone),

          const SizedBox(height: 20),

          // Manager quick actions (only visible for managers)
          if (profile.isManager) ...[
            _buildSectionHeader(
              theme,
              isArabic ? 'إدارة الفريق' : 'Team Management',
            ),
            const SizedBox(height: 8),
            _buildManagerActionsCard(theme, l10n),
            const SizedBox(height: 20),
          ],

          // Administration section (visible for managers/admins)
          if (profile.isManager || profile.isAdmin) ...[
            _buildSectionHeader(
              theme,
              isArabic ? 'الإدارة' : 'Administration',
            ),
            const SizedBox(height: 8),
            _buildAdminActionsCard(theme, l10n),
            const SizedBox(height: 20),
          ],

          // Settings section
          _buildSectionHeader(theme, l10n.settings),
          const SizedBox(height: 8),
          _buildSettingsCard(theme, l10n, locale),

          const SizedBox(height: 20),

          // Account section
          _buildSectionHeader(
            theme,
            isArabic ? 'الحساب' : 'Account',
          ),
          const SizedBox(height: 8),
          _buildAccountCard(theme, l10n),

          const SizedBox(height: 24),

          // Logout button
          SizedBox(
            height: 56,
            child: OutlinedButton.icon(
              onPressed: () => _showLogoutDialog(context, l10n),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.error,
                side: const BorderSide(color: AppColors.error),
              ),
              icon: const Icon(Icons.logout),
              label: Text(l10n.logout),
            ),
          ),

          const SizedBox(height: 16),

          // App version
          Center(
            child: Text(
              'Version 1.0.0',
              style: theme.textTheme.bodySmall?.copyWith(
                color: AppColors.textTertiary,
              ),
            ),
          ),

          const SizedBox(height: 16),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Fallback body (when API fails, show basic auth info)
  // ----------------------------------------------------------

  Widget _buildFallbackBody(
    ThemeData theme,
    AppLocalizations l10n,
    Locale locale,
    String userName,
    String userEmail,
    String tenantName,
    String errorMessage,
  ) {
    return SingleChildScrollView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Basic user info card from auth state
          _buildUserInfoCard(theme, userName, userEmail, tenantName),

          const SizedBox(height: 12),

          // Error banner
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.warning.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.warning.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                const Icon(Icons.info_outline, color: AppColors.warning, size: 20),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    l10n.isArabic
                        ? 'تعذر تحميل تفاصيل الملف الشخصي. اسحب للتحديث.'
                        : 'Could not load full profile details. Pull to refresh.',
                    style: const TextStyle(
                      color: AppColors.warningDark,
                      fontSize: 13,
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Settings section
          _buildSectionHeader(theme, l10n.settings),
          const SizedBox(height: 8),
          _buildSettingsCard(theme, l10n, locale),

          const SizedBox(height: 20),

          // Account section
          _buildSectionHeader(
            theme,
            l10n.isArabic ? 'الحساب' : 'Account',
          ),
          const SizedBox(height: 8),
          _buildAccountCard(theme, l10n),

          const SizedBox(height: 24),

          // Logout button
          SizedBox(
            height: 56,
            child: OutlinedButton.icon(
              onPressed: () => _showLogoutDialog(context, l10n),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.error,
                side: const BorderSide(color: AppColors.error),
              ),
              icon: const Icon(Icons.logout),
              label: Text(l10n.logout),
            ),
          ),

          const SizedBox(height: 16),

          // App version
          Center(
            child: Text(
              'Version 1.0.0',
              style: theme.textTheme.bodySmall?.copyWith(
                color: AppColors.textTertiary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Profile header card (large avatar with name & code)
  // ----------------------------------------------------------

  Widget _buildProfileHeaderCard(
    ThemeData theme,
    String displayName,
    String employeeCode,
    String tenantName,
  ) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 20),
        child: Column(
          children: [
            // Avatar
            Container(
              width: 88,
              height: 88,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [
                    AppColors.primary,
                    AppColors.primaryLight,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primary.withOpacity(0.3),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Center(
                child: Text(
                  _getInitials(displayName),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Name
            Text(
              displayName,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),

            if (employeeCode.isNotEmpty) ...[
              const SizedBox(height: 6),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  employeeCode,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: AppColors.textSecondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],

            if (tenantName.isNotEmpty) ...[
              const SizedBox(height: 10),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  tenantName,
                  style: const TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  // ----------------------------------------------------------
  // Minimal user info card (fallback when profile API fails)
  // ----------------------------------------------------------

  Widget _buildUserInfoCard(
    ThemeData theme,
    String userName,
    String userEmail,
    String tenantName,
  ) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [AppColors.primary, AppColors.primaryLight],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  _getInitials(userName),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(userName, style: theme.textTheme.titleLarge),
            const SizedBox(height: 4),
            Text(
              userEmail,
              style: theme.textTheme.bodyMedium
                  ?.copyWith(color: AppColors.textSecondary),
            ),
            if (tenantName.isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  tenantName,
                  style: const TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  // ----------------------------------------------------------
  // Personal information card
  // ----------------------------------------------------------

  Widget _buildPersonalInfoCard(
    ThemeData theme,
    AppLocalizations l10n, {
    required String employeeCode,
    required String department,
    required String branch,
    required String position,
    required String hireDate,
  }) {
    final isArabic = l10n.isArabic;
    return Card(
      child: Column(
        children: [
          _buildInfoTile(
            icon: Icons.badge_outlined,
            label: isArabic ? 'الرقم الوظيفي' : 'Employee Code',
            value: employeeCode.isNotEmpty ? employeeCode : '-',
          ),
          const Divider(height: 1),
          _buildInfoTile(
            icon: Icons.business_outlined,
            label: isArabic ? 'القسم' : 'Department',
            value: department,
          ),
          const Divider(height: 1),
          _buildInfoTile(
            icon: Icons.location_city_outlined,
            label: isArabic ? 'الفرع' : 'Branch',
            value: branch,
          ),
          const Divider(height: 1),
          _buildInfoTile(
            icon: Icons.work_outline,
            label: isArabic ? 'المسمى الوظيفي' : 'Position',
            value: position,
          ),
          const Divider(height: 1),
          _buildInfoTile(
            icon: Icons.calendar_today_outlined,
            label: isArabic ? 'تاريخ التعيين' : 'Hire Date',
            value: hireDate,
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Contact information card
  // ----------------------------------------------------------

  Widget _buildContactInfoCard(
    ThemeData theme,
    AppLocalizations l10n, {
    required String email,
    String? phone,
  }) {
    final isArabic = l10n.isArabic;
    return Card(
      child: Column(
        children: [
          _buildInfoTile(
            icon: Icons.email_outlined,
            label: l10n.email,
            value: email,
          ),
          if (phone != null && phone.isNotEmpty) ...[
            const Divider(height: 1),
            _buildInfoTile(
              icon: Icons.phone_outlined,
              label: isArabic ? 'الهاتف' : 'Phone',
              value: phone,
            ),
          ],
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Manager quick actions card
  // ----------------------------------------------------------

  Widget _buildManagerActionsCard(ThemeData theme, AppLocalizations l10n) {
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.dashboard_outlined, color: AppColors.primary),
            title: Text(l10n.managerDashboard),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/manager-dashboard'),
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.group_outlined, color: AppColors.primary),
            title: Text(l10n.teamMembers),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/team-members'),
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.approval_outlined, color: AppColors.primary),
            title: Text(l10n.pendingApprovals),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/pending-approvals'),
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Admin actions card (NFC, branches, notifications)
  // ----------------------------------------------------------

  Widget _buildAdminActionsCard(ThemeData theme, AppLocalizations l10n) {
    final isArabic = l10n.isArabic;
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.nfc, color: AppColors.accent),
            title: Text(isArabic ? 'إدارة بطاقات NFC' : 'NFC Tag Management'),
            subtitle: Text(
              isArabic ? 'تسجيل وتفعيل بطاقات الحضور' : 'Register & provision attendance tags',
              style: TextStyle(fontSize: 12, color: AppColors.textTertiary),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/nfc-management'),
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.location_city, color: AppColors.accent),
            title: Text(isArabic ? 'إدارة الفروع' : 'Branch Management'),
            subtitle: Text(
              isArabic ? 'عرض وإدارة الفروع' : 'View & manage branches',
              style: TextStyle(fontSize: 12, color: AppColors.textTertiary),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/branch-management'),
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.campaign, color: AppColors.accent),
            title: Text(isArabic ? 'إرسال إشعار' : 'Send Notification'),
            subtitle: Text(
              isArabic ? 'إرسال إشعارات للموظفين' : 'Broadcast to employees',
              style: TextStyle(fontSize: 12, color: AppColors.textTertiary),
            ),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/notification-broadcast'),
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Settings card (language, biometric, theme)
  // ----------------------------------------------------------

  Widget _buildSettingsCard(
      ThemeData theme, AppLocalizations l10n, Locale locale) {
    return Card(
      child: Column(
        children: [
          // Language
          ListTile(
            leading: const Icon(Icons.language),
            title: Text(l10n.language),
            trailing: SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: 'en', label: Text('EN')),
                ButtonSegment(value: 'ar', label: Text('عربي')),
              ],
              selected: {locale.languageCode},
              onSelectionChanged: (selection) {
                ref
                    .read(localeProvider.notifier)
                    .setLocale(selection.first);
              },
            ),
          ),

          const Divider(height: 1),

          // Biometric
          if (_canUseBiometric)
            SwitchListTile(
              secondary: const Icon(Icons.fingerprint),
              title: Text(l10n.enableBiometric),
              value: _biometricEnabled,
              onChanged: (value) async {
                if (value) {
                  final authenticated = await _localAuth.authenticate(
                    localizedReason: 'Authenticate to enable biometric login',
                  );
                  if (authenticated) {
                    await SecureStorageService.instance
                        .setBiometricEnabled(true);
                    setState(() => _biometricEnabled = true);
                  }
                } else {
                  await SecureStorageService.instance
                      .setBiometricEnabled(false);
                  setState(() => _biometricEnabled = false);
                }
              },
            ),

          const Divider(height: 1),

          // Dark mode (system default)
          ListTile(
            leading: const Icon(Icons.dark_mode),
            title: Text(l10n.isArabic ? 'السمة' : 'Theme'),
            trailing: Text(l10n.isArabic ? 'النظام' : 'System'),
            onTap: () {
              // TODO: Show theme picker
            },
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Account card (change password, switch company, help, about)
  // ----------------------------------------------------------

  Widget _buildAccountCard(ThemeData theme, AppLocalizations l10n) {
    final isArabic = l10n.isArabic;
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.lock_outline),
            title: Text(isArabic ? 'تغيير كلمة المرور' : 'Change Password'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => _showChangePasswordDialog(context, l10n),
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.business),
            title: Text(isArabic ? 'تبديل الشركة' : 'Switch Company'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () async {
              await ref.read(authStateProvider.notifier).reset();
              if (mounted) {
                context.go('/tenant-discovery');
              }
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.help_outline),
            title: Text(isArabic ? 'المساعدة والدعم' : 'Help & Support'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to help
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.info_outline),
            title: Text(isArabic ? 'حول' : 'About'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              showAboutDialog(
                context: context,
                applicationName: 'ESS Mobile',
                applicationVersion: '1.0.0',
                applicationLegalese: '\u00a9 2026 Time Attendance System',
              );
            },
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Section header
  // ----------------------------------------------------------

  Widget _buildSectionHeader(ThemeData theme, String title) {
    return Text(
      title,
      style: theme.textTheme.titleMedium?.copyWith(
        color: theme.colorScheme.onSurface.withOpacity(0.6),
      ),
    );
  }

  // ----------------------------------------------------------
  // Reusable info tile (icon | label | value)
  // ----------------------------------------------------------

  Widget _buildInfoTile({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Builder(
      builder: (context) {
        final theme = Theme.of(context);
        return ListTile(
          leading: Icon(icon, color: theme.colorScheme.onSurface.withOpacity(0.6), size: 22),
          title: Text(
            label,
            style: TextStyle(
              fontSize: 13,
              color: theme.colorScheme.onSurface.withOpacity(0.5),
            ),
          ),
          subtitle: Text(
            value,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurface,
            ),
          ),
        );
      },
    );
  }

  // ----------------------------------------------------------
  // Logout dialog
  // ----------------------------------------------------------

  void _showLogoutDialog(BuildContext context, AppLocalizations l10n) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.logout),
        content: Text(l10n.logoutConfirm),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(l10n.cancel),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(context);
              await ref.read(authStateProvider.notifier).logout();
              if (mounted) {
                context.go('/login');
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
            child: Text(l10n.logout),
          ),
        ],
      ),
    );
  }

  // ----------------------------------------------------------
  // Change password dialog
  // ----------------------------------------------------------

  void _showChangePasswordDialog(
      BuildContext context, AppLocalizations l10n) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (dialogContext) => _ChangePasswordDialog(
        l10n: l10n,
        dio: ref.read(dioProvider),
      ),
    );
  }

  // ----------------------------------------------------------
  // Helpers
  // ----------------------------------------------------------

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.isEmpty) return '?';
    if (parts.length == 1) {
      return parts[0].isNotEmpty ? parts[0][0].toUpperCase() : '?';
    }
    return '${parts[0][0]}${parts[parts.length - 1][0]}'.toUpperCase();
  }
}

// ============================================================
// Change Password Dialog (stateful, self-contained)
// ============================================================

class _ChangePasswordDialog extends StatefulWidget {
  final AppLocalizations l10n;
  final Dio dio;

  const _ChangePasswordDialog({
    required this.l10n,
    required this.dio,
  });

  @override
  State<_ChangePasswordDialog> createState() => _ChangePasswordDialogState();
}

class _ChangePasswordDialogState extends State<_ChangePasswordDialog> {
  final _formKey = GlobalKey<FormState>();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _obscureCurrent = true;
  bool _obscureNew = true;
  bool _obscureConfirm = true;
  bool _isSubmitting = false;
  String? _errorMessage;

  AppLocalizations get l10n => widget.l10n;
  bool get isArabic => l10n.isArabic;

  @override
  void dispose() {
    _currentPasswordController.dispose();
    _newPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isSubmitting = true;
      _errorMessage = null;
    });

    try {
      final response = await widget.dio.post(
        '/api/v1/auth/change-password',
        data: {
          'currentPassword': _currentPasswordController.text,
          'newPassword': _newPasswordController.text,
        },
      );

      if (response.statusCode == 200) {
        if (mounted) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                isArabic
                    ? 'تم تغيير كلمة المرور بنجاح'
                    : 'Password changed successfully',
              ),
              backgroundColor: AppColors.success,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      }
    } on DioException catch (e) {
      final responseData = e.response?.data;
      String msg;
      if (responseData is Map && responseData['error'] != null) {
        msg = responseData['error'].toString();
      } else if (e.response?.statusCode == 400) {
        msg = isArabic
            ? 'كلمة المرور الحالية غير صحيحة أو كلمة المرور الجديدة لا تستوفي المتطلبات'
            : 'Current password is incorrect or new password does not meet requirements';
      } else if (e.response?.statusCode == 401) {
        msg = isArabic
            ? 'غير مصرح. يرجى تسجيل الدخول مرة أخرى.'
            : 'Unauthorized. Please login again.';
      } else {
        msg = isArabic
            ? 'حدث خطأ أثناء تغيير كلمة المرور'
            : 'An error occurred while changing password';
      }
      setState(() {
        _errorMessage = msg;
      });
    } catch (e) {
      setState(() {
        _errorMessage = isArabic
            ? 'حدث خطأ غير متوقع'
            : 'An unexpected error occurred';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        isArabic ? 'تغيير كلمة المرور' : 'Change Password',
      ),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Error message
              if (_errorMessage != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.error.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.error_outline,
                          color: AppColors.error, size: 18),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          _errorMessage!,
                          style: const TextStyle(
                            color: AppColors.error,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
              ],

              // Current password
              TextFormField(
                controller: _currentPasswordController,
                obscureText: _obscureCurrent,
                textInputAction: TextInputAction.next,
                decoration: InputDecoration(
                  labelText: isArabic
                      ? 'كلمة المرور الحالية'
                      : 'Current Password',
                  prefixIcon: const Icon(Icons.lock_outline, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureCurrent
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                      size: 20,
                    ),
                    onPressed: () =>
                        setState(() => _obscureCurrent = !_obscureCurrent),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return isArabic
                        ? 'كلمة المرور الحالية مطلوبة'
                        : 'Current password is required';
                  }
                  return null;
                },
              ),

              const SizedBox(height: 16),

              // New password
              TextFormField(
                controller: _newPasswordController,
                obscureText: _obscureNew,
                textInputAction: TextInputAction.next,
                decoration: InputDecoration(
                  labelText: isArabic
                      ? 'كلمة المرور الجديدة'
                      : 'New Password',
                  prefixIcon: const Icon(Icons.lock_reset, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureNew
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                      size: 20,
                    ),
                    onPressed: () =>
                        setState(() => _obscureNew = !_obscureNew),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return isArabic
                        ? 'كلمة المرور الجديدة مطلوبة'
                        : 'New password is required';
                  }
                  if (value.length < 8) {
                    return isArabic
                        ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
                        : 'Password must be at least 8 characters';
                  }
                  return null;
                },
              ),

              const SizedBox(height: 16),

              // Confirm new password
              TextFormField(
                controller: _confirmPasswordController,
                obscureText: _obscureConfirm,
                textInputAction: TextInputAction.done,
                decoration: InputDecoration(
                  labelText: isArabic
                      ? 'تأكيد كلمة المرور الجديدة'
                      : 'Confirm New Password',
                  prefixIcon: const Icon(Icons.lock_outline, size: 20),
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureConfirm
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                      size: 20,
                    ),
                    onPressed: () => setState(
                        () => _obscureConfirm = !_obscureConfirm),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return isArabic
                        ? 'تأكيد كلمة المرور مطلوب'
                        : 'Please confirm your new password';
                  }
                  if (value != _newPasswordController.text) {
                    return isArabic
                        ? 'كلمات المرور غير متطابقة'
                        : 'Passwords do not match';
                  }
                  return null;
                },
                onFieldSubmitted: (_) => _submit(),
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: _isSubmitting ? null : () => Navigator.pop(context),
          child: Text(l10n.cancel),
        ),
        ElevatedButton(
          onPressed: _isSubmitting ? null : _submit,
          child: _isSubmitting
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Colors.white,
                  ),
                )
              : Text(isArabic ? 'تغيير' : 'Change'),
        ),
      ],
    );
  }
}
