'use client';

import { motion } from 'framer-motion';
import { Mountain, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onComplete: () => void;
}

export default function HeroSection({ onComplete }: HeroSectionProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScroll(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#1a1f2e] to-[#0a0e1a]">
        {/* Mountain Silhouette */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              d="M0,800 L400,400 L600,500 L800,300 L1000,450 L1200,250 L1400,400 L1600,350 L1920,600 L1920,1080 L0,1080 Z"
              fill="url(#mountainGrad)"
            />
          </svg>
        </div>

        {/* Animated Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Aurora Glow Effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Fog/Cloud Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
          animate={{
            x: [-100, 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ letterSpacing: '0.5em', opacity: 0 }}
            animate={{ letterSpacing: '0.05em', opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome To My
            </motion.span>
          </motion.h1>
          
          <motion.h2
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Himalayan Travel Journey
          </motion.h2>
        </motion.div>

        {/* Logo and Branding */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-400/30">
              <Mountain className="w-12 h-12 text-white" />
            </div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Summit Diaries
            </h3>
            <p className="text-lg md:text-xl text-blue-400 font-medium">
              The Green Pin Journey Across Himalayas
            </p>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 italic text-center max-w-3xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          "Every mountain holds a memory, every pin tells a story."
        </motion.p>

        {/* Scroll Indicator */}
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-sm uppercase tracking-wider">Explore Dashboard</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 group-hover:text-blue-400 transition-colors" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
    </motion.div>
  );
}
