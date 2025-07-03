using store.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<IProductImageService, ProductImageService>();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
