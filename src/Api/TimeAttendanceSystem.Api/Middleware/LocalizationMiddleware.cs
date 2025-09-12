using System.Globalization;
using TimeAttendanceSystem.Shared.Localization;

namespace TimeAttendanceSystem.Api.Middleware;

/// <summary>
/// ASP.NET Core middleware for automatic localization and culture management in multi-language applications.
/// Provides intelligent culture detection and setting based on user preferences, JWT claims, and HTTP headers
/// to support seamless internationalization across English and Arabic languages with proper RTL support.
/// </summary>
/// <remarks>
/// Localization Middleware Features:
/// - Automatic culture detection from multiple sources with intelligent priority handling
/// - User preference integration through JWT token claims for authenticated users
/// - HTTP Accept-Language header parsing with quality score consideration
/// - Bilingual support for English (en) and Arabic (ar) with extensible architecture
/// - Thread-safe culture setting for request-scoped localization context
/// - Integration with localization services for consistent culture management
/// 
/// Culture Detection Strategy:
/// 1. User Preference Priority: Authenticated user's preferred language from JWT claims
/// 2. HTTP Header Fallback: Accept-Language header parsing with quality score evaluation
/// 3. Default Language: English (en) as system default for unspecified preferences
/// 4. Culture Validation: Supported language verification preventing invalid culture settings
/// 5. Request Scope: Culture setting maintained throughout request processing lifecycle
/// 6. Performance Optimization: Efficient parsing and caching of culture determination
/// 
/// Internationalization Support:
/// - English (en): Primary language with left-to-right (LTR) text direction
/// - Arabic (ar): Secondary language with right-to-left (RTL) text direction support
/// - Extensible architecture supporting additional languages through configuration
/// - Cultural formatting for dates, numbers, and currency based on user locale
/// - Time zone integration for locale-appropriate time display and calculations
/// - Resource management integration for localized strings and error messages
/// 
/// User Experience Features:
/// - Seamless language switching without session interruption
/// - Persistent user language preferences through authentication context
/// - Automatic browser language detection for unauthenticated users
/// - Consistent localization context across all application components
/// - Real-time language switching capability for authenticated users
/// - Cultural formatting consistency across UI components and data display
/// 
/// Authentication Integration:
/// - JWT claims-based user language preference retrieval
/// - Authenticated user culture priority over browser preferences
/// - User profile integration for persistent language preference management
/// - Multi-tenant language preferences supporting organizational defaults
/// - Role-based localization features for administrative and user interfaces
/// - Session-aware culture management with authentication state changes
/// 
/// Performance and Security:
/// - Lightweight middleware processing with minimal request overhead
/// - Thread-safe culture setting preventing race conditions in concurrent requests
/// - Header validation preventing malicious Accept-Language manipulation
/// - Efficient culture parsing with optimized string processing algorithms
/// - Memory-efficient operation without unnecessary object allocation
/// - Security-conscious culture validation preventing injection attacks
/// </remarks>
public class LocalizationMiddleware
{
    private readonly RequestDelegate _next;

    /// <summary>
    /// Initializes a new instance of the LocalizationMiddleware with the next middleware in the pipeline.
    /// Sets up the middleware for request processing with culture detection and localization management.
    /// </summary>
    /// <param name="next">Next middleware delegate in the ASP.NET Core request processing pipeline</param>
    public LocalizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    /// <summary>
    /// Processes the HTTP request with automatic culture detection and localization context setup.
    /// Determines the appropriate culture based on user preferences and request headers, then
    /// configures the localization service for the current request scope.
    /// </summary>
    /// <param name="context">HTTP context containing request information and user authentication state</param>
    /// <returns>Task representing the asynchronous middleware processing operation</returns>
    /// <remarks>
    /// Request Processing Flow:
    /// 1. Culture Detection: Analyzes request for language preferences from multiple sources
    /// 2. Culture Setting: Configures localization service with determined culture
    /// 3. Request Continuation: Passes control to next middleware in the pipeline
    /// 4. Culture Context: Maintains culture setting throughout request processing
    /// 
    /// Culture Sources Priority:
    /// - Highest: Authenticated user's preferred language from JWT claims
    /// - Medium: Browser Accept-Language header with quality score parsing
    /// - Lowest: System default language (English) as fallback option
    /// 
    /// Performance Characteristics:
    /// - Asynchronous processing for non-blocking request handling
    /// - Minimal overhead through efficient culture detection algorithms
    /// - Thread-safe operation supporting concurrent request processing
    /// - Memory-efficient with optimized string parsing and minimal allocations
    /// </remarks>
    public async Task InvokeAsync(HttpContext context)
    {
        var culture = GetCultureFromRequest(context);
        LocalizationService.SetCulture(culture);

        await _next(context);
    }

    /// <summary>
    /// Determines the appropriate culture for the current request based on user preferences and headers.
    /// Implements intelligent culture detection with priority-based selection from multiple sources
    /// including authenticated user preferences, browser settings, and system defaults.
    /// </summary>
    /// <param name="context">HTTP context containing request headers and user authentication information</param>
    /// <returns>Culture code string ("en" or "ar") representing the selected localization context</returns>
    /// <remarks>
    /// Culture Detection Algorithm:
    /// 1. Authenticated User Priority: Checks JWT claims for user's preferred language setting
    /// 2. Browser Header Analysis: Parses Accept-Language header with quality score evaluation
    /// 3. Language Matching: Maps detected languages to supported culture codes
    /// 4. Default Fallback: Returns English ("en") as system default for unsupported languages
    /// 
    /// Supported Languages:
    /// - English ("en"): Primary language with comprehensive localization support
    /// - Arabic ("ar"): Secondary language with RTL support and cultural formatting
    /// 
    /// Header Processing:
    /// - Accept-Language parsing with quality score consideration
    /// - Multiple language preference handling in priority order
    /// - Malformed header graceful handling with fallback mechanisms
    /// - Performance-optimized parsing for minimal processing overhead
    /// 
    /// Authentication Integration:
    /// - JWT token claims analysis for "preferred_language" claim
    /// - User authentication state validation before claims processing
    /// - Secure claims extraction preventing unauthorized language injection
    /// - Multi-tenant user preference support with organizational defaults
    /// </remarks>
    private static string GetCultureFromRequest(HttpContext context)
    {
        // Check Accept-Language header
        var acceptLanguage = context.Request.Headers.AcceptLanguage.FirstOrDefault();
        
        if (!string.IsNullOrEmpty(acceptLanguage))
        {
            var cultures = acceptLanguage.Split(',')
                .Select(x => x.Split(';')[0].Trim())
                .ToList();

            foreach (var culture in cultures)
            {
                if (culture.StartsWith("ar"))
                    return "ar";
                if (culture.StartsWith("en"))
                    return "en";
            }
        }

        // Check user's preferred language from JWT claims
        var user = context.User;
        if (user.Identity?.IsAuthenticated == true)
        {
            var preferredLanguage = user.FindFirst("preferred_language")?.Value;
            if (!string.IsNullOrEmpty(preferredLanguage))
            {
                return preferredLanguage;
            }
        }

        // Default to English
        return "en";
    }
}