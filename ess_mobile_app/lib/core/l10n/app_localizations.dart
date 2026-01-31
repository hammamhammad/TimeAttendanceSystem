import 'package:flutter/material.dart';

/// Placeholder for app localizations.
/// This should be replaced with proper intl/arb-based localizations.
class AppLocalizations {
  final Locale locale;
  
  AppLocalizations(this.locale);
  
  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations) ??
        AppLocalizations(const Locale('en'));
  }
  
  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();
  
  bool get isArabic => locale.languageCode == 'ar';
  
  // Common strings
  String get appName => isArabic ? 'نظام الحضور والانصراف' : 'Time Attendance';
  String get loading => isArabic ? 'جاري التحميل...' : 'Loading...';
  String get error => isArabic ? 'خطأ' : 'Error';
  String get retry => isArabic ? 'إعادة المحاولة' : 'Retry';
  String get cancel => isArabic ? 'إلغاء' : 'Cancel';
  String get ok => isArabic ? 'موافق' : 'OK';
  String get save => isArabic ? 'حفظ' : 'Save';
  String get submit => isArabic ? 'إرسال' : 'Submit';
  String get next => isArabic ? 'التالي' : 'Next';
  String get back => isArabic ? 'رجوع' : 'Back';
  String get done => isArabic ? 'تم' : 'Done';
  
  // Tenant Discovery
  String get enterCompanyUrl => isArabic 
      ? 'أدخل رابط الشركة' 
      : 'Enter your company URL';
  String get companyUrlHint => isArabic 
      ? 'مثال: acme.timeattendance.com' 
      : 'e.g., acme.timeattendance.com';
  String get continueText => isArabic ? 'متابعة' : 'Continue';
  String get invalidCompanyUrl => isArabic 
      ? 'رابط الشركة غير صحيح' 
      : 'Invalid company URL';
  String get companyNotFound => isArabic 
      ? 'لم يتم العثور على الشركة' 
      : 'Company not found';
  
  // Login
  String get login => isArabic ? 'تسجيل الدخول' : 'Login';
  String get username => isArabic ? 'اسم المستخدم' : 'Username';
  String get email => isArabic ? 'البريد الإلكتروني' : 'Email';
  String get password => isArabic ? 'كلمة المرور' : 'Password';
  String get forgotPassword => isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?';
  String get loginWithBiometric => isArabic 
      ? 'الدخول بالبصمة' 
      : 'Login with Biometric';
  String get invalidCredentials => isArabic 
      ? 'بيانات الدخول غير صحيحة' 
      : 'Invalid credentials';
  
  // Home
  String get home => isArabic ? 'الرئيسية' : 'Home';
  String get welcome => isArabic ? 'مرحباً' : 'Welcome';
  String get todayAttendance => isArabic ? 'حضور اليوم' : "Today's Attendance";
  String get leaveBalance => isArabic ? 'رصيد الإجازات' : 'Leave Balance';
  String get pendingRequests => isArabic ? 'طلبات معلقة' : 'Pending Requests';
  
  // Attendance
  String get attendance => isArabic ? 'الحضور' : 'Attendance';
  String get checkIn => isArabic ? 'تسجيل الحضور' : 'Check In';
  String get checkOut => isArabic ? 'تسجيل الانصراف' : 'Check Out';
  String get breakStart => isArabic ? 'بداية الاستراحة' : 'Start Break';
  String get breakEnd => isArabic ? 'نهاية الاستراحة' : 'End Break';
  String get scanNfcTag => isArabic 
      ? 'امسح بطاقة NFC' 
      : 'Scan NFC Tag';
  String get verifyingLocation => isArabic 
      ? 'جاري التحقق من الموقع...' 
      : 'Verifying location...';
  String get locationVerified => isArabic 
      ? 'تم التحقق من الموقع' 
      : 'Location verified';
  String get outsideGeofence => isArabic 
      ? 'أنت خارج نطاق الموقع المسموح' 
      : 'You are outside the allowed area';
  String get nfcTagScanned => isArabic 
      ? 'تم مسح البطاقة' 
      : 'NFC tag scanned';
  String get checkInSuccess => isArabic 
      ? 'تم تسجيل الحضور بنجاح' 
      : 'Check-in successful';
  String get checkOutSuccess => isArabic 
      ? 'تم تسجيل الانصراف بنجاح' 
      : 'Check-out successful';
  
  // Leave
  String get leave => isArabic ? 'الإجازات' : 'Leave';
  String get myLeaves => isArabic ? 'إجازاتي' : 'My Leaves';
  String get requestLeave => isArabic ? 'طلب إجازة' : 'Request Leave';
  String get leaveType => isArabic ? 'نوع الإجازة' : 'Leave Type';
  String get startDate => isArabic ? 'تاريخ البداية' : 'Start Date';
  String get endDate => isArabic ? 'تاريخ النهاية' : 'End Date';
  String get reason => isArabic ? 'السبب' : 'Reason';
  String get approved => isArabic ? 'موافق عليه' : 'Approved';
  String get pending => isArabic ? 'قيد الانتظار' : 'Pending';
  String get rejected => isArabic ? 'مرفوض' : 'Rejected';
  
  // Notifications
  String get notifications => isArabic ? 'الإشعارات' : 'Notifications';
  String get noNotifications => isArabic 
      ? 'لا توجد إشعارات' 
      : 'No notifications';
  String get markAllRead => isArabic 
      ? 'تحديد الكل كمقروء' 
      : 'Mark all as read';
  
  // Profile
  String get profile => isArabic ? 'الملف الشخصي' : 'Profile';
  String get settings => isArabic ? 'الإعدادات' : 'Settings';
  String get language => isArabic ? 'اللغة' : 'Language';
  String get enableBiometric => isArabic 
      ? 'تفعيل البصمة' 
      : 'Enable Biometric';
  String get logout => isArabic ? 'تسجيل الخروج' : 'Logout';
  String get logoutConfirm => isArabic 
      ? 'هل تريد تسجيل الخروج؟' 
      : 'Are you sure you want to logout?';
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();
  
  @override
  bool isSupported(Locale locale) {
    return ['en', 'ar'].contains(locale.languageCode);
  }
  
  @override
  Future<AppLocalizations> load(Locale locale) async {
    return AppLocalizations(locale);
  }
  
  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}
