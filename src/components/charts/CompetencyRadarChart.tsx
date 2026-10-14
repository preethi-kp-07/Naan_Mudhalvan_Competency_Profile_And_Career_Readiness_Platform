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
    score: c.score,
    target: c.targetScore,
    fullMark: 100,
  }));

  return (
    <div style={{ width: '100%', height }} className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#334155', fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
            }}
          />
          <Radar
            name="Target Score"
            dataKey="target"
            stroke="#94A3B8"
            strokeDasharray="4 4"
            fill="#CBD5E1"
            fillOpacity={0.15}
          />
          <Radar
            name="Current Score"
            dataKey="score"
            stroke="#1D4ED8"
            fill="#2563EB"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
