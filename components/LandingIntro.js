import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';

export default function LandingIntro({ onStart }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', x: -70 }}
    >
      <ParticleBackground />
      <div className="glass gradient-border relative z-10 w-full max-w-3xl rounded-[30px] p-10 text-center shadow-glow">
        <motion.h1
          className="mb-4 text-3xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          نيكسا ليس مجرد عميل… بل هو المستقبل.
        </motion.h1>
        <motion.p
          className="text-lg text-slate-200 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          مصنوع بأيادٍ طلاب عرب.
        </motion.p>

        {showButton && (
          <motion.button
            onClick={onStart}
            className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-xl font-semibold shadow-glow transition hover:scale-105"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 ابدأ الآن
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}
