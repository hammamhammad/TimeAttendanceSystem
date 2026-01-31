import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

import '../../shared/models/user_model.dart';
import '../../shared/models/attendance_model.dart';

part 'api_service.g.dart';

@RestApi()
abstract class ApiService {
  factory ApiService(Dio dio, {String baseUrl}) = _ApiService;

  // Tenant Discovery
  @GET('/api/v1/tenants/discover')
  Future<dynamic> discoverTenant(@Query('domain') String domain);

  // Authentication
  @POST('/api/v1/auth/login')
  Future<AuthResponse> login(@Body() Map<String, dynamic> body);

  @POST('/api/v1/auth/refresh-token')
  Future<AuthResponse> refreshToken(@Body() Map<String, dynamic> body);

  @POST('/api/v1/mobile/attendance/check-location')
  Future<CheckLocationResponse> checkLocation(@Body() CheckLocationRequest request);

  @POST('/api/v1/mobile/attendance/transaction')
  Future<AttendanceTransactionResponse> processTransaction(@Body() AttendanceTransactionRequest request);

  @POST('/api/v1/push-tokens/register')
  Future<void> registerPushToken(@Body() Map<String, dynamic> body);

  @POST('/api/v1/push-tokens/unregister')
  Future<void> unregisterPushToken(@Body() Map<String, dynamic> body);
}
