import React from 'react';
import { motion } from 'framer-motion';

const BirthdayPoem: React.FC = () => {
  const poemLines = [
    "In every laugh and little sigh,",
    "You're the spark that lights my sky.",
    "From sleepy mornings to late night talks,",
    "You're my rhythm in every walk.",
    "",
    "With every day, my love just grows,",
    "Like blooming petals of a rose.",
    "So here's a wish, pure and true,",
    "Happy Birthday, my love — I Love you. 🎂❤️"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative overflow-hidden">
      {/* Falling hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl text-neon-pink opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, Math.sin(i) * 50],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-glow mb-12"
        >
          💝 A Special Message 💝
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card/90 backdrop-blur-md border border-neon-pink/30 rounded-3xl p-8 md:p-12 shadow-neon relative"
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-romantic-gradient opacity-20 blur-xl"></div>
          
          <div className="relative z-10">
            {poemLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.3 }}
                className={`text-xl md:text-2xl mb-4 ${
                  line === "" 
                    ? "mb-8" 
                    : index < 4 
                      ? "text-neon-purple text-glow-purple" 
                      : "text-neon-pink text-glow"
                } font-semibold leading-relaxed`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Floating hearts around the poem */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl text-neon-pink opacity-40"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + Math.sin(i * 2) * 30}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
          className="mt-12"
        >
          <motion.div
            className="text-5xl md:text-6xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🎉✨💕✨🎉
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayPoem;