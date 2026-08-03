/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationTabs, TabType } from './components/NavigationTabs';
import { QuranMatrix } from './components/QuranMatrix';
import { MutabaahLogList } from './components/MutabaahLogList';
import { AiTesHafalan } from './components/AiTesHafalan';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RaporTahfidz } from './components/RaporTahfidz';
import { HabitTracker } from './components/HabitTracker';
import { AiTanyaUstadz } from './components/AiTanyaUstadz';
import { SetorHafalanModal } from './components/SetorHafalanModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { MushafReaderModal } from './components/MushafReaderModal';

import { MutabaahLog, StudentProfile } from './types';
import {
  getStoredLogs,
  saveLog,
  deleteLog,
  getStoredStudents,
  getActiveStudentId,
  setActiveStudentId,
  DEFAULT_STUDENT,
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('matrix');
  const [logs, setLogs] = useState<MutabaahLog[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [activeStudentId, setActiveStudentIdState] = useState<string>(DEFAULT_STUDENT.id);

  // Modals state
  const [isSetorModalOpen, setIsSetorModalOpen] = useState(false);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [selectedSurahForSetor, setSelectedSurahForSetor] = useState<number | undefined>(undefined);
  const [mushafSurahNum, setMushafSurahNum] = useState<number | null>(null);

  useEffect(() => {
    const loadedLogs = getStoredLogs();
    const loadedStudents = getStoredStudents();
    const activeId = getActiveStudentId();

    setLogs(loadedLogs);
    setStudents(loadedStudents);
    setActiveStudentIdState(activeId);
  }, []);

  const activeStudent = students.find((s) => s.id === activeStudentId) || DEFAULT_STUDENT;

  const handleSelectStudent = (id: string) => {
    setActiveStudentIdState(id);
    setActiveStudentId(id);
  };

  const handleSaveLog = (newLog: MutabaahLog) => {
    const updated = saveLog(newLog);
    setLogs(updated);

    // Update student streak/juz if needed
    const studentLogs = updated.filter((l) => l.studentId === activeStudent.id);
    const uniqueJuz = new Set(studentLogs.map((l) => l.juz)).size;

    const updatedStudent: StudentProfile = {
      ...activeStudent,
      currentJuzCount: Math.max(activeStudent.currentJuzCount, uniqueJuz),
      streakDays: activeStudent.streakDays + 1,
    };

    const updatedStudentsList = students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
    setStudents(updatedStudentsList);
  };

  const handleDeleteLog = (id: string) => {
    const updated = deleteLog(id);
    setLogs(updated);
  };

  const handleOpenSetorForSurah = (surahNumber: number) => {
    setSelectedSurahForSetor(surahNumber);
    setIsSetorModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Header */}
      <Header
        activeStudent={activeStudent}
        allStudents={students}
        onSelectStudent={handleSelectStudent}
        onOpenSetorModal={() => {
          setSelectedSurahForSetor(undefined);
          setIsSetorModalOpen(true);
        }}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
      />

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Main Container Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'matrix' && (
          <QuranMatrix
            logs={logs}
            onSelectSurahForSetor={handleOpenSetorForSurah}
            onOpenMushaf={(num) => setMushafSurahNum(num)}
          />
        )}

        {activeTab === 'logs' && (
          <MutabaahLogList logs={logs} onDeleteLog={handleDeleteLog} />
        )}

        {activeTab === 'ai_test' && (
          <AiTesHafalan activeStudent={activeStudent} onSaveLog={handleSaveLog} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard logs={logs} activeStudent={activeStudent} />
        )}

        {activeTab === 'rapor' && (
          <RaporTahfidz student={activeStudent} logs={logs} />
        )}

        {activeTab === 'habits' && (
          <HabitTracker onOpenAiPlanner={() => setIsAiPlannerOpen(true)} />
        )}

        {activeTab === 'chat' && <AiTanyaUstadz />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        <p>Aplikasi Mutaba'ah Tahfidz Al-Qur'an • Bimbingan Hafalan, Muraja'ah & Evaluasi AI Gemini</p>
      </footer>

      {/* Modals */}
      <SetorHafalanModal
        isOpen={isSetorModalOpen}
        onClose={() => setIsSetorModalOpen(false)}
        onSaveLog={handleSaveLog}
        activeStudent={activeStudent}
        initialSurahNumber={selectedSurahForSetor}
      />

      <AiPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
      />

      {mushafSurahNum !== null && (
        <MushafReaderModal
          surahNumber={mushafSurahNum}
          onClose={() => setMushafSurahNum(null)}
          onSetorFromMushaf={(num) => {
            setMushafSurahNum(null);
            handleOpenSetorForSurah(num);
          }}
        />
      )}

    </div>
  );
}
