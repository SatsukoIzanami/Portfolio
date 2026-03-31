using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController(PortfolioDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<AboutDataApiModel>> Get(CancellationToken ct)
    {
        var profile = await db.AboutProfiles.AsNoTracking().OrderBy(x => x.Id).FirstOrDefaultAsync(ct);

        var categories = await db.SkillCategories
            .AsNoTracking()
            .Include(c => c.Items)
            .OrderBy(c => c.SortOrder)
            .ToListAsync(ct);

        var endorsements = await db.Endorsements
            .AsNoTracking()
            .OrderBy(e => e.SortOrder)
            .ToListAsync(ct);

        var timeline = await db.TimelineEntries
            .AsNoTracking()
            .Include(t => t.Bullets)
            .OrderBy(t => t.SortOrder)
            .ToListAsync(ct);

        var result = new AboutDataApiModel
        {
            Bio = profile is null ? null : AboutBioApiModel.FromEntity(profile),
            Skills = new SkillsEnvelopeApiModel
            {
                Categories = categories.Select(c => new SkillCategoryApiModel
                {
                    Title = c.Title,
                    Items = c.Items
                        .OrderBy(i => i.SortOrder)
                        .Select(i => new SkillItemApiModel
                        {
                            Label = i.Label,
                            Value = i.Value,
                        })
                        .ToList()
                }).ToList()
            },
            Endorsements = endorsements.Select(e => new EndorsementApiModel
            {
                Quote = e.Quote,
                Name = e.Name,
                Role = e.Role,
            }).ToList(),
            Timeline = timeline.Select(t => new TimelineEntryApiModel
            {
                Company = t.Company,
                Role = t.Role,
                Start = t.Start,
                End = t.End,
                Bullets = t.Bullets.OrderBy(b => b.SortOrder).Select(b => b.Text).ToList(),
            }).ToList()
        };

        return Ok(result);
    }
}
