
using store.Models;

public class Theme
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Navigation property
        public ICollection<ProductTheme> ProductThemes { get; set; } = new List<ProductTheme>();
    }