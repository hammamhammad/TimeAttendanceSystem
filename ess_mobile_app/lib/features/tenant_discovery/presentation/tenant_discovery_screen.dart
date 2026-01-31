import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/config/app_config.dart';
import '../../../core/network/api_client.dart';
import '../../../shared/providers/auth_provider.dart';

/// Tenant discovery screen - first screen the user sees.
/// User enters their company subdomain to discover the API endpoint.
class TenantDiscoveryScreen extends ConsumerStatefulWidget {
  const TenantDiscoveryScreen({super.key});

  @override
  ConsumerState<TenantDiscoveryScreen> createState() => _TenantDiscoveryScreenState();
}

class _TenantDiscoveryScreenState extends ConsumerState<TenantDiscoveryScreen> {
  final _formKey = GlobalKey<FormState>();
  final _domainController = TextEditingController();
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

  @override
  void dispose() {
    _domainController.dispose();
    super.dispose();
  }

  Future<void> _discoverTenant() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final domain = _domainController.text.trim();

      // Call tenant discovery API
      final dio = Dio();
      final response = await dio.get(
        'https://api.timeattendance.com/api/v1/tenants/discover',
        queryParameters: {'domain': domain},
      );

      if (response.statusCode == 200 && response.data != null) {
        final tenantConfig = TenantConfig.fromJson(response.data);

        // Save tenant configuration
        await ref.read(authStateProvider.notifier).setTenant(tenantConfig);

        // Navigate to login
        if (mounted) {
          context.go('/login');
        }
      } else {
        setState(() {
          _errorMessage = AppLocalizations.of(context).companyNotFound;
        });
      }
    } on DioException catch (e) {
      setState(() {
        if (e.response?.statusCode == 404) {
          _errorMessage = AppLocalizations.of(context).companyNotFound;
        } else {
          _errorMessage = e.message ?? 'Connection failed';
        }
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
              
              // Logo/Icon
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.access_time_filled,
                  size: 50,
                  color: theme.colorScheme.primary,
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
                l10n.enterCompanyUrl,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),
              
              const SizedBox(height: 48),
              
              // Form
              Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Domain input
                    TextFormField(
                      controller: _domainController,
                      keyboardType: TextInputType.url,
                      textInputAction: TextInputAction.done,
                      autocorrect: false,
                      decoration: InputDecoration(
                        hintText: l10n.companyUrlHint,
                        prefixIcon: const Icon(Icons.language),
                        suffixText: '.timeattendance.com',
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return l10n.invalidCompanyUrl;
                        }
                        // Basic subdomain validation
                        if (!RegExp(r'^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$')
                            .hasMatch(value.trim())) {
                          return l10n.invalidCompanyUrl;
                        }
                        return null;
                      },
                      onFieldSubmitted: (_) => _discoverTenant(),
                    ),
                    
                    // Error message
                    if (_errorMessage != null) ...[
                      const SizedBox(height: 16),
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
                    ],
                    
                    const SizedBox(height: 24),
                    
                    // Continue button
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _discoverTenant,
                        child: _isLoading
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : Text(l10n.continueText),
                      ),
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 48),

              // Help text
              Text(
                'Contact your administrator if you don\'t know your company URL.',
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
