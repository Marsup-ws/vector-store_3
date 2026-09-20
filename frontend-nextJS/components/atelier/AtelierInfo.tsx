'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export function AtelierInfo() {
  const { t } = useApp();

  return (
    <div className="atelier-col atelier-col-info">
      {/* WHY BOOK ONLINE CARD */}
      <div className="atelier-card atelier-why-card">
        <h3 className="why-card-title">{t.atelierPage.whyTitle}</h3>

        <ul className="why-list">
          <li className="why-item">
            <div className="why-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>{t.atelierPage.why1}</span>
          </li>

          <li className="why-item">
            <div className="why-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <span>{t.atelierPage.why2}</span>
          </li>

          <li className="why-item">
            <div className="why-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span>{t.atelierPage.why3}</span>
          </li>

          <li className="why-item">
            <div className="why-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span>{t.atelierPage.why4}</span>
          </li>

          <li className="why-item">
            <div className="why-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <span>{t.atelierPage.why5}</span>
          </li>
        </ul>
      </div>

      {/* SPECIAL OFFER CARD */}
      <div className="atelier-card atelier-promo-card">
        <h4 className="promo-title">{t.atelierPage.promoTitle}</h4>
        <div className="promo-discount">-10%</div>
        <p className="promo-subtext">{t.atelierPage.promoSubtext}</p>
      </div>
    </div>
  );
}
