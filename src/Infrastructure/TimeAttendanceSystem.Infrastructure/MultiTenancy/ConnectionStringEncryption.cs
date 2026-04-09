using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

/// <summary>
/// AES-256-CBC encryption for tenant database connection strings.
/// </summary>
public class ConnectionStringEncryption : IConnectionStringEncryption
{
    private readonly byte[] _key;

    public ConnectionStringEncryption(IOptions<MultiTenancyOptions> options)
    {
        var keyString = options.Value.EncryptionKey
            ?? throw new InvalidOperationException("MultiTenancy:EncryptionKey is not configured.");

        // Derive a 256-bit key from the configured key using SHA256
        _key = SHA256.HashData(Encoding.UTF8.GetBytes(keyString));
    }

    public string Encrypt(string plainText)
    {
        using var aes = Aes.Create();
        aes.Key = _key;
        aes.GenerateIV();

        using var encryptor = aes.CreateEncryptor();
        var plainBytes = Encoding.UTF8.GetBytes(plainText);
        var cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

        // Prepend IV to ciphertext for storage
        var result = new byte[aes.IV.Length + cipherBytes.Length];
        Buffer.BlockCopy(aes.IV, 0, result, 0, aes.IV.Length);
        Buffer.BlockCopy(cipherBytes, 0, result, aes.IV.Length, cipherBytes.Length);

        return Convert.ToBase64String(result);
    }

    public string Decrypt(string cipherText)
    {
        var fullCipher = Convert.FromBase64String(cipherText);

        using var aes = Aes.Create();
        aes.Key = _key;

        // Extract IV from the beginning
        var iv = new byte[aes.BlockSize / 8];
        var cipher = new byte[fullCipher.Length - iv.Length];
        Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
        Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, cipher.Length);

        aes.IV = iv;
        using var decryptor = aes.CreateDecryptor();
        var plainBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);

        return Encoding.UTF8.GetString(plainBytes);
    }
}
