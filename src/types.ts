export type QualityGrade = 'mumtaz' | 'jayyid_jiddan' | 'jayyid' | 'maqbul' | 'rasib';

export type LogType = 'ziyadah' | 'murajaah' | 'tasmi';

export type EvaluatorType = 'mandiri' | 'ustadz' | 'ai';

export interface Surah {
  number: number;
  name: string;
  latinName: string;
  translation: string;
  numberOfAyahs: number;
  revelationType: 'Makkiyyah' | 'Madaniyyah';
  juzStart: number;
}

export interface MutabaahLog {
  id: string;
  studentId: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:mm
  type: LogType;
  surahNumber: number;
  surahName: string;
  fromAyah: number;
  toAyah: number;
  juz: number;
  quality: QualityGrade;
  fluency: 'lancar' | 'cukup_lancar' | 'terbata';
  tajweedNotes?: string;
  makhrajNotes?: string;
  evaluator: EvaluatorType;
  evaluatorName?: string;
  audioUrl?: string; // Base64 or object URL of recorded setoran
}

export interface StudentProfile {
  id: string;
  name: string;
  nisn?: string;
  halaqahGroup?: string;
  ustadzName?: string;
  targetJuzCount: number;
  currentJuzCount: number;
  targetDeadline?: string;
  dailyZiyadahPageTarget: number;
  dailyMurajaahJuzTarget: number;
  role: 'siswa' | 'ustadz';
  streakDays: number;
  lastActiveDate?: string;
}

export interface DailyHabit {
  date: string; // YYYY-MM-DD
  tilawah1Juz: boolean;
  ziyadahDone: boolean;
  murajaahDone: boolean;
  dzikirPagiPetang: boolean;
  sholatSunnah: boolean;
}

export interface AiEvaluationResult {
  accuracyScore: number; // 0-100
  mutqinGrade: QualityGrade;
  feedbackSummary: string;
  missedWordsOrAyahs: string[];
  tajweedNotes: string[];
  fluencyAssessment: string;
  recommendation: string;
}

export interface ScheduleDayPlan {
  day: number;
  title: string;
  ziyadahTask: string;
  murajaahTask: string;
  tips: string;
}

export interface SchedulePlan {
  id: string;
  title: string;
  targetSummary: string;
  totalDays: number;
  dailyDurationMinutes: number;
  days: ScheduleDayPlan[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
