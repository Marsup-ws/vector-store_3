'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import Header from './ui/Header';
import CartDrawer from './CartDrawer';
import Modals from './Modals';
import ToastContainer from './ToastContainer';
import LoginModal from './auth/LoginModal';
import LogonModal from './auth/LogonModal';

function GlobalUI({ children }: { children: React.ReactNode }) {
  const {
    cartOpen,
    setCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    setCart,
    addToast,
    t,
    activeModal,
    setActiveModal,
    handleFormSubmit,
    toasts,
  } = useApp();

  return (
    <div className="container">
      <ToastContainer toasts={toasts} />
      <Header />
      <main style={{ minHeight: 'calc(100vh - 200px)', paddingTop: '1.5rem' }}>
        {children}
      </main>
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
      <Modals
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        handleFormSubmit={handleFormSubmit}
        t={t}
      />
      <LoginModal />
      <LogonModal />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <GlobalUI>{children}</GlobalUI>
    </AppProvider>
  );
}
