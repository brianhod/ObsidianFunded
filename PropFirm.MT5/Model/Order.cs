namespace PropFirm.MT5.Model
{
    public class Order
    {
        public string Action { get; set; }
        public string Login { get; set; }
        public string Symbol { get; set; }
        public double Volume { get; set; }
        public string Type { get; set; }
        public string TypeFill { get; set; }
    }
}
