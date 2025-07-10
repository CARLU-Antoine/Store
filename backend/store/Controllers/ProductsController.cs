using Microsoft.AspNetCore.Mvc;
using store.Services;
using store.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.Json;

namespace store.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        // POST api/products - Version FormData pour gérer les fichiers
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateDto productDto)
        {
            if (productDto == null)
                return BadRequest("Produit invalide.");

            // Créer le produit
            var product = new Product
            {
                Name = productDto.Title,
                Price = productDto.Price,
                ShortDescription = productDto.PetiteDescription,
                Description = productDto.Description,
                ProductThemes = new List<ProductTheme>(),
                Images = new List<ProductImage>()
            };

            // Traiter les thèmes
            if (!string.IsNullOrEmpty(productDto.Themes))
            {
                try
                {
                    var themes = JsonSerializer.Deserialize<List<ThemeDto>>(productDto.Themes);
                    if (themes != null)
                    {
                        foreach (var themeDto in themes)
                        {
                            // Chercher le thème existant par nom
                            var existingTheme = await GetThemeByNameAsync(themeDto.Name);
                            if (existingTheme != null)
                            {
                                // Utiliser le thème existant
                                product.ProductThemes.Add(new ProductTheme
                                {
                                    Product = product,
                                    ThemeId = existingTheme.Id
                                });
                            }
                            else
                            {
                                // Créer un nouveau thème
                                var newTheme = new Theme { Name = themeDto.Name };
                                product.ProductThemes.Add(new ProductTheme
                                {
                                    Product = product,
                                    Theme = newTheme
                                });
                            }
                        }
                    }
                }
                catch (JsonException)
                {
                    return BadRequest("Format des thèmes invalide.");
                }
            }

            // Traiter les images
            if (productDto.Images != null && productDto.Images.Count > 0)
            {
                foreach (var file in productDto.Images)
                {
                    if (file.Length > 0)
                    {
                        using var memoryStream = new MemoryStream();
                        await file.CopyToAsync(memoryStream);
                        
                        var productImage = new ProductImage
                        {
                            Product = product,
                            ImageData = memoryStream.ToArray(),
                            ImageName = file.FileName,
                            ImageMime = file.ContentType
                        };
                        
                        product.Images.Add(productImage);
                    }
                }
            }

            var createdProduct = await _service.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { productId = createdProduct.Id.ToString() }, createdProduct);
        }


        // GET api/products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _service.GetAllProductsAsync();
            return Ok(products);
        }

        // GET api/products/{productId}
        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId)
        {
            var product = await _service.GetProductByIdAsync(productId.ToString());
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // Méthode privée pour obtenir un thème par nom
        private async Task<Theme?> GetThemeByNameAsync(string themeName)
        {

            return null;
        }
    }

    // DTO pour recevoir les données FormData
    public class ProductCreateDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string PetiteDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Themes { get; set; } = string.Empty; // JSON string
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();
    }

    // DTO pour désérialiser les thèmes depuis JSON
    public class ThemeDto
    {
        public string Name { get; set; } = string.Empty;
    }
}