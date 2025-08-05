import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NamePopup from '@/components/NamePopup';
import WelcomeSection from '@/components/WelcomeSection';
import BalloonGame from '@/components/BalloonGame';
import LoveGameCard from '@/components/LoveGameCard';
import CakeSurprise from '@/components/CakeSurprise';
import LoveCounter from '@/components/LoveCounter';
import BirthdayPoem from '@/components/BirthdayPoem';

type Section = 'welcome' | 'balloons' | 'love-game' | 'cake' | 'counter' | 'poem';

const Index = () => {
  const [userName, setUserName] = useState<string>('');
  const [showNamePopup, setShowNamePopup] = useState(true);
  const [currentSection, setCurrentSection] = useState<Section>('welcome');
  const [completedSections, setCompletedSections] = useState<Set<Section>>(new Set());

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setShowNamePopup(false);
  };

  const handleSectionComplete = (section: Section, nextSection?: Section) => {
    setCompletedSections(prev => new Set([...prev, section]));
    if (nextSection) {
      setTimeout(() => {
        setCurrentSection(nextSection);
      }, 1000);
    }
  };

  const handleWelcomeNext = () => {
    setCurrentSection('balloons');
  };

  const handleBalloonsComplete = () => {
    handleSectionComplete('balloons', 'love-game');
  };

  const handleLoveGameYes = () => {
    handleSectionComplete('love-game', 'cake');
  };

  useEffect(() => {
    // Auto-progress through sections after cake
    if (currentSection === 'cake') {
      const timer = setTimeout(() => {
        setCurrentSection('counter');
      }, 8000); // Show cake for 8 seconds
      return () => clearTimeout(timer);
    }
    
    if (currentSection === 'counter') {
      const timer = setTimeout(() => {
        setCurrentSection('poem');
      }, 12000); // Show counter for 12 seconds
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'welcome':
        return <WelcomeSection name={userName} onNext={handleWelcomeNext} />;
      case 'balloons':
        return <BalloonGame onComplete={handleBalloonsComplete} />;
      case 'love-game':
        return <LoveGameCard onYesClick={handleLoveGameYes} />;
      case 'cake':
        return <CakeSurprise />;
      case 'counter':
        return <LoveCounter />;
      case 'poem':
        return <BirthdayPoem />;
      default:
        return <WelcomeSection name={userName} onNext={handleWelcomeNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-glow-gradient opacity-10 pointer-events-none" />
      
      {/* Ambient sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-pink rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Name Popup */}
      <NamePopup isOpen={showNamePopup} onNameSubmit={handleNameSubmit} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showNamePopup && (
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {renderCurrentSection()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Progress Indicator */}
      {!showNamePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex space-x-2 bg-card/80 backdrop-blur-md rounded-full px-4 py-2 border border-neon-pink/30">
            {['welcome', 'balloons', 'love-game', 'cake', 'counter', 'poem'].map((section, index) => (
              <motion.div
                key={section}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSection === section
                    ? 'bg-neon-pink shadow-glow scale-125'
                    : completedSections.has(section as Section)
                    ? 'bg-neon-purple'
                    : 'bg-muted'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating navigation hint */}
      {currentSection === 'poem' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-center"
        >
          <motion.button
            onClick={() => setCurrentSection('welcome')}
            className="bg-romantic-gradient px-6 py-3 rounded-full text-white font-semibold shadow-neon hover:shadow-glow transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↻ Start Over
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Index;