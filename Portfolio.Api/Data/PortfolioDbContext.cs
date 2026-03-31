using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Entities;

namespace Portfolio.Api.Data;

public class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : DbContext(options)
{
    public DbSet<PortfolioProject> Projects => Set<PortfolioProject>();
    public DbSet<AboutProfile> AboutProfiles => Set<AboutProfile>();
    public DbSet<SkillCategory> SkillCategories => Set<SkillCategory>();
    public DbSet<SkillItem> SkillItems => Set<SkillItem>();
    public DbSet<Endorsement> Endorsements => Set<Endorsement>();
    public DbSet<TimelineEntry> TimelineEntries => Set<TimelineEntry>();
    public DbSet<TimelineBullet> TimelineBullets => Set<TimelineBullet>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SkillCategory>()
            .HasMany(c => c.Items)
            .WithOne(i => i.Category)
            .HasForeignKey(i => i.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TimelineEntry>()
            .HasMany(e => e.Bullets)
            .WithOne(b => b.Entry)
            .HasForeignKey(b => b.EntryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
