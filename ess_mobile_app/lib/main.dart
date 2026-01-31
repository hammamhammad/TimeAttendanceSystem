import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'app/app.dart';
import 'core/storage/secure_storage_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase for push notifications (optional in dev)
  try {
    await Firebase.initializeApp();
  } catch (e) {
    debugPrint('Firebase not configured: $e');
    debugPrint('Push notifications will not work until Firebase is configured.');
  }
  
  // Initialize secure storage
  await SecureStorageService.instance.init();
  
  runApp(
    const ProviderScope(
      child: EssApp(),
    ),
  );
}
