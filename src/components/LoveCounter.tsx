import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveCounter: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 2,
    hours: 5,
    minutes: 1,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours += 1;
        }
        if (newHours >= 24) {
          newHours = 0;
          newDays += 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeElapsed.days, icon: '🌅' },
    { label: 'Hours', value: timeElapsed.hours, icon: '🕐' },
    { label: 'Minutes', value: timeElapsed.minutes, icon: '⏰' },
    { label: 'Seconds', value: timeElapsed.seconds, icon: '💫' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-glow mb-4"
        >
          💖 Our Love Timer 💖
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-neon-purple mb-12"
        >
          We've been together for...
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.7 }}
              className="bg-card/80 backdrop-blur-md border border-neon-pink/30 rounded-2xl p-6 shadow-romantic"
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {unit.icon}
              </motion.div>
              
              <motion.div
                className="text-3xl md:text-4xl font-bold text-glow mb-2"
                animate={{
                  color: [
                    'hsl(var(--neon-pink))',
                    'hsl(var(--neon-purple))',
                    'hsl(var(--neon-blue))',
                    'hsl(var(--neon-pink))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                {unit.value.toLocaleString()}
              </motion.div>
              
              <div className="text-lg text-neon-purple font-semibold">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-3xl text-neon-pink opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i * 2) * 30, 0],
                rotate: [0, 360],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              💖
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center"
        >
          <p className="text-xl md:text-2xl text-glow-purple">
            And every second with you feels like magic! ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveCounter;