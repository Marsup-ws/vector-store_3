'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

export function ContactInfo() {
  const { t } = useApp();

  return (
    <div className="contact-info-column">
      {/* COORDONNEES CARD */}
      <div className="contact-card contact-info-card">
        <div className="contact-card-header">
          <div className="contact-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2 className="contact-card-title">{t.contactPage.infoTitle}</h2>
        </div>

        <div className="contact-info-list">
          {/* E-MAIL */}
          <div className="contact-info-item">
            <div className="contact-item-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="contact-item-details">
              <span className="contact-item-label">{t.contactPage.infoEmailLabel}</span>
              <a href="mailto:contact@evgueniia-vector.fr" className="contact-item-value link">
                contact@evgueniia-vector.fr
              </a>
            </div>
          </div>

          {/* TELEPHONE */}
          <div className="contact-info-item">
            <div className="contact-item-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="contact-item-details">
              <span className="contact-item-label">{t.contactPage.infoPhoneLabel}</span>
              <a href="tel:+33612345678" className="contact-item-value link">
                +33 6 12 34 56 78
              </a>
            </div>
          </div>

          {/* ADRESSE */}
          <div className="contact-info-item">
            <div className="contact-item-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="contact-item-details">
              <span className="contact-item-label">{t.contactPage.infoAddressLabel}</span>
              <span className="contact-item-value">
                12 Rue du Languedoc<br />
                31770 Colomiers, France
              </span>
            </div>
          </div>

          {/* HORAIRES */}
          <div className="contact-info-item">
            <div className="contact-item-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="contact-item-details">
              <span className="contact-item-label">{t.contactPage.infoHoursLabel}</span>
              <span className="contact-item-value" style={{ whiteSpace: 'pre-line' }}>
                {t.contactPage.infoHoursValue}<br />
                <small className="subtext">{t.contactPage.infoHoursSub}</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUIVEZ-MOI SOCIAL CARD */}
      <div className="contact-card contact-social-card">
        <h3 className="contact-card-title sm">{t.contactPage.socialTitle}</h3>
        <p className="contact-card-subtitle">{t.contactPage.socialSubtitle}</p>

        <div className="contact-social-buttons">
          {/* INSTAGRAM */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="contact-social-btn"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* TIKTOK */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="contact-social-btn"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.36a6.34 6.34 0 00-1-.08 6.34 6.34 0 106.34 6.34V8.45a8.2 8.2 0 004.92 1.62V6.69z" />
            </svg>
          </a>

          {/* PINTEREST */}
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="contact-social-btn"
            aria-label="Pinterest"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
            </svg>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="contact-social-btn"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
