using Portfolio.Api.Entities;

namespace Portfolio.Api.Models;

public class ProjectApiModel
{
    public string? Img { get; set; }
    public string? Name { get; set; }
    public string? Year { get; set; }
    public string? Desc { get; set; }

    public static ProjectApiModel FromEntity(PortfolioProject p) =>
        new()
        {
            Img = p.Img,
            Name = p.Name,
            Year = p.Year,
            Desc = p.Description,
        };
}

public class ProjectsResponse
{
    public List<ProjectApiModel> Projects { get; set; } = [];
}
