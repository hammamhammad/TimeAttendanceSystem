using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Assets;

public class AssetCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? ParentCategoryId { get; set; }
    public decimal? DepreciationRatePercent { get; set; }
    public int? DefaultUsefulLifeMonths { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; } = 0;

    // Navigation
    public AssetCategory? ParentCategory { get; set; }
    public ICollection<AssetCategory> ChildCategories { get; set; } = new List<AssetCategory>();
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}
