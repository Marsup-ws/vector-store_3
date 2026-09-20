import { Star, ShoppingCart, Download } from 'lucide-react';
import { TranslationContent, Product } from '@/utils/types';

export interface TopActivitiesSectionProps {
  t: TranslationContent;
  highlightedCard: string | null;
  addToCart: (product: Product) => void;
  triggerDownload: (fileName: string) => void;
}

export default function TopActivitiesSection({ t, highlightedCard, addToCart, triggerDownload }: TopActivitiesSectionProps) {
  return (
    <section className="grid-row-1" id="activities-grid">
      {/* Artisanat */}
      <div className={`activity-card theme-green ${highlightedCard === 'artisanat' ? 'highlight-pulse' : ''}`}>
        <div className="card-header-badge">
          <span className="dot green"></span>
          <span>{t.artisanat.badge}</span>
        </div>
        <div className="card-content-layout">
          <div className="card-image-box">
            <img src="/mug_vector_flame.png" alt="Mug Vector Flame" className="card-img" />
          </div>
          <div className="card-info">
            <div>
              <div className="star-tag">
                <Star size={12} fill="currentColor" />
                <span>{t.artisanat.tag}</span>
              </div>
              <h3 className="card-title">{t.artisanat.name}</h3>
            </div>
            <div>
              <p className="card-price">{t.artisanat.price}</p>
              <button 
                className="card-btn"
                onClick={() => addToCart({ id: 'mug', name: t.artisanat.name, price: 19.00, img: '/mug_vector_flame.png' })}
              >
                <ShoppingCart size={14} />
                <span>{t.artisanat.btn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Commerce / Marketplace */}
      <div className={`activity-card theme-blue ${highlightedCard === 'commerce' ? 'highlight-pulse' : ''}`}>
        <div className="card-header-badge">
          <span className="dot blue"></span>
          <span>{t.commerce.badge}</span>
        </div>
        <div className="card-content-layout">
          <div className="card-image-box">
            <img src="/hoodie_streetwear.png" alt="Hoodie Toulouse" className="card-img" />
          </div>
          <div className="card-info">
            <div>
              <div className="star-tag">
                <Star size={12} fill="currentColor" />
                <span>{t.commerce.tag}</span>
              </div>
              <h3 className="card-title">{t.commerce.name}</h3>
            </div>
            <div>
              <p className="card-price">{t.commerce.price}</p>
              <button 
                className="card-btn"
                onClick={() => addToCart({ id: 'hoodie', name: t.commerce.name, price: 49.90, img: '/hoodie_streetwear.png' })}
              >
                <ShoppingCart size={14} />
                <span>{t.commerce.btn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital */}
      <div className="activity-card theme-purple">
        <div className="card-header-badge">
          <span className="dot purple"></span>
          <span>{t.digital.badge}</span>
        </div>
        <div className="card-content-layout" style={{ position: 'relative' }}>
          <div className="formats-overlay">{t.digital.formats}</div>
          <div className="card-image-box">
            <img src="/digital_assets_mockup.png" alt="Digital Mockups" className="card-img" />
          </div>
          <div className="card-info">
            <div>
              <div className="star-tag">
                <Star size={12} fill="currentColor" />
                <span>{t.digital.tag}</span>
              </div>
              <h3 className="card-title">{t.digital.name}</h3>
            </div>
            <div>
              <p className="card-price">{t.digital.price}</p>
              <button 
                className="card-btn"
                onClick={() => triggerDownload('Urban_Toulouse_Assets.zip')}
              >
                <Download size={14} />
                <span>{t.digital.btn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
