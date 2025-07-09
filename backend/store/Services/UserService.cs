using Microsoft.EntityFrameworkCore;
using store.Data;

namespace store.Services
{
    public class UserService : IUserService
    {
        private readonly StoreDbContext _context;

        public UserService(StoreDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<User?> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> ConnexionUserAsync(User user)
        {
            // Recherche de l'utilisateur par email
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser == null)
            {
                // Aucun utilisateur avec cet email
                return null;
            }

            // Vérification du mot de passe (hashé bien sûr)
            if (existingUser.PasswordHash != user.PasswordHash)
            {
                // Mauvais mot de passe
                return null;
            }

            // Authentification réussie
            return existingUser;
        }

    }
}
