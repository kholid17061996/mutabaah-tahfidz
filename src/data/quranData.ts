import { Surah } from '../types';

export const SURAH_LIST: Surah[] = [
  { number: 1, name: "الفاتحة", latinName: "Al-Fatihah", translation: "Pembukaan", numberOfAyahs: 7, revelationType: "Makkiyyah", juzStart: 1 },
  { number: 2, name: "البقرة", latinName: "Al-Baqarah", translation: "Sapi Betina", numberOfAyahs: 286, revelationType: "Madaniyyah", juzStart: 1 },
  { number: 3, name: "آل عمران", latinName: "Ali 'Imran", translation: "Keluarga 'Imran", numberOfAyahs: 200, revelationType: "Madaniyyah", juzStart: 3 },
  { number: 4, name: "النساء", latinName: "An-Nisa'", translation: "Wanita", numberOfAyahs: 176, revelationType: "Madaniyyah", juzStart: 4 },
  { number: 5, name: "المائدة", latinName: "Al-Ma'idah", translation: "Hidangan", numberOfAyahs: 120, revelationType: "Madaniyyah", juzStart: 6 },
  { number: 6, name: "الأنعام", latinName: "Al-An'am", translation: "Binatang Ternak", numberOfAyahs: 165, revelationType: "Makkiyyah", juzStart: 7 },
  { number: 7, name: "الأعراف", latinName: "Al-A'raf", translation: "Tempat yang Tinggi", numberOfAyahs: 206, revelationType: "Makkiyyah", juzStart: 8 },
  { number: 8, name: "الأنفال", latinName: "Al-Anfal", translation: "Rampasan Perang", numberOfAyahs: 75, revelationType: "Madaniyyah", juzStart: 9 },
  { number: 9, name: "التوبة", latinName: "At-Taubah", translation: "Pengampunan", numberOfAyahs: 129, revelationType: "Madaniyyah", juzStart: 10 },
  { number: 10, name: "يونس", latinName: "Yunus", translation: "Nabi Yunus", numberOfAyahs: 109, revelationType: "Makkiyyah", juzStart: 11 },
  { number: 11, name: "هود", latinName: "Hud", translation: "Nabi Hud", numberOfAyahs: 123, revelationType: "Makkiyyah", juzStart: 11 },
  { number: 12, name: "يوسف", latinName: "Yusuf", translation: "Nabi Yusuf", numberOfAyahs: 111, revelationType: "Makkiyyah", juzStart: 12 },
  { number: 13, name: "الرعد", latinName: "Ar-Ra'd", translation: "Guruh", numberOfAyahs: 43, revelationType: "Madaniyyah", juzStart: 13 },
  { number: 14, name: "إبراهيم", latinName: "Ibrahim", translation: "Nabi Ibrahim", numberOfAyahs: 52, revelationType: "Makkiyyah", juzStart: 13 },
  { number: 15, name: "الحجر", latinName: "Al-Hijr", translation: "Gunung Al-Hijr", numberOfAyahs: 99, revelationType: "Makkiyyah", juzStart: 14 },
  { number: 16, name: "النحل", latinName: "An-Nahl", translation: "Lebah", numberOfAyahs: 128, revelationType: "Makkiyyah", juzStart: 14 },
  { number: 17, name: "الإسراء", latinName: "Al-Isra'", translation: "Perjalanan Malam", numberOfAyahs: 111, revelationType: "Makkiyyah", juzStart: 15 },
  { number: 18, name: "الكهف", latinName: "Al-Kahf", translation: "Penghuni Gua", numberOfAyahs: 110, revelationType: "Makkiyyah", juzStart: 15 },
  { number: 19, name: "مريم", latinName: "Maryam", translation: "Maryam", numberOfAyahs: 98, revelationType: "Makkiyyah", juzStart: 16 },
  { number: 20, name: "طه", latinName: "Taha", translation: "Taha", numberOfAyahs: 135, revelationType: "Makkiyyah", juzStart: 16 },
  { number: 21, name: "الأنبياء", latinName: "Al-Anbiya'", translation: "Para Nabi", numberOfAyahs: 112, revelationType: "Makkiyyah", juzStart: 17 },
  { number: 22, name: "الحج", latinName: "Al-Hajj", translation: "Haji", numberOfAyahs: 78, revelationType: "Madaniyyah", juzStart: 17 },
  { number: 23, name: "المؤمنون", latinName: "Al-Mu'minun", translation: "Orang-Orang Beriman", numberOfAyahs: 118, revelationType: "Makkiyyah", juzStart: 18 },
  { number: 24, name: "النور", latinName: "An-Nur", translation: "Cahaya", numberOfAyahs: 64, revelationType: "Madaniyyah", juzStart: 18 },
  { number: 25, name: "الفرقان", latinName: "Al-Furqan", translation: "Pembeda", numberOfAyahs: 77, revelationType: "Makkiyyah", juzStart: 18 },
  { number: 26, name: "الشعراء", latinName: "Asy-Syu'ara'", translation: "Penyair", numberOfAyahs: 227, revelationType: "Makkiyyah", juzStart: 19 },
  { number: 27, name: "النمل", latinName: "An-Naml", translation: "Semut", numberOfAyahs: 93, revelationType: "Makkiyyah", juzStart: 19 },
  { number: 28, name: "القصص", latinName: "Al-Qasas", translation: "Kisah-Kisah", numberOfAyahs: 88, revelationType: "Makkiyyah", juzStart: 20 },
  { number: 29, name: "العنكبوت", latinName: "Al-'Ankabut", translation: "Laba-Laba", numberOfAyahs: 69, revelationType: "Makkiyyah", juzStart: 20 },
  { number: 30, name: "الروم", latinName: "Ar-Rum", translation: "Bangsa Romawi", numberOfAyahs: 60, revelationType: "Makkiyyah", juzStart: 21 },
  { number: 31, name: "لقمان", latinName: "Luqman", translation: "Luqman", numberOfAyahs: 34, revelationType: "Makkiyyah", juzStart: 21 },
  { number: 32, name: "السجدة", latinName: "As-Sajdah", translation: "Sujud", numberOfAyahs: 30, revelationType: "Makkiyyah", juzStart: 21 },
  { number: 33, name: "الأحزاب", latinName: "Al-Ahzab", translation: "Golongan yang Bersekutu", numberOfAyahs: 73, revelationType: "Madaniyyah", juzStart: 21 },
  { number: 34, name: "سبإ", latinName: "Saba'", translation: "Kaum Saba'", numberOfAyahs: 54, revelationType: "Makkiyyah", juzStart: 22 },
  { number: 35, name: "فاطر", latinName: "Fatir", translation: "Pencipta", numberOfAyahs: 45, revelationType: "Makkiyyah", juzStart: 22 },
  { number: 36, name: "يس", latinName: "Yasin", translation: "Yasin", numberOfAyahs: 83, revelationType: "Makkiyyah", juzStart: 22 },
  { number: 37, name: "الصافات", latinName: "As-Saffat", translation: "Barisan-Barisan", numberOfAyahs: 182, revelationType: "Makkiyyah", juzStart: 23 },
  { number: 38, name: "ص", latinName: "Sad", translation: "Sad", numberOfAyahs: 88, revelationType: "Makkiyyah", juzStart: 23 },
  { number: 39, name: "الزمر", latinName: "Az-Zumar", translation: "Rombongan", numberOfAyahs: 75, revelationType: "Makkiyyah", juzStart: 23 },
  { number: 40, name: "غافر", latinName: "Ghafir", translation: "Maha Pengampun", numberOfAyahs: 85, revelationType: "Makkiyyah", juzStart: 24 },
  { number: 41, name: "فصلت", latinName: "Fussilat", translation: "Yang Dijelaskan", numberOfAyahs: 54, revelationType: "Makkiyyah", juzStart: 24 },
  { number: 42, name: "الشورى", latinName: "Asy-Syura", translation: "Musyawarah", numberOfAyahs: 53, revelationType: "Makkiyyah", juzStart: 25 },
  { number: 43, name: "الزخرف", latinName: "Az-Zukhruf", translation: "Perhiasan", numberOfAyahs: 89, revelationType: "Makkiyyah", juzStart: 25 },
  { number: 44, name: "الدخان", latinName: "Ad-Dukhan", translation: "Kabut", numberOfAyahs: 59, revelationType: "Makkiyyah", juzStart: 25 },
  { number: 45, name: "الجاثية", latinName: "Al-Jasiyah", translation: "Berlutut", numberOfAyahs: 37, revelationType: "Makkiyyah", juzStart: 25 },
  { number: 46, name: "الأحقاف", latinName: "Al-Ahqaf", translation: "Bukit Pasir", numberOfAyahs: 35, revelationType: "Makkiyyah", juzStart: 26 },
  { number: 47, name: "محمد", latinName: "Muhammad", translation: "Nabi Muhammad", numberOfAyahs: 38, revelationType: "Madaniyyah", juzStart: 26 },
  { number: 48, name: "الفتح", latinName: "Al-Fath", translation: "Kemenangan", numberOfAyahs: 29, revelationType: "Madaniyyah", juzStart: 26 },
  { number: 49, name: "الحجرات", latinName: "Al-Hujurat", translation: "Kamar-Kamar", numberOfAyahs: 18, revelationType: "Madaniyyah", juzStart: 26 },
  { number: 50, name: "ق", latinName: "Qaf", translation: "Qaf", numberOfAyahs: 45, revelationType: "Makkiyyah", juzStart: 26 },
  { number: 51, name: "الذاريات", latinName: "Az-Zariyat", translation: "Angin yang Menerbangkan", numberOfAyahs: 60, revelationType: "Makkiyyah", juzStart: 26 },
  { number: 52, name: "الطور", latinName: "At-Tur", translation: "Bukit Tur", numberOfAyahs: 49, revelationType: "Makkiyyah", juzStart: 27 },
  { number: 53, name: "النجم", latinName: "An-Najm", translation: "Bintang", numberOfAyahs: 62, revelationType: "Makkiyyah", juzStart: 27 },
  { number: 54, name: "القمر", latinName: "Al-Qamar", translation: "Bulan", numberOfAyahs: 55, revelationType: "Makkiyyah", juzStart: 27 },
  { number: 55, name: "الرحمن", latinName: "Ar-Rahman", translation: "Yang Maha Pengasih", numberOfAyahs: 78, revelationType: "Madaniyyah", juzStart: 27 },
  { number: 56, name: "الواقعة", latinName: "Al-Waqi'ah", translation: "Hari Kiamat", numberOfAyahs: 96, revelationType: "Makkiyyah", juzStart: 27 },
  { number: 57, name: "الحديد", latinName: "Al-Hadid", translation: "Besi", numberOfAyahs: 29, revelationType: "Madaniyyah", juzStart: 27 },
  { number: 58, name: "المجادلة", latinName: "Al-Mujadilah", translation: "Wanita yang Mengajukan Gugatan", numberOfAyahs: 22, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 59, name: "الحشر", latinName: "Al-Hasyr", translation: "Pengusiran", numberOfAyahs: 24, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 60, name: "الممتحنة", latinName: "Al-Mumtahanah", translation: "Wanita yang Diuji", numberOfAyahs: 13, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 61, name: "الصف", latinName: "As-Saff", translation: "Barisan", numberOfAyahs: 14, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 62, name: "الجمعة", latinName: "Al-Jumu'ah", translation: "Hari Jum'at", numberOfAyahs: 11, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 63, name: "المنافقون", latinName: "Al-Munafiqun", translation: "Orang-Orang Munafik", numberOfAyahs: 11, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 64, name: "التغابن", latinName: "At-Taghabun", translation: "Hari Dinampakkan Kesalahan", numberOfAyahs: 18, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 65, name: "الطلاق", latinName: "At-Talaq", translation: "Talak", numberOfAyahs: 12, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 66, name: "التحريم", latinName: "At-Tahrim", translation: "Mengharamkan", numberOfAyahs: 12, revelationType: "Madaniyyah", juzStart: 28 },
  { number: 67, name: "الملك", latinName: "Al-Mulk", translation: "Kerajaan", numberOfAyahs: 30, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 68, name: "القلم", latinName: "Al-Qalam", translation: "Pena", numberOfAyahs: 52, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 69, name: "الحاقة", latinName: "Al-Haqqah", translation: "Hari Kiamat", numberOfAyahs: 52, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 70, name: "المعارج", latinName: "Al-Ma'arij", translation: "Tempat Naik", numberOfAyahs: 44, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 71, name: "نوح", latinName: "Nuh", translation: "Nabi Nuh", numberOfAyahs: 28, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 72, name: "الجن", latinName: "Al-Jinn", translation: "Jin", numberOfAyahs: 28, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 73, name: "المزمل", latinName: "Al-Muzzammil", translation: "Orang yang Berselimut", numberOfAyahs: 20, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 74, name: "المدثر", latinName: "Al-Muddassir", translation: "Orang yang Berkemeja", numberOfAyahs: 56, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 75, name: "القيامة", latinName: "Al-Qiyamah", translation: "Hari Kiamat", numberOfAyahs: 40, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 76, name: "الإنسان", latinName: "Al-Insan", translation: "Manusia", numberOfAyahs: 31, revelationType: "Madaniyyah", juzStart: 29 },
  { number: 77, name: "المرسلات", latinName: "Al-Mursalat", translation: "Malaikat-Malaikat yang Diutus", numberOfAyahs: 50, revelationType: "Makkiyyah", juzStart: 29 },
  { number: 78, name: "النبإ", latinName: "An-Naba'", translation: "Berita Besar", numberOfAyahs: 40, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 79, name: "النازعات", latinName: "An-Nazi'at", translation: "Malaikat-Malaikat yang Mencabut", numberOfAyahs: 46, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 80, name: "عبس", latinName: "'Abasa", translation: "Ia Bermuka Masam", numberOfAyahs: 42, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 81, name: "التكوير", latinName: "At-Takwir", translation: "Menggulung", numberOfAyahs: 29, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 82, name: "الإنفطار", latinName: "Al-Infitar", translation: "Terbelah", numberOfAyahs: 19, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 83, name: "المطففين", latinName: "Al-Mutaffifin", translation: "Orang-Orang yang Curang", numberOfAyahs: 36, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 84, name: "الإنشقاق", latinName: "Al-Insyiqaq", translation: "Terbelah", numberOfAyahs: 25, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 85, name: "البروج", latinName: "Al-Buruj", translation: "Gugusan Bintang", numberOfAyahs: 22, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 86, name: "الطارق", latinName: "At-Tariq", translation: "Yang Datang di Malam Hari", numberOfAyahs: 17, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 87, name: "الأعلى", latinName: "Al-A'la", translation: "Yang Maha Tinggi", numberOfAyahs: 19, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 88, name: "الغاشية", latinName: "Al-Ghasyiyah", translation: "Hari Pembalasan", numberOfAyahs: 26, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 89, name: "الفجر", latinName: "Al-Fajr", translation: "Fajar", numberOfAyahs: 30, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 90, name: "البلد", latinName: "Al-Balad", translation: "Negeri", numberOfAyahs: 20, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 91, name: "الشمس", latinName: "Asy-Syams", translation: "Matahari", numberOfAyahs: 15, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 92, name: "الليل", latinName: "Al-Lail", translation: "Malam", numberOfAyahs: 21, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 93, name: "الضحى", latinName: "Ad-Duha", translation: "Waktu Dhuha", numberOfAyahs: 11, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 94, name: "الشرح", latinName: "Asy-Syarh", translation: "Kelapangan", numberOfAyahs: 8, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 95, name: "التين", latinName: "At-Tin", translation: "Buah Tin", numberOfAyahs: 8, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 96, name: "العلق", latinName: "Al-'Alaq", translation: "Segumpal Darah", numberOfAyahs: 19, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 97, name: "القدر", latinName: "Al-Qadr", translation: "Kemuliaan", numberOfAyahs: 5, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 98, name: "البينة", latinName: "Al-Bayyinah", translation: "Bukti Nyata", numberOfAyahs: 8, revelationType: "Madaniyyah", juzStart: 30 },
  { number: 99, name: "الزلزلة", latinName: "Az-Zalzalah", translation: "Kegoncangan", numberOfAyahs: 8, revelationType: "Madaniyyah", juzStart: 30 },
  { number: 100, name: "العاديات", latinName: "Al-'Adiyat", translation: "Kuda Perang yang Berlari Kencang", numberOfAyahs: 11, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 101, name: "القارعة", latinName: "Al-Qari'ah", translation: "Hari Kiamat", numberOfAyahs: 11, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 102, name: "التكاثر", latinName: "At-Takasur", translation: "Bermegah-Megahan", numberOfAyahs: 8, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 103, name: "العصر", latinName: "Al-'Asr", translation: "Masa/Waktu", numberOfAyahs: 3, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 104, name: "الهمزة", latinName: "Al-Humazah", translation: "Pengumpat", numberOfAyahs: 9, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 105, name: "الفيل", latinName: "Al-Fil", translation: "Gajah", numberOfAyahs: 5, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 106, name: "قريش", latinName: "Quraisy", translation: "Suku Quraisy", numberOfAyahs: 4, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 107, name: "الماعون", latinName: "Al-Ma'un", translation: "Barang-Barang yang Berguna", numberOfAyahs: 7, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 108, name: "الكوثر", latinName: "Al-Kausar", translation: "Nikmat yang Banyak", numberOfAyahs: 3, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 109, name: "الكافرون", latinName: "Al-Kafirun", translation: "Orang-Orang Kafir", numberOfAyahs: 6, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 110, name: "النصر", latinName: "An-Nasr", translation: "Pertolongan", numberOfAyahs: 3, revelationType: "Madaniyyah", juzStart: 30 },
  { number: 111, name: "المسد", latinName: "Al-Lahab", translation: "Gejolak Api", numberOfAyahs: 5, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 112, name: "الإخلاص", latinName: "Al-Ikhlas", translation: "Ikhlas", numberOfAyahs: 4, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 113, name: "الفلق", latinName: "Al-Falaq", translation: "Waktu Subuh", numberOfAyahs: 5, revelationType: "Makkiyyah", juzStart: 30 },
  { number: 114, name: "الناس", latinName: "An-Nas", translation: "Manusia", numberOfAyahs: 6, revelationType: "Makkiyyah", juzStart: 30 }
];

// Helper to get Juz number for a Surah
export function getJuzForSurah(surahNum: number): number {
  const surah = SURAH_LIST.find(s => s.number === surahNum);
  return surah ? surah.juzStart : 30;
}

// 30 Juz Mapping metadata
export const JUZ_DETAILS = Array.from({ length: 30 }, (_, i) => {
  const juzNum = i + 1;
  const surahsInJuz = SURAH_LIST.filter(s => {
    // Rough grouping for Juz UI
    if (juzNum === 30) return s.number >= 78;
    if (juzNum === 29) return s.number >= 67 && s.number <= 77;
    if (juzNum === 28) return s.number >= 58 && s.number <= 66;
    if (juzNum === 27) return s.number >= 51 && s.number <= 57;
    if (juzNum === 26) return s.number >= 46 && s.number <= 50;
    if (juzNum === 1) return s.number === 1 || s.number === 2;
    return s.juzStart === juzNum;
  });
  return {
    juzNumber: juzNum,
    surahCount: surahsInJuz.length,
    surahNames: surahsInJuz.map(s => s.latinName).join(', ')
  };
});
