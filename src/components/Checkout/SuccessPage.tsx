import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Download, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

// Add type declarations for canvas-confetti
declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { y: number };
    colors?: string[];
  }
  
  function confetti(options: ConfettiOptions): void;
}

interface Course {
  id: string;
  name: string;
}

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(100);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (location.state?.courses) {
      setPurchasedCourses(location.state.courses);
    }
  }, [location.state]);

  const runConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#10B981', '#EF4444', '#F59E0B']
    });
  };

  // Updated particles initialization with correct Engine type
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    runConfetti();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        const newValue = prev - 1;
        setProgress((newValue / 5) * 100);
        if (newValue <= 0) {
          navigate('/');
          return 0;
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 80 },
              color: { value: '#4F46E5' },
              opacity: { value: 0.5 },
              size: { value: 2 },
              move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
              }
            }
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-lg w-full relative z-10"
      >
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border-2 border-purple-500/20 shadow-2xl p-8 text-center space-y-6 relative overflow-hidden">
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          
          <motion.div 
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-xl"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full shadow-lg">
                <CheckCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Payment Successful!
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg"
                >
                  Your learning journey begins now! 🚀
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center my-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full" viewBox="0 0 80 80">
                  <circle
                    className="text-gray-700"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                  <circle
                    className="text-purple-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                    style={{
                      strokeDasharray: 188.495,
                      strokeDashoffset: 188.495 * ((100 - progress) / 100),
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%'
                    }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-purple-400">
                  {countdown}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {purchasedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="bg-gray-700/30 rounded-xl p-4 my-6"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Rocket className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-200">{course.name} Added</span>
                  </div>
                  <div className="mt-2 h-1 bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-400 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="grid gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="w-full py-3 px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                <Home size={20} />
                Explore More Courses
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 flex items-center justify-center gap-2 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-xl font-medium transition-all"
              >
                <Download size={20} />
                Download Materials
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-gray-500 mt-6"
            >
              <p>Confirmation sent to your email</p>
              <p className="mt-1">🎉 Welcome to the learning community!</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}