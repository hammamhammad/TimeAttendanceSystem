import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:local_auth/local_auth.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/storage/secure_storage_service.dart';
import '../../../shared/providers/auth_provider.dart';
import '../../../shared/providers/locale_provider.dart';

/// User profile screen with settings and logout.
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
    _biometricEnabled = await SecureStorageService.instance.isBiometricEnabled();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final authState = ref.watch(authStateProvider);
    final locale = ref.watch(localeProvider);
    
    final user = authState.valueOrNull?.user;
    final userName = user?['fullName'] ?? 'User';
    final userEmail = user?['email'] ?? '';
    final tenantName = authState.valueOrNull?.tenantConfig?.name ?? '';

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.profile),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // User info card
            _buildUserInfoCard(theme, userName, userEmail, tenantName),
            
            const SizedBox(height: 24),
            
            // Settings section
            _buildSectionHeader(theme, l10n.settings),
            const SizedBox(height: 8),
            
            _buildSettingsCard(theme, l10n, locale),
            
            const SizedBox(height: 24),
            
            // Account section
            _buildSectionHeader(theme, 'Account'),
            const SizedBox(height: 8),
            
            _buildAccountCard(theme, l10n),
            
            const SizedBox(height: 32),
            
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
      ),
    );
  }

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
            // Avatar
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppColors.primary,
                    AppColors.primaryLight,
                  ],
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
            
            // Name
            Text(
              userName,
              style: theme.textTheme.titleLarge,
            ),
            const SizedBox(height: 4),
            
            // Email
            Text(
              userEmail,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 8),
            
            // Company
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                tenantName,
                style: TextStyle(
                  color: AppColors.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(ThemeData theme, String title) {
    return Text(
      title,
      style: theme.textTheme.titleMedium?.copyWith(
        color: AppColors.textSecondary,
      ),
    );
  }

  Widget _buildSettingsCard(ThemeData theme, AppLocalizations l10n, Locale locale) {
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
                ref.read(localeProvider.notifier).setLocale(selection.first);
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
                  // Authenticate first before enabling
                  final authenticated = await _localAuth.authenticate(
                    localizedReason: 'Authenticate to enable biometric login',
                  );
                  if (authenticated) {
                    await SecureStorageService.instance.setBiometricEnabled(true);
                    setState(() => _biometricEnabled = true);
                  }
                } else {
                  await SecureStorageService.instance.setBiometricEnabled(false);
                  setState(() => _biometricEnabled = false);
                }
              },
            ),
          
          const Divider(height: 1),
          
          // Dark mode (system default)
          ListTile(
            leading: const Icon(Icons.dark_mode),
            title: const Text('Theme'),
            trailing: const Text('System'),
            onTap: () {
              // TODO: Show theme picker
            },
          ),
        ],
      ),
    );
  }

  Widget _buildAccountCard(ThemeData theme, AppLocalizations l10n) {
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.lock_outline),
            title: const Text('Change Password'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to change password
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.business),
            title: const Text('Switch Company'),
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
            title: const Text('Help & Support'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to help
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.info_outline),
            title: const Text('About'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              showAboutDialog(
                context: context,
                applicationName: 'ESS Mobile',
                applicationVersion: '1.0.0',
                applicationLegalese: '© 2026 Time Attendance System',
              );
            },
          ),
        ],
      ),
    );
  }

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

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.isEmpty) return '?';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return '${parts[0][0]}${parts[parts.length - 1][0]}'.toUpperCase();
  }
}
