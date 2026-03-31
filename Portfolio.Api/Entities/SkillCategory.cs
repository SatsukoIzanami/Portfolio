using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("skill_categories")]
public class SkillCategory
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [MaxLength(120)]
    public string? Title { get; set; }

    [Column("sort_order")]
    public int SortOrder { get; set; }

    public ICollection<SkillItem> Items { get; set; } = [];
}
