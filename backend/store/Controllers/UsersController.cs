using Microsoft.AspNetCore.Mvc;
using store.Services;
using store.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace store.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOrderService _orderService;

        public UsersController(IUserService userService, IOrderService orderService)
        {
            _userService = userService;
            _orderService = orderService;
        }

        // GET api/users/{userId}/orders
        [HttpGet("{userId:int}/orders")]
        public async Task<ActionResult<List<Order>>> GetOrdersByUser(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null) return NotFound();

            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        // POST api/users/{userId}/orders
        [HttpPost("{userId:int}/orders")]
        public async Task<IActionResult> CreateOrderForUser(int userId, [FromBody] Order order)
        {
            if (order == null)
                return BadRequest("Commande invalide.");

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null) return NotFound();

            order.UserId = userId;
            var createdOrder = await _orderService.CreateOrderAsync(order);
            return CreatedAtAction(nameof(GetOrdersByUser), new { userId = userId }, createdOrder);
        }
    }
}
