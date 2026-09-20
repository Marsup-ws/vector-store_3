'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AtelierCalendar, WORKSHOP_SESSIONS, WorkshopSession } from '@/components/atelier/AtelierCalendar';
import { AtelierSessions } from '@/components/atelier/AtelierSessions';
import { AtelierBooking } from '@/components/atelier/AtelierBooking';
import { AtelierInfo } from '@/components/atelier/AtelierInfo';
import { useApp } from '@/context/AppContext';

export default function AtelierPage() {
  const { t } = useApp();
  const [selectedSession, setSelectedSession] = useState<WorkshopSession>(WORKSHOP_SESSIONS[0]);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HERO BANNER */}
      <div className="atelier-hero-banner">
        {/* LEFT MOCKUP IMAGE */}
        <div className="atelier-hero-left">
          <Image
            src="/sublimation_press.png"
            alt="Presse à sublimation"
            width={220}
            height={140}
            className="atelier-hero-mockup-img"
            unoptimized
          />
        </div>

        {/* CENTER TITLE & SUBTITLE */}
        <div className="atelier-hero-center">
          <h1 className="atelier-hero-title">{t.atelierPage.heroTitle}</h1>
          <p className="atelier-hero-tagline">{t.atelierPage.heroTagline}</p>
          <div className="atelier-hero-sparkle">✦</div>
          <p className="atelier-hero-desc">
            {t.atelierPage.heroDesc}
          </p>
        </div>

        {/* RIGHT DECOR IMAGE */}
        <div className="atelier-hero-right">
          <Image
            src="/hero_right.png"
            alt="Décoration Bougie et Fleurs"
            width={180}
            height={140}
            className="atelier-hero-decor-img"
            unoptimized
          />
        </div>
      </div>

      {/* 4-COLUMN LAYOUT: CALENDAR (LEFT) | SESSIONS (CENTER-LEFT) | BOOKING (CENTER-RIGHT) | INFO (RIGHT) */}
      <div className="atelier-layout-grid">
        {/* COL 1: CALENDAR & LOCATION */}
        <AtelierCalendar
          selectedSession={selectedSession}
          onSelectSession={setSelectedSession}
        />

        {/* COL 2: UPCOMING SESSIONS */}
        <AtelierSessions
          selectedSession={selectedSession}
          onSelectSession={setSelectedSession}
        />

        {/* COL 3: BOOKING & PAYMENT */}
        <AtelierBooking selectedSession={selectedSession} />

        {/* COL 4: WHY BOOK & SPECIAL OFFER */}
        <AtelierInfo />
      </div>
    </div>
  );
}
