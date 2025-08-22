
'use client';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [snapshot, setSnapshot] = useState(null);
  async function refresh() {
    const res = await fetch('/api/queue');
    setSnapshot(await res.json());
  }
  useEffect(()=>{refresh(); const i=setInterval(refresh,2000); return ()=>clearInterval(i)},[]);

  async function complete() {
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'complete'})});
    refresh();
  }
  async function disrupt() {
    const msg = prompt('Delay reason?', 'Doctor delayed by 10 mins');
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'disrupt', message: msg, delayMinutes: 10})});
    refresh();
  }
  async function clearDisruption() {
    await fetch('/api/queue',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action:'clearDisruption'})});
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
    </main>
  );
}
