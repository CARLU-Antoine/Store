using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using store.Data;
using store.Models;

namespace store.Services
{
    public class OrderService : IOrderService
    {
        private readonly StoreDbContext _context;

        public OrderService(StoreDbContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.User)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            // Définir la date de commande si elle n'est pas définie
            if (order.OrderDate == default(DateTime))
            {
                order.OrderDate = DateTime.UtcNow;
            }

            // Ajouter la commande à la base de données
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Retourner la commande créée avec les données rechargées
            return await _context.Orders
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == order.Id) ?? order;
        }
    }
}