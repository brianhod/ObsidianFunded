using PropFirm.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace PropFirm.Infrastructure.Interface
{
    public interface IUserService
    {
        Task<Result<RegisterResponse>> RegisterAsync(RegisterRequest request);
        Task<Result<LoginResponse>> LoginAsync(LoginRequest request);
    }
}
