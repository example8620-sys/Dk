
import React, { useState, useEffect } from 'react';
import { getAIInsights } from '../services/geminiService';
import { Student, Fee } from '../types';

interface AIInsightsProps {
  students: Student[];
  fees: Fee[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ students, fees }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getAIInsights(students, fees);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <i className="fa-solid fa-robot text-white text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Gemini Intelligence</h2>
        <p className="text-slate-500 mt-2">AI-driven financial analysis and student trend monitoring</p>
      </header>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4">
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
            title="Refresh Analysis"
          >
            <i className={`fa-solid fa-rotate ${loading ? 'animate-spin' : ''}`}></i>
          </button>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-brain text-blue-400 text-xs"></i>
                </div>
              </div>
              <p className="text-slate-500 font-medium animate-pulse text-sm">Analyzing institutional data...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <div className="space-y-4">
                {insight.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-slate-900 mb-4">{line.replace('# ', '')}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-slate-800 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                  if (line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-600">{line.replace('- ', '')}</li>;
                  return <p key={i} className="text-slate-600 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <i className="fa-solid fa-shield-halved"></i>
            Data processed locally before AI summarization
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Powered by Google Gemini</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
           { icon: 'fa-chart-line', title: 'Revenue Projection', desc: 'Predict next month\'s collections based on historical data.' },
           { icon: 'fa-user-check', title: 'Retention Risk', desc: 'Identify students with erratic attendance or payment patterns.' },
           { icon: 'fa-bullseye', title: 'Enrollment Strategy', desc: 'Optimized marketing insights for the next academic session.' }
        ].map((feat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <i className={`fa-solid ${feat.icon}`}></i>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{feat.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-2">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
