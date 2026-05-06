using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// ERP spec §7 toolbar → Import. Accepts a CSV file and returns a stateless
/// preview of parsed rows (no DB writes — pure validation + transformation).
/// Commit-to-DB is an entity-specific step handled by dedicated handlers in a
/// follow-up PR (requires schema migration for ImportBatch audit).
/// </summary>
[ApiController]
[Route("api/v1/import")]
[Authorize]
public class ImportController : ControllerBase
{
    public record ImportPreviewRow(int RowNumber, Dictionary<string, string> Cells, List<string> Errors);
    public record ImportPreviewResponse(
        string EntityType,
        string FileName,
        long FileSize,
        List<string> Headers,
        int TotalRows,
        int ValidRows,
        int InvalidRows,
        List<ImportPreviewRow> Rows);

    [HttpPost("preview")]
    [RequestSizeLimit(20_000_000)]
    public async Task<IActionResult> Preview(
        [FromQuery] string entity,
        IFormFile file,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(entity))
            return BadRequest(new { message = "entity is required" });
        if (file is null || file.Length == 0)
            return BadRequest(new { message = "file is required" });

        var (headers, rows) = await ParseCsvAsync(file, ct);

        var valid = 0;
        var invalid = 0;
        var previewRows = new List<ImportPreviewRow>();
        for (var i = 0; i < rows.Count; i++)
        {
            var dict = MapRow(headers, rows[i]);
            var errors = Validate(entity, dict);
            if (errors.Count == 0) valid++; else invalid++;
            previewRows.Add(new ImportPreviewRow(i + 1, dict, errors));
        }

        return Ok(new ImportPreviewResponse(
            entity, file.FileName, file.Length,
            headers, rows.Count, valid, invalid,
            previewRows));
    }

    private static async Task<(List<string> headers, List<List<string>> rows)> ParseCsvAsync(IFormFile file, CancellationToken ct)
    {
        using var stream = file.OpenReadStream();
        using var reader = new StreamReader(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);

        var all = new List<List<string>>();
        string? line;
        while ((line = await reader.ReadLineAsync(ct)) is not null)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            all.Add(ParseCsvLine(line));
        }

        if (all.Count == 0) return (new List<string>(), new List<List<string>>());
        var headers = all[0];
        var rows = all.Skip(1).ToList();
        return (headers, rows);
    }

    /// <summary>Minimal RFC-4180-ish CSV line parser (handles quoted cells, escaped quotes).</summary>
    private static List<string> ParseCsvLine(string line)
    {
        var cells = new List<string>();
        var sb = new StringBuilder();
        var inQuotes = false;
        for (var i = 0; i < line.Length; i++)
        {
            var c = line[i];
            if (inQuotes)
            {
                if (c == '"')
                {
                    if (i + 1 < line.Length && line[i + 1] == '"') { sb.Append('"'); i++; }
                    else inQuotes = false;
                }
                else sb.Append(c);
            }
            else
            {
                if (c == ',') { cells.Add(sb.ToString()); sb.Clear(); }
                else if (c == '"') inQuotes = true;
                else sb.Append(c);
            }
        }
        cells.Add(sb.ToString());
        return cells;
    }

    private static Dictionary<string, string> MapRow(List<string> headers, List<string> cells)
    {
        var d = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        for (var i = 0; i < headers.Count; i++)
        {
            var key = headers[i].Trim();
            var val = i < cells.Count ? cells[i].Trim() : "";
            d[key] = val;
        }
        return d;
    }

    /// <summary>Entity-specific validation. Expand this switch for each importable entity.</summary>
    private static List<string> Validate(string entity, Dictionary<string, string> row)
    {
        var errors = new List<string>();
        switch (entity.ToLowerInvariant())
        {
            case "employees":
                if (!row.TryGetValue("Code", out var code) || string.IsNullOrWhiteSpace(code))
                    errors.Add("Code is required");
                if (!row.TryGetValue("FullName", out var fullName) || string.IsNullOrWhiteSpace(fullName))
                    errors.Add("FullName is required");
                if (row.TryGetValue("Email", out var email) && !string.IsNullOrWhiteSpace(email)
                    && !email.Contains('@'))
                    errors.Add("Email is not valid");
                if (row.TryGetValue("HireDate", out var hd) && !string.IsNullOrWhiteSpace(hd)
                    && !DateTime.TryParse(hd, CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                    errors.Add("HireDate is not a valid date");
                break;
            default:
                // Unknown entity → no validation, row passes through
                break;
        }
        return errors;
    }
}
