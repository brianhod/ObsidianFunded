
import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="w-full max-w-5xl liquid-glass rounded-xl flex flex-col h-[80vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="px-8 py-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-[0.05em] uppercase font-display">Terms and Conditions</h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Last Updated: October 2024</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 border border-primary/30 hover:bg-primary/10 transition-all rounded text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Print
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-12 pb-12">
          <section>
            <div className="section-heading">
              <h2 className="text-primary text-lg font-extrabold uppercase tracking-widest font-display">1. Introduction</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
              <p>Welcome to Obsidian Funded. These Terms and Conditions govern your use of our proprietary trading evaluation services and simulated trading environment. By accessing our terminal or purchasing an evaluation, you agree to be bound by these terms in their entirety.</p>
              <p>Obsidian Funded provides access to simulated capital for the purpose of identifying skilled traders. All trading activity is conducted in a demo environment and does not involve real market execution.</p>
            </div>
          </section>

          <section>
            <div className="section-heading">
              <h2 className="text-primary text-lg font-extrabold uppercase tracking-widest font-display">2. Trading Rules</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
              <p>To maintain account integrity and qualify for funding, traders must adhere to strict risk management protocols:</p>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_small</span>
                  <span>Maximum Daily Loss: Calculated as 5% of the starting balance of each day.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_small</span>
                  <span>Maximum Overall Drawdown: Fixed at 10% of the initial account balance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_small</span>
                  <span>Minimum Trading Days: A minimum of 5 active trading days is required per phase.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="section-heading">
              <h2 className="text-primary text-lg font-extrabold uppercase tracking-widest font-display">3. Risk Disclosure</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <p className="text-primary/90 font-semibold mb-2 uppercase text-xs tracking-widest">Financial Notice</p>
                <p>Trading financial instruments involves significant risk. Our platform is strictly for educational and performance evaluation purposes. Success in a simulated environment does not guarantee success in live market conditions. Obsidian Funded is not a financial institution and does not provide investment advice.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="section-heading">
              <h2 className="text-primary text-lg font-extrabold uppercase tracking-widest font-display">4. Payout Policy</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
              <p>Traders are eligible for a profit split ranging from 80% to 90% based on their selected plan and performance metrics.</p>
              <ul className="list-none space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">payments</span>
                  <span>Payout Cycle: Bi-weekly payouts are available after the first 14 days of trading on a funded account.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">currency_exchange</span>
                  <span>Withdrawal Methods: Supported via Crypto (USDT), Wire Transfer, and Deel.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="section-heading">
              <h2 className="text-primary text-lg font-extrabold uppercase tracking-widest font-display">5. Prohibited Strategies</h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm">
              <p>The following technical strategies are strictly prohibited and will result in immediate account termination:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 border border-white/5 bg-black/20 rounded">
                  <span className="text-xs font-bold text-white block mb-1 uppercase">HFT & Arbitrage</span>
                  <p className="text-[11px] text-white/50">High-frequency trading bots and latency arbitrage are not permitted.</p>
                </div>
                <div className="p-3 border border-white/5 bg-black/20 rounded">
                  <span className="text-xs font-bold text-white block mb-1 uppercase">Grid Trading</span>
                  <p className="text-[11px] text-white/50">Aggressive grid systems designed to exploit demo server execution.</p>
                </div>
                <div className="p-3 border border-white/5 bg-black/20 rounded">
                  <span className="text-xs font-bold text-white block mb-1 uppercase">Account Sharing</span>
                  <p className="text-[11px] text-white/50">Only the registered owner is permitted to trade the allocated account.</p>
                </div>
                <div className="p-3 border border-white/5 bg-black/20 rounded">
                  <span className="text-xs font-bold text-white block mb-1 uppercase">Hedging (Same Pair)</span>
                  <p className="text-[11px] text-white/50">Simultaneously holding long and short positions on the same instrument.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
