using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.MT5.Model
{
    public class MTAccount
    {
        // Identification
        public int Login { get; set; }
        public int CurrencyDigits { get; set; }

        // Balance information
        public double Balance { get; set; }
        public double Credit { get; set; }
        public double Equity { get; set; }
        public double Profit { get; set; }

        // Margin information
        public double Margin { get; set; }
        public double MarginFree { get; set; }
        public double MarginLevel { get; set; }
        public int MarginLeverage { get; set; }
        public double MarginInitial { get; set; }
        public double MarginMaintenance { get; set; }

        // Trading results
        public double Floating { get; set; }
        public double Storage { get; set; }
        public double Commission { get; set; }
        public double BlockedCommission { get; set; }
        public double BlockedProfit { get; set; }

        // Stop-out information
        public int SOActivation { get; set; }
        public int SOTime { get; set; }
        public double SOLevel { get; set; }
        public double SOEquity { get; set; }
        public double SOMargin { get; set; }

        // Optional fields
        public double? Assets { get; set; }
        public double? Liabilities { get; set; }
    }
}
