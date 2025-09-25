using System.Text.Json;
using System.Text.Json.Serialization;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Api.Converters;

/// <summary>
/// Custom JSON converter for HolidayType enum that handles both string and integer values.
/// </summary>
public class HolidayTypeJsonConverter : JsonConverter<HolidayType>
{
    public override HolidayType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            var stringValue = reader.GetString();
            if (int.TryParse(stringValue, out var intValue))
            {
                return (HolidayType)intValue;
            }

            if (Enum.TryParse<HolidayType>(stringValue, true, out var enumValue))
            {
                return enumValue;
            }

            throw new JsonException($"Unable to convert \"{stringValue}\" to HolidayType enum.");
        }

        if (reader.TokenType == JsonTokenType.Number)
        {
            var intValue = reader.GetInt32();
            if (Enum.IsDefined(typeof(HolidayType), intValue))
            {
                return (HolidayType)intValue;
            }

            throw new JsonException($"Value {intValue} is not a valid HolidayType.");
        }

        throw new JsonException($"Unexpected token {reader.TokenType} when parsing HolidayType.");
    }

    public override void Write(Utf8JsonWriter writer, HolidayType value, JsonSerializerOptions options)
    {
        writer.WriteNumberValue((int)value);
    }
}