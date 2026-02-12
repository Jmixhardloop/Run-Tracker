
import React, { useState, useEffect } from 'react';
import { ViewState, SessionStats, Interval } from './types';
import SetupView from './components/SetupView';
import ActiveSessionView from './components/ActiveSessionView';
import HistoryView from './components/HistoryView';
import CoachView from './components/CoachView';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('SETUP');
  const [history, setHistory] = useState<SessionStats[]>([]);
  const [activeIntervals, setActiveIntervals] = useState<Interval[]>([]);
  const [isFreeRun, setIsFreeRun] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('run_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const saveSession = (stats: SessionStats) => {
    const newHistory = [...history, stats];
    setHistory(newHistory);
    localStorage.setItem('run_history', JSON.stringify(newHistory));
    setView('HISTORY');
  };

  const handleStartRun = (free: boolean, intervals?: Interval[]) => {
    setIsFreeRun(free);
    if (intervals) setActiveIntervals(intervals);
    setView('ACTIVE');
  };

  const deleteSession = (id: number) => {
    const newHistory = history.filter(s => s.id !== id);
    setHistory(newHistory);
    localStorage.setItem('run_history', JSON.stringify(newHistory));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 max-w-md mx-auto relative overflow-hidden flex flex-col">
      {view === 'SETUP' && (
        <SetupView onStart={handleStartRun} />
      )}

      {view === 'ACTIVE' && (
        <ActiveSessionView 
          isFreeRun={isFreeRun} 
          intervals={activeIntervals} 
          onFinish={saveSession}
          onCancel={() => setView('SETUP')}
        />
      )}

      {view === 'HISTORY' && (
        <HistoryView history={history} onDelete={deleteSession} />
      )}

      {view === 'COACH' && (
        <CoachView history={history} />
      )}

      {view !== 'ACTIVE' && (
        <BottomNav activeView={view} setView={setView} />
      )}
    </div>
  );
};

export default App;
