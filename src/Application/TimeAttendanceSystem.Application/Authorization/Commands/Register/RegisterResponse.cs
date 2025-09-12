namespace TimeAttendanceSystem.Application.Authorization.Commands.Register;

public record RegisterResponse(
    long UserId,
    string Username,
    string Email,
    string Message
);