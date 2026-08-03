import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Award, Flame, BookOpen, CheckCircle2, TrendingUp, Sparkles, BarChart3 } from 'lucide-react';
import { MutabaahLog, StudentProfile } from '../types';
import { SURAH_LIST } from '../data/quranData';

interface AnalyticsDashboardProps {
  logs: MutabaahLog[];
  activeStudent: StudentProfile;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ logs, activeStudent }) => {
  // 1. Quality Breakdown
  const qualityCounts = {
    mumtaz: logs.filter(l => l.quality === 'mumtaz').length,
    jayyid_jiddan: logs.filter(l => l.quality === 'jayyid_jiddan').length,
    jayyid: logs.filter(l => l.quality === 'jayyid').length,
    maqbul: logs.filter(l => l.quality === 'maqbul').length,
    rasib: logs.filter(l => l.quality === 'rasib').length,
  };

  const pieData = [
    { name: 'Mumtaz (A+)', value: qualityCounts.mumtaz, color: '#10b981' },
    { name: 'Jayyid Jiddan (A)', value: qualityCounts.jayyid_jiddan, color: '#14b8a6' },
    { name: 'Jayyid (B)', value: qualityCounts.jayyid, color: '#3b82f6' },
    { name: 'Maqbul (C)', value: qualityCounts.maqbul, color: '#f59e0b' },
    { name: 'Perlu Ulang', value: qualityCounts.rasib, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  // 2. Volume by Date (Last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayLogs = logs.filter(l => l.date === dateStr);
    return {
      date: dateStr.split('-').slice(1).join('/'),
      Ziyadah: dayLogs.filter(l => l.type === 'ziyadah').length,
      Murajaah: dayLogs.filter(l => l.type === 'murajaah').length,
      Tasmi: dayLogs.filter(l => l.type === 'tasmi').length,
    };
  });

  // Calculate Average Quality Score
  const qualityScores: Record<string, number> = {
    mumtaz: 95,
    jayyid_jiddan: 85,
    jayyid: 75,
    maqbul: 65,
    rasib: 50,
  };
  const totalScoreSum = logs.reduce((acc, curr) => acc + (qualityScores[curr.quality] || 75), 0);
  const avgScore = logs.length > 0 ? Math.round(totalScoreSum / logs.length) : 0;

  return (
    <div className="space-y-6">
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-600/50 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Total Setoran</p>
            <p className="text-xl font-bold text-white">{logs.length} Kali</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-600/50 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Rata-Rata Nilai</p>
            <p className="text-xl font-bold text-amber-300">{avgScore} / 100</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-600/50 flex items-center justify-center text-teal-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Streak Istiqomah</p>
            <p className="text-xl font-bold text-teal-300">{activeStudent.streakDays} Hari</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-600/50 flex items-center justify-center text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Target Hafalan</p>
            <p className="text-xl font-bold text-blue-300">{activeStudent.currentJuzCount} / {activeStudent.targetJuzCount} Juz</p>
          </div>
        </div>

      </div>

      {/* 30 Juz Overall Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-md">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Pencapaian Target Total 30 Juz</span>
          </span>
          <span className="font-bold text-emerald-400">
            {Math.round((activeStudent.currentJuzCount / activeStudent.targetJuzCount) * 100)}% ({activeStudent.currentJuzCount} Juz)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${Math.min(100, (activeStudent.currentJuzCount / activeStudent.targetJuzCount) * 100)}%` }}
          />
        </div>
      </div>

      {/* Visual Recharts Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Daily Setoran Volume */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Aktivitas Setoran (7 Hari Terakhir)</h3>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                />
                <Bar dataKey="Ziyadah" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Murajaah" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tasmi" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Quality Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Distribusi Kualitas Hafalan (Mutqin)</h3>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
