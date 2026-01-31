import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';

/// Full screen loading indicator.
class AppLoading extends StatelessWidget {
  final String? message;
  
  const AppLoading({super.key, this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(
            strokeWidth: 3,
          ),
          if (message != null) ...[
            const SizedBox(height: 16),
            Text(
              message!,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Inline loading indicator for buttons, etc.
class AppLoadingSmall extends StatelessWidget {
  final Color? color;
  final double size;
  
  const AppLoadingSmall({
    super.key, 
    this.color,
    this.size = 20,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CircularProgressIndicator(
        strokeWidth: 2,
        color: color ?? Colors.white,
      ),
    );
  }
}

/// Shimmer loading placeholder for lists.
class ShimmerLoading extends StatelessWidget {
  final double height;
  final double? width;
  final BorderRadius? borderRadius;
  
  const ShimmerLoading({
    super.key,
    this.height = 60,
    this.width,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width ?? double.infinity,
      decoration: BoxDecoration(
        color: AppColors.surfaceVariant,
        borderRadius: borderRadius ?? BorderRadius.circular(8),
      ),
    );
  }
}
