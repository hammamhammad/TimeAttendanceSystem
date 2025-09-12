using System.Collections.Concurrent;

namespace TimeAttendanceSystem.Api.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ConcurrentDictionary<string, TokenBucket> _clients = new();
    private readonly RateLimitOptions _options;

    public RateLimitingMiddleware(RequestDelegate next, RateLimitOptions options)
    {
        _next = next;
        _options = options;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientId = GetClientIdentifier(context);
        var bucket = _clients.GetOrAdd(clientId, _ => new TokenBucket(_options.MaxRequests, _options.WindowInSeconds));

        if (!bucket.TryConsumeToken())
        {
            context.Response.StatusCode = 429; // Too Many Requests
            await context.Response.WriteAsync("Rate limit exceeded. Please try again later.");
            return;
        }

        await _next(context);
    }

    private static string GetClientIdentifier(HttpContext context)
    {
        // Use IP address as client identifier
        var ipAddress = context.Connection.RemoteIpAddress?.ToString();
        if (string.IsNullOrEmpty(ipAddress) || ipAddress == "::1")
        {
            ipAddress = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        }

        // For authenticated users, combine with user ID for more granular control
        var userId = context.User.Identity?.Name;
        return string.IsNullOrEmpty(userId) ? ipAddress ?? "unknown" : $"{ipAddress}:{userId}";
    }

    private class TokenBucket
    {
        private readonly int _maxTokens;
        private readonly int _refillIntervalSeconds;
        private int _tokens;
        private DateTime _lastRefill;
        private readonly object _lock = new();

        public TokenBucket(int maxTokens, int refillIntervalSeconds)
        {
            _maxTokens = maxTokens;
            _refillIntervalSeconds = refillIntervalSeconds;
            _tokens = maxTokens;
            _lastRefill = DateTime.UtcNow;
        }

        public bool TryConsumeToken()
        {
            lock (_lock)
            {
                RefillTokens();
                
                if (_tokens > 0)
                {
                    _tokens--;
                    return true;
                }
                
                return false;
            }
        }

        private void RefillTokens()
        {
            var now = DateTime.UtcNow;
            var elapsed = now - _lastRefill;
            
            if (elapsed.TotalSeconds >= _refillIntervalSeconds)
            {
                _tokens = _maxTokens;
                _lastRefill = now;
            }
        }
    }
}

public class RateLimitOptions
{
    public int MaxRequests { get; set; } = 100;
    public int WindowInSeconds { get; set; } = 60;
}