import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:location/location.dart';
import 'package:nfc_manager/nfc_manager.dart';

import '../../core/network/api_service.dart';
import '../models/attendance_model.dart';
import '../providers/api_provider.dart';

/// Attendance result model.
class AttendanceResult {
  final bool success;
  final String message;
  final DateTime? timestamp;
  
  AttendanceResult({
    required this.success,
    required this.message,
    this.timestamp,
  });
}

/// Repository for attendance operations.
class AttendanceRepository {
  final ApiService _apiService;

  AttendanceRepository(this._apiService);

  /// Check if current location is within geofence.
  Future<CheckLocationResponse> checkLocation(double lat, double lng) async {
    final request = CheckLocationRequest(
      latitude: lat,
      longitude: lng,
    );
    return await _apiService.checkLocation(request);
  }

  /// Submit attendance transaction.
  Future<AttendanceTransactionResponse> submitTransaction({
    required TransactionType type,
    required double latitude,
    required double longitude,
    String? nfcTagUid,
    required String deviceId,
    String? notes,
  }) async {
    final request = AttendanceTransactionRequest(
      transactionType: type,
      latitude: latitude,
      longitude: longitude,
      nfcTagUid: nfcTagUid,
      deviceId: deviceId,
      notes: notes,
    );
    return await _apiService.processTransaction(request);
  }
}

/// Provider for AttendanceRepository.
final attendanceRepositoryProvider = Provider<AttendanceRepository>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return AttendanceRepository(apiService);
});

/// Attendance state for the check-in/out flow.
class AttendanceState {
  final bool isLoading;
  final String? error;
  final TransactionType? selectedType;
  final bool gpsVerified;
  final bool nfcVerified;
  final LocationData? currentPosition;
  final String? nfcTagUid;
  final AttendanceResult? lastResult;

  const AttendanceState({
    this.isLoading = false,
    this.error,
    this.selectedType,
    this.gpsVerified = false,
    this.nfcVerified = false,
    this.currentPosition,
    this.nfcTagUid,
    this.lastResult,
  });

  AttendanceState copyWith({
    bool? isLoading,
    String? error,
    TransactionType? selectedType,
    bool? gpsVerified,
    bool? nfcVerified,
    LocationData? currentPosition,
    String? nfcTagUid,
    AttendanceResult? lastResult,
  }) {
    return AttendanceState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      selectedType: selectedType ?? this.selectedType,
      gpsVerified: gpsVerified ?? this.gpsVerified,
      nfcVerified: nfcVerified ?? this.nfcVerified,
      currentPosition: currentPosition ?? this.currentPosition,
      nfcTagUid: nfcTagUid ?? this.nfcTagUid,
      lastResult: lastResult ?? this.lastResult,
    );
  }

  AttendanceState reset() => const AttendanceState();
}

/// Attendance notifier for managing check-in/out flow.
class AttendanceNotifier extends StateNotifier<AttendanceState> {
  final AttendanceRepository _repository;
  
  AttendanceNotifier(this._repository) : super(const AttendanceState());
  
  void selectTransactionType(TransactionType type) {
    state = state.copyWith(selectedType: type);
  }
  
  /// Verify GPS location against geofence.
  Future<bool> verifyGps() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final location = Location();

      // Check if service is enabled
      bool serviceEnabled = await location.serviceEnabled();
      if (!serviceEnabled) {
        serviceEnabled = await location.requestService();
        if (!serviceEnabled) {
          state = state.copyWith(
            isLoading: false,
            error: 'Location service is disabled',
          );
          return false;
        }
      }

      // Check permission
      var permission = await location.hasPermission();
      if (permission == PermissionStatus.denied) {
        permission = await location.requestPermission();
        if (permission == PermissionStatus.denied) {
          state = state.copyWith(
            isLoading: false,
            error: 'Location permission denied',
          );
          return false;
        }
      }

      if (permission == PermissionStatus.deniedForever) {
        state = state.copyWith(
          isLoading: false,
          error: 'Location permission permanently denied',
        );
        return false;
      }

      // Get position
      final locationData = await location.getLocation();

      if (locationData.latitude == null || locationData.longitude == null) {
        state = state.copyWith(
          isLoading: false,
          error: 'Unable to get location',
        );
        return false;
      }

      // Check against API geofence
      final response = await _repository.checkLocation(
        locationData.latitude!,
        locationData.longitude!,
      );

      if (response.isWithinGeofence) {
        state = state.copyWith(
          isLoading: false,
          gpsVerified: true,
          currentPosition: locationData,
        );
        return true;
      } else {
        state = state.copyWith(
          isLoading: false,
          error: response.message ?? 'Outside allowed area',
        );
        return false;
      }
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'GPS verification failed: ${e.toString()}',
      );
      return false;
    }
  }
  
  /// Start NFC scanning session.
  Future<bool> startNfcScan() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final isAvailable = await NfcManager.instance.isAvailable();
      if (!isAvailable) {
        state = state.copyWith(
          isLoading: false,
          error: 'NFC is not available on this device',
        );
        return false;
      }
      
      // Start session
      await NfcManager.instance.startSession(
        onDiscovered: (NfcTag tag) async {
          final tagId = _extractTagId(tag);
          state = state.copyWith(
            isLoading: false,
            nfcVerified: true,
            nfcTagUid: tagId,
          );
          await NfcManager.instance.stopSession();
        },
        onError: (error) async {
          state = state.copyWith(
            isLoading: false,
            error: 'NFC scan failed: ${error.message}',
          );
        },
      );
      
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'NFC error: ${e.toString()}',
      );
      return false;
    }
  }
  
  /// Submit the attendance transaction.
  Future<bool> submitTransaction(String deviceId, {String? notes}) async {
    if (state.selectedType == null) {
      state = state.copyWith(error: 'Please select transaction type');
      return false;
    }

    if (!state.gpsVerified || state.currentPosition == null) {
      state = state.copyWith(error: 'GPS verification required');
      return false;
    }

    final lat = state.currentPosition!.latitude;
    final lng = state.currentPosition!.longitude;

    if (lat == null || lng == null) {
      state = state.copyWith(error: 'Invalid location data');
      return false;
    }

    state = state.copyWith(isLoading: true, error: null);

    try {
      final response = await _repository.submitTransaction(
        type: state.selectedType!,
        latitude: lat,
        longitude: lng,
        nfcTagUid: state.nfcTagUid,
        deviceId: deviceId,
        notes: notes,
      );

      final result = AttendanceResult(
        success: response.success,
        message: response.message,
        timestamp: response.timestamp,
      );

      state = state.copyWith(
        isLoading: false,
        lastResult: result,
      );

      return response.success;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: 'Failed to submit: ${e.toString()}',
      );
      return false;
    }
  }
  
  /// Reset for new transaction.
  void resetFlow() {
    state = state.reset();
  }
  
  String _extractTagId(NfcTag tag) {
    final nfca = tag.data['nfca'];
    if (nfca != null && nfca['identifier'] != null) {
      final bytes = nfca['identifier'] as List<int>;
      return bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join(':').toUpperCase();
    }
    
    final nfcb = tag.data['nfcb'];
    if (nfcb != null && nfcb['identifier'] != null) {
      final bytes = nfcb['identifier'] as List<int>;
      return bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join(':').toUpperCase();
    }
    
    return 'UNKNOWN';
  }
}

/// Provider for AttendanceNotifier.
final attendanceNotifierProvider = StateNotifierProvider<AttendanceNotifier, AttendanceState>((ref) {
  final repository = ref.watch(attendanceRepositoryProvider);
  return AttendanceNotifier(repository);
});
