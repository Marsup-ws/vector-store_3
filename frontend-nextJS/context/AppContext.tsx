'use client';

import React, { createContext, useContext, useState, useEffect, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { translations } from '../utils/translations';
import { Language, CartItem, Product, Toast, ActiveModal, TranslationContent, UserBean } from '../utils/types';

interface AppContextType {
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  langMenuOpen: boolean;
  setLangMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  t: TranslationContent;

  currentUser: UserBean | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserBean | null>>;
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLogonOpen: boolean;
  setIsLogonOpen: React.Dispatch<React.SetStateAction<boolean>>;
  logoutUser: () => void;
  
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  getCartTotal: () => string;
  getCartItemCount: () => number;
  
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  activeModal: ActiveModal;
  setActiveModal: React.Dispatch<React.SetStateAction<ActiveModal>>;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>, successMsg: string) => void;
  
  highlightedCard: string | null;
  setHighlightedCard: React.Dispatch<React.SetStateAction<string | null>>;
  handleNavClick: (sectionId: string, cardKey: string) => void;
  triggerDownload: (fileName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('fr');
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserBean | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isLogonOpen, setIsLogonOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const router = useRouter();
  const pathname = usePathname();

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

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const scrollToSection = (sectionId: string, cardKey: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedCard(cardKey);
      setTimeout(() => {
        setHighlightedCard(null);
      }, 3000);
    }
  };

  const handleNavClick = (sectionId: string, cardKey: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      setTimeout(() => {
        scrollToSection(sectionId, cardKey);
      }, 300);
    } else {
      scrollToSection(sectionId, cardKey);
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

  const logoutUser = () => {
    setCurrentUser(null);
    addToast('Déconnexion réussie.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        langMenuOpen,
        setLangMenuOpen,
        t,
        currentUser,
        setCurrentUser,
        isLoginOpen,
        setIsLoginOpen,
        isLogonOpen,
        setIsLogonOpen,
        logoutUser,
        cart,
        setCart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartItemCount,
        toasts,
        addToast,
        activeModal,
        setActiveModal,
        handleFormSubmit,
        highlightedCard,
        setHighlightedCard,
        handleNavClick,
        triggerDownload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
