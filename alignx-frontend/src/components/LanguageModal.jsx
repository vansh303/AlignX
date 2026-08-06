import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, X } from 'lucide-react';

export default function LanguageModal({ isOpen, onClose, onSelect }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-mono tracking-tight text-center">SELECT LANGUAGE / भाषा चुनें</h2>
            <div className="grid gap-4">
              <button onClick={() => onSelect('en')} className="p-4 bg-slate-800 hover:bg-cyan-500/20 border border-white/5 rounded-xl text-left transition-all group">
                <span className="text-lg font-bold text-white group-hover:text-cyan-400">English</span>
                <p className="text-xs text-slate-500">Standard Clinical Instructions</p>
              </button>
              <button onClick={() => onSelect('hi')} className="p-4 bg-slate-800 hover:bg-emerald-500/20 border border-white/5 rounded-xl text-left transition-all group">
                <span className="text-lg font-bold text-white group-hover:text-emerald-400">हिन्दी (Hindi)</span>
                <p className="text-xs text-slate-500">सरल भाषा और वॉइस गाइडेंस</p>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}