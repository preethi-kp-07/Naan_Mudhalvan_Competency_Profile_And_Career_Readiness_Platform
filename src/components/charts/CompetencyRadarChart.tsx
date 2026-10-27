import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { CompetencyScore } from '../../types';

interface CompetencyRadarChartProps {
  competencies: CompetencyScore[];
  height?: number;
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({
  competencies,
  height = 320,
}) => {
  const chartData = competencies.map((c) => ({
    subject: c.competency.replace(' & ', '\n& '),
    fullName: c.competency,
    score: c.score,
    target: c.targetScore,
    fullMark: 100,
  }));

  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5">
            {data.fullName}
          </p>
          <div className="space-y-1">
            <p className="text-blue-700 font-semibold flex items-center justify-between gap-3">
              <span>Your Score (மதிப்பெண்):</span>
              <span>{data.score}%</span>
            </p>
            <p className="text-slate-500 flex items-center justify-between gap-3">
              <span>Target Standard (இலக்கு):</span>
              <span>{data.target}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }} className="flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#CBD5E1" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomRadarTooltip />} />
          <Radar
            name="Industry Benchmark (இலக்கு)"
            dataKey="target"
            stroke="#94A3B8"
            strokeDasharray="4 4"
            fill="#94A3B8"
            fillOpacity={0.15}
          />
          <Radar
            name="Your Competency (உங்கள் திறன்)"
            dataKey="score"
            stroke="#1D4ED8"
            strokeWidth={2}
            fill="#2563EB"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
