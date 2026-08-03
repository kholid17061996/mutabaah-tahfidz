import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, CheckCircle2, Calendar, Clock, BookOpen } from 'lucide-react';
import { SchedulePlan } from '../types';
import { savePlan } from '../utils/storage';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated?: () => void;
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({ isOpen, onClose, onPlanCreated }) => {
  const [targetJuz, setTargetJuz] = useState('Juz 30 (Juz Amma)');
  const [timeAvailableMinutes, setTimeAvailableMinutes] = useState('45');
  const [currentLevel, setCurrentLevel] = useState('Pemula (Baru Menghafal)');
  const [daysCount, setDaysCount] = useState('30');

  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<SchedulePlan | null>(null);

  if (!isOpen) return null;

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const response = await fetch('/api/gemini/generate-jadwal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetJuz,
          timeAvailableMinutes,
          currentLevel,
          daysCount,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke AI Generator Jadwal Tahfidz");
      }

      const data = await response.json();
      const plan: SchedulePlan = {
        id: `plan_${Date.now()}`,
        title: data.title || `Jadwal AI: ${targetJuz}`,
        targetSummary: data.targetSummary || 'Rencana jadwal harian Ziyadah dan Muraja\'ah terstruktur.',
        totalDays: data.totalDays || Number(daysCount),
        dailyDurationMinutes: data.dailyDurationMinutes || Number(timeAvailableMinutes),
        days: data.days || [],
        createdAt: new Date().toISOString(),
      };

      setGeneratedPlan(plan);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat generate jadwal.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSchedule = () => {
    if (!generatedPlan) return;
    savePlan(generatedPlan);
    alert("Jadwal Tahfidz AI berhasil disimpan!");
    if (onPlanCreated) onPlanCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 text-xs">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-white text-base">Buat Jadwal Hafalan AI (Planner)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          <form onSubmit={handleGeneratePlan} className="space-y-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Surah / Juz</label>
                <input
                  type="text"
                  value={targetJuz}
                  onChange={(e) => setTargetJuz(e.target.value)}
                  placeholder="Contoh: Juz 30 / Surah Al-Mulk"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Waktu Luang per Hari (Menit)</label>
                <select
                  value={timeAvailableMinutes}
                  onChange={(e) => setTimeAvailableMinutes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="30">30 Menit / Hari (Ringan)</option>
                  <option value="45">45 Menit / Hari (Ideal)</option>
                  <option value="60">60 Menit / Hari (Intensif)</option>
                  <option value="90">90 Menit / Hari (Karantina)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tingkat Pengalaman</label>
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pemula (Baru Menghafal)">Pemula (Baru Menghafal)</option>
                  <option value="Menengah (Lancar Tajwid)">Menengah (Lancar Tajwid)</option>
                  <option value="Lanjutan (Persiapan Mutqin 30 Juz)">Lanjutan (Persiapan Mutqin 30 Juz)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Durasi Hari Target</label>
                <select
                  value={daysCount}
                  onChange={(e) => setDaysCount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="14">14 Hari (2 Minggu)</option>
                  <option value="30">30 Hari (1 Bulan)</option>
                  <option value="60">60 Hari (2 Bulan)</option>
                  <option value="90">90 Hari (3 Bulan)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white font-semibold rounded-xl shadow-md flex items-center justify-center space-x-2 transition"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini AI Sedang Merancang Jadwal Harian...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Susun Jadwal Harian AI</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Plan Output */}
          {generatedPlan && (
            <div className="space-y-3 bg-slate-800 p-4 rounded-xl border border-teal-500/50 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <h4 className="font-bold text-teal-300 text-sm">{generatedPlan.title}</h4>
                <button
                  onClick={handleSaveSchedule}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simpan Jadwal Ini</span>
                </button>
              </div>

              <p className="text-slate-200">{generatedPlan.targetSummary}</p>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {generatedPlan.days.map((day) => (
                  <div key={day.day} className="bg-slate-900 p-3 rounded-lg border border-slate-700 space-y-1">
                    <p className="font-bold text-emerald-400">Hari {day.day}: {day.title}</p>
                    <p className="text-slate-300">📌 <strong>Ziyadah:</strong> {day.ziyadahTask}</p>
                    <p className="text-slate-300">🔄 <strong>Muraja'ah:</strong> {day.murajaahTask}</p>
                    <p className="text-slate-400 italic">💡 Tips: {day.tips}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
