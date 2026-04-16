using FluentAssertions;
using TecAxle.Hrms.Application.Authorization.Services;

namespace TecAxle.Hrms.BusinessRules.Tests;

public class LoginLockoutPolicyTests
{
    [Fact]
    public void Default_matches_pre_v13_3_escalation_ladder()
    {
        var p = LoginLockoutPolicy.Default;

        p.GetLockoutForAttempts(4).Should().BeNull();
        p.GetLockoutForAttempts(5).Should().Be(TimeSpan.FromMinutes(15));
        p.GetLockoutForAttempts(9).Should().Be(TimeSpan.FromMinutes(15));
        p.GetLockoutForAttempts(10).Should().Be(TimeSpan.FromMinutes(60));
        p.GetLockoutForAttempts(14).Should().Be(TimeSpan.FromMinutes(60));
        p.GetLockoutForAttempts(15).Should().Be(TimeSpan.FromMinutes(1440));
        p.GetLockoutForAttempts(1000).Should().Be(TimeSpan.FromMinutes(1440));
    }

    [Fact]
    public void ParseOrDefault_roundtrips_valid_json()
    {
        const string json = """[{"attempts":3,"minutes":5},{"attempts":6,"minutes":30}]""";
        var p = LoginLockoutPolicy.ParseOrDefault(json);

        p.GetLockoutForAttempts(2).Should().BeNull();
        p.GetLockoutForAttempts(3).Should().Be(TimeSpan.FromMinutes(5));
        p.GetLockoutForAttempts(6).Should().Be(TimeSpan.FromMinutes(30));
    }

    [Fact]
    public void ParseOrDefault_falls_back_on_malformed_json()
    {
        LoginLockoutPolicy.ParseOrDefault(null).Tiers.Should().BeEquivalentTo(LoginLockoutPolicy.Default.Tiers);
        LoginLockoutPolicy.ParseOrDefault("").Tiers.Should().BeEquivalentTo(LoginLockoutPolicy.Default.Tiers);
        LoginLockoutPolicy.ParseOrDefault("{ not json }").Tiers.Should().BeEquivalentTo(LoginLockoutPolicy.Default.Tiers);
        LoginLockoutPolicy.ParseOrDefault("""{"not": "an array"}""").Tiers
            .Should().BeEquivalentTo(LoginLockoutPolicy.Default.Tiers);
    }

    [Fact]
    public void ParseOrDefault_rejects_out_of_range_tiers_and_falls_back_if_all_invalid()
    {
        // all zero / negative — should fall back to Default
        const string json = """[{"attempts":0,"minutes":10},{"attempts":-1,"minutes":-5}]""";
        var p = LoginLockoutPolicy.ParseOrDefault(json);
        p.Tiers.Should().BeEquivalentTo(LoginLockoutPolicy.Default.Tiers);
    }

    [Fact]
    public void GetLockoutForAttempts_picks_highest_matching_tier()
    {
        // Attempts = 20, tiers at 5/10/15 — should pick 15's 24h lockout, not 5's 15min.
        var p = LoginLockoutPolicy.Default;
        p.GetLockoutForAttempts(20).Should().Be(TimeSpan.FromMinutes(1440));
    }
}
