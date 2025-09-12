namespace TimeAttendanceSystem.Api.Configuration;

public class CorsSettings
{
    public const string SectionName = "Cors";
    
    public string PolicyName { get; set; } = "DefaultCorsPolicy";
    
    public string[] AllowedOrigins { get; set; } = Array.Empty<string>();
    
    public string[] AllowedMethods { get; set; } = Array.Empty<string>();
    
    public string[] AllowedHeaders { get; set; } = Array.Empty<string>();
    
    public bool AllowCredentials { get; set; }
    
    public int PreflightMaxAge { get; set; } = 86400; // 24 hours in seconds
}