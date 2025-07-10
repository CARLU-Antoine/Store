using Microsoft.EntityFrameworkCore;
using store.Models;
using store.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace store.Services
{
    public class ProductService : IProductService
    {
        private readonly StoreDbContext _context;

        public ProductService(StoreDbContext context)
        {
            _context = context;
        }
        public async Task<Product> CreateProductAsync(Product product)
        {
            if (product.ProductThemes != null && product.ProductThemes.Any())
            {
                var updatedProductThemes = new List<ProductTheme>();

                foreach (var productTheme in product.ProductThemes)
                {
                    var themeName = productTheme.Theme?.Name;
                    if (string.IsNullOrEmpty(themeName))
                        continue;

                    // Chercher un thème existant en base par nom
                    var existingTheme = await _context.Themes
                        .FirstOrDefaultAsync(t => t.Name == themeName);

                    if (existingTheme != null)
                    {
                        // On réutilise le thème existant et on crée la liaison
                        updatedProductThemes.Add(new ProductTheme
                        {
                            ThemeId = existingTheme.Id,
                            Product = product
                        });
                    }
                    else
                    {
                        // Le thème n'existe pas, on ajoute celui fourni
                        _context.Themes.Add(productTheme.Theme);

                        // On garde la liaison avec ce nouveau thème (EF la prendra en compte)
                        updatedProductThemes.Add(productTheme);
                    }
                }

                product.ProductThemes = updatedProductThemes;
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Images)
                .Include(p => p.ProductThemes)
                    .ThenInclude(pt => pt.Theme)
                .ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(string productId)
        {
            if (!int.TryParse(productId, out int id))
                return null;

            return await _context.Products
                .Include(p => p.Images)
                .Include(p => p.ProductThemes)
                    .ThenInclude(pt => pt.Theme)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<Theme?> GetThemeByNameAsync(string themeName)
        {
            return await _context.Themes
                .FirstOrDefaultAsync(t => t.Name == themeName);
        }
    }
}
