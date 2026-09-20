'use client';

import React from 'react';
import { useApp } from '../context/AppContext';

export function ContactMap() {
  const { t } = useApp();
  const mapAddress = '12 Rue du Languedoc, 31770 Colomiers, France';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddress)}`;

  return (
    <div className="contact-card contact-map-card">
      <div className="contact-card-header">
        <div className="contact-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <h2 className="contact-card-title">{t.contactPage.mapTitle}</h2>
          <p className="contact-card-subtitle">
            {t.contactPage.mapSubtitle}
          </p>
        </div>
      </div>

      {/* GOOGLE MAP CONTAINER */}
      <div className="contact-map-wrapper">
        <iframe
          title="Atelier Evgueniia_Vector - 12 Rue du Languedoc, 31770 Colomiers"
          src="https://maps.google.com/maps?q=12%20Rue%20du%20Languedoc%2C%2031770%20Colomiers&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map-iframe"
        />

        {/* OVERLAY POPUP CARD MATCHING GOOGLE MAPS DESIGN IN SCREENSHOT */}
        <div className="map-overlay-card">
          <div className="map-overlay-head">
            <div className="map-overlay-title">12 Rue du Languedoc</div>
            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="map-overlay-dir-icon"
              title={t.contactPage.mapDirections}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#2b6cb0" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span>{t.contactPage.mapDirections}</span>
            </a>
          </div>
          <p className="map-overlay-address">12 Rue du Languedoc, 31770 Colomiers</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="map-overlay-link"
          >
            {t.contactPage.mapEnlarge}
          </a>
        </div>
      </div>

      {/* BOTTOM ITINERARY BUTTON */}
      <div className="contact-map-actions">
        <a
          href={googleDirectionsUrl}
          target="_blank"
          rel="noreferrer"
          className="contact-map-btn"
        >
          <span>{t.contactPage.mapBtn}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="btn-pin-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
