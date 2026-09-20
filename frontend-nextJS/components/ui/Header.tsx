'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, ChevronDown, ShoppingCart, User, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

export default function Header() {
  const {
    lang,
    setLang,
    langMenuOpen,
    setLangMenuOpen,
    getCartItemCount,
    setCartOpen,
    t,
    handleNavClick,
    currentUser,
    setIsLoginOpen,
    logoutUser,
  } = useApp();

  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const handleUserBtnClick = () => {
    if (currentUser) {
      setUserMenuOpen((prev) => !prev);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div 
          className="logo-container" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <img src="/lotus-logo.png" alt="Logo" className="logo-img" />
          <span className="cursive-logo" style={{ fontSize: '1.6rem', color: '#1a3a2a' }}>
            Evgueniia_Vector
          </span>
        </div>

        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/activities" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
              <span className="dot green"></span>
              <span>{t.nav.activities}</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link href="/store" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                <span className="dot blue"></span>
                <span>{t.nav.store}</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/studio" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
              <span className="dot purple"></span>
              <span>{t.nav.studio}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/atelier" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
              <span className="dot orange"></span>
              <span>{t.nav.ateliers}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                <span className="dot pink"></span>
                <span>{t.nav.about}</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                <span className="dot purple"></span>
                <span>{t.nav.contact}</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Selecteur de langue */}
          <div className="lang-dropdown">
            <button className="lang-btn" onClick={() => setLangMenuOpen((prev) => !prev)}>
              <Globe size={16} />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown size={14} />
            </button>
            <div className={`lang-menu ${langMenuOpen ? 'open' : ''}`}>
              <button className="lang-option" onClick={() => { setLang('fr'); setLangMenuOpen(false); }}>FR</button>
              <button className="lang-option" onClick={() => { setLang('en'); setLangMenuOpen(false); }}>ENG</button>
              <button className="lang-option" onClick={() => { setLang('ru'); setLangMenuOpen(false); }}>RU</button>
              <button className="lang-option" onClick={() => { setLang('uk'); setLangMenuOpen(false); }}>UKR</button>
            </div>
          </div>

          {/* Bouton Panier */}
          <button className="cart-trigger" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={20} />
            {getCartItemCount() > 0 && (
              <span className="cart-badge">{getCartItemCount()}</span>
            )}
          </button>

          {/* Bouton Utilisateur / Connexion (user-trigger) */}
          <div style={{ position: 'relative' }}>
            <button
              className={`user-trigger ${currentUser ? 'user-logged-in' : ''}`}
              onClick={handleUserBtnClick}
              title={currentUser ? `Connecté : ${currentUser.login} (Rank ${currentUser.rank})` : 'Se connecter'}
              style={{
                backgroundColor: currentUser ? '#e0f2fe' : 'white',
                borderColor: currentUser ? '#7dd3fc' : '#e2e8f0',
                color: currentUser ? '#0284c7' : 'inherit',
              }}
            >
              <User size={20} />
            </button>

            {/* Menu déroulant profil si connecté */}
            {currentUser && userMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '200px',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  padding: '0.75rem',
                  zIndex: 60,
                }}
              >
                <div style={{ paddingBottom: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{currentUser.login}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentUser.email}</div>
                  <div style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 600, marginTop: '0.2rem' }}>
                    Rang : {currentUser.rank}
                  </div>
                </div>

                <button
                  onClick={() => {
                    logoutUser();
                    setUserMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#e11d48',
                    padding: '0.4rem 0.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={16} />
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
