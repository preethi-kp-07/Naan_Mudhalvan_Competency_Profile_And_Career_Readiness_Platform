import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CompetencyScore } from '../../types';

interface CompetencyDonutChartProps {
  competencies: CompetencyScore[];
  height?: number;
  showCenterScore?: boolean;
}

// Coordinated color palette aligned with the Tamil Nadu educational theme:
// Deep Navy, Professional Blue, Indigo, Teal, Emerald, Amber
const THEME_COLORS = [
  '#1D4ED8', // Professional Blue (Programming)
  '#0B2545', // Deep Navy (Relational DB / SQL)
  '#4F46E5', // Indigo (Problem Solving & DSA)
  '#0D9488', // Teal (Web & API)
  '#059669', // Emerald (Communication)
  '#D97706', // Amber (Cloud & Infrastructure)
];

export const CompetencyDonutChart: React.FC<CompetencyDonutChartProps> = ({
  competencies,
  height = 300,
  showCenterScore = true,
}) => {
  if (!competencies || competencies.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-xs text-slate-400">
        No competency distribution data available.
      </div>
    );
  }

  const overallScore = Math.round(
    competencies.reduce((acc, c) => acc + c.score, 0) / Math.max(1, competencies.length)
  );

  const chartData = competencies.map((c) => ({
    name: c.competency,
    value: c.score,
    target: c.targetScore,
    level: c.level,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
          <p className="font-bold text-slate-900">{data.name}</p>
          <div className="mt-1 space-y-0.5 text-[11px]">
            <p className="text-blue-700 font-semibold">
              Current Score: <span>{data.value}%</span>
            </p>
            <p className="text-slate-500">
              Benchmark Target: <span>{data.target}%</span>
            </p>
            <p className="text-slate-500">
              Proficiency: <span className="font-medium text-slate-800">{data.level}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }} className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="value"
            stroke="#FFFFFF"
            strokeWidth={2}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={THEME_COLORS[index % THEME_COLORS.length]}
                className="transition-all duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px', color: '#475569' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label for Overall Competency Index */}
      {showCenterScore && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
            Overall Index
          </span>
          <span className="text-2xl font-black text-slate-900 leading-none">
            {overallScore}%
          </span>
          <span className="text-[10px] font-medium text-emerald-700 block mt-0.5">
            Verified
          </span>
        </div>
      )}
    </div>
  );
};
