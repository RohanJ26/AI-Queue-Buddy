
'use client';
import { useEffect, useState } from 'react';
import DelayPopup from '@/components/DelayPopup';
import { showToast } from '@/components/Toast';

export default function Admin() {
  const [snapshot, setSnapshot] = useState(null);
  const [isDelayPopupOpen, setIsDelayPopupOpen] = useState(false);

  async function refresh() {
    const res = await fetch('/api/queue');
    setSnapshot(await res.json());
  }
  useEffect(()=>{refresh(); const i=setInterval(refresh,2000); return ()=>clearInterval(i)},[]);

  async function complete() {
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'complete'})});
    showToast('Next ticket completed successfully', 'success');
    refresh();
  }

  async function disrupt() {
    setIsDelayPopupOpen(true);
  }

  async function handleDelaySubmit(message, delayMinutes) {
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'disrupt', message, delayMinutes})});
    setIsDelayPopupOpen(false);
    showToast(`Delay of ${delayMinutes} minutes added`, 'info');
    refresh();
  }

  async function clearDisruption() {
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'clearDisruption'})});
    showToast('Delay has been cleared', 'success');
    refresh();
  }

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">Admin Console</h1>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={complete}>Complete Next</button>
        <button className="btn btn-ghost" onClick={disrupt}>Add Delay</button>
        <button className="btn btn-ghost" onClick={clearDisruption}>Clear Delay</button>
      </div>
      <pre className="card overflow-auto text-xs max-h-[60vh]">
        {JSON.stringify(snapshot, null, 2)}
      </pre>
      <p className="text-white/70 text-sm">Use this to simulate real-world queue flow for your demo.</p>

      <DelayPopup
        isOpen={isDelayPopupOpen}
        onClose={() => setIsDelayPopupOpen(false)}
        onSubmit={handleDelaySubmit}
      />
    </main>
  );
}
