import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, ArrowLeft } from 'lucide-react';

const ResumePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl flex items-center justify-between gap-4 mb-8 px-2 md:px-0"
      >
        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-1.5 md:gap-2 text-white/60 hover:text-primary transition-colors group px-1"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium text-sm md:text-base hidden md:inline">Back to Portfolio</span>
          <span className="font-medium text-sm md:text-base md:hidden">Back</span>
        </button>

        <a
          href="/bhanu_fullStackdev.pdf"
          download="Bhanu_Resume.pdf"
          className="flex items-center gap-2 md:gap-3 bg-primary px-4 py-2.5 md:px-6 md:py-3 rounded-full text-black font-bold transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-lg shadow-primary/20"
        >
          <FileDown className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-base hidden md:inline">Download Resume</span>
          <span className="text-sm md:text-base md:hidden">Download</span>
        </a>
      </motion.div>

      {/* Resume Viewer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-5xl overflow-hidden relative mb-12"
        style={{ height: 'calc(min(100vw - 40px, 1024px) * 1.414)' }} // Perfect A4 aspect ratio height
      >
        <object
          data="/bhanu_fullStackdev.pdf#toolbar=0&navpanes=0"
          type="application/pdf"
          className="w-full h-full"
        >
          <iframe
            src="/bhanu_fullStackdev.pdf#toolbar=0&navpanes=0"
            className="w-full h-full border-none"
            title="Bhanu Resume"
          />
        </object>
      </motion.div>
    </div>
  );
};

export default ResumePage;
