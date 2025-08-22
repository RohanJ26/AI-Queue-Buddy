
'use client';
export default function Buddy({ message='Hi! I will keep you updated.' }) {
  return (
    <div className="card flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-white/20 grid place-items-center">
        <span className="text-2xl">🤖</span>
      </div>
      <p className="text-white/90">{message}</p>
    </div>
  );
}
