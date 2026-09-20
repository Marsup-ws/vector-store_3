import { ShieldCheck, FileText } from 'lucide-react';
import { TranslationContent, ActiveModal } from '../utils/types';

export interface CertificationsSectionProps {
  t: TranslationContent;
  setActiveModal: (modal: ActiveModal) => void;
}

export default function CertificationsSection({ t, setActiveModal }: CertificationsSectionProps) {
  return (
    <section className="cert-bar">
      <div className="cert-left">
        <div className="cert-icon-container">
          <ShieldCheck size={24} />
        </div>
        <p className="cert-text">{t.cert.text}</p>
      </div>

      <div className="docs-section">
        <h5 className="docs-title">{t.cert.title}</h5>
        <div className="docs-grid">
          <button className="doc-link" onClick={() => setActiveModal('doc1')}>
            <FileText size={14} />
            <span>1000102353.jpg</span>
          </button>
          <button className="doc-link" onClick={() => setActiveModal('doc2')}>
            <FileText size={14} />
            <span>1000102355.jpg</span>
          </button>
          <button className="doc-link" onClick={() => setActiveModal('doc3')}>
            <FileText size={14} />
            <span>1000102351.jpg</span>
          </button>
          <button className="doc-link" onClick={() => setActiveModal('doc4')}>
            <FileText size={14} />
            <span>1000102359.jpg</span>
          </button>
        </div>
      </div>
    </section>
  );
}
