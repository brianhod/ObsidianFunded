namespace PropFirm.MT5.Model
{
    public class User
    {
        public string Login { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MainPassword { get; set; }
        public string Group { get; set; }
        public int Leverage { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string PhonePassword { get; set; }
        public string InvestorPassword { get; set; }
        public string Agent { get; set; }
    }
}
