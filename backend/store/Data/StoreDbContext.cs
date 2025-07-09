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

            // Configuration des noms de tables pour correspondre à PostgreSQL
            modelBuilder.Entity<Product>().ToTable("products");
            modelBuilder.Entity<Theme>().ToTable("themes");
            modelBuilder.Entity<ProductTheme>().ToTable("product_theme");
            modelBuilder.Entity<ProductImage>().ToTable("product_images");
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Order>().ToTable("orders");

            // Configuration des colonnes pour Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.ShortDescription).HasColumnName("short_description");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Price).HasColumnName("price").HasColumnType("decimal(10,2)");
            });

            // Configuration des colonnes pour Theme
            modelBuilder.Entity<Theme>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
            });

            // Configuration des colonnes pour ProductTheme
            modelBuilder.Entity<ProductTheme>(entity =>
            {
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.ThemeId).HasColumnName("theme_id");
            });

            // Configuration des colonnes pour ProductImage
            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.ImageData).HasColumnName("image_data");
                entity.Property(e => e.ImageName).HasColumnName("image_name");
                entity.Property(e => e.ImageMime).HasColumnName("image_mime");
            });

            // Configuration des colonnes pour User
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });

            // Configuration des colonnes pour Order
            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.OrderDate).HasColumnName("order_date");
                entity.Property(e => e.Total).HasColumnName("total").HasColumnType("decimal(10,2)");
            });

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