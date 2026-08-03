import React, { useState } from 'react';
import { Search, Filter, BookOpen, CheckCircle2, Bookmark, Clock, Sparkles } from 'lucide-react';
import { SURAH_LIST, JUZ_DETAILS } from '../data/quranData';
import { MutabaahLog, Surah } from '../types';

interface QuranMatrixProps {
  logs: MutabaahLog[];
  onSelectSurahForSetor: (surahNumber: number) => void;
  onOpenMushaf: (surahNumber: number) => void;
}

export const QuranMatrix: React.FC<QuranMatrixProps> = ({
  logs,
  onSelectSurahForSetor,
  onOpenMushaf,
}) => {
  const [selectedJuz, setSelectedJuz] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabMode, setActiveTabMode] = useState<'surahs' | 'juz_grid'>('surahs');

  // Calculate status for each surah based on logs
  const getSurahStatus = (surahNumber: number) => {
    const surahLogs = logs.filter(l => l.surahNumber === surahNumber);
    if (surahLogs.length === 0) return { status: 'belum', label: 'Belum Dihafal', color: 'bg-slate-800 text-slate-400 border-slate-700' };

    const hasMumtaz = surahLogs.some(l => l.quality === 'mumtaz' || l.quality === 'jayyid_jiddan');
    const hasZiyadah = surahLogs.some(l => l.type === 'ziyadah');

    if (hasMumtaz && surahLogs.length >= 2) {
      return { status: 'mutqin', label: 'Hafal Mutqin', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 font-semibold' };
    } else if (hasZiyadah) {
      return { status: 'ziyadah', label: 'Proses Ziyadah', color: 'bg-amber-950/80 text-amber-300 border-amber-600/60' };
    } else {
      return { status: 'murajaah', label: 'Aktif Muraja\'ah', color: 'bg-blue-950/80 text-blue-300 border-blue-600/60' };
    }
  };

  // Filter surahs
  const filteredSurahs = SURAH_LIST.filter(surah => {
    const matchesSearch = surah.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          surah.number.toString() === searchQuery;
    const matchesJuz = selectedJuz === 'all' || surah.juzStart === selectedJuz;
    return matchesSearch && matchesJuz;
  });

  // Calculate overall summary metrics
  const totalMemorizedSurahs = SURAH_LIST.filter(s => {
    const st = getSurahStatus(s.number);
    return st.status === 'mutqin' || st.status === 'murajaah' || st.status === 'ziyadah';
  }).length;

  const totalMutqinSurahs = SURAH_LIST.filter(s => getSurahStatus(s.number).status === 'mutqin').length;

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-5 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Peta Kemajuan Tahfidz Al-Qur'an</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Pantau kemajuan hafalan di 30 Juz & 114 Surah. Klik surah mana saja untuk melakukan setoran hafalan baru atau membaca mushaf rujukan.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-xl font-bold text-emerald-400">{totalMemorizedSurahs}</p>
              <p className="text-[11px] text-slate-400">Surah Dihafal</p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-xl font-bold text-teal-300">{totalMutqinSurahs}</p>
              <p className="text-[11px] text-slate-400">Surah Mutqin</p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
              <p className="text-xl font-bold text-amber-300">{Math.round((totalMemorizedSurahs / 114) * 100)}%</p>
              <p className="text-[11px] text-slate-400">Total Progres</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & View Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama surah (e.g. Al-Mulk, Yasin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Juz Selector */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={selectedJuz}
            onChange={(e) => setSelectedJuz(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Juz (Juz 1 - 30)</option>
            {Array.from({ length: 30 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Juz {i + 1}
              </option>
            ))}
          </select>

          {/* Grid View Mode Toggle */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTabMode('surahs')}
              className={`px-3 py-1 rounded-md transition ${activeTabMode === 'surahs' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Daftar Surah
            </button>
            <button
              onClick={() => setActiveTabMode('juz_grid')}
              className={`px-3 py-1 rounded-md transition ${activeTabMode === 'juz_grid' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Matriks 30 Juz
            </button>
          </div>
        </div>

      </div>

      {/* Surah List View */}
      {activeTabMode === 'surahs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSurahs.map((surah) => {
            const statusObj = getSurahStatus(surah.number);
            const surahLogs = logs.filter(l => l.surahNumber === surah.number);

            return (
              <div
                key={surah.number}
                className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-700/60 rounded-xl p-4 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400 group-hover:border-emerald-500/50">
                        {surah.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">
                          {surah.latinName}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {surah.translation} • {surah.numberOfAyahs} Ayat
                        </p>
                      </div>
                    </div>
                    <span className="font-serif text-lg font-bold text-amber-200/90">
                      {surah.name}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${statusObj.color}`}>
                      {statusObj.label}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Juz {surah.juzStart} • {surah.revelationType}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenMushaf(surah.number)}
                    className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mushaf</span>
                  </button>

                  <button
                    onClick={() => onSelectSurahForSetor(surah.number)}
                    className="flex-1 py-1.5 px-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 rounded-lg text-xs font-medium flex items-center justify-center space-x-1 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Setor</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 30 Juz Visual Grid View */}
      {activeTabMode === 'juz_grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {JUZ_DETAILS.map((juz) => {
            const juzLogs = logs.filter(l => l.juz === juz.juzNumber);
            const isCompleted = juzLogs.length >= 3;
            const isMutqin = juzLogs.some(l => l.quality === 'mumtaz');

            return (
              <div
                key={juz.juzNumber}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isMutqin
                    ? 'bg-emerald-950/70 border-emerald-600/70 text-emerald-200'
                    : isCompleted
                    ? 'bg-blue-950/70 border-blue-600/70 text-blue-200'
                    : juzLogs.length > 0
                    ? 'bg-amber-950/70 border-amber-600/70 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">Juz {juz.juzNumber}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {juz.surahCount} Surah
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                    {juz.surahNames}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span>{juzLogs.length} Setoran</span>
                  <button
                    onClick={() => setSelectedJuz(juz.juzNumber)}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Lihat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
