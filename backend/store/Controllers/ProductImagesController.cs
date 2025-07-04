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
            Console.WriteLine($"Début de l'upload des images pour le produit {productId}");

            if (files == null || files.Count == 0)
            {
            Console.WriteLine("Aucune image envoyée");
            return BadRequest("Aucune image envoyée");
            }

            Console.WriteLine($"{files.Count} images reçues pour le produit {productId}");

            await _service.SaveImagesAsync(productId, files);

            Console.WriteLine($"Images sauvegardées avec succès pour le produit {productId}");

            // Ici, tu peux appeler ton microservice reconstruction 3D

            return Ok(new { message = $"{files.Count} images uploadées pour le produit {productId}" });
        }

        [HttpGet("{productId}/model")]
        public IActionResult Get3DModel(string productId)
        {
            Console.WriteLine($"Début de la récupération du modèle 3D pour le produit {productId}");

            var modelBytes = _service.Get3DModel(productId);

            if (modelBytes == null)
            {
            Console.WriteLine($"Modèle 3D non trouvé pour le produit {productId}");
            return NotFound("Modèle 3D non trouvé pour ce produit");
            }

            Console.WriteLine($"Modèle 3D récupéré avec succès pour le produit {productId}");
            return File(modelBytes, "model/gltf-binary", $"{productId}.glb");
        }
    }
}
