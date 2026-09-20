'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import portfolioDataRaw from '@/utils/data/portfolio.json';
import { useApp } from '@/context/AppContext';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  image: string;
}

const portfolioData = portfolioDataRaw as PortfolioItem[];

export function StudioPortfolio() {
  const { t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [displayCount, setDisplayCount] = useState<number>(6);

  const categories = [
    { key: 'all', label: t.studioPage.catAll },
    { key: 'logos', label: t.studioPage.catLogos },
    { key: 'identite', label: t.studioPage.catIdentite },
    { key: 'reseaux', label: t.studioPage.catReseaux },
    { key: 'print', label: t.studioPage.catPrint },
    { key: 'illustrations', label: t.studioPage.catIllustrations },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return portfolioData;
    return portfolioData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = filteredItems.slice(0, displayCount);

  return (
    <div className="studio-portfolio-column">
      {/* MAIN PORTFOLIO CARD */}
      <div className="studio-card studio-portfolio-card">
        <div className="studio-card-header">
          <div className="studio-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          </div>
          <div>
            <h2 className="studio-card-title">{t.studioPage.portfolioTitle}</h2>
            <p className="studio-card-subtitle">
              {t.studioPage.portfolioSubtitle}
            </p>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="portfolio-tabs-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`portfolio-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.key);
                setDisplayCount(6);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PORTFOLIO GRID */}
        <div className="portfolio-grid">
          {visibleItems.map((item) => (
            <div key={item.id} className="portfolio-item-card">
              <div className="portfolio-img-container">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={340}
                  height={220}
                  className="portfolio-img"
                  unoptimized
                />
                <div className="portfolio-img-overlay">
                  <span className="portfolio-overlay-cat">{item.categoryLabel}</span>
                  <h4 className="portfolio-overlay-title">{item.title}</h4>
                  <p className="portfolio-overlay-sub">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEE MORE BUTTON */}
        {filteredItems.length > displayCount && (
          <button
            type="button"
            className="portfolio-more-btn"
            onClick={() => setDisplayCount((prev) => prev + 6)}
          >
            <span>{t.studioPage.seeMore}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* GUARANTEES / GAGES AT BOTTOM */}
      <div className="studio-guarantees-bar">
        {/* ITEM 1 */}
        <div className="guarantee-card">
          <div className="guarantee-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </div>
          <div className="guarantee-text">
            <span className="guarantee-title">{t.studioPage.guarantee1Title}</span>
            <span className="guarantee-desc">
              {t.studioPage.guarantee1Desc}
            </span>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="guarantee-card">
          <div className="guarantee-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="guarantee-text">
            <span className="guarantee-title">{t.studioPage.guarantee2Title}</span>
            <span className="guarantee-desc">
              {t.studioPage.guarantee2Desc}
            </span>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="guarantee-card">
          <div className="guarantee-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="guarantee-text">
            <span className="guarantee-title">{t.studioPage.guarantee3Title}</span>
            <span className="guarantee-desc">
              {t.studioPage.guarantee3Desc}
            </span>
          </div>
        </div>

        {/* ITEM 4 */}
        <div className="guarantee-card">
          <div className="guarantee-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <div className="guarantee-text">
            <span className="guarantee-title">{t.studioPage.guarantee4Title}</span>
            <span className="guarantee-desc">
              {t.studioPage.guarantee4Desc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
