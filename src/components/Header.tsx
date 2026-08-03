import React, { useState } from 'react';
import { BookOpen, Flame, Award, User, Sparkles, Plus, Settings, ShieldCheck, Download } from 'lucide-react';
import { StudentProfile } from '../types';
import { exportDataJson } from '../utils/storage';

interface HeaderProps {
  activeStudent: StudentProfile;
  allStudents: StudentProfile[];
  onSelectStudent: (id: string) => void;
  onOpenSetorModal: () => void;
  onOpenAiPlanner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeStudent,
  allStudents,
  onSelectStudent,
  onOpenSetorModal,
  onOpenAiPlanner,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-slate-900 text-white border-b border-emerald-900/50 shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-900/40 border border-emerald-400/30">
              <BookOpen className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                  Mutaba'ah Tahfidz
                </h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  Al-Qur'an
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pemantauan Hafalan, Muraja'ah & Bimbingan AI
              </p>
            </div>
          </div>

          {/* Quick Actions & Profile Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Streak Counter Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-amber-500/30 text-amber-300 text-xs font-medium" title="Istiqomah Hari Berturut-turut">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{activeStudent.streakDays} Hari Streak</span>
            </div>

            {/* Target Juz Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{activeStudent.currentJuzCount} / {activeStudent.targetJuzCount} Juz</span>
            </div>

            {/* AI Planner Button */}
            <button
              onClick={onOpenAiPlanner}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-xs font-medium transition border border-teal-500/30 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Jadwal AI</span>
            </button>

            {/* Setor Hafalan Primary CTA */}
            <button
              onClick={onOpenSetorModal}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs transition shadow-md shadow-emerald-950 border border-emerald-400/40"
            >
              <Plus className="w-4 h-4" />
              <span>Setor Hafalan</span>
            </button>

            {/* Student Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-xs font-medium text-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-[10px]">
                  {activeStudent.name.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{activeStudent.name}</span>
                <User className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 py-2 text-xs">
                  <div className="px-3 py-2 border-b border-slate-700/70">
                    <p className="font-semibold text-slate-200">{activeStudent.name}</p>
                    <p className="text-[11px] text-slate-400">{activeStudent.halaqahGroup || 'Santri Tahfidz'}</p>
                    <p className="text-[10px] text-emerald-400 mt-0.5">Pengampu: {activeStudent.ustadzName || 'Ustadz Pembimbing'}</p>
                  </div>

                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Ganti Profil Santri:
                  </div>

                  {allStudents.map(std => (
                    <button
                      key={std.id}
                      onClick={() => {
                        onSelectStudent(std.id);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-700/60 ${
                        std.id === activeStudent.id ? 'bg-emerald-950/60 text-emerald-300 font-medium' : 'text-slate-300'
                      }`}
                    >
                      <div className="truncate">
                        <p>{std.name}</p>
                        <p className="text-[10px] text-slate-400">{std.currentJuzCount} Juz Tercapai</p>
                      </div>
                      {std.id === activeStudent.id && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  ))}

                  <div className="border-t border-slate-700/70 mt-1 pt-1 px-3 py-1">
                    <button
                      onClick={() => {
                        exportDataJson();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left py-1.5 text-slate-300 hover:text-emerald-300 flex items-center space-x-2"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ekspor Backup Data (JSON)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
