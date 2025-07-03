using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using store.Services;

namespace store.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductImagesController : ControllerBase
    {
        private readonly IProductImageService _service;

        public ProductImagesController(IProductImageService service)
        {
            _service = service;
        }

        [HttpPost("{productId}/upload-images")]
        public async Task<IActionResult> UploadImages(string productId, [FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Aucune image envoyée");

            await _service.SaveImagesAsync(productId, files);

            // Ici, tu peux appeler ton microservice reconstruction 3D

            return Ok(new { message = $"{files.Count} images uploadées pour le produit {productId}" });
        }

        [HttpGet("{productId}/model")]
        public IActionResult Get3DModel(string productId)
        {
            var modelBytes = _service.Get3DModel(productId);

            if (modelBytes == null)
                return NotFound("Modèle 3D non trouvé pour ce produit");

            return File(modelBytes, "model/gltf-binary", $"{productId}.glb");
        }
    }
}
