namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Encrypts and decrypts tenant database connection strings for secure storage in the master database.
/// </summary>
public interface IConnectionStringEncryption
{
    string Encrypt(string plainText);
    string Decrypt(string cipherText);
}
