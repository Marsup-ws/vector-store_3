import { ShoppingCart, ShoppingBag, X, Trash2 } from 'lucide-react';
import { TranslationContent, CartItem } from '../utils/types';

export interface CartDrawerProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  getCartTotal: () => string;
  setCart: (cart: CartItem[]) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  t: TranslationContent;
}

export default function CartDrawer({ 
  cartOpen, 
  setCartOpen, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  getCartTotal, 
  setCart, 
  addToast, 
  t 
}: CartDrawerProps) {
  if (!cartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <ShoppingCart size={22} />
            <span>{t.cart.title}</span>
          </h2>
          <button className="modal-close" onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>{t.cart.empty}</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <div className="cart-item-quantity">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span className="cart-total-label">{t.cart.total}</span>
              <span className="cart-total-value">{getCartTotal()} €</span>
            </div>
            <button 
              className="cart-checkout-btn"
              onClick={() => {
                setCart([]);
                setCartOpen(false);
                addToast(t.cart.checkoutSuccess);
              }}
            >
              <span>{t.cart.checkout}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
