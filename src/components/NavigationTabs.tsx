import React from 'react';
import { Grid3X3, History, Bot, BarChart3, FileCheck, CalendarCheck, MessageSquare } from 'lucide-react';

export type TabType = 'matrix' | 'logs' | 'ai_test' | 'analytics' | 'rapor' | 'habits' | 'chat';

interface NavigationTabsProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'matrix' as TabType, label: 'Matriks 30 Juz', icon: Grid3X3 },
    { id: 'logs' as TabType, label: 'Riwayat Setoran', icon: History },
    { id: 'ai_test' as TabType, label: 'Tes Hafalan AI', icon: Bot, highlight: true },
    { id: 'analytics' as TabType, label: 'Statistik & Grafik', icon: BarChart3 },
    { id: 'rapor' as TabType, label: 'Rapor Tahfidz', icon: FileCheck },
    { id: 'habits' as TabType, label: 'Habit & Target', icon: CalendarCheck },
    { id: 'chat' as TabType, label: 'Tanya Ustadz AI', icon: MessageSquare },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 sticky top-[69px] z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-semibold'
                    : tab.highlight
                    ? 'bg-slate-800/90 text-teal-300 hover:bg-slate-800 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
