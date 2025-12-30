// C# Script to generate password hash
// Run with: dotnet script generate-password-hash.csx

using System.Security.Cryptography;

string password = "Emp@123!";

var saltBytes = new byte[32];
using var rng = RandomNumberGenerator.Create();
rng.GetBytes(saltBytes);
var salt = Convert.ToBase64String(saltBytes);

using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
var hash = Convert.ToBase64String(pbkdf2.GetBytes(32));

Console.WriteLine($"Password: {password}");
Console.WriteLine($"Salt: {salt}");
Console.WriteLine($"Hash: {hash}");
