import React from 'react';
import { Printer, Download, Award, CheckCircle2, ShieldCheck, BookOpen, Star } from 'lucide-react';
import { StudentProfile, MutabaahLog } from '../types';

interface RaporTahfidzProps {
  student: StudentProfile;
  logs: MutabaahLog[];
}

export const RaporTahfidz: React.FC<RaporTahfidzProps> = ({ student, logs }) => {
  const studentLogs = logs.filter(l => l.studentId === student.id || l.studentId === 'std_default');
  const mumtazCount = studentLogs.filter(l => l.quality === 'mumtaz' || l.quality === 'jayyid_jiddan').length;
  const mutqinPercentage = studentLogs.length > 0 ? Math.round((mumtazCount / studentLogs.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Printable Action Header */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800 print:hidden shadow-sm">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Rapor Mutaba'ah Tahfidz Al-Qur'an</span>
          </h2>
          <p className="text-xs text-slate-400">Lembar laporan resmi perkembangan hafalan santri.</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Rapor / PDF</span>
        </button>
      </div>

      {/* Rapor Sheet Layout */}
      <div className="bg-slate-900 border-2 border-emerald-700/60 rounded-3xl p-8 space-y-6 text-slate-200 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-black print:shadow-none print:p-0">
        
        {/* Header Kop Surat */}
        <div className="text-center space-y-2 border-b-2 border-emerald-600/50 pb-6 print:border-black">
          <div className="flex items-center justify-center space-x-2">
            <BookOpen className="w-8 h-8 text-emerald-400 print:text-black" />
            <h1 className="text-2xl font-bold tracking-tight text-white print:text-black">
              LEMBAR MUTABA'AH & RAPOR TAHFIDZ AL-QUR'AN
            </h1>
          </div>
          <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider print:text-black">
            Lembaga Pendidikan Al-Qur'an • Program Karantina & Halqah Tahfidz
          </p>
          <p className="text-[11px] text-slate-400 print:text-black">
            Alamat: Jl. Pesantren Al-Qur'an No. 1 • Telp: (021) 8899-7766 • Tahun Ajaran 2026/2027
          </p>
        </div>

        {/* Student Profile Metadata Table */}
        <div className="grid grid-cols-2 gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-xs print:bg-slate-100 print:text-black print:border-slate-300">
          <div className="space-y-1.5">
            <p><strong className="text-slate-400 print:text-black">Nama Santri:</strong> <span className="text-white font-semibold print:text-black">{student.name}</span></p>
            <p><strong className="text-slate-400 print:text-black">NISN / ID Santri:</strong> <span className="text-slate-200 print:text-black">{student.nisn || '1234567890'}</span></p>
            <p><strong className="text-slate-400 print:text-black">Halaqah:</strong> <span className="text-slate-200 print:text-black">{student.halaqahGroup || 'Halaqah Tahfidz'}</span></p>
          </div>

          <div className="space-y-1.5 text-right sm:text-left">
            <p><strong className="text-slate-400 print:text-black">Ustadz Pengampu:</strong> <span className="text-slate-200 print:text-black">{student.ustadzName || 'Ustadz Pembimbing'}</span></p>
            <p><strong className="text-slate-400 print:text-black">Capaian Target:</strong> <span className="text-emerald-400 font-bold print:text-black">{student.currentJuzCount} / {student.targetJuzCount} Juz</span></p>
            <p><strong className="text-slate-400 print:text-black">Tanggal Cetak:</strong> <span className="text-slate-200 print:text-black">{new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</span></p>
          </div>
        </div>

        {/* Summary Performance Cards */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 print:border-slate-300">
            <p className="text-slate-400 text-[10px]">Total Setoran Logged</p>
            <p className="text-lg font-bold text-white print:text-black">{studentLogs.length} Kali</p>
          </div>

          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 print:border-slate-300">
            <p className="text-slate-400 text-[10px]">Tingkat Mutqin (Mumtaz)</p>
            <p className="text-lg font-bold text-emerald-400 print:text-black">{mutqinPercentage}%</p>
          </div>

          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 print:border-slate-300">
            <p className="text-slate-400 text-[10px]">Predikat Kelancaran</p>
            <p className="text-lg font-bold text-amber-300 print:text-black">
              {mutqinPercentage >= 85 ? 'Jayyid Jiddan (Sangat Baik)' : 'Jayyid (Baik)'}
            </p>
          </div>
        </div>

        {/* Detailed Setoran History Table */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white print:text-black border-b border-slate-800 pb-2">
            Rincian Setoran Ziyadah, Muraja'ah & Tasmi' Terakhir
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-300 border-b border-slate-700 print:bg-slate-200 print:text-black">
                  <th className="p-2.5">Tanggal</th>
                  <th className="p-2.5">Surah & Ayat</th>
                  <th className="p-2.5">Juz</th>
                  <th className="p-2.5">Jenis</th>
                  <th className="p-2.5">Kualitas</th>
                  <th className="p-2.5">Catatan Tajwid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                {studentLogs.slice(0, 10).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-2.5 text-slate-400 print:text-black">{log.date}</td>
                    <td className="p-2.5 font-semibold text-slate-100 print:text-black">
                      {log.surahName} ({log.fromAyah}-{log.toAyah})
                    </td>
                    <td className="p-2.5 text-slate-300 print:text-black">Juz {log.juz}</td>
                    <td className="p-2.5 capitalize text-slate-300 print:text-black">{log.type}</td>
                    <td className="p-2.5 font-bold text-emerald-400 print:text-black uppercase">{log.quality.replace('_', ' ')}</td>
                    <td className="p-2.5 text-slate-400 print:text-black truncate max-w-[150px]">{log.tajweedNotes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teacher Notes & Signature Section */}
        <div className="pt-6 border-t border-slate-800 print:border-black space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-xs space-y-1 print:border-slate-300">
            <p className="font-semibold text-amber-300 print:text-black">Catatan & Nasihat Ustadz Pengampu:</p>
            <p className="text-slate-300 italic print:text-black">
              "Al-Hamdulillah ananda {student.name} menunjukkan semangat yang tinggi dalam menjaga hafalan. Pertahankan rutinitas muraja'ah 1 Juz/hari dan tadabbur ayat."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center text-xs pt-4">
            <div className="space-y-12">
              <p className="text-slate-400 print:text-black">Orang Tua / Wali Santri</p>
              <p className="font-semibold text-slate-200 print:text-black">( _______________________ )</p>
            </div>

            <div className="space-y-12">
              <p className="text-slate-400 print:text-black">Ustadz Pengampu Tahfidz</p>
              <p className="font-semibold text-slate-200 print:text-black">( {student.ustadzName || 'Ustadz Pembimbing'} )</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
