
import React from 'react';

const PurchaseEvaluation: React.FC = () => {
  const plans = [
    { title: 'Apprentice', balance: '$25,000', price: '$149', features: ['80% Profit Split', '1:100 Leverage', 'Bi-weekly Payouts'] },
    { title: 'Standard', balance: '$50,000', price: '$299', features: ['85% Profit Split', '1:100 Leverage', 'Bi-weekly Payouts'], highlight: true },
    { title: 'Elite', balance: '$100,000', price: '$499', features: ['90% Profit Split', '1:100 Leverage', 'Bi-weekly Payouts'] },
  ];

  return (
    <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white font-display tracking-tight mb-2">PICK YOUR CHALLENGE</h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.3em]">Select a virtual balance and start your journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`liquid-glass rounded-2xl flex flex-col transition-all hover:scale-[1.02] duration-300 ${plan.highlight ? 'border-primary/40 shadow-[0_0_30px_rgba(6,228,249,0.1)]' : 'border-white/5'}`}
          >
            {plan.highlight && (
              <div className="bg-primary text-black text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full w-max mx-auto -mt-3.5 mb-2">
                Most Popular
              </div>
            )}
            <div className="p-8 text-center border-b border-white/5">
              <h2 className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{plan.title}</h2>
              <p className="text-4xl font-extrabold text-white mb-2">{plan.balance}</p>
              <p className="text-primary text-2xl font-bold">{plan.price}</p>
            </div>
            <div className="p-8 flex-1">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                plan.highlight 
                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(6,228,249,0.4)] hover:brightness-110' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}>
                Select Account
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 liquid-glass p-8 rounded-2xl border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Platform', value: 'MetaTrader 5' },
            { label: 'Instruments', value: 'FX, Metals, Crypto' },
            { label: 'Commission', value: '$2/Lot Round Turn' },
            { label: 'Scaling', value: 'Up to $2,000,000' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-white font-bold text-sm tracking-wide">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseEvaluation;
