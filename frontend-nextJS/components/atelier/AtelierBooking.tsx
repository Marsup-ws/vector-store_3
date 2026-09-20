'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '../../context/AppContext';
import { WorkshopSession } from './AtelierCalendar';

interface AtelierBookingProps {
  selectedSession: WorkshopSession;
}

export function AtelierBooking({ selectedSession }: AtelierBookingProps) {
  const { addToast, t } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lastName || !formData.email) {
      addToast(t.atelierPage.participantInfo, 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast(
        `Réservation confirmée pour "${selectedSession.title}" (${selectedSession.dateStr}) ! Un e-mail de confirmation vous a été envoyé.`,
        'success'
      );
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    }, 1000);
  };

  return (
    <div className="atelier-col atelier-col-booking">
      <div className="atelier-card atelier-booking-card">
        <div className="atelier-card-header">
          <div className="atelier-icon-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h2 className="atelier-card-title">{t.atelierPage.bookingTitle}</h2>
        </div>

        {/* SELECTED WORKSHOP SUMMARY BOX */}
        <div className="booking-session-summary">
          <div className="summary-thumb-wrapper">
            <Image
              src={selectedSession.image}
              alt={selectedSession.title}
              width={70}
              height={70}
              className="summary-thumb"
              unoptimized
            />
          </div>
          <div className="summary-details">
            <h4 className="summary-title">{selectedSession.title}</h4>
            <div className="summary-meta">
              <span>📅 {selectedSession.dateStr}</span>
              <span>🕒 {selectedSession.time}</span>
            </div>
          </div>
          <div className="summary-price">{selectedSession.price.toFixed(2)} €</div>
        </div>

        {/* PARTICIPANT FORM */}
        <form onSubmit={handleBookingSubmit} className="booking-form">
          <h3 className="form-section-title">{t.atelierPage.participantInfo}</h3>

          <div className="booking-form-row">
            <div className="booking-field">
              <label htmlFor="first-name" className="booking-label">
                {t.atelierPage.firstName}
              </label>
              <input
                id="first-name"
                type="text"
                placeholder={t.atelierPage.firstNamePlaceholder}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="booking-input"
              />
            </div>

            <div className="booking-field">
              <label htmlFor="last-name" className="booking-label">
                {t.atelierPage.lastName} <span className="required-star">*</span>
              </label>
              <input
                id="last-name"
                type="text"
                required
                placeholder={t.atelierPage.lastNamePlaceholder}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="booking-input"
              />
            </div>
          </div>

          <div className="booking-form-row">
            <div className="booking-field">
              <label htmlFor="booking-email" className="booking-label">
                {t.atelierPage.email} <span className="required-star">*</span>
              </label>
              <input
                id="booking-email"
                type="email"
                required
                placeholder={t.atelierPage.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="booking-input"
              />
            </div>

            <div className="booking-field">
              <label htmlFor="booking-phone" className="booking-label">
                {t.atelierPage.phone}
              </label>
              <input
                id="booking-phone"
                type="tel"
                placeholder={t.atelierPage.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="booking-input"
              />
            </div>
          </div>

          {/* PAYMENT BADGES */}
          <div className="booking-payment-section">
            <h4 className="payment-title">{t.atelierPage.paymentTitle}</h4>
            <div className="payment-badges">
              <span className="pay-badge visa">VISA</span>
              <span className="pay-badge mastercard">MasterCard</span>
              <span className="pay-badge applepay">Pay</span>
              <span className="pay-badge gpay">GPay</span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={isProcessing} className="booking-submit-btn">
            {isProcessing
              ? t.atelierPage.processing
              : `${t.atelierPage.payAndBook} ${selectedSession.price.toFixed(2)} €`}
          </button>

          <p className="booking-reassurance">
            {t.atelierPage.reassurance}
          </p>
        </form>
      </div>
    </div>
  );
}
