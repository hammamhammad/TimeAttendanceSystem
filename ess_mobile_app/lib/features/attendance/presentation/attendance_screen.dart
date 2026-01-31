import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:location/location.dart';
import 'package:nfc_manager/nfc_manager.dart';
import 'package:dio/dio.dart';

import '../../../core/l10n/app_localizations.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/storage/secure_storage_service.dart';
import '../../../core/config/app_config.dart';

/// Attendance check-in/out screen with GPS + NFC dual verification.
class AttendanceScreen extends ConsumerStatefulWidget {
  const AttendanceScreen({super.key});

  @override
  ConsumerState<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends ConsumerState<AttendanceScreen> {
  AttendanceStep _currentStep = AttendanceStep.initial;
  TransactionType _transactionType = TransactionType.checkIn;
  
  // GPS Status
  bool _isGpsVerified = false;
  double? _latitude;
  double? _longitude;
  double? _accuracy;
  String? _gpsError;
  
  // NFC Status
  bool _isNfcVerified = false;
  String? _nfcTagUid;
  String? _nfcError;
  bool _isNfcAvailable = false;
  
  // Processing
  bool _isProcessing = false;
  String? _resultMessage;
  bool _isSuccess = false;

  @override
  void initState() {
    super.initState();
    _checkNfcAvailability();
  }

  Future<void> _checkNfcAvailability() async {
    _isNfcAvailable = await NfcManager.instance.isAvailable();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.attendance),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Transaction type selector
            if (_currentStep == AttendanceStep.initial)
              _buildTransactionTypeSelector(theme, l10n),
            
            const SizedBox(height: 24),
            
            // Verification steps
            _buildVerificationSteps(theme, l10n),
            
            const SizedBox(height: 32),
            
            // Action button
            _buildActionButton(theme, l10n),
            
            // Result message
            if (_resultMessage != null) ...[
              const SizedBox(height: 24),
              _buildResultMessage(theme),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionTypeSelector(ThemeData theme, AppLocalizations l10n) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Transaction Type',
              style: theme.textTheme.titleMedium,
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: _TransactionTypeOption(
                    icon: Icons.login,
                    label: l10n.checkIn,
                    isSelected: _transactionType == TransactionType.checkIn,
                    color: AppColors.success,
                    onTap: () => setState(() => _transactionType = TransactionType.checkIn),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _TransactionTypeOption(
                    icon: Icons.logout,
                    label: l10n.checkOut,
                    isSelected: _transactionType == TransactionType.checkOut,
                    color: AppColors.error,
                    onTap: () => setState(() => _transactionType = TransactionType.checkOut),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _TransactionTypeOption(
                    icon: Icons.coffee,
                    label: l10n.breakStart,
                    isSelected: _transactionType == TransactionType.breakStart,
                    color: AppColors.warning,
                    onTap: () => setState(() => _transactionType = TransactionType.breakStart),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _TransactionTypeOption(
                    icon: Icons.play_arrow,
                    label: l10n.breakEnd,
                    isSelected: _transactionType == TransactionType.breakEnd,
                    color: AppColors.primary,
                    onTap: () => setState(() => _transactionType = TransactionType.breakEnd),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVerificationSteps(ThemeData theme, AppLocalizations l10n) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Verification Steps',
              style: theme.textTheme.titleMedium,
            ),
            const SizedBox(height: 24),
            
            // Step 1: GPS Verification
            _VerificationStep(
              stepNumber: 1,
              title: 'GPS Location',
              description: _isGpsVerified 
                  ? 'Location verified ($_accuracy m accuracy)'
                  : (_gpsError ?? l10n.verifyingLocation),
              icon: Icons.location_on,
              isComplete: _isGpsVerified,
              isError: _gpsError != null,
              isActive: _currentStep == AttendanceStep.gpsVerification,
            ),
            
            const SizedBox(height: 16),
            
            // Step 2: NFC Verification
            _VerificationStep(
              stepNumber: 2,
              title: 'NFC Tag',
              description: _isNfcVerified 
                  ? l10n.nfcTagScanned
                  : (_nfcError ?? l10n.scanNfcTag),
              icon: Icons.nfc,
              isComplete: _isNfcVerified,
              isError: _nfcError != null,
              isActive: _currentStep == AttendanceStep.nfcVerification,
            ),
            
            const SizedBox(height: 16),
            
            // Step 3: Complete
            _VerificationStep(
              stepNumber: 3,
              title: 'Complete',
              description: _isSuccess 
                  ? 'Transaction recorded'
                  : 'Submit attendance',
              icon: Icons.check_circle,
              isComplete: _isSuccess,
              isActive: _currentStep == AttendanceStep.submitting,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton(ThemeData theme, AppLocalizations l10n) {
    String buttonText;
    VoidCallback? onPressed;
    Color buttonColor;
    
    switch (_currentStep) {
      case AttendanceStep.initial:
        buttonText = 'Start Verification';
        onPressed = _startGpsVerification;
        buttonColor = AppColors.primary;
        break;
      case AttendanceStep.gpsVerification:
        buttonText = l10n.verifyingLocation;
        onPressed = null;
        buttonColor = AppColors.primary;
        break;
      case AttendanceStep.nfcVerification:
        buttonText = l10n.scanNfcTag;
        onPressed = null;
        buttonColor = AppColors.primary;
        break;
      case AttendanceStep.submitting:
        buttonText = l10n.loading;
        onPressed = null;
        buttonColor = AppColors.primary;
        break;
      case AttendanceStep.complete:
        buttonText = 'Done';
        onPressed = _reset;
        buttonColor = _isSuccess ? AppColors.success : AppColors.error;
        break;
    }
    
    return SizedBox(
      height: 56,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: buttonColor,
        ),
        child: _isProcessing
            ? const SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: Colors.white,
                ),
              )
            : Text(buttonText),
      ),
    );
  }

  Widget _buildResultMessage(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: (_isSuccess ? AppColors.success : AppColors.error).withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: (_isSuccess ? AppColors.success : AppColors.error).withOpacity(0.3),
        ),
      ),
      child: Row(
        children: [
          Icon(
            _isSuccess ? Icons.check_circle : Icons.error,
            color: _isSuccess ? AppColors.success : AppColors.error,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              _resultMessage!,
              style: TextStyle(
                color: _isSuccess ? AppColors.success : AppColors.error,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // GPS Verification
  Future<void> _startGpsVerification() async {
    setState(() {
      _currentStep = AttendanceStep.gpsVerification;
      _gpsError = null;
      _isProcessing = true;
    });

    try {
      final location = Location();

      // Check if service is enabled
      bool serviceEnabled = await location.serviceEnabled();
      if (!serviceEnabled) {
        serviceEnabled = await location.requestService();
        if (!serviceEnabled) {
          throw Exception('Location service is disabled');
        }
      }

      // Check permission
      PermissionStatus permission = await location.hasPermission();
      if (permission == PermissionStatus.denied) {
        permission = await location.requestPermission();
        if (permission == PermissionStatus.denied) {
          throw Exception('Location permission denied');
        }
      }

      if (permission == PermissionStatus.deniedForever) {
        throw Exception('Location permission permanently denied. Please enable in settings.');
      }

      // Get current position
      final locationData = await location.getLocation();

      _latitude = locationData.latitude;
      _longitude = locationData.longitude;
      _accuracy = locationData.accuracy;

      // Check if accuracy is acceptable
      if (_accuracy != null && _accuracy! > AppConfig.minGpsAccuracyMeters * 2) {
        throw Exception('GPS accuracy too low. Please move to an open area.');
      }

      // Verify location with backend (check geofence)
      final tenantConfig = await SecureStorageService.instance.getTenantConfig();
      final accessToken = await SecureStorageService.instance.getAccessToken();

      final dio = Dio();
      final response = await dio.post(
        '${tenantConfig?.apiBaseUrl}/api/v1/mobile/attendance/check-location',
        data: {
          'latitude': _latitude,
          'longitude': _longitude,
        },
        options: Options(
          headers: {'Authorization': 'Bearer $accessToken'},
        ),
      );

      if (response.statusCode == 200 && response.data['isWithinGeofence'] == true) {
        setState(() {
          _isGpsVerified = true;
          _isProcessing = false;
        });

        // Start NFC verification
        _startNfcVerification();
      } else {
        throw Exception(AppLocalizations.of(context).outsideGeofence);
      }
    } catch (e) {
      setState(() {
        _gpsError = e.toString().replaceAll('Exception: ', '');
        _isProcessing = false;
        _currentStep = AttendanceStep.complete;
        _isSuccess = false;
        _resultMessage = _gpsError;
      });
    }
  }

  // NFC Verification
  Future<void> _startNfcVerification() async {
    if (!_isNfcAvailable) {
      setState(() {
        _nfcError = 'NFC is not available on this device';
        _currentStep = AttendanceStep.complete;
        _isSuccess = false;
        _resultMessage = _nfcError;
      });
      return;
    }

    setState(() {
      _currentStep = AttendanceStep.nfcVerification;
      _nfcError = null;
    });

    try {
      await NfcManager.instance.startSession(
        onDiscovered: (NfcTag tag) async {
          // Extract tag UID
          final nfca = tag.data['nfca'];
          final nfcb = tag.data['nfcb'];
          final nfcf = tag.data['nfcf'];
          final nfcv = tag.data['nfcv'];
          
          List<int>? identifier;
          if (nfca != null) {
            identifier = List<int>.from(nfca['identifier']);
          } else if (nfcb != null) {
            identifier = List<int>.from(nfcb['identifier']);
          } else if (nfcf != null) {
            identifier = List<int>.from(nfcf['identifier']);
          } else if (nfcv != null) {
            identifier = List<int>.from(nfcv['identifier']);
          }
          
          if (identifier != null) {
            _nfcTagUid = identifier.map((b) => b.toRadixString(16).padLeft(2, '0')).join(':').toUpperCase();
            
            await NfcManager.instance.stopSession();
            
            setState(() {
              _isNfcVerified = true;
            });
            
            // Submit transaction
            _submitTransaction();
          }
        },
        onError: (error) async {
          await NfcManager.instance.stopSession();
          setState(() {
            _nfcError = error.message;
            _currentStep = AttendanceStep.complete;
            _isSuccess = false;
            _resultMessage = _nfcError;
          });
        },
      );
    } catch (e) {
      setState(() {
        _nfcError = e.toString();
        _currentStep = AttendanceStep.complete;
        _isSuccess = false;
        _resultMessage = _nfcError;
      });
    }
  }

  // Submit Transaction
  Future<void> _submitTransaction() async {
    setState(() {
      _currentStep = AttendanceStep.submitting;
      _isProcessing = true;
    });

    try {
      final tenantConfig = await SecureStorageService.instance.getTenantConfig();
      final accessToken = await SecureStorageService.instance.getAccessToken();
      
      final dio = Dio();
      final response = await dio.post(
        '${tenantConfig?.apiBaseUrl}/api/v1/mobile/attendance/transaction',
        data: {
          'transactionType': _transactionType.index,
          'latitude': _latitude,
          'longitude': _longitude,
          'nfcTagUid': _nfcTagUid,
          'deviceId': 'mobile_app', // TODO: Get actual device ID
        },
        options: Options(
          headers: {'Authorization': 'Bearer $accessToken'},
        ),
      );

      if (response.statusCode == 200) {
        final l10n = AppLocalizations.of(context);
        setState(() {
          _isSuccess = true;
          _resultMessage = _transactionType == TransactionType.checkIn
              ? l10n.checkInSuccess
              : l10n.checkOutSuccess;
        });
      } else {
        throw Exception('Transaction failed');
      }
    } catch (e) {
      setState(() {
        _isSuccess = false;
        _resultMessage = 'Failed: ${e.toString()}';
      });
    } finally {
      setState(() {
        _currentStep = AttendanceStep.complete;
        _isProcessing = false;
      });
    }
  }

  void _reset() {
    setState(() {
      _currentStep = AttendanceStep.initial;
      _isGpsVerified = false;
      _isNfcVerified = false;
      _gpsError = null;
      _nfcError = null;
      _resultMessage = null;
      _isSuccess = false;
      _latitude = null;
      _longitude = null;
      _nfcTagUid = null;
    });
  }
}

// Enums
enum AttendanceStep {
  initial,
  gpsVerification,
  nfcVerification,
  submitting,
  complete,
}

enum TransactionType {
  checkIn,
  checkOut,
  breakStart,
  breakEnd,
}

// Helper widgets

class _TransactionTypeOption extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isSelected;
  final Color color;
  final VoidCallback onTap;

  const _TransactionTypeOption({
    required this.icon,
    required this.label,
    required this.isSelected,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: isSelected ? color.withOpacity(0.15) : Colors.transparent,
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isSelected ? color : AppColors.outline,
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Column(
            children: [
              Icon(icon, color: isSelected ? color : AppColors.textSecondary),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: isSelected ? color : AppColors.textSecondary,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _VerificationStep extends StatelessWidget {
  final int stepNumber;
  final String title;
  final String description;
  final IconData icon;
  final bool isComplete;
  final bool isError;
  final bool isActive;

  const _VerificationStep({
    required this.stepNumber,
    required this.title,
    required this.description,
    required this.icon,
    this.isComplete = false,
    this.isError = false,
    this.isActive = false,
  });

  @override
  Widget build(BuildContext context) {
    Color statusColor;
    if (isError) {
      statusColor = AppColors.error;
    } else if (isComplete) {
      statusColor = AppColors.success;
    } else if (isActive) {
      statusColor = AppColors.primary;
    } else {
      statusColor = AppColors.textTertiary;
    }

    return Row(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: statusColor.withOpacity(0.1),
            shape: BoxShape.circle,
            border: Border.all(color: statusColor, width: 2),
          ),
          child: isActive && !isComplete && !isError
              ? Center(
                  child: SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: statusColor,
                    ),
                  ),
                )
              : Icon(
                  isError ? Icons.error : (isComplete ? Icons.check : icon),
                  color: statusColor,
                ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  color: statusColor,
                ),
              ),
              Text(
                description,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: isError ? AppColors.error : null,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
