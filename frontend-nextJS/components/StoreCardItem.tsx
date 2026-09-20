'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/utils/types';
import { useApp } from '../context/AppContext';

interface StoreCardItemProps {
  product: Product;
}

export function StoreCardItem({ product }: StoreCardItemProps) {
  const { addToCart, t } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const isGreenBadge = product.originBadgeColor === 'green' || product.origin === 'artisanat';
  const badgeClass = isGreenBadge ? 'dot-indicator green-dot' : 'dot-indicator blue-dot';
  const displayTitle = product.title || product.name;
  const displayImage = product.image || product.img || '/lotus_logo.png';

  return (
    <div className="card-item store-card-item">
      {/* BADGES & ACTIONS TOP BAR */}
      <div className="card-item-top-bar">
        <span className={badgeClass} title={product.originLabel || 'Origine'} />
        <button
          className={`card-item-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          type="button"
          aria-label={t.storePage.addToFav}
        >
          <svg viewBox="0 0 24 24" fill={isFavorite ? '#e53e3e' : 'none'} stroke={isFavorite ? '#e53e3e' : 'currentColor'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="card-item-img-container">
        {!imgError ? (
          <Image
            src={displayImage}
            alt={displayTitle}
            width={300}
            height={260}
            className="card-item-img"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="card-item-img-fallback">
            <Image src="/lotus_logo.png" alt="Evgueniia Vector" width={80} height={80} unoptimized />
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="card-item-body">
        <h4 className="card-item-title">{displayTitle}</h4>
        <div className="card-item-price">
          {product.price.toFixed(2)} €
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="card-item-add-btn"
          type="button"
        >
          <svg className="cart-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          <span>{t.storePage.addToCart}</span>
        </button>
      </div>
    </div>
  );
}
