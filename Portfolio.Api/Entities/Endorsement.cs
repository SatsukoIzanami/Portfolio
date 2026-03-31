using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("endorsements")]
public class Endorsement
{
    [Column("id")]
    public int Id { get; set; }

    [Column("quote")]
    public string? Quote { get; set; }

    [Column("name")]
    [MaxLength(120)]
    public string? Name { get; set; }

    [Column("role")]
    [MaxLength(200)]
    public string? Role { get; set; }

    [Column("sort_order")]
    public int SortOrder { get; set; }
}
