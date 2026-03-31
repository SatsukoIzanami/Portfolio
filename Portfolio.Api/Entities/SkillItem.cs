using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("skill_items")]
public class SkillItem
{
    [Column("id")]
    public int Id { get; set; }

    [Column("category_id")]
    public int CategoryId { get; set; }

    [Column("label")]
    [MaxLength(120)]
    public string Label { get; set; } = null!;

    [Column("value")]
    public int Value { get; set; }

    [Column("sort_order")]
    public int SortOrder { get; set; }

    public SkillCategory Category { get; set; } = null!;
}
