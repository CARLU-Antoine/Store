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

}
