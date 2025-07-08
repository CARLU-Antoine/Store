namespace store.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }

        // Navigation properties
        public ICollection<ProductTheme> ProductThemes { get; set; } = new List<ProductTheme>();
        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    }

    public class Theme
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Navigation property
        public ICollection<ProductTheme> ProductThemes { get; set; } = new List<ProductTheme>();
    }

    // Table de liaison N-N produit <-> thème
    public class ProductTheme
    {
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int ThemeId { get; set; }
        public Theme Theme { get; set; } = null!;
    }

    public class ProductImage
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public byte[] ImageData { get; set; } = Array.Empty<byte>();
        public string? ImageName { get; set; }
        public string? ImageMime { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
    }
}
