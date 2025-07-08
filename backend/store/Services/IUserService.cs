using System.Collections.Generic;
using System.Threading.Tasks;
using store.Models;

public interface IUserService
{
    Task<User?> GetUserByIdAsync(int userId);
}