import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NamePopupProps {
  isOpen: boolean;
  onNameSubmit: (name: string) => void;
}

const NamePopup: React.FC<NamePopupProps> = ({ isOpen, onNameSubmit }) => {
  const [name, setName] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = () => {
    if (name.trim()) {
      setIsTyping(true);
      setTimeout(() => {
        onNameSubmit(name.trim());
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-card border border-neon-pink/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-neon"
          >
            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-neon-pink text-2xl heart-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  💖
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-bold mb-6 text-glow bg-romantic-gradient bg-clip-text text-transparent"
              >
                What's your name?
              </motion.h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your beautiful name..."
                  className="text-center text-lg bg-background/50 border-neon-purple/50 focus:border-neon-pink focus:ring-neon-pink text-foreground placeholder:text-muted-foreground"
                  disabled={isTyping}
                />
              </motion.div>

              {isTyping ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neon-purple text-lg typing-dots"
                >
                  Processing your magical name
                </motion.div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleSubmit}
                    className="bg-romantic-gradient hover:shadow-neon bounce-glow px-8 py-3 text-lg font-semibold"
                    disabled={!name.trim()}
                  >
                    Start ✨
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NamePopup;