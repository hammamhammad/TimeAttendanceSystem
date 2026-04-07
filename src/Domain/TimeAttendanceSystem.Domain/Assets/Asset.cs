using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Assets;

public class Asset : BaseEntity
{
    public long AssetCategoryId { get; set; }
    public string AssetTag { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? SerialNumber { get; set; }
    public string? Model { get; set; }
    public string? Manufacturer { get; set; }
    public DateTime? PurchaseDate { get; set; }
    public decimal? PurchasePrice { get; set; }
    public string Currency { get; set; } = "SAR";
    public DateTime? WarrantyExpiryDate { get; set; }
    public long BranchId { get; set; }
    public string? LocationDescription { get; set; }
    public AssetStatus Status { get; set; }
    public AssetCondition Condition { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public AssetCategory Category { get; set; } = null!;
    public Branch Branch { get; set; } = null!;
    public ICollection<AssetAssignment> Assignments { get; set; } = new List<AssetAssignment>();
    public ICollection<AssetMaintenanceRecord> MaintenanceRecords { get; set; } = new List<AssetMaintenanceRecord>();
}
