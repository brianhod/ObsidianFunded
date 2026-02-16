using PropFirm.MT5.Dto;
using PropFirm.MT5.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace PropFirm.MT5.Lib
{
    internal class MTAccountJson
    {
        public static MTAccount GetFromJson(MTAccountDto obj)
        {
            if (obj == null)
                return null;

            return new MTAccount
            {
                Login = obj.Login,
                CurrencyDigits = obj.CurrencyDigits,
                Balance = obj.Balance,
                Credit = obj.Credit,
                Margin = obj.Margin,
                MarginFree = obj.MarginFree,
                MarginLevel = obj.MarginLevel,
                MarginLeverage = obj.MarginLeverage,
                Profit = obj.Profit,
                Storage = obj.Storage,
                Commission = obj.Commission,
                Floating = obj.Floating,
                Equity = obj.Equity,
                SOActivation = obj.SOActivation,
                SOTime = obj.SOTime,
                SOLevel = obj.SOLevel,
                SOEquity = obj.SOEquity,
                SOMargin = obj.SOMargin,
                Assets = obj.Assets,
                Liabilities = obj.Liabilities,
                BlockedCommission = obj.BlockedCommission,
                BlockedProfit = obj.BlockedProfit,
                MarginInitial = obj.MarginInitial,
                MarginMaintenance = obj.MarginMaintenance
            };
        }

    }
}
