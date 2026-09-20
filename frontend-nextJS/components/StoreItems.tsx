'use client';

import React from 'react';
import { Product } from '@/utils/types';
import { StoreCardItem } from './StoreCardItem';
import { useApp } from '@/context/AppContext';

interface StoreItemsProps {
  products: Product[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters?: () => void;
}

export function StoreItems({
  products,
  sortBy,
  onSortChange,
  onResetFilters,
}: StoreItemsProps) {
  const { t } = useApp();

  return (
    <main className="store-items">
      {/* TOP CONTROL BAR */}
      <div className="store-items-topbar">
        <div className="store-items-sort-wrapper">
          <label htmlFor="sort-select" className="store-items-sort-label">
            {t.storePage.sortByLabel}
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="store-items-sort-select"
          >
            <option value="recent">{t.storePage.sortRecent}</option>
            <option value="price-asc">{t.storePage.sortPriceAsc}</option>
            <option value="price-desc">{t.storePage.sortPriceDesc}</option>
            <option value="name-az">{t.storePage.sortNameAZ}</option>
          </select>
        </div>

        <div className="store-items-count">
          {products.length} {products.length > 1 ? t.storePage.productsCountPlural : t.storePage.productsCount}
        </div>
      </div>

      {/* ITEMS GRID */}
      {products.length > 0 ? (
        <div className="store-items-grid">
          {products.map((product) => (
            <StoreCardItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="store-items-empty">
          <p>{t.storePage.emptyProducts}</p>
          {onResetFilters && (
            <button onClick={onResetFilters} className="store-items-empty-btn">
              {t.storePage.showAllProducts}
            </button>
          )}
        </div>
      )}
    </main>
  );
}
