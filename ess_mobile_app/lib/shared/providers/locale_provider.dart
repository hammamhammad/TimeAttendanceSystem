import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';

import '../../core/storage/secure_storage_service.dart';
import '../../core/config/app_config.dart';

/// Locale provider for app language switching.
final localeProvider = StateNotifierProvider<LocaleNotifier, Locale>((ref) {
  return LocaleNotifier();
});

class LocaleNotifier extends StateNotifier<Locale> {
  LocaleNotifier() : super(const Locale('en')) {
    _loadSavedLocale();
  }
  
  Future<void> _loadSavedLocale() async {
    final savedLocale = await SecureStorageService.instance.getLocale();
    if (savedLocale != null) {
      state = Locale(savedLocale);
    }
  }
  
  Future<void> setLocale(String languageCode) async {
    state = Locale(languageCode);
    await SecureStorageService.instance.saveLocale(languageCode);
  }
  
  void toggleLocale() {
    final newLocale = state.languageCode == 'en' ? 'ar' : 'en';
    setLocale(newLocale);
  }
}
