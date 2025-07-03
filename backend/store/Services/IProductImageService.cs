namespace store.Services
{
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IProductImageService
    {
        Task SaveImagesAsync(string productId, List<IFormFile> files);
        byte[] Get3DModel(string productId);
    }
}
