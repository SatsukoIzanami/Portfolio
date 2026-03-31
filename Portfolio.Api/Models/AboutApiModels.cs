using Portfolio.Api.Entities;

namespace Portfolio.Api.Models;

public class AboutBioApiModel
{
    public string? Headline { get; set; }
    public string? Subline { get; set; }
    public string? Body { get; set; }
    public string? Avatar { get; set; }

    public static AboutBioApiModel FromEntity(AboutProfile p) =>
        new()
        {
            Headline = p.Headline,
            Subline = p.Subline,
            Body = p.Body,
            Avatar = p.Avatar,
        };
}

public class SkillItemApiModel
{
    public string Label { get; set; } = "";
    public int Value { get; set; }
}

public class SkillCategoryApiModel
{
    public string? Title { get; set; }
    public List<SkillItemApiModel> Items { get; set; } = [];
}

public class SkillsEnvelopeApiModel
{
    public List<SkillCategoryApiModel> Categories { get; set; } = [];
}

public class EndorsementApiModel
{
    public string? Quote { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
}

public class TimelineEntryApiModel
{
    public string? Company { get; set; }
    public string? Role { get; set; }
    public string? Start { get; set; }
    public string? End { get; set; }
    public List<string> Bullets { get; set; } = [];
}

public class AboutDataApiModel
{
    public AboutBioApiModel? Bio { get; set; }
    public SkillsEnvelopeApiModel Skills { get; set; } = new();
    public List<EndorsementApiModel> Endorsements { get; set; } = [];
    public List<TimelineEntryApiModel> Timeline { get; set; } = [];
}
