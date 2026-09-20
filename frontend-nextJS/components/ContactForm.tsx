'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function ContactForm() {
  const { addToast, t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      addToast(t.contactPage.formSubtitle, 'error');
      return;
    }

    const mailtoSubject = encodeURIComponent(
      formData.subject
        ? `[Contact Evgueniia_Vector] ${formData.subject}`
        : `[Contact Evgueniia_Vector] Message de ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Nom et Prénom: ${formData.name}\n` +
      `E-mail: ${formData.email}\n` +
      `Sujet: ${formData.subject || 'Non précisé'}\n\n` +
      `Message:\n${formData.message}`
    );

    // Trigger mailto link targeting zenia-vector@gmail.com
    window.location.href = `mailto:zenia-vector@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
    addToast(t.contactPage.formSuccessDesc, 'success');
  };

  return (
    <div className="contact-card contact-form-card">
      <div className="contact-card-header">
        <div className="contact-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div>
          <h2 className="contact-card-title">{t.contactPage.formTitle}</h2>
          <p className="contact-card-subtitle">
            {t.contactPage.formSubtitle}
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="contact-form-success">
          <div className="success-icon-box">✓</div>
          <h3>{t.contactPage.formSuccessTitle}</h3>
          <p>
            {t.contactPage.formSuccessDesc}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="contact-reset-btn"
          >
            {t.contactPage.formReset}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-field">
            <label htmlFor="contact-name" className="contact-label">
              {t.contactPage.formName} <span className="required-star">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder={t.contactPage.formNamePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email" className="contact-label">
              {t.contactPage.formEmail} <span className="required-star">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder={t.contactPage.formEmailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-subject" className="contact-label">
              {t.contactPage.formSubject} <span className="required-star">*</span>
            </label>
            <select
              id="contact-subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="contact-select"
            >
              <option value="" disabled>
                {t.contactPage.formSubjectPlaceholder}
              </option>
              <option value="Devis sur-mesure">{t.contactPage.formSubjectOptions.devis}</option>
              <option value="Question sur le store">{t.contactPage.formSubjectOptions.store}</option>
              <option value="Réservation d'atelier">{t.contactPage.formSubjectOptions.workshop}</option>
              <option value="Collaboration / Partenariat">{t.contactPage.formSubjectOptions.collab}</option>
              <option value="Autre demande">{t.contactPage.formSubjectOptions.other}</option>
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message" className="contact-label">
              {t.contactPage.formMessage} <span className="required-star">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              placeholder={t.contactPage.formMessagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="contact-textarea"
            />
          </div>

          <button type="submit" className="contact-submit-btn">
            <span>{t.contactPage.formSubmit}</span>
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
