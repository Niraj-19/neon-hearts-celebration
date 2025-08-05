import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import blushingCharacter from '@/assets/blushing-character.jpg';

interface LoveGameCardProps {
  onYesClick: () => void;
}

const LoveGameCard: React.FC<LoveGameCardProps> = ({ onYesClick }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonClicks, setNoButtonClicks] = useState(0);

  const moveNoButton = () => {
    const newX = Math.random() * 200 - 100; // -100 to 100
    const newY = Math.random() * 200 - 100; // -100 to 100
    setNoButtonPosition({ x: newX, y: newY });
    setNoButtonClicks(prev => prev + 1);
  };

  const getNoButtonText = () => {
    switch (noButtonClicks) {
      case 0: return "No";
      case 1: return "Are you sure?";
      case 2: return "Really?";
      case 3: return "Think again!";
      case 4: return "Please?";
      default: return "No way!";
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-card/90 backdrop-blur-md border border-neon-pink/30 rounded-3xl p-12 max-w-lg w-full text-center shadow-neon"
      >
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-neon-pink text-xl opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
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

        <div className="relative z-10">
          {/* Character Image */}
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <img
              src={blushingCharacter}
              alt="Blushing character"
              className="w-32 h-32 mx-auto rounded-full border-4 border-neon-pink shadow-glow"
            />
          </motion.div>

          {/* Question */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-glow mb-12"
            animate={{
              textShadow: [
                '0 0 20px hsl(var(--neon-pink))',
                '0 0 30px hsl(var(--romantic-glow))',
                '0 0 20px hsl(var(--neon-pink))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Do you love me? 💕
          </motion.h2>

          {/* Buttons */}
          <div className="flex gap-8 justify-center items-center relative">
            {/* Yes Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onYesClick}
                className="bg-romantic-gradient hover:shadow-neon text-xl px-8 py-4 font-bold"
              >
                Yes! 💖
              </Button>
            </motion.div>

            {/* No Button (moves away) */}
            <motion.div
              animate={{
                x: noButtonPosition.x,
                y: noButtonPosition.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                variant="outline"
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/20 text-xl px-8 py-4 font-bold"
              >
                {getNoButtonText()}
              </Button>
            </motion.div>
          </div>

          {/* Hint text after multiple attempts */}
          {noButtonClicks > 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neon-purple text-sm mt-6"
            >
              Hint: The "No" button is shy! Try the other one 😉
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default LoveGameCard;