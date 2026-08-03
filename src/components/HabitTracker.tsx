import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Flame, CalendarCheck, Sparkles, BookOpen, Clock } from 'lucide-react';
import { DailyHabit, SchedulePlan } from '../types';
import { getDailyHabit, saveDailyHabit, getStoredPlans } from '../utils/storage';

interface HabitTrackerProps {
  onOpenAiPlanner: () => void;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({ onOpenAiPlanner }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [habit, setHabit] = useState<DailyHabit>(getDailyHabit(todayStr));
  const [savedPlans, setSavedPlans] = useState<SchedulePlan[]>(getStoredPlans());

  useEffect(() => {
    setHabit(getDailyHabit(todayStr));
    setSavedPlans(getStoredPlans());
  }, [todayStr]);

  const toggleHabit = (key: keyof Omit<DailyHabit, 'date'>) => {
    const updated = { ...habit, [key]: !habit[key] };
    setHabit(updated);
    saveDailyHabit(updated);
  };

  const completedCount = Object.values(habit).filter(val => typeof val === 'boolean' && val).length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Target & Amalan Mutaba'ah Harian</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Jaga istiqomah dengan mencentang amalan dan rutinitas tahfidz harian Anda.
          </p>
        </div>

        <button
          onClick={onOpenAiPlanner}
          className="px-4 py-2 bg-teal-900/80 hover:bg-teal-800 border border-teal-600/60 text-teal-200 font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition shadow-sm shrink-0"
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Buat Jadwal AI Kustom</span>
        </button>
      </div>

      {/* Daily Habit Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-white text-sm">Amalan Yaumiyah ({todayStr})</span>
          <span className="text-xs font-bold text-emerald-400">{completedCount} / 5 Selesai ({progressPercent}%)</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
          {[
            { key: 'ziyadahDone', label: 'Ziyadah (Tambah Hafalan Baru Hari Ini)', icon: Sparkles },
            { key: 'murajaahDone', label: 'Muraja\'ah (Mengulang Hafalan Lama)', icon: BookOpen },
            { key: 'tilawah1Juz', label: 'Tilawah Al-Qur\'an Minimal 1 Juz', icon: BookOpen },
            { key: 'dzikirPagiPetang', label: 'Dzikir Pagi & Petang', icon: Flame },
            { key: 'sholatSunnah', label: 'Sholat Sunnah (Dhuha / Tahajjud)', icon: CalendarCheck },
          ].map((item) => {
            const isChecked = Boolean(habit[item.key as keyof DailyHabit]);
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleHabit(item.key as keyof Omit<DailyHabit, 'date'>)}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                  isChecked
                    ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="font-medium text-left">{item.label}</span>
                </div>
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Saved AI Schedule Plans */}
      {savedPlans.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md text-xs">
          <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Rencana Jadwal AI Tersimpan</span>
          </h3>

          <div className="space-y-4">
            {savedPlans.map((plan) => (
              <div key={plan.id} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-teal-300 text-sm">{plan.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-semibold">
                    {plan.totalDays} Hari ({plan.dailyDurationMinutes} Menit/Hari)
                  </span>
                </div>
                <p className="text-slate-300 text-xs">{plan.targetSummary}</p>

                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  <p className="font-semibold text-slate-400 text-[11px]">Rincian Hari Pertama:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {plan.days.slice(0, 4).map((day) => (
                      <div key={day.day} className="bg-slate-900 p-2.5 rounded-lg border border-slate-700/80">
                        <p className="font-bold text-emerald-400">Hari {day.day}: {day.title}</p>
                        <p className="text-slate-300">📌 Ziyadah: {day.ziyadahTask}</p>
                        <p className="text-slate-300">🔄 Muraja'ah: {day.murajaahTask}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
