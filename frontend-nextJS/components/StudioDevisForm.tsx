'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

export function StudioDevisForm() {
  const { addToast, t } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    privacyAccepted: false,
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.projectType) {
      addToast(t.devisModal.projectTypePlaceholder, 'error');
      return;
    }

    if (!formData.privacyAccepted) {
      addToast(t.studioPage.privacyText, 'error');
      return;
    }

    const fileNamesStr = attachedFiles.length > 0
      ? attachedFiles.map((f) => f.name).join(', ')
      : 'Aucun fichier joint';

    const mailtoSubject = encodeURIComponent(`[Demande de Devis Studio] ${formData.projectType} - ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `DEMANDE DE DEVIS STUDIO GRAPHIQUE\n` +
      `-----------------------------------\n` +
      `Nom et Prénom: ${formData.name}\n` +
      `Entreprise: ${formData.company || 'Non précisé'}\n` +
      `E-mail: ${formData.email}\n` +
      `Téléphone: ${formData.phone || 'Non précisé'}\n` +
      `Type de projet: ${formData.projectType}\n\n` +
      `Description du projet:\n${formData.description || 'Aucune description'}\n\n` +
      `Fichiers joints prévus (${attachedFiles.length}): ${fileNamesStr}`
    );

    // Target zenia-vector@gmail.com
    window.location.href = `mailto:zenia-vector@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
    addToast(t.studioPage.successMsg, 'success');
  };

  return (
    <div className="studio-card studio-devis-card">
      <div className="studio-card-header">
        <div className="studio-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div>
          <h2 className="studio-card-title">{t.studioPage.devisTitle}</h2>
          <p className="studio-card-subtitle">
            {t.studioPage.devisSubtitle}
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="devis-form-success">
          <div className="success-icon-box">✓</div>
          <h3>{t.studioPage.successTitle}</h3>
          <p>
            {t.studioPage.successMsg}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                projectType: '',
                description: '',
                privacyAccepted: false,
              });
              setAttachedFiles([]);
            }}
            className="devis-reset-btn"
          >
            {t.studioPage.resetBtn}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="devis-form">
          {/* ROW 1: NOM & ENTREPRISE */}
          <div className="devis-form-row">
            <div className="devis-field">
              <label htmlFor="devis-name" className="devis-label">
                {t.studioPage.formName} <span className="required-star">*</span>
              </label>
              <input
                id="devis-name"
                type="text"
                required
                placeholder={t.studioPage.formNamePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="devis-input"
              />
            </div>

            <div className="devis-field">
              <label htmlFor="devis-company" className="devis-label">
                {t.studioPage.formCompany}
              </label>
              <input
                id="devis-company"
                type="text"
                placeholder={t.studioPage.formCompanyPlaceholder}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="devis-input"
              />
            </div>
          </div>

          {/* ROW 2: EMAIL & TELEPHONE */}
          <div className="devis-form-row">
            <div className="devis-field">
              <label htmlFor="devis-email" className="devis-label">
                {t.studioPage.formEmail} <span className="required-star">*</span>
              </label>
              <input
                id="devis-email"
                type="email"
                required
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="devis-input"
              />
            </div>

            <div className="devis-field">
              <label htmlFor="devis-phone" className="devis-label">
                {t.studioPage.formPhone}
              </label>
              <input
                id="devis-phone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="devis-input"
              />
            </div>
          </div>

          {/* ROW 3: TYPE DE PROJET */}
          <div className="devis-field">
            <label htmlFor="devis-project-type" className="devis-label">
              {t.studioPage.formProjectType} <span className="required-star">*</span>
            </label>
            <select
              id="devis-project-type"
              required
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="devis-select"
            >
              <option value="" disabled>
                {t.studioPage.formProjectTypePlaceholder}
              </option>
              <option value="Logo sur-mesure">{t.studioPage.formProjectOptions.logo}</option>
              <option value="Identité Visuelle globale">{t.studioPage.formProjectOptions.identity}</option>
              <option value="Sublimation & Merch Textile">{t.studioPage.formProjectOptions.sublimation}</option>
              <option value="Supports de Communication Print">{t.studioPage.formProjectOptions.print}</option>
              <option value="Design Réseaux Sociaux">{t.studioPage.formProjectOptions.social}</option>
              <option value="Autre projet créatif">{t.studioPage.formProjectOptions.other}</option>
            </select>
          </div>

          {/* ROW 4: DESCRIPTION */}
          <div className="devis-field">
            <label htmlFor="devis-description" className="devis-label">
              {t.studioPage.formDesc}
            </label>
            <textarea
              id="devis-description"
              rows={4}
              placeholder={t.studioPage.formDescPlaceholder}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="devis-textarea"
            />
          </div>

          {/* ROW 5: FILE DROPZONE UPLOAD */}
          <div className="devis-field">
            <label className="devis-label">
              {t.studioPage.formFileLabel}
            </label>

            <div
              className={`devis-dropzone ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.ai,.eps"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <div className="dropzone-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <p className="dropzone-main-text">
                {t.studioPage.dropzoneMain}
              </p>
              <p className="dropzone-sub-text">
                {t.studioPage.dropzoneSub}
              </p>
            </div>

            {/* ATTACHED FILES DISPLAY LIST */}
            {attachedFiles.length > 0 && (
              <div className="attached-files-list">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="attached-file-item">
                    <span className="file-icon">📄</span>
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} Mo)</span>
                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ROW 6: PRIVACY CHECKBOX */}
          <label className="devis-checkbox-label">
            <input
              type="checkbox"
              checked={formData.privacyAccepted}
              onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
              className="devis-checkbox"
            />
            <span className="checkbox-text">
              {t.studioPage.privacyText}
            </span>
          </label>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="devis-submit-btn">
            <span>{t.studioPage.formSubmit}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="send-icon">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
