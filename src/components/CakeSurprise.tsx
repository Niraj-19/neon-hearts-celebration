import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CakeSurprise: React.FC = () => {
  const [visiblePieces, setVisiblePieces] = useState<number[]>([]);

  const cakePieces = [
    { emoji: '🍰', delay: 0, position: 'bottom-center' },
    { emoji: '🎂', delay: 0.5, position: 'center' },
    { emoji: '🕯️', delay: 1, position: 'top-left' },
    { emoji: '🕯️', delay: 1.2, position: 'top-center' },
    { emoji: '🕯️', delay: 1.4, position: 'top-right' },
    { emoji: '🍓', delay: 1.8, position: 'middle-left' },
    { emoji: '🍓', delay: 2, position: 'middle-right' },
    { emoji: '✨', delay: 2.2, position: 'top-far-left' },
    { emoji: '✨', delay: 2.4, position: 'top-far-right' },
  ];

  useEffect(() => {
    cakePieces.forEach((piece, index) => {
      setTimeout(() => {
        setVisiblePieces(prev => [...prev, index]);
      }, piece.delay * 1000);
    });
  }, []);

  const getPosition = (position: string) => {
    const positions = {
      'bottom-center': 'left-1/2 bottom-4 transform -translate-x-1/2',
      'center': 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
      'top-left': 'left-1/3 top-1/4 transform -translate-x-1/2',
      'top-center': 'left-1/2 top-1/4 transform -translate-x-1/2',
      'top-right': 'left-2/3 top-1/4 transform -translate-x-1/2',
      'middle-left': 'left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
      'middle-right': 'right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2',
      'top-far-left': 'left-1/6 top-1/6',
      'top-far-right': 'right-1/6 top-1/6',
    };
    return positions[position as keyof typeof positions] || 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2';
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-4xl mx-auto">
        {/* Animated Cake Building */}
        <motion.div
          className="mb-12 relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-80 h-80 mx-auto">
            <AnimatePresence>
              {cakePieces.map((piece, index) => (
                visiblePieces.includes(index) && (
                  <motion.div
                    key={index}
                    initial={{ 
                      scale: 0, 
                      opacity: 0, 
                      y: -100,
                      rotate: Math.random() * 360 
                    }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      y: 0,
                      rotate: 0
                    }}
                    exit={{ 
                      scale: 0, 
                      opacity: 0 
                    }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                      duration: 0.8
                    }}
                    className={`absolute text-6xl md:text-8xl ${getPosition(piece.position)}`}
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 0, 128, 0.5))',
                    }}
                  >
                    {piece.emoji}
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(128,0,255,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(0,160,255,0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
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