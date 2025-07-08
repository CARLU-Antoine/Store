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
    }
}
