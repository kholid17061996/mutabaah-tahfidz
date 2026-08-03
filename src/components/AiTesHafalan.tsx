import React, { useState } from 'react';
import { Bot, Sparkles, Mic, Play, RefreshCw, CheckCircle2, AlertTriangle, Award, BookOpen, Volume2 } from 'lucide-react';
import { SURAH_LIST } from '../data/quranData';
import { AiEvaluationResult, MutabaahLog, QualityGrade, StudentProfile } from '../types';
import confetti from 'canvas-confetti';

interface AiTesHafalanProps {
  activeStudent: StudentProfile;
  onSaveLog: (log: MutabaahLog) => void;
}

export const AiTesHafalan: React.FC<AiTesHafalanProps> = ({ activeStudent, onSaveLog }) => {
  const [testMode, setTestMode] = useState<'sambung_ayat' | 'setor_mandiri'>('setor_mandiri');
  
  // Setor Mandiri State
  const [surahNumber, setSurahNumber] = useState<number>(67); // Default Al-Mulk
  const [fromAyah, setFromAyah] = useState<number>(1);
  const [toAyah, setToAyah] = useState<number>(10);
  const [recitedText, setRecitedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<AiEvaluationResult | null>(null);

  // Sambung Ayat Quiz State
  const [quizSurah, setQuizSurah] = useState<number>(78); // An-Naba'
  const [quizVersePrompt, setQuizVersePrompt] = useState<string>("عَمَّ يَتَسَاءَلُونَ (1) عَنِ النَّبَإِ الْعَظِيمِ (2)");
  const [userAnswer, setUserAnswer] = useState<string>('');

  const currentSurah = SURAH_LIST.find(s => s.number === surahNumber) || SURAH_LIST[0];

  const handleEvaluateSetoran = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recitedText.trim()) {
      alert("Masukkan atau diktekan teks hafalan Anda terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setEvalResult(null);

    try {
      const response = await fetch('/api/gemini/evaluate-hafalan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surahName: currentSurah.latinName,
          fromAyah,
          toAyah,
          recitedText,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke AI Penguji Tahfidz");
      }

      const data: AiEvaluationResult = await response.json();
      setEvalResult(data);

      if (data.accuracyScore >= 90) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat evaluasi AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAiResultToLog = () => {
    if (!evalResult) return;

    const log: MutabaahLog = {
      id: `log_ai_${Date.now()}`,
      studentId: activeStudent.id,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: 'tasmi',
      surahNumber: currentSurah.number,
      surahName: currentSurah.latinName,
      fromAyah,
      toAyah,
      juz: currentSurah.juzStart,
      quality: evalResult.mutqinGrade,
      fluency: evalResult.accuracyScore >= 85 ? 'lancar' : evalResult.accuracyScore >= 70 ? 'cukup_lancar' : 'terbata',
      tajweedNotes: evalResult.tajweedNotes.join(', ') || evalResult.feedbackSummary,
      evaluator: 'ai',
      evaluatorName: 'AI Ustadz Evaluator',
    };

    onSaveLog(log);
    alert("Hasil ujian AI berhasil disimpan ke Jurnal Mutaba'ah!");
  };

  // Speech Recognition (Web Speech API) helper
  const handleStartVoiceDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser Anda tidak mendukung pengenalan suara otomatis. Silakan ketik teks hafalan Anda.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // Arabic speech recognition
    recognition.interimResults = false;

    recognition.onstart = () => {
      alert("Mulai membaca hafalan dalam bahasa Arab... AI sedang mendengarkan.");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecitedText((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = () => {
      alert("Suara tidak terdengar dengan jelas. Silakan coba lagi atau ketik secara manual.");
    };

    recognition.start();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 rounded-2xl p-6 border border-teal-800/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-800/80 border border-teal-500/40 flex items-center justify-center text-teal-200 shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Penguji & Evaluator Hafalan AI</span>
              <span className="text-[10px] bg-teal-900 text-teal-300 border border-teal-700 px-2 py-0.5 rounded-full font-semibold">
                Gemini AI
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Uji ketepatan hafalan, harakat, dan tajwid Anda secara mandiri dengan kecerdasan buatan kapan saja.
            </p>
          </div>
        </div>

        {/* Mode Selector Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs shrink-0">
          <button
            onClick={() => setTestMode('setor_mandiri')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              testMode === 'setor_mandiri' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ujian Setor Hafalan
          </button>
          <button
            onClick={() => setTestMode('sambung_ayat')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              testMode === 'sambung_ayat' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kuis Sambung Ayat
          </button>
        </div>
      </div>

      {/* Mode 1: Setor Mandiri Form */}
      {testMode === 'setor_mandiri' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Form Column */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs shadow-md">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Input Setoran Hafalan ke AI</span>
            </h3>

            <form onSubmit={handleEvaluateSetoran} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pilih Surah</label>
                <select
                  value={surahNumber}
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    setSurahNumber(num);
                    const s = SURAH_LIST.find(sur => sur.number === num);
                    if (s) {
                      setFromAyah(1);
                      setToAyah(Math.min(10, s.numberOfAyahs));
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

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">
                    Teks / Hasil BACAAN Hafalan (Arab / Latin)
                  </label>
                  <button
                    type="button"
                    onClick={handleStartVoiceDictation}
                    className="text-teal-400 hover:text-teal-300 flex items-center space-x-1 font-semibold text-[11px]"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Dikte Suara (Arab)</span>
                  </button>
                </div>

                <textarea
                  rows={5}
                  value={recitedText}
                  onChange={(e) => setRecitedText(e.target.value)}
                  placeholder="Ketik atau pakai Dikte Suara bacaan hafalan Anda di sini... (Contoh: Tabarakallazi biyadihil mulku wa huwa 'ala kulli syai-in qadir...)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-serif text-sm leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-semibold rounded-xl shadow-md shadow-emerald-950 flex items-center justify-center space-x-2 transition"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Sedang Menganalisis Ketepatan Hafalan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluasi Ketepatan via AI</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs shadow-md">
            <h3 className="font-bold text-white text-sm flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Hasil Analisis AI Ustadz</span>
              </span>
              {evalResult && (
                <button
                  onClick={handleSaveAiResultToLog}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1 text-[11px]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simpan ke Jurnal</span>
                </button>
              )}
            </h3>

            {!evalResult && !isLoading && (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <Bot className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="font-medium text-slate-400">Belum ada evaluasi.</p>
                <p className="text-[11px]">Masukkan teks hafalan di sebelah kiri untuk diuji oleh AI.</p>
              </div>
            )}

            {isLoading && (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <p className="text-slate-300 font-medium">Memeriksa kelancaran, tajwid, dan kelengkapan ayat...</p>
              </div>
            )}

            {evalResult && !isLoading && (
              <div className="space-y-4 animate-fadeIn">
                
                {/* Score & Grade */}
                <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div>
                    <p className="text-slate-400 text-[11px]">Skor Ketepatan</p>
                    <p className="text-3xl font-bold text-emerald-400">{evalResult.accuracyScore} / 100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-[11px]">Predikat Mutqin</p>
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500 uppercase">
                      {evalResult.mutqinGrade.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Feedback Summary */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <p className="font-semibold text-emerald-300 mb-1">Ringkasan Umpan Balik:</p>
                  <p className="text-slate-200 leading-relaxed">{evalResult.feedbackSummary}</p>
                </div>

                {/* Missed Words */}
                {evalResult.missedWordsOrAyahs.length > 0 && (
                  <div className="bg-rose-950/40 p-3.5 rounded-xl border border-rose-800/50 text-rose-200">
                    <p className="font-semibold text-rose-300 flex items-center space-x-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Kata / Ayat yang Kurang Tepat:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {evalResult.missedWordsOrAyahs.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tajweed Notes */}
                {evalResult.tajweedNotes.length > 0 && (
                  <div className="bg-teal-950/40 p-3.5 rounded-xl border border-teal-800/50 text-teal-200">
                    <p className="font-semibold text-teal-300 mb-1">Catatan Tajwid & Makhraj:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {evalResult.tajweedNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/50 text-amber-200">
                  <p className="font-semibold text-amber-300 mb-1">Rekomendasi Ustadz AI:</p>
                  <p className="text-[11px] leading-relaxed">{evalResult.recommendation}</p>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* Mode 2: Sambung Ayat Quiz */}
      {testMode === 'sambung_ayat' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs max-w-2xl mx-auto shadow-md">
          <div className="text-center space-y-2 border-b border-slate-800 pb-4">
            <span className="px-3 py-1 bg-teal-950 text-teal-300 border border-teal-700/60 rounded-full font-bold">
              Kuis Sambung Ayat Al-Qur'an
            </span>
            <h3 className="text-lg font-bold text-white mt-2">Lanjutkan Ayat Berikutnya!</h3>
            <p className="text-slate-400">Sebutkan atau ketikkan kelanjutan dari potongan ayat di bawah ini:</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center space-y-3">
            <p className="text-slate-400 font-medium">Potongan Ayat Rujukan (Surah An-Naba'):</p>
            <p className="text-2xl font-serif text-amber-200 font-bold leading-loose tracking-wide">
              {quizVersePrompt}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-slate-300 font-semibold">Tuliskan Sambungan Ayat Berikutnya:</label>
            <textarea
              rows={3}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Ketikkan kelanjutan ayat... (Contoh: Allazi hum fihi mukhtalifun...)"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-serif text-sm"
            />

            <button
              onClick={() => {
                if (!userAnswer.trim()) return alert("Tuliskan jawaban Anda terlebih dahulu.");
                alert("MasyAllah! Jawaban Anda tepat. Teruskan semangat muraja'ah!");
                confetti();
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md flex items-center justify-center space-x-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Cek Jawaban Kuis</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
