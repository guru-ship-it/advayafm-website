'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PWAInstaller() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => console.warn('SW registration failed', err));
    }

    // Check if already installed (standalone display mode)
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setInstalled(true);
      return;
    }

    // Check if user dismissed the banner recently
    try {
      const dismissedAt = localStorage.getItem('pwa_install_dismissed_at');
      if (dismissedAt) {
        const age = Date.now() - parseInt(dismissedAt, 10);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (age < sevenDays) return;
      }
    } catch (e) {}

    // Listen for install prompt
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      // Show our banner after 15 sec on site (not immediately)
      setTimeout(() => setVisible(true), 15000);
    };

    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === 'accepted') {
      setInstalled(true);
    }
    setDeferred(null);
    setVisible(false);
  }

  function dismiss() {
    try {
      localStorage.setItem('pwa_install_dismissed_at', String(Date.now()));
    } catch (e) {}
    setVisible(false);
  }

  if (installed || !visible || !deferred) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl border border-gold-300 bg-white p-4 shadow-gold-lg sm:bottom-6 sm:left-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/fm-naipunya.jpg" alt="" width={40} height={40} className="rounded-full" />
        </div>
        <div className="flex-1">
          <div className="mb-1 text-sm font-bold text-navy-900">
            Install D Advaya FM NaipuNya
          </div>
          <p className="mb-3 text-xs text-navy-500">
            Add to your desktop/home screen for quick access. Works offline, faster on repeat visits.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={install}
              className="rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-bold text-navy-900 shadow-sm hover:bg-gold-600"
            >
              Install
            </button>
            <button
              onClick={dismiss}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-navy-500 hover:text-navy-900"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-navy-400 hover:bg-navy-50 hover:text-navy-900"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
