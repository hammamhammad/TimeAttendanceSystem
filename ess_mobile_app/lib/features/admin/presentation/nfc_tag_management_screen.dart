import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_theme.dart';
import '../../../shared/models/nfc_tag_model.dart';
import '../../../shared/models/branch_model.dart';
import '../../../shared/providers/nfc_tag_admin_provider.dart';
import '../../../shared/providers/branch_admin_provider.dart';
import '../../../shared/widgets/widgets.dart';

/// NFC tag management screen.
class NfcTagManagementScreen extends ConsumerStatefulWidget {
  const NfcTagManagementScreen({super.key});

  @override
  ConsumerState<NfcTagManagementScreen> createState() => _NfcTagManagementScreenState();
}

class _NfcTagManagementScreenState extends ConsumerState<NfcTagManagementScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(nfcTagAdminProvider.notifier).loadTags();
      ref.read(branchAdminProvider.notifier).loadBranches();
    });
  }
  
  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(nfcTagAdminProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('NFC Tag Management'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Active (${state.activeTags.length})'),
            Tab(text: 'Pending (${state.pendingTags.length})'),
            Tab(text: 'Disabled (${state.disabledTags.length})'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.read(nfcTagAdminProvider.notifier).loadTags(),
          ),
        ],
      ),
      body: state.isLoading
          ? const AppLoading()
          : state.error != null
              ? AppError(
                  message: state.error,
                  onRetry: () => ref.read(nfcTagAdminProvider.notifier).loadTags(),
                )
              : TabBarView(
                  controller: _tabController,
                  children: [
                    _buildTagList(state.activeTags),
                    _buildTagList(state.pendingTags, showProvision: true),
                    _buildTagList(state.disabledTags),
                  ],
                ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showScanSheet(context),
        icon: const Icon(Icons.nfc),
        label: const Text('Scan & Register'),
      ),
    );
  }
  
  Widget _buildTagList(List<NfcTag> tags, {bool showProvision = false}) {
    if (tags.isEmpty) {
      return const AppEmpty(
        message: 'No NFC tags found',
        icon: Icons.nfc,
      );
    }
    
    return RefreshIndicator(
      onRefresh: () => ref.read(nfcTagAdminProvider.notifier).loadTags(),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: tags.length,
        itemBuilder: (context, index) {
          final tag = tags[index];
          return _NfcTagCard(
            tag: tag,
            showProvision: showProvision,
            onProvision: () => _showProvisionSheet(context, tag),
            onToggle: () => _toggleTag(tag),
            onReportLost: () => _reportLost(tag),
          );
        },
      ),
    );
  }
  
  void _showScanSheet(BuildContext context) {
    final branchState = ref.read(branchAdminProvider);
    
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _ScanRegisterSheet(branches: branchState.branches),
    );
  }
  
  void _showProvisionSheet(BuildContext context, NfcTag tag) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => _ProvisionSheet(tag: tag),
    );
  }
  
  Future<void> _toggleTag(NfcTag tag) async {
    final enable = tag.status == NfcTagStatus.disabled;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(enable ? 'Enable Tag' : 'Disable Tag'),
        content: Text(
          enable
              ? 'This will allow this tag to be used for attendance.'
              : 'This tag will no longer be valid for attendance.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(enable ? 'Enable' : 'Disable'),
          ),
        ],
      ),
    );
    
    if (confirmed == true) {
      await ref.read(nfcTagAdminProvider.notifier).toggleTagStatus(tag.id, enable);
    }
  }
  
  Future<void> _reportLost(NfcTag tag) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Report Tag Lost'),
        content: const Text(
          'This will permanently disable this tag. A new tag will need to be provisioned.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.error),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Report Lost'),
          ),
        ],
      ),
    );
    
    if (confirmed == true) {
      await ref.read(nfcTagAdminProvider.notifier).reportLost(tag.id);
    }
  }
}

/// NFC tag card widget.
class _NfcTagCard extends StatelessWidget {
  final NfcTag tag;
  final bool showProvision;
  final VoidCallback? onProvision;
  final VoidCallback? onToggle;
  final VoidCallback? onReportLost;
  
  const _NfcTagCard({
    required this.tag,
    this.showProvision = false,
    this.onProvision,
    this.onToggle,
    this.onReportLost,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy HH:mm');
    
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: _getStatusColor().withOpacity(0.1),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Icon(Icons.nfc, color: _getStatusColor()),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        tag.tagUid,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontFamily: 'monospace',
                        ),
                      ),
                      if (tag.branchName != null)
                        Text(
                          tag.branchName!,
                          style: TextStyle(
                            color: AppColors.textSecondary,
                            fontSize: 13,
                          ),
                        ),
                    ],
                  ),
                ),
                _StatusBadge(status: tag.status),
              ],
            ),
            const SizedBox(height: 12),
            
            // Tag info
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.surfaceVariant,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  _InfoRow(
                    icon: Icons.location_on,
                    label: 'Location',
                    value: tag.locationDescription ?? 'Not specified',
                  ),
                  const SizedBox(height: 8),
                  _InfoRow(
                    icon: Icons.lock,
                    label: 'Write Protected',
                    value: tag.isWriteProtected == true ? 'Yes' : 'No',
                  ),
                  if (tag.lastScannedAt != null) ...[
                    const SizedBox(height: 8),
                    _InfoRow(
                      icon: Icons.access_time,
                      label: 'Last Scanned',
                      value: dateFormat.format(tag.lastScannedAt!),
                    ),
                  ],
                  if (tag.scanCount != null) ...[
                    const SizedBox(height: 8),
                    _InfoRow(
                      icon: Icons.tag,
                      label: 'Total Scans',
                      value: '${tag.scanCount}',
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 12),
            
            // Actions
            Row(
              children: [
                if (showProvision)
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: onProvision,
                      icon: const Icon(Icons.edit_note),
                      label: const Text('Provision'),
                    ),
                  ),
                if (showProvision) const SizedBox(width: 8),
                Expanded(
                  child: OutlinedButton(
                    onPressed: onToggle,
                    style: OutlinedButton.styleFrom(
                      foregroundColor: tag.status == NfcTagStatus.disabled
                          ? AppColors.success
                          : AppColors.warning,
                    ),
                    child: Text(
                      tag.status == NfcTagStatus.disabled ? 'Enable' : 'Disable',
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: onReportLost,
                  icon: Icon(Icons.report_problem, color: AppColors.error),
                  tooltip: 'Report Lost',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  
  Color _getStatusColor() {
    switch (tag.status) {
      case NfcTagStatus.active:
        return AppColors.success;
      case NfcTagStatus.registered:
        return AppColors.warning;
      case NfcTagStatus.disabled:
        return AppColors.textSecondary;
      case NfcTagStatus.lost:
        return AppColors.error;
      default:
        return AppColors.textTertiary;
    }
  }
}

class _StatusBadge extends StatelessWidget {
  final NfcTagStatus status;
  
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    Color color;
    String label;
    
    switch (status) {
      case NfcTagStatus.active:
        color = AppColors.success;
        label = 'Active';
        break;
      case NfcTagStatus.registered:
        color = AppColors.warning;
        label = 'Pending';
        break;
      case NfcTagStatus.disabled:
        color = AppColors.textSecondary;
        label = 'Disabled';
        break;
      case NfcTagStatus.lost:
        color = AppColors.error;
        label = 'Lost';
        break;
      default:
        color = AppColors.textTertiary;
        label = 'Unknown';
    }
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: color,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  
  const _InfoRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 16, color: AppColors.textTertiary),
        const SizedBox(width: 8),
        Text(
          '$label: ',
          style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
        ),
        Expanded(
          child: Text(
            value,
            style: const TextStyle(fontSize: 12),
            textAlign: TextAlign.end,
          ),
        ),
      ],
    );
  }
}

/// Scan and register NFC tag sheet.
class _ScanRegisterSheet extends ConsumerStatefulWidget {
  final List<Branch> branches;
  
  const _ScanRegisterSheet({required this.branches});

  @override
  ConsumerState<_ScanRegisterSheet> createState() => _ScanRegisterSheetState();
}

class _ScanRegisterSheetState extends ConsumerState<_ScanRegisterSheet> {
  String? _scannedUid;
  String? _selectedBranchId;
  final _locationController = TextEditingController();
  bool _enableWriteProtection = true;
  bool _isScanning = false;
  bool _isSubmitting = false;
  
  @override
  void dispose() {
    _locationController.dispose();
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
                  'Register NFC Tag',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 24),
            
            // Scan button
            if (_scannedUid == null)
              SizedBox(
                width: double.infinity,
                height: 120,
                child: OutlinedButton(
                  onPressed: _isScanning ? null : _scanTag,
                  style: OutlinedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (_isScanning)
                        const CircularProgressIndicator()
                      else
                        Icon(Icons.nfc, size: 40, color: AppColors.primary),
                      const SizedBox(height: 8),
                      Text(_isScanning ? 'Scanning...' : 'Tap to Scan NFC Tag'),
                    ],
                  ),
                ),
              )
            else ...[
              // Scanned tag info
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.success.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.success),
                ),
                child: Row(
                  children: [
                    Icon(Icons.check_circle, color: AppColors.success),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Tag Scanned'),
                          Text(
                            _scannedUid!,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontFamily: 'monospace',
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      onPressed: () => setState(() => _scannedUid = null),
                      icon: const Icon(Icons.refresh),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              
              // Branch selection
              AppDropdownField<String>(
                label: 'Branch',
                hint: 'Select branch',
                value: _selectedBranchId,
                items: widget.branches.map((b) => DropdownMenuItem(
                  value: b.id,
                  child: Text(b.name),
                )).toList(),
                onChanged: (value) => setState(() => _selectedBranchId = value),
              ),
              const SizedBox(height: 16),
              
              // Location description
              AppTextField(
                controller: _locationController,
                label: 'Location Description',
                hint: 'e.g., Main Entrance, Reception Desk',
                prefixIcon: Icons.location_on,
              ),
              const SizedBox(height: 16),
              
              // Write protection
              SwitchListTile(
                title: const Text('Enable Write Protection'),
                subtitle: const Text('Prevents tag modification after provisioning'),
                value: _enableWriteProtection,
                onChanged: (value) => setState(() => _enableWriteProtection = value),
                contentPadding: EdgeInsets.zero,
              ),
              const SizedBox(height: 24),
              
              // Register button
              AppButton(
                label: 'Register Tag',
                width: double.infinity,
                isLoading: _isSubmitting,
                onPressed: _selectedBranchId != null ? _register : null,
              ),
            ],
          ],
        ),
      ),
    );
  }
  
  Future<void> _scanTag() async {
    setState(() => _isScanning = true);
    
    // TODO: Implement actual NFC scanning with nfc_manager package
    // For now, simulate a scan
    await Future.delayed(const Duration(seconds: 2));
    
    setState(() {
      _isScanning = false;
      // Simulated UID - replace with actual NFC read
      _scannedUid = 'NFC-${DateTime.now().millisecondsSinceEpoch.toRadixString(16).toUpperCase()}';
    });
  }
  
  Future<void> _register() async {
    if (_scannedUid == null || _selectedBranchId == null) return;
    
    setState(() => _isSubmitting = true);
    
    final success = await ref.read(nfcTagAdminProvider.notifier).registerTag(
      tagUid: _scannedUid!,
      branchId: _selectedBranchId!,
      locationDescription: _locationController.text.isEmpty ? null : _locationController.text,
      enableWriteProtection: _enableWriteProtection,
    );
    
    setState(() => _isSubmitting = false);
    
    if (success && mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('NFC tag registered successfully'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }
}

/// Provision NFC tag sheet.
class _ProvisionSheet extends ConsumerStatefulWidget {
  final NfcTag tag;
  
  const _ProvisionSheet({required this.tag});

  @override
  ConsumerState<_ProvisionSheet> createState() => _ProvisionSheetState();
}

class _ProvisionSheetState extends ConsumerState<_ProvisionSheet> {
  bool _isLoading = true;
  bool _isWriting = false;
  bool _writeComplete = false;
  NfcWriteData? _writeData;
  
  @override
  void initState() {
    super.initState();
    _loadWriteData();
  }
  
  Future<void> _loadWriteData() async {
    final success = await ref.read(nfcTagAdminProvider.notifier).prepareWriteData(widget.tag.id);
    
    if (success) {
      setState(() {
        _isLoading = false;
        _writeData = ref.read(nfcTagAdminProvider).pendingWriteData;
      });
    } else {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Provision NFC Tag',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          if (_isLoading)
            const Center(child: CircularProgressIndicator())
          else if (_writeComplete)
            _buildCompleteState()
          else
            _buildWriteState(),
        ],
      ),
    );
  }
  
  Widget _buildWriteState() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.warning.withOpacity(0.1),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              Icon(Icons.nfc, size: 48, color: AppColors.warning),
              const SizedBox(height: 12),
              const Text(
                'Ready to Write',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              const SizedBox(height: 8),
              Text(
                'Hold the NFC tag near your device to write the verification data.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.textSecondary),
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        
        AppButton(
          label: _isWriting ? 'Writing...' : 'Write to Tag',
          width: double.infinity,
          isLoading: _isWriting,
          onPressed: _writeToTag,
        ),
        const SizedBox(height: 12),
        
        Text(
          'This will permanently lock the tag if write protection is enabled.',
          textAlign: TextAlign.center,
          style: TextStyle(color: AppColors.textTertiary, fontSize: 12),
        ),
      ],
    );
  }
  
  Widget _buildCompleteState() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.success.withOpacity(0.1),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            children: [
              Icon(Icons.check_circle, size: 48, color: AppColors.success),
              const SizedBox(height: 12),
              const Text(
                'Provisioning Complete!',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              const SizedBox(height: 8),
              Text(
                'The NFC tag has been written and is now ready for use.',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.textSecondary),
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        
        AppButton(
          label: 'Done',
          width: double.infinity,
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  }
  
  Future<void> _writeToTag() async {
    if (_writeData == null) return;
    
    setState(() => _isWriting = true);
    
    // TODO: Implement actual NFC writing with nfc_manager package
    // For now, simulate the write
    await Future.delayed(const Duration(seconds: 2));
    
    // Confirm write protection on backend
    await ref.read(nfcTagAdminProvider.notifier).confirmWriteProtection(widget.tag.id);
    
    setState(() {
      _isWriting = false;
      _writeComplete = true;
    });
  }
}
