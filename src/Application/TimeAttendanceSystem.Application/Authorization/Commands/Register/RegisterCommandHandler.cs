using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.Register;

public class RegisterCommandHandler : BaseHandler<RegisterCommand, Result<RegisterResponse>>
{
    private readonly IEmailService _emailService;
    private readonly IPasswordService _passwordService;

    public RegisterCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEmailService emailService,
        IPasswordService passwordService)
        : base(context, currentUser)
    {
        _emailService = emailService;
        _passwordService = passwordService;
    }

    public override async Task<Result<RegisterResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // Validate password confirmation
        if (request.Password != request.ConfirmPassword)
        {
            return Result.Failure<RegisterResponse>("Password and confirmation password do not match.");
        }

        // Validate password strength
        var passwordValidation = _passwordService.ValidatePasswordStrength(request.Password);
        if (passwordValidation.IsFailure)
        {
            return Result.Failure<RegisterResponse>(passwordValidation.Error);
        }

        // Check if username already exists
        var existingUserByUsername = await Context.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

        if (existingUserByUsername != null)
        {
            return Result.Failure<RegisterResponse>("Username is already taken.");
        }

        // Check if email already exists
        var existingUserByEmail = await Context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (existingUserByEmail != null)
        {
            return Result.Failure<RegisterResponse>("Email is already registered.");
        }

        // Generate password hash
        var (hash, salt) = _passwordService.HashPassword(request.Password);

        // Generate email confirmation token
        var confirmationToken = GenerateEmailConfirmationToken();

        // Create new user
        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = hash,
            PasswordSalt = salt,
            EmailConfirmed = false,
            EmailConfirmationToken = confirmationToken,
            PreferredLanguage = request.PreferredLanguage,
            MustChangePassword = false,
            IsActive = false, // User is inactive until email is confirmed
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "Registration"
        };

        Context.Users.Add(user);

        // Get the default user role (if exists)
        var defaultRole = await Context.Roles
            .FirstOrDefaultAsync(r => r.Name == "User", cancellationToken);

        if (defaultRole != null)
        {
            var userRole = new UserRole
            {
                UserId = user.Id,
                RoleId = defaultRole.Id
            };
            Context.UserRoles.Add(userRole);
        }

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.UserCreated,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            PayloadJson = $"{{\"username\":\"{request.Username}\",\"email\":\"{request.Email}\"}}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "Registration"
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        // Send confirmation email
        await SendConfirmationEmail(user.Email, user.Username, confirmationToken);

        var response = new RegisterResponse(
            user.Id,
            user.Username,
            user.Email,
            "Registration successful. Please check your email to verify your account."
        );

        return Result.Success(response);
    }

    private string GenerateEmailConfirmationToken()
    {
        using var rng = RandomNumberGenerator.Create();
        var tokenBytes = new byte[32];
        rng.GetBytes(tokenBytes);
        return Convert.ToBase64String(tokenBytes).Replace("+", "-").Replace("/", "_").Replace("=", "");
    }

    private async Task SendConfirmationEmail(string email, string username, string token)
    {
        await _emailService.SendEmailVerificationAsync(email, username, token);
    }
}