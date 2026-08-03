import React, { useState } from 'react';
import { X, BookOpen, Volume2, Bookmark, CheckCircle2 } from 'lucide-react';
import { SURAH_LIST } from '../data/quranData';

interface MushafReaderModalProps {
  surahNumber: number;
  onClose: () => void;
  onSetorFromMushaf: (surahNumber: number) => void;
}

export const MushafReaderModal: React.FC<MushafReaderModalProps> = ({
  surahNumber,
  onClose,
  onSetorFromMushaf,
}) => {
  const [selectedSurahNum, setSelectedSurahNum] = useState<number>(surahNumber);

  const currentSurah = SURAH_LIST.find(s => s.number === selectedSurahNum) || SURAH_LIST[0];

  // Realistic sample verses for reference
  const sampleVerses = [
    { ayah: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Maha Suci Allah yang di tangan-Nyalah segala kerajaan, dan Dia Maha Kuasa atas segala sesuatu." },
    { ayah: 2, arabic: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", translation: "Yang menciptakan mati dan hidup, untuk menguji kamu, siapa di antara kamu yang lebih baik amalnya. Dan Dia Maha Perkasa, Maha Pengampun." },
    { ayah: 3, arabic: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِنْ تَفَاوُتٍ", translation: "Yang menciptakan tujuh langit berlapis-lapis. Kamu tidak melihat pada ciptaan Tuhan Yang Maha Pengasih sesuatu yang tidak seimbang." },
    { ayah: 4, arabic: "فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِنْ فُطُورٍ", translation: "Maka lihatlah sekali lagi, adakah kamu lihat sesuatu yang cacat?" },
    { ayah: 5, arabic: "ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنْقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ", translation: "Kemudian pandanglah sekali lagi niscaya penglihatanmu akan kembali kepadamu tanpa menemukan sesuatu cacat dan penglihatanmu itu pun dalam keadaan payah." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 text-xs flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-white text-base">
                Mushaf Rujukan: {currentSurah.latinName} ({currentSurah.name})
              </h3>
              <p className="text-[11px] text-slate-300">
                Surah ke-{currentSurah.number} • {currentSurah.numberOfAyahs} Ayat • Juz {currentSurah.juzStart}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onSetorFromMushaf(currentSurah.number);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center space-x-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Setor Surah Ini</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Surah Quick Switcher */}
        <div className="bg-slate-800/80 p-3 border-b border-slate-700 flex items-center justify-between gap-3 shrink-0">
          <span className="text-slate-300 font-semibold">Pilih Surah Lain:</span>
          <select
            value={selectedSurahNum}
            onChange={(e) => setSelectedSurahNum(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 max-w-xs"
          >
            {SURAH_LIST.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.latinName} ({s.name})
              </option>
            ))}
          </select>
        </div>

        {/* Verses Content Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Bismillah Banner */}
          <div className="text-center py-3 border-b border-slate-800">
            <p className="font-serif text-2xl text-amber-200 font-bold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {sampleVerses.map((v) => (
            <div key={v.ayah} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex items-start justify-between">
                <span className="w-7 h-7 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                  {v.ayah}
                </span>
                <p className="font-serif text-xl text-slate-100 font-bold leading-loose text-right dir-rtl max-w-xl">
                  {v.arabic}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/50 text-slate-300 leading-relaxed text-xs">
                <p>"{v.translation}"</p>
              </div>
            </div>
          ))}

          <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700 text-center text-slate-400 text-xs">
            Menampilkan sampel ayat rujukan Surah {currentSurah.latinName}. Lakukan muraja'ah dengan tenang.
          </div>

        </div>

      </div>
    </div>
  );
};
