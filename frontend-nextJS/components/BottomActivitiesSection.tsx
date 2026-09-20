import { Mail, Calendar, Hourglass, Phone } from 'lucide-react';
import { TranslationContent, ActiveModal } from '../utils/types';

export interface BottomActivitiesSectionProps {
  t: TranslationContent;
  highlightedCard: string | null;
  setActiveModal: (modal: ActiveModal) => void;
}

export default function BottomActivitiesSection({ t, highlightedCard, setActiveModal }: BottomActivitiesSectionProps) {
  return (
    <section className="grid-row-2">
      {/* Studio Graphique */}
      <div id="studio-card" className={`activity-card theme-purple ${highlightedCard === 'studio' ? 'highlight-pulse' : ''}`}>
        <div className="card-header-badge">
          <span className="dot purple"></span>
          <span>{t.studio.badge}</span>
        </div>
        <div className="studio-layout">
          <div className="studio-img-box">
            <img src="/drawing_on_tablet.png" alt="Graphic Design Tablet" className="card-img" />
          </div>
          <div className="studio-info">
            <div>
              <h4 className="studio-title">{t.studio.direction}</h4>
              <p className="studio-subtitle">{t.studio.subtitle}</p>
              <ul className="studio-list">
                <li>{t.studio.bullet1}</li>
                <li>{t.studio.bullet2}</li>
                <li>{t.studio.bullet3}</li>
              </ul>
            </div>
            <button className="card-btn" onClick={() => setActiveModal('devis')}>
              <Mail size={14} />
              <span>{t.studio.btn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ateliers & Événements */}
      <div id="ateliers-card" className={`activity-card theme-orange ${highlightedCard === 'ateliers' ? 'highlight-pulse' : ''}`}>
        <div className="card-header-badge">
          <span className="dot orange"></span>
          <span>{t.ateliers.badge}</span>
        </div>
        <div className="ateliers-container">
          {/* Atelier #1 */}
          <div className="atelier-subcard">
            <div>
              <div className="atelier-meta">
                <Calendar size={12} />
                <span>{t.ateliers.atelier1.title}</span>
              </div>
              <div className="atelier-img-box">
                <img src="/sublimation_press.png" alt="Sublimation Press" className="card-img" />
              </div>
              <p className="atelier-desc">{t.ateliers.atelier1.desc}</p>
            </div>
            <button className="atelier-btn" onClick={() => setActiveModal('workshop')}>
              <Hourglass size={12} />
              <span>{t.ateliers.atelier1.btn}</span>
            </button>
          </div>

          {/* Event #2 */}
          <div className="atelier-subcard">
            <div>
              <div className="atelier-meta">
                <Calendar size={12} />
                <span>{t.ateliers.event2.title}</span>
              </div>
              <div className="atelier-img-box">
                <img src="/artisan_gathering.png" alt="Artisans Gathering" className="card-img" />
              </div>
              <p className="atelier-desc">{t.ateliers.event2.desc}</p>
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="atelier-btn" 
              style={{ textDecoration: 'none' }}
            >
              <Phone size={12} />
              <span>{t.ateliers.event2.btn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
