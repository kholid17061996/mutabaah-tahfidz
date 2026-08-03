import React, { useState } from 'react';
import { History, Search, Filter, Trash2, Volume2, Sparkles, BookOpen, Award, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { MutabaahLog, LogType, QualityGrade } from '../types';

interface MutabaahLogListProps {
  logs: MutabaahLog[];
  onDeleteLog: (id: string) => void;
}

export const MutabaahLogList: React.FC<MutabaahLogListProps> = ({ logs, onDeleteLog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterQuality, setFilterQuality] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (log.tajweedNotes && log.tajweedNotes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesQuality = filterQuality === 'all' || log.quality === filterQuality;
    return matchesSearch && matchesType && matchesQuality;
  });

  const getQualityBadge = (q: QualityGrade) => {
    switch (q) {
      case 'mumtaz':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600/60">Mumtaz (A+)</span>;
      case 'jayyid_jiddan':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-600/60">Jayyid Jiddan (A)</span>;
      case 'jayyid':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-600/60">Jayyid (B)</span>;
      case 'maqbul':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-600/60">Maqbul (C)</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-600/60">Perlu Ulang</span>;
    }
  };

  const getTypeBadge = (type: LogType) => {
    switch (type) {
      case 'ziyadah':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 text-[10px] border border-amber-800/50">
            <Sparkles className="w-3 h-3" />
            <span>Ziyadah</span>
          </span>
        );
      case 'murajaah':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 text-[10px] border border-blue-800/50">
            <BookOpen className="w-3 h-3" />
            <span>Muraja'ah</span>
          </span>
        );
      case 'tasmi':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 text-[10px] border border-emerald-800/50">
            <Award className="w-3 h-3" />
            <span>Tasmi'</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Jurnal Riwayat Mutaba'ah</h2>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
            {filteredLogs.length} Catatan
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari surah / catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filter Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Jenis</option>
            <option value="ziyadah">Ziyadah</option>
            <option value="murajaah">Muraja'ah</option>
            <option value="tasmi">Tasmi'</option>
          </select>

          {/* Filter Quality */}
          <select
            value={filterQuality}
            onChange={(e) => setFilterQuality(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Semua Nilai</option>
            <option value="mumtaz">Mumtaz (A+)</option>
            <option value="jayyid_jiddan">Jayyid Jiddan (A)</option>
            <option value="jayyid">Jayyid (B)</option>
            <option value="maqbul">Maqbul (C)</option>
            <option value="rasib">Perlu Ulang</option>
          </select>
        </div>
      </div>

      {/* Logs Table / Cards */}
      {filteredLogs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-medium text-sm">Belum ada catatan setoran yang sesuai filter.</p>
          <p className="text-slate-500 text-xs">Silakan catat setoran baru melalui tombol 'Setor Hafalan'.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              
              {/* Left Column: Surah & Details */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0 mt-0.5">
                  Juz {log.juz}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-sm">{log.surahName}</h3>
                    <span className="text-xs font-semibold text-emerald-400">
                      Ayat {log.fromAyah} - {log.toAyah}
                    </span>
                    {getTypeBadge(log.type)}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{log.date} ({log.time})</span>
                    </span>
                    <span>•</span>
                    <span>Penyimak: <strong className="text-slate-300">{log.evaluatorName || log.evaluator}</strong></span>
                    <span>•</span>
                    <span>Kelancaran: <strong className="text-slate-300">{log.fluency.replace('_', ' ')}</strong></span>
                  </div>

                  {log.tajweedNotes && (
                    <p className="text-xs text-slate-300 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 mt-2 italic">
                      "{log.tajweedNotes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Rating Badge, Voice Note & Delete Action */}
              <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                {log.audioUrl && (
                  <audio src={log.audioUrl} controls className="h-7 max-w-[140px]" />
                )}

                <div className="text-right">
                  {getQualityBadge(log.quality)}
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Hapus catatan setoran Surah ${log.surahName}?`)) {
                      onDeleteLog(log.id);
                    }
                  }}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                  title="Hapus Catatan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
