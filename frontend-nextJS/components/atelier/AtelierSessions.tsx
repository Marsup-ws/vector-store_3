'use client';

import React from 'react';
import Image from 'next/image';
import { WorkshopSession, WORKSHOP_SESSIONS } from './AtelierCalendar';
import { useApp } from '@/context/AppContext';

interface AtelierSessionsProps {
  selectedSession: WorkshopSession;
  onSelectSession: (session: WorkshopSession) => void;
}

export function AtelierSessions({ selectedSession, onSelectSession }: AtelierSessionsProps) {
  const { t } = useApp();

  return (
    <div className="atelier-col atelier-col-sessions">
      <div className="atelier-card atelier-sessions-card">
        <div className="atelier-card-header">
          <div className="atelier-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          </div>
          <h2 className="atelier-card-title">{t.atelierPage.upcomingTitle}</h2>
        </div>

        <div className="sessions-list">
          {WORKSHOP_SESSIONS.map((session) => {
            const isSelected = selectedSession.id === session.id;

            return (
              <div
                key={session.id}
                className={`session-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectSession(session)}
              >
                <div className="session-card-img-wrapper">
                  <Image
                    src={session.image}
                    alt={session.title}
                    width={100}
                    height={100}
                    className="session-card-img"
                    unoptimized
                  />
                </div>

                <div className="session-card-content">
                  <h3 className="session-title">{session.title}</h3>
                  <p className="session-subtitle">{session.subtitle}</p>

                  <div className="session-meta">
                    <div className="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{session.dateStr}</span>
                    </div>

                    <div className="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{session.time}</span>
                    </div>
                  </div>

                  <div className="session-bottom-bar">
                    <span className="session-spots-badge">
                      {session.spots} {t.atelierPage.spotsAvailable}
                    </span>
                    <span className="session-price">{session.price.toFixed(2)} €</span>
                    <button
                      type="button"
                      className={`session-reserve-btn ${isSelected ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSession(session);
                      }}
                    >
                      {isSelected ? t.atelierPage.selectBtn : t.atelierPage.reserveBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM VIEW ALL SESSIONS BUTTON */}
        <button className="atelier-view-all-btn" type="button">
          <span>{t.atelierPage.viewAllSessions}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
