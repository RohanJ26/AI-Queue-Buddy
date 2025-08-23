'use client';
import { useEffect, useState } from 'react';

let toastId = 0;
const toastEventTarget = new EventTarget();
const TOAST_EVENT = 'show-toast';

export function showToast(message, type = 'success') {
  const event = new CustomEvent(TOAST_EVENT, {
    detail: { message, type, id: ++toastId }
  });
  toastEventTarget.dispatchEvent(event);
}

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const newToast = event.detail;
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3000);
    };

    toastEventTarget.addEventListener(TOAST_EVENT, handleToast);
    return () => toastEventTarget.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="animate-slide-left relative overflow-hidden min-w-[350px]"
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)'
            }}
            className="rounded-2xl border border-white/20 backdrop-blur-xl py-4 px-5 text-lg font-medium"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{toast.message}</span>
            </div>
            <div className="absolute bottom-0 left-0 h-1.5 bg-white/30 animate-progress"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
