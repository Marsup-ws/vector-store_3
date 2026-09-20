'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Product } from '../../utils/types';
import productsDataRaw from '../../utils/data/products.json';
import { StoreFilter } from '../../components/StoreFilter';
import { StoreItems } from '../../components/StoreItems';
import { useApp } from '../../context/AppContext';

const fallbackProductsData = productsDataRaw as unknown as Product[];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function StorePage() {
  const { t } = useApp();
  const [products, setProducts] = useState<Product[]>(fallbackProductsData);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'physique' | 'numerique'>('physique');
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(['artisanat']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recent');

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.warn('Backend API unavailable, using fallback dataset:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleOrigin = (origin: string) => {
    setSelectedOrigins((prev) =>
      prev.includes(origin) ? prev.filter((o) => o !== origin) : [...prev, origin]
    );
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSelectedOrigins([]);
    setSelectedCategories([]);
    setSortBy('recent');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.type === activeTab)
      .filter((product) => {
        if (selectedOrigins.length === 0) return true;
        return product.origin && selectedOrigins.includes(product.origin);
      })
      .filter((product) => {
        if (selectedCategories.length === 0) return true;
        return product.category && selectedCategories.includes(product.category);
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-az') {
          const titleA = a.title || a.name;
          const titleB = b.title || b.name;
          return titleA.localeCompare(titleB);
        }
        return 0;
      });
  }, [products, activeTab, selectedOrigins, selectedCategories, sortBy]);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      {/* HEADER BANNER */}
      <div className="store-hero-banner">
        <div className="store-hero-bg-art">
          <Image src="/lotus-logo.png" alt="Lotus" width={500} height={500} unoptimized />
        </div>
        <h1 className="store-hero-title">{t.storePage.heroTitle}</h1>
        <p className="store-hero-subtitle">{t.storePage.heroSubtitle}</p>
        <div className="store-hero-tags">
          <span>{t.storePage.heroTags}</span>
        </div>
      </div>

      {/* TOP TABS: PRODUITS PHYSIQUES vs PRODUITS NUMÉRIQUES */}
      <div className="store-tabs-container">
        <button
          className={`store-tab-btn ${activeTab === 'physique' ? 'active-physical' : ''}`}
          onClick={() => setActiveTab('physique')}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
          </svg>
          <span>{t.storePage.tabPhysical}</span>
        </button>

        <button
          className={`store-tab-btn ${activeTab === 'numerique' ? 'active-digital' : ''}`}
          onClick={() => setActiveTab('numerique')}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>{t.storePage.tabDigital}</span>
        </button>
      </div>

      {/* TWO-COLUMN LAYOUT: STORE-FILTER (LEFT) + STORE-ITEMS (RIGHT) */}
      <div className="store-layout-grid">
        <StoreFilter
          selectedOrigins={selectedOrigins}
          onToggleOrigin={handleToggleOrigin}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onResetFilters={handleResetFilters}
        />

        <StoreItems
          products={filteredProducts}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* BOTTOM TRUST / ADVANTAGES BAR */}
      <div className="store-trust-bar">
        <div className="trust-card">
          <div className="trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <div className="trust-text">
            <span className="trust-title">{t.storePage.trust1Title}</span>
            <span className="trust-desc">{t.storePage.trust1Desc}</span>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="trust-text">
            <span className="trust-title">{t.storePage.trust2Title}</span>
            <span className="trust-desc">{t.storePage.trust2Desc}</span>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="trust-text">
            <span className="trust-title">{t.storePage.trust3Title}</span>
            <span className="trust-desc">{t.storePage.trust3Desc}</span>
          </div>
        </div>

        <div className="trust-card">
          <div className="trust-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <div className="trust-text">
            <span className="trust-title">{t.storePage.trust4Title}</span>
            <span className="trust-desc">{t.storePage.trust4Desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
