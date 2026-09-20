'use client';

import { useState, useEffect, FormEvent } from 'react';

// Importation des composants depuis le dossier components/
import Header from '../components/ui/Header';
import HeroSection from '../components/HeroSection';
import TopActivitiesSection from '../components/TopActivitiesSection';
import BottomActivitiesSection from '../components/BottomActivitiesSection';
import CertificationsSection from '../components/CertificationsSection';
import Footer from '../components/ui/Footer';
import CartDrawer from '../components/CartDrawer';
import Modals from '../components/Modals';
import ToastContainer from '../components/ToastContainer';
import { ActiveModal, CartItem, Language, Product, Toast } from '@/utils/types';
import { translations } from '@/utils/translations';

export default function Home() {
  const [lang, setLang] = useState<Language>('fr');
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const t = translations[lang];

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast(`${t.cart.toastAdded} (${product.name})`);
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast(t.cart.toastRemoved, 'info');
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };



  const handleNavClick = (sectionId: string, cardKey: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedCard(cardKey);
      setTimeout(() => {
        setHighlightedCard(null);
      }, 3000);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>, successMsg: string) => {
    e.preventDefault();
    setActiveModal(null);
    addToast(successMsg);
  };

  const triggerDownload = (fileName: string) => {
    addToast(`Téléchargement de ${fileName} démarré...`, 'success');
  };

  return (
    <main className="container">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Sections du site */}
      <HeroSection t={t} handleNavClick={handleNavClick} setActiveModal={setActiveModal} />
      <TopActivitiesSection t={t} highlightedCard={highlightedCard} addToCart={addToCart} triggerDownload={triggerDownload} />
      <BottomActivitiesSection t={t} highlightedCard={highlightedCard} setActiveModal={setActiveModal} />
      <CertificationsSection t={t} setActiveModal={setActiveModal} />
      
      {/* Footer */}
      <Footer t={t} />

      {/* Tiroirs & Modales */}
      <CartDrawer 
        cartOpen={cartOpen} 
        setCartOpen={setCartOpen} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        getCartTotal={getCartTotal} 
        setCart={setCart} 
        addToast={addToast} 
        t={t} 
      />
      
      <Modals activeModal={activeModal} setActiveModal={setActiveModal} handleFormSubmit={handleFormSubmit} t={t} />
    </main>
  );
}