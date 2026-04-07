namespace TecAxle.Hrms.Domain.Modules;

/// <summary>
/// Provides dependency validation rules between system modules.
/// Used when enabling/disabling modules to ensure required dependencies are satisfied.
/// </summary>
public static class ModuleDependencyRules
{
    /// <summary>
    /// Validates whether a module can be enabled given the set of currently enabled modules.
    /// Returns a list of missing dependencies.
    /// </summary>
    public static IReadOnlyList<SystemModule> GetMissingDependencies(
        SystemModule module,
        IReadOnlySet<SystemModule> enabledModules)
    {
        var info = ModuleMetadata.Get(module);
        var missing = new List<SystemModule>();

        foreach (var dependency in info.DependsOn)
        {
            if (!enabledModules.Contains(dependency))
                missing.Add(dependency);
        }

        return missing;
    }

    /// <summary>
    /// Validates whether a module can be disabled given the set of currently enabled modules.
    /// Returns a list of modules that depend on the module being disabled.
    /// </summary>
    public static IReadOnlyList<SystemModule> GetDependentModules(
        SystemModule module,
        IReadOnlySet<SystemModule> enabledModules)
    {
        var dependents = new List<SystemModule>();
        var allModules = ModuleMetadata.GetAll();

        foreach (var (otherModule, info) in allModules)
        {
            if (otherModule == module) continue;
            if (!enabledModules.Contains(otherModule)) continue;

            if (info.DependsOn.Contains(module))
                dependents.Add(otherModule);
        }

        return dependents;
    }

    /// <summary>
    /// Validates a complete set of modules for dependency consistency.
    /// Returns all violations found.
    /// </summary>
    public static IReadOnlyList<DependencyViolation> ValidateModuleSet(IReadOnlySet<SystemModule> enabledModules)
    {
        var violations = new List<DependencyViolation>();

        foreach (var module in enabledModules)
        {
            var info = ModuleMetadata.Get(module);
            foreach (var dependency in info.DependsOn)
            {
                if (!enabledModules.Contains(dependency))
                {
                    violations.Add(new DependencyViolation(
                        Module: module,
                        RequiredDependency: dependency,
                        Message: $"Module '{info.Name}' requires '{ModuleMetadata.Get(dependency).Name}' to be enabled"
                    ));
                }
            }
        }

        return violations;
    }

    /// <summary>
    /// Gets the full transitive dependency tree for a module (all modules that must be enabled).
    /// </summary>
    public static IReadOnlySet<SystemModule> GetTransitiveDependencies(SystemModule module)
    {
        var result = new HashSet<SystemModule>();
        CollectDependencies(module, result);
        return result;
    }

    private static void CollectDependencies(SystemModule module, HashSet<SystemModule> collected)
    {
        var info = ModuleMetadata.Get(module);
        foreach (var dependency in info.DependsOn)
        {
            if (collected.Add(dependency))
                CollectDependencies(dependency, collected);
        }
    }

    public record DependencyViolation(
        SystemModule Module,
        SystemModule RequiredDependency,
        string Message
    );
}
