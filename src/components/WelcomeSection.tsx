import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface WelcomeSectionProps {
  name: string;
  onNext: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ name, onNext }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-pink rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
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

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-glow"
            animate={{
              textShadow: [
                '0 0 20px hsl(var(--neon-pink))',
                '0 0 30px hsl(var(--neon-purple))',
                '0 0 20px hsl(var(--neon-pink))',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hey {name}! 💫
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-2xl md:text-3xl text-neon-purple text-glow-purple mb-8"
          >
            Ready for a little surprise? 🎉
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <Button
              onClick={onNext}
              className="bg-romantic-gradient hover:shadow-neon text-xl px-12 py-6 rounded-full font-bold bounce-glow"
            >
              Let's Go! 🚀
            </Button>
          </motion.div>

          {/* Floating hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
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
      </div>
    </section>
  );
};

export default WelcomeSection;