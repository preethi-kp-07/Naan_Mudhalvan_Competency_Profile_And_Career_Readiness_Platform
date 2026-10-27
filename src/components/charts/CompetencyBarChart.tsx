import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CompetencyScore } from '../../types';

interface CompetencyBarChartProps {
  competencies: CompetencyScore[];
  height?: number;
}

export const CompetencyBarChart: React.FC<CompetencyBarChartProps> = ({
  competencies,
  height = 300,
}) => {
  const data = competencies.map((c) => ({
    name: c.competency.length > 16 ? c.competency.slice(0, 14) + '..' : c.competency,
    fullName: c.competency,
    Current: c.score,
    Target: c.targetScore,
    isGap: c.score < c.targetScore,
  }));

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const gap = item.Target - item.Current;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs z-50">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-2">
            {item.fullName}
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Your Score (மதிப்பெண்):</span>
              </span>
              <strong className="text-blue-700 font-bold">{item.Current}%</strong>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                <span>Target Score (இலக்கு):</span>
              </span>
              <strong className="text-slate-700 font-bold">{item.Target}%</strong>
            </div>
            {gap > 0 ? (
              <div className="pt-1.5 border-t border-slate-100 text-[11px] text-amber-700 font-medium">
                ⚠️ Gap: {gap}% below placement standard
              </div>
            ) : (
              <div className="pt-1.5 border-t border-slate-100 text-[11px] text-emerald-700 font-medium">
                ✓ Meets or exceeds target standard!
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
            angle={-15}
            textAnchor="end"
            height={45}
          />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 11 }} />
          <Tooltip content={<CustomBarTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '14px', fontSize: '12px', fontWeight: 500 }}
          />
          <ReferenceLine
            y={75}
            stroke="#059669"
            strokeDasharray="4 4"
            label={{
              value: '75% Pass Standard',
              position: 'insideTopLeft',
              fill: '#059669',
              fontSize: 10,
              fontWeight: 600,
            }}
          />
          <Bar
            name="Your Score"
            dataKey="Current"
            fill="#1D4ED8"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
          <Bar
            name="Target Benchmark"
            dataKey="Target"
            fill="#CBD5E1"
            radius={[6, 6, 0, 0]}
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
