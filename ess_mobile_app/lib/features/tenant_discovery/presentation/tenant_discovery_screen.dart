import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/config/app_config.dart';
import '../../../core/network/api_client.dart';
import '../../../shared/providers/auth_provider.dart';

/// Tenant discovery screen - first screen the user sees.
/// Connects to the ClockN API and navigates to login.
class TenantDiscoveryScreen extends ConsumerStatefulWidget {
  const TenantDiscoveryScreen({super.key});

  @override
  ConsumerState<TenantDiscoveryScreen> createState() => _TenantDiscoveryScreenState();
}

class _TenantDiscoveryScreenState extends ConsumerState<TenantDiscoveryScreen> {
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _checkExistingTenant();
  }

  Future<void> _checkExistingTenant() async {
    final authState = ref.read(authStateProvider);
    authState.whenData((state) {
      if (state.hasTenant && state.isAuthenticated) {
        context.go('/home');
      } else if (state.hasTenant) {
        context.go('/login');
      }
    });
  }

  Future<void> _connectToServer() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // Verify the API is reachable
      final dio = Dio(BaseOptions(
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
      ));

      try {
        await dio.get('${AppConfig.apiBaseUrl}/api/v1/auth/login');
      } on DioException catch (e) {
        // 405 Method Not Allowed is expected (GET on a POST endpoint) - API is reachable
        if (e.response?.statusCode != 405) {
          rethrow;
        }
      }

      // API is reachable - create tenant config
      final tenantConfig = TenantConfig(
        tenantId: 1,
        subdomain: 'clockn',
        name: 'ClockN',
        nameAr: 'كلوك إن',
        logoUrl: null,
        apiBaseUrl: AppConfig.apiBaseUrl,
      );

      // Save tenant configuration
      await ref.read(authStateProvider.notifier).setTenant(tenantConfig);

      // Navigate to login
      if (mounted) {
        context.go('/login');
      }
    } on DioException {
      setState(() {
        _errorMessage = 'Cannot connect to server. Check your internet connection.';
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'An unexpected error occurred';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  /// Use local development API (bypasses tenant discovery)
  Future<void> _useLocalApi() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      // Create a development tenant config pointing to localhost
      final tenantConfig = TenantConfig(
        tenantId: 1,
        subdomain: 'localhost',
        name: 'Local Development',
        nameAr: 'تطوير محلي',
        logoUrl: null,
        apiBaseUrl: AppConfig.localApiUrl,
      );

      // Save tenant configuration
      await ref.read(authStateProvider.notifier).setTenant(tenantConfig);

      // Navigate to login
      if (mounted) {
        context.go('/login');
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to configure local API: ${e.toString()}';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 60),

              // Logo
              Center(
                child: SvgPicture.asset(
                  'assets/images/logo.svg',
                  width: 120,
                  height: 120,
                ),
              ),

              const SizedBox(height: 32),

              // Title
              Text(
                l10n.appName,
                style: theme.textTheme.headlineMedium,
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: 8),

              Text(
                'Employee Self Service',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),

              const SizedBox(height: 16),

              // Server info
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.cloud_done_outlined,
                      color: theme.colorScheme.primary,
                      size: 20,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'api.clockn.net',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 48),

              // Error message
              if (_errorMessage != null) ...[
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.error.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.error_outline,
                        color: theme.colorScheme.error,
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          _errorMessage!,
                          style: TextStyle(
                            color: theme.colorScheme.error,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],

              // Connect button
              SizedBox(
                height: 56,
                child: ElevatedButton.icon(
                  onPressed: _isLoading ? null : _connectToServer,
                  icon: _isLoading
                      ? const SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                      : const Icon(Icons.login),
                  label: Text(_isLoading ? 'Connecting...' : l10n.continueText),
                ),
              ),

              const SizedBox(height: 48),

              // Help text
              Text(
                'Contact your administrator if you have trouble connecting.',
                style: theme.textTheme.bodySmall,
                textAlign: TextAlign.center,
              ),

              // Development mode - Local API button
              if (AppConfig.isDevelopment) ...[
                const SizedBox(height: 32),
                const Divider(),
                const SizedBox(height: 16),
                Text(
                  'Development Mode',
                  style: theme.textTheme.labelMedium?.copyWith(
                    color: theme.colorScheme.outline,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  onPressed: _isLoading ? null : _useLocalApi,
                  icon: const Icon(Icons.developer_mode),
                  label: const Text('Use Local API (localhost:5099)'),
                  style: OutlinedButton.styleFrom(
                    minimumSize: const Size(double.infinity, 48),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
