import React, { useState } from 'react';
import { FileDown, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadResume = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 2 
      }}
      className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10"
      onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href="/resume"
        className="group relative flex items-center justify-center rounded-full bg-[#0a0a0a]/80 p-2 backdrop-blur-xl transition-all duration-500 overflow-hidden"
        style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center gap-0 px-2 py-2 group-hover:gap-3 group-hover:px-4 transition-all duration-500">
          <motion.div
            animate={{ 
                rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
                scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.5 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner"
          >
            <FileDown className="h-6 w-6" />
          </motion.div>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
                width: isHovered ? 'auto' : 0,
                opacity: isHovered ? 1 : 0
            }}
            className="overflow-hidden whitespace-nowrap flex flex-col items-start"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
              Resume
            </span>
            <span className="text-sm font-bold text-white">
              View & Download
            </span>
          </motion.div>
        </div>

        {/* Glossy overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </a>
      
      {/* Tooltip-like decorative element */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-black md:hidden"
          >
            Grab CV
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DownloadResume;
