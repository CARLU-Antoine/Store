using Microsoft.EntityFrameworkCore;
using store.Models;

namespace store.Data
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Theme> Themes => Set<Theme>();
        public DbSet<ProductTheme> ProductThemes => Set<ProductTheme>();
        public DbSet<ProductImage> ProductImages => Set<ProductImage>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Clé primaire composite pour la table de liaison ProductTheme
            modelBuilder.Entity<ProductTheme>()
                .HasKey(pt => new { pt.ProductId, pt.ThemeId });

            // Relations N-N Product <-> Theme
            modelBuilder.Entity<ProductTheme>()
                .HasOne(pt => pt.Product)
                .WithMany(p => p.ProductThemes)
                .HasForeignKey(pt => pt.ProductId);

            modelBuilder.Entity<ProductTheme>()
                .HasOne(pt => pt.Theme)
                .WithMany(t => t.ProductThemes)
                .HasForeignKey(pt => pt.ThemeId);

            // Relation ProductImage -> Product
            modelBuilder.Entity<ProductImage>()
                .HasOne(pi => pi.Product)
                .WithMany(p => p.Images)
                .HasForeignKey(pi => pi.ProductId);

            // Relation Order -> User
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId);
        }
    }
}
