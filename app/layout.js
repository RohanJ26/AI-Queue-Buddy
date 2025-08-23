'use client';
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Toast from '@/components/Toast'

const metadata = {
  title: "AI Queue Buddy",
  description: "Dignified waiting with real-time empathy",
};

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700'] })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${jakarta.className}`}>
        <Toast />
        <header className="sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="card py-3 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 grid place-items-center">
                  <span className="text-lg font-bold">Q</span>
                </div>
                <div>
                  <p className="text-sm text-white/70 leading-none">AI Queue Buddy</p>
                  <p className="text-xs text-white/60">Dignified waiting</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <a 
                  href="/#how" 
                  onClick={(e) => {
                    const howSection = document.getElementById('how');
                    if (howSection) {
                      e.preventDefault();
                      howSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn btn-ghost text-sm"
                >
                  How it works
                </a>
                <a 
                  href="/#join" 
                  onClick={(e) => {
                    const joinSection = document.getElementById('join');
                    if (joinSection) {
                      e.preventDefault();
                      joinSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn btn-primary text-sm"
                >
                  Join
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-6xl mx-auto p-6">{children}</div>
        <footer className="mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="card py-4 px-4 flex items-center justify-between">
              <p className="text-sm text-white/70">© {new Date().getFullYear()} AI Queue Buddy</p>
              <div className="text-xs text-white/60">Designing dignity in waiting</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
