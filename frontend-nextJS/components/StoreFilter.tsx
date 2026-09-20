'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface StoreFilterProps {
  selectedOrigins: string[];
  onToggleOrigin: (origin: string) => void;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onResetFilters: () => void;
}

export function StoreFilter({
  selectedOrigins,
  onToggleOrigin,
  selectedCategories,
  onToggleCategory,
  onResetFilters,
}: StoreFilterProps) {
  const { t } = useApp();
  const [origineOpen, setOrigineOpen] = useState(true);
  const [categorieOpen, setCategorieOpen] = useState(true);

  return (
    <aside className="store-filter">
      <div className="store-filter-header">
        <h3>{t.storePage.filterTitle}</h3>
        {(selectedOrigins.length > 0 || selectedCategories.length > 0) && (
          <button onClick={onResetFilters} className="store-filter-reset-btn">
            {t.storePage.filterReset}
          </button>
        )}
      </div>

      {/* ORIGINE SECTION */}
      <div className="store-filter-section">
        <button
          className="store-filter-accordion-head"
          onClick={() => setOrigineOpen(!origineOpen)}
          type="button"
        >
          <span>{t.storePage.filterOrigin}</span>
          <span className={`accordion-arrow ${origineOpen ? 'open' : ''}`}>▼</span>
        </button>

        {origineOpen && (
          <div className="store-filter-options">
            {/* Artisanat */}
            <label className="store-filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedOrigins.includes('artisanat')}
                onChange={() => onToggleOrigin('artisanat')}
                className="store-checkbox"
              />
              <div className="store-filter-option-content">
                <div className="store-filter-option-title">
                  <span>{t.storePage.filterOriginArtisanat}</span>
                  <span className="dot-indicator green-dot" />
                </div>
                <span className="store-filter-option-desc">
                  {t.storePage.filterOriginArtisanatDesc}
                </span>
              </div>
            </label>

            {/* Sélection Partenaires */}
            <label className="store-filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedOrigins.includes('partenaires')}
                onChange={() => onToggleOrigin('partenaires')}
                className="store-checkbox"
              />
              <div className="store-filter-option-content">
                <div className="store-filter-option-title">
                  <span>{t.storePage.filterOriginPartenaires}</span>
                  <span className="dot-indicator blue-dot" />
                </div>
                <span className="store-filter-option-desc">
                  {t.storePage.filterOriginPartenairesDesc}
                </span>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* CATEGORIE SECTION */}
      <div className="store-filter-section">
        <button
          className="store-filter-accordion-head"
          onClick={() => setCategorieOpen(!categorieOpen)}
          type="button"
        >
          <span>{t.storePage.filterCategory}</span>
          <span className={`accordion-arrow ${categorieOpen ? 'open' : ''}`}>▼</span>
        </button>

        {categorieOpen && (
          <div className="store-filter-options">
            {/* Vêtements */}
            <label className="store-filter-checkbox-label category-item">
              <svg className="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
              <input
                type="checkbox"
                checked={selectedCategories.includes('vetements')}
                onChange={() => onToggleCategory('vetements')}
                className="store-checkbox"
              />
              <span>{t.storePage.filterCatVetements}</span>
            </label>

            {/* Mugs & Objets */}
            <label className="store-filter-checkbox-label category-item">
              <svg className="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
              <input
                type="checkbox"
                checked={selectedCategories.includes('mugs')}
                onChange={() => onToggleCategory('mugs')}
                className="store-checkbox"
              />
              <span>{t.storePage.filterCatMugs}</span>
            </label>

            {/* Supports Visuels */}
            <label className="store-filter-checkbox-label category-item">
              <svg className="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <input
                type="checkbox"
                checked={selectedCategories.includes('supports')}
                onChange={() => onToggleCategory('supports')}
                className="store-checkbox"
              />
              <span>{t.storePage.filterCatSupports}</span>
            </label>
          </div>
        )}
      </div>

      {/* LOCAL CRAFT CALLOUT CARD */}
      <div className="store-filter-craft-box">
        <div className="craft-box-icon-head">
          <svg className="craft-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="craft-box-title">{t.storePage.craftBoxTitle}</span>
        </div>
        <p className="craft-box-text">
          {t.storePage.craftBoxText}
        </p>
      </div>
    </aside>
  );
}
