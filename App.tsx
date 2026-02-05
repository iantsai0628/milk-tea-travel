import React, { useState, useEffect } from 'react';
import { ViewType, ThemeConfig, ScheduleItem, Booking, Member, ShoppingItem, ExpenseItem } from './types';
import { THEMES, INITIAL_SCHEDULE, INITIAL_BOOKINGS, INITIAL_MEMBERS, INITIAL_SHOPPING, INITIAL_EXPENSES } from './constants';
import HomeView from './views/HomeView';
import ScheduleView from './views/ScheduleView';
import BookingsView from './views/BookingsView';
import ExpenseView from './views/ExpenseView';
import PlanningView from './views/PlanningView';
import MembersView from './views/MembersView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [theme, setTheme] = useState<ThemeConfig>(THEMES[0]);
  
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('mt_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('mt_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('mt_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [activeMemberId, setActiveMemberId] = useState<string>(INITIAL_MEMBERS[0].id);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('mt_shopping');
    return saved ? JSON.parse(saved) : INITIAL_SHOPPING;
  });
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('mt_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  useEffect(() => { localStorage.setItem('mt_schedule', JSON.stringify(schedule)); }, [schedule]);
  useEffect(() => { localStorage.setItem('mt_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('mt_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('mt_shopping', JSON.stringify(shoppingItems)); }, [shoppingItems]);
  useEffect(() => { localStorage.setItem('mt_expenses', JSON.stringify(expenses)); }, [expenses]);

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-main', theme.main);
    document.documentElement.style.setProperty('--theme-text', theme.text);
    document.documentElement.style.setProperty('--theme-light', theme.light);
    document.documentElement.style.setProperty('--theme-bg', theme.bg);
  }, [theme]);

  const renderView = () => {
    switch (currentView) {
      case ViewType.HOME: return <HomeView theme={theme} setTheme={setTheme} schedule={schedule} />;
      case ViewType.SCHEDULE: return <ScheduleView schedule={schedule} setSchedule={setSchedule} />;
      case ViewType.BOOKINGS: return <BookingsView bookings={bookings} />;
      case ViewType.EXPENSE: return <ExpenseView expenses={expenses} setExpenses={setExpenses} />;
      case ViewType.PLANNING: return <PlanningView members={members} activeMemberId={activeMemberId} setActiveMemberId={setActiveMemberId} shoppingItems={shoppingItems} setShoppingItems={setShoppingItems} />;
      case ViewType.MEMBERS: return <MembersView members={members} setMembers={setMembers} />;
      default: return <HomeView theme={theme} setTheme={setTheme} schedule={schedule} />;
    }
  };

  return (
    <div className="min-h-screen pb-32 flex flex-col theme-transition bg-[var(--theme-bg)] selection:bg-[var(--theme-main)] selection:text-white">
      <header className="sticky top-0 z-50 bg-[var(--theme-bg)]/80 backdrop-blur-xl px-6 py-5 border-b border-[var(--theme-light)] flex justify-between items-center transition-all duration-300">
        <div>
          <h1 className="text-xl font-bold tracking-[0.2em] text-[var(--theme-text)]">奶茶旅行</h1>
          <div className="flex items-center gap-1.5 opacity-30">
            <div className="w-1 h-1 rounded-full bg-[var(--theme-text)]"></div>
            <p className="text-[8px] uppercase tracking-tighter font-bold">Milk Tea Travel PWA</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              const nextIndex = (THEMES.indexOf(theme) + 1) % THEMES.length;
              setTheme(THEMES[nextIndex]);
            }}
            className="w-10 h-10 rounded-2xl bg-white border border-[var(--theme-light)] flex items-center justify-center text-[var(--theme-main)] shadow-sm active:scale-95 transition-all active:rotate-12"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-[var(--theme-main)] overflow-hidden shadow-md active:scale-95 transition-transform p-0.5 bg-white">
             <img src={members.find(m => m.id === activeMemberId)?.avatar} className="w-full h-full object-cover rounded-full" alt="me" />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6">
        {renderView()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-4 py-3 flex justify-between items-center border border-white/40 z-50">
        <NavButton active={currentView === ViewType.HOME} onClick={() => setCurrentView(ViewType.HOME)} icon="fa-house" label="首頁" />
        <NavButton active={currentView === ViewType.SCHEDULE} onClick={() => setCurrentView(ViewType.SCHEDULE)} icon="fa-calendar-heart" label="行程" />
        <NavButton active={currentView === ViewType.BOOKINGS} onClick={() => setCurrentView(ViewType.BOOKINGS)} icon="fa-ticket" label="憑證" />
        <NavButton active={currentView === ViewType.PLANNING} onClick={() => setCurrentView(ViewType.PLANNING)} icon="fa-briefcase" label="清單" />
        <NavButton active={currentView === ViewType.MEMBERS} onClick={() => setCurrentView(ViewType.MEMBERS)} icon="fa-user-group" label="成員" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all group ${active ? 'text-[var(--theme-main)]' : 'text-gray-300'}`}>
    <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all duration-300 ${active ? 'bg-[var(--theme-light)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] scale-110' : 'active:scale-95'}`}>
      <i className={`fa-solid ${icon} ${active ? 'text-lg' : 'text-xl'}`}></i>
    </div>
    <span className={`text-[9px] font-bold tracking-tighter transition-all ${active ? 'opacity-100 scale-100' : 'opacity-40 scale-90'}`}>{label}</span>
  </button>
);

export default App;