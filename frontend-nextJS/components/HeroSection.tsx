import { ShoppingBag, FileText } from 'lucide-react';
import { TranslationContent, ActiveModal } from '@/utils/types';

export interface HeroSectionProps {
  t: TranslationContent;
  handleNavClick: (sectionId: string, cardKey: string) => void;
  setActiveModal: (modal: ActiveModal) => void;
}

export default function HeroSection({ t, handleNavClick, setActiveModal }: HeroSectionProps) {
  return (
    <section className="hero-card" style={{ marginTop: '1.5rem' }}>
      <div className="hero-layout">
        <div className="hero-img-container">
          <img src="/hero_left.png" alt="Crafting" className="hero-img" />
        </div>

        <div className="hero-center">
          <h1 className="cinzel-title hero-title-gradient">{t.hero.title}</h1>
          <p className="hero-tagline">{t.hero.tagline}</p>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => handleNavClick('activities-grid', 'artisanat')}>
              <ShoppingBag size={18} />
              <span>{t.hero.btnExplore}</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveModal('doc1')}>
              <FileText size={18} />
              <span>{t.hero.btnDoc}</span>
            </button>
          </div>
        </div>

        <div className="hero-img-container">
          <img src="/hero_right.png" alt="Cozy Workspace" className="hero-img" />
        </div>
      </div>
    </section>
  );
}
