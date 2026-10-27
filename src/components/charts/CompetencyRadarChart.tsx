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
import { useLanguage } from '../../i18n/LanguageContext';

interface CompetencyRadarChartProps {
  competencies: CompetencyScore[];
  height?: number;
}

export const CompetencyRadarChart: React.FC<CompetencyRadarChartProps> = ({
  competencies,
  height = 320,
}) => {
  const { language, getCompetencyName } = useLanguage();

  const chartData = competencies.map((c) => {
    const locName = getCompetencyName(c.competency);
    return {
      subject: locName.replace(' & ', '\n& ').replace(' மற்றும் ', '\nமற்றும் '),
      fullName: locName,
      score: c.score,
      target: c.targetScore,
      fullMark: 100,
    };
  });

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
              <span>{language === 'ta' ? 'உங்கள் மதிப்பெண்:' : 'Your Score:'}</span>
              <span>{data.score}%</span>
            </p>
            <p className="text-slate-500 flex items-center justify-between gap-3">
              <span>{language === 'ta' ? 'இலக்குத் தரம்:' : 'Target Benchmark:'}</span>
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
            name={language === 'ta' ? 'தொழில்துறை இலக்கு' : 'Industry Benchmark'}
            dataKey="target"
            stroke="#94A3B8"
            strokeDasharray="4 4"
            fill="#94A3B8"
            fillOpacity={0.15}
          />
          <Radar
            name={language === 'ta' ? 'உங்கள் திறன்' : 'Your Competency'}
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
