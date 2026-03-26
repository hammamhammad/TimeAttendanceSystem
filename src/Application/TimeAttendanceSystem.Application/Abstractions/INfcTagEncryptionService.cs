using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service for generating and verifying HMAC-SHA256 signed payloads for NFC tags.
/// Used during tag provisioning (write) and attendance verification (read).
/// </summary>
public interface INfcTagEncryptionService
{
    /// <summary>
    /// Generates an HMAC-SHA256 signed payload for writing to an NFC tag during provisioning.
    /// </summary>
    /// <param name="tag">The NFC tag to generate a payload for</param>
    /// <returns>The signed payload and its SHA256 verification hash</returns>
    NfcSignedPayload GenerateSignedPayload(NfcTag tag);

    /// <summary>
    /// Verifies an HMAC-SHA256 signed payload read from an NFC tag during attendance check-in.
    /// </summary>
    /// <param name="signedPayload">The full signed payload string from the tag's NDEF record</param>
    /// <param name="tag">The NFC tag entity to validate against</param>
    /// <returns>True if the payload signature is valid and matches the tag</returns>
    bool VerifyPayload(string signedPayload, NfcTag tag);

    /// <summary>
    /// Whether NFC payload verification is required for all tags (even those not yet provisioned).
    /// Configured via NfcEncryption:RequirePayload in appsettings.
    /// </summary>
    bool RequirePayload { get; }
}

/// <summary>
/// Represents an HMAC-SHA256 signed payload generated for NFC tag provisioning.
/// </summary>
public record NfcSignedPayload(
    string SignedPayload,
    long Timestamp,
    string VerificationHash
);
