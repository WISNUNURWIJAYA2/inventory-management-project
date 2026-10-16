import React, { useState } from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { chartSummary, chartBars } from '@/data/mockData';

export function StockMovementChart() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG coordinate constants
  const chartWidth = 760;
  const chartHeight = 210;
  const zeroY = 190;

  return (
    <div className="bg-surface-container-lowest p-5 rounded shadow-xs border border-outline-variant/30 flex flex-col justify-between">
      <div>
        {/* Header and Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] text-on-surface font-semibold">
                Stock Movement Over Time
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-surface-container text-on-surface-variant font-medium">
                Daily In vs Out
              </span>
            </div>
            <p className="text-xs text-secondary mt-0.5">
              Comparison of Stock-In (Units Inbound) vs Stock-Out (Dispatched) across the current cycle
            </p>
          </div>

          {/* Metric Badges Legend */}
          <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <span className="w-2.5 h-2.5 rounded-xs bg-tertiary" />
              <span>Stock-In</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <span className="w-2.5 h-2.5 rounded-xs bg-primary" />
              <span>Stock-Out</span>
            </div>
            <div className="flex items-center gap-1.5 text-outline font-medium">
              <span className="w-3 h-0.5 bg-secondary border-b border-dashed" />
              <span>Net Pace</span>
            </div>
          </div>
        </div>

        {/* Monthly Aggregates Micro Strip */}
        <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded bg-surface-container-low text-on-surface border border-outline-variant/30">
          <div className="flex flex-col">
            <span className="text-[11px] text-secondary uppercase font-semibold">
              Stock-In Total
            </span>
            <span className="text-base font-bold font-mono text-tertiary">
              {chartSummary.stockInTotal}{' '}
              <span className="text-xs text-secondary font-normal">units</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-secondary uppercase font-semibold">
              Stock-Out Total
            </span>
            <span className="text-base font-bold font-mono text-primary">
              {chartSummary.stockOutTotal}{' '}
              <span className="text-xs text-secondary font-normal">units</span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] text-secondary uppercase font-semibold">
              Net Inventory Delta
            </span>
            <span className="text-base font-bold font-mono text-on-surface">
              {chartSummary.netDelta}{' '}
              <span className="text-xs text-tertiary font-medium">
                ({chartSummary.netDeltaPercentage})
              </span>
            </span>
          </div>
        </div>

        {/* Scalable SVG Chart */}
        <div className="relative w-full h-[220px] pt-1 select-none">
          <svg
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            <defs>
              <linearGradient id="inboundGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006243" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#006243" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="outboundGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#004ac6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#004ac6" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Horizontal Background Guide Lines */}
            <line stroke="#eceef0" strokeWidth="1" x1="45" x2="745" y1="20" y2="20" />
            <text className="text-[10px] font-mono" fill="#737686" textAnchor="end" x="35" y="24">
              800
            </text>
            <line stroke="#eceef0" strokeWidth="1" x1="45" x2="745" y1="65" y2="65" />
            <text className="text-[10px] font-mono" fill="#737686" textAnchor="end" x="35" y="69">
              600
            </text>
            <line stroke="#eceef0" strokeWidth="1" x1="45" x2="745" y1="110" y2="110" />
            <text className="text-[10px] font-mono" fill="#737686" textAnchor="end" x="35" y="114">
              400
            </text>
            <line stroke="#eceef0" strokeWidth="1" x1="45" x2="745" y1="155" y2="155" />
            <text className="text-[10px] font-mono" fill="#737686" textAnchor="end" x="35" y="159">
              200
            </text>
            <line stroke="#c3c6d7" strokeWidth="1" x1="45" x2="745" y1={zeroY} y2={zeroY} />
            <text className="text-[10px] font-mono" fill="#737686" textAnchor="end" x="35" y="193">
              0
            </text>

            {/* Chart Bars */}
            {chartBars.map((bar, i) => {
              const xPos = 65 + i * 70;
              const isHovered = hoveredIndex === i;

              return (
                <g
                  key={bar.date}
                  className="cursor-pointer transition-opacity"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Inbound bar */}
                  <rect
                    fill="url(#inboundGrad)"
                    height={zeroY - bar.inY}
                    rx="1"
                    width="14"
                    x={xPos}
                    y={bar.inY}
                    opacity={isHovered ? 1 : 0.9}
                  />
                  {/* Outbound bar */}
                  <rect
                    fill="url(#outboundGrad)"
                    height={zeroY - bar.outY}
                    rx="1"
                    width="14"
                    x={xPos + 17}
                    y={bar.outY}
                    opacity={isHovered ? 1 : 0.85}
                  />
                  {/* X Axis Label */}
                  <text
                    className="text-[10px] font-mono"
                    fill={isHovered ? '#191c1e' : '#737686'}
                    fontWeight={isHovered ? '600' : '400'}
                    textAnchor="middle"
                    x={xPos + 14}
                    y="204"
                  >
                    {bar.date}
                  </text>
                </g>
              );
            })}

            {/* Running Balance Trend Line */}
            <polyline
              fill="none"
              points="
                79,88
                149,72
                219,80
                289,59
                359,107
                429,58
                499,102
                569,78
                639,47
                709,92
              "
              stroke="#565e74"
              strokeDasharray="3 3"
              strokeWidth="2"
            />

            {/* Active Day Indicator on Day 28 (x: 639, y: 47) */}
            <circle cx="639" cy="47" fill="#004ac6" r="4" />
            <circle cx="639" cy="47" fill="#004ac6" fillOpacity="0.2" r="8" />
          </svg>
        </div>
      </div>

      {/* Footer Info & Link */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-outline-variant/20 text-outline text-xs">
        <div className="flex items-center gap-1.5">
          <Info className="w-4 h-4 text-tertiary shrink-0" />
          <span className="truncate">{chartSummary.callout}</span>
        </div>
        <button
          type="button"
          className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-0.5 shrink-0 ml-2"
        >
          <span>Full Analytics</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

