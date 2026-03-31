using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Api.Entities;

[Table("projects")]
public class PortfolioProject
{
    [Column("id")]
    public int Id { get; set; }

    [Column("img")]
    [MaxLength(255)]
    public string? Img { get; set; }

    [Column("name")]
    [MaxLength(255)]
    public string? Name { get; set; }

    [Column("year")]
    [MaxLength(20)]
    public string? Year { get; set; }

    [Column("desc")]
    public string? Description { get; set; }
}
