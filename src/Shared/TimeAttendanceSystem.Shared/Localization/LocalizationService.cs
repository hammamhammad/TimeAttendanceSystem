using Microsoft.Extensions.Localization;
using System.Globalization;

namespace TimeAttendanceSystem.Shared.Localization;

public class LocalizationService
{
    private readonly IStringLocalizer<ValidationMessages> _localizer;

    public LocalizationService(IStringLocalizer<ValidationMessages> localizer)
    {
        _localizer = localizer;
    }

    public string GetString(string key, params object[] args)
    {
        return _localizer[key, args];
    }

    public string GetString(string key)
    {
        return _localizer[key];
    }

    public static void SetCulture(string culture)
    {
        var cultureInfo = new CultureInfo(culture);
        CultureInfo.CurrentCulture = cultureInfo;
        CultureInfo.CurrentUICulture = cultureInfo;
    }

    public static string GetCurrentCulture()
    {
        return CultureInfo.CurrentUICulture.Name;
    }

    public static bool IsRightToLeft()
    {
        return CultureInfo.CurrentUICulture.TextInfo.IsRightToLeft;
    }
}

public class ValidationMessages
{
    // This class is used for localization resource generation
}