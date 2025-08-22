"use client"
import { useEffect, useRef, useState } from "react"

function speak(text) {
  try {
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 1
    utter.pitch = 1
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
  } catch {}
}

export default function Dashboard({ ticketId }) {
  const [ticket, setTicket] = useState(null)
  const [disruption, setDisruption] = useState(null)
  const prevEta = useRef(null)

  async function fetchTicket() {
    const res = await fetch(`/api/ticket/${ticketId}`)
    if (res.ok) {
      const data = await res.json()
      setTicket(data.ticket)
      setDisruption(data.disruptions)
      if (data.ticket?.eta && data.ticket?.eta !== prevEta.current) {
        prevEta.current = data.ticket.eta
        const friendly = new Date(data.ticket.eta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        speak(`Your expected turn is ${friendly}. You're number ${data.ticket.position} in line.`)
      }
    }
  }

  useEffect(() => {
    fetchTicket()
    const sse = new EventSource("/api/stream")
    sse.onmessage = () => fetchTicket()
    return () => sse.close()
  }, [ticketId])

  if (!ticket)
    return (
      <div className="card pulse-glow">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          <span>Loading your ticket...</span>
        </div>
      </div>
    )

  const eta = ticket.eta ? new Date(ticket.eta).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"
  const confidence = 95
  const progressWidth = Math.max(5, 100 - (ticket.position - 1) * 10)

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">#{ticket.position || "—"}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">You're in line</h2>
                <p className="text-white/80">Position #{ticket.position || "—"}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70 uppercase tracking-wide">ETA</p>
            <p className="text-2xl font-bold">{eta}</p>
            <p className="text-xs text-white/70">{confidence}% confidence</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Progress</span>
            <span>{progressWidth.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-3 rounded-full progress-bar transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      </div>

      {disruption && (
        <div className="card border-2 border-yellow-400/50 bg-yellow-400/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-yellow-100">Delay Update</p>
              <p className="text-yellow-200/90 mt-1">{disruption.message}. New ETA adjusted.</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-white/90">Queue Buddy</h3>
        </div>
        <p className="text-white/80">
          We're running about a few minutes late, but don't worry — your turn is coming soon.
        </p>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-white/90">Accessibility Options</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => speak("We will notify you with voice when your turn is near.")}
            className="btn btn-ghost text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
            Voice Updates
          </button>
          <button className="btn btn-ghost text-sm">
            <span className="mr-2">A+</span>
            Large Text
          </button>
          <button className="btn btn-ghost text-sm">
            <span className="mr-2">◐</span>
            High Contrast
          </button>
        </div>
      </div>
    </div>
  )
}
