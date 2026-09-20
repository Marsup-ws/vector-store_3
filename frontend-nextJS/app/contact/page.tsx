'use client';

import React from 'react';
import Image from 'next/image';
import { ContactForm } from '@/components/ContactForm';
import { ContactInfo } from '@/components/ContactInfo';
import { ContactMap } from '@/components/ContactMap';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { t } = useApp();

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      
      {/* HERO BANNER */}
      <div className="contact-hero-banner">
        {/* LEFT MOCKUP VISUAL */}
        <div className="contact-hero-left">
          <Image
            src="/mug_vector_flame.png"
            alt="Mug & Décoration"
            width={220}
            height={140}
            className="contact-hero-mockup-img"
            unoptimized
          />
        </div>

        {/* CENTER TITLE & SUBTITLE */}
        <div className="contact-hero-center">
          <h1 className="contact-hero-title">{t.contactPage.heroTitle}</h1>
          <div className="contact-hero-sparkle">✦</div>
          <p className="contact-hero-subtitle">{t.contactPage.heroSubtitle}</p>
          <p className="contact-hero-subtext">{t.contactPage.heroSubtext}</p>
        </div>

        {/* RIGHT LOTUS ARTWORK */}
        <div className="contact-hero-right">
          <Image
            src="/lotus-logo.png"
            alt="Lotus Illustration"
            width={180}
            height={140}
            className="contact-hero-lotus-img"
            unoptimized
          />
        </div>
      </div>

      {/* 3-COLUMN LAYOUT: FORM (LEFT) + INFO/SOCIAL (CENTER) + MAP (RIGHT) */}
      <div className="contact-layout-grid">
        <ContactForm />
        <ContactInfo />
        <ContactMap />
      </div>

      {/* BOTTOM TRUST / FEATURES BAR */}
      <div className="contact-trust-bar">
        {/* ITEM 1 */}
        <div className="contact-trust-card">
          <div className="contact-trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="contact-trust-text">
            <span className="contact-trust-title">{t.contactPage.trust1Title}</span>
            <span className="contact-trust-desc">
              {t.contactPage.trust1Desc}
            </span>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="contact-trust-card">
          <div className="contact-trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="contact-trust-text">
            <span className="contact-trust-title">{t.contactPage.trust2Title}</span>
            <span className="contact-trust-desc">
              {t.contactPage.trust2Desc}
            </span>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="contact-trust-card">
          <div className="contact-trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <div className="contact-trust-text">
            <span className="contact-trust-title">{t.contactPage.trust3Title}</span>
            <span className="contact-trust-desc">
              {t.contactPage.trust3Desc}
            </span>
          </div>
        </div>

        {/* ITEM 4 */}
        <div className="contact-trust-card">
          <div className="contact-trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <div className="contact-trust-text">
            <span className="contact-trust-title">{t.contactPage.trust4Title}</span>
            <span className="contact-trust-desc">
              {t.contactPage.trust4Desc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
