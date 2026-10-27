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
import { useLanguage } from '../../i18n/LanguageContext';

interface CompetencyDonutChartProps {
  competencies: CompetencyScore[];
  height?: number;
  showCenterScore?: boolean;
}

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
  const { language, t, getCompetencyName, getLevelName } = useLanguage();

  if (!competencies || competencies.length === 0) {
    return (
      <div style={{ height }} className="flex items-center justify-center text-xs text-slate-400">
        {t('common.noRecordsFound')}
      </div>
    );
  }

  const overallScore = Math.round(
    competencies.reduce((acc, c) => acc + c.score, 0) / Math.max(1, competencies.length)
  );

  const chartData = competencies.map((c) => ({
    name: getCompetencyName(c.competency),
    value: c.score,
    target: c.targetScore,
    level: getLevelName(c.level),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5">{data.name}</p>
          <div className="mt-1 space-y-1 text-[11px]">
            <p className="text-blue-700 font-semibold flex items-center justify-between gap-3">
              <span>{language === 'ta' ? 'மதிப்பெண்:' : 'Score:'}</span>
              <span>{data.value}%</span>
            </p>
            <p className="text-slate-500 flex items-center justify-between gap-3">
              <span>{language === 'ta' ? 'இலக்கு:' : 'Benchmark:'}</span>
              <span>{data.target}%</span>
            </p>
            <p className="text-slate-500 flex items-center justify-between gap-3">
              <span>{language === 'ta' ? 'நிலை:' : 'Level:'}</span>
              <span className="font-semibold text-slate-800">{data.level}</span>
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
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={3}
            dataKey="value"
            stroke="#FFFFFF"
            strokeWidth={2}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={THEME_COLORS[index % THEME_COLORS.length]}
                className="transition-all duration-200 hover:opacity-85 cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: '12px', fontSize: '11px', color: '#475569', fontWeight: 500 }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label for Overall Competency Index */}
      {showCenterScore && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
            {language === 'ta' ? 'ஒட்டுமொத்தக் குறியீடு' : 'Overall Index'}
          </span>
          <span className="text-3xl font-extrabold text-slate-900 leading-tight">
            {overallScore}%
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200">
            {t('common.verified')}
          </span>
        </div>
      )}
    </div>
  );
};
