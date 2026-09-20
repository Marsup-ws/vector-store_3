import { FormEvent } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { TranslationContent, ActiveModal } from '@/utils/types';;

export interface ModalsProps {
  activeModal: ActiveModal;
  setActiveModal: (modal: ActiveModal) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>, successMsg: string) => void;
  t: TranslationContent;
}

export default function Modals({ activeModal, setActiveModal, handleFormSubmit, t }: ModalsProps) {
  if (!activeModal) return null;

  return (
    <>
      {/* Quote / Devis Modal */}
      {activeModal === 'devis' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t.devisModal.title}</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleFormSubmit(e, t.devisModal.success)}>
                <div className="form-group">
                  <label className="form-label">{t.devisModal.name}</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.devisModal.email}</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.devisModal.projectType}</label>
                  <input type="text" className="form-input" placeholder={t.devisModal.projectTypePlaceholder} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.devisModal.message}</label>
                  <textarea className="form-textarea" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>{t.devisModal.submit}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Workshop Signup Modal */}
      {activeModal === 'workshop' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{t.workshopModal.title}</h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleFormSubmit(e, t.workshopModal.success)}>
                <div className="form-group">
                  <label className="form-label">{t.workshopModal.name}</label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.workshopModal.email}</label>
                  <input type="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.workshopModal.date}</label>
                  <input type="date" className="form-input" required defaultValue="2026-07-15" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.workshopModal.notes}</label>
                  <textarea className="form-textarea"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>{t.workshopModal.submit}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Lightbox Modals */}
      {['doc1', 'doc2', 'doc3', 'doc4'].includes(activeModal) && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }} 
              onClick={() => setActiveModal(null)}
            >
              <X size={20} />
            </button>
            <div className="lightbox-seal">
              <ShieldCheck size={40} />
            </div>
            <h3 className="lightbox-title">{t.docLightbox.certTitle}</h3>
            <p className="lightbox-subtitle">{t.docLightbox.certSubtitle}</p>
            <div className="lightbox-divider"></div>
            <p className="lightbox-text">{t.docLightbox.text1}</p>
            <p className="lightbox-text">{t.docLightbox.text2}</p>
            <p className="lightbox-text" style={{ fontStyle: 'italic', color: '#64748b' }}>
              {t.docLightbox.text3} <strong>EG-2026-{
                activeModal === 'doc1' ? '1000102353' :
                activeModal === 'doc2' ? '1000102355' :
                activeModal === 'doc3' ? '1000102351' : '1000102359'
              }</strong>.
            </p>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '1rem' }} 
              onClick={() => setActiveModal(null)}
            >
              <span>{t.docLightbox.close || 'Fermer'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
