'use client';
import { useState } from 'react';

export default function JoinForm({ onJoined }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function joinQueue() {
    setLoading(true);
    try {
      const res = await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', name })
      });
      let data = null;
      if (res.ok) {
        data = await res.json();
        // Set the cookie in the browser
        document.cookie = `ticketId=${data.id};path=/`;
        // Force a page reload to show the dashboard
        window.location.reload();
      } else {
        // Optionally handle error response
        console.error('Failed to join queue:', res.status);
      }
    } catch (err) {
      console.error('Error joining queue:', err);
    }
    setLoading(false);
  }

  return (
    /* Enhanced form with modern styling and improved UX */
    <div className="card space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold">Join the Queue</h2>
      </div>

      <div className="space-y-2">
        <label className="label">Your name (optional)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="modern-input"
        />
      </div>

      <button
        className={`btn btn-primary w-full ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
        onClick={joinQueue}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-slate-800/30 border-t-slate-800 rounded-full animate-spin"></div>
            Joining Queue...
          </div>
        ) : (
          "Join Queue"
        )}
      </button>

      <div className="flex items-start gap-2 pt-2">
        <svg
          className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <p className="text-xs text-white/70">
          Privacy-first: no sign-in required. You'll receive real-time updates on this device.
        </p>
      </div>
    </div>
  )
}
