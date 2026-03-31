using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(PortfolioDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ProjectsResponse>> Get(CancellationToken ct)
    {
        var projects = await db.Projects
            .AsNoTracking()
            .OrderBy(p => p.Id)
            .ToListAsync(ct);

        var response = new ProjectsResponse
        {
            Projects = projects.Select(ProjectApiModel.FromEntity).ToList()
        };
        return Ok(response);
    }
}
