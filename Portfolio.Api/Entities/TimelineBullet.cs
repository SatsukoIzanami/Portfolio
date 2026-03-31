using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("timeline_bullets")]
public class TimelineBullet
{
    [Column("id")]
    public int Id { get; set; }

    [Column("entry_id")]
    public int EntryId { get; set; }

    [Column("text")]
    public string Text { get; set; } = null!;

    [Column("sort_order")]
    public int SortOrder { get; set; }

    public TimelineEntry Entry { get; set; } = null!;
}
