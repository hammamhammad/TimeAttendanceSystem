import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_client.dart';

/// Repository for manager-specific operations.
class ManagerRepository {
  final Dio _dio;

  ManagerRepository(this._dio);

  /// Get manager dashboard data.
  Future<Map<String, dynamic>> getManagerDashboard() async {
    try {
      final response = await _dio.get('/api/v1/portal/manager-dashboard');
      final data = response.data;

      // Handle Result wrapper from backend
      if (data is Map<String, dynamic>) {
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          return data['value'] as Map<String, dynamic>;
        }
        if (data.containsKey('managerId') || data.containsKey('teamSize')) {
          return data;
        }
        return data;
      }
      return {};
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to load manager dashboard');
    }
  }

  /// Get team members with optional filters.
  Future<List<Map<String, dynamic>>> getTeamMembers({
    bool includeIndirect = true,
    String? search,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'includeIndirect': includeIndirect,
        'page': 1,
        'pageSize': 100,
      };
      if (search != null && search.isNotEmpty) {
        queryParams['search'] = search;
      }

      final response = await _dio.get(
        '/api/v1/portal/team-members',
        queryParameters: queryParams,
      );

      final data = response.data;
      List<dynamic> items;
      if (data is Map<String, dynamic>) {
        // Handle Result wrapper
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          final value = data['value'];
          if (value is Map<String, dynamic>) {
            items = value['items'] ?? value['data'] ?? [];
          } else if (value is List) {
            items = value;
          } else {
            items = [];
          }
        } else {
          items = data['items'] ?? data['data'] ?? [];
        }
      } else if (data is List) {
        items = data;
      } else {
        items = [];
      }

      return items.cast<Map<String, dynamic>>();
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to load team members');
    }
  }

  /// Get pending approvals for the manager.
  Future<List<Map<String, dynamic>>> getPendingApprovals({
    String? entityType,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'page': 1,
        'pageSize': 50,
      };
      if (entityType != null && entityType.isNotEmpty) {
        queryParams['entityType'] = entityType;
      }

      final response = await _dio.get(
        '/api/v1/portal/pending-approvals',
        queryParameters: queryParams,
      );

      final data = response.data;
      List<dynamic> items;
      if (data is Map<String, dynamic>) {
        if (data.containsKey('isSuccess') && data['isSuccess'] == true) {
          final value = data['value'];
          if (value is Map<String, dynamic>) {
            items = value['items'] ?? value['data'] ?? [];
          } else if (value is List) {
            items = value;
          } else {
            items = [];
          }
        } else {
          items = data['items'] ?? data['data'] ?? [];
        }
      } else if (data is List) {
        items = data;
      } else {
        items = [];
      }

      return items.cast<Map<String, dynamic>>();
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to load pending approvals');
    }
  }

  /// Approve a workflow request.
  Future<void> approveRequest(int workflowInstanceId,
      {String? comments}) async {
    try {
      await _dio.post(
        '/api/v1/approvals/$workflowInstanceId/approve',
        data: {
          if (comments != null && comments.isNotEmpty) 'comments': comments,
        },
      );
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to approve request');
    }
  }

  /// Reject a workflow request.
  Future<void> rejectRequest(int workflowInstanceId,
      {String? comments}) async {
    try {
      await _dio.post(
        '/api/v1/approvals/$workflowInstanceId/reject',
        data: {
          if (comments != null && comments.isNotEmpty) 'comments': comments,
        },
      );
    } on DioException catch (e) {
      throw Exception(
          e.response?.data?['message'] ?? 'Failed to reject request');
    }
  }
}

/// Provider for ManagerRepository.
final managerRepositoryProvider = Provider<ManagerRepository>((ref) {
  final dio = ref.watch(dioProvider);
  return ManagerRepository(dio);
});

// ---------------------------------------------------------------------------
// Manager Dashboard State
// ---------------------------------------------------------------------------

/// State for manager dashboard data.
class ManagerDashboardState {
  final bool isLoading;
  final String? error;
  final Map<String, dynamic>? dashboard;

  const ManagerDashboardState({
    this.isLoading = false,
    this.error,
    this.dashboard,
  });

  ManagerDashboardState copyWith({
    bool? isLoading,
    String? error,
    Map<String, dynamic>? dashboard,
  }) {
    return ManagerDashboardState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      dashboard: dashboard ?? this.dashboard,
    );
  }

  // Convenience getters - field names match backend ManagerDashboardDto
  int get teamSize => dashboard?['teamSize'] ?? 0;
  int get presentToday => dashboard?['presentToday'] ?? 0;
  int get absentToday => dashboard?['absentToday'] ?? 0;
  int get lateToday => dashboard?['lateToday'] ?? 0;
  int get onLeaveToday => dashboard?['onVacationToday'] ?? dashboard?['onLeaveToday'] ?? 0;
  int get remoteWorkToday => dashboard?['remoteWorkToday'] ?? 0;
  String get managerName => dashboard?['managerName'] ?? '';
  double get teamAttendanceRate =>
      (dashboard?['teamAttendanceRate'] ?? 0).toDouble();

  // Backend sends pendingApprovals as int and pendingApprovalsSummary as object
  Map<String, dynamic> get pendingApprovalsSummary =>
      dashboard?['pendingApprovalsSummary'] as Map<String, dynamic>? ?? {};
  int get totalPendingApprovals =>
      dashboard?['pendingApprovals'] ?? pendingApprovalsSummary['total'] ?? 0;
  int get pendingVacations =>
      pendingApprovalsSummary['vacations'] ?? pendingApprovalsSummary['pendingVacations'] ?? 0;
  int get pendingExcuses =>
      pendingApprovalsSummary['excuses'] ?? pendingApprovalsSummary['pendingExcuses'] ?? 0;
  int get pendingRemoteWork =>
      pendingApprovalsSummary['remoteWork'] ?? pendingApprovalsSummary['pendingRemoteWork'] ?? 0;
  int get pendingAttendanceCorrection =>
      pendingApprovalsSummary['attendanceCorrection'] ?? pendingApprovalsSummary['pendingAttendanceCorrections'] ?? 0;

  // Backend sends recentPendingApprovals and teamStatusToday
  List<dynamic> get recentTeamActivity =>
      dashboard?['recentPendingApprovals'] as List<dynamic>? ??
      dashboard?['recentTeamActivity'] as List<dynamic>? ?? [];
}

/// Notifier for manager dashboard.
class ManagerDashboardNotifier extends StateNotifier<ManagerDashboardState> {
  final ManagerRepository _repository;

  ManagerDashboardNotifier(this._repository)
      : super(const ManagerDashboardState());

  /// Load dashboard data.
  Future<void> loadDashboard() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final dashboard = await _repository.getManagerDashboard();
      state = state.copyWith(
        isLoading: false,
        dashboard: dashboard,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Refresh dashboard data (same as load but semantically for pull-to-refresh).
  Future<void> refresh() async {
    try {
      final dashboard = await _repository.getManagerDashboard();
      state = state.copyWith(
        dashboard: dashboard,
        error: null,
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
}

/// Provider for ManagerDashboardNotifier.
final managerDashboardProvider =
    StateNotifierProvider<ManagerDashboardNotifier, ManagerDashboardState>(
        (ref) {
  final repository = ref.watch(managerRepositoryProvider);
  return ManagerDashboardNotifier(repository);
});

// ---------------------------------------------------------------------------
// Team Members State
// ---------------------------------------------------------------------------

/// State for team members list.
class TeamMembersState {
  final bool isLoading;
  final String? error;
  final List<Map<String, dynamic>> members;

  const TeamMembersState({
    this.isLoading = false,
    this.error,
    this.members = const [],
  });

  TeamMembersState copyWith({
    bool? isLoading,
    String? error,
    List<Map<String, dynamic>>? members,
  }) {
    return TeamMembersState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      members: members ?? this.members,
    );
  }
}

/// Notifier for team members.
class TeamMembersNotifier extends StateNotifier<TeamMembersState> {
  final ManagerRepository _repository;

  TeamMembersNotifier(this._repository) : super(const TeamMembersState());

  /// Load team members.
  Future<void> loadMembers({bool includeIndirect = true}) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final members = await _repository.getTeamMembers(
        includeIndirect: includeIndirect,
      );
      state = state.copyWith(
        isLoading: false,
        members: members,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Search team members by name.
  Future<void> searchMembers(String query) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final members = await _repository.getTeamMembers(
        includeIndirect: true,
        search: query.isNotEmpty ? query : null,
      );
      state = state.copyWith(
        isLoading: false,
        members: members,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
}

/// Provider for TeamMembersNotifier.
final teamMembersProvider =
    StateNotifierProvider<TeamMembersNotifier, TeamMembersState>((ref) {
  final repository = ref.watch(managerRepositoryProvider);
  return TeamMembersNotifier(repository);
});

// ---------------------------------------------------------------------------
// Pending Approvals State
// ---------------------------------------------------------------------------

/// State for pending approvals list.
class PendingApprovalsState {
  final bool isLoading;
  final String? error;
  final List<Map<String, dynamic>> approvals;

  const PendingApprovalsState({
    this.isLoading = false,
    this.error,
    this.approvals = const [],
  });

  PendingApprovalsState copyWith({
    bool? isLoading,
    String? error,
    List<Map<String, dynamic>>? approvals,
  }) {
    return PendingApprovalsState(
      isLoading: isLoading ?? this.isLoading,
      error: error,
      approvals: approvals ?? this.approvals,
    );
  }
}

/// Notifier for pending approvals.
class PendingApprovalsNotifier extends StateNotifier<PendingApprovalsState> {
  final ManagerRepository _repository;

  PendingApprovalsNotifier(this._repository)
      : super(const PendingApprovalsState());

  /// Load pending approvals with optional entity type filter.
  Future<void> loadApprovals({String? entityType}) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final approvals = await _repository.getPendingApprovals(
        entityType: entityType,
      );
      state = state.copyWith(
        isLoading: false,
        approvals: approvals,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  /// Approve a request.
  Future<bool> approve(int workflowInstanceId, {String? comments}) async {
    try {
      await _repository.approveRequest(workflowInstanceId,
          comments: comments);
      // Remove from list after approval
      state = state.copyWith(
        approvals: state.approvals
            .where((a) =>
                (a['workflowInstanceId'] ?? a['id']) != workflowInstanceId)
            .toList(),
      );
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }

  /// Reject a request.
  Future<bool> reject(int workflowInstanceId, {String? comments}) async {
    try {
      await _repository.rejectRequest(workflowInstanceId,
          comments: comments);
      // Remove from list after rejection
      state = state.copyWith(
        approvals: state.approvals
            .where((a) =>
                (a['workflowInstanceId'] ?? a['id']) != workflowInstanceId)
            .toList(),
      );
      return true;
    } catch (e) {
      state = state.copyWith(error: e.toString());
      return false;
    }
  }
}

/// Provider for PendingApprovalsNotifier.
final pendingApprovalsProvider =
    StateNotifierProvider<PendingApprovalsNotifier, PendingApprovalsState>(
        (ref) {
  final repository = ref.watch(managerRepositoryProvider);
  return PendingApprovalsNotifier(repository);
});
