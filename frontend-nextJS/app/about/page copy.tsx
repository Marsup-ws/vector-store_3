'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { useApp } from '@/context/AppContext';

// Animation du conteneur parent (orchestre l'apparition successive des enfants)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18, // DÉLAI ENTRE CHAQUE PARAGRAPHE
      delayChildren: 0.2,
    },
  },
};

// Animation individuelle de chaque paragraphe (fondu du bas vers le haut)
const paragraphVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1.0] as const,
    }
  },
};

export default function AboutSectionCopy() {
  const { t } = useApp();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 md:p-12 bg-[#FBF7FB] text-gray-800 overflow-hidden font-serif">
      
      {/* Container principal avec effet carte / dégradé doux */}
      <div className="relative w-full max-w-6xl rounded-3xl bg-gradient-to-br from-[#FFF8FA] via-[#F6EEFA] to-[#EDE7F6] p-6 sm:p-10 lg:p-14 shadow-xl border border-pink-100/50 overflow-hidden">
        
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 rounded-full blur-2xl pointer-events-none" />

        {/* IMAGE EN FILIGRANE AVEC EFFET DE FONDU ET DE FLOU (BLUR) */}
        <motion.div 
          initial={{ opacity: 0, x: -5, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 h-full flex items-center justify-end z-0 pointer-events-none overflow-hidden"
        >
          <div className="relative h-full max-h-[85vh] aspect-[880/900] opacity-35 mix-blend-multiply flex items-center justify-end pr-2 sm:pr-6 lg:pr-8">
            <Image
              src="/about/Nous-880x900.png"
              alt="Evgueniia Rozhdestvenska"
              width={880}
              height={900}
              priority
              className="h-full w-auto max-h-[85vh] object-contain object-right filter contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-10 items-center z-10 max-w-3xl">
          
          {/* CONTENEUR ANIMÉ DES PARAGRAPHES */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 text-gray-900 leading-relaxed text-base sm:text-lg relative"
          >
            {/* Titre principal */}
            <motion.div variants={paragraphVariants} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#4A154B] via-[#6B21A8] to-[#0D9488] bg-clip-text text-transparent">
                {t.presentation.title}
              </h1>
              
              {/* Séparateur élégant avec étoile */}
              <div className="flex items-center space-x-2 text-purple-500 opacity-80 pt-1">
                <div className="h-[1px] w-12 bg-gradient-to-r from-purple-400 to-transparent" />
                <Sparkles className="w-4 h-4 fill-purple-400 stroke-purple-500" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-purple-400 to-transparent" />
              </div>
            </motion.div>

            {/* Paragraphes (chacun séparé dynamiquement et animé individuellement) */}
            <motion.p variants={paragraphVariants} className="whitespace-pre-line font-medium text-gray-900 leading-loose">
              {t.presentation.paragraph1}
            </motion.p>

            <motion.p variants={paragraphVariants} className="whitespace-pre-line font-medium text-gray-900 leading-loose">
              {t.presentation.paragraph2}
            </motion.p>

            <motion.p variants={paragraphVariants} className="whitespace-pre-line font-medium text-gray-900 leading-loose">
              {t.presentation.paragraph3}
            </motion.p>

            <motion.p variants={paragraphVariants} className="whitespace-pre-line font-medium text-gray-900 leading-loose">
              {t.presentation.paragraph4}
            </motion.p>

            <motion.p variants={paragraphVariants} className="font-bold text-purple-950 whitespace-pre-line leading-loose">
              {t.presentation.paragraph5}
            </motion.p>

            {/* Signature & Décoration de fin */}
            <motion.div variants={paragraphVariants} className="pt-4 flex flex-col items-start space-y-2">
              <span className="font-serif italic text-3xl sm:text-4xl text-purple-950 font-bold opacity-90 pl-4">
                {t.presentation.sign}
              </span>
              
              <div className="w-full flex items-center justify-start pt-2 opacity-60">
                <div className="h-[1px] w-32 bg-purple-400" />
                <Sparkles className="w-4 h-4 text-purple-600 mx-2" />
                <div className="h-[1px] w-32 bg-purple-400" />
              </div>
            </motion.div>
            </motion.div>
                      </div>
                      </div>
                      </section>
                        );
}




