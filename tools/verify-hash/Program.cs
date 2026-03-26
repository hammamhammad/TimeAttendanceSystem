using System;
using System.Security.Cryptography;

var password = "Emp@123!";
var saltBase64 = "U2FtcGxlRGF0YVNhbHQyMDI1VGltZUF0dGVuZGFuY2U=";
var expectedHash = "zFjvPvlzbseOE7YV+Z0pkWaCK40N6PQvJibakq8H5X4=";

var saltBytes = Convert.FromBase64String(saltBase64);
using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
var computedHash = Convert.ToBase64String(pbkdf2.GetBytes(32));

Console.WriteLine($"Password: {password}");
Console.WriteLine($"Salt:     {saltBase64}");
Console.WriteLine($"Expected: {expectedHash}");
Console.WriteLine($"Computed: {computedHash}");
Console.WriteLine($"Match:    {computedHash == expectedHash}");
