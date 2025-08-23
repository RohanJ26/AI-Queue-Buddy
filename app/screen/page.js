
'use client';
import { useEffect, useState } from 'react';

export default function Screen() {
  const [snap, setSnap] = useState(null);
  async function refresh(){ const r=await fetch('/api/queue'); setSnap(await r.json()); }
  useEffect(()=>{refresh(); const sse = new EventSource('/api/stream'); sse.onmessage=refresh; return ()=>sse.close();},[]);
  const waiting = snap?.tickets?.filter(t=>t.status==='waiting') || [];
  console.log(snap);
  
  return (
    <main className="space-y-6">
      <h1 className="text-4xl font-bold">Now Serving</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {waiting.slice(0,6).map(t => (
          <div key={t.id} className="card">
            <p className="text-2xl font-bold">#{t.position}</p>
            <p className="text-white/80">{t.name}</p>
            <p className="text-sm text-white/70">ETA {t.eta ? new Date(t.eta).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : '—'}</p>
          </div>
        ))}
      </div>
      {snap?.disruptions && (
        <div className="card border-2 border-yellow-400/50">
          <p className="font-semibold">Notice</p>
          <span>{snap.disruptions.message}</span>
          <span> {snap.disruptions.delayMinutes} minutes</span>
        </div>
      )}
    </main>
  );
}
