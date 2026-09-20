'use client';

import React from 'react';
import Image from 'next/image';
import { StudioPortfolio } from '@/components/StudioPortfolio';
import { StudioDevisForm } from '@/components/StudioDevisForm';
import { useApp } from '@/context/AppContext';

export default function StudioPage() {
  const { t } = useApp();

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HERO BANNER */}
      <div className="studio-hero-banner">
        {/* LEFT DISPLAY MOCKUP IMAGE */}
        <div className="studio-hero-left">
          <Image
            src="/drawing_on_tablet.png"
            alt="Écran Studio Graphique"
            width={220}
            height={140}
            className="studio-hero-mockup-img"
            unoptimized
          />
        </div>

        {/* CENTER TITLE & SUBTITLE */}
        <div className="studio-hero-center">
          <h1 className="studio-hero-title">{t.studioPage.heroTitle}</h1>
          <p className="studio-hero-tagline">
            {t.studioPage.heroTagline}
          </p>
          <div className="studio-hero-sparkle">✦</div>
          <p className="studio-hero-desc" style={{ whiteSpace: 'pre-line' }}>
            {t.studioPage.heroDesc}
          </p>
        </div>

        {/* RIGHT NOTEBOOK DECOR IMAGE */}
        <div className="studio-hero-right">
          <Image
            src="/digital_assets_mockup.png"
            alt="Carnet de design Studio"
            width={180}
            height={140}
            className="studio-hero-decor-img"
            unoptimized
          />
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: PORTFOLIO & GUARANTEES (LEFT) | DEMANDE DE DEVIS (RIGHT) */}
      <div className="studio-layout-grid">
        <StudioPortfolio />
        <StudioDevisForm />
      </div>

    </div>
  );
}
