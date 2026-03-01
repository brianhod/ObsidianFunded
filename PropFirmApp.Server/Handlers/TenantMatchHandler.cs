using Microsoft.AspNetCore.Authorization;

namespace PropFirmApp.Server.Handlers
{
    public class TenantMatchRequirement : IAuthorizationRequirement { }

    public class TenantMatchHandler : AuthorizationHandler<TenantMatchRequirement>
    {
        private readonly IHttpContextAccessor _http;

        public TenantMatchHandler(IHttpContextAccessor http) => _http = http;

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            TenantMatchRequirement requirement)
        {
            var http = _http.HttpContext;
            if (http == null) return Task.CompletedTask;

            var tenantFromHeader = http.Request.Headers["X-Tenant-Id"].ToString();
            var tenantFromToken = context.User.FindFirst("tenant_id")?.Value;

            if (!string.IsNullOrWhiteSpace(tenantFromHeader) &&
                !string.IsNullOrWhiteSpace(tenantFromToken) &&
                string.Equals(tenantFromHeader, tenantFromToken, StringComparison.Ordinal))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
