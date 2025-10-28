import React, { useState } from 'react';
import { Tab } from './types';
import BpmCalculator from './components/BpmCalculator';
import Metronome from './components/Metronome';
import Tuner from './components/Tuner';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Calculator);
  const [isScreenFlashing, setIsScreenFlashing] = useState(false);
  const [sharedBpm, setSharedBpm] = useState(120);
  const [isBpmSynced, setIsBpmSynced] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.Calculator:
        return <BpmCalculator bpm={sharedBpm} setBpm={setSharedBpm} />;
      case Tab.Metronome:
        return <Metronome 
                  bpm={sharedBpm} 
                  setBpm={setSharedBpm} 
                  isSynced={isBpmSynced}
                  setIsSynced={setIsBpmSynced}
                  setScreenFlash={setIsScreenFlashing} 
                />;
      case Tab.Tuner:
        return <Tuner />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen w-full bg-slate-900 transition-colors duration-100 ${isScreenFlashing ? 'bg-slate-800' : ''} flex flex-col`}>
      <div className="container mx-auto max-w-2xl p-4 sm:p-6 flex-grow">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
            BPM Suite
          </h1>
        </header>

        <nav className="relative flex justify-center mb-8 border-b border-slate-800">
          {Object.values(Tab).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 py-3 px-2 text-sm font-bold transition-colors duration-300 focus:outline-none 
                ${activeTab === tab ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
               {activeTab === tab && (
                <span 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 rounded-t-full glowing-shadow-cyan"
                />
              )}
            </button>
          ))}
        </nav>

        <main className="pb-8">
          {renderTabContent()}
        </main>
      </div>
      <footer className="w-full text-center p-4 border-t border-slate-800">
        <p className="text-slate-500 text-sm">by fresh record</p>
      </footer>
    </div>
  );
};

export default App;