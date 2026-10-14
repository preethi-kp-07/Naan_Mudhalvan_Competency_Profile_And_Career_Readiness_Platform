import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TrendLineChartProps {
  data: Array<{
    date: string;
    overall: number;
    sql: number;
    programming: number;
    web: number;
  }>;
  height?: number;
}

export const TrendLineChart: React.FC<TrendLineChartProps> = ({ data, height = 280 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '12px',
            }}
          />
          <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }} />
          <Line
            type="monotone"
            dataKey="overall"
            name="Overall Score"
            stroke="#1D4ED8"
            strokeWidth={3}
            dot={{ r: 4, fill: '#1D4ED8' }}
          />
          <Line
            type="monotone"
            dataKey="sql"
            name="SQL & DB"
            stroke="#E11D48"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#E11D48' }}
          />
          <Line
            type="monotone"
            dataKey="programming"
            name="Programming"
            stroke="#0D9488"
            strokeWidth={2}
            dot={{ r: 3, fill: '#0D9488' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
