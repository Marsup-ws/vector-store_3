'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';

export interface WorkshopSession {
  id: string;
  title: string;
  subtitle: string;
  dateStr: string;
  dayNumber: number;
  month: string;
  year: number;
  time: string;
  spots: number;
  price: number;
  image: string;
  category: 'sublimation' | 'design' | 'evenements';
  badgeColor: string;
}

export const WORKSHOP_SESSIONS: WorkshopSession[] = [
  {
    id: 'w1',
    title: 'Initiation Sublimation',
    subtitle: 'Créez votre mug personnalisé',
    dateStr: 'Samedi 16 Mai 2026',
    dayNumber: 16,
    month: 'Mai',
    year: 2026,
    time: '14h00 – 17h00',
    spots: 5,
    price: 49.00,
    image: '/mug_vector_flame.png',
    category: 'sublimation',
    badgeColor: 'green',
  },
  {
    id: 'w2',
    title: 'Totebag Créatif',
    subtitle: 'Personnalisez votre totebag',
    dateStr: 'Samedi 23 Mai 2026',
    dayNumber: 23,
    month: 'Mai',
    year: 2026,
    time: '14h00 – 17h00',
    spots: 7,
    price: 45.00,
    image: '/product/zvect (1).jpeg',
    category: 'design',
    badgeColor: 'blue',
  },
  {
    id: 'w3',
    title: 'Design & Inspiration',
    subtitle: 'Créez votre univers visuel',
    dateStr: 'Samedi 30 Mai 2026',
    dayNumber: 30,
    month: 'Mai',
    year: 2026,
    time: '14h00 – 17h00',
    spots: 6,
    price: 55.00,
    image: '/drawing_on_tablet.png',
    category: 'evenements',
    badgeColor: 'orange',
  },
];

interface AtelierCalendarProps {
  selectedSession: WorkshopSession;
  onSelectSession: (session: WorkshopSession) => void;
}

export function AtelierCalendar({ selectedSession, onSelectSession }: AtelierCalendarProps) {
  const { t } = useApp();
  const [currentMonth, setCurrentMonth] = useState('Mai 2026');

  // Days for May 2026 calendar view
  // April 27 - May 31 grid
  const daysGrid = [
    { day: 27, currentMonth: false },
    { day: 28, currentMonth: false },
    { day: 29, currentMonth: false },
    { day: 30, currentMonth: false },
    { day: 1, currentMonth: true },
    { day: 2, currentMonth: true },
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true },
    { day: 9, currentMonth: true },
    { day: 10, currentMonth: true },
    { day: 11, currentMonth: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true },
    { day: 16, currentMonth: true, event: 'sublimation', sessionId: 'w1' },
    { day: 17, currentMonth: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true, event: 'design', sessionId: 'w2' },
    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true, event: 'evenements', sessionId: 'w3' },
    { day: 31, currentMonth: true },
  ];

  const handleDayClick = (sessionId?: string) => {
    if (sessionId) {
      const session = WORKSHOP_SESSIONS.find((s) => s.id === sessionId);
      if (session) {
        onSelectSession(session);
      }
    }
  };

  return (
    <div className="atelier-col atelier-col-calendar">
      {/* CALENDAR CARD */}
      <div className="atelier-card atelier-calendar-card">
        <div className="atelier-card-header">
          <div className="atelier-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h2 className="atelier-card-title">{t.atelierPage.calendarTitle}</h2>
        </div>

        {/* CALENDAR CONTROLS */}
        <div className="calendar-top-controls">
          <span className="calendar-month-name">{currentMonth}</span>
          <button className="calendar-today-btn" onClick={() => setCurrentMonth('Mai 2026')}>
            {t.atelierPage.todayBtn}
          </button>
        </div>

        {/* DAYS OF WEEK HEADER */}
        <div className="calendar-weekdays">
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>J</span>
          <span>V</span>
          <span>S</span>
          <span>D</span>
        </div>

        {/* DAYS GRID */}
        <div className="calendar-days-grid">
          {daysGrid.map((item, idx) => {
            const isSelected = selectedSession.dayNumber === item.day && item.currentMonth;
            let dotClass = '';
            if (item.event === 'sublimation') dotClass = 'dot-indicator green-dot';
            if (item.event === 'design') dotClass = 'dot-indicator blue-dot';
            if (item.event === 'evenements') dotClass = 'dot-indicator orange-dot';

            return (
              <button
                key={idx}
                type="button"
                className={`calendar-day-cell ${!item.currentMonth ? 'other-month' : ''} ${
                  isSelected ? 'selected' : ''
                } ${item.event ? 'has-event' : ''}`}
                onClick={() => handleDayClick(item.sessionId)}
              >
                <span className="day-number">{item.day}</span>
                {item.event && <span className={dotClass} />}
              </button>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="dot-indicator green-dot" />
            <span>{t.atelierPage.legendSublimation}</span>
          </div>
          <div className="legend-item">
            <span className="dot-indicator blue-dot" />
            <span>{t.atelierPage.legendDesign}</span>
          </div>
          <div className="legend-item">
            <span className="dot-indicator orange-dot" />
            <span>{t.atelierPage.legendEvents}</span>
          </div>
        </div>
      </div>

      {/* LOCATION BOX */}
      <div className="atelier-card atelier-location-card">
        <h3 className="location-card-title">{t.atelierPage.locationTitle}</h3>
        <div className="location-card-body">
          <div className="location-text">
            <strong className="studio-name">Evgueniia_Vector Studio</strong>
            <p className="studio-address">
              12 Rue du Languedoc,<br />
              31770 Colomiers, France
            </p>
          </div>
          <div className="location-thumb">
            <Image
              src="/artisan_gathering.png"
              alt="Atelier Studio"
              width={140}
              height={100}
              className="location-img"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
