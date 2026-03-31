using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("about_profiles")]
public class AboutProfile
{
    [Column("id")]
    public int Id { get; set; }

    [Column("headline")]
    [MaxLength(200)]
    public string? Headline { get; set; }

    [Column("subline")]
    [MaxLength(300)]
    public string? Subline { get; set; }

    [Column("body")]
    public string? Body { get; set; }

    [Column("avatar")]
    [MaxLength(255)]
    public string? Avatar { get; set; }
}
