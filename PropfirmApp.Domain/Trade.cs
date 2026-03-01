using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PropfirmApp.Domain
{
    public class Trade
    {
        // Deal type constants
        public const int DEAL_BUY = 0;                  // buy
        public const int DEAL_SELL = 1;                 // sell
        public const int DEAL_BALANCE = 2;              // deposit operation
        public const int DEAL_CREDIT = 3;               // credit operation
        public const int DEAL_CHARGE = 4;               // additional charges
        public const int DEAL_CORRECTION = 5;           // correction deals
        public const int DEAL_BONUS = 6;                // bonus
        public const int DEAL_COMMISSION = 7;           // commission
        public const int DEAL_COMMISSION_DAILY = 8;     // daily commission
        public const int DEAL_COMMISSION_MONTHLY = 9;   // monthly commission
        public const int DEAL_AGENT_DAILY = 10;         // daily agent commission
        public const int DEAL_AGENT_MONTHLY = 11;       // monthly agent commission
        public const int DEAL_INTERESTRATE = 12;        // interest rate charges
        public const int DEAL_BUY_CANCELED = 13;        // canceled buy deal
        public const int DEAL_SELL_CANCELED = 14;       // canceled sell deal
        public const int DEAL_DIVIDEND = 15;            // dividend
        public const int DEAL_DIVIDEND_FRANKED = 16;    // franked dividend
        public const int DEAL_TAX = 17;                 // taxes
        public const int DEAL_AGENT = 18;               // instant agent commission
        public const int DEAL_SO_COMPENSATION = 19;     // negative balance compensation after stop-out

        // Enumeration borders
        public const int DEAL_FIRST = DEAL_BUY;
        public const int DEAL_LAST = DEAL_SO_COMPENSATION;

        public string Ticket { get; set; }
        public string Login { get; set; }
        public int Type { get; set; }
        public decimal Amount { get; set; }
        public string Comment { get; set; }
    }
}
