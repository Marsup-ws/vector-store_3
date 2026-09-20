'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LogonModal() {
  const { isLogonOpen, setIsLogonOpen, setIsLoginOpen } = useApp();

  if (!isLogonOpen) return null;

  const handleClose = () => {
    setIsLogonOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogonOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-800"
        >
          {/* BOUTON FERMER (CROIX) */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>

          {/* HEADER MODALE */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2b3a67]/10 text-[#2b3a67]">
              <UserPlus size={24} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2b3a67]">Créer un compte</h2>
            <p className="text-xs text-slate-500 mt-1">Inscrivez-vous pour rejoindre l'application commerciale</p>
          </div>

          {/* SQUELETTE / CONTENU VIDE POUR LE MOMENT */}
          <div className="my-8 rounded-xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/50">
            <p className="text-sm font-medium text-slate-500">
              Formulaire d'inscription (Logon) en cours de préparation...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Cette section sera activée prochainement.
            </p>
          </div>

          {/* RETOUR VERS LOGIN */}
          <div className="mt-4 border-t border-slate-100 pt-4 text-center">
            <button
              type="button"
              onClick={handleSwitchToLogin}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#2b3a67] font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Déjà inscrit ? <span className="font-semibold underline">Se connecter</span></span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
