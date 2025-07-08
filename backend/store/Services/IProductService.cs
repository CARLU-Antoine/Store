using System.Collections.Generic;
using System.Threading.Tasks;
using store.Models;

namespace store.Services
{
    public interface IProductService
    {
        Task<Product> CreateProductAsync(Product product);
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string productId);
    }
}
