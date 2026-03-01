namespace PropFirm.Dto
{
    public class JwtSettings
    {
        public string Key { get; set; } = default!;
        public string Issuer { get; set; } = default!;
        public string Audience { get; set; } = default!;
        public int DurationInMinutes { get; set; } = default!;
        public int AccessTokenMinutes { get; init; } = 15;
        public int RefreshTokenDays { get; init; } = 30;
    }
}