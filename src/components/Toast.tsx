import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-[#FFD93D] text-[#25113D]';
        let icon = <Sparkles className="w-5 h-5 text-[#FF6B35]" />;

        if (toast.type === 'success') {
          bg = 'bg-[#B8F34A] text-[#25113D]';
          icon = <CheckCircle2 className="w-5 h-5 text-[#25113D]" />;
        } else if (toast.type === 'info') {
          bg = 'bg-white text-[#25113D]';
          icon = <Info className="w-5 h-5 text-[#FF6B35]" />;
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pop-card-sm px-4 py-3 rounded-xl flex items-center gap-3 font-semibold text-sm animate-bounce-short shadow-[4px_4px_0px_#25113D] ${bg}`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <div className="flex-1 font-display tracking-wide">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};
