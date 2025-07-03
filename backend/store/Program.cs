using store.Services;              // Ajouté pour reconnaître IProductImageService et ProductImageService
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<IProductImageService, ProductImageService>();

var app = builder.Build();

// Middleware HTTP
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
