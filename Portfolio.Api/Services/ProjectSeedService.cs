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

    public async Task SeedAboutFromJsonIfEmptyAsync()
    {
        var needsAboutSeed =
            !await db.AboutProfiles.AnyAsync() &&
            !await db.SkillCategories.AnyAsync() &&
            !await db.Endorsements.AnyAsync() &&
            !await db.TimelineEntries.AnyAsync();

        if (!needsAboutSeed)
            return;

        var jsonPath = Path.Combine(env.ContentRootPath, "data", "about.json");
        if (!File.Exists(jsonPath))
            return;

        await using var stream = File.OpenRead(jsonPath);
        var payload = await JsonSerializer.DeserializeAsync<AboutSeedPayload>(stream, _jsonOptions);
        if (payload is null)
            return;

        if (payload.Bio is not null)
        {
            db.AboutProfiles.Add(new AboutProfile
            {
                Headline = payload.Bio.Headline?.Trim(),
                Subline = payload.Bio.Subline?.Trim(),
                Body = payload.Bio.Body,
                Avatar = payload.Bio.Avatar?.Trim(),
            });
        }

        if (payload.Skills?.Categories is not null)
        {
            var categoryOrder = 0;
            foreach (var category in payload.Skills.Categories)
            {
                var categoryEntity = new SkillCategory
                {
                    Title = (category.Title ?? category.Name)?.Trim(),
                    SortOrder = categoryOrder++,
                };

                var itemOrder = 0;
                foreach (var item in category.Items ?? [])
                {
                    if (string.IsNullOrWhiteSpace(item.Label))
                        continue;

                    categoryEntity.Items.Add(new SkillItem
                    {
                        Label = item.Label.Trim(),
                        Value = item.Value,
                        SortOrder = itemOrder++,
                    });
                }

                db.SkillCategories.Add(categoryEntity);
            }
        }

        if (payload.Endorsements is not null)
        {
            var endorsementOrder = 0;
            foreach (var endorsement in payload.Endorsements)
            {
                db.Endorsements.Add(new Endorsement
                {
                    Quote = endorsement.Quote,
                    Name = endorsement.Name?.Trim(),
                    Role = endorsement.Role?.Trim(),
                    SortOrder = endorsementOrder++,
                });
            }
        }

        if (payload.Timeline is not null)
        {
            var timelineOrder = 0;
            foreach (var entry in payload.Timeline)
            {
                var entryEntity = new TimelineEntry
                {
                    Company = entry.Company?.Trim(),
                    Role = entry.Role?.Trim(),
                    Start = entry.Start?.Trim(),
                    End = entry.End?.Trim(),
                    SortOrder = timelineOrder++,
                };

                var bulletOrder = 0;
                foreach (var bullet in entry.Bullets ?? [])
                {
                    if (string.IsNullOrWhiteSpace(bullet))
                        continue;
                    entryEntity.Bullets.Add(new TimelineBullet
                    {
                        Text = bullet.Trim(),
                        SortOrder = bulletOrder++,
                    });
                }

                db.TimelineEntries.Add(entryEntity);
            }
        }

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

    private sealed class AboutSeedPayload
    {
        public AboutSeedBio? Bio { get; set; }
        public AboutSeedSkills? Skills { get; set; }
        public List<AboutSeedEndorsement>? Endorsements { get; set; }
        public List<AboutSeedTimelineEntry>? Timeline { get; set; }
    }

    private sealed class AboutSeedBio
    {
        public string? Headline { get; set; }
        public string? Subline { get; set; }
        public string? Body { get; set; }
        public string? Avatar { get; set; }
    }

    private sealed class AboutSeedSkills
    {
        public List<AboutSeedSkillCategory>? Categories { get; set; }
    }

    private sealed class AboutSeedSkillCategory
    {
        public string? Title { get; set; }
        public string? Name { get; set; }
        public List<AboutSeedSkillItem>? Items { get; set; }
    }

    private sealed class AboutSeedSkillItem
    {
        public string? Label { get; set; }
        public int Value { get; set; }
    }

    private sealed class AboutSeedEndorsement
    {
        public string? Quote { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
    }

    private sealed class AboutSeedTimelineEntry
    {
        public string? Company { get; set; }
        public string? Role { get; set; }
        public string? Start { get; set; }
        public string? End { get; set; }
        public List<string>? Bullets { get; set; }
    }
}
