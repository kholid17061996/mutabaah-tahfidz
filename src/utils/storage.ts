import { MutabaahLog, StudentProfile, DailyHabit, SchedulePlan } from '../types';
import { SURAH_LIST } from '../data/quranData';

const KEYS = {
  LOGS: 'mutabaah_logs_v1',
  STUDENTS: 'mutabaah_students_v1',
  HABITS: 'mutabaah_habits_v1',
  ACTIVE_STUDENT: 'mutabaah_active_student_v1',
  PLANS: 'mutabaah_plans_v1',
};

export const DEFAULT_STUDENT: StudentProfile = {
  id: 'std_default',
  name: 'Ahmad Raihan',
  nisn: '1234567890',
  halaqahGroup: 'Halaqah Al-Mubarok (Ustadz Ridwan)',
  ustadzName: 'Ustadz Ridwan, S.Pd.I',
  targetJuzCount: 30,
  currentJuzCount: 5,
  targetDeadline: '2027-12-31',
  dailyZiyadahPageTarget: 2,
  dailyMurajaahJuzTarget: 1,
  role: 'siswa',
  streakDays: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export const MOCK_STUDENTS: StudentProfile[] = [
  DEFAULT_STUDENT,
  {
    id: 'std_2',
    name: 'Fatimah Az-Zahra',
    nisn: '0987654321',
    halaqahGroup: 'Halaqah Khadijah (Ustadzah Maryam)',
    ustadzName: 'Ustadzah Maryam, Lc.',
    targetJuzCount: 30,
    currentJuzCount: 12,
    targetDeadline: '2026-12-31',
    dailyZiyadahPageTarget: 2,
    dailyMurajaahJuzTarget: 1.5,
    role: 'siswa',
    streakDays: 24,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  {
    id: 'std_3',
    name: 'Muhammad Faris',
    nisn: '1122334455',
    halaqahGroup: 'Halaqah Al-Mubarok (Ustadz Ridwan)',
    ustadzName: 'Ustadz Ridwan, S.Pd.I',
    targetJuzCount: 15,
    currentJuzCount: 3,
    targetDeadline: '2027-06-30',
    dailyZiyadahPageTarget: 1,
    dailyMurajaahJuzTarget: 0.5,
    role: 'siswa',
    streakDays: 5,
    lastActiveDate: new Date().toISOString().split('T')[0],
  }
];

// Helper to generate realistic past logs
const generateInitialLogs = (): MutabaahLog[] => {
  const today = new Date();
  const logs: MutabaahLog[] = [];

  const sampleSurahs = [
    { num: 67, name: 'Al-Mulk', max: 30, juz: 29 },
    { num: 78, name: "An-Naba'", max: 40, juz: 30 },
    { num: 79, name: "An-Nazi'at", max: 46, juz: 30 },
    { num: 80, name: "'Abasa", max: 42, juz: 30 },
    { num: 81, name: "At-Takwir", max: 29, juz: 30 },
    { num: 82, name: "Al-Infitar", max: 19, juz: 30 },
    { num: 83, name: "Al-Mutaffifin", max: 36, juz: 30 },
    { num: 87, name: "Al-A'la", max: 19, juz: 30 },
    { num: 88, name: "Al-Ghasyiyah", max: 26, juz: 30 },
    { num: 89, name: "Al-Fajr", max: 30, juz: 30 },
  ];

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const s = sampleSurahs[i % sampleSurahs.length];
    
    // Ziyadah Log
    logs.push({
      id: `log_ziy_${i}`,
      studentId: 'std_default',
      date: dateStr,
      time: i % 2 === 0 ? '06:30' : '16:00',
      type: 'ziyadah',
      surahNumber: s.num,
      surahName: s.name,
      fromAyah: 1,
      toAyah: Math.min(15, s.max),
      juz: s.juz,
      quality: i % 3 === 0 ? 'mumtaz' : i % 2 === 0 ? 'jayyid_jiddan' : 'jayyid',
      fluency: i % 3 === 0 ? 'lancar' : 'cukup_lancar',
      tajweedNotes: i % 2 === 0 ? 'Perhatikan Ghunnah dan Mad Jaiz Munfasil' : 'Pengucapan huruf ' + (i % 2 === 0 ? 'Ain & Ha' : 'Sa & Sha') + ' sudah fasih',
      makhrajNotes: 'Makhraj huruf fasih dan jelas',
      evaluator: i % 2 === 0 ? 'ustadz' : 'mandiri',
      evaluatorName: i % 2 === 0 ? 'Ustadz Ridwan, S.Pd.I' : undefined,
    });

    // Muraja'ah Log
    const sMur = sampleSurahs[(i + 3) % sampleSurahs.length];
    logs.push({
      id: `log_mur_${i}`,
      studentId: 'std_default',
      date: dateStr,
      time: '19:45',
      type: 'murajaah',
      surahNumber: sMur.num,
      surahName: sMur.name,
      fromAyah: 1,
      toAyah: sMur.max,
      juz: sMur.juz,
      quality: 'mumtaz',
      fluency: 'lancar',
      tajweedNotes: 'Lancar tanpa tersendat. Al-Hamdulillah.',
      evaluator: 'mandiri',
    });
  }

  return logs;
};

export const getStoredLogs = (): MutabaahLog[] => {
  try {
    const data = localStorage.getItem(KEYS.LOGS);
    if (!data) {
      const initial = generateInitialLogs();
      localStorage.setItem(KEYS.LOGS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return generateInitialLogs();
  }
};

export const saveLog = (log: MutabaahLog) => {
  const logs = getStoredLogs();
  const updated = [log, ...logs];
  localStorage.setItem(KEYS.LOGS, JSON.stringify(updated));
  return updated;
};

export const deleteLog = (id: string) => {
  const logs = getStoredLogs();
  const updated = logs.filter(l => l.id !== id);
  localStorage.setItem(KEYS.LOGS, JSON.stringify(updated));
  return updated;
};

export const getStoredStudents = (): StudentProfile[] => {
  try {
    const data = localStorage.getItem(KEYS.STUDENTS);
    if (!data) {
      localStorage.setItem(KEYS.STUDENTS, JSON.stringify(MOCK_STUDENTS));
      return MOCK_STUDENTS;
    }
    return JSON.parse(data);
  } catch {
    return MOCK_STUDENTS;
  }
};

export const saveStudent = (student: StudentProfile) => {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.id === student.id);
  let updated: StudentProfile[];
  if (idx >= 0) {
    updated = [...students];
    updated[idx] = student;
  } else {
    updated = [...students, student];
  }
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(updated));
  return updated;
};

export const getActiveStudentId = (): string => {
  return localStorage.getItem(KEYS.ACTIVE_STUDENT) || DEFAULT_STUDENT.id;
};

export const setActiveStudentId = (id: string) => {
  localStorage.setItem(KEYS.ACTIVE_STUDENT, id);
};

export const getDailyHabit = (dateStr: string): DailyHabit => {
  try {
    const data = localStorage.getItem(`${KEYS.HABITS}_${dateStr}`);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  return {
    date: dateStr,
    tilawah1Juz: false,
    ziyadahDone: false,
    murajaahDone: false,
    dzikirPagiPetang: false,
    sholatSunnah: false,
  };
};

export const saveDailyHabit = (habit: DailyHabit) => {
  localStorage.setItem(`${KEYS.HABITS}_${habit.date}`, JSON.stringify(habit));
};

export const getStoredPlans = (): SchedulePlan[] => {
  try {
    const data = localStorage.getItem(KEYS.PLANS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const savePlan = (plan: SchedulePlan) => {
  const plans = getStoredPlans();
  const updated = [plan, ...plans];
  localStorage.setItem(KEYS.PLANS, JSON.stringify(updated));
  return updated;
};

export const exportDataJson = () => {
  const exportObj = {
    logs: getStoredLogs(),
    students: getStoredStudents(),
    exportDate: new Date().toISOString(),
  };
  const jsonStr = JSON.stringify(exportObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mutabaah_tahfidz_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
