using TimeAttendanceSystem.Application.Abstractions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IConfiguration _configuration;

    public EmailService(ILogger<EmailService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public async Task SendPasswordResetEmailAsync(string email, string username, string resetToken, CancellationToken cancellationToken = default)
    {
        // In a real implementation, you would use a service like SendGrid, AWS SES, etc.
        // For now, we'll just log the reset token
        
        var resetUrl = $"{_configuration["App:BaseUrl"]}/reset-password?token={resetToken}&email={email}";
        
        _logger.LogInformation("Password reset requested for user {Username} ({Email}). Reset URL: {ResetUrl}", 
            username, email, resetUrl);

        // Simulate async email sending
        await Task.Delay(100, cancellationToken);
    }

    public async Task SendEmailVerificationAsync(string email, string username, string verificationToken, CancellationToken cancellationToken = default)
    {
        var verificationUrl = $"{_configuration["App:BaseUrl"]}/verify-email?token={verificationToken}&email={email}";
        
        _logger.LogInformation("Email verification requested for user {Username} ({Email}). Verification URL: {VerificationUrl}", 
            username, email, verificationUrl);

        // Simulate async email sending
        await Task.Delay(100, cancellationToken);
    }

    public async Task SendTwoFactorCodeAsync(string email, string code, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Two-factor authentication code sent to {Email}: {Code}", email, code);

        // Simulate async email sending
        await Task.Delay(100, cancellationToken);
    }
}