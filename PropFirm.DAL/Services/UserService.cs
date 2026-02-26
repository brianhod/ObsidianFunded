using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Infrastructure.Services
{
    public class UserService
    {
        private readonly AppDbContext _dbContext;

        private readonly ILogger<UserService> _logger;

        public UserService(AppDbContext dbContext,
           ILogger<UserService> logger)
        {

            _dbContext = dbContext;
            _logger = logger;

        }

        public string Login(string username, string password)
        {
            _dbContext.Users.Where(x => x.UserName == username && x.Password == password);

            return "";
        }
    }

}
