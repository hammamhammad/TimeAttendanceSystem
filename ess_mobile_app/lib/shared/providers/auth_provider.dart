import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/storage/secure_storage_service.dart';

class AuthState {
  final bool isAuthenticated;
  final String? accessToken;
  final Map<String, dynamic>? user;

  const AuthState({
    this.isAuthenticated = false,
    this.accessToken,
    this.user,
  });

  AuthState copyWith({
    bool? isAuthenticated,
    String? accessToken,
    Map<String, dynamic>? user,
  }) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      accessToken: accessToken ?? this.accessToken,
      user: user ?? this.user,
    );
  }
}

final authStateProvider = AsyncNotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});

class AuthNotifier extends AsyncNotifier<AuthState> {
  final _controller = StreamController<AuthState>.broadcast();

  Stream<AuthState> get stream => _controller.stream;

  @override
  Future<AuthState> build() async {
    final accessToken = await SecureStorageService.instance.getAccessToken();
    final userData = await SecureStorageService.instance.getUserData();

    return AuthState(
      isAuthenticated: accessToken != null,
      accessToken: accessToken,
      user: userData,
    );
  }

  Future<void> login({
    required String accessToken,
    required String refreshToken,
    required Map<String, dynamic> user,
  }) async {
    await SecureStorageService.instance.saveAccessToken(accessToken);
    await SecureStorageService.instance.saveRefreshToken(refreshToken);
    await SecureStorageService.instance.saveUserData(user);

    final newState = AuthState(
      isAuthenticated: true,
      accessToken: accessToken,
      user: user,
    );

    state = AsyncData(newState);
    _controller.add(newState);
  }

  Future<void> logout() async {
    await SecureStorageService.instance.clearAll();
    const newState = AuthState();
    state = const AsyncData(AuthState());
    _controller.add(newState);
  }
}
