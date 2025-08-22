
# AI Queue Buddy — Working Prototype (Next.js + Tailwind)

A dignified, inclusive queueing experience with **real-time updates**, **empathetic voice**, and **disruption handling**. Built for hackathon demos—simple, modern, and aligned to the brief.

## ✨ Features
- Join queue instantly (no login)
- Live position + ETA (with confidence cue)
- Event-stream updates (SSE)
- Empathetic voice announcements (Web Speech API)
- Disruption handling (admin-triggered)
- Public screen view for counters

## 🚀 Quick Start
```bash
# 1) Unzip, then inside the folder:
npm install

# 2) Dev server
npm run dev

# 3) Open
http://localhost:3000
```

## 🧪 Demo Flow
1. Open **http://localhost:3000** and click **Join Queue**.
2. Open a second tab: **http://localhost:3000/admin**.
   - Click **Complete Next** to advance the queue.
   - Click **Add Delay** to simulate disruptions (watch the user app respond).
3. Optional: Open **http://localhost:3000/screen** for a **public display** view.

## 🧩 Tech Notes
- Uses **Next.js App Router** + **TailwindCSS**.
- **In-memory** data store (perfect for local demos). For production, swap with Redis/DB + Webhooks.
- **SSE** keeps clients in sync without heavy polling.
- **Web Speech API** provides accessible voice feedback.

## 📦 Structure
```
app/
  page.js            # Join + How it works
  admin/page.js      # Admin console (simulate flow)
  screen/page.js     # Public display
  api/               # Queue APIs + SSE stream
components/          # UI components
lib/store.js         # In-memory queue logic + events
```

## 🔒 Notes
- In-memory state resets when the server restarts.
- On serverless platforms memory may not persist; deploy to a Node server (or add Redis).

## 🧭 Next Steps (optional)
- Add SMS/WhatsApp via Twilio.
- Add languages and screen reader labels.
- Replace dummy confidence with a simple ETA variance model.
```

