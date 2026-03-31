using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("timeline_entries")]
public class TimelineEntry
{
    [Column("id")]
    public int Id { get; set; }

    [Column("company")]
    [MaxLength(200)]
    public string? Company { get; set; }

    [Column("role")]
    [MaxLength(200)]
    public string? Role { get; set; }

    [Column("start")]
    [MaxLength(40)]
    public string? Start { get; set; }

    [Column("end")]
    [MaxLength(40)]
    public string? End { get; set; }

    [Column("sort_order")]
    public int SortOrder { get; set; }

    public ICollection<TimelineBullet> Bullets { get; set; } = [];
}
