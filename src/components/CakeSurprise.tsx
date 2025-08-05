import React from 'react';
import { motion } from 'framer-motion';
import romanticCake from '@/assets/romantic-cake.jpg';

const CakeSurprise: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated Cake */}
        <motion.div
          className="mb-12"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative inline-block">
            <motion.img
              src={romanticCake}
              alt="Romantic Birthday Cake"
              className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl shadow-neon"
              animate={{
                filter: [
                  'drop-shadow(0 0 20px hsl(var(--neon-pink)))',
                  'drop-shadow(0 0 30px hsl(var(--neon-purple)))',
                  'drop-shadow(0 0 20px hsl(var(--neon-blue)))',
                  'drop-shadow(0 0 30px hsl(var(--neon-pink)))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Floating sparkles around cake */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.cos(i * Math.PI / 4) * 120 + 50}%`,
                  top: `${Math.sin(i * Math.PI / 4) * 120 + 50}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Birthday Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/80 backdrop-blur-md border border-neon-pink/30 rounded-3xl p-8 md:p-12 shadow-romantic"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-glow mb-6"
            animate={{
              textShadow: [
                '0 0 20px hsl(var(--neon-pink))',
                '0 0 30px hsl(var(--romantic-glow))',
                '0 0 20px hsl(var(--neon-pink))',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Happy Birthday! 🎂
          </motion.h2>
          
          <motion.div
            className="space-y-4 text-xl md:text-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.p
              className="text-neon-purple text-glow-purple"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Happy Birthday to the love of my life 💕
            </motion.p>
            
            <motion.p
              className="text-neon-blue text-glow-blue"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              You make every moment magical ✨
            </motion.p>
          </motion.div>

          {/* Floating hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl text-neon-pink opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CakeSurprise;