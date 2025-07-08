using Microsoft.AspNetCore.Mvc;
using store.Services;
using store.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        // POST api/products
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (product == null)
                return BadRequest("Produit invalide.");

            var createdProduct = await _service.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { productId = createdProduct.Id }, createdProduct);
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
        public async Task<ActionResult<Product>> GetProductById(string productId)
        {
            var product = await _service.GetProductByIdAsync(productId);
            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }
}

