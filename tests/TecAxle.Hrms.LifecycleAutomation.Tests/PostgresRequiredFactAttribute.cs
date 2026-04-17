namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// xUnit Fact that is auto-skipped when the integration Postgres cluster is not reachable.
/// Use for tests that require real relational behavior (transactions, FK constraints, etc.).
///
/// <para>The probe is evaluated once per test-class instantiation. If you need a truly
/// per-run evaluation, call <see cref="PostgresTestHarness.IsAvailable"/> from inside the
/// test body and bail out with a clear <c>xUnit.SkipException</c> (not used here — xUnit 2.x
/// doesn't ship SkipException; a simple <c>return</c> + assert-no-op is the workaround).</para>
/// </summary>
public sealed class PostgresRequiredFactAttribute : FactAttribute
{
    public PostgresRequiredFactAttribute()
    {
        if (!PostgresTestHarness.IsAvailable())
        {
            Skip = "Postgres integration cluster not reachable. Set HRMS_INTEGRATION_DB or start the local Postgres 18 dev instance.";
        }
    }
}
