using System.Collections.Generic;
using System.Threading.Tasks;
using store.Models;

public interface IOrderService
{
    Task<List<Order>> GetOrdersByUserIdAsync(int userId);
    Task<Order> CreateOrderAsync(Order order);
}