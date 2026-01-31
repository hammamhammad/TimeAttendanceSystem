import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';
import '../models/nfc_tag_model.dart';

/// Repository for NFC tag admin operations.
class NfcTagAdminRepository {
  final Dio _dio;

  NfcTagAdminRepository(this._dio);

  /// Get all NFC tags.
  Future<List<NfcTag>> getTags({String? branchId}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (branchId != null) queryParams['branchId'] = branchId;
      
      final response = await _dio.get(
        '/api/v1/nfc-tags',
        queryParameters: queryParams,
      );
      final List<dynamic> data = response.data;
      return data.map((e) => NfcTag.fromJson(e)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get tags');
    }
  }

  /// Register new NFC tag.
  Future<NfcTag> registerTag(RegisterNfcTagRequest request) async {
    try {
      final response = await _dio.post(
        '/api/v1/nfc-tags',
        data: {
          'tagUid': request.tagUid,
          'branchId': request.branchId,
          'locationDescription': request.locationDescription,
          'enableWriteProtection': request.enableWriteProtection ?? false,
        },
      );
      return NfcTag.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to register tag');
    }
  }

  /// Get write data for NFC tag provisioning.
  Future<NfcWriteData> getWriteData(String tagId) async {
    try {
      final response = await _dio.get('/api/v1/nfc-tags/$tagId/write-data');
      return NfcWriteData.fromJson(response.data);
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to get write data');
    }
  }

  /// Confirm write protection enabled.
  Future<void> confirmWriteProtection(String tagId) async {
    try {
      await _dio.post('/api/v1/nfc-tags/$tagId/confirm-write-protection');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to confirm');
    }
  }

  /// Disable NFC tag.
  Future<void> disableTag(String tagId) async {
    try {
      await _dio.post('/api/v1/nfc-tags/$tagId/disable');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to disable tag');
    }
  }

  /// Enable NFC tag.
  Future<void> enableTag(String tagId) async {
    try {
      await _dio.post('/api/v1/nfc-tags/$tagId/enable');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to enable tag');
    }
  }

  /// Report tag as lost.
  Future<void> reportLost(String tagId) async {
    try {
      await _dio.post('/api/v1/nfc-tags/$tagId/report-lost');
    } on DioException catch (e) {
      throw Exception(e.response?.data?['message'] ?? 'Failed to report lost');
    }
  }
}

/// Provider for NfcTagAdminRepository.
final nfcTagAdminRepositoryProvider = Provider<NfcTagAdminRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return NfcTagAdminRepository(dio);
});

/// NFC tag admin state.
class NfcTagAdminState {
  final bool isLoading;
  final String? error;
  final List<NfcTag> tags;
  final NfcTag? selectedTag;
  final NfcWriteData? pendingWriteData;
  
  const NfcTagAdminState({
    this.isLoading = false,
    this.error,
    this.tags = const [],
    this.selectedTag,
    this.pendingWriteData,
  });
  
  NfcTagAdminState copyWith({
    bool? isLoading,
    String? error,
    List<NfcTag>? tags,
    NfcTag? selectedTag,
    NfcWriteData? pendingWriteData,
  }) {
    return NfcTagAdminState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      tags: tags ?? this.tags,
      selectedTag: selectedTag ?? this.selectedTag,
      pendingWriteData: pendingWriteData ?? this.pendingWriteData,
    );
  }
  
  List<NfcTag> get activeTags =>
      tags.where((t) => t.status == NfcTagStatus.active).toList();
  
  List<NfcTag> get disabledTags =>
      tags.where((t) => t.status == NfcTagStatus.disabled).toList();
      
  List<NfcTag> get pendingTags =>
      tags.where((t) => t.status == NfcTagStatus.registered).toList();
}

/// NFC tag admin notifier.
class NfcTagAdminNotifier extends StateNotifier<NfcTagAdminState> {
  final NfcTagAdminRepository _repository;
  
  NfcTagAdminNotifier(this._repository) : super(const NfcTagAdminState());
  
  /// Load all tags.
  Future<void> loadTags({String? branchId}) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final tags = await _repository.getTags(branchId: branchId);
      state = state.copyWith(
        isLoading: false,
        tags: tags,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
  
  /// Register new tag.
  Future<bool> registerTag({
    required String tagUid,
    required String branchId,
    String? locationDescription,
    bool? enableWriteProtection,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final request = RegisterNfcTagRequest(
        tagUid: tagUid,
        branchId: branchId,
        locationDescription: locationDescription,
        enableWriteProtection: enableWriteProtection,
      );
      
      final tag = await _repository.registerTag(request);
      
      state = state.copyWith(
        isLoading: false,
        tags: [tag, ...state.tags],
        selectedTag: tag,
      );
      
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }
  
  /// Prepare write data for provisioning.
  Future<bool> prepareWriteData(String tagId) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final writeData = await _repository.getWriteData(tagId);
      
      state = state.copyWith(
        isLoading: false,
        pendingWriteData: writeData,
      );
      
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }
  
  /// Clear pending write data.
  void clearPendingWriteData() {
    state = state.copyWith(pendingWriteData: null);
  }
  
  /// Confirm write protection.
  Future<bool> confirmWriteProtection(String tagId) async {
    try {
      await _repository.confirmWriteProtection(tagId);
      await loadTags();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }
  
  /// Toggle tag status.
  Future<bool> toggleTagStatus(String tagId, bool enable) async {
    try {
      if (enable) {
        await _repository.enableTag(tagId);
      } else {
        await _repository.disableTag(tagId);
      }
      await loadTags();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }
  
  /// Report tag as lost.
  Future<bool> reportLost(String tagId) async {
    try {
      await _repository.reportLost(tagId);
      await loadTags();
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }
}

/// Provider for NfcTagAdminNotifier.
final nfcTagAdminProvider = StateNotifierProvider<NfcTagAdminNotifier, NfcTagAdminState>((ref) {
  final repository = ref.watch(nfcTagAdminRepositoryProvider);
  return NfcTagAdminNotifier(repository);
});
