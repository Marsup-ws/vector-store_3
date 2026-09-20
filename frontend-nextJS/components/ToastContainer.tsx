import { CheckCircle } from 'lucide-react';
import { Toast } from '@/utils/types';

export interface ToastContainerProps {
  toasts: Toast[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <CheckCircle className="toast-success-icon" size={18} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
