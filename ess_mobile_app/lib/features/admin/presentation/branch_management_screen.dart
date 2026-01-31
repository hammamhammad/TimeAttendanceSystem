import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:location/location.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/models/branch_model.dart';
import '../../../shared/providers/branch_admin_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// Branch management screen for admins.
class BranchManagementScreen extends ConsumerStatefulWidget {
  const BranchManagementScreen({super.key});

  @override
  ConsumerState<BranchManagementScreen> createState() => _BranchManagementScreenState();
}

class _BranchManagementScreenState extends ConsumerState<BranchManagementScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(branchAdminProvider.notifier).loadBranches();
    });
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(branchAdminProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('Branch Management'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.read(branchAdminProvider.notifier).loadBranches(),
          ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(branchAdminProvider.notifier).loadBranches(),
                )
              : state.branches.isEmpty
                  ? const AppEmpty(
                      message: 'No branches found',
                      icon: Icons.business,
                    )
                  : RefreshIndicator(
                      onRefresh: () => ref.read(branchAdminProvider.notifier).loadBranches(),
                      child: ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: state.branches.length,
                        itemBuilder: (context, index) {
                          final branch = state.branches[index];
                          return _BranchCard(
                            branch: branch,
                            onTap: () => _showGpsEditor(context, branch),
                          );
                        },
                      ),
                    ),
    );
  }
  
  void _showGpsEditor(BuildContext context, Branch branch) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _GpsEditorSheet(branch: branch),
    );
  }
}

/// Branch card widget.
class _BranchCard extends StatelessWidget {
  final Branch branch;
  final VoidCallback onTap;
  
  const _BranchCard({
    required this.branch,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hasGps = branch.latitude != null && branch.longitude != null;
    
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(Icons.business, color: AppColors.primary),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      branch.name,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    if (branch.address != null) ...[
                      const SizedBox(height: 4),
                      Text(
                        branch.address!,
                        style: TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 13,
                        ),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        _InfoChip(
                          icon: Icons.people,
                          label: '${branch.employeeCount ?? 0}',
                        ),
                        const SizedBox(width: 8),
                        _InfoChip(
                          icon: hasGps ? Icons.gps_fixed : Icons.gps_off,
                          label: hasGps ? 'GPS Set' : 'No GPS',
                          color: hasGps ? AppColors.success : AppColors.warning,
                        ),
                        if (branch.geofenceRadius != null) ...[
                          const SizedBox(width: 8),
                          _InfoChip(
                            icon: Icons.radar,
                            label: '${branch.geofenceRadius}m',
                          ),
                        ],
                      ],
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, color: AppColors.textTertiary),
            ],
          ),
        ),
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color? color;
  
  const _InfoChip({
    required this.icon,
    required this.label,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final chipColor = color ?? AppColors.textSecondary;
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: chipColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: chipColor),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: chipColor,
              fontSize: 11,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}

/// GPS editor bottom sheet.
class _GpsEditorSheet extends ConsumerStatefulWidget {
  final Branch branch;
  
  const _GpsEditorSheet({required this.branch});

  @override
  ConsumerState<_GpsEditorSheet> createState() => _GpsEditorSheetState();
}

class _GpsEditorSheetState extends ConsumerState<_GpsEditorSheet> {
  late TextEditingController _latController;
  late TextEditingController _lngController;
  late TextEditingController _radiusController;
  bool _isSubmitting = false;
  bool _isFetchingLocation = false;
  
  @override
  void initState() {
    super.initState();
    _latController = TextEditingController(
      text: widget.branch.latitude?.toString() ?? '',
    );
    _lngController = TextEditingController(
      text: widget.branch.longitude?.toString() ?? '',
    );
    _radiusController = TextEditingController(
      text: (widget.branch.geofenceRadius ?? 100).toString(),
    );
  }
  
  @override
  void dispose() {
    _latController.dispose();
    _lngController.dispose();
    _radiusController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 24,
        right: 24,
        top: 24,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Set GPS Location',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              widget.branch.name,
              style: TextStyle(color: AppColors.textSecondary),
            ),
            const SizedBox(height: 24),
            
            // Current location button
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: _isFetchingLocation ? null : _fetchCurrentLocation,
                icon: _isFetchingLocation
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.my_location),
                label: Text(_isFetchingLocation ? 'Getting location...' : 'Use Current Location'),
              ),
            ),
            const SizedBox(height: 16),
            
            // Coordinates
            Row(
              children: [
                Expanded(
                  child: AppTextField(
                    controller: _latController,
                    label: 'Latitude',
                    hint: 'e.g. 24.7136',
                    keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: AppTextField(
                    controller: _lngController,
                    label: 'Longitude',
                    hint: 'e.g. 46.6753',
                    keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            // Geofence radius
            AppTextField(
              controller: _radiusController,
              label: 'Geofence Radius (meters)',
              hint: 'e.g. 100',
              keyboardType: TextInputType.number,
              prefixIcon: Icons.radar,
            ),
            const SizedBox(height: 8),
            Text(
              'Employees must be within this radius to check in/out',
              style: TextStyle(
                color: AppColors.textTertiary,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 24),
            
            // Save button
            AppButton(
              label: 'Save GPS Location',
              width: double.infinity,
              isLoading: _isSubmitting,
              onPressed: _save,
            ),
          ],
        ),
      ),
    );
  }
  
  Future<void> _fetchCurrentLocation() async {
    setState(() => _isFetchingLocation = true);

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
      var permission = await location.hasPermission();
      if (permission == PermissionStatus.denied) {
        permission = await location.requestPermission();
        if (permission == PermissionStatus.denied) {
          throw Exception('Location permission denied');
        }
      }

      if (permission == PermissionStatus.deniedForever) {
        throw Exception('Location permission permanently denied');
      }

      // Get position
      final locationData = await location.getLocation();

      if (locationData.latitude != null && locationData.longitude != null) {
        setState(() {
          _latController.text = locationData.latitude!.toStringAsFixed(6);
          _lngController.text = locationData.longitude!.toStringAsFixed(6);
        });
      } else {
        throw Exception('Unable to get location');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: ${e.toString()}'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      setState(() => _isFetchingLocation = false);
    }
  }
  
  Future<void> _save() async {
    final lat = double.tryParse(_latController.text);
    final lng = double.tryParse(_lngController.text);
    final radius = int.tryParse(_radiusController.text);
    
    if (lat == null || lng == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter valid coordinates')),
      );
      return;
    }
    
    setState(() => _isSubmitting = true);
    
    final success = await ref.read(branchAdminProvider.notifier).updateGpsCoordinates(
      branchId: widget.branch.id,
      latitude: lat,
      longitude: lng,
      geofenceRadius: radius,
    );
    
    setState(() => _isSubmitting = false);
    
    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('GPS location updated successfully'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }
}
