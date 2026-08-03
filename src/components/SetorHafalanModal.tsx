import React, { useState, useEffect } from 'react';
import { X, Mic, Square, Play, CheckCircle2, Award, BookOpen, Volume2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SURAH_LIST, getJuzForSurah } from '../data/quranData';
import { MutabaahLog, QualityGrade, LogType, EvaluatorType, StudentProfile } from '../types';

interface SetorHafalanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLog: (log: MutabaahLog) => void;
  activeStudent: StudentProfile;
  initialSurahNumber?: number;
}

export const SetorHafalanModal: React.FC<SetorHafalanModalProps> = ({
  isOpen,
  onClose,
  onSaveLog,
  activeStudent,
  initialSurahNumber,
}) => {
  const [logType, setLogType] = useState<LogType>('ziyadah');
  const [surahNumber, setSurahNumber] = useState<number>(initialSurahNumber || 67); // Default Al-Mulk
  const [fromAyah, setFromAyah] = useState<number>(1);
  const [toAyah, setToAyah] = useState<number>(15);
  const [quality, setQuality] = useState<QualityGrade>('mumtaz');
  const [fluency, setFluency] = useState<'lancar' | 'cukup_lancar' | 'terbata'>('lancar');
  const [tajweedNotes, setTajweedNotes] = useState('');
  const [evaluator, setEvaluator] = useState<EvaluatorType>('ustadz');
  const [evaluatorName, setEvaluatorName] = useState(activeStudent.ustadzName || 'Ustadz Pembimbing');

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    if (initialSurahNumber) {
      setSurahNumber(initialSurahNumber);
      const s = SURAH_LIST.find(s => s.number === initialSurahNumber);
      if (s) {
        setFromAyah(1);
        setToAyah(Math.min(15, s.numberOfAyahs));
      }
    }
  }, [initialSurahNumber]);

  if (!isOpen) return null;

  const currentSurah = SURAH_LIST.find(s => s.number === surahNumber) || SURAH_LIST[0];
  const computedJuz = getJuzForSurah(surahNumber);

  // Audio Recording Handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAudioChunks([]);
    } catch (err) {
      alert("Izin mikrofon diperlukan untuk merekam bacaan hafalan.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLog: MutabaahLog = {
      id: `log_${Date.now()}`,
      studentId: activeStudent.id,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: logType,
      surahNumber: currentSurah.number,
      surahName: currentSurah.latinName,
      fromAyah: Number(fromAyah),
      toAyah: Number(toAyah),
      juz: computedJuz,
      quality: quality,
      fluency: fluency,
      tajweedNotes: tajweedNotes || undefined,
      evaluator: evaluator,
      evaluatorName: evaluator === 'ustadz' ? evaluatorName : undefined,
      audioUrl: audioUrl || undefined,
    };

    onSaveLog(newLog);

    if (quality === 'mumtaz') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Catat Setoran Hafalan Al-Qur'an</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Log Type Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Jenis Setoran</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLogType('ziyadah')}
                className={`py-2 px-3 rounded-xl border font-medium flex items-center justify-center space-x-1.5 transition ${
                  logType === 'ziyadah'
                    ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ziyadah (Baru)</span>
              </button>

              <button
                type="button"
                onClick={() => setLogType('murajaah')}
                className={`py-2 px-3 rounded-xl border font-medium flex items-center justify-center space-x-1.5 transition ${
                  logType === 'murajaah'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-200'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Muraja'ah</span>
              </button>

              <button
                type="button"
                onClick={() => setLogType('tasmi')}
                className={`py-2 px-3 rounded-xl border font-medium flex items-center justify-center space-x-1.5 transition ${
                  logType === 'tasmi'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Tasmi' (Ujian)</span>
              </button>
            </div>
          </div>

          {/* Surah & Ayah Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Pilih Surah</label>
              <select
                value={surahNumber}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  setSurahNumber(num);
                  const s = SURAH_LIST.find(sur => sur.number === num);
                  if (s) {
                    setFromAyah(1);
                    setToAyah(Math.min(15, s.numberOfAyahs));
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {SURAH_LIST.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.number}. {s.latinName} ({s.numberOfAyahs} Ayat) — Juz {s.juzStart}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Juz Otomatis</label>
              <div className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold">
                Juz {computedJuz}
              </div>
            </div>
          </div>

          {/* Ayah Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dari Ayat</label>
              <input
                type="number"
                min={1}
                max={currentSurah.numberOfAyahs}
                value={fromAyah}
                onChange={(e) => setFromAyah(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sampai Ayat</label>
              <input
                type="number"
                min={fromAyah}
                max={currentSurah.numberOfAyahs}
                value={toAyah}
                onChange={(e) => setToAyah(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quality Rating */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Kualitas Mutqin (Nilai Setoran)</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { id: 'mumtaz', label: 'Mumtaz (A+)', score: '90-100', color: 'bg-emerald-950 border-emerald-500 text-emerald-300' },
                { id: 'jayyid_jiddan', label: 'Jayyid Jiddan (A)', score: '80-89', color: 'bg-teal-950 border-teal-500 text-teal-300' },
                { id: 'jayyid', label: 'Jayyid (B)', score: '70-79', color: 'bg-blue-950 border-blue-500 text-blue-300' },
                { id: 'maqbul', label: 'Maqbul (C)', score: '60-69', color: 'bg-amber-950 border-amber-500 text-amber-300' },
                { id: 'rasib', label: 'Perlu Ulang', score: '<60', color: 'bg-rose-950 border-rose-500 text-rose-300' },
              ].map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuality(q.id as QualityGrade)}
                  className={`p-2 rounded-xl border text-center transition ${
                    quality === q.id ? q.color + ' font-bold ring-2 ring-emerald-500/50' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <p className="text-[11px] font-semibold">{q.label}</p>
                  <p className="text-[9px] opacity-75">{q.score}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Fluency & Evaluator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Kelancaran Bacaan</label>
              <select
                value={fluency}
                onChange={(e) => setFluency(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="lancar">Lancar (Tanpa Bantuan)</option>
                <option value="cukup_lancar">Cukup Lancar (1-2 Bantuan)</option>
                <option value="terbata">Terbata-bata (Banyak Bantuan)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Penyimak / Penilai</label>
              <select
                value={evaluator}
                onChange={(e) => setEvaluator(e.target.value as EvaluatorType)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="ustadz">Ustadz / Guru Pengampu</option>
                <option value="mandiri">Mandiri / Muraja'ah Sendiri</option>
                <option value="ai">AI Evaluator</option>
              </select>
            </div>
          </div>

          {/* Tajweed Notes */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Catatan Tajwid, Makhraj, atau Adab</label>
            <textarea
              rows={2}
              value={tajweedNotes}
              onChange={(e) => setTajweedNotes(e.target.value)}
              placeholder="Contoh: Perhatikan panjang Mad Jaiz di ayat 5, kelancaran Ghunnah sudah mumtaz..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Audio Recording Feature */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200">Rekam Suara Setoran (Opsional)</p>
                <p className="text-[10px] text-slate-400">Simpan sampel suara untuk evaluasi perkembangan</p>
              </div>
            </div>

            <div>
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 border border-rose-600/60 text-rose-200 rounded-lg font-medium flex items-center space-x-1 transition"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-400" />
                  <span>Mulai Rekam</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium flex items-center space-x-1 transition animate-pulse"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Selesai Rekam</span>
                </button>
              )}
            </div>
          </div>

          {audioUrl && (
            <div className="bg-slate-800 p-2 rounded-xl border border-emerald-500/40 flex items-center justify-between">
              <span className="text-emerald-300 font-medium">Rekaman Suara Tersimpan</span>
              <audio src={audioUrl} controls className="h-8 max-w-[200px]" />
            </div>
          )}

          {/* Modal Footer CTA */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md shadow-emerald-950 flex items-center space-x-1.5 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Catatan Setoran</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
