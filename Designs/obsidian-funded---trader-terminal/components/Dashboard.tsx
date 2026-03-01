
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Day 1', equity: 100000 },
  { name: 'Day 2', equity: 102500 },
  { name: 'Day 3', equity: 101200 },
  { name: 'Day 4', equity: 104800 },
  { name: 'Day 5', equity: 106200 },
  { name: 'Day 6', equity: 105900 },
  { name: 'Day 7', equity: 108500 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-6xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Account Balance', value: '$108,500.00', change: '+8.5%', icon: 'account_balance_wallet' },
          { label: 'Equity', value: '$108,422.12', change: '+8.42%', icon: 'monitoring' },
          { label: 'Daily Drawdown', value: '1.2% / 5.0%', change: 'Safe', icon: 'trending_down' },
          { label: 'Trading Days', value: '7 / 5 min', change: 'Passed', icon: 'calendar_month' },
        ].map((stat, i) => (
          <div key={i} className="liquid-glass p-6 rounded-xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary/60">{stat.icon}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stat.change.includes('+') ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-bold font-display">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 liquid-glass rounded-xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest font-display">Equity Curve</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-primary/10 text-primary text-[10px] rounded border border-primary/20">1W</button>
              <button className="px-3 py-1 text-white/40 text-[10px] rounded hover:bg-white/5">1M</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06e4f9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06e4f9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f2123', border: '1px solid rgba(6, 228, 249, 0.2)', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#06e4f9' }}
                />
                <Area type="monotone" dataKey="equity" stroke="#06e4f9" strokeWidth={2} fillOpacity={1} fill="url(#colorEquity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="liquid-glass rounded-xl p-6 border border-white/5 flex flex-col">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest font-display mb-6">Recent Positions</h3>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {[
              { pair: 'EURUSD', type: 'BUY', profit: '+$450.20', status: 'Closed' },
              { pair: 'XAUUSD', type: 'SELL', profit: '-$120.50', status: 'Closed' },
              { pair: 'GBPUSD', type: 'BUY', profit: '+$1,120.00', status: 'Closed' },
              { pair: 'BTCUSD', type: 'BUY', profit: '+$210.15', status: 'Open' },
              { pair: 'USDCAD', type: 'SELL', profit: '-$45.00', status: 'Closed' },
            ].map((trade, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded bg-black/20 border border-white/5">
                <div>
                  <p className="text-xs font-bold">{trade.pair}</p>
                  <p className={`text-[10px] font-medium ${trade.type === 'BUY' ? 'text-primary' : 'text-red-400'}`}>{trade.type}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{trade.profit}</p>
                  <p className="text-[10px] text-white/40 uppercase">{trade.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 border border-white/10 rounded text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
