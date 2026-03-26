import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../core/l10n/app_localizations.dart';

import '../features/tenant_discovery/presentation/tenant_discovery_screen.dart';
import '../features/auth/presentation/login_screen.dart';
import '../features/home/presentation/home_screen.dart';
import '../features/attendance/presentation/attendance_screen.dart';
import '../features/leave/presentation/leave_list_screen.dart';
import '../features/excuse/presentation/excuse_list_screen.dart';
import '../features/remote_work/presentation/remote_work_screen.dart';
import '../features/schedule/presentation/schedule_screen.dart';
import '../features/notifications/presentation/notifications_screen.dart';
import '../features/profile/presentation/profile_screen.dart';
import '../features/requests/presentation/requests_hub_screen.dart';
import '../features/attendance_corrections/presentation/attendance_corrections_screen.dart';
import '../features/manager/presentation/manager_dashboard_screen.dart';
import '../features/manager/presentation/team_members_screen.dart';
import '../features/manager/presentation/pending_approvals_screen.dart';
import '../features/leave/presentation/leave_detail_screen.dart';
import '../features/excuse/presentation/excuse_detail_screen.dart';
import '../features/remote_work/presentation/remote_work_detail_screen.dart';
import '../features/admin/presentation/admin_dashboard_screen.dart';
import '../features/admin/presentation/nfc_tag_management_screen.dart';
import '../features/admin/presentation/notification_broadcast_screen.dart';
import '../features/admin/presentation/branch_management_screen.dart';
import '../shared/providers/auth_provider.dart';

/// Router provider using GoRouter for declarative navigation.
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);

  return GoRouter(
    initialLocation: '/',
    debugLogDiagnostics: true,

    // Refresh router when auth state changes
    refreshListenable: GoRouterRefreshStream(ref.read(authStateProvider.notifier).stream),

    // Redirect unauthenticated users to tenant discovery/login
    redirect: (context, state) {
      final isAuthenticated = authState.valueOrNull?.isAuthenticated ?? false;
      final hasTenant = authState.valueOrNull?.hasTenant ?? false;
      final isGoingToAuth = state.matchedLocation == '/login' ||
                            state.matchedLocation == '/tenant-discovery' ||
                            state.matchedLocation == '/';

      // Not configured tenant yet
      if (!hasTenant && state.matchedLocation != '/tenant-discovery' && state.matchedLocation != '/') {
        return '/tenant-discovery';
      }

      // Not authenticated
      if (hasTenant && !isAuthenticated && state.matchedLocation != '/login') {
        return '/login';
      }

      // Already authenticated, redirect from auth pages
      if (isAuthenticated && isGoingToAuth) {
        return '/home';
      }

      return null;
    },

    routes: [
      // Initial route - check tenant configuration
      GoRoute(
        path: '/',
        builder: (context, state) => const TenantDiscoveryScreen(),
      ),

      // Tenant discovery
      GoRoute(
        path: '/tenant-discovery',
        builder: (context, state) => const TenantDiscoveryScreen(),
      ),

      // Login
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),

      // Main app shell with bottom navigation
      ShellRoute(
        builder: (context, state, child) => MainShell(child: child),
        routes: [
          GoRoute(
            path: '/home',
            builder: (context, state) => const HomeScreen(),
          ),
          GoRoute(
            path: '/attendance',
            builder: (context, state) => const AttendanceScreen(),
          ),
          // Requests hub (replaces old /leave in bottom nav)
          GoRoute(
            path: '/requests',
            builder: (context, state) => const RequestsHubScreen(),
          ),
          // Individual request screens (navigated from hub or deep links)
          GoRoute(
            path: '/leave',
            builder: (context, state) => const LeaveListScreen(),
          ),
          GoRoute(
            path: '/excuses',
            builder: (context, state) => const ExcuseListScreen(),
          ),
          GoRoute(
            path: '/remote-work',
            builder: (context, state) => const RemoteWorkScreen(),
          ),
          GoRoute(
            path: '/schedule',
            builder: (context, state) => const ScheduleScreen(),
          ),
          GoRoute(
            path: '/attendance-corrections',
            builder: (context, state) => const AttendanceCorrectionsScreen(),
          ),
          // Detail screens (receive data via extra)
          GoRoute(
            path: '/leave-detail',
            builder: (context, state) => const LeaveDetailScreen(),
          ),
          GoRoute(
            path: '/excuse-detail',
            builder: (context, state) => const ExcuseDetailScreen(),
          ),
          GoRoute(
            path: '/remote-work-detail',
            builder: (context, state) => const RemoteWorkDetailScreen(),
          ),
          // Manager screens
          GoRoute(
            path: '/manager-dashboard',
            builder: (context, state) => const ManagerDashboardScreen(),
          ),
          GoRoute(
            path: '/team-members',
            builder: (context, state) => const TeamMembersScreen(),
          ),
          GoRoute(
            path: '/pending-approvals',
            builder: (context, state) => const PendingApprovalsScreen(),
          ),
          // Core screens
          GoRoute(
            path: '/notifications',
            builder: (context, state) => const NotificationsScreen(),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => const ProfileScreen(),
          ),
          // Admin screens
          GoRoute(
            path: '/admin-dashboard',
            builder: (context, state) => const AdminDashboardScreen(),
          ),
          GoRoute(
            path: '/nfc-management',
            builder: (context, state) => const NfcTagManagementScreen(),
          ),
          GoRoute(
            path: '/notification-broadcast',
            builder: (context, state) => const NotificationBroadcastScreen(),
          ),
          GoRoute(
            path: '/branch-management',
            builder: (context, state) => const BranchManagementScreen(),
          ),
        ],
      ),
    ],

    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Text('Page not found: ${state.error}'),
      ),
    ),
  );
});

/// Main shell widget with bottom navigation bar.
/// Bottom nav: Home | Attendance | Requests | Notifications | Profile
class MainShell extends StatefulWidget {
  final Widget child;

  const MainShell({super.key, required this.child});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  DateTime? _lastBackPressTime;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (bool didPop, dynamic result) {
        if (didPop) return;

        // If there's a pushed route on the stack, pop it (back navigation)
        if (GoRouter.of(context).canPop()) {
          GoRouter.of(context).pop();
          return;
        }

        // On a root tab — double-back-to-exit
        final now = DateTime.now();
        if (_lastBackPressTime != null &&
            now.difference(_lastBackPressTime!) < const Duration(seconds: 2)) {
          SystemNavigator.pop();
          return;
        }

        _lastBackPressTime = now;
        ScaffoldMessenger.of(context).clearSnackBars();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(l10n.pressBackToExit),
            duration: const Duration(seconds: 2),
            behavior: SnackBarBehavior.floating,
          ),
        );
      },
      child: Scaffold(
        body: widget.child,
        bottomNavigationBar: NavigationBar(
          selectedIndex: _calculateSelectedIndex(context),
          onDestinationSelected: (index) => _onItemTapped(index, context),
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home),
              label: 'Home',
            ),
            NavigationDestination(
              icon: Icon(Icons.fingerprint_outlined),
              selectedIcon: Icon(Icons.fingerprint),
              label: 'Attendance',
            ),
            NavigationDestination(
              icon: Icon(Icons.description_outlined),
              selectedIcon: Icon(Icons.description),
              label: 'Requests',
            ),
            NavigationDestination(
              icon: Icon(Icons.notifications_outlined),
              selectedIcon: Icon(Icons.notifications),
              label: 'Notifications',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outlined),
              selectedIcon: Icon(Icons.person),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }

  int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith('/home')) return 0;
    if (location.startsWith('/attendance')) return 1;
    // Requests hub and all sub-screens highlight the Requests tab
    if (location.startsWith('/requests') ||
        location.startsWith('/leave') ||
        location.startsWith('/excuses') ||
        location.startsWith('/remote-work') ||
        location.startsWith('/schedule') ||
        location.startsWith('/attendance-corrections')) return 2;
    if (location.startsWith('/notifications')) return 3;
    if (location.startsWith('/profile') ||
        location.startsWith('/manager-dashboard') ||
        location.startsWith('/team-members') ||
        location.startsWith('/pending-approvals') ||
        location.startsWith('/admin-dashboard') ||
        location.startsWith('/nfc-management') ||
        location.startsWith('/notification-broadcast') ||
        location.startsWith('/branch-management')) return 4;
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go('/home');
        break;
      case 1:
        context.go('/attendance');
        break;
      case 2:
        context.go('/requests');
        break;
      case 3:
        context.go('/notifications');
        break;
      case 4:
        context.go('/profile');
        break;
    }
  }
}

/// Helper class to create a Listenable from a Stream for GoRouter refresh.
class GoRouterRefreshStream extends ChangeNotifier {
  GoRouterRefreshStream(Stream<dynamic> stream) {
    _subscription = stream.asBroadcastStream().listen((_) => notifyListeners());
  }

  late final dynamic _subscription;

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }
}
