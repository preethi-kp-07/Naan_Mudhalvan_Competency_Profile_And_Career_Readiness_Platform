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
    name: c.competency.length > 18 ? c.competency.slice(0, 16) + '...' : c.competency,
    fullName: c.competency,
    Current: c.score,
    Target: c.targetScore,
  }));

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#64748B', fontSize: 11 }}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 11 }} />
          <Tooltip
            formatter={(value: any) => [`${value}%`]}
            labelFormatter={(label: any, payload: any) =>
              payload && payload[0] ? payload[0].payload.fullName : label
            }
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '12px',
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
          />
          <Bar dataKey="Current" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={18} />
          <Bar dataKey="Target" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
