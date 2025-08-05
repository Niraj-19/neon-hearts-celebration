import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

interface BalloonGameProps {
  onComplete: () => void;
}

const BalloonGame: React.FC<BalloonGameProps> = ({ onComplete }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const sweetMessages = [
    "You light up my world! ✨",
    "You're my sunshine! ☀️",
    "Forever and always! 💕",
    "You make me smile! 😊",
    "My heart beats for you! 💓",
    "You're absolutely amazing! 🌟",
    "Love you to the moon! 🌙",
    "You're my everything! 💖",
    "Perfect in every way! 🥰",
    "My sweet angel! 👼",
    "You're incredible! ✨",
    "Best thing in my life! 🌺"
  ];

  const balloonColors = [
    'text-neon-pink',
    'text-neon-purple', 
    'text-neon-blue',
    'text-neon-cyan',
    'text-romantic-glow'
  ];

  useEffect(() => {
    // Initialize balloons
    const initialBalloons: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 60 + 20, // 20% to 80% of screen height
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      popped: false,
    }));
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (balloonId: number) => {
    // Show sweet message
    const message = sweetMessages[balloonId % sweetMessages.length];
    setCurrentMessage(message);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    setBalloons(prev => 
      prev.map(balloon => 
        balloon.id === balloonId 
          ? { ...balloon, popped: true }
          : balloon
      )
    );

    // Check if all balloons are popped
    const updatedBalloons = balloons.map(balloon => 
      balloon.id === balloonId ? { ...balloon, popped: true } : balloon
    );
    
    if (updatedBalloons.every(balloon => balloon.popped) && !gameComplete) {
      setTimeout(() => {
        setShowConfetti(true);
        setGameComplete(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }, 500);
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center py-20">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#ff0080', '#8000ff', '#00a0ff', '#ff4080']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-glow mb-4">
          🎈 Pop the Balloons! 🎈
        </h2>
        <p className="text-xl text-neon-purple">
          Click on each balloon to pop them all!
        </p>
      </motion.div>

      {/* Balloons */}
      <div className="relative w-full h-96 max-w-4xl">
        <AnimatePresence>
          {balloons.map((balloon) => (
            !balloon.popped && (
              <motion.div
                key={balloon.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                exit={{ 
                  scale: [1, 1.3, 0],
                  opacity: [1, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: balloon.id * 0.2
                  }
                }}
                className={`absolute cursor-pointer text-6xl md:text-8xl ${balloon.color} hover:scale-110 transition-transform`}
                style={{
                  left: `${balloon.x}%`,
                  top: `${balloon.y}%`,
                  filter: 'drop-shadow(0 0 10px currentColor)',
                }}
                onClick={() => popBalloon(balloon.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                🎈
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Sweet Messages */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            className="absolute top-10 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="bg-romantic-gradient px-8 py-4 rounded-full shadow-neon">
              <p className="text-white text-xl font-semibold text-center">
                {currentMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion message */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="text-center bg-card/90 p-12 rounded-3xl shadow-neon backdrop-blur-md">
              <motion.h3
                className="text-5xl font-bold text-glow mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                You're so amazing! 🥹💕
              </motion.h3>
              <div className="text-3xl">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="inline-block mx-1"
                  >
                    💖
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BalloonGame;