using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Assets;

public class AssetMaintenanceRecord : BaseEntity
{
    public long AssetId { get; set; }
    public MaintenanceType MaintenanceType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public decimal? Cost { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Vendor { get; set; }
    public MaintenanceStatus Status { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Asset Asset { get; set; } = null!;
}
