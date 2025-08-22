import JoinForm from "@/components/JoinForm"
import Dashboard from "@/components/Dashboard"
import { cookies } from "next/headers"

export default function Home() {
  const id = cookies().get("ticketId")?.value || null
  
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Silent Queue
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">Designing Dignity in Waiting</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {!id && <JoinForm />}

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-bold">?</span>
                </div>
                <h3 className="text-lg font-semibold text-white/90">How it works</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-white/30 to-white/20 flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <p className="text-white/80">Join the queue with one tap—no login required.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-white/30 to-white/20 flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <p className="text-white/80">Get real-time updates with empathetic voice + visuals.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-white/30 to-white/20 flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <p className="text-white/80">If delays happen, we reschedule clearly and fairly.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {id ? (
              <Dashboard ticketId={id} />
            ) : (
              /* Enhanced placeholder with modern styling and animation */
              <div className="card h-96 flex flex-col items-center justify-center text-center pulse-glow">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Live Dashboard</h3>
                <p className="text-white/70">Join the queue to see your real-time position and updates here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
