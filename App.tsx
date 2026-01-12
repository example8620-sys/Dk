
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentsList from './components/StudentsList';
import FeesList from './components/FeesList';
import AIInsights from './components/AIInsights';
import { NavigationTab } from './types';
import { MOCK_STUDENTS, MOCK_FEES } from './mockData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard students={MOCK_STUDENTS} fees={MOCK_FEES} />;
      case NavigationTab.STUDENTS:
        return <StudentsList students={MOCK_STUDENTS} />;
      case NavigationTab.FEES:
        return <FeesList fees={MOCK_FEES} students={MOCK_STUDENTS} />;
      case NavigationTab.AI_INSIGHTS:
        return <AIInsights students={MOCK_STUDENTS} fees={MOCK_FEES} />;
      default:
        return <Dashboard students={MOCK_STUDENTS} fees={MOCK_FEES} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Desktop */}
      <Sidebar activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
      }} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
              <span className="hover:text-slate-600 cursor-pointer">ERP</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
              <span className="text-slate-900 font-medium capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
            <h1 className="md:hidden font-bold text-blue-600">SMT-ERP</h1>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               <span className="text-xs font-semibold text-slate-600">System Live</span>
             </div>
             <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
               <i className="fa-solid fa-bell"></i>
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
             <button className="flex items-center gap-2 group">
               <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                 A
               </div>
             </button>
          </div>
        </header>

        {/* Dynamic Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-64 h-full bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <h1 className="text-2xl font-bold text-blue-600 mb-8">SMT-ERP</h1>
              <nav className="space-y-4">
                {[
                  { id: NavigationTab.DASHBOARD, icon: 'fa-chart-pie', label: 'Dashboard' },
                  { id: NavigationTab.STUDENTS, icon: 'fa-user-graduate', label: 'Students' },
                  { id: NavigationTab.FEES, icon: 'fa-wallet', label: 'Fees' },
                  { id: NavigationTab.AI_INSIGHTS, icon: 'fa-robot', label: 'AI' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                      activeTab === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'
                    }`}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto max-w-[1400px] mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
