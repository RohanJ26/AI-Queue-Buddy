
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';

// Singleton-like module state
const emitter = global.__queue_emitter || new EventEmitter();
if (!global.__queue_emitter) global.__queue_emitter = emitter;

const state = global.__queue_state || {
  tickets: [], // {id, name, category, joinedAt, status, eta, position}
  disruptions: null, // { message, delayMinutes }
  lastUpdated: Date.now()
};
if (!global.__queue_state) global.__queue_state = state;

const CATEGORY_MINUTES = {
  routine: 3,      // standard appointment
  priority: 2,     // quicker visits (priority care)
  extended: 6      // longer/complex visits
};

function broadcast() {
  console.log('Broadcasting update, tickets count:', state.tickets.length);
  state.lastUpdated = Date.now();
  const snapshotData = snapshot();
  console.log('Broadcasting snapshot:', JSON.stringify(snapshotData, null, 2));
  emitter.emit('update', JSON.stringify(snapshotData));
}

export function snapshot() {
  // recompute positions & per-category ETA cumulatively
  const active = state.tickets.filter(t => t.status === 'waiting');
  active.forEach((t, idx) => t.position = idx + 1);

  const extra = state.disruptions?.delayMinutes || 0;
  let cumulativeMinutes = 0;
  const now = Date.now();

  for (const t of active) {
    const perTicket = CATEGORY_MINUTES[t.category] ?? CATEGORY_MINUTES.routine;
    t.eta = new Date(now + (cumulativeMinutes + extra) * 60000).toISOString();
    cumulativeMinutes += perTicket;
  }

  return {
    tickets: state.tickets,
    disruptions: state.disruptions,
    serverTime: Date.now()
  };
}

export function join(name='Guest', category='routine') {
  console.log('Joining queue:', { name, category });
  const id = randomUUID();
  const safeCategory = ['routine','priority','extended'].includes(category) ? category : 'routine';
  state.tickets.push({ id, name, category: safeCategory, joinedAt: Date.now(), status: 'waiting', position: 0, eta: null });
  console.log('Ticket created:', { id, name, category: safeCategory });
  broadcast();
  return { id };
}

export function getTicket(id) {
  return state.tickets.find(t => t.id === id);
}

export function completeNext() {
  console.log('Completing next ticket');
  const next = state.tickets.find(t => t.status === 'waiting');
  if (next) {
    next.status = 'completed';
    console.log('Completed ticket:', next.id);
  }
  broadcast();
  return next;
}

export function skip(id) {
  const t = getTicket(id);
  if (t && t.status === 'waiting') {
    t.status = 'skipped';
    broadcast();
  }
}

export function setDisruption(message, delayMinutes=10) {
  console.log('Setting disruption:', { message, delayMinutes });
  state.disruptions = { message, delayMinutes, at: Date.now() };
  broadcast();
}

export function clearDisruption() {
  console.log('Clearing disruption');
  state.disruptions = null;
  broadcast();
}

export function onUpdate(fn) { emitter.on('update', fn); }
export function offUpdate(fn) { emitter.off('update', fn); }
