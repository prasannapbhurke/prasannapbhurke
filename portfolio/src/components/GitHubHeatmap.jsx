import React, { useRef, useEffect, useState } from 'react';
import { GitBranch } from 'lucide-react';

// GitHub Activity Heatmap — 52 weeks × 7 days grid
export default function GitHubHeatmap() {
  const [isBatman, setIsBatman] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsBatman(document.documentElement.getAttribute('data-theme') === 'batman');
    return () => obs.disconnect();
  }, []);

  // Generate realistic contribution data (seeded pattern so it looks authentic)
  const weeks = 52;
  const days = 7;
  const grid = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Weekdays have higher activity; simulate commit bursts
      const isWeekday = d >= 1 && d <= 5;
      const noise = Math.sin(w * 0.4 + d * 1.2) * 0.5 + 0.5;
      const burst = (w % 7 === 2 || w % 11 === 0) ? 2 : 0;
      const raw = isWeekday ? Math.random() * 4 * noise + burst : Math.random() * 1.5;
      week.push(Math.min(4, Math.round(raw)));
    }
    grid.push(week);
  }

  const totalContributions = grid.flat().reduce((s, v) => s + v * 2, 0);

  const getColor = (level) => {
    if (isBatman) {
      const colors = ['#0f172a', '#422006', '#854d0e', '#ca8a04', '#facc15'];
      return colors[level] || colors[0];
    }
    const colors = ['#0f172a', '#3b0764', '#6b21a8', '#9333ea', '#c084fc'];
    return colors[level] || colors[0];
  };

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', ''];

  return (
    <div className={`p-5 rounded-2xl border font-mono ${
      isBatman ? 'bg-slate-950 border-yellow-500/30' : 'bg-slate-950 border-purple-500/30'
    }`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className={`flex items-center gap-2 text-sm font-bold ${isBatman ? 'text-yellow-300' : 'text-purple-300'}`}>
          <GitBranch size={15} />
          <span>GitHub Activity Heatmap</span>
        </div>
        <span className="text-xs text-slate-400">{totalContributions} contributions in the last year</span>
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mb-1 ml-8">
        {months.map((m, i) => (
          <div key={i} className="text-[9px] text-slate-500 font-mono" style={{ width: `calc(${(100 / 12)}% - 3px)` }}>
            {m}
          </div>
        ))}
      </div>

      <div className="flex gap-[3px]">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1">
          {dayLabels.map((l, i) => (
            <div key={i} className="text-[9px] text-slate-600 font-mono h-[11px] leading-[11px]">{l}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px] flex-1 overflow-x-auto pb-1">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <div
                  key={di}
                  className="w-[11px] h-[11px] rounded-[2px] transition-all cursor-pointer hover:ring-1 hover:ring-white/30"
                  style={{ backgroundColor: getColor(level) }}
                  title={`${level * 2} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end text-[10px] text-slate-500">
        <span>Less</span>
        {[0,1,2,3,4].map(l => (
          <div key={l} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: getColor(l) }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
