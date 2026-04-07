using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// HMAC-SHA256 based encryption service for NFC tag payload signing and verification.
/// Generates signed payloads written to physical NFC tags during provisioning,
/// and verifies those payloads during attendance check-in to prevent tag cloning/tampering.
/// </summary>
public class NfcTagEncryptionService : INfcTagEncryptionService
{
    private readonly byte[] _secretKey;

    /// <inheritdoc />
    public bool RequirePayload { get; }

    public NfcTagEncryptionService(IConfiguration configuration)
    {
        var keyString = configuration["NfcEncryption:SecretKey"]
            ?? throw new InvalidOperationException(
                "NFC encryption secret key not configured. Add 'NfcEncryption:SecretKey' to appsettings.json");

        _secretKey = Encoding.UTF8.GetBytes(keyString);
        RequirePayload = configuration.GetValue<bool>("NfcEncryption:RequirePayload", false);
    }

    /// <inheritdoc />
    public NfcSignedPayload GenerateSignedPayload(NfcTag tag)
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var rawPayload = $"{tag.Id}|{tag.BranchId}|{tag.TagUid}|{timestamp}";

        var signature = ComputeHmacSha256(rawPayload);
        var signedPayload = $"{rawPayload}|{signature}";
        var verificationHash = ComputeSha256(signedPayload);

        return new NfcSignedPayload(signedPayload, timestamp, verificationHash);
    }

    /// <inheritdoc />
    public bool VerifyPayload(string signedPayload, NfcTag tag)
    {
        if (string.IsNullOrWhiteSpace(signedPayload))
            return false;

        var parts = signedPayload.Split('|');
        if (parts.Length != 5)
            return false;

        // Parse payload components
        if (!long.TryParse(parts[0], out var tagId))
            return false;
        if (!long.TryParse(parts[1], out var branchId))
            return false;
        var tagUid = parts[2];
        var timestampStr = parts[3];
        var receivedSignature = parts[4];

        // Verify payload matches the tag entity
        if (tagId != tag.Id || branchId != tag.BranchId || tagUid != tag.TagUid)
            return false;

        // Recompute HMAC signature and compare
        var rawPayload = $"{parts[0]}|{parts[1]}|{parts[2]}|{timestampStr}";
        var expectedSignature = ComputeHmacSha256(rawPayload);

        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(receivedSignature),
            Encoding.UTF8.GetBytes(expectedSignature));
    }

    private string ComputeHmacSha256(string input)
    {
        using var hmac = new HMACSHA256(_secretKey);
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(hash);
    }

    private static string ComputeSha256(string input)
    {
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(hash);
    }
}
