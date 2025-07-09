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


        [HttpGet("{userId:int}")]
        public async Task<ActionResult<User>> GetUserById(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

  
        [HttpGet("{userId:int}/orders")]
        public async Task<ActionResult<List<Order>>> GetOrdersByUser(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null) return NotFound();

            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }


        [HttpPost("creerUtilisateur")]
        public async Task<IActionResult> CreateUtilisateur([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Utilisateur invalide.");

            var createdUser = await _userService.CreateUserAsync(user);

            return CreatedAtAction(nameof(GetUserById), new { userId = createdUser.Id }, createdUser);
        }


        [HttpPost("connexionUtilisateur")]
        public async Task<IActionResult> ConnexionUtilisateur([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Utilisateur invalide.");

            try
            {
                var createdUser = await _userService.ConnexionUserAsync(user);
                return CreatedAtAction(nameof(GetUserById), new { userId = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                // Tu peux créer une exception personnalisée pour être plus précis si besoin
                return Conflict(new { message = ex.Message });
            }
        }


        [HttpPost("{userId:int}/orders")]
        public async Task<IActionResult> CreateOrderForUser(int userId, [FromBody] Order order)
        {
            if (order == null)
                return BadRequest("Commande invalide.");

            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound();

            order.UserId = userId;
            var createdOrder = await _orderService.CreateOrderAsync(order);

            return CreatedAtAction(nameof(GetOrdersByUser), new { userId = userId }, createdOrder);
        }
    }
}
