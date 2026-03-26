using System.Net;
using System.Text.Json;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Api.Middleware;

/// <summary>
/// Global exception handler middleware that catches all unhandled exceptions and returns
/// standardized JSON error responses. Maps specific exception types to appropriate HTTP
/// status codes and includes diagnostic information in development environments.
/// </summary>
public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public GlobalExceptionHandlerMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionHandlerMiddleware> logger,
        IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, userMessage) = MapException(exception);

        _logger.LogError(
            exception,
            "Unhandled exception occurred. StatusCode: {StatusCode}, TraceId: {TraceId}, Path: {Path}",
            statusCode,
            context.TraceIdentifier,
            context.Request.Path);

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        var response = new ErrorResponse
        {
            StatusCode = statusCode,
            Message = userMessage,
            TraceId = context.TraceIdentifier
        };

        if (_environment.IsDevelopment())
        {
            response.Detail = exception.Message;
            response.StackTrace = exception.StackTrace;
        }

        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
        };

        var json = JsonSerializer.Serialize(response, jsonOptions);
        await context.Response.WriteAsync(json);
    }

    private static (int StatusCode, string Message) MapException(Exception exception)
    {
        return exception switch
        {
            ValidationException => (
                (int)HttpStatusCode.BadRequest,
                exception.Message),

            FluentValidation.ValidationException fluentEx => (
                (int)HttpStatusCode.BadRequest,
                string.Join("; ", fluentEx.Errors.Select(e => e.ErrorMessage))),

            UnauthorizedAccessException => (
                (int)HttpStatusCode.Unauthorized,
                "You are not authorized to perform this action."),

            NotFoundException => (
                (int)HttpStatusCode.NotFound,
                exception.Message),

            KeyNotFoundException => (
                (int)HttpStatusCode.NotFound,
                "The requested resource was not found."),

            OperationCanceledException => (
                (int)HttpStatusCode.BadRequest,
                "The request was cancelled."),

            _ => (
                (int)HttpStatusCode.InternalServerError,
                "An unexpected error occurred. Please try again later.")
        };
    }
}

/// <summary>
/// Standardized error response returned by the global exception handler.
/// </summary>
public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public string TraceId { get; set; } = string.Empty;

    /// <summary>
    /// Exception message. Only included in Development environment.
    /// </summary>
    public string? Detail { get; set; }

    /// <summary>
    /// Exception stack trace. Only included in Development environment.
    /// </summary>
    public string? StackTrace { get; set; }
}
