using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Entities;

namespace Portfolio.Api.Services;

public class ProjectSeedService(PortfolioDbContext db, IWebHostEnvironment env)
{
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    public async Task SeedProjectsFromJsonIfEmptyAsync()
    {
        if (await db.Projects.AnyAsync())
            return;

        var jsonPath = Path.Combine(env.ContentRootPath, "data", "projects.json");
        if (!File.Exists(jsonPath))
            return;

        await using var stream = File.OpenRead(jsonPath);
        var payload = await JsonSerializer.DeserializeAsync<ProjectSeedPayload>(stream, _jsonOptions);
        if (payload?.Projects is null || payload.Projects.Count == 0)
            return;

        var entities = payload.Projects.Select((p, index) => new PortfolioProject
        {
            Id = index + 1,
            Img = p.Img?.Trim(),
            Name = p.Name?.Trim(),
            Year = p.Year?.Trim(),
            Description = p.Desc?.Trim(),
        });

        await db.Projects.AddRangeAsync(entities);
        await db.SaveChangesAsync();
    }

    private sealed class ProjectSeedPayload
    {
        public List<ProjectSeedItem> Projects { get; set; } = [];
    }

    private sealed class ProjectSeedItem
    {
        public string? Img { get; set; }
        public string? Name { get; set; }
        public string? Year { get; set; }
        public string? Desc { get; set; }
    }
}
