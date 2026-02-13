import React, { useEffect, useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200); // Small delay before unmounting
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a1a2e] flex flex-col items-center justify-center text-white">
      <div className="relative mb-8 animate-pulse">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
        <Crown className="w-24 h-24 text-yellow-400 relative z-10" />
        <Sparkles className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-spin-slow" />
      </div>

      <h1 className="text-3xl font-bold tracking-widest mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        GEM CLICKER
      </h1>
      <p className="text-gray-400 text-sm mb-12 tracking-wide uppercase">Advanced Edition</p>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700 relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 font-mono">
        {progress < 100 ? `LOADING ASSETS... ${Math.floor(progress)}%` : 'READY!'}
      </div>

      <div className="absolute bottom-8 text-gray-600 text-xs">
        Powered by MixStudios
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;