import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';
import 'package:local_auth/local_auth.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/config/app_config.dart';
import '../../../core/storage/secure_storage_service.dart';
import '../../../shared/providers/auth_provider.dart';

/// Login screen with email/password and biometric options.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _localAuth = LocalAuthentication();
  
  bool _isLoading = false;
  bool _obscurePassword = true;
  bool _canUseBiometric = false;
  bool _biometricEnabled = false;
  String? _errorMessage;

  String get _apiBaseUrl => AppConfig.isDevelopment ? AppConfig.localApiUrl : AppConfig.apiBaseUrl;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final canCheckBiometrics = await _localAuth.canCheckBiometrics;
    final isDeviceSupported = await _localAuth.isDeviceSupported();
    _canUseBiometric = canCheckBiometrics && isDeviceSupported;

    _biometricEnabled = await SecureStorageService.instance.isBiometricEnabled();

    if (_biometricEnabled && _canUseBiometric) {
      _authenticateWithBiometric();
    }

    setState(() {});
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final dio = Dio();
      final response = await dio.post(
        '$_apiBaseUrl/api/v1/auth/login',
        data: {
          'email': _emailController.text.trim(),
          'password': _passwordController.text,
        },
      );

      if (response.statusCode == 200 && response.data != null) {
        final accessToken = response.data['accessToken'] as String;
        // refreshToken might be null (sent via cookie) or in body
        final refreshToken = response.data['refreshToken'] as String? ?? '';
        final user = response.data['user'] as Map<String, dynamic>;
        final mustChangePassword = response.data['mustChangePassword'] as bool? ?? false;

        // Save auth state
        await ref.read(authStateProvider.notifier).login(
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        );

        // Navigate based on mustChangePassword flag
        if (mounted) {
          if (mustChangePassword) {
            // TODO: Navigate to change password screen
            context.go('/home');
          } else {
            context.go('/home');
          }
        }
      }
    } on DioException catch (e) {
      final statusCode = e.response?.statusCode;
      final responseData = e.response?.data;
      final requestUrl = e.requestOptions.uri.toString();

      setState(() {
        if (statusCode == 401) {
          _errorMessage = AppLocalizations.of(context).invalidCredentials;
        } else if (responseData is Map && responseData['error'] != null) {
          _errorMessage = responseData['error'].toString();
        } else if (e.type == DioExceptionType.connectionError ||
                   e.type == DioExceptionType.connectionTimeout) {
          _errorMessage = 'Cannot connect to server: $requestUrl';
        } else {
          _errorMessage = 'Login failed (HTTP $statusCode): ${e.message}';
        }
      });
      print('Login error: URL=$requestUrl, Status=$statusCode, Body=$responseData');
    } catch (e) {
      setState(() {
        _errorMessage = 'An unexpected error occurred: $e';
      });
      print('Login exception: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _authenticateWithBiometric() async {
    try {
      final authenticated = await _localAuth.authenticate(
        localizedReason: 'Authenticate to login',
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: true,
        ),
      );

      if (authenticated) {
        // Biometric success - use stored refresh token to log back in
        final refreshToken = await SecureStorageService.instance.getRefreshToken();

        if (refreshToken != null) {
          setState(() => _isLoading = true);

          final dio = Dio();
          final response = await dio.post(
            '$_apiBaseUrl/api/v1/auth/refresh',
            data: {'refreshToken': refreshToken},
          );
          
          if (response.statusCode == 200) {
            final accessToken = response.data['accessToken'] as String;
            final newRefreshToken = response.data['refreshToken'] as String?;
            final user = response.data['user'] as Map<String, dynamic>?;
            
            await ref.read(authStateProvider.notifier).login(
              accessToken: accessToken,
              refreshToken: newRefreshToken ?? refreshToken,
              user: user ?? {},
            );
            
            if (mounted) {
              context.go('/home');
            }
          }
        }
      }
    } catch (e) {
      // Biometric failed, show normal login
      print('Biometric auth failed: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.login),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 40),

              // Logo
              Center(
                child: SvgPicture.asset(
                  'assets/images/logo.svg',
                  width: 100,
                  height: 100,
                ),
              ),

              const SizedBox(height: 24),

              // Welcome text
              Text(
                l10n.login,
                style: theme.textTheme.headlineMedium,
                textAlign: TextAlign.center,
              ),
              
              const SizedBox(height: 48),
              
              // Login form
              Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Username field
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.text,
                      textInputAction: TextInputAction.next,
                      autocorrect: false,
                      decoration: InputDecoration(
                        labelText: l10n.username,
                        prefixIcon: const Icon(Icons.person_outlined),
                      ),
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Username is required';
                        }
                        return null;
                      },
                    ),
                    
                    const SizedBox(height: 16),
                    
                    // Password field
                    TextFormField(
                      controller: _passwordController,
                      obscureText: _obscurePassword,
                      textInputAction: TextInputAction.done,
                      decoration: InputDecoration(
                        labelText: l10n.password,
                        prefixIcon: const Icon(Icons.lock_outlined),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined,
                          ),
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                        ),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Password is required';
                        }
                        return null;
                      },
                      onFieldSubmitted: (_) => _login(),
                    ),
                    
                    const SizedBox(height: 8),
                    
                    // Forgot password
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () {
                          // TODO: Navigate to forgot password
                        },
                        child: Text(l10n.forgotPassword),
                      ),
                    ),
                    
                    // Error message
                    if (_errorMessage != null) ...[
                      const SizedBox(height: 8),
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
                                style: TextStyle(color: theme.colorScheme.error),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                    
                    const SizedBox(height: 24),
                    
                    // Login button
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _login,
                        child: _isLoading
                            ? const SizedBox(
                                width: 24,
                                height: 24,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : Text(l10n.login),
                      ),
                    ),
                    
                    // Biometric login
                    if (_canUseBiometric && _biometricEnabled) ...[
                      const SizedBox(height: 24),
                      
                      Row(
                        children: [
                          const Expanded(child: Divider()),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: Text(
                              'OR',
                              style: theme.textTheme.bodySmall,
                            ),
                          ),
                          const Expanded(child: Divider()),
                        ],
                      ),
                      
                      const SizedBox(height: 24),
                      
                      SizedBox(
                        height: 56,
                        child: OutlinedButton.icon(
                          onPressed: _isLoading ? null : _authenticateWithBiometric,
                          icon: const Icon(Icons.fingerprint, size: 28),
                          label: Text(l10n.loginWithBiometric),
                        ),
                      ),
                    ],
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
