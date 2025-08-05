import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BirthdayMessageProps {
  onNext: () => void;
}

const BirthdayMessage = ({ onNext }: BirthdayMessageProps) => {
  const messageText = "Wishing yuh a fantastic cake day🎂, Maiyaa!💫\nEven though we've just started this journey together, it already feels like something so special🤗☺️. In just a short time, you've brought a kind of warmth and happiness🥰. Your smile, your energy, your presence it all feels magical✨.\nToday is your day, and I hope it's as lovely and bright as you are🫵😻. I feel lucky to call you mine, and I'm genuinely excited for all the memories we'll create together🫂. This birthday marks not just another year of your life, but the beginning of our story and I can't wait to see where it goes!💌\nMay your day be filled with love, laughter, and everything you dream of. You truly deserve the best. 💖\nHappy Birthday once again with all my heart!🩵";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-purple rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-card/90 backdrop-blur-md border-neon-pink/30 shadow-neon">
          <CardContent className="p-8">
            {/* Message text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <p className="text-lg leading-relaxed text-foreground whitespace-pre-line text-center font-medium">
                {messageText}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.img
                  src="/lovable-uploads/271c6395-6504-499f-a56b-7fd3ff0168bf.png"
                  alt="Birthday person"
                  className="w-80 h-auto rounded-lg shadow-lg border-2 border-neon-pink/40"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Floating hearts around image */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-neon-pink text-2xl pointer-events-none"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0.8, 0.3, 0.8],
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
            </motion.div>

            {/* Next button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center"
            >
              <Button
                onClick={onNext}
                className="bg-romantic-gradient hover:shadow-glow text-white font-semibold px-8 py-3 rounded-full text-lg transition-all"
              >
                Continue to Poem 💌
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;