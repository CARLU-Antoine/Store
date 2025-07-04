namespace store.Services
{
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    public class ProductImageService : IProductImageService
    {
        private readonly string _imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedImages");
        private readonly string _modelsFolder = Path.Combine(Directory.GetCurrentDirectory(), "GeneratedModels");

        public async Task SaveImagesAsync(string productId, List<IFormFile> files)
        {
            string productFolder = Path.Combine(_imagesFolder, productId);
            if (!Directory.Exists(productFolder))
                Directory.CreateDirectory(productFolder);

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(productFolder, file.FileName);
                    using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);
                }
            }
        }

        public byte[]? Get3DModel(string productId)
        {
            string modelPath = Path.Combine(_modelsFolder, $"{productId}.glb");

            Console.WriteLine($"Récupération du modèle 3D pour le produit {productId} depuis {modelPath}"); 
            if (!File.Exists(modelPath))
                return null;
            return File.ReadAllBytes(modelPath);
        }

    }
}
