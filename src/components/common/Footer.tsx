import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left">
          <p className="font-semibold text-slate-700">
            Naan Mudhalvan Competency Profile and Career Readiness Platform
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Designed for Tamil Nadu Higher Education Competency Mapping & Skill-Gap Interventions.
          </p>
        </div>
        <div className="text-right sm:text-right text-[11px] text-slate-400">
          <p className="font-medium text-slate-500">Academic Mini Project • Version 1.0 (MVP)</p>
          <p className="text-slate-400">
            Inspired by Tamil Nadu Skill Development guidelines. Not an official government portal.
          </p>
        </div>
      </div>
    </footer>
  );
};
